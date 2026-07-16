using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Domain.Entities
{
    public class CostCode
    {
        public int Id { get; set; }

        public string CostCodeNo { get; set; }

        public string CostCodeName { get; set; }

        public string Description { get; set; }

        public string IsActive { get; set; }
    }
}
