using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MovflxAPI.Data;
using MovflxAPI.Data.Entities;
using MovflxAPI.Dtos;
using System.Security.Claims;

namespace MovflxAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly Context context;
        private readonly UserManager<AppUser> userManager;

        public MovieController(Context context,UserManager<AppUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }
        [HttpGet]
        [Authorize]
        public ActionResult Get()
        {
            return Ok(User);
        }
        [HttpPost("Favourite")]
        public async Task<ActionResult> MakeMovieFav(MovieDto movieDto)
        {
            if (User is not null)
            {
                var Movie = new Movie
                {
                    MovieTMDBID = movieDto.MovieTMDBID,
                    Name = movieDto.Name,
                    PictureUrl = movieDto.PictureUrl,
                    ReleasedYear = movieDto.ReleasedYear,
                    Type = movieDto.Type,
                    UserId = (await userManager.FindByNameAsync(User.Identity.Name)).Id
                };
                context.Set<Movie>().Add(Movie);
                await context.SaveChangesAsync();
                return Ok();
            }
            return Unauthorized();
        }
    }
}
