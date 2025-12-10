using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;


namespace DoarSangue.Api.Models
{
    [Table("campanha")] // Nome da tabela no seu banco de dados Supabase
    public class Campanha : BaseModel
    {
        [PrimaryKey("id", false)] // Chave primária (Guid)
        public Guid Id { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

        [Column("descricao")]
        public string? Descricao { get; set; }

        [Column("data_inicio")]
        public DateTime DataInicio { get; set; }

        [Column("data_fim")]
        public DateTime? DataFim { get; set; }

        [Column("meta_doadores")]
        public int MetaDoadores { get; set; } // O DTO garante que será 0 se vier nulo

        [Column("cidade")]
        public string? Cidade { get; set; }

        [Column("estado")]
        public string? Estado { get; set; }
        
        [Column("status")]
        public string Status { get; set; } = "Ativo"; // Valor padrão para novas campanhas

        // Chave estrangeira para a Instituição que criou a campanha (Ajuste o nome da coluna conforme seu DB)
        [Column("instituicao_id")]
        public Guid InstituicaoId { get; set; } 
    }
}