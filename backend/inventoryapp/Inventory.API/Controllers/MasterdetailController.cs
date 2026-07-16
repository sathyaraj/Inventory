using ClosedXML.Excel;
using Inventory.Application.Interface;
using Inventory.Domain.Entities;
using Inventory.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc;


namespace Inventory.API.Controllers
{
    
    [Route("api/[Controller]")]
    [ApiController]
    public class MasterdetailController : ControllerBase
    {
        private readonly IMasterdetailRepository _mastedetailrepository;

        public MasterdetailController(IMasterdetailRepository mastedetailrepository)
        {
            _mastedetailrepository = mastedetailrepository;
        }

        [HttpPost]
        public async Task<IActionResult> create([FromBody] Masterdetail masterdetail)
        {
                    await _mastedetailrepository.AddAsync(masterdetail);
                    return Ok(masterdetail);
        }

        [HttpGet("{masterId}")]
        public async Task<IActionResult> GetByMasterId(int masterId)
        {
            try
            {
                var data = await _mastedetailrepository.GetByMasterIdAsync(masterId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
           
        }

      

[HttpGet("download-excel/{masterId}")]
    public async Task<IActionResult> DownloadExcel(int masterId)
    {
        var data = await _mastedetailrepository
            .GetByMasterIdAsync(masterId);

        if (data == null || !data.Any())
        {
            return NotFound("No records found");
        }

        using var workbook = new XLWorkbook();

        var worksheet = workbook.Worksheets.Add("MasterDetails");

        // Header
        worksheet.Cell(1, 1).Value = "Id";
        worksheet.Cell(1, 2).Value = "Name";
        worksheet.Cell(1, 3).Value = "Description";

        // Data
        int row = 2;

        foreach (var item in data)
        {
            worksheet.Cell(row, 1).Value = item.Id;
            worksheet.Cell(row, 2).Value = item.Name;
            worksheet.Cell(row, 3).Value = item.Description;

            row++;
        }

        worksheet.Columns().AdjustToContents();

        using var stream = new MemoryStream();

        workbook.SaveAs(stream);

        var content = stream.ToArray();

        return File(
            content,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            $"MasterDetails_{masterId}.xlsx");
    }

}
}
