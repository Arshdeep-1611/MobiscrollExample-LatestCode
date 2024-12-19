namespace Nestle.CH.HQ.RSL.WebApp.ApiRequestBody
{
    public class AddDelegatesRequestBody
    {
        public int DelegatorId { get; set; }
        public List<int>? DelegateIds { get; set; }
        public string? ModifiedBy { get; set; }
    }
}
