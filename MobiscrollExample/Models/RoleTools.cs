using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Nestle.CH.HQ.RSL.WebApp.Models
{
	public class RoleTools
	{
        public int RoleToolId { get; set; } = 0;
        public int ToolId { get; set; }
        public int AccessLevel { get; set; } = 0;
        public Boolean IsEnabled { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
    }

	public class Tools
    {
        public int ToolsId { get; set; }
        public string ToolName { get; set; }
        public string TollText { get; set; }
        public DateTime TimeStamp { get; set; }
    }

	public class ToolRoles
	{
        public int ToolRoleId { get; set; }
        public int ToolId { get; set; }
        public int AccessLevel { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
