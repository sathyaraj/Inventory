using Inventory.Application.Interface;
using Inventory.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Inventory.Application.Servies
{
    public class VendorItemsService
    {
        private readonly IVendorItemsRepository _repo;

        public VendorItemsService(IVendorItemsRepository repo)
        {
            _repo = repo;
        }

        public async Task AddVendor(VendorItem vendor)
        {
            await _repo.Add(vendor);
        }

        public async Task<List<VendorItem>> GetAll()
        {
            return await _repo.GetAll();
        }

        //public async Task<VendorItem> GetById(int id)
        //{
        //    return await _repo.GetById(id);
        //}

        public async Task<List<VendorItem>> GetById(int id)
        {
            return await _repo.GetById(id);
        }

        public async Task UpdateVendor(VendorItem vendor)
        {
            await _repo.Update(vendor);
        }

        //public async Task DeleteVendor(int id)
        //{
        //    await _repo.Delete(id);
        //}

        public async Task<bool> DeleteItem(int id)
        {
            return await _repo.DeleteAsync(id); // clean
        }


        public async Task UpdateStatusAsync(int itemId, bool status)
        {
            var items = await _repo.GetByItemIdonlyAsync(itemId);

            if (items == null || !items.Any())
            {
                throw new Exception("No records found");
            }

            foreach (var item in items)
            {
                Console.WriteLine(status);
                Console.WriteLine(itemId);
                item.Status = status;

                if (item.IsDelete == "P")
                {
                    item.IsDelete = "D";
                }
            }

            await _repo.UpdateRangeAsync(items);
        }

        public async Task<List<VendorItem>> GetByItemIdAsync(int itemId, string type)
        {
            
            return await _repo.GetByItemIdAsync(itemId,type);

        }
    }
}
