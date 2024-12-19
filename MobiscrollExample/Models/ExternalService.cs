using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class ExternalService
    {
        public int id { get; set; }
        public string name { get; set; }
        public string code { get; set; }
        public string? contact_lastname { get; set; }
        public string? contact_firstname { get; set; }
        public string? contact_email { get; set; }
        public string? contact_phone { get; set; }
        public int unassigned_warning_hours { get; set; }
        public int unconfirmed_warning_hours { get; set; }
        public string? webservice_url { get; set; }
        public string? webservice_auth_user { get; set; }
        public string? webservice_auth_pwd { get; set; }
        public string? webservice_auth_code { get; set; }
        public int Interface { get; set; }
        public string? comment { get; set; }
        public int interval_cancelling_hours { get; set; }
        public int valid { get; set; }
        public string modified_by { get; set; }
        public DateTime time_stamp { get; set; }

    }
}
