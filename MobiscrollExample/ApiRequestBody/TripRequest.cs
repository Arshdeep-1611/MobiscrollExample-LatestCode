namespace Nestle.CH.HQ.RSL.WebApp.ApiRequestBody
{
    public class TripRequest
    {
        public int? TripId { get; set; }
        public int? FlightType { get; set; } = 0;
        public DateTime? FlightDateTime { get; set; }
        public string? FlightNumber { get; set; }
        public DateTime? TripStartDateTime { get; set; }
        public string? StatusName { get; set; }
        public DateTime? TripEndDateTime { get; set; }
        public List<TripStepRequest>? TripSteps { get; set; } = new List<TripStepRequest>();
        public int? RequestedUser { get; set; }
        public string? ModifiedBy { get; set; }
        public DeletedItems ItemsDeleted { get; set; } = new DeletedItems();
        public Boolean IsOutOfPolicy { get; set; } = false;
        public Boolean IsFavoriteTrip { get; set; } = false;
        public int? ExternalServiceId { get; set; }
        public int? PaymentModeId { get; set; }
        public DateTime? TransmittedDate { get; set; }
        public string? ExternalCode { get; set; }
        public int? MainPassengerId { get; set; }
        public int? SelectedPassengerId { get; set; }
        public string? CostCenterCode { get; set; }
        public Boolean IsConfidential { get; set; } = false;
        public Boolean IsStatusChange { get; set; } = true;
        public Boolean AlertPassenger { get; set; } = false;
        public string? Comment { get; set; }

    }

    public class TripStepRequest
    {
        public int? TripStepNumber { get; set; }
        public int? TripStepId { get; set; }
        public DateTime? StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
        public int? StartLocationId { get; set; }
        public int? EndLocationId { get; set; }
        public Boolean? IsMailRequired { get; set; } = false;
        public string? Comment { get; set; }
        public List<PassengerRequest>? Passengers { get; set; } = new List<PassengerRequest>();
        public string? ModifiedBy { get; set; }
        public DeletedItems ItemsDeleted { get; set; } = new DeletedItems();

    }
    public class PassengerRequest
    {
        public int? PassengerHubId { get; set; }
        public int? PassengerId { get; set; }
        public int? PassengerLuggageId { get; set; }
        public int HandBag { get; set; } = 0;
        public int Luggage { get; set; } = 0;
        public string? Special { get; set; }

    }
    public class DeletedItems
    {
        public List<int>? DeletedPassengers { get; set; } = new List<int>();
        public List<int>? DeletedTripSteps { get; set; } = new List<int>();

    }

}
