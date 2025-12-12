using DoarSangue.Api.Models;
using DoarSangue.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace DoarSangue.Api.Controllers
{
    [ApiController]
    [Route("api/usuario/{usuarioId}/restricoes")]
    public class UsuarioRestricoesController : ControllerBase
    {
        private readonly SupabaseService _supabase;

        public UsuarioRestricoesController(SupabaseService supabase)
        {
            _supabase = supabase;
        }

        [HttpGet]
        public async Task<IActionResult> GetRestricoes(Guid usuarioId)
        {
            var client = _supabase.Client;

            var result = await client
                .From<UsuarioRestricao>()
                .Where(r => r.UsuarioId == usuarioId)
                .Get();

            return Ok(result.Models);
        }

        [HttpPost]
        public async Task<IActionResult> CriarRestricao(Guid usuarioId, [FromBody] UsuarioRestricao req)
        {
            req.UsuarioId = usuarioId;
            req.DataRegistro = DateTime.Now;

            var client = _supabase.Client;

            var result = await client.From<UsuarioRestricao>().Insert(req);

            return Ok(new { message = "Restrição criada", data = result.Models });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditarRestricao(Guid usuarioId, Guid id, [FromBody] UsuarioRestricao req)
        {
            req.Id = id;
            req.UsuarioId = usuarioId;

            var client = _supabase.Client;

            var result = await client.From<UsuarioRestricao>().Update(req);

            return Ok(new { message = "Restrição atualizada", data = result.Models });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoverRestricao(Guid usuarioId, Guid id)
        {
            var client = _supabase.Client;

            await client
                .From<UsuarioRestricao>()
                .Where(r => r.UsuarioId == usuarioId && r.Id == id)
                .Delete();

            return Ok(new { message = "Restrição removida" });
        }
    }
}
