/*const { parseDate } = require("../js/flatpickr");*/


var isMobile = Math.min(window.screen.width, window.screen.height) < 600 || navigator.userAgent.indexOf("Mobi") > -1;

if (isMobile) {
    $("#mnuTripOutOfPolicy").closest('li').css("display", "none");
} else {
    $("#mnuTripOutOfPolicy").closest('li').css("display", "block");
}

var userdata = {};
var Reject;
var Accept;
var data;
var PrintTrip;
var AcceptTrips;
var RejectTrips;
var AcceptCancelledTrips;
var RejectCancelledTrips;
var DetailsofTrip;
var CancelReject;
var CancelAccept;
var ShowConfirmCancel;
var CancelConfirm;
var ShowRejectCancel;
var RejectCancelledTrip;
var ValidateNoTripsMessage;
var enablePrint = true;


var $grid1 = $("#validation-grid"),
    newWidth1 = $grid1.closest(".ui-jqgrid").parent().width();
$grid1.jqGrid("setGridWidth", newWidth1, true);


const initializeGrid = (gridId, colModel, colNames, mydata) => {
    var $grid = $("#validation-grid");


    if (!$('#no-data-message').length) {
        $grid.parent().append("<div id='no-data-message' style='display:none;'>" + ValidateNoTripsMessage + "</div>");

        // Set CSS for centering the message
        $('#no-data-message').css({
            'position': 'absolute',
            'top': '50%',
            'left': '50%',
            'transform': 'translate(-50%, -50%)',
            'font-size': '20px',
            'color': '#333',  // Customize color as needed
            'text-align': 'center',
            'z-index': '1000',
            'font-weight': 'bold'// Ensure it's on top of other content
        });
    }

    // Clear existing data in the grid
    jQuery(gridId).jqGrid("clearGridData");

    if (mydata && mydata.length > 0) {
        // If data is available, initialize the grid with the data
        jQuery(gridId).jqGrid({
            datatype: "local",
            colModel: colModel,
            colNames: colNames,
            data: mydata,
            editable: true,
            viewrecords: true,
            autowidth: false,
            loadComplete: function (data) {
                if ($grid.jqGrid('getGridParam', 'records') === 0) {
                    $('#no-data-message').show();  // Show the message if no data
                } else {
                    $('#no-data-message').hide();  // Hide the message if data is available
                }
            },
            height: "calc(100vh - 280px)",
            altRows: true,
            altclass: 'myAltClass',
            multiselect: false,
            resizable: false,
        }).trigger("reloadGrid");

        // Remove the "No data available" message
        jQuery(gridId).siblings('.no-data-message').remove();
        hideOverlay1();
        //setTimeout(function () {
        //    hideOverlay();
        //}, 2000)
    } else {
        // If no data is available, show a message in the grid
        jQuery(gridId).jqGrid({
            datatype: "local",
            colModel: colModel,
            colNames: colNames,
            data: [],
            height: "calc(100vh - 280px)",
            loadComplete: function (data) {
                if ($grid.jqGrid('getGridParam', 'records') === 0) {
                    $('#no-data-message').show();  // Show the message if no data
                } else {
                    $('#no-data-message').hide();  // Hide the message if data is available
                }
            },
            emptyrecords: true,
            altRows: true,
            altclass: 'myAltClass',
            multiselect: false,
            resizable: false,
        }).trigger("reloadGrid");

        // Add the "No data available" message

        //showNoDataMessage(gridId, true);

        // Hide grid headers when there is no data
        jQuery(gridId).closest(".ui-jqgrid-view").find(".ui-jqgrid-hbox").hide();
        hideOverlay1();
        //setTimeout(function () {
        //    hideOverlay();
        //}, 2000)
    }


};

const reloadGridWithData = (gridId, result) => {
    var $grid = $("#validation-grid");
    showOverlay1();
    if (!$('#no-data-message').length) {
        $grid.parent().append("<div id='no-data-message' style='display:none;'>" + ValidateNoTripsMessage + "</div>");

        // Set CSS for centering the message
        $('#no-data-message').css({
            'position': 'absolute',
            'top': '50%',
            'left': '50%',
            'transform': 'translate(-50%, -50%)',
            'font-size': '20px',
            'color': '#333',  // Customize color as needed
            'text-align': 'center',
            'z-index': '1000',
            'font-weight': 'bold'// Ensure it's on top of other content
        });
    }
    // Clear existing data in the grid
    jQuery(gridId).jqGrid("clearGridData");

    if (result && result.length > 0) {
        // If data is available, set the new data and reload the grid

        jQuery(gridId).jqGrid("setGridParam", { data: result, datatype: "local" }).trigger("reloadGrid");

        // Show grid headers (in case they were hidden previously)
        jQuery(gridId).closest(".ui-jqgrid-view").find(".ui-jqgrid-hbox").show();
    } else {

        // If no data is available, hide grid headers and show a message in the grid
        jQuery(gridId).closest(".ui-jqgrid-view").find(".ui-jqgrid-hbox").hide();
        jQuery(gridId).jqGrid({
            datatype: "local",
            data: [],
            caption: "No data available",
            height: "calc(100vh - 280px)",
            loadComplete: function (data) {
                if ($grid.jqGrid('getGridParam', 'records') === 0) {
                    $('#no-data-message').show();  // Show the message if no data
                } else {
                    $('#no-data-message').hide();  // Hide the message if data is available
                }
            },
            emptyrecords: true,
            altRows: true,
            altclass: 'myAltClass',
            multiselect: false,
            resizable: false,
        }).trigger("reloadGrid");
    }
    $('#alertPrint').on('click', function () {
        $('.permission').modal('show');
        $('.permission').fadeIn();
        // Delay for 5 seconds
        setTimeout(function () {
            $('.permission').modal('hide');
        }, 3000);
        //trippopup.close();
    });
};





