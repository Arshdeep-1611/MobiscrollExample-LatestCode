namespace Nestle.CH.HQ.RSL.WebApp.Models

{
    public class Delegates
    {
        public int user_id { get; set; }
        public int DelegatorId { get; set; }
        public int DelegateId { get; set; }
        public string? LastName { get; set; }
        public string FirstName { get; set; }
        public string CostCenterCode { get; set; }
        public string CostCenterName { get; set; }
    }

    public class DelegatesList
    {
        public List<Delegates> delegatesItemList { get; set; } = new List<Delegates>();
    }

}


