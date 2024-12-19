namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class TripStatus
    {
        public int ML_Id { get; set; }
        public int status { get; set; }
        public string? new_status_description { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime TimeStamp { get; set; } = DateTime.Now;

    }
}
