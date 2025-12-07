using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using System;

namespace DoarSangue.Api.Models
{
    [Table("usuario")]
    public class Usuario : BaseModel
    {
        [PrimaryKey("id", false)]
        public long? Id { get; set; }

        [Column("auth_uid")]
        public string AuthUid { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("senha")]
        public string Senha { get; set; }

        [Column("telefone")]
        public string Telefone { get; set; }

        [Column("sexo")]
        public string Sexo { get; set; }

        [Column("tipopermissao")]
        public string TipoPermissao { get; set; }

        [Column("usuario_tipo")]
        public int UsuarioTipo { get; set; }

        [Column("fk_historicodoacao_id")]
        public double? HistoricoId { get; set; }

        [Column("fk_agendamento_id")]
        public double? AgendamentoId { get; set; }
    }
}
