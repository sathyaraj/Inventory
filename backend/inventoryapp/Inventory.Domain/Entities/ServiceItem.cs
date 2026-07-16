using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Domain.Entities
{
    public class ServiceItem
    {
        public int Id { get; set; }

        public string ServiceCode { get; set; }
        public string ServiceName { get; set; }
        public string ServiceSet { get; set; }

        public string CommodityGroup { get; set; }
        public string CommodityCode { get; set; }
        public string Description { get; set; }

        public decimal ReceiptTolerance { get; set; }

        public string OrderUnit { get; set; }
        public string IssueUnit { get; set; }

        public bool TaxExempt { get; set; }

        public string Taxcode { get; set; }

        public string CostCenter { get; set; }

        public decimal MinimumServiceCost { get; set; }
        public decimal MaximumServiceCost { get; set; }

        public int LeadTimeDays { get; set; }

        public string Status { get; set; }

        public bool ActiveForPurchase { get; set; }
        public bool ActiveForWorkOrder { get; set; }
        public bool Prorate { get; set; }
        public bool InspectionRequired { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public int? UseId { get; set; }
    }
}
