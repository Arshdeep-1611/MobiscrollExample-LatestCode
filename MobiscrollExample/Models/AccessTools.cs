namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class AccessTools
    {
        public int? ToolsId { get; set; }
        public string? Tool { get; set; }
        public int? ToolNumber { get; set; }
        public int? AccessLevel { get; set; }
        public string ModifiedBy { get; set; } = string.Empty;
        public DateTime? TimeStamp { get; set; }
        public int? IsAdded { get; set; }
    }
}
