using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nestle.CH.HQ.RSL.WebApp.Models.PaymentModel
{
    public class PaymentMode
    {

        public int? user_id { get; set; }
        public int? Id { get; set; }
        public string? Name { get; set; }
        public int? Type { get; set; }
        public int? Valid { get; set; } = 0;
        public int? Transmitted { get; set; } = 0;
        public string? Comment { get; set; }
        public string? Modified_By { get; set; }
        public DateTime? Time_Stamp { get; set; }
    }

    public class ServiceModel
    {
        /*int paymentmodeid, int type, string ownerName, int cardNumber, int cardExpiryMonth, int cardExpiryYear, int ccNumber, int glAccNumber, int externalSerId*/
        public int paymentModeId { get; set; }
        public int Type { get; set; }
        public string? OwnerName { get; set; }
        public string? CardNumber { get; set; }
        public string? CardExpiryMonth { get; set; }
        public string? CardExpiryYear { get; set;}
        public string? CostCenterNumber { get; set; }
        public string? GlAccNumber { get; set; }
        public int ExternalserviceId { get; set; }
    }
    public class AuthenticateModel
    {
        /*        PaymentModeId=paymentmodeid,
                                ExternalServiceId=externalServiceId,
                                Externalcode= result.Result,
                                ModifiedBy= HttpContext.Session.GetString("FullName")*/
        public int id { get; set; }
        public int PaymentModeId { get; set; }
        public int ExternalServiceId { get; set; }
        public int ExternalCode { get; set; }
        public string? ModifiedBy { get; set; } 

    }
}
