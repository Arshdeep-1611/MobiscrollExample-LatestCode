$(document).ready(function () {
    //Displaying records in grid


    var NameDisplayName;
    var StreetDisplayName;
    var CityDisplayName;
    var ValidateFields;
    var TripsCancelConfirmMessage;
    var changes = false;
    function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
    }

    // Function to hide the overlay
    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }
    showOverlay();
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
    $.ajax({
        url: '/Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("language translation data", data);

            NameDisplayName = data.NameDisplayName;
            StreetDisplayName = data.StreetDisplayName;
            CityDisplayName = data.CityDisplayName;
            ValidateFields = data.ValidateFields;
            TripsCancelConfirmMessage = data.TripsCancelConfirmMessage

            $.ajax({
                url: 'ManagerEmplacements/GetLocation',
                method: 'GET',
                success: function (data) {
                    console.log(data);
                    $("#passanger-grid").jqGrid('clearGridData');
                    var mydata = null;
                    mydata = data.map(function (item) {
                        return {
                            locationName: item.locationName,
                            street: item.street,
                            city: item.city,
                            Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                            code: item.code,
                            locationId: item.locationId,
                            country: item.country,
                            comment: item.comment,
                            userId: item.userId,
                            temps: item.temps,
                            isEditable: item.isEditable,
                            npa: item.npa,
                            isPrivate: item.isPrivate,
                            isValid: item.valid,
                            latitude: item.latitude,
                            longitude: item.longitude,
                            zoom: item.zoom,
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
                        colNames: [NameDisplayName, StreetDisplayName, CityDisplayName, '<div style="text-align: center;">Action(s)</div>', 'Code', 'LocationId', 'UserId ', 'Country', 'IsValid', 'Comment', 'Temps', 'IsEditable', 'Npa', 'IsPrivate', 'Latitude', 'Longitude', 'Zoom'],
                        colModel: [
                            { name: 'locationName', index: 'locationName', width: 50, align: 'left' },
                            { name: 'street', index: 'street', width: 70, align: 'left' },
                            { name: 'city', index: 'city', width: 50, align: 'left' },
                            { name: 'Action', index: 'Action', width: 30, align: 'center' },

                            { name: 'code', index: 'code', hidden: true },
                            { name: 'locationId', index: 'locationId', hidden: true },
                            { name: 'userId', index: 'UserId', hidden: true },
                            { name: 'country', index: 'country', hidden: true },
                            { name: 'isValid', index: 'isValid', hidden: true },
                            { name: 'comment', index: 'comment', hidden: true },
                            { name: 'temps', index: 'temps', hidden: true },
                            { name: 'isEditable', index: 'isEditable', hidden: true },
                            { name: 'npa', index: 'npa', hidden: true },
                            { name: 'isPrivate', index: 'isPrivate', hidden: true },
                            { name: 'zoom', index: 'zoom', hidden: true },
                            { name: 'latitude', index: 'latitude', hidden: true },
                            { name: 'longitude', index: 'longitude', hidden: true }


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
                        var locationId = rowData[5];
                        getLocationById(locationId);
                    });

                    /* Attach click event handler to delete buttons*/
                    $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                        event.stopPropagation();
                        var rowData = {};
                        rowData = $(this).closest("tr").find("td").map(function () {
                            return $(this).text();
                        }).get();
                        var locationId = rowData[5];
                        deleteLocation(locationId);
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


    //Searching based on keywords
    $(document).on("keyup", '#gsearch', function () {
        // Clear the content of the Passenger-grid
        var inputString = $('#gsearch').val();
        var inputValue = $('#textFilter').val();
        /*showOverlay();*/
        $.ajax({
            url: '/ManagerEmplacements/SearchLocationByKeyword',
            method: 'GET',
            data: {
                searchString: inputString,
                isAdmin: 1,
                filterInput: inputValue
            },
            success: function (data) {
                // Mapping data to mydata
                var mydata = null;
                var mydata = data.map(function (item) {
                    return {
                        locationName: item.locationName,
                        street: item.street,
                        city: item.city,
                        Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        code: item.code,
                        locationId: item.locationId,
                        country: item.country,
                        comment: item.comment,
                        userId: item.userId,
                        temps: item.temps,
                        isEditable: item.isEditable,
                        npa: item.npa,
                        isPrivate: item.isPrivate,
                        isValid: item.isValid,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        zoom: item.zoom,
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
                    var locationId = rowData[5];
                    getLocationById(locationId);
                });

                /* Attach click event handler to delete buttons*/
                $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                    event.stopPropagation();
                    var rowData = {};
                    rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var locationId = rowData[5];
                    deleteLocation(locationId);
                });
               /* hideOverlay();*/
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
    /*$(document).on("input", '#gsearch', function () {
        if ($('#gsearch').val() === '') {
            refreshGrid();
        }
        else {
            //Searching based on keywords
            var inputString = $('#gsearch').val();
            var inputValue = $('#textFilter').val();
            showOverlay();
            $.ajax({
                url: '/ManagerEmplacements/SearchLocationByKeyword',
                method: 'GET',
                data: { searchString: inputString, filterInput: inputValue },
                success: function (data) {
                    // Mapping data to mydata
                    var mydata = null;
                    mydata = data.map(function (item) {
                        return {
                            locationName: item.locationName,
                            street: item.street,
                            city: item.city,
                            Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                            code: item.code,
                            locationId: item.locationId,
                            country: item.country,
                            comment: item.comment,
                            userId: item.userId,
                            temps: item.temps,
                            isEditable: item.isEditable,
                            npa: item.npa,
                            isPrivate: item.isPrivate,
                            isValid: item.isValid,
                            latitude: item.latitude,
                            longitude: item.longitude,
                            zoom: item.zoom,
                        };

                    });

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
                        var locationId = rowData[5];
                        getLocationById(locationId);
                    });

                    *//* Attach click event handler to delete buttons*//*
                    $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                        event.stopPropagation();
                        var rowData = {};
                        rowData = $(this).closest("tr").find("td").map(function () {
                            return $(this).text();
                        }).get();
                        var locationId = rowData[5];
                        deleteLocation(locationId);
                    });
                    hideOverlay();
                },
                error: function (error) {
                    alert('Error : ' + JSON.stringify(error));
                    console.error('Error fetching data:', JSON.stringify(error));
                }
            });
        }
    });*/
   /* showOverlay();
    $.ajax({
        url: '/ManagerEmplacements/FilterLocations',
        method: 'GET',
        data: { filterInput: inputValue },
        success: function (data) {
            // Map the fetched data to the format expected by jqGrid
            $("#passanger-grid").jqGrid('clearGridData');
            var mydata = null;
            mydata = data.map(function (item) {
                return {
                    locationName: item.locationName,
                    street: item.street,
                    city: item.city,
                    Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                    code: item.code,
                    locationId: item.locationId,
                    country: item.country,
                    comment: item.comment,
                    userId: item.userId,
                    temps: item.temps,
                    isEditable: item.isEditable,
                    npa: item.npa,
                    isPrivate: item.isPrivate,
                    isValid: item.isValid,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    zoom: item.zoom,
                };

            }); // Close the map function here

            // Clear and reload the grid with the filtered data
            var $grid = $("#passanger-grid");
            $grid.jqGrid('clearGridData');
            $grid.jqGrid('setGridParam', {
                datatype: 'local',
                data: mydata
            }).trigger("reloadGrid");

            $("#passanger-grid").off("click", "tr").on("click", "tr", function (event) {
                event.stopPropagation();
                $(".box-container-blk").show();

                var rowData = {};
                var rowData = $(this).closest("tr").find("td").map(function () {
                    return $(this).text();
                }).get();
                console.log(rowData);
                var locationId = rowData[5];
                getLocationById(locationId);
            });

            *//* Attach click event handler to delete buttons*//*
            $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                event.stopPropagation();
                var rowData = {};
                rowData = $(this).closest("tr").find("td").map(function () {
                    return $(this).text();
                }).get();
                var locationId = rowData[5];
                deleteLocation(locationId);
            });
            hideOverlay();
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });*/
    function refreshGrid() {
        var inputValue = $('#textFilter').val();
        showOverlay();
        $.ajax({
            url: '/ManagerEmplacements/FilterLocations',
            method: 'GET',
            data: { filterInput: inputValue },
            success: function (data) {
                // Map the fetched data to the format expected by jqGrid
                $("#passanger-grid").jqGrid('clearGridData');
                var mydata = null;
                mydata = data.map(function (item) {
                    return {
                        locationName: item.locationName,
                        street: item.street,
                        city: item.city,
                        Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        code: item.code,
                        locationId: item.locationId,
                        country: item.country,
                        comment: item.comment,
                        userId: item.userId,
                        temps: item.temps,
                        isEditable: item.isEditable,
                        npa: item.npa,
                        isPrivate: item.isPrivate,
                        isValid: item.isValid,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        zoom: item.zoom,
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
            },
            complete: function () {
                hideOverlay();
            }
        });
       /* $.ajax({
            url: 'ManagerEmplacements/GetLocation',
            method: 'GET',
            success: function (data) {
                $("#passanger-grid").jqGrid('clearGridData');
                var mydata = [];
                mydata = data.map(function (item) {
                    // console.log(item);
                    return {
                        locationName: item.locationName,
                        street: item.street,
                        city: item.city,
                        Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        code: item.code,
                        locationId: item.locationId,
                        country: item.country,
                        comment: item.comment,
                        userId: item.userId,
                        temps: item.temps,
                        isEditable: item.isEditable,
                        npa: item.npa,
                        isPrivate: item.isPrivate,
                        isValid: item.valid,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        zoom: item.zoom,
                    };
                }); //
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
        });*/
    }
    function getLocationById(locationId) {
        console.log(locationId);
        showOverlay();
        $.ajax({
            url: 'ManagerEmplacements/GetLocationById',
            method: 'GET',
            data: { locationId: locationId },
            success: function (obj) {
                console.log(obj);

                $('#textLocationId').val(obj.locationId);
                $('#codeEmplacement').val(obj.code);
                $('#textComment').val(obj.comment);
                populateSelect(obj.isEditable, 'textIsEdit');
                $('#textLocationName').val(obj.locationName);
                populateSelect(obj.isPrivate, 'textIsPrivate');
                $('#textTemp').val(obj.temps);
                populateSelect(obj.valid, 'textValid');
                $('#textNpa').val(obj.npa);
                $('#textCountry').val(obj.country);
                $('#textStreet').val(obj.street);
                $('#textCity').val(obj.city);
                $('#textLatitude').val(obj.latitude);
                $('#textLongitude').val(obj.longitude);
                $('#textZoom').val(obj.zoom);
              /*  $('#textOwnerId').val(obj.userId);*/
                selectOwnerById(obj.userId, 'textOwnerId');
                var simpleDate = new Date(obj.timeStamp).toLocaleString();
                $('#textTimeStamp').val(simpleDate);
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

    $('#textFilter').on('change', function () {
        var inputValue = $(this).val();
        var inputString = $('#gsearch').val();
        // Make an AJAX request to fetch filtered data
        showOverlay();
        $.ajax({
            url: '/ManagerEmplacements/SearchLocationByKeyword',
            method: 'GET',
            data: {
                searchString: inputString,
                isAdmin: 1,
                filterInput: inputValue
            },
            success: function (data) {
                // Mapping data to mydata
                var mydata = null;
                var mydata = data.map(function (item) {
                    return {
                        locationName: item.locationName,
                        street: item.street,
                        city: item.city,
                        Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        code: item.code,
                        locationId: item.locationId,
                        country: item.country,
                        comment: item.comment,
                        userId: item.userId,
                        temps: item.temps,
                        isEditable: item.isEditable,
                        npa: item.npa,
                        isPrivate: item.isPrivate,
                        isValid: item.isValid,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        zoom: item.zoom,
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
                    var locationId = rowData[5];
                    getLocationById(locationId);
                });

                /* Attach click event handler to delete buttons*/
                $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                    event.stopPropagation();
                    var rowData = {};
                    rowData = $(this).closest("tr").find("td").map(function () {
                        return $(this).text();
                    }).get();
                    var locationId = rowData[5];
                    deleteLocation(locationId);
                });
                 hideOverlay();
            },
            error: function (error) {
                alert('Error : ' + JSON.stringify(error));
                console.error('Error fetching data:', JSON.stringify(error));
            }
        });
    });


    $("#addLocationBtn").on("click", function () {
        $(".box-container-blk").show();
        clearValues();
        modifiedDetails('Add');

        populateSelect(0, 'textValid');
        populateSelect(0, 'textIsPrivate');
        populateSelect(0, 'textIsEdit');
    });

    //Delete Driver by Id
    function deleteLocation(id) {
        var dataToSend = { id: parseInt(id) };
        $(".box-container-blk").show();
        $('#alert-delete-popup').modal('show');

        $('#btnDeleteConfirm').click(function () {
            $.ajax({
                url: '/ManagerEmplacements/DeleteLocation',
                method: 'DELETE',
                data: dataToSend,
                success: function (response) {
/*                    console.log('Record deleted successfully:', response);*/
                    if (response.isDeleted == false) {
                        $('#alert-delete-popup').modal('hide');
                        $('#alert-duplicateLocation-green').modal('show');
                        $('#alert-duplicateLocation-green').fadeIn();
                        setTimeout(function () {
                            $('#alert-duplicateLocation-green').modal('hide');
                        }, 5000);
                    }
                    else {
                        $('#alert-delete-popup').modal('hide');
                        refreshGrid();
                        $('#alert-delete-popup').modal('hide');
                        $('#alert-delete-red').modal('show');
                        $('#alert-delete-red').fadeIn();
                        // Delay for 3 seconds
                        setTimeout(function () {
                            $('#alert-delete-red').modal('hide');
                        }, 3000);
                        clearAll();
                    }
                    refreshGrid();
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
    })


    //Insert/Update operations starts
    $("#enregisterBtn").on("click", function () {
        if (checkFields()) {
            return false;
        }
        var locationId = $('#textLocationId').val();
        sessionStorage.setItem("locationId", locationId);
        if (locationId > 0 && locationId != null) {
            $('#alert-update-popup').modal('show');
            // Handle the confirmation action
            $('#btnUpdateConfirm').click(function () {
                changes = false;
                window.globalChange = changes;
                $('#alert-update-popup').modal('hide');
                $(".box-container-blk").hide();
                updateLocation();       
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
                updateLocation();
            });
        }
    });

    function clearAll() {
        $('#textLocationId').val('');
        $('#codeEmplacement').val('');
        $('#textComment').val('');
        $('#textIsEdit').val(0);
        $('#textLocationName').val('');
        $('#textIsPrivate').val(0);
        $('#textTemp').val('');
        $('#textValid').val(0);
        $('#textNpa').val('');
        $('#textCountry').val('');
        $('#textStreet').val('');
        $('#textCity').val('');
        $('#textLatitude').val('');
        $('#textLongitude').val('');
        $('#textZoom').val('');
        $('#textOwnerId').val('');
        modifiedDetails('Add');
    }
    function updateLocation() {

        var id = $('#textLocationId').val();
        var locationId = parseInt($('#textLocationId').val());
        if (id === '') {
            locationId = null;
        }
        var dataToSend = {
            locationId: locationId,
            code: $('#codeEmplacement').val(),
            comment: $('#textComment').val(),
            isEditable: parseInt($('#textIsEdit').val()),
            locationName: $('#textLocationName').val(),
            isPrivate: parseInt($('#textIsPrivate').val()),
            code: $('#codeEmplacement').val(),
            temp: $('#textTemp').val(),
            valid: parseInt($('#textValid').val()),
            npa: $('#textNpa').val(),
            country: $('#textCountry').val(),

            street: $('#textStreet').val(),
            city: $('#textCity').val(),
            latitude: $('#textLatitude').val(),
            longitude: $('#textLongitude').val(),
            zoom: $('#textZoom').val(),
            modifiedBy: $('#textModifiedBy').val(),
            ownerUserId: parseInt($('#textOwnerId').val()),
        }
        $.ajax({
            url: 'ManagerEmplacements/SaveLocation',
            method: 'POST',
            data: dataToSend,
            success: function (response) {
                refreshGrid();
                if (id !== '') {
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
            },
            error: function (error) {
                alert(JSON.stringify(error));
                console.error('Error fetching data:', error);
            }
        });
    }
    //Reset the form 
    function clearValues() {
        $('#textLocationId').val('');
        $('#codeEmplacement').val('');
        $('#textComment').val('');
        $('#textIsEdit').val('');
        $('#textLocationName').val('');
        $('#textIsPrivate').val('');
        $('#textTemp').val('');
        $('#textValid').val('');
        $('#textNpa').val('');
        $('#textCountry').val('');
        $('#textStreet').val('');
        $('#textCity').val('');
        $('#textLatitude').val('');
        $('#textLongitude').val('');
        $('#textZoom').val('');
        selectOwnerById(0, 'textOwnerId');
        modifiedDetails('Add');
    }

    //Highlight the option which as per passenger table data
    function selectOwnerById(id, selectId ) {
        // Find the select element
        var $select = $('#' + selectId);


        //$select.val(id);
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


    var nameIds = ['#textLocationName', '#textCity'];
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

    $("#enregisterBtn").on("click", function () {
        if (checkFields()) {
            return false;
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

    function checkFields() {
        var stringids = ['#textLocationName', '#textCity',];
        var numberids = ['#textZoom', ];
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
