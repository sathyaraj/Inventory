using Inventory.Application.Services;
using Inventory.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommodityGroupController
    : ControllerBase
    {
        private readonly CommodityGroupService _service;

        public CommodityGroupController(
            CommodityGroupService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Save(
            [FromBody] CommodityGroup model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var id =
                await _service.SaveAsync(model);

            return Ok(new
            {
                success = true,
                id = id,
                message = "Saved Successfully"
            });
        }

        //[HttpGet]
        //public async Task<IActionResult> GetAll()
        //{
        //    var data =
        //        await _service.GetAllAsync();

        //    return Ok(data);
        //}
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _service.GetAllGroupsAsync();

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(
            long id)
        {
            var data =
                await _service.GetByIdAsync(id);

            return Ok(data);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(
            long id)
        {
            var result =
                await _service.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("{id}/codes")]
        public async Task<IActionResult>
GetCodes(long id)
        {
            var data =
                await _service
                    .GetCodesByGroupIdAsync(id);

            return Ok(data);
        }
    }
}
