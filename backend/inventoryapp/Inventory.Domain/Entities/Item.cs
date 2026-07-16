using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Inventory.Domain.Entities
{
    public class Item
    {
        public int Id { get; set; }

        public string? ItemCode { get; set; }
        public string? Name { get; set; }
        public string? ItemSet { get; set; }

        public string? Status { get; set; }

        public string? CommodityGroup { get; set; }
        public string? CommodityGroupDesc { get; set; }
        public string? CommodityCode { get; set; }
        public string? CommodityCodeDesc { get; set; }

        public bool? IsRotating { get; set; }
        public string? LotType { get; set; }
        public decimal? ReceiptTolerance { get; set; }

        public string? Meter { get; set; }
        public string? MeterDesc { get; set; }

        public string? MeterGroup { get; set; }
        public string? MeterGroupDesc { get; set; }

        public decimal? Qty { get; set; }

        public string? Model { get; set; }

        public string? SerialNo { get; set; }

        public string? Manufacturer { get; set; }

        public DateTime? ManufactureDate { get; set; }

        public int? Period { get; set; }

        public DateTime? WarEndDate { get; set; }

        public string? OrderUnit { get; set; }
        
        public string? IssueUnit { get; set; }

        public string? Msds { get; set; }
        public string? Image { get; set; }

        public bool? ConditionEnabled { get; set; }
        public bool? IsKit { get; set; }
        public bool? IsCapitalized { get; set; }

        public bool? InspectOnReceipt { get; set; }
        public bool? IsSparePart { get; set; }
        public bool? AttachToAsset { get; set; }

        public bool? TaxExempt { get; set; }

        /* Inventory Control */
        public decimal? MinimumStock { get; set; }
        public decimal? MaximumStock { get; set; }

        public decimal? ReorderLevel { get; set; }
        public decimal? ReorderQuantity { get; set; }

        public decimal? SafetyStock { get; set; }
        public int? LeadTime { get; set; }

        public decimal? currentStock { get; set; }
        public decimal? totalStock { get; set; }
        public string? OverallRemarks { get; set; }

        /* Units & Conversion */

        public decimal? OrderUnitCost { get; set; }

        public decimal? IssueUnitCost { get; set; }

        public decimal? Conversion { get; set; }
        public decimal? BaseQty { get; set; }


        /* Costing */
        public decimal? UnitCost { get; set; }
        public decimal? StandardCost { get; set; }

        public decimal? LastPurchaseCost { get; set; }
        public decimal? AverageCost { get; set; }

        public string? Currency { get; set; }

        public decimal? TaxPercent { get; set; }
        public decimal? DiscountPercent { get; set; }

        public decimal? FreightCost { get; set; }
        public decimal? LandedCost { get; set; }

        public decimal? ReorderCost { get; set; }

        public string? CostingMethod { get; set; }

        public string? stockreturn { get; set; }

        public string? returnreason { get; set; }

        public string? Itemstatus { get; set; } = "A";

        public DateTime? CreatedDate { get; set; }

        public bool ServiceItem {get; set;}

        public int? UseId { get; set; }

        public List<AlternatesItem>? Alternates { get; set; }
        public List<ItemCondition>? Conditions { get; set; }
        public List<StoreroomItem>? StoreroomItems { get; set; }

    }
}
