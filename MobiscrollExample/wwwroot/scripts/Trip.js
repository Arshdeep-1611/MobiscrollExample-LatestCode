$(document).ready(function () {

    var requestingUser;
    var predefinedTripsList = [];
    var locationList = [];
    var allLocationList = [];
    var passengerList = [];
    var newTripData = {};
    var tripData = {};
    var requestorData = {
        costCenterCode: null
    };
    var finallist = [];
    var paymentmodes = [];
    var transmittedDate = [];
    var externalRef = [];
    var deletedItems = {
        DeletedPassengers: [],
        DeletedTripSteps: []
    };
    var Open;
    var Private;
    var Common;
       /*string isAuthorizedDisplayName = _localization.Getkey("IsAuthorizedDisplayName");
            string isVipDisplayName = _localization.Getkey("IsVipDisplayName");
            string isPrivateDisplayName = _localization.Getkey("IsPrivateDisplayName");
            string unAuthorizedUser = _localization.Getkey("UnAuthorizedUser");*/
    var isAuthorizedDisplayName;
    var isVipDisplayName;
    var isPrivateDisplayName;
    var unAuthorizedUser;

    var costCenters = [];
    var passengerCostCenters = [];
    var allPassengersData = [];
    var languageObj;
    var OutOfPolicy;
    var TripStep;
    var Authorizedtrip;
    var AddNewLocation;
    var externalServices = [];
    var TripsDropDrown;
    var SelectRequestor;
    var SelectLocation;
    var LocationDetails;
    var ConfirmDelete;
    var Requestorsidepopup1;
    var Requestorsidepopup2;
    var FlightAlert;
    var ValidateFields;
    var LocationInsert;
    var ErrorLocation;
    var PassengerDropdown;
    var ValidateDuration;
    var ValidateDuration1;
    var LocationValidation;
    var NegativeDuration;
    var MainPassengerValidation;
    var RequestorValidation;
    var SelectPassenger
    var PassengerValidation;
    var ConfirmTrip;
    var FileType;
    var UpdateTripMessage;
    var TripsCancelConfirmMessage;
    var IsCompletedConfirmation;
    var IsValueChanged;
    var RemoveAttachment;
    var AttachMoreFiles;
    var EmptyMessageForDeparture;
    var EmptyMessageForArrival;
    var EmptyMessageForNoFlight;
    var myDelegators = [];
    var accentMap = {
        'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C',
        'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
        'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ù': 'U', 'Ú': 'U',
        'Û': 'U', 'Ü': 'U', 'Ý': 'Y', 'ß': 'ss', 'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a',
        'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
        'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o',
        'õ': 'o', 'ö': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'ÿ': 'y'
    };


    var normalize = function (term) {
        var returnNormalize = "";
        for (var i = 0; i < term.length; i++) {
            returnNormalize += accentMap[term.charAt(i)] || term.charAt(i);
        }
        return returnNormalize;
    };
    function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
    }

    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }

    const formatDateTime = (dateObj) => {

        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const day = dateObj.getDate().toString().padStart(2, '0');
        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');

        // Format the date and time
        const date = `${year}-${month}-${day}`;
        const time = `${hours}:${minutes}`;

        return { date, time };

    }
    function autocompleteLocation() {
        $('#startlocation').autocomplete({
            source: function (request, response) {
                console.log(request);
                if (request.term < 1) {
                    return false;
                }
                $.ajax({
                    url: '/Location/SearchLocationAutoComplete',
                    //url: '@Url.Action("Location","SearchLocationByKeyword")',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        searchString: request.term,
                        isAdmin: 0
                    },

                    // async: true,
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            return item.locationName;
                        }));
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX error:", status, error);
                        console.log("Response:", xhr.responseText);
                    }
                });
            },
            messages: {
                noResults: "",
                results: function (count) {
                    return count + (count > 1 ? ' results' : ' result ') + ' found';
                }
            }
        });

        $('#endlocation').autocomplete({
            source: function (request, response) {
                if (request.term < 1) {
                    return false;
                }
                $.ajax({
                    url: '/Location/SearchLocationAutoComplete',
                    //url: '@Url.Action("Location","SearchLocationByKeyword")',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        searchString: request.term,
                        isAdmin: 0
                    },

                    //async: true,
                    success: function (data) {
                        console.log(data);
                        response($.map(data, function (item) {
                            return item.locationName;
                        }));
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX error:", status, error);
                        console.log("Response:", xhr.responseText);
                    }
                });
            },
            messages: {
                noResults: "",
                results: function (count) {
                    return count + (count > 1 ? ' results' : ' result ') + ' found';
                }
            }
        });
    }






    const getAdjustedDateTime = (currentTime, minutesToAdd) => {
        // Clone the date object to avoid modifying the original input
        const adjustedTime = new Date(currentTime.getTime());

        // Add/subtract minutes to/from the current time
        adjustedTime.setMinutes(adjustedTime.getMinutes() + minutesToAdd);

        const { date, time } = formatDateTime(adjustedTime);

        return { date, time };
    }


    const parseDateTime = (tripStep) => {
        var endDateValue = $(tripStep).find('.end-date').val();
        console.log('endDateValue', endDateValue);
        var endDateParts = endDateValue.split('-'); // Assuming date format is MM/DD/YYYY
        var endDate = new Date(parseInt(endDateParts[0]), parseInt(endDateParts[1]) - 1, parseInt(endDateParts[2])); // Year, Month (0-based), Day

        var endTimeValue = $(tripStep).find('.end-time').val();
        var endTimeParts = endTimeValue.split(':');
        var endTime = new Date();
        endTime.setHours(parseInt(endTimeParts[0]));
        endTime.setMinutes(parseInt(endTimeParts[1]));

        // Parsing start date
        var startDateValue = $(tripStep).find('.start-date').val();
        var startDateParts = startDateValue.split('-'); // Assuming date format is MM/DD/YYYY
        var startDate = new Date(parseInt(startDateParts[0]), parseInt(startDateParts[1]) - 1, parseInt(startDateParts[2])); // Year, Month (0-based), Day

        // Parsing start time
        var startTimeValue = $(tripStep).find('.start-time').val();
        var startTimeParts = startTimeValue.split(':'); // Split time into hours and minutes
        var startTime = new Date();
        startTime.setHours(parseInt(startTimeParts[0])); // Set hours
        startTime.setMinutes(parseInt(startTimeParts[1])); // Set minutes

        console.log('startdate', startDate, 'starttime', startTime, 'endtime', endTime, 'enddate', endDate);

        return {
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime
        };
    };


    const updateEndDateAndTime = (tripStep) => {
        var days = parseInt($(tripStep).find('.duration-days').val()) || 0;
        var hours = parseInt($(tripStep).find('.duration-hours').val()) || 0;
        var minutes = parseInt($(tripStep).find('.duration-minutes').val()) || 0;

        // Calculate the total duration in milliseconds
        var totalDuration = days * 24 * 60 + hours * 60 + minutes;

        var { startDate, startTime, endDate, endTime } = parseDateTime(tripStep);



        const { date, notime } = formatDateTime(startDate);
        const { nodate, time } = formatDateTime(startTime);

        var startDateTime = new Date(`${date}T${time}:00`);

        var endDateTime = getAdjustedDateTime(startDateTime, totalDuration);


        $(tripStep).find('.end-date').val(endDateTime.date);
        $(tripStep).find('.end-time').val(endDateTime.time);

    }


    const setTripDuration = (tripStep) => {

        var { startDate, startTime, endDate, endTime } = parseDateTime(tripStep);

        console.log('startdate', startDate, 'starttime', startTime, 'endtime', endTime, 'enddate', endDate);
        // Now you can proceed with calculating the difference...
        var timeDifference = endTime.getTime() - startTime.getTime() + (endDate.getTime() - startDate.getTime());

        console.log("time difference", timeDifference);

        var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        var hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutesDifference = Math.round((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        // If minutesDifference is 60, increment hoursDifference and set minutesDifference to 0
        if (minutesDifference === 60) {
            hoursDifference++;
            minutesDifference = 0;
        }

        if (hoursDifference === 24) {
            daysDifference++;
            hoursDifference = 0;
        }
        if (daysDifference < 0 || hoursDifference < 0 || minutesDifference < 0) {
            $(tripStep).closest(".trip-step-container").find('.end-time').val($(tripStep).closest(".trip-step-container").find('.start-time').val())
            $(tripStep).closest(".trip-step-container").find('.end-date').val($(tripStep).closest(".trip-step-container").find('.start-date').val())
            daysDifference = hoursDifference = minutesDifference = 0;
        }

        console.log("Difference in Days:", daysDifference);
        console.log("Difference in Hours:", hoursDifference);
        console.log("Difference in Minutes:", minutesDifference);

        $(tripStep).find('.duration-days').val(daysDifference);
        $(tripStep).find('.duration-hours').val(hoursDifference);
        $(tripStep).find('.duration-minutes').val(minutesDifference);
    }


    const setTripDurationForEndDateTime = (tripStep) => {

        var { startDate, startTime, endDate, endTime } = parseDateTime(tripStep);

        console.log('startdate', startDate, 'starttime', startTime, 'endtime', endTime, 'enddate', endDate);
        // Now you can proceed with calculating the difference...
        var timeDifference = endTime.getTime() - startTime.getTime() + (endDate.getTime() - startDate.getTime());

        console.log("time difference", timeDifference);

        var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        var hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutesDifference = Math.round((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        // If minutesDifference is 60, increment hoursDifference and set minutesDifference to 0
        if (minutesDifference === 60) {
            hoursDifference++;
            minutesDifference = 0;
        }

        if (hoursDifference === 24) {
            daysDifference++;
            hoursDifference = 0;
        }
        if (daysDifference < 0 || hoursDifference < 0 || minutesDifference < 0) {
            $(tripStep).closest(".trip-step-container").find('.start-time').val($(tripStep).closest(".trip-step-container").find('.end-time').val())
            $(tripStep).closest(".trip-step-container").find('.start-date').val($(tripStep).closest(".trip-step-container").find('.end-date').val())
            daysDifference = hoursDifference = minutesDifference = 0;
        }

        console.log("Difference in Days:", daysDifference);
        console.log("Difference in Hours:", hoursDifference);
        console.log("Difference in Minutes:", minutesDifference);

        $(tripStep).find('.duration-days').val(daysDifference);
        $(tripStep).find('.duration-hours').val(hoursDifference);
        $(tripStep).find('.duration-minutes').val(minutesDifference);
    }

    var AlertCheckBox;

    //$.ajax({
    //    url: '/Home/GetTripRequestorLocalization',
    //    method: 'GET',
    //    success: function (data) {
    //        console.log("laguage translation data", data);

    //        TripStep = data.TripStep;
    //        TripsDropDrown = data.TripsRequestorDropdown;
    //        SelectRequestor = data.RequestorDropdown;
    //        AlertCheckBox = data.alertCheckBox;
    //        ConfirmDelete = data.ConfirmDelete;
    //        Requestorsidepopup1 = data.Requestorsidepopup1;
    //        Requestorsidepopup2 = data.Requestorsidepopup2;
    //        FlightAlert = data.FlightAlert;
    //        ValidateFields = data.ValidateFields;
    //        LocationInsert = data.LocationInsert;
    //        ErrorLocation = data.ErrorLocation;
    //        PassengerDropdown = data.PassengerDropdown;
    //        ValidateDuration = data.ValidateDuration;
    //        ValidateDuration1 = data.ValidateDuration1;
    //        LocationValidation = data.LocationValidation;
    //        NegativeDuration = data.NegativeDuration;
    //        MainPassengerValidation = data.MainPassengerValidation;
    //        SelectPassenger = data.selectPassenger;
    //        RequestorValidation = data.RequestorValidation;
    //        PassengerValidation = data.PassengerValidation;
    //        ConfirmTrip = data.ConfirmTrip;
    //        FileType = data.FileType;
    //        TripsCancelConfirmMessage = data.TripsCancelConfirmMessage;
    //        IsCompletedConfirmation = data.IsCompletedConfirmation;
    //        //languageObj = [
    //        //    { value: "TripStep", text: data.TripStep },
    //        //    { value: "TripsRequestorDropdown", text: data.TripsRequestorDropdown },
    //        //    { value: "RequestorDropdown", text: data.RequestorDropdown },
    //        //];
    //        /*console.log(languageObj);*/

    //        //TripStep = languageObj.find(word => word.value == "TripStep");
    //        //TripsDropDrown = languageObj.find(word => word.value == "TripsRequestorDropdown");
    //        //SelectRequestor = languageObj.find(word => word.value == "RequestorDropdown");
    //    },
    //    error: function () {

    //    }
    //});

    const showCancelConfirmPopup = (textValue) => {
        $('#cancel-confirm-popup').find("#popup-body").text(textValue);
        $('#cancel-confirm-popup').modal('show');
    }

    const hideCancelConfirmPopup = () => {
        $('#cancel-confirm-popup').modal('hide');
    }

    const showDeleteFileConfirmPopup = (textValue) => {
        $('#delete-file-confirm-popup').find("#popup-body").text(textValue);
        $('#delete-file-confirm-popup').modal('show');
    }

    const hideDeleteFileConfirmPopup = () => {
        $('#delete-file-confirm-popup').modal('hide');
    }


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
                }, 3000);
                break;
            case 1:// Warning Alert
                $("#alert-yellow").find("#alert-message span").text(textValue);
                $('#alert-yellow').modal('show');
                $('#alert-yellow').fadeIn();
                setTimeout(function () {
                    $('#alert-yellow').modal('hide');
                }, 3000)
                break;
            case 2:// Error Alert
                $("#alert-red").find("#alert-message span").text(textValue);
                $('#alert-red').modal('show');
                $('#alert-red').fadeIn();
                setTimeout(function () {
                    $('#alert-red').modal('hide');
                }, 3000)
                break;
            default:// Default Success Alert
                console.log("No category of alert selected");
                break;
        }
    }


    const errorToogle = (type, id) => {
        if (type) {
            $(id).css('border', '1px solid #ff0000');
            $(id).attr('title', ValidateFields);
        } else {
            $(id).removeAttr('title');
            $(id).css('border', '1px solid #cacccf');
        }
    }
    const rightInputError = (type, id) => {
        if (type) {
            $(id).css('border', '1px solid #ff0000');
            $(id).attr('title', SelectPassenger);
        } else {
            $(id).removeAttr('title');
            $(id).css('border', '1px solid #cacccf');
        }
    }
    // Get current date

    const getTimeDiff = (fromDate, toDate) => {
        const diffInMS = toDate - fromDate;

        const diffInM = diffInMS / 1000 / 60;

        return diffInM;
    }


    const getTodayTime = () => {
        var now = new Date();
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var currentTime = hours + ':' + minutes;
        console.log('current time---->', currentTime);
        return currentTime;
    };

    var curTime = getTodayTime();
    $("#flight-time").val(curTime);





    // Example usage
    var now = new Date();
    var zeroMinutes = getAdjustedDateTime(now, 0);
    var thirtyMinutesAdded = getAdjustedDateTime(now, 30);
    var fourtyMinutesAdded = getAdjustedDateTime(now, 40);
    var twoHoursAdded = getAdjustedDateTime(now, 150);

    console.log('fourty', fourtyMinutesAdded);

    $(".start-date").attr("min", zeroMinutes.date);
    $(".end-date").attr("min", zeroMinutes.date);
    $("#flight-date").attr("min", zeroMinutes.date);

    $(".start-date").attr("max", "9999-12-31");
    $(".end-date").attr("max", "9999-12-31");
    $("#flight-date").attr("max", "9999-12-31");

    $("#flight-date").val(fourtyMinutesAdded.date);
    $("#flight-time").val(fourtyMinutesAdded.time);

    $(".start-time").val(thirtyMinutesAdded.time);
    $(".end-time").val(twoHoursAdded.time);
    $(".start-date").val(thirtyMinutesAdded.date);
    $(".end-date").val(twoHoursAdded.date);




    var actionId = $('#actionId').data('action-id');
    var isEdited = actionId;
    var tripId = $('#tripId').data('trip-id');
    var isCompleted = $('#isCompleted').data('completed');
    console.log('action', actionId);
    console.log('trip', tripId);
    console.log('completed', isCompleted);

    showOverlay();

    const getRequestorInformation = (requestorUserId) => {
        showOverlay();
        $.ajax({
            url: '/ManagerUsers/GetUserById',
            method: 'GET',
            dataType: 'json',
            data: { id: requestorUserId },
            success: function (data) {
                console.log('requestor user details-->', data);
                requestorData = data;
            },
            error: function (error) {
                console.error('API request failed:', error);
            },
            complete: function () {
                hideOverlay();
            }
        });
    }


    showOverlay();
    //$.ajax({
    //    url: '/Trips/GetMyDelegators',
    //    method: 'GET',
    //    dataType: 'json',
    //    success: function (data) {
    //        myDelegators = data;
    //        console.log('delegators', data);
    //        const lastObject = data[data.length - 1];
    //        requestingUser = lastObject;
    //        getRequestorInformation(requestingUser.userId);

    //        var filteredDelegators = [...myDelegators];

    //        filteredDelegators = filteredDelegators.filter(item => item.userId != requestingUser.userId);

    //        $("#requestor-dropdown").empty();

    //        $("#requested-user").val(requestingUser.userName);
    //        $("#requestor-dropdown").append($('<option>', {
    //            value: '',
    //            text: SelectRequestor,
    //        }));

    //        // Add other options
    //        filteredDelegators.forEach(function (option) {
    //            $("#requestor-dropdown").append($('<option>', {
    //                value: option.userId,
    //                text: option.userName
    //            }));
    //        });

    //        hideOverlay();
    //    },
    //    error: function (error) {
    //        console.error('API request failed:', error);
    //    }
    //});

    function checkFields() {
        var stringids = ['#name', '#city'];

        // Initialize a flag to check if any field is empty
        var emptyFieldFound = false;
        let scrollcount = 0;
        // Loop through each input field
        stringids.forEach(function (id) {
            // Check if the field is empty
            if ($(id).val() === '' || $(id).val() === null) {
                $('#alert-green').modal('hide');
                $(id).css('border', '1px solid #ff0000');
                $(id).attr('title', AlertCheckBox);
                console.log(AlertCheckBox);
                emptyFieldFound = true; // Set flag to true if empty field is found
            } else {
                $('#alert-green').modal('hide');
                $(id).removeAttr('title', ValidateFields);
                $(id).css('border', '1px solid #cacccf');
            }
        });
        return !emptyFieldFound; // Return true if no empty fields are found, otherwise false
    }


    var locationName;

    $("#addLocation").on("click", function () {
        if (!checkFields()) {
            return false; // Stop execution if any field is empty
        }

        var isPrivateChecked = $('#checkRadioPrivate').prop('checked');
        locationName = $("#name").val();
        var params = {
            locationId: $('#locationId').val(),
            name: $("#name").val(),
            street: $("#street").val(),
            npa: $("#npa").val(),
            city: $("#city").val(),
            country: $("#country").val(),
            comment: $("#comment").val(),
            //checkRadioCommon: $('#checkRadioCommon').prop('checked') ? 1 : 0,
            //checkPrivate: $('#checkRadioPrivate').prop('checked') ? 1 : 0,
            //checkOpen: $('#checkOpen').prop('checked') ? 1 : 0,     
            checkPrivate: isPrivateChecked ? 1 : 0,
            checkOpen: 1,
        }
        $.ajax({
            type: 'POST',
            url: '/Location/SaveLocation',
            dataType: 'json',
            data: params,
            async: true,
            success: function (data) {
                if (data) {
                    $.ajax({
                        url: '/Location/GetLocation',
                        method: 'GET',
                        dataType: 'json',
                        success: function (locationData) {
                            if (locationData != null) {

                                locationList = [];
                                locationList = locationData.map(function (location) {
                                    var type = ""
                                    if (location.locationType == "Common") {
                                        type = ` (${Common})`;
                                    }
                                    if (location.locationType == "Open") {
                                        type = ` (${Open})`;
                                    }
                                    if (location.locationType == "Private") {
                                        type = ` (${Private})`;
                                    }
                                    return {
                                        value: location.locationName+type,
                                        data: location.locationId,
                                    };
                                });
                                $.ajax({
                                    url: '/ManagerEmplacements/GetLocation',
                                    method: 'GET',
                                    dataType: 'json',
                                    success: function (alllocationData) {
                                        allLocationList = [];
                                        allLocationList = alllocationData.map(function (location) {
                                            var type = ""
                                            if (location.locationType == "Common") {
                                                type = ` (${Common})`;
                                            }
                                            if (location.locationType == "Open") {
                                                type = ` (${Open})`;
                                            }
                                            if (location.locationType == "Private") {
                                                type = ` (${Private})`;
                                            }
                                            return {
                                                value: location.locationName+type,
                                                data: location.locationId,
                                            };
                                        });
                                    },
                                    error: function (error) {
                                        console.log('Error fetching data:', error);
                                    }
                                });
                                console.log(locationList);
                                $('.start-location').each(function () {
                                    initializeStartLocationAutocomplete($(this), locationList);
                                })
                                $('.end-location').each(function () {
                                    initializeEndLocationAutocomplete($(this), locationList);
                                })
                                //initializeAutocomplete($('.start-location'), locationList);
                                //generateDropdownOptions(locationList, '#startlocation');

                                // Initialize the dropdown for end location
                                //initializeAutocomplete($('.end-location'), locationList);
                                //generateDropdownOptions(locationList, '#endlocation');
                            }
                        },
                        error: function (error) {
                            console.log('Error fetching data:', error);
                        }
                    });
                    alertCustom(0, LocationInsert);
                    $("#AddNewLocation").modal("hide");
                    $('#locationId').val('');
                    $("#name").val('');
                    $("#street").val('');
                    $("#npa").val('');
                    $("#city").val('');
                    $("#country").val('');
                    $("#comment").val('');
                    $('#checkRadioCommon').prop('checked', false);
                    $('#checkRadioPrivate').prop('checked', true);
                    $('#checkOpen').prop('checked', false);
                } else {
                    alertCustom(2, ErrorLocation);
                }

            },
            error: function (error) {
                console.error('Failed', error);
            }
        });
    });


    $("#addLocation").prop("disabled", false);

    // Function to enable the "Add Location" button
    function enableAddLocationButton() {
        $("#addLocation").prop("disabled", false);
    }

    // Event listener for input fields
    $(".modal-body input, .modal-body textarea").on("input", function () {
        enableAddLocationButton();
    });

    // Event listener for radio buttons
    $(".modal-body .radio-wrapper input[type='radio']").on("change", function () {
        enableAddLocationButton();
    });

    $('#closebtn').click(function () {
        // Reset the form fields
        $("#exampleModalLabel").text(AddNewLocation)
        $(".modal-footer").show();
        $('#locationId, #comment, #name, #npa, #country, #street, #city, #checkRadioPrivate').prop('disabled', false);
        $('#locationId').val('');
        $("#name").val('');
        $("#street").val('');
        $("#npa").val('');
        $("#city").val('');
        $("#country").val('');
        $("#comment").val('');
        $('#checkRadioCommon').prop('checked', false);
        $('#checkRadioPrivate').prop('checked', true);
        $('#checkOpen').prop('checked', false);
        $("#addLocation").prop("disabled", true);
    });

    $("#addLocation").prop("disabled", false);


    // Function to enable the "Add Location" button
    function enableAddLocationButton() {
        $("#addLocation").prop("disabled", false);
    }

    // Event listener for input fields
    $(".modal-body input, .modal-body textarea").on("input", function () {
        enableAddLocationButton();
    });

    // Event listener for radio buttons
    $(".modal-body .radio-wrapper input[type='radio']").on("change", function () {
        enableAddLocationButton();
    });

    $(document).on('click', '#change-requestor', function () {
        $(".requestor-form").css("display", "block");
    });

    $(document).on('click', '#change', function () {

        $("#requested-user").val($('#requestor-dropdown').find(':selected').text());

        var requestingUserId = $('#requestor-dropdown').find(':selected').val();

        requestingUser = myDelegators.find(item => item.userId == requestingUserId);

        var filteredDelegators = [...myDelegators];

        filteredDelegators = filteredDelegators.filter(item => item.userId != requestingUser.userId);

        $("#requestor-dropdown").empty();

        $("#requested-user").val(requestingUser.userName);
        $("#requestor-dropdown").append($('<option>', {
            value: '',
            text: SelectRequestor,
        }));

        // Add other options
        filteredDelegators.forEach(function (option) {
            $("#requestor-dropdown").append($('<option>', {
                value: option.userId,
                text: option.userName
            }));
        });


        getRequestorInformation(requestingUser.userId);

        $(".requestor-form").css("display", "none");
    });

    const formatPredefinedTrips = (data, type) => {
        const tripListBlock = $('#predefined-list');
        tripListBlock.empty(); // Clear existing trips

        // Filter trips by the specified flight type
        const filteredTrips = data.filter(trip => trip.flightType == type);

        if (filteredTrips.length === 0) {
            // Display a no-data message based on flight type
            let message = "";
            if (type == 1) {
                message = EmptyMessageForDeparture;
            } else if (type == 2) {
                message = EmptyMessageForArrival;
            } else {
                message = EmptyMessageForNoFlight;
            }
            tripListBlock.append(`<p class="no-data-message no-hover">${message}</p>`);
            return;
        }
        // Populate the list with trips if available
        filteredTrips.forEach(function (trip) {
            const newPTag = $('<p></p>');
            newPTag.attr('data-id', trip.tripId);
            newPTag.text(trip.predefinedTripName);

           
            // Add click event to change color and background
            newPTag.on('click', function () {
                if (selectedPredefinedTrip === $(this).data('id')) {
                    $(this).css({ 'color': '', 'background': '' });
                    selectedPredefinedTrip = null;
                } else {
                    tripListBlock.find('p').css({ 'color': '', 'background': '' });
                    $(this).css({ 'color': '#00a0df', 'background': '#f6f6f6' });
                    selectedPredefinedTrip = $(this).data('id');
                }
            });
            tripListBlock.append(newPTag);
        });
    };

    //const formatPredefinedTrips = (data, type) => {
    //    var tripListBlock = $('#predefined-list');
    //    tripListBlock.empty();
    //    data.forEach(function (trip) {
    //        if (trip.flightType == type) {
    //            var newPTag = $('<p></p>');
    //            newPTag.attr('data-id', trip.tripId);
    //            newPTag.text(trip.predefinedTripName);
    //            // Add click event to change color and background
    //            newPTag.on('click', function () {
    //                // Check if this is the currently selected trip
    //                if (selectedPredefinedTrip === $(this).data('id')) {
    //                    // If it's already selected, deselect it
    //                    $(this).css({
    //                        'color': '',
    //                        'background': ''
    //                    });
    //                    selectedPredefinedTrip = null; // Clear the selection
    //                } else {
    //                    // Otherwise, select this trip
    //                    // Remove styling from all p tags
    //                    tripListBlock.find('p').css({
    //                        'color': '',
    //                        'background': ''
    //                    });

    //                    // Apply style to the clicked p tag
    //                    $(this).css({
    //                        'color': '#00a0df',
    //                        'background': '#f6f6f6'
    //                    });

    //                    selectedPredefinedTrip = $(this).data('id');
    //                }
    //            });
    //            tripListBlock.append(newPTag);
    //        }
    //    });
    //};


    const formatTrip = (data) => {
        tripData = data;
        var isFutureTrip = true;

        var fromDateTime = new Date(tripData.tripStartDateTime);

        var now = new Date();

        var thirtyMinutesAdded = getAdjustedDateTime(now, 30);

        var thirtyMinutesAddedFormated = new Date(`${thirtyMinutesAdded.date}T${thirtyMinutesAdded.time}:00`);

        if (fromDateTime < thirtyMinutesAddedFormated) {
            isFutureTrip = false;
        }

        if (isFutureTrip) {
            if (data.flightNumber) {
                $("#flight-number").val(data.flightNumber);
            }

            if (data.flightDateTime) {
                var dateTime = new Date(data.flightDateTime);

                var date = dateTime.toISOString().split('T')[0];
                var time = dateTime.toTimeString().split(' ')[0];

                $("#flight-date").val(date);
                $("#flight-time").val(time);
            }
        }
        

        if (actionId == 2) {
            if (data.flightType == 1) {
                $("#radio-departure").prop("checked", true);
                $("#flight-number, #flight-date, #flight-time").prop("disabled", false);
                formatPredefinedTrips(predefinedTripsList, 1); // Changed function name here
            } else if (data.flightType == 2) {
                $("#radio-arrival").prop("checked", true);
                $("#flight-number, #flight-date, #flight-time").prop("disabled", false);
                formatPredefinedTrips(predefinedTripsList, 2); // Changed function name here
            } else {
                $("#radio-flight").prop("checked", true);
                $("#flight-number, #flight-date, #flight-time").val('').prop("disabled", true);
                formatPredefinedTrips(predefinedTripsList, 0); // Changed function name here
            }
        } else if (actionId == 3 || actionId == 4) {
            if (data.flightType == 1) {
                $("#radio-departure").prop("checked", true);
                $("#flight-number, #flight-date, #flight-time").prop("disabled", false);
                formatPredefinedTrips(predefinedTripsList, 1); // Changed function name here
            } else if (data.flightType == 2) {
                $("#radio-arrival").prop("checked", true);
                $("#flight-number, #flight-date, #flight-time").prop("disabled", false);
                formatPredefinedTrips(predefinedTripsList, 2); // Changed function name here
            } else {
                $("#radio-flight").prop("checked", true);
                $("#flight-number, #flight-date, #flight-time").val('').prop("disabled", true);
                formatPredefinedTrips(predefinedTripsList, 0); // Changed function name here
            }
        }


        //if (actionId == 2) {
        //    if (data.flightType == 1) {
        //        $("#radio-departure").prop("checked", true);

        //        $("#flight-number, #flight-date, #flight-time").prop("disabled", false);

        //        formatPredefinedTrips(predefinedTripsList, 1);
        //    } else if (data.flightType == 2) {
        //        $("#radio-arrival").prop("checked", true);

        //        $("#flight-number, #flight-date, #flight-time").prop("disabled", false);

        //        formatPredefinedTrips(predefinedTripsList, 2);
        //    } else {
        //        $("#radio-flight").prop("checked", true);
        //        $("#flight-number").val('');
        //        $("#flight-date").val('');
        //        $("#flight-time").val('');
        //        $("#flight-number, #flight-date, #flight-time").prop("disabled", true);

        //        formatPredefinedTrips(predefinedTripsList, 0);
        //    }
        //}
        //else if (actionId == 3 || actionId == 4)  {
        //    if (data.flightType == 1) {
        //        $("#radio-departure").prop("checked", true);

        //        $("#flight-number, #flight-date, #flight-time").prop("disabled", false);
        //        formatPredefinedTrips(predefinedTripsList, 1);
        //    } else if (data.flightType == 2) {
        //        $("#radio-arrival").prop("checked", true);

        //        $("#flight-number, #flight-date, #flight-time").prop("disabled", false);

        //        formatPredefinedTrips(predefinedTripsList, 2);
        //    } else {
        //        $("#radio-flight").prop("checked", true);
        //        $("#flight-number").val('');
        //        $("#flight-date").val('');
        //        $("#flight-time").val('');
        //        $("#flight-number, #flight-date, #flight-time").prop("disabled", true);

        //        formatPredefinedTrips(predefinedTripsList, 0);
        //    }
        //}
        //else if (actionId == 4) {
        //    if (data.flightType == 1) {
        //        $("#radio-arrival").prop("checked", true);

        //        $("#flight-number, #flight-date, #flight-time").prop("disabled", false);

        //        formatPredefinedTrips(predefinedTripsList, 2);
        //    } else if (data.flightType == 2) {
        //        $("#radio-departure").prop("checked", true);

        //        $("#flight-number, #flight-date, #flight-time").prop("disabled", false);

        //        formatPredefinedTrips(predefinedTripsList, 1);
        //    } else {
        //        $("#radio-flight").prop("checked", true);
        //        $("#flight-number").val('');
        //        $("#flight-date").val('');
        //        $("#flight-time").val('');
        //        $("#flight-number, #flight-date, #flight-time").prop("disabled", true);

        //        formatPredefinedTrips(predefinedTripsList, 0);
        //    }
        //}
        if (data.tripSteps) {
            formatTripSteps(data, isFutureTrip);
        }

        if (tripData.alertPassenger) {
            $("#alert-passenger").prop("checked", true);
        }
        //if (tripData.alertPassenger) {
        //    $("#alert-passenger").prop("checked", true);
        //}

        if (tripData.isConfidential) {
            $("#is-confidential").prop("checked", true);
        }

        if (tripData.isOutOfPolicy && tripData.externalServiceId) {
            $("#externalservicedropdown").val(tripData.externalServiceId);
        }

        $("#payment-comment").val(tripData.comment);


        console.log('tripId------------------------------>', tripId);
        if (actionId == 2) {
            $.ajax({
                url: '/Trips/GetFilesOfTrip',
                method: 'GET',
                data: { tripId: tripId },
                success: function (response) {
                    console.log("response from add file", response);
                    if (response.length > 0) {
                        for (var i = 0; i < response.length; i++) {
                            var file = response[i];
                            var fileName = file.fileName; // Use the file name from the response
                            var fileExtension = fileName.split('.').pop().toLowerCase();

                            // Mapping of file extensions to MIME types
                            var mimeTypeMap = {
                                'txt': 'text/plain',
                                'html': 'text/html',
                                'pdf': 'application/pdf',
                                'png': 'image/png',
                                'jpg': 'image/jpeg',
                                'jpeg': 'image/jpeg',
                                'gif': 'image/gif',
                                'doc': 'application/msword',
                                'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                'xls': 'application/vnd.ms-excel',
                                'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                // Add more mappings as needed
                            };

                            var mimeType = mimeTypeMap[fileExtension] || 'application/octet-stream';

                            // Decode base64 string and create a Blob object
                            var byteCharacters = atob(file.data);
                            var byteNumbers = new Array(byteCharacters.length);
                            for (var j = 0; j < byteCharacters.length; j++) {
                                byteNumbers[j] = byteCharacters.charCodeAt(j);
                            }
                            var byteArray = new Uint8Array(byteNumbers);
                            var blob = new Blob([byteArray], { type: mimeType });
                            var fileUrl = URL.createObjectURL(blob);

                            var link = $('<a></a>')
                                .attr('href', fileUrl)
                                .attr('target', '_blank')
                                .text(fileName);

                            var icon = $('<img>')
                                .addClass('icon-img')
                                .attr('src', '/img/metro-bin.png')
                                .attr('alt', '')
                                .attr('data-file-id', file.fileId)
                                .attr('data-blob-name', file.blobName)
                                .attr('title', RemoveAttachment);

                            var attachedCol = $('<div></div>')
                                .addClass('attached-col')
                                .append(link)
                                .append(icon);

                            $('.attached-wrapper-row').append(attachedCol);
                        }
                        $('.attached-file').css("display", "block");
                        $(".attch-file-header").text(AttachMoreFiles);
                        $('#file-input').attr('title', '');
                    }
                },
                error: function (xhr, status, error) {
                    alert('An error occurred: ' + error);
                }
            });
        }
    };

    function formatTripSteps(data, isFutureTrip, isPredefined = false) {

        console.log(data);

        var tripStepStartDateTime;
        var tripStepEndDateTime;

        var totalTripSteps = data.tripSteps.length;

        if (actionId == 3 && isFutureTrip) {
            tripStepStartDateTime = data.tripSteps[0].startDateTime
        } else if (actionId == 3 && !isFutureTrip) {
            var now = new Date();

            var thirtyMinutesAdded = getAdjustedDateTime(now, 30);

            var thirtyMinutesAddedFormated = new Date(`${thirtyMinutesAdded.date}T${thirtyMinutesAdded.time}:00`);

            tripStepStartDateTime = thirtyMinutesAddedFormated;
        } else if (actionId == 4 && isFutureTrip) {
            var fromDateTime = data.tripSteps[totalTripSteps - 1].endDateTime;

            tripStepStartDateTime = new Date(fromDateTime);
        } else if (actionId == 4 && !isFutureTrip) {
            var now = new Date();

            var thirtyMinutesAdded = getAdjustedDateTime(now, 40);

            var thirtyMinutesAddedFormated = new Date(`${thirtyMinutesAdded.date}T${thirtyMinutesAdded.time}:00`);

            tripStepStartDateTime = thirtyMinutesAddedFormated;
        }

        data.tripSteps.forEach(function (tripStep, index) {
            var newTripStep
            if (index == 0) {
                newTripStep = $(".trip-step-container").first();
            }
            else {
                newTripStep = $(".trip-step-container").first().clone();
                newTripStep.find("input, select, textarea").val('');

                var newTripStepCount = $(".trip-step-container").length + 1;

                newTripStep.find('.detail-header h4').text(TripStep + newTripStepCount);
                newTripStep.removeAttr('trip-step-id');

                var passengerCount = 1;
                passengerDiv = newTripStep.find(".details-inputs.passenger:first").clone();
                passengerDiv.find(".details-header span").text("Passenger " + passengerCount);
                //passengerDiv.find("#autocomplete-input").attr('id', 'autocomplete-input' + passengerCount);

                newTripStep.find(".all-passenger-container").empty();
                newTripStep.find(".all-passenger-container").append(passengerDiv);
            }

            newTripStep.attr("trip-step-id", tripStep.tripStepId);

            if (actionId == 2) {
                var startDateTime = new Date(tripStep.startDateTime);

                var startDate = startDateTime.toISOString().split('T')[0];
                var startTime = startDateTime.toTimeString().split(' ')[0];

                newTripStep.find('.start-date').val(startDate);
                newTripStep.find('.start-time').val(startTime);

                var endDateTime = new Date(tripStep.endDateTime);

                var endDate = endDateTime.toISOString().split('T')[0];
                var endTime = endDateTime.toTimeString().split(' ')[0];

                newTripStep.find('.end-date').val(endDate);
                newTripStep.find('.end-time').val(endTime);

                setTripDuration(newTripStep);

            }
            if (actionId == 3) {
                if (isFutureTrip) {
                    var startDateTime = new Date(tripStep.startDateTime);

                    var startDate = startDateTime.toISOString().split('T')[0];
                    var startTime = startDateTime.toTimeString().split(' ')[0];

                    newTripStep.find('.start-date').val(startDate);
                    newTripStep.find('.start-time').val(startTime);

                    var endDateTime = new Date(tripStep.endDateTime);

                    var endDate = endDateTime.toISOString().split('T')[0];
                    var endTime = endDateTime.toTimeString().split(' ')[0];

                    newTripStep.find('.end-date').val(endDate);
                    newTripStep.find('.end-time').val(endTime);
                }
                else {
                    var startDateTime = getAdjustedDateTime(tripStepStartDateTime, 0);

                    newTripStep.find('.start-date').val(startDateTime.date);
                    newTripStep.find('.start-time').val(startDateTime.time);

                    var timeDiff = getTimeDiff(new Date(tripStep.startDateTime), new Date(tripStep.endDateTime))

                    var endDateTime = getAdjustedDateTime(new Date(`${startDateTime.date}T${startDateTime.time}`), timeDiff);

                    newTripStep.find('.end-date').val(endDateTime.date);
                    newTripStep.find('.end-time').val(endDateTime.time);

                    tripStepStartDateTime = new Date(`${endDateTime.date}T${endDateTime.time}`);

                }

                setTripDuration(newTripStep);
                initializeStartLocationAutocomplete(newTripStep.find(".start-location"), locationList);
                var startlocation = allLocationList.find(loc => loc.data == tripStep.startLocationId);
                newTripStep.find(".start-location").val(startlocation.value);
                newTripStep.find(".start-location").attr('data-id', tripStep.startLocationId)

                initializeEndLocationAutocomplete(newTripStep.find(".end-location"), locationList);
                var endlocation = allLocationList.find(loc => loc.data == tripStep.endLocationId);
                newTripStep.find(".end-location").val(allLocationList.value);
                newTripStep.find(".end-location").attr('data-id', allLocationList.endLocationId)
                //generateDropdownOptionsWithSelected(locationList, newTripStep.find(".start-location"), tripStep.startLocationId);
                //generateDropdownOptionsWithSelected(locationList, newTripStep.find(".end-location"), tripStep.endLocationId);
            }


            if (actionId == 4) {

                var startDateTime = getAdjustedDateTime(tripStepStartDateTime, 0);

                newTripStep.find('.start-date').val(startDateTime.date);
                newTripStep.find('.start-time').val(startDateTime.time);

                var timeDiff = getTimeDiff(new Date(tripStep.startDateTime), new Date(tripStep.endDateTime))

                var endDateTime = getAdjustedDateTime(new Date(`${startDateTime.date}T${startDateTime.time}:00`), timeDiff);

                newTripStep.find('.end-date').val(endDateTime.date);
                newTripStep.find('.end-time').val(endDateTime.time);

                tripStepStartDateTime = new Date(`${endDateTime.date}T${endDateTime.time}:00`);

                setTripDuration(newTripStep);

                initializeStartLocationAutocomplete(newTripStep.find(".start-location"), locationList);
                var startlocation = allLocationList.find(loc => loc.data == data.tripSteps[totalTripSteps - index - 1].endLocationId);
                newTripStep.find(".start-location").val(startlocation.value);
                newTripStep.find(".start-location").attr('data-id', startlocation.data)

                initializeEndLocationAutocomplete(newTripStep.find(".end-location"), locationList);
                var endlocation = allLocationList.find(loc => loc.data == data.tripSteps[totalTripSteps - index - 1].startLocationId);
                newTripStep.find(".end-location").val(endlocation.value);
                newTripStep.find(".end-location").attr('data-id', endlocation.data)
                //generateDropdownOptionsWithSelected(locationList, newTripStep.find(".start-location"), tripStep.startLocationId);
                //generateDropdownOptionsWithSelected(locationList, newTripStep.find(".end-location"), tripStep.endLocationId);

                /*generateDropdownOptionsWithSelected(locationList, newTripStep.find(".start-location"), data.tripSteps[totalTripSteps - index - 1].endLocationId);
                generateDropdownOptionsWithSelected(locationList, newTripStep.find(".end-location"), data.tripSteps[totalTripSteps - index - 1].startLocationId);*/
            }
            else {
                initializeStartLocationAutocomplete(newTripStep.find(".start-location"), locationList);
                var startlocation = allLocationList.find(loc => loc.data == tripStep.startLocationId);
                newTripStep.find(".start-location").val(startlocation.value);
                newTripStep.find(".start-location").attr('data-id', startlocation.data)

                initializeEndLocationAutocomplete(newTripStep.find(".end-location"), locationList);
                var endlocation = allLocationList.find(loc => loc.data == tripStep.endLocationId);
                newTripStep.find(".end-location").val(endlocation.value);
                newTripStep.find(".end-location").attr('data-id', endlocation.data)
                //generateDropdownOptionsWithSelected(locationList, newTripStep.find(".start-location"), tripStep.startLocationId);
                //generateDropdownOptionsWithSelected(locationList, newTripStep.find(".end-location"), tripStep.endLocationId);

                /*generateDropdownOptionsWithSelected(locationList, newTripStep.find(".start-location"), tripStep.startLocationId);
                generateDropdownOptionsWithSelected(locationList, newTripStep.find(".end-location"), tripStep.endLocationId);*/
            }

            if (!isPredefined) {
                newTripStep.find('.comment').val(tripStep.comment);

                //if (tripStep.isMailRequired) {
                //    newTripStep.find('.is-mail-required').prop("checked", true);
                //}
                if (tripStep.isMailRequired) {
                    newTripStep.find('.is-mail-required').prop("checked", true);
                } else {
                    newTripStep.find('.is-mail-required').prop("checked", false);
                }
                var passengers;
                if (actionId == 4) {
                    passengers = data.tripSteps[totalTripSteps - index - 1].passengers;
                } else {
                    passengers = tripStep.passengers;
                }

                passengers.forEach(function (passenger, passengerIndex) {
                    if (passengerIndex == 0) {
                        var pass = newTripStep.find(".details-inputs.passenger:first");
                        $(pass).attr("passenger-hub-id", passenger.passengerHubId);
                        $(pass).attr("passenger-luggage-id", passenger.passengerLuggageId);
                        $(pass).find(".handbag").val(passenger.handBag);
                        $(pass).find(".luggage").val(passenger.luggage);
                        $(pass).find(".special").val(passenger.special);
                        var passengerName = passengerList.find(pas => pas.data == passenger.passengerId);
                        $(pass).find(".passenger-dropdown").val(passengerName.value);
                        $(pass).find(".passenger-dropdown").attr('data-id', passengerName.data);
                        initializeAutocomplete($(pass).find("#autocomplete-input"), passengerList);
                        //generateDropdownOptionsWithSelected(passengerList, pass.find(".passenger-dropdown"), passenger.passengerId);
                        // clonedDiv.find('#selected-country-id' + passengerCount).val('');
                    } else {
                        var clonedDiv = $(".details-inputs.passenger:first").clone();
                        var passengerCount = newTripStep.find(".details-inputs.passenger").length + 1;
                        clonedDiv.find(".details-header span").text("Passenger " + passengerCount);
                        clonedDiv.find(".passenger-dropdown").attr('data-id', passengerCount);
                        clonedDiv.find(".delete-passenger-row-icon").removeClass('empty');
                        //clonedDiv.find(".details-header img").css("display", "block");
                        clonedDiv.attr("passenger-hub-id", passenger.passengerHubId);
                        clonedDiv.attr("passenger-luggage-id", passenger.passengerLuggageId);
                        var passengerName = passengerList.find(pas => pas.data == passenger.passengerId);
                        clonedDiv.find(".passenger-dropdown").val(passengerName.value);
                        autocompleteInputId = "autocomplete-input" + passengerCount;
                        clonedDiv.find(".passenger-dropdown").attr('data-id', passengerName.data);
                        initializeAutocomplete(clonedDiv.find("#autocomplete-input"), passengerList);
                        // Initialize autocomplete for the cloned input
                        initializeAutocomplete(clonedDiv.find("#" + autocompleteInputId), passengerList);

                        //generateDropdownOptionsWithSelected(passengerList, clonedDiv.find(".passenger-dropdown"), passenger.passengerId);
                        clonedDiv.find(".handbag").val(passenger.handBag);
                        clonedDiv.find(".luggage").val(passenger.luggage);
                        clonedDiv.find(".special").val(passenger.special);
                        newTripStep.find(".all-passenger-container").append(clonedDiv);
                    }
                });
            }
            if (index !== 0) {
                tripStepConfiguration(newTripStep);

            }

        });

    }


    var selectedPredefinedTrip;

    window.getUpdateRelatimeDropdown = getUpdateRelatimeDropdown;
    function getUpdateRelatimeDropdown(input) {
        showOverlay();
        $.ajax({
            url: '/Passenger/GetPassengers',
            method: 'GET',
            dataType: 'json',
            success: function (passengerData) {
                passengerList = [];
                allPassengersData = [];
                passengerCostCenters = [];
                if (passengerData != null) {
                    console.log('passenger data from api---->', passengerData);

                    passengerData.sort((a, b) => {
                        const firstNameA = a.firstName.toLowerCase();
                        const firstNameB = b.firstName.toLowerCase();
                        const lastNameA = a.lastName.toLowerCase();
                        const lastNameB = b.lastName.toLowerCase();

                        if (firstNameA < firstNameB) {
                            return -1;
                        }
                        if (firstNameA > firstNameB) {
                            return 1;
                        }
                        // If firstName is the same, compare lastName
                        if (lastNameA < lastNameB) {
                            return -1;
                        }
                        if (lastNameA > lastNameB) {
                            return 1;
                        }
                        return 0;
                    });

                    allPassengersData = [...passengerData];
                    passengerList = passengerData
                        .filter(passenger => passenger.valid == 1) // Filter for valid passengers
                        .map(passenger => {
                            let type = "";
                            if (passenger.isAuthorized == 1) {
                                type = ` (${isAuthorizedDisplayName})`
                            }
                            else {
                                type = ` (${unAuthorizedUser})`
                            }
                            if (passenger.isPrivate == 1) {
                                type = ` (${isPrivateDisplayName})`
                            }
                            if (passenger.isVip == 1) {
                                type = ` (${isVipDisplayName})`
                            }
                            return (

                                { value: passenger.firstName + ' ' + passenger.lastName + type, data: passenger.passengerId }
                            )
                        });
                    /*  allPassengers = passengerData
                          .filter(passenger => passenger.valid == 1) // Filter for valid passengers
                          .map(passenger => ({ value: passenger.firstName + ' ' + passenger.lastName, data: passenger.passengerId }));*/
                    passengerCostCenters = passengerData
                        .filter(function (passenger) {
                            return passenger.costCenterCode !== null && passenger.costCenterCode !== '';
                        })
                        .map(function (passenger) {
                            return { passengerId: passenger.passengerId, costCenterCode: passenger.costCenterCode };
                        });
                    console.log(passengerList);
                    console.log('passengercostcentercode--->', passengerCostCenters);
                    //generateDropdownOptions(passengerList, '.passenger-dropdown');
                    $('.passenger-dropdown').each(function () {
                        let val = $(this).val();
                        console.log(val);
                        $(this).val("");
                        initializeAutocomplete($(this), passengerList);
                        console.log($(this).val());
                        $(this).val(val);

                    });
                    if (input) {
                        //var dropdown = JSON.parse(input);
                        const dropdown = $(`.passenger-dropdown[data-id='${input}']`);
                        //var dataId = dropdown.attr('data-id');
                        var passenger = passengerList.find(loc => loc.data == input);
                        dropdown.val(passenger.value);

                    }
                    hideOverlay();
                } else {
                    console.log("No Passenger");
                    hideOverlay();
                }
            },
            error: function (error) {
                hideOverlay();
            }
        });
    }

    $(document).on("click", ".edit-passenger-row-icon", function () {
        const closestPassengerDropdown = $(this).closest('.details-inputs').find('.passenger-dropdown');
        const dataIdValue = closestPassengerDropdown.attr('data-id');
        var found = passengerList.find(x => x.value == closestPassengerDropdown.val());
        if (dataIdValue && found) {
            errorToogle(false, closestPassengerDropdown)
            //var dropdown = JSON.stringify(closestPassengerDropdown);
            localStorage.setItem('element', dataIdValue);
            localStorage.setItem('selectedGrid', 'Custom');
            localStorage.setItem('actionType', 'Edit');
            if (typeof window.getPassengerById === 'function') {
                getPassengerById(dataIdValue);
            }
        } else {
            errorToogle(true, closestPassengerDropdown)
            alertCustom(1, PassengerDropdown);
        }
    });




    window.getAllUpdatedPassengers = getAllUpdatedPassengers;
    function getAllUpdatedPassengers() {
        showOverlay();
        $.ajax({
            url: '/Passenger/GetPassengers',
            method: 'GET',
            dataType: 'json',
            success: function (passengerData) {
                passengerList = [];
                allPassengersData = [];
                passengerCostCenters = [];
                if (passengerData != null) {
                    console.log('passenger data from api---->', passengerData);

                    passengerData.sort((a, b) => {
                        const firstNameA = a.firstName.toLowerCase();
                        const firstNameB = b.firstName.toLowerCase();
                        const lastNameA = a.lastName.toLowerCase();
                        const lastNameB = b.lastName.toLowerCase();

                        if (firstNameA < firstNameB) {
                            return -1;
                        }
                        if (firstNameA > firstNameB) {
                            return 1;
                        }
                        // If firstName is the same, compare lastName
                        if (lastNameA < lastNameB) {
                            return -1;
                        }
                        if (lastNameA > lastNameB) {
                            return 1;
                        }
                        return 0;
                    });

                    allPassengersData = [...passengerData];
                    passengerList = passengerData
                        .filter(passenger => passenger.valid == 1) // Filter for valid passengers
                        .map(passenger => {
                            let type = "";
                            if (passenger.isAuthorized == 1) {
                                type = ` (${isAuthorizedDisplayName})`
                            }
                            else {
                                type = ` (${unAuthorizedUser})`
                            }
                            if (passenger.isPrivate == 1) {
                                type = ` (${isPrivateDisplayName})`
                            }
                            if (passenger.isVip == 1) {
                                type = ` (${isVipDisplayName})`
                            }
                            return (

                                { value: passenger.firstName + ' ' + passenger.lastName + type, data: passenger.passengerId }
                            )
                        }
                        );
                    /*  allPassengers = passengerData
                          .filter(passenger => passenger.valid == 1) // Filter for valid passengers
                          .map(passenger => ({ value: passenger.firstName + ' ' + passenger.lastName, data: passenger.passengerId }));*/
                    passengerCostCenters = passengerData
                        .filter(function (passenger) {
                            return passenger.costCenterCode !== null && passenger.costCenterCode !== '';
                        })
                        .map(function (passenger) {
                            return { passengerId: passenger.passengerId, costCenterCode: passenger.costCenterCode };
                        });
                    console.log(passengerList);
                    console.log('passengercostcentercode--->', passengerCostCenters);
                    //generateDropdownOptions(passengerList, '.passenger-dropdown');
                    $('.passenger-dropdown').each(function () {
                        let val = $(this).val();
                        console.log(val);
                        $(this).val("");
                        initializeAutocomplete($(this), passengerList);
                        console.log($(this).val());
                        $(this).val(val);

                    });

                    hideOverlay();
                } else {
                    console.log("No Passenger");
                    hideOverlay();
                }
            },
            error: function (error) {
                hideOverlay();
            }
        });
    }

    const getAllOptionsData = async () => {
        showOverlay();
        try {

            // Make all AJAX requests concurrently
            const requestorLocalizationPromise = $.ajax({
                url: '/Home/GetTripRequestorLocalization',
                method: 'GET',
                dataType: 'json'
            });

            const myDelegartorsPromise = $.ajax({
                url: '/Trips/GetMyDelegators',
                method: 'GET',
                dataType: 'json'
            });

            const predefinedTripsPromise = $.ajax({
                url: '/Trips/GetPredefinedTrips',
                method: 'GET',
                dataType: 'json'
            });

            const locationPromise = $.ajax({
                url: '/Location/GetLocation',
                method: 'GET',
                dataType: 'json'
            });
            const allLocationPromise = $.ajax({
                url: '/ManagerEmplacements/GetLocation',
                method: 'GET',
                dataType: 'json'
            });

            const passengersPromise = $.ajax({
                url: '/Passenger/GetPassengers',
                method: 'GET',
                dataType: 'json'
            });

            const costCentersPromise = $.ajax({
                url: '/Trips/CostCenterCodes',
                method: 'GET',
                dataType: 'json'
            });

            // Await all promises
            const [requestorLocalizationData, myDelegartorsData, predefinedTrips, locationData, allLocationData, passengerData, costCentersData] = await Promise.all([requestorLocalizationPromise, myDelegartorsPromise, predefinedTripsPromise, locationPromise, allLocationPromise, passengersPromise, costCentersPromise]);

            // Process data when all promises are resolved

            if (requestorLocalizationData != null) {
                //CostCenterType4 = requestorLocalizationData.CostCenterType4;
                //CostCenter3 = requestorLocalizationData.CostCenter3;
                //CostCenter2 = requestorLocalizationData.CostCenter2;
                //ResearchCostcenter = requestorLocalizationData.ResearchCostcenter;
                EmptyMessageForDeparture = requestorLocalizationData.EmptyMessageForDeparture;
                EmptyMessageForArrival = requestorLocalizationData.EmptyMessageForArrival;
                EmptyMessageForNoFlight = requestorLocalizationData.EmptyMessageForNoFlight;
                TripStep = requestorLocalizationData.TripStep;
                TripsDropDrown = requestorLocalizationData.TripsRequestorDropdown;
                SelectRequestor = requestorLocalizationData.RequestorDropdown;
                AlertCheckBox = requestorLocalizationData.alertCheckBox;
                ConfirmDelete = requestorLocalizationData.ConfirmDelete;
                Requestorsidepopup1 = requestorLocalizationData.Requestorsidepopup1;
                Requestorsidepopup2 = requestorLocalizationData.Requestorsidepopup2;
                FlightAlert = requestorLocalizationData.FlightAlert;
                ValidateFields = requestorLocalizationData.ValidateFields;
                LocationInsert = requestorLocalizationData.LocationInsert;
                ErrorLocation = requestorLocalizationData.ErrorLocation;
                PassengerDropdown = requestorLocalizationData.PassengerDropdown;
                ValidateDuration = requestorLocalizationData.ValidateDuration;
                ValidateDuration1 = requestorLocalizationData.ValidateDuration1;
                LocationValidation = requestorLocalizationData.LocationValidation;
                NegativeDuration = requestorLocalizationData.NegativeDuration;
                MainPassengerValidation = requestorLocalizationData.MainPassengerValidation;
                SelectPassenger = requestorLocalizationData.selectPassenger;
                RequestorValidation = requestorLocalizationData.RequestorValidation;
                PassengerValidation = requestorLocalizationData.PassengerValidation;
                ConfirmTrip = requestorLocalizationData.ConfirmTrip;
                FileType = requestorLocalizationData.FileType;
                TripsCancelConfirmMessage = requestorLocalizationData.TripsCancelConfirmMessage;
                IsCompletedConfirmation = requestorLocalizationData.IsCompletedConfirmation;
                UpdateTripMessage = requestorLocalizationData.updateTripMessage;
                /*UpdateTripMessage = requestorLocalizationData.updateTripMessage;*/
                RemoveAttachment = requestorLocalizationData.RemoveAttachment;
                AttachMoreFiles = requestorLocalizationData.AttachMoreFiles;
                AddNewLocation = requestorLocalizationData.addNewLocation;
                SelectLocation = requestorLocalizationData.selectLocation;
                LocationDetails = requestorLocalizationData.locationDetails;
                OutOfPolicy = requestorLocalizationData.outOfPolicy;
                Authorizedtrip = requestorLocalizationData.authorizedtrip;
                isAuthorizedDisplayName = requestorLocalizationData.isAuthorizedDisplayName;
                isVipDisplayName = requestorLocalizationData.isVipDisplayName;
                isPrivateDisplayName = requestorLocalizationData.isPrivateDisplayName;
                unAuthorizedUser = requestorLocalizationData.unAuthorizedUser;
                Open = requestorLocalizationData.Open;
                Common = requestorLocalizationData.Common;
                Private = requestorLocalizationData.Private;
               
            }
            if (myDelegartorsData != null) {
                myDelegators = myDelegartorsData;
                console.log('delegators', myDelegartorsData);
                const lastObject = myDelegartorsData[myDelegartorsData.length - 1];
                requestingUser = lastObject;
                requestorData.userId = requestingUser.userId;
                getRequestorInformation(requestingUser.userId);

                var filteredDelegators = [...myDelegators];

                filteredDelegators = filteredDelegators.filter(item => item.userId != requestingUser.userId);

                $("#requestor-dropdown").empty();

                $("#requested-user").val(requestingUser.userName);
                $("#requestor-dropdown").append($('<option>', {
                    value: '',
                    text: SelectRequestor,
                }));

                // Add other options
                filteredDelegators.forEach(function (option) {
                    $("#requestor-dropdown").append($('<option>', {
                        value: option.userId,
                        text: option.userName
                    }));
                });
            }
            /* $('#startlocation').autocomplete({
                 source: function (request, response) {
                     console.log(request);
                     if (request.term.length < 1) {
                         return false;
                     }
                     $.ajax({
                         url: '/Location/SearchLocationAutoComplete',
                         //url: '@Url.Action("Location","SearchLocationByKeyword")',
                         method: 'GET',
                         dataType: 'json',
                         data: {
                             searchString: request.term,
                             isAdmin: 0
                         },
 
                         // async: true,
                         success: function (data) {
                             console.log(data);
                             response($.map(data, function (item) {
                                 return item.locationName;
                             }));
                         },
                         error: function (xhr, status, error) {
                             console.error("AJAX error:", status, error);
                             console.log("Response:", xhr.responseText);
                         }
                     });
                 },
                 messages: {
                     noResults: "",
                     results: function (count) {
                         return count + (count > 1 ? ' results' : ' result ') + ' found';
                     }
                 }
             });*/
            if (requestorData != null) {
                if (predefinedTrips != null) {

                    predefinedTripsList = predefinedTrips;

                    console.log(predefinedTrips);
                    formatPredefinedTrips(predefinedTrips, 1);
                } else {
                    console.log("No Predefined Trips");
                    var newPTag = $('<span></span>');
                    newPTag.text("No Predefined Trips");
                    tripListBlock.append(newPTag);
                }

                if (locationData != null) {

                    //isPrivate: 1, isEditable: 0,
                    locationList = locationData.map(function (location) {
                        var type = ""
                        if (location.locationType == "Common") {
                            type = ` (${Common})`;
                        }
                        if (location.locationType == "Open") {
                            type = ` (${Open})`;
                        }
                        if (location.locationType == "Private") {
                            type = ` (${Private})`;
                        }
                        //let label;
                        //if (location.isPrivate === 1) {
                        //    label = `<img src="./img/Private-flag.png" title="Private"> ${location.locationName}`;
                        //} else if (location.isPrivate === 0 && location.isEditable === 1) {
                        //    label = `<img src="./img/Open-flag.png" title="Open"> ${location.locationName}`;
                        //}
                        //else {
                        //    label = `<img src="./img/Icon ionic-ios-flag.png" title="Other"> ${location.locationName}`;
                        //}

                        //return {
                        //    label: label,
                        //    value: location.locationId,
                        //};

                        return {
                            value: location.locationName+type,
                            data: location.locationId,
                        };
                    });
                    if (allLocationData != null) {

                        allLocationList = allLocationData.map(function (location) {
                            var type = ""
                            if (location.locationType == "Common") {
                                type = ` (${Common})`;
                            }
                            if (location.locationType == "Open") {
                                type = ` (${Open})`;
                            }
                            if (location.locationType == "Private") {
                                type = ` (${Private})`;
                            }
                            return {
                                value: location.locationName+type,
                                data: location.locationId,
                            };
                        })
                    }
                    console.log(locationData);
                    initializeStartLocationAutocomplete($('#startlocation'), locationList);
                    initializeEndLocationAutocomplete($('#endlocation'), locationList);
                    /*generateDropdownOptions(locationList, '#startlocation');
                    // Initialize the dropdown for end location
                    generateDropdownOptions(locationList, '#endlocation');*/



                } else {
                    console.log("No Location");
                }

                if (passengerData != null) {
                    console.log('passenger data from api---->', passengerData);

                    passengerData.sort((a, b) => {
                        const firstNameA = a.firstName.toLowerCase();
                        const firstNameB = b.firstName.toLowerCase();
                        const lastNameA = a.lastName.toLowerCase();
                        const lastNameB = b.lastName.toLowerCase();

                        if (firstNameA < firstNameB) {
                            return -1;
                        }
                        if (firstNameA > firstNameB) {
                            return 1;
                        }
                        // If firstName is the same, compare lastName
                        if (lastNameA < lastNameB) {
                            return -1;
                        }
                        if (lastNameA > lastNameB) {
                            return 1;
                        }
                        return 0;
                    });

                    allPassengersData = [...passengerData];
                    /*let makepassenger = [];*/
                    /*makepassenger = passengerData
                        .filter(passenger => passenger.valid == 1)
                        .map(passenger => {
                          
                        })    */               
                    passengerList = passengerData
                        .filter(passenger => passenger.valid == 1) // Filter for valid passengers
                        .map(passenger => {
                            let type = "";
                           /* var isAuthorizedDisplayName;
                            var isVipDisplayName;
                            var isPrivateDisplayName;
                            var unAuthorizedUser;*/
                            if (passenger.isAuthorized == 1) {
                                type = ` (${isAuthorizedDisplayName})`
                            }
                            else {
                                type = ` (${unAuthorizedUser})`
                            }
                            if (passenger.isPrivate == 1) {
                                type = ` (${isPrivateDisplayName})`
                            }
                            if (passenger.isVip == 1) {
                                type = ` (${isVipDisplayName})`
                            }
                            return (

                            { value: passenger.firstName + ' ' + passenger.lastName+type, data: passenger.passengerId }
                            )
                        }
                            );
                    passengerCostCenters = passengerData
                        .filter(function (passenger) {
                            return passenger.costCenterCode !== null && passenger.costCenterCode !== '';
                        })
                        .map(function (passenger) {
                            return { passengerId: passenger.passengerId, costCenterCode: passenger.costCenterCode };
                        });
                    console.log(passengerList);
                    console.log('passengercostcentercode--->', passengerCostCenters);
                    initializeAutocomplete($('.passenger-dropdown'), passengerList);
                    //generateDropdownOptions(passengerList, '.passenger-dropdown');
                } else {
                    console.log("No Passenger");
                }

                if (costCentersData != null) {
                    costCentersList = costCentersData.map(function (costCenter) {
                        return { label: costCenter.costCenterCode + ' ' + costCenter.costCenterName, value: costCenter.costCenterCode };
                    });
                    console.log(costCentersData);
                    generateDropdownOptions(costCentersList, '#passengercotsecenter');
                    hideOverlay();
                } else {
                    console.log("No Passenger");
                }


                if (actionId == 2 || actionId == 3 || actionId == 4) {
                    showOverlay();
                    $.ajax({
                        url: '/Trips/GetTripData',
                        method: 'GET',
                        dataType: 'json',
                        data: { tripId: tripId },
                        success: function (data) {
                            console.log('trip data', data);
                            formatTrip(data);
                            hideOverlay();
                        },
                        error: function (error) {
                            hideOverlay();
                            console.error('API request failed:', error);
                        }
                    });


                }
            }

        } catch (error) {
            console.error('API request failed:', error);
        }
    };


    showOverlay();
    getAllOptionsData();

    function initializeStartLocationAutocomplete($input, List) {
        $input.autocomplete("destroy");
        $input.autocomplete({
            lookup: List,
            lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                // Normalize the suggestion value
                var normalizedSuggestionValue = normalize(suggestion.value);
                var normalizedQuery = normalize(queryLowerCase);

                // Split the query into words for multi-word matching
                var queryWords = normalizedQuery.split(/\s+/);

                // Check if the suggestion matches any of the query words
                return queryWords.every(word => normalizedSuggestionValue.toLowerCase().includes(word)) ||
                    queryWords.every(word => suggestion.value.toLowerCase().includes(word));
            },
            onSelect: debounce(function (suggestion) {
                $input.attr('data-id', suggestion.data);
                //viewLocation($input);
                console.log(suggestion);
                //calculateTravelDuration($input.closest(".trip-step-container"));
            }, 1000),    
        });
    }

    function initializeEndLocationAutocomplete($input, List) {
        $input.autocomplete("destroy");
        $input.autocomplete({
            lookup: List,
            lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                // Normalize the suggestion value
                var normalizedSuggestionValue = normalize(suggestion.value);
                var normalizedQuery = normalize(queryLowerCase);

                // Split the query into words for multi-word matching
                var queryWords = normalizedQuery.split(/\s+/);

                // Check if the suggestion matches any of the query words
                return queryWords.every(word => normalizedSuggestionValue.toLowerCase().includes(word)) ||
                    queryWords.every(word => suggestion.value.toLowerCase().includes(word));
            },
            onSelect: debounce(function (suggestion) {
                $input.attr('data-id', suggestion.data);
                //viewLocation($input);
                console.log(suggestion);
                //calculateTravelDuration($input.closest(".trip-step-container"));
            }, 1000),
            
        });
    }

    function checkForValuesInTripStep(tripStep) {
        var flag = true;

        var slocation = $(tripStep).find('.start-location').val();
        var startLocationId = $(tripStep).find('.start-location').attr('data-id');
        var startLocation = allLocationList.find(loc => loc.data == startLocationId);

        var elocation = $(tripStep).find('.end-location').val();
        var endLocationId = $(tripStep).find('.end-location').attr('data-id');
        var endLocation = allLocationList.find(loc => loc.data == endLocationId);

        if (!$(tripStep).find('.start-date').val()) {            
            flag = false;
        }
        if (!$(tripStep).find('.start-time').val()) {
            flag = false;
        }
        if (!startLocation || slocation !== startLocation.value) {
            flag = false;
        }
        if (!$(tripStep).find('.end-date').val()) {
            flag = false;
        }
        if (!$(tripStep).find('.end-time').val()) {
            flag = false;
        }
        if (!endLocation || elocation !== endLocation.value) {
            flag = false;
        }
        if ($(tripStep).find('.end-location').val() == $(tripStep).find('.start-location').val()) {
            flag = false;
        }

        return {
            flag,
            startLocation,
            endLocation
        }
    }

    function calculateTravelDuration(currentTripStep) {
        

        const { flag, startLocation, endLocation } = checkForValuesInTripStep(currentTripStep);

        if (flag) {
            showOverlay();
            console.log('calculateTravelDuration called');
            var startDate = $(currentTripStep).find('.start-date').val();
            var startTime = $(currentTripStep).find('.start-time').val();
            var endDate = $(currentTripStep).find('.end-date').val();
            var endTime = $(currentTripStep).find('.end-time').val();

            var startDatetimeObject = new Date(startDate + 'T' + startTime + 'Z');
            var endDatetimeObject = new Date(endDate + 'T' + endTime + 'Z');
            $.ajax({
                url: '/Trips/GetTripDuration',
                method: 'GET',
                data: { originLocationId: startLocation.data, destinationLocationId: endLocation.data, startDateTime: startDatetimeObject },
                success: function (data) {
                    console.log('data from the distance api', data);
                    if (data.errorMessage == null) {
                        var durationParts = data.durationInTraffic.split(':');

                        console.log('durationParts', durationParts);

                        currentTripStep.find('.duration-days').val(durationParts[0]);
                        currentTripStep.find('.duration-hours').val(durationParts[1]);
                        currentTripStep.find('.duration-minutes').val(durationParts[2]);

                        updateEndDateAndTime(currentTripStep);
                    }
                    hideOverlay();
                },
                error: function (error) {                    
                    console.error('Error fetching data:', error);
                    hideOverlay();
                }
            });
        }
    }

    function initializeAutocomplete($input, List) {
        //$input.autocomplete("destroy");
        $input.autocomplete({
            lookup: List,
            lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                // Normalize the suggestion value
                var normalizedSuggestionValue = normalize(suggestion.value);
                var normalizedQuery = normalize(queryLowerCase);

                // Split the query into words for multi-word matching
                var queryWords = normalizedQuery.split(/\s+/);

                // Check if the suggestion matches any of the query words
                return queryWords.every(word => normalizedSuggestionValue.toLowerCase().includes(word)) ||
                    queryWords.every(word => suggestion.value.toLowerCase().includes(word));
            },
       
            onSelect: function (suggestion) {
                $input.attr('data-id', suggestion.data);
                //viewLocation($input);
                console.log(suggestion);
            },
            /*select: function (event, ui) {
                $selectid.attr('data-id',ui.item.data);
                *//*$("#project-id").val(ui.item.value);
    $("#project-description").html(ui.item.desc);
    $("#project-icon").attr("src", "images/" + ui.item.icon);*//*
    
                //return false;
            }*/
        });
        
    }
    
    $(document).on('click', '.startLocationDetails', function () {
        let dataId = $(this).closest('.details-inputs').find('.start-location').data('id');
        if (dataId != null) {
            viewLocation(dataId);
        } else {
            alertCustom(1, SelectLocation);
        }
    });

    $(document).on('click', '.endLocationDetails', function () {
        let dataId = $(this).closest('.details-inputs').find('.end-location').data('id');
        if (dataId != null) {
            viewLocation(dataId);
        } else {
            alertCustom(1, SelectLocation);
        }
    });
    function viewLocation(id) {
       /* var id = $input.attr('data-id');
        if (id != null) {*/
            
                showOverlay();
                $.ajax({
                    url: '/ManagerEmplacements/GetLocationById',
                    method: 'GET',
                    data: { locationId: id },
                    success: function (obj) {
                        console.log(obj);
                        $("#AddNewLocation").modal("show");
                        $("#exampleModalLabel").text(LocationDetails)
                        $(".modal-footer").hide();
                        $('#locationId, #comment, #name, #npa, #country, #street, #city, #checkRadioPrivate').prop('disabled', true);
                        $('#locationId').val(obj.locationId);
                       
                        $('#comment').val(obj.comment);
                       /* populateSelect(obj.isEditable, 'textIsEdit');*/
                        $('#name').val(obj.locationName);
                        if (obj.isPrivate == 1) {
                            $('#checkRadioPrivate').prop('checked', true);
                        }
                        
                        $('#npa').val(obj.npa);
                        $('#country').val(obj.country);
                        $('#street').val(obj.street);
                        $('#city').val(obj.city);
                      
                       
                        hideOverlay();
                    },
                    error: function (error) {
                        alert(JSON.stringify(error));
                        console.error('Error fetching data:', error);
                    }
                });
           /* }*/
            
           /* $('#locationId').val('');
            $("#name").val('');
            $("#street").val('');
            $("#npa").val('');
            $("#city").val('');
            $("#country").val('');
            $("#comment").val('');
            $('#checkRadioCommon').prop('checked', false);
            $('#checkRadioPrivate').prop('checked', true);
            $('#checkOpen').prop('checked', false);*/
        

    }
    // Function to reset and initialize passenger dropdowns
    function generateDropdownOptions(options, targetElement) {
        // Clear existing options
        $(targetElement).empty();

        // Add a default option
        $(targetElement).append($('<option>', {
            value: '',
            text: TripsDropDrown,
        }));

        // Add other options
        options.forEach(function (option) {
            $(targetElement).append($('<option>', {
                value: option.value,
                text: option.label,
            }));
        });
    }

    function generateDropdownOptionsOutOfPolicy(options, targetElement) {
        // Clear existing options
        $(targetElement).empty();

        // Add other options
        options.forEach(function (option) {
            $(targetElement).append($('<option>', {
                value: option.value,
                text: option.label,
            }));
        });
    }

    function generatePassengerDropdownOptions(options, targetElement, exclusionList) {
        // Clear existing options
        $(targetElement).empty();
        console.log($(targetElement));
        // Add a default option
        $(targetElement).append($('<option>', {
            value: '',
            text: TripsDropDrown,
        }));
        console.log(exclusionList);
        // Add other options, excluding those in the exclusion list
        options.forEach(function (option) {


            // Convert option value to string for comparison
            var optionValueString = option.value.toString();

            // Check if option value exists in exclusion list
            var isExcluded = exclusionList.some(function (excludedValue) {
                return excludedValue === optionValueString;
            });

            if (!isExcluded) {

                $(targetElement).append($('<option>', {
                    value: option.value,
                    text: option.label,
                }));
            }
        });
        console.log($(targetElement));
    }

    function generateDropdownOptionsWithSelected(options, targetElement, selectedId) {
        // Clear existing options
        $(targetElement).empty();
        console.log(options, targetElement, selectedId);
        // Add a default option
        $(targetElement).append($('<option>', {
            value: '',
            text: TripsDropDrown,
        }));

        // Add other options
        options.forEach(function (option) {
            var $option = $('<option>', {
                value: option.value,
                text: option.label,
            });
            // Set selected attribute if this option matches the selectedId
            if (option.value === selectedId) {
                $option.prop('selected', true);
            }
            $(targetElement).append($option);
        });
    }

    function tripStepConfiguration(newTripStep) {
        newTripStep.find('.passenger-dropdown').each(function () {
            let val = $(this).val();
            console.log(val);
            $(this).val("");
            initializeAutocomplete($(this), passengerList);
            console.log($(this).val());
            $(this).val(val);

        });
        //newTripStep.find(".add-more-passenger-trip").on("click", function () {
        //    var flag = true;
        //    var currentPassengerList = [];
        //    $(this).closest(".trip-step-container").find('.details-inputs.passenger').each(function (passengerIndex, passenger) {
        //        $(passenger).find('.passenger-dropdown').each(function () {
        //            console.log("Console called", $(this).val())

        //            if (!$(this).val()) {
        //                alertCustom(1, PassengerDropdown);
        //                flag = false;
        //            }
        //            else {
        //                var pas = passengerList.find(pass => pass.value == $(this).val())
        //                if (!pas) {
        //                    alertCustom(1, PassengerDropdown);
        //                    flag = false;
        //                }
        //                else {

        //                    console.log($(this).val())
        //                    currentPassengerList.push($(this).val().toString());
        //                }
        //            }

        //        });
        //    });

        //    if (flag) {
        //        var clonedDiv = $(".details-inputs.passenger:first").clone();
        //        var passengerCount = newTripStep.find(".details-inputs.passenger").length + 1;
        //        clonedDiv.find(".details-header span").text("Passenger " + passengerCount);
        //        clonedDiv.find(".passenger-dropdown").attr('data-id', passengerCount);
        //        clonedDiv.find(".passenger-dropdown").addClass('error-check');
        //        clonedDiv.attr("passenger-hub-id", '');
        //        clonedDiv.attr("passenger-luggage-id", '');

        //        clonedDiv.find('.handbag').val('0');
        //        clonedDiv.find('.luggage').val('0');
        //        clonedDiv.find(".special").val('');
        //        clonedDiv.find(".delete-passenger-row-icon").removeClass('empty');
        //        clonedDiv.find('#autocomplete-input' + passengerCount).val('');
        //        clonedDiv.find('#selected-country-id' + passengerCount).val('');
        //        //clonedDiv.find(".passenger-dropdown").val('');
        //        //generatePassengerDropdownOptions(passengerList, clonedDiv.find(".passenger-dropdown"), currentPassengerList);
        //        var index = $('.passenger-dropdown').length - 1;
        //        clonedDiv.find("#autocomplete-input").attr('id', 'autocomplete-input' + index);
        //        clonedDiv.find("#selected-passenger-id").attr('id', 'selected-passenger-id' + index);
        //        clonedDiv.find('#autocomplete-input' + index).val('');
        //        initializeAutocomplete(clonedDiv.find('.passenger-dropdown'),passengerList);
        //        //initializeAutocomplete(newTripStep.find('#autocomplete-input' + index, '#selected-passenger-id' + index));
        //        newTripStep.find(".all-passenger-container").append(clonedDiv);
        //        //generatePassengerDropdownOptions(passengerList, $(this).closest(".trip-step-container").find(".details-inputs.passenger:last .passenger-dropdown"), currentPassengerList);               

        //    }

        //});

        //newTripStep.find(".detail-passenger-blk").on("click", ".details-inputs.passenger .delete-passenger-row-icon", function () {
        //    console.log('deleted passenger', $(this).closest(".details-inputs.passenger").attr("passenger-hub-id"))
        //    if ($(this).closest(".details-inputs.passenger").attr("passenger-hub-id")) {
        //        deletedItems.DeletedPassengers.push($(this).closest(".details-inputs.passenger").attr("passenger-hub-id"));
        //    }
        //    $(this).closest(".details-inputs.passenger").remove();
        //});

        // Initialize the dropdown for passenger
        newTripStep.find('.delete-link').show();


        //newTripStep.find('.detail-passenger-blk').on('change', '.passenger-dropdown', function () {
        //    var dataId = $(this).data('id');
        //    console.log('passenger dropdown change', dataId, this.value);
        //});
        //newTripStep.find('#startlocation').change(function () {
        //    console.log('start locationId', this.value);
        //});

        //newTripStep.find('#endlocation').change(function () {
        //    console.log('end locationId', this.value);
        //});

        //newTripStep.find('.date-time-fields').on('change', '.end-time', function () {
        //    if ($(this).closest(".trip-step-container").find('.end-date').val() == $(this).closest(".trip-step-container").find('.start-date').val()) {

        //        var today = new Date().toISOString().split('T')[0];
        //        var selectedDay = $(this).closest(".trip-step-container").find('.end-date').val()

        //        var minTime = $(this).closest(".trip-step-container").find('.start-time').val();
        //        var selectedTime = $(this).val();
        //        if ((today == selectedDay) && (selectedTime < minTime)) {
        //            //alertCustom(1, "Please select valid time");
        //            $(this).val(minTime);
        //        }
        //    }
        //    if ($(this).closest(".trip-step-container").find('.start-date').val() && $(this).closest(".trip-step-container").find('.start-time').val() && $(this).closest(".trip-step-container").find('.end-date').val()) {
        //        setTripDuration($(this).closest(".trip-step-container"));
        //    }

        //});

        //newTripStep.find('.date-time-fields').on('change', '.end-date', function () {
        //    if ($(this).closest(".trip-step-container").find('.end-time').val() && $(this).closest(".trip-step-container").find('.start-date').val() && $(this).closest(".trip-step-container").find('.start-time').val()) {
        //        setTripDuration($(this).closest(".trip-step-container"));
        //    }
        //});

        //newTripStep.find('.date-time-fields').on('change', '.start-time', function () {

        //    var today = new Date().toISOString().split('T')[0];
        //    var selectedDay = $(this).closest(".trip-step-container").find('.start-date').val()


        //    var curTime = getTodayTime();
        //    var selectedTime = $(this).val();
        //    if ((today == selectedDay) && (selectedTime < curTime)) {
        //        //alertCustom(1, "Please select valid time");
        //        $(this).val(curTime);
        //    }
        //    if ($(this).closest(".trip-step-container").find('.end-date').val() && $(this).closest(".trip-step-container").find('.end-time').val() && $(this).closest(".trip-step-container").find('.start-date').val()) {
        //        setTripDuration($(this).closest(".trip-step-container"));
        //    }

        //});

        //newTripStep.find('.date-time-fields').on('change', '.start-date', function () {
        //    var startDateValue = $(this).val();
        //    $(this).closest(".trip-step-container").find('.end-date').attr("min", startDateValue);

        //    console.log('startdate----------------->', startDateValue);
        //    if ($(this).closest(".trip-step-container").find('.end-date').val() && $(this).closest(".trip-step-container").find('.end-time').val() && $(this).closest(".trip-step-container").find('.start-time').val()) {
        //        setTripDuration($(this).closest(".trip-step-container"));
        //    }
        //});

        //newTripStep.find('.duration-days').on('input', function () {
        //    $(this).val($(this).val().replace(/[^0-9]/g, ''));
        //});

        //newTripStep.find('.duration-hours').on('input', function () {
        //    $(this).val($(this).val().replace(/[^0-9]/g, ''));
        //});

        //newTripStep.find('.duration-minutes').on('input', function () {
        //    $(this).val($(this).val().replace(/[^0-9]/g, ''));
        //});

        //newTripStep.find('.duration').on('change', '.duration-days', function () {
        //    updateEndDateAndTime($(this).closest(".trip-step-container"));
        //});

        //newTripStep.find('.duration').on('change', '.duration-hours', function () {
        //    if ($(this).val() < 0) {
        //        $(this).val(0);
        //    }
        //    if ($(this).val() > 23) {
        //        $(this).val(23);
        //        alertCustom(1, ValidateDuration);
        //    } else {
        //        updateEndDateAndTime($(this).closest(".trip-step-container"));
        //    }
        //});

        //newTripStep.find('.duration').on('change', '.duration-minutes', function () {
        //    if ($(this).val() < 0) {
        //        $(this).val(0);
        //    }
        //    if ($(this).val() > 59) {
        //        $(this).val(59);
        //        alertCustom(1, ValidateDuration1);
        //    } else {
        //        updateEndDateAndTime($(this).closest(".trip-step-container"));
        //    }
        //});

        //newTripStep.find(".error-check").on("input", function () {
        //    if ($(this).val()) {
        //        errorToogle(false, this)
        //    } else {
        //        errorToogle(true, this)
        //    }
        //});

        //newTripStep.find(".input-change").on("change", function () {
        //    IsValueChanged = true;
        //});


        //newTripStep.find('.details-inputs-details').on('input', '.handbag', function () {
        //    $(this).val($(this).val().replace(/[^0-9]/g, ''));
        //    if ($(this).val() < 0) {
        //        $(this).val(0);
        //    }
        //    if ($(this).val() > 50) {
        //        $(this).val(50);
        //    }
        //    if ($(this).val().length > 2) {
        //        $(this).val($(this).val().slice(0, 2));
        //    }
        //});

        //newTripStep.find('.details-inputs-details').on('input', '.luggage', function () {
        //    $(this).val($(this).val().replace(/[^0-9]/g, ''));
        //    if ($(this).val() < 0) {
        //        $(this).val(0);
        //    }
        //    if ($(this).val() > 50) {
        //        $(this).val(50);
        //    }
        //    if ($(this).val().length > 2) {
        //        $(this).val($(this).val().slice(0, 2));
        //    }
        //});


        $(".trip-step-row").find('.trip-step-container').last().addClass('bottom-line')
        $(".trip-step-row").append(newTripStep);
    }

    $("#add-tripstep").on("click", function () {
        var newTripStep = $(".trip-step-container").first().clone();
        newTripStep.removeClass('bottom-line');
        newTripStep.find("input, select, textarea").val('');
        newTripStep.find("input, select, textarea").removeAttr('title');
        newTripStep.find("input, select, textarea").css('border', '1px solid #cacccf');

        var previousStep = $(".trip-step-container:last");
        var previousEndLocation = $(".trip-step-container:last").find('.end-location').val();
        var previousEndDate = $(".trip-step-container:last").find('.end-date').val();
        var previousEndTime = $(".trip-step-container:last").find('.end-time').val();

        console.log('prevEndLocation---------------------->', previousEndLocation);
        console.log('previousEndDate---------------------->', previousEndDate);
        console.log('previousEndTime---------------------->', previousEndTime);

        var newTripStepCount = $(".trip-step-container").length + 1;

        newTripStep.find('.detail-header h4').text(TripStep + newTripStepCount);
        newTripStep.removeAttr('trip-step-id');
        initializeStartLocationAutocomplete(newTripStep.find(".start-location"), locationList);
        var location = allLocationList.find(loc => loc.value == previousEndLocation);
        if (location) {

            newTripStep.find(".start-location").val(location.value);
            newTripStep.find(".start-location").attr('data-id', parseInt(location.data));
        }
        //generateDropdownOptionsWithSelected(locationList, newTripStep.find(".start-location"), parseInt(previousEndLocation));
        newTripStep.find(".start-date").val(previousEndDate);
        newTripStep.find(".start-time").val(previousEndTime);

        var previousEndDateTime = new Date(`${previousEndDate}T${previousEndTime}:00`);
        var twoHoursAddedToPreviousEndDateTime = getAdjustedDateTime(previousEndDateTime, 120);

        newTripStep.find(".end-date").val(twoHoursAddedToPreviousEndDateTime.date);
        newTripStep.find(".end-time").val(twoHoursAddedToPreviousEndDateTime.time);
        initializeEndLocationAutocomplete(newTripStep.find(".end-location"), locationList);
        setTripDuration(newTripStep);

        // Clear any existing passengers in the new trip step
        newTripStep.find(".all-passenger-container").empty();

        // Clone passengers from the previous step only
        var previousPassengers = previousStep.find(".details-inputs.passenger");
        previousPassengers.each(function (index) {



            var passengerDiv = $(this).clone();

            passengerDiv.attr("passenger-hub-id", '');

            passengerDiv.attr("passenger-luggage-id", '');
            var originalDataId = $(this).find(".passenger-dropdown").attr('data-id');
            passengerDiv.find(".details-header span").text("Passenger " + (index + 1)); // Update passenger label

            // Set a unique data-id for each passenger
            passengerDiv.find(".passenger-dropdown").attr('data-id', originalDataId);

            // Append the cloned passenger to the new trip step
            newTripStep.find(".all-passenger-container").append(passengerDiv);


        });

        tripStepConfiguration(newTripStep);
        var passengerIndex = newTripStep.find('.passenger-dropdown').length - 1; // Use the new trip step
        newTripStep.find("#autocomplete-input").attr('id', 'autocomplete-input' + passengerIndex);

    });

    $(document).on('click', ".add-more-passenger-trip", function () {
        var flag = true;
        var currentPassengerList = [];
        $(this).closest(".trip-step-container").find('.details-inputs.passenger').each(function (passengerIndex, passenger) {
            $(passenger).find('.passenger-dropdown').each(function () {
                console.log("Console called", $(this).val())

                if (!$(this).val()) {
                    errorToogle(true, $(this));
                    flag = false;
                }
                else {
                    var pas = passengerList.find(pass => pass.value == $(this).val())
                    if (!pas) {
                        errorToogle(true, $(this));
                        flag = false;
                    }
                    else {

                        console.log($(this).val())
                        currentPassengerList.push($(this).val().toString());
                    }
                }

            });
        });

        if (flag) {
            var clonedDiv = $(".details-inputs.passenger:first").clone();
            var passengerCount = $(this).closest(".trip-step-container").find(".details-inputs.passenger").length + 1;
            clonedDiv.find(".details-header span").text("Passenger " + passengerCount);
            clonedDiv.find(".passenger-dropdown").attr('data-id', passengerCount);
            clonedDiv.find(".passenger-dropdown").addClass('error-check');
            clonedDiv.attr("passenger-hub-id", '');
            clonedDiv.attr("passenger-luggage-id", '');

            clonedDiv.find('.handbag').val('0');
            clonedDiv.find('.luggage').val('0');
            clonedDiv.find(".special").val('');
            clonedDiv.find(".delete-passenger-row-icon").removeClass('empty');
            clonedDiv.find('#autocomplete-input' + passengerCount).val('');
            clonedDiv.find('#selected-country-id' + passengerCount).val('');
            //clonedDiv.find(".passenger-dropdown").val('');
            //generatePassengerDropdownOptions(passengerList, clonedDiv.find(".passenger-dropdown"), currentPassengerList);
            var index = $('.passenger-dropdown').length - 1;
            clonedDiv.find("#autocomplete-input").attr('id', 'autocomplete-input' + index);
            clonedDiv.find("#selected-passenger-id").attr('id', 'selected-passenger-id' + index);
            clonedDiv.find('#autocomplete-input' + index).val('');
            initializeAutocomplete(clonedDiv.find('.passenger-dropdown'), passengerList);
            clonedDiv.find('.passenger-dropdown').val('');
            //initializeAutocomplete(clonedDiv.find('#autocomplete-input' + index), passengerList);
            //clonedDiv.find(".all-passenger-container").append(clonedDiv);
            $(this).closest(".trip-step-container").find(".all-passenger-container").append(clonedDiv);
            //generatePassengerDropdownOptions(passengerList, $(this).closest(".trip-step-container").find(".details-inputs.passenger:last .passenger-dropdown"), currentPassengerList);               

        }

    });

  

    $(document).on("click", ".delete-passenger-row-icon", function () {
        console.log("passenger hub id", $(this).closest(".details-inputs.passenger").attr("passenger-hub-id"));
        if ($(this).closest(".details-inputs.passenger").attr("passenger-hub-id")) {
            deletedItems.DeletedPassengers.push($(this).closest(".details-inputs.passenger").attr("passenger-hub-id"));
        }
        $(this).closest(".details-inputs.passenger").remove();
    });

    $(document).on("click", ".delete-link", function () {
        console.log('deleted trip step', $(this).closest(".trip-step-container").attr("trip-step-id"))
        if ($(this).closest(".trip-step-container").attr("trip-step-id")) {
            deletedItems.DeletedTripSteps.push($(this).closest(".trip-step-container").attr("trip-step-id"));
        }
        $(this).closest(".trip-step-container").remove();
    });



    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    }


    $(document).on('change', '.end-time', debounce(function () {
        if ($(this).closest(".trip-step-container").find('.end-date').val() == $(this).closest(".trip-step-container").find('.start-date').val()) {

            var today = new Date().toISOString().split('T')[0];
            var selectedDay = $(this).closest(".trip-step-container").find('.end-date').val();

            var minTime = $(this).closest(".trip-step-container").find('.start-time').val();
            var selectedTime = $(this).val();
            if ((today == selectedDay) && (selectedTime < minTime)) {
                //alertCustom(1, "Please select valid time");
                $(this).val(minTime);
            }
        }
        if ($(this).closest(".trip-step-container").find('.start-date').val() && $(this).closest(".trip-step-container").find('.start-time').val() && $(this).closest(".trip-step-container").find('.end-date').val()) {
            setTripDurationForEndDateTime($(this).closest(".trip-step-container"));
        }
        
    }, 1000));  // Delay of 500ms

    $(document).on('change', '.end-date', debounce(function () {
        if ($(this).closest(".trip-step-container").find('.end-time').val() && $(this).closest(".trip-step-container").find('.start-date').val() && $(this).closest(".trip-step-container").find('.start-time').val()) {
            setTripDurationForEndDateTime($(this).closest(".trip-step-container"));
        }
        
    }, 1000));  // Delay of 500ms

    $(document).on('change', '.start-time', debounce(function () {

        var today = new Date().toISOString().split('T')[0];
        var selectedDay = $(this).closest(".trip-step-container").find('.start-date').val()


        var curTime = getTodayTime();
        var selectedTime = $(this).val();
        if ((today == selectedDay) && (selectedTime < curTime)) {
            //alertCustom(1, "Please select valid time");
            $(this).val(curTime);
        }


        //if ($(this).closest(".trip-step-container").find('.end-date').val() && $(this).closest(".trip-step-container").find('.end-time').val() && ($(this).closest(".trip-step-container").find('.end-date').val() == $(this).closest(".trip-step-container").find('.start-date').val()) && ($(this).closest(".trip-step-container").find('.end-time').val() > $(this).val())) {
        //    $(this).val($(this).closest(".trip-step-container").find('.end-time').val());
        //}

        if ($(this).closest(".trip-step-container").find('.end-date').val() && $(this).closest(".trip-step-container").find('.end-time').val() && $(this).closest(".trip-step-container").find('.start-date').val()) {
            setTripDuration($(this).closest(".trip-step-container"));
        }

    }, 1000));

    $(document).on('change', '.start-date', debounce(function () {
        var startDateValue = $(this).val();
        $(this).closest(".trip-step-container").find('.end-date').attr("min", startDateValue);

        //if ($(this).closest(".trip-step-container").find('.end-date').val() && ($(this).closest(".trip-step-container").find('.end-date').val() > $(this).val())) {
        //    $(this).val($(this).closest(".trip-step-container").find('.end-date').val())
        //}

        console.log('startdate----------------->', startDateValue);
        if ($(this).closest(".trip-step-container").find('.end-date').val() && $(this).closest(".trip-step-container").find('.end-time').val() && $(this).closest(".trip-step-container").find('.start-time').val()) {
            setTripDuration($(this).closest(".trip-step-container"));
        }
    }, 1000));

    $(document).on('change', '#startlocation', function () {
        var startLocationValue = $(this).val();
        console.log('start-location', startLocationValue);
    });

    $(document).on('change', '#endlocation', function () {
        var startLocationValue = $(this).val();
        console.log('end-location', startLocationValue);
    });

    $(document).on('click', '#mail-trip-label', function () {
        var val = $(this).closest(".trip-step-container").find('.is-mail-required').is(":checked");
        if (val) {
            $(this).closest(".trip-step-container").find('.is-mail-required').prop("checked", false);
        } else {
            $(this).closest(".trip-step-container").find('.is-mail-required').prop("checked", true);
        }
    });
    $(document).on('input', function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });

    $(document).on('input', function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });

    $(document).on('input', function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });


    $(document).on('change', '.duration-days', function () {
        updateEndDateAndTime($(this).closest(".trip-step-container"));
    });

    $(document).on('change', '.duration-hours', function () {
        if ($(this).val() < 0) {
            $(this).val(0);
        }
        if ($(this).val() > 23) {
            $(this).val(23);
            alertCustom(1, ValidateDuration);
        } else {
            updateEndDateAndTime($(this).closest(".trip-step-container"));
        }
    });

    $(document).on('change', '.duration-minutes', function () {
        if ($(this).val() < 0) {
            $(this).val(0);
        }
        if ($(this).val() > 59) {
            $(this).val(59);
            alertCustom(1, ValidateDuration1);
        } else {
            updateEndDateAndTime($(this).closest(".trip-step-container"));
        }
    });

    // Listen for changes in the duration input fields
    //$('.duration-days, .duration-hours, .duration-minutes').on('input', updateEndDateAndTime($(this).closest(".trip-step-container")));

    $(document).on('input', '.handbag', function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        if ($(this).val() < 0) {
            $(this).val(0);
        }
        if ($(this).val() > 50) {
            $(this).val(50);
        }
        if ($(this).val().length > 2) {
            $(this).val($(this).val().slice(0, 2));
        }
    });

    $(document).on('input', '.luggage', function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        if ($(this).val() < 0) {
            $(this).val(0);
        }
        if ($(this).val() > 50) {
            $(this).val(50);
        }
        if ($(this).val().length > 2) {
            $(this).val($(this).val().slice(0, 2));
        }
    });


    //$('.detail-passenger-blk').on('change', '.passenger-dropdown', function () {
    //    var dataId = $(this).data('id');
    //    console.log('passenger dropdown change', dataId, this.value);
    //});

    //$('#startlocation').change(function () {
    //    console.log('start locationId', this.value);
    //});

    //$('#endlocation').change(function () {
    //    console.log('end locationId', this.value);
    //});

    $('#requestor-dropdown').change(function () {
        console.log('selected Delegate id ', this.value);
        console.log('selected Delegate value', $('#requestor-dropdown').find(':selected').text());
    });


    //Step1 Flight Info Operation

    $('.date-time-fields').on('change', '#flight-time', function () {

        var today = new Date().toISOString().split('T')[0];
        var selectedDay = $("#flight-date").val();

        console.log('dates', today, 'selected date', selectedDay);

        var curTime = getTodayTime();
        var selectedTime = $(this).val();
        if ((today == selectedDay) && (selectedTime < curTime)) {
            //alertCustom(1, "Please select valid time");
            $(this).val(curTime);
        }
    });

    $(".flight-type-active").on("click", function () {
        var flightType = $(this).val();
        console.log($(this).val());
        var curTime = getTodayTime();
        var today = new Date().toISOString().split('T')[0];

        selectedPredefinedTrip = null;

        formatPredefinedTrips(predefinedTripsList, flightType);

        if (flightType === "1" || flightType === "2") {


            $("#flight-number, #flight-date, #flight-time").prop("disabled", false);
            if ($('.flight-num span .required-red').length === 0) {
                $(".flight-num span").append('<sup class="required-red"> * </sup>');
                $(".flight-dt span").append('<sup class="required-red"> * </sup>');
            }
            if (!$("#flight-date").val()) {
                $("#flight-date").val(today);
            }
            if (!$("#flight-time").val()) {
                $("#flight-time").val(curTime);
            }


        } else {
            $("#flight-number").val('');
            //$("#flight-date").val('');
            //$("#flight-time").val('');
            $("#flight-number").css('border', '1px solid #cacccf');
            $("#flight-date").css('border', '1px solid #cacccf');
            $("#flight-time").css('border', '1px solid #cacccf');
            $(".flight-num span .required-red").remove();
            $(".flight-dt span .required-red").remove();
            $("#flight-number, #flight-date, #flight-time").prop("disabled", true);
        }
    });

    //$("#flight-number").on("input", function () {
    //    if ($(this).val()) {
    //        errorToogle(false,this)
    //    } else {
    //        errorToogle(true, this)
    //    }
    //});

    //$("#flight-date").on("input", function () {
    //    if ($(this).val()) {
    //        errorToogle(false, this)
    //    } else {
    //        errorToogle(true, this)
    //    }
    //});

    //$("#flight-time").on("input", function () {
    //    if ($(this).val()) {
    //        errorToogle(false, this)
    //    } else {
    //        errorToogle(true, this)
    //    }
    //});

    $(document).on("input", ".error-check", function () {
        if ($(this).val()) {
            errorToogle(false, this)
        } else {
            errorToogle(true, this)
        }
    });

    $(document).on("change", ".input-change", function () {
        IsValueChanged = true;
    });


    function checkFlightInfoFields() {
        var myRadio = $("input[name=radio-grp]");
        var selectedFlightType = myRadio.filter(":checked").val();

        if (selectedFlightType == 1 || selectedFlightType == 2) {
            var stringids = ['#flight-number', '#flight-date', '#flight-time'];
            var emptyFieldFound = 0;
            let scrollcount = 0;
            // Loop through each input field
            stringids.forEach(function (id) {
                // Check if the field is empty
                if ($(id).val() === '' || $(id).val() === null) {
                    errorToogle(true, id);
                    emptyFieldFound = +1;
                } else {
                    errorToogle(false, id);
                }
            });

            if (emptyFieldFound > 0) {
                return false;
            }

            var selectedFlightDate = $('#flight-date').val();
            var selectedFlightTime = $('#flight-time').val();

            var selectedDateTimeFormated = new Date(`${selectedFlightDate}T${selectedFlightTime}`);

            var now = new Date();

            var thirtyMinutesAdded = getAdjustedDateTime(now, 30);

            var thirtyMinutesAddedFormated = new Date(`${thirtyMinutesAdded.date}T${thirtyMinutesAdded.time}:00`);

            if (thirtyMinutesAddedFormated > selectedDateTimeFormated) {
                $('#flight-time').css('border', '1px solid #ff0000');
                $('#flight-time').attr('title', FlightAlert);
                return false;
            }

        }
        return true;
    }

    function configureForDeparture(givenDateTime) {
        let tripSteps = $('.trip-step-row .trip-step-container').get(); // Convert to array

        var stepsLength = tripSteps.length;

        console.log('steps count', stepsLength);


        for (i = 0; i < stepsLength; i++) {
            var tripStep = $(tripSteps[stepsLength - 1 - i]);

            var tripStepData = tripData.tripSteps[stepsLength-1-i];

            var curTime = getAdjustedDateTime(new Date(), 40);

            var timeDiff = getTimeDiff(new Date(tripStepData.startDateTime), new Date(tripStepData.endDateTime))

            var endDateTime = getAdjustedDateTime(new Date(`${givenDateTime.date}T${givenDateTime.time}:00`), 0);

            if (new Date(`${curTime.date}T${curTime.time}:00`) > new Date(`${endDateTime.date}T${endDateTime.time}:00`)) {
                tripStep.find('.end-date').val(curTime.date);
                tripStep.find('.end-time').val(curTime.time);
            } else {
                tripStep.find('.end-date').val(endDateTime.date);
                tripStep.find('.end-time').val(endDateTime.time);
            }

            var startDateTime = getAdjustedDateTime(new Date(`${endDateTime.date}T${endDateTime.time}:00`), (-timeDiff));

            if (new Date(`${curTime.date}T${curTime.time}:00`) > new Date(`${startDateTime.date}T${startDateTime.time}:00`)) {
                tripStep.find('.start-date').val(curTime.date);
                tripStep.find('.start-time').val(curTime.time);
            } else {
                tripStep.find('.start-date').val(startDateTime.date);
                tripStep.find('.start-time').val(startDateTime.time);
            }

            givenDateTime = startDateTime;
        }
    }

    function configureForArrival(givenDateTime) {
        let tripSteps = $('.trip-step-row .trip-step-container').get(); // Convert to array

        var stepsLength = tripSteps.length;

        console.log('steps count', stepsLength);


        for (i = 0; i < stepsLength; i++) {
            var tripStep = $(tripSteps[i]);

            var tripStepData = tripData.tripSteps[i];

            var curTime = getAdjustedDateTime(new Date(), 40);

            var timeDiff = getTimeDiff(new Date(tripStepData.startDateTime), new Date(tripStepData.endDateTime))

            var startDateTime = getAdjustedDateTime(new Date(`${givenDateTime.date}T${givenDateTime.time}:00`) , 0);

            if (new Date(`${curTime.date}T${curTime.time}:00`) > new Date(`${startDateTime.date}T${startDateTime.time}:00`)) {
                tripStep.find('.start-date').val(curTime.date);
                tripStep.find('.start-time').val(curTime.time);
            } else {
                tripStep.find('.start-date').val(startDateTime.date);
                tripStep.find('.start-time').val(startDateTime.time);
            }

            var endDateTime = getAdjustedDateTime(new Date(`${startDateTime.date}T${startDateTime.time}:00`), timeDiff);

            if (new Date(`${curTime.date}T${curTime.time}:00`) > new Date(`${endDateTime.date}T${endDateTime.time}:00`)) {
                tripStep.find('.end-date').val(curTime.date);
                tripStep.find('.end-time').val(curTime.time);
            } else {
                tripStep.find('.end-date').val(endDateTime.date);
                tripStep.find('.end-time').val(endDateTime.time);
            }

            givenDateTime = endDateTime;

        }
    }

    function saveTripFlightInfo() {
        if (checkFlightInfoFields()) {
            var myRadio = $("input[name=radio-grp]");
            var selectedFlightType = myRadio.filter(":checked").val();
            var flightNumber = $("#flight-number").val();
            var date = $("#flight-date").val();
            var time = $("#flight-time").val();
            var datetimeObject = null;

            if (date && time) {
                var dateParts = date.split("-");
                var timeParts = time.split(":");

                datetimeObject = new Date(`${date}T${time}Z`);
            }

            newTripData.FlightType = selectedFlightType;

            if (selectedFlightType == 1 || selectedFlightType == 2) {
                newTripData.FlightDatetime = datetimeObject
                newTripData.FlightNumber = flightNumber ? flightNumber : null
            }

            if (actionId == 1) {
                if (selectedFlightType == 2) {
                    $('.start-date').val(date);
                    $('.start-time').val(time);



                    var twoHoursAdded = getAdjustedDateTime(new Date(`${date}T${time}:00`), 120);

                    $('.end-date').val(twoHoursAdded.date);
                    $('.end-time').val(twoHoursAdded.time);


                }
                if (selectedFlightType == 1) {
                    $('.end-date').val(date);
                    $('.end-time').val(time);

                    var twoHoursLessened = getAdjustedDateTime(new Date(`${date}T${time}:00`), -120);

                    $('.start-date').val(twoHoursLessened.date);
                    $('.start-time').val(twoHoursLessened.time);

                    var thisStartDateTime = new Date(`${twoHoursLessened.date}T${twoHoursLessened.time}:00`);

                    var curTime = getAdjustedDateTime(new Date(), 40);

                    if (new Date(`${curTime.date}T${curTime.time}:00`) > thisStartDateTime) {
                        var curDateTimeParts = getAdjustedDateTime(new Date(`${curTime.date}T${curTime.time}:00`), 0);

                        $('.start-date').val(curDateTimeParts.date);
                        $('.start-time').val(curDateTimeParts.time);

                    }
                }
                setTripDuration($(".trip-step-container"))
            }
            else {
                var ourDate = new Date(`${date}T${time}`);
                var pastDate = new Date(tripData.flightDateTime);

                var diff = getTimeDiff(ourDate, pastDate);

                if (selectedFlightType != tripData.flightType || diff != 0) {
                    var givenDateTime = getAdjustedDateTime(new Date(`${date}T${time}`), 0);

                    if (selectedFlightType == 2) {
                        configureForArrival(givenDateTime);
                    } else if (selectedFlightType == 1) {
                        configureForDeparture(givenDateTime);
                    }
                }
            }

            IsValueChanged = true;

            if (selectedPredefinedTrip) {
                showOverlay();
                $.ajax({
                    url: '/Trips/GetTripData',
                    method: 'GET',
                    dataType: 'json',
                    data: { tripId: selectedPredefinedTrip },
                    success: function (data) {
                        console.log('trip data', data);
                        formatTripSteps(data, false, true);
                        hideOverlay();
                    },
                    error: function (error) {
                        console.error('API request failed:', error);
                        hideOverlay();
                    }
                });
            }

            $("#tab-1").hide();
            $("#tab-2").show();
            $('#tab-1-link').closest('li').removeClass('active-3');
            $('#tab-1-link').closest('li').addClass('complete');
            $('#tab-2-link').closest('li').addClass('active-3');
        }

    }
    $("#flight-info-save").on("click", function () {

        saveTripFlightInfo();

    });

    var strNewTripData;
    $("#trip-step-save").on("click", function () {

        if (isCompleted == 1) {
            showConfirmPopup(IsCompletedConfirmation);

            $('#confirm-button').one('click', function () {

                hideConfirmPopup();
                saveTripValidation();

            });
        } else {
            saveTripValidation();
        }


    });

    $('#yes-no-mobile-popup').on('click', function () {
        $('#no-mobile-popup').modal('hide');
        hideOverlay();
    });

    $('#no-no-mobile-popup').on('click', function () {
        $('#no-mobile-popup').modal('hide');
        hideOverlay();
        saveTripDetails(true, strNewTripData);
    });

    function saveTripValidation() {
        showOverlay();
        var flag = true;
        newTripData.TripSteps = [];
        var curenttrippassengers = [];
        var currentpassengernames = [];
        finallist = [];
        newTripData.RequestedUser = requestingUser.userId;
        if (actionId == 2) {
            newTripData.TripId = tripId;
        }

        newTripData.IsFavoriteTrip = isFavoriteTrip;
        var mobileMissingPassengersList = [];
        var isMobileAndPhoneMissing = false;
        var flag = true; // Assume validation passes initially
        console.log('--------------------------------------------->', newTripData);
        $('.trip-step-row .trip-step-container').each(function (index, tripStep) {
            var tripStepValues = {
                tripStepNumber: index + 1,
            };


            var passengersInStep = []; // Array to track passenger IDs in this trip step
            var slocation = $(tripStep).find('.start-location').val();
            var startLocationId = $(tripStep).find('.start-location').attr('data-id');
            var startLocation = allLocationList.find(loc => loc.data == startLocationId);

            var elocation = $(tripStep).find('.end-location').val();
            var endLocationId = $(tripStep).find('.end-location').attr('data-id');
            var endLocation = allLocationList.find(loc => loc.data == endLocationId);
            if (!$(tripStep).find('.start-date').val()) {
                errorToogle(true, $(tripStep).find('.start-date'));
                flag = false;
            }
            if ($(tripStep).find('.start-date').val() < $(tripStep).find('.start-date').attr('min')) {
                $(tripStep).find('.start-date').css('border', '1px solid #ff0000'); // Add red border
                flag = false;
            }
            if (!$(tripStep).find('.start-time').val()) {
                errorToogle(true, $(tripStep).find('.start-time'));
                flag = false;
            }
            if (!startLocation || slocation !== startLocation.value) {
                errorToogle(true, $(tripStep).find('.start-location'));
                flag = false;
            }
            if (!$(tripStep).find('.end-date').val()) {
                errorToogle(true, $(tripStep).find('.end-date'));
                flag = false;
            }
            if (!$(tripStep).find('.end-time').val()) {
                errorToogle(true, $(tripStep).find('.end-time'));
                flag = false;
            }
            if (!endLocation || elocation !== endLocation.value) {
                errorToogle(true, $(tripStep).find('.end-location'));
                flag = false;
            }
            if ($(tripStep).find('.end-location').val() == $(tripStep).find('.start-location').val()) {
                alertCustom(2, LocationValidation);
                flag = false;
            }

            var startDate = $(tripStep).find('.start-date').val();
            var startTime = $(tripStep).find('.start-time').val();
            var endDate = $(tripStep).find('.end-date').val();
            var endTime = $(tripStep).find('.end-time').val();

            var startDatetimeObject = new Date(startDate + 'T' + startTime + 'Z');
            var endDatetimeObject = new Date(endDate + 'T' + endTime + 'Z');

            if (index == 0) {
                newTripData.TripStartDateTime = startDatetimeObject;

                var thirtyMinutesAdded = getAdjustedDateTime(new Date(), 30);
                var thirtyMinutesAddedFormated = new Date(`${thirtyMinutesAdded.date}T${thirtyMinutesAdded.time}Z`);

                if (thirtyMinutesAddedFormated > startDatetimeObject) {
                    $(tripStep).find('.start-time').css('border', '1px solid #ff0000');
                    $(tripStep).find('.start-time').attr('title', 'Cannot create trip starting within 30 min of the present time');
                    flag = false;
                }
            }
            newTripData.TripEndDateTime = endDatetimeObject;

            if (startDatetimeObject > endDatetimeObject) {
                alertCustom(2, NegativeDuration);
                flag = false;
            }

            if ($(tripStep).attr("trip-step-id") && actionId == 2) {
                tripStepValues['TripStepId'] = $(tripStep).attr("trip-step-id");
            }

            tripStepValues['StartDateTime'] = startDatetimeObject;
            /*slocation = $(tripStep).find('.start-location').val();
            startLocation = locationList.find(loc => loc.value == slocation);*/


            tripStepValues['StartLocationId'] = parseInt($(tripStep).find('.start-location').attr('data-id'));

            tripStepValues['EndDateTime'] = endDatetimeObject;
            /* elocation = $(tripStep).find('.end-location').val();
             endLocation = locationList.find(loc => loc.value == elocation);*/


            tripStepValues['EndLocationId'] = parseInt($(tripStep).find('.end-location').attr('data-id'));


            tripStepValues['IsMailRequired'] = $(tripStep).find('.is-mail-required').is(":checked");
            tripStepValues['Comment'] = $(tripStep).find('.comment').val();

            tripStepValues.Passengers = []; // Initialize passengers array

            $(tripStep).find('.details-inputs.passenger').each(function (passengerIndex, passenger) {
                var passengerData = {
                    PassengerHubId: null,
                };

                if ($(passenger).attr("passenger-hub-id") && actionId == 2) {
                    passengerData['PassengerHubId'] = $(passenger).attr("passenger-hub-id");
                    passengerData['PassengerLuggageId'] = $(passenger).attr("passenger-luggage-id");
                }

                var curPassengerId;
                $(passenger).find('input.passenger-dropdown').each(function () {
                    if ($(this).val()) {
                        curPassenger = $(this).val();
                        curPassengerId = parseInt($(this).attr('data-id'));
                        let passId = passengerList.find(pass => pass.data == curPassengerId);

                        if (passId !== undefined || curPassenger !== passId.value) {
                            let pId = passId.data;

                            // Check if the passenger ID already exists in this trip step
                            if (passengersInStep.includes(pId)) {
                                rightInputError(true, this); // Show error for duplicate passenger
                                flag = false;
                                return; // Skip further processing for this passenger
                            }

                            // Add passenger ID to the current trip step array
                            passengersInStep.push(pId);

                            // Continue with data collection
                            passengerData['PassengerId'] = pId;

                            let passengerDataFromList = allPassengersData.find(function (p) {
                                return p.passengerId == pId;
                            });

                            if (passengerDataFromList) {
                                var passengerMobilePhone = passengerDataFromList.mobilePhone ? passengerDataFromList.mobilePhone : null;
                                var passengerPhone = passengerDataFromList.phone ? passengerDataFromList.phone : null;

                                if (!passengerMobilePhone && !passengerPhone) {
                                    isMobileAndPhoneMissing = true;
                                    mobileMissingPassengersList.push(passengerDataFromList.firstName + ' ' + passengerDataFromList.lastName);
                                }
                            }
                        } else {
                            rightInputError(true, this);
                            flag = false;
                        }
                    } else {
                        errorToogle(true, this);
                        flag = false;
                    }
                });

                if ($(passenger).find('.handbag').val()) {
                    passengerData['HandBag'] = $(passenger).find('.handbag').val();
                } else {
                    errorToogle(true, $(passenger).find('.handbag'));
                    flag = false;
                }

                if ($(passenger).find('.luggage').val()) {
                    passengerData['Luggage'] = $(passenger).find('.luggage').val();
                } else {
                    errorToogle(true, $(passenger).find('.luggage'));
                    flag = false;
                }

                passengerData['Special'] = $(passenger).find('.special').val();
                tripStepValues.Passengers.push(passengerData);

                var index = curenttrippassengers.indexOf(passengerData.PassengerId);

                console.log(index);
                if (index == -1) {
                    var value = passengerData.PassengerId;
                    console.log(value);
                    curenttrippassengers.push(value);
                    findlabel(passengerList, parseInt(value));
                }


            });
           
            $.ajax({
                url: '/ManagerExternalService/getServices',
                method: 'GET',
                //dataType: 'json',
                /*data: {
                    ServiceId: serviceid,
                },*/
                success: function (data) {
                    //console.log(data);
                    paymentmodes = [];
                    externalServices = [];
                    externalServices = data
                        .filter(function (service) {
                            return service.valid === 1; // Filter for valid services
                        })
                        .map(function (service) {
                            return {
                                label: service.name,
                                value: service.id
                            };
                        });
                    generateDropdownOptions(externalServices, '#externalservicedropdown');
                },
                error: function (error) {

                    console.error('API request failed:', error);
                }

            });
            console.log('Trip Step ' + (index + 1) + ' Data:', tripStepValues);
            newTripData.TripSteps.push(tripStepValues);
            console.log(newTripData);

        });



        console.log('passeneger list Data:', finallist);
        //if (finallist.length == 0) {
        //    alertCustom(2, 'Please add passengers');
        //    flag = false;
        //}
        //if (!checkTripStepFields()) {
        //    flag = false;
        //}

        console.log('error flag-->', flag);
        newTripData['ItemsDeleted'] = deletedItems;
        console.log('All Trip Steps Data:', newTripData);
        console.log('Deleted Trip values', deletedItems);
        strNewTripData = JSON.stringify(newTripData);
        console.log('str data', strNewTripData);



        function findlabel(List, ele) {
            console.log(ele);
            console.log(List);

            for (var i = 0; i < List.length; i++) {
                if (List[i].data === ele) {
                    currentpassengernames.push(List[i].value);
                };
            }
            if (curenttrippassengers.length == 1) {
                var element = { value: curenttrippassengers[0], label: currentpassengernames[0] }
                if (finallist[0] == element) {

                } else {
                    if (element.value) {
                        finallist.push(element);
                    }

                }
            }
            else {

                for (var j = 0; j < curenttrippassengers.length; j++) {
                    var element = { value: curenttrippassengers[j], label: currentpassengernames[j] };
                    if (!finallist.some(obj => obj.value === element.value && obj.label === element.label)) {
                        console.log('passenger elem', element)
                        finallist.push(element);
                    }
                }
            }
        };
        //if (finallist.length !== 1) finallist.splice(0, 1);

        generateDropdownOptionsOutOfPolicy(finallist, '#paymentpassengerlist');

        if (flag == true) {
            if (isMobileAndPhoneMissing == true) {
                const uniqueList = [...new Set(mobileMissingPassengersList)];

                const uniquePassengerString = uniqueList.join(', ');

                const messageValue = Requestorsidepopup1 + uniquePassengerString + Requestorsidepopup2;

                $('#no-mobile-popup').find("#popup-body").text(messageValue);
                $('#no-mobile-popup').modal('show');


            } else {
                hideOverlay();
                saveTripDetails(flag, strNewTripData);
            }
        } else {
            hideOverlay();
        }

        $('#out-of-policy').click(function () {
            $('.t-nav-3 li').removeClass('active-3');
            $(this).addClass('active-3');
            var externalService = externalServices[0];

            $('#externalservicedropdown').val(externalService.value); // Select the first service
        });

        $('#auth-trip').click(function () {
            $('.t-nav-3 li').removeClass('active-3');
            $(this).addClass('active-3');
            $('#externalservicedropdown').val(''); // Reset selection to null
        });
    }

    function saveTripDetails(flag, strTripData) {
        console.log(strTripData);
        if (flag) {
            showOverlay();
            let tripSteps = $('.trip-step-row .trip-step-container').get(); // Convert to array

            tripSteps.sort(function (a, b) {
                let startDateA = $(a).find('.start-date').val();
                let startTimeA = $(a).find('.start-time').val();
                let startDateB = $(b).find('.start-date').val();
                let startTimeB = $(b).find('.start-time').val();

                // Combine the date and time into a single Date object for comparison
                let dateTimeA = new Date(`${startDateA}T${startTimeA}`);
                let dateTimeB = new Date(`${startDateB}T${startTimeB}`);

                // Compare the two Date objects
                return dateTimeA - dateTimeB;
            });

            $('.trip-step-row').empty()

            var newTripStepCount = 1;
            var stepsLength = tripSteps.length;

            console.log('steps count', stepsLength);


            for (i = 0; i < stepsLength; i++) {
                var tripStep = $(tripSteps[i]);

                $(tripStep).find('.passenger-dropdown').each(function () {
                    let val = $(this).val();
                    console.log(val);
                    $(this).val("");
                    initializeAutocomplete($(this), passengerList);
                    console.log($(this).val());
                    $(this).val(val);

                });

                tripStep.find('.detail-header h4').text(TripStep + (i + 1));
                if (i == 0) {
                    $(tripStep).find('.delete-link').css('display', 'none');
                }
                else if (i == stepsLength - 1) {
                    $(tripStep).removeClass('bottom-line');
                    $(tripStep).find('.delete-link').css('display', 'block');
                } else {
                    $(tripStep).addClass('bottom-line');
                    $(tripStep).find('.delete-link').css('display', 'block');
                }

                $('.trip-step-row').append(tripStep);
            }

            $.ajax({
                url: '/Trips/TripInfo',
                method: 'PUT',
                dataType: "json",
                data: { trip: strTripData },
                success: function (data) {
                    if (data) {
                        console.log('data received :', data);
                        actionId = 2;
                        isCompleted = 0;
                        tripId = data.tripId;
                        tripData = data;
                        $('.trip-step-row .trip-step-container').each(function (index, tripStep) {
                            console.log('trip item', index);
                            console.log('trip step id', data.tripSteps[index].tripStepId)
                            $(tripStep).attr("trip-step-id", data.tripSteps[index].tripStepId);

                            $(tripStep).find('.details-inputs.passenger').each(function (passengerIndex, passenger) {
                                console.log('passenger item', passengerIndex);
                                console.log('passenger hub id', data.tripSteps[index].passengers[passengerIndex].passengerHubId);
                                $(passenger).attr("passenger-hub-id", data.tripSteps[index].passengers[passengerIndex].passengerHubId);
                                $(passenger).attr("passenger-luggage-id", data.tripSteps[index].passengers[passengerIndex].passengerLuggageId);

                            });

                        });

                        console.log('tripdata -------------------> ', tripData)

                        var selectedPassenger;

                        if (tripData.mainPassengerId != null) {
                            var passengerCostCenterList = [...passengerCostCenters];

                            mainPassenger = tripData.mainPassengerId
                            $('#paymentpassengerlist').val(tripData.mainPassengerId);

                            var filtered = [...finallist]

                            filtered = filtered.filter(item => item.value != mainPassenger)

                            var passengerCostCenterFiltered = filtered.filter(f => passengerCostCenterList.some(pcc => pcc.passengerId == f.value));

                            if (!passengerCostCenterFiltered || passengerCostCenterFiltered.length == 0) {
                                $("radio-passenger").prop("disabled", true);
                            } else {
                                $("radio-passenger").prop("disabled", false);
                                generateDropdownOptions(passengerCostCenterFiltered, '#paymentpassengerlist2');
                            }


                            let passenger = passengerCostCenters.find(function (p) {
                                return p.passengerId == mainPassenger;
                            });

                            if (passenger) {

                                console.log("mainpasseneger", passenger);

                                var mainPassengerCostCenterCode = passenger.costCenterCode ? passenger.costCenterCode : null;
                            }


                            if (mainPassengerCostCenterCode == tripData.costCenterCode) {
                                $("#radio-main").prop("checked", true);
                                $("#passengercotsecenter").val(mainPassengerCostCenterCode);
                                $('#passengercotsecenter').prop('disabled', true).addClass('disabled');
                                $('#paymentpassengerlist2').prop('disabled', true).addClass('disabled');
                            } else if (tripData.costCenterCode == requestorData.costCenterCode) {
                                $("#radio-requestor").prop("checked", true);
                                $("#passengercotsecenter").val(tripData.costCenterCode);
                            } else {



                                var passengerCostCenterList = passengerCostCenterList.filter(item2 =>
                                    finallist.some(item1 => item1.value == item2.passengerId)
                                );

                                var selectedPass = passengerCostCenterList.find(item => item.costCenterCode == tripData.costCenterCode)



                                if (selectedPass) {
                                    $('#paymentpassengerlist2').val(selectedPass.passengerId);
                                    $("#radio-passenger").prop("checked", true);
                                    $("#passengercotsecenter").val(selectedPass.costCenterCode);
                                }
                                else {
                                    $("#radio-center").prop("checked", true);
                                    $("#passengercotsecenter").val(tripData.costCenterCode);
                                }
                            }



                        } else {

                            $('#passengercotsecenter').prop('disabled', true).addClass('disabled');
                            $('#paymentpassengerlist2').prop('disabled', true).addClass('disabled');

                            var selectedPassenger;

                            var passengerCostCenterList = [...passengerCostCenters];

                            //finallist.forEach(selectedPassengerData => {

                            //    let passenger = passengerCostCenters.find(function (p) {
                            //        return p.passengerId == selectedPassengerData.value;
                            //    });

                            //    if (passenger) {
                            //        selectedPassenger = selectedPassengerData.value;

                            //    }

                            //});
                            for (let i = 0; i < finallist.length; i++) {
                                let selectedPassengerData = finallist[i];
                                // Find the matching passenger
                                let passenger = passengerCostCenters.find(function (p) {
                                    return p.passengerId == selectedPassengerData.value;
                                });
                                if (passenger) {
                                    selectedPassenger = selectedPassengerData.value;
                                    break;  // Break the loop as the matching passenger is found
                                }
                            }


                            if (selectedPassenger) {
                                $('#paymentpassengerlist').val(selectedPassenger);

                                var filtered = [...finallist]

                                filtered = filtered.filter(item => item.value != selectedPassenger);

                                var passengerCostCenterFiltered = filtered.filter(f => passengerCostCenterList.some(pcc => pcc.passengerId == f.value));

                                generateDropdownOptions(passengerCostCenterFiltered, '#paymentpassengerlist2');


                                let passenger = passengerCostCenters.find(function (p) {
                                    return p.passengerId == selectedPassenger;
                                });

                                if (passenger) {
                                    console.log("mainpasseneger", passenger);

                                    costCenterId = passenger.costCenterCode ? passenger.costCenterCode : '';

                                    console.log('costcenter list', costCentersList);


                                    $("#passengercotsecenter").val(costCenterId);
                                    //generateDropdownOptionsWithSelected(costCentersList, $("#passengercotsecenter"), costCenterId);
                                    $("#radio-main").prop("checked", true);

                                    //$("#passengercotsecenter").val(costCenterId);
                                } else {

                                    $("#radio-main").prop("disabled", true);
                                    $("#radio-main").prop("checked", false);
                                    $("#passengercotsecenter").val('');
                                    //generateDropdownOptionsWithSelected(costCentersList, $("#passengercotsecenter"), '');


                                    if (!passengerCostCenterFiltered || passengerCostCenterFiltered.length == 0) {
                                        $("#radio-passenger").prop("disabled", true);
                                        if (requestorData.costCenterCode) {
                                            $("#radio-requestor").prop("checked", true);
                                        } else {
                                            $('#passengercotsecenter').prop('disabled', false).removeClass('disabled');
                                            $("#radio-center").prop("checked", true);
                                        }
                                    } else {
                                        $("#radio-passenger").prop("disabled", false);
                                        $("#radio-passenger").prop("checked", true);
                                        $('#paymentpassengerlist2').prop('disabled', false).removeClass('disabled');

                                    }



                                }
                            } else {
                                $("#radio-main").prop("disabled", true);
                                $("#radio-passenger").prop("disabled", true);
                                $('#passengercotsecenter').prop('disabled', false).removeClass('disabled');
                                $("#radio-center").prop("checked", true);
                                $('#paymentpassengerlist').val(finallist[0].value);
                                $('.t-nav-3 li').removeClass('active-3');
                                $("#out-of-policy").addClass('active-3');
                                // var activeTab = jQuery(this).find("a").attr("href");

                                $("#t-1").hide();
                                $("#t-2").fadeIn();
                                var externalService = externalServices[0];

                                $('#externalservicedropdown').val(externalService.value);
                            }

                        }
                        console.log('requesting user--------------->', requestorData);
                        if (requestorData.costCenterCode) {
                            $("#radio-requestor").prop("disabled", false);
                        } else {
                            $("#radio-requestor").prop("disabled", true);
                        }
                        IsValueChanged = false;
                        hideOverlay();
                        $("#tab-2").hide();
                        $("#tab-3").show();
                        $('#tab-2-link').closest('li').removeClass('active-3');
                        $('#tab-2-link').closest('li').addClass('complete');
                        $('#tab-3-link').closest('li').addClass('active-3');
                    }
                    else {
                        hideOverlay();
                        console.error('Error');
                    }
                },
                error: function (error) {
                    console.error('API request failed:', error);
                }
            });
        }
    }
    $('#paymentpassengerlist').on('change', function () {
        //filtered = [];
        var val = $('#paymentpassengerlist').val();
        /*for (var i = 0; i < finallist.length; i++) {
            if (List[i].value === val) {
                currentpassengernames.push(List[i].label);
            };
        }*/

        var passengerCostCenterList = [...passengerCostCenters];
        let passenger = passengerCostCenters.find(function (p) {
            return p.passengerId == val;
        });

        if (passenger) {
            $("#radio-main").prop("disabled", false);

        } else {
            $("#radio-main").prop("disabled", true);
            $("#radio-main").prop("checked", false);
        }




        var filtered = [...finallist];
        filtered = filtered.filter(function (obj) {
            return obj.value != val;
        })

        var passengerCostCenterFiltered = filtered.filter(f => passengerCostCenterList.some(pcc => pcc.passengerId == f.value));

        if (!passengerCostCenterFiltered || passengerCostCenterFiltered.length == 0) {
            $("#radio-passenger").prop("disabled", true);
            $('#paymentpassengerlist2').prop('disabled', true).removeClass('disabled').addClass('disabled');
            generateDropdownOptions([], '#paymentpassengerlist2');
            $("#radio-passenger").prop("checked", false);
        } else {
            $("#radio-passenger").prop("disabled", false);
            $("#radio-passenger").prop("checked", true);
            $('#paymentpassengerlist2').prop('disabled', false).removeClass('disabled');
            generateDropdownOptions(passengerCostCenterFiltered, '#paymentpassengerlist2');
        }


    });

    //$("#externalservicedropdown").change(function () {
    //    paymentmodes = [];
    //    $('#transmitteddate').val('');
    //    $('#externalref').val('');
    //    $('#paymentmodes').val('');
    //    var serviceid = $("#externalservicedropdown").val();
    //    $.ajax({
    //        url: '/Trips/outOfPolicy',
    //        method: 'GET',
    //        dataType: 'json',
    //        data: {
    //            ServiceId: parseInt(serviceid),
    //        },
    //        success: function (data) {
    //            console.log(data);

    //            paymentmodes = data.map(function (payment) {
    //                return { value: payment.id, label: payment.name }
    //            })
    //            transmittedDate = data.map(function (date) {
    //                return { value: date.id, label: date.transmitted_date }
    //            })
    //            externalRef = data.map(function (ref) {
    //                return { value: ref.id, label: ref.external_code }
    //            })
    //            generateDropdownOptions(paymentmodes, '#paymentmodes')

    //        },
    //        error: function (error) {

    //            console.error('API request failed:', error);
    //        }

    //    });
    //})
    //$('#paymentmodes').onchange(function () {
    //    var id = $('#paymentmodes').val();

    //    var valueT = 0;

    //    var valueR = 0;
    //    transmittedDate.forEach(item => {
    //        if (item.value === parseInt(id)) {
    //            var simpleDate = new Date(item.label).toLocaleString();
    //            $('#transmitteddate').val(simpleDate);
    //        }
    //    })

    //    //$('#transmitteddate').text(labelT);
    //    externalRef.forEach(item => {
    //        if (item.value === parseInt(id)) {
    //            $('#externalref').val(item.label);
    //        }
    //    })

    //    //$('#externalref').text(labelR);
    //});

    var costCenterCode;
    var costCenterType;
    $(".cost-center-radio-grp").on("click", function () {
        costCenterType = $(this).val();
        console.log($(this).val());
        if (costCenterType == 1) {
            $('#passengercotsecenter').prop('disabled', true).removeClass('disabled').addClass('disabled');
            $('#paymentpassengerlist2').prop('disabled', true).removeClass('disabled').addClass('disabled');
            $('#paymentpassengerlist2').val('');
            var mainPassengerId = $("#paymentpassengerlist").val();

            let passenger = passengerCostCenters.find(function (p) {
                return p.passengerId == mainPassengerId;
            });

            if (passenger) {
                costCenterCode = passenger.costCenterCode ? passenger.costCenterCode : null;
                $("#passengercotsecenter").val(costCenterCode);
            }

            if (costCenterCode == null) {
                flag = false;
                alertCustom(2, MainPassengerValidation);
            }
        } else if (costCenterType == 2) {

            $('#passengercotsecenter').prop('disabled', true).removeClass('disabled').addClass('disabled');
            $('#paymentpassengerlist2').prop('disabled', false).removeClass('disabled');

        } else if (costCenterType == 3) {
            $('#paymentpassengerlist2').val('');
            $('#passengercotsecenter').prop('disabled', true).removeClass('disabled').addClass('disabled');
            $('#paymentpassengerlist2').prop('disabled', true).removeClass('disabled').addClass('disabled');
            costCenterCode = requestorData.costCenterCode ? requestorData.costCenterCode : null;
            $("#passengercotsecenter").val(costCenterCode);
            if (costCenterCode == null) {
                flag = false;
                alertCustom(2, RequestorValidation);
            }
        } else if (costCenterType == 4) {
            $('#paymentpassengerlist2').val('');
            $('#passengercotsecenter').prop('disabled', false).removeClass('disabled');
            $('#paymentpassengerlist2').prop('disabled', true).removeClass('disabled').addClass('disabled');
        }
    });


    $('#paymentpassengerlist2').on('change', function () {
        var selectedPassengerId = $(this).val();

        let passenger = passengerCostCenters.find(function (p) {
            return p.passengerId == selectedPassengerId;
        });

        if (passenger) {
            costCenterCode = passenger.costCenterCode ? passenger.costCenterCode : null;
            $("#passengercotsecenter").val(costCenterCode);
        }

        if (costCenterCode == null) {
            flag = false;
            alertCustom(2, PassengerValidation);
        }
    });





    $("#payment-save").on("click", function () {

        showOverlay();

        var flag = true;

        console.log("main passenger selected", $("#paymentpassengerlist").val());

        if (!$("#paymentpassengerlist").val()) {
            console.log("No main passenger selected");
            errorToogle(true, $("#paymentpassengerlist"));
            flag = false;
        }



        //console.log(externalService, paymentMode, transmittedDate, externalRef, isConfidential, alertPassenger, comment);
        var myRadio = $("input[name=costcenter-radio-grp]");
        var selectedCostCenterType = myRadio.filter(":checked").val();

        var externalService = $("#externalservicedropdown").val();

        var costCenterId;

        if (!externalService && selectedCostCenterType == 1) {
            var mainPassengerId = $("#paymentpassengerlist").val();


            let passenger = passengerCostCenters.find(function (p) {
                return p.passengerId == mainPassengerId;
            });

            if (passenger) {
                costCenterId = passenger.costCenterCode ? passenger.costCenterCode : null;
            }


            if (costCenterId == null) {
                flag = false;
                alertCustom(2, MainPassengerValidation);
            }
        }
        else if (!externalService && selectedCostCenterType == 2) {
            var selectedPassengerId = $("#paymentpassengerlist2").val();

            let passenger = passengerCostCenters.find(function (p) {
                return p.passengerId == selectedPassengerId;
            });

            if (passenger) {
                costCenterId = passenger.costCenterCode ? passenger.costCenterCode : null;
            }


            if (costCenterId == null) {
                flag = false;
                alertCustom(2, PassengerValidation);
            }
        }
        else if (!externalService && selectedCostCenterType == 3) {
            costCenterId = requestorData.costCenterCode ? requestorData.costCenterCode : null;
            $("#passengercotsecenter").val(costCenterId);
            if (costCenterId == null) {
                flag = false;
                alertCustom(2, RequestorValidation);
            }
        } else if (!externalService && selectedCostCenterType == 4) {
            costCenterId = $("#passengercotsecenter").val() ? $("#passengercotsecenter").val() : null;
            if (costCenterId == null || !costCenterId) {
                flag = false;
                errorToogle(true, $("#passengercotsecenter"));
            }
        }

        if (!costCenterId && !externalService) {
            $("#radio-center").prop("checked", true);
            flag = false;
            errorToogle(true, $("#passengercotsecenter"));
        }
        hideOverlay();

        if ((flag && costCenterId) || (externalService && flag)) {

            showOverlay();

            var newTripData = {};

            //var paymentMode = $("#paymentmodes").val();
            //var transmittedDate = $('#transmitteddate').val();
            //var externalRef = $('#externalref').val();
            var isConfidential = $('#is-confidential').is(':checked');
            var alertPassenger = $('#alert-passenger').is(':checked');
            var comment = $('#payment-comment').val();




            var mainPassenger = $("#paymentpassengerlist").val() ? $("#paymentpassengerlist").val() : null;
            var selectedPassenger = $("#paymentpassengerlist2").val() ? $("#paymentpassengerlist2").val() : null;

            console.log("confidential values", $('#is-confidential').is(':checked'));
            console.log("alert-passenger values", $('#alert-passenger').is(':checked'));


            newTripData['TripId'] = tripId;
            newTripData['IsOutOfPolicy'] = $("#externalservicedropdown").val() ? true : false;
            newTripData['ExternalServiceId'] = $("#externalservicedropdown").val() ? parseInt($("#externalservicedropdown").val()) : null;
            //newTripData['PaymentModeId'] = $("#paymentmodes").val();
            //newTripData['TransmittedDate'] = $('#transmitteddate').val();
            //newTripData['ExternalCode'] = $('#externalref').val();
            newTripData['IsConfidential'] = $('#is-confidential').is(':checked');
            newTripData['AlertPassenger'] = $('#alert-passenger').is(':checked');
            newTripData['Comment'] = $('#payment-comment').val();
            newTripData['MainPassengerId'] = $('#paymentpassengerlist').val();
            //newTripData['SelectedPassenger'] = $("#paymentpassengerlist2").val() ? $("#paymentpassengerlist2").val() : null;
            //newTripData['CostCenterType'] = selectedCostCenterType;
            newTripData['CostCenterCode'] = costCenterId ? costCenterId : null;

            console.log('trip step 3---> data', newTripData);
            var strNewTripData = JSON.stringify(newTripData);



            $.ajax({
                url: '/Trips/TripPayment',
                method: 'PUT',
                dataType: 'json',
                data: { trip: strNewTripData },
                success: function (data) {
                    console.log(true);
                    hideOverlay();
                    loadTripDetails();
                },
                error: function (error) {
                    hideOverlay();
                    console.error('API request failed:', error);
                }
            });


            // Check if trip details have already been loaded in this session
            //var tripDetailsLoaded = sessionStorage.getItem('tripDetailsLoaded') === 'true';
            // Function to load trip details

        }

        //if (!tripDetailsLoaded) {
        //    loadTripDetails();
        //}
        // Click event handler for #trip-step-save button
        //$("#payment-save").on("click", function () {
        //    // Check if trip details have already been loaded
        //    if (!tripDetailsLoaded) {
        //        // If trip details haven't been loaded yet, load them
        //        loadTripDetails();
        //        tripDetailsLoaded = true; // Update the flag
        //    } else {
        //        console.log('Trip details already loaded.');
        //    }
        //});



    });

    // Click event handler for #review-submit button
    $("#review-submit").on("click", function () {

        showOverlay();

        var mydata = {
            TripId: tripId,
            DriverId: null,
            ExternalServiceId: $("#externalservicedropdown").val() ? parseInt($("#externalservicedropdown").val()) : null,
            Status: 2
        };
        console.log('trip-submit---->', mydata);
        // Make an AJAX call to the SubmitTrip action method
        $.ajax({
            url: '/Trips/UpdatePlannedTrip',
            method: 'PUT',
            data: mydata,
            success: function (data) {
                console.log(actionId);
                console.log(IsValueChanged);
                hideOverlay();
                if (isEdited == 2) {
                    alertCustom(0, UpdateTripMessage);
                }
                else {

                    alertCustom(0, ConfirmTrip);
                }
                setTimeout(function () {
                    window.location.href = '/';
                }, 2000);
            },
            error: function (error) {
                hideOverlay();
                console.error('Failed to submit trip:', error);
            }
        });
    });

    var options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Use 24-hour format
    };

   
    function loadTripDetails() {
        showOverlay();
        var id = tripId;
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
                    $('.flight-icon-img').attr('src', '/img/flight-land.png');
                }
                else if (data.flightType == 1) {
                    $('.flight-icon-img').css('display', 'block');
                    $('.flight-icon-img').attr('src', '/img/flight-takeoff.png');
                } else {
                    $('.flight-icon-img').css('display', 'none');
                    $('#flightnumber').text('');
                }
                if (data.isOutOfPolicy) {

                    $("#tripType").text(OutOfPolicy);
                }
                else {
                    $("#tripType").text(Authorizedtrip);
                }
                /*$(".trip-final-details-col:not(:first)").remove();*/

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
                            fromLocationImg = "/img/Icon ionic-ios-flag.png"; // Path to private location image
                        } else if (fromLocationType === "Common") {
                            fromLocationImg = "/img/Common-flag.png"; // Path to common location image
                        } else if (fromLocationType === "Open") {
                            fromLocationImg = "/img/Open-flag.png"; // Path to open location image
                        }
                        else {
                            fromLocationImg = "/img/location-on-blue.png";
                        }
                        clonedDiv.find("#fromLocationImg").attr("src", fromLocationImg);

                        // Set the to date and location
                        //var tripToDate = tripStep.tripToDate.replace('T', ' ');
                        //clonedDiv.find(".trip-step-to-date").text(tripToDate);
                        //clonedDiv.find(".trip-step-to-location").text(tripStep.toLocation.locationName);

                        // Set the image based on the to location type
                        var toLocationType = tripStep.toLocation.locationType; // Assume this property exists
                        var toLocationImg = "";
                        if (toLocationType === "Private") {
                            toLocationImg = "/img/Icon ionic-ios-flag.png"; // Path to private location image
                        } else if (toLocationType === "Common") {
                            toLocationImg = "/img/Common-flag.png"; // Path to common location image
                        } else if (toLocationType === "Open") {
                            toLocationImg = "/img/Open-flag.png"; // Path to open location image
                        }
                        else {
                            toLocationImg = "/img/location-on-green.png";
                        }
                        clonedDiv.find("#toLocationImg").attr("src", toLocationImg);
                        // Set the to date and location
                        var toDate = new Date(tripStep.tripToDate).toLocaleDateString("en-GB");
                        var toTime = new Date(tripStep.tripToDate).toLocaleTimeString("en-GB", options);

                        clonedDiv.find(".trip-step-to-date").text(toDate + " " + toTime);

                        clonedDiv.find(".trip-step-to-location").text(tripStep.toLocation.locationName);

                        // Clear the passenger list
                        clonedDiv.find('.trip-review-trip-step-passenger-list').empty();

                        // Display trip comment and mail for the step (Use classes instead of IDs)
                        //clonedDiv.find('.trip-step-mail').text(tripStep.mail);
                        var langId = $('#langugeId').val();
                        //Mail value based on language
                        if (langId == 2) {
                            const mailText = tripStep.mail === "Yes" ? "Oui"
                                : tripStep.mail === "No" ? "Non"
                                    : tripStep.mail;
                            clonedDiv.find('.trip-step-mail').text(mailText);
                        } else {
                            clonedDiv.find('.trip-step-mail').text(tripStep.mail);
                        }

                        clonedDiv.find('.trip-step-comment').text(tripStep.comment);

                        // Iterate through each passenger
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


                        // Display the cloned trip step div
                        clonedDiv.css("display", "block");

                        // Append the cloned trip step div to the container
                        $(".trip-review-trip-step-container").append(clonedDiv);

                        // Clear the clonedDiv variable for the next iteration
                        clonedDiv = null;
                    });
                }



                $('.trip-review-main-passenger').text(data.mainPassenger.firstName + ' ' + data.mainPassenger.lastName);

                //let fieldName = '';

                //// Check the global variable 'costcenterType' and set the appropriate field name and value
                //if (costCenterType == 1) {
                //    fieldName = ResearchCostcenter;
                //     // Assuming you get passenger's cost center in `data.passengerCostCenter`
                //} else if (costCenterType == 2) {
                //    fieldName = CostCenter2;
                //} else if (costCenterType == 3) {
                //    fieldName = CostCenter3;  // Assuming requestor's cost center is `data.requestorCostCenter`
                //} else if (costCenterType == 4) {
                //    fieldName = CostCenterType4;
                //}



                // Update the span with class 'costcenterType' with the appropriate label (field name)
               /* $('.last-payment-detail-col .costcenterType').text(fieldName);*/

                // Update the h4 with class 'costcenterId' with the appropriate cost center value
                $('.last-payment-detail-col #costcenterId').text(data.otherCostCenter);


                //$('.last-payment-detail-col span:contains("OtherCostCenter") + h4').text(data.otherCostCenter);
                //$('.last-payment-detail-col .costcenterId').text(data.otherCostCenter);

                //$('.last-payment-detail-col .costcenterId').text(data.otherCostCenter);

                // Set tripDetailsLoaded flag to true in session storage
                //sessionStorage.setItem('tripDetailsLoaded', 'true');
                //tripDetailsLoaded = true; // Update the flag

                hideOverlay();
                $("#tab-3").hide();
                $("#tab-4").show();
                $('#tab-3-link').closest('li').removeClass('active-3');
                $('#tab-3-link').closest('li').addClass('complete');
                $('#tab-4-link').closest('li').addClass('active-3');
            },
            error: function (error) {
                hideOverlay();
                console.error('API request failed:', error);
            }

        });
    }


    $("#trip-step-previous").on("click", function () {
        $("#tab-2").hide();
        $("#tab-1").show();
        $('#tab-2-link').closest('li').removeClass('active-3');
        $('#tab-1-link').closest('li').removeClass('complete');
        $('#tab-1-link').closest('li').addClass('active-3');

    });


    $("#payment-previous").on("click", function () {
        $('.start-location').each(function () {
            initializeStartLocationAutocomplete($(this), locationList);
        })
        $('.end-location').each(function () {
            initializeEndLocationAutocomplete($(this), locationList);
        })
        $("#tab-3").hide();
        $("#tab-2").show();
        $('#tab-3-link').closest('li').removeClass('active-3');
        $('#tab-2-link').closest('li').removeClass('complete');
        $('#tab-2-link').closest('li').addClass('active-3');

    });

    $("#review-previous").on("click", function () {
        $("#tab-4").hide();
        $("#tab-3").show();
        $('#tab-4-link').closest('li').removeClass('active-3');
        $('#tab-3-link').closest('li').removeClass('complete');
        $('#tab-3-link').closest('li').addClass('active-3');

    });

    $(document).on("click", ".cancel-trip",function () {
        if (IsValueChanged == true) {
            showCancelConfirmPopup(TripsCancelConfirmMessage);
            $('#cancel-confirm-button').one('click', function () {
                window.location.href = '/';
                hideCancelConfirmPopup();
            });
        } else {
            window.location.href = '/';
        }

    });

    var isFavoriteTrip;

    $(".add-favorite").click(function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        // Toggle image src and text
        var $img = $(this).find("img");
        var $span = $(this).find("span");

        console.log("Favorite", $span.text());

        if ($span.text() == "Add favorite") {
            $img.attr("src", "/img/add-favorite-after.png");
            $span.text("Favorited");
            isFavoriteTrip = true;
        } else {
            $img.attr("src", "/img/add-favorite-before.png");
            $span.text("Add favorite");
            isFavoriteTrip = false;
        }
    });


    $(document).on('change', '#file-input', function () {
        var attachedWrapper = $('.attached-wrapper-row');
        var files = this.files;

        // Define allowed MIME types and restricted extensions
        var allowedTypes = [
            'image/jpeg', // jpeg, jpg
            'image/png', // png
            'application/pdf', // pdf
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
            'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx
            'text/plain', // txt
            'text/csv' // csv
        ];
        var restrictedExtensions = ['jfif']; // Add extensions you want to block

        // Check if files are selected
        if (files.length > 0) {
            // Validate file types
            var validFiles = true;
            for (var i = 0; i < files.length; i++) {
                var fileType = files[i].type;
                var fileName = files[i].name;
                var fileExtension = fileName.split('.').pop().toLowerCase();

                if (!allowedTypes.includes(fileType) || restrictedExtensions.includes(fileExtension)) {
                    validFiles = false;
                    alertCustom(1, 'Invalid file type: ' + fileName);
                    break;
                }
            }

            if (validFiles) {
                showOverlay();
                var formData = new FormData();

                for (var i = 0; i < files.length; i++) {
                    formData.append('fileList', files[i]);
                }
                formData.append('tripId', tripId);

                $.ajax({
                    url: '/Trips/AddFilesToTrip',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        console.log("response from add file", response);

                        for (var i = 0; i < response.length; i++) {
                            var file = response[i];
                            var fileUrl = URL.createObjectURL(files[i]); // Use the original file from the input
                            var fileName = files[i].name; // Use the original file name from the input

                            var link = $('<a></a>')
                                .attr('href', fileUrl)
                                .attr('target', '_blank')
                                .text(fileName);

                            var icon = $('<img>')
                                .addClass('icon-img')
                                .addClass('delete-file-icon')
                                .attr('src', '/img/metro-bin.png')
                                .attr('alt', '')
                                .attr('data-file-id', file.fileId)
                                .attr('data-blob-name', file.blobName)
                                .attr('title', RemoveAttachment);

                            var attachedCol = $('<div></div>')
                                .addClass('attached-col')
                                .append(link)
                                .append(icon);

                            attachedWrapper.append(attachedCol);
                        }
                        $('.attached-file').css("display", "block");
                        $(".attch-file-header").text("Attach more files");
                        $('#file-input').attr('title', '');
                        hideOverlay();
                        $('#file-input').val('');  // Clear the file input
                    },
                    error: function (xhr, status, error) {
                        hideOverlay();
                        alert('An error occurred: ' + error);
                    }
                });
            }
        }
    });

    //$(document).on('click', '.attach-wrapper', function () {
    //    $('#file-input').click();
    //});

    $(document).on('click', '.delete-file-icon', function () {
        var fileId = $(this).data('file-id');
        var blobName = $(this).data('blob-name');
        var colToBeReomoved = $(this).closest('.attached-col');

        console.log('fileId and blobname', fileId, blobName);

        showDeleteFileConfirmPopup(ConfirmDelete);

        $('#delete-file-confirm-button').one('click', function () {
            console.log('delete file callled');
            $.ajax({
                url: '/Trips/DeleteFilesOfTrip',
                method: 'DELETE',
                data: { fileId: fileId, blobName: blobName },
                success: function (data) {
                    console.log('delete file api response', data);
                    if (data == true) {
                        colToBeReomoved.remove();

                        // Check if there are no more files attached
                        if ($('.attached-col').length === 0) {
                            $('.attached-file').css("display", "none");
                            $(".attch-file-header").text("Attach files");
                        }

                        // Reset the file input after successful deletion

                    }
                },
                error: function (error) {
                    console.error('Failed to submit trip:', error);
                }
            });
            hideDeleteFileConfirmPopup();
        });
    });


});



$("#print-trip-Id").on("click", function () {
    console.log("print btn clicked");
    function isNullOrEmpty(value) {
        return value == null || value === "";
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

        var reportNameEncoded = "GetAllTrips.trdp";

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
        var reportNameEncoded = "GetAllTrips.trdp";
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