const formatGridData = (data) => {
    console.log('received data', data);
    var mydata = [];
    data.forEach(function (trip) {

        var statusClass, flightIcon, emailIcon;
        // Determine status class
        switch (trip.status) {
            case 2:
                statusClass = "status-pink";
                break;
            case 6:
                statusClass = "status-yellow";
                break;
            default:
                statusClass = "status-pink";
        }

        switch (trip.flightType) {
            case 2:
                flightIcon = "<img src='../img/flight-land.png'>";
                break;
            case 1:
                flightIcon = "<img src='../img/flight-takeoff.png'>";
                break;
            default:
                flightIcon = null;
        }


        var formattedDate = new Date(trip.fromDate).toLocaleDateString("en-GB");

        IsPast = false;
        if (new Date(trip.fromDate) < new Date()) {
            IsPast = true;
            statusClass = "status-gray";
        }

        var options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // Use 24-hour format 
        };

        if (trip.tripSteps != null) {
            emailIcon = (trip.isMailSent) ? "<img src='../img/email.png'>" : "";

            var formattedDate = new Date(trip.fromDate).toLocaleDateString("en-GB");

            var uniquePassengers = new Set();

            var passengers = trip.tripSteps.map(function (step) {
                if (step.passengers) {
                    step.passengers.forEach(function (passenger) {
                        var fullName = passenger.firstName + " " + passenger.lastName;
                        uniquePassengers.add(fullName);
                    });
                }
                return "";
            });

            var passengersInStep = Array.from(uniquePassengers).join("<br>");

            var beneficiaries = "<div>" + passengersInStep + "</div>";

            var fromLocations = trip.tripSteps.map(function (step) {
                var fromDate = new Date(step.tripFromDate).toLocaleDateString("en-GB");
                var fromTime = new Date(step.tripFromDate).toLocaleTimeString("en-GB", options);

                return "<div>" + fromDate + " " + fromTime + "  " + step.fromLocation.locationName + "</div>";

            }).join("");

            var toLocations = trip.tripSteps.map(function (step) {
                var toDate = new Date(step.tripToDate).toLocaleDateString("en-GB");
                var toTime = new Date(step.tripToDate).toLocaleTimeString("en-GB", options);

                return "<div>" + toDate + " " + toTime + "  " + step.toLocation.locationName + "</div>";
            }).join("");
        }

        var date = null;
        if (formattedDate) {
            var parts = formattedDate.split("/");
            date = new Date(parts[2], parts[1] - 1, parts[0]);
        }

        //// Get the current date
        //var currentDate = new Date();

        //console.log('date', date, 'current date', currentDate);

        var action;
        action =
            "<div id='actions-container' class='btn-grid-blk'>" +
            "<div id='detail-action-btn' class='detail-val' title='" + DetailsofTrip + "' data-id='" + trip.tripId + "' onclick='ValidationDetails(" + trip.tripId + ")' >" +
            "<img id='' src='/img/file-text.png' class='action-btn' data-id=''></div >";

        if (IsPast == false) {
            if (statusClass == "status-pink") {
                action += "<div id='AcceptId' class='accept-button' title='" + AcceptTrips + "' data-tripid=' ' onclick='AcceptTrip(" + trip.tripId + ", \"" + statusClass + "\")'>" +
                    "<img class='action-btn' src='../img/check.png'> " +
                    "</div>" +
                    "<div id='RejectId' class='reject-button' title='" + RejectTrips + "' data-tripid=' 'onclick='RejectTrip(" + trip.tripId + ", \"" + statusClass + "\")'>" +
                    "<img class='action-btn' src='../img/close.png'>" +
                    "</div >";
            }

            else {
                action += "<div id='AcceptId' class='accept-button' title='" + AcceptCancelledTrips.replace(/'/g, "&#39;") + "' data-tripid=' ' onclick='AcceptTrip(" + trip.tripId + ", \"" + statusClass + "\")'>" +
                    "<img class='action-btn' src='../img/check.png'> " +
                    "</div>" +
                    "<div id='RejectId' class='reject-button' title='" + RejectCancelledTrips.replace(/'/g, "&#39;") + "' data-tripid=' ' onclick='RejectTrip(" + trip.tripId + ", \"" + statusClass + "\")'>" +
                    "<img class='action-btn' src='../img/close.png'>" +
                    "</div>";

            }
        }

        if (enablePrint == true) {
            action += "<div id='printId' class='print-button' title='" + PrintTrip + "' data-tripid=' ' onclick='PrintTripValidation(" + trip.tripId + ")'>" +
                "<img id='print-action-btn' src='../img/material-print.png' class='action-btn' >" +
                "</div>" +
                "</div > ";
        }
        else {
            action += "<div title='Print' data-tripid=' 'onclick='ShowAlert()'>" +
                "<img id='alertPrint' src='../img/material-print.png' class='action-btn' >" +
                "</div>" +
                "</div > ";
        }



        var row = {
            tripId: trip.tripId,
            staus: "<span class='status " + statusClass + "'></span>",
            flight: flightIcon,
            email: emailIcon ? emailIcon : null,
            Date: formattedDate ? formattedDate : null,
            From: fromLocations ? fromLocations : null,
            To: toLocations ? toLocations : null,
            Beneficiary: "<div>" + beneficiaries + "</div>",
            Requester: trip.requestedUser.userName ? trip.requestedUser.userName : null,
            FlightInfo: trip.flightNumber,
            Action: action
        };
        mydata.push(row);
    });
    console.log('output data', mydata);
    return mydata;
};

const formatMobileGridData = (data) => {
    var mydata = [];
    data.forEach(function (trip) {

        var statusClass, flightIcon, emailIcon;

        switch (trip.status) {
            case 2:
                statusClass = "status-pink";
                break;
            case 6:
                statusClass = "status-yellow";
                break;
            default:
                statusClass = "status-pink";
        }

        switch (trip.flightType) {
            case 2:
                flightIcon = '/img/flight-land.png';
                break;
            case 1:
                flightIcon = '/img/flight-takeoff.png';
                break;
            default:
                flightIcon = null;
        }

        var formattedDate = new Date(trip.fromDate).toLocaleDateString("en-GB");

        IsPast = false;
        if (new Date(trip.fromDate) < new Date()) {
            IsPast = true;
            statusClass = "status-gray";
        }

        var date = null;
        if (formattedDate) {
            var parts = formattedDate.split("/");
            date = new Date(parts[2], parts[1] - 1, parts[0]);
        }

        var tripStepsData = [];
        var passengersData = [];

        if (trip.tripSteps != null) {


            trip.tripSteps.forEach(function (step) {

                var fromDateTime = step.tripFromDate;
                var toDateTime = step.tripToDate;
                var fromLocation = step.fromLocation.locationName;
                var toLocation = step.toLocation.locationName;

                var fromDate = new Date(fromDateTime);

                let hours = fromDate.getHours();
                let minutes = fromDate.getMinutes();

                hours = hours.toString().padStart(2, '0');
                minutes = minutes.toString().padStart(2, '0');

                var fromTime = `${hours}:${minutes}`;

                var toDate = new Date(toDateTime);

                hours = toDate.getHours();
                minutes = toDate.getMinutes();

                hours = hours.toString().padStart(2, '0');
                minutes = minutes.toString().padStart(2, '0');

                var toTime = `${hours}:${minutes}`;

                var tripStep = '<span>' + fromTime + "  " + fromLocation + " -> " + toTime + "  " + toLocation + '</span>';

                if (step.passengers != null) {
                    step.passengers.forEach(function (passenger) {

                        var passenger = '<span>' + passenger.firstName + ' ' + passenger.lastName + '</span>';

                        passengersData.push(passenger);

                    });
                }
                tripStepsData.push(tripStep);
            });

        }

        var row = {
            tripId: trip.tripId,
            date : formattedDate,
            staus: statusClass,
            flight: flightIcon,
            requester: trip.requestedUser.userName,
            flightInfo: trip.flightNumber,
            email: trip.isMailSent ? trip.isMailSent : false,
            tripSteps: tripStepsData,
            passengers: passengersData,
            isPast: IsPast
        };

        mydata.push(row);
    });

    console.log("Data After formatting", mydata);
    return mydata;
};


const initializeMobileGridData = (data) => {

    console.log('data', data);
    tripsForMobile = data;
    console.log('data', tripsForMobile);
    $('.validation-grid-mobile').empty();

    // Initial load
    loadItems();


};

var tripsForMobile = [];

let loadedItems = 0;
const itemsPerLoad = 5;

const loadItems = () => {
    console.log('2', tripsForMobile);
    const container = $('.validation-grid-mobile');
    for (let i = loadedItems; i < loadedItems + itemsPerLoad && i < tripsForMobile.length; i++) {
        const trip = tripsForMobile[i];
        console.log('trip', trip);
        const newTrip = $('.validation-item-mobile').first().clone();

        newTrip.find(".validation-item-mobile-header").attr('id', ("validation-item-mobile-header" + i));
        newTrip.find(".validation-item-mobile-header-button").attr('data-bs-target', ("#validation-item-mobile-collapse" + i));
        newTrip.find(".validation-item-mobile-header-button").attr('aria-controls', ("validation-item-mobile-collapse" + i));
        if (i == 0) {
            newTrip.find(".validation-item-mobile-collapse").addClass("show");
        }
        newTrip.find(".validation-item-mobile-collapse").attr('id', ("validation-item-mobile-collapse" + i));
        newTrip.find(".validation-item-mobile-collapse").attr('aria-labelledby', ("validation-item-mobile-header" + i));

        newTrip.find('.mobile-requestor-name').text(trip.requester);

        newTrip.find('.mobile-trip-status').addClass(trip.staus);


        newTrip.find('.mobile-trip-flight-type').attr('src', trip.flight);
        newTrip.find('.mobile-flight-num').text(trip.flightInfo);
        newTrip.find('.mobile-from-date').text(trip.date);

        if (trip.isPast == false) {
            newTrip.find(".validation-item-mobile-accept").on("click", function () {
                AcceptTripMobile(trip.tripId, trip.staus);
            });

            newTrip.find(".validation-item-mobile-reject").on("click", function () {
                RejectTripMobile(trip.tripId, trip.staus);
            });
        } else {
            newTrip.find(".validation-item-mobile-accept").remove();
            newTrip.find(".validation-item-mobile-reject").remove();
        }


        newTrip.find(".validation-item-mobile-print").on("click", function () {
            PrintTripValidation(trip.tripId);
        });
        newTrip.find("#detail-action-btn").on("click", function () {
            sessionStorage.setItem('redirectTripId', trip.tripId);
            $("#main-tab1").css('display', 'none');
            $("#main-tab3").fadeIn();
            $(".search-tab").hide();
            $(".search-detail-tab").show();
        })

        const tripStepsContainer = newTrip.find('.mobile-trip-steps');
        tripStepsContainer.empty();
        trip.tripSteps.forEach(tripStep => {
            tripStepsContainer.append(tripStep);
        });

        const passengersContainer = newTrip.find('.mobile-passengers');
        passengersContainer.empty();
        trip.passengers.forEach(passenger => {
            passengersContainer.append(passenger);
        });

        newTrip.css("display", "block");
        container.append(newTrip);
    }
    loadedItems += itemsPerLoad;
    hideOverlay1();
};
$(document).ready(function () {
    showOverlay1();
    var Requestor;
    var From;
    var To;
    var Beneficiary;
    var FlightInfo;
    var colModelGrid2;
    var colNames2;

    // #region [popup.js]


    var roles = jQuery("#rolesList").val();
   // var checkRole = JSON.parse(roles);
    //console.log(checkRole);
   // var access = checkRole.find(role => role.ToolId == 37);
    //console.log(access);
    var userType = $("#userType").val();
   /* if (access == undefined || access.IsEnabled == false) {
        enablePrint = false;
    }*/

    //#endregion
    // #region [validation]

    var filterValues = {};



    $.ajax({
        url: '/Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("language translation data", data);
            userdata = data;
            Requestor = data.Requestor;
            From = data.From;
            To = data.To;
            Beneficiary = data.Beneficiary,
                FlightInfo = data.FlightInfo;
            AcceptTrips = data.AcceptTrip;
            RejectTrips = data.RejectTrip;
            AcceptCancelledTrips = data.AcceptCancelledTrips;
            RejectCancelledTrips = data.RejectCancelledTrips;
            DetailsofTrip = data.DetailsofTrip;
            PrintTrip = data.PrintTrip;
            Reject = data.RejectPopup;
            Accept = data.AcceptPopup;
            CancelReject = data.CancelReject;
            CancelAccept = data.CancelAccept;
            ShowConfirmCancel = data.ShowConfirmCancel;
            CancelConfirm = data.CancelConfirm;
            ShowRejectCancel = data.ShowRejectCancel;
            RejectCancelledTrip = data.RejectCancelledTrip;
            ValidateNoTripsMessage = data.validateNoTripsMessage;

            colModelGrid2 = [
                { name: 'tripId', index: 'tripId', hidden: true },
                { name: 'staus', width: 10, index: 'staus', align: 'center' },
                { name: 'flight', width: 10, index: 'flight', align: 'center' },
                { name: 'email', width: 10, index: 'email', align: 'center' },
                { name: 'Requester', index: 'Requester', width: 40, align: 'left' },
                { name: 'From', index: 'From', width: 80, align: 'left' },
                { name: 'To', index: 'To', width: 80, align: 'left' },
                { name: 'Beneficiary', index: 'Beneficiary', width: 50, align: 'left' },
                { name: 'FlightInfo', index: 'FlightInfo', width: 20, align: 'left' },
                { name: 'Action', index: 'Action', width: 50, align: 'center' }
            ];

            colNames2 = ['', '', '', '', Requestor, From, To, Beneficiary, FlightInfo, 'Action(s)'];



            $.ajax({
                url: '/Validation/GetValidationTrips',
                type: 'GET',
                dataType: 'json',
                data: params,
                success: function (response) {
                    console.log(response);
                    statusCheck = response;
                    var mydata = [];
                    if (response != null) {
                        if (!isMobile) {
                            var result = formatGridData(response);
                            if (result != null) {
                                initializeGrid("#validation-grid", colModelGrid2, colNames2, result);
                                setTimeout(function () {
                                    //hideOverlay();  // Hide overlay after ensuring data is loaded
                                }, 1000);
                            }
                            else {
                                console.log('GetValidationTrip response is null, No trips to display--->', response);
                            }
                        }
                        else {

                            console.log('GetValidationTrip mobile response is null, No trips to display--->', response);

                            var result = formatMobileGridData(response);

                            if (result != null) {
                                initializeMobileGridData(result);
                                /*('$mobile-planning-screen').hide();*/
                            }

                            $(".dashboard-col-system").removeClass("visible-div");
                            $(".dashboard-col-system").addClass("hide-div");
                            $(".dashboard-col-mobile").removeClass("hide-div");
                            $(".dashboard-col-mobile").addClass("visible-div");
                        }
                    }
                    else {
                        //Add the Message to show no trips here
                        initializeGrid("#validation-grid", colModelGrid2, colNames2, response);
                        hideOverlay1();
                    }
                    setTimeout(function () {
                        // hideOverlay();  // Hide overlay after ensuring data is loaded
                    }, 1000);
                },
                error: function (xhr, status, error) {
                    console.error('Error fetching data:', error);
                    console.log('Status:', status);
                    console.log('XHR:', xhr);
                    hideOverlay1();
                }
            });

        },
        error: function () {
            console.error("Error fetching localization data.");
            hideOverlay1();
        }
    });

    $(document).on('click', '#driverToolTip', function () {
        $('#DetailsChange').text(userdata.DriverDetails);
    });

    $(document).on('click', '#requestedUserToolTip', function () {
        $('#DetailsChange').text(userdata.RequestorDetails);
    });

    $(document).on('click', '#mainPassengerToolTip', function () {
        $('#DetailsChange').text(userdata.PassengerDetails);
    });




    var filterData = {};
    $("#printId").on("click", function () {
        console.log("print btn clicked");
        var languageId = $('#langugeId').val();

        // Set the report name based on the language ID
        var reportNameEncoded;
        if (languageId == 1) {
            reportNameEncoded = "ValidationTrips.trdp"; // Default report for English
        } else {
            reportNameEncoded = "ValidationTrips_FR.trdp"; // French report or other language
        }
        function isNullOrEmpty(value) {
            return value == null || value === "";
        }

        if (filterData == null ||
            (isNullOrEmpty(filterData.dateValue) && isNullOrEmpty(filterData.fromValue) && isNullOrEmpty(filterData.requestorValue) &&
                isNullOrEmpty(filterData.toValue) && isNullOrEmpty(filterData.beneficiaryValue) &&
                isNullOrEmpty(filterData.flightInfoValue))) {
            var dateValue = null;
            var fromValue = null;
            var toValue = null;
            var requestorValue = null;
            var beneficiaryValue = null;
            var flightInfoValue = null;

            var url = "/Home/TelerikReport" + '?' +
                "dateValue=" + encodeURIComponent(dateValue) +
                "&fromValue=" + encodeURIComponent(fromValue) +
                "&toValue=" + encodeURIComponent(toValue) +
                "&requestorValue=" + encodeURIComponent(requestorValue) +
                "&beneficiaryValue=" + encodeURIComponent(beneficiaryValue) +
                "&flightInfoValue=" + encodeURIComponent(flightInfoValue) +
                "&report=" + encodeURIComponent(reportNameEncoded);
            window.open(url, '_blank');
        }
        else {
            var url = "/Home/TelerikReport" + '?' +
                "dateValue=" + encodeURIComponent(filterData.dateValue) +
                "&fromValue=" + encodeURIComponent(filterData.fromValue) +
                "&toValue=" + encodeURIComponent(filterData.toValue) +
                "&requestorValue=" + encodeURIComponent(filterData.requestorValue) +
                "&beneficiaryValue=" + encodeURIComponent(filterData.beneficiaryValue) +
                "&flightInfoValue=" + encodeURIComponent(filterData.flightInfoValue) +
                "&report=" + encodeURIComponent(reportNameEncoded);

            window.open(url, '_blank');
        }
    });





    $('.validation-grid-mobile').on('scroll', function () {
        if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
            loadItems();
        }
    });


    var filterValues = {};


    var params = {
        isMyAllTrips: true,
        isMyFutureTrips: false
    };



    $(document).on("click", "#applying-filter", function () {

        var paramsFilter = {
            dateValue: $("#filterForDate").val(),
            requestorValue: $("#filterRequestor").val(),
            beneficiaryValue: $("#filterBeneficiary").val(),
            fromValue: $("#filterFromLocation").val(),
            toValue: $("#filterToLocation").val(),
            flightInfoValue: $("#filterFlightInfo").val()
        }

        filterData = paramsFilter;

        console.log('validation filter ', paramsFilter);


        $("#validationFilter").modal("hide");
        showOverlay1();
        $.ajax({
            url: '/Validation/GetValidationTrips',
            type: 'GET',
            dataType: 'json',
            data: paramsFilter,
            success: function (response) {
                console.log('response inside applyFilter--->', response);
                $grid1.jqGrid("clearGridData", true);

                var mydata = [];

                if (response != null) {
                    if (!isMobile) {
                        var result = formatGridData(response);
                        if (result != null) {
                            reloadGridWithData("#validation-grid", result);
                        }
                    } else {

                        console.log('GetValidationTrip response--->', response);

                        var result = formatMobileGridData(response);

                        if (result != null) {
                            console.log("relosding the mobile screen");
                            loadedItems = 0;
                            initializeMobileGridData(result);
                        }

                        $(".dashboard-col-system").removeClass("visible-div");
                        $(".dashboard-col-system").addClass("hide-div");
                        $(".dashboard-col-mobile").removeClass("hide-div");
                        $(".dashboard-col-mobile").addClass("visible-div");
                    }
                }
                hideOverlay1();
            },
            error: function (xhr, status, error) {
                console.error('Error fetching data:', error);
                console.log('Status:', status);
                console.log('XHR:', xhr);
            }
        });

    });




    $(document).on('click', "#filterOpen", function () {
        filterValues.dateValue = $("#filterForDate").val();
        filterValues.requestorValue = $("#filterBeneficiary").val();
        filterValues.beneficiaryValue = $("#filterBeneficiary").val();
        filterValues.fromValue = $("#filterFromLocation").val();
        filterValues.toValue = $("#filterToLocation").val();
        filterValues.flightInfoValue = $("#filterFlightInfo").val();

        console.log('filter Data --->', filterValues);
    });


    $(document).on("click", "#closeFilter", function () {
        console.log("closeFilter btn clicked");

        console.log('filter Data --->', filterValues);
        $("#filterForDate").val(filterValues.dateValue);
        $("#filterBeneficiary").val(filterValues.requestorValue);
        $("#filterBeneficiary").val(filterValues.beneficiaryValue);
        $("#filterFromLocation").val(filterValues.fromValue);
        $("#filterToLocation").val(filterValues.toValue);
        $("#filterFlightInfo").val(filterValues.flightInfoValue);

    });
    $(document).on("click", "#RefreshId", function () {
        console.log("refreshclicked");
        //('$mobile-planning-screen').css('display', 'none');
        RefreshValidation();
    });


    //    if ($('li.main-active').find('#mnuTripValidation').length > 0) {
    //        alert('Hello active refresh');
    //        RefreshValidation();
    //    }
    //});

    $(".main-tabs-nav3 li").click(function (e) {
        e.preventDefault();

        // Execute specific functions based on the clicked <li>
        var liId = $(this).find("a").attr("id");
        console.log("liId, ", liId);

        // Always execute the functions regardless of the class state
        if (liId === "mnuTripValidation") {
            console.log("mnuTripValidation refresdh");
            //$('#mobile-planning-screen').css('display', 'none');
            $('#statusBottom').show();
            RefreshValidation();
        }
    });

});

