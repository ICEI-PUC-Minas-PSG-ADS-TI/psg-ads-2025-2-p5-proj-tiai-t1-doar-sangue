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
        private readonly ILogger<UsuarioController> _logger;

        public UsuarioController(SupabaseService supabase, ILogger<UsuarioController> logger)
        {
            _supabase = supabase;
            _logger = logger;
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

                return Ok(new
                {
                    message = "Usuário cadastrado com sucesso!",
                    uid = authResponse.User.Id
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao cadastrar usuário");

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
                var authResponse = await client.Auth.SignIn(req.Email, req.Senha);

                if (authResponse.User == null)
                    return Unauthorized(new { message = "Login ou senha inválidos" });

                var uid = authResponse.User.Id;

                // Buscar na tabela usuario
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

                // Buscar em PostoDeColeta
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
                _logger.LogError(ex, "Erro ao realizar login");
                return StatusCode(500, new { message = "Erro ao realizar login", error = ex.Message });
            }
        }

        // ===================== BUSCAR POR ID =====================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuarioById(string id)
        {
            var client = _supabase.Client;

            try
            {
                var result = await client
                    .From<Usuario>()
                    .Where(u => u.Id == id)
                    .Get();

                var usuario = result.Models.FirstOrDefault();

                if (usuario == null)
                    return NotFound(new { message = "Usuário não encontrado" });

                var response = new UsuarioResponse
                {
                    Id = usuario.Id,
                    Nome = usuario.Nome,
                    Email = usuario.Email,
                    Telefone = usuario.Telefone,
                    Sexo = usuario.Sexo,
                    UsuarioTipo = usuario.UsuarioTipo,
                    TipoPermissao = usuario.TipoPermissao
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar usuário");
                return StatusCode(500, new { message = "Erro ao buscar usuário", error = ex.Message });
            }
        }

        // ===================== ATUALIZAR PERFIL =====================
        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarPerfil(string id, [FromBody] UsuarioUpdateRequest req)
        {
            if (req == null)
                return BadRequest(new { message = "Dados inválidos" });

            var client = _supabase.Client;

            try
            {
                // Buscar usuário atual
                var result = await client
                    .From<Usuario>()
                    .Where(u => u.Id == id)
                    .Get();

                var usuario = result.Models.FirstOrDefault();

                if (usuario == null)
                    return NotFound(new { message = "Usuário não encontrado" });

                // Atualizar apenas os campos fornecidos
                if (!string.IsNullOrWhiteSpace(req.Nome))
                    usuario.Nome = req.Nome;

                if (req.Telefone != null)
                    usuario.Telefone = req.Telefone;

                if (req.Sexo != null)
                    usuario.Sexo = req.Sexo;

                // Atualizar no banco
                await client
                    .From<Usuario>()
                    .Where(u => u.Id == id)
                    .Update(usuario);

                _logger.LogInformation($"Perfil atualizado: {id}");

                return Ok(new { message = "Perfil atualizado com sucesso!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar perfil");
                return StatusCode(500, new { message = "Erro ao atualizar perfil", error = ex.Message });
            }
        }


        [HttpPost("solicitar-redefinir-senha")]
        public async Task<IActionResult> SolicitarRedefinirSenha([FromBody] SolicitarRedefinirSenhaRequest req)
        {
            if (req == null || string.IsNullOrWhiteSpace(req.Email))
            {
                return BadRequest(new { message = "Email é obrigatório" });
            }

            try
            {
                var client = _supabase.Client;

                // Enviar email de redefinição de senha
                await client.Auth.ResetPasswordForEmail(req.Email);

                _logger.LogInformation($"Email de redefinição enviado para: {req.Email}");

                return Ok(new { message = "Email de redefinição enviado com sucesso!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao enviar email de redefinição");
                return StatusCode(500, new { message = "Erro ao enviar email", error = ex.Message });
            }
        }

        // ===================== EXCLUIR CONTA =====================
        [HttpDelete("{id}")]
        public async Task<IActionResult> ExcluirConta(string id)
        {
            var client = _supabase.Client;

            try
            {
                // Verificar se o usuário existe
                var result = await client
                    .From<Usuario>()
                    .Where(u => u.Id == id)
                    .Get();

                var usuario = result.Models.FirstOrDefault();

                if (usuario == null)
                    return NotFound(new { message = "Usuário não encontrado" });

                // Deletar da tabela usuario
                await client
                    .From<Usuario>()
                    .Where(u => u.Id == id)
                    .Delete();

                _logger.LogInformation($"Conta excluída: {id}");

                return Ok(new { message = "Conta excluída com sucesso!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao excluir conta");
                return StatusCode(500, new { message = "Erro ao excluir conta", error = ex.Message });
            }
        }
    }
}