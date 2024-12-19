using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Nestle.CH.HQ.RSL.WebApp.Models;
using Nestle.CH.HQ.RSL.WebApp.Services;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Drawing;

namespace Nestle.CH.HQ.RSL.WebApp.Controllers
{
    //[AuthorizeForScopes(ScopeKeySection = "ServiceAPI:Scopes")]
    public class HomeController : Controller
	{
        //private readonly I//Logger<HomeController> _//Logger;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly LanguageService _localization;

        private const string ServiceName = "ServiceAPI";

        // Inject IHttpContextAccessor and LanguageService
        public HomeController(IHttpContextAccessor httpContextAccessor, LanguageService localization)
        {
            _httpContextAccessor = httpContextAccessor;
            _localization = localization;
        }

        public IActionResult Privacy()
        {
            return View();
        }

        // Use HttpContext.Session to get or set session data
        public async Task<IActionResult> Index()
        {
            // Set session values if they aren't already set
           

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
		

		[HttpPost]
		public async Task<ActionResult<string>> UserType()
		{
			try
			{
				var userType = HttpContext.Session.GetString("UserType");

				if (userType != null)
				{
					return Json(userType);
				}
				else
				{
					return NotFound("User type not found.");
				}
			}
			catch (Exception ex)
			{
				return StatusCode(500, "An error occurred while retrieving user type.");

			}
		}
		/*public IActionResult Index()
		{
			ViewBag.WelcomeMessage = _localization.Getkey("str_welcome_message");
			//get culture information
			var currentCulture = Thread.CurrentThread.CurrentUICulture.Name;
			return View();
		}*/

		#region Localization
		[HttpPost]
		public IActionResult ChangeLanguage(string culture)
		{
			// Set the culture cookie
			Response.Cookies.Append(CookieRequestCultureProvider.DefaultCookieName, CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)), new CookieOptions()
			{
				Expires = DateTimeOffset.UtcNow.AddYears(1)
			});

			// Get the referer URL
			var referer = Request.Headers["Referer"].ToString();

			if (!string.IsNullOrEmpty(referer))
			{
				var uri = new Uri(referer);
				var path = uri.AbsolutePath.Split("/").Last(); // Get the last part of the path
				var baseUrl = $"{uri.Scheme}://{uri.Host}"; // Construct base URL

				//if (!uri.IsDefaultPort)
				//{
				//	baseUrl += $":{uri.Port}";
				//}

				// If path is "Trip", redirect to the base URL
				if (path == "Trip")
				{
					return Json(new { success = true, redirectUrl = baseUrl });
				}
				// Redirect to the original referer URL
				return Json(new { success = true, redirectUrl = referer });
			}

			// In case of no referer, handle gracefully
			return Json(new { success = false, message = "Referer not found" });
		}
		#endregion

		

		public IActionResult GetOption()
		{
			// Get the "Yes" and "No" values from the resource file
			string yesValue = _localization.Getkey("optionYes");
			string noValue = _localization.Getkey("optionNo");
			var resourceValues = new Dictionary<string, string>
			{
				{ "yesValue", yesValue },
				{ "noValue", noValue }
			};

			// Return the JSON object containing the values
			return Json(resourceValues);

		}

		public IActionResult GetTextFieldTitles()
		{
			// Get the "Yes" and "No" values from the resource file
			string LastNameOrFirstNameRequired = _localization.Getkey("LastNameOrFirstNameRequired");
			string ThisFieldIsRequired = _localization.Getkey("ThisFieldIsRequired");
			string PhonePattern = _localization.Getkey("PhonePattern");
			string EmailPattern = _localization.Getkey("EmailPattern");
			string NoRecordFound = _localization.Getkey("NoRecordFound");
			string RowIsNotSelected = _localization.Getkey("RowIsNotSelected");
			string VipUser = _localization.Getkey("VipUser");
			string AuthorizedUser = _localization.Getkey("AuthorizedUser");
			string UnAuthorizedUser = _localization.Getkey("UnAuthorizedUser");
			var resourceValues = new Dictionary<string, string>
			{
				{ "LastNameOrFirstNameRequired", LastNameOrFirstNameRequired },
				{ "ThisFieldIsRequired", ThisFieldIsRequired },
				{ "PhonePattern", PhonePattern },
				{ "EmailPattern", EmailPattern },
				{ "NoRecordFound", NoRecordFound },
				{ "RowIsNotSelected", RowIsNotSelected },
				{ "VipUser", VipUser },
				{ "AuthorizedUser", AuthorizedUser },
				{ "UnAuthorizedUser", UnAuthorizedUser },
			};

			// Return the JSON object containing the values
			return Json(resourceValues);

		}

		public IActionResult GetToolsList()
		{
			// Get the Tools from the resource file
			string titleDriver = _localization.Getkey("TitleDrivers");
			string titleOutOfPolicyTrips = _localization.Getkey("TitleOutOfPolicyTrips");
			string titleLocations = _localization.Getkey("TitleLocations");
			string titleManageAccess = _localization.Getkey("TitleManageAccess");
			string titlePaymentModes = _localization.Getkey("TitlePaymentModes");
			string titleParameters = _localization.Getkey("TitleParameters");
			string titlePrintReport = _localization.Getkey("TitlePrintReport");
			string titlePassengers = _localization.Getkey("TitlePassengers");
			string titleTripsPlanning = _localization.Getkey("TitleTripsPlanning");
			string titleWorkReport = _localization.Getkey("TitleWorkReport");
			string titleNightAndSundayHours = _localization.Getkey("TitleNightAndSundayHours");
			string titleOvertime = _localization.Getkey("TitleOvertime");
			string titleReportAuthorizedPeople = _localization.Getkey("TitleReportAuthorizedPeople");
			string titleTripPlanning = _localization.Getkey("TitleTripPlanning");
			string titleExportTool = _localization.Getkey("TitleExportTool");
			string titleExternalServices = _localization.Getkey("TitleExternalServices");
			string titleEventKind = _localization.Getkey("TitleEventKind");
			string titleSyncPassengers = _localization.Getkey("TitleSyncPassengers");
			string titleUsers = _localization.Getkey("TitleUsers");
			string titleTripValidation = _localization.Getkey("TitleTripValidation");
			string titleVehicles = _localization.Getkey("TitleVehicles");
			string titleClearCache = _localization.Getkey("TitleClearCache");
			var resourceValues = new Dictionary<string, string>
			{
				{ "titleDriver", titleDriver },
				{ "titleOutOfPolicyTrips", titleOutOfPolicyTrips },
				{ "titleLocations", titleLocations },
				{ "titleManageAccess", titleManageAccess },
				{ "titlePaymentModes", titlePaymentModes },
				{ "titleParameters", titleParameters },
				{ "titlePrintReport", titlePrintReport },
				{ "titlePassengers", titlePassengers },
				{ "titleTripsPlanning", titleTripsPlanning },
				{ "titleWorkReport", titleWorkReport },
				{ "titleNightAndSundayHours", titleNightAndSundayHours },
				{ "titleOvertime", titleOvertime },
				{ "titleReportAuthorizedPeople", titleReportAuthorizedPeople },
				{ "titleTripPlanning", titleTripPlanning },
				{ "titleExportTool", titleExportTool },
				{ "titleExternalServices", titleExternalServices },
				{ "titleEventKind", titleEventKind },
				{ "titleSyncPassengers", titleSyncPassengers },
				{ "titleUsers", titleUsers },
				{ "titleTripValidation", titleTripValidation },
				{ "titleVehicles", titleVehicles },
				{ "titleClearCache", titleClearCache },
			};

			// Return the JSON object containing the values
			return Json(resourceValues);

		}

		public IActionResult GetLocationWords()
		{
			// Get the Tools from the resource file
			string AddLocation = _localization.Getkey("AddLocation");
			string EditLocation = _localization.Getkey("Edit Location");
			string Private = _localization.Getkey("Private");
			string Open = _localization.Getkey("Open");
			string Common = _localization.Getkey("Common");
			string ModifyLocation = _localization.Getkey("ModifyLocation");
            string ViewLocation = _localization.Getkey("ViewLocation");

            var resourceValues = new Dictionary<string, string>
			{
				  { "AddLocation", AddLocation },
				  { "EditLocation", EditLocation },
				  { "Private", Private },
				  { "Open", Open },
				  { "Common", Common },
                  { "ModifyLocation", ModifyLocation },
                  { "ViewLocation", ViewLocation }

            };
			return Json(resourceValues);
		}

