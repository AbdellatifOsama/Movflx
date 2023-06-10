namespace MovflxAPI.Errors
{
    public class RegisterErrorResponse
    {
        public string Message { get; set; } = "Failed";
        public string Error { get; set; }
        public RegisterErrorResponse(string error)
        {
            Error = error;
        }
    }
}
