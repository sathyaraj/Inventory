using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Domain.Entities
{
    public class Storeroom
    {
        public int Id { get; set; }

        public string StoreroomCode { get; set; }
        public string StoreroomName { get; set; }
        public string Description { get; set; }

        public string Site { get; set; }
        public string Building { get; set; }
        public string Floor { get; set; }
        public string Location { get; set; }

        public string WarehouseType { get; set; }

        public string Address1 { get; set; }

        public string Address2 {  get; set; }
        public string Country { get; set; }
        
        public string State { get; set; }

        public string City { get; set; }

        public long postalcode { get; set; }

        public string ContactPerson { get; set; }
        public string ContactNumber { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }

        public string Department { get; set; }
        public string Supervisor { get; set; }
        public string IsActive { get; set; }

        //public string? CostCenter { get; set; }
        //public string? BudgetCode { get; set; }
        //public string? Currency { get; set; }

        //public decimal? StandardCost { get; set; }
        //public decimal? InventoryValue { get; set; }

        //public string? AccountingCode { get; set; }
        //public string? TaxGroup { get; set; }

        //public bool? IsMainStoreroom { get; set; }
        //public bool? AllowNegativeStock { get; set; }
        //public bool? AutoReorder { get; set; }
        //public string? Remarks { get; set; }
    }
}
