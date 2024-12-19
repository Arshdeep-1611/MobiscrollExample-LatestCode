using System.ComponentModel.DataAnnotations;

namespace Nestle.CH.HQ.RSL.WebApp.Models
{
	public class XmdrEmployee
	{
		public string? PersonnelNbr { get; set; } = "0";
		public string? LastName { get; set; } = string.Empty;
		public string? FirstName { get; set; } = string.Empty;
		public string BirthDate { get; set; } = string.Empty;
		public string BirthPlace { get; set; } = string.Empty;
		public string Gender { get; set; } = string.Empty;
		public string Initials { get; set; } = string.Empty;
		public string Building { get; set; } = string.Empty;
		public string Room { get; set; } = string.Empty;
		public string? MobileNumber { get; set; } = string.Empty;
		public string? PhoneNumber { get; set; } = string.Empty;
		public string? Email { get; set; } = string.Empty;
		public string FaxNumber { get; set; } = string.Empty;
		public string? EmpId { get; set; } = string.Empty;
		public string EmpcatCode { get; set; } = string.Empty;
		public string EmpgrpCode { get; set; } = string.Empty;
		public string CompanyCode { get; set; } = string.Empty;
		public string PrsnlareaCode { get; set; } = string.Empty;
		public string Position { get; set; } = string.Empty;
		public string Rank { get; set; } = string.Empty;
		public string Valid { get; set; } = string.Empty;
		public string JobName { get; set; } = string.Empty;
		public string FrmadrName { get; set; } = string.Empty;
		public string ShortName { get; set; } = string.Empty;
		public string CompanyLegalName { get; set; } = string.Empty;
		public string City { get; set; } = string.Empty;
		public string HouseNumber { get; set; } = string.Empty;
		public string HouseNumberSupplement { get; set; } = string.Empty;
		public string Street { get; set; } = string.Empty;
		public string Street2 { get; set; } = string.Empty;
		public string Street3 { get; set; } = string.Empty;
		public string Street4 { get; set; } = string.Empty;
		public string Street5 { get; set; } = string.Empty;
		public string CityPostalCode { get; set; } = string.Empty;
	}

    public class XmdrEmployeeSearch
    {
        public string? EmpId { get; set; } = string.Empty;
        public string? Title { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public string? FirstName { get; set; } = string.Empty;
        public string? MobileNumber { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public string? PersonnelNbr { get; set; } = string.Empty;
        public string? CostCenterName { get; set; } = string.Empty;
		public int? IsVipOrAuthorized { get; set; } = 0;
	}

    public class XmdrEmployeeSearchCriteria
    {
        public string? LastName { get; set; } = string.Empty;
        public string? FirstName { get; set; } = string.Empty;
    }
}
