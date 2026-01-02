using Application.Activities.Queries;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
builder.Services.AddMediatR(x =>
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>());
builder.Services.AddAutoMapper(cfg =>
{
    cfg.LicenseKey = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ikx1Y2t5UGVubnlTb2Z0d2FyZUxpY2Vuc2VLZXkvYmJiMTNhY2I1OTkwNGQ4OWI0Y2IxYzg1ZjA4OGNjZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2x1Y2t5cGVubnlzb2Z0d2FyZS5jb20iLCJhdWQiOiJMdWNreVBlbm55U29mdHdhcmUiLCJleHAiOiIxNzk4ODQ4MDAwIiwiaWF0IjoiMTc2NzM3NDAxMCIsImFjY291bnRfaWQiOiIwMTliN2ZiMjU1YzA3MTIxOTdmZTk1MDllNWYzODU4OSIsImN1c3RvbWVyX2lkIjoiY3RtXzAxa2R6djZlMTY5OTZuazE3YTg1MGhubmNyIiwic3ViX2lkIjoiLSIsImVkaXRpb24iOiIwIiwidHlwZSI6IjIifQ.FJiQpQmcZpQBJT6QQPqKANAvMcjg6vsiRt7bf4vhvNxfyAiK_JaJYoGlHnqwIFFFa1oPHMdqBlut-WPnH2azFDGtLK0DXhgHLnPAS2B4R-235ZRaq_iHs-oqiI7h1sBPEhNXEW5WjozC6a3Pn5T6SuMu2UaA4e0pTHhHRr9_n-prTgn3nSFopHA7VDPbdCK6Dq-PJJX7tAVHvgL4qecYjDNPW5-96tVNt2zEN7TCqibSHx5cvZeLdKC7KFl3F6mW7H8CIc-8nGAcK6RMKow7khPrtJIjkWwJKjQ9G91lhKh60HAFKnCPfW_Y5TKaGn7ez7w1-SPkDKbFqccUlyZSlA";
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("http://localhost:3000", "https://localhost:3000"));

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();

    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration.");
}

app.Run();
