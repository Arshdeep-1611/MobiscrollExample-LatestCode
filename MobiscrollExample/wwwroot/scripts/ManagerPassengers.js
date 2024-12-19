$(document).ready(function () {
    
    var changes = false;
    var TripsCancelConfirmMessage;
    // Function to hide the overlay
  

    function buttonLangauges() {
        $.ajax({
            url: 'Home/GetBtnLanguages',
            method: 'GET',
            success: function (data) {
               // $('.edit-button').attr('title', data['Edit']);
                $('.delete-button').attr('title', data['Delete']);
            }
        });
    }
    const showConfirmPopup = (textValue) => {
        $('#confirm-popup').find("#popup-body").text(textValue);
        $('#confirm-popup').modal('show');
    }

    const hideConfirmPopup = () => {
        $('#confirm-popup').modal('hide');
    }
    $('.admin-input-change').on('change', function () {
        changes = true;
        window.globalChange = changes;
    });
    var FirstNameName;
    var LastNameName;
    var Delete;
    var ValidateFields;

    $.ajax({
        url: '/Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("language translation data", data);

            FirstNameName = data.FirstNameName;
            LastNameName = data.LastNameName;
            Delete = data.DeleteTripStep;
            ValidateFields = data.ValidateFields;
            TripsCancelConfirmMessage = data.TripsCancelConfirmMessage

            showOverlay();
            $.ajax({
                url: 'ManagerPassengers/GetPassengers',
                method: 'GET',
                success: function (data) {
                    $("#passanger-grid").jqGrid('clearGridData');
                    var mydata = null;
                    mydata = data.map(function (item) {
                        return {
                            Name: item.lastName,
                            FirstName: item.firstName,
                            Action: "<img src='./img/metro-bin.png' class='delete-button' >",
                            Telephone: item.telePhone,
                            Email: item.email,
                            PassengerId: item.passengerId,

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
                        colNames: [LastNameName, FirstNameName, '<div style="text-align: center;" Title="Supprimer">Action(s)</div>', 'Telephone', 'Email', 'Passenger ID'],
                        colModel: [
                            { name: 'Name', index: 'Name', width: 50, align: 'left' },
                            { name: 'FirstName', index: 'FirstName', width: 50, align: 'left' },
                            { name: 'Action', index: 'Action', width: 30, align: 'center' },

                            { name: 'Telephone', index: 'Telephone', hidden: true },
                            { name: 'Email', index: 'Email', hidden: true },
                            { name: 'PassengerId', index: 'PassengerId', hidden: true },

                        ],
                        // pager: "#pager",
                        editable: true,
                        viewrecords: true,
                        autowidth: false,
                        scrollrow: true,
                        height: "calc(100vh - 270px)",
                        altRows: true,
                        altclass: 'myAltClass',
                        multiselect: false,
                        resizable: false,

                    });
                    buttonLangauges();
                    //On row select open edit form
                    $("#passanger-grid").off("click", "tr").on("click", "tr", function (event) {
                        event.stopPropagation();
                        $(".box-container-blk").show();
                        var rowData = {};
                        var rowData = $(this).closest("tr").find("td").map(function () {
                            return $(this).text();
                        }).get();
                        var passengerId = rowData[5];
                        getPassengerById(passengerId);
                        var selectedRow = $(this).attr('id');
                        // Save data to localStorage
                        localStorage.setItem('selectedRowId', selectedRow);
                        var selectedRowId = localStorage.getItem('selectedRowId');
                        // Reselect the previously selected row if it exists
                        // var storedRowId = localStorage.getItem('selectedRowId');
                        var passengerGrid = $("#passanger-grid");
                        if (selectedRowId) {
                            passengerGrid.jqGrid('setSelection', selectedRowId);
                            var selectedRowIndex = passengerGrid.jqGrid('getGridParam', 'selrow');
                            var selectedRowElement = passengerGrid.find('#' + $.jgrid.jqID(selectedRowIndex));
                            selectedRowElement.focus();
                        }
                    });

                    // Attach click event handler to delete buttons
                    $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                        event.stopPropagation();
                        var rowData = {};
                        rowData = $(this).closest("tr").find("td").map(function () {
                            return $(this).text();
                        }).get();
                        var passengerId = rowData[5];
                        deletePassenger(passengerId);
                    });
                    hideOverlay();
                },
                error: function (xhr, textStatus, errorThrown) {
                    // Handle error response
                    console.error('Error deleting record:', textStatus, errorThrown);

                }
            });

        },
        error: function () {
            console.error("Error fetching localization data.");
        }
    });


    $(".delete-button").title = Delete;
   
   
    function refreshGrid() {
        showOverlay();
        var selectedRowId = localStorage.getItem('selectedRowId');
         $.ajax({
            url: 'ManagerPassengers/GetPassengers',
            method: 'GET',
            success: function (data) {
                // Map the fetched data to the format expected by jqGrid
                var mydata = data.map(function (item) {
                    return {
                        Name: item.lastName,
                        FirstName: item.firstName,
                        Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        Telephone: item.telePhone,
                        Email: item.email,
                        PassengerId: item.passengerId,
                        
                    };
                });

                // Clear and reload the grid with the filtered data
                var $grid = $("#passanger-grid");
                $grid.jqGrid('clearGridData');
                $grid.jqGrid('setGridParam', {
                    datatype: 'local',
                    data: mydata
                }).trigger("reloadGrid");

                buttonLangauges();
                //On row select open edit form
                $("#passanger-grid").off("click", "tr").on("click", "tr", function (event) {
                    event.stopPropagation();
                    $(".box-container-blk").show();
                    
                    var rowData = {};
                    var rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var passengerId = rowData[5];
                    getPassengerById(passengerId);
                    var selectedRow = $(this).attr('id');
                    // Save data to localStorage
                    localStorage.setItem('selectedRowId', selectedRow);
                    var selectedRowId = localStorage.getItem('selectedRowId');
                        // Reselect the previously selected row if it exists
                   // var storedRowId = localStorage.getItem('selectedRowId');
                    var passengerGrid = $("#passanger-grid");
                    if (selectedRowId) {
                        passengerGrid.jqGrid('setSelection', selectedRowId);
                        var selectedRowIndex = passengerGrid.jqGrid('getGridParam', 'selrow');
                        var selectedRowElement = passengerGrid.find('#' + $.jgrid.jqID(selectedRowIndex));
                        selectedRowElement.focus();
                    }
                });

                // Attach click event handler to delete buttons
                $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                    event.stopPropagation();
                    var rowData = {};
                    rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var passengerId = rowData[5];
                    deletePassenger(passengerId);
                });
                hideOverlay();
            },
            error: function (xhr, textStatus, errorThrown) {
               // Handle error response
                console.error('Error deleting record:', textStatus, errorThrown);
              
            }
        });
    }
    $('#textFilter').on('change', function () {
        var inputValue = $(this).val();
        // Make an AJAX request to fetch filtered data
        showOverlay();
        $.ajax({
            url: '/ManagerPassengers/FilterPassengers',
            method: 'GET',
            data: { filterInput: inputValue },
            success: function (data) {
                // Map the fetched data to the format expected by jqGrid
                var mydata = data.map(function (item) {
                    return {
                        Name: item.lastName,
                        FirstName: item.firstName,
                        Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        Telephone: item.telePhone,
                        Email: item.email,
                        PassengerId: item.passengerId,
                       
                    };
                });

                // Clear and reload the grid with the filtered data
                var $grid = $("#passanger-grid");
                $grid.jqGrid('clearGridData');
                $grid.jqGrid('setGridParam', {
                    datatype: 'local',
                    data: mydata
                }).trigger("reloadGrid");

                buttonLangauges();
                //On row select open edit form
                $("#passanger-grid").off("click", "tr").on("click", "tr", function (event) {
                    event.stopPropagation();
                    $(".box-container-blk").show();
                    
                    var rowData = {};
                    var rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var passengerId = rowData[5];
                    getPassengerById(passengerId);
                     var selectedRow = $(this).attr('id');
                    // Save data to localStorage
                    localStorage.setItem('selectedRowId', selectedRow);
                    var selectedRowId = localStorage.getItem('selectedRowId');
                        // Reselect the previously selected row if it exists
                   // var storedRowId = localStorage.getItem('selectedRowId');
                    var passengerGrid = $("#passanger-grid");
                    if (selectedRowId) {
                        passengerGrid.jqGrid('setSelection', selectedRowId);
                        var selectedRowIndex = passengerGrid.jqGrid('getGridParam', 'selrow');
                        var selectedRowElement = passengerGrid.find('#' + $.jgrid.jqID(selectedRowIndex));
                        selectedRowElement.focus();
                    }
                });

                // Attach click event handler to delete buttons
                $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                    event.stopPropagation();
                    var rowData = {};
                    rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var passengerId = rowData[5];
                    deletePassenger(passengerId);
                });
                hideOverlay();
            },
            error: function (xhr, textStatus, errorThrown) {
               // Handle error response
                console.error('Error deleting record:', textStatus, errorThrown);
               
            }
        });
    });


    //Searching based on keywords
    $(document).on("keyup", '#gsearch', function () {
        var inputString = $('#gsearch').val();
        searchPassenger(inputString);
    });

    $(document).on("input", '#gsearch', function () {
        if ($('#gsearch').val() === '') {
            refreshGrid();
        }
    });

    $('#textFilter').change(function () {
        var text = $(this).find('option:selected').text()
        var $aux = $('<select/>').append($('<option/>').text(text))
        $(this).after($aux)
        $(this).width($aux.width())
        $aux.remove()
    }).change();

    function searchPassenger(inputString){
        // Clear the content of the Passenger-grid
        showOverlay();
        $.ajax({
            url: '/ManagerPassengers/SearchPassengersBy',
            method: 'GET',
            data: { searchString: inputString },
            success: function (data) {
                // Mapping data to mydata
                var mydata = null;
                var mydata = data.map(function (item) {
                    return {
                        Name: item.lastName,
                        FirstName: item.firstName,
                        Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        Telephone: item.telePhone,
                        Email: item.email,
                        PassengerId: item.passengerId,
                       
                    };
                }); // Close the map function here

                // Clear and reload the grid with the filtered data
                var $grid = $("#passanger-grid");
                $grid.jqGrid('clearGridData');
                $grid.jqGrid('setGridParam', {
                    datatype: 'local',
                    data: mydata
                }).trigger("reloadGrid");

                buttonLangauges();
                //On row select open edit form
                $("#passanger-grid").off("click", "tr").on("click", "tr", function (event) {
                    event.stopPropagation();
                    $(".box-container-blk").show();
                    
                    var rowData = {};
                    var rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var passengerId = rowData[5];
                    getPassengerById(passengerId);
                     var selectedRow = $(this).attr('id');
                    // Save data to localStorage
                    localStorage.setItem('selectedRowId', selectedRow);
                    var selectedRowId = localStorage.getItem('selectedRowId');
                        // Reselect the previously selected row if it exists
                   // var storedRowId = localStorage.getItem('selectedRowId');
                    var passengerGrid = $("#passanger-grid");
                    if (selectedRowId) {
                        passengerGrid.jqGrid('setSelection', selectedRowId);
                        var selectedRowIndex = passengerGrid.jqGrid('getGridParam', 'selrow');
                        var selectedRowElement = passengerGrid.find('#' + $.jgrid.jqID(selectedRowIndex));
                        selectedRowElement.focus();
                    }
                });

                // Attach click event handler to delete buttons
                $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                    event.stopPropagation();
                    var rowData = {};
                    rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var passengerId = rowData[5];
                    deletePassenger(passengerId);
                });
                hideOverlay();
            },
            error: function (xhr, textStatus, errorThrown) {
               // Handle error response
                console.error('Error deleting record:', textStatus, errorThrown);
                hideOverlay();
            }
        });
    }

    //Displaying records in form for editing the record
    function getPassengerById(passengerId) {
        showOverlay();
        $.ajax({
            url: 'ManagerPassengers/GetPassengersByID',
            method: 'GET',
            data: { id: passengerId },
            success: function (result) {
                $.each(result, function (index, obj) {
                    $('#textPassengerId').val(obj.passengerId);
                    $('#textEmployeeId').val(obj.employeeId);
                    $('#textLastName').val(obj.lastName);
                    $('#textFirstName').val(obj.firstName);
                    $('#textOwnerId').val(obj.ownerUserId);
                    $('#textValid').val(obj.valid);
                    $('#textAuthorised').val(obj.isAuthorized);
                    $('#textIsEdit').val(obj.isEditable);
                    $('#textAccessLevel').val(obj.accessLevel);
                    $('#textIsPrivate').val(obj.isPrivate);
                    $('#textVip').val(obj.isVip);
                    $('#textEmail').val(obj.email);
                    $('#textTelePhone').val(obj.telePhone);
                    $('#textContactNumber').val(obj.contactPhone);
                    $('#textMobileNumber').val(obj.mobilePhone);
                    $('#textComment').val(obj.comment);
                    $('#textCreatedBy').val(obj.createdBy);
                    $('#textTimeStamp').val(obj.timeStamp);
                    $('#textModifiedBy').val(obj.modifiedBy);
                    if (obj.title != null && obj.title != '') {
                        selectTitleOption(obj.title, 'textTitle');
                    } else {
                        selectTitleOption('Mr', 'textTitle');
                    }
                    modifiedDetails('Edit');
                    getAccessLevel(obj.accessLevel);
                    selectOwnerById(obj.ownerUserId, 'textOwnerId');
                    populateSelect(obj.valid, 'textValid');
                    populateSelect(obj.isAuthorized, 'textAuthorised');
                    populateSelect(obj.isEditable, 'textIsEdit');
                    populateSelect(obj.isPrivate, 'textIsPrivate');
                    populateSelect(obj.isVip, 'textVip');
                    checkFields();
                    hideOverlay();
                }); // Closing each loop
                if ($('#textAccessLevel').val() != "" || $('#textAccessLevel').val() !=null) {
                    $('#textAccessLevel').removeAttr('title', 'Empty fields!');
                    $('#textAccessLevel').css('border', '1px solid #cacccf');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
               // Handle error response
                console.error('Error deleting record:', textStatus, errorThrown);
              
            }

        });
    }
    
    //Insert/Update operations starts
    $("#enregisterBtn").on("click", function () {
        if (checkFields()) {
            return false;
        }
        var passengerId = $("#textPassengerId").val();
        if (passengerId > 0 && passengerId != null) {
            $('#alert-update-popup').modal('show');
            // Handle the confirmation action
            $('#btnUpdateConfirm').one('click', function () {
                changes = false;
                window.globalChange = changes;
                updatePassenger();
                $(".box-container-blk").hide();
            });
        } else {
            $('#alert-insert-popup').modal('show');
            // Handle the confirmation action
            $('#btnInsertConfirm').one('click', function () {
                changes = false;
                window.globalChange = changes;
                insertPassenger();
                $(".box-container-blk").hide();
            });
        }
    });

    function updatePassenger() {
        var dataToSend = {
            passengerId: parseInt($('#textPassengerId').val()),
            employeeId: parseInt($('#textEmployeeId').val()),
            firstName: $('#textFirstName').val(),
            lastName: $('#textLastName').val(),
            email: $('#textEmail').val(),
            telePhone: $('#textTelePhone').val(),
            mobilePhone: $('#textMobileNumber').val(),
            contactPhone: $('#textContactNumber').val(),
            isAuthorized: parseInt($('#textAuthorised').val()),
            isPrivate: parseInt($('#textIsPrivate').val()),
            accessLevel: parseInt($('#textAccessLevel').val()),
            isEditable: parseInt($('#textIsEdit').val()),
            comments: $('#textComment').val(),
            modifiedBy: $('#textModifiedBy').val(),
            ownerUserId: parseInt($('#textOwnerId').val()),
            valid: parseInt($('#textValid').val()),
            isVip: parseInt($('#textVip').val()),
            createdBy: $('#textCreatedBy').val(),
            timeStamp: $('#textTimeStamp').val(),
            title: $('#textTitle').val()
        };
        $.ajax({
            url: 'ManagerPassengers/UpdatePassengers',
            method: 'POST',
            data: dataToSend,
            success: function (response) {
                console.log(JSON.stringify(response));
                refreshGrid();
                if (response.success) {
                    $('#alert-update-popup').modal('hide');

                    $('#alert-update-green').modal('show');
                    $('#alert-update-green').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('#alert-update-green').modal('hide');
                    }, 5000);
                } else {
                    $('#alert-norecord-yellow').modal('hide');
                    $('#alert-norecord-yellow modal-body').remove();
                    $('#alert-norecord-yellow modal-body').html('<h4>' + response.message +'</h4>');
                    $('#alert-norecord-yellow').modal('show');
                    $('#alert-norecord-yellow').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('#alert-norecord-yellow').modal('hide');
                    }, 5000);
                }
            },
           error: function (xhr, textStatus, errorThrown) {
               // Handle error response
                console.error('Error deleting record:', textStatus, errorThrown);
                
           }
        });
        clearValues();
    }
    
    function insertPassenger() {
        var dataToSend = {
            passengerId : parseInt($('#textPassengerId').val()),
            employeeId : parseInt($('#textEmployeeId').val()),
            firstName : $('#textFirstName').val(),
            lastName : $('#textLastName').val(),
            email : $('#textEmail').val(),
            telePhone : $('#textTelePhone').val(),
            mobilePhone : $('#textMobileNumber').val(),
            contactPhone : $('#textContactNumber').val(),
            isAuthorized : parseInt($('#textAuthorised').val()),
            isPrivate : parseInt($('#textIsPrivate').val()),
            accessLevel : parseInt($('#textAccessLevel').val()),
            isEditable : parseInt($('#textIsEdit').val()),
            comments : $('#textComment').val(),
            modifiedBy : $('#textModifiedBy').val(),
            ownerUserId : parseInt($('#textOwnerId').val()),
            valid : parseInt($('#textValid').val()),
            isVip : parseInt($('#textVip').val()),
            createdBy : $('#textCreatedBy').val(),
            timeStamp: $('#textTimeStamp').val(),
            title: $('#textTitle').val()
        };
        $.ajax({
            url: 'ManagerPassengers/AddPassengers',
            method: 'POST',
            data: dataToSend,
            success: function (response) {
                console.log(JSON.stringify(response));
                refreshGrid();
                if (response.success) {
                    $('#alert-insert-popup').modal('hide');

                    $('#alert-insert-green').modal('show');
                    $('#alert-insert-green').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('#alert-insert-green').modal('hide');
                    }, 5000);
                } else {
                    $('#alert-norecord-yellow').modal('hide');
                    $('#alert-norecord-yellow modal-body').remove();
                    $('#alert-norecord-yellow modal-body').html('<h4>' + response.message + '</h4>');
                    $('#alert-norecord-yellow').modal('show');
                    $('#alert-norecord-yellow').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('#alert-norecord-yellow').modal('hide');
                    }, 5000);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
               // Handle error response
                console.error('Error deleting record:', textStatus, errorThrown);
            }
        });
        clearValues();
    }



    $("#addPassengerBtn").on("click", function () {
        $(".box-container-blk").show();
        clearValues();
        modifiedDetails('Edit');
        $('#textAccessLevel').removeAttr('title', 'Empty fields!');
        $('#textAccessLevel').css('border', '1px solid #cacccf');
    });

    //Delete Passenger by Id
    function deletePassenger(id) {
        var dataToSend = { id: parseInt(id) };
        $(".box-container-blk").show();
        $('#alert-delete-popup').modal('show');
        // Handle the confirmation action
        $('#btnDeleteConfirm').one('click', function () {
            $.ajax({
                url: 'ManagerPassengers/DeletePassengers',
                method: 'GET',
                data: dataToSend, // Pass any data required for deletion, such as the record ID
                success: function (response) {
                    // Handle success response, if needed
                    console.log('Record deleted successfully:', response);
                    refreshGrid();
                    if (response.success) {
                        $('#alert-delete-popup').modal('hide');
                        $('#alert-delete-red').modal('show');
                        $('#alert-delete-red').fadeIn();
                        // Delay for 5 seconds
                        setTimeout(function () {
                            $('#alert-delete-red').modal('hide');
                        }, 5000);
                    } else {
                        $('#alert-norecord-yellow').modal('hide');
                        $('#alert-norecord-yellow modal-body').remove();
                        $('#alert-norecord-yellow modal-body').html('<h4>' + response.message + '</h4>');
                        $('#alert-norecord-yellow').modal('show');
                        $('#alert-norecord-yellow').fadeIn();
                        // Delay for 5 seconds
                        setTimeout(function () {
                            $('#alert-norecord-yellow').modal('hide');
                        }, 5000);
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    // Handle error response
                    console.error('Error deleting record:', textStatus, errorThrown);

                }
            });
        });
        clearValues();
    }

    //Reset button function
    $("#resetBtn").on("click", function () {
        
        if (changes == true) {
            showConfirmPopup(TripsCancelConfirmMessage);
            $('#confirm-button').click(function () {
                changes = false;
                window.globalChange = changes;
                clearValues();
                $(".box-container-blk").hide();
                hideConfirmPopup();
            });
        }
        else {
            clearValues();
            $(".box-container-blk").hide();
        }
    })


    //Reset the form 
    function clearValues() {
        $('#textPassengerId').val('');
        $('#textEmployeeId').val('');
        $('#textFirstName').val('');
        $('#textLastName').val('');
        $('#textEmail').val('');
        $('#textTelePhone').val('');
        $('#textMobileNumber').val('');
        $('#textContactNumber').val('');
        $('#textAuthorised').val('');
        $('#textIsPrivate').val('');
        $('#textAccessLevel').val('');
        $('#textIsEdit').val('');
        $('#textComment').val('');
        $('#textModifiedBy').val('');
        $('#textOwnerId').val('');
        $('#textValid').val('');
        $('#textVip').val('');
        $('#textCreatedBy').val('');
        $('#textTimeStamp').val('');
        getAccessLevel(0);
        selectTitleOption('Mr', 'textTitle');
        selectOwnerById(0, 'textOwnerId');
        populateSelect(0, 'textValid');
        populateSelect(0, 'textAuthorised');
        populateSelect(0, 'textIsEdit');
        populateSelect(0, 'textIsPrivate');
        populateSelect(0, 'textVip');
        modifiedDetails('Add');
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

    //Highlight the option which as per passenger table data
    function selectOwnerById(selectId, id) {
        // Find the select element
        var $select = $('#' + selectId);

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

    //Display User who Created/Modified and date time
    function modifiedDetails(string) {
        // Get the current date and time
        var currentDateTime = new Date();
        // Format the date and time as desired
        var formattedDateTime = currentDateTime.toLocaleString();
        // Set the value of the input field to the formatted date and time
        $('#textTimeStamp').val(formattedDateTime);
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

    //populate accesslevel list in dropdown
    function getAccessLevel(id) {
        $.ajax({
            url: '/Home/GetAccessLevels',
            method: 'GET',
            success: function (data) {
                var optionsData = [
                    { value: "", text: "-Aucun-" },
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
                //alert('Error : ' + JSON.stringify(error));
                console.error('Error fetching data:', JSON.stringify(error));
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

    function selectTitleOption(selectedOption,targetElementId) {
        var optionsData = [
            { value: 'Mr', text: 'Mr' },
            { value: 'Ms', text: 'Ms' },
            { value: 'Miss', text: 'Miss' },
            { value: 'Mrs', text: 'Mrs' },
            { value: 'Dr', text: 'Dr' },
            { value: 'Pr', text: 'Pr' }
        ];

        var $selectElement = $("#" + targetElementId);
        $selectElement.empty();

        $.each(optionsData, function (index, option) {
            var $option = $('<option>', {
                value: option.value,
                text: option.text // Evaluate the localized text dynamically
            });
            // Set the selected property based on the comparison with id
            $option.prop('selected', option.value === selectedOption);

            // Append the option to the select element
            $selectElement.append($option);
        });
    }
    
    //validation id fields accepts number
    $('#textEmployeeId').on('keypress', function (event) {
        // Get the character code of the pressed key
        var charCode = event.which || event.keyCode;

        // Allow digits (0-9), space (32), '-' (45), and '+' (43)
        if ((charCode >= 48 && charCode <= 57)) // digit
            { 
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    });

    //validation text fields starts
    var phoneIds = ['#textTelePhone', '#textMobileNumber', '#textContactNumber'];
    // Attach keypress event handler to each phone input field
    $.each(phoneIds, function (index, id) {
        $(id).on('keypress', function (event) {
            var inputString = $(id).val();
            var digitCount = 1;
            for (var i = 0; i < inputString.length; i++) {
                if (!isNaN(parseInt(inputString[i]))) {
                    digitCount++;
                }
            }
            if (digitCount > 15) {
                event.preventDefault();
                return false;
            }
            // Get the character code of the pressed key
            var charCode = event.which || event.keyCode;
            // Allow digits (0-9), space (32), '-' (45), and '+' (43)
            if ((charCode >= 48 && charCode <= 57) || // Digits
                charCode === 32 || // Space
                charCode === 45 || // '-'
                charCode === 43) { // '+'
                return true;
            } else {
                event.preventDefault();
                return false;
            }
        });
    });

    // Attach email validation
    // Define the IDs of the email input fields
    var emailIds = ['#textEmail'];
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Attach event handlers to perform email validation
    $.each(emailIds, function (index, id) {
        $(id).on('change', function () {
            // Get the value of the email input fields
            if ($(this).val().trim() != '') {
                var emailValue = $(this).val().trim();
                // Regular expression for email validation
                // Check if the email is valid
                if (!emailPattern.test(emailValue)) {
                    // Invalid email, clear the field and show error message
                    $(this).addClass('empty-inputs-border');
                } else {
                    $('#textEmail2').removeClass('empty-inputs-border');
                }
            } else {
                $('#textEmail2').removeClass('empty-inputs-border');
            }

        });
    });



    // Define the IDs of the first and last name input fields
    var nameIds = ['#textFirstName', '#textLastName'];
    // Attach event handlers to perform name validation
    $.each(nameIds, function (index, id) {
        $(id).on('keypress', function (event) {
            checkFields();
            // Get the character code of the pressed key
            var charCode = event.which || event.keyCode;

            // Check if the pressed key is a letter or space
            if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                // Prevent the default action if it's not a letter or space
                event.preventDefault();
            }
        });
    });

     // Define the IDs of the first and last name input fields
    var nameIds = ['#textFirstName', '#textLastName'];
    // Attach event handlers to perform name validation
    $.each(nameIds, function (index, id) {
        $(id).on('change', function (event) {
            checkFields();
            // Get the character code of the pressed key
            var charCode = event.which || event.keyCode;

            // Check if the pressed key is a letter or space
            if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                // Prevent the default action if it's not a letter or space
                event.preventDefault();
            }
        });
    });

    //validation text fields starts
    var phoneIds2 = ['#textTelePhone', '#textMobileNumber', '#textContactNumber'];
    // Attach keypress event handler to each phone input field
    $.each(phoneIds2, function (index, id) {
        $(id).on('change', function (event) {
            var inputString = $(id).val();
            var digitCount = 1;
            for (var i = 0; i < inputString.length; i++) {
                if (!isNaN(parseInt(inputString[i]))) {
                    digitCount++;
                }
            }
            if (digitCount > 15) {
                return true;
            } else {
                event.preventDefault();
                return false;
            }           
        });
    });

    function checkFields() {
        var ids = ['#textFirstName', '#textLastName'];
        // Initialize a flag to check if any field is empty
        var emptyFieldFound=0;

        // Loop through each input field
        ids.forEach(function (id) {
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
        // Regular expression for email validation
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if ($('#textEmail').val().trim() != '') {
            var emailValue = $('#textEmail').val().trim();
            // Check if the email is valid
            if (!emailPattern.test(emailValue)) {
                // Invalid email, clear the field and show error message
                $('#textEmail').addClass('empty-inputs-border');
                emptyFieldFound = +1;
            } else {
                $('#textEmail').removeClass('empty-inputs-border');
            }
        } else {
            $('#textEmail').removeClass('empty-inputs-border');
        }

        // If any empty field is found, disable the button and change its style
        if (emptyFieldFound>0) {
            return true;
        } else {
            return false;
        } 
    }
})


function showOverlay() {
    document.getElementById('overlay').style.display = 'flex';
}

// Function to hide the overlay
function hideOverlay() {
    document.getElementById('overlay').style.display = 'none';
}
