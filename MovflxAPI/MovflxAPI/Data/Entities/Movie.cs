using Microsoft.AspNetCore.Mvc.TagHelpers;

namespace MovflxAPI.Data.Entities
{
    public class Movie
    {
        public int Id { get; set; }
        public int MovieTMDBID { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public int ReleasedYear { get; set; }
        public AppUser User { get; set; }
        public string UserId { get; set; }
    }
}
