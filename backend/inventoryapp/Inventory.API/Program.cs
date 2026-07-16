using Inventory.API.Services;
using Inventory.Application.Interface;
using Inventory.Application.Repositories;
using Inventory.Application.Services;
using Inventory.Application.Servies;
using Inventory.Infrastructure.Repositories;
using Inventory.Persistence.Context;
using Inventory.Persistence.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;



var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://0.0.0.0:10000");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<StoreroomService>();
builder.Services.AddScoped<IItemRepository, ItemRepository>();
builder.Services.AddScoped<ItemService>();
builder.Services.AddScoped<VendorItemsService>();
builder.Services.AddScoped<ItemAssemblyService>();
builder.Services.AddScoped<DocumentDetailsService>();

builder.Services.AddScoped<ItemDocumentService>();
builder.Services.AddScoped<StockListService>();

builder.Services.AddScoped<StockCancelService>();



builder.Services.AddScoped<IMasterRepository, MasterRepository>();
builder.Services.AddScoped<IMasterdetailRepository, MasterdetailRepository>();
builder.Services.AddScoped<IAlternatesRepository, AlternatesRepository>();
builder.Services.AddScoped<IItemAssemblyRepository, ItemAssemblyRepository>();
builder.Services.AddScoped<IItemSpecificationRepository, ItemSpecificationRepository>();
builder.Services.AddScoped<IStoreroomItemRepository, StoreroomRepository>();
builder.Services.AddScoped<IVendorItemsRepository, VendorItemsRepository>();
builder.Services.AddScoped<IDocumentDetailsRepository, DocumentDetailsRepository>();
builder.Services.AddScoped<IItemDocumentRepository, ItemDocumentRepository>();
builder.Services.AddScoped<IItemListRepository, ItemListRepository>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IStockListRepository, StockListRepository>();

builder.Services.AddScoped<IStockCancelRepository,StockCancelRepository>();

builder.Services.AddScoped<IStockTransactionRepository,StockTransactionRepository>();

builder.Services.AddScoped<StockTransactionService>();
builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();
builder.Services.AddScoped<DashboardService>();

builder.Services.AddScoped<ICurrencyRepository,CurrencyRepository>();
 
builder.Services.AddScoped<CurrencyService>();

builder.Services.AddScoped<IDiscountRepository,DiscountRepository>();

builder.Services.AddScoped<DiscountService>();

builder.Services.AddScoped<ITaxRepository,TaxRepository>();

builder.Services.AddScoped<TaxService>();

builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();

builder.Services.AddScoped<CompanyService>();

builder.Services.AddScoped<IRoleRepository, RoleRepository>();

builder.Services.AddScoped<ICostCodeRepository, CostCodeRepository>();

builder.Services.AddScoped<CostCodeService>();

builder.Services.AddScoped<
    IUserDetailRepository,
    UserDetailRepository>();

builder.Services.AddScoped<UserDetailService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IServiceItemRepository,ServiceItemRepository>();

builder.Services.AddScoped<ServiceItemService>();

builder.Services.AddScoped<ICommodityGroupRepository,CommodityGroupRepository>();

builder.Services.AddScoped<CommodityGroupService>();

builder.Services.AddScoped<StoreroomCreateService>();

builder.Services.AddScoped<IStoreroomRepository, StoreroomCreateRepository>();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
            )
        };
    });

builder.Services.AddControllers()
     .AddJsonOptions(options =>
     {
         options.JsonSerializerOptions.ReferenceHandler =
             ReferenceHandler.IgnoreCycles;
     });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll",
//        policy =>
//        {
//            policy.AllowAnyOrigin()
//                   .AllowAnyHeader()
//                   .AllowAnyMethod();
//        });
//});



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "https://kms-cafm-admin.sathyaraj-air.workers.dev",
            "http://localhost:4200"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll", policy =>
//       // policy.AllowAnyOrigin()
//       policy.WithOrigins("http://localhost:4200")
//              .AllowAnyMethod()
//              .AllowAnyHeader());
//});

var app = builder.Build();

//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
app.UseSwagger();
app.UseSwaggerUI();
app.UseStaticFiles();
//app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("AllowFrontend");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();
 
app.Run();