function ShowAlert() {

    $('.permission').modal('show');
    $('.permission').fadeIn();
    // Delay for 5 seconds
    setTimeout(function () {
        $('.permission').modal('hide');
    }, 3000);
    //trippopup.close();

}

const ValidationDetails = (tripId) => {

    jQuery("#main-tab1").hide();
    jQuery("#main-tab3").fadeIn();
    $(".search-tab").hide();
    $(".search-detail-tab").show();
}


function PrintTripValidation(tripId) {
    // Get the ID from the 'data-id' attribute
    var languageId = $('#langugeId').val();
    var id = tripId;
    console.log('TripId->', id);
    var reportNameEncoded;
    if (languageId == 1) {
        reportNameEncoded = "TripReviewPrint.trdp"; 
    } else {
        reportNameEncoded = "TripReviewPrint_FR.trdp";
    }

    //var reportNameEncoded = "TripReviewPrint.trdp";
    var parameterString = "tripId=" + id + "&report=" + reportNameEncoded;
    var url = "/Home/TelerikReport" + '?' + parameterString;
    //window.location.href = "/Home/TelerikReport" + '?' + parameterString;
    window.open(url, '_blank');
}

function RefreshValidation() {
    $("#filterRequestor").val("");
    $("#filterFromLocation").val("");
    $("#filterToLocation").val("");
    $("#filterFlightInfo").val("");
    $("#filterBeneficiary").val("");
    $("#filterForDate").val("");

    var paramsClearFilter = {
        requestorName: $("#filterRequestor").val(),
        dateValue: $("#filterForDate").val(),
        beneficiaryValue: $("#filterBeneficiary").val(),
        fromValue: $("#filterFromLocation").val(),
        toValue: $("#filterToLocation").val(),
        flightInfoValue: $("#filterFlightInfo").val()
    }
    console.log("refresh", paramsClearFilter);
    showOverlay1();
    $.ajax({
        url: '/Validation/GetValidationTrips',
        type: 'GET',
        dataType: 'json',
        data: paramsClearFilter,
        success: function (response) {
            console.log('response inside clearFilter--->', response);
            $grid1.jqGrid("clearGridData", true);

            var mydata = [];
            if (response != null) {
                if (!isMobile) {
                    var result = formatGridData(response);
                    if (result != null) {
                        reloadGridWithData("#validation-grid", result);
                    }
                } else {

                    console.log('GetValidationTrip response--->', response);

                    var result = formatMobileGridData(response);

                    if (result != null) {
                        console.log("relosding the mobile screen");
                        loadedItems = 0;
                        initializeMobileGridData(result);
                    }

                    $(".dashboard-col-system").removeClass("visible-div");
                    $(".dashboard-col-system").addClass("hide-div");
                    $(".dashboard-col-mobile").removeClass("hide-div");
                    $(".dashboard-col-mobile").addClass("visible-div");
                }
            }
            else {
                hideOverlay1();
                reloadGridWithData("#validation-grid", response);
            }
            hideOverlay1();
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data:', error);
            console.log('Status:', status);
            console.log('XHR:', xhr);
        }
    });
}

