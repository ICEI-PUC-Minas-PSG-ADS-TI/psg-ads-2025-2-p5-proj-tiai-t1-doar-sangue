namespace DoarSangue.Api.DTOs.UsuarioDTOs
{
    public class AlterarSenhaRequest
    {
        public string SenhaAtual { get; set; } = string.Empty;
        public string SenhaNova { get; set; } = string.Empty;
    }

    public class SolicitarRedefinirSenhaRequest
    {
        public string Email { get; set; } = string.Empty;
    }
}
