using Inventory.Application.Interface;
using Inventory.Domain.Entities;
using Inventory.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Persistence.Repositories
{
    public class ItemDocumentRepository : IItemDocumentRepository
    {
        private readonly AppDbContext _context;

        public ItemDocumentRepository(AppDbContext context)
        {
            _context = context;
        }

        //public async Task AddRangeAsync(List<ItemDocument> documents)
        //    {
        //        await _context.ItemDocument.AddRangeAsync(documents);
        //        await _context.SaveChangesAsync();
        //    }

        public async Task AddRangeAsync(List<ItemDocument> documents)
        {
            if (documents == null || !documents.Any())
                throw new Exception("Documents list is empty");


            foreach (var doc in documents)
            {
                if (doc == null)
                    continue;

                doc.Name = doc.Name ?? "";
                doc.DocumentPath = doc.DocumentPath ?? "";
            }

            await _context.ItemDocuments.AddRangeAsync(documents);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ItemDocument>> GetByItemIdAsync(int itemId)
        {
            return await _context.ItemDocuments
                .Where(x => x.ItemId == itemId && x.IsDelete != "D")
                .ToListAsync();
        }

        public async Task<ItemDocument> GetByIdAsync(int id)
        {
            return await _context.ItemDocuments.FindAsync(id);
        }


        public async Task UpdateAsync(ItemDocument item)
        {
            _context.ItemDocuments.Update(item);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRangeAsync(List<ItemDocument> items)
        {
            _context.ItemDocuments.UpdateRange(items);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {

            var item = await _context.ItemDocuments
                .FirstOrDefaultAsync(x => x.Id == id);

            if (item == null)
            {
                return false;
            }

            item.IsDelete = "P";

            _context.ItemDocuments.Update(item);

            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<List<ItemDocument>> GetAllAsync()
        {
            return await _context.ItemDocuments.ToListAsync();
        }
    }
}