namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class TripDetails
    {
        public int? TripId { get; set; }
        public int? UserId { get; set; }
        public string? Status { get; set; }
        public int? FlightType { get; set; } = 0;
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FlightNumber { get; set; }
        public string? OtherCostCenter { get; set; }
        public string? Vehicle { get; set; }
        public int? VehicleId { get; set; }
        public string? Driver { get; set; }
        public string? DriverURL { get; set; }
        public DateTime? FlightDateTime { get; set; }
        public string? RequestedUser { get; set; }
        public int? PassengerId { get; set; }
        public string? MainPassenger { get; set; } 
        public int InformPassenger { get; set; }
        public int IsPrivate { get; set; }
        public int OutOfPolicy { get; set; }
        public int IsVIPtrip {  get; set; }
        public string? PredefinedName {  get; set; }
        public DateTime TransmittedDate { get; set; }
        public string? Comment { get; set; }
        public string? Itinerary { get; set; }
        public string? ExternalService { get; set; }
        public string? PaymentMode { get; set; }
        public string? Costcentercode { get; set; }

    }
}
