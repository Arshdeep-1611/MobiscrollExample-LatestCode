namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class BlobFile
    {
        public int? FileId { get; set; }
        public string? FileName { get; set; } = String.Empty;
        public string? BlobName { get; set; } = String.Empty;
        public byte[] Data { get; set; } = Array.Empty<byte>();
    }
}
