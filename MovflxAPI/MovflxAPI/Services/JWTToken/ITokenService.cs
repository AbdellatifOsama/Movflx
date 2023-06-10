using MovflxAPI.Data.Entities;

namespace MovflxAPI.Services.JWTToken
{
    public interface ITokenService
    {
        public string CreateToken(AppUser user);
    }
}
