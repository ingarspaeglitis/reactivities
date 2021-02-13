using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence.Extensions;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<Activity> Activities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {           
        }
    }
}
