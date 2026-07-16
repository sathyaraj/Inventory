using Inventory.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Application.Interface
{
    public interface IStoreroomRepository
    {
        Task<List<Storeroom>> GetAllAsync();
        Task<Storeroom?> GetByIdAsync(int id);
        Task<Storeroom> SaveAsync(Storeroom entity);
        Task<bool> DeleteAsync(int id);
    }
}
