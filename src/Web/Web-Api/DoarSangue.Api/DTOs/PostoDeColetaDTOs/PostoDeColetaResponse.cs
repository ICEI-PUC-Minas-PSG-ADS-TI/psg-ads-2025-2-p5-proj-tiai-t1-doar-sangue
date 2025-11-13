namespace DoarSangue.Api.DTOs.PostoDeColetaDTOs
{
    public class PostoDeColetaResponse
    {
        public long? Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Contato { get; set; } = string.Empty;
        public string Endereco { get; set; } = string.Empty;
        public string HorarioFuncionamento { get; set; } = string.Empty;
        public string Cnpj { get; set; } = string.Empty;
    }
}
