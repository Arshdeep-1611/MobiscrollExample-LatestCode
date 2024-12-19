$(document).ready(function () {


    var languageObj = [];
    var colModelGrid1 = [];
    var colNames1 = [];
    var colModelGrid2 = [];
    var colNames2 = [];
    var Beneficiary;
    var From;
    var To;
    var FlightInfo;
    var Requestor;
    var $grid1;
    var $grid2;
    var EditTrip;
    var ReturnTrip;
    var CopyTrip;
    var DeleteTrip;
    var TripInformation;
    var PrintTrip;
    var rowData;
    var enablePrint = true;
    var deleteTripPopup;
    var deleteTripSuccess;

    function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
    }

    // Function to hide the overlay
    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }

    var options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Use 24-hour format
    };

    var roles = jQuery("#rolesList").val();
    var checkRole = JSON.parse(roles);
    //console.log(checkRole);
    var access = checkRole.find(role => role.ToolId == 37);
    console.log(access);
    var userType = $("#userType").val();
    if (access == undefined || access.IsEnabled == false) {
        enablePrint = false;
    }
    //if (userType == 'Admin') {
    //    location = '/Trips/ManagerDashboard';
    //}

    //$.ajax({
    //    url: '/Trips/keyvault',
    //    method: 'GET',
    //    dataType: 'json',
    //    success: function (data) {
    //        console.log('keyvault data---------->',data);
    //    },
    //    error: function (error) {
    //        console.error('API request failed:', error);
    //    }
    //});

    $('#dashboard-grid-1, #dashboard-grid-2').on('click', 'tr', function () {
        // Find the index of the clicked row
        var tripId = $(this).find('#tripId').text();
        // Access the trip ID from rowData based on the clicked row's index
        //var tripId = rowData[index] ? rowData[index].tripId : '';
        // Display the trip ID in the span with id "exportCodeId"
        $('#exportCodeId').text(tripId);
    });


    const initializeGrid = (gridId, colModel, colNames, mydata) => {
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
                height: "calc(100vh - 280px)",
                altRows: true,
                altclass: 'myAltClass',
                multiselect: false,
                resizable: false,
            }).trigger("reloadGrid");

            // Remove the "No data available" message
            jQuery(gridId).siblings('.no-data-message').remove();
        } else {
            // If no data is available, show a message in the grid
            jQuery(gridId).jqGrid({
                datatype: "local",
                colModel: colModel,
                colNames: colNames,
                data: [],
                height: "calc(100vh - 280px)",
                emptyrecords: true,
                altRows: true,
                altclass: 'myAltClass',
                multiselect: false,
                resizable: false,
            }).trigger("reloadGrid");

            // Add the "No data available" message

            showNoDataMessage(gridId, true);

            // Hide grid headers when there is no data
            jQuery(gridId).closest(".ui-jqgrid-view").find(".ui-jqgrid-hbox").hide();
        }
    };

    function ShowAlert() {

        $('.permission').modal('show');
        $('.permission').fadeIn();
        // Delay for 5 seconds
        setTimeout(function () {
            $('.permission').modal('hide');
        }, 3000);
        //trippopup.close();

    }

    const reloadGridWithData = (gridId, result) => {
        // Clear existing data in the grid
        jQuery("#dashboard-grid-1").jqGrid("clearGridData");
        jQuery("#dashboard-grid-2").jqGrid("clearGridData");

        if (result && result.length > 0) {
            // If data is available, set the new data and reload the grid
            showNoDataMessage(gridId, false);
            jQuery(gridId).jqGrid("setGridParam", { data: result, datatype: "local" }).trigger("reloadGrid");

            // Show grid headers (in case they were hidden previously)
            jQuery(gridId).closest(".ui-jqgrid-view").find(".ui-jqgrid-hbox").show();
        } else {
            showNoDataMessage(gridId, true);
            // If no data is available, hide grid headers and show a message in the grid
            jQuery(gridId).closest(".ui-jqgrid-view").find(".ui-jqgrid-hbox").hide();
            jQuery(gridId).jqGrid({
                datatype: "local",
                data: [],
                caption: "No data available",
                height: "calc(100vh - 280px)",
                emptyrecords: true,
                altRows: true,
                altclass: 'myAltClass',
                multiselect: false,
                resizable: false,
            }).trigger("reloadGrid");
        }
    };

    const formatGridData = (data) => {
        console.log('received data', data);
        var mydata = [];

        if (data) {
            data.forEach(function (trip) {


                ////console.log(trip);
                var statusClass, flightIcon, emailIcon;
                ////console.log(trip.status);
                // Determine status class
                switch (trip.status) {
                    case 1:
                    case 18:
                    case 19:
                        statusClass = "status-outline-gray";
                        break;
                    case 2:
                    case 20:
                        statusClass = "status-pink";
                        break;
                    case 3:
                    case 11:
                    case 12:
                    case 14:
                        statusClass = "status-blue";
                        break;
                    case 6:
                    case 13:
                        statusClass = "status-yellow";
                        break;
                    case 10:
                        statusClass = "status-green";
                        break;
                    case 5:
                    case 4:
                    case 7:
                    case 8:
                    case 9:
                    case 15:
                    case 16:
                        statusClass = "status-orange";
                        break;
                    default:
                        statusClass = "status-gray";
                }
                ////console.log(statusClass);

                switch (trip.flightType) {
                    case 2:
                        flightIcon = "<img src='./img/flight-land.png'>";
                        break;
                    case 1:
                        flightIcon = "<img src='./img/flight-takeoff.png'>";
                        break;
                    default:
                        flightIcon = null;
                }

                emailIcon = (trip.isMailSent) ? "<img src='./img/email.png'>" : "";

                console.log('----------------------------------------------------');
                console.log('fromdate',);
                console.log('----------------------------------------------------');

                if ((new Date(trip.fromDate) < new Date()) && (statusClass != "status-orange")) {
                    statusClass = "status-gray";
                }



                var formattedDate = new Date(trip.fromDate).toLocaleDateString("en-GB");




                if (trip.tripSteps != null) {

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

                    //var beneficiaries = trip.tripSteps.map(function (step) {
                    //    if (step.passengers) {
                    //        var passengersInStep = step.passengers.map(function (passenger) {
                    //            return passenger.firstName + " " + passenger.lastName;
                    //        }).join("<br>");
                    //    }

                    //    return "<div>" + passengersInStep + "</div>";
                    //}).join("");

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

                action = "<div id='actions-container'>";

                if (statusClass == 'status-outline-gray') {
                    action += "<img id='detail-action-btn' src='./img/file-text.png' class='action-btn' data-id='" + trip.tripId + "' title='" + TripInformation + "'>" +
                        "<img id='edit-action-btn' src='./img/edit.png' class='action-btn' data-id='" + trip.tripId + "' title='" + EditTrip + "' data-completed = '" + 0 + "'>" +
                        "<img id='copy-action-btn' src='./img/content-copy.png' class='action-btn' data-id='" + trip.tripId + "' title='" + CopyTrip + "'>" +
                        "<img id='return-action-btn' src='./img/return-right.png' class='action-btn' data-id='" + trip.tripId + "' title='" + ReturnTrip + "'>" +
                        "<img id='delete-action-btn' src='./img/Close.png' class='action-btn' data-id='" + trip.tripId + "' title='" + DeleteTrip + "'>";
                } else if (statusClass == 'status-pink') {
                    action += "<img id='detail-action-btn' src='./img/file-text.png' class='action-btn' data-id='" + trip.tripId + "' title='" + TripInformation + "'>" +
                        "<img id='edit-action-btn' src='./img/edit.png' class='action-btn' data-id='" + trip.tripId + "' title='" + EditTrip + "' data-completed = '" + 0 + "'>" +
                        "<img id='copy-action-btn' src='./img/content-copy.png' class='action-btn' data-id='" + trip.tripId + "' title='" + CopyTrip + "'>" +
                        "<img id='return-action-btn' src='./img/return-right.png' class='action-btn' data-id='" + trip.tripId + "' title='" + ReturnTrip + "'>" +
                        "<img id='delete-action-btn' src='./img/Close.png' class='action-btn' data-id='" + trip.tripId + "' title='" + DeleteTrip + "'>";
                } else if (statusClass == 'status-blue' || statusClass == 'status-green') {
                    action += "<img id='detail-action-btn' src='./img/file-text.png' class='action-btn' data-id='" + trip.tripId + "' title='" + TripInformation + "'>" +
                        "<img id='edit-action-btn' src='./img/edit.png' class='action-btn' data-id='" + trip.tripId + "' title='" + EditTrip + "' data-completed = '" + 1 + "'>" +
                        "<img id='copy-action-btn' src='./img/content-copy.png' class='action-btn' data-id='" + trip.tripId + "' title='" + CopyTrip + "'>" +
                        "<img id='return-action-btn' src='./img/return-right.png' class='action-btn' data-id='" + trip.tripId + "' title='" + ReturnTrip + "'>" +
                        "<img id='delete-action-btn' src='./img/Close.png' class='action-btn' data-id='" + trip.tripId + "' title='" + DeleteTrip + "'>";
                } else if (statusClass == 'status-yellow' || statusClass == 'status-orange') {
                    action += "<img id='detail-action-btn' src='./img/file-text.png' class='action-btn' data-id='" + trip.tripId + "' title='" + TripInformation + "'>" +
                        "<img src='./img/edit.png' class='action-btn empty' >" +
                        "<img id='copy-action-btn' src='./img/content-copy.png' class='action-btn' data-id='" + trip.tripId + "' title='" + CopyTrip + "'>" +
                        "<img id='return-action-btn' src='./img/return-right.png' class='action-btn' data-id='" + trip.tripId + "' title='" + ReturnTrip + "'>" +
                        "<img src='./img/Close.png' class='action-btn empty'>";
                } else if (statusClass == 'status-gray') {
                    action += "<img id='detail-action-btn' src='./img/file-text.png' class='action-btn' data-id='" + trip.tripId + "' title='" + TripInformation + "'>" +
                        "<img src='./img/edit.png' class='action-btn empty' >" +
                        "<img id='copy-action-btn' src='./img/content-copy.png' class='action-btn' data-id='" + trip.tripId + "' title='" + CopyTrip + "'>" +
                        "<img id='return-action-btn' src='./img/return-right.png' class='action-btn' data-id='" + trip.tripId + "' title='" + ReturnTrip + "'>" +
                        "<img src='./img/Close.png' class='action-btn empty'>";
                }


                if (enablePrint == false) {
                    action += "<img src='./img/material-print.png' class='action-btn' data-id='" + trip.tripId + "' title='" + PrintTrip + "' onclick='ShowAlert()'>" +
                        "</div>"
                }
                else {

                    action += "<img id='print-action-btn' src='./img/material-print.png' class='action-btn' data-id='" + trip.tripId + "' title='" + PrintTrip + "'>" +
                        "</div>"
                }


                var parts = formattedDate.split("/");
                var date = new Date(parts[2], parts[1] - 1, parts[0]);

                // Get the current date
                var currentDate = new Date();
                console.log('date', date, 'current date', currentDate);
                var action;
                // Check if formattedDate is less than the current date
                //if (date < currentDate) {
                //    action = "<div id='actions-container'>" +
                //        "<img id='copy-action-btn' src='./img/content-copy.png' class='action-btn' data-id='" + trip.tripId + "'>" +
                //        "<img id='return-action-btn' src='./img/return-right.png' class='action-btn' data-id='" + trip.tripId + "'>" +
                //        "<img id='' src='./img/material-print.png' class='action-btn' data-id='5'>" +
                //        "</div>"
                //} else {
                //    action = "<div id='actions-container'>" +
                //        "<img id='edit-action-btn' src='./img/edit.png' class='action-btn' data-id='" + trip.tripId + "'>" +
                //        "<img id='copy-action-btn' src='./img/content-copy.png' class='action-btn' data-id='" + trip.tripId + "'>" +
                //        "<img id='delete-action-btn' src='./img/Close.png' class='action-btn' data-id='" + trip.tripId + "'>" +
                //        "<img id='return-action-btn' src='./img/return-right.png' class='action-btn' data-id='" + trip.tripId + "'>" +
                //        "<img id='' src='./img/material-print.png' class='action-btn' data-id='5'>" +
                //        "</div>"
                //}

                //        var Beneficiary;
                //var From;
                //var To;
                //var FlightInfo;
                //var Requestor;
                //var TripStep;


                var row = {
                    tripId: "<span id='tripId' >" + trip.tripId + "</span>",
                    staus: "<span class='status " + statusClass + "' data-status='" + trip.status + "'></span>",
                    flight: flightIcon,
                    email: emailIcon ? emailIcon : null,
                    From: fromLocations ? fromLocations : null,
                    To: toLocations ? toLocations : null,
                    Beneficiary: "<div>" + beneficiaries + "</div>",
                    Requester: trip.requestedUser.userName ? trip.requestedUser.userName : null,
                    FlightInfo: trip.flightNumber,
                    DriverInfo: trip.driverURL ? '<a href="' + trip.driverURL + '" target="_blank"><img src="/img/link-blue.png"></a>' : 'N/A',
                    Action: action
                };

                mydata.push(row);


            });
            console.log('output data', mydata);
            rowData = mydata;
        }
        return mydata;
    };

    $.ajax({
        url: '/Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("laguage translation data", data);
            Beneficiary = data.Beneficiary;
            From = data.From;
            To = data.To;
            FlightInfo = data.FlightInfo;
            DriverInfo = data.DriverInfo;
            Requestor = data.Requestor;
            TripStep = data.TripStep;
            EditTrip = data.EditTrip;
            CopyTrip = data.CopyTrip;
            DeleteTrip = data.DeleteTrip;
            ReturnTrip = data.ReturnTrip;
            PrintTrip = data.PrintTrip;
            deleteTripPopup = data.DeleteTripPopup;
            deleteTripSuccess = data.DeleteTripSuccess;
            TripInformation = data.TripInformation;

            //languageObj = [
            //    { value: "Beneficiary", text: data.Beneficiary },
            //    { value: "From", text: data.From },
            //    { value: "To", text: data.To },
            //    { value: "FlightInfo", text: data.FlightInfo },
            //    { value: "Requestor", text: data.Requestor },
            //    { value: "TripStep", text: data.TripStep },
            //    { value: "EditTrip", text: data.EditTrip },
            //    { value: "CopyTrip", text: data.CopyTrip },
            //    { value: "DeleteTrip", text: data.DeleteTrip },
            //    { value: "ReturnTrip", text: data.ReturnTrip },
            //    { value: "PrintTrip", text: data.PrintTrip },

            //];
            //console.log(languageObj);

            //Beneficiary = languageObj.find(word => word.value == "Beneficiary");
            //From = languageObj.find(word => word.value == "From");
            //To = languageObj.find(word => word.value == "To");
            //FlightInfo = languageObj.find(word => word.value == "FlightInfo");
            //Requestor = languageObj.find(word => word.value == "Requestor");
            //TripStep = languageObj.find(word => word.value == "TripStep");
            //EditTrip = languageObj.find(word => word.value == "EditTrip");
            //CopyTrip = languageObj.find(word => word.value == "CopyTrip");
            //DeleteTrip = languageObj.find(word => word.value == "DeleteTrip");
            //ReturnTrip = languageObj.find(word => word.value == "ReturnTrip");
            //PrintTrip = languageObj.find(word => word.value == "PrintTrip");


            colModelGrid1 = [
                { name: 'tripId', index: 'tripId', hidden: true },
                { name: 'staus', width: 10, index: 'staus', align: 'center' },
                { name: 'flight', width: 10, index: 'flight', align: 'center' },
                { name: 'email', width: 10, index: 'email', align: 'center' },
                { name: 'From', index: 'From', width: 80, align: 'left' },
                { name: 'To', index: 'To', width: 80, align: 'left' },
                { name: 'Beneficiary', index: 'Beneficiary', width: 60, align: 'left' },
                { name: 'FlightInfo', index: 'FlightInfo', width: 40, align: 'left' },
                { name: 'DriverInfo', index: 'DriverInfo', width: 30, align: 'left' },
                { name: 'Action', index: 'Action', width: 60, align: 'center' }
            ];

            colNames1 = ['', '', '', '', From, To, Beneficiary, FlightInfo, DriverInfo, 'Action(s)'];

            colModelGrid2 = [
                { name: 'tripId', index: 'tripId', hidden: true },
                { name: 'staus', width: 10, index: 'staus', align: 'center' },
                { name: 'flight', width: 10, index: 'flight', align: 'center' },
                { name: 'email', width: 10, index: 'email', align: 'center' },
                { name: 'Requester', index: 'Requester', width: 40, align: 'left' },
                { name: 'From', index: 'From', width: 80, align: 'left' },
                { name: 'To', index: 'To', width: 80, align: 'left' },
                { name: 'Beneficiary', index: 'Beneficiary', width: 60, align: 'left' },
                { name: 'FlightInfo', index: 'FlightInfo', width: 40, align: 'left' },
                { name: 'DriverInfo', index: 'DriverInfo', width: 30, align: 'left' },
                { name: 'Action', index: 'Action', width: 60, align: 'center' }
            ];

            colNames2 = ['', '', '', '', Requestor, From, To, Beneficiary, FlightInfo, DriverInfo, 'Action(s)'];

            $grid1 = $("#dashboard-grid-1"),
                newWidth1 = $grid1.closest(".ui-jqgrid").parent().width();
            $grid1.jqGrid("setGridWidth", newWidth1, true);
            /*$("#dashboard-grid-1").parent().css("display", "none");*/
            $grid2 = $("#dashboard-grid-2"),
                newWidth2 = $grid2.closest(".ui-jqgrid").parent().width();
            $grid2.jqGrid("setGridWidth", newWidth2, true);
            $("#dashboard-grid-2").parent().css("display", "none");


            initializeGrid("#dashboard-grid-2", colModelGrid2, colNames2, []);

            jQuery("#dashboard-grid-2").jqGrid("clearGridData");
            jQuery("#dashboard-grid-1").jqGrid("clearGridData");
            showOverlay();
            $.ajax({
                url: '/Trips/GetTrips',
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    var mydata = [];
                    if (data != null) {
                        //console.log(data.length);
                        var result = formatGridData(data);
                        if (result != null) {
                            initializeGrid("#dashboard-grid-1", colModelGrid1, colNames1, result);
                        } else {
                            $("#dashboard-grid-1").parent().css("display", "none");
                            console.log('No valid data');
                        }
                    } else {
                        initializeGrid("#dashboard-grid-1", colModelGrid1, colNames1, data);
                        $("#dashboard-grid-1").parent().css("display", "none");
                        console.log('No data');
                    }
                    hideOverlay();
                },
                error: function (error) {
                    initializeGrid("#dashboard-grid-1", colModelGrid1, colNames1, []);
                    $("#dashboard-grid-1").parent().css("display", "none");
                    console.error('API request failed:', error);
                    hideOverlay();
                }
            });
        },
        error: function () {

        }
    });


    var filterValues = {};

    const showConfirmPopup = (textValue) => {
        $('#confirm-popup').find("#popup-body").text(textValue);
        $('#confirm-popup').modal('show');
    }

    const hideConfirmPopup = () => {
        $('#confirm-popup').modal('hide');
    }

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
                }, 1500)
                break;
            case 2:// Error Alert
                $("#alert-red").find("#alert-message span").text(textValue);
                $('#alert-red').modal('show');
                $('#alert-red').fadeIn();
                setTimeout(function () {
                    $('#alert-red').modal('hide');
                }, 1500)
                break;
            default:// Default Success Alert
                console.log("No category of alert selected");
                break;
        }
    }

    const encodeValue = (value) => {
        var encodedValue = "";
        var key = 619;
        for (var i = 0; i < value.length; i++) {
            encodedValue += String.fromCharCode(value.charCodeAt(i) ^ key);
        }
        var base64Encoded = btoa(unescape(encodeURIComponent(encodedValue)));
        return base64Encoded;
    };

    const showNoDataMessage = (gridId, val) => {
        if (val) {
            const noDataMessage = '<div class="no-data-message">No data available</div>';
            jQuery(gridId).closest(".ui-jqgrid").find('.no-data-message').remove();
            jQuery(gridId).closest(".ui-jqgrid").append(noDataMessage);
        }
        else {
            jQuery(gridId).closest(".ui-jqgrid").find('.no-data-message').remove();
        }
    };









    $(document).on('click', "#trip-filter-open", function () {
        filterValues.dateValue = $("#date").val();
        filterValues.beneficiaryValue = $("#beneficiary").val();
        filterValues.fromValue = $("#from-location").val();
        filterValues.toValue = $("#to-location").val();
        filterValues.flightInfoValue = $("#flight-info").val();
        filterValues.statusValue = $("select").val();
        filterValues.showAll = $("#check-all").prop("checked");

        console.log('filter Data --->', filterValues);
    });

    $(document).on('click', "#trip-filter-close", function () {
        console.log('filter Data --->', filterValues);
        $("#date").val(filterValues.dateValue);
        $("#beneficiary").val(filterValues.beneficiaryValue);
        $("#from-location").val(filterValues.fromValue);
        $("#to-location").val(filterValues.toValue);
        $("#flight-info").val(filterValues.flightInfoValue);
        $("select").val(filterValues.statusValue);
        if (filterValues.showAll == true) {
            $("#check-all").prop("checked", true);
        } else {
            $("#check-all").prop("checked", false);
        }


    });





    $(document).on('click', '#delete-action-btn', function () {

        var id = $(this).data('id');
        var $elementToRemove = $(this).closest('tr');

        var currentStatus = $elementToRemove.find('.status').data('status');
        console.log('current status--------------------------------------------->', currentStatus);
        showConfirmPopup(deleteTripPopup);
        var updateStatus = 6;
        if (currentStatus == 1) {
            updateStatus = 8;
        }
        console.log('update status--------------------------------------------->', updateStatus);
        $('#confirm-button').one('click', function () {
            $.ajax({
                url: '/Trips/DeleteTrip',
                method: 'DELETE',
                dataType: 'json',
                data: { tripId: id, status: updateStatus },
                success: function (data) {
                    $elementToRemove.find('.status').removeClass('status-green');
                    $elementToRemove.find('.status').removeClass('status-outline-gray');
                    $elementToRemove.find('.status').removeClass('status-pink');
                    $elementToRemove.find('.status').removeClass('status-blue');

                    $elementToRemove.find('#delete-action-btn').remove();
                    if (updateStatus == 8) {
                        $elementToRemove.find('.status').addClass('status-orange');
                    } else {
                        $elementToRemove.find('.status').addClass('status-yellow');
                    }
                    console.log(data);
                    alertCustom(0, deleteTripSuccess);

                },
                error: function (error) {
                    console.error('API request failed:', error);
                }
            });
            // Close the modal
            hideConfirmPopup();
        });

    });

    $(document).on('click', '#edit-action-btn', function () {
        // Get the ID from the 'data-id' attribute
        var id = $(this).data('id');
        var isCompleted = $(this).data('completed');

        var action = 2;
        var encodedaction = encodeValue(action.toString());
        var tripId = $(this).data('id');
        var encodedtripId = encodeValue(tripId.toString());
        var encodedIsCompleted = encodeValue(isCompleted.toString());

        window.location.href = '/Trips/Trip?type=' + encodedaction + '&tripId=' + encodedtripId + '&isCompleted=' + encodedIsCompleted;

    });

    $(document).on('click', '#copy-action-btn', function () {
        // Get the ID from the 'data-id' attribute
        var id = $(this).data('id');

        console.log(id);
        var action = 3;
        var encodedaction = encodeValue(action.toString());
        var tripId = $(this).data('id');
        var encodedtripId = encodeValue(tripId.toString());
        console.log(encodedaction);
        window.location.href = '/Trips/Trip?type=' + encodedaction + '&tripId=' + encodedtripId;

    });

    $(document).on('click', '#detail-action-btn', function () {
        // Get the ID from the 'data-id' attribute
        var id = $(this).data('id');

        loadTripDetails(id);




    });

    $(document).on('click', '#return-action-btn', function () {
        // Get the ID from the 'data-id' attribute
        var id = $(this).data('id');

        console.log(id);
        var action = 4;
        var encodedaction = encodeValue(action.toString());
        var tripId = $(this).data('id');
        var encodedtripId = encodeValue(tripId.toString());
        console.log(encodedaction);
        window.location.href = '/Trips/Trip?type=' + encodedaction + '&tripId=' + encodedtripId;

    });

    $(document).on('click', '#print-action-btn', function () {
        var id = $(this).data('id');
        var languageId = $('#langugeId').val();
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

        window.open(url, '_blank');

    });




    $("#apply-filter").click(function () {
        jQuery("#dashboard-grid-2").jqGrid("clearGridData");
        jQuery("#dashboard-grid-1").jqGrid("clearGridData");
        $("#dashboard-grid-2").parent().css("display", "none");
        $("#dashboard-grid-1").parent().css("display", "none");
        var dateValue = $("#date").val();
        var beneficiaryValue = $("#beneficiary").val();
        var fromValue = $("#from-location").val();
        var toValue = $("#to-location").val();
        var flightInfoValue = $("#flight-info").val();
        var statusValue = $("#trip-filter-status").val();

        var isDelegated = $("#check-trip").is(":checked")
        //console.log(isDelegated);
        var params = {
            dateValue: $("#date").val(),
            beneficiaryValue: $("#beneficiary").val(),
            fromValue: $("#from-location").val(),
            toValue: $("#to-location").val(),
            flightInfoValue: $("#flight-info").val(),
            statusValue: $("#trip-filter-status").val(),
            isMyAllTrips: $("#check-all").prop("checked"),
            isMyFutureTrips: !($("#check-all").prop("checked")),
            IsDelegatedTrips: $("#check-trip").is(":checked")
        }

        filterData = params;

        $("#TripFilters").modal("hide");
        showOverlay();
        $.ajax({
            url: '/Trips/GetTrips',
            method: 'GET',
            dataType: 'json',
            data: params,
            success: function (data) {
                console.log('data', data);
                if (data != null) {
                    var result = formatGridData(data);
                    ////console.log(JSON.stringify('after ',result));
                    if (result != null) {
                        if (isDelegated) {
                            $("#dashboard-grid-2").parent().css("display", "block");
                            reloadGridWithData("#dashboard-grid-2", result);
                        } else {
                            $("#dashboard-grid-1").parent().css("display", "block");
                            reloadGridWithData("#dashboard-grid-1", result);
                        }
                    } else {
                        $("#landing-grid-1").parent().css("display", "none");
                        $("#landing-grid-2").parent().css("display", "none");
                        $("#dashboard-grid-1").closest(".ui-jqgrid").find(".ui-jqgrid-hbox").css("display", "none");
                        $("#dashboard-grid-2").closest(".ui-jqgrid").find(".ui-jqgrid-hbox").css("display", "none");

                        console.log('No valid data');
                    }
                }
                //console.log(data.length);
                hideOverlay();

            },
            error: function (error) {
                $("#dashboard-grid-1").parent().css("display", "none");
                $("#dashboard-grid-2").parent().css("display", "none");
                console.error('API request failed:', error);
                hideOverlay();
            }
        });
    });
    //$("#print-trip-Id").on("click", function () {
    //    console.log("print btn clicked");

    //    var reportNameEncoded = "GetAllTrips.trdp";
    //    var parameterString = "&report=" + reportNameEncoded;
    //    var url = "/Home/TelerikReport" + '?' + parameterString;
    //    //window.location.href = "/Home/TelerikReport" + '?' + parameterString;
    //    window.open(url, '_blank');

    //});

    var filterData = {};
    $("#print-trip-Id").on("click", function () {
        console.log("print btn clicked");
        function isNullOrEmpty(value) {
            return value == null || value === "";
        }

        var languageId = $('#langugeId').val();

        // Set the report name based on the language ID
        var reportNameEncoded;
        if (languageId == 1) {
            reportNameEncoded = "GetAllTrips.trdp"; // Default report for English
        } else {
            reportNameEncoded = "GetAllTrips_FR.trdp"; // French report or other language
        }

        if (filterData == null ||
            (isNullOrEmpty(filterData.dateValue) && isNullOrEmpty(filterData.fromValue) &&
                isNullOrEmpty(filterData.toValue) && isNullOrEmpty(filterData.beneficiaryValue) &&
                isNullOrEmpty(filterData.flightInfoValue) && isNullOrEmpty(filterData.statusValue) &&
                !filterData.isDelegatedTrips && !filterData.isMyAllTrips && !filterData.isMyFutureTrips)) {
            var dateValue = null;
            var fromValue = null;
            var toValue = null;
            var beneficiaryValue = null;
            var flightInfoValue = null;
            var statusValue = null;
            var isDelegatedTrips = false;
            var isMyAllTrips = false;
            var isMyFutureTrips = true;


            var url = "/Home/TelerikReport" + '?' +
                "dateValue=" + encodeURIComponent(dateValue) +
                "&fromValue=" + encodeURIComponent(fromValue) +
                "&toValue=" + encodeURIComponent(toValue) +
                "&beneficiaryValue=" + encodeURIComponent(beneficiaryValue) +
                "&flightInfoValue=" + encodeURIComponent(flightInfoValue) +
                "&statusValue=" + encodeURIComponent(statusValue) +
                "&IsDelegatedTrips=" + encodeURIComponent(isDelegatedTrips) +
                "&IsMyAllTrips=" + encodeURIComponent(isMyAllTrips) +
                "&IsMyFutureTrips=" + encodeURIComponent(isMyFutureTrips) +
                "&report=" + encodeURIComponent(reportNameEncoded);

            window.open(url, '_blank');
        }
        else {
            var url = "/Home/TelerikReport" + '?' +
                "dateValue=" + encodeURIComponent(filterData.dateValue) +
                "&fromValue=" + encodeURIComponent(filterData.fromValue) +
                "&toValue=" + encodeURIComponent(filterData.toValue) +
                "&beneficiaryValue=" + encodeURIComponent(filterData.beneficiaryValue) +
                "&flightInfoValue=" + encodeURIComponent(filterData.flightInfoValue) +
                "&statusValue=" + encodeURIComponent(filterData.statusValue || null) +
                "&IsDelegatedTrips=" + encodeURIComponent(filterData.isDelegatedTrips) +
                "&IsMyAllTrips=" + encodeURIComponent(filterData.isMyAllTrips) +
                "&IsMyFutureTrips=" + encodeURIComponent(filterData.isMyFutureTrips) +
                "&report=" + encodeURIComponent(reportNameEncoded);

            window.open(url, '_blank');
        }
    });



    $("#refresh-filter").click(function () {
        ////console.log('refresh');
        //jQuery("#dashboard-grid-2").jqGrid("clearGridData");
        //jQuery("#dashboard-grid-1").jqGrid("clearGridData");
        //$("#dashboard-grid-2").parent().css("display", "none");
        //$("#dashboard-grid-1").parent().css("display", "none");

        //// Clear filter values
        //$("#date").val("");
        //$("#beneficiary").val("");
        //$("#from-location").val("");
        //$("#to-location").val("");
        //$("#flight-info").val("");
        //$("select").val("");
        //$("#check-all").prop("checked", false);
        //$("#check-trip").prop("checked", false);

        //$.ajax({
        //    url: '/trips/gettrips',
        //    method: 'get',
        //    datatype: 'json',
        //    success: function (data) {
        //        //console.log(data.length);
        //        var result = formatGridData(data);

        //        if (result != null) {
        //            console.log(result);
        //            $("#dashboard-grid-1").parent().css("display", "block");

        //            reloadGridWithData("#dashboard-grid-1", result);

        //        } else {
        //            $("#dashboard-grid-1").parent().css("display", "none");
        //            $("#dashboard-grid-2").parent().css("display", "none");
        //            console.log('no valid data');
        //        }
        //    },
        //    error: function (error) {
        //        $("#dashboard-grid-1").parent().css("display", "none");
        //        $("#dashboard-grid-2").parent().css("display", "none");
        //        console.error('api request failed:', error);
        //    }
        //});

        $("#date").val("");
        $("#beneficiary").val("");
        $("#from-location").val("");
        $("#to-location").val("");
        $("#flight-info").val("");
        $("select").val("");
        $("#check-all").prop("checked", false);
        $("#check-trip").prop("checked", false);

        $("#landing-grid-2").css("display", "none");
        $("#landing-grid-1").css("display", "block");

        jQuery("#dashboard-grid-2").jqGrid("clearGridData");
        jQuery("#dashboard-grid-1").jqGrid("clearGridData");
        $("#dashboard-grid-2").parent().css("display", "none");
        $("#dashboard-grid-1").parent().css("display", "none");

        var val = $("#check-trip").is(":checked");
        //console.log(val);
        console.log('calling chnage');
        var params = {
            dateValue: $("#date").val(),
            beneficiaryValue: $("#beneficiary").val(),
            fromValue: $("#from-location").val(),
            toValue: $("#to-location").val(),
            flightInfoValue: $("#flight-info").val(),
            statusValue: $("select").val(),
            isMyAllTrips: $("#check-all").prop("checked"),
            isMyFutureTrips: !($("#check-all").prop("checked")),
            isDelegatedTrips: val
        }
        console.log(params);
        showOverlay();
        $.ajax({
            url: '/Trips/GetTrips',
            method: 'GET',
            dataType: 'json',
            data: params,
            success: function (data) {
                var result = formatGridData(data);
                if (result != null) {

                    if (val) {
                        $("#dashboard-grid-2").parent().css("display", "block");
                        reloadGridWithData("#dashboard-grid-2", result);
                        //jQuery("#dashboard-grid-2").jqGrid("setGridParam", { data: result, datatype: "local" }).trigger("reloadGrid");
                    } else {
                        $("#dashboard-grid-1").parent().css("display", "block");
                        reloadGridWithData("#dashboard-grid-1", result);
                        //jQuery("#dashboard-grid-1").jqGrid("setGridParam", { data: result, datatype: "local" }).trigger("reloadGrid");
                    }
                }
                else {
                    $("#dashboard-grid-1").parent().css("display", "none");
                    $("#dashboard-grid-2").parent().css("display", "none");
                }
                hideOverlay();
            },
            error: function (error) {
                $("#dashboard-grid-1").parent().css("display", "none");
                $("#dashboard-grid-2").parent().css("display", "none");
                console.error('API request failed:', error);
                hideOverlay();
            }
        });
    });

    $("#check-trip").change(function () {
        jQuery("#dashboard-grid-2").jqGrid("clearGridData");
        jQuery("#dashboard-grid-1").jqGrid("clearGridData");
        $("#dashboard-grid-2").parent().css("display", "none");
        $("#dashboard-grid-1").parent().css("display", "none");

        var val = $(this).is(":checked");
        //console.log(val);
        console.log('calling chanage');
        var params = {
            dateValue: $("#date").val(),
            beneficiaryValue: $("#beneficiary").val(),
            fromValue: $("#from-location").val(),
            toValue: $("#to-location").val(),
            flightInfoValue: $("#flight-info").val(),
            statusValue: $("select").val(),
            isMyAllTrips: $("#check-all").prop("checked"),
            isMyFutureTrips: !($("#check-all").prop("checked")),
            isDelegatedTrips: val
        }
        console.log(params);
        showOverlay();
        $.ajax({
            url: '/Trips/GetTrips',
            method: 'GET',
            dataType: 'json',
            data: params,
            success: function (data) {
                var result = formatGridData(data);
                if (result != null) {

                    if (val) {
                        $("#dashboard-grid-2").parent().css("display", "block");
                        reloadGridWithData("#dashboard-grid-2", result);
                        //jQuery("#dashboard-grid-2").jqGrid("setGridParam", { data: result, datatype: "local" }).trigger("reloadGrid");
                    } else {
                        $("#dashboard-grid-1").parent().css("display", "block");
                        reloadGridWithData("#dashboard-grid-1", result);
                        //jQuery("#dashboard-grid-1").jqGrid("setGridParam", { data: result, datatype: "local" }).trigger("reloadGrid");
                    }
                }
                else {
                    $("#dashboard-grid-1").parent().css("display", "none");
                    $("#dashboard-grid-2").parent().css("display", "none");
                }

                hideOverlay();

            },
            error: function (error) {
                $("#dashboard-grid-1").parent().css("display", "none");
                $("#dashboard-grid-2").parent().css("display", "none");
                console.error('API request failed:', error);

                hideOverlay();
            }
        });
    });


    $("#createTrip").on("click", function () {
        var action = 1;
        var encodedaction = encodeValue(action.toString());
        //var tripId = 25850;
        //var encodedtripId = encodeValue(tripId.toString());
        //console.log(encodedaction);
        window.location.href = '/Trips/Trip?type=' + encodedaction;
    });

    function loadTripDetails(id) {
        showOverlay();
        console.log('tripId', id)
        $.ajax({
            url: '/Trips/TripReview',
            method: 'GET',
            dataType: 'json',
            data: { tripId: id },
            success: function (data) {
                console.log('Trip details received:', data);

                $(".trip-review-trip-step-container").empty();

                $('#flightnumber').text(data.flightNumber);

                if (data.flightType == 2) {
                    $('.flight-icon-img').css('display', 'block');
                    $('.flight-icon-img').attr('src', './img/flight-land.png');
                }
                else if (data.flightType == 1) {
                    $('.flight-icon-img').css('display', 'block');
                    $('.flight-icon-img').attr('src', './img/flight-takeoff.png');
                } else {
                    $('.flight-icon-img').css('display', 'none');
                    $('#flightnumber').text('');
                }
                /*$(".trip-final-details-col:not(:first)").remove();*/

                if (data.tripSteps) {

                    if (data.tripSteps) {
                        data.tripSteps.forEach(function (tripStep, index) {
                            // Clone the trip step template
                            var clonedDiv = $(".trip-review-trip-step-demo").first().clone();

                            // Set the header text
                            clonedDiv.find(".trip-review-trip-step-header").text(TripStep + (index + 1));

                            // Set the from date and location

                            var fromDate = new Date(tripStep.tripFromDate).toLocaleDateString("en-GB");
                            var fromTime = new Date(tripStep.tripFromDate).toLocaleTimeString("en-GB", options);
                            clonedDiv.find(".trip-step-from-date").text(fromDate + " " + fromTime);
                            clonedDiv.find(".trip-step-from-location").text(tripStep.fromLocation.locationName);
                            var fromLocationType = tripStep.fromLocation.locationType; // Assume this property exists
                            var fromLocationImg = "";
                            if (fromLocationType === "Private") {
                                fromLocationImg = "./img/Icon ionic-ios-flag.png"; // Path to private location image
                            } else if (fromLocationType === "Common") {
                                fromLocationImg = "./img/Common-flag.png"; // Path to common location image
                            } else if (fromLocationType === "Open") {
                                fromLocationImg = "./img/Open-flag.png"; // Path to open location image
                            }
                            else {
                                fromLocationImg = "./img/location-on-blue.png";
                            }
                            clonedDiv.find("#fromLocationImg").attr("src", fromLocationImg);

                            // Set the to date and location
                            /* var tripToDate = tripStep.tripToDate.replace('T', ' ');
                             clonedDiv.find(".trip-step-to-date").text(tripToDate);
                             clonedDiv.find(".trip-step-to-location").text(tripStep.toLocation.locationName);
 */
                            // Set the image based on the to location type
                            var toLocationType = tripStep.toLocation.locationType; // Assume this property exists
                            var toLocationImg = "";
                            if (toLocationType === "Private") {
                                toLocationImg = "./img/Icon ionic-ios-flag.png"; // Path to private location image
                            } else if (toLocationType === "Common") {
                                toLocationImg = "./img/Common-flag.png"; // Path to common location image
                            } else if (toLocationType === "Open") {
                                toLocationImg = "./img/Open-flag.png"; // Path to open location image
                            }
                            else {
                                toLocationImg = "./img/location-on-green.png";
                            }
                            clonedDiv.find("#toLocationImg").attr("src", toLocationImg);
                            // Set the to date and location
                            var toDate = new Date(tripStep.tripToDate).toLocaleDateString("en-GB");
                            var toTime = new Date(tripStep.tripToDate).toLocaleTimeString("en-GB", options);

                            clonedDiv.find(".trip-step-to-date").text(toDate + " " + toTime);
                            clonedDiv.find(".trip-step-to-location").text(tripStep.toLocation.locationName);

                            // Clear the passenger list
                            clonedDiv.find('.trip-review-trip-step-passenger-list').empty();

                            if (tripStep.passengers) {
                                tripStep.passengers.forEach(function (passenger) {
                                    console.log('passenger:', passenger);

                                    // Clone the passenger template
                                    var passengerClonedDiv = $(".trip-review-passenger-demo").first().clone();

                                    // Set the passenger name and phone
                                    passengerClonedDiv.find(".trip-step-passenger-name").text(passenger.firstName + ' ' + passenger.lastName);
                                    passengerClonedDiv.find(".trip-step-passenger-phone").text(passenger.phone);

                                    // Display the passenger div
                                    passengerClonedDiv.css("display", "block");

                                    // Append the passenger div to the passenger list
                                    clonedDiv.find('.trip-review-trip-step-passenger-list').append(passengerClonedDiv);
                                });
                            }

                            // Iterate through each passenger


                            // Display the cloned trip step div
                            clonedDiv.css("display", "block");

                            // Append the cloned trip step div to the container
                            $(".trip-review-trip-step-container").append(clonedDiv);

                            // Clear the clonedDiv variable for the next iteration
                            clonedDiv = null;
                        });
                    }

                }



                $('.trip-review-main-passenger').text(data.mainPassenger.firstName + ' ' + data.mainPassenger.lastName);


                $('.last-payment-detail-col #costcenterId').text(data.otherCostCenter);

                // Set tripDetailsLoaded flag to true in session storage
                //sessionStorage.setItem('tripDetailsLoaded', 'true');
                //tripDetailsLoaded = true; // Update the flag

                hideOverlay();
                setTimeout(function () {
                    $('#TripView').modal('show');
                }, 50);
            },
            error: function (error) {
                hideOverlay();
                console.error('API request failed:', error);
            }

        });
    }

});
