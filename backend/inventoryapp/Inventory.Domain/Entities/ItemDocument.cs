using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Domain.Entities
{
    public class ItemDocument
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public string Name { get; set; }
        public string DocumentPath { get; set; }

        public int? UseId { get; set; }

        public string? Type { get; set; }

        public bool Status { get; set; } = false; // Active / Inactive

        public string IsDelete { get; set; } = "A";
        public DateTime CreateTime { get; set; } = DateTime.Now;
    }
}
