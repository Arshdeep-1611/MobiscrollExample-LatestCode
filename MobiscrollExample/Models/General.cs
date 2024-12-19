namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public static class General
    {
        public static int? TripId { get; set; }
        public static int? FromLocationId { get; set; }
        public static int? ToLocationId { get; set; }
        public static DateTime? FromDate { get; set; }
        public static DateTime? ToDate { get; set; }
        public static int? OutOfPolicyTrip { get; set; }
        public static int? PreDefinedTrip { get; set; }
        public static int? Requester { get; set; }
        public static string? StatusIds { get; set; }
        public static int? Driver_Id { get; set; }
        public static int? Year { get; set; }
        public static DateOnly? DateFrom { get; set; }
        public static DateOnly? DateTo { get; set; }
        public static DateOnly? Date { get; set; }
        public static string? FromLocation { get; set; }
        public static string? ToLocation { get; set; }
        public static string? Beneficiary { get; set; }
        public static string? RequesterValue { get; set; }
        public static string? Status { get; set; }
        public static string? StatusName { get; set; }
        public static string? FlightInformation { get; set; }
        public static bool IsMyFutureTrips { get; set; } = false;
        public static bool IsDelegatedTrips { get; set; } = false;
        public static bool IsMyAllTrips { get; set; } = true;
        public static bool IsPlanning { get; set; } = true;
    }
}
