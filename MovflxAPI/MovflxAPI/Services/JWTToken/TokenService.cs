using Microsoft.IdentityModel.Tokens;
using MovflxAPI.Data.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MovflxAPI.Services.JWTToken
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration configuration;

        public TokenService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string CreateToken(AppUser user)
        {
            var Claims = new List<Claim>
            {
                new Claim("Email Address",user.Email),
                new Claim("Name",user.FirstName+" "+user.LastName)
            };
            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"]));
            var token = new JwtSecurityToken
            (
                issuer: configuration["JWT:Issuer"],
                audience: configuration["JWT:Audience"],
                expires: DateTime.Now.AddDays(double.Parse(configuration["JWT:ExpireDate"])),
                claims: Claims,
                signingCredentials: new SigningCredentials(Key, SecurityAlgorithms.HmacSha256Signature)
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
