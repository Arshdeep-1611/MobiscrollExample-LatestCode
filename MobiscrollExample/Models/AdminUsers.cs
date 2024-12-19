using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class AdminUsers
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string? CostCenterCode { get; set; }
        public DateTime? send_alert_from { get; set; }
        public DateTime? send_alert_to { get; set; }
        public int AccessLevel { get; set; }
        public int send_alert_during_weekend { get; set; }
        public int send_alert { get; set; }
        public string modified_by { get; set; }
        public DateTime? time_stamp { get; set; }

        public string? last_name { get; set; }
        public string? first_name { get; set; }
        public string? phone { get; set; }
        public string? mobile_phone { get; set; }
        public string? contact_phone { get; set; }
        public string? email { get; set; }

    }
}
