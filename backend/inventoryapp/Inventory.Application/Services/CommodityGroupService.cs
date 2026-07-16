using Inventory.Application.Interface;
using Inventory.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Application.Services
{
    public class CommodityGroupService
    {
        private readonly ICommodityGroupRepository _repository;

        public CommodityGroupService(
            ICommodityGroupRepository repository)
        {
            _repository = repository;
        }

        public async Task<long> SaveAsync(
            CommodityGroup entity)
        {
            return await _repository.SaveAsync(entity);
        }

        public async Task<List<CommodityGroup>>
            GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<CommodityGroup>
            GetByIdAsync(long id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<bool>
            DeleteAsync(long id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<List<CommodityCode>>GetCodesByGroupIdAsync(long groupId)
        {
            return await _repository.GetCodesByGroupIdAsync(groupId);
        }

        public async Task<List<CommodityGroup>> GetAllGroupsAsync()
        {
            return await _repository.GetAllAsync();
        }
    }
}
