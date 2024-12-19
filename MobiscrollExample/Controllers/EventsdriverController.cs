using Microsoft.AspNetCore.Mvc;
/*using Microsoft.Identity.Abstractions;
using Microsoft.Identity.Web;*/
using Nestle.CH.HQ.RSL.WebApp.Models;
using Nestle.CH.HQ.RSL.WebApp.Models.DriverModel;
using System.Globalization;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Nestle.CH.HQ.RSL.WebApp.Controllers
{
    //[AuthorizeForScopes(ScopeKeySection = "ServiceAPI:Scopes")]
    public class EventsdriverController : Controller
    {
        //private readonly IDownstreamApi downstreamApi;

        /* public EventsdriverController(IDownstreamApi downstreamApi)
         {
             this.downstreamApi = downstreamApi;
         }*/

        [HttpGet]
        public async Task<IActionResult> GetAllEvents(DateTime dateFrom, DateTime dateTo)
        {
            // Example date conversion
            string dateFromString = dateFrom.ToString("MM/dd/yyyy HH:mm:ss");
            string dateToString = dateTo.ToString("MM/dd/yyyy HH:mm:ss");
            try
            {


                // Sample data response with 10 DriverEvent records
                var result = new ApiResponse<List<DriverEvent>>()
                {
                    Success = true,
                    Result = new List<DriverEvent>
        {
           new DriverEvent
            {
                Id = 1,
                EventName = "Heures supplémentaires",
                ExternalService = 1,
                DriverId = 1,
                Color = "#ff6347",
                Level = 2,
                DriverName = "Guy Pittier",
                Code = "Heures sup",
                TripId = 101,
                EventKindId = 2,
                DateFrom = new DateTime(2024, 11, 10, 8, 0, 0),
                DateTo = new DateTime(2024, 11, 10, 12, 0, 0),
                Duration = DateTime.MinValue.Add(new TimeSpan(4, 0, 0)), // 4 hours
                Amount = 50,
                AcceptationDate = new DateTime(2024, 11, 10, 9, 30, 0),
                RejectionDate = null,
                Comment = "Extra hours for urgent task",
                ValidationComment = "Approved for overtime",
                ModifiedBy = "Admin"
            },
            new DriverEvent
            {
                Id = 2,
                EventName = "Heure supplémentaire",
                ExternalService = 2,
                DriverId = 1,
                Color = "#32cd32",
                Level = 3,
                DriverName = "John Doe",
                Code = "Extra hour",
                TripId = 102,
                EventKindId = 1,
                DateFrom = new DateTime(2024, 11, 10, 9, 0, 0),
                DateTo = new DateTime(2024, 11, 10, 12, 0, 0),
                Duration = DateTime.MinValue.Add(new TimeSpan(3, 0, 0)), // 3 hours
                Amount = 60,
                AcceptationDate = new DateTime(2024, 11, 10, 10, 0, 0),
                RejectionDate = null,
                Comment = "Worked additional hours",
                ValidationComment = "Overtime approved",
                ModifiedBy = "Admin"
            },
            new DriverEvent
            {
                Id = 3,
                EventName = "Break Time",
                ExternalService = 1,
                DriverId = 2,
                Color = "#add8e6",
                Level = 1,
                DriverName = "Sarah Lee",
                Code = "Break",
                TripId = 103,
                EventKindId = 3,
                DateFrom = new DateTime(2024, 11, 10, 14, 0, 0),
                DateTo = new DateTime(2024, 11, 10, 15, 0, 0),
                Duration = DateTime.MinValue.Add(new TimeSpan(1, 0, 0)), // 1 hour
                Amount = 10,
                AcceptationDate = new DateTime(2024, 11, 10, 14, 30, 0),
                RejectionDate = null,
                Comment = "Break time",
                ValidationComment = "Break time approved",
                ModifiedBy = "Admin"
            },
            new DriverEvent
            {
                Id = 4,
                EventName = "Late Arrival",
                ExternalService = 1,
                DriverId = 3,
                Color = "#ff4500",
                Level = 3,
                DriverName = "James Bond",
                Code = "Late Arrival",
                TripId = 104,
                EventKindId = 1,
                DateFrom = new DateTime(2024, 11, 10, 16, 0, 0),
                DateTo = new DateTime(2024, 11, 10, 17, 30, 0),
                Duration = DateTime.MinValue.Add(new TimeSpan(1, 30, 0)), // 1.5 hours
                Amount = 40,
                AcceptationDate = new DateTime(2024, 11, 10, 16, 30, 0),
                RejectionDate = null,
                Comment = "Delayed due to traffic",
                ValidationComment = "Late arrival approved",
                ModifiedBy = "Admin"
            },
            new DriverEvent
            {
                Id = 5,
                EventName = "Scheduled Rest",
                ExternalService = 2,
                DriverId = 4,
                Color = "#8a2be2",
                Level = 2,
                DriverName = "Oliver Queen",
                Code = "Rest",
                TripId = 105,
                EventKindId = 2,
                DateFrom = new DateTime(2024, 11, 10, 20, 0, 0),
                DateTo = new DateTime(2024, 11, 10, 21, 0, 0),
                Duration = DateTime.MinValue.Add(new TimeSpan(1, 0, 0)), // 1 hour
                Amount = 15,
                AcceptationDate = new DateTime(2024, 11, 10, 20, 15, 0),
                RejectionDate = null,
                Comment = "Scheduled break",
                ValidationComment = "Rest time approved",
                ModifiedBy = "Admin"
            },
            new DriverEvent
            {
                Id = 6,
                EventName = "Urgent Delivery",
                ExternalService = 3,
                DriverId = 5,
                Color = "#ffff00",
                Level = 1,
                DriverName = "Bruce Wayne",
                Code = "Urgent",
                TripId = 106,
                EventKindId = 3,
                DateFrom = new DateTime(2024, 11, 10, 18, 0, 0),
                DateTo = new DateTime(2024, 11, 10, 19, 0, 0),
                Duration = DateTime.MinValue.Add(new TimeSpan(1, 0, 0)), // 1 hour
                Amount = 100,
                AcceptationDate = new DateTime(2024, 11, 10, 18, 15, 0),
                RejectionDate = null,
                Comment = "Urgent delivery for client",
                ValidationComment = "Approved for urgent delivery",
                ModifiedBy = "Admin"
            },
            new DriverEvent
            {
                Id = 7,
                EventName = "Scheduled Maintenance",
                ExternalService = 4,
                DriverId = 2,
                Color = "#f0e68c",
                Level = 2,
                DriverName = "Clark Kent",
                Code = "Maintenance",
                TripId = 107,
                EventKindId = 2,
                DateFrom = new DateTime(2024, 11, 11, 10, 0, 0),
                DateTo = new DateTime(2024, 11, 11, 12, 0, 0),
                Duration = DateTime.MinValue.Add(new TimeSpan(2, 0, 0)), // 2 hours
                Amount = 30,
                AcceptationDate = new DateTime(2024, 11, 11, 10, 30, 0),
                RejectionDate = null,
                Comment = "Scheduled maintenance",
                ValidationComment = "Maintenance approved",
                ModifiedBy = "Admin"
            },
            new DriverEvent
            {
                Id = 8,
                EventName = "Client Meeting",
                ExternalService = 1,
                DriverId = 6,
                Color = "#008000",
                Level = 3,
                DriverName = "Tony Stark",
                Code = "Meeting",
                TripId = 108,
                EventKindId = 3,
                DateFrom = new DateTime(2024, 11, 11, 13, 0, 0),
                DateTo = new DateTime(2024, 11, 11, 15, 0, 0),
                Duration = DateTime.MinValue.Add(new TimeSpan(2, 0, 0)), // 2 hours
                Amount = 80,
                AcceptationDate = new DateTime(2024, 11, 11, 13, 30, 0),
                RejectionDate = null,
                Comment = "Meeting with the client",
                ValidationComment = "Meeting approved",
                ModifiedBy = "Admin"
            },
            new DriverEvent
            {
                Id = 9,
                EventName = "Emergency",
                ExternalService = 5,
                DriverId = 7,
                Color = "#ff0000",
                Level = 1,
                DriverName = "Peter Parker",
                Code = "Emergency",
                TripId = 109,
                EventKindId = 1,
                DateFrom = new DateTime(2024, 11, 11, 15, 0, 0),
                DateTo = new DateTime(2024, 11, 11, 16, 0, 0),
                Duration = DateTime.MinValue.Add(new TimeSpan(1, 0, 0)), // 1 hour
                Amount = 120,
                AcceptationDate = new DateTime(2024, 11, 11, 15, 15, 0),
                RejectionDate = null,
                Comment = "Emergency service",
                ValidationComment = "Emergency approved",
                ModifiedBy = "Admin"
            },
            new DriverEvent
            {
                Id = 10,
                EventName = "Delivery Preparation",
                ExternalService = 1,
                DriverId = 4,
                Color = "#dda0dd",
                Level = 2,
                DriverName = "Natasha Romanoff",
                Code = "Prep",
                TripId = 110,
                EventKindId = 2,
                DateFrom = new DateTime(2024, 11, 11, 17, 0, 0),
                DateTo = new DateTime(2024, 11, 11, 19, 0, 0),
                Duration = DateTime.MinValue.Add(new TimeSpan(2, 0, 0)), // 2 hours
                Amount = 45,
                AcceptationDate = new DateTime(2024, 11, 11, 17, 30, 0),
                RejectionDate = null,
                Comment = "Preparing delivery",
                ValidationComment = "Prep approved",
                ModifiedBy = "Admin"
            }
        },
                    Message = "Data retrieved successfully"
                };

                // Check if the result was successful
                if (result.Success == true)
                {
                    return Json(result.Result);
                }
                else
                {
                    return Json(result.Message);
                }
            }

            catch (Exception ex)
            {

                return Json(Json(ex));
            }
        }

    [HttpGet]
        public async Task<IActionResult> GetDriver()
        {
            try
            {
                // //Logger.Instance.Debug("Get Driver called");
                var result = new ApiResponse<DriverEvent>();
                ////Logger.Instance.Debug("Action completed");
                return Json(result.Result);
            }
            catch (Exception ex)
            {
               // //Logger.Instance.Error(ex);
                return Json(ex);
            }
        }

        [HttpGet]
        public async Task<IActionResult> CheckDriverAvailaibility(int driverid,DateTime date,DateTime dateto)
        {
            try
            {
                // //Logger.Instance.Debug("Get Driver called");
                string dateFromString = date.ToString("MM/dd/yyyy HH:mm:ss");
                string dateToString = dateto.ToString("MM/dd/yyyy HH:mm:ss");
                var result = new ApiResponse<DriverEvent>();
                ////Logger.Instance.Debug("Action completed");
                return Json(result.Result);
            }
            catch (Exception ex)
            {
                // //Logger.Instance.Error(ex);
                return Json(ex);
            }
        }
        
        [HttpGet]
        public async Task<IActionResult> GetDriverMobile(DateOnly eventDate,int driverId)
        {
            try
            {
                string dateFromString = eventDate.ToString("MM/dd/yyyy");
                /*string dateToString = dateTo.ToString("MM/dd/yyyy HH:mm:ss");*/
                // //Logger.Instance.Debug("Get Driver called");
                //var result = await downstreamApi.CallApiForUserAsync<ApiResponse<List<DriverEvent>>>(
                //    "ServiceAPI",
                //     options =>
                //     {
                //         options.HttpMethod = HttpMethod.Get.Method;
                //         options.RelativePath = $"api/v1/user/DriverEvents/getdrivereventmobile?Date={dateFromString}&driverId={driverId}";
                //     });
                var result = new ApiResponse<DriverEvent>();
                ////Logger.Instance.Debug("Action completed");
                return Json(result.Result);
            }
            catch (Exception ex)
            {
                // //Logger.Instance.Error(ex);
                return Json(ex);
            }
        }
        [HttpPost]
        public async Task<IActionResult> SaveOrEditEvent(int driverId, int eventkindId, string dateFrom, string dateTo, string comments, int? tripId, int id = 0,int amount=0)
        {
            string modified = HttpContext.Session.GetString("UserLoginName");
            DateTime parsedDateFrom;
            DateTime parsedDateTo;

            // Define the expected format for the date strings
            string format = "M/d/yyyy, h:mm:ss tt"; // Adjust this based on your input format

            // Attempt to parse dateFrom
            if (!DateTime.TryParseExact(dateFrom, format, CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDateFrom))
            {
                return Json(new { success = false, message = "Invalid date format for dateFrom." });
            }

            // Attempt to parse dateTo
            if (!DateTime.TryParseExact(dateTo, format, CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDateTo))
            {
                return Json(new { success = false, message = "Invalid date format for dateTo." });
            }

            DriverEvent obj = new DriverEvent()
            {
                Id = id,
                DriverId = driverId,
                EventKindId = eventkindId,
                DateFrom = parsedDateFrom,
                DateTo = parsedDateTo,
                Comment = comments,
                ModifiedBy = modified,
                TripId = tripId,
                Amount=amount
            };

            try
            {
                // //Logger.Instance.Debug("Get Driver called");
                /*var result = await downstreamApi.CallApiForUserAsync<DriverEvent, ApiResponse<returnEvent>>(
                    "ServiceAPI",
                    obj,
                    options =>
                    {
                        options.HttpMethod = HttpMethod.Post.Method;
                        options.RelativePath = "api/v1/user/DriverEvents/driverevent";
                    });*/
                var result = new ApiResponse<DriverEvent>();
                // //Logger.Instance.Debug("Action completed");
                return Json(result.Result);
            }
            catch (Exception ex)
            {
                // //Logger.Instance.Error(ex);
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            try
            {
                // //Logger.Instance.Debug("Get Driver called");
                /*var result = await downstreamApi.CallApiForUserAsync<ApiResponse<string>>(
                    "ServiceAPI",
                    
                     options =>
                     {
                         options.HttpMethod = HttpMethod.Delete.Method;
                         options.RelativePath = $"api/v1/user/DriverEvents/deletedriverevent?eventId={id}";
                     });*/
                var result = new ApiResponse<DriverEvent>();
                ////Logger.Instance.Debug("Action completed");
                return Json(result.Result);
            }
            catch (Exception ex)
            {
                // //Logger.Instance.Error(ex);
                return Json(ex);
            }
        }
        //gettripevents
        [HttpGet]
        public async Task<IActionResult> GetEventsForTrip(int tripId)
        {
            try
            {
                // //Logger.Instance.Debug("Get Driver called");
                /*var result = await downstreamApi.CallApiForUserAsync<ApiResponse<List<DriverEvent>>>(
                    "ServiceAPI",

                     options =>
                     {
                         options.HttpMethod = HttpMethod.Get.Method;
                         options.RelativePath = $"api/v1/user/DriverEvents/gettripevents?tripId={tripId}";
                     });*/
                var result = new ApiResponse<DriverEvent>();
                ////Logger.Instance.Debug("Action completed");
                return Json(result.Result);
            }
            catch (Exception ex)
            {
                // //Logger.Instance.Error(ex);
                return Json(ex);
            }
        }
        [HttpGet]
        public async Task<IActionResult> TripAssociates(int driverId,DateTime dateFrom, DateTime dateTo,string check)
        {
            try
            {
                string dateFromString = "";
                string dateToString = "";
                if (check == "cancel")
                {
                    dateFromString = dateFrom.ToString();
                    dateToString = dateTo.ToString();
                }
                else
                {
                     dateFromString = dateFrom.ToString("MM/dd/yyyy HH:mm:ss");
                     dateToString = dateTo.ToString("MM/dd/yyyy HH:mm:ss");
                }
                /* dateFrom = dateFrom.ToLocalTime();
                 dateTo= dateTo.ToLocalTime();*/
                // //Logger.Instance.Debug("Get Driver called");
                /* var result = await downstreamApi.CallApiForUserAsync<ApiResponse<List<Associate>>>(
                     "ServiceAPI",

                      options =>
                      {
                          options.HttpMethod = HttpMethod.Get.Method;
                          options.RelativePath = $"api/v1/user/DriverEvents/tripassociates?driverId={driverId}&dateFrom={dateFromString}&dateTo={dateToString}";
                      });*/
                var result = new ApiResponse<DriverEvent>();
                ////Logger.Instance.Debug("Action completed");
                return Json(result.Result);
            }
            catch (Exception ex)
            {
                // //Logger.Instance.Error(ex);
                return Json(ex);
            }
        }
    }
}
