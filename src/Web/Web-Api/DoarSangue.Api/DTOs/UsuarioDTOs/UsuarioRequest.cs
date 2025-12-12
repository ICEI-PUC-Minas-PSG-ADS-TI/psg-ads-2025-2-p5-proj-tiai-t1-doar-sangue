using System.Text.Json.Serialization;

namespace DoarSangue.Api.DTOs.UsuarioDTOs
{
    public class UsuarioRequest
    {
        [JsonPropertyName("nome")]
        public string Nome { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("senha")]
        public string Senha { get; set; }

        [JsonPropertyName("telefone")]
        public string Telefone { get; set; }

        [JsonPropertyName("sexo")]
        public string Sexo { get; set; }
    }
}
