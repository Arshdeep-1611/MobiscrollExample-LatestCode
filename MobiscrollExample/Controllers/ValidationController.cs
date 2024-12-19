using Microsoft.AspNetCore.Mvc;
using Nestle.CH.HQ.RSL.WebApp.ApiRequestBody;
using Nestle.CH.HQ.RSL.WebApp.Models;

namespace Nestle.CH.HQ.RSL.WebApp.Controllers
{
    //[AuthorizeForScopes(ScopeKeySection = "ServiceAPI:Scopes")]
    public class ValidationController : Controller
    {
        //private readonly IDownstreamApi downstreamApi;
        private const string ServiceName = "ServiceAPI";
        public ValidationController()
        {
            //this.downstreamApi = downstreamApi;
        }
        public async Task<IActionResult> Index()
        {
            return View("");
        }

        [HttpPut]
        public async Task<IActionResult> AcceptTrip(int tripId)
        {
            int managerId = int.Parse(HttpContext.Session.GetString("UserId"));
            //Logger.Instance.Debug("AcceptTrip controller called");

            /* var result = await downstreamApi.CallApiForUserAsync<ApiResponse<string>>("ServiceAPI",
           options =>
           {
               options.HttpMethod = HttpMethod.Put.Method;
               options.RelativePath = $"api/v1/user/ValidationApi/AcceptTrip?managerId={managerId}&tripId={tripId}";
           });*/
            var result = new ApiResponse<string>();
            try
            {
                //Logger.Instance.Debug("Accepting trip...");

                if (result != null)
                {
                    return Json(result.Result);
                }
                else
                {
                    //Logger.Instance.Debug("Accepting trip failed!");
                    return View("Error");
                }
            }
            catch(Exception ex)
            {
                //Logger.Instance.Error($"Exception: {ex}");
                return View("Error");
            }
        }

        [HttpPut]
        public async Task<IActionResult> RejectTrip(int tripId)
        {
            int managerId = int.Parse(HttpContext.Session.GetString("UserId"));
            //Logger.Instance.Debug("RejectTrip controller called");

            /* var result = await downstreamApi.CallApiForUserAsync<ApiResponse<string>>("ServiceAPI",
           options =>
           {
               options.HttpMethod = HttpMethod.Put.Method;
               options.RelativePath = $"api/v1/user/ValidationApi/RejectTrip?managerId={managerId}&tripId={tripId}";
           });*/
            var result = new ApiResponse<string>();
            try
            {
                //Logger.Instance.Debug("Rejecting trip...");
                if (result != null)
                {
                    //Logger.Instance.Debug("Rejecting trip Successful");
                    return Json(result.Result);
                }
                else
                {
                    //Logger.Instance.Debug("Rejecting trip failed!");
                    return View("Error");
                }
            }
            catch (Exception ex)
            {
                //Logger.Instance.Error($"Exception: {ex}");
                return View("Error");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetValidationTrips(DateTime? dateValue, string requestorValue, string beneficiaryValue, string fromValue, string toValue, string flightInfoValue, string? statusValue, Boolean isMyAllTrips = false, Boolean isMyFutureTrips = true, Boolean isDelegatedTrips = false, int pageSize = 20, int pageNumber = 1)
        {
            try
            {
                GetTripsRequestBody getTripsRequestBody = new GetTripsRequestBody()
                {
                    Date = dateValue,
                    FromLocation = fromValue,
                    ToLocation = toValue,
                    Requestor = requestorValue,
                    Beneficiary = beneficiaryValue,
                    FlightInformation = flightInfoValue,
                    Status = statusValue,
                    IsMyAllTrips = isMyAllTrips,
                    IsMyFutureTrips = isMyFutureTrips,
                    IsDelegatedTrips = isDelegatedTrips
                };
                var userId = int.Parse(HttpContext.Session.GetString("UserId"));

                /*   var result = await downstreamApi.CallApiForUserAsync<GetTripsRequestBody, ApiResponse<List<Trips>>>(
                   ServiceName,
                   getTripsRequestBody,
                   options =>
                   {
                       options.HttpMethod = HttpMethod.Get.Method;
                       options.RelativePath = $"api/v1/user/ValidationApi/GetValidationTrips?pageNumber={pageNumber}&pageSize={pageSize}";
                   });*/
                var result = new ApiResponse<string>();
                return Json(result.Result);
            }
            catch (Exception ex)
            {
                return Json(null);
            }

        }
    }
}