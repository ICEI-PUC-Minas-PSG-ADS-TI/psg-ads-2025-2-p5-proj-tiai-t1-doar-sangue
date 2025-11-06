using DoarSangue.Api.DTOs;
using DoarSangue.Api.DTOs.UsuarioDTOs;
using DoarSangue.Api.Models;
using DoarSangue.Api.Services;
using Microsoft.AspNetCore.Mvc;

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

            var usuario = new Usuario
            {
                Nome = req.Nome,
                Email = req.Email,
                Senha = req.Senha,
                TipoPermissao = "usuario",
                UsuarioTipo = 0
            };

            try
            {
                var result = await client
                     .From<Usuario>()
                     .Insert(new List<Usuario> { usuario });

                var response = result.Models.Select(u => new UsuarioResponse
                {
                    Id = u.Id,
                    Nome = u.Nome,
                    Email = u.Email,
                    TipoPermissao = u.TipoPermissao,
                    UsuarioTipo = u.UsuarioTipo
                });

                return Ok(new { message = "Usuário cadastrado!", data = response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao cadastrar usuário", error = ex.Message });
            }
        }
    }
}
