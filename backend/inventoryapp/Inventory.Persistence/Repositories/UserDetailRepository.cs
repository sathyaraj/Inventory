using Inventory.Application.Interface;
using Inventory.Domain.Entities;
using Inventory.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Persistence.Repositories
{
    public class UserDetailRepository : IUserDetailRepository
    {
        private readonly AppDbContext _context;

        public UserDetailRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserDetail>> GetAllAsync()
        {
            return await _context.UserDetails.ToListAsync();
        }

        public async Task<UserDetail> GetByIdAsync(int id)
        {
            return await _context.UserDetails.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<UserDetail> AddAsync(UserDetail user)
        {
            _context.UserDetails.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<UserDetail> UpdateAsync(UserDetail user)
        {
            _context.UserDetails.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var data = await _context.UserDetails.FirstOrDefaultAsync(x => x.Id == id);

            if (data == null)
                return false;

            _context.UserDetails.Remove(data);
            await _context.SaveChangesAsync();

            return true;
        }

        // 🔐 LOGIN SUPPORT
        public async Task<UserDetail> GetByUsernameAsync(string Email)
        {
            return await _context.UserDetails
                .FirstOrDefaultAsync(x => x.Email == Email);
        }
    }
}