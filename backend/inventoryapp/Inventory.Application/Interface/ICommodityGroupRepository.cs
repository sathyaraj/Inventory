using Inventory.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Application.Interface
{
    public interface ICommodityGroupRepository
    {
        Task<long> SaveAsync(CommodityGroup entity);

        Task<List<CommodityGroup>> GetAllAsync();

        Task<CommodityGroup> GetByIdAsync(long id);

        Task<bool> DeleteAsync(long id);

        Task<List<CommodityCode>> GetCodesByGroupIdAsync(long groupId);
    }
}
