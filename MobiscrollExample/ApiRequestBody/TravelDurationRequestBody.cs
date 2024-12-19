namespace Nestle.CH.HQ.RSL.WebApp.ApiRequestBody
{
    public class TravelDurationRequestBody
    {
        public int OriginLocationId { get; set; }
        public int DestinationLocationId { get; set; }
        public DateTime StartTime { get; set; }
    }
}
