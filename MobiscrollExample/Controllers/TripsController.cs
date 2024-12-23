using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nestle.CH.HQ.RSL.WebApp.ApiRequestBody;
using Nestle.CH.HQ.RSL.WebApp.Models;
using Nestle.CH.HQ.RSL.WebApp.Models.LocationModel;
using Nestle.CH.HQ.RSL.WebApp.Models.PaymentModel;
using Nestle.CH.HQ.RSL.WebApp.Services;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text;

namespace Nestle.CH.HQ.RSL.WebApp.Controllers
{
    // [AuthorizeForScopes(ScopeKeySection = "ServiceAPI:Scopes")]
    public class TripsController : Controller
    {
       // private readonly IDownstreamApi downstreamApi;
        private readonly LanguageService localization;
        private const string ServiceName = "ServiceAPI";
        public TripsController(LanguageService localization)
        {
           // this.downstreamApi = downstreamApi;
            this.localization = localization;
        }
        public async Task<IActionResult> Index()
        {
            if (HttpContext.Session.GetString("UserId") == null)
            {
                var languages = new List<Languages>
                        {
                            new Languages { Id = 1, Language = "en", Description = "English" },
                            new Languages { Id = 2, Language = "fr", Description = "Français" }
                        };
                string languagesJson = JsonConvert.SerializeObject(languages);
                HttpContext.Session.SetString("UserId", "12345");
                HttpContext.Session.SetString("UserLoginName", "johndoe");
                HttpContext.Session.SetString("FullName", "John Doe");
                HttpContext.Session.SetString("UserEmail", "johndoe@example.com");
                HttpContext.Session.SetString("FirstName", "John");
                HttpContext.Session.SetString("LastName", "Doe");
                HttpContext.Session.SetString("LanguageId", "1");
                HttpContext.Session.SetString("Languages", languagesJson);
                HttpContext.Session.SetString("AccessLevel", "Admin");
            }
            var toolsList = new List<Tools>
        {
              new Tools { ToolsId = 23, ToolName = "mnuAdminDrivers", TollText = "Chauffeurs", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 31, 973) },
            new Tools { ToolsId = 24, ToolName = "mnuTripOutOfPolicy", TollText = "Courses hors politique", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 460) },
            new Tools { ToolsId = 25, ToolName = "mnuAdminLocations", TollText = "Emplacements", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 460) },
            new Tools { ToolsId = 26, ToolName = "mnuAdminManageAccess", TollText = "Gérer les accès", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 460) },
            new Tools { ToolsId = 27, ToolName = "mnuAdminPaymentMode", TollText = "Modes de paiement", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 460) },
            new Tools { ToolsId = 28, ToolName = "mnuAdminParameters", TollText = "Paramètres", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 460) },
            new Tools { ToolsId = 29, ToolName = "mnuAdminPassenger", TollText = "Passagers", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 460) },
            new Tools { ToolsId = 30, ToolName = "mnuTripPlanning", TollText = "Planning des courses", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 460) },
            new Tools { ToolsId = 31, ToolName = "myPrintTool", TollText = "Rapport d'impression", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 477) },
            new Tools { ToolsId = 32, ToolName = "mnuReportWorkReport", TollText = "Rapport de travail", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 477) },
            new Tools { ToolsId = 33, ToolName = "mnuReportNightSunday", TollText = "Rapport des heures de nuit et dimanche", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 477) },
            new Tools { ToolsId = 34, ToolName = "mnuReportOvertime", TollText = "Rapport des heures supplémentaires", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 477) },
            new Tools { ToolsId = 35, ToolName = "mnuReportAuthorizedPeople", TollText = "Rapport des trajets des ayants-droits", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 477) },
            new Tools { ToolsId = 36, ToolName = "mnuTripSearch", TollText = "Recherche d'une course", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 477) },
            new Tools { ToolsId = 37, ToolName = "myExportTool", TollText = "Rapport d'export PDF", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 477) },
            new Tools { ToolsId = 38, ToolName = "mnuAdminExternalServices", TollText = "Services externes", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 477) },
            new Tools { ToolsId = 39, ToolName = "mnuAdminEventKind", TollText = "Sortes d'événement", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 477) },
            new Tools { ToolsId = 40, ToolName = "mnuAdminSyncPassengers", TollText = "Synchroniser les passagers", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 477) },
            new Tools { ToolsId = 41, ToolName = "mnuAdminUsers", TollText = "Utilisateurs", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 477) },
            new Tools { ToolsId = 42, ToolName = "mnuTripValidation", TollText = "Validation des courses", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 490) },
            new Tools { ToolsId = 43, ToolName = "mnuAdminVehicle", TollText = "Véhicules", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 490) },
            new Tools { ToolsId = 44, ToolName = "mnuAdminClearCache", TollText = "Vider le cache", TimeStamp = new DateTime(2021, 11, 29, 07, 15, 45, 490) }
        };

            // Create a list of RoleTools based on the tools
            var roleToolsList = toolsList.Select(tool => new RoleTools
            {
                ToolId = tool.ToolsId,
                Name = tool.ToolName,
                Text = tool.TollText,
                AccessLevel = 6,  // Default access level, can be adjusted as per your logic
                IsEnabled = true, // Default IsEnabled, can be set based on your business rules
            }).ToList();

            // Serialize the RoleTools list into JSON
            var json = JsonConvert.SerializeObject(roleToolsList, Formatting.Indented);

            // Store the serialized RoleTools list in the session
            HttpContext.Session.SetString("RoleToolsList", json);
            // Access session values
            var userType = HttpContext.Session.GetString("UserType") ?? "Admin";  // Default to "Admin" if null
            userType = "Admin";
            if (userType == "Admin")
            {
                return RedirectToAction("ManagerDashboard");
            }
           /* var UserType = HttpContext.Session.GetString("UserType");*/
            //var modal = GetRoleTools();
           
           /* if (UserType == "Admin")
            {
                return RedirectToAction("ManagerDashboard");
            }*/
			return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetRoleTools()
        {
            try
            {
                int accessLevel = Convert.ToInt16(HttpContext.Session.GetString("AccessLevel"));
                /* var result = await downstreamApi.CallApiForUserAsync<ApiResponse<List<RoleTools>>>(
                               ServiceName,
                               options =>
                               {
                                   options.HttpMethod = HttpMethod.Get.Method;
                                   options.RelativePath = $"api/v1/roletool/gettoolsbyaccesslevel?accessLevel={accessLevel}";
                               });*/
                var result = new ApiResponse<string>();

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
        
        [HttpDelete]
        public async Task<bool> DeleteTripStep(int tripStepId)
        {
                List<int> list = new List<int>();
            try
            {
                list.Add(tripStepId);
                string idList = string.Join(",", list);
                //int accessLevel = Convert.ToInt16(HttpContext.Session.GetString("AccessLevel"));
                /*   var result = await downstreamApi.CallApiForUserAsync<ApiResponse<bool>>(
                                 ServiceName,
                                 options =>
                                 {
                                     options.HttpMethod = HttpMethod.Delete.Method;
                                     options.RelativePath = $"api/v1/user/deletetripstep?tripStepId={idList}";
                                 });*/
                var result = new ApiResponse<bool>();

                return result.Result;
                
        
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        [HttpGet]
        public async Task<IActionResult> getAllTrips(DateTime dateFrom,DateTime dateTo)
        {
            try
            {
                string dateFromString = dateFrom.ToString("MM/dd/yyyy HH:mm:ss");
                string dateToString = dateTo.ToString("MM/dd/yyyy HH:mm:ss");
                /*  var result = await downstreamApi.CallApiForUserAsync<ApiResponse<List<PlanningTrips>>>(
                        ServiceName,
                        options =>
                        {
                            options.HttpMethod = HttpMethod.Get.Method;
                            options.RelativePath = $"api/v1/user/getalltrips?dateFrom={dateFromString}&dateTo={dateToString}";
                        });*/
                var result = new ApiResponse<List<PlanningTrips>>
                {
                    Result = new List<PlanningTrips>
    {
                         new PlanningTrips
    {
        TripId = 100,
        DriverId = 101,
        ExternalServiceId = 1,
        Status = 2, // In Progress
        StatusName = "In Progress",
        VehicleName = "SUV",
        FlightType = 1,
        IsMailSent = false,
        FromDate = DateTime.Now,
        ToDate = DateTime.Now.AddHours(6),
        FlightNumber = "AA1234",
        TripSteps = new List<TripStep>
        {
            new TripStep
            {
                TripStepId = 1001,
                TripFromDate = DateTime.Now,
                TripToDate = DateTime.Now.AddHours(3),
                FromLocation = new Location { LocationName = "New York", LocationId = 10 },
                ToLocation = new Location { LocationName = "Boston", LocationId = 11 },
                Mail = "Yes",
                Comment = "First leg of the trip"
            }
        },
        MainPassenger = new List<Passenger>
        {
            new Passenger { PassengerId = 1, FirstName = "John", LastName = "Doe", MobilePhone = "123-456-7890" }
        },
        ExternalService = new ExternalService
        {
            id = 1,
            name = "ABC Transport",
            code = "ABC",
            contact_firstname = "James",
            contact_lastname = "Smith",
            contact_email = "james.smith@abc.com",
            unassigned_warning_hours = 24,
            modified_by = "admin",
            time_stamp = DateTime.Now
        }
    },
    new PlanningTrips
    {
        TripId = 101,
        DriverId = 102,
        ExternalServiceId = 2,
        Status = 3, // Completed
        StatusName = "Completed",
        VehicleName = "Sedan",
        FlightType = 2,
        IsMailSent = false,
        FromDate = DateTime.Now.AddDays(1),
        ToDate = DateTime.Now.AddDays(1).AddHours(8),
        FlightNumber = "DL5678",
        TripSteps = new List<TripStep>
        {
            new TripStep
            {
                TripStepId = 1002,
                TripFromDate = DateTime.Now.AddDays(1),
                TripToDate = DateTime.Now.AddDays(1).AddHours(4),
                FromLocation = new Location { LocationName = "San Francisco", LocationId = 1 },
                ToLocation = new Location { LocationName = "Los Angeles", LocationId = 2 },
                Mail = "No",
                Comment = "Second leg of the trip"
            }
        },
        MainPassenger = new List<Passenger>
        {
            new Passenger { PassengerId = 2, FirstName = "Emma", LastName = "Stone", MobilePhone = "222-333-4444" }
        },
        ExternalService = new ExternalService
        {
            id = 2,
            name = "XYZ Logistics",
            code = "XYZ",
            contact_firstname = "Sarah",
            contact_lastname = "Connor",
            contact_email = "sarah.connor@xyz.com",
            unassigned_warning_hours = 12,
            modified_by = "user",
            time_stamp = DateTime.Now
        }
    },
    new PlanningTrips
    {
        TripId = 102,
        DriverId = 3,
        //ExternalServiceId = 3,
        Status = 11, // On Hold
        StatusName = "On Hold",
        VehicleName = "Van",
        FlightType = 2,
        IsMailSent = true,
        FromDate = DateTime.Now.AddDays(2),
        ToDate = DateTime.Now.AddDays(2).AddHours(5),
        FlightNumber = "UA8765",
        TripSteps = new List<TripStep>
        {
            new TripStep
            {
                TripStepId = 1003,
                TripFromDate = DateTime.Now.AddDays(2),
                TripToDate = DateTime.Now.AddDays(2).AddHours(2),
                FromLocation = new Location { LocationName = "Chicago", LocationId = 3 },
                ToLocation = new Location { LocationName = "Detroit", LocationId = 4 },
                Mail = "Yes",
                Comment = "Layover in Detroit"
            }
        },
        MainPassenger = new List<Passenger>
        {
            new Passenger { PassengerId = 3, FirstName = "Liam", LastName = "Johnson", MobilePhone = "555-666-7777" }
        },
        ExternalService = new ExternalService
        {
            id = 3,
            name = "Global Movers",
            code = "GM",
            contact_firstname = "Michael",
            contact_lastname = "Jordan",
            contact_email = "michael.jordan@gm.com",
            unassigned_warning_hours = 48,
            modified_by = "admin",
            time_stamp = DateTime.Now
        }
    },
    new PlanningTrips
    {
        TripId = 103,
        DriverId = 4,
        //ExternalServiceId = ,
        Status = 10, // Cancelled
        StatusName = "Cancelled",
        VehicleName = "Truck",
        FlightType = 4,
        IsMailSent = true,
        FromDate = DateTime.Now.AddDays(3),
        ToDate = DateTime.Now.AddDays(3).AddHours(10),
        FlightNumber = "BA9999",
        TripSteps = new List<TripStep>
        {
            new TripStep
            {
                TripStepId = 1004,
                TripFromDate = DateTime.Now.AddDays(3),
                TripToDate = DateTime.Now.AddDays(3).AddHours(7),
                FromLocation = new Location { LocationName = "Miami", LocationId = 5 },
                ToLocation = new Location { LocationName = "Orlando", LocationId = 6 },
                Mail = "No",
                Comment = "Cancelled due to weather"
            }
        },
        MainPassenger = new List<Passenger>
        {
            new Passenger { PassengerId = 4, FirstName = "Sophia", LastName = "Brown", MobilePhone = "888-999-0000" }
        },
        ExternalService = new ExternalService
        {
            id = 4,
            name = "Rapid Transit",
            code = "RT",
            contact_firstname = "David",
            contact_lastname = "Beckham",
            contact_email = "david.beckham@rt.com",
            unassigned_warning_hours = 8,
            modified_by = "system",
            time_stamp = DateTime.Now
        }
    },
        new PlanningTrips
        {
            TripId = 1,
            DriverId = 101,
            ExternalServiceId = 1,
            Status = 1,
            StatusName = "Scheduled",
            VehicleName = "Van",
            FlightType = 1,
            IsMailSent = true,
            IsFavorite = false,
            FromDate = DateTime.Now.AddDays(1),
            ToDate = DateTime.Now.AddDays(2),
            FlightNumber = "AA1234",
            OtherCostCenter = "Sales",
            FlightDateTime = DateTime.Now.AddDays(1).AddHours(3),
            TripSteps = new List<TripStep>
            {
                new TripStep
                {
                    TripStepId = 1001,
                    TripFromDate = DateTime.Now.AddDays(1),
                    TripToDate = DateTime.Now.AddDays(2),
                    FromLocation = new Location { LocationName = "New York" },
                    ToLocation = new Location { LocationName = "Boston" },
                    Mail = "Yes",
                    Comment = "First leg of the trip",
                    Passengers = new List<Passengers>
                    {
                        new Passengers { PassengerId = 1, FirstName = "John", LastName = "Doe", MobilePhone = "123-456-7890" }
                    }
                }
            },
           // RequestedUser = new User { UserId = 501, Name = "Alice Smith" },
            MainPassenger = new List<Passenger>
            {
                new Passenger { PassengerId = 2, FirstName = "Jane", LastName = "Doe", MobilePhone = "987-654-3210" }
            },
            CostCenterId = 301,
            IsConfidential = false,
            IsOutOfPolicy = false,
            ExternalService = new ExternalService
            {
                id = 201,
                name = "ABC Transport",
                code = "ABC",
                contact_lastname = "Brown",
                contact_firstname = "Michael",
                contact_email = "michael.brown@abc.com",
                contact_phone = "555-1234",
                unassigned_warning_hours = 24,
                unconfirmed_warning_hours = 48,
                webservice_url = "https://api.abc.com",
                modified_by = "system",
                time_stamp = DateTime.Now
            },
            //PaymentMode = new PaymentMode { Mode = "Credit Card" },
            ModifiedBy = "Admin"
        },
        new PlanningTrips
        {
            TripId = 2,
            DriverId = 102,
            ExternalServiceId = 2,
            Status = 2,
            StatusName = "In Progress",
            VehicleName = "Sedan",
            FlightType = 2,
            IsMailSent = false,
            FromDate = DateTime.Now,
            ToDate = DateTime.Now.AddHours(8),
            FlightNumber = "DL5678",
            TripSteps = new List<TripStep>
            {
                new TripStep
                {
                    TripStepId = 1002,
                    TripFromDate = DateTime.Now,
                    TripToDate = DateTime.Now.AddHours(4),
                    FromLocation = new Location { LocationName = "San Francisco",LocationId=1 },
                    ToLocation = new Location { LocationName = "Los Angeles",LocationId=2 },
                    Mail = "No",
                    Comment = "Second leg of the trip"
                }
            },
            //RequestedUser = new User { UserId = 502, Name = "Bob Johnson" },
            MainPassenger = new List<Passenger>
            {
                new Passenger { PassengerId = 3, FirstName = "Emma", LastName = "Stone", MobilePhone = "222-333-4444" }
            },
            ExternalService = new ExternalService
            {
                id = 3,
                name = "XYZ Logistics",
                code = "XYZ",
                contact_firstname = "Sarah",
                contact_lastname = "Connor",
                contact_email = "sarah.connor@xyz.com",
                unassigned_warning_hours = 12,
                modified_by = "user",
                time_stamp = DateTime.Now
            },
            //PaymentMode = new PaymentMode { Mode = "Cash" }
        },
        new PlanningTrips
        {
            TripId = 3,
            DriverId = 103,
            Status = 3,
            StatusName = "Completed",
            VehicleName = "Bus",
            FromDate = DateTime.Now.AddDays(-1),
            ToDate = DateTime.Now,
            IsMailSent = true,
            IsFavorite = true,
            MainPassenger = new List<Passenger>
            {
                new Passenger { PassengerId = 4, FirstName = "Chris", LastName = "Evans" }
            },
            IsOutOfPolicy = true
        },
        new PlanningTrips
        {
            TripId = 4,
            DriverId = 104,
            Status = 0,
            StatusName = "Pending",
            VehicleName = "SUV",
            FromDate = DateTime.Now.AddDays(5),
            ToDate = DateTime.Now.AddDays(6),
            IsFavorite = false,
            ExternalService = new ExternalService
            {
                id = 204,
                name = "Global Transport",
                code = "GT",
                comment = "High priority service",
                interval_cancelling_hours = 6,
                time_stamp = DateTime.Now
            },
            MainPassenger = new List<Passenger>
            {
                new Passenger { PassengerId = 4, FirstName = "Chris", LastName = "Evans" }
            },
        }
    }
                   
                };
                return Json(result.Result);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetTrips(DateTime? dateValue, string beneficiaryValue, string fromValue, string toValue, string flightInfoValue, string? statusValue, Boolean isMyAllTrips = false, Boolean isMyFutureTrips = true, Boolean isDelegatedTrips = false, int pageSize = 20, int pageNumber = 1)
        {
            try
            {
                GetTripsRequestBody getTripsRequestBody = new GetTripsRequestBody()
                {
                    Date = dateValue,
                    FromLocation = fromValue,
                    ToLocation = toValue,
                    Beneficiary = beneficiaryValue,
                    FlightInformation = flightInfoValue,
                    Status = statusValue,
                    IsMyAllTrips = isMyAllTrips,
                    IsMyFutureTrips = isMyFutureTrips,
                    IsDelegatedTrips = isDelegatedTrips
                };
                var userId = int.Parse(HttpContext.Session.GetString("UserId"));

                /*
                                var result = await downstreamApi.CallApiForUserAsync<GetTripsRequestBody, ApiResponse<List<Trips>>>(
                                ServiceName,
                                getTripsRequestBody,
                                options =>
                                {
                                    options.HttpMethod = HttpMethod.Get.Method;
                                    options.RelativePath = $"api/v1/user/{userId}/trips?pageNumber={pageNumber}&pageSize={pageSize}";
                                });*/
                var result = new ApiResponse<List<PlanningTrips>>();

                return Json(result.Result);
            }
            catch (Exception ex)
            {
                return Json(null);
            }

        }

        [HttpGet]
        public async Task<IActionResult> OutOfPolicyTrips(DateTime dateFrom, DateTime dateTo, bool isOutOfPolicy)
        {
            try
            {
                string dateFromString = dateFrom.ToString("MM/dd/yyyy HH:mm:ss");
                string dateToString = dateTo.ToString("MM/dd/yyyy HH:mm:ss");
                /*var result = await downstreamApi.CallApiForUserAsync<ApiResponse<List<PlanningTrips>>>(
                      ServiceName,
                      options =>
                      {
                          options.HttpMethod = HttpMethod.Get.Method;
                          options.RelativePath = $"api/v1/user/planning?dateFrom={dateFromString}&dateTo={dateToString}&isOutOfPolicy={isOutOfPolicy}";
                      });*/
                var result = new ApiResponse<List<PlanningTrips>>
                {
                    Result = new List<PlanningTrips>
    {
        new PlanningTrips
        {
            TripId = 1,
            DriverId = 101,
            ExternalServiceId = 1,
            Status = 1,
            StatusName = "Scheduled",
            VehicleName = "Van",
            FlightType = 1,
            IsMailSent = true,
            IsFavorite = false,
            FromDate = DateTime.Now.AddDays(1),
            ToDate = DateTime.Now.AddDays(2),
            FlightNumber = "AA1234",
            OtherCostCenter = "Sales",
            FlightDateTime = DateTime.Now.AddDays(1).AddHours(3),
            TripSteps = new List<TripStep>
            {
                new TripStep
                {
                    TripStepId = 1001,
                    TripFromDate = DateTime.Now.AddDays(1),
                    TripToDate = DateTime.Now.AddDays(2),
                    FromLocation = new Location { LocationName = "New York" },
                    ToLocation = new Location { LocationName = "Boston" },
                    Mail = "Yes",
                    Comment = "First leg of the trip",
                    Passengers = new List<Passengers>
                    {
                        new Passengers { PassengerId = 1, FirstName = "John", LastName = "Doe", MobilePhone = "123-456-7890" }
                    }
                }
            },
           // RequestedUser = new User { UserId = 501, Name = "Alice Smith" },
            MainPassenger = new List<Passenger>
            {
                new Passenger { PassengerId = 2, FirstName = "Jane", LastName = "Doe", MobilePhone = "987-654-3210" }
            },
            CostCenterId = 301,
            IsConfidential = false,
            IsOutOfPolicy = false,
            ExternalService = new ExternalService
            {
                id = 201,
                name = "ABC Transport",
                code = "ABC",
                contact_lastname = "Brown",
                contact_firstname = "Michael",
                contact_email = "michael.brown@abc.com",
                contact_phone = "555-1234",
                unassigned_warning_hours = 24,
                unconfirmed_warning_hours = 48,
                webservice_url = "https://api.abc.com",
                modified_by = "system",
                time_stamp = DateTime.Now
            },
            //PaymentMode = new PaymentMode { Mode = "Credit Card" },
            ModifiedBy = "Admin"
        },
        new PlanningTrips
        {
            TripId = 2,
            DriverId = 102,
            ExternalServiceId = 2,
            Status = 2,
            StatusName = "In Progress",
            VehicleName = "Sedan",
            FlightType = 2,
            IsMailSent = false,
            FromDate = DateTime.Now,
            ToDate = DateTime.Now.AddHours(8),
            FlightNumber = "DL5678",
            TripSteps = new List<TripStep>
            {
                new TripStep
                {
                    TripStepId = 1002,
                    TripFromDate = DateTime.Now,
                    TripToDate = DateTime.Now.AddHours(4),
                    FromLocation = new Location { LocationName = "San Francisco",LocationId=1 },
                    ToLocation = new Location { LocationName = "Los Angeles",LocationId=2 },
                    Mail = "No",
                    Comment = "Second leg of the trip"
                }
            },
            //RequestedUser = new User { UserId = 502, Name = "Bob Johnson" },
            MainPassenger = new List<Passenger>
            {
                new Passenger { PassengerId = 3, FirstName = "Emma", LastName = "Stone", MobilePhone = "222-333-4444" }
            },
            ExternalService = new ExternalService
            {
                id = 3,
                name = "XYZ Logistics",
                code = "XYZ",
                contact_firstname = "Sarah",
                contact_lastname = "Connor",
                contact_email = "sarah.connor@xyz.com",
                unassigned_warning_hours = 12,
                modified_by = "user",
                time_stamp = DateTime.Now
            },
            //PaymentMode = new PaymentMode { Mode = "Cash" }
        },
        new PlanningTrips
        {
            TripId = 3,
            DriverId = 103,
            Status = 3,
            StatusName = "Completed",
            VehicleName = "Bus",
            FromDate = DateTime.Now.AddDays(-1),
            ToDate = DateTime.Now,
            IsMailSent = true,
            IsFavorite = true,
            MainPassenger = new List<Passenger>
            {
                new Passenger { PassengerId = 4, FirstName = "Chris", LastName = "Evans" }
            },
            IsOutOfPolicy = true
        },
        new PlanningTrips
        {
            TripId = 4,
            DriverId = 104,
            Status = 0,
            StatusName = "Pending",
            VehicleName = "SUV",
            FromDate = DateTime.Now.AddDays(5),
            ToDate = DateTime.Now.AddDays(6),
            IsFavorite = false,
            ExternalService = new ExternalService
            {
                id = 204,
                name = "Global Transport",
                code = "GT",
                comment = "High priority service",
                interval_cancelling_hours = 6,
                time_stamp = DateTime.Now
            },
            MainPassenger = new List<Passenger>
            {
                new Passenger { PassengerId = 4, FirstName = "Chris", LastName = "Evans" }
            },
        }
    }
                   
                };

                return Json(result.Result);
            }

            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        /*[HttpGet]
        public async Task<IActionResult> outOfPolicy(int ServiceId)
        {
            var userId = int.Parse(HttpContext.Session.GetString("UserId"));
            try
            {
                var result = await downstreamApi.CallApiForUserAsync<ApiResponse<List<OutOfPolicy>>>(
                ServiceName,
                options =>
                {
                    options.HttpMethod = HttpMethod.Get.Method;
                    options.RelativePath = $"api/v1/user/outofpolicy?userId={userId}&ServiceId={ServiceId}";
                });

                return Json(result.Result);
            }
            catch (Exception ex)
            {
                return Json(null);
            }

        }*/

        /*[HttpGet]
        public async Task<IActionResult> keyvault()
        {
            try
            {
                var result = await downstreamApi.CallApiForUserAsync<ApiResponse<string>>(
                ServiceName,
                options =>
                {
                    options.HttpMethod = HttpMethod.Get.Method;
                    options.RelativePath = $"api/v1/user/keyvault";
                });
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }

        }*/

        /*  [HttpDelete]
          public async Task<IActionResult> DeleteTrip(int tripId, int status)
          {
              try
              {
                  var modifiedBy = HttpContext.Session.GetString("UserLoginName");

                  var tripBody = new PlanningTripUpdate { Id = tripId, Status = status, ModifiedBy = modifiedBy };

                  var result = await downstreamApi.CallApiForUserAsync<PlanningTripUpdate, ApiResponse<PlanningTripUpdate>>(
                  ServiceName,
                  tripBody,
                  options =>
                  {
                      options.HttpMethod = HttpMethod.Put.Method;
                      options.RelativePath = $"api/v1/user/trips/updatePlannedtrip";
                  });

                  return Json(result.Result);
              }
              catch (Exception ex)
              {
                  return Json(null);
              }

          }*/

        [HttpGet]
        public IActionResult Trip(string type, string? tripId, string? isCompleted)
        {

            var value = DecodeValue(type);
            ViewBag.Type = value;

            if (tripId != null)
            {
                var result = DecodeValue(tripId);
                ViewBag.TripId = result;
            }
            if (isCompleted != null)
            {
                var isCompletedValue = DecodeValue(isCompleted);
                ViewBag.IsCompleted = isCompletedValue;
            }

            

            return View();
        }

      /*  [HttpGet]
        public async Task<IActionResult> GetPredefinedTrips()
        {
            try
            {
                var userId = int.Parse(HttpContext.Session.GetString("UserId"));

                var result = await downstreamApi.CallApiForUserAsync<ApiResponse<List<PredefinedTrip>>>(
                ServiceName,
                options =>
                {
                    options.HttpMethod = HttpMethod.Get.Method;
                    options.RelativePath = $"api/v1/user/{userId}/predefinedTrips";
                });

                return Json(result.Result);
            }
            catch (Exception ex)
            {
                return Json(null);
            }

        }*/

       /* [HttpGet]
        public async Task<IActionResult> TripReview(int tripId)
        {
            try 
            {
                var result = await downstreamApi.GetForUserAsync<Trips>(ServiceName, options => options.RelativePath = $"api/v1/user/trips/getTrip?tripId={tripId}");
                return Json(result);
            }
            catch(Exception ex)
            {
                throw;
            }


        }*/

        
       /* [HttpPut]
        public async Task<IActionResult> TripInfo(string trip)
        {
            try
            {
                if (trip != null)
                {
                    TripRequest tripBody = JsonConvert.DeserializeObject<TripRequest>(trip);

                    tripBody.ModifiedBy = HttpContext.Session.GetString("UserLoginName");

                    var result = await downstreamApi.CallApiForUserAsync<TripRequest, ApiResponse<TripRequest>>(
                    ServiceName,
                    tripBody,
                    options =>
                    {
                        options.HttpMethod = HttpMethod.Put.Method;
                        options.RelativePath = $"api/v1/user/trip";
                    });

                    return Json(result.Result);
                }
                return Json(null);
            }
            catch (Exception ex)
            {
                throw;
            }
        }*/

      /*  [HttpPut]
        public async Task<IActionResult> TripStep(string trip, int tripId)
        {
            try
            {
                if (trip != null)
                {
                    TripStepRequest tripBody = JsonConvert.DeserializeObject<TripStepRequest>(trip);

                    tripBody.ModifiedBy = HttpContext.Session.GetString("UserLoginName");

                    var result = await downstreamApi.CallApiForUserAsync<TripStepRequest, ApiResponse<TripStepRequest>>(
                    ServiceName,
                    tripBody,
                    options =>
                    {
                        options.HttpMethod = HttpMethod.Post.Method;
                        options.RelativePath = $"api/v1/user/{tripId}/tripStep";
                    });

                    return Json(result.Result);
                }
                return Json(null);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }

        [HttpPut]
        public async Task<IActionResult> TripPayment(string trip)
        {
            try
            {
                if (trip != null)
                {
                    TripRequest tripBody = JsonConvert.DeserializeObject<TripRequest>(trip);
                    tripBody.ModifiedBy = HttpContext.Session.GetString("UserLoginName");

                    var result = await downstreamApi.CallApiForUserAsync<TripRequest, ApiResponse<bool>>(
                    ServiceName,
                    tripBody,
                    options =>
                    {
                        options.HttpMethod = HttpMethod.Put.Method;
                        options.RelativePath = $"api/v1/user/tripPayment";
                    });

                    return Json(result.Result);
                }
                return Json(null);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }*/

        /*[HttpGet]
        public async Task<IActionResult> GetTripData(int tripId)
        {
            try
            {
                var result = await downstreamApi.CallApiForUserAsync<ApiResponse<TripRequest>>(
                ServiceName,
                options =>
                {
                    options.HttpMethod = HttpMethod.Get.Method;
                    options.RelativePath = $"api/v1/user/tripData?tripId={tripId}";
                });

                return Json(result.Result);
            }
            catch (Exception ex)
            {
                return Json(null);
            }

        }*/

      /*  [HttpGet]
        public async Task<IActionResult> CostCenterCodes()
        {           
            try
            {
                var result = await downstreamApi.CallApiForUserAsync<ApiResponse<List<CostCenter>>>(
                ServiceName,
                options =>
                {
                    options.HttpMethod = HttpMethod.Get.Method;
                    options.RelativePath = $"api/v1/user/costCenters";
                });

                return Json(result.Result);
            }
            catch (Exception ex)
            {
                return Json(null);
            }

        }
        
        [HttpGet]
        public async Task<IActionResult> GetMyDelegators()
        {           
            try
            {
                var userId = int.Parse(HttpContext.Session.GetString("UserId"));
                var userName = HttpContext.Session.GetString("UserLoginName");

                var result = await downstreamApi.CallApiForUserAsync<ApiResponse<List<User>>>(
                ServiceName,
                options =>
                {
                    options.HttpMethod = HttpMethod.Get.Method;
                    options.RelativePath = $"api/v1/user/myDelegators?userId={userId}";
                });

                var delegators = result.Result;

                User currentUser = new User
                {
                    UserId = userId,
                    UserName = userName
                };

                delegators.Add(currentUser);

                return Json(delegators);
            }
            catch (Exception ex)
            {
                return Json(null);
            }

        }*/


        [HttpGet]
        public IActionResult ManagerDashboard()
        {
            if (HttpContext.Session.GetString("UserType") == "Client")
            {
                return RedirectToAction("Index", "");
            }
            return View();
        }


        public IActionResult NotImplemented()
        {
            return View();
        }

        private int DecodeValue(string val)
        {
            var base64DecodedBytes = Convert.FromBase64String(val);
            var decodedValue = Encoding.UTF8.GetString(base64DecodedBytes);

            // Perform XOR operation to get the original integer value
            var key = 619; // Replace with your secret key
            var originalValue = "";
            for (var i = 0; i < decodedValue.Length; i++)
            {
                originalValue += (char)(decodedValue[i] ^ key);
            }
            return int.Parse(originalValue);
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePlannedTrip(int tripId,int status,int languageId,int? externalServiceId,int? driverId )
        {
            string modifiedBy = HttpContext.Session.GetString("UserLoginName");
            var userId= int.Parse(HttpContext.Session.GetString("UserId"));
            //
            //var userlink =await GetUserLinkByID(userId);
           var language=localization.Getkey("Lan");
            if (language.Value == "En")
            {
                languageId = 0;
            }
            else
            {
                languageId = 1;
            }
            //languageId = int.Parse(HttpContext.Session.GetString("LanguageId"));
            var tripBody = new PlanningTripUpdate { Id = tripId, UserId=userId,LanguageId=languageId,Status = status ,ExternalServiceId = externalServiceId ,DriverId = driverId , ModifiedBy=modifiedBy};
            try
            {
                /*  var result = await downstreamApi.CallApiForUserAsync<PlanningTripUpdate, ApiResponse<PlanningTripUpdate>>(
                  ServiceName,
                  tripBody,
                  options =>
                  {
                      options.HttpMethod = HttpMethod.Put.Method;
                      options.RelativePath = $"api/v1/user/trips/updatePlannedtrip";
                  });*/
                var result = new ApiResponse<PlanningTripUpdate>();

                return Json(result.Result);
               
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
/*
        [HttpPost]
        public async Task<IActionResult> AddFilesToTrip( List<IFormFile> fileList, int tripId)
        {
            try
            {
                List<BlobFile> inputFiles = new List<BlobFile>();

                foreach (IFormFile requestFile in fileList)
                {
                    var memoryStream = new MemoryStream();
                    await requestFile.CopyToAsync(memoryStream);
                    var file = memoryStream.ToArray();

                    BlobFile inputFile = new BlobFile()
                    {
                        FileName = requestFile.FileName,
                        Data = file
                    };

                    inputFiles.Add(inputFile);
                }

                var result = await downstreamApi.CallApiForUserAsync<List<BlobFile>, ApiResponse<List<BlobFile>>>(
                ServiceName,
                inputFiles,
                options =>
                {
                    options.HttpMethod = HttpMethod.Post.Method;
                    options.RelativePath = $"api/v1/user/tripFiles?tripId={tripId}";
                });


                return Json(result.Result);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteFilesOfTrip(int fileId, string blobName)
        {
            try
            {
                DeleteTripFileRequest request = new DeleteTripFileRequest()
                {
                    FileId = fileId,
                    BlobName = blobName
                };

                var result = await downstreamApi.CallApiForUserAsync<DeleteTripFileRequest, ApiResponse<bool>>(
                ServiceName,
                request,
                options =>
                {
                    options.HttpMethod = HttpMethod.Delete.Method;
                    options.RelativePath = $"api/v1/user/tripFiles";
                });


                return Json(result.Result);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetFilesOfTrip(int tripId)
        {
            try
            {
                var result = await downstreamApi.CallApiForUserAsync<ApiResponse<List<BlobFile>>>(
                ServiceName,
                options =>
                {
                    options.HttpMethod = HttpMethod.Get.Method;
                    options.RelativePath = $"api/v1/user/tripFiles?tripId={tripId}";
                });

                return Json(result.Result);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetTripDuration(int originLocationId, int destinationLocationId, DateTime startDateTime)
        {
            try
            {
                TravelDurationRequestBody travelDurationRequestBody = new TravelDurationRequestBody()
                {
                    OriginLocationId = originLocationId,
                    DestinationLocationId = destinationLocationId,
                    StartTime = startDateTime
                };

                var result = await downstreamApi.CallApiForUserAsync<TravelDurationRequestBody, ApiResponse<TravelDetails>>(
                ServiceName,
                travelDurationRequestBody,
                options =>
                {
                    options.HttpMethod = HttpMethod.Get.Method;
                    options.RelativePath = $"api/v1/travelduration";
                });

                return Json(result.Result);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
*/
    }
}
