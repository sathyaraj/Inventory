using Azure.Core;
using Inventory.Application.Services;
using Inventory.Domain.Entities;
using Inventory.Persistence.Migrations;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserDetailController : ControllerBase
    {
        private readonly UserDetailService _service;

        public UserDetailController(UserDetailService service)
        {
            _service = service;
        }

        // ================= REGISTER =================
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDetail user)
        {
            var result = await _service.RegisterAsync(user);
            return Ok(result);
        }

        // ================= LOGIN =================
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDetail user)
        {

            if (string.IsNullOrEmpty(user.Email) ||
                string.IsNullOrEmpty(user.PasswordHash))
            {
                return BadRequest("Username and Password are required");
            }

            var token = await _service.LoginAsync(user);

            if (token == null)
                return Unauthorized("Invalid username or password");

            return Ok(token);
        }

        //[HttpPost("login")]
        //public async Task<IActionResult> Login([FromBody] UserDetail user)
        //{
        //    // 🚨 BYPASS MODEL VALIDATION
        //    ModelState.Clear();

        //    var token = await _service.LoginAsync(user);

        //    if (token == null)
        //        return Unauthorized("Invalid username or password");

        //    return Ok(new { token });
        //}

        // ================= GET ALL =================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        // ================= GET BY ID =================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _service.GetByIdAsync(id);

            if (data == null)
                return NotFound();

            return Ok(data);
        }

        // ================= UPDATE =================
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UserDetail user)
        {
            user.Id = id;

            var result = await _service.UpdateAsync(user);
            return Ok(result);
        }

        // ================= DELETE =================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);

            if (!result)
                return NotFound();

            return Ok("Deleted Successfully");
        }
    }
}