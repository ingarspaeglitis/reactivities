using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Persistence;
using System;

namespace API.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        internal static void EnsureMigrations(this IApplicationBuilder app)
        {
            app.EnsureMigration<DataContext>();
        }

        private static void EnsureMigration<T>(this IApplicationBuilder app) where T : DbContext
        {
            using var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
            using var context = serviceScope.ServiceProvider.GetService<T>();

            try
            {
                context.Database.Migrate();
            }
            catch (Exception ex)
            {
                var logger = app.ApplicationServices.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "Error occured during database migration");
            }            
        }
    }
}
