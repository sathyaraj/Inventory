using Inventory.Application.Interface;
using Inventory.Domain.Entities;
using Inventory.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Persistence.Repositories
{
    // ===============================
    // REPOSITORY
    // ===============================

    using Microsoft.EntityFrameworkCore;

    public class RoleRepository : IRoleRepository
    {
        private readonly AppDbContext _context;

        public RoleRepository(AppDbContext context)
        {
            _context = context;
        }

        // CREATE ROLE
        public async Task<Role> CreateRoleAsync(Role role)
        {
            _context.Roles.Add(role);

            await _context.SaveChangesAsync();

            return role;
        }

        // GET ALL ROLES
        public async Task<List<Role>> GetAllRolesAsync()
        {
            return await _context.Roles
                .Include(x => x.RolePermissions)
                .ToListAsync();
        }

        public async Task<Role> GetRoleByNameAsync(string roleName)
        {
          
            return await _context.Roles
                .Include(x => x.RolePermissions)
                .FirstOrDefaultAsync(x => x.Role_Name == roleName);
        }

        public async Task<Role> GetByIdAsync(int id)
        {
            return await _context.Roles
                .Include(x => x.RolePermissions)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

    }
}
