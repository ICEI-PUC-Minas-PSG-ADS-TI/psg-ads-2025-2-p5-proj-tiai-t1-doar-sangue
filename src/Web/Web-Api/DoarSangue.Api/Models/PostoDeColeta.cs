using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace DoarSangue.Api.Models
{
    [Table("postodecoleta")]
    public class PostoDeColeta : BaseModel
    {
        [PrimaryKey("id", false)]
        public string Id { get; set; }

        [Column("auth_uid")]
        public string AuthUid { get; set; } = string.Empty;

        [Column("nome")]
        public string Nome { get; set; } = string.Empty;

        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Column("contato")]
        public string Contato { get; set; } = string.Empty;

        [Column("endereco")]
        public string Endereco { get; set; } = string.Empty;

        [Column("horariofuncionamento")]
        public string HorarioFuncionamento { get; set; } = string.Empty;

        [Column("cnpj")]
        public string Cnpj { get; set; } = string.Empty;

        [Column("senha")]
        public string Senha { get; set; } = string.Empty;

        [Column("tipo_permissao")]
        public string TipoPermissao { get; set; } = "posto";

        [Column("fk_relatorio_id")]
        public long? FkRelatorioId { get; set; }

        [Column("fk_historicodoacao_id")]
        public long? FkHistoricoDoacaoId { get; set; }

        [Column("fk_agendamento_id")]
        public long? FkAgendamentoId { get; set; }
    }
}
