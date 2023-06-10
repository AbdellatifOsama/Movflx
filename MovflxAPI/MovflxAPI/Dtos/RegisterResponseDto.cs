using System.ComponentModel.DataAnnotations;

namespace MovflxAPI.Dtos
{
    public class RegisterResponseDto
    {
        public string Message { get; set; } = "Success";
        public RegisteredUser RegisteredUser { get; set; }
    }
    public class RegisteredUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
