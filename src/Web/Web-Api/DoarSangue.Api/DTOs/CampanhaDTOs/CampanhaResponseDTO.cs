// Arquivo: CampanhaResponseDTO.cs (Localizado em DTOs/CampanhaDTOs)
using System;

namespace DoarSangue.Api.DTOs.CampanhaDTOs 
{
    public class CampanhaResponseDTO
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Status { get; set; }
        public DateTime DataInicio { get; set; }
        public int MetaDoadores { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
    }
}