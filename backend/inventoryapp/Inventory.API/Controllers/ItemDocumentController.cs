using Inventory.Application.Services;
using Inventory.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemDocumentController : ControllerBase
    {
        private readonly ItemDocumentService _service;
        private readonly IWebHostEnvironment _env;

        public ItemDocumentController(

           ItemDocumentService service,
           IWebHostEnvironment env)
        {
            _service = service;
            _env = env;
        }

        [HttpPost("save")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Save(
           [FromForm] int itemId,
           [FromForm] string type,
           [FromForm] List<string> names,
           [FromForm] List<IFormFile> files)
        {
            try
            {
                Console.WriteLine("STEP 1: API Started");

                var list = new List<ItemDocument>();

                Console.WriteLine($"STEP 2: Names={names?.Count}, Files={files?.Count}");

                var count = Math.Min(names?.Count ?? 0, files?.Count ?? 0);

                Console.WriteLine("STEP 3: Count = " + count);

                var webRoot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                //var folder = Path.Combine(_env.WebRootPath, "uploads");

                var folder = Path.Combine(webRoot, "uploads");

                Console.WriteLine("STEP 4: Folder = " + folder);

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                    Console.WriteLine("STEP 5: Folder Created");
                }

                for (int i = 0; i < count; i++)
                {
                    Console.WriteLine($"STEP 6: Loop i={i}");

                    string filePath = "";

                    if (files[i] != null)
                    {
                        Console.WriteLine("STEP 7: File found -> " + files[i].FileName);

                        var fileName = Guid.NewGuid() + Path.GetExtension(files[i].FileName);
                        var fullPath = Path.Combine(folder, fileName);

                        Console.WriteLine("STEP 8: Saving to -> " + fullPath);

                        using var stream = new FileStream(fullPath, FileMode.Create);
                        await files[i].CopyToAsync(stream);

                        //filePath = "/uploads/" + fileName;
                        filePath = $"{Request.Scheme}:/{Request.Host}/uploads/{fileName}";

                        Console.WriteLine("STEP 9: File saved");
                    }
                    else
                    {
                        Console.WriteLine("STEP 7: File NULL");
                    }

                    list.Add(new ItemDocument
                    {
                        ItemId = itemId,
                        Name = names[i] ?? "",
                        DocumentPath = filePath,
                        Type = type
                    });
                }

                Console.WriteLine("STEP 10: Saving to DB");

                try
                {
                    Console.WriteLine("BEFORE SAVE");
                    await _service.SaveAsync(itemId, list);
                    Console.WriteLine("AFTER SAVE");
                }
                catch (Exception ex)
                {
                    Console.WriteLine("SERVICE ERROR: " + ex.ToString());
                    return BadRequest(ex.Message);
                }

                Console.WriteLine("STEP 11: DONE");

                return Ok(new {
                    success = true,
                    message = "Saved successfully" });
            }
            catch (Exception ex)
            {
                Console.WriteLine("ERROR: " + ex.Message);
                return BadRequest(ex.Message);
            }

        }

        //[HttpGet("by-item/{itemId}")]
        //public async Task<IActionResult> GetByItem(int itemId)
        //{
        //    var result = await _service.GetByItemIdAsync(itemId);
        //    return Ok(result);
        //}

        [HttpGet("by-item/{itemId}")]
        public async Task<IActionResult> GetByItem(int itemId)
        {
            var result = await _service.GetByItemIdAsync(itemId);
            return Ok(result);
        }

        [HttpPut("update-status/{itemId}")]
        public async Task<IActionResult> UpdateStatus(int itemId, [FromBody] string type)
        {
            try
            {
                await _service.UpdateStatusAsync(itemId, type);
                return Ok(new {
                    success = true,
                    message = "Status updated" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{id}")]
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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();

            return Ok(result);
        }


    }
}
