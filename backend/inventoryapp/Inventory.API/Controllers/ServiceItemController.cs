using ClosedXML.Excel;
using Inventory.Application.Services;
using Inventory.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceItemController : ControllerBase
    {
        private readonly ServiceItemService _service;

        public ServiceItemController(
            ServiceItemService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ServiceItem item)
        {
            try
            {
                var result = await _service.CreateAsync(item);

                return Ok(new
                {
                    success = true,
                    message = "Created Successfully",
                    data = result
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while creating the service item.",
                    error = ex.Message
                });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data =
                await _service.GetAllAsync();

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(
            int id)
        {
            var item =
                await _service.GetByIdAsync(id);

            if (item == null)
                return NotFound();

            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ServiceItem item)
        {
            try
            {
                if (item == null)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Invalid request data."
                    });
                }

                var result = await _service.UpdateAsync(id, item);

                if (result == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = $"Service Item with ID {id} not found."
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Updated Successfully",
                    data = result
                });
            }
            catch (Exception ex)
            {
                // _logger.LogError(ex, "Error occurred while updating Service Item.");

                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    success = false,
                    message = "An error occurred while updating the service item.",
                    error = ex.Message // Remove this in production
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(
            int id)
        {
            var result =
                await _service.DeleteAsync(id);

            if (!result)
                return NotFound();

            return Ok(new
            {
                message = "Deleted Successfully"
            });
        }

        [HttpGet("lastid")]
        public async Task<IActionResult> GetLastId()
        {
            var id = await _service.GetLastInsertedIdAsync();

            return Ok(new
            {
                success = true,
                lastId = id
            });
        }

        [HttpGet("export-serviceitems")]
        public async Task<IActionResult> ExportServiceItems(
    DateTime? fromDate,
    DateTime? toDate)
        {
            var items = await _service.GetAllAsync();

            if (fromDate.HasValue)
            {
                items = items
                    .Where(x => x.Created.Date >= fromDate.Value.Date)
                    .ToList();
            }

            if (toDate.HasValue)
            {
                items = items
                    .Where(x => x.Created.Date <= toDate.Value.Date)
                    .ToList();
            }

            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Service Items");

            var headers = new[]
            {
        "Service Set",
        "Service Code",
        "Service Name",
        "Status",
        "Commodity Group",
        "Commodity Code",
        "Description",
        "Receipt Tolerance",
        "Order Unit",
        "Issue Unit",
        "Minimum Service Cost",
        "Maximum Service Cost",
        "Lead Time Days",
        "Active For Purchase",
        "Active For Work Order",
        "Prorate",
        "Inspection Required",
        "Created Date"
    };

            for (int i = 0; i < headers.Length; i++)
            {
                worksheet.Cell(1, i + 1).Value = headers[i];
                worksheet.Cell(1, i + 1).Style.Font.Bold = true;
                worksheet.Cell(1, i + 1).Style.Fill.BackgroundColor = XLColor.LightGray;
            }

            int row = 2;

            foreach (var item in items)
            {
                int col = 1;

                worksheet.Cell(row, col++).Value = item.ServiceSet;
                worksheet.Cell(row, col++).Value = item.ServiceCode;
                worksheet.Cell(row, col++).Value = item.ServiceName;
                worksheet.Cell(row, col++).Value = item.Status;

                worksheet.Cell(row, col++).Value = item.CommodityGroup;
                worksheet.Cell(row, col++).Value = item.CommodityCode;
                worksheet.Cell(row, col++).Value = item.Description;

                worksheet.Cell(row, col++).Value = item.ReceiptTolerance;

                worksheet.Cell(row, col++).Value = item.OrderUnit;
                worksheet.Cell(row, col++).Value = item.IssueUnit;

                worksheet.Cell(row, col++).Value = item.MinimumServiceCost;
                worksheet.Cell(row, col++).Value = item.MaximumServiceCost;

                worksheet.Cell(row, col++).Value = item.LeadTimeDays;

                worksheet.Cell(row, col++).Value = item.ActiveForPurchase;
                worksheet.Cell(row, col++).Value = item.ActiveForWorkOrder;
                worksheet.Cell(row, col++).Value = item.Prorate;
                worksheet.Cell(row, col++).Value = item.InspectionRequired;

                worksheet.Cell(row, col++).Value =
                    item.Created.ToString("yyyy-MM-dd HH:mm:ss");

                row++;
            }

            worksheet.Columns().AdjustToContents();
            worksheet.SheetView.FreezeRows(1);
            worksheet.RangeUsed()?.SetAutoFilter();

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);

            return File(
                stream.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"serviceitems_export_{DateTime.Now:yyyyMMddHHmmss}.xlsx"
            );
        }
    }
}