using DoarSangue.Api.DTOs;
using DoarSangue.Api.DTOs.UsuarioDTOs;
using DoarSangue.Api.Models;
using DoarSangue.Api.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using UsuarioLoginRequest = DoarSangue.Api.DTOs.UsuarioDTOs.UsuarioLoginRequest;

namespace DoarSangue.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly SupabaseService _supabase;

        public UsuarioController(SupabaseService supabase)
        {
            _supabase = supabase;
        }

        [HttpPost]
        public async Task<IActionResult> Cadastrar([FromBody] UsuarioRequest req)
        {
            if (req == null)
                return BadRequest(new { message = "Dados inválidos" });

            var client = _supabase.Client;

            try
            {
                // Criar o usuário no Supabase Auth
                var authResponse = await client.Auth.SignUp(req.Email, req.Senha);

                if (authResponse.User == null)
                    return StatusCode(500, new { message = "Erro ao criar autenticação no Supabase" });

                var uid = authResponse.User.Id; // string UUID do Supabase Auth

                // Criar o registro na tabela "usuario"
                var usuario = new Usuario
                {
                    AuthUid = uid,
                    Nome = req.Nome,
                    Email = req.Email,
                    Senha = req.Senha,
                    Telefone = req.Telefone,
                    Sexo = req.Sexo,
                    TipoPermissao = "usuario",
                    UsuarioTipo = 0
                };

                var result = await client.From<Usuario>().Insert(usuario);

                var response = result.Models.Select(u => new UsuarioResponse
                {
                    Id = u.Id,
                    Nome = u.Nome,
                    Email = u.Email,
                    Telefone = u.Telefone,
                    Sexo = u.Sexo,
                    TipoPermissao = u.TipoPermissao,
                    UsuarioTipo = u.UsuarioTipo
                });

                return Ok(new { message = "Usuário cadastrado com sucesso!", data = response });
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("weak_password"))
                {
                    return BadRequest(new
                    {
                        message = "A senha é muito fraca. Use pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números."
                    });
                }

                return StatusCode(500, new { message = "Erro ao cadastrar usuário", error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLoginRequest req)
        {
            if (req == null || string.IsNullOrEmpty(req.Email) || string.IsNullOrEmpty(req.Senha))
                return BadRequest(new { message = "Email e senha são obrigatórios" });

            var client = _supabase.Client;

            try
            {
                // Autenticar no Supabase Auth
                var authResponse = await client.Auth.SignIn(req.Email, req.Senha);

                if (authResponse.User == null)
                    return Unauthorized(new { message = "Login e senha inválidos." });

                var uid = authResponse.User.Id;

                // Tentar buscar na tabela "usuario"
                var userResult = await client
                    .From<Usuario>()
                    .Where(u => u.AuthUid == uid)
                    .Get();

                var usuario = userResult.Models.FirstOrDefault();

                if (usuario != null)
                {
                    var response = new UsuarioResponse
                    {
                        Id = usuario.Id,
                        Nome = usuario.Nome,
                        Email = usuario.Email,
                        Telefone = usuario.Telefone,
                        Sexo = usuario.Sexo,
                        TipoPermissao = usuario.TipoPermissao,
                        UsuarioTipo = usuario.UsuarioTipo // 0 = doador
                    };

                    return Ok(new { message = "Login realizado com sucesso!", data = response });
                }

                // Se não encontrou, tentar buscar na tabela "PostoDeColeta"
                var postoResult = await client
                    .From<PostoDeColeta>()
                    .Where(p => p.AuthUid == uid)
                    .Get();

                var posto = postoResult.Models.FirstOrDefault();

                if (posto != null)
                {
                    var response = new UsuarioResponse
                    {
                        Id = posto.Id,
                        Nome = posto.Nome,
                        Email = posto.Email,
                        Telefone = posto.Contato, // coluna "contato"
                        TipoPermissao = posto.TipoPermissao, // se existir
                        UsuarioTipo = 1 // 1 = posto de coleta
                    };

                    return Ok(new { message = "Login realizado com sucesso!", data = response });
                }

                return NotFound(new { message = "Usuário ou posto de coleta não encontrado" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao realizar login", error = ex.Message });
            }
        }

    }
}
