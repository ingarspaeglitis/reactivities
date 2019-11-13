using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder builder)
        {
            builder.Entity<Value>()
               .HasData(
                   new Value { Id = 1, Name = "Value 101" },
                   new Value { Id = 2, Name = "Value 102" },
                   new Value { Id = 3, Name = "Value 103" }
               );
        }
    }
}