		public IActionResult GetTripRequestorLocalization()
		{
			//// Get the Tools from the resource file
			string beneficiary = _localization.Getkey("Beneficiary");
			string from = _localization.Getkey("From");
			string to = _localization.Getkey("To");
			string flightInfo = _localization.Getkey("FlightInfo");
			string requestor = _localization.Getkey("Requestor");
			string tripStep = _localization.Getkey("TripStep");
			string selectDriver = _localization.Getkey("SelectDriver");
			string editTrip = _localization.Getkey("EditTrip");
			string copyTrip = _localization.Getkey("CopyTrip");
			string deleteTrip = _localization.Getkey("DeleteTrip");
			string returnTrip = _localization.Getkey("ReturnTrip");
			string printTrip = _localization.Getkey("PrintTrip");
			string firstName = _localization.Getkey("FirstNameName");
			string lastName = _localization.Getkey("LastNameName");
			string costCenterCode = _localization.Getkey("CostCenterCode");
			string costCenterName = _localization.Getkey("CostCenterName");
			string phone = _localization.Getkey("Phone");
			string PhoneDisplayName = _localization.Getkey("PhoneDisplayName");
			string MobilePhoneDisplayName = _localization.Getkey("MobilePhoneDisplayName");
			string eMail = _localization.Getkey("EmailDisplayName");
			string name = _localization.Getkey("NameDisplayName");
			string street = _localization.Getkey("StreetDisplayName");
			string city = _localization.Getkey("CityDisplayName");
			string accept = _localization.Getkey("AcceptTrip");
			string reject = _localization.Getkey("RejectTrip");
            string acceptCancelled = _localization.Getkey("AcceptCancelledTrips");
            string rejectCancelled = _localization.Getkey("RejectCancelledTrips");
            string detail = _localization.Getkey("DetailsofTrip");
			string accessLevel = _localization.Getkey("AccessLevelDisplayName");
			string login = _localization.Getkey("Login");
			string code = _localization.Getkey("CodeDisplayName");
			string level = _localization.Getkey("LevelDisplayName");
			string value = _localization.Getkey("Value");
			string tool = _localization.Getkey("ToolIdDisplayName");
			string delete = _localization.Getkey("DeleteTripStep");
			string vehicleDropdown = _localization.Getkey("VehicleDropdown");
			string userDropdown = _localization.Getkey("UserDopdown");
			string toolsDropdown = _localization.Getkey("ToolsDropdown");
			string tripsDropdown = _localization.Getkey("TripsRequestorDropdown");
			string requestorDropdown = _localization.Getkey("RequestorDropdown");
            string RemoveAttachment = _localization.Getkey("RemoveAttachment");
            string acceptPopup = _localization.Getkey("AcceptPopup");
			string rejectPopup = _localization.Getkey("RejectPopup");
			string deletePopup = _localization.Getkey("DelegateDeletePopup");
			string DeleteDelegate = _localization.Getkey("DeleteDelegate");
			string select = _localization.Getkey("Select");
			string researchSteps = _localization.Getkey("ResearchSteps");
			string status = _localization.Getkey("ResearchStatus");
			string author = _localization.Getkey("Author");
			string hour = _localization.Getkey("HourHeader");
			string hold = _localization.Getkey("Hold");
			string tripHeader = _localization.Getkey("Trip");
			string forName = _localization.Getkey("For");
			string successMessage = _localization.Getkey("SuccessMessage");
			string editTripStep = _localization.Getkey("ModifyTripStep");
            string saveTripStep = _localization.Getkey("SaveTripStep");
			string driverInfo = _localization.Getkey("DriverInfo");
            string addTripStep = _localization.Getkey("AddTripStep");
			string alertCheckBox = _localization.Getkey("alertCheckField");
			string delegatePopupMsg = _localization.Getkey("DelegatePopupMsg");
			string delegateContact = _localization.Getkey("DelegateContact");
			string delegateAlert = _localization.Getkey("DelegateAlert");
			string delegateDelete = _localization.Getkey("DelegateDelete");
			string delegateDeleteMsg = _localization.Getkey("DelegateDeleteMsg");
			string delegateFilter = _localization.Getkey("DelegateFilter");
			string locationPopup = _localization.Getkey("LocationPopup");
			string locationInsert = _localization.Getkey("LocationInsert");
			string locationDelete = _localization.Getkey("LocationDelete");
			string driverPopUpData = _localization.Getkey("DriverPopUpData");
			string driverFieldData = _localization.Getkey("DriverFieldData");
			string journeyPopup = _localization.Getkey("JourneyPopup");
			string journeyReportChanges = _localization.Getkey("JourneyReportChanges");
			string overtimePopup = _localization.Getkey("OvertimePopup");
			string passengerDropdown = _localization.Getkey("PassengerDropdown");
			string locationDropdown = _localization.Getkey("LocationDropdown");
			string validateFields = _localization.Getkey("ValidateFields");
			string statusNotReady = _localization.Getkey("StatusNotReady");
			string statusToBeProcessed = _localization.Getkey("StatusToBeProcessed");
			string acceptedByManager = _localization.Getkey("AcceptedByManager");
			string rejectedByManager = _localization.Getkey("RejectedByManager");
			string cancelledByManager = _localization.Getkey("CancelledByManager");
			string cancelledByRequestor = _localization.Getkey("CancelledByRequestor");
			string outPolicyRejectedExtService = _localization.Getkey("OutPolicyRejectedExtService");
			string cancellationConfirmed = _localization.Getkey("CancellationConfirmed");
			string outPolicyCancelConfExtService = _localization.Getkey("OutPolicyCancelConfExtService");
			string planified = _localization.Getkey("Planified");
			string waitingDriverConfirmation = _localization.Getkey("WaitingDriverConfirmation");
			string waitExtServiceConf = _localization.Getkey("WaitExtServiceConf");
			string outOfPolicyCancelledByRequestor = _localization.Getkey("OutOfPolicyCancelledByRequestor");
			string outPolicyWaitExtServiceConf = _localization.Getkey("OutPolicyWaitExtServiceConf");
			string outPolicyCancelledExtService = _localization.Getkey("OutPolicyCancelledExtService");
			string extCancelledManager = _localization.Getkey("ExtCancelledManager");
			string deleted = _localization.Getkey("Deleted");
			string updatingByRequestor = _localization.Getkey("UpdatingByRequestor");
			string outPolicyUpdateRequestor = _localization.Getkey("OutOfPolicyUpdatingByRequestor");
			string externalResetByManager = _localization.Getkey("ExternalResetByManager");
			string confirmDelete = _localization.Getkey("ConfirmDelete");
			string requestorsidepopup1 = _localization.Getkey("Requestorsidepopup1");
			string requestorsidepopup2 = _localization.Getkey("Requestorsidepopup2");
			string flightAlert = _localization.Getkey("FlightAlert");
            string errorLocation = _localization.Getkey("ErrorLocation");
            string validateDuration = _localization.Getkey("ValidateDuration");
            string validateDuration1 = _localization.Getkey("ValidateDuration1");
            string locationValidation = _localization.Getkey("LocationValidation");
            string negativeDuration = _localization.Getkey("NegativeDuration");
            string mainPassengerValidation = _localization.Getkey("MainPassengerValidation");
            string requestorValidation = _localization.Getkey("RequestorValidation");
            string passengerValidation = _localization.Getkey("PassengerValidation");
            string confirmTrip = _localization.Getkey("ConfirmTrip");
            string fileType = _localization.Getkey("FileType");
            string labelNone = _localization.Getkey("labelNone");
            string files = _localization.Getkey("Files");
            string headerPopup = _localization.Getkey("HeaderPopup");
            string headerPopup1 = _localization.Getkey("HeaderPopup1");
            string tripStepDelete = _localization.Getkey("TripStepDelete");
            string addTripSep = _localization.Getkey("AddTripSep");
            string driverDetails = _localization.Getkey("DriverDetails");
            string passangerDetails = _localization.Getkey("PassengerDetails");
            string requestorDetails = _localization.Getkey("RequestorDetails");
            string deleteTripPopup = _localization.Getkey("DeleteTripPopup");
            string deleteTripSuccess = _localization.Getkey("DeleteTripSuccess");
            string researchDatePopup = _localization.Getkey("ResearchDatePopup");
            string researchDateErrorPopup = _localization.Getkey("ResearchDateErrorPopup");
            string LocationInsertQuestion = _localization.Getkey("LocationInsertQuestion");
            string LocationUpdateQuestion = _localization.Getkey("LocationUpdateQuestion");
            string fromDateValidation = _localization.Getkey("FromDateValidation");
            string fromTimeValidation = _localization.Getkey("FromTimeValidation");
            string toDateValidation = _localization.Getkey("ToDateValidation");
            string toTimeValidation = _localization.Getkey("ToTimeValidation");
            string btnEdit = _localization.Getkey("BtnEdit");
            string tripsCancelConfirmMessage = _localization.Getkey("TripsCancelConfirmMessage");
            string fromdateFields = _localization.Getkey("FromdateFields");
            string fromtimeFields = _localization.Getkey("FromtimeFields");
            string todateFields = _localization.Getkey("TodateFields");
            string totimeFields = _localization.Getkey("TotimeFields");
            string isCompletedConfirmation = _localization.Getkey("IsCompletedConfirmation");
			string viewBtn = _localization.Getkey("ViewBtn");
			string noDataAvailable = _localization.Getkey("NoDataAvailable");
			string cancelReject = _localization.Getkey("CancelReject");
			string cancelAccept = _localization.Getkey("CancelAccept");
			string showConfirmCancel = _localization.Getkey("ShowConfirmCancel");
			string cancelConfirm = _localization.Getkey("CancelConfirm");
			string showRejectCancel = _localization.Getkey("ShowRejectCancel");
			string rejectCancelledTrip = _localization.Getkey("RejectCancelledTrip");
			string tripInformation = _localization.Getkey("TripInformation");
			string selectPassenger = _localization.Getkey("SelectPassenger");
			string updateTripMessage = _localization.Getkey("UpdateTripMessage");
			string modifyTripStepMessage = _localization.Getkey("ModifyTripStepMessage");
			string validateNoTripsMessage = _localization.Getkey("ValidateNoTripsMessage");
            string searchTripAlertMessage = _localization.Getkey("SearchTripAlertMessage");
            string addNewLocation = _localization.Getkey("Add New Location");
            string selectLocation = _localization.Getkey("SelectLocation");
            string locationDetails = _localization.Getkey("LocationDetails");
            string outOfPolicy = _localization.Getkey("Outofpolicytrip");
            string authorizedtrip = _localization.Getkey("Authorizedtrip");
            string isAuthorizedDisplayName = _localization.Getkey("IsAuthorizedDisplayName");
            string isVipDisplayName = _localization.Getkey("IsVipDisplayName");
            string isPrivateDisplayName = _localization.Getkey("IsPrivateDisplayName");
            string unAuthorizedUser = _localization.Getkey("UnAuthorizedUser");
            string Private = _localization.Getkey("Private");
            string Open = _localization.Getkey("Open");
            string Common = _localization.Getkey("Common");
            string optionYes = _localization.Getkey("optionYes");
            string optionNo = _localization.Getkey("optionNo");
            string emptyMessageForDeparture = _localization.Getkey("EmptyMessageForDeparture");
            string emptyMessageForArrival = _localization.Getkey("EmptyMessageForArrival");
            string emptyMessageForNoFlight = _localization.Getkey("EmptyMessageForNoFlight");

            var resourceValues = new Dictionary<string, string>
			{
                { "SearchTripAlertMessage", searchTripAlertMessage },
                { "Open", Open },
                { "Common", Common },
                { "Private", Private },
                { "unAuthorizedUser", unAuthorizedUser },
                { "isVipDisplayName", isVipDisplayName },
                { "isPrivateDisplayName", isPrivateDisplayName },
                { "isAuthorizedDisplayName", isAuthorizedDisplayName },
                { "authorizedtrip", authorizedtrip },
                { "outOfPolicy", outOfPolicy },
                { "selectLocation", selectLocation },
                { "locationDetails", locationDetails },
                { "addNewLocation", addNewLocation },
                { "selectPassenger", selectPassenger },
				{ "validateNoTripsMessage", validateNoTripsMessage },
				{ "modifyTripStepMessage", modifyTripStepMessage },
				{ "updateTripMessage", updateTripMessage },
				{ "Beneficiary", beneficiary },
				{ "From", from },
				{ "To", to },
				{ "FlightInfo", flightInfo },
				{ "Requestor", requestor },
				{ "TripStep", tripStep},
				{ "SelectDriver", selectDriver},
				{ "EditTrip", editTrip},
				{ "CopyTrip", copyTrip},
				{ "DeleteTrip", deleteTrip},
				{ "ReturnTrip", returnTrip},
				{ "PrintTrip", printTrip},
				{ "FirstNameName", firstName},
				{ "LastNameName", lastName},
				{ "CostCenterCode", costCenterCode},
				{ "CostCenterName", costCenterName},
				{ "Phone", phone},
				{ "PhoneDisplayName", PhoneDisplayName },
				{"MobilePhoneDisplayName", MobilePhoneDisplayName },
				{ "EmailDisplayName", eMail},
				{ "NameDisplayName", name},
				{ "StreetDisplayName", street},
				{ "CityDisplayName", city},
				{ "AcceptTrip", accept},
				{ "RejectTrip", reject},
                { "AcceptCancelledTrips", acceptCancelled},
                { "RejectCancelledTrips", rejectCancelled},
				{ "DetailsofTrip", detail},
				{ "AccessLevelDisplayName", accessLevel},
				{ "Login", login},
				{ "CodeDisplayName", code},
				{ "LevelDisplayName", level},
				{ "Value", value},
				{ "ToolIdDisplayName", tool},
				{ "DeleteTripStep", delete},
				{ "VehicleDropdown", vehicleDropdown},
				{ "UserDopdown", userDropdown},
				{ "ToolsDropdown", toolsDropdown},
				{ "TripsRequestorDropdown", tripsDropdown},
				{ "RequestorDropdown", requestorDropdown},
				{ "AcceptPopup", acceptPopup},
				{ "RejectPopup", rejectPopup},
				{ "DelegateDeletePopup", deletePopup},
				{ "DeleteDelegate", DeleteDelegate},
				{ "Select", select},
				{ "ResearchSteps", researchSteps},
				{ "ResearchStatus", status},
				{ "Author", author},
				{ "HourHeader", hour},
				{ "Hold", hold},
				{ "Trip", tripHeader},
				{ "For", forName},
				{ "SuccessMessage", successMessage},
				{ "ModifyTripStep", editTripStep},
				{ "SaveTripStep", saveTripStep },
				{ "DriverInfo", driverInfo },
				{ "AddTripStep", addTripStep},
				{ "alertCheckBox", alertCheckBox},
				{ "DelegatePopupMsg", delegatePopupMsg},
				{ "DelegateContact", delegateContact},
				{ "DelegateAlert", delegateAlert},
				{ "DelegateDelete", delegateDelete},
				{ "DelegateDeleteMsg", delegateDeleteMsg},
				{ "DelegateFilter", delegateFilter},
				{ "LocationPopup", locationPopup},
				{ "LocationInsert", locationInsert},
				{ "LocationDelete", locationDelete},
				{ "DriverPopUpData", driverPopUpData},
				{ "DriverFieldData", driverFieldData},
				{ "JourneyPopup", journeyPopup},
				{ "JourneyReportChanges", journeyReportChanges},
				{ "OvertimePopup", overtimePopup},
				{ "PassengerDropdown", passengerDropdown},
				{ "LocationDropdown", locationDropdown},
				{ "ValidateFields", validateFields},
				{ "StatusNotReady", statusNotReady },
				{ "StatusToBeProcessed", statusToBeProcessed },
				{ "AcceptedByManager", acceptedByManager },
				{ "RejectedByManager", rejectedByManager },
				{ "CancelledByManager", cancelledByManager },
				{ "CancelledByRequestor", cancelledByRequestor },
				{ "OutPolicyRejectedExtService", outPolicyRejectedExtService },
				{ "CancellationConfirmed", cancellationConfirmed },
				{ "OutPolicyCancelConfExtService", outPolicyCancelConfExtService },
				{ "Planified", planified },
				{ "WaitingDriverConfirmation", waitingDriverConfirmation },
				{ "WaitExtServiceConf", waitExtServiceConf },
				{ "OutOfPolicyCancelledByRequestor", outOfPolicyCancelledByRequestor },
				{ "OutPolicyWaitExtServiceConf", outPolicyWaitExtServiceConf },
				{ "OutPolicyCancelledExtService", outPolicyCancelledExtService },
				{ "ExtCancelledManager", extCancelledManager },
				{ "Deleted", deleted },
				{ "UpdatingByRequestor", updatingByRequestor },
				{ "OutOfPolicyUpdatingByRequestor", outPolicyUpdateRequestor },
				{ "ExternalResetByManager", externalResetByManager },
				{ "ConfirmDelete", confirmDelete },
				{ "Requestorsidepopup1", requestorsidepopup1 },
				{ "Requestorsidepopup2", requestorsidepopup2 },
				{ "FlightAlert", flightAlert },
                { "ErrorLocation", errorLocation },
				{ "ValidateDuration", validateDuration },
				{ "ValidateDuration1", validateDuration1 },
				{ "LocationValidation", locationValidation },
				{ "NegativeDuration", negativeDuration },
				{ "MainPassengerValidation", mainPassengerValidation },
				{ "RequestorValidation", requestorValidation },
				{ "PassengerValidation", passengerValidation },
				{ "ConfirmTrip", confirmTrip },
				{ "FileType", fileType },
				{ "labelNone", labelNone },
				{ "Files", files },
				{ "HeaderPopup", headerPopup },
				{ "HeaderPopup1", headerPopup1 },
				{ "TripStepDelete", tripStepDelete },
				{ "AddTripSep", addTripSep },
				{ "DriverDetails", driverDetails },
				{ "PassengerDetails", passangerDetails },
				{ "RequestorDetails", requestorDetails },
                { "DeleteTripPopup", deleteTripPopup },
                { "DeleteTripSuccess", deleteTripSuccess },
                { "ResearchDatePopup", researchDatePopup },
                { "ResearchDateErrorPopup", researchDateErrorPopup },
                { "LocationInsertQuestion", LocationInsertQuestion },
                { "LocationUpdateQuestion", LocationUpdateQuestion },
                { "FromDateValidation", fromDateValidation },
                { "FromTimeValidation", fromTimeValidation },
                { "ToDateValidation", toDateValidation },
                { "ToTimeValidation", toTimeValidation },
                { "BtnEdit", btnEdit },
                { "TripsCancelConfirmMessage", tripsCancelConfirmMessage },
                { "FromdateFields", fromdateFields },
				{ "FromtimeFields", fromtimeFields },
				{ "TodateFields", todateFields },
				{ "TotimeFields", totimeFields },
                { "IsCompletedConfirmation", isCompletedConfirmation },
                { "ViewBtn", viewBtn },
                { "NoDataAvailable", noDataAvailable },
                { "CancelReject", cancelReject },
                { "CancelAccept", cancelAccept },
                { "ShowConfirmCancel", showConfirmCancel },
                { "CancelConfirm", cancelConfirm },
                { "ShowRejectCancel", showRejectCancel },
                { "RejectCancelledTrip", rejectCancelledTrip },
                { "TripInformation", tripInformation },
                { "RemoveAttachment", RemoveAttachment },
                { "optionYes", optionYes },
				{ "optionNo", optionNo },
                { "EmptyMessageForDeparture", emptyMessageForDeparture },
				{ "EmptyMessageForArrival", emptyMessageForArrival },
				{ "EmptyMessageForNoFlight", emptyMessageForNoFlight }
            };
			return Json(resourceValues);

        }
		public IActionResult GetPlanningWords()
		{
			// Get the Tools from the resource file
			string unconfirmedTripsHeader = _localization.Getkey("UnconfirmedTripsHeader");
			string externalServiceHeader = _localization.Getkey("ExternalServiceHeader");
			string drivers = _localization.Getkey("Drivers");
			string print = _localization.Getkey("Print");
			string refresh = _localization.Getkey("Refresh");
			string day = _localization.Getkey("Day");
			string back = _localization.Getkey("Back");
			string week = _localization.Getkey("Week");
			string acceptedTrips = _localization.Getkey("AcceptedTrips");
			string unacceptedTrips = _localization.Getkey("UnacceptedTrips");
			string unassignedTrips = _localization.Getkey("UnassignedTrips");
			string cancelledTrips = _localization.Getkey("CancelledTrips");
			string today = _localization.Getkey("Today");
			string january = _localization.Getkey("January");
			string february = _localization.Getkey("February");
			string march = _localization.Getkey("March");
			string april = _localization.Getkey("April");
			string may = _localization.Getkey("May");
			string june = _localization.Getkey("June");
			string july = _localization.Getkey("July");
			string feb = _localization.Getkey("Feb");
			string aug = _localization.Getkey("Aug");
			string dec = _localization.Getkey("Dec");
			string cancelTrip = _localization.Getkey("CancelTrip");
			string acceptCancel = _localization.Getkey("AcceptCancelledTrips");
			string rejectCancel = _localization.Getkey("RejectCancellation");
			string newEvent = _localization.Getkey("NewEvent");
			string editEvent = _localization.Getkey("EditEvent");
			string august = _localization.Getkey("August");
			string september = _localization.Getkey("September");
			string october = _localization.Getkey("October");
			string november = _localization.Getkey("November");
			string december = _localization.Getkey("December");
			string mon = _localization.Getkey("Mon");
			string tue = _localization.Getkey("Tue");
			string wed = _localization.Getkey("Wed");
			string thu = _localization.Getkey("Thu");
			string fri = _localization.Getkey("Fri");
			string sat = _localization.Getkey("Sat");
			string sun = _localization.Getkey("Sun");
			string addEvent = _localization.Getkey("AddEvent");
			string detailsOfEvent = _localization.Getkey("DetailsOfEvent");
			string deleteEvent = _localization.Getkey("DeleteEvent");
			string detailsofTrip = _localization.Getkey("DetailsofTrip");
			string add = _localization.Getkey("Add");
			string cancel = _localization.Getkey("Cancel");
			string acceptTrip = _localization.Getkey("AcceptTrip");
			string reinitiateTrip = _localization.Getkey("ReinitiateTrip");
			string assignTrip = _localization.Getkey("AssignTrip");
			string rejectTrip = _localization.Getkey("RejectTrip");
			string cancelConfirmation = _localization.Getkey("CancelConfirmation");
			string assignDriver = _localization.Getkey("AssigntoDriver");
			string tripActivities = _localization.Getkey("TripActivities");
			string plannedTrips = _localization.Getkey("PlannedTrips");
			string eventsMessage = _localization.Getkey("EventsMessage");
			string deleteTripPopup = _localization.Getkey("DeleteTripPopup");
			string deleteEventPopup = _localization.Getkey("DeleteEventPopup");
			string currentWeek = _localization.Getkey("CurrentWeek");
			string linkPassenger = _localization.Getkey("linkPassenger");
			string ResearchStatus = _localization.Getkey("ResearchStatus");
			string ResearchVehicle = _localization.Getkey("ResearchVehicle");
            string statusNotReady = _localization.Getkey("StatusNotReady");
            string statusToBeProcessed = _localization.Getkey("StatusToBeProcessed");
            string acceptedByManager = _localization.Getkey("AcceptedByManager");
            string rejectedByManager = _localization.Getkey("RejectedByManager");
            string cancelledByManager = _localization.Getkey("CancelledByManager");
            string cancelledByRequestor = _localization.Getkey("CancelledByRequestor");
            string outPolicyRejectedExtService = _localization.Getkey("OutPolicyRejectedExtService");
            string cancellationConfirmed = _localization.Getkey("CancellationConfirmed");
            string outPolicyCancelConfExtService = _localization.Getkey("OutPolicyCancelConfExtService");
            string planified = _localization.Getkey("Planified");
            string waitingDriverConfirmation = _localization.Getkey("WaitingDriverConfirmation");
            string waitExtServiceConf = _localization.Getkey("WaitExtServiceConf");
            string outOfPolicyCancelledByRequestor = _localization.Getkey("OutOfPolicyCancelledByRequestor");
            string outPolicyWaitExtServiceConf = _localization.Getkey("OutPolicyWaitExtServiceConf");
            string outPolicyCancelledExtService = _localization.Getkey("OutPolicyCancelledExtService");
            string extCancelledManager = _localization.Getkey("ExtCancelledManager");
            string durationLabel = _localization.Getkey("DurationLabel");
            //   string sun = _localization.Getkey("Sun");

            /*   string titlePassengers = _localization.Getkey("TitlePassengers");
               string titleTripsPlanning = _localization.Getkey("TitleTripsPlanning");
               string titleWorkReport = _localization.Getkey("TitleWorkReport");
               string titleNightAndSundayHours = _localization.Getkey("TitleNightAndSundayHours");
               string titleOvertime = _localization.Getkey("TitleOvertime");
               string titleReportAuthorizedPeople = _localization.Getkey("TitleReportAuthorizedPeople");
               string titleTripPlanning = _localization.Getkey("TitleTripPlanning");
               string titleExportTool = _localization.Getkey("TitleExportTool");
               string titleExternalServices = _localization.Getkey("TitleExternalServices");
               string titleEventKind = _localization.Getkey("TitleEventKind");
               string titleSyncPassengers = _localization.Getkey("TitleSyncPassengers");
               string titleUsers = _localization.Getkey("TitleUsers");
               string titleTripValidation = _localization.Getkey("TitleTripValidation");
               string titleVehicles = _localization.Getkey("TitleVehicles");
               string titleClearCache = _localization.Getkey("TitleClearCache");*/
            var resourceValues = new Dictionary<string, string>
			{
				{ "currentWeek", currentWeek },
				{ "durationLabel", durationLabel },
                    { "StatusNotReady", statusNotReady },
                { "StatusToBeProcessed", statusToBeProcessed },
                { "AcceptedByManager", acceptedByManager },
                { "RejectedByManager", rejectedByManager },
                { "CancelledByManager", cancelledByManager },
                { "CancelledByRequestor", cancelledByRequestor },
                { "OutPolicyRejectedExtService", outPolicyRejectedExtService },
                { "CancellationConfirmed", cancellationConfirmed },
                { "OutPolicyCancelConfExtService", outPolicyCancelConfExtService },
                { "Planified", planified },
                { "WaitingDriverConfirmation", waitingDriverConfirmation },
                { "WaitExtServiceConf", waitExtServiceConf },
                { "OutOfPolicyCancelledByRequestor", outOfPolicyCancelledByRequestor },
                { "OutPolicyWaitExtServiceConf", outPolicyWaitExtServiceConf },
                { "OutPolicyCancelledExtService", outPolicyCancelledExtService },
                { "ExtCancelledManager", extCancelledManager },
                { "ResearchStatus", ResearchStatus },
				{ "ResearchVehicle", ResearchVehicle },
				{ "linkPassenger", linkPassenger },
				{ "deleteTripPopup", deleteTripPopup },
				{ "deleteEventPopup", deleteEventPopup },
				{ "unconfirmedTripsHeader", unconfirmedTripsHeader },
				{ "eventsMessage", eventsMessage },
				{ "plannedTrips", plannedTrips },
				{ "tripActivities", tripActivities },
				{ "assignDriver", assignDriver },
				{ "cancelConfirmation", cancelConfirmation },
				{ "feb", feb },
				{ "acceptCancel", acceptCancel },
				{ "rejectcancel", rejectCancel },
				{ "aug", aug },
				{ "dec", dec },
				{ "editEvent", editEvent },
				{ "newEvent", newEvent },
				{ "unassignedTrips", unassignedTrips },
				{ "assignTrip", assignTrip },
				{ "externalServiceHeader", externalServiceHeader },
				{ "cancelTrip", cancelTrip },
				{ "drivers", drivers },
				{ "addEvent", addEvent },
				{ "add", add },
				{ "back", back },
				{ "cancel", cancel },
				{ "detailsOfEvent", detailsOfEvent },
				{ "deleteEvent", deleteEvent },
				{ "detailsofTrip", detailsofTrip },
				{ "acceptTrip", acceptTrip },
				{ "reinitiateTrip", reinitiateTrip },
				{ "rejectTrip", rejectTrip },
				{ "print", print },
				{ "refresh", refresh },
				{ "day", day },
				{ "week", week },
				{ "acceptedTrips", acceptedTrips },
				{ "unacceptedTrips", unacceptedTrips },
				{ "cancelledTrips", cancelledTrips },
				{ "today", today },
				{ "january", january },
				{ "february", february },
				{ "march", march },
				{ "april", april },
				{ "may", may },
				{ "june", june },
				{ "july", july },
				{ "august", august },
				{ "september", september },
				{ "october", october },
				{ "november", november },
				{ "december", december },
				{ "sun", sun },
				{ "mon", mon },
				{ "tue", tue },
				{ "wed", wed },
				{ "thu", thu },
				{ "fri", fri },
				{ "sat", sat },
               
               /* { "titlePassengers", titlePassengers },
                { "titleTripsPlanning", titleTripsPlanning },
                { "titleWorkReport", titleWorkReport },
                { "titleNightAndSundayHours", titleNightAndSundayHours },
                { "titleOvertime", titleOvertime },
                { "titleReportAuthorizedPeople", titleReportAuthorizedPeople },
                { "titleTripPlanning", titleTripPlanning },
                { "titleExportTool", titleExportTool },
                { "titleExternalServices", titleExternalServices },
                { "titleEventKind", titleEventKind },
                { "titleSyncPassengers", titleSyncPassengers },
                { "titleUsers", titleUsers },
                { "titleTripValidation", titleTripValidation },
                { "titleVehicles", titleVehicles },
                { "titleClearCache", titleClearCache },*/
            };

			// Return the JSON object containing the values
			return Json(resourceValues);

		}

