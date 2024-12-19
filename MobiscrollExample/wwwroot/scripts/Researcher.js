var isMobile = Math.min(window.screen.width, window.screen.height) < 600 || navigator.userAgent.indexOf("Mobi") > -1;
$(document).ready(function () {
    var vehicleList = [];
    var id = 0;
    var code = 0;
    var costCentersList = [];
    var passengerList = [];
    var Requestor;
    var Trips;
    var Select;
    var Steps;
    var beneficiaryHeader;
    var modified = 0;
    var flightInfoHeader;
    var statusHeader;
    var authorHeader;
    var hourHeader;
    var colModelGrid2;
    var colNames2;
    var isAuthorizedDisplayName;
    var isVipDisplayName;
    var isPrivateDisplayName;
    var unAuthorizedUser;
    var printToolTip;
    var detailsToolTip;
    var tripstepName;
    var ModifyTripStepMessage;
    var tripHeader;
    var forName;
    var editTripStep;
    var saveTripStep;
    var addTripStep;
    var PassengerDropdown;
    var LocationDropdown;
    var statNotReady;
    var statToBeProcessed;
    var acceptedManager;
    var researchDatePopup;
    var researchDateErrorPopup;
    var rejectedManager;
    var cancelledManager;
    var cancelledReq;
    var outPolicyRejectExtService;
    var cancelConfirmed;
    var outPolicyCancelConfExtService;
    var planified;
    var waitDriverConf;
    var waitExtServiceConf;
    var outPolicyCancelReq;
    var outPolicyWaitExtServiceConf;
    var outPolicyCancelExtService;
    var extCancelManager;
    var deleted;
    var updatingReq;
    var outPolicyUpdateReq;
    var extResetManager;
    var labelNone;
    var Files;
    var TripStepDelete;
    var AddTripSep;
    var ValidateFields;;
    var SelectPassenger;
    var DeletePopUp;
    var FromDateValidation;
    var FromTimeValidation;
    var ToDateValidation;
    var ToTimeValidation;
    var Open;
    var Private;
    var Common;
    var Yes;
    var No;
    var FromdateFields;
    var FromtimeFields;
    var TodateFields;
    var TotimeFields;
    var ValidateDuration;
    var ValidateDuration1;
    //var parsedPassengers;
    var changes = false;
    var statusToDisable;
    var TripsCancelConfirmMessage;
    var SearchTripAlertMessage;
    var deletedItems = {
        DeletedPassengers: [],
        DeletedTripSteps: []
    };

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

    $('.admin-input-change').on('change', function () {
        changes = true;
        window.globalChange = changes;
    });
    /*    const showConfirmPopup = (textValue) => {
            $('#confirm-popup').find("#popup-body").text(textValue);
            $('#confirm-popup').modal('show');
        }
    
        const hideConfirmPopup = () => {
            $('#confirm-popup').modal('hide');
        }
    */
    var allPassengers = [];
    var allLocation = [];
    var enablePrint = true;
    var autocompleteLocation = [];
    function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
    }

    // Function to hide the overlay
    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }

    function initializeAutocomplete($input, List) {
        $input.autocomplete({
            lookup: List,
            /* onSearchComplete: function () {
                 console.log("Search completed."); // Log when search is complete
             },*/
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
                console.log(suggestion);
            },
        });
    }
    var roles = jQuery("#rolesList").val();
    /*var checkRole = JSON.parse(roles);
    //console.log(checkRole);
    var access = checkRole.find(role => role.ToolId == 37);
    console.log(access);
    var userType = $("#userType").val();
    if (access == undefined || access.IsEnabled == false) {
        enablePrint = false;
    }*/

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


    const getAdjustedDateTime = (currentTime, minutesToAdd) => {
        // Clone the date object to avoid modifying the original input
        const adjustedTime = new Date(currentTime.getTime());

        // Add/subtract minutes to/from the current time
        adjustedTime.setMinutes(adjustedTime.getMinutes() + minutesToAdd);

        const { date, time } = formatDateTime(adjustedTime);

        return { date, time };
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
    $(".error-check").on("input", function () {
        if ($(this).val()) {
            errorToogle(false, this)
        } else {
            errorToogle(true, this)
        }
    });

    var $grid1 = $("#search-grid"),
        newWidth1 = $grid1.closest(".ui-jqgrid").parent().width();
    $grid1.jqGrid("setGridWidth", newWidth1, true);


    //$('#mnuTripSearch').click(function (event) {
    //    event.preventDefault(); // Prevent the default anchor click behavior
    //    window.location.href = '#main-tab3'; // Redirect to the element with the ID 'main-tab3'
    //});

    const getAllOptionsData = async () => {
        try {
            // Make all AJAX requests concurrently          

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

            const requestorPromise = $.ajax({
                url: '/Home/GetUsers',
                method: 'GET',
                dataType: 'json'
            });

            const passengersPromise = $.ajax({
                url: '/ManagerPassengers/GetPassengers',
                method: 'GET',
                dataType: 'json'
            });

            // Await all promises
            const [locationData, requestorData, allLocationData, passengerData] = await Promise.all([locationPromise, requestorPromise, allLocationPromise, passengersPromise]);

            // Process data when all promises are resolved

            if (locationData != null) {
                console.log(locationData);

                autocompleteLocation = locationData

                    .map(location => {
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
                        return (

                            { value: location.locationName + type, data: location.locationId });


                    }
                    )

                initializeAutocomplete($('#startlocation'), allLocation);
                //generateDropdownOptions(allLocation, '#startlocation');
                // Initialize the dropdown for end location
                initializeAutocomplete($('#endlocation'), allLocation);
                //generateDropdownOptions(allLocation, '#endlocation');
            } else {
                console.log("No Location");
            }
            if (allLocationData != null) {
                allLocation = allLocationData.map(location => {
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
                    return (

                        { value: location.locationName + type, data: location.locationId });


                }
                )
                console.log(allLocation);

            }
            if (requestorData != null) {
                console.log(requestorData);
                getRequestorList(requestorData);
            } else {
                console.log("No requestor");
            }

            if (passengerData != null) {
                console.log('passenger data from api---->', passengerData);

                allPassengers = passengerData
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
                /* var objectPassenger = allPassengers.map(passenger => ({
                     id: passenger.data,
                     value: passenger.value
                 }))
                 parsedPassengers = JSON.stringify(objectPassenger);*/
                console.log(allPassengers);
                //enerateDropdownOptions(allLocation, '#startlocation');
            } else {
                console.log("No Passenger");
            }

        } catch (error) {
            console.error('API request failed:', error);
        }
    };
    $(".main-tabs-nav3 li").click(async function (e) {
        e.preventDefault();

        // Execute specific functions based on the clicked <li>
        var liId = $(this).find("a").attr("id");
        console.log("liId", liId);
        if (liId === "mnuTripSearch") {
            console.log("mnuTripSearch referesh");

            clearValues();
            getAllOptionsData();
            var obj = await localizedWords();
            if (obj.result == true) {

                initializeGrid("#search-grid", obj.colModel, obj.colNames, []);
            }
            var now = new Date();

            var oneWeekBack = getAdjustedDateTime(now, -(7 * 24 * 60))
            var twoWeekAfter = getAdjustedDateTime(now, (14 * 24 * 60))

            $('#departureDate').val(oneWeekBack.date);
            $('#departureTime').val('00:00');
            $('#ArriveDate').val(twoWeekAfter.date);
            $('#ArriveTime').val('00:00');
        }
    });

    function localizedWords() {
        return new Promise((resolve, reject) => {


            $.ajax({
                url: '/Home/GetTripRequestorLocalization',
                method: 'GET',
                success: function (data) {
                    //console.log("language translation data", data);
                    SearchTripAlertMessage = data.SearchTripAlertMessage;
                    Yes = data.optionYes;
                    No = data.optionNo;
                    Requestor = data.RequestorDropdown;
                    Trips = data.TripsRequestorDropdown;
                    Select = data.Select;
                    Steps = data.ResearchSteps;
                    beneficiaryHeader = data.Beneficiary;
                    flightInfoHeader = data.FlightInfo;
                    statusHeader = data.ResearchStatus;
                    authorHeader = data.Author;
                    hourHeader = data.HourHeader;
                    printToolTip = data.PrintTrip;
                    detailsToolTip = data.DetailsofTrip;
                    tripstepName = data.TripStep;
                    tripHeader = data.Trip;
                    forName = data.For;
                    editTripStep = data.ModifyTripStep;
                    saveTripStep = data.SaveTripStep;
                    addTripStep = data.AddTripStep;
                    PassengerDropdown = data.PassengerDropdown;
                    LocatisonDropdown = data.LocationDropdown;
                    labelNone = data.labelNone;
                    Files = data.Files;
                    TripStepDelete = data.TripStepDelete;
                    AddTripSep = data.AddTripSep;
                    TripsCancelConfirmMessage = data.TripsCancelConfirmMessage
                    ValidateFields = data.ValidateFields;
                    DeletePopUp = data.DelegateDeletePopup;
                    SelectPassenger = data.selectPassenger;
                    FromDateValidation = data.FromDateValidation;
                    FromTimeValidation = data.FromTimeValidation;
                    ToDateValidation = data.ToDateValidation;
                    ToTimeValidation = data.ToTimeValidation;
                    FromdateFields = data.FromdateFields;
                    FromtimeFields = data.FromtimeFields;
                    TodateFields = data.TodateFields;
                    TotimeFields = data.TotimeFields;
                    ValidateDuration = data.ValidateDuration;
                    ValidateDuration1 = data.ValidateDuration1;
                    ModifyTripStepMessage = data.modifyTripStepMessage;
                    isAuthorizedDisplayName = data.isAuthorizedDisplayName;
                    isVipDisplayName = data.isVipDisplayName;
                    isPrivateDisplayName = data.isPrivateDisplayName;
                    unAuthorizedUser = data.unAuthorizedUser;
                    // Status variables
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
                    deleted = data.Deleted;
                    updatingReq = data.UpdatingByRequestor;
                    outPolicyUpdateReq = data.OutOfPolicyUpdatingByRequestor;
                    extResetManager = data.ExternalResetByManager;
                    researchDatePopup = data.ResearchDatePopup;
                    researchDateErrorPopup = data.ResearchDateErrorPopup;
                    Open = data.Open;
                    Common = data.Common;
                    Private = data.Private;

                    colModelGrid2 = [
                        { name: 'tripId', index: 'tripId', hidden: true },
                        { name: 'staus', width: 10, index: 'staus', align: 'center' },
                        { name: 'flight', width: 10, index: 'flight', align: 'center' },
                        { name: 'email', width: 10, index: 'email', align: 'center' },
                        { name: 'Steps', index: 'Steps', width: 150, align: 'left' },
                        { name: 'Beneficiary', index: 'Beneficiary', width: 50, align: 'left' },
                        { name: 'VolInfo', index: 'VolInfo', width: 20, align: 'left' },
                        { name: 'Action', index: 'Action', width: 20, align: 'center' }
                    ];
                    colNames2 = ['', '', '', '', Steps, beneficiaryHeader, flightInfoHeader, 'Action(s)'];
                    let obj = {
                        result: true,
                        colModel: colModelGrid2,
                        colNames: colNames2
                    }
                    resolve(obj);

                },
                error: function (error) {
                    reject(error);
                    console.error("Error fetching localization data.");
                }
            });
        });
    }



    function getRequestorList(data) {
        var $selectTag = $('#textRequestorId');
        $selectTag.empty(); // Clear existing options
        var $option = $('<option>', {
            value: '',
            text: Requestor // Assuming 'userName' property exists in the user object
        });

        // Append the option to the select element
        $selectTag.append($option);
        // Iterate over the user data and create options
        $.each(data, function (index, user) {
            var $option = $('<option>', {
                value: user.userId,
                text: user.userName // Assuming 'userName' property exists in the user object
            });
            // Append the option to the select element
            $selectTag.append($option);
        });
    }
    function generateDropdownOptions(options, targetElement) {
        console.log('options dropdown', options);
        // Clear existing options
        $(targetElement).empty();
        // Add a default option
        $(targetElement).append($('<option>', {
            value: '',
            text: Trips,
        }));

        // Add other options
        options.forEach(function (option) {
            $(targetElement).append($('<option>', {
                value: option.value,
                text: option.label,
            }));
        });
    }
    function generateMainPassenegrDropdownOptions(options, targetElement) {
        console.log('options dropdown', options);
        // Clear existing options
        $(targetElement).empty();
        // Add a default option and disable it
        $(targetElement).append($('<option>', {
            value: '',
            text: Trips,
            disabled: true,  // Disable the default option
            selected: true   // Set it as selected by default
        }));

        // Add other options
        options.forEach(function (option) {
            $(targetElement).append($('<option>', {
                value: option.value,
                text: option.label,
            }));
        });
    }




    //function generateExampleDropdownOptions(options, dropdownElement, searchInput) {
    //    // Ensure jQuery is loaded and working
    //    if (typeof $ === 'undefined') {
    //        console.error('jQuery is not loaded.');
    //        return;
    //    }

    //    // Event listener for the search input
    //    $(searchInput).on('input', function () {
    //        console.log('Input detected');
    //        var searchQuery = $(this).val().toLowerCase();
    //        var filteredOptions = options.filter(function (option) {
    //            return option.label.toLowerCase().includes(searchQuery);
    //        });

    //        // Clear existing options
    //        $(dropdownElement).empty();
    //        // Add a default option
    //        $(dropdownElement).append($('<option>', {
    //            value: '',
    //            text: 'Select an option',
    //        }));

    //        // Add filtered options
    //        filteredOptions.forEach(function (option) {
    //            $(dropdownElement).append($('<option>', {
    //                value: option.value,
    //                text: option.label,
    //            }));
    //        });
    //    });

    //    // Trigger input event to populate initial options
    //    $(searchInput).trigger('input');
    //}

    //// Example usage
    //var options = [
    //    { value: '1', label: 'Cost Center 1' },
    //    { value: '2', label: 'Cost Center 2' },
    //    { value: '3', label: 'Cost Center 3' }
    //];

    ////$(document).ready(function () {
    ////    generateDropdownOptions(options, '#otherCostCenter', '#searchCostCenter');
    ////});

    function populateSelect(id, targetElementId) {
        populateSelect
        $.ajax({
            url: '/Home/GetOption',
            method: 'GET',
            success: function (data) {
                var optionsData = [
                    { value: 1, text: data.yesValue },
                    { value: 0, text: data.noValue },
                ];

                var $selectElement = $("#" + targetElementId);
                $selectElement.empty();

                var $option = $('<option>', {
                    value: '',
                    text: Select // Evaluate the localized text dynamically
                });
                $selectElement.append($option);

                $.each(optionsData, function (index, option) {
                    var $option = $('<option>', {
                        value: option.value,
                        text: option.text // Evaluate the localized text dynamically
                    });
                    // Set the selected property based on the comparison with id

                    // Append the option to the select element
                    $selectElement.append($option);
                });
            },
            error: function (error) {
                alert('Error : ' + JSON.stringify(error));
                console.error('Error fetching data:', JSON.stringify(error));
            }
        });
    }

    function getSelectedCheckboxes() {
        var selectedValues = [];
        // Iterate through each checkbox
        $('.check-box').each(function () {
            // Check if the checkbox is checked
            if ($(this).is(':checked')) {
                // Get the label text associated with the checkbox and add it to the selectedValues array
                selectedValues.push($(this).val());
            }
        });
        // If no checkboxes are selected, return null
        if (selectedValues.length === 0) {
            return null;
        }
        // Join the selectedValues array into a comma-separated string
        return selectedValues.join(', ');
    }

    $('.check-box').change(function () {
        // Call getSelectedCheckboxes function and log the result
        var selectedCheckboxes = getSelectedCheckboxes();
        console.log(selectedCheckboxes);
        // You can use the selectedCheckboxes string as needed
    });

    const initializeGrid = (gridId, colModel, colNames, mydata) => {
        // Clear existing data in the grid
        jQuery(gridId).jqGrid("clearGridData");
        var $grid = $("#search-grid");

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

    //function departureDateTime() {
    //    //alert(JSON.stringify(passengers()));
    //    var date = $("#departureDate").val();
    //    var time = $("#departureTime").val();
    //    var datetimeObject = null;
    //    if (date && time) {
    //        var dateParts = date.split("-");
    //        var timeParts = time.split(":");

    //        datetimeObject = new Date(
    //            Date.UTC(
    //                parseInt(dateParts[0], 10),
    //                parseInt(dateParts[1], 10) - 1,
    //                parseInt(dateParts[2], 10),
    //                parseInt(timeParts[0], 10),
    //                parseInt(timeParts[1], 10)
    //            )
    //            /*            ).toUTCString();*/
    //        ).toISOString();
    //    }
    //    return datetimeObject;
    //}

    //function arriveDateTime() {
    //    //alert(JSON.stringify(passengers()));
    //    var date = $("#ArriveDate").val();
    //    var time = $("#ArriveTime").val();
    //    var datetimeObject = null;

    //    if (date && time) {
    //        var dateParts = date.split("-");
    //        var timeParts = time.split(":");

    //        datetimeObject = new Date(
    //            Date.UTC(
    //                parseInt(dateParts[0], 10),
    //                parseInt(dateParts[1], 10) - 1,
    //                parseInt(dateParts[2], 10),
    //                parseInt(timeParts[0], 10),
    //                parseInt(timeParts[1], 10)
    //            )
    //            /*            ).toUTCString();*/
    //        ).toISOString();
    //    }
    //    return datetimeObject;
    //}


    $("#recherchTrip").on("click", function () {
        //alert(JSON.stringify(passengers()));
        var startDate = $('#departureDate').val() ? $('#departureDate').val() : null;
        var startTime = $('#departureTime').val() ? $('#departureTime').val() : null;
        var endDate = $('#ArriveDate').val() ? $('#ArriveDate').val() : null;
        var endTime = $('#ArriveTime').val() ? $('#ArriveTime').val() : null;

        var startDatetimeObject = null;
        var endDatetimeObject = null;

        if (startDate) {
            if (!startTime) {
                startTime = "00:00:00.000";
            }
            startDatetimeObject = new Date(startDate + 'T' + startTime + 'Z').toISOString();
        }

        if (endDate) {
            if (!endTime) {
                endTime = "00:00:00.000";
            }
            endDatetimeObject = new Date(endDate + 'T' + endTime + 'Z').toISOString();
        }

        thisParams = {
            fromLocationId: $("#startlocation").val() ? parseInt($("#startlocation").attr('data-id')) : null,
            toLocationId: $("#endlocation").val() ? parseInt($("#endlocation").attr('data-id')) : null,
            fromDate: startDatetimeObject,
            toDate: endDatetimeObject,
            predefinedTrip: $('#preDefined').val() ? $('#preDefined').val() : null,
            outOfPolicyTrip: $('#outOfPolicyTrip').val() ? $('#outOfPolicyTrip').val() : null,
            requestor: $('#textRequestorId').val() ? $('#textRequestorId').val() : null,
            statusIds: getSelectedCheckboxes()
        }
        showOverlay();
        console.log('params for researcher', thisParams);
        $.ajax({
            url: '/Rechercher/GetTripsByRechercher',
            type: 'GET',
            dataType: 'json',
            data: thisParams,
            success: function (response) {
                console.log('params--->', params);
                console.log('response inside clearFilter--->', response);
                $grid1.jqGrid("clearGridData", true);

                var mydata = [];
                if (response != null && response.length > 0) {
                    var result = formatGridData(response);
                    $('#custom-toast').remove();  // Remove the toast if data exists
                    if (result != null) {
                        showOverlay();
                        reloadGridWithData("#search-grid", result);
                        $('.ui-jqgrid-bdiv.ui-corner-bottom').css({
                            'height': 'calc(100vh - 280px)',
                            'width': '276px'
                        });
                    }
                }
                else {
                    showToast(SearchTripAlertMessage);
                    $('.ui-jqgrid-bdiv.ui-corner-bottom').css({
                        'height': '',
                        'width': ''
                    });
                }
                hideOverlay();
            },
            error: function (xhr, status, error) {
                console.log('params--->', params);

                console.error('Error fetching data:', error);
                console.log('Status:', status);
                console.log('XHR:', xhr);
            }
        });
    });
    var thisParams = {};
    $("#print-search-list").on("click", function () {
        var languageId = $('#langugeId').val();
        console.log('TripId->', id);
        var reportNameEncoded;
        if (languageId == 1) {
            reportNameEncoded = "ResearchTrips.trdp";
        } else {
            reportNameEncoded = "ResearchTrips_FR.trdp";
        }

        //var reportNameEncoded = "ResearchTrips.trdp";

        var url = "/Home/TelerikReport" + '?' +
            "fromLocationId=" + encodeURIComponent(parseInt(thisParams.fromLocationId)) +
            "&endlocationId=" + encodeURIComponent(thisParams.toLocationId) +
            "&fromDate=" + encodeURIComponent(thisParams.fromDate) +
            "&toDate=" + encodeURIComponent(thisParams.toDate) +
            "&predefinedTrip=" + encodeURIComponent(thisParams.predefinedTrip) +
            "&outOfPolicyTrip=" + encodeURIComponent(thisParams.outOfPolicyTrip) +
            "&requestor=" + encodeURIComponent(thisParams.requestor) +
            "&statusIds=" + thisParams.statusIds +
            "&report=" + encodeURIComponent(reportNameEncoded);

        window.open(url, '_blank');
    });

    //getAllOptionsData();
    //GetRechercherTrips(null);
    populateSelect(0, 'preDefined');
    populateSelect(0, 'outOfPolicyTrip');

    var params = {
        isMyAllTrips: true,
        isMyFutureTrips: false
    };

    const reloadGridWithData = (gridId, result) => {
        // Clear existing data in the grid
        jQuery(gridId).jqGrid("clearGridData");

        if (result && result.length > 0) {
            // If data is available, set the new data and reload the grid

            jQuery(gridId).jqGrid("setGridParam", { data: result, datatype: "local" }).trigger("reloadGrid");

            // Show grid headers (in case they were hidden previously)
            jQuery(gridId).closest(".ui-jqgrid-view").find(".ui-jqgrid-hbox").show();

            // Enable the print button
            $('#print-search-list').prop('disabled', false);
        } else {

            // If no data is available, hide grid headers and show a message in the grid

            // Disable the print button
            $('#print-search-list').prop('disabled', true);
            $('#no-data-message').show();
        }
        hideOverlay();
    };

    const formatGridData = (data) => {
        console.log('received data,  before formatGrid', data);
        var mydata = [];
        data.forEach(function (trip) {

            var statusClass, flightIcon, emailIcon;
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


            if (new Date(trip.fromDate) < new Date() && (statusClass != "status-orange")) {
                statusClass = "status-gray";
            }

            var emailIcon = (trip.isMailSent) ? "<img src='../img/email.png'>" : "";
            if (trip.tripSteps != null) {

                var formattedDate = new Date(trip.fromDate).toLocaleDateString("en-GB");
                var formattedToDate = new Date(trip.toDate).toLocaleDateString("en-GB");
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

                var tripSteps = trip.tripSteps.map(function (step) {

                    var fromDateTime = formatDateTimeGrid(new Date(step.tripFromDate));
                    var toDateTime = getTimeOnly(new Date(step.tripToDate));
                    var fromLocation = step.fromLocation.locationName;
                    var toLocation = step.toLocation.locationName;


                    return "<div>" + fromDateTime + "  " + fromLocation + " -> " + toDateTime + "  " + toLocation + "</div>";
                }).join("");

                var toLocations = trip.tripSteps.map(function (step) {
                    return "<div>" + step.toLocation.locationName + "</div>";
                }).join("");
            }

            var date;

            if (formattedDate) {
                var parts = formattedDate.split("/");
                date = new Date(parts[2], parts[1] - 1, parts[0]);
            }

            function formatDateTimeGrid(date) {
                let day = ('0' + date.getDate()).slice(-2);
                let month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1
                let year = date.getFullYear();
                let hours = ('0' + date.getHours()).slice(-2);
                let minutes = ('0' + date.getMinutes()).slice(-2);

                return `${day}/${month}/${year} ${hours}:${minutes}`;
            }

            function getTimeOnly(date) {
                let hours = ('0' + date.getHours()).slice(-2);
                let minutes = ('0' + date.getMinutes()).slice(-2);

                return `${hours}:${minutes}`;
            }
            // Get the current date
            var currentDate = new Date();
            //console.log('date', date, 'current date', currentDate);
            var action = "<div id='actions-container'>" +
                //"<img id='detail-action-btn' src'/img/material-print.png' class='action-btn' data-id='" + trip.tripId + "' title='Edit Trip'>" +
                "<img id='detail-action-btn' src='/img/file-text.png' class='action-btn' data-id='" + trip.tripId + "' title='" + detailsToolTip + "'>";
            if (enablePrint == true) {
                action +=
                    "<img id='print-search-btn' src='/img/material-print.png' class='action-btn' data-id='" + trip.tripId + "' title='" + printToolTip + "'>" +
                    "</div>"
            }
            else {
                action +=
                    "<img id='alertPrint' src='/img/material-print.png' class='action-btn' data-id='" + trip.tripId + "' title='" + printToolTip + "' onClick='ShowAlert()'>" +
                    "</div>"
            }



            if (trip.flightNumber !== null && trip.flightDateTime !== null) {
                var flighttime = new Date(trip.flightDateTime)
                console.log(flighttime.toLocaleTimeString());
                var variable = trip.flightNumber + " " + flighttime.toLocaleTimeString();
            }
            var row = {
                tripId: trip.tripId,
                staus: "<span class='status " + statusClass + "'></span>",
                flight: flightIcon,
                email: emailIcon ? emailIcon : null,
                Steps: tripSteps ? tripSteps : null,
                Beneficiary: "<div>" + beneficiaries + "</div>",
                VolInfo: variable ? variable : "",
                Action: action
            };
            mydata.push(row);
        });
        console.log('After formatGrid, output data', mydata);
        return mydata;
    };
    /* $('#alertPrint').on('click', function () {
         $('.permission').modal('show');
         $('.permission').fadeIn();
         // Delay for 5 seconds
         setTimeout(function () {
             $('.permission').modal('hide');
         }, 3000);
     })*/
    $(document).on('click', '#print-search-btn', function () {
        // Get the ID from the 'data-id' attribute
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
        //window.location.href = "/Home/TelerikReport" + '?' + parameterString;
        window.open(url, '_blank');
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

    $("#setTodayDate").click(function () {
        // Get today's date
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var dd = String(today.getDate()).padStart(2, '0');
        var currentDate = yyyy + '-' + mm + '-' + dd;

        // Set departureDate to today's date
        $("#departureDate").val(currentDate);

        $("#departureTime").val("00:00");

        // Set ArriveDate to today's date
        $("#ArriveDate").val(currentDate);
        // Set ArriveTime to 11:59 pm
        $("#ArriveTime").val("23:59");
    });

    function clearValues() {

        var now = new Date();

        var oneWeekBack = getAdjustedDateTime(now, -(7 * 24 * 60))
        var twoWeekAfter = getAdjustedDateTime(now, (14 * 24 * 60))

        $('#departureDate').val(oneWeekBack.date);
        $('#departureTime').val('00:00');
        $('#ArriveDate').val(twoWeekAfter.date);
        $('#ArriveTime').val('00:00');
        $('#startlocation').val('');
        $('#endlocation').val('');
        $('#preDefined').val('');
        $('#outOfPolicyTrip').val('');
        $('#textRequestorId').val('');
        $("#option-trip61").prop("checked", false);
        $("#option-trip7").prop("checked", false);
    }
    //$(".main-tabs-nav3 li").click(function (e) {
    //    e.preventDefault();
    //    var liId = $(this).find("a").attr("id");
    //    if (liId === "mnuTripSearch") {
    //        console.log("mnuTripSearch referesh");
    //        clearValues();
    //    }
    //});


    window.loadResearcherScreen = loadResearcherScreen;
    async function loadResearcherScreen(id) {
        getAllOptionsData();
        var result = await localizedWords();
        if (id == undefined) {
            id = sessionStorage.getItem('redirectTripId');
            id = parseInt(id);
        }
        tripId = id;
        var previousValues = {};
        console.log('TripID->', id);

        var span = $('<span></span>')
            .text('Files Loading...');
        $('.manager-attached-files-container').empty();
        $('.manager-attached-files-container').append(span);
        showOverlay();
        $.ajax({
            url: '/Research/GetTripDetail',
            method: 'GET',
            data: { tripId: id },
            success: function (userData) {
                var targetLi1 = $('ul.trip-tabs-nav3 li a[href="' + "#sec-tab1" + '"]').closest('li');
                var targetLi2 = $('ul.trip-tabs-nav3 li a[href="' + "#sec-tab2" + '"]').closest('li');
                var targetLi3 = $('ul.trip-tabs-nav3 li a[href="' + "#sec-tab3" + '"]').closest('li');

                updateTripDetails(userData);
                $(".search-detail-tab").show();
                targetLi1.addClass("main-active");
                targetLi2.removeClass("main-active");
                targetLi3.removeClass("main-active");
                $('.showStatusBar').on('click', function () {
                    $('#statusBottom').css('display', 'block');
                });
                $('.hide-status-bar').on('click', function () {
                    $('#statusBottom').hide();
                });
                $("#sec-tab1").show();
                $("#sec-tab2").hide();
                $("#sec-tab3").hide();
                $(".search-tab").hide();
                $.ajax({
                    url: '/Vehicle/GetVehicles',
                    method: 'GET',
                    dataType: 'json',

                    success: function (response) {
                        console.log('vehicle data', response);
                        var data = response;
                        if (data != null) {
                            vehicleList = data.map(function (vehicle) {
                                return { label: vehicle.name, value: vehicle.id };
                            });
                            console.log(vehicleList);
                            generateDropdownOptions(vehicleList, '#vehiclelist');
                            $('#vehiclelist').val(id);
                        } else {
                            console.log("No vehicle");
                        }
                    },
                    error: function (error) {
                        console.error('API request failed:', error);
                    }
                });

                loadTripDetails(tripId);


                $.ajax({
                    url: '/Trips/GetFilesOfTrip',
                    method: 'GET',
                    data: { tripId: tripId },
                    success: function (response) {
                        console.log("response from add file", response);
                        $('.manager-attached-files-container').empty();
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

                                var attachedCol = $('<div></div>')
                                    .addClass('attached-col')
                                    .append(link);

                                $('.manager-attached-files-container').append(attachedCol);
                            }
                        }
                        else {
                            var span = $('<span></span>')
                                .text(Files);

                            $('.manager-attached-files-container').append(span);
                        }
                    },
                    error: function (xhr, status, error) {
                        alert('An error occurred: ' + error);
                    }
                });


                $.ajax({
                    url: '/Trips/CostCenterCodes',
                    method: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        console.log('cost centers', data);
                        if (data != null) {
                            costCentersList = data.map(function (costCenter) {
                                return { label: costCenter.costCenterCode + ' ' + costCenter.costCenterName, value: costCenter.costCenterCode };
                            });
                            console.log(costCentersList);
                            generateDropdownOptions(costCentersList, '#otherCostCenter');
                            $('#otherCostCenter').val(code);
                        } else {
                            console.log("No costcenters");
                        }
                    },
                    error: function (error) {
                        console.error('API request failed:', error);
                    }
                });
                //hideOverlay();
            },
            error: function (xhr, status, error) {
                console.error(error);
                hideOverlay();
            }
        });
        $("#enregisterBtn").on("click", function () {
            console.log("data loaded")


            sessionStorage.setItem("tripId", tripId);
            if (tripId > 0 && tripId != null) {
                $('#alert-update-popup').modal('show');
                $('#btnUpdateConfirm').click(function () {
                    changes = false;
                    window.globalChange = changes;
                    modifyTripDetails();
                    $(".box-container-blk").hide();
                });
            } else {
                $('#alert-insert-popup').modal('show');

                $('#btnInsertConfirm').click(function () {
                    changes = false;
                    window.globalChange = changes;
                    $(".box-container-blk").hide();
                });
            }

        })
        async function statusData(id) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: '/Research/GetTripStatus',
                    method: 'GET',
                    data: { tripId: id },
                    success: function (statustoDisable) {

                        resolve(statustoDisable);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            })

        }

        async function updateTripDetails(userData) {
            console.log("Updating trip details with userData:", userData);
            var statustoDisable = await statusData(userData.tripId);
            console.log("status", statustoDisable);
            // Check if any of the statuses in statustoDisable contain status 3
            const hasStatus = statustoDisable.some(item => item.status === 3);

            // Disable or enable #flightTime based on whether status 3 is found
            if (hasStatus) {
                $('#flightTime').prop('disabled', true);
            } else {
                $('#flightTime').prop('disabled', false);
            }

            $("#userIdDetails").val(userData.userId);
            if (userData.fromDate) {
                $('#fromDate').val(userData.fromDate.slice(0, 10));
                $('#fromTime').val(userData.fromDate.slice(11, 16));
            } else {
                $('#fromDate').val('');
                $('#fromTime').val('');
            }
            // Handle toDate and toTime
            if (userData.toDate) {
                $('#toDate').val(userData.toDate.slice(0, 10));
                $('#toTime').val(userData.toDate.slice(11, 16));
            } else {
                $('#toDate').val('');
                $('#toTime').val('');
            }
            previousValues = {
                fromDate: $('#fromDate').val(),
                fromTime: $('#fromTime').val(),
                toDate: $('#toDate').val(),
                toTime: $('#toTime').val()
            };
            $('#tripId').val(userData.tripId);

            if (userData.status === 'Status Not Ready') {
                $('#status').val(statNotReady);
            } else if (userData.status === 'Status To Be Processed') {
                $('#status').val(statToBeProcessed);
            } else if (userData.status === 'Accepted By Manager') {
                $('#status').val(acceptedManager);
            } else if (userData.status === 'Rejected By Manager') {
                $('#status').val(rejectedManager);
            } else if (userData.status === 'Cancelled By Manager') {
                $('#status').val(cancelledManager);
            } else if (userData.status === 'Cancelled By Requestor') {
                $('#status').val(cancelledReq);
            } else if (userData.status === 'Out Of Policy Rejected By ExternalService') {
                $('#status').val(outPolicyRejectExtService);
            } else if (userData.status === 'Cancellation Confirmed') {
                $('#status').val(cancelConfirmed);
            } else if (userData.status === 'Out Of Policy Cancellation Confirmed By ExternalService') {
                $('#status').val(outPolicyCancelConfExtService);
            } else if (userData.status === 'Planified') {
                $('#status').val(planified);
            } else if (userData.status === 'Waiting Driver Confirmation') {
                $('#status').val(waitDriverConf);
            } else if (userData.status === 'Waiting ExternalService Confirmation') {
                $('#status').val(waitExtServiceConf);
            } else if (userData.status === 'Out Of Policy Cancelled By Requestor') {
                $('#status').val(outPolicyCancelReq);
            } else if (userData.status === 'Out Of Policy Waiting ExternalService Confirmation') {
                $('#status').val(outPolicyWaitExtServiceConf);
            } else if (userData.status === 'Out Of Policy Cancelled By ExternalService') {
                $('#status').val(outPolicyCancelExtService);
            } else if (userData.status === 'External Cancelled By Manager') {
                $('#status').val(extCancelManager);
            } else if (userData.status === 'Deleted') {
                $('#status').val(deleted);
            } else if (userData.status === 'Updating By Requestor') {
                $('#status').val(updatingReq);
            } else if (userData.status === 'Out Of Policy Updating By Requestor') {
                $('#status').val(outPolicyUpdateReq);
            } else if (userData.status === 'External Reset By Manager') {
                $('#status').val(extResetManager);
            } else {
                // If no match is found, assign userData.status directly
                $('#status').val(userData.status);
            }

            //$('#status').val(userData.status);
            $('#flightType').val(userData.flightType);
            $('#flightNumber').val(userData.flightNumber);
            $('#otherCostCenter').val(userData.otherCostCenter);
            $('#otherCostCenter').css({
                'font-weight': 'bold',
                'font-size': '14px'
            });
            code = userData.costcentercode;
            id = userData.vehicleId;
            $('#vehiclelist').val(id);

            // Check if userData.driver is an empty string or just whitespace
            //var driverURL = userData.driver && userData.driverURL.trim() !== '' ? userData.driver : 'N/A';
            if (userData.driverURL != null && userData.driverURL != '') {
                $('#driverInSearch').html('<a href="' + userData.driverURL + '" target="_blank"><img src="../img/link-blue.png"></img></a>');
            } else {
                $('#driverInSearch').text('Aucun');
            }
            

            //$('#driver').text(userData.driver ? userData.driver : "None");
            $('#requestedUserInSearch ').text(userData.requestedUser);

            if (userData.informPassenger == 1) {
                $('#informPassenger').prop('checked', true);
            } else {
                $('#informPassenger').prop('checked', false);
            }

            if (userData.isPrivate == 1) {
                $('#isPrivate').prop('checked', true);
            } else {
                $('#isPrivate').prop('checked', false);
            }
            if (userData.isVIPtrip == 1) {
                $('#isVIPtrip').prop('checked', true);
            } else {
                $('#isVIPtrip').prop('checked', false);
            }

            $('#outOfPolicy').val(userData.outOfPolicy === 1 ? Yes : No);

            $('#predefinedName').val(userData.predefinedName);
            // Handle transmittedDate
            if (userData.transmittedDate && userData.transmittedDate !== "0001-01-01T00:00:00") {
                $('#transmittedDate').val(userData.transmittedDate);
            } else {
                $('#transmittedDate').val(labelNone);
            }
            //$('#transmittedDate').val(userData.transmittedDate);

            $('#comment').val(''); // Reset comment field
            $('#itinerary').val(''); // Reset itinerary field

            $('#comment').val(userData.comment);
            $('#itinerary').val(userData.itinerary);
            $('#externalService').val(userData.externalService || labelNone);
            $('#paymentMode').val(userData.paymentMode || labelNone);
            // Handle flightDate and flightTime
            if (userData.flightDateTime) {
                $('#flightDate').val(userData.flightDateTime.slice(0, 10));
                $('#flightTime').val(userData.flightDateTime.slice(11, 16));
            } else {
                $('#flightDate').val('');
                $('#flightTime').val('');
            }
            //var $flightTimeField = $('#flightTime');

            //if (statusToDisable.includes("Accepted by the Manager")) {
            //    // Disable the flight time field if the status exists
            //    $flightTimeField.prop('disabled', true);
            //} else {
            //    // Enable the flight time field if the status does not exist
            //    $flightTimeField.prop('disabled', false);
            //}


            PassengerId = userData.passengerId;
            $('#mainPassengerInSearch ').val(PassengerId);
            $('#mainPassengerInSearch ').css({
                'font-weight': 'bold',
                'font-size': '14px' // Optionally increase the font size
            });

            console.log("Trip details updated successfully!");


            // Update trip details header
            $('#tripDetailsHeader').text(`${tripHeader} ${userData.tripId} ${forName} ${userData.mainPassenger}`);

            let currentDateTime = new Date();
            var fromDateTime = userData.fromDate.replace('T', ' ');
            console.log(userData);
            const fieldsToToggle = '#comment, #itinerary, #flightDate, #flightType, #flightNumber, #fromDate, #toDate, #modifyPassengerBtn, #modifyCostCenterBtn, #modifyVehicleBtn';

            $(fieldsToToggle).prop("disabled", true);
            $('#isPrivate').prop("disabled", true);
            $('#informPassenger').prop("disabled", true);
            $('#isVIPtrip').prop("disabled", true);
            $("#mainPassengerInSearch ").prop("disabled", true).css({
                "border": ""
            });
            $("#mainPassengerInSearch ").prop("disabled", true).css({
                "border": ""
            });
            $("#otherCostCenter").prop("disabled", true).css({
                "border": ""
            });
            $("#add-resercher-tripstep").prop("disabled", true);
            console.log(new Date(fromDateTime));
            console.log(userData.status);
            if ((userData.status === 'Accepted By Manager' || userData.status === 'Status To Be Processed' || userData.status === 'Status Not Ready') && new Date(fromDateTime) >= currentDateTime) {

                console.log(userData.status);
                addTripStepPermission = userData.status;
                deleteTripStepPermission = userData.fromDate;


                // Handle Vehicle modify button click
                $("#add-resercher-tripstep").prop("disabled", false).css({
                    "border": "2px solid #4CAF50"
                });
                $("#modifyVehicleBtn").on("click", function () {
                    $("#vehiclelist").prop("disabled", false).css({
                        "border": "2px solid #4CAF50"
                    });
                });

                // Handle Passenger modify button click
                $("#modifyPassengerBtn").on("click", function () {
                    $("#mainPassengerInSearch ").prop("disabled", false).css({
                        "border": "2px solid #4CAF50"
                    });
                });

                // Handle Cost Center modify button click
                $("#modifyCostCenterBtn").on("click", function () {
                    $("#otherCostCenter").prop("disabled", false).css({
                        "border": "2px solid #4CAF50"
                    });
                });

                // Enable fields
                $('#isPrivate').prop("disabled", false);
                $('#isVIPtrip').prop("disabled", false);
                $('#informPassenger').prop("disabled", false);
                $(fieldsToToggle).prop("disabled", false);
            }
        }
        /* function validateDatesAndTimes() {
             var fromDate = $('#fromDate').val();
             var fromTime = $('#fromTime').val();
             var toDate = $('#toDate').val();
             var toTime = $('#toTime').val();
             let valid = true;
             let errorMessage = '';
 
             // Clear previous error messages
             // $('#dateError').text('');
             // $('#timeError').text('');
 
             // Remove previous input-error styles
             $('#fromDate, #fromTime, #toDate, #toTime').css('border', '');
 
             // Get current date and time
             const now = new Date();
             const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
             const currentTime = now.toTimeString().split(' ')[0]; // HH:MM:SS
 
             // Check past date validation
             if (fromDate) {
                 if (new Date(fromDate) < new Date(currentDate)) {
                     errorMessage = FromDateValidation;
                     valid = false;
                     $('#fromDate').css('border', '2px solid red').attr('title', FromdateFields);
                 }
                 // Check past time validation only if the fromDate is the current date
                 else if (fromDate === currentDate && fromTime && fromTime < currentTime) {
                     errorMessage = FromTimeValidation;
                     valid = false;
                     $('#fromTime').css('border', '2px solid red').attr('title', FromtimeFields);
                 }
             }
 
             // Check date comparison validation
             if (fromDate && toDate) {
                 if (new Date(toDate) < new Date(fromDate)) {
                     errorMessage = ToDateValidation;
                     valid = false;
                     $('#toDate').css('border', '2px solid red').attr('title', TodateFields);
                 }
             }
 
             // Check time validation on the same day
             if (fromDate === toDate && fromTime && toTime) {
                 if (toTime < fromTime) {
                     errorMessage = ToTimeValidation;
                     valid = false;
                     $('#toTime').css('border', '2px solid red').attr('title', TotimeFields);
                 }
             }
 
             // If validation fails, handle error messages
             if (!valid) {
                 // Restore previous values if validation fails
                 $('#fromDate').val(previousValues.fromDate);
                 $('#fromTime').val(previousValues.fromTime);
                 $('#toDate').val(previousValues.toDate);
                 $('#toTime').val(previousValues.toTime);
 
                 // Show alert based on the specific error
                 if (errorMessage === FromDateValidation) {
                     alertCustom(2, errorMessage);
                 } else if (errorMessage === FromTimeValidation) {
                     alertCustom(2, errorMessage);
                 } else if (errorMessage === ToDateValidation) {
                     alertCustom(2, errorMessage);
                 } else if (errorMessage === ToTimeValidation) {
                     alertCustom(2, errorMessage);
                 }
 
                 // Remove red border after 3 seconds
                 setTimeout(function () {
                     $('#fromDate, #fromTime, #toDate, #toTime').css('border', '');
                 }, 3000); // 3000 ms = 3 seconds
 
                 return valid;
             }
 
             // If valid, update previous values
             previousValues.fromDate = fromDate;
             previousValues.fromTime = fromTime;
             previousValues.toDate = toDate;
             previousValues.toTime = toTime;
 
             return valid;
         }
 
         // Attach event handlers
         $('#fromDate, #fromTime, #toDate, #toTime').on('input change', function () {
             validateDatesAndTimes();
         });
 */
    }

    var tripId;
    var PassengerId;
    $(document).on('click', '#detail-action-btn', function () {
        showOverlay();
        var id = $(this).data('id');
        $('#statusBottom').hide();
        $('#fromDate, #fromTime, #toDate, #toTime').css('border', '');
        loadResearcherScreen(id);

    });

    function deleteTripStep(Id) {
        var tripStepId = parseInt(Id);

        $.ajax({
            url: '/Trips/DeleteTripStep?tripStepId' + tripStepId,
            method: 'DELETE',
            data: { tripStepId: tripStepId },
            success: function (response) {

                console.log("trip step data");

            },

            error: function (error) {
                console.error(error);
            }
        });

    }
    $('#closeBtn1').click(function () {
        console.log('Clicked');
        clearValues();
    });

    function modifyTripDetails() {
        console.log('tripId:', tripId);

        var vehicleId = $('#vehiclelist').val();
        var passengerId = $('#mainPassengerInSearch ').val();
        var predefinedName = $('#predefinedName').val();
        var code = $('#otherCostCenter').val();
        var comment = $('#comment').val();
        var itinerary = $('#itinerary').val();
        var flightDate = $('#flightDate').val();
        var flightTime = $('#flightTime').val();
        var flightType = $('#flightType').val();
        var flightNumber = $('#flightNumber').val();
        var fromDate = $('#fromDate').val();
        var fromTime = $('#fromTime').val();
        var toDate = $('#toDate').val();
        var toTime = $('#toTime').val();
        let isPrivateValue = 0;
        let informPassengerValue = 0;
        let vipTripValue = 0;

        // Get the state of each checkbox and store in respective variables
        if (!$('#isPrivate').is(':disabled')) {
            isPrivateValue = $('#isPrivate').is(':checked') ? 1 : 0;
        }
        if (!$('#informPassenger').is(':disabled')) {
            informPassengerValue = $('#informPassenger').is(':checked') ? 1 : 0;
        }
        if (!$('#isVIPtrip').is(':disabled')) {
            vipTripValue = $('#isVIPtrip').is(':checked') ? 1 : 0;
        }

        var fromDateTime = new Date(fromDate + 'T' + fromTime);
        var toDateTime = new Date(toDate + 'T' + toTime);
        var flightDatetime = new Date(flightDate + 'T' + flightTime);
        // Format the Date objects into local date strings
        console.log(fromDateTime);
        console.log(toDateTime);
        console.log(flightDatetime);
        var fromDateTimeString = convertDatetoTimeString(fromDateTime); // Local date-time string
        var toDateTimeString = convertDatetoTimeString(toDateTime);
        var flightDatetimeString = convertDatetoTimeString(flightDatetime);
        /*console.log(fromDateTimeString);
        console.log(toDateTimeString);
        console.log(dataToSend);*/
        var dataToSend = {
            tripId: tripId,
            code: code ? code : null,
            vehicleId: vehicleId ? vehicleId : null,
            passengerId: passengerId ? passengerId : null,
            predefinedName: predefinedName ? predefinedName : null,
            comment: comment,
            itinerary: itinerary,
            flightDateTime: flightDatetimeString,
            privateTrip: isPrivateValue,
            informPassenger: informPassengerValue,
            vipTrip: vipTripValue,
            flightType: flightType,
            flightNumber: flightNumber,
            fromDateTime: fromDateTimeString,
            toDateTime: toDateTimeString
        };
        console.log(dataToSend);
        /*console.log(dataToSend);
        console.log(dataToSend);*/
        $.ajax({
            url: '/Research/UpdateTripDetails',
            method: 'PUT',
            data: dataToSend,
            success: function (response) {

                var key = sessionStorage.getItem("tripId");
                if (key > 0) {
                    $('#alert-update-popup').modal('hide');

                    $('#alert-update-green').modal('show');
                    $('#alert-update-green').fadeIn();
                    setTimeout(function () {
                        $('#alert-update-green').modal('hide');
                    }, 3000);
                } else {
                    $('#alert-insert-popup').modal('hide');

                    $('#alert-insert-green').modal('show');
                    $('#alert-insert-green').fadeIn();
                    setTimeout(function () {
                        $('#alert-insert-green').modal('hide');
                    }, 3000);
                }
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });

    }
    function convertDatetoTimeString(inputDate) {
        var date = new Date(inputDate);
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        var year = date.getFullYear();
        var hours = date.getHours().toString().padStart(2, '0');
        var minutes = date.getMinutes().toString().padStart(2, '0');
        var seconds = date.getSeconds().toString().padStart(2, '0');

        // Format as "YYYY-MM-DD HH:MM:SS"
        var formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }

    function updateTripStatus(userData) {
        /* <div class="followUp-mbl-row">
             <div class="followUp-col">
                 <span class="status status-pink"></span>
                 <h4>A traiter (1)</h4>
             </div>
             <div class="followUp-col">
                 <div class="followUp-bottom-row">
                     <div class="followUp-bottom-col">
                         <span>21/06/2023 - 20:27</span>
                         <span>XSNANDASA</span>
                     </div>
                 </div>
             </div>
         </div>*/
        if (!isMobile) {

            $('.followUp-mbl').css('display', 'none');
            var $grid = $("#info-grid"),
                newWidth = $grid.closest(".ui-jqgrid").parent().width();
            $grid.jqGrid("setGridWidth", newWidth, true);
            var mydata = userData.map(function (item) {
                var statusClass;
                switch (item.status) {
                    case 1:
                        statusClass = "status-outline-gray";
                        break;
                    case 2:
                        statusClass = "status-pink";
                        break;
                    case 3:
                        statusClass = "status-blue";
                        break;
                    case 11:
                        statusClass = "status-blue";
                        break;
                    case 5:
                        statusClass = "status-red";
                        break;
                    case 4:
                        statusClass = "status-red";
                        break;
                    case 8:
                        statusClass = "status-red";
                        break;
                    case 10:
                        statusClass = "status-green";
                        break;
                    case 6:
                        statusClass = "status-yellow";
                        break;
                    default:
                        statusClass = "status-gray";
                }



                return {
                    status: "<span class='status " + statusClass + "'></span>",
                    Status: item.new_status_description + " (" + (item.status) + ")",
                    Hour: item.timeStamp,
                    Author: item.modifiedBy
                };
            });
            console.log(mydata);



            // Clear the grid before loading new data
            jQuery("#info-grid").clearGridData();



            // Reload with new data
            jQuery("#info-grid").jqGrid('setGridParam', {
                data: mydata,
                datatype: "local",
            }).trigger('reloadGrid');



            // Optionally, if you want to reset the grid with the same configuration again (only if not already initialized):
            if (!$grid.hasClass('ui-jqgrid')) {
                jQuery("#info-grid").jqGrid({
                    data: mydata,
                    datatype: "local",
                    rowNum: 10,
                    rowList: [10, 20, 30],
                    colNames: ['', statusHeader, hourHeader, authorHeader],
                    colModel: [
                        { name: 'status', width: 10, index: 'status', align: 'center' },
                        { name: 'Status', index: 'Status', width: 150, align: 'left' },
                        { name: 'Hour', index: 'Hour', width: 80, align: 'left' },
                        { name: 'Author', index: 'Author', width: 80, align: 'left' }
                    ],
                    height: "auto",
                    autowidth: true,
                    shrinkToFit: true,
                    viewrecords: true,
                    altRows: true,
                    altclass: 'myAltClass',
                    multiselect: false,
                    resizable: false
                });
            }



            // Set the maximum height to "calc(100vh - 290px)"
            var gridParent = $grid.closest(".ui-jqgrid-bdiv");
            gridParent.css({
                "max-height": "calc(100vh - 290px)", // Limits the maximum height
                "overflow-y": "auto" // Enables vertical scrolling if content exceeds max height
            });
            $('.follow-up-win').css('display', 'block');
        }
        else {
            $('.follow-up-win').css('display', 'none');
            $('.followUp-mbl').css('display', 'block');
            let htmlString = '';
            $.each(userData, function (index, item) {
                // Determine the status class based on the item's status
                let statusClass;
                switch (item.status) {
                    case 1:
                        statusClass = "status-outline-gray";
                        break;
                    case 2:
                        statusClass = "status-pink";
                        break;
                    case 3:
                        statusClass = "status-blue";
                        break;
                    case 11:
                        statusClass = "status-blue";
                        break;
                    case 5:
                        statusClass = "status-orange";
                        break;
                    case 4:
                        statusClass = "status-orange";
                        break;
                    case 8:
                        statusClass = "status-orange";
                        break;
                    case 10:
                        statusClass = "status-green";
                        break;
                    case 6:
                        statusClass = "status-yellow";
                        break;
                    default:
                        statusClass = "status-gray";
                }



                // Construct the HTML for each item
                htmlString += `<div class="followUp-mbl-row">`;
                htmlString += `    <div class="followUp-col">`;
                htmlString += `        <span class="status ${statusClass}"></span>`;
                htmlString += `        <h4>${item.new_status_description} (${item.status})</h4>`;
                htmlString += `    </div>`;
                htmlString += `    <div class="followUp-col">`;
                htmlString += `        <div class="followUp-bottom-row">`;
                htmlString += `            <div class="followUp-bottom-col">`;
                htmlString += `                <span>${item.timeStamp}</span>`;
                htmlString += `                <span>${item.modifiedBy}</span>`;
                htmlString += `            </div>`;
                htmlString += `        </div>`;
                htmlString += `    </div>`;
                htmlString += `</div>`;
            });



            // Append the constructed HTML to the container
            $('.followUp-mbl').html(htmlString);

        }
        //    // pager: "#pager",
        //    editable: true,
        //    viewrecords: true,
        //    autowidth: false,
        //    height: "calc(100vh - 290px)",
        //    altRows: true,
        //    altclass: 'myAltClass',
        //    multiselect: false,
        //    resizable: false
        //});
    }

    // Function to reset and initialize passenger dropdowns
    function generateDropdownOptions(options, targetElement) {
        // Clear existing options
        $(targetElement).empty();

        // Add a default option
        $(targetElement).append($('<option>', {
            value: '',
            text: Trips,
        }));

        // Add other options
        options.forEach(function (option) {
            $(targetElement).append($('<option>', {
                value: option.value,
                text: option.label,
            }));
        });

    }

    var tripSteps = [];

    var lastStepId;

    function loadTripDetails(id) {
        //var id = tripId;
        console.log('tripId', id)
        /* if (id == undefined) {
             id = sessionStorage.getItem('redirectTripId');
             id=parseInt(id);
         }*/
        /*var passsengerList = [];*/
        showOverlay();
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
                tripSteps = data.tripSteps;
                console.log(data);
                // Ensure tripSteps is defined and valid
                if (tripSteps.length > 0) {
                    tripSteps.forEach(function (tripStep, index) {
                        // Clone the trip step template
                        var clonedDiv = $(".trip-review-trip-step-demo").first().clone();

                        // Set the header text
                        clonedDiv.find(".trip-review-trip-step-header").text(tripstepName + (index + 1));

                        clonedDiv.find(".edit-trip-step").attr('data-id', tripStep.tripStepId);
                        clonedDiv.find(".delete-trip-step").attr('data-id', tripStep.tripStepId);

                        lastStepId = tripStep.tripStepId;

                        var tripFromDate = tripStep.tripFromDate.replace('T', ' ');
                        var dateObj = new Date(tripFromDate);
                        // Manually format the date and time
                        var day = String(dateObj.getDate()).padStart(2, '0');
                        var month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
                        var year = dateObj.getFullYear();

                        var hours = String(dateObj.getHours()).padStart(2, '0');
                        var minutes = String(dateObj.getMinutes()).padStart(2, '0');
                        var seconds = String(dateObj.getSeconds()).padStart(2, '0');

                        // Format the date and time as dd-mm-yyyy hh:mm:ss
                        var formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

                        clonedDiv.find(".trip-step-from-date").text(formattedDate);
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
                        /*clonedDiv.find(".trip-step-to-date").text(tripToDate);
                        clonedDiv.find(".trip-step-to-location").text(tripStep.toLocation.locationName);*/

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
                        var tripToDate = tripStep.tripToDate.replace('T', ' ');
                        var dateObj1 = new Date(tripToDate);
                        // Manually format the date and time
                        var day = String(dateObj1.getDate()).padStart(2, '0');
                        var month = String(dateObj1.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
                        var year = dateObj1.getFullYear();

                        var hours = String(dateObj1.getHours()).padStart(2, '0');
                        var minutes = String(dateObj1.getMinutes()).padStart(2, '0');
                        var seconds = String(dateObj1.getSeconds()).padStart(2, '0');

                        // Format the date and time as dd-mm-yyyy hh:mm:ss
                        var formatteTodDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

                        clonedDiv.find(".trip-step-to-date").text(formatteTodDate);
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

                        if (tripStep.comment && tripStep.comment.trim() !== '') {
                            clonedDiv.find('.trip-step-comment').text(tripStep.comment);
                        } else {
                            clonedDiv.find('.trip-step-comment').text('Aucun');
                        }
                        passengerList = [];

                        // Iterate through each passenger
                        if (tripStep.passengers) {
                            tripStep.passengers.forEach(function (passenger) {
                                passengerList.push(passenger);
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

                        // Update button states based on date
                        let fromdate = new Date(data.fromDate);
                        let currentdate = new Date();
                        if ((data.status === 3 || data.status === 2) && fromdate > currentdate) {
                            clonedDiv.find(".edit-trip-step").removeAttr("disabled").css({
                                "border": "2px solid #4CAF50"
                            });
                            clonedDiv.find(".delete-trip-step").removeAttr("disabled").css({
                                "border": "2px solid #4CAF50"
                            });
                        } else {
                            clonedDiv.find(".edit-trip-step").prop("disabled", true).css({
                                "border": "" // Reset border style if needed
                            });
                            clonedDiv.find(".delete-trip-step").prop("disabled", true).css({
                                "border": "" // Reset border style if needed
                            });
                        }
                        //$('#mail').text(tripStep.mail);
                        //$('#tripStepComment').text(tripStep.comment);

                    });
                }

                $('.trip-review-main-passenger').text(data.mainPassenger.firstName + ' ' + data.mainPassenger.lastName);
                $('.last-payment-detail-col #costcenterId').text(data.otherCostCenter);
                //$('.last-payment-detail-col span:contains("OtherCostCenter") + h4').text(data.otherCostCenter);

                passengerList = passengerList.map(function (passenger) {
                   
                      /*  let type = "";
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
                        }*/
                    return { label: passenger.firstName + " " + passenger.lastName, value: passenger.passengerId };
                });
                console.log('passenger list', passengerList);

                generateMainPassenegrDropdownOptions(passengerList, '#mainPassengerInSearch ');
                $('#mainPassengerInSearch ').val(PassengerId);
                hideOverlay();
            },
            error: function (error) {
                console.error('API request failed:', error);
                hideOverlay();
            }
        });
        showOverlay();
        $.ajax({
            url: '/Research/GetTripStatus',
            method: 'GET',
            data: { tripId: id },
            success: function (userData) {
                console.log('Trip Status data ', userData);
                // Format the timeStamp for each trip in the userData array
                userData.forEach(trip => {
                    var date = new Date(trip.timeStamp);

                    // Format date and time
                    var day = String(date.getDate()).padStart(2, '0');
                    var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    var year = date.getFullYear();

                    var hours = String(date.getHours()).padStart(2, '0');
                    var minutes = String(date.getMinutes()).padStart(2, '0');
                    var seconds = String(date.getSeconds()).padStart(2, '0');

                    var formattedTimestamp = `${day}.${month}.${year} - ${hours}.${minutes}.${seconds}`;

                    // Update the timeStamp with the formatted value
                    trip.timeStamp = formattedTimestamp;
                });
                updateTripStatus(userData);
                statusToDisable = userData;

                hideOverlay();
            },
            error: function (xhr, status, error) {
                console.error(error);
                hideOverlay();
            }
        });
    }

    const getTodayTime = () => {
        var now = new Date();
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var currentTime = hours + ':' + minutes;
        console.log('current time---->', currentTime);
        return currentTime;
    };

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
        // Parse the start and end date-time values using IDs
        const startDate = $(tripStep).find('.start-date').val();
        const startTime = $(tripStep).find('.start-time').val();
        const endDate = $(tripStep).find('.end-date').val();
        const endTime = $(tripStep).find('.end-time').val();

        // Convert string values to Date objects
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);

        console.log('Start Date:', startDate, 'Start Time:', startTime, 'End Date:', endDate, 'End Time:', endTime);

        // Calculate time difference in milliseconds
        let timeDifference = endDateTime.getTime() - startDateTime.getTime();
        console.log("Time Difference in ms:", timeDifference);

        // Calculate days, hours, and minutes from the time difference
        let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutesDifference = Math.round((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        // Adjust for overflow
        if (minutesDifference === 60) {
            hoursDifference++;
            minutesDifference = 0;
        }

        if (hoursDifference === 24) {
            daysDifference++;
            hoursDifference = 0;
        }

        // Reset values if the difference is negative
        if (daysDifference < 0 || hoursDifference < 0 || minutesDifference < 0) {
            $(tripStep).find('.end-time').val($(tripStep).find('.start-time').val());
            $(tripStep).find('.end-date').val($(tripStep).find('.start-date').val());
            daysDifference = hoursDifference = minutesDifference = 0;
        }

        // Log the calculated differences
        console.log("Difference in Days:", daysDifference);
        console.log("Difference in Hours:", hoursDifference);
        console.log("Difference in Minutes:", minutesDifference);

        // Update the respective input fields with the calculated values
        $(tripStep).find('.duration-days').val(daysDifference);
        $(tripStep).find('.duration-hours').val(hoursDifference);
        $(tripStep).find('.duration-minutes').val(minutesDifference);
    };


    function formatDateToYYYYMMDD(date) {
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        var day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for the day

        return `${year}-${month}-${day}`;
    }

    const configureTripStepModel = (previousTripStepData, isNewStep) => {
        console.log(previousTripStepData);

        // Clear inputs in the trip container
        $('.tab-trip-container').find("input, select, textarea").val('');
        $('.tab-trip-container').find("input, select, textarea").removeAttr('title');
        $('.tab-trip-container').find("input, select, textarea").css('border', '1px solid #cacccf');

        // Clone the first passenger template
        let passengerCount = 1;
        let passengerDiv = $(".details-inputs.passenger:first").clone();
        passengerDiv.find(".details-header span").text("Passenger " + passengerCount);
        passengerDiv.find(".passenger-dropdown").attr('data-id', passengerCount);
        passengerDiv.find('.passenger-dropdown').val('');
        passengerDiv.find('.handbag').val('0');
        passengerDiv.find('.luggage').val('0');
        passengerDiv.find(".special").removeClass('empty');

        // Clear existing passengers and add the cloned passenger
        $(".all-passenger-container").empty().append(passengerDiv);

        // Initialize dropdowns and autocomplete
        initializeAutocomplete($('.passenger-dropdown'), allPassengers);
        initializeAutocomplete($('#start-location'), autocompleteLocation);
        initializeAutocomplete($('#end-location'), autocompleteLocation);
        //generateDropdownOptions(allLocation, '#start-location');
        // generateDropdownOptions(allLocation, '#end-location');

        if (isNewStep) {
            let newTripStep = $(".trip-step-container");
            newTripStep.find("input, select, textarea").val('');
            newTripStep.find("input, select, textarea").removeAttr('title');
            newTripStep.find("input, select, textarea").css('border', '1px solid #cacccf');

            /*let previousStep = $(".trip-step-container:last");
            let previousEndLocation = previousStep.find('.end-location').val();
            let previousEndDate = previousStep.find('.end-date').val();
            let previousEndTime = previousStep.find('.end-time').val();*/

            /* console.log('prevEndLocation:', previousEndLocation);
             console.log('previousEndDate:', previousEndDate);
             console.log('previousEndTime:', previousEndTime);*/

            // Set start location and dates
            newTripStep.removeAttr('trip-step-id');
            var startLocation = allLocation.find(loc => loc.data == previousTripStepData.toLocation.locationId);
            newTripStep.find(".start-location").val(startLocation.value);
            newTripStep.find(".start-location").attr('data-id', startLocation.data);

            initializeAutocomplete(newTripStep.find(".start-location"), autocompleteLocation);
            initializeAutocomplete(newTripStep.find(".end-location"), autocompleteLocation);
            //newTripStep.find(".start-location")
            //generateDropdownOptionsWithSelected(allLocation, newTripStep.find(".start-location"), previousTripStepData.toLocation.locationId);

            let startDateTime = new Date(previousTripStepData.tripToDate);
            newTripStep.find(".start-date").val(formatDateToYYYYMMDD(startDateTime));
            newTripStep.find(".start-time").val(startDateTime.toTimeString().split(' ')[0]);

            let endDateTime = getAdjustedDateTime(startDateTime, 120);
            newTripStep.find(".end-date").val(endDateTime.date);
            newTripStep.find(".end-time").val(endDateTime.time);

            // configureTripStepModel(newTripStep);
            setTripDuration(newTripStep);

            // Clear and clone passengers from the previous step
            newTripStep.find(".all-passenger-container").empty();
            let previousPassengersData = previousTripStepData.passengers;

            previousPassengersData.forEach((passengerData, index) => {
                // Clone the passenger template
                let clonedPassenger = passengerDiv.clone();

                // Update passenger information based on previous data
                var name = allPassengers.find(passenger => passenger.data == passengerData.passengerId);
                clonedPassenger.find(".passenger-dropdown")
                    .attr('data-id', passengerData.passengerId)
                    .val(name.value); // Assuming passengerData has a 'name' property

                clonedPassenger.find('.handbag').val(passengerData.handbag || 0); // Default to 0 if not provided
                clonedPassenger.find('.luggage').val(passengerData.luggage || 0); // Default to 0 if not provided
                clonedPassenger.find(".special").val(passengerData.special || 0); // Assuming there's a special condition

                // Append the filled passenger to the new trip step
                if (index > 0) {

                    clonedPassenger.find(".delete-passenger-row-icon").removeClass('empty');
                }
                newTripStep.find(".all-passenger-container").append(clonedPassenger);
            });

            // Initialize autocomplete for passenger dropdowns and add change event listener
            newTripStep.find('.passenger-dropdown').each(function () {
                let val = $(this).val();
                $(this).val(""); // Temporarily clear the value for autocomplete
                initializeAutocomplete($(this), allPassengers);
                var name = allPassengers.find(passenger => passenger.value == val);
                $(this).val(val); // Restore original value
                $(this).attr('data-id', name.data);
                // Attach change event to assign data-id on change
                /* $(this).on('input', function () {
                     let selectedValue = $(this).val();
                     var name = allPassengers.find(passenger => passenger.value == selectedValue);
                     console.log(selectedValue);
                     console.log(name);
 
                     if (name) {
                         $(this).attr('data-id', passengerData.passengerId);
                             
                         //let passengerId = $(this).data('id'); // Get the data-id
                         //passengerData['PassengerId'] = passengerId; // Assuming passengerData is defined in the appropriate scope
                         console.log("Selected Value:", selectedValue); // Log selected value
                         console.log("Passenger ID:", passengerId); // Log passenger ID
                     }
                 });*/
            });

            $(".trip-step-row").append(newTripStep);
            $(".trip-step-row").find('.trip-step-container').last().addClass('bottom-line');
        }
    };


    const showConfirmPopup = (textValue) => {
        $('#confirm-popup').find("#popup-body").text(textValue);
        $('#confirm-popup').modal('show');
    }

    const hideConfirmPopup = () => {
        $('#confirm-popup').modal('hide');
    }

    const addValuesToTripStepModel = (tripStepData) => {
        $('.tab-trip-container').attr('trip-step-id', tripStepData.tripStepId);
        initializeAutocomplete($(".start-location"), autocompleteLocation);
        var startLocation = allLocation.find(loc => loc.data == tripStepData.fromLocation.locationId);
        $(".start-location").val(startLocation.value);
        $(".start-location").attr('data-id', startLocation.data);
        //$('#start-location').val(tripStepData.fromLocation.locationId);
        var endLocation = allLocation.find(loc => loc.data == tripStepData.toLocation.locationId);
        initializeAutocomplete($('#end-location'), autocompleteLocation);
        $(".end-location").val(endLocation.value);
        $(".end-location").attr('data-id', endLocation.data);
        //$('#end-location').val(tripStepData.toLocation.locationId);

        $('.comment').val(tripStepData.comment);

        var startDateTime = new Date(tripStepData.tripFromDate);

        var startDate = startDateTime.toISOString().split('T')[0];
        var startTime = startDateTime.toTimeString().split(' ')[0];

        $('.start-date').val(startDate);
        $('.start-time').val(startTime);

        var endDateTime = new Date(tripStepData.tripToDate);

        var endDate = endDateTime.toISOString().split('T')[0];
        var endTime = endDateTime.toTimeString().split(' ')[0];

        $('.end-date').val(endDate);
        $('.end-time').val(endTime);

        setTripDuration($('.tab-trip-container'));

        if (tripStepData.passengers) {
            tripStepData.passengers.forEach(function (passenger, passengerIndex) {
                let passengerName = allPassengers.find(pas => pas.data == passenger.passengerId);
                if (passengerIndex == 0) {
                    var pass = $(".details-inputs.passenger:first");
                    $(pass).attr("passenger-hub-id", passenger.passengerHubId);
                    $(pass).attr("passenger-luggage-id", passenger.passengerLuggageId);
                    $(pass).find(".handbag").val(passenger.handBag);
                    $(pass).find(".luggage").val(passenger.luggage);
                    $(pass).find(".special").val(passenger.special);

                    $(pass).find(".passenger-dropdown").val(passengerName.value);
                    $(pass).find(".passenger-dropdown").attr('data-id', passengerName.data);
                    //generateDropdownOptionsWithSelected(allPassengers, pass.find(".passenger-dropdown"), passenger.passengerId);
                    initializeAutocomplete(pass.find('.passenger-dropdown'), allPassengers);
                } else {
                    var clonedDiv = $(".details-inputs.passenger:first").clone();
                    var passengerCount = $(".details-inputs.passenger").length + 1;
                    clonedDiv.find(".details-header span").text("Passenger " + passengerCount);
                    clonedDiv.find(".passenger-dropdown").attr('data-id', passengerCount);
                    clonedDiv.find(".delete-passenger-row-icon").removeClass('empty');
                    //clonedDiv.find(".details-header img").css("display", "block");
                    clonedDiv.attr("passenger-hub-id", passenger.passengerHubId);
                    clonedDiv.attr("passenger-luggage-id", passenger.passengerLuggageId);
                    //generateDropdownOptionsWithSelected(allPassengers, clonedDiv.find(".passenger-dropdown"), passenger.passengerId);
                    //var passengerName = passengerList.find(pas => pas.data == passenger.passengerId);
                    clonedDiv.find(".passenger-dropdown").val(passengerName.value);
                    clonedDiv.find(".passenger-dropdown").attr('data-id', passengerName.data);
                    initializeAutocomplete(clonedDiv.find('.passenger-dropdown'), allPassengers);
                    clonedDiv.find(".handbag").val(passenger.handBag);
                    clonedDiv.find(".luggage").val(passenger.luggage);
                    clonedDiv.find(".special").val(passenger.special);
                    $(".all-passenger-container").append(clonedDiv);
                }
            });
        }

        if (tripStepData.isMailRequired) {
            $('.is-mail-required').prop("checked", true);
        }
    }

    $(document).off('click', '.edit-trip-step').on('click', '.edit-trip-step', function () {
        console.log("FFFFFFFFFF");
        // Get the ID from the 'data-id' attribute
        var tripStepId = $(this).data('id');

        var tripStep = [...tripSteps];
        modified = 1

        tripStep = tripStep.find(item => item.tripStepId == tripStepId);

        console.log('clicked tripStep', tripStep);
        if (tripStep) {
            resetModal();
            configureTripStepModel(tripStep);
            addValuesToTripStepModel(tripStep);
            loadTripDetails(tripId);

            // Ensure the modal is fully hidden before showing it again
            $('#add-trip-steps').modal('hide');
            setTimeout(function () {
                $('#add-trip-steps').modal('show');
                $('#add-step').text(saveTripStep);
            }, 200); // Small delay to ensure proper modal handling
        } else {
            console.error('Trip step not found');
        }


        //configureTripStepModel();
        //addValuesToTripStepModel(tripStep);
        //loadTripDetails(tripId);
        //$('#add-trip-steps').modal('show');
        //$('#add-step').text(saveTripStep);
    });

    function resetModal() {
        $('#add-trip-steps').find('input, select, textarea').val(''); // Clear inputs
        $('#add-trip-steps').find('.dynamic-content').remove(); // Remove dynamic elements if any
        $('#add-step').text(''); // Reset button text or any other text fields
        // Reset any other elements or styles to their initial state
    }

    $(document).off('click', '.delete-trip-step').on('click', '.delete-trip-step', function () {

        // Get the ID from the 'data-id' attribute
        var id = $(this).data('id');
        var deletebtn = $(this);
        // Call the delete function (ensure it is defined elsewhere)


        // Hide the closest .trip-final-details-col div


        // Find the parent container containing the delete buttons
        var parentContainer = $(this).closest('.scroll-bar');

        // Count all delete buttons within the parent container
        var totalDeleteButtons = parentContainer.find('.delete-trip-step').length;

        // Count remaining delete buttons that are still visible
        var remainingDeleteButtons = parentContainer.find('.trip-final-details-col').filter(':visible').find('.delete-trip-step').length;

        // If only one delete button remains, disable it
        if (remainingDeleteButtons === 1) {
            alertCustom(2, TripStepDelete)
            /* var lastButton = parentContainer.find('.delete-trip-step').filter(':visible').last();
 
             // Debugging: Log the button being disabled
             console.log("Disabling button:", lastButton);
 
             lastButton.prop('disabled', true);*/
        } else {
            let text = DeletePopUp;
            showConfirmPopup(text);
            $('#confirm-button').on('click', function () {
                deleteTripStep(id);
                deletebtn.closest('.trip-final-details-col').hide();
                updateTripStepNumbers();
                hideConfirmPopup();
            });

        }
        function updateTripStepNumbers() {
            // Update the numbering for all visible trip steps

            // Update the numbering for all visible trip steps
            $(".trip-review-trip-step-container .trip-final-details-col").filter(':visible').each(function (index) {
                console.log(index);
                $(this).find(".trip-review-trip-step-header").text(tripstepName + (index + 1));
            });

        }
    });

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


    $(document).on("click", "#add-resercher-tripstep", function () {
        showOverlay();
        var tripStep = [...tripSteps];

        tripStep = tripStep.find(item => item.tripStepId == lastStepId);
        modified = 0;
        console.log('clicked tripStep', tripStep);
        if (tripStep) {
            resetModal();
            configureTripStepModel(tripStep, 1);
        }

        /*$('#add-trip-steps').modal('hide');
        setTimeout(function () {
            $('#add-trip-steps').modal('show');
            $('#add-step').text(addTripStep);
        }, 200); // Small delay to ensure proper modal handling*/
        $('#add-trip-steps').modal('show');
        $(".modal-backdrop").show();
        $('#add-step').text(addTripStep);
        hideOverlay();

    });
    //$("#add-resercher-tripstep").on("click", function () {
    //    configureTripStepModel();
    //});


    // Event delegation for deleting passengers
    $(".detail-passenger-blk").on("click", ".details-inputs.passenger .delete-passenger-row-icon", function () {
        console.log("passenger hub id", $(this).closest(".details-inputs.passenger").attr("passenger-hub-id"));
        if ($(this).closest(".details-inputs.passenger").attr("passenger-hub-id")) {
            deletedItems.DeletedPassengers.push($(this).closest(".details-inputs.passenger").attr("passenger-hub-id"));
        }
        $(this).closest(".details-inputs.passenger").remove();
    });

    // Add more passengers
    $(".add-more-passenger").on("click", function () {
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
                    var pas = allPassengers.find(pass => pass.value == $(this).val())
                    console.log(pas);
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
            var passengerCount = $(".details-inputs.passenger").length + 1;
            clonedDiv.find(".details-header span").text("Passenger " + passengerCount);
            clonedDiv.find(".passenger-dropdown").attr('data-id', passengerCount);
            clonedDiv.find(".passenger-dropdown").val("");
            clonedDiv.removeAttr('passenger-hub-id');
            clonedDiv.removeAttr('passenger-luggage-id');
            clonedDiv.find('.handbag').val('0');
            clonedDiv.find('.luggage').val('0');
            clonedDiv.find(".special").val('');
            clonedDiv.find(".delete-passenger-row-icon").removeClass('empty');
            initializeAutocomplete(clonedDiv.find('.passenger-dropdown'), allPassengers);
            //generatePassengerDropdownOptions(allPassengers, clonedDiv.find(".passenger-dropdown"), currentPassengerList);
            $(".all-passenger-container").append(clonedDiv);
        }

        // Initialize the dropdown for passenger
        $('.delete-link').show();
    });

    $(document).on('change', '#fromTime', function () {
        const selectedDay = $('#fromDate').val();
        const curTime = getTodayTime(); // Function assumed to get current time
        const selectedTime = $(this).val();

        // Ensure the selected time is not less than current time
        if (new Date().toISOString().split('T')[0] === selectedDay && selectedTime < curTime) {
            $(this).val(curTime);
        }

        // Update end time if it's less than or equal to start time
        const fromDateTime = new Date(`${selectedDay}T${selectedTime}`);
        const toDate = $('#toDate').val();
        const toTime = $('#toTime').val();
        const toDateTime = new Date(`${toDate}T${toTime}`);

        if (toDateTime <= fromDateTime) {
            fromDateTime.setHours(fromDateTime.getHours() + 1);
            $('#toDate').val(selectedDay);
            $('#toTime').val(fromDateTime.toTimeString().split(' ')[0].substring(0, 5));
        }
    });

    $(document).on('change', '#fromDate', function () {
        const startDateValue = $(this).val();
        $('#toDate').attr("min", startDateValue);

        // Update end date and time if needed
        const fromTime = $('#fromTime').val();
        const fromDateTime = new Date(`${startDateValue}T${fromTime}`);
        const toDate = $('#toDate').val();
        const toTime = $('#toTime').val();
        const toDateTime = new Date(`${toDate}T${toTime}`);

        if (toDateTime <= fromDateTime) {
            fromDateTime.setHours(fromDateTime.getHours() + 1);
            $('#toDate').val(startDateValue);
            $('#toTime').val(fromDateTime.toTimeString().split(' ')[0].substring(0, 5));
        }
    });

    $(document).on('change', '#toTime', function () {
        const fromDate = $('#fromDate').val();
        const toDate = $('#toDate').val();
        const currentToTime = $(this).val();

        // Only check if the dates are the same
        if (toDate === fromDate) {
            const today = new Date().toISOString().split('T')[0];
            const minTime = $('#fromTime').val();

            // Ensure toTime is not less than minTime
            if (currentToTime < minTime) {
                errorMessage = ToTimeValidation;
                alertCustom(2, errorMessage);
                $(this).val(minTime);
            }

            // Compare with the existing toTime and prevent going backward
            const existingToTime = $('#toTime').val();
            errorMessage = ToTimeValidation;
            if (currentToTime < existingToTime) {
                alertCustom(2, errorMessage);
                $(this).val(existingToTime); // Revert to existing toTime if new value is smaller
            }
        }
    });

    $(document).on('change', '#toDate', function () {
        const currentToDate = $(this).val();
        const existingToDate = $('#toDate').val();
        const fromDate = $('#fromDate').val();

        // Ensure toDate is not less than existing toDate
        if (currentToDate < existingToDate) {
            errorMessage = ToDateValidation;
            alertCustom(2, errorMessage);
            $(this).val(existingToDate); // Revert to existing toDate if new value is smaller
        }

        // Ensure toDate is not less than fromDate
        if (currentToDate < fromDate) {
            errorMessage = ToDateValidation;
            alertCustom(2, errorMessage);
            $(this).val(fromDate); // Set to fromDate if currentToDate is smaller
        }
    });

    /* if (fromDate && toDate) {
         if (new Date(toDate) < new Date(fromDate)) {
             errorMessage = ToDateValidation;
             valid = false;
             $('#toDate').css('border', '2px solid red').attr('title', TodateFields);
         }
     }
 
     // Check time validation on the same day
     if (fromDate === toDate && fromTime && toTime) {
         if (toTime < fromTime) {
             errorMessage = ToTimeValidation;
             valid = false;
             $('#toTime').css('border', '2px solid red').attr('title', TotimeFields);
         }
     }*/

    // Helper function to validate inputs and set trip duration
    function validateAndSetDuration($container) {
        const startDate = $container.find('#fromDate').val();
        const startTime = $container.find('#fromTime').val();
        const endDate = $container.find('#toDate').val();
        const endTime = $container.find('#toTime').val();

        if (startDate && startTime && endDate && endTime) {
            console.log($container)
            setTripDuration($container); // Function to calculate trip duration
        }
    }




    //$(".add-more-passenger").on("click", function () {
    //    var flag = true;
    //    var currentPassengerList = [];
    //    $(this).closest(".trip-step-container").find('.details-inputs.passenger').each(function (passengerIndex, passenger) {
    //        $(passenger).find('select').each(function () {
    //            if (!$(this).val()) {
    //                alertCustom(1, 'Please select passenger in last dropdown');
    //                flag = false;
    //            }
    //            else {
    //                console.log($(this).val())
    //                currentPassengerList.push($(this).val().toString());
    //            }

    //        });
    //    });

    //    if (flag) {
    //        var clonedDiv = $(".details-inputs.passenger:first").clone();
    //        var passengerCount = $(".details-inputs.passenger").length + 1;
    //        clonedDiv.find(".details-header span").text("Passenger " + passengerCount);
    //        clonedDiv.find(".passenger-dropdown").attr('data-id', passengerCount);
    //        clonedDiv.removeAttr('passenger-hub-id');
    //        clonedDiv.removeAttr('passenger-luggage-id');
    //        clonedDiv.find('.handbag').val('0');
    //        clonedDiv.find('.luggage').val('0');
    //        clonedDiv.find(".special").val('');
    //        clonedDiv.find(".delete-passenger-row-icon").removeClass('empty');
    //        generatePassengerDropdownOptions(allPassengers, clonedDiv.find(".passenger-dropdown"), currentPassengerList);
    //        $(".all-passenger-container").append(clonedDiv);

    //    }

    //    $(".detail-passenger-blk").on("click", ".details-inputs.passenger .delete-passenger-row-icon", function () {
    //        console.log("passenger hub id", $(this).closest(".details-inputs.passenger").attr("passenger-hub-id"));
    //        if ($(this).closest(".details-inputs.passenger").attr("passenger-hub-id")) {
    //            deletedItems.DeletedPassengers.push($(this).closest(".details-inputs.passenger").attr("passenger-hub-id"));
    //        }
    //        $(this).closest(".details-inputs.passenger").remove();
    //    });
    //    // Initialize the dropdown for passenger
    //    $('.delete-link').show();

    //});


    //newTripStep.find(".detail-passenger-blk").on("click", ".details-inputs.passenger .delete-passenger-row-icon", function () {
    //    console.log('deleted passenger', $(this).closest(".details-inputs.passenger").attr("passenger-hub-id"))
    //    if ($(this).closest(".details-inputs.passenger").attr("passenger-hub-id")) {
    //        deletedItems.DeletedPassengers.push($(this).closest(".details-inputs.passenger").attr("passenger-hub-id"));
    //    }
    //    $(this).closest(".details-inputs.passenger").remove();
    //});

    //// Initialize the dropdown for passenger
    //newTripStep.find('.delete-link').show();
    //newTripStep.find(".detail-header").on("click", ".delete-link", function () {
    //    console.log('deleted trip step', $(this).closest(".trip-step-container").attr("trip-step-id"))
    //    if ($(this).closest(".trip-step-container").attr("trip-step-id")) {
    //        deletedItems.DeletedTripSteps.push($(this).closest(".trip-step-container").attr("trip-step-id"));
    //    }
    //    $(this).closest(".trip-step-container").remove();
    //});









    $("#add-step").off("click").on("click", function () {
        console.log("Add step");

        var flag = true;
        var passengersInStep = [];
        var slocation = $('#start-location').val();
        var startLocationId = $('#start-location').attr('data-id');
        var startLocation = allLocation.find(loc => loc.data == startLocationId);

        var elocation = $('#end-location').val();
        var endLocationId = $('#end-location').attr('data-id');
        var endLocation = allLocation.find(loc => loc.data == endLocationId);
        // Validation checks
        if (!$('.start-date').val()) {
            errorToogle(true, $('.start-date'));
            flag = false;
        }
        if (!$('.start-time').val()) {
            errorToogle(true, $('.start-time'));
            flag = false;
        }
        if (!startLocation || slocation !== startLocation.value) {
            errorToogle(true, $('#start-location'));
            flag = false;
        }
        if (!$('.end-date').val()) {
            errorToogle(true, $('.end-date'));
            flag = false;
        }
        if (!$('.end-time').val()) {
            errorToogle(true, $('.end-time'));
            flag = false;
        }
        if (!endLocation || elocation !== endLocation.value) {
            errorToogle(true, $('#end-location'));
            flag = false;
        }
        if ($('#end-location').val() == $('#start-location').val()) {
            alertCustom(2, LocationDropdown);
            flag = false;
        }

        changes = false;
        window.globalChange = changes;
        console.log('tripid-->', tripId);

        var tripStepValues = {};

        // Assigning trip-step-id if available
        if ($('.tab-trip-container').attr('trip-step-id') && modified == 1) {
            tripStepValues['TripStepId'] = $('.tab-trip-container').attr('trip-step-id');
        }

        var startDate = $('.start-date').val();
        var startTime = $('.start-time').val();
        var endDate = $('.end-date').val();
        var endTime = $('.end-time').val();

        var startDatetimeObject = new Date(startDate + 'T' + startTime + 'Z');
        var endDatetimeObject = new Date(endDate + 'T' + endTime + 'Z');

        tripStepValues['StartDateTime'] = startDatetimeObject;
        //tripStepValues['StartLocationId'] = parseInt($(tripStep).find('.start-location').attr('data-id'));
        tripStepValues['StartLocationId'] = parseInt($('#start-location').attr('data-id'));
        tripStepValues['EndDateTime'] = endDatetimeObject;
        tripStepValues['EndlocationId'] = parseInt($('#end-location').attr('data-id'));
        tripStepValues['IsMailRequired'] = $('.is-mail-required').is(":checked");
        tripStepValues['Comment'] = $('.comment').val();
        tripStepValues['ItemsDeleted'] = deletedItems;

        tripStepValues.Passengers = [];
        $('.details-inputs.passenger').each(function (passengerIndex, passenger) {

            var passengerData = {
                PassengerHubId: null,
            };
            if ($(passenger).attr("passenger-hub-id")) {
                passengerData['PassengerHubId'] = $(passenger).attr("passenger-hub-id");
                passengerData['PassengerLuggageId'] = $(passenger).attr("passenger-luggage-id");
            }

            $(passenger).find('input.passenger-dropdown').each(function () {
                if ($(this).val()) {
                    curPassenger = $(this).val();
                    curPassengerId = parseInt($(this).attr('data-id'));
                    let passId = allPassengers.find(pass => pass.data == curPassengerId);

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

                        /*let passengerDataFromList = allPassengersData.find(function (p) {
                            return p.passengerId == pId;
                        });

                        if (passengerDataFromList) {
                            var passengerMobilePhone = passengerDataFromList.mobilePhone ? passengerDataFromList.mobilePhone : null;
                            var passengerPhone = passengerDataFromList.phone ? passengerDataFromList.phone : null;

                            if (!passengerMobilePhone && !passengerPhone) {
                                isMobileAndPhoneMissing = true;
                                mobileMissingPassengersList.push(passengerDataFromList.firstName + ' ' + passengerDataFromList.lastName);
                            }
                        }*/
                    } else {
                        rightInputError(true, this);
                        flag = false;
                    }
                } else {
                    errorToogle(true, this);
                    flag = false;
                }
            });

            passengerData['HandBag'] = $(passenger).find('.handbag').val();
            passengerData['Luggage'] = $(passenger).find('.luggage').val();
            passengerData['Special'] = $(passenger).find('.special').val();

            tripStepValues.Passengers.push(passengerData);

        });
        console.log('data', tripStepValues);
        var strNewTripStepData = JSON.stringify(tripStepValues);
        console.log('str data', strNewTripStepData);
        if (flag) {
            showOverlay();
            $('#add-trip-steps').hide();
            $.ajax({
                url: '/Trips/TripStep',
                method: 'PUT',
                dataType: "json",
                data: { trip: strNewTripStepData, tripId: tripId },
                success: function (data) {
                    console.log('response from api', data);

                    // Clear existing steps and reload trip details
                    $('.trip-steps-container').empty();

                    // Reload trip details
                    loadTripDetails(tripId);

                    // Hide the modal after reloading the trip details
                    $('#add-trip-steps').hide();
                    $('.modal-backdrop').remove();
                    $("body").css("overflow-y", "auto");
                    // Show success message
                    if (modified == 0) {

                        alertCustom(0, AddTripSep);
                    }
                    else {
                        alertCustom(0, ModifyTripStepMessage);
                    }

                    // Clear form fields after successful submission
                    //clearForm();
                },
                error: function (error) {
                    console.error(error);
                },
                complete: function () {
                    hideOverlay();
                }
            });
        }
    });
    $(document).on("input", ".error-check", function () {
        if ($(this).val()) {
            errorToogle(false, this)
        } else {
            errorToogle(true, this)
        }
    });
    //function clearForm() {
    //    $('.start-date').val('');
    //    $('.start-time').val('');
    //    $('#start-location').val('');
    //    $('.end-date').val('');
    //    $('.end-time').val('');
    //    $('#end-location').val('');
    //    $('.is-mail-required').prop('checked', false);
    //    $('.comment').val('');
    //    $('.details-inputs.passenger').each(function () {
    //        $(this).find('select').val('');
    //        $(this).find('.handbag').val('');
    //        $(this).find('.luggage').val('');
    //        $(this).find('.special').val('');
    //    });
    //}


    /*$('.date-time-fields').on('change', '.end-time', function () {
        if ($(this).closest(".trip-step-container").find('.end-date').val() == $(this).closest(".trip-step-container").find('.start-date').val()) {

            var today = new Date().toISOString().split('T')[0];
            var selectedDay = $(this).closest(".trip-step-container").find('.end-date').val()

            var minTime = $(this).closest(".trip-step-container").find('.start-time').val();
            var selectedTime = $(this).val();
            if ((today == selectedDay) && (selectedTime < minTime)) {
                //alertCustom(1, "Please select valid time");
                $(this).val(minTime);
            }
        }
        if ($(this).closest(".trip-step-container").find('.start-date').val() && $(this).closest(".trip-step-container").find('.start-time').val() && $(this).closest(".trip-step-container").find('.end-date').val()) {
            setTripDuration($(this).closest(".trip-step-container"));
        }

    });

    $('.date-time-fields').on('change', '.end-date', function () {
        if ($(this).closest(".trip-step-container").find('.end-time').val() && $(this).closest(".trip-step-container").find('.start-date').val() && $(this).closest(".trip-step-container").find('.start-time').val()) {
            setTripDuration($(this).closest(".trip-step-container"));
        }
    });

    $('.date-time-fields').on('change', '.start-time', function () {

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

    });

    $('.date-time-fields').on('change', '.start-date', function () {
        var startDateValue = $(this).val();
        $(this).closest(".trip-step-container").find('.end-date').attr("min", startDateValue);

        //if ($(this).closest(".trip-step-container").find('.end-date').val() && ($(this).closest(".trip-step-container").find('.end-date').val() > $(this).val())) {
        //    $(this).val($(this).closest(".trip-step-container").find('.end-date').val())
        //}

        console.log('startdate----------------->', startDateValue);
        if ($(this).closest(".trip-step-container").find('.end-date').val() && $(this).closest(".trip-step-container").find('.end-time').val() && $(this).closest(".trip-step-container").find('.start-time').val()) {
            setTripDuration($(this).closest(".trip-step-container"));
        }
    });*/

    $('.duration').on('change', '.duration-days', function () {
        updateEndDateAndTime($(this).closest(".trip-step-container"));
    });

    $('.duration').on('change', '.duration-hours', function () {
        if ($(this).val() > 23) {
            alertCustom(1, ValidateDuration);
        } else {
            updateEndDateAndTime($(this).closest(".trip-step-container"));
        }
    });

    $('.duration').on('change', '.duration-minutes', function () {
        if ($(this).val() > 59) {
            alertCustom(1, ValidateDuration1);
        } else {
            updateEndDateAndTime($(this).closest(".trip-step-container"));
        }
    });

    $('.duration-days').on('input', function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });

    $('.duration-hours').on('input', function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });

    $('.duration-minutes').on('input', function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });


    function generatePassengerDropdownOptions(options, targetElement, exclusionList) {
        // Clear existing options
        $(targetElement).empty();
        console.log($(targetElement));
        // Add a default option
        $(targetElement).append($('<option>', {
            value: '',
            text: Trips,
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
            text: Trips,
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

    $('.back').on('click', function () {
        if (window.globalChange == false) {

            passengerList = [];
            $('#fromDate').val('');
            $('#fromTime').val('');
            $('#toDate').val('');
            $('#toTime').val('');
            $('#transmittedDate').val('');
            $('#flightDate').val('');
            $('#flightTime').val('');

            // Clear other fields
            $('#tripId').val('');
            $('#status').val('');
            $('#flightType').val('');
            $('#flightNumber').val('');
            $('#otherCostCenter').val('');
            $('#otherCostCenter').css({
                'font-weight': '',
                'font-size': ''
            });
            $('#vehiclelist').val('');
            $('#driverInSearch').text('None');
            $('#requestedUserInSearch ').text('');
            $('#informPassenger').prop('checked', false);
            $('#isPrivate').prop('checked', false);
            $('#isVIPtrip').prop('checked', false);
            $('#outOfPolicy').val('');
            $('#predefinedName').val('');
            $('#comment').val('');
            $('#itinerary').val('');
            $('#externalService').val('');
            $('#paymentMode').val('');
            $('#mainPassengerInSearch ').val('');
            $('#mainPassengerInSearch ').css({
                'font-weight': '',
                'font-size': ''
            });

            // Reset trip details header
            $('#tripDetailsHeader').text('Trip Details');

            // Disable fields that were modified
            $("#vehiclelist").prop("disabled", true).css({
                "border": ""
            });
            $("#mainPassengerInSearch ").prop("disabled", true).css({
                "border": ""
            });
            $("#otherCostCenter").prop("disabled", true).css({
                "border": ""
            });
            jQuery("#info-grid").trigger('reloadGrid');
            console.log("Back button clicked, fields cleared!");
        }
    });
    //i icon details modal functionality start


    //driver details i icon start
    const driverPresent = $('#driverInSearch').text();
    handleDriverSearch(driverPresent);

    function handleDriverSearch(driverPresent) {
        if (!driverPresent) {
            console.log('Driver Empty!');
            return;
        }
        $('#driverToolTip').on('click', function () {
            const fullName = $('#driverInSearch').text().trim();

            showModalOverlay();

            $.ajax({
                url: '/ManagerDrivers/GetDriver',
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    const matchedDriver = response.find(driver => {

                        const driverFullName = `${driver.firstName.trim()} ${driver.lastName.trim()}`;
                        return driverFullName === fullName;  // Compare concatenated name with fullName
                    });

                    if (matchedDriver) {
                        const { firstName, lastName, mobilePhone, userId, contactPhone = '', contactPhoneDisplayName = '' } = matchedDriver;
                        getRequestorDetailsForDriver(userId);

                        console.log('Matched Driver:', matchedDriver);

                        $('#LastnameTip').val(lastName);
                        $('#FirstNameTip').val(firstName);
                        $('#MobilePhoneDisplayName').val(mobilePhone);
                        $('#PhoneToolTip').val(contactPhone);
                        $('#ContactPhoneDisplayName').val(contactPhoneDisplayName);

                    } else {
                        console.log('No matching driver found.');
                    }
                },
                error: function (error) {
                    console.error('Error fetching driver details:', error);
                },
                complete: function () {
                    hideModalOverlay();
                }
            });
        });
    }

    //owner email and costCenterCode display function
    function getRequestorDetailsForDriver(requestedUserId) {
        if (!requestedUserId) {
            $('#mainPassengerToolTip').removeAttr('data-bs-toggle').removeAttr('data-bs-target');
            return;
        }
        showModalOverlay();


        $.ajax({
            url: '/ManagerUsers/GetUserById',
            method: 'GET',
            dataType: 'json',
            data: { id: requestedUserId },
            success: function (data) {
                console.log('requestor user details-->', data);
                requestorData = data;

                if (requestorData) {
                    $('#CostcenterTip').val(requestorData.costCenterCode || '');
                    $('#EmailDisplayName').val(requestorData.email || '');
                } else {
                    $('#CostcenterTip').val('');
                    $('#EmailDisplayName').val('');
                }
            },
            error: function (error) {
                console.error('Error:', error);
            },
            complete: function () {
                hideModalOverlay();
            }
        });
    }
    //driver details i icon end 

    //Requestor details i icon start
    $('#requestedUserToolTip').off('click').on('click', function () {
        getRequestorDetails1();
    });

    function getRequestorDetails1() {
        var requestedUser = $('#userIdDetails').val()
        if (!requestedUser) {
            $('#mainPassengerToolTip').removeAttr('data-bs-toggle').removeAttr('data-bs-target');
            return;
        }
        showModalOverlay();

        $.ajax({
            url: '/ManagerUsers/GetUserById',
            method: 'GET',
            dataType: 'json',
            data: { id: requestedUser },
            success: function (data) {
                console.log('requestor user details-->', data);
                requestorData = data;
                $('#LastnameTip').val(requestorData.last_name);
                $('#FirstNameTip').val(requestorData.first_name);
                $('#CostcenterTip').val(requestorData.costCenterCode);
                $('#EmailDisplayName').val(requestorData.email);
                $('#PhoneToolTip').val(requestorData.phone || '');
                $('#MobilePhoneDisplayName').val(requestorData.mobile_phone || '');
                $('#ContactPhoneDisplayName').val(requestorData.contact_phone || '');
                $('#mainPassengerToolTip').attr('data-bs-toggle', 'modal').attr('data-bs-target', '#searchPopUp');
            },
            error: function (error) {
                console.error('API request failed:', error);
            },
            complete: function () {
                hideModalOverlay();
            }
        });
    }
    //Requestor details i icon end 

    //Passenger details i icon start
    // Function to fetch passenger details by ID
    function getDetails(id) {
        /*toggleModalOverlay(true);*/
        showModalOverlay();

        $.ajax({
            url: '/ManagerPassengers/GetPassengersByID',
            method: 'GET',
            data: { id: id },
            success: function (response) {
                if (response && response.length > 0) {
                    const passenger = response[0];

                    // Populate form fields with passenger details
                    $('#LastnameTip').val(passenger.lastName);
                    $('#FirstNameTip').val(passenger.firstName);
                    $('#EmailDisplayName').val(passenger.email);
                    $('#PhoneToolTip').val(passenger.telePhone);
                    $('#ContactPhoneDisplayName').val(passenger.contactPhone);
                    $('#MobilePhoneDisplayName').val(passenger.mobilePhone);

                    console.log('Passenger details loaded:', passenger);
                } else {
                    console.log('No passenger data found for the given ID.', passenger);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error fetching passenger data:", errorThrown);
            },
            complete: function () {
                hideModalOverlay();
            }
        });
    }


    $('#mainPassengerToolTip').click(function () {
        const selectedValue = $('#mainPassengerInSearch').val();

        console.log('Selected main passenger ID:', selectedValue);

        if (!selectedValue) {

            $(this).removeAttr('data-bs-toggle data-bs-target');
        } else {

            $(this).attr('data-bs-toggle', 'modal').attr('data-bs-target', '#searchPopUp');
            getDetails(selectedValue);
        }
    });
    //Passenger  details i icon end

    //clear all modal fields function
    $('#searchPopUp').on('hide.bs.modal', function () {
        $('#LastnameTip').val('');
        $('#FirstNameTip').val('');
        $('#CostcenterTip').val('');
        $('#EmailDisplayName').val('');
        $('#PhoneToolTip').val('');
        $('#ContactPhoneDisplayName').val('');
        $('#MobilePhoneDisplayName').val('');
    });

    function showModalOverlay() {
        document.getElementById('modalOverlay').style.display = 'flex';
    }
    function hideModalOverlay() {
        document.getElementById('modalOverlay').style.display = 'none';
    }
    //i icon details modal end
    const showConfirmPopup1 = (textValue) => {
        $('#confirm-popup1').find("#popup-body").text(textValue);
        $('#confirm-popup1').modal('show');
    }
    /*  document.addEventListener('click', () => {
          rightclick = false;
      });*/
    const hideConfirmPopup1 = () => {
        $('#confirm-popup1').modal('hide');
        return;
    }
    $("#trip-filter-close").off("click").on("click", function () {
        //showConfirmPopup()
        $(".add-new-trip-step").hide();
        $(".modal-backdrop").hide();
        if (changes == true) {
            showConfirmPopup1(TripsCancelConfirmMessage);
            $('#confirm-button1').off('click').on('click', function () {
                changes = false;
                window.globalChange = changes;
                //clearAll();
                $(".add-new-trip-step").hide();
                $(".modal-backdrop").hide();
                hideConfirmPopup1();
            });
            $('#cancel-button1').off('click').on('click', function () {
                /* changes = false;
                 window.globalChange = changes;*/
                //clearAll();
                $(".add-new-trip-step").show();
                $(".modal-backdrop").show();
                hideConfirmPopup1();
            });
        }
        else {
            //clearAll();

            $(".add-new-trip-step").hide();
            $(".modal-backdrop").hide();
        }
    })
});
function showToast(message) {
    // If the message already exists, remove it
    if ($('#custom-toast').length) {
        $('#custom-toast').remove();
    }

    // Create the message element inside the grid and center it
    var $grid = $("#search-grid");  // Assuming this is your grid's ID
    $grid.parent().append(`
      <div id="custom-toast"  class="toastMessage">
            ${message}
        </div>
    `);
}

