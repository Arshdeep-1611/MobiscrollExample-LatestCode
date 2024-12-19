namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public T Result { get; set; }        
    }
}
