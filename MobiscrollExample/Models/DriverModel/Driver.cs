namespace Nestle.CH.HQ.RSL.WebApp.Models.DriverModel
{
  public class Driver
    {
        public int? DriverId { get; set; }
        public int? UserId { get; set; }
        public string LastName { get; set; } = string.Empty;
        public string? UserName { get; set; }= string.Empty;
        //public string? VehicleName { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string? MobilePhone { get; set; } = string.Empty;
        public int? WeeklyWorkingHours { get; set; }
        public string? VehicleName { get; set; } = string.Empty;
        public int IsValid { get; set; }
        public string ModifiedBy { get; set; } = string.Empty;
        public DateTime? TimeStamp { get; set; }
        public int? UnAssignedWarningHours { get; set; }
        public int? UnConfirmedWarningHours { get; set; }
        public int? DefaultVehicleId { get; set; }
    }
}
