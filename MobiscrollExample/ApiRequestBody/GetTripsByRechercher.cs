namespace Nestle.CH.HQ.RSL.WebApp.ApiRequestBody
{
    public class GetTripsByRechercher
    {   
            public int? FromLocationId { get; set; }
            public int? ToLocationId { get; set; }
            public DateTime? FromDate { get; set; }
            public DateTime? ToDate { get; set; }
            public string? StatusIds { get; set; }
            public int? OutOfPolicyTrip { get; set; }
           public int? PreDefinedTrip { get; set; } = 0;
            public int? Requester { get; set; }  
    }
}
