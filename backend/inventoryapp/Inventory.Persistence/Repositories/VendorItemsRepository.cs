using Inventory.Application.Interface;
using Inventory.Domain.Entities;
using Inventory.Persistence.Context;
using Inventory.Persistence.Migrations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Inventory.Persistence.Repositories
{
    public class VendorItemsRepository: IVendorItemsRepository
    {
        private readonly AppDbContext _context;

        public VendorItemsRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task Add(VendorItem vendor)
        {
            await _context.VendorItems.AddAsync(vendor);
            await _context.SaveChangesAsync();
        }

        public async Task<List<VendorItem>> GetAll()
        {
            return await _context.VendorItems.ToListAsync();
        }

        public async Task<List<VendorItem>> GetById(int itemId)
        {
            return await _context.VendorItems
                .Where(x => x.ItemId == itemId)
                .ToListAsync();
        }

        // public async Task<VendorItem> GetById(int itemId)
        // {

        //     return await _context.VendorItems
        //.FirstOrDefaultAsync(x => x.ItemId == itemId);
        // }

        public async Task Update(VendorItem vendor)
        {
            _context.VendorItems.Update(vendor);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {

            var item = await _context.VendorItems
                .FirstOrDefaultAsync(x => x.Id == id);

            if (item == null)
            {
                return false;
            }

            item.IsDelete = "P";

            _context.VendorItems.Update(item);

            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        //public async Task Delete(int id)
        //{
        //    var data = await _context.VendorItems.FindAsync(id);
        //    if (data != null)
        //    {
        //        _context.VendorItems.Remove(data);
        //        await _context.SaveChangesAsync();
        //    }
        //}

        public async Task<List<VendorItem>> GetByItemIdAsync(int itemId,string type)
        {

            var data = await _context.VendorItems
                .Where(x => x.ItemId == itemId &&
                            x.Status == true &&
                            x.Type == type && x.IsDelete != "D")
                .ToListAsync();


            return data;

        }

        public async Task<List<VendorItem>> GetByItemIdonlyAsync(int itemId)
        {
            return await _context.VendorItems
                .Where(x => x.ItemId == itemId)
                .ToListAsync();
        }

        public async Task UpdateRangeAsync(List<VendorItem> vendorItems)
        {
            _context.VendorItems.UpdateRange(vendorItems);

            await _context.SaveChangesAsync();
        }



    }
}
