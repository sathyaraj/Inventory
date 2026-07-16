using Inventory.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Numerics;
using System.Text;

namespace Inventory.Persistence.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Item> Items { get; set; }
        public DbSet<Master> Masters { get; set; }

        public DbSet<Masterdetail> Masterdetails { get; set; }

        public DbSet<AlternatesItem> Alternates { get; set; }

        public DbSet<ItemCondition> ItemConditions { get; set; }

        public DbSet<StoreroomItem> StoreroomItems { get; set; }

        public DbSet<VendorItem> VendorItems { get; set; }

        public DbSet<ItemAssembly> ItemAssemblies { get; set; }
        public DbSet<ItemAssemblyDetail> ItemAssemblyDetails { get; set; }


        public DbSet<ItemSpecification> ItemSpecification { get; set; }
        public DbSet<ItemSpecificationDetails> ItemSpecificationDetails { get; set; }

        public DbSet<ServiceItem> ServiceItems { get; set; }

        public DbSet<ServiceItemOrganization> ServiceItemOrganizations { get; set; }

        public DbSet<ItemList> ItemList { get; set; }

        public DbSet<DocumentDetails> DocumentDetails { get; set; }

        public DbSet<ItemDocument> ItemDocuments { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Stocklist> Stocklists { get; set; }

        public DbSet<StockCancel> StockCancels { get; set; }

        public DbSet<StockTransaction> StockTransactions { get; set; }

        public DbSet<CurrencyDetails> CurrencyDetails { get; set; }

        public DbSet<Discount> Discounts{ get; set; }

        public DbSet<Tax> Taxes{ get; set; }

        public DbSet<Company> Companies { get; set; }

        public DbSet<UserDetail> UserDetails { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<RolePermission> RolePermissions { get; set; }

        public DbSet<CostCode> CostCodes { get; set; }

        public DbSet<CommodityGroup> CommodityGroups { get; set; }

        public DbSet<CommodityCode> CommodityCodes { get; set; }

        public DbSet<Storeroom> Storerooms { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CommodityGroup>()
           .HasKey(x => x.Id);

            modelBuilder.Entity<CommodityCode>()
           .HasKey(x => x.Id);

            modelBuilder.Entity<CommodityGroup>()
            .HasMany(x => x.CommodityCodes)
            .WithOne(x => x.CommodityGroup)
            .HasForeignKey(x => x.CommodityGroupId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CommodityGroup>()
            .Property(x => x.Commoditygroup)
            .HasMaxLength(100);

            modelBuilder.Entity<CommodityCode>()
                .Property(x => x.Code)
                .HasMaxLength(50);

            modelBuilder.Entity<Stocklist>()
                .HasIndex(x => x.ItemId)
                .IsUnique();

            modelBuilder.Entity<ItemDocument>()
       .ToTable("ItemDocument", "dbo");

            modelBuilder.Entity<ItemSpecificationDetails>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<ItemSpecificationDetails>()
                            .Property(x => x.Id)
                            .ValueGeneratedOnAdd();

            modelBuilder.Entity<ItemSpecification>()
                   .HasMany(x => x.Details)
                   .WithOne(x => x.ItemSpecification)
                   .HasForeignKey(x => x.ItemSpecificationId)
                   .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ItemAssemblyDetail>()
               .HasKey(x => x.Id);

            modelBuilder.Entity<ItemAssemblyDetail>()
                            .Property(x => x.Id)
                            .ValueGeneratedOnAdd();

            modelBuilder.Entity<ItemAssemblyDetail>()
                        .HasOne(d => d.Assembly)
                        .WithMany(a => a.Details)
                        .HasForeignKey(d => d.AssemblyId)
                        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AlternatesItem>()
                .HasOne<Item>() // no navigation property used
                .WithMany(i => i.Alternates)
                .HasForeignKey(a => a.ItemId)
                .OnDelete(DeleteBehavior.Cascade);

            // ✅ Item -> Conditions (1 to many)
            modelBuilder.Entity<ItemCondition>()
                .HasOne<Item>()
                .WithMany(i => i.Conditions)
                .HasForeignKey(c => c.ItemId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<StoreroomItem>()
        .HasOne(s => s.Item)
        .WithMany(i => i.StoreroomItems)
        .HasForeignKey(s => s.ItemId);
        }



    }
}
