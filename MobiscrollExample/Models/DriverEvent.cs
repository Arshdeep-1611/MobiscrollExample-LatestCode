using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class DriverEvent
    {
        /* [id]
       ,[driver_id]
       ,[approver_user_id]
       ,[eventkind_id]
       ,[trip_id]
       ,[requestor_user_id]
       ,[date_from]
       ,[date_to]
       ,[duration]
       ,[amount]
       ,[acceptation_date]
       ,[rejection_date]
       ,[comment]
       ,[validation_comment]
       ,[modified_by]
       ,[time_stamp]*/
        public int Id { get; set; }
        public string? EventName { get; set; }
        public int? ExternalService { get; set; }
        public int? DriverId { get; set; }
        public string? Color { get; set; }
        public int? Level { get; set; }
        public string? DriverName { get; set; }
        public string? Code { get; set; }
        /*public int? ApproverUserId { get; set; }*/
        public int? TripId { get; set; }
        public int EventKindId { get; set; }
        //public int? RequesterUserID { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public DateTime? Duration { get; set; }
        public int? Amount { get; set; }
        public DateTime? AcceptationDate { get; set; }
        public DateTime? RejectionDate { get; set; }
        public string? Comment { get; set; }
        public string? ValidationComment { get; set; }
        public string? ModifiedBy { get; set; }


    }
    public class returnEvent
    {
        public int Id { get; set; }
        public string color { get; set; }
    }
    public class Associate
    {
        public int? TripId { get; set; }
        public DateTime? TripDate { get; set; }
        public string? MainPassenger { get; set; }
    }
}
