using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MovflxAPI.Data.Entities;
using MovflxAPI.Dtos;
using MovflxAPI.Errors;
using MovflxAPI.Services.JWTToken;

namespace MovflxAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenService tokenService;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
        }
        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
                if (!IsEmailDuplicated(registerDto.Email))
                {
                    var appUser = new AppUser
                    {
                        FirstName = registerDto.FirstName,
                        LastName = registerDto.LastName,
                        Email = registerDto.Email,
                        UserName = registerDto.FirstName + registerDto.LastName,
                        PhoneNumber = registerDto.PhoneNumber,
                    };
                    var result = await userManager.CreateAsync(appUser, registerDto.Password);
                    if (result.Succeeded)
                        return Ok(SuccessRegisterDtoBuilder(registerDto));
                    else
                        return Ok(result.Errors);
                }
                else
                    return Ok(new RegisterErrorResponse("Email is registered Before"));
        }
        [HttpPost("Login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var AppUser = await userManager.FindByEmailAsync(loginDto.EmailAddress);
            if (AppUser is not null)
            {
                var result = await signInManager.PasswordSignInAsync(AppUser, loginDto.Password, false, false);
                if (result.Succeeded)
                {
                    var LoginResponse = new LoginResponseDto
                    {
                        Email = AppUser.Email,
                        Name = AppUser.FirstName + " " + AppUser.LastName,
                        Token = tokenService.CreateToken(AppUser)
                    };
                    return Ok(LoginResponse);
                }
            }
            return Ok(new ApiErrorsResponse(400));
        }
        private bool IsEmailDuplicated(string email)
        {
            var user = userManager.FindByEmailAsync(email).Result;
            return user is not null;
        }
        private RegisterResponseDto SuccessRegisterDtoBuilder(RegisterDto user)
        {
            var dto = new RegisterResponseDto
            {
                RegisteredUser = new RegisteredUser
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber
                }
            };
            return dto;
        }
    }
}
