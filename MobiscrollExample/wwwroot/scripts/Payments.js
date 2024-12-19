$(document).ready(function () {
    /*function showNoDataMessage() {
        // Clear the container first
        $('.grid-wrapper').empty();

        // Create a div with the message
        var noDataDiv = $('<div class="no-data">No data available</div>');

        // Append the div to the container
        $('.grid-wrapper').append(noDataDiv);
    }*/
   
    $.ajax({
        url: '/Payment/GetPaymentData',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            
                initializeJqGrid(data);
            
           
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1 ; // Months are 0-indexed, so we add 1

    var monthDropdown = $("#cardExpiryMonth");
    for (var i = currentMonth + 1; i <= 12; i++) {
        monthDropdown.append($("<option>").val(i).text(i));
    }

    var yearDropdown = $("#cardExpiryYear");
    for (var i = currentYear; i < currentYear + 10; i++) {
        yearDropdown.append($("<option>").val(i).text(i));
    }

    $("#cardExpiryYear").change(function () {
        monthDropdown.empty();
        if ($("#cardExpiryYear").val() > currentDate.getFullYear()) {
            
            for (var i = 1; i <= 12; i++) {
                $("#cardExpiryMonth").append($("<option>").val(i).text(i));
            }
        }
        else {
            for (var i = currentMonth + 1; i <= 12; i++) {
                monthDropdown.append($("<option>").val(i).text(i));
            }
        }
    })
    //external service methods
   /* $.ajax({
        url: '/Services/getServices',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });*/
    
    /*$.ajax({
        url: '/Services/getServiceById',
        *//*data: {Id=id},*//*
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }

    });*/
    function initializeJqGrid(mydata) {
        console.log(mydata);
        var $grid = $("#PaymentMode-grid");
        newWidth = $grid.closest(".ui-jqgrid").parent().width();
        $grid.jqGrid("setGridWidth", newWidth, true);
        $grid.jqGrid({
            data: mydata,
            datatype: "local",
            rowNum: 10,
            rowList: [10, 20, 30],
            colModel: [

                { name: 'userId', index: 'userId', hidden: true },
                { label: 'Name', name: 'name', width: 200 },
                {
                    label: 'Type', name: 'type', width: 250, formatter: function (cellvalue, options, rowObject) {
                        // Map the 'type' value to a string using your mapping function
                        var typeString = mapTypeToString(rowObject.type);
                        return typeString;
                    }
                },
                { name: 'id', index: 'id', id:'pid',hidden: true },
                { name: 'time_Stamp', index: 'time_Stamp', hidden: true },
                { name: 'valid', index: 'valid', hidden: true },
                { name: 'transmitted', index: 'transmitted', hidden: true },
                { name: 'modified_By', index: 'modified_By', hidden: true },
                { label: 'Comment', name: 'comment', width: 250 },
                {
                    label: 'Action',
                    name: 'actions',
                    width: 50,
                    formatter: function (cellvalue, options, rowObject) {
                       
                        var editImage = "<img class='edit-icon' data-bs-toggle='modal' data-bs-target='#PaymentMode' data-id='" + rowObject.id + "' src='./img/edit.png' title='Edit'>";
                        var deleteImage = "<img class='delete-icon' ' data-id='" + rowObject.id + "' src='./img/metro-bin.png' title='Delete' >";
                        var link =  editImage + deleteImage  ;
                        return link;
                    },
                    sortable: false,
                    search: false
                }
            ],
            loadComplete: function (data) {

                if ($grid.jqGrid('getGridParam', 'records') === 0) {

                   /* $grid.jqGrid('clearGridData');
                    var noDataMessage = "<div id='no-data-message' >No data available</div>"; // Show the message if no data
                    $grid.parent().append(noDataMessage);
                    $('#no-data-message').css($grid.parent().parent().css(['font-family', 'color']));
                    $('#no-data-message')
                        .css('text-align', 'center')
                        .css('font-size', '20px')*/
                    $('#no-data-message').show();
                } else {
                    $('#no-data-message').hide();
                    var noDataMessage = "<div id='no-data-message' style='display:none;'>No data available</div>";
                }
               
                $grid.parent().append(noDataMessage);
                $('#no-data-message').css($grid.parent().parent().css(['font-family', 'color']));
                $('#no-data-message')
                    .css('text-align', 'center')
                    .css('font-size', '20px')
                   /* .css('position','absolute')
                    
                    .css('top', '50%') // Center vertically
                    .css('left', '38%') // Center horizontally*/
                   
                  

                // Add display: none property
                
            },
            editable: true,
            viewrecords: true,
            autowidth: false,
            height: "calc(100vh - 280px)",
            altRows: true,
            altclass: 'myAltClass',
            multiselect: false,
            resizable: false,
            gridComplete: function () {
                // Attach click event to icons after grid is loaded
                $('.edit-icon').on('click', function () {
                    var paymentId = $(this).data('id');
                    var test = $('#pid').val();
                  /*  var authLink = document.getElementById("auth");
                    authLink.classList.add("disabled"); // Add a class to visually indicate that the link is disabled
                    authLink.removeAttribute("href"); */
                    console.log(test);
                    $.ajax({
                        url: '/Payment/GetDataByPaymentId?paymentModeId=' + paymentId,
                        method: 'GET',
                        /*data: { paymentmodeId: paymentId },*/

                        success: function (data) {
                            console.log(data.name);
                            console.log(data.type);
                            console.log(data.comment);
                            $('#name').val(data.name);
                            $('#paymentid').val(data.id);
                            // var tp= mapTypeToString(data.type)
                            $('#typelocal').val(data.type);
                            $('#comments').val(data.comment);

                        },
                        error: function (error) {
                            console.error('Error fetching data:', error);
                        }




                    });
                });

                $('.delete-icon').on('click', function () {
                    var paymentId = $(this).data('id');
                    //var userConfirmation = confirm("Are you sure you want to delete?");
                    console.log(paymentId);
                    $('#alert-delete-popup').modal('show');
                    $('#btnDeleteConfirm').click(function () {
                        $.ajax({
                            url: '/Payment/DeletePaymentData?id=' + paymentId,
                            method: 'DELETE',


                            success: function () {
                                // Handle success response, if needed
                              //  console.log('Record deleted successfully:', response);
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
                                //clearAll();
                                refreshGrid();
                                // location.reload();
                            },
                            error: function (xhr, textStatus, errorThrown) {
                                // Handle error response
                                console.error('Error deleting record:', textStatus, errorThrown);
                            }
                        });

                    });
                   
                });
            }
        });
        
    }
    
});
function refreshGrid() {
    $.ajax({
        url: '/Payment/GetPaymentData',
        method: 'GET',
        dataType: 'json',
        success: function (mydata) {

            var $grid = $("#PaymentMode-grid");
            $grid.jqGrid('clearGridData');
            $grid.jqGrid('setGridParam', {
                datatype: 'local',
                data: mydata
            }).trigger("reloadGrid");
            //initializeJqGrid(data);


        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });

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
       /* },
        error: function (error) {
            alert('Error : ' + JSON.stringify(error));
            console.error('Error fetching data:', JSON.stringify(error));
        }
    });*/
}
/*$('#filter-close').click(function () {

    //refreshGrid();
});*/
$("#RefreshId").click(function () {

    refreshGrid();
});
$('#apply-filter').click(function () {
    var params = {
        name: $("#nameFilter").val(),
        type: $("#typeFilter").val()
    }
    console.log(params);
    $("#paymentFilters").modal("hide");
    $.ajax({
        url: '/Payment/FilterPaymentData',
        method: 'GET',
        data: params,
        dataType: 'json',
        async: true,
        success: function (data) {
            /*  Mapping data to mydata*/
            var mydata = null;
            mydata = data.map(function (item) {
                return {
                    name: item.name,
                    id: item.id,
                    street: item.street,
                    type: item.type,
                    comment: item.comment,

                    Action: "<img class='edit-icon' data-bs-toggle='modal' data-bs-target='#PaymentMode' data-id='" + item.id + "' src='./img/edit.png' title='Edit'>" +
                        "<img class='delete-icon' ' data-id='" + item.id + "' src='./img/metro-bin.png' title='Delete' >"

                };
            });
            /*    initializegrid(data);*/

            // Clear and reload the grid with the filtered data
            var $grid = $("#PaymentMode-grid");
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
)
function mapTypeToString(type) {
    switch (type) {
        case 1:
            return 'Purchasing Card';
        case 2:
            return 'Credit card';
        // Add more cases as needed
        case 3:
            return 'By the passenger (cash, credit card)'
        default:
            return null;
    }
}
$('#closebtn').click(function () {
    $("input").val(null);
    $('#typelocal').val(1);
    $('#comments').val(null);
});

$('#Addpaymentmainbtn').click(function () {
    $("input").val(null);
    $('#typelocal').val(1);
    $('#comments').val(null);
})
$("#addPayment").click(function () {
    //var username = Context.Session.GetString("FullName");
    var currentTime = new Date();
    console.log($('#paymentid').val());
    //console.log(username);
    var params = {
        paymentmodeId: $('#paymentid').val(),
        name: $('#name').val(),
        comment: $('#comments').val().trim(),
        type: $('#typelocal').val(),
        //valid: $('#valid').val(),
        //transmitted: $('#transmitted').val(),

        time_Stamp: currentTime
       


    }
    if (params.paymentmodeId > 0 && params.name !== '') {
        $("#name").removeAttr('title', 'Empty fields!');
        $("#name").css('border', '1px solid #cacccf');
        $('#alert-update-popup').modal('show');

        $('#btnUpdateConfirm').click(function () {
            $('#alert-update-popup').modal('hide');
                    $(".addNewLocation").modal('hide');
            //$(".box-container-blk").hide();
            //  addEditservice();
            $.ajax({
                type: "PUT",
                url: '/Payment/SaveOrEditPaymentData',
                dataType: "json",
                data: params,
                async: true,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    console.log(params.paymentmodeId);
                    $('#alert-update-popup').modal('hide');

                    $('#alert-update-green').modal('show');
                    $('#alert-update-green').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('#alert-update-green').modal('hide');
                    }, 3000);
                    //clearAll();
                    refreshGrid();
                }
            });

        });
    }
    else if (params.paymentmodeId == 0 && params.name !== '') {
        $("#name").removeAttr('title', 'Empty fields!');
        $("#name").css('border', '1px solid #cacccf');
        $('#alert-insert-popup').modal('show');
        // Handle the confirmation action

        $('#btnInsertConfirm').click(function () {
            $(".addNewLocation").modal('hide');
            $('#alert-insert-popup').modal('hide');
            $(".box-container-blk").hide();
            //addEditservice();
            $.ajax({
                type: "PUT",
                url: '/Payment/SaveOrEditPaymentData',
                dataType: "json",
                data: params,
                async: true,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    console.log(params.paymentmodeId);
                    $('#alert-insert-popup').modal('hide');

                    $('#alert-insert-green').modal('show');
                    $('#alert-insert-green').fadeIn();
                    // Delay for 5 seconds
                    setTimeout(function () {
                        $('#alert-insert-green').modal('hide');
                    }, 3000);
                    //clearAll();
                    refreshGrid();
                }
            });
        });
    }
    else if (params.name == '') {
        $("#name").css('border', '1px solid #ff0000');
        $("#name").attr('title', 'Empty field!');
    }
    

        /*$.ajax({
            type: "PUT",
            url: '/Payment/SaveOrEditPaymentData',
            dataType: "json",
            data: params,
            async: true,
            dataType: "json",
            success: function (data) {
                console.log(data);
                console.log(params.paymentmodeId);
                $('#alert-insert-popup').modal('hide');

                $('#alert-insert-green').modal('show');
                $('#alert-insert-green').fadeIn();
                // Delay for 5 seconds
                setTimeout(function () {
                    $('#alert-insert-green').modal('hide');
                }, 3000);
                //clearAll();
                refreshGrid();
            }
        });
    */
   /* else {
        if (params.paymentmodeId != null) {
            $('#alert-update-popup').modal('hide');

            $('#alert-update-green').modal('show');
            $('#alert-update-green').fadeIn();
            // Delay for 5 seconds
            setTimeout(function () {
                $('#alert-update-green').modal('hide');
            }, 3000);
        }*/
       // alert("Enter the name before adding the payment mode");
    //}

});
$("#authenticateBtn").click(function () {
    //var username = Context.Session.GetString("FullName");
    
    console.log($('#paymentid').val());
    //console.log(username);
    var params = {
        paymentmodeId: $('#paymentid').val(),
       /* name: $('#name').val(),
        comment: $('#comments').val().trim(),*/
        type: $('#typelocal').val(),
        //valid: $('#valid').val(),
        //transmitted: $('#transmitted').val(),

        
         ownerName: $('#ownerName').val(),
         cardNumber: $('#cardNumber').val(),
         cardExpiryMonth: $('#cardExpiryMonth').val(),
         cardExpiryYear: $('#cardExpiryYear').val(),
         costCenterNumber: $('#costCenterNumber').val(),
         glAccNumber: $('#glAccNumber').val(),
         externalServiceId: $('#externalServiceId').val()
    }

    $.ajax({
        type: "POST",
        url: '/Payment/SendService',
        data: params,
        dataType: "json",
        async: true,

        success: function (data) {
            console.log(data);
        }
    });
});

