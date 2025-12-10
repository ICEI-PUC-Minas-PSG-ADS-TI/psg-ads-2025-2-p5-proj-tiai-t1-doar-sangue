using Microsoft.AspNetCore.Mvc;
using DoarSangue.Api.DTOs.CampanhaDTOs;
using DoarSangue.Api.Models; 
using DoarSangue.Api.Services; 

namespace DoarSangue.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class CampanhaController : ControllerBase
    {
        private readonly SupabaseService _supabase;
        
        public CampanhaController(SupabaseService supabase)
        {
            _supabase = supabase;
        }

        [HttpPost]
        public async Task<IActionResult> Cadastrar([FromBody] CampanhaRequestDTO req)
        {
            // Validação de campos Required do DTO
            if (!ModelState.IsValid || req == null)
                return BadRequest(new { message = "Dados inválidos. Verifique os campos obrigatórios." });

            // **ATENÇÃO:** Para fins de teste, estou usando um ID FIXO para a Instituição.
            // EM PRODUÇÃO, esse ID deve vir do Token de autenticação do usuário logado!
            var instituicaoIdFixo = Guid.Parse("00000000-0000-0000-0000-000000000001"); 

            try
            {
                // 1. Mapeamento DTO -> Modelo de Domínio
                var campanha = new Campanha
                {
                    Id = Guid.NewGuid(),
                    Nome = req.Nome,
                    Descricao = req.Descricao,
                    
                    // Converte a string de data do Angular (ex: "2025-01-01") para DateTime
                    DataInicio = DateTime.Parse(req.DataInicio), 
                    DataFim = string.IsNullOrEmpty(req.DataFim) ? (DateTime?)null : DateTime.Parse(req.DataFim), 
                    
                    // Se metaDoadores vier null, usará 0
                    MetaDoadores = req.MetaDoadores.GetValueOrDefault(0), 
                    
                    Cidade = req.Cidade,
                    Estado = req.Estado,
                    Status = "Ativo",
                    InstituicaoId = instituicaoIdFixo // Usando o ID fixo/mockado
                };

                // 2. Insere o registro no Supabase
                var client = _supabase.Client; 
                var result = await client.From<Campanha>().Insert(campanha);
                
                // 3. Retorno de Sucesso (201 Created)
                return CreatedAtAction(nameof(Cadastrar), new { id = campanha.Id }, new { message = "Campanha criada com sucesso!" });
            }
            catch (FormatException)
            {
                 return BadRequest(new { message = "Formato de data inválido. As datas devem seguir o formato AAAA-MM-DD (ex: 2025-12-31)." });
            }
            catch (Exception ex)
            {
                // Erro de lógica, Supabase, ou DB
                return StatusCode(500, new { message = "Erro ao criar campanha no servidor. Verifique o console da API.", error = ex.Message });
            }
        }
    }
}