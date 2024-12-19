$(document).ready(function () {

    //Displaying records in grid
    var AccessLevel;
    var Login;
    var userAccessLevel;
    var TripsCancelConfirmMessage;
    var changes = false;
    $('.admin-input-change').on('change', function () {
        changes = true;
        window.globalChange = changes;
    });
    function sendaccess(num) {
        if (num === 1) return "Yes";
        else return "No";
    }
    function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
    }

    // Function to hide the overlay
    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }
    const showConfirmPopup = (textValue) => {
        $('#confirm-popup').find("#popup-body").text(textValue);
        $('#confirm-popup').modal('show');
    }

    const hideConfirmPopup = () => {
        $('#confirm-popup').modal('hide');
    }
    $.ajax({
        url: '/Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("language translation data", data);

            AccessLevel = data.AccessLevelDisplayName;
            Login = data.Login;
            userAccessLevel = data.UserDopdown;
            TripsCancelConfirmMessage = data.TripsCancelConfirmMessage

            showOverlay()
            $.ajax({
                url: 'ManagerUsers/GetUsers',
                method: 'GET',
                success: function (data) {
                    $("#passanger-grid").jqGrid('clearGridData');
                    var mydata = [];
                    mydata = data.map(function (item) {
                        // console.log(item);
                        return {

                            Id: item.userId,
                            //FirstName: item.first_name,
                            // LastName: item.Last_name,
                            Login: item.userName,
                            //Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                            //Telephone: item.telePhone,
                            // Email: item.email,
                            //PassengerId: item.passengerId,
                            AccessLevel: item.accessLevel,
                            SendAlert: item.send_alert,
                            SendAlertWeekend: item.send_alert_during_weekend,
                            ModificationDate: item.time_stamp,
                            ModifiedBy: item.modified_by,
                            /*MobilePhone: item.mobilePhone,
                            ContactPhone: item.contactPhone,
                            Comment: item.comment,
                            OwnerUserId: item.ownerUserId,
                            Valid: item.valid,
                            IsVip: item.isVip,*/
                        };

                    }); // Close the map function here
                    //console.log(mydata);
                    // Initialize the grid with new data
                    var $grid = $("#passanger-grid"),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();

                    // Set the grid width
                    $grid.jqGrid("setGridWidth", newWidth, true);

                    jQuery("#passanger-grid").jqGrid({
                        data: mydata,
                        datatype: "local",
                        colNames: [Login, AccessLevel, 'Id', 'SendAlert', 'SendAlertWeekend', 'ModificationDate', 'ModifiedBy'],
                        colModel: [
                            { name: 'Login', index: 'Login', width: 150, align: 'left' },
                            { name: 'AccessLevel', index: 'AccessLevel', width: 80, align: 'left' },

                            { name: 'Id', index: 'Id', hidden: true },
                            { name: 'SendAlert', index: 'SendAlert', hidden: true },
                            { name: 'SendAlertWeekend', index: 'SendAlertWeekend', hidden: true },
                            { name: 'ModificationDate', index: 'ModificationDate', hidden: true },
                            { name: 'ModifiedBy', index: 'ModifiedBy', hidden: true },
                            /*{ name: 'IsAuthorized', index: 'IsAuthorized', hidden: true },
                            { name: 'IsPrivate', index: 'IsPrivate', hidden: true },
                            { name: 'IsEditable', index: 'IsEditable', hidden: true },
                            { name: 'MobilePhone', index: 'MobilePhone', hidden: true },
                            { name: 'ContactPhone', index: 'ContactPhone', hidden: true },
                            { name: 'Comment', index: 'Comment', hidden: true },
                            { name: 'OwnerUserId', index: 'OwnerUserId', hidden: true },
                            { name: 'Valid', index: 'Valid', hidden: true },
                            { name: 'IsVip', index: 'IsVip', hidden: true },*/
                        ],
                        // pager: "#pager",
                        editable: true,
                        viewrecords: true,
                        autowidth: false,
                        scrollrow: true,
                        height: "calc(100vh - 254px)",
                        altRows: true,
                        altclass: 'myAltClass',
                        multiselect: false,
                        resizable: false,
                    });

                    //On row select open edit form
                    $("#passanger-grid").off("click", "tr").on("click", "tr", function (event) {
                        event.stopPropagation();
                        $(".box-container-blk").show();

                        var rowData = {};
                        var rowData = $(this).closest("tr").find("td").map(function () {
                            return $(this).text();
                        }).get();
                        console.log(rowData);
                        var UserId = rowData[2];
                        getUserById(UserId);
                    });
                    hideOverlay();
                    // Attach click event handler to delete buttons
                    /* $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                         event.stopPropagation();
                         var rowData = {};
                         rowData = $(this).closest("tr").find("td").map(function () {
                             return $(this).text();
                         }).get();
                         var passengerId = rowData[5];
                         deletePassenger(passengerId);
                     });*/
                },
                error: function (error) {
                    alert(JSON.stringify(error));
                    console.error('Error fetching data:', error);
                }
            });

        },
        error: function () {
            console.error("Error fetching localization data.");
        }
    });

   
    function refreshGrid() {
        showOverlay();
        $.ajax({
            url: 'ManagerUsers/GetUsers',
            method: 'GET',
            success: function (data) {
                $("#passanger-grid").jqGrid('clearGridData');
                var mydata = [];
                mydata = data.map(function (item) {
                    // console.log(item);
                    return {
                        Id: item.userId,
                        //FirstName: item.first_name,
                        // LastName: item.Last_name,
                        Login: item.userName,
                        //Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        //Telephone: item.telePhone,
                        // Email: item.email,
                        //PassengerId: item.passengerId,
                        AccessLevel: item.accessLevel,
                        SendAlert: item.send_alert,
                        SendAlertWeekend: item.send_alert_during_weekend,
                        ModificationDate: item.time_stamp,
                        ModifiedBy: item.modified_by,
                        /*MobilePhone: item.mobilePhone,
                        ContactPhone: item.contactPhone,
                        Comment: item.comment,
                        OwnerUserId: item.ownerUserId,
                        Valid: item.valid,
                        IsVip: item.isVip,*/
                    };

                }); //
                var $grid = $("#passanger-grid");
                $grid.jqGrid('clearGridData');
                $grid.jqGrid('setGridParam', {
                    datatype: 'local',
                    data: mydata
                }).trigger("reloadGrid");
                hideOverlay();
                //On row select open edit form
                /*$("#passanger-grid").off("click", "tr").on("click", "tr", function (event) {
                    event.stopPropagation();
                    $(".box-container-blk").show();

                    var rowData = {};
                    var rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    console.log(rowData);
                    var UserId = rowData[2];
                    getUserById(UserId);
                });*/
            },
                error: function (error) {
                    alert('Error : ' + JSON.stringify(error));
                    console.error('Error fetching data:', JSON.stringify(error));
                }
            });
    }

   
    
    $(document).on("keyup", '#gsearch', function () {
        // Clear the content of the Passenger-grid

        var inputString = $('#gsearch').val();
        showOverlay();
        $.ajax({
            url: '/ManagerUsers/SearchUsers',
            method: 'GET',
            data: { searchString: inputString },
            success: function (data) {
                // Mapping data to mydata
                var mydata = null;
                var mydata = data.map(function (item) {
                    return {
                        Id: item.userId,
                        Login: item.userName,
                        AccessLevel: item.accessLevel,
                        SendAlert: item.send_alert,
                        SendAlertWeekend: item.send_alert_during_weekend,
                        ModificationDate: item.time_stamp,
                        ModifiedBy: item.modified_by,

                    };
                }); // Close the map function here
                console.log(mydata);
                // Clear and reload the grid with the filtered data
                var $grid = $("#passanger-grid");
                $grid.jqGrid('clearGridData');
                $grid.jqGrid('setGridParam', {
                    datatype: 'local',
                    data: mydata
                }).trigger("reloadGrid");
                hideOverlay();
            },
            error: function (error) {
                alert('Error : ' + JSON.stringify(error));
                console.error('Error fetching data:', JSON.stringify(error));
            }
        });

    });
    $(document).on("input", '#gsearch', function () {
        if ($('#gsearch').val() === '') {
            refreshGrid();
        }
    });
    function formatTime(datetimeStr) {
        if (!datetimeStr) return '';
        const date = new Date(datetimeStr);
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    //Displaying records in form for editing the record
    function getUserById(UserId) {
        showOverlay();
        $.ajax({
            url: 'ManagerUsers/GetUserByID',
            method: 'GET',
            data: { id: UserId },
            success: function (obj) {

               console.log(obj);
                if (obj.send_alert_from) {
                    const fromTime = formatTime(obj.send_alert_from);
                    $('#fromTime').val(fromTime);
                }
                if (obj.send_alert_to) {
                    const toTime = formatTime(obj.send_alert_to);
                    $('#toTime').val(toTime);
                }
                    $('#textUserId').val(obj.userId);
                    //$('#textEmployeeId').val(obj.employeeId);
                   // $('#textLastName').val(obj.lastName);
                    $('#textLoginName').val(obj.userName);
                    //$('#textOwnerId').val(obj.ownerUserId);
                    //$('#textValid').val(obj.valid);
                   // $('#textAuthorised').val(obj.isAuthorized);
                //$('#textIsEdit').val(obj.isEditable);

                $('#textAccessLevel').val(obj.accessLevel);
               // $('#textSendAlert').val(obj.send_alert);
                    $('#textSendAlertWeekend').val(obj.send_alert_during_weekend);
                    //$('#textEmail').val(obj.email);
                    //$('#textTelePhone').val(obj.telePhone);
                    //$('#textContactNumber').val(obj.contactPhone);
                    //$('#textMobileNumber').val(obj.mobilePhone);
                    //$('#textComment').val(obj.comment);
                //$('#textCreatedBy').val(obj.createdBy);
                    var simpleDate = new Date(obj.time_stamp).toLocaleString();
                    $('#textTimeStamp').val(simpleDate);
                    $('#textModifiedBy').val(obj.modified_by);

                    //modifiedDetails('Edit');
                getAccessLevel(obj.accessLevel);
                populateSelect(obj.send_alert, 'textSendAlert');
                hideOverlay();
                   /* selectOwnerById(obj.ownerUserId, 'textOwnerId');
                    populateSelect(obj.valid, 'textValid');
                    populateSelect(obj.isAuthorized, 'textAuthorised');
                    populateSelect(obj.isEditable, 'textIsEdit');
                    populateSelect(obj.isPrivate, 'textIsPrivate');
                    populateSelect(obj.isVip, 'textVip');*/

                 // Closing each loop
            },
            error: function (error) {
                alert(JSON.stringify(error));
                console.error('Error fetching data:', error);
            }

        });
    }
    function populateSelect(id, targetElementId) {
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

                $.each(optionsData, function (index, option) {
                    var $option = $('<option>', {
                        value: option.value,
                        text: option.text // Evaluate the localized text dynamically
                    });
                    // Set the selected property based on the comparison with id
                    $option.prop('selected', option.value === id);

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
   
    function getAccessLevel(id) {
        $.ajax({
            url: '/Home/GetAccessLevels',
            method: 'GET',
            success: function (data) {
                var optionsData = [
                    { value: 0, text: userAccessLevel },
                    { value: 1, text: data.labelRequester },
                    { value: 2, text: data.labelRequesterPassengerManagement },
                    { value: 3, text: data.labelDriver },
                    { value: 4, text: data.labelManagerBackup },
                    { value: 5, text: data.labelManager },
                    { value: 6, text: data.labelSupervisor }
                ]; // Array to store opt"ion values and text

                var $select = $("#textAccessLevel");
                $select.empty(); // Clear existing options

                $.each(optionsData, function (index, option) {
                    var $option = $('<option>', {
                        value: option.value,
                        text: option.text
                    });
                    // Set the selected property based on the comparison with id
                    $option.prop('selected', option.value === id);

                    // Append the option to the select element
                    $select.append($option);
                });
            },
            error: function (error) {
                alert('Error : ' + JSON.stringify(error));
                console.error('Error fetching data:', JSON.stringify(error));
            }
        });
    }
    //Insert/Update operations starts
    $("#enregisterBtn").on("click", function (event) {
        // Run validation and proceed only if it's successful
        if (!validateTimes()) {
            return; // Exit the function if validation fails
        }

        var userId = $("#textUserId").val();
        if (userId > 0 && userId != null) {
            

            $('#alert-update-popup').modal('show');
            // Handle the confirmation action
            $('#btnUpdateConfirm').off('click').on('click', function () {
                changes = false;
                window.globalChange = changes;
                updateUser();
                $(".box-container-blk").hide();
            });
        } else {
            $('#alert-insert-popup').modal('show');
            // Handle the confirmation action
            $('#btnInsertConfirm').off('click').on('click', function () {
                changes = false;
                window.globalChange = changes;
                updateUser();
                $(".box-container-blk").hide();
            });
        }
    });
    function restrictInput(event) {
        const key = event.key;
        // Allow control keys and numbers or colon
        if (['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter', 'Home', 'End'].includes(key) ||
            (key >= '0' && key <= '9') || key === ':') {
            return; // Allow this keypress
        }
        // Prevent input of any other keys
        event.preventDefault();
    }

    // Function to validate the time inputs
    function validateTimes() {
        const fromTimeInput = $('#fromTime');
        const toTimeInput = $('#toTime');
        const fromTimeValue = fromTimeInput.val();
        const toTimeValue = toTimeInput.val();

        function timeToMinutes(timeStr) {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return (hours * 60) + minutes;
        }

        function isValidTime(timeStr) {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return (hours >= 0 && hours < 24) && (minutes >= 0 && minutes < 60);
        }

        let isValid = true;

        // Helper function to set error styles
        function setError(input, message) {
            input.css('border', '1px solid #ff0000');
            input.attr('title', message);
            isValid = false;
        }

        // Helper function to remove error styles
        function removeError(input) {
            input.css('border', '1px solid #cacccf');
            input.removeAttr('title');
        }

        // Check if one of the time fields is filled and the other is not
        if ((fromTimeValue && !toTimeValue) || (!fromTimeValue && toTimeValue)) {
            if (fromTimeValue && !toTimeValue) {
                setError(toTimeInput, 'Both "from" and "to" times must be provided.');
            }
            if (!fromTimeValue && toTimeValue) {
                setError(fromTimeInput, 'Both "from" and "to" times must be provided.');
            }
        } else {
            // Validate fromTime
            if (fromTimeValue) {
                if (!/^\d{2}:\d{2}$/.test(fromTimeValue)) {
                    setError(fromTimeInput, 'Invalid "from" time format! Use HH:MM.');
                } else if (!isValidTime(fromTimeValue)) {
                    setError(fromTimeInput, '"From" time must be between 00:00 and 23:59.');
                } else {
                    removeError(fromTimeInput);
                }
            }

            // Validate toTime
            if (toTimeValue) {
                if (!/^\d{2}:\d{2}$/.test(toTimeValue)) {
                    setError(toTimeInput, 'Invalid "to" time format! Use HH:MM.');
                } else if (!isValidTime(toTimeValue)) {
                    setError(toTimeInput, '"To" time must be between 00:00 and 23:59.');
                } else {
                    removeError(toTimeInput);
                }
            }
        }

        return isValid;
    }

    function getcurrentdate() {
        var today = new Date();
        var year = today.getFullYear();
        var month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        var day = String(today.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
    }

    // Function to combine current date with time
    function combineDateAndTime(timeStr) {
        if (!timeStr) return '';
        var currentDate = getcurrentdate();
        return currentDate + 'T' + timeStr + ':00'; // Combine date and time into ISO 8601 format
    }
    // Add event listeners for keypress to restrict input
    $('#fromTime').on('keypress', restrictInput);
    $('#toTime').on('keypress', restrictInput);

    function updateUser() {
        var fromTime = $('#fromTime').val();
        var toTime = $('#toTime').val();

        var fromDateTime = null;
        var toDateTime = null;
        if (fromTime) {
            fromDateTime = combineDateAndTime(fromTime);
        }
        if (toTime) {
            toDateTime = combineDateAndTime(toTime);
        }
            var dataToSend = {
                userId: parseInt($('#textUserId').val()),
                //employeeId: parseInt($('#textEmployeeId').val()),
                //firstName: $('#textFirstName').val(),
                userName: $('#textLoginName').val(),
               // email: $('#textEmail').val(),
               // telePhone: $('#textTelePhone').val(),
               // mobilePhone: $('#textMobileNumber').val(),
               // contactPhone: $('#textContactNumber').val(),
               // isAuthorized: parseInt($('#textAuthorised').val()),
                // isPrivate: parseInt($('#textIsPrivate').val()),
                sendAlertFrom: fromDateTime,
                sendAlertTo: toDateTime,
                accessLevel: parseInt($('#textAccessLevel').val()),
                sendAlert: parseInt($('#textSendAlert').val()),
                sendAlertWeekend: $('#textSendAlertWeekend').val(),
                modifiedBy: $('#textModifiedBy').val(),
                /*ownerUserId: parseInt($('#textOwnerId').val()),
                valid: parseInt($('#textValid').val()),
                isVip: parseInt($('#textVip').val()),
                createdBy: $('#textCreatedBy').val(),*/
                timeStamp: $('#textTimeStamp').val()

            };
            $.ajax({
                url: 'ManagerUsers/EditUser',
                method: 'POST',
                data: dataToSend,
                success: function (response) {
                    console.log(JSON.stringify(response));
                    // alert('User updated successfully!');
                    if (response == 'Same User') {
                        setTimeout(function () {
                            window.location = '/Home/LogOut';
                        }, 1000);
                    } else {
                        location.reload();
                    }
                    
                },
                error: function (error) {
                    alert(JSON.stringify(error));
                    console.error('Error fetching data:', error);
                }
            });
        
    }
    /*$("#addPassengerBtn").on("click", function () {
        //$(".box-container-blk").hide();
        clearAll();

        $(".box-container-blk").show();
    });*/
    function clearAll() {
        $('#textUserId').val('');
        //$('#textEmployeeId').val(obj.employeeId);
        // $('#textLastName').val(obj.lastName);
        $('#textLoginName').val('');
        //$('#textOwnerId').val(obj.ownerUserId);
        //$('#textValid').val(obj.valid);
        // $('#textAuthorised').val(obj.isAuthorized);
        //$('#textIsEdit').val(obj.isEditable);
        $("#fromTime").val(null);
        ("#toTime").val(null);
        $('#textAccessLevel').val(0);
        $('#textSendAlert').val(sendaccess(0));
        $('#textSendAlertWeekend').val(0);
        //$('#textEmail').val(obj.email);
        //$('#textTelePhone').val(obj.telePhone);
        //$('#textContactNumber').val(obj.contactPhone);
        //$('#textMobileNumber').val(obj.mobilePhone);
        //$('#textComment').val(obj.comment);
        //$('#textCreatedBy').val(obj.createdBy);
        
        $('#textTimeStamp').val('');
        $('#textModifiedBy').val('');

        //modifiedDetails('Edit');
       getAccessLevel(0);

    }
    $("#resetBtn").on("click", function () {
        if (changes == true) {
            showConfirmPopup(TripsCancelConfirmMessage);
            $('#confirm-button').click(function () {
                changes = false;
                window.globalChange = changes;
                clearAll();
                $(".box-container-blk").hide();
                hideConfirmPopup();
            });
        }
        else {
            clearAll();
            $(".box-container-blk").hide();
        }
        /*clearAll();
        $(".box-container-blk").hide();*/
    })
   
})

