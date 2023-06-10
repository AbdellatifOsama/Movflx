namespace MovflxAPI.Dtos
{
    public class MovieDto
    {
        public int MovieTMDBID { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public int ReleasedYear { get; set; }
    }
}
