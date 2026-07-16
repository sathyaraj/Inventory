using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Inventory.Domain.Entities;

namespace Inventory.Application.Interface
{
    public interface IUserDetailRepository
    {
        Task<List<UserDetail>> GetAllAsync();

        Task<UserDetail> GetByIdAsync(int id);

        Task<UserDetail> AddAsync(UserDetail user);

        Task<UserDetail> UpdateAsync(UserDetail user);

        Task<bool> DeleteAsync(int id);

        // 🔐 LOGIN SUPPORT
        Task<UserDetail> GetByUsernameAsync(string username);
    }
}