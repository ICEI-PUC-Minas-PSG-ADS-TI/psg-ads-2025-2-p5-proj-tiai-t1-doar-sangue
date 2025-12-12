using Microsoft.AspNetCore.Mvc;
using DoarSangue.Api.DTOs.CampanhaDTOs;
using DoarSangue.Api.Models; 
using DoarSangue.Api.Services; 
using System;
using System.Threading.Tasks;
using System.Linq; // Necessário para usar .Select() e .ToList()

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

        // -----------------------------------------------------------
        // 1. MÉTODO: Listar Campanhas (GET)
        // Usa o DTO de Resposta para evitar erros de serialização do Supabase SDK
        // -----------------------------------------------------------
        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var client = _supabase.Client;
            
            if (client == null)
                return StatusCode(500, new { message = "Erro de configuração do Supabase: Cliente não inicializado." });

            try
            {
                // Busca todas as campanhas no Supabase
                var result = await client
                    .From<Campanha>()
                    .Get();

                // Mapeamento: Converte o Modelo de Domínio (Campanha) para o DTO de Resposta
                // 
                var campanhasResponse = result.Models.Select(c => new CampanhaResponseDTO
                {
                    Id = c.Id,
                    Nome = c.Nome,
                    Status = c.Status,
                    DataInicio = c.DataInicio,
                    MetaDoadores = c.MetaDoadores,
                    Cidade = c.Cidade,
                    Estado = c.Estado
                    // Adicione aqui outros campos que você precisa no Angular
                }).ToList();

                // Retorna a lista de DTOs simples (sem metadados do Supabase) com status 200 OK
                return Ok(campanhasResponse);
            }
            catch (Exception ex)
            {
                // Loga o erro exato no console da API para diagnóstico futuro
                Console.WriteLine($"ERRO AO BUSCAR CAMPANHAS: {ex}");
                
                // Retorna uma mensagem de erro genérica para o frontend
                return StatusCode(500, new { message = "Erro interno ao buscar campanhas. Verifique o console da API." });
            }
        }

        // -----------------------------------------------------------
        // 2. MÉTODO: Cadastrar Campanha (POST)
        // -----------------------------------------------------------
        [HttpPost]
        public async Task<IActionResult> Cadastrar([FromBody] CampanhaRequestDTO req)
        {
            // Validação de campos Required do DTO
            if (!ModelState.IsValid || req == null)
                return BadRequest(new { message = "Dados inválidos. Verifique os campos obrigatórios." });

            var client = _supabase.Client; 

            // Verificação de segurança: Se a conexão falhou, avisa antes de tentar inserir
            if (client == null)
                return StatusCode(500, new { message = "Erro de configuração do Supabase: Cliente não inicializado." });

            // **ATENÇÃO:** ID FIXO APENAS PARA TESTES. EM PRODUÇÃO USE O ID DO USUÁRIO LOGADO.
            var instituicaoIdFixo = Guid.Parse("00000000-0000-0000-0000-000000000001"); 

            try
            {
                // Mapeamento DTO -> Modelo de Domínio
                var campanha = new Campanha
                {
                    Id = Guid.NewGuid(),
                    Nome = req.Nome,
                    Descricao = req.Descricao,
                    
                    // Converte string para DateTime
                    DataInicio = DateTime.Parse(req.DataInicio), 
                    DataFim = string.IsNullOrEmpty(req.DataFim) ? (DateTime?)null : DateTime.Parse(req.DataFim), 
                    
                    // Garante 0 se nulo
                    MetaDoadores = req.MetaDoadores.GetValueOrDefault(0), 
                    
                    Cidade = req.Cidade,
                    Estado = req.Estado,
                    Status = "Ativo",
                    InstituicaoId = instituicaoIdFixo
                };

                // Insere no Supabase
                var result = await client.From<Campanha>().Insert(campanha);
                
                // Retorna 201 Created
                return CreatedAtAction(nameof(Cadastrar), new { id = campanha.Id }, new { message = "Campanha criada com sucesso!" });
            }
            catch (FormatException)
            {
                 return BadRequest(new { message = "Formato de data inválido. As datas devem seguir o formato AAAA-MM-DD." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao criar campanha no servidor. Verifique o console da API.", error = ex.Message });
            }
        }
    }
}