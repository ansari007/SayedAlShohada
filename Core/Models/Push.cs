using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
   public class Push
    {
        public int Id { get; set; }
        public string Token { get; set; }

        public string Platform { get; set; }
        public string OsVersion { get; set; }
        public string AppVersion { get; set; }
        public string UdId { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
