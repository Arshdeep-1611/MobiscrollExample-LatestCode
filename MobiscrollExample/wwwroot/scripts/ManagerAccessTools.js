$(document).ready(function () {
    //Displaying records in grid
    function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
    }
    var changes = false;
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
    $('.admin-input-change').on('change', function () {
        changes = true;
        window.globalChange = changes;
    });
    showOverlay();
    var TripsCancelConfirmMessage;
    var Tool;
    var AccessLevel;
    var userAccessLevel;
    var Tools;
    var ValidateFields;

    $.ajax({
        url: '/Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("language translation data", data);
            Tool = data.ToolIdDisplayName;
            AccessLevel = data.AccessLevelDisplayName;
            userAccessLevel = data.UserDopdown;
            Tools = data.ToolsDropdown;
            ValidateFields = data.ValidateFields;
            TripsCancelConfirmMessage = data.TripsCancelConfirmMessage

            $.ajax({
                url: 'ManageAccess/GetTools',
                method: 'GET',
                success: function (data) {
                    console.log(data);
                    $("#passanger-grid").jqGrid('clearGridData');
                    var mydata = null;
                    mydata = data.map(function (item) {
                        return {
                            toolsId: item.toolsId,
                            tool: item.tool,
                            accessLevel: item.accessLevel,
                            Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        };
                    });

                    // Initialize the grid with new data
                    var $grid = $("#passanger-grid"),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();

                    // Set the grid width
                    $grid.jqGrid("setGridWidth", newWidth, true);

                    jQuery("#passanger-grid").jqGrid({
                        data: mydata,
                        datatype: "local",
                        colNames: [Tool, AccessLevel, '<div style="text-align: center;">Action(s)</div>', 'ToolsId'],
                        colModel: [
                            { name: 'tool', index: 'tool', width: 80, align: 'left' },
                            { name: 'accessLevel', index: 'accessLevel', width: 70, align: 'left' },
                            { name: 'Action', index: 'Action', width: 30, align: 'center' },

                            { name: 'toolsId', index: 'toolsId', hidden: true },

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
                        var toolId = rowData[3];
                        getToolById(toolId);
                    });

                    /* Attach click event handler to delete buttons*/
                    $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                        event.stopPropagation();
                        var rowData = {};
                        rowData = $(this).closest("tr").find("td").map(function () {
                            return $(this).text();
                        }).get();
                        var toolId = rowData[3];
                        deleteTool(toolId);
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

    $("#addToolbtn").on("click", function () {
        $(".box-container-blk").show();
        clearValues();
        modifiedDetails('Add');
    });

    //Reset the form 

    function checkFields() {
        var stringids = ['#textAccessLevel', '#toolName',];
        // Initialize a flag to check if any field is empty
        var emptyFieldFound = 0;
        // Loop through each input field
        stringids.forEach(function (id) {
            console.log('id valuesss', id, $(id).val());
            // Check if the field is empty
            if ($(id).val() == null || $(id).val() == '' || $(id).val() == 0) {
                $(id).css('border', '1px solid #ff0000');
                $(id).attr('title', ValidateFields);
                emptyFieldFound++; // Increment the counter for empty fields
            } else {
                $(id).removeAttr('title');
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

    //Searching based on keywords
    $(document).on("keyup", '#gsearch', function () {
        // Clear the content of the Passenger-grid
        var inputString = $('#gsearch').val();
        showOverlay();
        $.ajax({
            url: '/ManageAccess/SearchToolByKeyword',
            method: 'GET',
            data: { searchString: inputString },
            success: function (data) {
                // Mapping data to mydata
                var mydata = null;
                var mydata = data.map(function (item) {
                    return {
                        toolsId: item.toolsId,
                        tool: item.tool,
                        accessLevel: item.accessLevel,
                        Action: "<img src='./img/metro-bin.png' class='delete-button'>",
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
                    var toolId = rowData[3];
                    getToolById(toolId);
                });

                /* Attach click event handler to delete buttons*/
                $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                    event.stopPropagation();
                    var rowData = {};
                    rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var toolId = rowData[3];
                    deleteTool(toolId);
                });
                hideOverlay();
            },

            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    });

    //Displaying records in form for editing the record
    function getToolById(toolId) {
        console.log(toolId);
        showOverlay();
        $.ajax({
            url: 'ManageAccess/getToolById',
            method: 'GET',
            data: { toolId: toolId },
            success: function (obj) {
                console.log(obj);

                $('#textToolId').val(obj.toolsId);
                $('#textAccessLevel').val(obj.accessLevel);
                $('#toolName').val(obj.tool);

                var simpleDate = new Date(obj.timeStamp).toLocaleString();
                $('#textTimeStamp').val(simpleDate);
                getAccessLevel(obj.accessLevel);
                getTool(obj.toolNumber);
                /*   $('#textTimeStamp1').val(obj.timeStamp);*/
                $('#textModifiedBy').val(obj.modifiedBy);
                hideOverlay();
            },
            error: function (error) {
                alert(JSON.stringify(error));
                console.error('Error fetching data:', error);
            }
        });
    }

    var nameIds = ['#toolName', '#textAccessLevel'];
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

    

        //Insert/Update operations starts
        $("#enregisterBtn").on("click", function () {
            if (checkFields()) {
                return false;
            }
            var toolsId = $('#textToolId').val();
            sessionStorage.setItem("toolsId", toolsId);
            if (toolsId > 0 && toolsId != null) {
                $('#alert-update-popup').modal('show');
                // Handle the confirmation action
                $('#btnUpdateConfirm').click(function () {
                    changes = false;
                    window.globalChange = changes;
                    $('#alert-update-popup').modal('hide');
                    $(".box-container-blk").hide();
                    updateUser();
                });
            }
            else {
                $('#alert-insert-popup').modal('show');
                // Handle the confirmation action
                $('#btnInsertConfirm').click(function () {
                    changes = false;
                    window.globalChange = changes;
                    $('#alert-insert-popup').modal('hide');
                    $(".box-container-blk").hide();
                    updateUser();
                });
            }
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

        function updateUser() {
            var id = $('#textToolId').val();
            var toolsId = parseInt($('#textToolId').val());
            if (id === '') {
                toolsId = null;
            }
            var dataToSend = {
                toolsId: toolsId,
                accessLevel: parseInt($('#textAccessLevel').val()),

                toolNumber: parseInt($('#toolName').val()),
            };
            showOverlay();
            $.ajax({
                url: 'ManageAccess/SaveTools/',
                method: 'POST',
                data: dataToSend,
                success: function (response) {                 
                    refreshGrid();
                    if (id !== '') {
                        // refreshGrid();
                        $('#alert-update-popup').modal('hide');
                        // Hide the alertQuestionUpdate modal
                        $('#alertQuestionUpdate').modal('hide');
                        $('#alert-update-green').modal('show');
                        $('#alert-update-green').fadeIn();
                        // Delay for 5 seconds
                        setTimeout(function () {
                            $('#alert-update-green').modal('hide');
                        }, 3000);
                        clearAll();

                        setTimeout(function () {
                            window.location = '/Home/LogOut';
                        }, 1000);
                        
                    }
                    else {
                        $('#alert-insert-popup').modal('hide');
                        $('#alertQuestionInsert').modal('hide');
                        $('#alert-insert-green').modal('show');
                        $('#alert-insert-green').fadeIn();
                        // Delay for 5 seconds
                        setTimeout(function () {
                            $('#alert-insert-green').modal('hide');
                        }, 3000);
                        clearAll();
                    }
                    hideOverlay();
                },                 
                error: function (error) {
                    console.error('Error fetching data:', error);
                }
            });
        }
     
        function clearAll() {
            $('#textToolId').val('');
            getAccessLevel(0);
            getTool();
            modifiedDetails('Add');
        }

        $(document).on("input", '#gsearch', function () {
            if ($('#gsearch').val() === '') {
                refreshGrid();
            }
        });

    function refreshGrid() {
        showOverlay();
            $.ajax({
                url: 'ManageAccess/GetTools',
                method: 'GET',
                success: function (data) {
                    $("#passanger-grid").jqGrid('clearGridData');
                    var mydata = null;
                    mydata = data.map(function (item) {
                        console.log(item);
                        return {
                            toolsId: item.toolsId,
                            tool: item.tool,
                            accessLevel: item.accessLevel,
                            Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        };
                    }); // Close the map function here
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
        //Delete Driver by Id
        function deleteTool(id) {
            var dataToSend = { id: parseInt(id) };
            $(".box-container-blk").show();
            $('#alert-delete-popup').modal('show');
            /*     var confirmed = confirm("Are you sure you want to delete?" + id);*/
            $('#btnDeleteConfirm').click(function () {
                $.ajax({
                    url: 'ManageAccess/DeleteTool',
                    method: 'DELETE',
                    data: dataToSend,
                    success: function (response) {
                        console.log('Record deleted successfully:', response);
                        //  alert('Record deleted successfully');
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

                        setTimeout(function () {
                            window.location = '/Home/LogOut';
                        }, 1000);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        // Handle error response
                        console.error('Error deleting record:', textStatus, errorThrown);
                    }
                });
            });
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
            /*clearValues();
            $(".box-container-blk").hide();*/
        })

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
    
    function getTool(tool) {
        $.ajax({
            url: 'Home/GetToolsList',
            method: 'GET',
            success: function (data) {
                var optionsData = [
                    { value: 0, text: Tools },
                    { value: 23, text: data.titleDriver },
                    { value: 24, text: data.titleOutOfPolicyTrips },
                    { value: 25, text: data.titleLocations },
                    { value: 26, text: data.titleManageAccess },
                    { value: 27, text: data.titlePaymentModes },
                    { value: 28, text: data.titleParameters },
                    { value: 31, text: data.titlePrintReport },
                    { value: 29, text: data.titlePassengers },
                    { value: 30, text: data.titleTripsPlanning },
                    { value: 32, text: data.titleWorkReport },
                    { value: 33, text: data.titleNightAndSundayHours },
                    { value: 34, text: data.titleOvertime },
                    { value: 35, text: data.titleReportAuthorizedPeople },
                    { value: 36, text: data.titleTripPlanning },
                    { value: 37, text: data.titleExportTool },
                    { value: 38, text: data.titleExternalServices },
                    { value: 39, text: data.titleEventKind },
                    { value: 40, text: data.titleSyncPassengers },
                    { value: 41, text: data.titleUsers },
                    { value: 42, text: data.titleTripValidation },
                    { value: 43, text: data.titleVehicles },
                    { value: 44, text: data.titleClearCache }

                ]; // Array to store opttion values and text

                var $select = $("#toolName");
                $select.empty(); // Clear existing options

                $.each(optionsData, function (index, option) {
                    var $options = $('<option>', {
                        value: option.value,
                        text: option.text
                    });
                    // Set the selected property based on the comparison with id
                    if (option.value == tool) {
                        $options.prop('selected', true);
                    }

                    // Append the option to the select element
                    $select.append($options);
                });
            },
            error: function (error) {
                // Handle error
                alert(JSON.stringify(error));
                console.error('Error fetching data:', error);
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
    function clearValues() {
        $('#textToolId').val('');
        getAccessLevel();
        getTool();
        modifiedDetails('Add');
    }
    //populate accesslevel list in dropdown
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
});

    

