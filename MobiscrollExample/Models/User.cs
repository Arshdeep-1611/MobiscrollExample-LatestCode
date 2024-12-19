namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class User
    {
        public int UserId { get; set; } = 0;
        public string UserName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public bool IsManager { get; set; } = false;
        public int AccessLevel { get; set; } = 0;
        public int LanguageId { get; set; } = 0;
        public string UserType { get; set; } = string.Empty;
        public List<Languages> UserLanguages { get; set; } = new List<Languages>();


    }
}

