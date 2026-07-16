using Inventory.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Application.Interface
{
    public interface IRoleRepository
    {
        Task<Role> CreateRoleAsync(Role role);

        Task<List<Role>> GetAllRolesAsync();

        Task<Role> GetRoleByNameAsync(string roleName);

        Task<Role> GetByIdAsync(int id);


    }
}
