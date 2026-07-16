using Inventory.Application.Interface;
using Inventory.Domain.Entities;
using BCrypt.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Inventory.Application.Services
{
    public class UserDetailService
    {
        private readonly IUserDetailRepository _repository;
        private readonly IConfiguration _config;
        private readonly IRoleRepository _roleRepository;


        public UserDetailService(
            IUserDetailRepository repository,
            IConfiguration config,
            IRoleRepository roleRepository)
        {
            _repository = repository;
            _config = config;
            _roleRepository = roleRepository;
        }

        // ================= REGISTER =================
        public async Task<UserDetail> RegisterAsync(UserDetail user)
        {
            user.PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            user.IsActive = true;

            return await _repository.AddAsync(user);
        }

        // ================= LOGIN =================

        public async Task<object> LoginAsync(UserDetail user)
        {
            var existingUser =
                await _repository.GetByUsernameAsync(user.Email);

            if (existingUser == null)
                return null;

            bool isValid = BCrypt.Net.BCrypt.Verify(
                user.PasswordHash,
                existingUser.PasswordHash
            );

            if (!isValid)
                return null;



            var roleData = await _roleRepository.GetByIdAsync(Convert.ToInt32(existingUser.Role));

            //var roleData = await _roleRepository.GetRoleByNameAsync(existingUser.Role);

            var token = GenerateJwt(existingUser);

            return new
            {
                token,
                role = existingUser.Role,
                permissions = roleData?.RolePermissions
            };
        }
        //public async Task<string> LoginAsync(UserDetail user)
        //{
        //    var existingUser =
        //        await _repository.GetByUsernameAsync(user.Email);

        //    if (existingUser == null)
        //        return null;

        //    bool isValid = BCrypt.Net.BCrypt.Verify(
        //        user.PasswordHash,
        //        existingUser.PasswordHash
        //    );

        //    if (!isValid)
        //        return null;

        //    return GenerateJwt(existingUser);
        //}

        // ================= JWT TOKEN =================
        private string GenerateJwt(UserDetail user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim("UserId", user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role ?? "User")
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"])
            );

            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // ================= CRUD =================
        public Task<List<UserDetail>> GetAllAsync()
        {
            return _repository.GetAllAsync();
        }

        public Task<UserDetail> GetByIdAsync(int id)
        {
            return _repository.GetByIdAsync(id);
        }

        public Task<UserDetail> UpdateAsync(UserDetail user)
        {
            return _repository.UpdateAsync(user);
        }

        public Task<bool> DeleteAsync(int id)
        {
            return _repository.DeleteAsync(id);
        }
    }
}