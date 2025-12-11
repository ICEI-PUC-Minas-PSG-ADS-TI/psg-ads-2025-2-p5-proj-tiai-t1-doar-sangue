using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using System;

namespace DoarSangue.Api.Models
{
    [Table("usuario_restricoes")]
    public class UsuarioRestricao : BaseModel
    {
        // Id como UUID no banco — não identity
        [PrimaryKey("id", false)]
        public Guid? Id { get; set; }

        [Column("usuario_id")]
        public Guid UsuarioId { get; set; }

        [Column("tipo")]
        public string Tipo { get; set; } = string.Empty;

        [Column("descricao")]
        public string Descricao { get; set; } = string.Empty;

        [Column("permanente")]
        public bool Permanente { get; set; } = false;

        [Column("data_registro")]
        public DateTime DataRegistro { get; set; } = DateTime.UtcNow;
    }
}