		public IActionResult GetCategories()
		{
			var resourceValues = new Dictionary<string, string>
			{
				{ "CategoryWorkTime", _localization.Getkey("labelCategoryWorkTime") },
				{ "CategoryDriveTime", _localization.Getkey("labelCategoryDriveTime") },
				{ "CategoryNoDriveTime", _localization.Getkey("labelCategoryNoDriveTime") },
				{ "CategoryRateTime", _localization.Getkey("labelCategoryRateTime") },
				{ "CategorySurchargeNightTime", _localization.Getkey("labelCategorySurchargeNightTime") },
				{ "CategorySurchargeSundayDayTime", _localization.Getkey("labelCategorySurchargeSundayDayTime") },
				{ "CategorySurchargeSundayNightTime", _localization.Getkey("labelCategorySurchargeSundayNightTime") },
				{ "CategoryReserveTime", _localization.Getkey("labelCategoryReserveTime") },
				{ "CategoryAbsenceTime", _localization.Getkey("labelCategoryAbsenceTime") },
				{ "CategoryOvertimeRecovery", _localization.Getkey("labelCategoryOvertimeRecovery") },
				{ "CategoryOther", _localization.Getkey("labelCategoryOther") },
			};

			// Return the JSON object containing the values
			return Json(resourceValues);
		}

