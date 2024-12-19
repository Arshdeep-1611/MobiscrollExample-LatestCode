namespace Nestle.CH.HQ.RSL.WebApp.Models.LocationModel
{
    public class Location
    {

        public int? LocationId { get; set; }
        public string? Code { get; set; } = string.Empty;
        public string? LocationName { get; set; } = string.Empty;
        public int? IsPrivate { get; set; }
        public int? IsEditable { get; set; }
        public string? Npa { get; set; } = string.Empty;
        public int UserId { get; set; }
        public int? Temps { get; set; }
        public String? LocationType { get; set; }
        public int? BufferBefore { get; set; } = 0;
        public int? BufferAfter { get; set; } = 0;
        public int? Valid { get; set; }
        public string? Street { get; set; } = string.Empty;
        public string? City { get; set; } = string.Empty;
        public string? Country { get; set; } = string.Empty;
        public string? Comment { get; set; } = string.Empty;
        public string? Latitude { get; set; } = string.Empty;
        public string? Longitude { get; set; } = string.Empty;
        public string? ModifiedBy { get; set; } = string.Empty;
        public int? OwnerUserId { get; set; }
        public DateTime? TimeStamp { get; set; }
        public int? Zoom { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
