using System.ComponentModel.DataAnnotations;

namespace DoarSangue.Api.DTOs.CampanhaDTOs
{
    // Mapeia os campos do Angular: nome, descricao, dataInicio, dataFim, metaDoadores, cidade, estado
    public class CampanhaRequestDTO
    {
        [Required]
        public required string Nome { get; set; }
        
        public string? Descricao { get; set; }
        
        [Required]
        public required string DataInicio { get; set; } // Enviado como string do Angular
        
        public string? DataFim { get; set; } // Enviado como string do Angular

        
        public int? MetaDoadores { get; set; } 
        
        public string? Cidade { get; set; }
        public string? Estado { get; set; }
        
       
        public Guid? InstituicaoId { get; set; } 
    }
}