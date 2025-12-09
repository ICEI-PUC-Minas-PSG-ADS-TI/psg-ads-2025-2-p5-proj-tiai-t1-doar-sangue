namespace DoarSangue.Api.DTOs
{
    public class UsuarioResponse
    {
        public long? Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string TipoPermissao { get; set; }
        public int UsuarioTipo { get; set; }
        public string Telefone { get; set; }
        public string Sexo { get; set; }
    }
}
