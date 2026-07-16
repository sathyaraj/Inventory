using Inventory.Application.Interface;
using Inventory.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Application.Services
{
    public class StoreroomCreateService
    {
        private readonly IStoreroomRepository _repository;

        public StoreroomCreateService(
            IStoreroomRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Storeroom>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Storeroom?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Storeroom> SaveAsync(
            Storeroom entity)
        {
            return await _repository.SaveAsync(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}
