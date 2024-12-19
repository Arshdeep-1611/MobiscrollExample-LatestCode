$(document).ready(function () {
    var Name;
    var Code;
    var Level;
    var AccessLevel;
    var ValidateFields;
    var changes = false;
    var TripsCancelConfirmMessage;

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

    initializeAndLaodGrid();
    function initializeAndLaodGrid() {
        showOverlay();
        $.ajax({

            url: '/Home/GetTripRequestorLocalization',
            method: 'GET',
            success: function (data) {
                console.log("language translation data", data);
                Level = data.LevelDisplayName;
                Name = data.NameDisplayName;
                Code = data.CodeDisplayName;
                AccessLevel = data.UserDopdown;
                ValidateFields = data.ValidateFields;
                TripsCancelConfirmMessage = data.TripsCancelConfirmMessage;
                $.ajax({
                    url: 'ManagerEvents/GetEventKinds',
                    method: 'GET',
                    success: function (data) {
                        console.log(data); // Log the data received from the server
                        $("#passanger-grid").jqGrid('clearGridData');
                        var mydata = null;
                        mydata = data.map(function (item) {
                            return {
                                Code: item.code,
                                Name: item.name,
                                Level: item.level,
                                Action: "<img src='./img/metro-bin.png' class='delete-button' >",
                                Id: item.id,
                            };
                        });

                        // Initialize the grid with new data
                        var $grid = $("#passanger-grid"),
                            newWidth = $grid.closest(".ui-jqgrid").parent().width();

                        // Set the grid width
                        $grid.jqGrid("setGridWidth", newWidth, true);
                        buttonLangauges();
                        $grid.jqGrid({
                            data: mydata,
                            datatype: "local",
                            colNames: [Code, Name, Level, '<div style="text-align: center;">Action(s)</div>', 'Id'],
                            colModel: [
                                { name: 'Code', index: 'Code', width: 40, align: 'left' },
                                { name: 'Name', index: 'Name', width: 80, align: 'left' },
                                { name: 'Level', index: 'Level', width: 30, align: 'left' },
                                { name: 'Action', index: 'Action', width: 20, align: 'center' },
                                { name: 'Id', index: 'Id', hidden: true }
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
                            resizable: false
                        });

                        //On row select open edit form
                        $("#passanger-grid").off("click", "tr").on("click", "tr", function (event) {
                            event.stopPropagation();
                            $(".box-container-blk").show();
                            var rowData = $(this).find("td").map(function () {
                                return $(this).text();
                            }).get();
                            var eventId = rowData[4];
                            getEventById(eventId);
                            var selectedRow = $(this).attr('id');
                            localStorage.setItem('selectedRowId', selectedRow);
                        });

                        // Attach click event handler to delete buttons
                        $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                            event.stopPropagation();
                            var rowData = $(this).closest("tr").find("td").map(function () {
                                return $(this).text();
                            }).get();
                            var id = rowData[4]; // Index corrected to match 'Id' column
                            deleteEventKind(id);
                        });
                    },
                    error: function (xhr, textStatus, exception) {
                        // Handle error response
                        console.error('Error:', textStatus, exception);

                    }
                });
                hideOverlay();
            },
            error: function () {
                console.error("Error fetching localization data.");
                hideOverlay();
            }
        });
    }


    function refreshGrid() {
        showOverlay();
        $.ajax({
            url: 'ManagerEvents/GetEventKinds',
            method: 'GET',
            success: function (data) {
                console.log(data); // Log the data received from the server
                $("#passanger-grid").jqGrid('clearGridData');
                var mydata = null;
                mydata = data.map(function (item) {
                    return {
                        Code: item.code,
                        Name: item.name,
                        Level: item.level,
                        Action: "<img src='./img/metro-bin.png' class='delete-button' >",
                        Id: item.id,
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
                    var rowData = $(this).find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var eventId = rowData[4];
                    getEventById(eventId);
                    var selectedRow = $(this).attr('id');
                    localStorage.setItem('selectedRowId', selectedRow);
                });

                // Attach click event handler to delete buttons
                $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                    event.stopPropagation();
                    var rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var id = rowData[4]; // Index corrected to match 'Id' column
                    deleteEventKind(id);
                });
                hideOverlay();
            },
            error: function (xhr, textStatus, exception) {
                // Handle error response
                console.error('Error:', textStatus, exception);
                hideOverlay();
            }
        });
    }

    //Searching based on keywords
    $(document).on("keyup", '#gsearch', function () {
        var inputString = $('#gsearch').val();
        searchEvents(inputString);
    });

    $(document).on("input", '#gsearch', function () {
        if ($('#gsearch').val() === '') {
            refreshGrid();
        }
    });

    function searchEvents(inputString) {
        showOverlay();
        // Clear the content of the Passenger-grid
        $.ajax({
            url: '/ManagerEvents/GeEventKindListBySearch',
            method: 'GET',
            data: { searchString: inputString },
            success: function (data) {
                // Mapping data to mydata
                var mydata = null;
                mydata = data.map(function (item) {
                    return {
                        Code: item.code,
                        Name: item.name,
                        Level: item.level,
                        Action: "<img src='./img/metro-bin.png' class='delete-button' >",
                        Id: item.id,
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
                    var rowData = $(this).find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var eventId = rowData[4];
                    getEventById(eventId);
                    var selectedRow = $(this).attr('id');
                    localStorage.setItem('selectedRowId', selectedRow);
                });

                // Attach click event handler to delete buttons
                $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                    event.stopPropagation();
                    var rowData = {};
                    rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var id = rowData[5];
                    deleteEventKind(id);
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

    //populate accesslevel list in dropdown
    function getAccessLevel(id, elemetId) {
        $.ajax({
            url: '/Home/GetAccessLevels',
            method: 'GET',
            success: function (data) {
                var optionsData = [
                    { value: 0, text: AccessLevel },
                    { value: 1, text: data.labelRequester },
                    { value: 2, text: data.labelRequesterPassengerManagement },
                    { value: 3, text: data.labelDriver },
                    { value: 4, text: data.labelManagerBackup },
                    { value: 5, text: data.labelManager },
                    { value: 6, text: data.labelSupervisor }
                ]; // Array to store opt"ion values and text

                var $select = $("#" + elemetId + "");
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

    //populate accesslevel list in dropdown
    function GetCategories(idValue, elemetId) {
        $.ajax({
            url: '/Home/GetCategories',
            method: 'GET',
            success: function (data) {
                var optionsData = [
                    { value: "TWORK", text: data.CategoryWorkTime },
                    { value: "TDRIVE", text: data.CategoryDriveTime },
                    { value: "TNODRIVE", text: data.CategoryNoDriveTime },
                    { value: "TINCREASE", text: data.CategoryRateTime },
                    { value: "TCHRGNIGHT", text: data.CategorySurchargeNightTime },
                    { value: "TCHRGSNDAY", text: data.CategorySurchargeSundayDayTime },
                    { value: "TCHRGSNNGT", text: data.CategorySurchargeSundayNightTime },
                    { value: "TRESERVE", text: data.CategoryReserveTime },
                    { value: "TABSENCE", text: data.CategoryAbsenceTime },
                    { value: "TOVERREC", text: data.CategoryOvertimeRecovery },
                    { value: "OTHER", text: data.CategoryOther }
                ]; // Array to store option values and text

                var $select = $("#" + elemetId);
                $select.empty(); // Clear existing options

                var isSelected = false; // To track if an option is selected

                $.each(optionsData, function (index, option) {
                    var $option = $('<option>', {
                        value: option.value,
                        text: option.text
                    });
                    // Set the selected property based on the comparison with idValue
                    if (option.value === idValue) {
                        $option.prop('selected', true);
                        isSelected = true; // Mark as selected
                    }

                    // Append the option to the select element
                    $select.append($option);
                });

                // If no other option was selected, select "OTHER" by default
                if (!isSelected) {
                    $select.find('option[value="OTHER"]').prop('selected', true);
                }
            },
            error: function (error) {
                console.error('Error fetching data:', JSON.stringify(error));
            }
        });
    }


    //populate accesslevel list in dropdown
    function GetLevel(idValue) {
        $.ajax({
            url: '/Home/GetLevel',
            method: 'GET',
            success: function (data) {
                var optionsData = [
                    { value: 1, text: data.Level1 },
                    { value: 2, text: data.Level2 },
                    { value: 3, text: data.Level3 },
                    { value: 4, text: data.Level4 },
                ]; // Array to store opt"ion values and text

                var $select = $("#textLevel");
                $select.empty(); // Clear existing options

                $.each(optionsData, function (index, option) {
                    var $option = $('<option>', {
                        value: option.value,
                        text: option.text
                    });
                    // Set the selected property based on the comparison with id
                    $option.prop('selected', option.value === idValue);

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

    $("#addPassengerBtn").on("click", function () {
        $(".box-container-blk").show();
        cleatAllText();
        modifiedDetails();
    });


    //Displaying records in form for editing the record
    function getEventById(eventId) {
        //id = parseInt(id);
        $.ajax({
            url: 'ManagerEvents/GeEventKindListById',
            method: 'GET',
            data: { id: eventId },
            success: function (result) {
                $.each(result, function (index, obj) {

                    $('#textEventkindId').val(obj.id);
                    $('#textName').val(obj.name);
                    $('#textCode').val(obj.code);

                    $('#textColor').val(obj.color);
                    $('#textValidationColor').val(obj.validationColor);
                    $('#textRejectedColor').val(obj.rejectedColor);

                    gethexcode('#textColor', obj.color);
                    gethexcode('#textValidationColor', obj.validationColor);
                    gethexcode('#textRejectedColor', obj.rejectedColor);

                    $('#textColorValue').text(obj.color);
                    $('#textValidationColorValue').text(obj.validationColor);
                    $('#textRejectedColorValue').text(obj.rejectedColor);
                   
                    $('#textModifiedBy').val(obj.modifiedBy);
                    $('#textEventKindTimeStamp').val(obj.eventKindTimeStamp);
                    //modifiedDetails('Edit');
                    GetLevel(obj.level);
                    GetCategories(obj.categoryCode, "textCategoryCode")
                    getAccessLevel(obj.accessLevel, 'textAccessLevel');
                    getAccessLevel(obj.validationLevel, 'textValidationLevel');
                    populateSelect(obj.valid, 'textValid');
                    populateSelect(obj.requestFromTo, 'textRequestFromTo');
                    populateSelect(obj.requestDuration, 'textRequestDuration');
                    populateSelect(obj.requestAmount, 'textRequestAmount');
                    populateSelect(obj.requestComments, 'textRequestComments');
                    populateSelect(obj.overloadable, 'textOverloadable');
                    populateSelect(obj.mustOverloadable, 'textMustOverloadable');
                }); // Closing each loop
            },
            error: function (xhr, textStatus, errorThrown) {
                // Handle error response
                console.error('Error deleting record:', textStatus, errorThrown);
               
            }

        });
    }


    function insertEventKindDetails() {
        var textColor =$('#textColor').val();
        var textValidationColor =$('#textValidationColor').val();
        var textRejectedColor = $('#textRejectedColor').val();

        var dataToSend = {
            Id: parseInt($('#textEventkindId').val()),
            Code: $('#textCode').val(),
            Name: $('#textName').val(),
            Level: parseInt($('#textLevel').val()),
            Overloadable: parseInt($('#textOverloadable').val()),
            MustOverloadable: parseInt($('#textMustOverloadable').val()),
            RequestFromTo: parseInt($('#textRequestFromTo').val()),
            RequestDuration: parseInt($('#textRequestDuration').val()),
            RequestAmount: parseInt($('#textRequestAmount').val()),
            RequestComments: parseInt($('#textRequestComments').val()),
            AccessLevel: parseInt($('#textAccessLevel').val()),
            ValidationLevel: parseInt($('#textValidationLevel').val()),
            Color: textColor,
            ValidationColor: textValidationColor,
            RejectedColor: textRejectedColor,
            Valid: parseInt($('#textValid').val()),
            ModifiedBy: $('#textModifiedBy').val(),
            EventKindTimeStamp: $('#textEventKindTimeStamp').val(),
            CategoryCode: $('#textCategoryCode').val()
        };

        $.ajax({
            url: 'ManagerEvents/AddEventKinds',
            method: 'POST',
            data: dataToSend,
            success: function (response) {
                console.log(JSON.stringify(response));
                refreshGrid();
                if (response.success) {
                    $('#alert-insert-green').modal('show').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('#alert-insert-green').modal('hide');
                    }, 5000);
                    $('#alert-insert-popup').modal('hide');
                } else {
                    $('#alert-delete-red').modal('show');
                    $('#alert-delete-red .modal-body').html('<h4>' + response.message + '</h4>');
                    $('#alert-delete-red').fadeIn();

                    // Delay for 5 seconds and then hide the modal
                    setTimeout(function () {
                        $('#alert-delete-red').modal('hide');
                    }, 5000);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                // Handle error response
                console.error('Error deleting record:', textStatus, errorThrown);
            }
        });
        cleatAllText();
    }

    function updateEventKindDetails() {
        var textColor = $('#textColor').val();
        var textValidationColor = $('#textValidationColor').val();
        var textRejectedColor = $('#textRejectedColor').val();

        var dataToSend = {
            Id: parseInt($('#textEventkindId').val()),
            Code: $('#textCode').val(),
            Name: $('#textName').val(),
            Level: parseInt($('#textLevel').val()),
            Overloadable: parseInt($('#textOverloadable').val()),
            MustOverloadable: parseInt($('#textMustOverloadable').val()),
            RequestFromTo: parseInt($('#textRequestFromTo').val()),
            RequestDuration: parseInt($('#textRequestDuration').val()),
            RequestAmount: parseInt($('#textRequestAmount').val()),
            RequestComments: parseInt($('#textRequestComments').val()),
            AccessLevel: parseInt($('#textAccessLevel').val()),
            ValidationLevel: parseInt($('#textValidationLevel').val()),
            Color: textColor,
            ValidationColor: textValidationColor,
            RejectedColor: textRejectedColor,
            Valid: parseInt($('#textValid').val()),
            ModifiedBy: $('#textModifiedBy').val(),
            EventKindTimeStamp: $('#textEventKindTimeStamp').val(),
            CategoryCode: $('#textCategoryCode').val()
        }; 

        $.ajax({
            url: 'ManagerEvents/UpdateEventKinds',
            method: 'POST',
            data: dataToSend,
            success: function (response) {
                console.log(JSON.stringify(response));
                refreshGrid();
                if (response.success) {
                    $('#alert-update-green').modal('show');
                    $('#alert-update-green').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('#alert-update-green').modal('hide');
                    }, 5000);
                    $('#alert-update-popup').modal('hide');
                } else {
                    $('#alert-delete-red').modal('show');
                    $('#alert-delete-red .modal-body').html('<h4>' + response.message + '</h4>');
                    $('#alert-delete-red').fadeIn();

                    // Delay for 5 seconds and then hide the modal
                    setTimeout(function () {
                        $('#alert-delete-red').modal('hide');
                    }, 5000);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                // Handle error response
                console.error('Error deleting record:', textStatus, errorThrown);
            }
        });
        cleatAllText();
    }


    $("#enregisterBtn").on("click", function () {
        if (checkFields()) {  
            return false;
        }
        var passengerId = $("#textEventkindId").val();
        if (passengerId > 0 && passengerId != null) {
            $('#alert-update-popup').modal('show');
            // Handle the confirmation action
            $("#btnUpdateConfirm").one("click", function () {
                changes = false;
                window.globalChange = changes;
                updateEventKindDetails();
                $(".box-container-blk").hide();
            });
        } else {
            $('#alert-insert-popup').modal('show');
            // Handle the confirmation action
            $("#btnInsertConfirm").one("click", function () {
                changes = false;
                window.globalChange = changes;
                insertEventKindDetails();
                $(".box-container-blk").hide();
            });           
        }
    });


    function cleatAllText() {
        $('#textEventkindId').val(0);
        $('#textCode').val('');
        $('#textName').val('');
        $('#textColor').val('#000000');
        $('#textValidationColor').val('#008000');
        $('#textRejectedColor').val('#FF0000');
        $('#textColorValue').text('#000000');
        $('#textValidationColorValue').text('#008000');
        $('#textRejectedColorValue').text('#FF0000');
        GetLevel(0);
        GetCategories("OTHER", "textCategoryCode")
        getAccessLevel(0, 'textAccessLevel');
        getAccessLevel(0, 'textValidationLevel');
        populateSelect(0, 'textValid');
        populateSelect(0, 'textRequestFromTo');
        populateSelect(0, 'textRequestDuration');
        populateSelect(0, 'textRequestAmount');
        populateSelect(0, 'textRequestComments');
        populateSelect(0, 'textOverloadable');
        populateSelect(0, 'textMustOverloadable');
    }

    //Reset button function
    $("#resetBtn").on("click", function () {
        /*cleatAllText();
        modifiedDetails();*/
        if (changes == true) {
            showConfirmPopup(TripsCancelConfirmMessage);
            $('#confirm-button').click(function () {
                changes = false;
                window.globalChange = changes;
                cleatAllText();
                modifiedDetails();
                $(".box-container-blk").hide();
                hideConfirmPopup();
            });
        }
        else {
            cleatAllText();
            modifiedDetails();
            $(".box-container-blk").hide();
        }
       // $(".box-container-blk").hide();
    })

    $('#textColor').change(function () {
        $('#textColorValue').text($(this).val())
    });

    $('#textValidationColor').change(function () {
        $('#textValidationColorValue').text($(this).val())
    });
   
    $('#textRejectedColor').change(function () {
        $('#textRejectedColorValue').text($(this).val()) 
    });

    function modifiedDetails() {
        // Get the current date and time
        var currentDateTime = new Date();
        // Format the date and time as desired
        var formattedDateTime = currentDateTime.toLocaleString();
        // Set the value of the input field to the formatted date and time
        $('#textEventKindTimeStamp').val(formattedDateTime);
        dataToSend = { send: true };
        $.ajax({
            url: 'Home/GetUserLoginDetails',
            method: 'GET',
            data: dataToSend,
            success: function (response) {
                $('#textModifiedBy').val(response.name);
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    //Delete eventkind by Id
    function deleteEventKind(id) {
        var dataToSend = { id: parseInt(id) };
        $(".box-container-blk").show();
        $('#alert-delete-popup').modal('show');
       
        // Handle the confirmation action
        $('#btnDeleteConfirm').one('click', function () {
            $('#alert-delete-popup').modal('hide');
            $.ajax({
                url: 'ManagerEvents/DeleteEventKindById',
                method: 'GET',
                data: dataToSend, // Pass any data required for deletion, such as the record ID
                success: function (response) {
                    $(".box-container-blk").hide();
                    // Handle success response, if needed
                    console.log('Record deleted successfully:', response);
                    if (response.success) {
                        $('#alert-delete-red').modal('show');
                        $('#alert-delete-red').fadeIn();
                        // Delay for 5 seconds
                        setTimeout(function () {
                            $('#alert-delete-red').modal('hide');
                        }, 5000);
                    } else {
                        $('#alert-delete-red').modal('show');
                        $('#alert-delete-red .modal-body').html('<h4>' + response.message + '</h4>');
                        $('#alert-delete-red').fadeIn();

                        // Delay for 5 seconds and then hide the modal
                        setTimeout(function () {
                            $('#alert-delete-red').modal('hide');
                        }, 5000);
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    // Handle error response
                    console.error('Error deleting record:', textStatus, errorThrown);
                }
            });
        });
        cleatAllText();
        refreshGrid();
    }


    // Define the IDs of the first and last name input fields
    var nameIds = ['#textCode', '#textName'];
    // Attach event handlers to perform name validation
    $.each(nameIds, function (index, id) {
        $(id).on('change', function (event) {
            checkFields();
        });
    });
    function checkFields() {
        var ids = ['#textCode', '#textName'];
        // Initialize a flag to check if any field is empty
        var emptyFieldFound =0;

        // Loop through each input field
        ids.forEach(function (id) {
            // Check if the field is empty
            if ($(id).val() === '' || $(id).val() === null) {
                $(id).attr('title', ValidateFields);
                $(id).css('border', '1px solid #ff0000');
                emptyFieldFound = +1; // Set flag to true if empty field is found
            } else {
                $(id).removeAttr('title', ValidateFields);
                $(id).css('border', '1px solid #cacccf');
            }
        });

        // If any empty field is found, disable the button and change its style
        if (emptyFieldFound>0) {
            return true;
        } else {
            return false;
        }
    }


    function gethexcode(elementId, colorname) { 
        try {
            var letterRegex = /^[a-zA-Z]+$/;
            if (colorname != null || colorname != '' || !letterRegex.test(colorname)) {
                $(elementId).css('background-color', '');
                $(elementId).css('background-color', colorname);
                var rgb = $(elementId).css('background-color')
                var hexcode = convert(rgb);
                $(elementId).val(hexcode);
                $(elementId + 'Value').text(hexcode);
                $(elementId).css('background-color', '');
            }
        } catch{
        }
    }
    function convert(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hexCode(i) {
            // Take the last 2 characters and convert them to Hexadecimal.
            return ("0" + parseInt(i).toString(16)).slice(-2);
        }
        return "#" + hexCode(rgb[1]) + hexCode(rgb[2]) + hexCode(rgb[3]);
    }
})

function showOverlay() {
    document.getElementById('overlay').style.display = 'flex';
}

// Function to hide the overlay
function hideOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

