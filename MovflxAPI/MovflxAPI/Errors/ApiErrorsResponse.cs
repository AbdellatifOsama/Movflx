namespace MovflxAPI.Errors
{
    public class ApiErrorsResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public ApiErrorsResponse(int code, string? message = null)
        {
            StatusCode = code;
            Message = message ?? GetMessageByCode(code);
        }
        private string GetMessageByCode(int code)
        {
            switch (code)
            {
                case 400: return "Bad Request";
                case 401: return "UnAuthorized";
                case 404: return "Resource Not Found";
                case 500: return "Server Error";
                default: return null;
            }
        }
    }
}
