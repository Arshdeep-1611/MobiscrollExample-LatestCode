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
            var today = DateTime.Today;
            try
            {


                // Sample data response with 10 DriverEvent records
                var result = new ApiResponse<List<DriverEvent>>()
                {
                    Success = true,
                    Result =  new List<DriverEvent>
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
                            DateFrom = today.AddHours(8),
                            DateTo = today.AddHours(12),
                            Duration = DateTime.MinValue.Add(new TimeSpan(4, 0, 0)),
                            Amount = 50,
                            AcceptationDate = today.AddHours(9.5),
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
                            DateFrom = today.AddHours(9),
                            DateTo = today.AddHours(12),
                            Duration = DateTime.MinValue.Add(new TimeSpan(3, 0, 0)),
                            Amount = 60,
                            AcceptationDate = today.AddHours(10),
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
                            DateFrom = today.AddHours(14),
                            DateTo = today.AddHours(15),
                            Duration = DateTime.MinValue.Add(new TimeSpan(1, 0, 0)),
                            Amount = 10,
                            AcceptationDate = today.AddHours(14.5),
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
                            DateFrom = today.AddHours(16),
                            DateTo = today.AddHours(17.5),
                            Duration = DateTime.MinValue.Add(new TimeSpan(1, 30, 0)),
                            Amount = 40,
                            AcceptationDate = today.AddHours(16.5),
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
                            DateFrom = today.AddHours(20),
                            DateTo = today.AddHours(21),
                            Duration = DateTime.MinValue.Add(new TimeSpan(1, 0, 0)),
                            Amount = 15,
                            AcceptationDate = today.AddHours(20.25),
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
                            DateFrom = today.AddHours(18),
                            DateTo = today.AddHours(19),
                            Duration = DateTime.MinValue.Add(new TimeSpan(1, 0, 0)),
                            Amount = 100,
                            AcceptationDate = today.AddHours(18.25),
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
                            DateFrom = today.AddHours(10),
                            DateTo = today.AddHours(12),
                            Duration = DateTime.MinValue.Add(new TimeSpan(2, 0, 0)),
                            Amount = 30,
                            AcceptationDate = today.AddHours(10.5),
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
                            DateFrom = today.AddHours(13),
                            DateTo = today.AddHours(15),
                            Duration = DateTime.MinValue.Add(new TimeSpan(2, 0, 0)),
                            Amount = 80,
                            AcceptationDate = today.AddHours(13.5),
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
                            DateFrom = today.AddHours(15),
                            DateTo = today.AddHours(16),
                            Duration = DateTime.MinValue.Add(new TimeSpan(1, 0, 0)),
                            Amount = 120,
                            AcceptationDate = today.AddHours(15.25),
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
                            DateFrom = today.AddHours(17),
                            DateTo = today.AddHours(19),
                            Duration = DateTime.MinValue.Add(new TimeSpan(2, 0, 0)),
                            Amount = 45,
                            AcceptationDate = today.AddHours(17.5),
                            RejectionDate = null,
                            Comment = "Preparing delivery",
                            ValidationComment = "Prep approved",
                            ModifiedBy = "Admin"
                        },
                        new DriverEvent
    {
        Id = 11,
        EventName = "Night Shift",
        ExternalService = 2,
        DriverId = 8,
        Color = "#00008b",
        Level = 2,
        DriverName = "Diana Prince",
        Code = "NightShift",
        TripId = 111,
        EventKindId = 2,
        DateFrom = today.AddHours(22),
        DateTo = today.AddHours(6).AddDays(1), // next day
        Duration = DateTime.MinValue.Add(new TimeSpan(8, 0, 0)),
        Amount = 90,
        AcceptationDate = today.AddHours(22.5),
        RejectionDate = null,
        Comment = "Overnight shift",
        ValidationComment = "Night shift approved",
        ModifiedBy = "Manager"
    },
                        new DriverEvent
                        {
                            Id = 12,
                            EventName = "Training Session",
                            ExternalService = 3,
                            DriverId = 9,
                            Color = "#1e90ff",
                            Level = 1,
                            DriverName = "Steve Rogers",
                            Code = "Training",
                            TripId = 112,
                            EventKindId = 1,
                            DateFrom = today.AddHours(9),
                            DateTo = today.AddHours(11),
                            Duration = DateTime.MinValue.Add(new TimeSpan(2, 0, 0)),
                            Amount = 25,
                            AcceptationDate = today.AddHours(9.5),
                            RejectionDate = null,
                            Comment = "Driver training",
                            ValidationComment = "Training approved",
                            ModifiedBy = "HR"
                        },
                        new DriverEvent
                        {
                            Id = 13,
                            EventName = "Vehicle Inspection",
                            ExternalService = 1,
                            DriverId = 10,
                            Color = "#ffa07a",
                            Level = 2,
                            DriverName = "Barry Allen",
                            Code = "Inspect",
                            TripId = 113,
                            EventKindId = 3,
                            DateFrom = today.AddHours(8),
                            DateTo = today.AddHours(9),
                            Duration = DateTime.MinValue.Add(new TimeSpan(1, 0, 0)),
                            Amount = 20,
                            AcceptationDate = today.AddHours(8.25),
                            RejectionDate = null,
                            Comment = "Vehicle check",
                            ValidationComment = "Inspection completed",
                            ModifiedBy = "Supervisor"
                        },
                        new DriverEvent
                        {
                            Id = 14,
                            EventName = "Package Pickup",
                            ExternalService = 4,
                            DriverId = 11,
                            Color = "#deb887",
                            Level = 1,
                            DriverName = "Wanda Maximoff",
                            Code = "Pickup",
                            TripId = 114,
                            EventKindId = 1,
                            DateFrom = today.AddHours(11),
                            DateTo = today.AddHours(13),
                            Duration = DateTime.MinValue.Add(new TimeSpan(2, 0, 0)),
                            Amount = 35,
                            AcceptationDate = today.AddHours(11.5),
                            RejectionDate = null,
                            Comment = "Picked up priority package",
                            ValidationComment = "Pickup confirmed",
                            ModifiedBy = "Dispatcher"
                        },
                        new DriverEvent
                        {
                            Id = 15,
                            EventName = "Medical Check",
                            ExternalService = 1,
                            DriverId = 12,
                            Color = "#98fb98",
                            Level = 2,
                            DriverName = "Bruce Banner",
                            Code = "Medical",
                            TripId = 115,
                            EventKindId = 2,
                            DateFrom = today.AddHours(10),
                            DateTo = today.AddHours(11),
                            Duration = DateTime.MinValue.Add(new TimeSpan(1, 0, 0)),
                            Amount = 30,
                            AcceptationDate = today.AddHours(10.25),
                            RejectionDate = null,
                            Comment = "Routine checkup",
                            ValidationComment = "Medical visit approved",
                            ModifiedBy = "HR"
                        },
                        new DriverEvent
                        {
                            Id = 16,
                            EventName = "Fuel Stop",
                            ExternalService = 3,
                            DriverId = 13,
                            Color = "#7fffd4",
                            Level = 1,
                            DriverName = "Scott Lang",
                            Code = "Fuel",
                            TripId = 116,
                            EventKindId = 3,
                            DateFrom = today.AddHours(15),
                            DateTo = today.AddHours(15.5),
                            Duration = DateTime.MinValue.Add(new TimeSpan(0, 30, 0)),
                            Amount = 10,
                            AcceptationDate = today.AddHours(15.25),
                            RejectionDate = null,
                            Comment = "Quick fuel stop",
                            ValidationComment = "Fuel stop logged",
                            ModifiedBy = "Admin"
                        },
                        new DriverEvent
                        {
                            Id = 17,
                            EventName = "Documentation",
                            ExternalService = 2,
                            DriverId = 14,
                            Color = "#ffe4b5",
                            Level = 2,
                            DriverName = "Sam Wilson",
                            Code = "Docs",
                            TripId = 117,
                            EventKindId = 2,
                            DateFrom = today.AddHours(13),
                            DateTo = today.AddHours(14),
                            Duration = DateTime.MinValue.Add(new TimeSpan(1, 0, 0)),
                            Amount = 18,
                            AcceptationDate = today.AddHours(13.5),
                            RejectionDate = null,
                            Comment = "Paperwork submission",
                            ValidationComment = "Docs submitted",
                            ModifiedBy = "Coordinator"
                        },
                        new DriverEvent
                        {
                            Id = 18,
                            EventName = "Route Planning",
                            ExternalService = 4,
                            DriverId = 15,
                            Color = "#bc8f8f",
                            Level = 3,
                            DriverName = "Nick Fury",
                            Code = "Route",
                            TripId = 118,
                            EventKindId = 3,
                            DateFrom = today.AddHours(12),
                            DateTo = today.AddHours(13),
                            Duration = DateTime.MinValue.Add(new TimeSpan(1, 0, 0)),
                            Amount = 22,
                            AcceptationDate = today.AddHours(12.5),
                            RejectionDate = null,
                            Comment = "Plan new delivery route",
                            ValidationComment = "Route planned",
                            ModifiedBy = "Logistics"
                        },
                        new DriverEvent
                        {
                            Id = 19,
                            EventName = "System Downtime",
                            ExternalService = 5,
                            DriverId = 16,
                            Color = "#ffc0cb",
                            Level = 2,
                            DriverName = "Carol Danvers",
                            Code = "Downtime",
                            TripId = 119,
                            EventKindId = 1,
                            DateFrom = today.AddHours(16),
                            DateTo = today.AddHours(17),
                            Duration = DateTime.MinValue.Add(new TimeSpan(1, 0, 0)),
                            Amount = 15,
                            AcceptationDate = today.AddHours(16.25),
                            RejectionDate = null,
                            Comment = "System offline",
                            ValidationComment = "Downtime recorded",
                            ModifiedBy = "Tech Lead"
                        },
                        new DriverEvent
                        {
                            Id = 20,
                            EventName = "Onboarding",
                            ExternalService = 1,
                            DriverId = 17,
                            Color = "#ffdab9",
                            Level = 1,
                            DriverName = "Kate Bishop",
                            Code = "Onboard",
                            TripId = 120,
                            EventKindId = 2,
                            DateFrom = today.AddHours(10),
                            DateTo = today.AddHours(12),
                            Duration = DateTime.MinValue.Add(new TimeSpan(2, 0, 0)),
                            Amount = 40,
                            AcceptationDate = today.AddHours(10.75),
                            RejectionDate = null,
                            Comment = "New hire onboarding",
                            ValidationComment = "Onboarding completed",
                            ModifiedBy = "HR"
                        },
                        new DriverEvent
    {
        Id = 101,
        EventName = "Trip Cancellation Review",
        ExternalService = 101,
        DriverId = 1,
        Color = "#ff6961",
        Level = 1,
        DriverName = "Driver One",
        Code = "CAN",
        TripId = 104,
        EventKindId = 10,
        DateFrom = today.AddHours(5),
        DateTo = today.AddHours(6),
        Duration = DateTime.MinValue.AddHours(1),
        Amount = 0,
        AcceptationDate = today.AddHours(5.5),
        RejectionDate = null,
        Comment = "Driver requested cancellation.",
        ValidationComment = "Cancelled due to internal issue.",
        ModifiedBy = "System"
    },
    new DriverEvent
    {
        Id = 101,
        EventName = "Trip Cancellation Review",
        ExternalService = 101,
        DriverId = 1,
        Color = "#ff6961",
        Level = 1,
        DriverName = "Driver One",
        Code = "CAN",
        TripId = 104,
        EventKindId = 3, // Congé
        DateFrom = today.AddHours(5),
        DateTo = today.AddHours(6),
        Duration = DateTime.MinValue.AddHours(1),
        Amount = 0,
        AcceptationDate = today.AddHours(5.5),
        RejectionDate = null,
        Comment = "Driver requested cancellation.",
        ValidationComment = "Cancelled due to internal issue.",
        ModifiedBy = "System"
    },
    new DriverEvent
    {
        Id = 102,
        EventName = "Trip On Hold Discussion",
        ExternalService = 102,
        DriverId = 2,
        Color = "#fdfd96",
        Level = 2,
        DriverName = "Driver Two",
        Code = "HOLD",
        TripId = 105,
        EventKindId = 4, // Formation
        DateFrom = today.AddDays(4),
        DateTo = today.AddDays(4).AddHours(2),
        Duration = DateTime.MinValue.AddHours(2),
        Amount = 0,
        AcceptationDate = today.AddDays(4).AddHours(1),
        RejectionDate = null,
        Comment = "Trip temporarily on hold",
        ValidationComment = "Awaiting client confirmation",
        ModifiedBy = "Admin"
    },
    new DriverEvent
    {
        Id = 103,
        EventName = "Weather Check",
        ExternalService = 103,
        DriverId = 3,
        Color = "#87ceeb",
        Level = 1,
        DriverName = "Driver Three",
        Code = "WEA",
        TripId = 106,
        EventKindId = 1, // Planifié
        DateFrom = today.AddDays(-2),
        DateTo = today.AddDays(-2).AddHours(3),
        Duration = DateTime.MinValue.AddHours(3),
        Amount = 0,
        AcceptationDate = today.AddDays(-2).AddHours(1),
        RejectionDate = null,
        Comment = "Monitoring for storm impact.",
        ValidationComment = "Cancelled due to severe weather.",
        ModifiedBy = "Dispatcher"
    },
    new DriverEvent
    {
        Id = 104,
        EventName = "Vehicle Prep",
        ExternalService = 104,
        DriverId = 4,
        Color = "#dda0dd",
        Level = 2,
        DriverName = "Driver Four",
        Code = "Prep",
        TripId = 107,
        EventKindId = 2, // Heures supplémentaires
        DateFrom = today.AddDays(6).AddHours(1),
        DateTo = today.AddDays(6).AddHours(3),
        Duration = DateTime.MinValue.AddHours(2),
        Amount = 35,
        AcceptationDate = today.AddDays(6).AddHours(2),
        RejectionDate = null,
        Comment = "Preparing SUV for trip",
        ValidationComment = "Vehicle confirmed",
        ModifiedBy = "Ops"
    },
    new DriverEvent
    {
        Id = 105,
        EventName = "Client Cancellation",
        ExternalService = 105,
        DriverId = 5,
        Color = "#ffcccb",
        Level = 1,
        DriverName = "Driver Five",
        Code = "CLI_CAN",
        TripId = 108,
        EventKindId = 3, // Congé
        DateFrom = today,
        DateTo = today.AddHours(1),
        Duration = DateTime.MinValue.AddHours(1),
        Amount = 0,
        AcceptationDate = today.AddMinutes(45),
        RejectionDate = null,
        Comment = "Passenger cancelled last minute.",
        ValidationComment = "Fee waived",
        ModifiedBy = "Support"
    },
    new DriverEvent
    {
        Id = 106,
        EventName = "Medical Hold Review",
        ExternalService = 106,
        DriverId = 1,
        Color = "#add8e6",
        Level = 2,
        DriverName = "Driver One",
        Code = "MED_HOLD",
        TripId = 109,
        EventKindId = 1, // Planifié
        DateFrom = today.AddHours(2),
        DateTo = today.AddHours(3),
        Duration = DateTime.MinValue.AddHours(1),
        Amount = 0,
        AcceptationDate = today.AddHours(2.5),
        RejectionDate = null,
        Comment = "Health clearance pending.",
        ValidationComment = "Doctor's approval awaited.",
        ModifiedBy = "Admin"
    },
    new DriverEvent
    {
        Id = 107,
        EventName = "Engine Check",
        ExternalService = 107,
        DriverId = 2,
        Color = "#ffb347",
        Level = 3,
        DriverName = "Driver Two",
        Code = "ENGCHK",
        TripId = 110,
        EventKindId = 5, // Urgence
        DateFrom = today.AddHours(4),
        DateTo = today.AddHours(6),
        Duration = DateTime.MinValue.AddHours(2),
        Amount = 0,
        AcceptationDate = today.AddHours(5),
        RejectionDate = null,
        Comment = "Trip postponed for engine diagnostics.",
        ValidationComment = "Trip cancelled after failed check.",
        ModifiedBy = "System"
    },
    new DriverEvent
    {
        Id = 108,
        EventName = "Air Traffic Hold",
        ExternalService = 108,
        DriverId = 3,
        Color = "#f08080",
        Level = 1,
        DriverName = "Driver Three",
        Code = "AIR_HOLD",
        TripId = 111,
        EventKindId = 2, // Heures supplémentaires
        DateFrom = today.AddHours(1),
        DateTo = today.AddHours(3),
        Duration = DateTime.MinValue.AddHours(2),
        Amount = 0,
        AcceptationDate = today.AddHours(2),
        RejectionDate = null,
        Comment = "Airport operations delayed",
        ValidationComment = "Pilot notified",
        ModifiedBy = "ATC"
    },
    new DriverEvent
    {
        Id = 109,
        EventName = "No Show Follow-up",
        ExternalService = 109,
        DriverId = 4,
        Color = "#ffc0cb",
        Level = 2,
        DriverName = "Driver Four",
        Code = "NSHOW",
        TripId = 112,
        EventKindId = 4, // Formation
        DateFrom = today.AddDays(-5),
        DateTo = today.AddDays(-5).AddHours(1),
        Duration = DateTime.MinValue.AddHours(1),
        Amount = 0,
        AcceptationDate = today.AddDays(-5).AddMinutes(45),
        RejectionDate = null,
        Comment = "Client did not show up.",
        ValidationComment = "Marked as cancelled.",
        ModifiedBy = "Dispatcher"
    },
    new DriverEvent
    {
        Id = 110,
        EventName = "Maintenance Hold",
        ExternalService = 110,
        DriverId = 5,
        Color = "#d3d3d3",
        Level = 3,
        DriverName = "Driver Five",
        Code = "MAINT",
        TripId = 113,
        EventKindId = 5, // Urgence
        DateFrom = today.AddDays(-3),
        DateTo = today.AddDays(-3).AddHours(2),
        Duration = DateTime.MinValue.AddHours(2),
        Amount = 0,
        AcceptationDate = today.AddDays(-3).AddHours(1),
        RejectionDate = null,
        Comment = "Scooter in service.",
        ValidationComment = "Hold confirmed by maintenance",
        ModifiedBy = "Fleet Manager"
    },
     new DriverEvent
    {
        Id = 201,
        EventName = "Planned Work",
        ExternalService = 1,
        DriverId = 1,
        Color = "#888686", // EventKindId = 1
        Level = 1,
        DriverName = "Steve Rogers",
        Code = "Planifié",
        TripId = 101,
        EventKindId = 1,
        DateFrom = today.AddHours(8),
        DateTo = today.AddHours(12),
        //Duration = new TimeSpan(4, 0, 0),
        Amount = 0,
        AcceptationDate = today.AddHours(8.5),
        RejectionDate = null,
        Comment = "Planned trip time",
        ValidationComment = "Aligned with trip",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 202,
        EventName = "Overtime Work",
        ExternalService = 1,
        DriverId = 2,
        Color = "#ff6347", // EventKindId = 2
        Level = 2,
        DriverName = "Bruce Banner",
        Code = "Heures supplémentaires",
        TripId = 102,
        EventKindId = 2,
        DateFrom = today.AddHours(9),
        DateTo = today.AddHours(13),
        //Duration = new TimeSpan(4, 0, 0),
        Amount = 40,
        AcceptationDate = today.AddHours(9.5),
        RejectionDate = null,
        Comment = "Overtime trip support",
        ValidationComment = "Aligned with trip",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 203,
        EventName = "Vacation Coverage",
        ExternalService = 1,
        DriverId = 3,
        Color = "#ff8c00", // EventKindId = 3
        Level = 1,
        DriverName = "Tony Stark",
        Code = "Congé",
        TripId = 103,
        EventKindId = 3,
        DateFrom = today.AddHours(10),
        DateTo = today.AddHours(14),
        //Duration = new TimeSpan(4, 0, 0),
        Amount = 0,
        AcceptationDate = today.AddHours(10.5),
        RejectionDate = null,
        Comment = "Covers vacation shift",
        ValidationComment = "Aligned with trip",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 204,
        EventName = "Driver Training",
        ExternalService = 1,
        DriverId = 4,
        Color = "#4682b4", // EventKindId = 4
        Level = 2,
        DriverName = "Natasha Romanoff",
        Code = "Formation",
        TripId = 104,
        EventKindId = 4,
        DateFrom = today.AddHours(11),
        DateTo = today.AddHours(15),
        //Duration = new TimeSpan(4, 0, 0),
        Amount = 35,
        AcceptationDate = today.AddHours(11.5),
        RejectionDate = null,
        Comment = "Driver training trip",
        ValidationComment = "Aligned with trip",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 205,
        EventName = "Emergency Route",
        ExternalService = 1,
        DriverId = 5,
        Color = "#32cd32", // EventKindId = 5
        Level = 3,
        DriverName = "Clint Barton",
        Code = "Urgence",
        TripId = 105,
        EventKindId = 5,
        DateFrom = today.AddHours(12),
        DateTo = today.AddHours(16),
        //Duration = new TimeSpan(4, 0, 0),
        Amount = 90,
        AcceptationDate = today.AddHours(12.5),
        RejectionDate = null,
        Comment = "Emergency trip dispatch",
        ValidationComment = "Aligned with trip",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 301,
        EventName = "Planned Work",
        ExternalService = 1,
        DriverId = 1,
        Color = "#888686", // EventKindId = 1
        Level = 1,
        DriverName = "Steve Rogers",
        Code = "Planifié",
        TripId = 101,
        EventKindId = 1,
        DateFrom = today.AddHours(8),
        DateTo = today.AddHours(12),
        Amount = 0,
        AcceptationDate = today.AddHours(8.5),
        RejectionDate = null,
        Comment = "Planned shift for Steve",
        ValidationComment = "Valid",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 302,
        EventName = "Overtime",
        ExternalService = 1,
        DriverId = 2,
        Color = "#ff6347", // EventKindId = 2
        Level = 2,
        DriverName = "Bruce Banner",
        Code = "Heures supplémentaires",
        TripId = 102,
        EventKindId = 2,
        DateFrom = today.AddHours(9),
        DateTo = today.AddHours(13),
        Amount = 30,
        AcceptationDate = today.AddHours(9.5),
        RejectionDate = null,
        Comment = "Extra hours logged",
        ValidationComment = "Approved",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 303,
        EventName = "Leave",
        ExternalService = 1,
        DriverId = 3,
        Color = "#ff8c00", // EventKindId = 3
        Level = 1,
        DriverName = "Tony Stark",
        Code = "Congé",
        TripId = 103,
        EventKindId = 3,
        DateFrom = today.AddHours(10),
        DateTo = today.AddHours(14),
        Amount = 0,
        AcceptationDate = today.AddHours(10.5),
        RejectionDate = null,
        Comment = "Vacation overlap",
        ValidationComment = "On leave",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 304,
        EventName = "Training",
        ExternalService = 1,
        DriverId = 4,
        Color = "#4682b4", // EventKindId = 4
        Level = 2,
        DriverName = "Natasha Romanoff",
        Code = "Formation",
        TripId = 104,
        EventKindId = 4,
        DateFrom = today.AddHours(11),
        DateTo = today.AddHours(15),
        Amount = 40,
        AcceptationDate = today.AddHours(11.5),
        RejectionDate = null,
        Comment = "Driver training",
        ValidationComment = "Confirmed",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 305,
        EventName = "Emergency",
        ExternalService = 1,
        DriverId = 5,
        Color = "#32cd32", // EventKindId = 5
        Level = 3,
        DriverName = "Clint Barton",
        Code = "Urgence",
        TripId = 105,
        EventKindId = 5,
        DateFrom = today.AddHours(12),
        DateTo = today.AddHours(16),
        Amount = 60,
        AcceptationDate = today.AddHours(12.5),
        RejectionDate = null,
        Comment = "Emergency dispatched",
        ValidationComment = "Urgent",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 306,
        EventName = "Planned Work",
        ExternalService = 1,
        DriverId = 1,
        Color = "#8bd2fd",
        Level = 1,
        DriverName = "Steve Rogers",
        Code = "Planifié",
        TripId = 106,
        EventKindId = 1,
        DateFrom = today.AddHours(13),
        DateTo = today.AddHours(17),
        Amount = 0,
        AcceptationDate = today.AddHours(13.5),
        RejectionDate = null,
        Comment = "Second shift",
        ValidationComment = "Ok",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 307,
        EventName = "Overtime",
        ExternalService = 1,
        DriverId = 2,
        Color = "#32cd32",
        Level = 2,
        DriverName = "Bruce Banner",
        Code = "Heures supplémentaires",
        TripId = 107,
        EventKindId = 2,
        DateFrom = today.AddHours(14),
        DateTo = today.AddHours(18),
        Amount = 45,
        AcceptationDate = today.AddHours(14.5),
        RejectionDate = null,
        Comment = "Extended time",
        ValidationComment = "Valid",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 308,
        EventName = "Leave Time",
        ExternalService = 1,
        DriverId = 3,
        Color = "#ffd700",
        Level = 1,
        DriverName = "Tony Stark",
        Code = "Congé",
        TripId = 108,
        EventKindId = 3,
        DateFrom = today.AddHours(15),
        DateTo = today.AddHours(19),
        Amount = 0,
        AcceptationDate = today.AddHours(15.5),
        RejectionDate = null,
        Comment = "Extended vacation",
        ValidationComment = "Vacation approved",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 309,
        EventName = "Training Session",
        ExternalService = 1,
        DriverId = 4,
        Color = "#7fffd4",
        Level = 2,
        DriverName = "Natasha Romanoff",
        Code = "Formation",
        TripId = 109,
        EventKindId = 4,
        DateFrom = today.AddHours(16),
        DateTo = today.AddHours(20),
        Amount = 55,
        AcceptationDate = today.AddHours(16.5),
        RejectionDate = null,
        Comment = "Advanced driving module",
        ValidationComment = "Certified",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 310,
        EventName = "Urgent Dispatch",
        ExternalService = 1,
        DriverId = 5,
        Color = "#98fb98",
        Level = 3,
        DriverName = "Clint Barton",
        Code = "Urgence",
        TripId = 110,
        EventKindId = 5,
        DateFrom = today.AddHours(17),
        DateTo = today.AddHours(21),
        Amount = 65,
        AcceptationDate = today.AddHours(17.5),
        RejectionDate = null,
        Comment = "Evening emergency",
        ValidationComment = "Handled on time",
        ModifiedBy = "admin"
    },
    new DriverEvent
    {
        Id = 21,
        EventName = "Future Training",
        ExternalService = 2,
        DriverId = 1,
        Color = "#4682b4",
        Level = 2,
        DriverName = "Tony Stark",
        Code = "Formation",
        TripId = 201,
        EventKindId = 4,
        DateFrom = today.AddDays(1).AddHours(8),
        DateTo = today.AddDays(1).AddHours(12),
        Amount = 75,
        AcceptationDate = today.AddDays(1).AddHours(9),
        RejectionDate = null,
        Comment = "Technical training",
        ValidationComment = "Approved",
        ModifiedBy = "Admin"
    },
    new DriverEvent
    {
        Id = 22,
        EventName = "Planned Work Tomorrow",
        ExternalService = 2,
        DriverId = 2,
        Color = "#888686",
        Level = 1,
        DriverName = "Bruce Wayne",
        Code = "Planifié",
        TripId = 202,
        EventKindId = 1,
        DateFrom = today.AddDays(1).AddHours(10),
        DateTo = today.AddDays(1).AddHours(14),
        Amount = 60,
        AcceptationDate = today.AddDays(1).AddHours(11),
        RejectionDate = null,
        Comment = "Planned trip tomorrow",
        ValidationComment = "Validated",
        ModifiedBy = "Admin"
    },
    new DriverEvent
    {
        Id = 23,
        EventName = "Overtime Shift",
        ExternalService = 3,
        DriverId = 3,
        Color = "#ff6347",
        Level = 2,
        DriverName = "Clark Kent",
        Code = "Heures supplémentaires",
        TripId = 203,
        EventKindId = 2,
        DateFrom = today.AddDays(2).AddHours(9),
        DateTo = today.AddDays(2).AddHours(13),
        Amount = 90,
        AcceptationDate = today.AddDays(2).AddHours(10),
        RejectionDate = null,
        Comment = "Extended delivery hours",
        ValidationComment = "Confirmed",
        ModifiedBy = "Admin"
    },
    new DriverEvent
    {
        Id = 24,
        EventName = "Emergency Transport",
        ExternalService = 3,
        DriverId = 4,
        Color = "#32cd32",
        Level = 3,
        DriverName = "Natasha Romanoff",
        Code = "Urgence",
        TripId = 204,
        EventKindId = 5,
        DateFrom = today.AddDays(2).AddHours(15),
        DateTo = today.AddDays(2).AddHours(18),
        Amount = 120,
        AcceptationDate = today.AddDays(2).AddHours(15.5),
        RejectionDate = null,
        Comment = "Urgent request from client",
        ValidationComment = "Handled",
        ModifiedBy = "Admin"
    },
    new DriverEvent
    {
        Id = 25,
        EventName = "Leave for Recovery",
        ExternalService = 4,
        DriverId = 5,
        Color = "#ff8c00",
        Level = 1,
        DriverName = "Steve Rogers",
        Code = "Congé",
        TripId = 205,
        EventKindId = 3,
        DateFrom = today.AddDays(1).AddHours(13),
        DateTo = today.AddDays(1).AddHours(17),
        Amount = 0,
        AcceptationDate = today.AddDays(1).AddHours(13.5),
        RejectionDate = null,
        Comment = "Approved leave post trip",
        ValidationComment = "Leave granted",
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
