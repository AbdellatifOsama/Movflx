using Microsoft.AspNetCore.Identity;

namespace MovflxAPI.Data.Entities
{
    public class AppUser:IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Movie> Movies { get; set; }
    }
}
