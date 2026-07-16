using Inventory.Application.Interface;
using Inventory.Domain.Entities;
using Inventory.Persistence.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Persistence.Repositories
{
    public class StoreroomCreateRepository : IStoreroomRepository
    {
        private readonly AppDbContext _context;

        public StoreroomCreateRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Storeroom>> GetAllAsync()
        {
            return await _context.Storerooms.ToListAsync();
        }

        public async Task<Storeroom?> GetByIdAsync(int id)
        {
            return await _context.Storerooms
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Storeroom> SaveAsync(Storeroom entity)
        {
            if (entity.Id == 0)
            {
                _context.Storerooms.Add(entity);
            }
            else
            {
                _context.Storerooms.Update(entity);
            }

            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var record = await _context.Storerooms
                .FirstOrDefaultAsync(x => x.Id == id);

            if (record == null)
                return false;

            _context.Storerooms.Remove(record);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
