using Inventory.Application.Interface;
using Inventory.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Application.Services
{
    public class ItemDocumentService
    {
        private readonly IItemDocumentRepository _repo;

        public ItemDocumentService(IItemDocumentRepository repo)
        {
            _repo = repo;
        }

        public async Task SaveAsync(int itemId, List<ItemDocument> documents)
        {
            foreach (var doc in documents)
            {
                doc.ItemId = itemId;
            }

            await _repo.AddRangeAsync(documents);
        }

        public async Task<List<ItemDocument>> GetByItemIdAsync(int itemId)
        {
            return await _repo.GetByItemIdAsync(itemId);
        }

        //public async Task UpdateStatusAsync(int id, bool status)
        //{
        //    var item = await _repo.GetByIdAsync(id);

        //    if (item == null)
        //        throw new Exception("Document not found");

        //    item.Status = status;

        //    await _repo.UpdateAsync(item);
        //}

        //public async Task UpdateStatusAsync(int itemId, bool status)
        //{
        //    var records = await _repo.ItemDocuments
        //        .Where(x => x.ItemId == itemId)
        //        .ToListAsync();

        //    if (records == null || !records.Any())
        //        return;

        //    foreach (var item in records)
        //    {
        //        item.Status = status;
        //    }

        //    await _context.SaveChangesAsync();
        //}

        public async Task UpdateStatusAsync(int itemId, string type)
        {
            var items = await _repo.GetByItemIdAsync(itemId);

            foreach (var item in items)
            {
                item.Status = true;

                if (item.IsDelete == "P")
                {
                    item.IsDelete = "D";
                }
            }

            await _repo.UpdateRangeAsync(items);
        }


        public async Task<bool> DeleteItem(int id)
        {
            return await _repo.DeleteAsync(id); // clean
        }


        public async Task<List<ItemDocument>> GetAllAsync()
        {
            return await _repo.GetAllAsync();
        }


    }
}