		public IActionResult GetAccessLevels()
		{
			var resourceValues = new Dictionary<string, string>
			{
				{ "none",  _localization.Getkey("labelNone") },
				{ "labelRequester", _localization.Getkey("labelRequester") },
				{ "labelRequesterPassengerManagement", _localization.Getkey("labelRequesterPassengerManagement") },
				{ "labelDriver",  _localization.Getkey("labelDriver") },
				{ "labelManagerBackup", _localization.Getkey("labelManagerBackup") },
				{ "labelManager", _localization.Getkey("labelManager") },
				{ "labelSupervisor", _localization.Getkey("labelSupervisor") },
			};

			// Return the JSON object containing the values
			return Json(resourceValues);

		}
		public IActionResult GetUserLoginDetails(bool send)
		{
			return Json(new { id = Convert.ToInt16(HttpContext.Session.GetString("UserId")), name = HttpContext.Session.GetString("UserLoginName") });
		}

		public IActionResult GetUserAccessLevel()
		{
			var resourceValues = new Dictionary<string, string>
			{
				{ "AccessLevel", HttpContext.Session.GetString("AccessLevel") },
				{ "UserId", HttpContext.Session.GetString("UserId") },
			};

			// Return the JSON object containing the values
			return Json(resourceValues);
		}

		public IActionResult GetLevel()
		{
			var resourceValues = new Dictionary<string, string>
			{
				{ "Level1", _localization.Getkey("labelLavel1") },
				{ "Level2", _localization.Getkey("labelLavel2") },
				{ "Level3", _localization.Getkey("labelLavel3") },
				{ "Level4", _localization.Getkey("labelLavel4") },
			};

			// Return the JSON object containing the values
			return Json(resourceValues);
		}

		[HttpGet]
		public IActionResult GetColorName(string hexCode)
		{
			if (!System.String.IsNullOrEmpty(hexCode))
			{
				hexCode = hexCode.TrimStart('#'); // Remove '#' if present
				if (hexCode.Length != 6)
					return BadRequest("Invalid hex code");

				Color color = GetColorFromHex(hexCode);
				if (color != Color.Empty)
				{
					string colorName = color.Name;
					return Ok(colorName);
				}
				else
				{
					return null;
				}

			}
			return null;
		}

		private Color GetColorFromHex(string hexCode)
		{
			int r = Convert.ToInt32(hexCode.Substring(0, 2), 16);
			int g = Convert.ToInt32(hexCode.Substring(2, 2), 16);
			int b = Convert.ToInt32(hexCode.Substring(4, 2), 16);

			// Find the closest known color
			string closestColorName = string.Empty;
			int closestDistance = int.MaxValue;

			foreach (KnownColor knownColor in Enum.GetValues(typeof(KnownColor)))
			{
				Color knownColorValue = Color.FromKnownColor(knownColor);
				int distance = Math.Abs(knownColorValue.R - r) + Math.Abs(knownColorValue.G - g) + Math.Abs(knownColorValue.B - b);
				if (distance < closestDistance)
				{
					closestColorName = knownColor.ToString();
					closestDistance = distance;
				}
			}

			return Color.FromName(closestColorName);
		}

		[HttpGet]
		public IActionResult GetHexValue(string name)
		{
			try
			{
				//int ColorValue = Color.FromName(name).ToArgb();
				//string ColorHex = string.Format("{0:x6}", ColorValue);
				// Convert the ARGB value to hexadecimal
				string? hexColor = ColorTranslator.ToHtml(Color.FromArgb(Color.FromName(name).ToArgb()));

				return Ok(hexColor);
			}
			catch (Exception ex)
			{
				return BadRequest("Error converting CMYK to HEX: " + ex.Message);
			}
		}

		public IActionResult GetBtnLanguages()
		{
			var resourceValues = new Dictionary<string, string>
			{
				{ "Edit", _localization.Getkey("BtnEdit") },
				{ "Delete", _localization.Getkey("BtnDelete") },
				{"editPassengerTitle", _localization.Getkey("EditPassengerTitle") },
				{"addPassengerTitle", _localization.Getkey("AddPassengerTitle") },
                {"EditPassenger", _localization.Getkey("EditPassenger") },
                {"AddPassenger", _localization.Getkey("AddPassenger") },
				{"EditPassengerTitle", _localization.Getkey("EditPassengerTitle") },
            };

			// Return the JSON object containing the values
			return Json(resourceValues);
		}

		public IActionResult TelerikReport(string report, bool isPlanning , int? tripId, int? outOfPolicyTrip, int? predefinedTrip, int? fromLocationId, int? toLocationId, DateTime? fromDate, DateTime? toDate, string? statusIds, int? requestor, int? driver_id, int? year, DateOnly? dateFrom, DateOnly? dateTo
			 , DateOnly dateValue, string fromValue, string toValue, string beneficiaryValue, string requestorValue, string flightInfoValue, string? statusValue, bool isMyAllTrips, bool isMyFutureTrips, bool isDelegatedTrips)
		{
			if (statusIds == "null")
			{
				statusIds = null;
			}

			ViewBag.ReportName = report;

			General.TripId = tripId;
			General.FromLocationId = fromLocationId;
			General.ToLocationId = toLocationId;
			General.FromDate = fromDate;
			General.ToDate = toDate;
			General.PreDefinedTrip = predefinedTrip;
			General.OutOfPolicyTrip = outOfPolicyTrip;
			General.Requester = requestor;
			General.StatusIds = statusIds;
			General.Driver_Id = driver_id;
			General.Year = year;
			General.DateFrom = dateFrom;
			General.DateTo = dateTo;
			General.Date = dateValue;
			General.Beneficiary = beneficiaryValue;
			General.RequesterValue = requestorValue;
			General.FlightInformation = flightInfoValue;
			General.FromLocation = fromValue;
			General.ToLocation = toValue;
			General.Status = statusValue;
			General.IsMyAllTrips = isMyAllTrips;
			General.IsMyFutureTrips = isMyFutureTrips;
			General.IsDelegatedTrips = isDelegatedTrips;
			General.IsPlanning = isPlanning;

			return View();
		}

		[HttpGet]
		public async Task<IActionResult> GetRoleTools()
		{
			try
			{
				int accessLevel = Convert.ToInt16(HttpContext.Session.GetString("AccessLevel"));
                /*	var result = await downstreamApi.CallApiForUserAsync<ApiResponse<List<RoleTools>>>(
                                  ServiceName,
                                  options =>
                                  {
                                      options.HttpMethod = HttpMethod.Get.Method;
                                      options.RelativePath = $"api/v1/roletool/gettoolsbyaccesslevel?accessLevel={accessLevel}";
                                  });*/
                var result = new ApiResponse<List<RoleTools>>();
                if (result != null && result.Result != null)
				{
					return Json(result.Result);
				}
				return null;
			}
			catch (Exception ex)
			{
				return Json(ex);
			}
		}


