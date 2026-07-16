using Inventory.Application.Servies;
using Inventory.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace Inventory.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendorController : ControllerBase
    {
        private readonly VendorItemsService _service;

        public VendorController(VendorItemsService service)
        {
            _service = service;
        }

        // ➕ ADD
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] VendorItem vendor)
        {
            try
            {

                await _service.AddVendor(vendor);
                return Ok(new { success = true, message = "Vendor Added Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.InnerException?.Message ?? ex.Message
                });
            }
            
        }

        // 🔍 LIST
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data = await _service.GetAll();
            return Ok(data);
        }

        // 🔍 GET BY ID (EDIT)
        [HttpGet("{ItemId}")]
        public async Task<IActionResult> GetById(int ItemId, [FromQuery] string type)
        {
            var data = await _service.GetByItemIdAsync(ItemId, type);
            return Ok(data);
        }

        // ✏️ UPDATE
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] VendorItem vendor)
        {
            await _service.UpdateVendor(vendor);
            return Ok("Updated");
        }

        // ❌ DELETE
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    await _service.DeleteVendor(id);
        //    return Ok("Deleted");
        //}

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {

                var result = await _service.DeleteItem(id);

                if (!result)
                    return NotFound(new { message = "Item not found" });

                return Ok(new { message = "Item deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error while deleting item",
                    error = ex.Message   // remove in production if needed
                });
            }
        }
    


[HttpPut("update-status/{itemId}")]
        public async Task<IActionResult> UpdateStatus(int itemId, [FromBody] bool status)
        {
            try
            {
                await _service.UpdateStatusAsync(itemId, status);
                return Ok(new
                {
                    success = true,
                    message = "Status updated successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