//Accept trip For Mobile
const AcceptTripMobile = (tripId, statusClass) => {
    if (tripId === undefined) {
        console.error("tripId is undefined");
        return;
    }

    if (statusClass == 'status-pink') {
        showConfirmPopup(Accept)
    }
    else {
        showConfirmPopup(ShowConfirmCancel)
    }
    $('#confirm-button').off('click').on('click', function () {
        hideConfirmPopup();
        console.log("Accepting trip in mobile...");
        showOverlay1();
        $.ajax({
            type: "PUT",
            url: "/Validation/AcceptTrip",
            data: { tripId: tripId },
            success: function (response) {

                if (statusClass == 'status-pink') {
                    alertCustom(0, CancelAccept);
                }
                else {
                    alertCustom(0, CancelConfirm);
                }

                console.log('accepted tripId in mobile', tripId);

                hideOverlay1();
                RefreshValidation();
            },
            error: function (xhr, status, error) {
                console.error('Error Accepting row:', error);
            }
        });
    });
}
//Accept trip For Web
const AcceptTrip = (tripId, statusClass) => {
    //var rowIds = $('.validation-grid-mobile').jqGrid('getDataIDs'); // Get all row IDs
    //var foundTrip = null;
    //console.log('rowIds', rowIds);


    //rowIds.forEach(rowId => {
    //    var tripData = $('.validation-grid-mobile').jqGrid('getRowData', rowId); // Get row data
    //    if (tripData.tripId === tripId) {
    //        foundTrip = tripData;
    //        return false; // Break out of the loop
    //    }
    //});

    //if (foundTrip) {
    //    console.log('Trip found:', foundTrip);
    //    // Proceed with accepting the trip using foundTrip or statusClass
    //} else {
    //    console.log('Trip with tripId ' + tripId + ' not found.');
    //}

    if (tripId === undefined) {
        console.error("tripId is undefined");
        return;
    }

    if (statusClass == 'status-pink') {
        showConfirmPopup(Accept)
    }
    else {
        showConfirmPopup(ShowConfirmCancel)
    }
    $('#confirm-button').off('click').on('click', function () {
        hideConfirmPopup();
        console.log("Accepting trip...");
        showOverlay1();
        $.ajax({
            type: "PUT",
            url: "/Validation/AcceptTrip",
            data: { tripId: tripId },
            success: function (response) {
                var tripIdToRemove = tripId;
                var gridData = $('#validation-grid').jqGrid('getGridParam', 'data');

                //var gridMobileData = $('.validation-grid-mobile').jqGrid('getGridParam', 'data');
                //console.log('gridMobileData value ', gridMobileData);
                var rowId1 = null;

                // console.log('Grid Data:', gridData); // Debugging line

                if (gridData && Array.isArray(gridData)) {
                    for (var i = 0; i < gridData.length; i++) {
                        if (gridData[i] && gridData[i].tripId == tripIdToRemove) {
                            rowId1 = gridData[i].id; // Retrieve the row's actual ID
                            break;
                        }
                    }
                } else {
                    console.error('gridData is null or not an array', response);
                }

                if (rowId1) {
                    // Delete the row by its ID
                    $('#validation-grid').jqGrid('delRowData', rowId1);
                } else {
                    console.log('Row with tripId ' + tripIdToRemove + ' not found.');
                }
                if (statusClass == 'status-pink') {
                    alertCustom(0, CancelAccept);
                }
                else {
                    alertCustom(0, CancelConfirm);
                }
                //console.log('accepted tripId', tripId);
                hideOverlay1();
            },
            error: function (xhr, status, error) {
                console.error('Error Accepting row:', error);
            }
        });
    });
}

