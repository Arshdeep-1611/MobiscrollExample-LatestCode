namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class OverTimeReport
    {
        public int? driver_id { get; set; }
        public short week_number { get; set; }
        public string? DriverName { get; set; }
        public int? year { get; set; }
        public int? Sort { get; set; }
        public decimal? Overtime_hours { get; set; }
        public decimal? recovery_during_week { get; set; }
    }

    public class JourneyReport
    {
        public int passenger_id { get; set; }
        public string? Responsible { get; set; }
        public int Number_of_journey { get; set; }
        public int? Sort { get; set; }
    }

    public class WeekendReport
    {
        public int DriverId { get; set; }
        public string? DriverName { get; set; }
        public int EventId { get; set; }
        public string? Date { get; set; }
        public string? Hours { get; set; }
        public string? Duration { get; set; }
        public string? Type { get; set; }
        public string? Night { get; set; }
        public string? LastNight { get; set; }
        public string? LastSunday { get; set; }
        public string? Sunday { get; set; }
        public int? Sort { get; set; }
        public double? TotalNightHours { get; set; }
        public double? TotalSundayHours { get; set; }
        public int? LegalMaxNight { get; set; }
        public int? LegalMaxSunday { get; set; }
        public double? NightDifference { get; set; }
        public double? SundayDifference { get; set; }

    }
    public class WeekendReportResult
    {
        public List<WeekendReport> Reports { get; set; }
        public int LegalMaxSunday { get; set; }
        public int LegalMaxNight { get; set; }
    }
}
