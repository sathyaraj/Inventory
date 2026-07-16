using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Domain.Entities
{
    public class CommodityCode
    {
        public long Id { get; set; }

        public long CommodityGroupId { get; set; }

        public string Code { get; set; }

        public string Description { get; set; }

        public bool Status { get; set; } = true;

        public CommodityGroup? CommodityGroup { get; set; }
    }
}
