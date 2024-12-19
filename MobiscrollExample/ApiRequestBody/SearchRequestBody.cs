namespace Nestle.CH.HQ.RSL.WebApp.ApiRequestBody
{
    public class SearchRequestBody
    {
        public int? TripId { get; set; }
        public int? PassengerId { get; set; }
        public int? VehicleId { get; set; }
        public string? PredefinedName { get; set; }
        public string? Costcentercode { get; set; }
        public string? Comment { get; set; }
        public string? Itinerary { get; set; }
        public DateTime? FlightDateTime { get; set; } // New property for combined flight date and time
        public int? FlightType { get; set; }
        public string? FlightNumber { get; set; }
        public DateTime? FromDateTime { get; set; }
        public DateTime? ToDateTime { get; set; }
        public int? InformPassenger { get; set; } = 0;
        public int? IsPrivate { get; set; } = 0;
        public int? IsVIPtrip { get; set; } = 0;

    }
}
