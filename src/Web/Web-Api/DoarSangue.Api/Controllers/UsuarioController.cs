using DoarSangue.Api.DTOs;
using DoarSangue.Api.DTOs.UsuarioDTOs;
using DoarSangue.Api.Models;
using DoarSangue.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Supabase.Gotrue;

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

        // ===================== CADASTRO =====================
        [HttpPost]
        public async Task<IActionResult> Cadastrar([FromBody] UsuarioRequest req)
        {
            if (req == null ||
                string.IsNullOrWhiteSpace(req.Nome) ||
                string.IsNullOrWhiteSpace(req.Email) ||
                string.IsNullOrWhiteSpace(req.Senha))
            {
                return BadRequest(new { message = "Nome, Email e Senha são obrigatórios" });
            }

            var client = _supabase.Client;

            try
            {
                // Criar usuário no Supabase Auth
                // O TRIGGER vai cuidar de inserir na tabela 'usuario' automaticamente
                var authResponse = await client.Auth.SignUp(
                    req.Email,
                    req.Senha,
                    options: new SignUpOptions
                    {
                        Data = new Dictionary<string, object>
                        {
                            { "nome", req.Nome },
                            { "telefone", req.Telefone ?? "" },
                            { "sexo", req.Sexo ?? "" },
                            { "role", "doador" }
                        }
                    }
                );

                if (authResponse.User == null)
                    return StatusCode(500, new { message = "Erro ao criar autenticação no Supabase" });

                var uid = authResponse.User.Id;

                return Ok(new
                {
                    message = "Usuário cadastrado com sucesso!",
                    uid = uid
                });
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

        // ===================== LOGIN =====================
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLoginRequest req)
        {
            if (req == null || string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Senha))
                return BadRequest(new { message = "Email e senha são obrigatórios" });

            var client = _supabase.Client;

            try
            {
                // Autenticar no Supabase Auth
                var authResponse = await client.Auth.SignIn(req.Email, req.Senha);

                if (authResponse.User == null)
                    return Unauthorized(new { message = "Login ou senha inválidos" });

                var uid = authResponse.User.Id;

                // Buscar o usuário pelo UID na tabela usuario
                var userResult = await client
                    .From<Usuario>()
                    .Where(u => u.Id == uid)
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
                        UsuarioTipo = usuario.UsuarioTipo
                    };

                    return Ok(new { message = "Login realizado com sucesso!", data = response });
                }

                // Se não encontrou na tabela usuario, buscar em PostoDeColeta
                var postoResult = await client
                    .From<PostoDeColeta>()
                    .Where(p => p.Id == uid)
                    .Get();

                var posto = postoResult.Models.FirstOrDefault();

                if (posto != null)
                {
                    var response = new UsuarioResponse
                    {
                        Id = posto.Id,
                        Nome = posto.Nome,
                        Email = posto.Email,
                        Telefone = posto.Contato,
                        TipoPermissao = posto.TipoPermissao,
                        UsuarioTipo = 1
                    };

                    return Ok(new { message = "Login realizado com sucesso!", data = response });
                }

                return NotFound(new { message = "Usuário não encontrado na base de dados" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao realizar login", error = ex.Message });
            }
        }
    }
}