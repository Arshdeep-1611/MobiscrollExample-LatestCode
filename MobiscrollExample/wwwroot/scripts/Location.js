$(document).ready(function () {

    var filterValues = {};
    var paramsClearFilter = {};
    var NameDisplayName;
    var StreetDisplayName;
    var CityDisplayName;
    var alertCheckBox;
    var LocationPopup;
    var LocationInsert;
    var LocationDelete;
    var LocationUpdateQuestion;
    var LocationInsertQuestion;
    var BtnEdit;
    var ViewBtn;
    function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
    }


    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }

      //$(document).on("click", "#RefreshId", function () {
      //  showOverlay();
      
      //  setTimeout(function () {
      //      hideOverlay();
      //  }, 1500); 
      //});

    $.ajax({
        url: '/Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("language translation data", data);

            NameDisplayName = data.NameDisplayName;
            StreetDisplayName = data.StreetDisplayName;
            CityDisplayName = data.CityDisplayName;
            AlertCheckBox = data.alertCheckBox;
            LocationPopup = data.LocationPopup;
            LocationInsert = data.LocationInsert;
            LocationDelete = data.LocationDelete;
            LocationInsertQuestion = data.LocationInsertQuestion;
            LocationUpdateQuestion = data.LocationUpdateQuestion;
            BtnEdit = data.BtnEdit;
            ViewBtn = data.ViewBtn;

            showOverlay();
            $.ajax({
                url: '/Location/GetLocation',
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    initializegrid(data);
                    hideOverlay();
                },
                error: function (error) {
                    console.error('Failed', error);
                    hideOverlay();
                }
            });
        },
        error: function () {
            console.error("Error fetching localization data.");
        }
    });





    var locationdata = {};
    $.ajax({
        url: 'Home/GetLocationWords',
        method: 'GET',
        success: function (data) {
            //locationdata = [
            //    { value: 'addLocation', text: data.AddLocation },
            //    { value: 'editLocation', text: data.EditLocation },
            //];
            locationdata = data;
        },
            error: function (error) {
                // Handle error
                alert(JSON.stringify(error));
                console.error('Error fetching data:', error);
            }
      });

    $('#closebtn').click(function () {
        // Reset the form fields
        $('#locationId').val('');
        $("#name").val('');
        $("#street").val('');
        $("#npa").val('');
        $("#city").val('');
        $("#country").val('');
        $("#comment").val('');
        $('#checkRadioPrivate').prop('disabled', false);
        $('#checkRadioPrivate').prop('checked', true);
        $('#checkOpen').prop('checked', false);
        $('#addLocation1').show();
        $('#addLocation1').prop('disabled', false);
        $("#name").prop('disabled', false);
        $("#street").prop('disabled', false);
        $("#npa").prop('disabled', false);
        $("#city").prop('disabled', false);
        $("#country").prop('disabled', false);
        $("#comment").prop('disabled', false);
        removeFields();
        $('.warning-alert').hide();
    });


    function removeFields() {
        var stringids = ['#name', '#city'];

        // Loop through each input field
        stringids.forEach(function (id) {
            // Check if the border color is red
            if ($(id).css('border-color') === 'rgb(255, 0, 0)') {
                $(id).removeAttr('title');
                $(id).css('border', '1px solid #cacccf');
            }
        });
    }


    function checkFields() {
        var stringids = ['#name',  '#city'];

        // Initialize a flag to check if any field is empty
        var emptyFieldFound =  false;
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
                $(id).removeAttr('title', 'Empty fields!');
                $(id).css('border', '1px solid #cacccf');
            }
        });
        return !emptyFieldFound; // Return true if no empty fields are found, otherwise false
    }

    const alertCustom = (type, textValue) => {

        switch (type) {
            case 0: // Success Alert
                $("#alert-green").find("#alert-message span").text(textValue);
                $('#alert-green').modal('show');
                $('#alert-green').fadeIn();
                setTimeout(function () {
                    $('#alert-green').modal('hide');
                }, 4000);
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

    const showConfirmPopup = (textValue) => {
        $('#confirm-popup').find("#popup-body").text(textValue);
        $('#confirm-popup').modal('show');
    }

    // Event listener for when any modal is about to be shown
    $(document).on('show.bs.modal', function (e) {
        let zIndex = 1040 + (10 * $('.modal:visible').length);
        $(e.target).css('z-index', zIndex);
        setTimeout(function () {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });

    // Function to show the confirm modal when another modal is shown
    $(document).on('shown.bs.modal', function (e) {
        if (e.target.id !== 'confirm-popup') {
            //let textValue = "Another modal is already open!";
            if ($('#confirm-popup').is(':visible')) {
                $('#confirm-popup').css('z-index', parseInt($('#confirm-popup').css('z-index')) + 10);
            } else {
                /*console.log('modal opened --->'textValue);*/
            }
        }
    });

    const hideConfirmPopup = () => {
        $('#confirm-popup').modal('hide');
    }

    $("#addLocation1").on("click", function () {
        //alert(JSON.stringify(passengers()));
        if (!checkFields()) {
            return false; // Stop execution if any field is empty
        }
        $('.warning-alert').hide();
        $('#checkRadioPrivate').prop('disabled', false);
        var Id = $("#locationId").val();
        if (Id > 0 && Id != null) {
            //$('#AddNewLocation').modal('hide');
            showConfirmPopup(LocationUpdateQuestion)
            $('#confirm-button').on('click', function () {
                updateLocation();
                hideConfirmPopup();
            }); 
            $('#Cancel-button').on('click', function () {
                return false;
            });
        } else {
            //$('#AddNewLocation').modal('hide');
            showConfirmPopup(LocationInsertQuestion)
            $('#confirm-button').on('click', function () {
                updateLocation();
                hideConfirmPopup();
            });
            $('#Cancel-button').on('click', function () {
                hideConfirmPopup();
                return false;
            });
        }
    });
    function updateLocation() {
        var id = $('#locationId').val();

        // Determine the values of checkPrivate and checkOpen based on the state of checkRadioPrivate
        var isPrivateChecked = $('#checkRadioPrivate').prop('checked');

        var params = {
            locationId: $('#locationId').val(),
            name: $("#name").val(),
            street: $("#street").val(),
            npa: $("#npa").val(),
            city: $("#city").val(),
            country: $("#country").val(),
            comment: $("#comment").val(),
           /* checkRadioCommon: $('#checkRadioCommon').prop('checked') ? 1 : 0,*/
            //checkPrivate: $('#checkRadioPrivate').prop('checked') ? 1 : 0,
            //checkOpen: $('#checkOpen').prop('checked') ? 1 : 0,
            checkPrivate: isPrivateChecked ? 1 : 0,
            //checkOpen: isPrivateChecked ? 0 : 1, 
        }
        console.log(params);
        showOverlay();
        $.ajax({
            type: 'POST',
            url: '/Location/SaveLocation',
            dataType: 'json',
            data: params,
            async: true,
            success: function (data) {
                if (id !== '') {
                    alertCustom(0, LocationPopup);
                }
                else {
                    alertCustom(0, LocationInsert);
                }
                setTimeout(location.reload.bind(location), 3000);
                hideOverlay();
                // Redirect to the Location page
                window.location.href = "/Location";
            },
            error: function (error) {
                console.error('Failed', error);
            }
        });
    }

    //function setCheckBox(element, value) {
    //    if (value == 1) {
    //        $('#' + element).prop('checked', true); // Check the checkbox
    //    }
    //    if (value == 0) {
    //        $('#' + element).prop('checked', false); // Uncheck the checkbox
    //    }
    //}
    function setCheckBox(element, isChecked) {
        $('#' + element).prop('checked', isChecked);
    }
    function locationSearchByKeyword() {
        $.ajax({
            url: '/Location/SearchLocationByKeyword',
            method: 'GET',
            data: {
                searchString: $('#gsearch').val().trim() ,
                isAdmin: 0
            },
            dataType: 'json',
            async: true,
            success: function (data) {
               /*  Mapping data to mydata*/
                var mydata = null;
                //console.log(searchString);

                mydata = data.map(function (item) {
                    return {
                        Flags: getFlagsHtml(item.isEditable, item.isPrivate),
                        locationName: item.locationName,
                        locationId:item.locationId,
                        street: item.street,
                        city:item.city,
                        isPrivate: item.isPrivate,
                        isEditable: item.isEditable,
                        Action:"<img class='edit-icon'  data-location='" + item.locationId + "' src='./img/edit.png' alt='Edit'>"
                           /* "<img class='delete-icon' data-location='" + item.locationId + "' src='./img/metro-bin.png' alt='Delete'>"         */            
                    };
                });
                // Clear and reload the grid with the filtered data
                var $grid = $("#Location-grid");
                $grid.jqGrid('clearGridData');
                $grid.jqGrid('setGridParam', {
                    datatype: 'local',
                    data: mydata
                }).trigger("reloadGrid");
            },
            error: function (error) {
                console.log('Error fetching data:', error);
            }
        });
    }

    clearFields();

    removeFields();
    function clearFields() {      
        $('#name-filter').val('');
         $('#city-filter').val('');
        $('#street-filter').val('');
        $('#addLocation1').show();
        $('#addLocation1').prop('disabled', false);
        $('.warning-alert').hide();
        $('#checkRadioPrivate').prop('disabled', false);
    }

    $(document).on('click', '#closeLocationFilter', function () {
        clearFields();
    });
    
    //$(document).on('click', '.edit-icon', function () {
    //    console.log('locationData>>>', locationdata.EditLocation);
    //    $('.add-new-location-header').text(locationdata.EditLocation);
    //    $('#addLocation1 span').text(locationdata.ModifyLocation);
    //});

    $(document).on('click', '.add-new-location', function () {
        $('.add-new-location-header').text(locationdata.AddLocation);
        $('#addLocation1 span').text(locationdata.AddLocation);
    });

    //$(document).on('click', '.edit-icon', function () {
    //    console.log('locationData>>>', locationdata.EditLocation);
    //    $('.add-new-location-header').text(locationdata.EditLocation);
    //});
 $("#Apply").click(function () {
        var params = {
            name: $("#name-filter").val().trim(),
            street: $("#city-filter").val().trim(),
            city: $("#street-filter").val().trim(),
        }   
      
        $("#TripFiltersLocation").modal("hide");

         $.ajax({
             url: '/Location/SearchLocationByFilter',
             method: 'GET',
             data: params,
             dataType: 'json',
             async: true,
             success: function (data) {
                 /*  Mapping data to mydata*/
                 var mydata = null;
                 mydata = data.map(function (item) {

                     return {
                         Flags: getFlagsHtml(item.isEditable, item.isPrivate),
                         locationName: item.locationName,
                         locationId: item.locationId,
                         street: item.street,
                         city: item.city,
                         isPrivate: item.isPrivate,
                         isEditable: item.isEditable,
                         Action: "<img class='edit-icon'  data-location='" + item.locationId + "' src='./img/edit.png' alt='Edit'>" 
                          /*   "<img class='delete-icon' data-location='" + item.locationId + "' src='./img/metro-bin.png' alt='Delete'>"*/
                     };
                 });
                 // Clear and reload the grid with the filtered data
                 var $grid = $("#Location-grid");
                 $grid.jqGrid('clearGridData');
                 $grid.jqGrid('setGridParam', {
                     datatype: 'local',
                     data: mydata
                 }).trigger("reloadGrid");
             },
             error: function (error) {
                 console.log('Error fetching data:', error);
             }
         });
    });
    

    function getFlagsHtml(isEditable, isPrivate) {
        var flagImage = '';
        switch (true) {
            case isEditable == 1 && isPrivate == 1:
                flagImage = "<img src='./img/Icon ionic-ios-flag.png' alt='Flag 3'>";
                break;
            case isEditable == 1 && isPrivate == 0:
                flagImage = "<img src='./img/Open-flag.png' alt='Flag 1'>";
                break;
            case isEditable == 0 && isPrivate == 1:
                flagImage = "<img src='./img/Common-flag.png' alt='Flag 2'>";
                break;
            case isEditable == 0 && isPrivate == 0:
                flagImage = "<img src='./img/Common-flag.png' alt='Flag 2'>";
                break;
        }
        return flagImage;
    }
    
    $(document).on("change", '#gsearch', function () {
        locationSearchByKeyword()
    });

    $(document).on("click", "#RefreshId", function () {
        showOverlay();

        clearFields();
        var paramsclear = {
            name: $("#name-filter").val(),
            street: $("#city-filter").val(),
            city: $("#street-filter").val(),
        }   
        $.ajax({
            url: '/Location/GetLocation',
            method: 'GET',
            data: paramsclear,
            dataType: 'json',
            async: true,
            success: function (data) {
                /*  Mapping data to mydata*/
                var mydata = null;
                mydata = data.map(function (item) {
                    return {
                        Flags: getFlagsHtml(item.isEditable, item.isPrivate),
                        locationName: item.locationName,
                        locationId: item.locationId,
                        street: item.street,
                        city: item.city,
                        isPrivate: item.isPrivate,
                        isEditable: item.isEditable,
                        Action: "<img class='edit-icon' data-bs-toggle='modal' data-bs-target='#AddNewLocation' data-location='" + item.locationId + "' src='./img/edit.png' alt='Edit'>" 
                          /*  "<img class='delete-icon' data-location='" + item.locationId + "' src='./img/metro-bin.png' alt='Delete'>"*/
                    };
                });
                clearFields();
                setTimeout(function () {
                    hideOverlay();
                }, 3000); 
                // Clear and reload the grid with the filtered data
                var $grid = $("#Location-grid");
                $grid.jqGrid('clearGridData');
                $grid.jqGrid('setGridParam', {
                    datatype: 'local',
                    data: mydata
                }).trigger("reloadGrid");
            },
            error: function (error) {
                console.log('Error fetching data:', error);
            },           
    });
        //location.reload();
        console.log('Refreshed');
    });
    function initializegrid(mydata) {
        // Initialize the grid with new data
        var $grid = $("#Location-grid"),
            newWidth = $grid.closest(".ui-jqgrid").parent().width();

        // Set the grid width
        $grid.jqGrid("setGridWidth", newWidth, true);

        $grid.jqGrid({
            data: mydata,
            datatype: "local",
            rowNum: 20,
            rowList: [10, 20, 30],
            colNames: ['', '', NameDisplayName, StreetDisplayName, CityDisplayName, 'Action(s)'],

            colModel: [
                {
                    name: 'flags', label: 'Flags', width: 50, align: 'center', formatter: function (cellvalue, options, rowObject) {
                        var flagImage = '';
                        switch (true) {
                            case rowObject.isEditable == 1 && rowObject.isPrivate == 1:
                                flagImage = "<img src='./img/Icon ionic-ios-flag.png' alt='Flag 3' title='Private'>";
                                break;
                            case rowObject.isEditable == 1 && rowObject.isPrivate == 0:
                                flagImage = "<img src='./img/Open-flag.png' alt='Flag 1' title='Open'>";
                                break;
                           
                            case rowObject.isEditable == 0 && rowObject.isPrivate == 1:
                                flagImage = "<img src='./img/Common-flag.png' alt='Flag 2' title='Common'>";
                                break;
                            case rowObject.isEditable == 0 && rowObject.isPrivate == 0:
                                flagImage = "<img src='./img/Common-flag.png' alt='Flag 2' title='Common'>";
                                break;
                        }
                        return flagImage;
                    }
                },
                {
                    name: 'locationId', label: 'locationId', index: 'locationId', hidden: true
                },
                {
                    name: 'locationName', label: 'locationName', index: 'name', width: 160, align: 'left'
                },
                {
                    name: 'street', label: 'street', index: 'street', width: 160, align: 'left'
                },
                {
                    name: 'city', label: 'city', index: 'city', width: 160, align: 'left'
                },
                {
                    name: 'actions', label: 'Actions', width: 50, align: 'left', formatter: function (cellvalue, options, rowObject) {
                        if ((rowObject.isEditable == 1 && rowObject.isPrivate == 1) || (rowObject.isEditable == 1 && rowObject.isPrivate == 0)) {
                            var editImage = "<img class='edit-icon' data-location='" + rowObject.locationId + "' src='./img/edit.png' alt='Edit' title='" + BtnEdit + "'>";
                            /*     var editImage = `<img class='edit-icon'' data-location='" +${rowObject.locationId}+ "' src='./img/edit.png' alt='Edit' title=${BtnEdit}>`;*/
                            /*    var deleteImage = "<img class='delete-icon' data-location='" + rowObject.locationId + "' src='./img/metro-bin.png' alt='Delete'>";*/
                            /*      data - bs - toggle='modal' data - bs - target='#AddNewLocation*/
                            var url = "@Url.Action()"
                            var link = editImage

                            return link;
                        } else {
                            var editImage = "<img class='detail-icon' data-location='" + rowObject.locationId + "' src='./img/ViewLocation.png' alt='Edit' title='" + ViewBtn + "'>";
                            /*     var editImage = `<img class='edit-icon'' data-location='" +${rowObject.locationId}+ "' src='./img/edit.png' alt='Edit' title=${BtnEdit}>`;*/
                            /*    var deleteImage = "<img class='delete-icon' data-location='" + rowObject.locationId + "' src='./img/metro-bin.png' alt='Delete'>";*/
                            /*      data - bs - toggle='modal' data - bs - target='#AddNewLocation*/
                            var url = "@Url.Action()"
                            var link = editImage

                            return link;
                        } ;                     
                    }
                }
            ],
            pager: "#pager",
            editable: true,
            viewrecords: true,
            autowidth: false,
            scrollrow: true,
            height: "calc(100vh - 270px)",
            altRows: true,
            altclass: 'myAltClass',
            multiselect: false,
            resizable: false,
            gridComplete: function () {
                $('.delete-icon').on('click', function () {
                    var locationId = $(this).data('location');

                    console.log(locationId);

                    showConfirmPopup('Are you sure you want to delete?')
                  
                    $('#confirm-button').on('click', function ()
                    {
                        $.ajax({
                            url: '/Location/DeleteLocation?id=' + locationId,
                            method: 'DELETE',
                            success: function (data) {
                                console.log("Successful");
                                alertCustom(2, LocationDelete);
                                // Redirect to the Location page
                                window.location.href = "/Location";
                            },
                            error: function (error) {
                                console.error('Error fetching data:', error);
                            }
                        });
                        hideConfirmPopup();
                    });
                });

                function getLoationdata(locationId) {
                    $.ajax({
                        url: '/Location/GetLocationById?locationId=' + locationId,
                        method: 'GET',
                        success: function (data) {
                            console.log(data);
                            $('#locationId').val(locationId);
                            $("#name").val(data.result.locationName);
                            $("#street").val(data.result.street);
                            $("#npa").val(data.result.npa);
                            $("#city").val(data.result.city);
                            $("#country").val(data.result.country);
                            $("#comment").val(data.result.comment);
                         
                            if (data.result.isEditable == 1 && data.result.isPrivate == 1 || data.result.isEditable ==0 && data.result.isPrivate ==1) {
                                setCheckBox('checkRadioPrivate', true);  // Make "Private" checked when isPrivate is 1 and editable is 1
                            } else {
                                setCheckBox('checkRadioPrivate', false);  // Uncheck "Private" in all other cases
                            }

                            $('#addLocation1 span').text(locationdata.ModifyLocation);
                            setTimeout(function () {
                                $('#AddNewLocation').modal('show');
                            }, 500);
                        },
                        error: function (error) {
                            console.log('Error fetching data:', error);
                        }
                    });
                }

                $(".edit-icon").click(function () {
                    $('#addLocation1').prop('disabled', false);
                    $('#checkRadioPrivate').prop('disabled', false);
                    $("#name").prop('disabled', false);
                    $("#street").prop('disabled', false);
                    $("#npa").prop('disabled', false);
                    $("#city").prop('disabled', false);
                    $("#country").prop('disabled', false);
                    $("#comment").prop('disabled', false);

                    $("#exampleModalLabel").text(locationdata.EditLocation);
                    $('#addLocation1 span').text(locationdata.EditLocation);

                    // Show the warning alert
                    $('.warning-alert').show();

                    var locationId = $(this).data('location');
                    getLoationdata(locationId)
                });

                $(".detail-icon").click(function () {
                    $('#checkRadioPrivate').prop('disabled', true);
                    $('#addLocation1').prop('disabled', true);
                    $("#name").prop('disabled', true);
                    $("#street").prop('disabled', true);
                    $("#npa").prop('disabled', true);
                    $("#city").prop('disabled', true);
                    $("#country").prop('disabled', true);
                    $("#comment").prop('disabled', true);


                    $("#exampleModalLabel").text(locationdata.ViewLocation);
                    $('#addLocation1').hide();

                    var locationId = $(this).data('location');

                    getLoationdata(locationId)
                });
            }
        });
    }
});

                
