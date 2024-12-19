namespace Nestle.CH.HQ.RSL.WebApp.ApiRequestBody
{
    public class GetTripsRequestBody
    {
        public DateTime? Date { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public string? Requestor { get; set; }
        public string? Beneficiary { get; set; }
        public string? FlightInformation { get; set; }
        public string? Status { get; set; }
        public bool IsMyFutureTrips { get; set; } = false;
        public bool IsDelegatedTrips { get; set; } = false;
        public bool IsMyAllTrips { get; set; } = true;
        public string? StatusValue { get; set; }
        public string? StatusName { get; set; }
    }
}
