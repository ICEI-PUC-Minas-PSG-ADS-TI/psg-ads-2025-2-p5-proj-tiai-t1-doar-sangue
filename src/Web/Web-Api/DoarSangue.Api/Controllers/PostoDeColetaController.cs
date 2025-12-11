using DoarSangue.Api.DTOs.PostoDeColetaDTOs;
using DoarSangue.Api.Models;
using DoarSangue.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace DoarSangue.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostoDeColetaController : ControllerBase
    {
        private readonly SupabaseService _supabase;

        public PostoDeColetaController(SupabaseService supabase)
        {
            _supabase = supabase;
        }

        [HttpPost]
        public async Task<IActionResult> Cadastrar([FromBody] PostoDeColetaRequest req)
        {
            if (req == null)
                return BadRequest(new { message = "Dados inválidos" });

            var client = _supabase.Client;

            try
            {
                // Cria conta no Supabase Auth
                var authResponse = await client.Auth.SignUp(req.Email, req.Senha);

                if (authResponse.User == null)
                    return StatusCode(500, new { message = "Erro ao criar autenticação no Supabase" });

                // Cria registro no banco
                var posto = new PostoDeColeta
                {
                    Nome = req.Nome,
                    Email = req.Email,
                    Senha = req.Senha,
                    Contato = req.Contato,
                    Endereco = req.Endereco,
                    HorarioFuncionamento = req.HorarioFuncionamento,
                    Cnpj = req.Cnpj,
                    TipoPermissao = "posto"
                };

                var result = await client.From<PostoDeColeta>().Insert(posto);

                var response = result.Models.Select(p => new PostoDeColetaResponse
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Email = p.Email,
                    Contato = p.Contato,
                    Endereco = p.Endereco,
                    HorarioFuncionamento = p.HorarioFuncionamento,
                    Cnpj = p.Cnpj
                });

                return Ok(new { message = "Posto cadastrado com sucesso!", data = response });
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("weak_password"))
                    return BadRequest(new { message = "A senha é muito fraca. Use pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números." });

                return StatusCode(500, new { message = "Erro ao cadastrar posto", error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] PostoDeColetaLoginRequest req)
        {
            if (req == null || string.IsNullOrEmpty(req.Email) || string.IsNullOrEmpty(req.Senha))
                return BadRequest(new { message = "Email e senha são obrigatórios" });

            var client = _supabase.Client;

            try
            {
                var authResponse = await client.Auth.SignIn(req.Email, req.Senha);

                if (authResponse.User == null)
                    return Unauthorized(new { message = "Login inválido" });

                var uid = authResponse.User.Id;

                var result = await client
                    .From<PostoDeColeta>()
                    .Where(p => p.Id == uid)
                    .Get();

                var posto = result.Models.FirstOrDefault();

                if (posto == null)
                    return NotFound(new { message = "Posto não encontrado" });

                var response = new PostoDeColetaResponse
                {
                    Id = posto.Id,
                    Nome = posto.Nome,
                    Email = posto.Email,
                    Contato = posto.Contato,
                    Endereco = posto.Endereco,
                    HorarioFuncionamento = posto.HorarioFuncionamento,
                    Cnpj = posto.Cnpj
                };

                return Ok(new { message = "Login realizado com sucesso!", data = response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao realizar login", error = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetPostos()
        {
            var client = _supabase.Client;

            try
            {
                var result = await client
                    .From<PostoDeColeta>()
                    .Get();

                var response = result.Models.Select(p => new PostoDeColetaResponse
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Email = p.Email,
                    Contato = p.Contato,
                    Endereco = p.Endereco,
                    HorarioFuncionamento = p.HorarioFuncionamento,
                    Cnpj = p.Cnpj
                }).ToList();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar postos", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostoById(string id)
        {
            var client = _supabase.Client;

            try
            {
                var result = await client
                    .From<PostoDeColeta>()
                    .Where(p => p.Id == id)
                    .Get();

                var posto = result.Models.FirstOrDefault();

                if (posto == null)
                    return NotFound(new { message = "Posto não encontrado" });

                var response = new PostoDeColetaResponse
                {
                    Id = posto.Id,
                    Nome = posto.Nome,
                    Email = posto.Email,
                    Contato = posto.Contato,
                    Endereco = posto.Endereco,
                    HorarioFuncionamento = posto.HorarioFuncionamento,
                    Cnpj = posto.Cnpj
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar posto", error = ex.Message });
            }
        }
    }
}
