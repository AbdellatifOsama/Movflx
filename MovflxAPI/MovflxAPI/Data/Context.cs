using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MovflxAPI.Data.Entities;

namespace MovflxAPI.Data
{
    public class Context:IdentityDbContext<AppUser>
    {
        public Context(DbContextOptions<Context> options):base(options) { }
        DbSet<Movie> Movies { get; set; }
    }
}
