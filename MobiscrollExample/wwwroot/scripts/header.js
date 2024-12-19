$(document).ready(function () {

    var HeaderPopup;
    var HeaderPopup1;
    var TripsCancelConfirmMessage;
    $.ajax({
        url: '/Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("language translation data", data);
            TripsCancelConfirmMessage = data.TripsCancelConfirmMessage
            sessionStorage.setItem('tripConfirmMessage', TripsCancelConfirmMessage);
            HeaderPopup = data.HeaderPopup;
            HeaderPopup1 = data.HeaderPopup1;
        },
        error: function () {
            console.error("Error fetching localization data.");
        }
    });
    const showConfirmPopup = (textValue) => {
        $('#confirm-popup').find("#popup-body").text(textValue);
        $('#confirm-popup').modal('show');
    }

    const hideConfirmPopup = () => {
        $('#confirm-popup').modal('hide');
    }
    console.log("getuser type");
    var languageId = $("#languageId").val();
    var userId = 801;
    $("#sort-button").attr('title', 'Alphabetical'); 
    var urlMappings = {
        //href="@Url.Action("ManagerDashboard", "Trips")"
        "mnuTripPlanning":'/Trips/ManagerDashboard',
        "mnuAdminPassenger": '/ManagerPassengers',
        "mnuAdminDrivers": '/ManagerDrivers',
        "mnuAdminExternalServices": '/ManagerExternalService',
        "mnuAdminUsers": '/ManagerUsers',
        "mnuAdminVehicle": '/Vehicle',
        "mnuAdminLocations": '/ManagerEmplacements',
        "mnuAdminEventKind": '/ManagerEvents',
        "mnuAdminSyncPassengers": '#', // Special case: opens a modal
        "mnuAdminParameters": '/Parameter',
        "mnuAdminManageAccess": '/ManageAccess'
       
    };
    var modalTargetMappings = {
        'mnuReportWorkReport': '#driverWorkReport',
        'mnuReportNightSunday': '#weekendReport',
        'mnuReportOvertime': '#overTimeReport',
        'mnuJourneyReport': '#journeyReport',
        'mnuReportDashboard': '#tableu-de-board',
    };
    $('.check-changes').on('click', function (event) {
        //event.preventDefault(); // Prevent default anchor behavior
        var linkId = $(this).attr('id');
        var url = urlMappings[linkId];
        var target = modalTargetMappings[linkId];
        if (window.globalChange == true) {
            showConfirmPopup(TripsCancelConfirmMessage);
           

            // Check if URL is not empty or undefined
            if (url) {
                /* if ($(this).data('bs-toggle') === 'modal') {
                     // Special case for modal
                     // No need to handle URL, just show the modal
                     return; // Do nothing as modal is already handled via data-bs-toggle
                 }*/

                $('#confirm-button').click(function () {
                    changes = false;
                    window.globalChange = changes;
                   
                    window.location.href = url; // Redirect to the URL
                        
                    hideConfirmPopup();
                });
            }
            else if (target) {
                // Handle showing modals
                var $modal = $(target);

                if ($modal.length) {
                    $('#confirm-button').click(function () {
                        changes = false;
                        window.globalChange = changes;

                       

                        hideConfirmPopup();
                        var modal = new bootstrap.Modal($modal[0]);
                        modal.show();
                    });
                    
                } else {
                    console.error('Modal not found for target:', target);
                }
            }
            else {
                console.error('No URL mapping found for link ID:', linkId);
            }
        }
        else {
            if (target) {
                var $modal = $(target);

                if ($modal.length) {
                    var modal = new bootstrap.Modal($modal[0]);
                    modal.show();
                } else {
                    console.error('Modal not found for target:', target);
                }
                
            }
            else {

                window.location.href = url; // Redirect to the URL
            }
        }
    });
    /*$(document).on('click', '#getUserType', function () {
        console.log("getuser type");
        var languageId = $("#languageId").val();
        var userId = $("#userId").val();
        
        $.ajax({
            type: "POST",
            url: "/Home/UpdateUserType",
            data: { "UserId": userId, "LanguageId": languageId, "UserType": "Admin" },
            dataType: "json",
            success: function (response) {
                if (response.userType == 'Client') {
                    location = '/';
                } else {
                    location = '/Trips/ManagerDashboard';
                }               
                
            },
            error: function (error) {

                //alert(JSON.stringify(error));
                console.error("Error updating user type", error);
            }
        });
    });*/

   /* $(document).on('click', '#AppLogo', function () {
        console.log("getuser type");
        8
        $.ajax({
            type: "POST",
            url: "/Home/UserType",
            data: { "UserType": "Admin" },
            dataType: "json",
            success: function (response) {
                if (response == 'Client') {
                    window.location.href = '/';
                } else {
                    window.location.href = '/Trips/ManagerDashboard';
                }
                console.log(response);
            },
        });
    });*/
    //$(document).on('click', '#AppLogo', function () {
    //    window.location = '/Trips';
    //});
    //$(document).on('click', '#AppLogo', function () {
    //    window.location = 'Trips/Notimplemented';
    //});

    $(document).on('click', '#logout', function () {
        window.location = '/Home/LogOut';
    });

    function confirmPopupShow(textValue) {
        $('#confirm-popup').find("#popup-body").text(textValue);
        $('#confirm-popup').modal('show');
    }



    var originalDivHtml;
    $("#sort-button").attr('title', 'Alphabetical');
    $("#sort-button").on("click", function () {
        var id = $(this).data('id');

        if (id == 1) {
            // Save the original HTML of the div including the current state
            originalDivHtml = $('.combined-info-col-container').clone(true,true);

            // Perform the sorting operation
            var combinedInfoColContainer = $('<div class="combined-info-col-container"></div>');
            var infoColPairs = [];

            // Iterate through each accordion item and collect the info-col elements
            $('.accordion-item').each(function () {
                var infoCols = $(this).find('.info-col');
                infoCols.each(function () {
                    var spanText = $(this).find('.info-left span').first().text().trim().toLowerCase();
                    var inputValue = $(this).find('.info-right input, .info-right select').val();
                    infoColPairs.push({ spanText: spanText, value: inputValue, element: $(this).clone(true, true) });
                });
            });

            //console.log("key value pairs--->", infoColPairs);

            // Empty the current .passanger-info-list
            $('.passanger-info-list').empty();

            // Sort the infoColPairs based on spanText
            infoColPairs.sort(function (a, b) {
                return a.spanText.localeCompare(b.spanText);
            });

            // Remove duplicates and keep unique sorted info-col elements
            var uniqueInfoCols = [];
            var seenTexts = new Set();
            $.each(infoColPairs, function (index, infoColPair) {
                if (!seenTexts.has(infoColPair.spanText)) {
                    uniqueInfoCols.push(infoColPair.element);
                    seenTexts.add(infoColPair.spanText);
                }
            });

            // Clear the container and re-append the unique sorted info-col elements
            combinedInfoColContainer.empty();
            $.each(uniqueInfoCols, function (index, infoCol) {
                combinedInfoColContainer.append(infoCol);
            });

            combinedInfoColContainer.children('.info-col').each(function () {
                var spanText = $(this).find('.info-left span').first().text().trim().toLowerCase();
                var matchingPair = infoColPairs.find(pair => pair.spanText === spanText);
                if (matchingPair) {
                    $(this).find('.info-right input, .info-right select').val(matchingPair.value);
                }
            });

            // Append the combinedInfoColContainer to .passanger-info-list
            $('.passanger-info-list').append(combinedInfoColContainer);

            // Update the data-id to 2 after sorting
            $(this).data('id', 2);
            $(this).attr('title', 'Categorized');
        } else {

            var infoColPairs = [];

            $('.combined-info-col-container').find('.info-col').each(function () {
                var spanText = $(this).find('.info-left span').first().text().trim();
                var inputValue = $(this).find('.info-right input, .info-right select').val();
                infoColPairs.push({ spanText: spanText, value: inputValue });
            });

            //console.log("key value pairs--->", infoColPairs);

            $('.passanger-info-list').empty();

            
            originalDivHtml.find('.info-col').each(function () {
                var spanText = $(this).find('.info-left span').first().text().trim();
                var inputValue = '';

                // Find the corresponding value in the key-value pair
                var pair = infoColPairs.find(pair => pair.spanText === spanText);
                if (pair) {
                    inputValue = pair.value;
                }

                // Set the value of the input/select in the .info-right based on the key-value pair
                $(this).find('.info-right input, .info-right select').val(inputValue);
            });


            $('.passanger-info-list').append(originalDivHtml);


            $(this).data('id', 1);
            $(this).attr('title', 'Alphabetical');
        }
    });

    function getSpanText(element) {
        return $(element).find('.info-left span').first().text().trim();
    }


    $('.dropdown-item').on('click', function () {
        var lang = $(this).data('id');

        var path = window.location.pathname.split("/").pop();
        console.log("current path----->", path);


        var isValidationActive = $("#mnuTripValidation").closest('li').hasClass('main-active');
        

        if (path == 'Trip') {
            confirmPopupShow(HeaderPopup1);

            $('#confirm-button').one('click', function () {
                changeLanguage(lang);
            });
        } else if (path == 'ManagerDashboard' && !isValidationActive) {

            confirmPopupShow(HeaderPopup);

            $('#confirm-button').one('click', function () {
                changeLanguage(lang);
            });
        } else {
            changeLanguage(lang);
        }       
        

    });

    function changeLanguage(lang) {
        $.ajax({
            type: "POST",
            url: "/Home/ChangeLanguage",
            data: { culture: lang },
            dataType: "json",
            success: function (response) {
                if (response.success && response.redirectUrl) {
                    // Redirect to the new URL provided by the server
                    window.location.href = response.redirectUrl;
                } else {
                    console.log("Error: Could not change language or no redirect URL provided");
                }
            },
            error: function (error) {
                console.log("Error changing language", error);
            }
        });
    }
});