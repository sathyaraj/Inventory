using Inventory.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Application.Interface
{
    public interface IVendorItemsRepository
    {
        Task Add(VendorItem vendor);
        Task<List<VendorItem>> GetAll();
        Task<List<VendorItem>> GetById(int itemId);

        Task Update(VendorItem vendor);
        //Task Delete(int id);

        Task UpdateRangeAsync(List<VendorItem> vendorItems);

        Task<List<VendorItem>> GetByItemIdAsync(int itemId, string type);

        Task<List<VendorItem>> GetByItemIdonlyAsync(int itemId);

        Task<bool> DeleteAsync(int id);



    }
}
