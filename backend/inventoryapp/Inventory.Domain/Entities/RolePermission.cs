using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Inventory.Domain.Entities
{
    public class RolePermission
    {
        public int Id { get; set; }

        public int RoleId { get; set; }

        public string Module { get; set; }

        public bool Create { get; set; }
            
        public bool Read { get; set; }

        public bool Update { get; set; }

        public bool Delete { get; set; }

        public bool Approve { get; set; }

        [JsonIgnore]
        public Role? Role { get; set; }
    }
}
