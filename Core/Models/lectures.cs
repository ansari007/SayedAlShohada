using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Models
{
    public class Lectures
    {
        [Key]
        public int Id { get; set; }
        public int Vstatus { get; set; }
        public string Vtitle { get; set; }

        public string Vdescription { get; set; }

        public string Vlocation { get; set; }


        public DateTime Date { get; set; }
    }
}