using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TelefonskiImenik.Models
{
    [Table("BrojeviOsoba")]
    public class BrojeviOsoba
    {
        public int BrojeviOsobaId { get; set; }

        [Required]
        public int OsobaId { get; set; }

        public virtual Osoba Osoba{ get; set; }

        [Required]
        public int BrojTipId { get; set; }

        public virtual BrojTip BrojTip { get; set; }

        [Required]
        public string Broj { get; set; }

        public string Opis { get; set; }

    }
}