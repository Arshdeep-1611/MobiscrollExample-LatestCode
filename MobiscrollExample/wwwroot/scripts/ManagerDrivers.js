$(document).ready(function () {

    //Displaying records in grid
    function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
    }
    var changes = false;
    var TripsCancelConfirmMessage;
    // Function to hide the overlay
    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }
    $('.admin-input-change').on('change', function () {
        changes = true;
        window.globalChange = changes;
    });
    const showConfirmPopup = (textValue) => {
        $('#confirm-popup').find("#popup-body").text(textValue);
        $('#confirm-popup').modal('show');
    }

    const hideConfirmPopup = () => {
        $('#confirm-popup').modal('hide');
    }
    function selectOwnerById(selectId, id) {
        // Find the select element
        var $select = $(selectId);

        // Iterate through options to find the matching id
        $select.find('option').each(function () {
            if ($(this).val() == id) {
                // Select the option
                $(this).prop('selected', true);
            } else {
                // Deselect other options
                $(this).prop('selected', false);
            }
        });
    }

    var FirstNameName;
    var LastNameName;
    var Vehicle;
    var ValidateFields;

    $.ajax({
        url: '/Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("language translation data", data);

            FirstNameName = data.FirstNameName;
            LastNameName = data.LastNameName;
            Vehicle = data.VehicleDropdown;
            ValidateFields = data.ValidateFields;
            TripsCancelConfirmMessage = data.TripsCancelConfirmMessage

            showOverlay();
            $.ajax({
                url: 'ManagerDrivers/GetDriver',
                method: 'GET',
                success: function (data) {
                    console.log(data);
                    $("#passanger-grid").jqGrid('clearGridData');
                    var mydata = null;
                    mydata = data.map(function (item) {
                        return {
                            lastName: item.lastName,
                            firstName: item.firstName,
                            Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                            mobilePhone: item.mobilePhone,
                            driverId: item.driverId,
                            userId: item.userId,
                            weeklyWorkingHours: item.weeklyWorkingHours,
                            VehicleName: item.VehicleName,
                            isValid: item.isValid,
                            unAssignedWarningHours: item.unAssignedWarningHours,
                            unConfirmedWarningHours: item.unConfirmedWarningHours,
                            defaultVehicleId: item.defaultVehicleId
                        };

                    }); // Close the map function here

                    // Initialize the grid with new data
                    var $grid = $("#passanger-grid"),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();

                    // Set the grid width
                    $grid.jqGrid("setGridWidth", newWidth, true);

                    jQuery("#passanger-grid").jqGrid({
                        data: mydata,
                        datatype: "local",
                        colNames: [LastNameName, FirstNameName, '<div style="text-align: center;">Action(s)</div>', 'MobilePhone', 'DriverId', 'Owner ', 'WeeklyWorkingHours', 'IsValid', 'UnAssignedWarningHours', 'UnConfirmedWarningHours', 'DefaultVehicleId'],
                        colModel: [
                            { name: 'lastName', index: 'lastName', width: 50, align: 'left' },
                            { name: 'firstName', index: 'firstName', width: 50, align: 'left' },
                            { name: 'Action', index: 'Action', width: 30, align: 'center' },

                            { name: 'mobilePhone', index: 'mobilePhone', hidden: true },
                            { name: 'driverId', index: 'driverId', hidden: true },
                            { name: 'userId', index: 'userId', hidden: true },
                            { name: 'weeklyWorkingHours', index: 'weeklyWorkingHours', hidden: true },
                            { name: 'isValid', index: 'isValid', hidden: true },
                            { name: 'unAssignedWarningHours', index: 'unAssignedWarningHours', hidden: true },
                            { name: 'unConfirmedWarningHours', index: 'unConfirmedWarningHours', hidden: true },
                            { name: 'defaultVehicleId', index: 'defaultVehicleId', hidden: true }

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
                        $("input").css('border', '1px solid #cacccf');
                        $(".box-container-blk").show();

                        var rowData = {};
                        var rowData = $(this).closest("tr").find("td").map(function () {
                            return $(this).text();
                        }).get();
                        console.log(rowData);
                        var driverId = rowData[4];
                        GetDriverById(driverId);
                    });

                    /* Attach click event handler to delete buttons*/
                    $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                        event.stopPropagation();
                        var rowData = {};
                        rowData = $(this).closest("tr").find("td").map(function () {
                            return $(this).text();
                        }).get();
                        var driverId = rowData[4];
                        deleteDriver(driverId);
                    });
                    hideOverlay();
                },
                error: function (error) {
                    console.error('Error fetching data:', error);
                }
            });
        },

        error: function () {
            console.error("Error fetching localization data.");
        }
    });

    // Function to reset and initialize passenger dropdowns
    function generateDropdownOptions(options, targetElement) {
        // Clear existing options
        $(targetElement).empty();

        // Add a default option
        $(targetElement).append($('<option>', {
            value: '',
            text: '-Aucun-',
        }));

        // Add other options
        options.forEach(function (option) {
            $(targetElement).append($('<option>', {
                value: option.value,
                text: option.label,
            }));
        });
    }

    //get all the owner list
    $.ajax({
        url: 'Home/GetUsers',
        method: 'GET',
        success: function (data) {
            // Populate the select dropdown with user data
            var $selectTag = $('#textOwnerId');
            $selectTag.empty(); // Clear existing options

            // Iterate over the user data and create options
            $.each(data, function (index, user) {
                var $option = $('<option>', {
                    value: user.userId,
                    text: user.userName // Assuming 'userName' property exists in the user object
                });
                // Append the option to the select element
                $selectTag.append($option);
            });
        },
        error: function (error) {
            // Handle error
            alert(JSON.stringify(error));
            console.error('Error fetching data:', error);
        }
    });


    //Searching based on keywords
    $(document).on("keyup", '#gsearch', function () {
        // Clear the content of the Passenger-grid
        var inputString = $('#gsearch').val();
        showOverlay();
        $.ajax({
            url: '/ManagerDrivers/SearchDriverByKeyword',
            method: 'GET',
            data: { searchString: inputString },
            success: function (data) {
                // Mapping data to mydata
                var mydata = null;
                var mydata = data.map(function (item) {
                    return {
                        lastName: item.lastName,
                        firstName: item.firstName,
                        Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        MobilePhone: item.mobilePhone,
                        driverId: item.driverId,
                        userId: item.userId,
                        weeklyWorkingHours: item.weeklyWorkingHours,
                        VehicleName: item.VehicleName,
                        isValid: item.isValid,
                        unAssignedWarningHours: item.unAssignedWarningHours,
                        unConfirmedWarningHours: item.unConfirmedWarningHours,
                        defaultVehicleId: item.defaultVehicleId
                    };
                }); // Close the map function here

                // Clear and reload the grid with the filtered data
                var $grid = $("#passanger-grid");
                $grid.jqGrid('clearGridData');
                $grid.jqGrid('setGridParam', {
                    datatype: 'local',
                    data: mydata
                }).trigger("reloadGrid");

                //On row select open edit form
                $("#passanger-grid").off("click", "tr").on("click", "tr", function (event) {
                    event.stopPropagation();
                    $(".box-container-blk").show();

                    var rowData = {};
                    var rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    console.log(rowData);
                    var driverId = rowData[4];
                    GetDriverById(driverId);
                });

                /* Attach click event handler to delete buttons*/
                $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                    event.stopPropagation();
                    var rowData = {};
                    rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var driverId = rowData[4];
                    console.log("rowData", rowData);
                    deleteDriver(driverId);
                });
                hideOverlay();
            },
            error: function (error) {
                alert('Error : ' + JSON.stringify(error));
                console.error('Error fetching data:', JSON.stringify(error));
            }
        });
    });

    //Displaying records in form for editing the record
    function GetDriverById(driverId) {
        console.log(driverId);
        showOverlay();
        $.ajax({
            url: 'ManagerDrivers/GetDriverByID',
            method: 'GET',
            data: { driverId: driverId },
            success: function (obj) {
                console.log(obj);

                $('#textDriverId').val(obj.driverId);
                $('#textLastName').val(obj.lastName);
                $('#textFirstName').val(obj.firstName);
                $('#textOwnerId').val(obj.userId);
                populateSelect(obj.valid, 'textValid');
                selectOwnerById('#textOwnerId', obj.userId);
                $('#textMobileNumber').val(obj.mobilePhone);

                $('#textAccessLevel').val(obj.accessLevel);
                $('#textUnAssignedWarningHours').val(obj.unAssignedWarningHours);
                $('#textUnConfirmedWarningHours').val(obj.unConfirmedWarningHours);
                $('#textWeeklyWorkingHours').val(obj.weeklyWorkingHours);
                var simpleDate = new Date(obj.timeStamp).toLocaleString();
                $('#textTimeStamp1').val(simpleDate);
                $('#textModifiedBy').val(obj.modifiedBy);

                getVehicleNames(obj.defaultVehicleId);
                hideOverlay();
            },
            error: function (error) {
                alert(JSON.stringify(error));
                console.error('Error fetching data:', error);
            }
        });
    }

    $("#enregisterBtn").on("click", function () {
        if (checkFields()) {
            return false;
        }
        var driverId = $('#textDriverId').val();
        sessionStorage.setItem("driverId", driverId);
        if (driverId > 0 && driverId != null) {
            $('#alert-update-popup').modal('show');
            // Handle the confirmation action

            $('#btnUpdateConfirm').click(function () {
                changes = false;
                window.globalChange = changes;
                $('#alert-update-popup').modal('hide');
                $(".box-container-blk").hide();
                updateDriver();
            });
        } else {
            $('#alert-insert-popup').modal('show');
            // Handle the confirmation action

            $('#btnInsertConfirm').click(function () {
                changes = false;
                window.globalChange = changes;
                $('#alert-insert-popup').modal('hide');
                $(".box-container-blk").hide();
                updateDriver();
            });
        }
    })

    function clearAll() {
        $('#textDriverId').val('');
        $('#textFirstName').val('');
        $('#textLastName').val('');
        $('#textMobileNumber').val('');
        $('#textUnAssignedWarningHours').val('');
        $('#textUnConfirmedWarningHours').val('');
        $('#textWeeklyWorkingHours').val('');
        $('#textModifiedBy').val('');
        $('#textOwnerId').val('');
        $('#textValid').val(0);
        $('#textCreatedBy').val('');
        $('#textTimeStamp1').val('');
        selectOwnerById('#textOwnerId', 0);
    }
    populateSelect(0, 'textValid');
            function updateDriver() {
                var driverId = $('#textDriverId').val();
                const selectElement = document.getElementById('vehicleName');
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                var Vehicleid = selectedOption.value;

                if (Vehicleid === '') {
                    Vehicleid = null;
                }
                console.log(Vehicleid);

                var dataToSend = {
                    driverId: parseInt($('#textDriverId').val()),
                    firstName: $('#textFirstName').val(),
                    lastName: $('#textLastName').val(),
                    mobilePhone: $('#textMobileNumber').val(),
                    defaultVehicleId: $('#vehicleName').val() ? $('#vehicleName').val() : null,

                    unAssignedWarningHours: $('#textUnAssignedWarningHours').val(),
                    unConfirmedWarningHours: $('#textUnConfirmedWarningHours').val(),
                    weeklyWorkingHours: $('#textWeeklyWorkingHours').val(),
                    ownerUserId: parseInt($('#textOwnerId').val()),
                    valid: parseInt($('#textValid').val()),
                };
                $.ajax({
                    url: 'ManagerDrivers/SaveDriver',
                    method: 'POST',
                    data: dataToSend,
                    success: function (response) {             
                        var key = sessionStorage.getItem("driverId");
                        refreshGrid();
                        if (key > 0) {
                            // refreshGrid();
                            $('#alert-update-popup').modal('hide');

                            $('#alert-update-green').modal('show');
                            $('#alert-update-green').fadeIn();
                            // Delay for 5 seconds
                            setTimeout(function () {
                                $('#alert-update-green').modal('hide');
                            }, 3000);
                            clearAll();
                        } else {
                            $('#alert-insert-popup').modal('hide');

                            $('#alert-insert-green').modal('show');
                            $('#alert-insert-green').fadeIn();
                            // Delay for 5 seconds
                            setTimeout(function () {
                                $('#alert-insert-green').modal('hide');
                            }, 3000);
                            clearAll();
                        }
                    },                  
                    error: function (error) {
                        alert(JSON.stringify(error));
                        console.error('Error fetching data:', error);
                    }
                });
            }

            $("#addDriverBtn").on("click", function () {
                $(".box-container-blk").show();
                /*  $('#enregisterBtn').removeClass('btn-yellow').addClass('btn-gray').prop('disabled', true);*/
                clearAll();
                modifiedDetails('Add');
                getVehicleNames(0);

                populateSelect(0, 'textValid');

            });

            //Delete Driver by Id
            function deleteDriver(driverId) {
                var dataToSend = { id: parseInt(driverId) };
                $(".box-container-blk").show();
                $('#alert-delete-popup').modal('show');

                $('#btnDeleteConfirm').click(function () {
                    $.ajax({
                        url: '/ManagerDrivers/DeleteDriver',
                        method: 'DELETE',
                        data: dataToSend,
                        
                        success: function (response) {
                            console.log('Record deleted successfully:', response);

                            $('#alert-delete-popup').modal('hide');
                            refreshGrid();
                            $('#alert-delete-popup').modal('hide');
                            $('#alert-delete-red').modal('show');
                            $('#alert-delete-red').fadeIn();
                            // Delay for 5 seconds
                            setTimeout(function () {
                                $('#alert-delete-red').modal('hide');
                            }, 3000);
                            clearAll();
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            // Handle error response
                            console.error('Error deleting record:', textStatus, errorThrown);
                        }
                    });
                });
            }

    function refreshGrid() {
        showOverlay();
                $.ajax({
                    url: 'ManagerDrivers/GetDriver',
                    method: 'GET',
                    success: function (data) {
                        $("#passanger-grid").jqGrid('clearGridData');
                        var mydata = [];
                        mydata = data.map(function (item) {
                            // console.log(item);
                            return {
                                lastName: item.lastName,
                                firstName: item.firstName,
                                Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                                mobilePhone: item.mobilePhone,
                                driverId: item.driverId,
                                userId: item.userId,
                                weeklyWorkingHours: item.weeklyWorkingHours,
                                VehicleName: item.VehicleName,
                                isValid: item.isValid,
                                unAssignedWarningHours: item.unAssignedWarningHours,
                                unConfirmedWarningHours: item.unConfirmedWarningHours,
                                defaultVehicleId: item.defaultVehicleId
                            };
                        }); 
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
            }

            //Reset button function
            $("#resetBtn").on("click", function () {
                $("input").css('border', '1px solid #cacccf');
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
             })

    $(document).on("keyup", '#gsearch', function () {
        // Clear the content of the Passenger-grid
        $(document).on("keyup", '#gsearch', function () {
            // Clear the content of the Passenger-grid
            var inputString = $('#gsearch').val();
            showOverlay();
            $.ajax({
                url: '/ManagerDrivers/SearchDriverByKeyword',
                method: 'GET',
                data: { searchString: inputString },
                success: function (data) {
                    // Mapping data to mydata
                    var mydata = data.map(function (item) {
                        return {
                            lastName: item.lastName,
                            firstName: item.firstName,
                            Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                            MobilePhone: item.mobilePhone,
                            driverId: item.driverId,
                            userId: item.userId,
                            weeklyWorkingHours: item.weeklyWorkingHours,
                            VehicleName: item.VehicleName,
                            isValid: item.isValid,
                            unAssignedWarningHours: item.unAssignedWarningHours,
                            unConfirmedWarningHours: item.unConfirmedWarningHours,
                            defaultVehicleId: item.defaultVehicleId
                        };
                    }); // Close the map function here

                    // Clear and reload the grid with the filtered data
                    var $grid = $("#passanger-grid");
                    $grid.jqGrid('clearGridData');
                    $grid.jqGrid('setGridParam', {
                        datatype: 'local',
                        data: mydata
                    }).trigger("reloadGrid");
                    hideOverlay();
                },
                // Handle errors if AJAX request fails
                error: function (xhr, status, error) {
                    console.error("AJAX Error:", error);
                }
            });
        });

        // Move the row selection event handler outside of the AJAX success callback
        $("#passanger-grid").off("click", "tr").on("click", "tr", function (event) {
            event.stopPropagation();
            $(".box-container-blk").show();
            var rowData = $(this).closest("tr").find("td").map(function () {
                return $(this).text();
            }).get();
            console.log(rowData);
            var driverId = rowData[4];
            GetDriverById(driverId);
        });
    });

            $(document).on("input", '#gsearch', function () {
                if ($('#gsearch').val() === '') {
                    refreshGrid();
                }
            });
    
            //Display User who Created/Modified and date time
            function modifiedDetails(string) {
                // Get the current date and time
                var currentDateTime = new Date();
                // Format the date and time as desired
                var formattedDateTime = currentDateTime.toLocaleString();
                // Set the value of the input field to the formatted date and time
                $('#textTimeStamp1').val(formattedDateTime);
                dataToSend = { send: true };
                $.ajax({
                    url: 'Home/GetUserLoginDetails',
                    method: 'GET',
                    data: dataToSend,
                    success: function (response) {
                        if (string === "Add") {
                            $('#textCreatedBy').val(response.name);
                            $('#textModifiedBy').val(response.name);
                        }
                        if (string === "Edit") {
                            $('#textModifiedBy').val(response.name);
                        }
                    },
                    error: function (error) {
                        console.error('Error fetching data:', error);
                    }
                });
            }

            function getVehicleNames(vehicleId) {
                console.log(vehicleId);
                $('#vehicleName').empty();

                $.ajax({
                    url: 'Vehicle/getVehicles',
                    method: 'GET',
                    success: function (data) {
                        console.log(data);
                        var $option = $('<option>', {
                            value: null,
                            text: Vehicle,
                        });
                        $('#vehicleName').append($option);
                        data.forEach(function (option) {
                            var $option = $('<option>', {
                                value: option.id,
                                text: option.name,
                            });

                            // Set selected attribute if this option matches the selectedId
                            if (option.id == vehicleId) {
                                $option.prop('selected', true);
                            }
                            $('#vehicleName').append($option);
                        });
                    }
                });             
             }

            //Populate true/false dropdown
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

      var nameIds = [ '#textLastName', '#textFirstName', '#textMobileNumber', '#textFirstName' ];
     // Attach event handlers to perform name validation
     $.each(nameIds, function (index, id) {
         $(id).on('input', function (event) {
             //checkFields();
             var val = $(id).val();
             if (val == null || val == "") {
                 $(id).css('border', '1px solid #ff0000');
                 $(id).attr('title', 'Empty fields!');
             }
             else {
                 $(id).css('border', '1px solid  #cacccf');
                 $(id).removeAttr('title', 'Empty fields!');
             }
             var charCode = event.which || event.keyCode;
     
             /* Check if the pressed key is a letter or space*/
             if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                 // Prevent the default action if it's not a letter or space
                 event.preventDefault();
             }
         });
     });
        $('#textCapacity').on('input', function (event) {
            //checkFields();
            var input = $(this);
            var is_name = input.val();
            if (is_name == null || is_name == "") {
                input.css('border', '1px solid #ff0000');
                input.attr('title', 'Empty fields!');
            }
            else {
                input.css('border', '1px solid  #cacccf');
                input.removeAttr('title', 'Empty fields!');
            }
            var charCode = event.which || event.keyCode;
            if (charCode == 45) {
                // Prevent the default action if it's not a letter or space
                event.preventDefault();
            }
        })

    function checkFields() {
        var stringids = ['#textLastName', '#textFirstName', '#textFirstName',];
        var numberids = ['#textUnAssignedWarningHours', '#textUnConfirmedWarningHours', '#textMobileNumber', '#textWeeklyWorkingHours'];
        // Initialize a flag to check if any field is empty
        var emptyFieldFound = 0;
        let scrollcount = 0;
        // Loop through each input field
        stringids.forEach(function (id) {
            // Check if the field is empty
            if ($(id).val() === '' || $(id).val() === null) {

                $(id).css('border', '1px solid #ff0000');
                $(id).attr('title', ValidateFields);
                emptyFieldFound = +1; // Set flag to true if empty field is found
            } else {
                $(id).removeAttr('title', ValidateFields);
                $(id).css('border', '1px solid #cacccf');
            }
        });
        numberids.forEach(function (id) {
            // Check if the field is empty
            if ($(id).val() === '' || $(id).val() === null) {
                $(id).css('border', '1px solid #ff0000');
                $(id).attr('title', ValidateFields);
                emptyFieldFound = +1; // Set flag to true if empty field is found
            } else {
                $(id).removeAttr('title', ValidateFields);
                $(id).css('border', '1px solid #cacccf');

            }
        });
        // If any empty field is found, disable the button and change its style
        if (emptyFieldFound > 0) {
            return true;
        } else {
            return false;
        }
    }       
});

