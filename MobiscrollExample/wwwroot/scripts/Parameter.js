$(document).ready(function () {

    var Name;
    var Value;
    var changes = false;
    var TripsCancelConfirmMessage;
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
            Name = data.NameDisplayName;
            Value = data.Value;
            TripsCancelConfirmMessage = data.TripsCancelConfirmMessage;
            $.ajax({
                url: 'Parameter/GetParameters',
                method: 'GET',
                success: function (data) {
                    $("#passanger-grid").jqGrid('clearGridData');
                    var mydata = null;
                    mydata = data.map(function (item) {
                        console.log(item);
                        return {

                            Id: item.id,
                            Name: item.name,
                            Description: item.description,
                            Value: item.value,
                            ModifiedBy: item.modified_by,
                            TimeStamp: item.time_stamp
                        };

                    });
                    var $grid = $("#passanger-grid"),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();

                    // Set the grid width
                    $grid.jqGrid("setGridWidth", newWidth, true);

                    jQuery("#passanger-grid").jqGrid({
                        data: mydata,
                        datatype: "local",
                        colNames: [Name, Value, 'Id', 'Description', 'ModifiedBy', 'TimeStamp'],
                        colModel: [
                            { name: 'Name', index: 'Name', width: 150, align: 'left' },
                            { name: 'Value', index: 'Value', width: 80, align: 'left' },

                            { name: 'Id', index: 'Id', hidden: true },
                            { name: 'Description', index: 'Description', hidden: true },
                            { name: 'ModifiedBy', index: 'ModifiedBy', hidden: true },
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
                        $(".box-container-blk").show();

                        var rowData = {};
                        var rowData = $(this).closest("tr").find("td").map(function () {
                            return $(this).text();
                        }).get();
                        console.log(rowData);
                        var id = rowData[2];
                        getParameterById(parseInt(id));
                    });
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
        $.ajax({
            url: 'Parameter/GetParameters',
            method: 'GET',
            success: function (data) {
                $("#passanger-grid").jqGrid('clearGridData');
                var mydata = null;
                mydata = data.map(function (item) {
                    console.log(item);
                    return {

                        Id: item.id,
                        Name: item.name,
                        Description: item.description,
                        Value: item.value,
                        ModifiedBy: item.modified_by,
                        TimeStamp: item.time_stamp
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




    //Displaying records in form for editing the record
    function getParameterById(Id) {

        $.ajax({
            url: 'Parameter/GetParameterById',
            method: 'GET',
            data: { id: Id },
            success: function (obj) {

                console.log(obj);

                $('#textId').val(obj.id);
                $('#textName').val(obj.name); 
                $('#textDescription').val(obj.description);
                var simpleDate = new Date(obj.time_stamp).toLocaleString();
                $('#textTimeStamp').val(simpleDate);
                $('#textValue').val(obj.value);
                $('#textModifiedBy').val(obj.modified_by);

                //  validations for textValue
                if ((obj.id === 5) || (obj.id === 6) || (obj.id >= 21 && obj.id <= 24) || (obj.id >= 31 && obj.id <= 37) || (obj.id >= 39 && obj.id <= 44)) {
                    // only numbers 
                    $('#textValue').off('input').on('input', function () {
                        this.value = this.value.replace(/[^0-9.]/g, ''); 

                        // Ensure that only one decimal point is allowed
                        const parts = this.value.split('.');
                        if (parts.length > 2) {
                            this.value = parts[0] + '.' + parts.slice(1).join('');
                        }
                    });
                } else if ((obj.id === 45) || (obj.id === 9)) {
                    $('#textValue').off('input').on('input', function () {
                        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(this.value)) {
                            alertCustom(1, 'Please enter a valid email !');
                        }
                    });
                } else {
                    $('#textValue').off('input');
                }
            },
            error: function (error) {
                alert(JSON.stringify(error));
                console.error('Error fetching data:', error);
            }

        });
    }

    $(document).on("keyup", '#gsearch', function () {
        // Clear the content of the Passenger-grid
        var inputString = $('#gsearch').val();
        $.ajax({
            url: '/Parameter/SearchParameter',
            method: 'GET',
            data: { searchString: inputString },
            success: function (data) {
                // Mapping data to mydata
                var mydata = null;
                var mydata = data.map(function (item) {
                    return {
                        Id: item.id,
                        Name: item.name,
                        Description: item.description,
                        Value: item.value,
                        ModifiedBy: item.modified_by,
                        TimeStamp: item.time_stamp

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
            },
            error: function (error) {
                alert('Error : ' + JSON.stringify(error));
                console.error('Error fetching data:', JSON.stringify(error));
            }
        });
    });

    //$("#enregisterBtn").on("click", function () {
    //    //alert(JSON.stringify(Users()));

    //    var id = $("#textId").val();
    //    if (id > 0 && id != null) {
    //        var confirmed = confirm("Are you sure you want to update?");
    //        if (confirmed) {
    //            updateParameter();
    //        } else {
    //            return false;
    //        }
    //    }

    //});

    $("#enregisterBtn").on("click", function () {

        var parameterId = $('#textId').val();
        sessionStorage.setItem("parameterId", parameterId);
        if (parameterId > 0 && parameterId != null) {
            $('#alert-update-popup').modal('show');
            // Handle the confirmation action

            $('#btnUpdateConfirm').click(function () {
                changes = false;
                window.globalChange = changes;
                updateParameter();
                $(".box-container-blk").hide();
            });
        } else {
            $('#alert-insert-popup').modal('show');
            // Handle the confirmation action

            $('#btnInsertConfirm').click(function () {
                changes = false;
                window.globalChange = changes;
                updateParameter();
                $(".box-container-blk").hide();
            });
        }

    })

    function updateParameter() {

        var dataToSend = {
            id: parseInt($('#textId').val()),
            name: $('#textName').val(),
            description: ($('#textDescription').val()),
            value: ($('#textValue').val()),
            modified_by: $('#textModifiedBy').val(),
            time_stamp: $('#textTimeStamp').val()
        };


        $.ajax({
            url: 'Parameter/UpdateParameter',
            method: 'PUT',
            data: dataToSend,
            success: function (response) {

                var key = sessionStorage.getItem("parameterId");
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
                // location.reload();
            },
            error: function (error) {
                //alert(JSON.stringify(error));
                console.error('Error fetching data:', error);
            }
        });


        //$.ajax({
        //    url: 'Parameter/updateParameter',
        //    method: 'PUT',
        //    data: dataToSend,
        //    success: function (response) {
        //        alertCustom(0, "Parameter successfully updated");
        //        alert('Parameter updated successfully!');
        //        location.reload();
        //    },
        //    error: function (error) {
        //        console.error('Error fetching data:', error);
        //    }
        //});
    } 



    function clearAll() {
        $('#textId').val('');
        $('#textName').val('');
        $('#textDescription').val();
        $('#textValue').val();
        $('#textTimeStamp').val('');
        $('#textModifiedBy').val('');
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
       /* clearAll();
        $(".box-container-blk").hide();*/
    })

    $(document).on("input", '#gsearch', function () {
        if ($('#gsearch').val() === '') {
            refreshGrid();
        }
    });
})