using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Domain.Entities
{
    public class CommodityGroup
    {
        public long Id { get; set; }

        public string Commoditygroup { get; set; }

        public string Description { get; set; }

        public bool Status { get; set; } = true;

        public DateTime CreatedDate { get; set; }

        public ICollection<CommodityCode> CommodityCodes { get; set; }
            = new List<CommodityCode>();
    }
}
