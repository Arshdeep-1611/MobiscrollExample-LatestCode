using Nestle.CH.HQ.RSL.WebApp.Models;
using Nestle.CH.HQ.RSL.WebApp.Models.LocationModel;
using Nestle.CH.HQ.RSL.WebApp.Models.PaymentModel;

namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class Trips
    {
        public int? TripId { get; set; }
        public int? Status { get; set; } = 0;
        public string? StatusName { get; set; }
        public int? FlightType { get; set; } = 0;
        public bool? IsMailSent { get; set; } = false;
        public bool? IsFavorite { get; set; } = false;
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? Driver { get; set; }
        public string? DriverURL { get; set; }
        public string? DriverPhone { get; set; }
        public string? MainPassengerPhone { get; set; }
        public string? MainPassengerTelePhone { get; set; }
        public string? MainPassengerMobilePhone { get; set; }
        public string? FlightNumber { get; set; }
        public string? OtherCostCenter { get; set; }
        public DateTime? FlightDateTime { get; set; }
        public List<TripStep>? TripSteps { get; set; }
        public User? RequestedUser { get; set; }
        public Passengers? MainPassenger { get; set; } = new Passengers();
        public int? CostCenterId { get; set; }
        public bool IsConfidential { get; set; } = false;
        public bool IsOutOfPolicy { get; set; } = false;
        public ExternalService? ExternalService { get; set; } = new ExternalService();
        public PaymentMode PaymentMode { get; set; } = new PaymentMode();
        public string? ModifiedBy { get; set; }
        public List<ValidationTrips>? TripLists { get; set; }


    }
    public class TripStep
    {
        public int? TripStepId { get; set; }
        public DateTime? TripFromDate { get; set; }
        public DateTime? TripToDate { get; set; }
        public Location? FromLocation { get; set; }
        public Location? ToLocation { get; set; }
        public string Mail { get; set; } = "No";
        public String? Comment { get; set; }
        public List<Passengers>? Passengers { get; set; }
    }

    public class OutOfPolicy
    {
        public int id { get; set; }
        public string name { get; set; }
        public DateTime transmitted_date { get; set; }
        public string external_code { get; set; }
    }
    public class PlanningTripUpdate
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? LanguageId { get; set; }
        public int? DriverId { get; set; }
        public int? Status { get; set; } = 0;
        public int? ExternalServiceId { get; set; }
        public string? ModifiedBy { get; set; }

    }
    public class PlanningTrips
    {
        public int? TripId { get; set; }
        public int? DriverId { get; set; }
        public int? ExternalServiceId { get; set; }
        public int? Status { get; set; } = 0;
        public string? StatusName { get; set; }
        public string? VehicleName { get; set; }
        public int? FlightType { get; set; } = 0;
        public bool? IsMailSent { get; set; } = false;
        public bool? IsFavorite { get; set; } = false;
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? FlightNumber { get; set; }
        public string? OtherCostCenter { get; set; }
        public DateTime? FlightDateTime { get; set; }
        public List<TripStep>? TripSteps { get; set; }
        public User? RequestedUser { get; set; }
        public List<Passenger>? MainPassenger { get; set; }
        public int? CostCenterId { get; set; }
        public bool IsConfidential { get; set; } = false;
        public bool IsOutOfPolicy { get; set; } = false;
        public ExternalService? ExternalService { get; set; } = new ExternalService();
        public PaymentMode PaymentMode { get; set; } = new PaymentMode();
        public string? ModifiedBy { get; set; }

    }

    public class ReportPassenger
    {
        public int? PassengerId { get; set; }
        public string? Name { get; set; } = string.Empty;
        public string? Passenger { get; set; }
        public string? TelePhone { get; set; } = string.Empty;
        public string? MobilePhone { get; set; } = string.Empty;
        public string? Phone { get; set; } = string.Empty;
        public string? DriverPhone { get; set; }
        public string? MainPassengerPhone { get; set; }
        public string? MainPassengerTelePhone { get; set; }
        public string? MainPassengerMobilePhone { get; set; }
    }

    public class ReportTripStep
    {
        public int? TripStepId { get; set; }
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public string? FromLocationName { get; set; }
        public string? ToLocationName { get; set; }
        public string? Mail { get; set; }
        public string? Comment { get; set; }
        public string? Passengers { get; set; }
    }

    public class TripReview
    {
        public int? TripId { get; set; }
        public string? Status { get; set; }
        public string? Header { get; set; }
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public int? FlightType { get; set; } = 0;
        public string? FlightNumber { get; set; }
        public string? Flight { get; set; }
        public string? Vehicle { get; set; }
        public int? VehicleId { get; set; }
        public string? Driver { get; set; }
        public int? ExternalServiceId { get; set; }
        public string? ExternaleServiceName { get; set; }
        public string? DriverPhone { get; set; }
        public DateTime FlightDateTime { get; set; }
        public string? Requestor { get; set; }
        public bool IsOutOfPolicy { get; set; } = false;
        public Passenger? MainPassenger { get; set; } 
        public string? Authorizedby { get; set; }
        public string? Comment { get; set; }
        public string? Itinerary { get; set; }
        public List<TripStep> TripSteps { get; set; } = new List<TripStep>();
    }
    public class ReportTripReview
    {
        public int? TripId { get; set; }
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public string? Status { get; set; }
        public string? Header { get; set; }
        public int? FlightType { get; set; } = 0;
        public string? FlightNumber { get; set; }
        public string? FormattedFromDate { get; set; }
        public string? Flight { get; set; }
        public string? Vehicle { get; set; }
        public int? VehicleId { get; set; }
        public string? Driver { get; set; }
        public bool IsOutOfPolicy { get; set; } = false;
        public int? ExternalServiceId { get; set; }
        public string? ExternaleServiceName { get; set; }
        public string? DriverPhone { get; set; }
        public DateTime FlightDateTime { get; set; }
        public string? Requestor { get; set; }
        public ReportPassenger? MainPassenger { get; set; }
        public string? Authorizedby { get; set; }
        public string? Comment { get; set; }
        public string? Itinerary { get; set; }
        public List<ReportTripStep> TripSteps { get; set; } = new List<ReportTripStep>();
    }
    
    public class ValidationTrips
    {

        public TimeOnly FromDate { get; set; }
        public TimeOnly ToDate { get; set; }
        public TimeOnly Hour { get; set; }
        public string? Passengers { get; set; }
        public string? FormattedHour { get; set; }
        public string? formattedFromDate { get; set; }
        public string? Location { get; set; }
        public string? Driver { get; set; }
        public TimeOnly? FlightDateTime { get; set; }
        public string? Flight { get; set; }
        public string? FromDateFormatted { get; set; }
    }
   

}
