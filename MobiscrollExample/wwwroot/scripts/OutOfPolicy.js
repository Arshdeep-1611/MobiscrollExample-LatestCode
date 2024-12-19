$(document).ready(function () {
    var outofpolicytrip = [];
    var enablePrint = true;

    var roles = jQuery("#rolesList").val();
   /* var checkRole = JSON.parse(roles);
    //console.log(checkRole);
    var access = checkRole.find(role => role.ToolId == 37);*/
   // console.log(access);
    var userType = $("#userType").val();
    /*if (access == undefined || access.IsEnabled == false) {
        enablePrint = false;
    }*/
    enablePrint = true;
    function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
    }
    //var ComparisonTrips = [];
    // Function to hide the overlay
    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }
    var languageobj = [];
    var convertedshortmonths = [];
    var convertedmonths = [];
    var CurrentWeek;
    var converteddayinitials = []
    var converteddays = [];
    var timer;
    /*var storedlanguage;
       sessionStorage.setItem('convertedshortmonths', convertedshortmonths);
       sessionStorage.setItem('converteddayinitials', converteddayinitials);
    var convertedshortmonths;
    var converteddays;
    var convertedmonths;
    var converteddayinitials;*/
    function convertDate(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }
    $(".main-tabs-nav3 li").click(async function (e) {
        e.preventDefault();
        
        // Execute specific functions based on the clicked <li>
        var liId = $(this).find("a").attr("id");
        console.log("liId", liId);
        if (liId === "mnuTripOutOfPolicy") {
            //showOverlay();
            var data = await getLocalizedWords();
            console.log("tripPlanningRefesh referesh");
            $('#statusBottom').hide();
            //if (isMobile == false) {

            loadScreen(data);
                hideOverlay();
                //$("#main-tab2-mobile").css('display', 'none');
           // }
          /*  else {
                $("#windows-planning-screen").css('display', 'none');
                mobile_start(data.drivers, data.service);
                hideOverlay();
                $("#main-tab2-mobile").css('display', 'block');
            }*/
            //clearValues();

        }
    });
    async function getLocalizedWords() {
        showOverlay();
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/Home/GetPlanningWords',
                method: 'GET',
                success: function (data) {
                    AcceptCancel = data.acceptCancel;
                    RejectCancel = data.rejectCancel;
                    CancelConfirmation = data.cancelConfirmation;
                    AssignDriver = data.assignDriver;
                    TripActivities = data.tripActivities;
                    PlannedTrips = data.plannedTrips;
                    EventsMsg = data.eventsMessage;
                    DeleteTripPopup = data.deleteTripPopup
                    CurrentWeek = data.currentWeek
                    convertedmonths = [
                        data.january,
                        data.february,
                        data.march,
                        data.april,
                        data.may,
                        data.june,
                        data.july,
                        data.august,
                        data.september,
                        data.october,
                        data.november,
                        data.december
                    ];
                    //sessionStorage.setItem('convertedmonths', JSON.stringify(convertedmonths));
                    console.log(convertedmonths);
                    converteddays = [
                        data.sun,
                        data.mon,
                        data.tue,
                        data.wed,
                        data.thu,
                        data.fri,
                        data.sat
                    ];
                    if (data.january == 'January') {
                        convertedshortmonths = ['Jan', data.feb, 'Mar', 'Apr', 'May', 'Jun', 'Jul', data.aug, 'Sep', 'Oct', 'Nov', data.dec];
                        converteddayinitials = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
                    } else {
                        convertedshortmonths = ['Jan', data.feb, 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', data.aug, 'Sep', 'Oct', 'Nov', data.dec];
                        converteddayinitials = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
                    }
                    console.log(converteddays);
                    /*sessionStorage.setItem('converteddays', JSON.stringify(converteddays));
                    sessionStorage.setItem('convertedshortmonths', JSON.stringify(convertedshortmonths));
                    sessionStorage.setItem('converteddayinitials', JSON.stringify(converteddayinitials));*/
                    languageobj = [
                        // { value: 0, text: "Select Tools" },
                        { value: "UnconfirmedTripsHeader", text: data.unconfirmedTripsHeader },
                        { value: "NewEvent", text: data.newEvent },
                        { value: "EditEvent", text: data.editEvent },
                        { value: "ExternalServiceHeader", text: data.externalServiceHeader },
                        { value: "AssignTrip", text: data.assignTrip },
                        { value: "UnassignedTrips", text: data.unassignedTrips },
                        { value: "Add", text: data.add },
                        { value: "Cancel", text: data.cancel },
                        { value: "CancelTrip", text: data.cancelTrip },
                        { value: "Drivers", text: data.drivers },
                        { value: "Print", text: data.print },
                        { value: "Refresh", text: data.refresh },
                        { value: "Day", text: data.day },
                        { value: "Back", text: data.back },
                        { value: "Week", text: data.week },
                        { value: "AcceptedTrips", text: data.acceptedTrips },
                        { value: "UnacceptedTrips", text: data.unacceptedTrips },
                        { value: "January", text: data.january },
                        { value: "February", text: data.February },
                        { value: "March", text: data.March },
                        { value: "April", text: data.April },
                        { value: "May", text: data.May },
                        { value: "June", text: data.June },
                        { value: "July", text: data.July },
                        { value: "August", text: data.August },
                        { value: "September", text: data.September },
                        { value: "October", text: data.October },
                        { value: "November", text: data.November },
                        { value: "December", text: data.December },
                        { value: "AddEvent", text: data.addEvent },
                        { value: "DetailsOfEvent", text: data.detailsOfEvent },
                        { value: "DeleteEvent", text: data.deleteEvent },
                        { value: "DetailsofTrip", text: data.detailsofTrip },
                        { value: "AcceptTrip", text: data.acceptTrip },
                        { value: "ReinitiateTrip", text: data.reinitiateTrip },
                        { value: "RejectTrip", text: data.rejectTrip },
                        { value: "Today", text: data.today },
                        //  { value: "Today", text: data.today },
                        { value: "CancelledTrips", text: data.cancelledTrips },


                    ]; // Array to store opttion values and text
                    console.log(languageobj);
                    /*var passstring = JSON.stringify(languageobj);
                    sessionStorage.setItem('languageobj', passstring)*/
                },
                error: function () {

                },
                complete: function () {
                    deleteEvent = languageobj.find(word => word.value === "DeleteEvent");
                    cancelTrip = languageobj.find(word => word.value === "CancelTrip");
                    //  let detailsofTrip = languageobj.find(word => word.value === "DetailsofTrip");
                    acceptTrip = languageobj.find(word => word.value === "AcceptTrip");
                    reinitiateTrip = languageobj.find(word => word.value === "ReinitiateTrip");
                    assignTrip = languageobj.find(word => word.value === "AssignTrip");
                    rejectTrip = languageobj.find(word => word.value === "RejectTrip");
                    externalService = [
                        {
                            id: 1,
                            name: "First Class Limousines"
                        },
                        {
                            id: 2,
                            name: "Luxury Rides"
                        },
                        {
                            id: 3,
                            name: "Elite Chauffeurs"
                        }
                    ];
                    /* $.ajax({
                         url: '/ManagerDrivers/GetDriver',
                         type: 'GET',
                         success: function (res) {*/
                    //console.log(res)
                    schdeulerDrivers = [
                        {
                            id: "D1",
                            name: "Guy Pittier",
                            userid: 24
                        },
                        {
                            id: "D2",
                            name: "John Doe",
                            userid: 25
                        },
                        {
                            id: "D3",
                            name: "Jane Smith",
                            userid: 26
                        },
                        {
                            id: "D4",
                            name: "Mike Johnson",
                            userid: 27
                        },
                        {
                            id: "D5",
                            name: "Sarah Connor",
                            userid: 28
                        },
                        {
                            id: "D6",
                            name: "Tom Hanks",
                            userid: 29
                        }
                    ];
                    let object = {
                        services: externalService,
                        drivers: schdeulerDrivers
                    }
                    resolve(externalService);

                },
                
            });
        })

    }




    document.addEventListener('click', () => {
        rightclick = false;
    });





   /* $.ajax({
        url: '/ManagerExternalService/GetServices',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            //storedlanguage = sessionStorage.getItem('languageobj');
           *//* convertedshortmonths = sessionStorage.getItem('convertedshortmonths');
            converteddays = sessionStorage.getItem('converteddays');
            convertedmonths = sessionStorage.getItem('convertedmonths');
            converteddayinitials = sessionStorage.getItem('converteddayinitials');*//*
            externalService = data.map(function (service) {
                return {
                    id: service.id,
                    name: service.name
                };
            });
            loadScreen(externalService);
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });*/
    function outOfPolicyTrips(firstday, lastday, inst) {
        var param = {
            dateFrom: formatDate(firstday),
            dateTo: formatDate(lastday)
        };
    
        $.ajax({
            url: '/Trips/OutOfPolicyTrips',
            method: 'GET',
            data: param,
            success: function (response) {
                console.log(response);
                if (response !== null && response !== undefined) {

                    outofpolicytrip = response.map(function (event) {
                        var startdate = new Date(event.fromDate);
                        var enddate = new Date(event.toDate);
                        var Color = "yellow";
                        var drag = true;
                        var Resource = event.externalServiceId;
                        var totalPassengers = [];
                        var currentDate = new Date();
                        var checkdate = new Date(startdate);


                        if (event.externalServiceId > 0) {
                            Resource = parseInt(event.externalServiceId);
                        }
                        if (event.status == 14 && checkdate > currentDate) {
                            Color = "yellow";
                            Resource = event.externalServiceId;
                        }
                        if (event.status == 15) {
                            Color = "gray";
                            Resource = 'U1';
                            drag = false;
                        }
                        if (event.status == 10 && checkdate > currentDate) {
                            Color = "green";
                            Resource = event.externalServiceId;
                            drag = false;
                        }
                        if (event.status == 19 && checkdate > currentDate) {
                            Color = "red";
                            Resource = event.externalServiceId;
                            drag = false;
                        }
                        if (checkdate < currentDate) {
                            Color = 'gray';
                            drag = false;
                        }
                        let processedTripSteps = [];
                        // Adjust the start and end times to the local timezone of the user
                        // You can use libraries like Luxon.js or Moment.js for better timezone handling
                        //startdate = convertToUserTimezone(startdate);
                        //console.log(event.tripId);
                        // var mainPas = event.mainPassenger[0];
                        // console.log(mainPas);
                        var mainP = event.mainPassenger[0].firstName + ' ' + event.mainPassenger[0].lastName;
                          var main = {
                              id: event.mainPassenger[0].passengerId,
                              name: mainP
                          };
                        totalPassengers.push(mainP);
                        // enddate = convertToUserTimezone(enddate);
                        if (event.tripSteps && Array.isArray(event.tripSteps)) {

                            var TripStep = event.tripSteps.forEach(trip => {
                                // Accessing properties of each trip step
                                let processedTripStep = {};
                                processedTripStep.tripStepId = trip.tripStepId;
                                processedTripStep.tripFromDate = new Date(trip.tripFromDate);
                                processedTripStep.tripToDate = new Date(trip.tripToDate);
                                if (trip.fromLocation) {
                                    processedTripStep.fromLocation = {
                                        locationId: trip.fromLocation.locationId,
                                        locationName: trip.fromLocation.locationName
                                    };
                                } else {
                                    processedTripStep.fromLocation = null;
                                }

                                // Process toLocation
                                if (trip.toLocation) {
                                    processedTripStep.toLocation = {
                                        locationId: trip.toLocation.locationId,
                                        locationName: trip.toLocation.locationName
                                    };
                                } else {
                                    processedTripStep.toLocation = null;
                                }

                                // Check if passengers array exists and is not null
                                if (trip.passengers && Array.isArray(trip.passengers)) {
                                    processedTripStep.passengers = trip.passengers.map(passenger => {

                                        var name = passenger.firstName + ' ' + passenger.lastName;
                                        if ((totalPassengers.indexOf(name)) === -1) {
                                            totalPassengers.push(name);
                                        }
                                        return {
                                            passengerId: passenger.passengerId,
                                            passengerName: passenger.firstName + ' ' + passenger.lastName
                                        };
                                    });
                                } else {
                                    processedTripStep.passengers = [];
                                }

                                // Push the processed trip step into the array
                                processedTripSteps.push(processedTripStep);
                            });

                        }
                        return {
                            id: 'T' + event.tripId,
                            name: 'Trips',
                            mainpassenger: mainP,
                            TPassengers: totalPassengers,
                            dragBetweenResources: drag,
                            start: startdate, // Convert start date to JavaScript Date object
                            end: enddate, // Convert end date to JavaScript Date object
                            title: mainP, // Provide a default title if one is not available in your data
                            resource: Resource,
                            tripStep: processedTripSteps,
                            vehicleName: event.vehicleName,
                            statusName: event.statusName,
                            status: event.status,
                            color: Color,
                             mainPassenger: event.mainPassenger.forEach(passenger => {
                                 mainPassengerId = passenger.passengerId;
                                 mainPassengerNAme = passenger.firstName + passenger.lastName;
                             }),
                            mainPassengerId: event.mainPassenger[0].passengerId,
                            mainPassengerName: event.mainPassenger[0].firstName + event.mainPassenger[0].lastName ,

                             
                            //driverName: event.driverName,
                            // eventkindId: event.eventKindId,
                            // Map other fields as needed
                        };
                    })
                    inst.setEvents(outofpolicytrip);
                }
                else {
                    inst.setEvents([]);
                }
                hideOverlay();
                //loadScreen(outofpolicytrip, externalService);
                //console.log(response);

            },

        });
}
   
   
    async function tripRightPopup(cell, args) {
        //rightclick = false;

        target = args.domEvent.currentTarget;
        
        deleteEvent = false;
        var id = args.event.id;
        //$('#detail-action-btn').attr("data-id", ev.id.slice(1));
        var finalid = id.charAt(0);
        if (finalid == "T") {
        args.event.start = new Date(args.event.start);
            args.event.end = new Date(args.event.end);

        //args.event.target
        var test = JSON.stringify(args.event);
        sessionStorage.setItem('event', test);
        
            //var $tripcontainer = $('#dynamicContent');
            var ev = args.event;
            sessionStorage.setItem('redirectTripId', parseInt(ev.id.slice(1)));
            //$tripcontainer.html('');
            var status = ev.status;
            var current = new Date();
            var end = new Date(ev.end);
            
            $(document).on('click', '#detail-action-btn', function () {
                trippopupoutofpolicy.close();
                $("#main-tab4").css('display', 'none');
                $("#main-tab3").fadeIn();
                $(".search-tab").hide();
                $(".search-detail-tab").show();
            });

           
            $('.alertPrint').on('click', function () {
                $('.permission').modal('show');
                $('.permission').fadeIn();
                // Delay for 5 seconds
                setTimeout(function () {
                    $('.permission').modal('hide');
                }, 3000);
                trippopupoutofpolicy.close();
            });
               
            trippopupoutofpolicy.setOptions({
                anchor: args.domEvent.currentTarget
            });
            trippopupoutofpolicy.open()
            $(document).on('click', '#print-trip-outofpolicy', function () {

                var id = ev.id.slice(1);
                console.log('TripId->', id);
                var languageId = $('#langugeId').val();

                var reportNameEncoded;
                if (languageId == 1) {
                    reportNameEncoded = "TripReviewPrint.trdp";
                } else {
                    reportNameEncoded = "TripReviewPrint_FR.trdp";
                }

                //var reportNameEncoded = "TripReviewPrint.trdp";
                var parameterString = "tripId=" + id + "&report=" + reportNameEncoded;
                var url = "/Home/TelerikReport" + '?' + parameterString;

                window.open(url, '_blank');
            });
     
        }
        }
    document.getElementById('out-of-policy-scheduler').addEventListener("contextmenu", function (e) {
        e.preventDefault();
    })
    function loadScreen(externalService) {
        var timer;
       
        async function generateTooltipContent(args) {
            var eventData = args.event;
            var id = (eventData.id).charAt(0);
            var tripid = eventData.id.slice(1);
                let stausname = await getStatus(tripid);
               var tripSteps = eventData.tripStep;

            var tooltipContent = "<div class='trip-list-col'>" + "<img class='icon-img m-r-10' src='/img/car.png' alt=''> <span>" + eventData.mainpassenger + " ( " + tripid + " ) " + "</span></div><div class='trip-list-col tripstepcontainer'> <div class='tripstepcontainer'>";
                

                tripSteps.forEach(function (tripStep, index) {
                    var fromdatetime = new Date(tripStep.tripFromDate);
                    var todatetime = new Date(tripStep.tripToDate);
                    var fromtime = fromdatetime.toTimeString().split(' ')[0];
                    var totime = todatetime.toTimeString().split(' ')[0];
                    var fromdate = convertDate(tripStep.tripFromDate);
                    var todate = convertDate(tripStep.tripToDate);
                    var from = fromdate + '  ' + fromtime;
                    var to = todate + '  ' + totime;

                    tooltipContent += " <div class='trip-date-wrapper bottom-line' style='margin-bottom:0;'> <div class='trip-date-col'> <span>" + from + '<br> <b> ' + tripStep.fromLocation.locationName + " </b><br> </span> </div>"
                    tooltipContent += "<div class='trip-date-col'> <img class='icon-img' src = '/img/arrow-back.png' alt = '' ></div> <div class='trip-date-col'> <span>" + to + '<br> <b> ' + tripStep.toLocation.locationName + " </b><br> </span> </div></div><br>";
                });
                // eventData.TPassengers.reverse();
                tooltipContent += '</div><div class="trip-date-wrapper"><div class="trip-general-footer">  <div class="add-more"> <div class="trip-wrapper">  <h4> Passengers </h4>  ';
                eventData.TPassengers.forEach(pass => {
                    tooltipContent += '<div><span class="trip-tool-row">' + pass + "</span></div>";
                });

                if (eventData.vehicleName !== null) {
                    tooltipContent += '<h4> Vehicle </h4>';
                    tooltipContent += '<span class="trip-tool-row">' + eventData.vehicleName + "</span>";
                }
                tooltipContent += '<h4> Status </h4>';
                tooltipContent += '<span class="trip-tool-row">' + stausname + ' ' + '(' + eventData.status + ')' + "</span> </div> </div></div>";
                $(".trip-list-row").html(tooltipContent);
                clearTimeout(timer);
                timer = null;
                triptooltip.setOptions({
                    anchor: args.domEvent.target,

                });
                triptooltip.open();

            //}
            //    var tripid = eventData.id.slice(1);
            //    let stausname = await getStatus(tripid);
            //    var tripSteps = eventData.tripStep;
            //    //if (eventData.status == 14) {

            //    //    var tooltipContent = "<b>" + "Trip " + tripid + " for " + eventData.mainpassenger + ' ' + convertDate(eventData.start) + "</b>" + "<br>";
            //    //}
            //    var tooltipContent = "<b>" + "Trip " + tripid + " for " + eventData.mainpassenger + ' ' + convertDate(eventData.start) + "</b>" + "<br>";
            //    tripSteps.forEach(function (tripStep, index) {
            //        var fromdatetime = new Date(tripStep.tripFromDate);
            //        var todatetime = new Date(tripStep.tripToDate);
            //        var fromtime = fromdatetime.toTimeString().split(' ')[0];
            //        var totime = todatetime.toTimeString().split(' ')[0];
            //        var fromdate = convertDate(tripStep.tripFromDate);
            //        var from = fromdate + ' ' + fromtime;

            //        tooltipContent += from + ' ' + tripStep.fromLocation.locationName + "  -> " + totime + '  ' + tripStep.toLocation.locationName + "<br>";
            //    });
            //    // eventData.TPassengers.reverse();
            //    eventData.TPassengers.forEach(pass => {
            //        tooltipContent += pass + "<br>"
            //    });
            //    if (eventData.vehicleName !== null) {

            //        tooltipContent += "Vehicle: " + eventData.vehicleName + "<br>";
            //    }
            //    tooltipContent += "Status: " + stausname + ' ' + '(' + eventData.status + ')';
            //    $("#toolcontent").html(tooltipContent);

            //}

            //clearTimeout(timer);
            //timer = null;
            //tooltip.setOptions({
            //    anchor: args.domEvent.target,

            //});
            //tooltip.open();
            ////return tooltipContent;
        }
       

        // Parse the JSON strings back into arrays or objects
        /*convertedshortmonths = JSON.parse(convertedshortmonths);
        converteddays = JSON.parse(converteddays);
        convertedmonths = JSON.parse(convertedmonths);
        converteddayinitials = JSON.parse(converteddayinitials);*/


       // var languageobj = JSON.parse(storedlanguage);
        console.log(languageobj);
       // let Drivers = languageobj.find(word => word.value == "Drivers");
        let ExternalServiceHeader = languageobj.find(word => word.value == "ExternalServiceHeader");
        let UnconfirmedTripsHeader = languageobj.find(word => word.value == "UnconfirmedTripsHeader");
      //  let AcceptedTrips = languageobj.find(word => word.value == "AcceptedTrips");
       // let UnacceptedTrips = languageobj.find(word => word.value == "UnacceptedTrips");
        let CancelledTrips = languageobj.find(word => word.value == "CancelledTrips");
        let Today = languageobj.find(word => word.value == "Today");
        var myResources = [
            {
                id: 'externalId',
                name: ExternalServiceHeader.text,
                collapsed: false,
                eventCreation: false,
                children: externalService
            }, {
                id: 'tripId',
                name: UnconfirmedTripsHeader.text,
                collapsed: false,
                eventCreation: false,
                children: [
                    {
                        id: 'U1',
                        name: CancelledTrips.text,
                        eventCreation: false,

                    }
                ]
            }];
        var refreshStart;
        var rightclick = false;
        var refreshEnd;
        var cellClickDate;
        calendarout = $('#out-of-policy-scheduler')
            .mobiscroll()
            .eventcalendar({
                modules: [mobiscroll.print],
                clickToCreate: false,
                 dragToCreate: false,
                 dataTimezone: 'utc',
                 dragToResize: false,
                dataTimezone: 'utc',
                displayTimezone: 'utc',
                dragToMove: false,
                todayText: Today.text,
                dragInTime: false,
                monthNamesShort: convertedshortmonths,
                dayNamesShort: converteddays,
                dayNamesMin: converteddayinitials,
                monthNames: convertedmonths,
                eventDelete: false,
                eventOverlap: true,
                resources: myResources,
                showEventTooltip: false,
                view: {
                    timeline: {
                        type: 'week',
                        timeCellStep: 120

                    },
                },
                onPageLoading: function (event, inst) {
                    showOverlay();
                    instance = inst;
                    refreshStart = event.firstDay;
                    refreshEnd = event.lastDay;
                    var Year = event.firstDay.getFullYear();
                    currentYear = parseInt(Year);
                    var Month = event.firstDay.getMonth() + 1;
                    currentMonth = parseInt(Month);
                    var dates = {
                        year: parseInt(Year),
                        month: parseInt(Month)
                    };
                    reloadDates = dates;
                    outOfPolicyTrips(refreshStart,refreshEnd, inst);
                    //console.log(dates);

                    //var day = event.firstDay.getDate();
                    setTimeout(function () {

                        $('#outofpolicy-refresh').on('click',async function () {
                            showOverlay();
                            outOfPolicyTrips(refreshStart, refreshEnd, inst);
                           
                        })
                    }, 300);

                  
                },
                renderHeader: function () {
                    let week = languageobj.find(word => word.value == "Week");
                    let refresh = languageobj.find(word => word.value == "Refresh");
                    let Day = languageobj.find(word => word.value == "Day");
                    let Print = languageobj.find(word => word.value == "Print");
                    if (enablePrint == true) {

                        return (
                           
                            '<div class="btn btn-outline-gray"><img  src="/img/calendar.png" style="width:auto;height:19px"/>  <div mbsc-calendar-nav class="cal-header-nav" title="Calendar"></div></div>' +
                            '<div class="cal-header-picker">' +
                            '<label>' + week.text + '<input mbsc-segmented type="radio" name="view" value="weekoutofpolicy" class="md-change-outofpolicy" id="weekoutofpolicyRadio" checked></label>' +
                            '<label>' + Day.text + '<input mbsc-segmented type="radio" name="view" value="dayoutofpolicy" class="md-change-outofpolicy" id="dayoutofpolicyRadio"></label>' +
                            '</div>' +
                            '<div mbsc-calendar-prev class="cal-header-prev"></div>' +
                            '<div mbsc-calendar-today class="outcal-header-today"></div>' +
                            '<div mbsc-calendar-next class="cal-header-next"></div>' +
                            '<div class="cal-header-week outOfPolicyWeek">'+
                                '<button id="calender-week" class="btn btn-outline-gray">'+
                                    '<span>'+ CurrentWeek +'</span>'+
                                '</button>'+
                            '</div>'+
                            '<div class="cal-header-print">' +
                            '<button id="OutofPolicy-print" class="btn btn-outline-gray">' +
                            '<span>' + Print.text + '</span><img class="icon-img m-l-10" src="/img/material-print.png" alt="Print">' +
                            '</button>' +
                            '</div>' +
                            '<div class="cal-header-refresh">' +
                            '<button id="outofpolicy-refresh" class="btn btn-outline-green">' +
                            '<span>' + refresh.text + '</span><img class="icon-img m-l-10" src="/img/material-refresh.png" alt="Refresh">' +
                            '</button>' +
                            '</div>'
                        );
                    }
                    else {
                        return (
                            '<div class="btn btn-outline-gray"><img  src="/img/calendar.png" style="width:auto;height:19px"/>  <div mbsc-calendar-nav class="cal-header-nav" title="Calendar"></div></div>' +
                            '<div class="cal-header-picker">' +
                            '<label>' + week.text + '<input mbsc-segmented type="radio" name="view" value="weekoutofpolicy" class="md-change-outofpolicy" id="weekoutofpolicyRadio"></label>' +
                            '<label>' + Day.text + '<input mbsc-segmented type="radio" name="view" value="dayoutofpolicy" class="md-change-outofpolicy" id="dayoutofpolicyRadio"></label>' +
                            '</div>' +
                            '<div mbsc-calendar-prev class="cal-header-prev"></div>' +
                            '<div mbsc-calendar-today class="cal-header-today"></div>' +
                            '<div mbsc-calendar-next class="cal-header-next"></div>' +
                            '<div class="cal-header-week outOfPolicyWeek">' +
                            '<button id="calender-week" class="btn btn-outline-gray">' +
                            '<span>' + CurrentWeek + '</span>' +
                            '</button>' +
                            '</div>' +
                            '<div class="cal-header-print">' +
                            '<button  class="btn btn-outline-gray" disabled>' +
                            '<span>' + Print.text + '</span><img class="icon-img m-l-10" src="/img/material-print.png" alt="Print">' +
                            '</button>' +
                            '</div>' +
                            '<div class="cal-header-refresh">' +
                            '<button id="outofpolicy-refresh" class="btn btn-outline-green">' +
                            '<span>' + refresh.text + '</span><img class="icon-img m-l-10" src="/img/material-refresh.png" alt="Refresh">' +
                            '</button>' +
                            '</div>'
                        );
                    }

                },

                //onclick='AcceptTrip(" + trip.tripId + ")'
                renderHour: function (args) {
                    //console.log(args.Date);
                    var dateString = args.date;
                    var date = new Date(dateString);

                    // Get the hours, minutes, and seconds from the Date object
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var seconds = date.getSeconds();

                    // Format the hours, minutes, and seconds to have two digits if necessary

                    var toggle = this.type;
                    // Return the time in 24-hour format as a string
                    if (hours > 0 && toggle == 'day') {

                        return hours + 'h';
                    }
                    else if (hours > 0 && toggle == 'week') {
                        if (hours % 2 == 0) {
                            //console.log(hours);
                            return hours + 'h';
                        }
                    }
                },
                renderDay: function (args) {
                    // console.log(args);
                    var dateString = args.date;
                    var date = new Date(dateString);

                    // Define arrays for days and months
                    var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    var daysOfWeekFrench = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
                    // var monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    //var monthsOfYearFrench = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
                    if (converteddays[0] === "Sun") {

                        var dayOfWeek = daysOfWeek[date.getDay()];
                        var dayOfMonth = date.getDate();
                        var monthOfYear = date.getMonth() + 1;
                        var year = date.getFullYear();

                        // Format the day of the month to have two digits if necessary
                        monthOfYear = (monthOfYear < 10 ? '0' : '') + monthOfYear;
                        var currentDate = new Date();
                        currentDate.setHours(0, 0, 0, 0);
                        if (currentDate.getTime() === date.getTime()) {
                            return '<span style="margin-left: 5px; background-color: #007FFF; color: white; border-radius: 50px; padding: 3px 10px; margin-top: 5px;">' +
                                '<b>' + dayOfWeek + ' ' + dayOfMonth + '.' + monthOfYear + '.' + year + '</b>' +
                                '</span>';

                        }
                        else {

                            return '<span style=margin-left:5px;margin-top:5px;color:black>' + '<b>' + dayOfWeek + ' ' + dayOfMonth + '.' + monthOfYear + '.' + year + '</span>';
                        }
                    }
                    else if (converteddays[0] === "Dim") {
                        var dayOfWeek = daysOfWeekFrench[date.getDay()];
                        var dayOfMonth = date.getDate();
                        var monthOfYear = date.getMonth() + 1;
                        var year = date.getFullYear();
                        var currentDate = new Date();
                        //dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
                        //monthOfYear = monthOfYear < 10 ? '0' + monthOfYear : monthOfYear;
                        monthOfYear = (monthOfYear < 10 ? '0' : '') + monthOfYear;
                        var formattedDate = `${dayOfMonth}.${monthOfYear}.${year}`;
                        currentDate.setHours(0, 0, 0, 0);
                        var todayFormatted = `${currentDate.getUTCDate()}.${currentDate.getUTCMonth() + 1 < 10 ? '0' + (currentDate.getUTCMonth() + 1) : currentDate.getUTCMonth() + 1}.${currentDate.getUTCFullYear()}`;
                         console.log(todayFormatted);
                         console.log(formattedDate);
                        if (currentDate.getTime() === date.getTime()) {
                            return '<span style="margin-left: 5px; background-color: #007FFF; color: white; border-radius: 50px; padding: 3px 10px; margin-top: 5px;">' +
                                '<b>' + dayOfWeek + ' ' + dayOfMonth + '.' + monthOfYear + '.' + year + '</b>' +
                                '</span>';

                        } else {
                            return '<span style=margin-left:5px;margin-top:5px;color:black>' + '<b>' + dayOfWeek + ' ' + dayOfMonth + '.' + monthOfYear + '.' + year + '</span>';
                        }

                    }
                    // Get the day, month, and year from the Date object

                    // Return the date in the desired format
                },

                renderScheduleEventContent: function (data) {
                    
                        var trip = data.original.tripStep;
                        var length = trip.length;
                        if (length > 0) {

                            return (

                                "<div class='mbsc-schedule-event-title'><span style='display: flex;'>" +

                                '<span class="img-trip"><img class="icon-img m-r-10" src="/img/car.png" alt=""></span>' +
                                '<h6  style="color=black"  class="trip-heading">' + data.html + '</h6></span></div><div class="mbsc-event-prop">' +
                                '<span>' + trip[0].fromLocation.locationName + '</span>   ' + '<img class="icon-img" src="/img/arrow-back.png" alt="">' + '<span>     ' + trip[0].toLocation.locationName + '</span></div>'




                            );
                        } else {
                            return (
                                "<div class='event-planning'>" +

                                '<span class="img-trip"><img class="icon-img m-r-10" src="/img/car.png" alt=""></span>' +
                                '<h6  style="color=black"  class="trip-heading">' + data.html + '</h6>' +
                                '</div>'
                            );
                        }
                    
                },



                //onCellRightClick: function (args) {
                //    tempEvent = args.event;
                //    //createAddPopup(args,args.target);
                //    showContextMenu(args.target, args, args.resource);
                //},
                //onEventCreate: function (args) {
                //    ev = args.event;
                //    pushToDatabase(ev);
                //},
                //onEventClick: function (args) {
                //    if (!tooltip.isVisible()) {
                //        generateTooltipContent(args);
                //    }
                //},
                onCellClick: function (args) {
                    console.log(args.date);
                    cellClickDate = new Date(args.date);

                },
                onEventHoverIn: function (args) {
                    clearTimeout(timer);
                    if (!rightclick) {
                        timer = setTimeout(() => {
                            generateTooltipContent(args);
                        }, 1000); // Show tooltip after 3 seconds
                    }
                   // generateTooltipContent(args);

                },
                onEventHoverOut: function () {
                    rightclick = false;
                    triptooltip.close();
                    clearTimeout(timer);
                },
                onEventRightClick: function (args) {
                    rightclick = true;
                    tempEvent = args.event;
                    triptooltip.close();
                    tripRightPopup(args.target, args);
                },
                onEventDoubleClick: function (args) {
                    triptooltip.close();
                    rightclick = true;
                    var id = parseInt(args.event.id.slice(1));
                    console.log(id);

                    $("#main-tab4").css('display', 'none');
                    $("#main-tab3").fadeIn();
                    $(".search-tab").hide();
                    $(".search-detail-tab").show();
                    $('#statusBottom').show();
                    showOverlay();
                    if (typeof window.loadResearcherScreen === 'function') {
                        setTimeout(function () {

                            loadResearcherScreen(id);
                        }, 400);

                    }
                },

            })
            .mobiscroll('getInst');
        $('.outOfPolicyWeek').off('click').on('click', function () {
            $('#weekoutofpolicyRadio').prop('checked', true);
            $('#dayoutofpolicyRadio').prop('checked', false);
            // Trigger the change event manually to update the calendar
            $('#weekoutofpolicyRadio').trigger('change');
            let current = new Date();
            showOverlay();
            // Get the start of the week (Sunday)
            let startOfWeek = new Date(current);
            startOfWeek.setDate(current.getDate() - current.getDay()); // Adjust to the previous Sunday

            // Get the end of the week (Saturday)
            let endOfWeek = new Date(current);
            endOfWeek.setDate(current.getDate() + (6 - current.getDay()));
            let inst = $('#out-of-policy-scheduler').mobiscroll('getInst');
            showOverlay();
            outOfPolicyTrips(startOfWeek, endOfWeek, inst);
            inst.navigate(startOfWeek);

        })
        $('#mnuTripOutOfPolicy').off('click').on('click', async function () {
            let current = new Date();

            // Get the start of the week (Sunday)
            let startOfWeek = new Date(current);
            startOfWeek.setDate(current.getDate() - current.getDay()); // Adjust to the previous Sunday

            // Get the end of the week (Saturday)
            let endOfWeek = new Date(current);
            endOfWeek.setDate(current.getDate() + (6 - current.getDay()));
            let inst = $('#out-of-policy-scheduler').mobiscroll('getInst');
            showOverlay();
            outOfPolicyTrips(startOfWeek, endOfWeek, inst);
            inst.navigate(startOfWeek);
        });
        $('#OutofPolicy-print').on('click', function () {
            calendarout.print();
        });
        $('.md-change-outofpolicy').on("change", function (ev) {

            var calendarContainer = $('#out-of-policy-scheduler');

                console.log('clicked value', ev.target.value);
                switch (ev.target.value) {
                    case 'weekoutofpolicy':
                        calendarout.setOptions({
                            view: {
                                timeline: {
                                    type: 'week',
                                    timeCellStep: 120 // Adjust as needed
                                }
                            }
                        });
                        calendarContainer.css('width', 'fit-content');
                        break;
                    case 'dayoutofpolicy':
                        calendarout.setOptions({
                            view: {
                                timeline: {
                                    type: 'day',
                                    timeCellStep: 180 // Adjust as needed
                                }
                            }
                        });
                        if (cellClickDate != null) {

                            calendarout.navigate(cellClickDate);
                        }
                        calendarContainer.css('width', ''); 
                        break;

                }
            });
        $('.outcal-header-today').off('click').on('click', function () {
            $('#weekoutofpolicyRadio').prop('checked', false);
            $('#dayoutofpolicyRadio').prop('checked', true);
            // Trigger the change event manually to update the calendar
            $('#dayoutofpolicyRadio').trigger('change');
        });
        /*$('.md-view-change').change(function (ev) {
            switch (ev.target.value) {
                case 'week-outofpolicy':
                    calendarout.setOptions({
                        view: {
                            timeline: {
                                type: 'week',
                                timeCellStep: 720 // Adjust as needed
                            }
                        }
                    });
                    break;
                case 'day-outofpolicy':
                    calendarout.setOptions({
                        view: {
                            timeline: {
                                type: 'day',
                                timeCellStep: 180 // Adjust as needed
                            }
                        }
                    });
                    break;
                  case 'month':
                  default:
                      calendar.setOptions({
                          view: {
                              timeline: {
                                  type: 'month',
                                  timeCellStep: 360 // Adjust as needed
                              }
                          }
                      });
                      break;
            }
        });*/
    }
    
    

    tooltip = $('#tooltipContainer')
        .mobiscroll()
        .popup({
            display: 'anchored',
            contentPadding: false,
            width: 600,
            showOverlay: false,
            touchUi: false,


        })
        .mobiscroll('getInst');
    triptooltip = $('.driver-tooltip')
        .mobiscroll()
        .popup({
            display: 'anchored',
            contentPadding: false,

            showOverlay: false,
            touchUi: false,


        })
        .mobiscroll('getInst');
    trippopupoutofpolicy = $("#outOfPolicyMenu")
        .mobiscroll()
        .popup({
            display: 'bottom',
            contentPadding: false,
            fullScreen: true,
           /*  onClose: function () {
                 if (deleteEvent) {
                     calendar.removeEvent(tempEvent);
                 } else if (restoreEvent) {
                     calendar.updateEvent(oldEvent);
                 }
             },*/
            responsive: {
                medium: {
                    display: 'anchored',
                    width: 100,
                    fullScreen: false,
                    touchUi: false,
                },
            },
        })
        .mobiscroll('getInst');
    $('.driver-tooltip').on("mouseenter", function () {
        //tooltip.close();
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    });
    $('.driver-tooltip').on("mouseleave", function () {
        triptooltip.close();

    });
    //$("#detailsEvent").on('click', function () {
    //    eventpopup.close();
    //    let key = sessionStorage.getItem('event')
    //    let event = JSON.parse(key);
    //    createEditPopup(event, target);

    //});
    //$("#deleteEvent").on('click', function () {
    //    eventpopup.close();
    //    let key = sessionStorage.getItem('event')
    //    let event = JSON.parse(key);
    //    calendar.removeEvent(event);
    //    deletefromdatabase(event);
    //    //createEditPopup(event, target);

    //});
    
    var externalService = [];
    function getStatus(id) {
        let tripid = parseInt(id);
        return new Promise((resolve, reject) => {
            //showOverlay();
            $.ajax({
                url: '/Trips/GetTripData?tripId=' + tripid,
                method: 'GET',
                // data: { driverId: driverid },
                success: function (obj) {
                    //rightclick = false;
                    console.log(obj);
                    //hideOverlay();
                    resolve(obj.statusName);




                },
                error: function (error) {
                    reject(error);
                    //alert(JSON.stringify(error));
                    //  console.error('Error fetching data:', error);
                }
            });
        })
    }
    function formatDate(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    }
});