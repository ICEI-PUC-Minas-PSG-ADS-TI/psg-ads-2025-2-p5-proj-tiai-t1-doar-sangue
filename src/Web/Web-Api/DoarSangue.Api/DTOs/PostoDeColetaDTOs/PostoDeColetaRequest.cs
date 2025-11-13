namespace DoarSangue.Api.DTOs.PostoDeColetaDTOs
{
    public class PostoDeColetaRequest
    {
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string Contato { get; set; } = string.Empty;
        public string Endereco { get; set; } = string.Empty;
        public string HorarioFuncionamento { get; set; } = string.Empty;
        public string Cnpj { get; set; } = string.Empty;
    }
}
