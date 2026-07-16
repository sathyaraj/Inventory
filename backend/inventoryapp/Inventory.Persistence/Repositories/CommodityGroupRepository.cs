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
    public class CommodityGroupRepository: ICommodityGroupRepository
    {
        private readonly AppDbContext _context;

        public CommodityGroupRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<long> SaveAsync(
            CommodityGroup entity)
        {
            if (entity.Id == 0)
            {
                _context.CommodityGroups.Add(entity);
            }
            else
            {
                var existing =
                    await _context.CommodityGroups
                    .Include(x => x.CommodityCodes)
                    .FirstOrDefaultAsync(x => x.Id == entity.Id);

                if (existing == null)
                    throw new Exception("Record not found");

                existing.Commoditygroup =
                    entity.Commoditygroup;

                existing.Description =
                    entity.Description;

                existing.Status =
                    entity.Status;

                _context.CommodityCodes.RemoveRange(
                    existing.CommodityCodes);

                existing.CommodityCodes =
                    entity.CommodityCodes;
            }

            await _context.SaveChangesAsync();

            return entity.Id;
        }

        public async Task<List<CommodityGroup>>
            GetAllAsync()
        {
            return await _context.CommodityGroups
                .Include(x => x.CommodityCodes)
                .ToListAsync();
        }

        public async Task<CommodityGroup>
            GetByIdAsync(long id)
        {
            return await _context.CommodityGroups
                .Include(x => x.CommodityCodes)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var entity =
                await _context.CommodityGroups
                .FindAsync(id);

            if (entity == null)
                return false;

            _context.CommodityGroups.Remove(entity);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<object> GetAllGroupsAsync()
        {
            return await _context.CommodityGroups
                .Select(x => new
                {
                    x.Id,
                    x.Commoditygroup,
                    x.Description,
                    x.Status,
                    CodeCount = x.CommodityCodes.Count()
                })
                .ToListAsync();
        }

        public async Task<List<CommodityCode>>GetCodesByGroupIdAsync(long groupId)
        {
            return await _context.CommodityCodes
                .Where(x => x.CommodityGroupId == groupId)
                .ToListAsync();
        }
    }
}
