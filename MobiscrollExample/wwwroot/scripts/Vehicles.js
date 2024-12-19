$(document).ready(function () {
    var changes = false;
    var TripsCancelConfirmMessage;
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
                }, 3000)
                break;
            default:// Default Success Alert
                console.log("No category of alert selected");
                break;
        }
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
    function modifiedDetails() {
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
                $('#textModifiedBy').val(response.name);
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }
    var originalDiv;
    var Name;
    var Code;
    var ValidateFields;

    $.ajax({
        url: '/Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("language translation data", data);

            Name = data.NameDisplayName;
            Code = data.CodeDisplayName;
            ValidateFields = data.ValidateFields;
            TripsCancelConfirmMessage = data.TripsCancelConfirmMessage;
            $.ajax({
                url: 'Vehicle/GetVehicles',
                method: 'GET',
                success: function (data) {
                    $("#passanger-grid").jqGrid('clearGridData');
                    var mydata = null;
                    mydata = data.map(function (item) {
                        //console.log(item);
                        return {

                            Id: item.id,
                            Code: item.code,
                            Name: item.name,
                            Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                            Capacity: item.capacity,
                            ModifiedBy: item.modified_by,
                            TimeStamp: item.time_stamp,
                            Valid: item.valid,
                        };

                    }); // Close the map function here
                    console.log(mydata);
                    // Initialize the grid with new data
                    var $grid = $("#passanger-grid"),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();

                    // Set the grid width
                    $grid.jqGrid("setGridWidth", newWidth, true);

                    jQuery("#passanger-grid").jqGrid({
                        data: mydata,
                        datatype: "local",
                        colNames: [Name, Code, 'Action', 'Id', 'Valid', 'ModifiedBy', 'Capacity', 'TimeStamp'],
                        colModel: [
                            { name: 'Name', index: 'Name', width: 150, align: 'left' },
                            { name: 'Code', index: 'Code', width: 80, align: 'left' },
                            { name: 'Action', index: 'Action', width: 30, align: 'center' },

                            { name: 'Id', index: 'Id', hidden: true },
                            { name: 'Valid', index: 'Valid', hidden: true },
                            { name: 'ModifiedBy', index: 'ModifiedBy', hidden: true },
                            { name: 'Capacity', index: 'Capacity', hidden: true },
                            { name: 'TimeStamp', index: 'TimeStamp', hidden: true },
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
                        var VehicleId = rowData[3];
                        console.log(VehicleId);
                        getVehicleById(parseInt(VehicleId));
                    });

                    ////Attach click event handler to delete buttons
                    //$("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                    //    event.stopPropagation();
                    //    var rowData = {};
                    //    rowData = $(this).closest("tr").find("td").map(function () {
                    //        return $(this).text();
                    //    }).get();
                    //    var id = rowData[3];
                    //    showConfirmPopup('Are you sure you want to delete this vehicle');
                    //    $('#confirm-button').click(function () {
                    //        deleteVehicle(id);

                    //        // Close the modal
                    //        hideConfirmPopup();

                    //    });
                    //});

                    //Attach click event handler to delete buttons
                    $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                        event.stopPropagation();
                        var rowData = {};
                        rowData = $(this).closest("tr").find("td").map(function () {
                            return $(this).text();
                        }).get();
                        var id = rowData[3];
                        console.log("rowData", rowData);
                        console.log("data", id);
                        deleteVehicle(id);
                    });
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


    //$("#sort-button").on("click", function () {

    //    //originalDiv = $('.passanger-info-list').clone();

    //    var combinedInfoColContainer = $('<div class="combined-info-col-container"></div>');

    //    //// Iterate through each accordion item and collect the info-col elements
    //    $('.accordion-item').each(function () {
    //        var infoCols = $(this).find('.info-col');
    //        infoCols.each(function () {
    //            combinedInfoColContainer.append($(this).clone());
    //        });
    //    });

    //    //// Append the combined container to the desired location in the DOM
    //    //// Here, I'm appending it at the end of the accordion
    //    //$('#accordionPanelsStayOpenExample').append(combinedInfoColContainer);

    //    $('.passanger-info-list').empty();

        

    //    //$('.accordion-body').each(function () {
    //    //    // Hide all direct children of accordion-body
    //    //    $(this).parent().hide();

    //    //    // Show only the divs with class info-col inside the accordion-body
    //    //    $(this).find('.info-col').show();
    //    //});

    //    //var infoCols = $('.info-col').toArray();

    //    // Sort the info-col elements based on the text inside the span element
    //    console.log(combinedInfoColContainer);

    //    var infoCols = combinedInfoColContainer.children('.info-col').toArray();
    //    infoCols.sort(function (a, b) {
    //        console.log('a-->', a);
    //        console.log('b-->', b);

    //        var textA = getSpanText(a).toLowerCase();
    //        var textB = getSpanText(b).toLowerCase();
    //        if (textA < textB) return -1;
    //        if (textA > textB) return 1;
    //        return 0;
    //    });
    //    console.log(combinedInfoColContainer);
    //    combinedInfoColContainer.empty();
    //    $.each(infoCols, function (index, infoCol) {
    //        combinedInfoColContainer.append(infoCol);
    //    });
    //    // Re-append the sorted info-col elements to their parent container
    //    // Assuming they all have the same parent container for simplicity
    //    //$('.accordion-item').each(infoCols, function (index, infoCol) {
    //    //    combinedInfoColContainer.append(infoCol);
    //    //});
    //    $('.passanger-info-list').append(combinedInfoColContainer);

    //});

    //function getSpanText(infoCol) {
    //    return $(infoCol).find('.info-left span').first().text().trim();
    //}

    function refreshGrid() {
        $.ajax({
            url: 'Vehicle/GetVehicles',
            method: 'GET',
            success: function (data) {
                $("#passanger-grid").jqGrid('clearGridData');
                var mydata = null;
                mydata = data.map(function (item) {
                    console.log(item);
                    return {

                        Id: item.id,
                        Code: item.code,
                        Name: item.name,
                        Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        Capacity: item.capacity,
                        ModifiedBy: item.modified_by,
                        TimeStamp: item.time_stamp,
                        Valid: item.valid,
                    };

                }); // Close the map function here
                var $grid = $("#passanger-grid");
                $grid.jqGrid('clearGridData');
                $grid.jqGrid('setGridParam', {
                    datatype: 'local',
                    data: mydata
                }).trigger("reloadGrid");
                
            },
            error: function (error) {
                alert('Error : ' + JSON.stringify(error));
                console.error('Error fetching data:', JSON.stringify(error));
            }
        });
    }

    function getVehicleById(VehicleId) {
        console.log(VehicleId)
        $.ajax({
            url: 'Vehicle/GetVehicleById',
            method: 'GET',
            data: { id: VehicleId },
            success: function (obj) {

                console.log(obj);

                $('#textId').val(obj.id);
                $('#textCode').val(obj.code);
                $('#textName').val(obj.name);
                $('#textCapacity').val(obj.capacity);
                $('#textValid').val(obj.valid);
                $('#textModifiedBy').val(obj.modified_by);
                var simpleDate = new Date(obj.time_stamp).toLocaleString();
                $('#textTimeStamp').val(simpleDate);
            },
            error: function (error) {
                alert(JSON.stringify(error));
                console.error('Error fetching data:', error);
            }

        });
    }
    $("#addPassengerBtn").on("click", function () {
        $(".box-container-blk").hide();
        clearAll();
        modifiedDetails();
        $("input").css('border', '1px solid #cacccf');
        $(".box-container-blk").show();
    });



    function addEditVehicle() {
        var vehicleId = $('#textId').val();
        var dataToSend = {
            Id: vehicleId,
            Code: $("#textCode").val(),
            Name: $('#textName').val(),
            Capacity: $('#textCapacity').val(),
            Valid: $('#textValid').val(),
            ModifiedBy: $('#textModifiedBy').val()
        }



        $.ajax({
            url: 'Vehicle/SaveOrEditVehicle',
            method: 'POST',
            data: dataToSend,
            success: function (response) {
                console.log('data from api-------------->', response);
                if (response != null) {
                    var key = sessionStorage.getItem("vehicleId");
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
                }
                else {
                    alertCustom(2, "Code already exists, not able to insert");
                    //$('#alert-delete-red').modal('show');
                    //$('#alert-delete-red').fadeIn();
                    //// Delay for 5 seconds
                    //setTimeout(function () {
                    //    $('#alert-delete-red').modal('hide');
                    //}, 3000);
                    
                    //clearAll();
                }
                
                // location.reload();
            },
            error: function (error) {
                //alert(JSON.stringify(error));
                console.error('Error fetching data:', error);
            }
        });
    }

    $("#enregisterBtn").on("click", function () {
        if (checkFields()) {
            return false;
        }
        var vehicleId = $('#textId').val();
        sessionStorage.setItem("vehicleId", vehicleId);
        if (vehicleId > 0 && vehicleId != null) {
            $('#alert-update-popup').modal('show');
            // Handle the confirmation action

            $('#btnUpdateConfirm').click(function () {
                $('#alert-update-popup').modal('hide');
                $(".box-container-blk").hide();
                changes = false;
                window.globalChange = changes;
                addEditVehicle();
            });
        } else {
            $('#alert-insert-popup').modal('show');
            // Handle the confirmation action

            $('#btnInsertConfirm').click(function () {
                $('#alert-insert-popup').modal('hide');
                $(".box-container-blk").hide();
                changes = false;
                window.globalChange = changes;
                addEditVehicle();
            });
        }

    })




    //function addEditVehicle() {
    //    var vehicleId = $('#textId').val();
    //    var dataToSend = {
    //        Id: vehicleId,
    //        Code: $('#textCode').val(),
    //        Name: $('#textName').val(),
    //        Capacity: $('#textCapacity').val(),
    //        Valid: $('#textValid').val(),
    //        ModifiedBy: $('#textModifiedBy').val()

    //        //TimeStamp: $('#textTimeStamp').val()
    //    }
    //    $.ajax({
    //        url: 'Vehicle/SaveOrEditVehicle',
    //        method: 'PUT',
    //        data: dataToSend,
    //        success: function (response) {
    //            //console.log(JSON.stringify(response));
    //            alertCustom(0, 'User updated successfully!');
    //            setTimeout(function () { location.reload(); }, 5000);

    //        },
    //        error: function (error) {
    //            //alert(JSON.stringify(error));
    //            alertCustom(2, 'User updated successfully!');
    //            setTimeout(function () { location.reload(); }, 2000);

    //            console.error('Error fetching data:', error);
    //        }
    //    });

    //    }


    function deleteVehicle(id) {
        var dataToSend = { id: parseInt(id) };

        console.log(dataToSend);
        $(".box-container-blk").show();
        $('#alert-delete-popup').modal('show');
        $('#btnDeleteConfirm').click(function () {
            $.ajax({
                url: 'Vehicle/DeleteVehicle',
                method: 'DELETE',
                data: dataToSend, // Pass any data required for deletion, such as the record ID
                success: function (response) {
                    // Handle success response, if needed
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
                    // location.reload();
                },
                error: function (xhr, textStatus, errorThrown) {
                    // Handle error response
                    console.error('Error deleting record:', textStatus, errorThrown);
                }
            });

        });
    };


    //function deleteVehicle(Id) {
    //    var dataToSend = { id: parseInt(Id) };
    //    $(".box-container-blk").show();

    //    // No need for confirmation dialog, proceed directly with AJAX request
    //    $.ajax({
    //        url: 'Vehicle/deleteVehicle',
    //        method: 'DELETE',
    //        data: dataToSend, // Pass any data required for deletion, such as the record ID
    //        success: function (response) {
    //            // Handle success response, if needed
    //            alertCustom(0, "Record deleted successfully");
    //            console.log('Record deleted successfully:', response);
    //            location.reload();
    //        },
    //        error: function (error) {
    //            alertCustom(0, "Parameter successfully updated");
    //            setTimeout(function () { location.reload(); }, 5000);
    //            // Handle error response
    //            console.error('Error fetching data:', error);
    //        }
    //    });
    //}
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
    /*int Id, string Name, string Code, string lastname, string firstname, string email, string phonenumber, int unassigned, int unconfirmed, string url,

       string username, string password, string personalcode, int _interface, int Interval, string Comment, int Valid, string ? Modified_By*/
    function clearAll() {
        $('#textId').val('');
        //$("#textCode").attr('maxlength', 10);
        $('#textCode').val("");
        $('#textName').val("");
        $('#textValid').val(1);
        $('#textCapacity').val("");
        $('#textModifiedBy').val("");
        //var simpleDate = new Date(obj.time_stamp).toLocaleString();
        $('#textTimeStamp').val("");
    }
    $(document).on("keyup", '#gsearch', function () {
        // Clear the content of the Passenger-grid
        var inputString = $('#gsearch').val();
        $.ajax({
            url: '/Vehicle/SearchVehicle',
            method: 'GET',
            data: { searchString: inputString },
            success: function (data) {
                // Mapping data to mydata
                var mydata = null;
                var mydata = data.map(function (item) {
                    return {
                        Id: item.id,
                        Code: item.code,
                        Name: item.name,
                        Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        Valid: item.valid,
                        Capacity: item.capacity,
                        ModifiedBy: item.modified_by,
                        TimeStamp: item.time_stamp
                    };
                }); // Close the map function here

                // Clear and reload the grid with the filtered data
                var $grid = $("#passanger-grid");
                $grid.jqGrid('clearGridData');
                $grid.jqGrid('setGridParam', {
                    datatype: 'local',
                    data: mydata
                }).trigger("reloadGrid");
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

    var nameIds = ['#textCode', '#textName'];
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
        //$(id).on('keypress', function (event) {
           
        //    var charCode = event.which || event.keyCode;

        //    // Check if the pressed key is a letter or space
        //    if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
        //        // Prevent the default action if it's not a letter or space
        //        event.preventDefault();
        //    }
        //});
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
        var stringids = ['#textCode','#textName'];
        var numberids = ['#textCapacity'];
        // Initialize a flag to check if any field is empty
        var emptyFieldFound = 0;
        let scrollcount = 0;
        // Loop through each input field
        stringids.forEach(function (id) {
            // Check if the field is empty
            if ($(id).val() === '' || $(id).val() === null) {
                /*     scrollcount++;
                     if (scrollcount == 1) {
     
                         $(id).scrollIntoView();
                     }*/
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
            //  $('#enregisterBtn').removeClass('btn-yellow').addClass('btn-gray').prop('disabled', true);
            return true;
        } else {
            // $('#enregisterBtn').removeClass('btn-gray').addClass('btn-yellow').prop('disabled', false);
            return false;
        }
    }

})
