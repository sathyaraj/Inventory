
using ClosedXML.Excel;
using DocumentFormat.OpenXml.InkML;
using Inventory.Application.Servies;
using Inventory.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Text;

namespace Inventory.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly ItemService _service;

        public ItemController(ItemService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add(Item item)
        {
            try
            {
                //await _service.AddItem(item);

                //var newItem = await _service.AddItem(item);
                 await _service.AddItemWithStockAsync(item);

                return Ok(new
                {
                    success = true,
                    message = "Item Added Successfully",
                    itemId = item.Id
                });
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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _service.GetAllItems();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _service.GetItemById(id);

            if (item == null)
                return NotFound();

            return Ok(item);
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

        [HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    var result = await _service.DeleteItem(id);

        //    if (!result)
        //        return NotFound(new { message = "Item not found" });

        //    return Ok(new { message = "Item deleted successfully" });
        //}

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

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Item item)
        {
            if (id != item.Id)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "ID mismatch"
                });
            }

            var result = await _service.UpdateItem(item);

            if (!result)
            {
                return NotFound(new
                {
                    success = false,
                    message = "Item not found"
                });
            }

            return Ok(new
            {
                success = true,
                message = "Item Updated Successfully"
            });
        }

        private void LogStep(string step, string message = "")
        {
            Console.WriteLine($"[STEP {step}] {message}");
        }


        [HttpPost("import-items")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> ImportItems([FromForm] IFormFile file)
        {
            try
            {
                // ======================================
                // VALIDATE FILE
                // ======================================
                if (file == null || file.Length == 0)
                {
                    return BadRequest("File is empty");
                }

                var items = new List<Item>();

                // ======================================
                // OPEN EXCEL FILE
                // ======================================
                using var stream = new MemoryStream();

                await file.CopyToAsync(stream);

                using var workbook = new XLWorkbook(stream);

                var worksheet = workbook.Worksheet(1);

                var totalRows = worksheet.LastRowUsed().RowNumber();

                // ======================================
                // LOOP ROWS
                // START FROM ROW 2
                // ======================================
                for (int row = 2; row <= totalRows; row++)
                {
                    try
                    {
                        // ======================================
                        // SKIP EMPTY ROW
                        // ======================================
                        if (worksheet.Cell(row, 1).IsEmpty())
                            continue;

                        var item = new Item
                        {
                            ItemCode = worksheet.Cell(row, 1).GetString(),
                            Name = worksheet.Cell(row, 2).GetString(),
                            ItemSet = worksheet.Cell(row, 3).GetString(),
                            Status = worksheet.Cell(row, 4).GetString(),

                            CommodityGroup = worksheet.Cell(row, 5).GetString(),
                            CommodityCode = worksheet.Cell(row, 6).GetString(),

                            LotType = worksheet.Cell(row, 7).GetString(),

                            ReceiptTolerance =
                                decimal.TryParse(
                                    worksheet.Cell(row, 8).GetString(),
                                    out var recTol
                                )
                                ? recTol
                                : null,

                            Qty =
                                decimal.TryParse(
                                    worksheet.Cell(row, 9).GetString(),
                                    out var qty
                                )
                                ? qty
                                : null,

                            Model = worksheet.Cell(row, 10).GetString(),
                            SerialNo = worksheet.Cell(row, 11).GetString(),
                            Manufacturer = worksheet.Cell(row, 12).GetString(),

                            ManufactureDate =
                                DateTime.TryParse(
                                    worksheet.Cell(row, 13).GetString(),
                                    out var mDate
                                )
                                ? mDate
                                : null,

                            Period =
                                int.TryParse(
                                    worksheet.Cell(row, 14).GetString(),
                                    out var period
                                )
                                ? period
                                : null,

                            WarEndDate =
                                DateTime.TryParse(
                                    worksheet.Cell(row, 15).GetString(),
                                    out var wDate
                                )
                                ? wDate
                                : null,

                            OrderUnit = worksheet.Cell(row, 16).GetString(),
                            IssueUnit = worksheet.Cell(row, 17).GetString(),

                            ConditionEnabled =
                                bool.TryParse(
                                    worksheet.Cell(row, 18).GetString(),
                                    out var cond
                                )
                                ? cond
                                : null,

                            IsKit =
                                bool.TryParse(
                                    worksheet.Cell(row, 19).GetString(),
                                    out var kit
                                )
                                ? kit
                                : null,

                            IsCapitalized =
                                bool.TryParse(
                                    worksheet.Cell(row, 20).GetString(),
                                    out var cap
                                )
                                ? cap
                                : null,

                            InspectOnReceipt =
                                bool.TryParse(
                                    worksheet.Cell(row, 21).GetString(),
                                    out var insp
                                )
                                ? insp
                                : null,

                            IsSparePart =
                                bool.TryParse(
                                    worksheet.Cell(row, 22).GetString(),
                                    out var spare
                                )
                                ? spare
                                : null,

                            AttachToAsset =
                                bool.TryParse(
                                    worksheet.Cell(row, 23).GetString(),
                                    out var attach
                                )
                                ? attach
                                : null,

                            TaxExempt =
                                bool.TryParse(
                                    worksheet.Cell(row, 24).GetString(),
                                    out var tax
                                )
                                ? tax
                                : null,

                            MinimumStock =
                                decimal.TryParse(
                                    worksheet.Cell(row, 25).GetString(),
                                    out var min
                                )
                                ? min
                                : null,

                            MaximumStock =
                                decimal.TryParse(
                                    worksheet.Cell(row, 26).GetString(),
                                    out var max
                                )
                                ? max
                                : null,

                            ReorderLevel =
                                decimal.TryParse(
                                    worksheet.Cell(row, 27).GetString(),
                                    out var rl
                                )
                                ? rl
                                : null,

                            ReorderQuantity =
                                decimal.TryParse(
                                    worksheet.Cell(row, 28).GetString(),
                                    out var rq
                                )
                                ? rq
                                : null,

                            SafetyStock =
                                decimal.TryParse(
                                    worksheet.Cell(row, 29).GetString(),
                                    out var ss
                                )
                                ? ss
                                : null,

                            LeadTime =
                                int.TryParse(
                                    worksheet.Cell(row, 30).GetString(),
                                    out var lt
                                )
                                ? lt
                                : null,

                            Conversion =
                                decimal.TryParse(
                                    worksheet.Cell(row, 31).GetString(),
                                    out var conv
                                )
                                ? conv
                                : null,

                            BaseQty =
                                decimal.TryParse(
                                    worksheet.Cell(row, 32).GetString(),
                                    out var bq
                                )
                                ? bq
                                : null,

                            UnitCost =
                                decimal.TryParse(
                                    worksheet.Cell(row, 33).GetString(),
                                    out var uc
                                )
                                ? uc
                                : null,

                            StandardCost =
                                decimal.TryParse(
                                    worksheet.Cell(row, 34).GetString(),
                                    out var sc
                                )
                                ? sc
                                : null,

                            LastPurchaseCost =
                                decimal.TryParse(
                                    worksheet.Cell(row, 35).GetString(),
                                    out var lpc
                                )
                                ? lpc
                                : null,

                            AverageCost =
                                decimal.TryParse(
                                    worksheet.Cell(row, 36).GetString(),
                                    out var ac
                                )
                                ? ac
                                : null,

                            Currency = worksheet.Cell(row, 37).GetString(),

                            TaxPercent =
                                decimal.TryParse(
                                    worksheet.Cell(row, 38).GetString(),
                                    out var tp
                                )
                                ? tp
                                : null,

                            DiscountPercent =
                                decimal.TryParse(
                                    worksheet.Cell(row, 39).GetString(),
                                    out var dp
                                )
                                ? dp
                                : null,

                            FreightCost =
                                decimal.TryParse(
                                    worksheet.Cell(row, 40).GetString(),
                                    out var fc
                                )
                                ? fc
                                : null,

                            LandedCost =
                                decimal.TryParse(
                                    worksheet.Cell(row, 41).GetString(),
                                    out var lc
                                )
                                ? lc
                                : null,

                            ReorderCost =
                                decimal.TryParse(
                                    worksheet.Cell(row, 42).GetString(),
                                    out var rc
                                )
                                ? rc
                                : null,

                            CostingMethod = worksheet.Cell(row, 43).GetString()
                        };

                        items.Add(item);
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(
                            $"Error on row {row} : {ex.Message}"
                        );
                    }
                }

                // ======================================
                // SAVE DATABASE
                // ======================================
          

                await _service.AddItemsAsync(items);

                return Ok(new
                {
                    message = "Import successful",
                    count = items.Count
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


    [HttpGet("export-items")]
    public async Task<IActionResult> ExportItems(DateTime? fromDate,
    DateTime? toDate)
    {
        var items = await _service.GetAllItems();

            if (fromDate.HasValue)
            {
                items = items
                    .Where(x =>
                        x.CreatedDate.HasValue &&
                        x.CreatedDate.Value.Date >= fromDate.Value.Date)
                    .ToList();
            }

            if (toDate.HasValue)
            {
                items = items
                    .Where(x =>
                        x.CreatedDate.HasValue &&
                        x.CreatedDate.Value.Date <= toDate.Value.Date)
                    .ToList();
            }


            using var workbook = new XLWorkbook();

        var worksheet = workbook.Worksheets.Add("Items");

        // ================= HEADER =================

        var headers = new[]
        {
        "ItemCode",
        "Name",
        "ItemSet",
        "Status",

        "CommodityGroup",
        "CommodityCode",

        "LotType",
        "ReceiptTolerance",

        "Qty",
        "Model",
        "SerialNo",
        "Manufacturer",
        "ManufactureDate",
        "Period",
        "WarEndDate",

        "OrderUnit",
        "IssueUnit",

        "ConditionEnabled",
        "IsKit",
        "IsCapitalized",
        "InspectOnReceipt",
        "IsSparePart",
        "AttachToAsset",
        "TaxExempt",

        "MinimumStock",
        "MaximumStock",
        "ReorderLevel",
        "ReorderQuantity",
        "SafetyStock",
        "LeadTime",

        "Conversion",
        "BaseQty",

        "UnitCost",
        "StandardCost",
        "LastPurchaseCost",
        "AverageCost",

        "Currency",
        "TaxPercent",
        "DiscountPercent",

        "FreightCost",
        "LandedCost",
        "ReorderCost",
        "CostingMethod",

        "Storeroom"
    };

        // Add headers
        for (int i = 0; i < headers.Length; i++)
        {
            worksheet.Cell(1, i + 1).Value = headers[i];

            worksheet.Cell(1, i + 1).Style.Font.Bold = true;

            worksheet.Cell(1, i + 1).Style.Fill.BackgroundColor =
                XLColor.LightGray;
        }

        // ================= DATA =================

        int row = 2;

        foreach (var item in items)
        {
            if (item.StoreroomItems != null &&
                item.StoreroomItems.Any())
            {
                foreach (var s in item.StoreroomItems)
                {
                    int col = 1;

                    worksheet.Cell(row, col++).Value = item.ItemCode;
                    worksheet.Cell(row, col++).Value = item.Name;
                    worksheet.Cell(row, col++).Value = item.ItemSet;
                    worksheet.Cell(row, col++).Value = item.Status;

                    worksheet.Cell(row, col++).Value = item.CommodityGroup;
                    worksheet.Cell(row, col++).Value = item.CommodityCode;

                    worksheet.Cell(row, col++).Value = item.LotType;
                    worksheet.Cell(row, col++).Value = item.ReceiptTolerance;

                    worksheet.Cell(row, col++).Value = item.Qty;
                    worksheet.Cell(row, col++).Value = item.Model;
                    worksheet.Cell(row, col++).Value = item.SerialNo;
                    worksheet.Cell(row, col++).Value = item.Manufacturer;

                    worksheet.Cell(row, col++).Value =
                        item.ManufactureDate?.ToString("yyyy-MM-dd");

                    worksheet.Cell(row, col++).Value = item.Period;

                    worksheet.Cell(row, col++).Value =
                        item.WarEndDate?.ToString("yyyy-MM-dd");

                    worksheet.Cell(row, col++).Value = item.OrderUnit;
                    worksheet.Cell(row, col++).Value = item.IssueUnit;

                    worksheet.Cell(row, col++).Value = item.ConditionEnabled ?? false; ;
                    worksheet.Cell(row, col++).Value = item.IsKit ?? false;
                    worksheet.Cell(row, col++).Value = item.IsCapitalized ?? false; ;
                    worksheet.Cell(row, col++).Value = item.InspectOnReceipt ?? false; ;
                    worksheet.Cell(row, col++).Value = item.IsSparePart ?? false; ;
                    worksheet.Cell(row, col++).Value = item.AttachToAsset ?? false; ;
                    worksheet.Cell(row, col++).Value = item.TaxExempt ?? false; ;

                    worksheet.Cell(row, col++).Value = item.MinimumStock;
                    worksheet.Cell(row, col++).Value = item.MaximumStock;
                    worksheet.Cell(row, col++).Value = item.ReorderLevel;
                    worksheet.Cell(row, col++).Value = item.ReorderQuantity;
                    worksheet.Cell(row, col++).Value = item.SafetyStock;
                    worksheet.Cell(row, col++).Value = item.LeadTime;

                    worksheet.Cell(row, col++).Value = item.Conversion;
                    worksheet.Cell(row, col++).Value = item.BaseQty;

                    worksheet.Cell(row, col++).Value = item.UnitCost;
                    worksheet.Cell(row, col++).Value = item.StandardCost;
                    worksheet.Cell(row, col++).Value = item.LastPurchaseCost;
                    worksheet.Cell(row, col++).Value = item.AverageCost;

                    worksheet.Cell(row, col++).Value = item.Currency;
                    worksheet.Cell(row, col++).Value = item.TaxPercent;
                    worksheet.Cell(row, col++).Value = item.DiscountPercent;

                    worksheet.Cell(row, col++).Value = item.FreightCost;
                    worksheet.Cell(row, col++).Value = item.LandedCost;
                    worksheet.Cell(row, col++).Value = item.ReorderCost;
                    worksheet.Cell(row, col++).Value = item.CostingMethod;

                    worksheet.Cell(row, col++).Value = s.Storename;

                    row++;
                }
            }
            else
            {
                int col = 1;

                worksheet.Cell(row, col++).Value = item.ItemCode;
                worksheet.Cell(row, col++).Value = item.Name;
                worksheet.Cell(row, col++).Value = item.ItemSet;
                worksheet.Cell(row, col++).Value = item.Status;
                    worksheet.Cell(row, col++).Value = item.CommodityGroup;
                    worksheet.Cell(row, col++).Value = item.CommodityCode;

                    worksheet.Cell(row, col++).Value = item.LotType;
                    worksheet.Cell(row, col++).Value = item.ReceiptTolerance;

                    worksheet.Cell(row, col++).Value = item.Qty;
                    worksheet.Cell(row, col++).Value = item.Model;
                    worksheet.Cell(row, col++).Value = item.SerialNo;
                    worksheet.Cell(row, col++).Value = item.Manufacturer;

                    worksheet.Cell(row, col++).Value =
                        item.ManufactureDate?.ToString("yyyy-MM-dd");

                    worksheet.Cell(row, col++).Value = item.Period;

                    worksheet.Cell(row, col++).Value =
                        item.WarEndDate?.ToString("yyyy-MM-dd");

                    worksheet.Cell(row, col++).Value = item.OrderUnit;
                    worksheet.Cell(row, col++).Value = item.IssueUnit;

                    worksheet.Cell(row, col++).Value = item.ConditionEnabled ?? false; ;
                    worksheet.Cell(row, col++).Value = item.IsKit ?? false;
                    worksheet.Cell(row, col++).Value = item.IsCapitalized ?? false; ;
                    worksheet.Cell(row, col++).Value = item.InspectOnReceipt ?? false; ;
                    worksheet.Cell(row, col++).Value = item.IsSparePart ?? false; ;
                    worksheet.Cell(row, col++).Value = item.AttachToAsset ?? false; ;
                    worksheet.Cell(row, col++).Value = item.TaxExempt ?? false; ;

                    worksheet.Cell(row, col++).Value = item.MinimumStock;
                    worksheet.Cell(row, col++).Value = item.MaximumStock;
                    worksheet.Cell(row, col++).Value = item.ReorderLevel;
                    worksheet.Cell(row, col++).Value = item.ReorderQuantity;
                    worksheet.Cell(row, col++).Value = item.SafetyStock;
                    worksheet.Cell(row, col++).Value = item.LeadTime;

                    worksheet.Cell(row, col++).Value = item.Conversion;
                    worksheet.Cell(row, col++).Value = item.BaseQty;

                    worksheet.Cell(row, col++).Value = item.UnitCost;
                    worksheet.Cell(row, col++).Value = item.StandardCost;
                    worksheet.Cell(row, col++).Value = item.LastPurchaseCost;
                    worksheet.Cell(row, col++).Value = item.AverageCost;

                    worksheet.Cell(row, col++).Value = item.Currency;
                    worksheet.Cell(row, col++).Value = item.TaxPercent;
                    worksheet.Cell(row, col++).Value = item.DiscountPercent;

                    worksheet.Cell(row, col++).Value = item.FreightCost;
                    worksheet.Cell(row, col++).Value = item.LandedCost;
                    worksheet.Cell(row, col++).Value = item.ReorderCost;
                    worksheet.Cell(row, col++).Value = item.CostingMethod;

                    row++;
            }
        }

        // ================= STYLE =================

        worksheet.Columns().AdjustToContents();

        // Freeze header
        worksheet.SheetView.FreezeRows(1);

        // Auto filter
        worksheet.RangeUsed().SetAutoFilter();

        // ================= EXPORT =================

        using var stream = new MemoryStream();

        workbook.SaveAs(stream);

        var content = stream.ToArray();

        return File(
            content,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "items_full_export.xlsx"
        );
    }

    

    [HttpGet("group-items")]
        public async Task<IActionResult> GetGroupedItems()
        {
            var data = await _service.GetGroupedItemsAsync();
            return Ok(data);
        }

    }

}
