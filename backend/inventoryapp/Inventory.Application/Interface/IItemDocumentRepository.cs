using Inventory.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Application.Interface
{
    public interface IItemDocumentRepository
    {
        Task AddRangeAsync(List<ItemDocument> documents);
        Task<List<ItemDocument>> GetByItemIdAsync(int itemId);

 
        //Task UpdateAsync(ItemDocument itemDocument);

        //Task<List<ItemDocument>> GetByItemIdAsync(int itemId);
        Task UpdateRangeAsync(List<ItemDocument> items);

        Task<bool> DeleteAsync(int id);

        Task<List<ItemDocument>> GetAllAsync();

    }
}
