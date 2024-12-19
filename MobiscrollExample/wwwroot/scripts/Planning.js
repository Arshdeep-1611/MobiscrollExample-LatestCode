/*const { event } = require("jquery");*/

var isMobile = Math.min(window.screen.width, window.screen.height) < 600 || navigator.userAgent.indexOf("Mobi") > -1;
$(document).ready(function () {
    var languageobj = [];
    var convertedshortmonths = [];
    var convertedmonths = [];
    var converteddayinitials = []
    var converteddays = [];
    var enablePrint = true;
    var AcceptedTrips;
    var AcceptCancel;
    var RejectCancel;
    var UnacceptedTrips;
    var AssignDriver;
    var TripActivities;
    var PlannedTrips;
    var EventsMsg;
    var CurrentWeek;
    let scrollPosition;
    var tempEvent = {};
    var DeleteEventPopup;
    	/*string linkPassenger = _localization.Getkey("linkPassenger");
			string ResearchStatus = _localization.Getkey("ResearchStatus");
			string ResearchVehicle = _localization.Getkey("ResearchVehicle");*/
    var linkPassenger;
    var ResearchStatus;
    var ResearchVehicle;
    let statNotReady,
        statToBeProcessed,
        acceptedManager,
        rejectedManager,
        cancelledManager,
        cancelledReq,
        outPolicyRejectExtService,
        cancelConfirmed,
        outPolicyCancelConfExtService,
        planified,
        waitDriverConf,
        waitExtServiceConf,
        outPolicyCancelReq,
        outPolicyWaitExtServiceConf,
        outPolicyCancelExtService,
        extCancelManager,
        // Uncomment these if needed
        // deleted,
        // updatingReq,
        outPolicyUpdateReq,
        extResetManager;
    var timer;
    var CancelConfirmation;
    var DeleteTripPopup;
    var deleteEvent;
    var cancelTrip;
    //  let detailsofTrip = languageobj.find(word => word.value === "DetailsofTrip");
    var acceptTrip;
    var DurationLabel;
    var reinitiateTrip;
    var assignTrip;
    var rejectTrip;
    //var CancelledTrips = languageobj.find(word => word.value == "CancelledTrips");
    var Back;
    var dateOptions = [];
   /* var roles = jQuery("#rolesList").val();
    var checkRole = JSON.parse(roles);*/
    var eventsKind = [];
    //console.log(checkRole);
  /*  var access = checkRole.find(role => role.ToolId == 37);
    var accessLevel = access.AccessLevel;
    var planningRole = checkRole.find(role => role.ToolId == 30);
    var planningAccess = planningRole.IsEnabled;*/
    var Feb = "";
    var Aug = "";
    var Dec = "";
    //console.log(planningAccess);
    var userType = $("#userType").val();
    var userId = $("#userId").val();
    console.log(userType);
   /* if (access == undefined || access.IsEnabled == false) {
        enablePrint = false;
    }*/
    enablePrint = true;
    function showOverlay() {
       // document.getElementById('overlay').style.display = 'flex';
    }
    //var ComparisonTrips = [];
    // Function to hide the overlay
    function hideOverlay() {
        //document.getElementById('overlay').style.display = 'none';
    }
    const showConfirmPopup1 = (textValue) => {
        $('#confirm-popup1').find("#popup-body").text(textValue);
        $('#confirm-popup1').modal('show');
    }
    document.addEventListener('click', () => {
        rightclick = false;
    });
    const hideConfirmPopup1 = () => {
        $('#confirm-popup1').modal('hide');
        return;
    }
    function saveScrollPosition() {
        scrollPosition = window.scrollY;
    }

    function restoreScrollPosition(scrollPosition) {
        window.scrollTo(0, scrollPosition); // Restore to the saved position
    }
    $(".main-tabs-nav3 li").click(async function (e) {
        e.preventDefault();

        // Execute specific functions based on the clicked <li>
        var liId = $(this).find("a").attr("id");
        console.log("liId", liId);
        if (liId === "tripPlanningRefresh") {
            var data = await getLocalizedWords();
            //showOverlay();
            console.log("tripPlanningRefesh referesh");
            $('#statusBottom').hide();
            if (isMobile == false) {

                start(data.drivers, data.services);
                // hideOverlay();
                $("#main-tab2-mobile").css('display', 'none');
            }
            else {
                $("#windows-planning-screen").css('display', 'none');
                console.log(data);
                mobile_start(data.drivers, data.services);
                // hideOverlay();
                $("#main-tab2-mobile").css('display', 'block');
            }
            //clearValues();

        }
    });
    /*  if (isMobile == false) {
          if (planningAccess == true) {
              *//*$(".main-tabs-nav3 li").click(function (e) {
e.preventDefault();

// Execute specific functions based on the clicked <li>
var liId = $(this).find("a").attr("id");
console.log("liId", liId);
if (liId === "tripPlanningRefresh") {
//showOverlay();
console.log("tripPlanningRefesh referesh");
$('#statusBottom').hide();
//clearValues();
start(schdeulerDrivers, externalService);
$("#main-tab2-mobile").css('display', 'none');

}
});*//*
                    
                        start(schdeulerDrivers, externalService);
                        $("#main-tab2-mobile").css('display', 'none');
                    
                    }
                    
                    }
                    else {
                    if (planningAccess == true) {
                        *//* $(".main-tabs-nav3 li").click(function (e) {
e.preventDefault();
 
// Execute specific functions based on the clicked <li>
var liId = $(this).find("a").attr("id");
console.log("liId", liId);
if (liId === "tripPlanningRefresh") {
showOverlay();
console.log("tripPlanningRefesh referesh");
$('#statusBottom').hide();
$("#windows-planning-screen").css('display', 'none');
mobile_start(schdeulerDrivers, externalService);
$("#main-tab2-mobile").css('display', 'block');
//clearValues();
 
}
});*//*
           
           $("#windows-planning-screen").css('display', 'none');
           mobile_start(schdeulerDrivers, externalService);
           $("#main-tab2-mobile").css('display', 'block');
           
           }
           
           }*/
    async function getLocalizedWords() {
        showOverlay();
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/Home/GetPlanningWords',
                method: 'GET',
                success: function (data) {
                    AcceptCancel = data.acceptCancel;
                    DurationLabel = data.durationLabel;
                    RejectCancel = data.rejectCancel;
                    CancelConfirmation = data.cancelConfirmation;
                    AssignDriver = data.assignDriver;
                    TripActivities = data.tripActivities;
                    PlannedTrips = data.plannedTrips;
                    EventsMsg = data.eventsMessage;
                    DeleteTripPopup = data.deleteTripPopup
                    DeleteEventPopup = data.deleteEventPopup
                    CurrentWeek = data.currentWeek
                    linkPassenger = data.linkPassenger
                    ResearchVehicle = data.ResearchVehicle
                    ResearchStatus = data.ResearchStatus
                    statNotReady = data.StatusNotReady;
                    statToBeProcessed = data.StatusToBeProcessed;
                    acceptedManager = data.AcceptedByManager;
                    rejectedManager = data.RejectedByManager;
                    cancelledManager = data.CancelledByManager;
                    cancelledReq = data.CancelledByRequestor;
                    outPolicyRejectExtService = data.OutPolicyRejectedExtService;
                    cancelConfirmed = data.CancellationConfirmed;
                    outPolicyCancelConfExtService = data.OutPolicyCancelConfExtService;
                    planified = data.Planified;
                    waitDriverConf = data.WaitingDriverConfirmation;
                    waitExtServiceConf = data.WaitExtServiceConf;
                    outPolicyCancelReq = data.OutOfPolicyCancelledByRequestor;
                    outPolicyWaitExtServiceConf = data.OutPolicyWaitExtServiceConf;
                    outPolicyCancelExtService = data.OutPolicyCancelledExtService;
                    extCancelManager = data.ExtCancelledManager;
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
                    sessionStorage.setItem('convertedmonths', JSON.stringify(convertedmonths));
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
                    /* sessionStorage.setItem('converteddays', JSON.stringify(converteddays));
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
                  /*  rejectTrip = languageobj.find(word => word.value === "RejectTrip");
                    $.ajax({
                        url: '/ManagerExternalService/GetServices',
                        method: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);*/
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
                                    resolve(object);

                                },
                              /*  error: function (error) {
                                    console.error('Error fetching data:', error);
                                    reject(error);
                                }
                            });
                        },
                        error: function (error) {
                            console.error('Error fetching data:', error);
                        }
                    });*/
                
            });
        })

    }
    /*$.ajax({
        url: '/ManagerExternalService/GetServices',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            externalService = data
                .filter(service => service.valid === 1) // Filter out invalid services
                .map(service => ({
                    id: service.id,
                    name: service.name
                }));
            $.ajax({
                url: '/ManagerDrivers/GetDriver',
                type: 'GET',
                success: function (res) {
                    //console.log(res)
                    schdeulerDrivers = res
                        .filter(driver => driver.isValid === 1) // Filter out invalid drivers
                        .map(driver => ({
                            id: 'D' + driver.driverId,
                            name: driver.firstName + ' ' + driver.lastName,
                            userid: driver.userId
                        }));
                    if (isMobile == false) {
                        if (planningAccess == true) {
                            $(".main-tabs-nav3 li").click(function (e) {
                                e.preventDefault();

                                // Execute specific functions based on the clicked <li>
                                var liId = $(this).find("a").attr("id");
                                console.log("liId", liId);
                                if (liId === "tripPlanningRefresh") {
                                    //showOverlay();
                                    console.log("tripPlanningRefesh referesh");
                                    $('#statusBottom').hide();
                                    //clearValues();
                                    start(schdeulerDrivers, externalService);
                                    $("#main-tab2-mobile").css('display', 'none');

                                }
                            });

                            start(schdeulerDrivers, externalService);
                            $("#main-tab2-mobile").css('display', 'none');

                        }

                    }
                    else {
                        if (planningAccess == true) {
                            $(".main-tabs-nav3 li").click(function (e) {
                                e.preventDefault();

                                // Execute specific functions based on the clicked <li>
                                var liId = $(this).find("a").attr("id");
                                console.log("liId", liId);
                                if (liId === "tripPlanningRefresh") {
                                    showOverlay();
                                    console.log("tripPlanningRefesh referesh");
                                    $('#statusBottom').hide();
                                    $("#windows-planning-screen").css('display', 'none');
                                    mobile_start(schdeulerDrivers, externalService);
                                    $("#main-tab2-mobile").css('display', 'block');
                                    //clearValues();

                                }
                            });

                            $("#windows-planning-screen").css('display', 'none');
                            mobile_start(schdeulerDrivers, externalService);
                            $("#main-tab2-mobile").css('display', 'block');

                        }

                    }
                },
                error: function (error) {
                    console.error('Error fetching data:', error);
                }
            });
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });*/
    async function generateDropdownOptions(options, targetElement) {
        // Clear existing options
        $(targetElement).empty();

        // Add a default option
        /*$(targetElement).append($('<option>', {
            value: '',
            text: 'Select options here',
        }));*/

        // Add other options

        console.log(options);
        options.forEach(function (option) {

            let element = option

            $(targetElement).append($('<option>', {
                id: option.Id,
                text: option.Name,
            }));
        });


    }

    if (typeof jQuery === 'undefined' || typeof jQuery().mobiscroll === 'undefined') {
        console.error("jQuery or Mobiscroll is not loaded.");
        return;
    }

    mobiscroll.setOptions({
        //locale: mobiscroll.localeFr,
        theme: 'ios',
        themeVariant: 'light'
    });
    async function getOptionsWithTime(selectId) {
        // Select the element using jQuery
        const $selectElement = $(selectId);

        // Ensure the select element exists
        if ($selectElement.length === 0) {
            console.error(`Element with ID ${selectId} not found.`);
            return [];
        }
        return new Promise((resolve, reject) => {

            // Define the regex to match "dd-mm-yyyy hh:mm"
            const timeRegex = /\d{2}-\d{2}-\d{4} \d{2}:\d{2}/;
            const matchingOptions = [];

            // Iterate over each option element within the select element
            $selectElement.find('option').each(function () {
                const text = $(this).text();
                const match = text.match(timeRegex);
                if (match) {
                    matchingOptions.push({
                        value: $(this).val(),
                        text: match[0],
                        id: $(this).attr('id')// Store only the matched time string
                    });
                }
            });

            resolve(matchingOptions);
        });
    }

    function convertDate(str) {
        var date = new Date(str);

        // Pad month and day with leading zeroes if needed
        var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var year = date.getFullYear();

        // Pad hours and minutes with leading zeroes if needed
        var hours = ("0" + date.getHours()).slice(-2);
        var minutes = ("0" + date.getMinutes()).slice(-2);

        // Format the date and time
        return [day, mnth, year].join("-") + " " + [hours, minutes].join(":");
    }
    function formatDate(date) {
        // Get date components
        var day = date.getDate();
        var month = date.getMonth() + 1; // Month is zero-based, so add 1
        var year = date.getFullYear();

        // Add leading zeros if necessary
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        // Get time components
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        // Format time components with leading zeros
        hours = ('0' + hours).slice(-2);
        minutes = ('0' + minutes).slice(-2);
        seconds = ('0' + seconds).slice(-2);

        // Return formatted date and time string
        return day + '-' + month + '-' + year + ' ' + hours + ':' + minutes;
    }
    async function start(schedulerDrivers, externalService) {
        showOverlay();
        var showTrips = [];
        var allowDrag = true;
        var restoreEvent;
        var oldEvent;
       /* if (accessLevel <= 3) {
            allowDrag = false;
        }*/
        var testEvents=[
            {
                "id": 1,
                "code": "Planifié",
                "name": "a-Heures de travail planifiées",
                "level": 1,
                "overloadable": 0,
                "must_overload": 0,
                "request_from_to": 1,
                "request_duration": 1,
                "request_amount": 0,
                "request_comments": 0,
                "access_level": 4,
                "validation_level": 3,
                "color": "#888686",
                "validated_color": "#8bd2fd",
                "rejected_color": "#fd9d77",
                "valid": 1,
                "modified_by": "omailla",
                "time_stamp": "2024-11-08 12:02:10.517",
                "category_code": "TWORK"
            },
            {
                "id": 2,
                "code": "Heures supplémentaires",
                "name": "Heures supplémentaires",
                "level": 2,
                "overloadable": 1,
                "must_overload": 1,
                "request_from_to": 2,
                "request_duration": 2,
                "request_amount": 1,
                "request_comments": 1,
                "access_level": 3,
                "validation_level": 2,
                "color": "#ff6347",
                "validated_color": "#32cd32",
                "rejected_color": "#ff4500",
                "valid": 1,
                "modified_by": "jdoe",
                "time_stamp": "2024-11-09 13:00:00.123",
                "category_code": "TSUPP"
            },
            {
                "id": 3,
                "code": "Congé",
                "name": "Congé",
                "level": 1,
                "overloadable": 0,
                "must_overload": 0,
                "request_from_to": 1,
                "request_duration": 5,
                "request_amount": 0,
                "request_comments": 0,
                "access_level": 5,
                "validation_level": 4,
                "color": "#ff8c00",
                "validated_color": "#ffd700",
                "rejected_color": "#ff0000",
                "valid": 1,
                "modified_by": "mmartin",
                "time_stamp": "2024-10-25 09:00:00.234",
                "category_code": "TNOWORK"
            },
            {
                "id": 4,
                "code": "Formation",
                "name": "Formation",
                "level": 2,
                "overloadable": 0,
                "must_overload": 0,
                "request_from_to": 1,
                "request_duration": 4,
                "request_amount": 1,
                "request_comments": 1,
                "access_level": 6,
                "validation_level": 2,
                "color": "#4682b4",
                "validated_color": "#7fffd4",
                "rejected_color": "#ff1493",
                "valid": 1,
                "modified_by": "lboss",
                "time_stamp": "2024-11-01 10:30:00.567",
                "category_code": "TDRIVE"
            },
            {
                "id": 5,
                "code": "Urgence",
                "name": "Urgence",
                "level": 3,
                "overloadable": 1,
                "must_overload": 1,
                "request_from_to": 3,
                "request_duration": 1,
                "request_amount": 2,
                "request_comments": 0,
                "access_level": 2,
                "validation_level": 1,
                "color": "#32cd32",
                "validated_color": "#98fb98",
                "rejected_color": "#ff6347",
                "valid": 1,
                "modified_by": "aperez",
                "time_stamp": "2024-11-10 08:45:00.789",
                "category_code": "TURGE"
            }
        ]
       /* $.ajax({
            url: '/ManagerEvents/GetEventKinds',
            method: 'GET',
            success: function (data) {*/
                // console.log(data); // Log the data received from the server

        var mydata = null;
        mydata = testEvents
                    .filter(function (item) {
                        return item.valid == 1;
                    })
                    .map(function (item) {
                        return {
                            Code: item.code,
                            Name: item.name,
                            Level: item.level,
                            CategoryCode: item.categoryCode,
                            Id: item.id,
                            RequestAmount: item.requestAmount,
                            RequestComments: item.requestComments,
                            RequestDuration: item.requestDuration,
                            RequestFromTo: item.requestFromTo
                        };
                    });
                // generateDropdownOptions(mydata, '#event-name');
                eventsKind = mydata;
                console.log(eventsKind);
                var populate = eventsKind.map(event => {
                    return {
                        id: event.Id,
                        text: event.Name
                    };
                })
                $('#event-name').select2({
                    data: populate,
                    dropdownParent: $('#demo-add-popup'),
                    width: '365px',
                    /*dropdownCss: {
                        'max-height': '300px',  // Maximum height of the dropdown
                        'overflow-y': 'auto'    // Enable vertical scrolling
                    }*/

                });
                // Initialize the grid with new data
            
           /* error: function (xhr, textStatus, exception) {
                // Handle error response
                console.error('Error:', textStatus, exception);

            },
            complete: function () {*/
                hideOverlay();
           /* }

        });*/
        var NewEvent = languageobj.find(word => word.value == "NewEvent");
        var EditEvent = languageobj.find(word => word.value == "EditEvent");
        console.log(NewEvent);
        console.log(EditEvent);

        var Save = "Save"
        var Add = languageobj.find(word => word.value == "Add");
        var Cancel = languageobj.find(word => word.value == "Cancel");

        if (Cancel.text == "annuler") {

            Save = "Sauvegarder";
        }
        var $title = $('#event-title');
        var $driver = $('#event-driver');
        var $description = $('#event-desc');
        var $deleteButton = $('#event-delete');
        var $eventname = $('#event-name');
        var $amount = $('#amount-input');
        var $driverid = $('#event-driverid');
        var $eventassociate = $('#event-associate');
        var $days = $('#duration-days');
        var $hours = $('#duration-hours');
        var $mins = $('#duration-mins');

        var datestart;
        var dateend;


        var deleteEvent;
        var oldEvent;

        var $id = $("#event-id");
        var datePickerResponsive = {
            //locale: mobiscroll.localeFr,
            medium: {
                controls: ['calendar'],
                touchUi: false,
            },
        };
        var datetimePickerResponsive = {
            //locale: mobiscroll.localeFr,
            // locale: mobiscroll.localeFr,
            /*locale:{
                monthNamesShort: convertedshortmonths,
                dayNamesShort: converteddays,
                dayNamesMin: converteddayinitials,
                monthNames: convertedmonths,
            },*/

            medium: {
                controls: ['calendar', 'time'],
                //locale: mobiscroll.localeFr,
                touchUi: false,
            },
        };

        let Drivers = languageobj.find(word => word.value == "Drivers");
        let ExternalServiceHeader = languageobj.find(word => word.value == "ExternalServiceHeader");
        let UnconfirmedTripsHeader = languageobj.find(word => word.value == "UnconfirmedTripsHeader");
        let AcceptedTrips = languageobj.find(word => word.value == "AcceptedTrips");
        let UnacceptedTrips = languageobj.find(word => word.value == "UnacceptedTrips");
        let CancelledTrips = languageobj.find(word => word.value == "CancelledTrips");

        var myResources = [
            {
                id: 'driverId',
                name: Drivers.text,
                collapsed: false,
                eventCreation: true,
                children: schedulerDrivers
            },
            {
                id: 'externalId',
                name: ExternalServiceHeader.text,
                collapsed: false,
                eventCreation: false,
                children: externalService,
                rightclick: false
            },
            {
                id: 'tripId',
                name: UnconfirmedTripsHeader.text,
                collapsed: false,
                eventCreation: false,
                rightclick: false,
                children: [
                    {
                        id: 'U1',
                        name: AcceptedTrips.text,

                    },
                    {
                        id: 'U2',
                        name: UnacceptedTrips.text,


                    },
                    {
                        id: 'U3',
                        name: CancelledTrips.text,


                    }
                ]
            }
        ];
        var invalids = [
            {
                resource: ['U2', 'U3']
            },
        ];
        var invalidColor = [
            {
                resource: ['U2', 'U3'],
                background: '#1ad4041a'
            },
        ];
        async function showContextMenu(cell, event, resource) {
            showOverlay();
            console.log(schedulerDrivers);
            var driver = schdeulerDrivers.find(res => res.id === resource);

            var finaldate = JSON.stringify(event.date);

            sessionStorage.setItem('eventDate', finaldate);
            sessionStorage.setItem('driver', driver.name);
            sessionStorage.setItem('driverId', driver.id.slice(1));
            target = event.target;
           
            // Show the context menu at the mouse position
            popup.setOptions({
                headerText: NewEvent,
                buttons: [
                    Cancel.text,
                    {
                        text: Add.text,
                        keyCode: 'enter',
                        handler: function () {
                            popup2.close();
                        },
                        cssClass: 'mbsc-popup-button-primary',
                    },
                ],
            });
            popup2.setOptions({
                anchor: cell
            });
            hideOverlay();
            popup2.open()
        $("#popupMenu span").off('click').on("click", async function () {
            //var event = sessionStorage.getItem('addEvent');
            popup2.close();
            var date = sessionStorage.getItem('eventDate');
            var driver = sessionStorage.getItem('driver');
            var driverId = sessionStorage.getItem('driverId');
            let obj = await getTripAssociates(resource.slice(1), event.date, event.date, Cancel.text);
            generateDropdownOptions(obj, '#event-associate');
            dateOptions = await getOptionsWithTime('#event-associate');


            finaldate = JSON.parse(date);
            createAddPopup(target, finaldate, driver, driverId);
            var action = $("#popupMenu label").html();
            console.log(action);

        });
        }
        async function generateTooltipContent(args) {
            var eventData = args.event;

            var id = (eventData.id).charAt(0);
            if (id == 'T') {
                var tripid = eventData.id.slice(1);
                let obj = await getStatus(tripid);
                let statusname = obj.statusName;
                var tripSteps = eventData.tripStep;
                let start = eventData.start.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });

                var tooltipContent = "<div class='trip-list-col'>" + "<img class='icon-img m-r-10' src='/img/car.png' alt=''> <span>" + " (" + tripid + ") - " + eventData.mainpassenger +"    " + start + "</span></div><div class='trip-list-col tripstepcontainer'> <div class='tripstepcontainer'>";


                tripSteps.forEach(function (tripStep, index) {
                    var fromdatetime = new Date(tripStep.tripFromDate);
                    var todatetime = new Date(tripStep.tripToDate);
                    var fromtime = fromdatetime.toTimeString().split(' ')[0];
                    var totime = todatetime.toTimeString().split(' ')[0];
                    var fromdate = convertDate(tripStep.tripFromDate);
                    var todate = convertDate(tripStep.tripToDate);
                    var from = fromdate;
                    var to = todate;

                    tooltipContent += " <div class='trip-date-wrapper bottom-line' style='margin-bottom:0;'> <div class='trip-date-col'> <span>" + from + '<br> <b class="locations"> ' + tripStep.fromLocation.locationName + " </b><br> </span> </div>"
                    tooltipContent += "<div class='trip-date-col'> <img class='icon-img' src = '/img/arrow-back.png' alt = '' ></div> <div class='trip-date-col'> <span>" + to + '<br> <b class="locations"> ' + tripStep.toLocation.locationName + " </b><br> </span> </div></div><br>";
                });

                tooltipContent += '</div><div class="trip-date-wrapper"><div class="trip-general-footer">  <div class="add-more"> <div class="trip-wrapper">  <h4>' + linkPassenger + '</h4>  ';
                eventData.TPassengers.forEach(pass => {
                    tooltipContent += '<div><span class="trip-tool-row">' + pass + "</span></div>";
                });

                if (eventData.vehicleName !== null) {
                    tooltipContent += '<h4>' + ResearchVehicle + '</h4>';
                    tooltipContent += '<span class="trip-tool-row">' + eventData.vehicleName + "</span>";
                }
                tooltipContent += '<h4>' + ResearchStatus + '</h4>';
              /*  if (userData.status === 'Status Not Ready') {
                    $('#status').val(statNotReady);*/
                const statusMapping = {
                    'Status Not Ready': statNotReady,
                    'Status To Be Processed': statToBeProcessed,
                    'Accepted By Manager': acceptedManager,
                    'Rejected By Manager': rejectedManager,
                    'Cancelled By Manager': cancelledManager,
                    'Cancelled By Requestor': cancelledReq,
                    'Out Of Policy Rejected By ExternalService': outPolicyRejectExtService,
                    'Cancellation Confirmed': cancelConfirmed,
                    'Out Of Policy Cancellation Confirmed By ExternalService': outPolicyCancelConfExtService,
                    'Planified': planified,
                    'Waiting Driver Confirmation': waitDriverConf,
                    'Waiting ExternalService Confirmation': waitExtServiceConf,
                    'Out Of Policy Cancelled By Requestor': outPolicyCancelReq,
                    'Out Of Policy Waiting ExternalService Confirmation': outPolicyWaitExtServiceConf,
                    'Out Of Policy Cancelled By ExternalService': outPolicyCancelExtService,
                    'External Cancelled By Manager': extCancelManager,
                    // Uncomment these if needed
                    // 'Deleted': deleted,
                    // 'Updating By Requestor': updatingReq,
                    'Out Of Policy Updating By Requestor': outPolicyUpdateReq,
                    'External Reset By Manager': extResetManager
                };

                // Determine the status to set based on `statusname` or `userData.status`
                const statusToSet = statusMapping[statusname] || statusMapping[eventData.status];

                if (statusToSet !== undefined) {
                    // Append the status to statusname
                    const combinedStatusName = `${statusToSet} (${eventData.status})`;

                    // Set the combined status name in the tooltip or desired element
                    $('#status').val(statusToSet);
                    tooltipContent += `<span class="trip-tool-row">${combinedStatusName}</span></div></div></div>`;
                }

                $(".trip-list-row").html(tooltipContent);
                clearTimeout(timer);
                timer = null;
                triptooltip.setOptions({
                    anchor: args.domEvent.target.closest('.mbsc-timeline-event')

                });
                if (tooltip.isVisible()) {
                    tooltip.close();
                }
                triptooltip.open();

            }
            else {
                var tooltipContent = "   <div class=time-tool-col'> <span><img style='margin-top:0;width:20px; height:20px;' class='icon-img' src='/img/clock.png' alt=''>  </span></div>  <div class='time-tool-col''>   <div class='time-wrapper'> <h4> " + eventData.title + " </h4> ";
                var startdate = new Date(eventData.start);
                /*let start = eventData.start.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });*/
                var stringstart = convertDate(startdate.toString());

                var starttime = startdate.toTimeString().split(' ')[0];
                var startdandt = formatDate(startdate);
                var enddate = new Date(eventData.end);
                var stringend = convertDate(enddate.toString());
                var endtime = enddate.toTimeString().split(' ')[0];
                var duration = getDuration(startdate, enddate);
                var enddandt = formatDate(enddate);
                tooltipContent += "<div class='time-wrapper-col'>   <div class='time-wrapper-list' > <span> " + stringstart + " </span> <span>-</span> <span>" + stringend + "</span> </div>   </div >    <div class='time-wrapper-col'>   <div class='time-wrapper-list' ><span> " + DurationLabel +" : "+ duration + "</span> </div>  </div >  </div >";
                $(".time-tool-row").html(tooltipContent);
                clearTimeout(timer);
                timer = null;
                tooltip.setOptions({
                    anchor: args.domEvent.target.closest('.mbsc-timeline-event')

                });
                if (triptooltip.isVisible()) {
                    triptooltip.close();
                }
                tooltip.open();
            }

        }
        function getDuration(start, end) {
            var diff = end - start;  // Difference in milliseconds
            var hours = Math.floor(diff / 1000 / 60 / 60);  // Convert milliseconds to hours
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / 1000 / 60);  // Remaining minutes

            // Return formatted duration as "hh:mm"
            return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
        }
        var target;
        async function eventRightPopup(cell, args) {
            target = cell;
            $deleteButton.show();
            deleteEvent = false;
            var id = args.event.id;

            var finalid = id.charAt(0);
            if (args.event.id.charAt(0) == 'E') {
                var finaldate = JSON.stringify(args.event.start);

                sessionStorage.setItem('eventDate', finaldate);
                
            }
            args.event.start = new Date(args.event.start);
            args.event.end = new Date(args.event.end);
            $("#eventaddmenuoption").on('click', async function () {
                var driver = schdeulerDrivers.find(res => res.id === args.resource);
                eventpopup.close();

                let obj = await getTripAssociates(args.event.resource.slice(1), args.event.start, args.event.end, Cancel.text);
                console.log(obj);
                generateDropdownOptions(obj, '#event-associate');
                dateOptions = getOptionsWithTime('#event-associate');
                let driverid = driver.id.slice(1);
                let drivername = driver.name;

                createAddPopup(cell, args.date, drivername, driverid);
            })
            //args.event.target
            var test = JSON.stringify(args.event);
            let eventtarget = JSON.stringify(target);
            sessionStorage.setItem('event', test);
            sessionStorage.setItem('eventtarget', eventtarget);
            if (finalid === 'E') {

                // Show the context menu at the mouse position

                eventpopup.setOptions({
                    anchor: cell
                });
                tooltip.close();
                triptooltip.close();
                eventpopup.open()
            }
            else {

                var ev = args.event;
                if (typeof args.resource === 'string') {
                    if (args.resource.charAt(0) == 'D') {
                        var driver = schdeulerDrivers.find(res => res.id === args.resource);
                        var driverUserId = driver.userid;
                    }
                }

                var status = ev.status;
                var current = new Date();
                tooltip.close();
                triptooltip.close();
                var end = new Date(ev.end);
                var start = new Date(ev.start);
                $('#detail-action-btn').attr("data-id", ev.id.slice(1));
                sessionStorage.setItem('redirectTripId', parseInt(ev.id.slice(1)));

                $('.alertPrint').on('click', function () {
                    $('.permission').modal('show');
                    $('.permission').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('.permission').modal('hide');
                    }, 3000);
                    trippopup.close();
                });
                //let addEvent = languageobj.find(word => word.value === "AddEvent");
                // let detailsOfEvent = languageobj.find(word => word.value === "DetailsOfEvent");
                let deleteEvent = languageobj.find(word => word.value === "DeleteEvent");
                let cancelTrip = languageobj.find(word => word.value === "CancelTrip");
                //  let detailsofTrip = languageobj.find(word => word.value === "DetailsofTrip");
                let acceptTrip = languageobj.find(word => word.value === "AcceptTrip");
                let reinitiateTrip = languageobj.find(word => word.value === "ReinitiateTrip");
                let assignTrip = languageobj.find(word => word.value === "AssignTrip");
                let rejectTrip = languageobj.find(word => word.value === "RejectTrip");
                $(document).on('click', '#detail-action-btn', function () {
                    showOverlay();
                    trippopup.close();
                    $("#main-tab2").css('display', 'none');
                    $("#main-tab3").fadeIn();
                    $(".search-tab").hide();
                    $(".search-detail-tab").show();
                });
                $('#dynamicContent').html('');
                if (start > current && accessLevel > 3) {
                    if ((status == 2 || status == 4) && ev.resource == 'U2') {
                        var hiddendiv = '<div class="user-name-list-col" id="AcceptTrip">' +
                            '<img class="icon-img m-l-10" src="/img/check.png"  alt="details"/>' +
                            '<span>' + (acceptTrip ? acceptTrip.text : 'Accept Trip') + '</span>' +
                            '</div>';
                        hiddendiv += '<div class="user-name-list-col"   id="RejectTrip">' +
                            '<img class="icon-img m-l-10" src="/img/Close.png"  alt="details"/>' +
                            '<span>' + (rejectTrip ? rejectTrip.text : 'Reject Trip') + '</span>' +
                            '</div>';
                        $('#dynamicContent').html(hiddendiv);
                    }

                    if (status == 3) {
                        if (ev.resource == 'U1') {
                            var hiddendiv = '<div class="user-name-list-col"  id="CancelTrip">' +
                                '<img class="icon-img m-l-10" src="/img/cancel-event.png"  alt="details"/>' +
                                '<span>' + (cancelTrip ? cancelTrip.text : 'Cancel Trip') + '</span>' +
                                '</div>';

                            $('#dynamicContent').html(hiddendiv);
                        } else {
                            if (typeof ev.resource === 'number') {
                                var hiddendiv = '<div class="user-name-list-col"  id="AssignTrip">' +
                                    '<img class="icon-img m-l-10" src="/img/good-employee_69686.png"  alt="details"/>' +
                                    '<span>' + (assignTrip ? assignTrip.text : 'Assign Trip') + '</span>' +
                                    '</div>';
                                hiddendiv += '<div class="user-name-list-col"   id="RejectTrip">' +
                                    '<img class="icon-img m-l-10" src="/img/Close.png"  alt="details"/>' +
                                    '<span>' + (rejectTrip ? rejectTrip.text : 'Reject Trip') + '</span>' +
                                    '</div>';

                                $('#dynamicContent').html(hiddendiv);
                            } else if (ev.resource.charAt(0) == 'D') {
                                var hiddendiv = '<div class="user-name-list-col"  id="AssignTrip">' +
                                    '<img class="icon-img m-l-10" src="/img/good-employee_69686.png"  alt="details"/>' +
                                    '<span>' + (assignTrip ? assignTrip.text : 'Assign Trip') + '</span>' +
                                    '</div>';

                                hiddendiv += '<div class="user-name-list-col"  id="CancelTrip">' +
                                    '<img class="icon-img m-l-10" src="/img/cancel-event.png"  alt="details"/>' +
                                    '<span>' + (cancelTrip ? cancelTrip.text : 'Cancel Trip') + '</span>' +
                                    '</div>';

                                $('#dynamicContent').html(hiddendiv);
                            }
                        }
                    }
                    if (status == 6) {
                        var hiddendiv = '<div class="user-name-list-col"  id="AcceptTrip">' +
                            '<img class="icon-img m-l-10" src="/img/check.png"  alt="details"/>' +
                            '<span>' + (AcceptCancel ? AcceptCancel : 'Accept Cancellation') + '</span>' +
                            '</div>';
                        hiddendiv += '<div class="user-name-list-col"   id="RejectTrip">' +
                            '<img class="icon-img m-l-10" src="/img/Close.png"  alt="details"/>' +
                            '<span>' + (RejectCancel ? RejectCancel : 'Reject Cancellation') + '</span>' +
                            '</div>';
                        $('#dynamicContent').html(hiddendiv);
                    }
                    if (status == 11) {
                        var hiddendiv = '<div class="user-name-list-col"  id="AcceptTrip">' +
                            '<img class="icon-img m-l-10" src="/img/check.png"  alt="details"/>' +
                            '<span>' + (acceptTrip ? acceptTrip.text : 'Accept Trip') + '</span>' +
                            '</div>';
                        hiddendiv += '<div class="user-name-list-col"   id="RejectTrip">' +
                            '<img class="icon-img m-l-10" src="/img/Close.png"  alt="details"/>' +
                            '<span>' + (rejectTrip ? rejectTrip.text : 'Reject Trip') + '</span>' +
                            '</div>';
                        hiddendiv += '<div class="user-name-list-col"  id="CancelTrip">' +
                            '<img class="icon-img m-l-10" src="/img/cancel-event.png"  alt="details"/>' +
                            '<span>' + (cancelTrip ? cancelTrip.text : 'Cancel Trip') + '</span>' +
                            '</div>';
                        $('#dynamicContent').html(hiddendiv);
                    }
                    if (status == 12) {
                        var hiddendiv = '<div class="user-name-list-col"  id="ReinitiateTrip">' +
                            '<img class="icon-img m-l-10" src="/img/Initializing.png"  alt="details"/>' +
                            '<span>' + (reinitiateTrip ? reinitiateTrip.text : 'Reinitiate Trip') + '</span>' +
                            '</div>';
                        hiddendiv += '<div class="user-name-list-col"  id="CancelTrip">' +
                            '<img class="icon-img m-l-10" src="/img/cancel-event.png"  alt="details"/>' +
                            '<span>' + (cancelTrip ? cancelTrip.text : 'Cancel Trip') + '</span>' +
                            '</div>';
                        $('#dynamicContent').html(hiddendiv);
                    }

                    if (status == 10) {
                        var hiddendiv = '<div class="user-name-list-col"  id="ReinitiateTrip">' +
                            '<img class="icon-img m-l-10" src="/img/Initializing.png"  alt="details"/>' +
                            '<span>' + (reinitiateTrip ? reinitiateTrip.text : 'Reinitiate Trip') + '</span>' +
                            '</div>';
                        hiddendiv += '<div class="user-name-list-col"  id="CancelTrip">' +
                            '<img class="icon-img m-l-10" src="/img/cancel-event.png"  alt="details"/>' +
                            '<span>' + (cancelTrip ? cancelTrip.text : 'Cancel Trip') + '</span>' +
                            '</div>';
                        $('#dynamicContent').html(hiddendiv);
                    }
                }
                else if (start > current && accessLevel == 3) {
                    if (status == 11) {
                        if (parseInt(userId) == driverUserId) {
                            var hiddendiv = '<div class="user-name-list-col"  id="AcceptTrip">' +
                                '<img class="icon-img m-l-10" src="/img/check.png"  alt="details"/>' +
                                '<span>' + (acceptTrip ? acceptTrip.text : 'Accept Trip') + '</span>' +
                                '</div>';
                            hiddendiv += '<div class="user-name-list-col"   id="RejectTrip">' +
                                '<img class="icon-img m-l-10" src="/img/Close.png"  alt="details"/>' +
                                '<span>' + (rejectTrip ? rejectTrip.text : 'Reject Trip') + '</span>' +
                                '</div>';
                            $('#dynamicContent').html(hiddendiv);
                        }
                    }
                }

                $('#print-trip-planning').on('click', function () {
                    let tripid = sessionStorage.getItem('redirectTripId');
                    console.log('TripId->', tripid);
                    var languageId = $('#langugeId').val();
                    var isPlanning = true;
                    var reportNameEncoded;
                    if (languageId == 1) {
                        reportNameEncoded = "TripReviewPrint.trdp";
                    } else {
                        reportNameEncoded = "TripReviewPrint_FR.trdp";
                    }

                    //var reportNameEncoded = "TripReviewPrint.trdp";
                    var parameterString = "tripId=" + tripid + "&isPlanning=" + isPlanning + "&report=" + reportNameEncoded;
                    var url = "/Home/TelerikReport" + '?' + parameterString;
                    trippopup.close();
                    window.open(url, '_blank');
                });
               
                trippopup.setOptions({
                    anchor: cell
                });
                tooltip.close();
                triptooltip.close();
                trippopup.open()
            }

            $("#AcceptTrip").on('click', function () {
                trippopup.close();
                let key = sessionStorage.getItem('event');
                let event = JSON.parse(key);
                event.start = new Date(event.start);
                event.end = new Date(event.end);
                if (event.status == 2) {
                    event.color = 'red';
                    event.resource = 'U1';
                    event.status = 3;
                    event.dragBetweenResources = true;
                    calendar.updateEvent(event);
                }
                if (event.status == 6) {
                    showConfirmPopup1(CancelConfirmation);
                    $('#confirm-button1').on('click', function () {
                        event.start = new Date(event.start);
                        event.end = new Date(event.end);
                        event.vehicleName = null;
                        event.driverId = null;
                        //event.color = 'red';
                        event.status = 8;
                        //event.resource = 'U2';
                        event.dragBetweenResources = false;
                        calendar.removeEvent(event);
                        updateTripStatus(event);
                        hideConfirmPopup1();
                    });

                }
                if (event.status == 12 || event.status == 11) {
                    if ((typeof ev.resource) == 'number') {
                        event.externalServiceId = ev.resource;
                        event.color = 'green';
                        event.status = 10;
                    }
                    else if ((ev.resource).charAt(0) == 'D') {
                        event.driverId = parseInt(ev.resource.slice(1));
                        event.color = 'green';
                        event.status = 10;
                    }
                    event.dragBetweenResources = false;
                    calendar.updateEvent(event);
                }
                //calendar.updateEvent(event);
                updateTripStatus(event);


            });
            $("#AssignTrip").on('click', async function () {
                trippopup.close();
                let key = sessionStorage.getItem('event');
                let event = JSON.parse(key);
                //var isbusy=0;
                event.start = new Date(event.start);
                event.end = new Date(event.end);
                if (event.status == 3) {
                    if ((typeof event.resource) == 'number') {
                        event.externalServiceId = ev.resource;
                        event.status = 12;
                        event.color = 'yellow';
                    }
                    else if ((event.resource).charAt(0) == 'D') {
                        event.driverId = parseInt(ev.resource.slice(1));
                        //isbusy = await checkbusy(event.driverId, event.start, event.end);
                        event.color = 'yellow';

                        event.status = 11;
                    }
                    event.dragBetweenResources = false;
                }
                calendar.updateEvent(event);
                updateTripStatus(event);
                /*if (isbusy == 0) {

                }
                else {
                    console.log(isbusy);
                    $('#alert-delete-red').modal('show');
                    $('#alert-delete-red').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('#alert-delete-red').modal('hide');
                    }, 3000);
                }*/
            });
            $("#RejectTrip").on('click', function () {
                trippopup.close();
                let key = sessionStorage.getItem('event');
                let event = JSON.parse(key);
                if (event.status == 6) {
                    event.start = new Date(event.start);
                    event.end = new Date(event.end);
                    event.vehicleName = null;
                    event.color = 'red';
                    event.status = 3;
                    event.resource = 'U1';
                    event.dragBetweenResources = true;
                    calendar.updateEvent(event);
                    updateTripStatus(event);
                }
                else if (event.status == 11) {
                    event.start = new Date(event.start);
                    event.end = new Date(event.end);
                    event.vehicleName = null;
                    event.driverId = null;
                    event.color = 'red';
                    event.status = 3;
                    event.resource = 'U1';
                    event.dragBetweenResources = true;
                    calendar.updateEvent(event);
                    updateTripStatus(event);
                }
                else {

                    event.start = new Date(event.start);
                    event.end = new Date(event.end);
                    event.vehicleName = null;
                    event.driverId = null;
                    event.color = 'red';
                    event.status = 4;
                    //event.resource = 'U2';
                    event.dragBetweenResources = false;
                    calendar.removeEvent(event);
                    updateTripStatus(event);
                }



            });
            $("#ReinitiateTrip").on('click', function () {
                trippopup.close();
                let key = sessionStorage.getItem('event');
                let event = JSON.parse(key);
                event.start = new Date(event.start);
                event.end = new Date(event.end);
                event.driverId = null;
                event.color = 'red';
                event.externalServiceId = null;
                event.vehicleName = null;
                event.status = 3;
                event.resource = 'U1';
                event.dragBetweenResources = true;
                calendar.updateEvent(event);
                updateTripStatus(event);

            });
            $("#CancelTrip").on('click', function () {
                trippopup.close();
                showConfirmPopup1(DeleteTripPopup);
                $('#confirm-button1').on('click', function () {
                    let key = sessionStorage.getItem('event');
                    let event = JSON.parse(key);
                    event.start = new Date(event.start);
                    event.end = new Date(event.end);
                    event.status = 5;
                    event.color = "gray";
                    event.resource = null;
                    //event.resource = '';
                    event.dragBetweenResources = false;
                    calendar.removeEvent(event);
                    updateTripStatus(event);
                    hideConfirmPopup1();
                });
                //return;
            });

        $("#detailsEvent").on('click', async function () {
            eventpopup.close();
            let obj = await getTripAssociates(args.event.resource.slice(1), args.event.start, args.event.end, Cancel.text);
            console.log(obj);
            generateDropdownOptions(obj, '#event-associate');
            dateOptions = getOptionsWithTime('#event-associate');
            let key = sessionStorage.getItem('event')
            let event = JSON.parse(key);
            createEditPopup(event, target);

        });
        }



        $("#deleteEvent").on('click', function () {
            eventpopup.close();
            showConfirmPopup1(DeleteEventPopup);
            $('#confirm-button1').on('click', function () {
                let key = sessionStorage.getItem('event')
                let event = JSON.parse(key);
                calendar.removeEvent(event);
                deletefromdatabase(event);
                hideConfirmPopup1();
            });
            //createEditPopup(event, target);

        });
        function checkEventKind(value) {
            let check = eventsKind.find(event => event.Id == parseInt(value));

            var indexes = ['2', '8', '21', '22', '27', '71'];
            let obj = check.CategoryCode;
            if (obj == "TWORK" || obj == "TABSENCE") {
                $('#event-associate').val('');
                $('#event-associate').attr('disabled', 'disabled');
                let img = '<img class="icon-imgs m-l-10" style="margin-bottom:5px" src="/img/grayStar.png" alt="grayStar">';
                $('#star-icon').html(img);
            }
            else {

                $('#event-associate').removeAttr('disabled');
                let img = '<img class="icon-imgs m-l-10" id="setAssociate" style="margin-bottom:5px" src="/img/goldStar.png" alt="goldStar">';
                $('#star-icon').html(img);
            }
            function findClosestTrip(eventDate, options) {
                const eventDateObj = new Date(eventDate);
                let closestTrip = null;
                let minDifference = Infinity;
                if (options !== undefined) {

                    options.forEach(option => {
                        const tripDate = parseCustomDate(option.text);
                        const timeDifference = Math.abs(eventDateObj - tripDate);

                        if (timeDifference < minDifference) {
                            minDifference = timeDifference;
                            closestTrip = option;
                        }
                    });
                }

                return closestTrip;
            }
            function parseCustomDate(dateString) {
                // Split the date and time parts
                const [datePart, timePart] = dateString.split(' ');
                const [day, month, year] = datePart.split('-').map(Number);
                const [hours, minutes] = timePart.split(':').map(Number);

                // Note: Month is 0-indexed in JavaScript Date (0 = January, 11 = December)
                return new Date(year, month - 1, day, hours, minutes);
            }
            $("#setAssociate").on('click', function () {
                let data = JSON.parse(sessionStorage.getItem('eventDate'));
                let eventDate = new Date(data);

                // Get all options with time strings
                //const options = getOptionsWithTime('#event-associate');
                console.log(dateOptions);
                console.log(eventDate)
                // Find the closest trip
                const closestTrip = findClosestTrip(eventDate, dateOptions);

                if (closestTrip) {
                    $('#event-associate').val(closestTrip.value);
                    tempEvent.tripId = closestTrip.id
                } else {
                    document.getElementById('event-associate').value = '';
                }
                console.log('Closest Trip:', closestTrip);

            })
        };
        $('#mnuTripPlanning').on('click', function () {
            $("#main-tab2").css('display', 'block');
            $("#main-tab3").css('display', 'none');
            $(".search-tab").css('display', 'none');
            $(".search-detail-tab").css('display', 'none');
        })
        function SetSelectDropdownsPlanning(eventKindId) {


            console.log(eventKindId);
            let temp = eventsKind.find(event => event.Id == eventKindId);
            if (temp.RequestAmount == 0) {
                $('#amount-input').prop('disabled', true);
            } else {
                $('#amount-input').prop('disabled', false);
            }

            if (temp.RequestComments == 0) {
                $("#event-desc").prop('disabled', true);
            }
            else {
                $("#event-desc").prop('disabled', false);
            }

            if (temp.RequestDuration == 0) {
                $('#duration-days').prop('disabled', true);
                $('#duration-hours').prop('disabled', true);
                $('#duration-mins').prop('disabled', true);

            }
            else {
                $('#duration-days').prop('disabled', false);
                $('#duration-hours').prop('disabled', false);
                $('#duration-mins').prop('disabled', false);
            }

            if (temp.RequestFromTo == 0) {
                $('#start-input').prop('disabled', true);
                $('#end-input').prop('disabled', true);

            }
            else {
                $('#start-input').prop('disabled', false);
                $('#end-input').prop('disabled', false);
            }


        }
        function createAddPopup(target, date, driver, driverId) {
            // hide delete button inside add popup
            $deleteButton.hide();
            tempEvent = {};
            deleteEvent = true;
            restoreEvent = false;

            let assignevent = eventsKind[0];
            //$hours.val(1);
            count = 1;
            popup.setOptions({
                headerText: NewEvent.text,
                buttons: [
                    'cancel',
                    {
                        text: Add.text,
                        keyCode: 'enter',
                        handler: async function () {
                            tempEvent.driverId = driverId;


                            tempEvent.id = 0;
                            if (!tempEvent.eventkind) {
                                tempEvent.eventkind = assignevent.Id;
                            }
                           /* if (!tempEvent.name) {
                                tempEvent.name = assignevent.Name;
                            }*/
                            var code = eventsKind.find(event => tempEvent.eventkind == event.Id);
                            var eventOrder;
                            /*if (code.Id == 2) {
                                eventOrder = 1;
                            }
                            else {
                                eventOrder = 2;
                            }*/
                            tempEvent.order = code.Level;
                            tempEvent.name = code.Code;
                            var date = range.getVal();
                            tempEvent.start = date[0];
                            tempEvent.end = date[1];
                            console.log(tempEvent);
                            //let obj = await pushToDatabase(tempEvent);

                           // console.log(obj);
                            tempEvent.id = 'E' + count++;
                            tempEvent.color = "Blue";
                            tempEvent.dragBetweenResources = false,
                                tempEvent.dragInTime = false,

                                tempEvent.eventkindId = parseInt(tempEvent.eventkind);
                            tempEvent.title = tempEvent.name;
                            tempEvent.resource = 'D' + driverId;
                            // navigate the calendar to the correct view
                            calendar.addEvent(tempEvent);
                            calendar.navigateToEvent(tempEvent);



                            deleteEvent = false;
                            popup.close();

                        },
                        cssClass: 'mbsc-popup-button-primary',
                    },
                ],
            });
            //eventNames();
            $id.mobiscroll('getInst').value = "";
            $driver.val(driver);
            $driverid.mobiscroll('getInst').value = driverId;
            //$eventname.val(assignevent.Id).trigger('change');
            //$eventname.text(assignevent.Name);

            SetSelectDropdownsPlanning(parseInt(assignevent.Id));
            $eventname.removeAttr('disabled');
            $amount.val(0);
            $('#event-associate').val('');
            let img = '<img class="icon-imgs m-l-10" style="margin-bottom:5px" src="/img/grayStar.png" alt="grayStar">';
            $('#star-icon').html(img);
            $('#event-associate').attr('disabled', 'disabled');
            $description.val("");
            date = new Date(date);
            tempEvent.start = new Date(date);
            let hours = date.getHours();
            date.setHours(hours + 1)
            tempEvent.end = new Date(date);
            datestart = tempEvent.start;
            dateend = tempEvent.end;
            $hours.val(1);
            $days.val(0);
            $mins.val(0);
            range.setVal([tempEvent.start, tempEvent.end]);
            range.setOptions({
                controls: ['datetime'],
                responsive: datetimePickerResponsive,
            });
            popup.setOptions({ anchor: target });
            // generateDropdownOptions(eventKind, '#event-name');
            popup.open();
            rightclick = false;
        }
        function createEditPopup(args, target) {
            eventpopup.close();
            var ev = args;
            // show delete button inside edit popup
            $deleteButton.show();


            if (ev.start != null && ev.end != null) {
                let start = new Date(ev.start);
                let end = new Date(ev.end);
                var duration = calculateDuration(start, end);
                $days.val(duration.days);
                $hours.val(duration.hours);
                $mins.val(duration.minutes);
                console.log(duration);
            }
            deleteEvent = false;
            restoreEvent = true;
            popup.setOptions({
                headerText: EditEvent.text,
                buttons: [
                    'cancel',
                    {
                        text: Save,
                        keyCode: 'enter',
                        handler: async function () {
                            var date = range.getVal();
                            console.log($eventname.val());
                            let eventkindid = $eventname.val();

                            console.log(ev.title);
                            let kindname = eventsKind.find(e => e.Id === parseInt(eventkindid));
                            var eventOrder;
                            if (kindname.Id == 2) {
                                eventOrder = 1;
                            }
                            else {
                                eventOrder = 2;
                            }
                            //tempEvent.order = eventOrder;
                            var eventToSave = {
                                id: ev.id,
                                eventkind: eventkindid,
                                eventkindId: parseInt(eventkindid),
                                title: kindname.Code,
                                description: $description.val(),
                                start: date[0],
                                end: date[1],
                                resource: ev.resource,
                                order: eventOrder,
                                driverId: ev.resource.slice(1)
                            };

                            // update event with the new properties on save button click
                            var obj = await pushToDatabase(eventToSave);
                            eventToSave.color = obj.color;
                            calendar.updateEvent(eventToSave);
                            // navigate the calendar to the correct view
                            calendar.navigateToEvent(eventToSave);
                            restoreEvent = false;
                            popup.close();
                        },
                        cssClass: 'mbsc-popup-button-primary',
                    },
                ],
            });
            //  eventNames();
            // generateDropdownOptions(eventKind, '#event-name');
            var driver = schdeulerDrivers.find(res => res.id === ev.resource);
            $driver.val(driver.name);
            $amount.val(ev.amount || 0);
            $title.mobiscroll('getInst').value = ev.title || '';
            $description.val(ev.description || '');
            var Id = ev.id;
            console.log(ev.description);
            let name = eventsKind.find(e => e.Code === ev.title);
            console.log(name);
            checkEventKind(String(name.Id));
            //$eventname.attr('disabled','disabled');
            $eventname.val(name.Id).trigger('change');;
            //$eventname.attr('text',name.Name);
            SetSelectDropdownsPlanning(name.Id);
            console.log(ev);
            var optionId = ev.tripId || '';
            $eventassociate.find('option[id="' + optionId + '"]').prop('selected', true);
            $id.mobiscroll('getInst').value = Id.slice(1) || "";
            let evstart = new Date(ev.start);
            let evend = new Date(ev.end);
            range.setVal([evstart, evend]);
            range.setOptions({
                controls: ['datetime'],
                responsive: datetimePickerResponsive,
            });

            // set anchor for the popup
            popup.setOptions({ anchor: target });
            
            calendar.navigateToEvent(popup);
            popup.open();
        }

        document.getElementById('demo-work-order-scheduling').addEventListener("contextmenu", function (e) {
            e.preventDefault();
        })
        // var months = ['Janu', 'Februy', 'Mar', 'Aprl', 'My', 'June', 'July', 'Augst', 'Sepember', 'Octber', 'Novmber', 'Dcember']
        var currentYear;
        var currentMonth;
        var reloadDates = {};
        let tooltipTimeout;
        var rightclick = false;
        var instance;
        var mergedarray = [];
        /*  mobiscroll.settings = {
              locale: 'fr' // French locale
          };*/
        let Today = languageobj.find(word => word.value == "Today");
        var refreshStart;
        var refreshEnd;
        var cellClickDate;
        
        calendar = $('#demo-work-order-scheduling')
            .mobiscroll()
            .eventcalendar({
                /*var mergedarray = [],*/
                modules: [mobiscroll.print],
                clickToCreate: false,
                timeFormat: 'HH:mm',
                monthNamesShort: convertedshortmonths,
                dayNamesShort: converteddays,
                dayNamesMin: converteddayinitials,
                
                monthNames: convertedmonths,
    
                dragToMove: allowDrag,
                eventOverlap: true,
                todayText: Today.text,
                dragInTime: false,
                selectedDate: new Date(),
                controls: ['date'],
                dateFormat: 'DD.MM.YYYY',
               
                eventDelete: true,
              
                //resources: myResources,
               
                showEventTooltip: false,
                view: {
                    timeline: {
                        type: 'week',
                        timeCellStep: 120,
                        startDay: 1,
                        endDay: 0,
                        timeCellStep: 120,
                        eventHeight: 'variable',
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
                    /*  var dates = {
                          year: parseInt(Year),
                          month: parseInt(Month)
                      };
                      reloadDates = dates;*/
                    loadEvents(refreshStart, refreshEnd, inst);
                    //console.log(dates);
                    updateResources(instance);
                    //var day = event.firstDay.getDate();


                   




                },


                renderHeader: function () {
                    let week = languageobj.find(word => word.value == "Week");
                    let refresh = languageobj.find(word => word.value == "Refresh");
                    let Day = languageobj.find(word => word.value == "Day");
                    let Print = languageobj.find(word => word.value == "Print");
                    /*  let Drivers = languageobj.find(word => { word.value == "Drivers" });
                      let ExternalServiceHeader = languageobj.find(word => { word.value == "ExternalServiceHeader" });
                      let UnconfirmedTripsHeader = languageobj.find(word => { word.value == "UnconfirmedTripsHeader" });*/
                    // console.log(week);
                    if (enablePrint == true) {

                        return `
                                  <div class="btn btn-outline-gray"><img  src="/img/calendar.png" style="width:auto;height:19px"/>  <div mbsc-calendar-nav class="cal-header-nav" title="Calendar"></div></div>
                                    <div class="cal-header-picker">
                                        <label>${week.text}<input mbsc-segmented type="radio" name="view" value="week" class="md-change" id="weekRadio" checked></label>
                                        <label>${Day.text}<input mbsc-segmented type="radio" name="view" value="day" class="md-change" id="dayRadio"></label>
                                    </div>
                                    <div mbsc-calendar-prev class="cal-header-prev"></div>
                                    <div mbsc-calendar-today class="cal-header-today"></div>
                                    <div mbsc-calendar-next class="cal-header-next"></div>
                                    <div class="cal-header-week">
                                        <button id="calender-week" class="btn btn-outline-gray">
                                            <span>${CurrentWeek}</span>
                                        </button>
                                    </div>
                                    <div class="cal-header-print">
                                        <button id="calender-print" class="btn btn-outline-gray">
                                            <span>${Print.text}</span>
                                            <img class="icon-img m-l-10" src="/img/material-print.png" alt="Print">
                                        </button>
                                    </div>
                                    <div class="cal-header-refresh">
                                        <button id="refreshplanning" class="btn btn-outline-green">
                                            <span>${refresh.text}</span>
                                            <img class="icon-img m-l-10" src="/img/material-refresh.png" alt="Refresh">
                                        </button>
                                    </div>
                                `;
                    }
                    else {
                        return `
                                    <div class="btn btn-outline-gray"><img  src="/img/calendar.png" style="width:auto;height:19px"/>  <div mbsc-calendar-nav class="cal-header-nav" title="Calendar"></div></div>
                                    <div class="cal-header-picker">
                                        <label>${week.text}<input mbsc-segmented type="radio" name="view" value="week" class="md-change" id="weekRadio" checked></label>
                                        <label>${Day.text}<input mbsc-segmented type="radio" name="view" value="day" class="md-change" id="dayRadio"></label>
                                    </div>
                                    <div mbsc-calendar-prev class="cal-header-prev"></div>
                                    <div mbsc-calendar-today class="cal-header-today"></div>
                                    <div mbsc-calendar-next class="cal-header-next"></div>
                                     <div class="cal-header-week">
                                        <button id="calender-week" class="btn btn-outline-gray">
                                            <span>${CurrentWeek}</span>
                                        </button>
                                    </div>
                                    <div class="cal-header-print">
                                        <button class="btn btn-outline-gray" disabled>
                                            <span>${Print.text}</span>
                                            <img class="icon-img m-l-10" src="/img/material-print.png" alt="Print">
                                        </button>
                                    </div>
                                    <div class="cal-header-refresh">
                                        <button id="refreshplanning" class="btn btn-outline-green">
                                            <span>${refresh.text}</span>
                                            <img class="icon-img m-l-10" src="/img/material-refresh.png" alt="Refresh">
                                        </button>
                                    </div>
                                `;
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
                        /* console.log(todayFormatted);
                         console.log(formattedDate);*/
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
                    var firstid = data.id.charAt(0);
                    data.slot = data.original.order;
                    let current = new Date();
                    /*if (calendar._rangeType == 'week') {*/
                    //console.log(data);
                    if (firstid == 'E') {
                        let kind = eventsKind.find(ele => ele.Id == data.original.eventkindId);
                        //console.log(eventsKind);
                        if (kind !== undefined && kind.CategoryCode !== undefined) {
                            if (kind.CategoryCode == 'TNODRIVE') {

                                return ("<div class='event-planning'><img src='/img/cut steering.png'>" + '<h6 style="color=black" class="trip-heading">' + data.html + '</h6></div>');
                                /*return ("<div class='event-planning'><img src='/img/icons8-steering-wheel-24.png'></div>");*/
                            }

                            else if (kind.CategoryCode == 'TDRIVE') {

                                return ("<div class='event-planning'><img src='/img/icons8-steering-wheel-24.png'>" + '<h6 style="color=black" class="trip-heading">' + data.html + '</h6></div>');
                            }
                            else if (kind.CategoryCode == 'TRESERVE') {

                                return ("<div class='event-planning'><img src='/img/hourglass.png'>" + '<h6 style="color=black" class="trip-heading">' + data.html + '</h6></div>');
                            }
                            else {
                                return ("<div class='event-planning'>" + '<h6 style="color=black" class="trip-heading">' + data.html + '</h6></div>');
                            }
                        }
                    }
                    else {
                        var trip = data.original.tripStep;
                        var length = trip.length;
                        if (length > 0) {
                            /* $('.mbsc-schedule-event-inner > .mbsc-schedule-event-title + .mbsc-schedule-event-range').hide();*/
                            if (data.original.status == 11 || data.original.status == 12 || data.original.status == 10 || data.original.status == 5) {
                                if (data.original.vip == false) {

                                    return (

                                        "<div class='mbsc-schedule-event-title'><span style='display: flex;'>" +

                                        '<span class="img-trip"><img class="icon-img m-r-10" src="/img/car.png" alt=""></span>' +
                                        '<h6  style="color=black" class="trip-heading">' + data.html + '</h6></span></div><div class="mbsc-event-prop">' +
                                        '<span>' + trip[0].fromLocation.locationName + '</span>   ' + '<img class="icon-img" src="/img/arrow-back.png" alt="">' + '<span>     ' + trip[length - 1].toLocation.locationName + '</span></div>'




                                    );
                                }
                                else {
                                    return (

                                        "<div class='mbsc-schedule-event-title'><span style='display: flex;'>" +

                                        '<span class="img-trip"><img class="icon-img m-r-10" src="/img/vip.png" alt="" style=" height: 19px;"></span>' +
                                        '<h6  style="color=black" class="trip-heading">' + data.html + '</h6></span></div><div class="mbsc-event-prop">' +
                                        '<span>' + trip[0].fromLocation.locationName + '</span>   ' + '<img class="icon-img" src="/img/arrow-back.png" alt="">' + '<span>     ' + trip[length - 1].toLocation.locationName + '</span></div>'




                                    );
                                }
                            }
                            else if (data.original.start > current && (data.original.status == 3 || data.original.status == 6 || data.original.status == 2)) {
                                if (data.original.vip == false) {
                                    return '<div class="mbsc-schedule-event-title">' +
                                        '<div class="blinking-gif-container">' +
                                        '<img class="blinking-gif" src="/img/gifmake_1718356874.gif" alt="">' +
                                        '</div><span style="display: flex;"><span class="img-trip">' +
                                        '<img class="icon-img m-r-10" src="/img/car.png" alt=""></span>' +
                                        '<h6 style="color: black;" class="trip-heading">' + data.html + '</h6> </span></div><div class="mbsc-event-prop">' +

                                        '<span>' + trip[0].fromLocation.locationName + '</span>' +
                                        '<img class="icon-img" src="/img/arrow-back.png" alt="">' +
                                        '<span>' + trip[length - 1].toLocation.locationName + '</span>' +
                                        '</div>';
                                }
                                else {
                                    return '<div class="mbsc-schedule-event-title">' +
                                        '<div class="blinking-gif-container">' +
                                        '<img class="blinking-gif" src="/img/gifmake_1718356874.gif" alt="">' +
                                        '</div><span style="display: flex;"><span class="img-trip">' +
                                        '<img class="icon-img m-r-10" src="/img/vip.png" alt="" style=" height: 19px;"></span>' +
                                        '<h6 style="color: black;" class="trip-heading">' + data.html + '</h6> </span></div><div class="mbsc-event-prop">' +

                                        '<span>' + trip[0].fromLocation.locationName + '</span>' +
                                        '<img class="icon-img" src="/img/arrow-back.png" alt="">' +
                                        '<span>' + trip[length - 1].toLocation.locationName + '</span>' +
                                        '</div>';
                                }

                            }
                            else {
                                if (data.original.vip == false) {

                                    return (

                                        "<div class='mbsc-schedule-event-title'>" +

                                        '<span style="display: flex;"><span class="img-trip"><img class="icon-img m-r-10" src="/img/car.png" alt=""></span>' +
                                        '<h6  style="color=black" class="trip-heading">' + data.html + '</h6> <span></div><div class="mbsc-event-prop">' +
                                        '<span>' + trip[0].fromLocation.locationName + '</span>   ' + '<img class="icon-img" src="/img/arrow-back.png" alt="">' + '<span>     ' + trip[length - 1].toLocation.locationName + '</span></div>'




                                    );

                                }
                                else {
                                    return (

                                        "<div class='mbsc-schedule-event-title'>" +

                                        '<span style="display: flex;"><span class="img-trip"><img class="icon-img m-r-10" src="/img/vip.png" alt="" style=" height: 19px;"></span>' +
                                        '<h6  style="color=black" class="trip-heading">' + data.html + '</h6> <span></div><div class="mbsc-event-prop">' +
                                        '<span>' + trip[0].fromLocation.locationName + '</span>   ' + '<img class="icon-img" src="/img/arrow-back.png" alt="">' + '<span>     ' + trip[length - 1].toLocation.locationName + '</span></div>'




                                    );
                                }
                            }

                        } else {
                            if (data.original.vip == false) {

                                return (
                                    "<div class='event-planning'>" +

                                    '<span class="img-trip"><img class="icon-img m-r-10" src="/img/car.png" alt=""></span>' +
                                    '<h6  style="color=black" class="trip-heading">' + data.html + '</h6>' +
                                    '</div>'
                                );
                            }
                            else {
                                return (
                                    "<div class='event-planning'>" +

                                    '<span class="img-trip"><img class="icon-img m-r-10" src="/img/vip-card.png" alt=""></span>' +
                                    '<h6  style="color=black" class="trip-heading">' + data.html + '</h6>' +
                                    '</div>'
                                );
                            }
                        }
                    }

                },

                onCellRightClick: function (args) {
                    //let scrollPosition = saveScrollPosition();
                    rightclick = true;
                    if (typeof args.resource !== 'number') {

                        if (args.resource.charAt(0) == 'D') {
                            tempEvent = args.event;
                            //createAddPopup(args,args.target);
                            showContextMenu(args.target, args, args.resource);
                        }
                    }
                    // restoreScrollPosition(scrollPosition);
                },
                onCellClick: function (args) {
                    console.log(args.date);
                    cellClickDate = new Date(args.date);

                },
                onEventCreate: function (args) {
                    ev = args.event;
                    pushToDatabase(ev);
                },
                onEventClick: function (args) {
                    rightclick = true;
                    tempEvent = args.event;
                    console.log(tempEvent);
                },
                onEventHoverIn: function (args) {
                    // let scrollPosition = saveScrollPosition();
                    clearTimeout(timer);
                    if (!rightclick) {
                        timer = setTimeout(() => {
                            generateTooltipContent(args);
                        }, 1000); // Show tooltip after 3 seconds
                    }
                    //restoreScrollPosition(scrollPosition);
                },
                onEventHoverOut: function () {
                    // let scrollPosition = saveScrollPosition();
                    rightclick = false;
                    tooltip.close(); // Hide tooltip on hover out
                    triptooltip.close();
                    clearTimeout(timer);
                    // restoreScrollPosition(scrollPosition);
                },
                onEventDoubleClick: async function (args) {
                    // let scrollPosition = saveScrollPosition();
                    tooltip.close();
                    triptooltip.close();
                    rightclick = true;
                    oldEvent = $.extend({}, args.event);
                    tempEvent = args.event;
                    console.log(tempEvent);
                    let tar = args.domEvent.currentTarget || args.domEvent.target;
                    if (args.event.id.charAt(0) == 'E') {
                        var finaldate = JSON.stringify(args.event.start);

                        sessionStorage.setItem('eventDate', finaldate);
                        let obj = await getTripAssociates(args.event.resource.slice(1), args.event.start, args.event.end, Cancel.text);
                        generateDropdownOptions(obj, '#event-associate');
                        dateOptions = await getOptionsWithTime('#event-associate');
                        createEditPopup(tempEvent, tar);


                       


                       
                    }
                    else {
                        var id = parseInt(args.event.id.slice(1));
                        rightclick = true;
                        triptooltip.close();
                        console.log(id);
                        $("#main-tab2").css('display', 'none');
                        $("#main-tab3").fadeIn();
                        $(".search-tab").hide();
                        $(".search-detail-tab").show();
                        $('#statusBottom').hide();
                        showOverlay();
                        if (typeof window.loadResearcherScreen === 'function') {
                            setTimeout(function () {
                                
                                loadResearcherScreen(id);
                            }, 400);

                        }
                    }
                    //restoreScrollPosition(scrollPosition);
                },
                onEventRightClick: function (args) {
                    //let scrollPosition = saveScrollPosition();
                    tooltip.close();
                    triptooltip.close();
                    rightclick = true;
                    oldEvent = $.extend({}, args.event);
                    tempEvent = args.event;
                    let tar = args.domEvent.currentTarget || args.domEvent.target;

                  

                        eventRightPopup(tar, args);
                  
                    //restoreScrollPosition(scrollPosition);
                },
                onCellDoubleClick: async function (args) {
                    //let scrollPosition = saveScrollPosition();
                    rightclick = true;
                    if (typeof args.resource !== 'number') {

                        if (args.resource.charAt(0) == 'D') {
                            tempEvent = args.event;
                            /* tempEvent.start = args.date;
                             tempEvent.resource = args.resource;*/
                            var resource = args.resource;
                            var driver = schdeulerDrivers.find(res => res.id === resource);

                            //target = cell;
                            var finaldate = JSON.stringify(args.date);

                            sessionStorage.setItem('eventDate', finaldate);
                            let obj = await getTripAssociates(resource.slice(1), args.date, args.date, Cancel.text);
                            generateDropdownOptions(obj, '#event-associate');
                            dateOptions = await getOptionsWithTime('#event-associate');
                            createAddPopup(args.target, args.date, driver.name, resource.slice(1));
                        };
                    }
                    //restoreScrollPosition(scrollPosition);
                    console.log(args);
                },
                /*  onEventClick: function (args) {
                      oldEvent = args.event;
                  },*/
                onEventDragStart: function (args) {
                    //saveScrollPosition();
                    let ev = args.event;
                    oldEvent = ev;
                    rightclick = true;
                    /*
                    if (ev.id !== null) {
                        calendar.setOptions({
                            invalid: invalids,
                            colors: invalidColor,
                        });
                    }*/
                    triptooltip.close();
                    setTimeout(function () {
                        triptooltip.close();
                    }, 200);
                    tooltip.close();
                    // restoreScrollPosition();
                },
                onEventDragEnd: async function (args) {
                    triptooltip.close();
                    tooltip.close();
                    rightclick = false;
                    let currentev = args.event;
                    var ComparsionTrips = JSON.parse(sessionStorage.getItem('Comparison'));
                    oldEvent = ComparsionTrips.find(trip => trip.id == currentev.id);
                    console.log(oldEvent);
                    if (currentev.resource == 'U2' || currentev.resource == 'U3') {
                        oldEvent.end = new Date(oldEvent.end);
                        oldEvent.start = new Date(oldEvent.start);
                        calendar.updateEvent(oldEvent);
                    }
                    calendar.setOptions({
                        invalid: [],
                        colors: [],
                    });
                    if ((typeof currentev.resource) == 'number') {
                        currentev.externalServiceId = currentev.resource;
                        currentev.driverid = null;

                        // ev.vehicleName = getVehicleDetails(ev.driverId);
                        calendar.updateEvent(currentev);
                        updateTripStatus(currentev);
                    }
                    else if (currentev.resource.charAt(0) == 'D') {
                        currentev.driverId = parseInt(currentev.resource.slice(1));
                        currentev.externalServiceId = null;
                        currentev.vehicleName = await getVehicleDetails(currentev.driverId);
                        calendar.updateEvent(currentev);
                        updateTripStatus(currentev);
                    }
                },
            })
            .mobiscroll('getInst');
        function updateResources(inst) {
            if (typeof inst !== 'undefined' && inst) {
                console.log("Updating resources...");
                /*inst.setOptions({
                    resources: myResources,
                });*/
                getWorkingHours(schdeulerDrivers, inst);
            } else {
                console.error("Calendar is not initialized.");
            }
        }
        function getCalendarEvents(inst) {
            return new Promise((resolve, reject) => {
                //var inst
                // Retry if the calendar is not yet initialized
                if (typeof inst !== 'undefined' && inst) {
                    const events = inst.getEvents();
                    resolve(events);
                } else {
                    console.warn("Calendar is not initialized yet, retrying in 100ms...");
                    setTimeout(() => {
                        getCalendarEvents().then(resolve).catch(reject);
                    }, 100);
                    /*  console.warn("Calendar not ready, retrying in 100ms...");
                      setTimeout(() => {
                          getCalendarEvents().then(resolve).catch(reject);
                      }, 100);*/
                }
            });
        }
        async function getWorkingHours(drivers, inst) {
            try {
                console.log(inst);
                let start = inst._firstDay;
                //let end = inst._lastDay;
                let rangeType = inst._rangeType;
                console.log("start", start);
                console.log("end", rangeType);
                let events = [];
                let dayevents = [];
                if (rangeType !== "day") {
                    events = await getCalendarEvents(inst);
                } else {
                    dayevents = await getCalendarEvents(inst);
                    let active = inst._active;
                    const activedate = new Date(active);

                    // Initialize TWORK hours per driver
                    drivers.forEach(driver => {
                        driver.dayEventHours = 0;
                    });

                    // Filter and calculate TWORK hours per driver for the active day
                    dayevents.forEach(event => {
                        const kind = eventsKind.find(ele => ele.Id === event.eventkindId);
                        if (!kind || kind.CategoryCode !== "TWORK") {
                            return;
                        }

                        const startDate = new Date(event.start);
                        const endDate = new Date(event.end);

                        if (isNaN(startDate) || isNaN(endDate)) {
                            return;
                        }

                        const durationMillis = endDate - startDate;
                        const durationHours = durationMillis / (1000 * 60 * 60);

                        // Ensure the event has a valid resource ID and update the corresponding driver
                        const resourceId = (typeof event.resource === 'string')
                            ? (event.resource.startsWith("E") ? event.resource.slice(1) : event.resource)
                            : event.resource.toString();

                        const driver = drivers.find(d => d.id === resourceId);

                        if (driver && !isNaN(durationHours) && durationHours > 0) {
                            driver.dayEventHours += durationHours;
                        }
                    });

                    // Format the dayEventHours for each driver
                    drivers.forEach(driver => {
                        driver.dayEventHours = formatEventHours(driver.dayEventHours);
                    });
                    const weekStart = new Date(activedate);
                    const dayOfWeek = weekStart.getDay();
                    weekStart.setDate(weekStart.getDate() - dayOfWeek);
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 6);

                    events = await TestMobileWeekEvents(weekStart, weekEnd);
                }


                console.log("Drivers List:", drivers);

                // Initialize drivers with totalEventHours and remainingHours
                const driversMap = new Map(drivers.map(driver => {
                    driver.totalEventHours = 0;
                    driver.remainingHours = driver.weeklyHours; // Default to 40 hours if not defined
                    return [driver.id, driver];
                }));

                // Iterate through each event
                events.forEach(event => {
                    if (!event.id || !event.resource || !event.start || !event.end) {
                        // console.warn(`Skipping invalid event:`, event);
                        return;
                    }

                    // Ensure event.resource is a string
                    const resourceId = (typeof event.resource === 'string')
                        ? (event.resource.startsWith("E") ? event.resource.slice(1) : event.resource)
                        : event.resource.toString();

                    //  console.log(`Processing event ${event.id} for resourceId: ${resourceId}`);

                    const driver = driversMap.get(resourceId);

                    if (!driver) {
                        // console.warn(`No matching driver found for resource ID: ${resourceId}`);
                        return;
                    }

                    // Find the event kind and check if it's a "TWORK" category
                    const kind = eventsKind.find(ele => ele.Id === event.eventkindId);
                    if (!kind || kind.CategoryCode !== "TWORK") {
                        //  console.log(`Skipping non-working event: ${event.id}`);
                        return;
                    }

                    // Parse the start and end dates
                    const startDate = new Date(event.start);
                    const endDate = new Date(event.end);

                    if (isNaN(startDate) || isNaN(endDate)) {
                        // console.warn(`Invalid date for event ${event.id}: start=${event.start}, end=${event.end}`);
                        return;
                    }

                    // Calculate the duration in hours
                    const durationMillis = endDate - startDate;
                    const durationHours = durationMillis / (1000 * 60 * 60);

                    if (isNaN(durationHours) || durationHours <= 0) {
                        //  console.warn(`Invalid duration for event ${event.id}: durationHours=${durationHours}`);
                        return;
                    }

                    //console.log(`Adding ${durationHours.toFixed(2)} hours to driver ${driver.id}`);

                    // Update the totalEventHours and remainingHours
                    driver.totalEventHours += durationHours;
                    driver.remainingHours -= durationHours;
                });

                // Format the hours for each driver
                drivers.forEach(driver => {
                    //console.log(`Driver ${driver.id}: Total Event Hours=${driver.totalEventHours}, Remaining Hours=${driver.remainingHours}`);
                    driver.totalEventHours = formatEventHours(driver.totalEventHours);
                    driver.remainingHours = formatEventHours(driver.remainingHours);
                });

                // Define resources for the instance
                const myResources = [
                    {
                        id: 'driverId',
                        name: Drivers.text,
                        collapsed: false,
                        eventCreation: true,
                        children: drivers,
                    },
                    {
                        id: 'externalId',
                        name: ExternalServiceHeader.text,
                        collapsed: false,
                        eventCreation: false,
                        children: externalService,
                        rightclick: false,
                    },
                    {
                        id: 'tripId',
                        name: UnconfirmedTripsHeader.text,
                        collapsed: false,
                        eventCreation: false,
                        rightclick: false,
                        children: [
                            { id: 'U1', name: AcceptedTrips.text },
                            { id: 'U2', name: UnacceptedTrips.text },
                            //{ id: 'U4', name: IncompleteTrips },
                            { id: 'U3', name: CancelledTrips.text },
                        ],
                    },
                ];

                // Set the resources for the instance
                inst.setOptions({
                    resources: myResources,
                    renderResource: function (resource) {
                        const resourceId = String(resource.id);

                        if (resourceId.startsWith('D')) {
                            const weeklyHours = parseFloat(resource.weeklyHours) || 0;
                            const totalEventHours = resource.totalEventHours || '00:00';
                            const remainingHours = resource.remainingHours || '00:00';
                            const dayEventHours = resource.dayEventHours || '00:00';

                            const showRemainingHours = weeklyHours > 0 && parseFloat(totalEventHours) <= weeklyHours;
                            const remainingHoursText = showRemainingHours ? `[ ${remainingHours} ]` : '';

                            const dayEventText = rangeType === "day" ? `(${dayEventHours})` : '';

                            return `
    <div class="md-resource-header md-resource-details-name">
        ${resource.name}
        <br><p class="resourceHours">${dayEventText} [ 
        ${totalEventHours} / 
        ${weeklyHours || '0'} ] ${remainingHoursText}
        </p>
    </div>
`;
                        } else {
                            return `<div class="md-resource-header md-resource-details-name">${resource.name}</div>`;
                        }
                    }


                });


            } catch (error) {
                console.error("Error getting working hours:", error);
            }
        }
        function formatEventHours(hours) {
            if (!hours || hours <= 0) {
                return "00:00";
            }
            const totalMinutes = Math.round(hours * 60);
            const hoursPart = Math.floor(totalMinutes / 60);
            const minutesPart = totalMinutes % 60;

            return `${String(hoursPart).padStart(2, '0')}:${String(minutesPart).padStart(2, '0')}`;
        }
        $('#calender-print').on('click', function () {
            if (enablePrint == true) {

                calendar.print();
            }
            else {
                $('.permission').modal('show');
                $('.permission').fadeIn();
                // Delay for 5 seconds
                setTimeout(function () {
                    $('.permission').modal('hide');
                }, 3000);
            }
        }),

            $('.md-change').on("change", function (ev) {
                console.log('clicked value', ev.target.value);

                // Select the element you're targeting for width changes
                var calendarContainer = $('#demo-work-order-scheduling');

                switch (ev.target.value) {
                    case 'week':
                        calendar.setOptions({
                            view: {
                                timeline: {
                                    type: 'week',
                                    startDay: 1,
                                    endDay: 0,
                                    timeCellStep: 120, // Adjust as needed
                                    eventHeight: 'variable',
                                }
                            }
                        });
                        // Unset the width (uncommented)
                        calendarContainer.css('width', 'fit-content');
                        break;

                    case 'day':
                        calendar.setOptions({
                            view: {
                                timeline: {
                                    type: 'week',
                                    startDay: 1,
                                    endDay: 0,
                                    timeCellStep: 120, // Adjust as needed
                                    eventHeight: 'variable',
                                }
                            }
                        });
                        if (cellClickDate != null) {
                            calendar.navigate(cellClickDate);
                        }
                        // Set the width back to auto or comment it out
                        calendarContainer.css('width', '');  // or calendarContainer.css('width', 'auto'); if you prefer
                        break;
                }
            });

        $('.cal-header-today').off('click').on('click', function () {
            const weekRadio = $('#weekRadio');
            const dayRadio = $('#dayRadio');

            $('#weekRadio').prop('checked', false);
            $('#dayRadio').prop('checked', true).trigger('change');
          //  $('#dayRadio').css('backgrou', true);
            if (weekRadio.checked) {
                weekRadio.style.backgroundColor = 'white';
                dayRadio.style.backgroundColor = ''; // Reset dayRadio background
            }

            // If the dayRadio is checked, change its background to white and reset weekRadio
            if (dayRadio.checked) {
                dayRadio.style.backgroundColor = 'white';
                weekRadio.style.backgroundColor = ''; // Reset weekRadio background
            }
            // Trigger the change event manually to update the calendar
            /*$('#dayRadio').trigger('change');
            $('#dayRadio').mbscSegmented('refresh');*/
        });
           popup = $('#demo-add-popup')
            .mobiscroll()
            .popup({
                display: 'center',
                contentPadding: false,
                focusOnOpen:true,
                fullScreen: true,
                onClose: function () {
                    if (deleteEvent) {
                        calendar.removeEvent(tempEvent);

                    }
                    else if (restoreEvent) {
                        calendar.updateEvent(oldEvent);
                    }
                },
                onOpen: function (args) {
                    //calendar.navigateToEvent(args.event);
                    // Scroll to the popup when it is shown
                    /*const $popupElement = $(this); // 'this' refers to the current popup instance
                    $('html, body').animate({
                        scrollTop: $popupElement.offset().top // Scroll to the top of the popup
                    }, 500); // Adjust duration as needed (in milliseconds)*/
                },
                responsive: {
                    medium: {
                        display: 'center',
                        width: 600,
                        fullScreen: false,
                        touchUi: false,
                    },
                },
            })
            .mobiscroll('getInst');
        tooltip = $('.time-tool')
            .mobiscroll()
            .popup({
                display: 'anchored',
                contentPadding: false,
                scrollLock: false,
                showOverlay: false,
                touchUi: false,


            })
            .mobiscroll('getInst');
        triptooltip = $('.driver-tooltip')
            .mobiscroll()
            .popup({
                display: 'anchored',
                contentPadding: false,
                scrollLock: false,
                showOverlay: false,
                touchUi: false,
                maxHeight: null


            })
            .mobiscroll('getInst');
        trippopup = $('#tripPopupMenu')
            .mobiscroll()
            .popup({
                display: 'bottom',
                contentPadding: false,
                fullScreen: true,

                responsive: {
                    medium: {
                        display: 'anchored',
                        width: 200,
                        fullScreen: false,
                        touchUi: false,
                    },
                },
            })
            .mobiscroll('getInst');
        $('#tooltipContainer').on("mouseenter", function () {
            //triptooltip.close();
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        });
        $('#tooltipContainer').on("mouseleave", function () {
            timer = setTimeout(function () {
                triptooltip.close();
            }, 200);
        });
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
        popup2 = $('#popupMenu')
            .mobiscroll()
            .popup({
                display: 'bottom',
                contentPadding: false,
                fullScreen: true,

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
        eventpopup = $('#eventPopupMenu')
            .mobiscroll()
            .popup({
                display: 'bottom',
                contentPadding: false,
                fullScreen: true,

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
        $eventname.on('change', function () {
            // update current event's title

            var selectedIndex = this.selectedIndex;
            var selectedOption = this.options[selectedIndex];
            tempEvent.name = selectedOption.innerHTML;
            tempEvent.eventkind = this.value;
            console.log(tempEvent.eventkind)
            SetSelectDropdownsPlanning(tempEvent.eventkind);
            checkEventKind(this.value);

        });
        $eventassociate.on('change', function () {
            // update current event's title


            var selectedOption = this.options[this.selectedIndex];
            tempEvent.tripId = selectedOption.id;
            console.log(tempEvent.tripId);

        });
        $amount.on('keypress', function (event) {
            var charCode = event.which || event.keyCode;
            if (charCode == 45 || charCode == 101 || charCode == 69) {
                event.preventDefault();
            }
        })
        $amount.on('input', function (ev) {
            /* var charCode = event.which || event.keyCode;
             if (charCode == 45) {
                 // Prevent the default action if it's not a letter or space
                 event.preventDefault();
             }*/
            tempEvent.amount = ev.target.value;
            console.log(tempEvent);
        })
        $description.on('input', function (ev) {
            // update current event's title
            tempEvent.description = ev.target.value;
        });


        range = $('#event-date')
            .mobiscroll()
            .datepicker({

                controls: ['date'],
                select: 'range',
                timeFormat: 'HH:mm',
                dateFormat: 'DD.MM.YYYY',
                startInput: '#start-input',
                endInput: '#end-input',
                showRangeLabels: false,

                touchUi: true,
                responsive: datePickerResponsive,
                onChange: function (args) {
                    var date = args.value;

                    // update event's start date
                    if (date) {
                        tempEvent.start = date[0];
                        if (date[1] != null) {

                            tempEvent.end = date[1];
                        }
                        else {
                            var startDate = new Date(date[0]);

                            // Create a new date object for end date, adding 1 hour
                            var endDate = new Date(startDate.getTime() + 1 * 60 * 60 * 1000); // Adding 1 hour in milliseconds

                            // Set date[1] to the new end date
                            var formattedEndDate = endDate.toLocaleString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            }).replace(/\//g, '-') + ' ' + endDate.toLocaleString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            }).replace(':', '-');
                            date[1] = endDate;
                            //var dateString = endDate.toLocaleString();
                            //var iso = date[1].toISOString();
                            range.setVal([startDate, formattedEndDate]);
                            // Assign to tempEvent
                            tempEvent.end = date[1];
                        }
                        datestart = date[0];
                        dateend = date[1];

                    }
                    if (!date) {

                    }
                    if (datestart != null && dateend != null) {
                        let start = new Date(datestart);
                        let end = new Date(dateend);
                        var duration = calculateDuration(start, end);
                        $days.val(duration.days);
                        $hours.val(duration.hours);
                        $mins.val(duration.minutes);
                        console.log(duration);
                    }
                },
            })
            .mobiscroll('getInst');
        $('.cal-header-week').off('click').on('click', function () {
            $('#weekRadio').prop('checked', true);
            $('#dayRadio').prop('checked', false);
            // Trigger the change event manually to update the calendar
            $('#weekRadio').trigger('change');
            let current = new Date();
            showOverlay();
            // Get the start of the week (Sunday)
            let startOfWeek = new Date(current);
            startOfWeek.setDate(current.getDate() - current.getDay()); // Adjust to the previous Sunday

            // Get the end of the week (Saturday)
            let endOfWeek = new Date(current);
            endOfWeek.setDate(current.getDate() + (6 - current.getDay()));
            let inst = $('#demo-work-order-scheduling').mobiscroll('getInst');
            loadEvents(startOfWeek, endOfWeek, inst);
            inst.navigate(startOfWeek);

        })
        $('#tripPlanningRefresh').off('click').on('click', function () {
            showOverlay();
            //console.log(inst);
            let current = new Date();
            showOverlay();
            // Get the start of the week (Sunday)
            let startOfWeek = new Date(current);
            startOfWeek.setDate(current.getDate() - current.getDay()); // Adjust to the previous Sunday

            // Get the end of the week (Saturday)
            let endOfWeek = new Date(current);
            endOfWeek.setDate(current.getDate() + (6 - current.getDay()));
            let inst = $('#demo-work-order-scheduling').mobiscroll('getInst');
            loadEvents(startOfWeek, endOfWeek, inst);
            updateResources(inst);
            inst.navigate(startOfWeek);
        });
        $('#refreshplanning').off('click').on('click', function () {
            showOverlay()
            let inst = $('#demo-work-order-scheduling').mobiscroll('getInst');
         /*   console.log(refreshStart);
            console.log(refreshEnd);*/
            console.log(inst);
            loadEvents(refreshStart, refreshEnd, inst);

        })
        range.setOptions({

            controls: ['datetime'],
            locale: {
                monthNamesShort: convertedshortmonths,
                dayNamesShort: converteddays,
                dayNamesMin: converteddayinitials,
                monthNames: convertedmonths,
            },

            //locale: mobiscroll.localeFr,
            responsive: datetimePickerResponsive,
        });
        $days.on('change', function (ev) {

            datestart = tempEvent.start;
            dateend = tempEvent.end;
            let days = ev.target.valueAsNumber;
            let hours = $hours[0].valueAsNumber;
            let minutes = $mins[0].valueAsNumber;
            dateend = addDuration(datestart, days, hours, minutes);

            range.setVal([datestart, dateend]);

        })
        $hours.on('change', function (ev) {

            datestart = tempEvent.start;
            dateend = tempEvent.end;
            let hours = ev.target.valueAsNumber;
            let days = $days[0].valueAsNumber;
            let minutes = $mins[0].valueAsNumber;
            dateend = addDuration(datestart, days, hours, minutes);

            range.setVal([datestart, dateend]);

        })
        $mins.on('change', function (ev) {

            datestart = tempEvent.start;
            dateend = tempEvent.end;
            let minutes = ev.target.valueAsNumber;
            let hours = $hours[0].valueAsNumber;
            let days = $days[0].valueAsNumber;
            dateend = addDuration(datestart, days, hours, minutes);

            range.setVal([datestart, dateend]);

        })
        $deleteButton.on('click', function () {
            // delete current event on button click
            calendar.removeEvent(tempEvent);

            // save a local reference to the deleted event
            var deletedEvent = tempEvent;

            popup.close();

            mobiscroll.snackbar({
                button: {
                    action: function () {
                        calendar.addEvent(deletedEvent);
                    },
                    text: 'Undo',
                },
                duration: 10000,
                message: 'Event deleted',
            });
        });
        function getResource(res) {
            return myResources.find(function (r) {
                return r.id == res;
            });
        }

    };


    // All the Ajax Calls for the Planning Screen

    var schedulerEvents = [];
    var schdeulerDrivers = [];
    var Trips = [];
    var externalService = [];

    /*$.ajax({
        url: '/ManagerExternalService/GetServices',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            externalService = data
                .filter(service => service.valid === 1) // Filter out invalid services
                .map(service => ({
                    id: service.id,
                    name: service.name
                }));
            $.ajax({
                url: '/ManagerDrivers/GetDriver',
                type: 'GET',
                success: function (res) {
                    //console.log(res)
                    schdeulerDrivers = res
                        .filter(driver => driver.isValid === 1) // Filter out invalid drivers
                        .map(driver => ({
                            id: 'D' + driver.driverId,
                            name: driver.firstName + ' ' + driver.lastName,
                            userid: driver.userId
                        }));
                    if (isMobile == false) {
                        if (planningAccess == true) {
                            $(".main-tabs-nav3 li").click(function (e) {
                                e.preventDefault();

                                // Execute specific functions based on the clicked <li>
                                var liId = $(this).find("a").attr("id");
                                console.log("liId", liId);
                                if (liId === "tripPlanningRefresh") {
                                    console.log("tripPlanningRefesh referesh");
                                    $('#statusBottom').hide();
                                    //clearValues();
                                }
                            });

                            start(schdeulerDrivers, externalService);
                            $("#main-tab2-mobile").css('display', 'none');
                        }

                    }
                    else {
                        if (planningAccess == true) {
                            $(".main-tabs-nav3 li").click(function (e) {
                                e.preventDefault();

                                // Execute specific functions based on the clicked <li>
                                var liId = $(this).find("a").attr("id");
                                console.log("liId", liId);
                                if (liId === "tripPlanningRefresh") {
                                    console.log("tripPlanningRefesh referesh");
                                    $('#statusBottom').hide();
                                    
                                    //clearValues();
                                }
                            });

                            $("#windows-planning-screen").css('display', 'none');
                            mobile_start(schdeulerDrivers, externalService);
                            $("#main-tab2-mobile").css('display', 'block');
                           *//* var activeTab = $(this).find("a").attr("href");
console.log(activeTab);
if (activeTab == '#main-tab2') {

//$('#main-tab2').hide();


// $('#main-tab2-mobile').css('display', 'block');
}*//*
                                }
                                *//*$(".main-tabs-nav3 li").on("click",function () {
 
 
var activeTab = $(this).find("a").attr("href");
if (activeTab == '#main-tab2') {
 
$('#main-tab2').hide();
 
$('#statusBottom').hide();
$('#main-tab2-mobile').css('display', 'block');
}
else {
$('#main-tab2-mobile').hide();
 
}
 
});*//*
                }
                },
                error: function (error) {
                console.error('Error fetching data:', error);
                }
                });
                },
                error: function (error) {
                console.error('Error fetching data:', error);
                }
                });*/
    function loadEvents(firstday, lastday, instance) {
        var param = {
            dateFrom: formatDate(firstday),
            dateTo: formatDate(lastday)
        };
        eventsKind = [];
        var testEvents = [
            {
                "id": 1,
                "code": "Planifié",
                "name": "a-Heures de travail planifiées",
                "level": 1,
                "overloadable": 0,
                "must_overload": 0,
                "request_from_to": 1,
                "request_duration": 1,
                "request_amount": 0,
                "request_comments": 0,
                "access_level": 4,
                "validation_level": 3,
                "color": "#888686",
                "validated_color": "#8bd2fd",
                "rejected_color": "#fd9d77",
                "valid": 1,
                "modified_by": "omailla",
                "time_stamp": "2024-11-08 12:02:10.517",
                "categoryCode": "TWORK"
            },
            {
                "id": 2,
                "code": "Heures supplémentaires",
                "name": "Heures supplémentaires",
                "level": 2,
                "overloadable": 1,
                "must_overload": 1,
                "request_from_to": 2,
                "request_duration": 2,
                "request_amount": 1,
                "request_comments": 1,
                "access_level": 3,
                "validation_level": 2,
                "color": "#ff6347",
                "validated_color": "#32cd32",
                "rejected_color": "#ff4500",
                "valid": 1,
                "modified_by": "jdoe",
                "time_stamp": "2024-11-09 13:00:00.123",
                "categoryCode": "TSUPP"
            },
            {
                "id": 3,
                "code": "Congé",
                "name": "Congé",
                "level": 1,
                "overloadable": 0,
                "must_overload": 0,
                "request_from_to": 1,
                "request_duration": 5,
                "request_amount": 0,
                "request_comments": 0,
                "access_level": 5,
                "validation_level": 4,
                "color": "#ff8c00",
                "validated_color": "#ffd700",
                "rejected_color": "#ff0000",
                "valid": 1,
                "modified_by": "mmartin",
                "time_stamp": "2024-10-25 09:00:00.234",
                "categoryCode": "TLEAVE"
            },
            {
                "id": 4,
                "code": "Formation",
                "name": "Formation",
                "level": 2,
                "overloadable": 0,
                "must_overload": 0,
                "request_from_to": 1,
                "request_duration": 4,
                "request_amount": 1,
                "request_comments": 1,
                "access_level": 6,
                "validation_level": 2,
                "color": "#4682b4",
                "validated_color": "#7fffd4",
                "rejected_color": "#ff1493",
                "valid": 1,
                "modified_by": "lboss",
                "time_stamp": "2024-11-01 10:30:00.567",
                "categoryCode": "TTRAIN"
            },
            {
                "id": 5,
                "code": "Urgence",
                "name": "Urgence",
                "level": 3,
                "overloadable": 1,
                "must_overload": 1,
                "request_from_to": 3,
                "request_duration": 1,
                "request_amount": 2,
                "request_comments": 0,
                "access_level": 2,
                "validation_level": 1,
                "color": "#32cd32",
                "validated_color": "#98fb98",
                "rejected_color": "#ff6347",
                "valid": 1,
                "modified_by": "aperez",
                "time_stamp": "2024-11-10 08:45:00.789",
                "categoryCode": "TURGE"
            }
        ]
        /* $.ajax({
             url: '/ManagerEvents/GetEventKinds',
             method: 'GET',
             success: function (data) {*/
        // console.log(data); // Log the data received from the server

        var mydata = null;
        mydata = testEvents
            .filter(function (item) {
                return item.valid == 1;
            })
            .map(function (item) {
                return {
                    Code: item.code,
                    Name: item.name,
                    Level: item.level,
                    CategoryCode: item.categoryCode,
                    Id: item.id,
                    RequestAmount: item.requestAmount,
                    RequestComments: item.requestComments,
                    RequestDuration: item.requestDuration,
                    RequestFromTo: item.requestFromTo
                };
            });
        eventsKind = mydata;
        console.log(eventsKind);
        var populate = eventsKind.map(event => {
            return {
                id: event.Id,
                text: event.Name
            };
        })
        // generateDropdownOptions(populate, '#event-name');
        $('#event-name').select2({
            data: populate,
            dropdownParent: $('#demo-add-popup'),
            width: '365px',


        });
        //showOverlay();
       /* $.ajax({
            url: '/ManagerEvents/GetEventKinds',
            method: 'GET',
            success: function (data) {
                // console.log(data); // Log the data received from the server

                var mydata = null;
                mydata = data
                    .filter(function (item) {
                        return item.valid == 1;
                    })
                    .map(function (item) {
                        return {
                            Code: item.code,
                            Name: item.name,
                            Level: item.level,
                            CategoryCode: item.categoryCode,
                            Id: item.id,
                            RequestAmount: item.requestAmount,
                            RequestComments: item.requestComments,
                            RequestDuration: item.requestDuration,
                            RequestFromTo: item.requestFromTo
                        };
                    });
                eventsKind = mydata;
                console.log(eventsKind);
                var populate = eventsKind.map(event => {
                    return {
                        id: event.Id,
                        text: event.Name
                    };
                })
               // generateDropdownOptions(populate, '#event-name');
                $('#event-name').select2({
                    data: populate,
                    dropdownParent: $('#demo-add-popup'),
                    width: '365px',


                });
                // Initialize the grid with new data
            },
            error: function (xhr, textStatus, exception) {
                // Handle error response
                console.error('Error:', textStatus, exception);

            },
            

        });*/
         showOverlay();
        $.ajax({
            url: `/Eventsdriver/GetAllEvents`,
            type: 'GET',
            data: param,
            success: function (response) {

                // Update scheduler data source after successful CRUD operation
                // console.log(response);
                console.log(response);
                schedulerEvents = response.map(function (event) {
                    var startdate = new Date(event.dateFrom);
                    var enddate = new Date(event.dateTo);
                    var tripid = '';
                    var eventOrder = parseInt(event.level);
                    console.log(eventOrder);
                    /*if (event.tripId != undefined || event.tripId != null) {
                        tripid = event.tripId;
                    }
                    if (event.eventKindId == 2) {
                        eventOrder = 1;
                    }
                    else {
                        eventOrder +=1;
                    }*/
                    // Adjust the start and end times to the local timezone of the user
                    // You can use libraries like Luxon.js or Moment.js for better timezone handling

                    return {
                        id: 'E' + event.id,
                        name: event.code,
                        description: event.comment,
                        amount: event.amount,
                        dragBetweenResources: false,
                        tripId: tripid,
                        dragInTime: false,
                        resize: false,
                        start: startdate, // Convert start date to JavaScript Date object
                        end: enddate, // Convert end date to JavaScript Date object
                        title: event.code, // Provide a default title if one is not available in your data
                        resource: 'D' + event.driverId,
                        driverName: event.driverName,
                        eventkindId: event.eventKindId,
                        color: event.color,
                        order: eventOrder
                        // Map other fields as needed
                    };
                    //console.log(schedulerEvents);
                });
                console.log(schedulerEvents);
                //instance.setEvents(schedulerEvents);

               $.ajax({
                    url: '/Trips/GetAllTrips',
                    type: 'GET',
                    data: param,
                    success: function (response) {
                         console.log(response);
                        if (response !== null) {

                            Trips = response.map(function (event) {
                                var startdate = new Date(event.fromDate);
                                var enddate = new Date(event.toDate);
                                var Color = "red";
                                var drag = true;
                                var Resource = 'D' + event.driverId;
                                var totalPassengers = [];
                                var earliestStart = null;
                                var latestEnd = null;
                                var currentDate = new Date();
                                var checkdate = new Date(startdate);
                                var mainP = "?";
                                var isVip = false;

                                if (event.externalServiceId > 0) {
                                    Resource = parseInt(event.externalServiceId);
                                }
                                if (event.status == 2) {
                                    Color = "gray";
                                    Resource = 'U2';
                                    drag = false;
                                }
                                if (event.status == 5) {
                                    Color = "gray";
                                    Resource = null;
                                    drag = false;
                                }
                                if ((event.externalServiceId == null) && (event.status == 3) && (event.driverId == null)) {
                                    Color = "red";
                                    Resource = 'U1';
                                }
                                if (event.status == 6) {
                                    Color = "gray";
                                    Resource = 'U3';
                                    drag = false;
                                }
                                if (event.status == 11 || event.status == 12) {
                                    Color = "yellow";
                                    //Resource = 'U3';
                                    drag = false;
                                }
                                if (checkdate < currentDate) {
                                    Color = 'gray';
                                    drag = false;
                                }
                                if (checkdate > currentDate && event.status == 10) {
                                    Color = 'green';
                                    drag = false;
                                }
                                let processedTripSteps = [];
                                //console.log(event);
                                if (event.mainPassenger !== null && event.mainPassenger !== undefined) {
                                    //console.log(event.mainPassenger[0]);
                                    mainP = event.mainPassenger[0].firstName + ' ' + event.mainPassenger[0].lastName;
                                }
                                  var main = {
                                        id: event.mainPassenger[0].passengerId,
                                        name: mainP
                                    };
                                totalPassengers.push(mainP);
                                var bufferBefore = 0;
                                var bufferAfter = 0;
                                // enddate = convertToUserTimezone(enddate);
                                if (event.tripSteps && Array.isArray(event.tripSteps)) {
                                    var len = event.tripSteps.length;
                                    var TripStep = event.tripSteps.forEach((trip,index) => {
                                        // Accessing properties of each trip step
                                        let processedTripStep = {};
                                       /* if (index == 0) {
                                            startdate = new Date(trip.tripFromDate);
                                        }
                                        if (index == len - 1) {
                                            enddate = new Date(trip.tripToDate);
                                        }*/
                                        processedTripStep.tripStepId = trip.tripStepId;
                                        processedTripStep.tripFromDate = new Date(trip.tripFromDate);
                                        processedTripStep.tripToDate = new Date(trip.tripToDate);
                                        if (!earliestStart || processedTripStep.tripFromDate < earliestStart) {
                                            earliestStart = processedTripStep.tripFromDate;
                                        }
                                        if (!latestEnd || processedTripStep.tripToDate > latestEnd) {
                                            latestEnd = processedTripStep.tripToDate;
                                        }
                                        if (trip.fromLocation) {
                                            processedTripStep.fromLocation = {
                                                locationId: trip.fromLocation.locationId,
                                                locationName: trip.fromLocation.locationName
                                            };
                                        } else {
                                            processedTripStep.fromLocation = null;
                                        }
                                        if (index == 0 && trip.fromLocation) {
                                            bufferBefore = trip.fromLocation.bufferBefore;
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
                                        if (index === event.tripSteps.length - 1 && trip.toLocation) {
                                            bufferAfter = trip.toLocation.bufferAfter;
                                        }
                                        // Check if passengers array exists and is not null
                                        if (trip.passengers && Array.isArray(trip.passengers)) {
                                            processedTripStep.passengers = trip.passengers.map(passenger => {
                                                if (passenger.isVip == 1) {
                                                    mainP = passenger.firstName + ' ' + passenger.lastName;
                                                    isVip = true;
                                                }
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
                                /*startdate = earliestStart || startdate; // Use earliest start if available
                                enddate = latestEnd || enddate;*/
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
                                    vip:isVip,
                                    bufferBefore: bufferBefore,
                                    bufferAfter: bufferAfter,
                                    tripStep: processedTripSteps,
                                    vehicleName: event.vehicleName,
                                    statusName: event.statusName,
                                    status: event.status,
                                    order:3,
                                    color: Color,

                                    // Map other fields as needed
                                };
                            });
                            //console.log(Trips);
                            var mergedarray = [];
                            /* addtoArray(Trips);*/
                            if (schedulerEvents != null) {

                                mergedarray = schedulerEvents.concat(Trips);
                                // instance.setEvents(mergedarray);
                                console.log(mergedarray);
                            }
                            let j = JSON.stringify(Trips);
                            sessionStorage.setItem('Comparison', j);
                            //ComparisonTrips = Trips;

                        }
                        else {
                            if (schedulerEvents == null) {

                                mergedarray = Trips;
                            }
                            if (Trips == null) {
                                mergedarray = schedulerEvents;
                            }

                        }

                        instance.setEvents(mergedarray);


                        // }
                    },


                    error: function (error) {
                        console.error('Error managing room:', error);
                    },
                    complete: function () {
                        hideOverlay();
                    }
                });

            },
            error: function (error) {
                console.error('Error managing room:', error);
            },
            complete: function () {
                hideOverlay();
            }
        });
    }
    function addToArray(array) {
        array.forEach(newObject => {
            // Check if the object is already in the array
            const isDuplicate = showTrips.some(obj => obj.id === newObject.id);

            if (!isDuplicate) {
                showTrips.push(newObject);
                console.log('Object added:', newObject);
            } else {
                console.log('Duplicate found, object not added:', newObject);
            }
        });
    }
    async function checkbusy(id, tripdatefrom, tripdateto) {
        let senddata = {
            driverid: id,
            date: tripdatefrom.toISOString(),
            dateto: tripdateto.toISOString()
        };
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/Eventsdriver/CheckDriverAvailaibility',
                method: 'GET',
                data: senddata,
                success: function (data) {
                    //sessionStorage.setItem('assigntrip', data);
                    resolve(data);
                },
                error: function (error) {
                    console.log(error);
                    reject(error);
                }
            });

        });
    }
    async function populateassigndriver(trip, drivers) {
        let date = trip.tripSteps[0].startDateTime;
        let len = trip.tripSteps.length - 1;
        var hide = false;
        let dateto = trip.tripSteps[len].endDateTime;
        let check = new Date(date);
        let checkto = new Date(dateto);


        $('#DriverToAssignList').html("");
        for (const driver of drivers) {
            let checkid = parseInt(driver.id.slice(1));
            let isbusy = await checkbusy(checkid, check, checkto);

            let listitem = '<div class="aco-body-col" ><div class="aco-check"><input type="radio" name="driverRadio"  class="radiodriverbtn" id=' + parseInt(driver.id.slice(1)) + '>' + ' <h4>' + driver.name + '</h4>' + '</div>';

            if (isbusy == 1) {
                listitem += `<span class="text-gap red" id=${isbusy}>Busy</span></div>`;
            } else {
                listitem += `<span class="text-gap green" id=${isbusy}>Available</span></div>`;
            }

            $('#DriverToAssignList').append(listitem);
        }

        $('.radiodriverbtn').on("change", function () {
            let selectedDriverId = $(this).attr('id');
            let isbusy = $(this).closest('.aco-body-col').find('span').attr('id');
            console.log(isbusy);
            if (isbusy !== undefined) {

                if (isbusy == 0) {
                    $('#assigndriverbtn').removeClass('btn-gray').addClass('btn-blue').prop('disabled', false);
                } else {
                    $('#assigndriverbtn').addClass('btn-gray').removeClass('btn-blue').prop('disabled', true);
                }

                $('#assigndriverbtn').off('click').on('click', function () {
                    if (!$(this).prop('disabled')) { // Check if the button is enabled
                        let selectedDriverId = $('input[name="driverRadio"]:checked').attr('id');
                        console.log(`Assigning driver with ID: ${selectedDriverId}`);
                        var event = {
                            id: 'T' + trip.tripId,
                            status: 11,
                            driverId: parseInt(selectedDriverId)
                        }
                        updateTripStatus(event);
                        hide = true;
                        $('#AssignPage').modal('hide');
                        let assigntriprow = $(`#acceptedTrips .assignbutton#${event.id}`).closest('.trip-list-row');
                        assigntriprow.find('.assignbutton').prop('disabled', true);
                        assigntriprow.find('.assignbutton').text('Assigned');
                        let canceltriprow = $(`#acceptedTrips .canceltripmobile#${event.id}`).closest('.trip-list-row');
                        canceltriprow.find('.canceltripmobile').prop('disabled', true);
                        //console.log(triprow);
                        // $('.radiodriverbtn')
                        // Add your logic to actually assign the driver here
                        // Example: call a function to perform the assignment
                        // assignDriver(selectedDriverId);
                    }
                });
            }
            //console.log(selectedDriverId);
            else {
                $('#assigndriverbtn').removeClass('btn-gray').addClass('btn-blue').prop('disabled', false);
                $('#assigndriverbtn').off('click').on('click', function () {
                    if (!$(this).prop('disabled')) { // Check if the button is enabled
                        //let selectedExternalId = $('.radiodriverbtn').attr('id');
                        let externalid = selectedDriverId.slice(1);
                        //console.log(`Assigning driver with ID: ${selectedDriverId}`);
                        var event = {
                            id: 'T' + trip.tripId,
                            status: 12,
                            externalServiceId: parseInt(externalid)
                        }
                        hide = true;
                        updateTripStatus(event);
                        $('#AssignPage').modal('hide');
                        let triprow = $(`#acceptedTrips .assignbutton#${event.id}`).closest('.trip-list-row');
                        triprow.find('.assignbutton').prop('disabled', true);
                        triprow.find('.assignbutton').text('Assigned');
                        console.log(triprow);
                    }
                });
            }
        });


    }

    var mobileCalendar;
    var filtertrips = {};
    var unacceptedTripsFilteredList = {};
    // Function to initialize the mobile trips section
    async function mobile_start(schdeulerDrivers, externalService) {
        $.ajax({
            url: '/ManagerEvents/GetEventKinds',
            method: 'GET',
            success: function (data) {
                // console.log(data); // Log the data received from the server

                var mydata = null;
                mydata = data
                    .filter(function (item) {
                        return item.valid == 1;
                    })
                    .map(function (item) {
                        return {
                            Code: item.code,
                            Name: item.name,
                            Level: item.level,
                            CategoryCode: item.categoryCode,
                            Id: item.id,
                            RequestAmount: item.requestAmount,
                            RequestComments: item.requestComments,
                            RequestDuration: item.requestDuration,
                            RequestFromTo: item.requestFromTo
                        };
                    });
                // generateDropdownOptions(mydata, '#event-name');
                eventsKind = mydata;
                console.log(eventsKind);
               /* var populate = eventsKind.map(event => {
                    return {
                        id: event.Id,
                        text: event.Name
                    };
                })
                $('#event-name').select2({
                    data: populate,
                    dropdownParent: $('#demo-add-popup'),
                    width: '365px',
                    *//*dropdownCss: {
                        'max-height': '300px',  // Maximum height of the dropdown
                        'overflow-y': 'auto'    // Enable vertical scrolling
                    }*//*

                });*/
                // Initialize the grid with new data
            },
            error: function (xhr, textStatus, exception) {
                // Handle error response
                console.error('Error:', textStatus, exception);

            },
            /*complete: function () {
                hideOverlay();
            }*/

        });
        showOverlay();
        let $driversmobilebody = $('#mobile-drivers-list');
        let $externalmobilebody = $('#mobile-external-list');
        let $acceptedtripsbody = $('#tripAccept');
        let $mobiletripheader = $('#mobile-trip-header');
        let $acceptedTripsDiv = $('#acceptedTrips');
        let count = 0;
        //let tripdata = sessionStorage.getItem('assigntrip');
        // Populate drivers list
        $driversmobilebody.html('');
        schdeulerDrivers.forEach(driver => {
            let div = '<div class="aco-body-col" id=' + parseInt(driver.id.slice(1)) + '>' + '<h4>' + driver.name + '</h4></div>';
            $driversmobilebody.append(div);


        });

        // Populate external services list
        $externalmobilebody.html("");
        $('#ExternalServiveAssignList').html("");
        console.log(externalService);
        externalService.forEach(service => {
            let div = '<div class="aco-body-col" id=' + 'E' + service.id + '>' + '<h4>' + service.name + '</h4></div>';
            $externalmobilebody.append(div);
            let listitem = '<div class="aco-body-col" >      <div class="aco-check">       <input type="radio" name="driverRadio" class="radiodriverbtn" id=' + 'E' + service.id + '>' + ' <h4>' + service.name + '</h4>' + '</div> </div>';
            $('#ExternalServiveAssignList').append(listitem);
        });
        AcceptedTrips = languageobj.find(word => word.value == "AcceptedTrips");
        UnacceptedTrips = languageobj.find(word => word.value == "UnacceptedTrips");
        var CancelledTrips = languageobj.find(word => word.value == "CancelledTrips");
        Back = languageobj.find(word => word.value == "Back");
        // Click event handler for .aco-body-col elements
        $('.aco-body-col').off('click').on('click', async function () {
            let test = this.id;
            let name = this.innerHTML;
            let id = parseInt(test);
            //let inst = $('#mobile-day-view').mobiscroll('getInst');

            if (!isNaN(id)) {
                count += 1;
                sessionStorage.setItem('drivermobile', id);
                console.log(id);
                //$('#Header').html('');
                $('#drivername').html(name);
                let testDate = new Date();
                let dateonly = testDate.toLocaleDateString();
                //console.log(count);
                if (count >= 2) {

                    getDriverEventsMobile(dateonly, mobileCalendar);
                    let current = new Date();
                    /* let startOfWeek = new Date(current);
                     startOfWeek.setDate(current.getDate() - current.getDay()); // Adjust to the previous Sunday
 
                     // Get the end of the week (Saturday)
                     let endOfWeek = new Date(current);
                     endOfWeek.setDate(current.getDate() + (6 - current.getDay()));*/
                    mobileCalendar.navigate(current);

                    // Get the start of the week (Sunday)

                    //let tripcheckdate = new Date(dateOnly)
                    let trips = await loadMobileTrips(testDate);
                    let driverid = sessionStorage.getItem('drivermobile');
                    filtertrips = trips.filter(trip => (trip.resource === parseInt(driverid)) && (trip.status === 10));
                    unacceptedTripsFilteredList = trips.filter(trip => (trip.resource === parseInt(driverid)) && (trip.status === 11));
                    unacceptedTripsFilteredList = unacceptedTripsFilteredList.filter(trip => (trip.start > testDate));
                }
                if (count == 1) {

                    loadMobileEvents();
                }
            }
            else if (test.charAt(0) == 'E') {

            }
            else {
                // Handle external service or other cases
                $('#mobile-grid').hide();
                let check = test.charAt(0);
                let check2 = test.slice(1);

                if (check == 'T') {
                    try {
                        let current = new Date();
                        let trips = await loadMobileTrips(current); // Assuming loadMobileTrips function exists

                        // Group trips by date
                        let groupedTrips = {};
                        let tobeaccepted = {};
                        let cancelled = {};
                        trips.forEach(trip => {
                            if (trip.status == 3) {
                                let tripDate = new Date(trip.start);
                                let numericDate = tripDate.toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                });
                                if (!groupedTrips[numericDate]) {
                                    groupedTrips[numericDate] = [];
                                }
                                groupedTrips[numericDate].push(trip);
                            }
                            if (trip.status == 2) {
                                let tripDate = new Date(trip.start);
                                let numericDate = tripDate.toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                });
                                if (!tobeaccepted[numericDate]) {
                                    tobeaccepted[numericDate] = [];
                                }
                                tobeaccepted[numericDate].push(trip);
                            } if (trip.status == 6) {
                                let tripDate = new Date(trip.start);
                                let numericDate = tripDate.toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                });
                                if (!cancelled[numericDate]) {
                                    cancelled[numericDate] = [];
                                }
                                cancelled[numericDate].push(trip);
                            }
                        });

                        // Clear existing trip details
                        $acceptedTripsDiv.empty();
                        $mobiletripheader.empty();
                        if (check2 == 1) {

                            let header = ` <h4 class="blue">${AcceptedTrips.text}</h4>
                                <button class="btn btn-outline-blue" id="backtomobilegrid">${Back.text}</button>`;
                            $mobiletripheader.append(header);
                            /* <h4 class="blue">@_localization.Getkey("TripAccepted")</h4>
                                 <button class="btn btn-outline-blue" id="backtomobilegrid">@_localization.Getkey("Back")</button>*/
                            // Render trips grouped by date
                            for (let date in groupedTrips) {
                                if (groupedTrips.hasOwnProperty(date)) {
                                    let div = `<div class='trip-general-grp ''>`;
                                    div += `<div class='trip-general-grp-col'>`;
                                    div += `<span class='date-text'>${date}</span>`;

                                    groupedTrips[date].forEach(trip => {
                                        let tripstepend = trip.tripStep.length - 1;
                                        div += `<div class='trip-list-row' id='${trip.id}'>`;
                                        div += `<div class='trip-list-col'>`;
                                        div += `<img class='icon-img m-r-10' src='/img/car.png' alt=''>`;
                                        div += `<h4>${trip.mainpassenger}</h4>`;
                                        div += `</div>`;
                                        div += `<div class='trip-list-col'>`;
                                        div += `<div class='trip-date-wrapper'>`;
                                        div += `<div class='trip-date-col'>`;
                                        if (trip.tripStep[0].fromLocation.locationName !== undefined) {
                                            div += `<span>${formatTime(trip.start)} <br><b>${trip.tripStep[0].fromLocation.locationName}</b><br></span>`;
                                        }
                                        div += `</div>`;
                                        div += `<div class='trip-date-col'>`;
                                        div += `<img class='icon-img' src='/img/arrow-back.png' alt=''>`;
                                        div += `</div>`;
                                        div += `<div class='trip-date-col'>`;
                                        if (trip.tripStep[tripstepend].toLocation.locationName !== undefined) {
                                            div += `<span>${formatTime(trip.end)} <br><b>${trip.tripStep[tripstepend].toLocation.locationName}</b><br></span>`;
                                        }
                                        div += `</div>`;
                                        div += `</div>`;
                                        div += `</div>`;
                                        let tripdate = new Date(trip.start);
                                        let todaydate = new Date();
                                        if (accessLevel > 3 && tripdate > todaydate) {

                                            div += `<div class='trip-list-col'>`;
                                            div += `<div class='trip-general-footer'>`;
                                            div += `<button class="btn btn-yellow m-r-20 canceltripmobile" title = "Cancel" id ='${trip.id}'> <span>${cancelTrip.text}</span></button >`;
                                            div += `<button class='btn btn-yellow assignbutton' id='${trip.id}'>`;
                                            div += `<img class='icon-img m-r-10' src='/img/icons8-steering-wheel-24.png' alt=''>`;
                                            div += `${AssignDriver}`;
                                            div += `</button>`;

                                            div += `</div>`;
                                            div += `</div>`;
                                        }
                                        div += `</div>`; // Close trip-list-row
                                    });

                                    div += `</div>`; // Close trip-general-grp-col
                                    div += `</div>`; // Close trip-general-grp

                                    // Append generated HTML to $acceptedTripsDiv
                                    $acceptedTripsDiv.append(div);
                                }
                            }
                        }
                        else if (check2 == 3) {
                            let header = ` <h4 class="blue">${CancelledTrips.text}</h4>
                                <button class="btn btn-outline-blue" id="backtomobilegrid">${Back.text}</button>`;
                            $mobiletripheader.append(header);
                            /* <h4 class="blue">@_localization.Getkey("TripAccepted")</h4>
                                 <button class="btn btn-outline-blue" id="backtomobilegrid">@_localization.Getkey("Back")</button>*/
                            // Render trips grouped by date
                            for (let date in cancelled) {
                                if (cancelled.hasOwnProperty(date)) {
                                    let div = `<div class='trip-general-grp ''>`;
                                    div += `<div class='trip-general-grp-col'>`;
                                    div += `<span class='date-text'>${date}</span>`;

                                    cancelled[date].forEach(trip => {
                                        let tripstepend = trip.tripStep.length - 1;
                                        div += `<div class='trip-list-row' id='${trip.id}'>`;
                                        div += `<div class='trip-list-col'>`;
                                        div += `<img class='icon-img m-r-10' src='/img/car.png' alt=''>`;
                                        div += `<h4>${trip.mainpassenger}</h4>`;
                                        div += `</div>`;
                                        div += `<div class='trip-list-col'>`;
                                        div += `<div class='trip-date-wrapper'>`;
                                        div += `<div class='trip-date-col'>`;
                                        if (trip.tripStep[0].fromLocation.locationName !== undefined) {
                                            div += `<span>${formatTime(trip.start)} <br><b>${trip.tripStep[0].fromLocation.locationName}</b><br></span>`;
                                        }
                                        div += `</div>`;
                                        div += `<div class='trip-date-col'>`;
                                        div += `<img class='icon-img' src='/img/arrow-back.png' alt=''>`;
                                        div += `</div>`;
                                        div += `<div class='trip-date-col'>`;
                                        if (trip.tripStep[tripstepend].toLocation.locationName !== undefined) {
                                            div += `<span>${formatTime(trip.end)} <br><b>${trip.tripStep[tripstepend].toLocation.locationName}</b><br></span>`;
                                        }
                                        div += `</div>`;
                                        div += `</div>`;
                                        div += `</div>`;
                                        let tripdate = new Date(trip.start);
                                        let todaydate = new Date();
                                        if (accessLevel > 3 && tripdate > todaydate && trip.status == 6) {

                                            div += `<div class='trip-list-col'>`;
                                            div += `<div class='trip-general-footer'>`;
                                            div += `<button class="btn btn-yellow m-r-20 accepttripmobile" title="Accept" id='${trip.id}'><span>${acceptCancel}</span></button>`;
                                            div += `<button class="btn btn-yellow m-r-20 rejecttripmobile" title = "Reject" id ='${trip.id}'> <span>${rejectCancel}</span></button >`;
                                            div += `</div>`;
                                            div += `</div>`;
                                        }
                                        div += `</div>`; // Close trip-list-row
                                    });

                                    div += `</div>`; // Close trip-general-grp-col
                                    div += `</div>`; // Close trip-general-grp

                                    // Append generated HTML to $acceptedTripsDiv
                                    $acceptedTripsDiv.append(div);
                                }
                            }
                            $('.accepttripmobile').off('click').on('click', function () {
                                showConfirmPopup1(CancelConfirmation);
                                $('#confirm-button1').off('click').on('click', function () {
                                    var details = {
                                        id: this.id,
                                        status: 8

                                    };
                                    /*event.start = new Date(event.start);
                                    event.end = new Date(event.end);
                                    event.vehicleName = null;
                                    event.driverId = null;
                                    //event.color = 'red';
                                    event.status = 8;
                                    //event.resource = 'U2';
                                    event.dragBetweenResources = false;
                                    calendar.removeEvent(event);*/
                                    updateTripStatus(details);
                                    $(this).closest('.trip-general-grp .trip-list-row').css('display', 'none');
                                    hideConfirmPopup1();
                                });

                                //updateTripStatus(details);

                            })
                            $('.rejecttripmobile').off('click').on('click', function () {
                                var details = {
                                    id: this.id,
                                    status: 3

                                };
                                updateTripStatus(details);
                                $(this).closest('.trip-general-grp').css('display', 'none');
                            })
                        }
                        else {
                            let header = ` <h4 class="blue">${UnacceptedTrips.text}</h4>
                                <button class="btn btn-outline-blue" id="backtomobilegrid">${Back.text}</button>`;
                            $mobiletripheader.append(header);
                            for (let date in tobeaccepted) {
                                if (tobeaccepted.hasOwnProperty(date)) {
                                    let div = `<div class='trip-general-grp'>`;
                                    div += `<div class='trip-general-grp-col'>`;
                                    div += `<span class='date-text'>${date}</span>`;

                                    tobeaccepted[date].forEach(trip => {
                                        let tripstepend = trip.tripStep.length - 1;
                                        div += `<div class='trip-list-row'>`;
                                        div += `<div class='trip-list-col'>`;
                                        div += `<img class='icon-img m-r-10' src='/img/car.png' alt=''>`;
                                        div += `<h4>${trip.mainpassenger}</h4>`;
                                        div += `</div>`;
                                        div += `<div class='trip-list-col'>`;
                                        div += `<div class='trip-date-wrapper'>`;
                                        div += `<div class='trip-date-col'>`;
                                        if (trip.tripStep[0].fromLocation.locationName !== undefined) {
                                            div += `<span>${formatTime(trip.start)} <br><b>${trip.tripStep[0].fromLocation.locationName}</b><br></span>`;
                                        }
                                        div += `</div>`;
                                        div += `<div class='trip-date-col'>`;
                                        div += `<img class='icon-img' src='/img/arrow-back.png' alt=''>`;
                                        div += `</div>`;
                                        div += `<div class='trip-date-col'>`;
                                        if (trip.tripStep[tripstepend].toLocation.locationName !== undefined) {
                                            div += `<span>${formatTime(trip.end)} <br><b>${trip.tripStep[tripstepend].toLocation.locationName}</b><br></span>`;
                                        }
                                        div += `</div>`;
                                        div += `</div>`;
                                        div += `</div>`;
                                        let tripdate = new Date(trip.start);
                                        let todaydate = new Date();
                                        if (accessLevel > 3 && tripdate > todaydate) {

                                            div += `<div class='trip-list-col'>`;
                                            div += `<div class='trip-general-footer'>`;
                                            div += `<button class="btn btn-yellow m-r-20 accepttripmobile" title="Accept" id=${trip.id}><span>${acceptTrip.text}</span></button>`;
                                            div += `<button class="btn btn-yellow m-r-20 rejecttripmobile" title = "Reject" id = ${trip.id}> <span>${rejectTrip.text}</span></button >`;
                                            div += `</div>`;
                                            div += `</div>`;
                                        }
                                        div += `</div>`; // Close trip-list-row
                                    });

                                    div += `</div>`; // Close trip-general-grp-col
                                    div += `</div>`; // Close trip-general-grp

                                    // Append generated HTML to $acceptedTripsDiv
                                    $acceptedTripsDiv.append(div);
                                }
                            }
                        }
                        $('.accepttripmobile').off('click').on('click', function () {
                            var details = {
                                id: this.id,
                                status: 3

                            };
                            updateTripStatus(details);
                            $(this).closest('.trip-general-grp .trip-list-row').css('display', 'none');
                        })
                        $('.rejecttripmobile').off('click').on('click', function () {
                            var details = {
                                id: this.id,
                                status: 4

                            };
                            updateTripStatus(details);
                            $(this).closest('.trip-general-grp').css('display', 'none');
                        })
                        // Display the trips section
                        $acceptedtripsbody.css('display', 'block');
                        $('#backtomobilegrid').off('click').on('click', function () {
                            $('#mobile-grid').show();
                            /*$('mobile-planning-screen').css('display', 'none')*/
                            $acceptedtripsbody.css('display', 'none')
                        })
                        $('.assignbutton').off('click').on('click', async function () {
                            let id = this.id;
                            /*sessionStorage.setItem('assigntrip', parseInt(id.slice(1)));*/
                            showOverlay();
                            let tripId = parseInt(id.slice(1));
                            await gettripdata(tripId);

                            $('#AssignPage').modal('show');
                            hideOverlay();

                        })
                        $('.canceltripmobile').off('click').on('click', async function () {
                            let id = this.id;
                            console.log(id);
                            //let tripId = parseInt(id.slice(1));
                            /*sessionStorage.setItem('assigntrip', parseInt(id.slice(1)));*/
                            // showOverlay();
                            showConfirmPopup1(DeleteTripPopup);
                            $('#confirm-button1').off('click').on('click', function () {
                                var details = {
                                    id: id,
                                    status: 5

                                };
                                /*event.start = new Date(event.start);
                                event.end = new Date(event.end);
                                event.vehicleName = null;
                                event.driverId = null;
                                //event.color = 'red';
                                event.status = 8;
                                //event.resource = 'U2';
                                event.dragBetweenResources = false;
                                calendar.removeEvent(event);*/
                                updateTripStatus(details);
                                let triprow = $(`#acceptedTrips .canceltripmobile#${id}`).closest('.trip-list-row');
                                triprow.css('display', 'none');
                                hideConfirmPopup1();
                            });

                            /*await gettripdata(tripId);

                            $('#AssignPage').modal('show');*/
                            //hideOverlay();

                        })
                        $('#AssignPageClose').off('click').on('click', function () {
                            $('#AssignPage').css('display', 'none');
                        })
                        console.log(trips);
                    } catch (error) {
                        console.error('Error loading trips:', error);
                    }
                } else {
                    //console.log('Could not convert to number');
                }
            }
        });

        // Function to format time (assuming trip.start and trip.end are Date objects)
        hideOverlay();
    }
    $('#TripPlanning').on('click', function () {
        $(".search-tab").hide();
        $(".search-detail-tab").hide();
    })
    function formatTime(date) {
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with 0 if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with 0
        const year = date.getFullYear(); // Get full year

        // Format time
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

        return `${day}/${month}/${year} ${time}`;
    }
    function gettripdata(tripId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/Trips/GetTripData?tripId=' + tripId,
                method: 'GET',
                data: tripId,
                success: function (data) {
                    //sessionStorage.setItem('assigntrip', data);
                    resolve(populateassigndriver(data, schdeulerDrivers));
                },
                error: function (error) {
                    reject(error);
                    console.log(error);
                }
            });
        })
    }

    function getDriverEventsMobile(date, inst) {
        //showOverlay();
        /*   var param = {
               dateFrom: formatDate(date),
               dateTo: formatDate(date)
           };*/
        $('#mobile-grid').css('display', 'none');
        $('#mobile-planning-screen').css('display', 'block');
        $('#backtogrid').on('click', function () {
            $('#mobile-grid').show();
            $('#mobile-planning-screen').css('display', 'none');

        });
        let d = sessionStorage.getItem('drivermobile');
        return new Promise((resolve, reject) => {
            let editeddata = {

                eventDate: date,
                driverId: d
            }
            var mobileEvents = [];
            $.ajax({
                url: '/Eventsdriver/GetDriverMobile',
                method: 'GET',
                data: editeddata,
                success: function (data) {
                    console.log(data); // Log the data received from the server
                    //resolve(data);
                    if (data !== null && data !== []) {
                        mobileEvents = [];
                        mobileEvents = data.map(function (event) {
                            var startdate = new Date(event.dateFrom);
                            var enddate = new Date(event.dateTo);
                            var tripid = '';
                            if (event.tripId != undefined || event.tripId != null) {
                                tripid = event.tripId;
                            }
                            // Adjust the start and end times to the local timezone of the user
                            // You can use libraries like Luxon.js or Moment.js for better timezone handling

                            return {
                                id: event.id,
                                name: event.eventName,
                                description: event.comment,
                                dragBetweenResources: false,
                                tripId: tripid,
                                dragInTime: false,
                                resize: false,
                                start: startdate, // Convert start date to JavaScript Date object
                                end: enddate, // Convert end date to JavaScript Date object
                                title: event.eventName, // Provide a default title if one is not available in your data
                                //resource: 'D' + event.driverId,
                                driverName: event.driverName,
                                eventkindId: event.eventKindId,
                                color: event.color
                                // Map other fields as needed
                            };
                        });

                        // var calendar = $('#mobile-day-view').mobiscroll().eventcalendar('getInst');
                        let date = new Date();
                        console.log(inst);
                        if (mobileEvents !== undefined) {

                            inst.setEvents(mobileEvents);
                        }
                        else {
                            mobileEvents = [];
                            inst.setEvents(mobileEvents);
                        }
                        $('#mobile-day-view').mobiscroll('refresh');
                        //calendar.setVal(date);
                        // inst.selectedDate(date);
                        resolve(mobileEvents);
                        hideOverlay();
                        // loadMobileEvents(mobileEvents);
                    }
                    else {
                        mobileEvents = [];
                        inst.setEvents(mobileEvents);
                        hideOverlay();
                    }
                },
                error: function (xhr, textStatus, exception) {
                    // Handle error response
                    console.error('Error:', textStatus, exception);
                    reject(error);

                }

            });
        });
    }
    function addWeek(date) {
        // Parse the date string into a JavaScript Date object
        /* const date = new Date(dateStr);
 
         // Check if the date is valid
         if (isNaN(date.getTime())) {
             throw new Error('Invalid date format');
         }*/

        // Add 7 days (1 week) to the date
        let tempDate = new Date(date);
        tempDate.setDate(tempDate.getDate() + 30);

        // Format the updated Date object to 'MM/DD/YYYY HH:MM:SS'
        let year = tempDate.getFullYear();
        let month = String(tempDate.getMonth() + 1).padStart(2, '0'); // Months are zero-baseds
        let day = String(tempDate.getDate()).padStart(2, '0');
        let hours = String(tempDate.getHours()).padStart(2, '0');
        let minutes = String(tempDate.getMinutes()).padStart(2, '0');
        let seconds = String(tempDate.getSeconds()).padStart(2, '0');

        return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    }
    function loadMobileTrips(date) {
        /*var Year = date.getFullYear();
        //  currentYear = parseInt(Year);
        var Month = date.getMonth() + 1;*/

        var endDate = addWeek(date);
        var param = {
            dateFrom: formatDate(date),
            dateTo: endDate
        };
        // currentMonth = parseInt(Month);
        /*var dates = {
            year: parseInt(Year),
            month: parseInt(Month)
        };*/
        showOverlay();
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/Trips/GetAllTrips',
                type: 'GET',
                data: param,
                success: function (response) {
                    console.log(response);
                    if (response !== null) {

                        Trips = response.map(function (event) {
                            var startdate = new Date(event.fromDate);
                            var enddate = new Date(event.toDate);

                            var driver = event.driverId;
                            var totalPassengers = [];

                            var mainP = "?";

                            let processedTripSteps = [];
                            if (event.mainPassenger !== null && event.mainPassenger !== undefined) {

                                mainP = event.mainPassenger[0].firstName + ' ' + event.mainPassenger[0].lastName;
                            }

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

                                start: startdate, // Convert start date to JavaScript Date object
                                end: enddate, // Convert end date to JavaScript Date object
                                title: mainP, // Provide a default title if one is not available in your data
                                resource: driver,

                                tripStep: processedTripSteps,
                                vehicleName: event.vehicleName,
                                statusName: event.statusName,
                                status: event.status,

                            };
                        });
                        console.log(Trips);
                        let mergedarray = [];

                        if (Trips) {

                            mergedarray = Trips.filter(trip => date < trip.end);
                            resolve(mergedarray)

                        }


                    }
                },


                error: function (error) {
                    console.error('Error managing room:', error);
                    reject(error);
                },
                complete: function () {
                    hideOverlay();
                }
            });
        });

    }
    function loadMobileEvents() {
        $('#mobile-grid').css('display', 'none');
        $('#mobile-planning-screen').css('display', 'block');
        $('#backtogrid').on('click', function () {
            $('#mobile-grid').show();
            $('#mobile-planning-screen').css('display', 'none');

        });
        let Today = languageobj.find(word => word.value == "Today");
        var temp = "";
        $(function () {

            let current = new Date();

            mobileCalendar = $('#mobile-day-view')
                .mobiscroll()
                .eventcalendar({
                    clickToCreate: false,
                    dragToCreate: false,
                    selectedDate: current,
                    monthNamesShort: convertedshortmonths,
                    dayNamesShort: converteddays,
                    monthNames: convertedmonths,
                    dayNamesMin: converteddayinitials,
                    todayText: Today.text,
                    dragToMove: false,
                    dragToResize: false,
                    eventDelete: false,
                    timeFormat: 'HH:mm',
                    locale: 'fr',
                    view: {
                        schedule: {
                            // type: 'week',
                            type: 'day',
                            allDay: false
                        },
                    },
                   /* view: {
                        calendar: { type: 'week' },
                        agenda: { type: 'day' },
                    },*/
                    onPageLoading: async function (event, inst) {
                        temp = event.firstDay;
                        dateOnly = temp.toLocaleDateString();
                        console.log(event);
                        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                        var dateOnly = temp.toLocaleDateString('en-US', options);
                        //dateOnly = temp.toLocaleDateString();
                        console.log(dateOnly)
                        //const dateParts = dateOnly.split('/'); // Split into parts

                        // Format as mm/dd/yyyy

                        //const formattedDate = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
                       // console.log(formattedDate);
                        let data = await getDriverEventsMobile(dateOnly, inst);
                        //let testData = await TestMobileWeekEvents(event.firstDay, event.lastDay);
                        let trips = await loadMobileTrips(temp);
                        let driverid = sessionStorage.getItem('drivermobile');
                        filtertrips = trips.filter(trip => (trip.resource === parseInt(driverid)) && (trip.status === 10));
                        unacceptedTripsFilteredList = trips.filter(trip => (trip.resource === parseInt(driverid)) && (trip.status === 11));
                        unacceptedTripsFilteredList = unacceptedTripsFilteredList.filter(trip => (trip.start > temp));
                        console.log(unacceptedTripsFilteredList);
                        console.log(data);
                        inst.setEvents(data);
                       // inst.setEvents(testData);
                    },
                    renderHeader: function () {
                        return (

                        `<div mbsc-calendar-nav class="cal-header-nav"></div>
                                <div style="display: flex;  position: absolute;  right: 0;">
                                    <div class="cal-header-prev mobilePrevWeek"><span style="font-size: 30px;  margin-right: 10px;    margin-bottom: 5px;    display: flex;"><</span></div>
                                    <div mbsc-calendar-today class="cal-header-today"></div>
                                    <div  class="cal-header-next mobileNextWeek"><span style="font-size: 30px;  margin-left: 10px;    margin-bottom: 5px;    display: flex;">></span></div></div>`

                        )
                    },
                    renderScheduleEventContent: function (data) {
                       // console.log(data);
                        let kind = eventsKind.find(ele => ele.Id == data.original.eventkindId);
                        //console.log(eventsKind);
                        if (kind !== undefined && kind.CategoryCode !== undefined) {
                            if (kind.CategoryCode == 'TNODRIVE') {

                                return ("<div class='event-planning'><img src='/img/cut steering.png'>" + '<h6 style="color=black">' + kind.Code + '</h6></div>');
                                /*return ("<div class='event-planning'><img src='/img/icons8-steering-wheel-24.png'></div>");*/
                            }

                            else if (kind.CategoryCode == 'TDRIVE') {

                                return ("<div class='event-planning'><img src='/img/icons8-steering-wheel-24.png'>" + '<h6 style="color=black">' + kind.Code + '</h6></div>');
                            }
                            else if (kind.CategoryCode == 'TRESERVE') {

                                return ("<div class='event-planning'><img src='/img/hourglass.png'>" + '<h6 style="color=black">' + kind.Code + '</h6></div>');
                            }
                            else {
                                return ("<div class='event-planning'>" + '<h6 style="color=black">' + kind.Code + '</h6></div>');
                            }
                        }
                    },
                    /*renderHour: function (args) {
                        console.log(args.Date);
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
                      *//*  else if (hours > 0 && toggle == 'week') {
      if (hours % 4 == 0) {
          //console.log(hours);
          return hours + 'h';
      }
  }*//*
                                                                                      },*/
                    /* timeFormat: function () {
 
                     },*/
                    onEventClick: function (args) {
                        const startDate = new Date(args.event.start);
                        const endDate = new Date(args.event.end);

                        // Format the dates to "DD-MM-YYYY HH:mm"
                        const formattedStart = formatDate(startDate);
                        const formattedEnd = formatDate(endDate);
                        mobiscroll.toast({
                            message: `${args.event.title} \n Start: ${formattedStart} \n End: ${formattedEnd}`,
                            cssClass: 'multiline-toast'
                        });
                    },
                })
                .mobiscroll('getInst');


            $('.mobilePrevWeek').on('click', async function () {
                console.log(temp);
                var currentDate = new Date(temp);
                currentDate.setDate(currentDate.getDate() - 7);
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                var dateOnly = currentDate.toLocaleDateString('en-US', options);
                //dateOnly = temp.toLocaleDateString();
                console.log(dateOnly)
                //const dateParts = dateOnly.split('/'); // Split into parts

                // Format as mm/dd/yyyy

                //const formattedDate = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
                // console.log(formattedDate);
                let data = await getDriverEventsMobile(dateOnly, mobileCalendar);
                let trips = await loadMobileTrips(temp);
                // Add 6 days to the current date
                let driverid = sessionStorage.getItem('drivermobile');
                filtertrips = trips.filter(trip => (trip.resource === parseInt(driverid)) && (trip.status === 10));
                unacceptedTripsFilteredList = trips.filter(trip => (trip.resource === parseInt(driverid)) && (trip.status === 11));
                unacceptedTripsFilteredList = unacceptedTripsFilteredList.filter(trip => (trip.start > currentDate));
                
                mobileCalendar.setEvents(data);
                mobileCalendar.navigate(currentDate);
            });

            $('.mobileNextWeek').on('click',async  function () {
                console.log(temp);
                var currentDate = new Date(temp);
                currentDate.setDate(currentDate.getDate() + 7);
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                var dateOnly = currentDate.toLocaleDateString('en-US', options);
                //dateOnly = temp.toLocaleDateString();
                console.log(dateOnly)
                //const dateParts = dateOnly.split('/'); // Split into parts

                // Format as mm/dd/yyyy

                //const formattedDate = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
                // console.log(formattedDate);
                let data = await getDriverEventsMobile(dateOnly, mobileCalendar);
                let trips = await loadMobileTrips(temp);
                // Add 6 days to the current date
                let driverid = sessionStorage.getItem('drivermobile');
                filtertrips = trips.filter(trip => (trip.resource === parseInt(driverid)) && (trip.status === 10));
                unacceptedTripsFilteredList = trips.filter(trip => (trip.resource === parseInt(driverid)) && (trip.status === 11));
                unacceptedTripsFilteredList = unacceptedTripsFilteredList.filter(trip => (trip.start > currentDate));
                mobileCalendar.setEvents(data);
                mobileCalendar.navigate(currentDate);
            });
            $('#loaddriverstriplist').off('click').on('click', async function () {
                var h4Text = $('#drivername').find('h4').text();
                console.log(h4Text);
                showOverlay();
                // let div = '';
                var div = "";
                var driver = schdeulerDrivers.find(res => res.name === h4Text);
                console.log(schdeulerDrivers);
                let driverid = parseInt(driver.id.slice(1));
                console.log(driverid);
                var driverUserId = 0;
                if (driver) {
                    driverUserId = driver.userid;
                } else {
                    console.error('Driver not found.');
                    return;
                }
                let trips = await loadMobileTrips(temp);
                console.log(trips);
                filtertrips = trips.filter(trip => (trip.resource === parseInt(driverid)) && (trip.status === 10));
                console.log(filtertrips);
                unacceptedTripsFilteredList = trips.filter(trip => (trip.resource === parseInt(driverid)) && (trip.status === 11));
                unacceptedTripsFilteredList = unacceptedTripsFilteredList.filter(trip => (trip.start > temp));
                console.log(unacceptedTripsFilteredList);
                $('#tripinfolist').empty(); // Ensure previous content is cleared

                // Generate and append content for planned trips
                if (filtertrips.length > 0) {
                    let current = new Date();
                    if (accessLevel > 3) {
                        let header = `<div class="trip-general-col">
                            <div class="trip-header">
                                <h4>${PlannedTrips}</h4> 
                            </div>
                        </div>`;
                        div += header;
                        filtertrips.forEach(trip => {
                            if (trip.tripStep.length > 0) {
                                let tripstepend = trip.tripStep.length - 1;
                                div += `<div class="trip-general-grp-col">
                    <div class="trip-list-row">
                        <div class="trip-list-col">
                            <img class="icon-img m-r-20" src="/img/car.png" alt="">
                            <h4>${trip.mainpassenger}</h4>
                        </div>
                        <div class="trip-list-col">
                            <div class="trip-date-wrapper">
                                <div class="trip-date-col">
                                    <span>${formatTime(trip.start)} <br><b>${trip.tripStep[0].fromLocation?.locationName || ''}</b><br></span>
                                </div>
                                <div class="trip-date-col">
                                    <img class="icon-img" src="/img/arrow-back.png" alt="">
                                </div>
                                <div class="trip-date-col">
                                    <span>${formatTime(trip.end)}<br><b>${trip.tripStep[tripstepend].toLocation?.locationName || ''}</b><br></span>
                                </div>
                            </div>
                        </div>
                        <div class="trip-list-col">`;
                                let tripdate = new Date(trip.start);
                                let todaydate = new Date();
                                console.log(tripdate);
                                console.log(todaydate);
                                if (tripdate > todaydate) {
                                    div += `<div class="trip-general-footer showEvents" id="showEvents" data-id="${trip.id}">
                        <div class="add-more">
                            <h4>${TripActivities}</h4>
                        </div>
                                <img class="icon-img reverse" src="/img/back-arw.png" alt="">
                                <div class="trip-events-content" id="events-${trip.id}" style="display: none;"> </div>
                            </div>
                            
                        </div>
                        <div class="trip-list-col">
                            <div class='trip-general-footer'>
                                <button class="btn btn-yellow m-r-20 rejecttripmobile" title = "Reject" id="${trip.id}"> <span>${reinitiateTrip.text}</span></button>
                            </div>
                        </div>
                    </div>
                </div>`;
                                }
                                else {
                                    div += `<div class="trip-general-footer showEvents" id="showEvents" data-id="${trip.id}">
                        <div class="add-more">
                            <h4>${TripActivities}</h4>
                        </div>
                                <img class="icon-img reverse" src="/img/back-arw.png" alt="">
                                <div class="trip-events-content" id="events-${trip.id}" style="display: none;"> </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                                }

                            }
                        });
                        $('#tripinfolist').append(div);
                        $('.rejecttripmobile').off('click').on('click', function () {
                            var details = {
                                id: this.id,
                                status: 3
                            };
                            removeObjectById(filtertrips, this.id);
                            updateTripStatus(details);
                            $(this).closest('.trip-general-grp-col').css('display', 'none');
                        });
                    }
                    else {


                        let header = `<div class="trip-general-col">
                            <div class="trip-header">
                                <h4>${PlannedTrips}</h4> 
                            </div>
                        </div>`;
                        div += header;
                        filtertrips.forEach(trip => {
                            if (trip.tripStep.length > 0) {
                                let tripstepend = trip.tripStep.length - 1;
                                div += `<div class="trip-general-grp-col">
                    <div class="trip-list-row">
                        <div class="trip-list-col">
                            <img class="icon-img m-r-20" src="/img/car.png" alt="">
                            <h4>${trip.mainpassenger}</h4>
                        </div>
                        <div class="trip-list-col">
                            <div class="trip-date-wrapper">
                                <div class="trip-date-col">
                                    <span>${formatTime(trip.start)} <br><b>${trip.tripStep[0].fromLocation?.locationName || ''}</b><br></span>
                                </div>
                                <div class="trip-date-col">
                                    <img class="icon-img" src="/img/arrow-back.png" alt="">
                                </div>
                                <div class="trip-date-col">
                                    <span>${formatTime(trip.end)}<br><b>${trip.tripStep[tripstepend].toLocation?.locationName || ''}</b><br></span>
                                </div>
                            </div>
                        </div>
                        <div class="trip-list-col">
                            <div class="trip-general-footer showEvents" id="showEvents" data-id="${trip.id}">
                                <div class="add-more">
                                    <h4>${TripActivities}</h4>
                                </div>
                                <img class="icon-img reverse" src="/img/back-arw.png" alt="">
                                <div class="trip-events-content" id="events-${trip.id}" style="display: none;"> </div>

                            </div>
                        </div>
                    </div>
                </div>`;
                            }
                        });
                        $('#tripinfolist').append(div);
                    }
                }

                // Generate and append content for unaccepted trips if applicable
                if (unacceptedTripsFilteredList.length > 0) {
                    if (accessLevel > 3) {
                        let header = `<div class="trip-general-col">
                <div class="trip-header">
                    <h4>${UnacceptedTrips.text}</h4>
                </div>
            </div>`;
                        div = header;
                        unacceptedTripsFilteredList.forEach(trip => {
                            if (trip.tripStep.length > 0) {
                                let tripstepend = trip.tripStep.length - 1;
                                div += '<div class="trip-general-grp-col">';
                                div += `<div class='trip-list-row'>`;
                                div += `<div class='trip-list-col'>`;
                                div += `<img class='icon-img m-r-10' src='/img/car.png' alt=''>`;
                                div += `<h4>${trip.mainpassenger}</h4>`;
                                div += `</div>`;
                                div += `<div class='trip-list-col'>`;
                                div += `<div class='trip-date-wrapper'>`;
                                div += `<div class='trip-date-col'>`;
                                if (trip.tripStep[0].fromLocation?.locationName) {
                                    div += `<span>${formatTime(trip.start)} <br><b>${trip.tripStep[0].fromLocation.locationName}</b><br></span>`;
                                }
                                div += `</div>`;
                                div += `<div class='trip-date-col'>`;
                                div += `<img class='icon-img' src='/img/arrow-back.png' alt=''>`;
                                div += `</div>`;
                                div += `<div class='trip-date-col'>`;
                                if (trip.tripStep[tripstepend].toLocation?.locationName) {
                                    div += `<span>${formatTime(trip.end)} <br><b>${trip.tripStep[tripstepend].toLocation.locationName}</b><br></span>`;
                                }
                                div += `</div>`;
                                div += `</div>`;
                                div += `</div>`;
                                let tripdate = new Date(trip.start);
                                let todaydate = new Date();
                                if (tripdate > todaydate) {
                                    div += `<div class='trip-list-col'>`;
                                    div += `<div class='trip-general-footer'>`;
                                    div += `<button class="btn btn-yellow m-r-20 accepttripmobile" title="Accept" id="${trip.id}"><span>${acceptTrip.text}</span></button>`;
                                    div += `<button class="btn btn-yellow m-r-20 rejecttripmobile" title="Reject" id="${trip.id}"><span>${rejectTrip.text}</span></button>`;
                                    div += `</div>`;
                                    div += `</div>`;
                                }
                                div += '</div>';
                                div += `</div>`;
                            }
                        });
                        $('#tripinfolist').append(div);

                        // Bind click events after adding elements
                        $('.accepttripmobile').off('click').on('click', function () {
                            var details = {
                                id: this.id,
                                status: 10,
                                driverId: parseInt(driver.id.slice(1))
                            };
                            console.log(details);
                            removeObjectById(unacceptedTripsFilteredList, this.id);
                            updateTripStatus(details);
                            $(this).closest('.trip-general-grp-col').css('display', 'none');
                        });
                        $('.rejecttripmobile').off('click').on('click', function () {
                            var details = {
                                id: this.id,
                                status: 3
                            };
                            removeObjectById(unacceptedTripsFilteredList, this.id);
                            updateTripStatus(details);
                            $(this).closest('.trip-general-grp-col').css('display', 'none');
                        });
                    } else if (accessLevel == 3) {
                        if (userId == driverUserId) {
                            let header = `<div class="trip-general-col">
                    <div class="trip-header">
                        <h4>${UnacceptedTrips.text}</h4>
                    </div>
                </div>`;
                            div += header;
                            unacceptedTripsFilteredList.forEach(trip => {
                                if (trip.tripStep.length > 0) {
                                    let tripstepend = trip.tripStep.length - 1;
                                    div += '<div class="trip-general-grp-col">';
                                    div += `<div class='trip-list-row'>`;
                                    div += `<div class='trip-list-col'>`;
                                    div += `<img class='icon-img m-r-10' src='/img/car.png' alt=''>`;
                                    div += `<h4>${trip.mainpassenger}</h4>`;
                                    div += `</div>`;
                                    div += `<div class='trip-list-col'>`;
                                    div += `<div class='trip-date-wrapper'>`;
                                    div += `<div class='trip-date-col'>`;
                                    if (trip.tripStep[0].fromLocation?.locationName) {
                                        div += `<span>${formatTime(trip.start)} <br><b>${trip.tripStep[0].fromLocation.locationName}</b><br></span>`;
                                    }
                                    div += `</div>`;
                                    div += `<div class='trip-date-col'>`;
                                    div += `<img class='icon-img' src='/img/arrow-back.png' alt=''>`;
                                    div += `</div>`;
                                    div += `<div class='trip-date-col'>`;
                                    if (trip.tripStep[tripstepend].toLocation?.locationName) {
                                        div += `<span>${formatTime(trip.end)} <br><b>${trip.tripStep[tripstepend].toLocation.locationName}</b><br></span>`;
                                    }
                                    div += `</div>`;
                                    div += `</div>`;
                                    div += `</div>`;
                                }
                            });
                            $('#tripinfolist').append(div);

                            // Bind click events after adding elements
                            $('.accepttripmobile').off('click').on('click', function () {
                                var details = {
                                    id: this.id,
                                    status: 10,
                                    driverId: driver.id
                                };
                                removeObjectById(unacceptedTripsFilteredList, this.id);
                                updateTripStatus(details);
                                $(this).closest('.trip-general-grp-col').css('display', 'none');
                            });
                            $('.rejecttripmobile').off('click').on('click', function () {
                                var details = {
                                    id: this.id,
                                    status: 3
                                };
                                removeObjectById(unacceptedTripsFilteredList, this.id);
                                updateTripStatus(details);
                                $(this).closest('.trip-general-grp-col').css('display', 'none');
                            });
                        }
                    }
                }

                // Show the modal if there are trips to display
                if (filtertrips.length > 0 || unacceptedTripsFilteredList.length > 0) {
                    /* var myModal = new bootstrap.Modal(document.getElementById('TripInfoModal'));
 
                     // Show the modal
                     myModal.show();*/
                    $('#TripInfoModal').modal('show');
                    hideOverlay();
                }

                // Bind click event for closing the modal
                $('#TripInfoClose').off('click').on('click', function () {
                    $('#TripInfoModal').css('display', 'none');
                });

                // Bind click event to toggle events visibility
                $('.showEvents').on('click', function () {
                    var footer = $(this);
                    var eventsContentId = '#events-' + footer.data('id');
                    var eventsContent = $(eventsContentId);

                    // Toggle visibility
                    if (eventsContent.hasClass('expanded')) {
                        eventsContent.removeClass('expanded').slideUp();
                    } else {
                        // Clear existing content
                        eventsContent.html("");

                        let tripId = footer.data('id').slice(1); // Extract the trip ID
                        console.log(tripId);

                        $.ajax({
                            url: '/EventsDriver/GetEventsForTrip?tripId=' + tripId,
                            type: 'GET',
                            success: function (response) {
                                console.log(response);
                                if (response && response.length > 0) { // Check if there are events
                                    let htmlContent = '';
                                    response.forEach(event => {
                                        let start = new Date(event.dateFrom);
                                        let end = new Date(event.dateTo);
                                        htmlContent += `<div class="aco-body-col">
                            <h4>${event.eventName}</h4>
                            <span>${formatDate(start)}</span>
                            <img class='icon-img' src='/img/arrow-back.png' alt=''>
                            <span>${formatDate(end)}</span>
                        </div>`;
                                    });
                                    eventsContent.html(htmlContent);
                                    eventsContent.addClass('expanded').slideDown(); // Expand div only if there is content
                                } else {
                                    // If no events, you can choose to show a message or just not expand
                                    eventsContent.html(`<p>${EventsMsg}</p>`);
                                    eventsContent.addClass('expanded').slideDown(); // Optionally expand to show the "No events" message
                                }
                            },
                            error: function (error) {
                                console.error(error);
                                // Optionally handle errors by showing an error message
                                eventsContent.html("<p>Failed to load events.</p>");
                                eventsContent.addClass('expanded').slideDown(); // Optionally expand to show the error message
                            }
                        });
                    }
                });
            });
        });

    }
    function removeObjectById(array, idToRemove) {
        // Find the index of the object to remove
        const index = array.findIndex(object => object.id === idToRemove);

        // If the object was found, remove it
        if (index !== -1) {
            array.splice(index, 1);
        }
    }
    function addDuration(startDate, days, hours, minutes) {
        // Convert days, hours, and minutes to milliseconds
        var durationInMilliseconds = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
        console.log(startDate);
        // Calculate the end date and time
        var endDate = new Date(startDate.getTime() + durationInMilliseconds);

        return endDate;
    }
    function calculateDuration(startDate, endDate) {
        // Calculate the time difference in milliseconds
        var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());

        // Calculate the number of days
        var days = Math.floor(timeDiff / (1000 * 3600 * 24));

        // Calculate the number of hours
        var hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));

        // Calculate the number of minutes
        var minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));

        return {
            days: days,
            hours: hours,
            minutes: minutes
        };
    }

    function convertToUTC(localDateTimeString) {
        // Parse the local date and time string
        var localDateTime = new Date(localDateTimeString);

        // Get the time zone offset in minutes
        var timeZoneOffset = localDateTime.getTimezoneOffset();

        // Convert the time zone offset to milliseconds
        var offsetMilliseconds = timeZoneOffset * 60000;

        // Convert the local time to UTC by subtracting the offset
        var utcMilliseconds = localDateTime.getTime() - offsetMilliseconds;

        // Create a new Date object for the UTC time
        var utcDateTime = new Date(utcMilliseconds);

        // Return the UTC date and time as a string
        return utcDateTime.toUTCString();
    }
    // CRUD Operations

    //ADD/Edit Event
    function pushToDatabase(tempEvent) {
        var Id = 0;
        
        if (tempEvent.id !== "" && tempEvent.id !== null && tempEvent.id !== 0) {
            console.log(tempEvent.id)
            Id = parseInt(tempEvent.id.slice(1));
        }
        var tripid = null;
        if (tempEvent.tripId !== "" && tempEvent.tripId !== undefined) {
            tripid = parseInt(tempEvent.tripId);
        }
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        };
        return new Promise((resolve, reject) => {
            var editeddata = {
                id: Id,
                amount: tempEvent.amount,
                tripId: tripid,
                driverId: parseInt(tempEvent.driverId),
                eventkindId: parseInt(tempEvent.eventkind),
                dateFrom: new Date(tempEvent.start).toLocaleString('en-US', options),
                dateTo: new Date(tempEvent.end).toLocaleString('en-US', options),
                comments: tempEvent.description
            }
            console.log(editeddata);
            $.ajax({
                url: '/Eventsdriver/SaveOrEditEvent',
                method: 'POST',
                data: editeddata,
                success: function (data) {
                    console.log(data); // Log the data received from the server
                    resolve(data);

                },
                error: function (xhr, textStatus, exception) {
                    // Handle error response
                    console.error('Error:', textStatus, exception);
                    reject(error);

                }

            });
        })
    }
    function getVehicleDetails(driverid) {
        return new Promise((resolve, reject) => {

            $.ajax({
                url: '/ManagerDrivers/GetDriverByID',
                method: 'GET',
                data: { driverId: driverid },
                success: function (obj) {
                    console.log(obj);
                    resolve(obj.vehicleName);



                },
                error: function (error) {
                    reject(error);

                }
            });
        })
    }
    function getStatus(id) {
        let tripid = parseInt(id);
        return new Promise((resolve, reject) => {

            $.ajax({
                url: '/Trips/GetTripData?tripId=' + tripid,
                method: 'GET',

                success: function (obj) {
                    console.log(obj);
                    resolve(obj);




                },
                error: function (error) {
                    reject(error);

                }
            });
        })
    }
    function deletefromdatabase(event) {
        var id = parseInt(event.id.slice(1));
        $.ajax({
            url: '/Eventsdriver/DeleteEvent?id=' + id,
            method: 'DELETE',
            //data: id,
            success: function (data) {
                console.log(data);
            },
            error: function (xhr, textStatus, exception) {
                // Handle error response
                console.error('Error:', textStatus, exception);

            }

        });

    }
    function updateTripStatus(event) {
        console.log(event);
        var languageId = $('#langugeId').val();
        var edited = {
            tripId: parseInt(event.id.slice(1)),
            languageId: parseInt(languageId),
            status: event.status,
            externalServiceId: event.externalServiceId,
            driverId: event.driverId
        };
        console.log(edited);
        $.ajax({
            url: '/Trips/UpdatePlannedTrip',
            method: 'PUT',
            data: edited,
            //data: id,
            success: function (data) {
                console.log(data);
            },
            error: function (xhr, textStatus, exception) {
                // Handle error response
                console.error('Error:', textStatus, exception);

            }

        });
    }
    function getLocationCity(locationId) {
        console.log(locationId);
        ; return new Promise((resolve, reject) => {
            $.ajax({
                url: '/Location/GetLocationById?locationId=' + locationId,
                method: 'GET',
                //data: locationId,
                //data: id,
                success: async function (data) {
                    if (data !== null) {
                        obj = data.result.city;

                        resolve(obj);

                    }
                    console.log(data);
                },
                error: function (xhr, textStatus, exception) {
                    reject(exception);
                    // Handle error response
                    console.error('Error:', textStatus, exception);

                }

            });
        })
    }
    async function getTripAssociates(driverid, from, to, check) {
        let datefrom = formatDate(from);
        let dateto = formatDate(to);
        showOverlay();
        return new Promise((resolve, reject) => {
            const param = {
                driverId: parseInt(driverid),
                dateFrom: datefrom,
                dateTo: dateto,
                check: check
            };

            $.ajax({
                url: '/EventsDriver/TripAssociates',
                method: 'GET',
                data: param,
                success: async function (data) {
                    if (data !== null) {
                        try {
                            // Use Promise.all to handle an array of promises
                            const result = await Promise.all(data.map(async (ele) => {
                                let tripdate = convertDate(ele.tripDate);
                                console.log(ele.tripDate);
                                let tripobj = await getStatus(ele.tripId);
                                let tripsteps = tripobj.tripSteps;
                                let len = tripsteps.length - 1;
                                let fromLocation;
                                let endLocation;
                                if (len >= 0) {

                                    if (tripsteps[0].startLocationId !== undefined && tripsteps[len].endLocationId !== undefined) {

                                        fromLocation = await getLocationCity(tripsteps[0].startLocationId);
                                        endLocation = await getLocationCity(tripsteps[len].endLocationId);
                                    }
                                    if (fromLocation !== undefined && endLocation !== undefined) {

                                        return {
                                            Id: ele.tripId,
                                            Name: `${tripdate} ${ele.mainPassenger} From ${fromLocation} To ${endLocation}  `
                                        };
                                    }
                                    else {
                                        return {
                                            Id: ele.tripId,
                                            Name: `${tripdate}  ${ele.mainPassenger}`
                                        };
                                    }
                                }
                                else {
                                    return {
                                        Id: ele.tripId,
                                        Name: `${tripdate}  ${ele.mainPassenger}`
                                    };
                                }
                            }));
                            hideOverlay();
                            resolve(result); // Resolving with the array of results
                        } catch (error) {
                            reject(error); // Handle any errors from Promise.all or async functions
                        }
                    } else {
                        resolve([]); // Resolve with an empty array if no data
                    }
                },
                error: function (xhr, textStatus, exception) {
                    reject(exception); // Reject the promise in case of an AJAX error
                    console.error('Error:', textStatus, exception);
                }
            });
        });
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



    function TestMobileWeekEvents(firstday, lastday) {
        console.log(firstday)
        console.log(lastday)

        return new Promise((resolve, reject) => {
            let d = sessionStorage.getItem('drivermobile');
            console.log(d)// Get driver ID from session storage
            var param = {
                dateFrom: formatDate(firstday),
                dateTo: formatDate(lastday)
            };

            $.ajax({
                url: `/Eventsdriver/GetAllEvents`,
                type: 'GET',
                data: param,
                success: function (response) {
                    console.log(response);
                    let events = [];
                    // Filter and map events based on the driver ID
                    events = response
                        .filter(event => event.driverId == d) // Only include events where driverId matches
                        .map(function (event) {
                            var startdate = new Date(event.dateFrom);
                            var enddate = new Date(event.dateTo);
                            var tripid = event.tripId ? event.tripId : ''; // Use a shorthand for checking tripId

                            return {
                                id: event.id,
                                name: event.eventName,
                                description: event.comment,
                                dragBetweenResources: false,
                                tripId: tripid,
                                dragInTime: false,
                                resize: false,
                                start: startdate, // Convert start date to JavaScript Date object
                                end: enddate, // Convert end date to JavaScript Date object
                                title: event.eventName, // Provide a default title if one is not available in your data
                                driverName: event.driverName,
                                eventkindId: event.eventKindId,
                                color: event.color
                            };
                        });
                    console.log(events);
                    // Resolve the promise with the filtered events
                    resolve(events);


                },
                error: function (error) {
                    // Reject the promise in case of an error
                    reject('Error fetching events: ' + error);
                }
            });
        });
    }

});