//Reject trip For Mobile
const RejectTripMobile = (tripId, statusClass) => {
    if (tripId === undefined) {
        console.log("tripId is undefined");
        return;
    }
    if (statusClass == 'status-pink') {
        showConfirmPopup(Reject)
    }
    else {
        showConfirmPopup(ShowRejectCancel)
    }

    $('#confirm-button').off('click').on('click', function () {
        hideConfirmPopup();
        console.log("Rejecting trip in mobile...");
        showOverlay1();
        $.ajax({
            url: '/Validation/RejectTrip?tripId=' + tripId,
            type: 'PUT',
            success: function (response) {

                if (statusClass == 'status-pink') {
                    alertCustom(2, CancelReject);
                }
                else {
                    alertCustom(2, RejectCancelledTrip);
                }
                console.log('Rejected tripId in mobile', tripId);
                hideOverlay1();
                RefreshValidation();
            },
            error: function (xhr, status, error) {
                console.error('Error rejecting row:', error);
            }

        });
    });
};

//RejectTrip For web
const RejectTrip = (tripId, statusClass) => {
    if (tripId === undefined) {
        console.error("tripId is undefined");
        return;
    }
    if (statusClass == 'status-pink') {
        showConfirmPopup(Reject)
    }
    else {
        showConfirmPopup(ShowRejectCancel)
    }

    $('#confirm-button').off('click').on('click', function () {
        hideConfirmPopup();
        // console.log("Rejecting trip...");
        showOverlay1();
        $.ajax({
            url: '/Validation/RejectTrip?tripId=' + tripId,
            type: 'PUT',
            success: function (response) {
                var tripIdToRemove = tripId;
                var gridData = $('#validation-grid').jqGrid('getGridParam', 'data');
                var rowId = null;

                if (gridData && Array.isArray(gridData)) {
                    for (var i = 0; i < gridData.length; i++) {
                        if (gridData[i] && gridData[i].tripId == tripIdToRemove) {
                            rowId = gridData[i].id; // Retrieve the row's actual ID
                            break;
                        }
                    }
                } else {
                    console.error('gridData is null or not an array');
                }

                if (rowId) {
                    // Delete the row by its ID
                    $('#validation-grid').jqGrid('delRowData', rowId);
                } else {
                    console.log('Row with tripId ' + tripIdToRemove + ' not found.');
                }
                if (statusClass == 'status-pink') {
                    alertCustom(2, CancelReject);
                }
                else {
                    alertCustom(2, RejectCancelledTrip);
                }
                console.log('rejected tripId', tripId);
                hideOverlay1();
            },
            error: function (xhr, status, error) {
                console.error('Error rejecting row:', error);
            }

        });
    });
};

