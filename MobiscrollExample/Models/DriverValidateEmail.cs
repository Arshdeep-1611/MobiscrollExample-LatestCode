namespace Nestle.CH.HQ.RSL.WebApp.Models

{
    public class DriverValidateEmail
    {
        public int id { get; set; }
        //public int status { get; set; }
        public string? modifiedBy { get; set; }
        public string? error_message { get; set; }
        public int is_accepted { get; set; }
    }
}