		public async Task<ColorInfo> GetColorNameFromHexa(string hexaCode)
		{
			// Assuming GetColorList() is changed to return List<ColorInfo> directly
			List<ColorInfo> colorList = await GetColorListAsync();

			// Find the color by hex code
			ColorInfo color = colorList.FirstOrDefault(x => x.HexValue.Equals(hexaCode, StringComparison.OrdinalIgnoreCase));

			// Return the color information
			return color;
		}


		public async Task<List<ColorInfo>> GetColorListAsync()
		{
			// Simulate an async operation (like a database call)
			return await Task.FromResult(new List<ColorInfo>
			{
				new ColorInfo("#000000", "Black"),
				new ColorInfo("#040720", "Black Blue"),
				new ColorInfo("#0C090A", "Night"),
				new ColorInfo("#34282C", "Charcoal"),
				new ColorInfo("#3B3131", "Oil"),
				new ColorInfo("#3A3B3C", "Stormy Gray"),
				new ColorInfo("#454545", "Light Black"),
				new ColorInfo("#4D4D4F", "Dark Steampunk"),
				new ColorInfo("#413839", "Black Cat"),
				new ColorInfo("#3D3C3A", "Iridium"),
				new ColorInfo("#463E3F", "Black Eel"),
				new ColorInfo("#4C4646", "Black Cow"),
				new ColorInfo("#504A4B", "Gray Wolf"),
				new ColorInfo("#565051", "Vampire Gray"),
				new ColorInfo("#52595D", "Iron Gray"),
				new ColorInfo("#5C5858", "Gray Dolphin"),
				new ColorInfo("#625D5D", "Carbon Gray"),
				new ColorInfo("#666362", "Ash Gray"),
				new ColorInfo("#696969", "DimGray or DimGrey"),
				new ColorInfo("#686A6C", "Nardo Gray"),
				new ColorInfo("#6D6968", "Cloudy Gray"),
				new ColorInfo("#726E6D", "Smokey Gray"),
				new ColorInfo("#736F6E", "Alien Gray"),
				new ColorInfo("#757575", "Sonic Silver"),
				new ColorInfo("#797979", "Platinum Gray"),
				new ColorInfo("#837E7C", "Granite"),
				new ColorInfo("#808080", "Gray or Grey"),
				new ColorInfo("#848482", "Battleship Gray"),
				new ColorInfo("#888B90", "Sheet Metal"),
				new ColorInfo("#8C8C8C", "Dark Gainsboro"),
				new ColorInfo("#8D918D", "Gunmetal Gray"),
				new ColorInfo("#9B9A96", "Cold Metal"),
				new ColorInfo("#99A3A3", "Stainless Steel Gray"),
				new ColorInfo("#A9A9A9", "DarkGray or DarkGrey"),
				new ColorInfo("#A8A9AD", "Chrome Aluminum"),
				new ColorInfo("#B6B6B4", "Gray Cloud"),
				new ColorInfo("#B6B6B6", "Metal"),
				new ColorInfo("#C0C0C0", "Silver"),
				new ColorInfo("#C9C1C1", "Steampunk"),
				new ColorInfo("#C9C0BB", "Pale Silver"),
				new ColorInfo("#C0C6C7", "Gear Steel Gray"),
				new ColorInfo("#D1D0CE", "Gray Goose"),
				new ColorInfo("#CECECE", "Platinum Silver"),
				new ColorInfo("#D3D3D3", "LightGray or LightGrey"),
				new ColorInfo("#DADBDD", "Silver White"),
				new ColorInfo("#DCDCDC", "Gainsboro"),
				new ColorInfo("#E0E5E5", "Light Steel Gray"),
				new ColorInfo("#F5F5F5", "WhiteSmoke"),
				new ColorInfo("#EEEEEE", "White Gray"),
				new ColorInfo("#E5E4E2", "Platinum"),
				new ColorInfo("#BCC6CC", "Metallic Silver"),
				new ColorInfo("#98AFC7", "Blue Gray"),
				new ColorInfo("#838996", "Roman Silver"),
				new ColorInfo("#778899", "LightSlateGray or LightSlateGrey"),
				new ColorInfo("#708090", "SlateGray or SlateGrey"),
				new ColorInfo("#6D7B8D", "Rat Gray"),
				new ColorInfo("#657383", "Slate Granite Gray"),
				new ColorInfo("#616D7E", "Jet Gray"),
				new ColorInfo("#646D7E", "Mist Blue"),
				new ColorInfo("#71797E", "Steel Gray"),
				new ColorInfo("#566D7E", "Marble Blue"),
				new ColorInfo("#737CA1", "Slate Blue Gray"),
				new ColorInfo("#728FCE", "Light Purple Blue"),
				new ColorInfo("#4863A0", "Azure Blue"),
				new ColorInfo("#2F539B", "Estoril Blue"),
				new ColorInfo("#2B547E", "Blue Jay"),
				new ColorInfo("#36454F", "Charcoal Blue"),
				new ColorInfo("#29465B", "Dark Blue Gray"),
				new ColorInfo("#2B3856", "Dark Slate"),
				new ColorInfo("#123456", "Deep Sea Blue"),
				new ColorInfo("#151B54", "Night Blue"),
				new ColorInfo("#191970", "MidnightBlue"),
				new ColorInfo("#000080", "Navy"),
				new ColorInfo("#151B8D", "Denim Dark Blue"),
				new ColorInfo("#00008B", "DarkBlue"),
				new ColorInfo("#15317E", "Lapis Blue"),
				new ColorInfo("#0000A0", "New Midnight Blue"),
				new ColorInfo("#0000A5", "Earth Blue"),
				new ColorInfo("#0020C2", "Cobalt Blue"),
				new ColorInfo("#0000CD", "MediumBlue"),
				new ColorInfo("#0041C2", "Blueberry Blue"),
				new ColorInfo("#2916F5", "Canary Blue"),
				new ColorInfo("#0000FF", "Blue"),
				new ColorInfo("#0002FF", "Samco Blue"),
				new ColorInfo("#0909FF", "Bright Blue"),
				new ColorInfo("#1F45FC", "Blue Orchid"),
				new ColorInfo("#2554C7", "Sapphire Blue"),
				new ColorInfo("#1569C7", "Blue Eyes"),
				new ColorInfo("#1974D2", "Bright Navy Blue"),
				new ColorInfo("#2B60DE", "Balloon Blue"),
				new ColorInfo("#4169E1", "RoyalBlue"),
				new ColorInfo("#2B65EC", "Ocean Blue"),
				new ColorInfo("#0059FF", "Dark Sky Blue"),
				new ColorInfo("#306EFF", "Blue Ribbon"),
				new ColorInfo("#157DEC", "Blue Dress"),
				new ColorInfo("#1589FF", "Neon Blue"),
				new ColorInfo("#1E90FF", "DodgerBlue"),
				new ColorInfo("#368BC1", "Glacial Blue Ice"),
				new ColorInfo("#4682B4", "SteelBlue"),
				new ColorInfo("#488AC7", "Silk Blue"),
				new ColorInfo("#357EC7", "Windows Blue"),
				new ColorInfo("#3090C7", "Blue Ivy"),
				new ColorInfo("#14A3C7", "Cyan Blue"),
				new ColorInfo("#659EC7", "Blue Koi"),
				new ColorInfo("#87AFC7", "Columbia Blue"),
				new ColorInfo("#95B9C7", "Baby Blue"),
				new ColorInfo("#6495ED", "CornflowerBlue"),
				new ColorInfo("#6698FF", "Sky Blue Dress"),
				new ColorInfo("#56A5EC", "Iceberg"),
				new ColorInfo("#38ACEC", "Butterfly Blue"),
				new ColorInfo("#00BFFF", "DeepSkyBlue"),
				new ColorInfo("#3BB9FF", "Midday Blue"),
				new ColorInfo("#5CB3FF", "Crystal Blue"),
				new ColorInfo("#79BAEC", "Denim Blue"),
				new ColorInfo("#82CAFF", "Day Sky Blue"),
				new ColorInfo("#87CEFA", "LightSkyBlue"),
				new ColorInfo("#87CEEB", "SkyBlue"),
				new ColorInfo("#A0CFEC", "Jeans Blue"),
				new ColorInfo("#B7CEEC", "Blue Angel"),
				new ColorInfo("#B4CFEC", "Pastel Blue"),
				new ColorInfo("#ADDFFF", "Light Day Blue"),
				new ColorInfo("#C2DFFF", "Sea Blue"),
				new ColorInfo("#C6DEFF", "Heavenly Blue"),
				new ColorInfo("#BDEDFF", "Robin Egg Blue"),
				new ColorInfo("#B0E0E6", "PowderBlue"),
				new ColorInfo("#AFDCEC", "Coral Blue"),
				new ColorInfo("#ADD8E6", "LightBlue"),
				new ColorInfo("#B0CFDE", "LightSteelBlue"),
				new ColorInfo("#C9DFEC", "Gulf Blue"),
				new ColorInfo("#D5D6EA", "Pastel Light Blue"),
				new ColorInfo("#E3E4FA", "Lavender Blue"),
				new ColorInfo("#DBE9FA", "White Blue"),
				new ColorInfo("#E6E6FA", "Lavender"),
				new ColorInfo("#EBF4FA", "Water"),
				new ColorInfo("#F0F8FF", "AliceBlue"),
				new ColorInfo("#F8F8FF", "GhostWhite"),
				new ColorInfo("#F0FFFF", "Azure"),
				new ColorInfo("#E0FFFF", "LightCyan"),
				new ColorInfo("#CCFFFF", "Light Slate"),
				new ColorInfo("#9AFEFF", "Electric Blue"),
				new ColorInfo("#7DFDFE", "Tron Blue"),
				new ColorInfo("#57FEFF", "Blue Zircon"),
				new ColorInfo("#00FFFF", "Cyan or Aqua"),
				new ColorInfo("#0AFFFF", "Bright Cyan"),
				new ColorInfo("#50EBEC", "Celeste"),
				new ColorInfo("#4EE2EC", "Blue Diamond"),
				new ColorInfo("#16E2F5", "Bright Turquoise"),
				new ColorInfo("#8EEBEC", "Blue Lagoon"),
				new ColorInfo("#AFEEEE", "PaleTurquoise"),
				new ColorInfo("#CFECEC", "Pale Blue Lily"),
				new ColorInfo("#B3D9D9", "Light Teal"),
				new ColorInfo("#81D8D0", "Tiffany Blue"),
				new ColorInfo("#77BFC7", "Blue Hosta"),
				new ColorInfo("#92C7C7", "Cyan Opaque"),
				new ColorInfo("#78C7C7", "Northern Lights Blue"),
				new ColorInfo("#7BCCB5", "Blue Green"),
				new ColorInfo("#66CDAA", "MediumAquaMarine"),
				new ColorInfo("#93E9BE", "Aqua Seafoam Green"),
				new ColorInfo("#AAF0D1", "Magic Mint"),
				new ColorInfo("#93FFE8", "Light Aquamarine"),
				new ColorInfo("#7FFFD4", "Aquamarine"),
				new ColorInfo("#01F9C6", "Bright Teal"),
				new ColorInfo("#40E0D0", "Turquoise"),
				new ColorInfo("#48D1CC", "MediumTurquoise"),
				new ColorInfo("#48CCCD", "Deep Turquoise"),
				new ColorInfo("#46C7C7", "Jellyfish"),
				new ColorInfo("#43C6DB", "Blue Turquoise"),
				new ColorInfo("#00CED1", "DarkTurquoise"),
				new ColorInfo("#43BFC7", "Macaw Blue Green"),
				new ColorInfo("#20B2AA", "LightSeaGreen"),
				new ColorInfo("#3EA99F", "Seafoam Green"),
				new ColorInfo("#5F9EA0", "CadetBlue"),
				new ColorInfo("#3B9C9C", "Deep Sea"),
				new ColorInfo("#008B8B", "DarkCyan"),
				new ColorInfo("#00827F", "Teal Green"),
				new ColorInfo("#008080", "Teal"),
				new ColorInfo("#007C80", "Teal Blue"),
				new ColorInfo("#045F5F", "Medium Teal"),
				new ColorInfo("#045D5D", "Dark Teal"),
				new ColorInfo("#033E3E", "Deep Teal"),
				new ColorInfo("#25383C", "DarkSlateGray or DarkSlateGrey"),
				new ColorInfo("#2C3539", "Gunmetal"),
				new ColorInfo("#3C565B", "Blue Moss Green"),
				new ColorInfo("#4C787E", "Beetle Green"),
				new ColorInfo("#5E7D7E", "Grayish Turquoise"),
				new ColorInfo("#307D7E", "Greenish Blue"),
				new ColorInfo("#348781", "Aquamarine Stone"),
				new ColorInfo("#438D80", "Sea Turtle Green"),
				new ColorInfo("#4E8975", "Dull Sea Green"),
				new ColorInfo("#1F6357", "Dark Green Blue"),
				new ColorInfo("#306754", "Deep Sea Green"),
				new ColorInfo("#006A4E", "Bottle Green"),
				new ColorInfo("#2E8B57", "SeaGreen"),
				new ColorInfo("#1B8A6B", "Elf Green"),
				new ColorInfo("#31906E", "Dark Mint"),
				new ColorInfo("#00A36C", "Jade"),
				new ColorInfo("#34A56F", "Earth Green"),
				new ColorInfo("#1AA260", "Chrome Green"),
				new ColorInfo("#3EB489", "Mint"),
				new ColorInfo("#50C878", "Emerald"),
				new ColorInfo("#22CE83", "Isle Of Man Green"),
				new ColorInfo("#3CB371", "MediumSeaGreen"),
				new ColorInfo("#7C9D8E", "Metallic Green"),
				new ColorInfo("#78866B", "Camouflage Green"),
				new ColorInfo("#848B79", "Sage Green"),
				new ColorInfo("#617C58", "Hazel Green"),
				new ColorInfo("#728C00", "Venom Green"),
				new ColorInfo("#6B8E23", "OliveDrab"),
				new ColorInfo("#808000", "Olive"),
				new ColorInfo("#555D50", "Ebony"),
				new ColorInfo("#556B2F", "DarkOliveGreen"),
				new ColorInfo("#4E5B31", "Military Green"),
				new ColorInfo("#3A5F0B", "Green Leaves"),
				new ColorInfo("#4B5320", "Army Green"),
				new ColorInfo("#667C26", "Fern Green"),
				new ColorInfo("#4E9258", "Fall Forest Green"),
				new ColorInfo("#08A04B", "Irish Green"),
				new ColorInfo("#387C44", "Pine Green"),
				new ColorInfo("#347235", "Medium Forest Green"),
				new ColorInfo("#27742C", "Racing Green"),
				new ColorInfo("#347C2C", "Jungle Green"),
				new ColorInfo("#227442", "Cactus Green"),
				new ColorInfo("#228B22", "ForestGreen"),
				new ColorInfo("#008000", "Green"),
				new ColorInfo("#006400", "DarkGreen"),
				new ColorInfo("#056608", "Deep Green"),
				new ColorInfo("#046307", "Deep Emerald Green"),
				new ColorInfo("#355E3B", "Hunter Green"),
				new ColorInfo("#254117", "Dark Forest Green"),
				new ColorInfo("#004225", "Lotus Green"),
				new ColorInfo("#026C3D", "Broccoli Green"),
				new ColorInfo("#437C17", "Seaweed Green"),
				new ColorInfo("#347C17", "Shamrock Green"),
				new ColorInfo("#6AA121", "Green Onion"),
				new ColorInfo("#8A9A5B", "Moss Green"),
				new ColorInfo("#3F9B0B", "Grass Green"),
				new ColorInfo("#4AA02C", "Green Pepper"),
				new ColorInfo("#41A317", "Dark Lime Green"),
				new ColorInfo("#12AD2B", "Parrot Green"),
				new ColorInfo("#3EA055", "Clover Green"),
				new ColorInfo("#73A16C", "Dinosaur Green"),
				new ColorInfo("#6CBB3C", "Green Snake"),
				new ColorInfo("#6CC417", "Alien Green"),
				new ColorInfo("#4CC417", "Green Apple"),
				new ColorInfo("#32CD32", "LimeGreen"),
				new ColorInfo("#52D017", "Pea Green"),
				new ColorInfo("#4CC552", "Kelly Green"),
				new ColorInfo("#54C571", "Zombie Green"),
				new ColorInfo("#89C35C", "Green Peas"),
				new ColorInfo("#85BB65", "Dollar Bill Green"),
				new ColorInfo("#99C68E", "Frog Green"),
				new ColorInfo("#A0D6B4", "Turquoise Green"),
				new ColorInfo("#8FBC8F", "DarkSeaGreen"),
				new ColorInfo("#829F82", "Basil Green"),
				new ColorInfo("#A2AD9C", "Gray Green"),
				new ColorInfo("#B8BC86", "Light Olive Green"),
				new ColorInfo("#9CB071", "Iguana Green"),
				new ColorInfo("#8FB31D", "Citron Green"),
				new ColorInfo("#B0BF1A", "Acid Green"),
				new ColorInfo("#B2C248", "Avocado Green"),
				new ColorInfo("#9DC209", "Pistachio Green"),
				new ColorInfo("#A1C935", "Salad Green"),
				new ColorInfo("#9ACD32", "YellowGreen"),
				new ColorInfo("#77DD77", "Pastel Green"),
				new ColorInfo("#7FE817", "Hummingbird Green"),
				new ColorInfo("#59E817", "Nebula Green"),
				new ColorInfo("#57E964", "Stoplight Go Green"),
				new ColorInfo("#16F529", "Neon Green"),
				new ColorInfo("#5EFB6E", "Jade Green"),
				new ColorInfo("#00FF7F", "SpringGreen"),
				new ColorInfo("#00FF80", "Ocean Green"),
				new ColorInfo("#36F57F", "Lime Mint Green"),
				new ColorInfo("#00FA9A", "MediumSpringGreen"),
				new ColorInfo("#12E193", "Aqua Green"),
				new ColorInfo("#5FFB17", "Emerald Green"),
				new ColorInfo("#00FF00", "Lime"),
				new ColorInfo("#7CFC00", "LawnGreen"),
				new ColorInfo("#66FF00", "Bright Green"),
				new ColorInfo("#7FFF00", "Chartreuse"),
				new ColorInfo("#87F717", "Yellow Lawn Green"),
				new ColorInfo("#98F516", "Aloe Vera Green"),
				new ColorInfo("#B1FB17", "Dull Green Yellow"),
				new ColorInfo("#ADF802", "Lemon Green"),
				new ColorInfo("#ADFF2F", "GreenYellow"),
				new ColorInfo("#BDF516", "Chameleon Green"),
				new ColorInfo("#DAEE01", "Neon Yellow Green"),
				new ColorInfo("#E2F516", "Yellow Green Grosbeak"),
				new ColorInfo("#CCFB5D", "Tea Green"),
				new ColorInfo("#BCE954", "Slime Green"),
				new ColorInfo("#64E986", "Algae Green"),
				new ColorInfo("#90EE90", "LightGreen"),
				new ColorInfo("#6AFB92", "Dragon Green"),
				new ColorInfo("#98FB98", "PaleGreen"),
				new ColorInfo("#98FF98", "Mint Green"),
				new ColorInfo("#B5EAAA", "Green Thumb"),
				new ColorInfo("#E3F9A6", "Organic Brown"),
				new ColorInfo("#C3FDB8", "Light Jade"),
				new ColorInfo("#C2E5D3", "Light Mint Green"),
				new ColorInfo("#DBF9DB", "Light Rose Green"),
				new ColorInfo("#E8F1D4", "Chrome White"),
				new ColorInfo("#F0FFF0", "HoneyDew"),
				new ColorInfo("#F5FFFA", "MintCream"),
				new ColorInfo("#FFFACD", "LemonChiffon"),
				new ColorInfo("#FFFFC2", "Parchment"),
				new ColorInfo("#FFFFCC", "Cream"),
				new ColorInfo("#FFFDD0", "Cream White"),
				new ColorInfo("#FAFAD2", "LightGoldenRodYellow"),
				new ColorInfo("#FFFFE0", "LightYellow"),
				new ColorInfo("#F5F5DC", "Beige"),
				new ColorInfo("#F2F0DF", "White Yellow"),
				new ColorInfo("#FFF8DC", "Cornsilk"),
				new ColorInfo("#FBF6D9", "Blonde"),
				new ColorInfo("#FAEBD7", "AntiqueWhite"),
				new ColorInfo("#FFF0DB", "Light Beige"),
				new ColorInfo("#FFEFD5", "PapayaWhip"),
				new ColorInfo("#F7E7CE", "Champagne"),
				new ColorInfo("#FFEBCD", "BlanchedAlmond"),
				new ColorInfo("#FFE4C4", "Bisque"),
				new ColorInfo("#F5DEB3", "Wheat"),
				new ColorInfo("#FFE4B5", "Moccasin"),
				new ColorInfo("#FFE5B4", "Peach"),
				new ColorInfo("#FED8B1", "Light Orange"),
				new ColorInfo("#FFDAB9", "PeachPuff"),
				new ColorInfo("#FBD5AB", "Coral Peach"),
				new ColorInfo("#FFDEAD", "NavajoWhite"),
				new ColorInfo("#FBE7A1", "Golden Blonde"),
				new ColorInfo("#F3E3C3", "Golden Silk"),
				new ColorInfo("#F0E2B6", "Dark Blonde"),
				new ColorInfo("#F1E5AC", "Light Gold"),
				new ColorInfo("#F3E5AB", "Vanilla"),
				new ColorInfo("#ECE5B6", "Tan Brown"),
				new ColorInfo("#E8E4C9", "Dirty White"),
				new ColorInfo("#EEE8AA", "PaleGoldenRod"),
				new ColorInfo("#F0E68C", "Khaki"),
				new ColorInfo("#EDDA74", "Cardboard Brown"),
				new ColorInfo("#EDE275", "Harvest Gold"),
				new ColorInfo("#FFE87C", "Sun Yellow"),
				new ColorInfo("#FFF380", "Corn Yellow"),
				new ColorInfo("#FAF884", "Pastel Yellow"),
				new ColorInfo("#FFFF33", "Neon Yellow"),
				new ColorInfo("#FFFF00", "Yellow"),
				new ColorInfo("#FEF250", "Lemon Yellow"),
				new ColorInfo("#FFEF00", "Canary Yellow"),
				new ColorInfo("#F5E216", "Banana Yellow"),
				new ColorInfo("#FFDB58", "Mustard Yellow"),
				new ColorInfo("#FFDF00", "Golden Yellow"),
				new ColorInfo("#F9DB24", "Bold Yellow"),
				new ColorInfo("#EED202", "Safety Yellow"),
				new ColorInfo("#FFD801", "Rubber Ducky Yellow"),
				new ColorInfo("#FFD700", "Gold"),
				new ColorInfo("#FDD017", "Bright Gold"),
				new ColorInfo("#FFCE44", "Chrome Gold"),
				new ColorInfo("#EAC117", "Golden Brown"),
				new ColorInfo("#F6BE00", "Deep Yellow"),
				new ColorInfo("#F2BB66", "Macaroni and Cheese"),
				new ColorInfo("#FFBF00", "Amber"),
				new ColorInfo("#FBB917", "Saffron"),
				new ColorInfo("#FDBD01", "Neon Gold"),
				new ColorInfo("#FBB117", "Beer"),
				new ColorInfo("#FFAE42", "Yellow Orange or Orange Yellow"),
				new ColorInfo("#FFA62F", "Cantaloupe"),
				new ColorInfo("#FFA600", "Cheese Orange"),
				new ColorInfo("#FFA500", "Orange"),
				new ColorInfo("#EE9A4D", "Brown Sand"),
				new ColorInfo("#F4A460", "SandyBrown"),
				new ColorInfo("#E2A76F", "Brown Sugar"),
				new ColorInfo("#C19A6B", "Camel Brown"),
				new ColorInfo("#E6BF83", "Deer Brown"),
				new ColorInfo("#DEB887", "BurlyWood"),
				new ColorInfo("#D2B48C", "Tan"),
				new ColorInfo("#C8AD7F", "Light French Beige"),
				new ColorInfo("#C2B280", "Sand"),
				new ColorInfo("#C6BA8B", "Soft Hazel"),
				new ColorInfo("#BCB88A", "Sage"),
				new ColorInfo("#C8B560", "Fall Leaf Brown"),
				new ColorInfo("#C9BE62", "Ginger Brown"),
				new ColorInfo("#C9AE5D", "Bronze Gold"),
				new ColorInfo("#BDB76B", "DarkKhaki"),
				new ColorInfo("#BAB86C", "Olive Green"),
				new ColorInfo("#B5A642", "Brass"),
				new ColorInfo("#C7A317", "Cookie Brown"),
				new ColorInfo("#D4AF37", "Metallic Gold"),
				new ColorInfo("#E1AD01", "Mustard"),
				new ColorInfo("#E9AB17", "Bee Yellow"),
				new ColorInfo("#E8A317", "School Bus Yellow"),
				new ColorInfo("#DAA520", "GoldenRod"),
				new ColorInfo("#D4A017", "Orange Gold"),
				new ColorInfo("#C68E17", "Caramel"),
				new ColorInfo("#B8860B", "DarkGoldenRod"),
				new ColorInfo("#C58917", "Cinnamon"),
				new ColorInfo("#CD853F", "Peru"),
				new ColorInfo("#CD7F32", "Bronze"),
				new ColorInfo("#CA762B", "Pumpkin Pie"),
				new ColorInfo("#C88141", "Tiger Orange"),
				new ColorInfo("#B87333", "Copper"),
				new ColorInfo("#AA6C39", "Dark Gold"),
				new ColorInfo("#A97142", "Metallic Bronze"),
				new ColorInfo("#AB784E", "Dark Almond"),
				new ColorInfo("#966F33", "Wood"),
				new ColorInfo("#906E3E", "Khaki Brown"),
				new ColorInfo("#806517", "Oak Brown"),
				new ColorInfo("#665D1E", "Antique Bronze"),
				new ColorInfo("#8E7618", "Hazel"),
				new ColorInfo("#8B8000", "Dark Yellow"),
				new ColorInfo("#827839", "Dark Moccasin"),
				new ColorInfo("#8A865D", "Khaki Green"),
				new ColorInfo("#93917C", "Millennium Jade"),
				new ColorInfo("#9F8C76", "Dark Beige"),
				new ColorInfo("#AF9B60", "Bullet Shell"),
				new ColorInfo("#827B60", "Army Brown"),
				new ColorInfo("#786D5F", "Sandstone"),
				new ColorInfo("#483C32", "Taupe"),
				new ColorInfo("#4A412A", "Dark Grayish Olive"),
				new ColorInfo("#473810", "Dark Hazel Brown"),
				new ColorInfo("#493D26", "Mocha"),
				new ColorInfo("#513B1C", "Milk Chocolate"),
				new ColorInfo("#3D3635", "Gray Brown"),
				new ColorInfo("#3B2F2F", "Dark Coffee"),
				new ColorInfo("#49413F", "Western Charcoal"),
				new ColorInfo("#43302E", "Old Burgundy"),
				new ColorInfo("#622F22", "Red Brown"),
				new ColorInfo("#5C3317", "Bakers Brown"),
				new ColorInfo("#644117", "Pullman Brown"),
				new ColorInfo("#654321", "Dark Brown"),
				new ColorInfo("#704214", "Sepia Brown"),
				new ColorInfo("#804A00", "Dark Bronze"),
				new ColorInfo("#6F4E37", "Coffee"),
				new ColorInfo("#835C3B", "Brown Bear"),
				new ColorInfo("#7F5217", "Red Dirt"),
				new ColorInfo("#7F462C", "Sepia"),
				new ColorInfo("#A0522D", "Sienna"),
				new ColorInfo("#8B4513", "SaddleBrown"),
				new ColorInfo("#8A4117", "Dark Sienna"),
				new ColorInfo("#7E3817", "Sangria"),
				new ColorInfo("#7E3517", "Blood Red"),
				new ColorInfo("#954535", "Chestnut"),
				new ColorInfo("#9E4638", "Coral Brown"),
				new ColorInfo("#A05544", "Deep Amber"),
				new ColorInfo("#C34A2C", "Chestnut Red"),
				new ColorInfo("#B83C08", "Ginger Red"),
				new ColorInfo("#C04000", "Mahogany"),
				new ColorInfo("#EB5406", "Red Gold"),
				new ColorInfo("#C35817", "Red Fox"),
				new ColorInfo("#B86500", "Dark Bisque"),
				new ColorInfo("#B5651D", "Light Brown"),
				new ColorInfo("#B76734", "Petra Gold"),
				new ColorInfo("#A55D35", "Brown Rust"),
				new ColorInfo("#C36241", "Rust"),
				new ColorInfo("#CB6D51", "Copper Red"),
				new ColorInfo("#C47451", "Orange Salmon"),
				new ColorInfo("#D2691E", "Chocolate"),
				new ColorInfo("#CC6600", "Sedona"),
				new ColorInfo("#E56717", "Papaya Orange"),
				new ColorInfo("#E66C2C", "Halloween Orange"),
				new ColorInfo("#FF6700", "Neon Orange"),
				new ColorInfo("#FF5F1F", "Bright Orange"),
				new ColorInfo("#FE632A", "Fluro Orange"),
				new ColorInfo("#F87217", "Pumpkin Orange"),
				new ColorInfo("#FF7900", "Safety Orange"),
				new ColorInfo("#F88017", "Carrot Orange"),
				new ColorInfo("#FF8C00", "DarkOrange"),
				new ColorInfo("#F87431", "Construction Cone Orange"),
				new ColorInfo("#FF7722", "Indian Saffron"),
				new ColorInfo("#E67451", "Sunrise Orange"),
				new ColorInfo("#FF8040", "Mango Orange"),
				new ColorInfo("#FF7F50", "Coral"),
				new ColorInfo("#F88158", "Basket Ball Orange"),
				new ColorInfo("#F9966B", "Light Salmon Rose"),
				new ColorInfo("#FFA07A", "LightSalmon"),
				new ColorInfo("#F89880", "Pink Orange"),
				new ColorInfo("#E9967A", "DarkSalmon"),
				new ColorInfo("#E78A61", "Tangerine"),
				new ColorInfo("#DA8A67", "Light Copper"),
				new ColorInfo("#FF8674", "Salmon Pink"),
				new ColorInfo("#FA8072", "Salmon"),
				new ColorInfo("#F98B88", "Peach Pink"),
				new ColorInfo("#F08080", "LightCoral"),
				new ColorInfo("#F67280", "Pastel Red"),
				new ColorInfo("#E77471", "Pink Coral"),
				new ColorInfo("#F75D59", "Bean Red"),
				new ColorInfo("#E55451", "Valentine Red"),
				new ColorInfo("#CD5C5C", "IndianRed"),
				new ColorInfo("#FF6347", "Tomato"),
				new ColorInfo("#E55B3C", "Shocking Orange"),
				new ColorInfo("#FF4500", "OrangeRed"),
				new ColorInfo("#FF0000", "Red"),
				new ColorInfo("#FD1C03", "Neon Red"),
				new ColorInfo("#FF2400", "Scarlet Red"),
				new ColorInfo("#F62217", "Ruby Red"),
				new ColorInfo("#F70D1A", "Ferrari Red"),
				new ColorInfo("#F62817", "Fire Engine Red"),
				new ColorInfo("#E42217", "Lava Red"),
				new ColorInfo("#E41B17", "Love Red"),
				new ColorInfo("#DC381F", "Grapefruit"),
				new ColorInfo("#C83F49", "Strawberry Red"),
				new ColorInfo("#C24641", "Cherry Red"),
				new ColorInfo("#C11B17", "Chilli Pepper"),
				new ColorInfo("#B22222", "FireBrick"),
				new ColorInfo("#B21807", "Tomato Sauce Red"),
				new ColorInfo("#A52A2A", "Brown"),
				new ColorInfo("#A70D2A", "Carbon Red"),
				new ColorInfo("#9F000F", "Cranberry"),
				new ColorInfo("#931314", "Saffron Red"),
				new ColorInfo("#990000", "Crimson Red"),
				new ColorInfo("#990012", "Red Wine or Wine Red"),
				new ColorInfo("#8B0000", "DarkRed"),
				new ColorInfo("#8F0B0B", "Maroon Red"),
				new ColorInfo("#800000", "Maroon"),
				new ColorInfo("#8C001A", "Burgundy"),
				new ColorInfo("#7E191B", "Vermilion"),
				new ColorInfo("#800517", "Deep Red"),
				new ColorInfo("#733635", "Garnet Red"),
				new ColorInfo("#660000", "Red Blood"),
				new ColorInfo("#551606", "Blood Night"),
				new ColorInfo("#560319", "Dark Scarlet"),
				new ColorInfo("#3F000F", "Chocolate Brown"),
				new ColorInfo("#3D0C02", "Black Bean"),
				new ColorInfo("#2F0909", "Dark Maroon"),
				new ColorInfo("#2B1B17", "Midnight"),
				new ColorInfo("#550A35", "Purple Lily"),
				new ColorInfo("#810541", "Purple Maroon"),
				new ColorInfo("#7D0541", "Plum Pie"),
				new ColorInfo("#7D0552", "Plum Velvet"),
				new ColorInfo("#872657", "Dark Raspberry"),
				new ColorInfo("#7E354D", "Velvet Maroon"),
				new ColorInfo("#7F4E52", "Rosy Finch"),
				new ColorInfo("#7F525D", "Dull Purple"),
				new ColorInfo("#7F5A58", "Puce"),
				new ColorInfo("#997070", "Rose Dust"),
				new ColorInfo("#B1907F", "Pastel Brown"),
				new ColorInfo("#B38481", "Rosy Pink"),
				new ColorInfo("#BC8F8F", "RosyBrown"),
				new ColorInfo("#C5908E", "Khaki Rose"),
				new ColorInfo("#C48793", "Lipstick Pink"),
				new ColorInfo("#CC7A8B", "Dusky Pink"),
				new ColorInfo("#C48189", "Pink Brown"),
				new ColorInfo("#C08081", "Old Rose"),
				new ColorInfo("#D58A94", "Dusty Pink"),
				new ColorInfo("#E799A3", "Pink Daisy"),
				new ColorInfo("#E8ADAA", "Rose"),
				new ColorInfo("#C9A9A6", "Dusty Rose"),
				new ColorInfo("#C4AEAD", "Silver Pink"),
				new ColorInfo("#E6C7C2", "Gold Pink"),
				new ColorInfo("#ECC5C0", "Rose Gold"),
				new ColorInfo("#FFCBA4", "Deep Peach"),
				new ColorInfo("#F8B88B", "Pastel Orange"),
				new ColorInfo("#EDC9AF", "Desert Sand"),
				new ColorInfo("#FFDDCA", "Unbleached Silk"),
				new ColorInfo("#FDD7E4", "Pig Pink"),
				new ColorInfo("#F2D4D7", "Pale Pink"),
				new ColorInfo("#FFE6E8", "Blush"),
				new ColorInfo("#FFE4E1", "MistyRose"),
				new ColorInfo("#FFDFDD", "Pink Bubble Gum"),
				new ColorInfo("#FBCFCD", "Light Rose"),
				new ColorInfo("#FFCCCB", "Light Red"),
				new ColorInfo("#F7CAC9", "Rose Quartz"),
				new ColorInfo("#F6C6BD", "Warm Pink"),
				new ColorInfo("#FBBBB9", "Deep Rose"),
				new ColorInfo("#FFC0CB", "Pink"),
				new ColorInfo("#FFB6C1", "LightPink"),
				new ColorInfo("#FFB8BF", "Soft Pink"),
				new ColorInfo("#FFB2D0", "Powder Pink"),
				new ColorInfo("#FAAFBE", "Donut Pink"),
				new ColorInfo("#FAAFBA", "Baby Pink"),
				new ColorInfo("#F9A7B0", "Flamingo Pink"),
				new ColorInfo("#FEA3AA", "Pastel Pink"),
				new ColorInfo("#E7A1B0", "Rose Pink or Pink Rose"),
				new ColorInfo("#E38AAE", "Cadillac Pink"),
				new ColorInfo("#F778A1", "Carnation Pink"),
				new ColorInfo("#E5788F", "Pastel Rose"),
				new ColorInfo("#E56E94", "Blush Red"),
				new ColorInfo("#DB7093", "PaleVioletRed"),
				new ColorInfo("#D16587", "Purple Pink"),
				new ColorInfo("#C25A7C", "Tulip Pink"),
				new ColorInfo("#C25283", "Bashful Pink"),
				new ColorInfo("#E75480", "Dark Pink"),
				new ColorInfo("#F660AB", "Dark Hot Pink"),
				new ColorInfo("#FF69B4", "HotPink"),
				new ColorInfo("#FC6C85", "Watermelon Pink"),
				new ColorInfo("#F6358A", "Violet Red"),
				new ColorInfo("#F52887", "Hot Deep Pink"),
				new ColorInfo("#FF007F", "Bright Pink"),
				new ColorInfo("#FF0080", "Red Magenta"),
				new ColorInfo("#FF1493", "DeepPink"),
				new ColorInfo("#F535AA", "Neon Pink"),
				new ColorInfo("#FF33AA", "Chrome Pink"),
				new ColorInfo("#FD349C", "Neon Hot Pink"),
				new ColorInfo("#E45E9D", "Pink Cupcake"),
				new ColorInfo("#E759AC", "Royal Pink"),
				new ColorInfo("#E3319D", "Dimorphotheca Magenta"),
				new ColorInfo("#DA1884", "Barbie Pink"),
				new ColorInfo("#E4287C", "Pink Lemonade"),
				new ColorInfo("#FA2A55", "Red Pink"),
				new ColorInfo("#E30B5D", "Raspberry"),
				new ColorInfo("#DC143C", "Crimson"),
				new ColorInfo("#C32148", "Bright Maroon"),
				new ColorInfo("#C21E56", "Rose Red"),
				new ColorInfo("#C12869", "Rogue Pink"),
				new ColorInfo("#C12267", "Burnt Pink"),
				new ColorInfo("#CA226B", "Pink Violet"),
				new ColorInfo("#CC338B", "Magenta Pink"),
				new ColorInfo("#C71585", "MediumVioletRed"),
				new ColorInfo("#C12283", "Dark Carnation Pink"),
				new ColorInfo("#B3446C", "Raspberry Purple"),
				new ColorInfo("#B93B8F", "Pink Plum"),
				new ColorInfo("#DA70D6", "Orchid"),
				new ColorInfo("#DF73D4", "Deep Mauve"),
				new ColorInfo("#EE82EE", "Violet"),
				new ColorInfo("#FF77FF", "Fuchsia Pink"),
				new ColorInfo("#F433FF", "Bright Neon Pink"),
				new ColorInfo("#FF00FF", "Magenta or Fuchsia"),
				new ColorInfo("#E238EC", "Crimson Purple"),
				new ColorInfo("#D462FF", "Heliotrope Purple"),
				new ColorInfo("#C45AEC", "Tyrian Purple"),
				new ColorInfo("#BA55D3", "MediumOrchid"),
				new ColorInfo("#A74AC7", "Purple Flower"),
				new ColorInfo("#B048B5", "Orchid Purple"),
				new ColorInfo("#B666D2", "Rich Lilac"),
				new ColorInfo("#D291BC", "Pastel Violet"),
				new ColorInfo("#A17188", "Rosy"),
				new ColorInfo("#915F6D", "Mauve Taupe"),
				new ColorInfo("#7E587E", "Viola Purple"),
				new ColorInfo("#614051", "Eggplant"),
				new ColorInfo("#583759", "Plum Purple"),
				new ColorInfo("#5E5A80", "Grape"),
				new ColorInfo("#4E5180", "Purple Navy"),
				new ColorInfo("#6A5ACD", "SlateBlue"),
				new ColorInfo("#6960EC", "Blue Lotus"),
				new ColorInfo("#5865F2", "Blurple"),
				new ColorInfo("#736AFF", "Light Slate Blue"),
				new ColorInfo("#7B68EE", "MediumSlateBlue"),
				new ColorInfo("#7575CF", "Periwinkle Purple"),
				new ColorInfo("#6667AB", "Very Peri"),
				new ColorInfo("#6F2DA8", "Bright Grape"),
				new ColorInfo("#6A0DAD", "Bright Purple"),
				new ColorInfo("#6C2DC7", "Purple Amethyst"),
				new ColorInfo("#822EFF", "Blue Magenta"),
				new ColorInfo("#5539CC", "Dark Blurple"),
				new ColorInfo("#5453A6", "Deep Periwinkle"),
				new ColorInfo("#483D8B", "DarkSlateBlue"),
				new ColorInfo("#4E387E", "Purple Haze"),
				new ColorInfo("#571B7E", "Purple Iris"),
				new ColorInfo("#4B0150", "Dark Purple"),
				new ColorInfo("#36013F", "Deep Purple"),
				new ColorInfo("#2E1A47", "Midnight Purple"),
				new ColorInfo("#461B7E", "Purple Monster"),
				new ColorInfo("#4B0082", "Indigo"),
				new ColorInfo("#342D7E", "Blue Whale"),
				new ColorInfo("#663399", "RebeccaPurple"),
				new ColorInfo("#6A287E", "Purple Jam"),
				new ColorInfo("#8B008B", "DarkMagenta"),
				new ColorInfo("#800080", "Purple"),
				new ColorInfo("#86608E", "French Lilac"),
				new ColorInfo("#9932CC", "DarkOrchid"),
				new ColorInfo("#9400D3", "DarkViolet"),
				new ColorInfo("#8D38C9", "Purple Violet"),
				new ColorInfo("#A23BEC", "Jasmine Purple"),
				new ColorInfo("#B041FF", "Purple Daffodil"),
				new ColorInfo("#842DCE", "Clematis Violet"),
				new ColorInfo("#8A2BE2", "BlueViolet"),
				new ColorInfo("#7A5DC7", "Purple Sage Bush"),
				new ColorInfo("#7F38EC", "Lovely Purple"),
				new ColorInfo("#9D00FF", "Neon Purple"),
				new ColorInfo("#8E35EF", "Purple Plum"),
				new ColorInfo("#893BFF", "Aztech Purple"),
				new ColorInfo("#9370DB", "MediumPurple"),
				new ColorInfo("#8467D7", "Light Purple"),
				new ColorInfo("#9172EC", "Crocus Purple"),
				new ColorInfo("#9E7BFF", "Purple Mimosa"),
				new ColorInfo("#8686AF", "Pastel Indigo"),
				new ColorInfo("#967BB6", "Lavender Purple"),
				new ColorInfo("#B09FCA", "Rose Purple"),
				new ColorInfo("#C8C4DF", "Viola"),
				new ColorInfo("#CCCCFF", "Periwinkle"),
				new ColorInfo("#DCD0FF", "Pale Lilac"),
				new ColorInfo("#C8A2C8", "Lilac"),
				new ColorInfo("#E0B0FF", "Mauve"),
				new ColorInfo("#D891EF", "Bright Lilac"),
				new ColorInfo("#C38EC7", "Purple Dragon"),
				new ColorInfo("#DDA0DD", "Plum"),
				new ColorInfo("#E6A9EC", "Blush Pink"),
				new ColorInfo("#F2A2E8", "Pastel Purple"),
				new ColorInfo("#F9B7FF", "Blossom Pink"),
				new ColorInfo("#C6AEC7", "Wisteria Purple"),
				new ColorInfo("#D2B9D3", "Purple Thistle"),
				new ColorInfo("#D8BFD8", "Thistle"),
				new ColorInfo("#DFD3E3", "Purple White"),
				new ColorInfo("#E9CFEC", "Periwinkle Pink"),
				new ColorInfo("#FCDFFF", "Cotton Candy"),
				new ColorInfo("#EBDDE2", "Lavender Pinocchio"),
				new ColorInfo("#E1D9D1", "Dark White"),
				new ColorInfo("#E9E4D4", "Ash White"),
				new ColorInfo("#EFEBD8", "Warm White"),
				new ColorInfo("#EDE6D6", "White Chocolate"),
				new ColorInfo("#F0E9D6", "Creamy White"),
				new ColorInfo("#F8F0E3", "Off White"),
				new ColorInfo("#FAF0DD", "Soft Ivory"),
				new ColorInfo("#FFF8E7", "Cosmic Latte"),
				new ColorInfo("#F8F6F0", "Pearl White"),
				new ColorInfo("#F3E8EA", "Red White"),
				new ColorInfo("#FFF0F5", "LavenderBlush"),
				new ColorInfo("#FDEEF4", "Pearl"),
				new ColorInfo("#FFF9E3", "Egg Shell"),
				new ColorInfo("#FEF0E3", "OldLace"),
				new ColorInfo("#EAEEE9", "White Ice"),
				new ColorInfo("#FAF0E6", "Linen"),
				new ColorInfo("#FFF5EE", "SeaShell"),
				new ColorInfo("#F9F6EE", "Bone White"),
				new ColorInfo("#FAF5EF", "Rice"),
				new ColorInfo("#FFFAF0", "FloralWhite"),
				new ColorInfo("#FFFFF0", "Ivory"),
				new ColorInfo("#FFFFF4", "White Gold"),
				new ColorInfo("#FFFFF7", "Light White"),
				new ColorInfo("#FBFBF9", "Cotton"),
				new ColorInfo("#FFFAFA", "Snow"),
				new ColorInfo("#FEFCFF", "Milk White"),
				new ColorInfo("#FFFEFA", "Half White"),
				new ColorInfo("#FFFFFF", "White")
			});

		}
	}

}