const alertCustom = (type, textValue) => {

    switch (type) {
        case 0: // Success Alert
            $("#alert-green").find("#alert-message span").text(textValue);
            $('#alert-green').modal('show');
            $('#alert-green').fadeIn();
            setTimeout(function () {
                $('#alert-green').modal('hide');
            }, 1500);
            break;
        case 1:// Warning Alert
            $("#alert-yellow").find("#alert-message span").text(textValue);
            $('#alert-yellow').modal('show');
            $('#alert-yellow').fadeIn();
            setTimeout(function () {
                $('#alert-yellow').modal('hide');
            }, 2000)
            break;
        case 2:// Error Alert
            $("#alert-red").find("#alert-message span").text(textValue);
            $('#alert-red').modal('show');
            $('#alert-red').fadeIn();
            setTimeout(function () {
                $('#alert-red').modal('hide');
            }, 2500)
            break;
        default:// Default Success Alert
            console.log("No category of alert selected");
            break;
    }
}

const showConfirmPopup = (textValue) => {
    $('#confirm-popup').find("#popup-body").text(textValue);
    $('#confirm-popup').modal('show');
}

const hideConfirmPopup = () => {
    $('#confirm-popup').modal('hide');
}
function showOverlay1() {
    $('#ajaxOverlay1').css('display', 'flex')
}

// Function to hide the overlay
function hideOverlay1() {
    $('#ajaxOverlay1').css('display', 'none')
}
//#endregion