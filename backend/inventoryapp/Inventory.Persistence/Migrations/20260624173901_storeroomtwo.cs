using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Inventory.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class storeroomtwo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountingCode",
                table: "Storerooms");

            migrationBuilder.DropColumn(
                name: "AllowNegativeStock",
                table: "Storerooms");

            migrationBuilder.DropColumn(
                name: "AutoReorder",
                table: "Storerooms");

            migrationBuilder.DropColumn(
                name: "BudgetCode",
                table: "Storerooms");

            migrationBuilder.DropColumn(
                name: "CostCenter",
                table: "Storerooms");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Storerooms");

            migrationBuilder.DropColumn(
                name: "InventoryValue",
                table: "Storerooms");

            migrationBuilder.DropColumn(
                name: "IsMainStoreroom",
                table: "Storerooms");

            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "Storerooms");

            migrationBuilder.DropColumn(
                name: "StandardCost",
                table: "Storerooms");

            migrationBuilder.DropColumn(
                name: "TaxGroup",
                table: "Storerooms");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccountingCode",
                table: "Storerooms",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "AllowNegativeStock",
                table: "Storerooms",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "AutoReorder",
                table: "Storerooms",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BudgetCode",
                table: "Storerooms",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CostCenter",
                table: "Storerooms",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "Storerooms",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "InventoryValue",
                table: "Storerooms",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsMainStoreroom",
                table: "Storerooms",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "Storerooms",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "StandardCost",
                table: "Storerooms",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TaxGroup",
                table: "Storerooms",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
