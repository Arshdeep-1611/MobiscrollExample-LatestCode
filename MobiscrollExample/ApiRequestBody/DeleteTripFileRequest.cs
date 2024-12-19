namespace Nestle.CH.HQ.RSL.WebApp.ApiRequestBody
{
    public class DeleteTripFileRequest
    {
        public int FileId { get; set; }
        public string BlobName { get; set; } = String.Empty;
    }
}
