using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class Events
    {
        public int Id { get; set; } = 0;
        public int DriverID { get; set; } = 0;
        public int ApproverUserId { get; set; } = 0;
        public int EventKindId { get; set; } = 0;
        public int TripId { get; set; } = 0;
        public int RequesterUserID { get; set; } = 0;
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public DateTime Duration { get; set; }
        public decimal Amount { get; set; }
        public DateTime AcceptationDate { get; set; }
        public DateTime RejectionDate { get; set; }
        public string Comment { get; set; } = string.Empty;
        public string ValidationComment { get; set; }
        public string ModifiedBy { get; set; } = string.Empty;
        public DateTime TimeStamp { get; set; }

    }
    public class EventKind
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public int Level { get; set; } = 0;
        public int Overloadable { get; set; }
        public int MustOverloadable { get; set; }
        public int RequestFromTo { get; set; }
        public int RequestDuration { get; set; }
        public int RequestAmount { get; set; }
        public int RequestComments { get; set; }
        public int AccessLevel { get; set; } = 0;
        public int ValidationLevel { get; set; }
        public string Color { get; set; } = string.Empty;
        public string ValidationColor { get; set; } = string.Empty;
        public string RejectedColor { get; set; } = string.Empty;
        public int Valid { get; set; }
        public string ModifiedBy { get; set; } = string.Empty;
        public DateTime EventKindTimeStamp { get; set; }
        public string CategoryCode { get; set; } = string.Empty;
    }

	public class ColorInfo
	{
		public string Name { get; set; }
		public string HexValue { get; set; }

		public ColorInfo(string name, string hexValue)
		{
			Name = name;
			HexValue = hexValue;
		}
	}

}
