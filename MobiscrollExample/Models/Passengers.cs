namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class Passengers
    {
        public int? PassengerHubId { get; set; }
        public int? PassengerLuggageId { get; set; }
        public int? PassengerId { get; set; } = 0;
        public int? EmployeeId { get; set; } = 0;
        public string? PersonnelNbr { get; set; } = "0";
        public string? LastName { get; set; } = string.Empty;
        public string? FirstName { get; set; } = string.Empty;
        public string? Title { get; set; } = string.Empty;
        public string? TelePhone { get; set; } = string.Empty;
        public string? MobilePhone { get; set; } = string.Empty;
        public string? Phone { get; set; } = string.Empty;
        public string? DriverPhone { get; set; }
        public string? MainPassengerPhone { get; set; }
        public string? MainPassengerTelePhone { get; set; }
        public string? MainPassengerMobilePhone { get; set; }
        public string? Email { get; set; } = string.Empty;
        public int IsAuthorized { get; set; } = 0;
        public int IsPrivate { get; set; } = 0;
        public int AccessLevel { get; set; } = 0;
        public int IsEditable { get; set; } = 0;
        public string? Comment { get; set; } = string.Empty;
        public string? CostCenterCode { get; set; } = string.Empty;
        public string? CreatedBy { get; set; } = string.Empty;
        public string? ModifiedBy { get; set; } = string.Empty;
        public DateTime? TimeStamp { get; set; } = default(DateTime);
        public int? Valid { get; set; } = 0;
        public int IsVip { get; set; } = 0;
        public int? OwnerUserId { get; set; } = 0;
        public string? ContactPhone { get; set; } = string.Empty;
        public int HandBag { get; set; } = 0;
        public int Luggage { get; set; } = 0;
        public string? Special { get; set; } = string.Empty;
	}

    public class PassengersList
	{
		public List<Passengers> passengersItemList { get; set; } = new List<Passengers>();
	}
    public class Passenger
    {
        public int? PassengerId { get; set; }
        public string? FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public string? TelePhone { get; set; } = string.Empty;
        public string? MobilePhone { get; set; } = string.Empty;
        public string? Phone { get; set; } = string.Empty;
    }
}

