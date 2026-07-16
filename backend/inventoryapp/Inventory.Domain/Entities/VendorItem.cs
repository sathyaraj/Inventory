using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Domain.Entities
{
    public class VendorItem
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public string? Pono { get; set; }

        public string? CompanyName { get; set; }

        public int? Invoiceno { get; set; }
        public int? leadtimedelay { get; set; }

        public bool? taxexempt { get; set; }

        public bool Status { get; set; } = false; // Active / Inactive

        public string? Type { get; set; }
        public string IsDelete { get; set; } = "A";
        public int? UseId { get; set; }
        public DateTime CreateTime { get; set; } = DateTime.Now;
    }
}
