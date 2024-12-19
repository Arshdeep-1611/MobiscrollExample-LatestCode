namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class WorkReport
    {
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public DateTime? EventDuration { get; set; } 
        public DateTime? EventDateFrom { get; set; }
        public DateTime? EventDateTo { get; set; }
        public string? Name { get; set; }
        public int Year { get; set; }
        public string? EventTimeRange { get; set; }
        public string? EventDurationFormatted { get; set; }
        public string? FullName { get; set; }
        public int EventId { get; set; }
        public DateTime Date { get; set; }
        public string? EventKindName { get; set; }
        public DateTime? Red { get; set; }
        public DateTime? Other { get; set; }
        public DateTime? AbsencesHours { get; set; }
        public DateTime? NightHours { get; set; }
        public DateTime? SundayHours { get; set; }
        public DateTime? HoursDim { get; set; }
        public DateTime? HoursConduct { get; set; }
        public DateTime? HoursZZZ { get; set; }
        public DateTime? HoursNoConduct { get; set; }
        public DateTime? RecoveryHours { get; set; }
        public DateTime? ReservedHours { get; set; }
        public DateTime? HoursPlanned { get; set; }
        public DateTime? HoursCarriedOut { get; set; }
        public TimeSpan? HoursExceeding{ get; set; }
        public DateTime? Majoration { get; set; }
        public DateTime? MajorationValue { get; set; }
        public int? RateWorkOverTime { get; set; }
        public int? RateRiseExtraTimeWeekNight { get; set; }
        public int? RateRiseExtraTime { get; set; }
        public double? LegalMaxWorkTime { get; set; }
        public int? LegalMaxWorkOverTime { get; set; }
    }
    public class ReportEvent
    {
        public int Year { get; set; }

        public DateTime? week { get; set; }
        public int EventCount { get; set; }
        public DateTime? Date { get; set; }
        public string EventTimeRange { get; set; }
        public double Red { get; set; }
        public double Other { get; set; }
        public double AbsencesHours { get; set; }
        public double NightHours { get; set; }
        public double SundayHours { get; set; }
        public double HoursDim { get; set; }
        public double HoursConduct { get; set; }
        public double HoursZZZ { get; set; }
        public double HoursNoConduct { get; set; }
        public double RecoveryHours { get; set; }
        public double ReservedHours { get; set; }
        public double HoursPlanned { get; set; }
        public double HoursCarriedOut { get; set; }
        public double? TotalNightHours { get; set; }
        public double? TotalMajorationValue { get; set; }
    }
    public class EventSummary
    {
        public DateTime? Date { get; set; }
        public int EventCount { get; set; }
    }
    public class DailyReport
    {
        public DateTime Date { get; set; }
        public double? TotalNightHours { get; set; }
        public double? TotalMajorationValue { get; set; }
        public List<WorkReport> Events { get; set; }
    }
    //public class WeeklyReport
    //{
    //    public int WeekNumber { get; set; }
    //    public DateTime Date { get; set; }

    //    public string Week { get; set; }
    //    public List<DailyReport> DailyReports { get; set; }
    //}
    public class DriverReportSummary
    {
        public List<WeeklyReport> WeeklyReports { get; set; }
    }
    public class SpecificTotals
    {
        public double? FinalTotalNightHours { get; set; }
        public double? FinalTotalMajorationValue { get; set; }
        public double? TotalHoursPlanned { get; set; }
        public double? TotalHoursExceeding { get; set; }
        public double? TotalHoursCarriedOut { get; set; }
        public double? DifferenceExceedingPlanned { get; set; }
        public double? LegalMaxWorkTimeStr { get; set; }
    }

    public class DriverReportEvent
    {
        public int Year { get; set; }
        public String? Date { get; set; }
        public string week { get; set; }
        public string? EventTimeRange { get; set; }
        public double? Red { get; set; }
        public double? Other { get; set; }
        public double? AbsencesHours { get; set; }
        public double? NightHours { get; set; }
        public double? SundayHours { get; set; }
        public double? HoursDim { get; set; }
        public double? HoursConduct { get; set; }
        public double? HoursZZZ { get; set; }
        public double? HoursNoConduct { get; set; }
        public double? RecoveryHours { get; set; }
        public double? ReservedHours { get; set; }
        public double? HoursPlanned { get; set; }
        public double? HoursCarriedOut { get; set; }
        public TimeSpan? HoursExceeding { get; set; }
        public double? ExceedingHours { get; set; }
        public double? hoursExceeding { get; set; }
        public double? Majoration { get; set; }
        public double? MajorationValue { get; set; }
        public double? TotalNightHours { get; set; }
        public double? TotalMajorationValue { get; set; }
        public double? ExceedingWeeklyHours { get; set; }
        public double? LegalMaxWorkTimeStrDouble { get; set; }
        public string? DayDifference { get; set; }

    }

    public class ReportDriverEvent
    {
        public int WeekNumber { get; set; }
        public string? date { get; set; }
        public string? Week { get; set; }
        public string? eventTimeRange { get; set; }
        public double? red { get; set; }
        public double? other { get; set; }
        public double? absencesHours { get; set; }
        public double? nightHours { get; set; }
        public double? sundayHours { get; set; }
        public double? hoursDim { get; set; }
        public double? hoursConduct { get; set; }
        public double? hoursZZZ { get; set; }
        public double? hoursNoConduct { get; set; }
        public double? recoveryHours { get; set; }
        public double? reservedHours { get; set; }
        public double? hoursPlanned { get; set; }
        public double? hoursCarriedOut { get; set; }
        public TimeSpan? HoursExceeding { get; set; }
        public double? ExceedingHours { get; set; }
        public string? hoursExceeding { get; set; }

        public double? TotalNightHours { get; set; }
        public double? TotalMajorationValue { get; set; }
    }

    public class GroupedDriverReportEvent
    {
        public string? Date { get; set; }
        public string week { get; set; }
        public List<DriverReportEvent> DriverEvents { get; set; } = new List<DriverReportEvent>();
        public string? EventTimeRange { get; set; }
        public string? EventDurationFormatted { get; set; }
        public string? DailyTotal { get; set; }
        public double? TotalNightHours { get; set; }
        public double? TotalMajorationValue { get; set; }
    }

    public class WeeklyReport
    {
        public int WeekNumber { get; set; }
        public string? Date { get; set; }
        public string EventTimeRange { get; set; }
        public string WeeklyDurations { get; set; }
        public string WeeklyTotal { get; set; }
        public string Week { get; set; }
        public List<DriverReportEvent> DailyEvents { get; set; }
    }

    //public class WeeklyReport
    //{
    //    public int WeekNumber { get; set; }
    //    public DateTime Date { get; set; }
    //    public string week { get; set; }
    //    public string? EventTimeRange { get; set; }
    //    public string? EventDurationFormatted { get; set; }
    //    public string? WeeklyTotal { get; set; }
    //    public string? EventTimeRanges { get; set; }
    //    public string? WeeklyDurations { get; set; }
    //    public List<GroupedDriverReportEvent> DailyEvents { get; set; } = new List<GroupedDriverReportEvent>();
    //}
}
