$(document).ready(function () {
    var originalData; //Grid global variables
    var loadModalData;
    var loadUsersData;
    var filterValues = {};
    var FirstNameName;
    var LastNameName;
    var CostCenterCode;
    var CostCenterName;
    var languageObj;
    var deletePopup;
    var DeleteDelegate;
    var DelegatePopupMsg;
    var DelegateContact;
    var DelegateAlert;
    var DelegateDelete;
    var DelegateDeleteMsg;
    var DelegateFilter;
    var NoDataAvailable;

    function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
    }

    // Function to hide the overlay
    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }
    function showModalOverlay() {
        document.getElementById('modalOverlay').style.display = 'flex';
    }
    function hideModalOverlay() {
        document.getElementById('modalOverlay').style.display = 'none';
    }

    function loadUsers()//firstPage
    {
        var $grid = $("#delegates-grid");
        showOverlay();
        // Ensure the "No data available" message exists and is initially hidden
        if (!$('#no-data-message').length) {
            $grid.parent().append("<div id='no-data-message' style='display:none;'>" + NoDataAvailable +"</div>");

            // Set CSS for centering the message
            $('#no-data-message').css({
                'position': 'absolute',
                'top': '50%',
                'left': '50%',
                'transform': 'translate(-50%, -50%)',
                'font-size': '20px',
                'color': '#333',  // Customize color as needed
                'text-align': 'center',
                'z-index': '1000',
                'font-weight': 'bold'// Ensure it's on top of other content
            });
        }

        $.ajax({
            url: '/Delegates/LoadDelegatedUsers',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log('firstPage response--->', response);
                loadUsersData = [...response];
                    /*loadUsersData = response;*/
                    jQuery($grid).jqGrid({
                        data: response,
                        datatype: "local",
                        rowNum: 10,
                        rowList: [10, 20, 30],
                        colNames: [
                            "",
                            "DelegateId",
                            "DelegatorId",
                            LastNameName,
                            FirstNameName,
                            CostCenterCode,
                            CostCenterName,
                            "Action(s)"
                        ],
                        colModel: [
                            {
                                name: 'PersonLogo', index: 'PersonLogo', width: 20, align: 'center',
                                formatter: function (cellValue, options, rowObject) {
                                    // Generate HTML picture for  "person Logo" coloumn
                                    return "<img src='./img/user-alt-black.png' alt='manLogo'>";
                                }
                            },
                            { name: "delegateId", index: "delegateId", hidden: true },
                            { name: "delegatorId", index: "delegatorId", hidden: true },
                            { name: "lastName", index: "lastName", width: 100, align: "left" },
                            { name: "firstName", index: "firstName", width: 100, align: "left" },
                            { name: "costCenterCode", index: "costCenterCode", width: 100, align: "left", },
                            { name: "costCenterName", index: "costCenterName", width: 100, align: "left" },
                            {
                                name: 'Action', index: 'Action', width: 40, align: 'center',
                                formatter: function (cellValue, options, rowObject) {
                                    // Generate HTML picture for  "Action" coloumn
                                    return "<img src='./img/metro-bin.png' alt='Delete' title='" + DeleteDelegate + "' class='delete-button'>";
                                }
                            },
                        ],
                        // This part was improved
                        loadComplete: function (data) {
                            if ($grid.jqGrid('getGridParam', 'records') === 0) {
                                $('#no-data-message').show();  // Show the message if no data
                            } else {
                                $('#no-data-message').hide();  // Hide the message if data is available
                            }
                        },
                        // pager: "#pager",
                        editable: true,
                        viewrecords: true,
                        autowidth: false,
                        height: "calc(100vh - 280px)",
                        altRows: true,
                        altclass: 'myAltClass',
                        multiselect: false,
                        resizable: false,
                    });
                   // hideOverlay();
            },
                error: function (xhr, status, error) {
                    console.error('Error fetching data:', error);
                    hideOverlay();
                } 
            });
    }
    function initializeGrid(data) {
        var gridAdd = $("#adddelegates-grid");
        gridAdd.jqGrid({
            data: data,
            datatype: "local",
            rowNum: 10,
            rowList: [10, 20, 30],
            colNames: [
                "",
                "DelegateId",
                "DelegatorId",
                LastNameName,
                FirstNameName,
                CostCenterCode,
                CostCenterName,

            ],
            colModel: [
                {
                    name: 'PersonLogo', index: 'PersonLogo', width: 20, align: 'center',
                    formatter: function (cellValue, options, rowObject) {
                        // Generate HTML picture for  "person Logo" coloumn
                        return "<img src='./img/user-alt-black.png' alt='manLogo'>";
                    }
                },
                { name: "delegateId", index: "delegateId", hidden: true },
                { name: "delegatorId", index: "delegatorId", hidden: true },
                { name: "lastName", index: "lastName", width: 100, align: "left" },
                { name: "firstName", index: "firstName", width: 100, align: "left" },
                { name: "costCenterCode", index: "costCenterCode", width: 100, align: "left" },
                { name: "costCenterName", index: "costCenterName", width: 100, align: "left" },
            ],
            editable: true,
            viewrecords: true,
            autowidth: true,
            shrinkToFit: true,
            height: "20vh",
            altRows: true,
            altclass: "myAltClass",
            multiselect: true,
            resizable: false
        });
        // Resize grid to fit parent container
        var newWidth = gridAdd.closest(".ui-jqgrid").parent().width();
        gridAdd.jqGrid("setGridWidth", newWidth, true);
    }
    // Modal popUpPage getAllUsers
    function loadAllDelegates() {
        showModalOverlay();
       // showOverlay();
        $.ajax({
            url: '/Delegates/LoadAllDelegates',
            type: 'GET',
            dataType: 'json',
            success: function (response) {

                console.log('Add delegates modal response--->', response);
                originalData = response;
                loadModalData = [...originalData];
                initializeGrid(originalData);
                hideModalOverlay(); 
                hideOverlay();
            },

            error: function (xhr, status, error) {
                console.error('Error fetching data:', error);
                hideModalOverlay();
                hideOverlay();
            }
        });
    }
    function addSelectedDelegates() {

        var selectedDelegateIds = [];
        var gridAdd = $("#adddelegates-grid");

        // Iterate over each selected checkbox
        gridAdd.find('input[type=checkbox]:checked').each(function () {
            // Get the row ID of the selected checkbox
            var rowId = $(this).closest("tr").attr("id");
            //get rowData using rowId
            var rowData = gridAdd.jqGrid('getRowData', rowId);
            // Push the delegateId from the row data to selectedDelegateIds array created
            selectedDelegateIds.push(parseInt(rowData.delegateId));
        });

        let selectedRowIds = $("#adddelegates-grid").jqGrid('getGridParam', 'selarrrow');
        var selected = JSON.stringify(selectedDelegateIds);
        if (selectedDelegateIds.length === 0) {
            alertCustom(1, DelegatePopupMsg);
            return;
        }
        showModalOverlay();

        $.ajax({
            url: '/Delegates/AddDelegates',
            type: 'POST',
            dataType: 'json',
            data: {delegateIds: selected },
            success: function () {
                // Remove the selected rows from the modal grid
                selectedRowIds.forEach(rowId => {
                    //Find and remove the row from loadModalData
                    let rowIndex = loadModalData.findIndex(row => row.id === rowId);

                    //if (rowIndex !== -1) {
                    //    //remove the row in grid
                    //    loadModalData.splice(rowIndex, 1);
                    //}
                    if(rowIndex !== -1) {
                        // Save the removed row data before splicing
                        let removedRow = loadModalData.splice(rowIndex, 1)[0];

                        // Push the removed row into loadUsersData
                        loadUsersData.push(removedRow);
                    } 
                    else  {
                        location.reload();
                    }
                });
                alertCustom(0, DelegateAlert);
                //setTimeout(location.reload.bind(location), 1000);
                //hideOverlay();
                $("#searchDelegates").val('');
                $("#addDelegates").modal("hide");
                
                console.log('selected in add modal', selectedRowIds);
                RefreshAfterAdd();
                //console.log('loadUsers again called after addDelegates');
                hideModalOverlay();
            },
            error: function (xhr, status, error) {
                console.error('Ajax Error adding delegates:', error);
                hideModalOverlay();
            }
        });
    }
    function deleteRow(delegateId, rowId) {
        showConfirmPopup(deletePopup)

        $('#confirm-button').off('click').on('click', function () {
            console.log('Before showing overlay');
            showOverlay();

            $.ajax({
                url: '/Delegates/RemoveDelegate?delegateId=' + delegateId,
                type: 'DELETE',
                success: function (response) {

                    $('#delegates-grid').jqGrid('delRowData', rowId);

                    //setTimeout(location.reload.bind(location), 1500);
                    let rowIndex = loadUsersData.findIndex(row => row.id === rowId);

                    if (rowIndex !== -1) {
                        // Remove the row from loadUsersData and store it temporarily
                        let removedRow = loadUsersData.splice(rowIndex, 1)[0];

                        // Add the removed row to loadModalData without overwriting existing data
                        loadModalData.push(removedRow);

                        //clearFields();
                        //$("#adddelegates-grid").jqGrid("clearGridData").jqGrid("setGridParam", { data: loadModalData }).trigger("reloadGrid");
                        //$("#delegates-grid").jqGrid("clearGridData").jqGrid("setGridParam", { data: loadUsersData }).trigger("reloadGrid");

                        console.log('Removed delegate added to modal obj:', removedRow);
                    }
                    else {
                        location.reload();
                    }
                    hideOverlay();
                    console.log('Updated firstpage response data after delete', loadUsersData);
                    console.log('Updated modal loadModalData:', loadModalData);
                    alertCustom(0, DelegateDelete);
                    clearFields();
                    $("#adddelegates-grid").jqGrid("clearGridData").jqGrid("setGridParam", { data: loadModalData }).trigger("reloadGrid");
                    $("#delegates-grid").jqGrid("clearGridData").jqGrid("setGridParam", { data: loadUsersData }).trigger("reloadGrid");
                },
                error: function (xhr, status, error) {
                    console.error('Error deleting row:', error);
                   // alertCustom(2, DelegateDeleteMsg);
                    hideOverlay();
                    console.log('After hiding overlay inside error:');
                }
            });
            hideConfirmPopup();
        });
    }

    function Searchfilter(searchValue) {

        var filteredData = [];
        var gridSearch = $("#adddelegates-grid");

        if (!searchValue.trim()) {
            filteredData = loadModalData;
        } else {
            filteredData = loadModalData.filter(function (item) {
                return Object.values(item).some(function (value) {
                    return value != null && value.toString().toLowerCase().includes(searchValue.toLowerCase());
                });
            });
        }
        // Update grid with filtered data
        gridSearch.jqGrid('clearGridData').jqGrid('setGridParam', { data: filteredData }).trigger('reloadGrid');
    }

    // Function to apply filters and update the grid
    function applyFilters() {

        var filterLastName = $("#filterLastName").val().trim();
        var filterFirstName = $("#filterFirstName").val().trim();
        var filterCostCenterCode = $("#filterCostCenterCode").val().trim();
        var filterCostCenterName = $("#filterCostCenterName").val().trim();

        filterValues.filterLastName = filterLastName;
        filterValues.filterFirstName = filterFirstName;
        filterValues.filterCostCenterCode = filterCostCenterCode;
        filterValues.filterCostCenterName = filterCostCenterName;


        console.log('filter Data --->', filterValues);

        // Function to filter data based on criteria

        var filteredData = loadUsersData.filter(function (row) {
            var lastNameMatch = !filterLastName || (row.lastName && row.lastName.toLowerCase().includes(filterLastName.toLowerCase()));
            var firstNameMatch = !filterFirstName || (row.firstName && row.firstName.toLowerCase().includes(filterFirstName.toLowerCase()));
            var costCenterCodeMatch = !filterCostCenterCode || (row.costCenterCode && row.costCenterCode.toLowerCase().includes(filterCostCenterCode.toLowerCase()));
            var costCenterNameMatch = !filterCostCenterName || (row.costCenterName && row.costCenterName.toLowerCase().includes(filterCostCenterName.toLowerCase()));

            return lastNameMatch && firstNameMatch && costCenterCodeMatch && costCenterNameMatch;
        });


        if (filteredData.length != 0) {
            // Update the grid with filtered data
            $("#delegates-grid").jqGrid("clearGridData").jqGrid("setGridParam", { data: filteredData }).trigger("reloadGrid");
        }
        else {
            alertCustom(1, DelegateFilter);
            $("#delegates-grid").jqGrid("clearGridData").jqGrid("setGridParam", { data: filteredData }).trigger("reloadGrid");
            //var lang1Id = $('#langugeId').val();
            //console.log('lang1Id in delegate', lang1Id);
            //var msg1 = NoDataAvailable + " for Applied filter";
            //var msg2 = NoDataAvailable + " pour le filtre appliqué";
            //console.log('msg1 and msg2>>', msg1, msg2);
            
            //if (lang1Id == 1) {
            //    $('#no-data-message').val(msg1);
            //} else {
            //     $('#no-data-message').val(msg2);
            //}
        }
    }

    function clearFields() {
        document.getElementById('filterLastName').value = '';
        document.getElementById('filterFirstName').value = '';
        document.getElementById('filterCostCenterCode').value = '';
        document.getElementById('filterCostCenterName').value = '';
    }

    const showConfirmPopup = (textValue) => {
        $('#confirm-popup').find("#popup-body").text(textValue);
        $('#confirm-popup').modal('show');
    }

    const hideConfirmPopup = () => {
        $('#confirm-popup').modal('hide');
    }

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
                }, 1500)
                break;
            default:// Default Success Alert
                console.log("No category of alert selected");
                break;
        }
    }


    var grid = $("#delegates-grid"),
                newWidth = grid.closest(".ui-jqgrid").parent().width();
    grid.jqGrid("setGridWidth", newWidth, true);

    //localisation
    $.ajax({
        url: '/Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("language translation data", data);


            LastNameName = data.LastNameName;
            FirstNameName = data.FirstNameName;
            CostCenterCode = data.CostCenterCode;
            CostCenterName = data.CostCenterName;
            deletePopup = data.DelegateDeletePopup;
            DeleteDelegate = data.DeleteDelegate;
            DelegatePopupMsg = data.DelegatePopupMsg;
            DelegateContact = data.DelegateContact;
            DelegateAlert = data.DelegateAlert;
            DelegateDelete = data.DelegateDelete;
            DelegateDeleteMsg = data.DelegateDeleteMsg;
            DelegateFilter = data.DelegateFilter;
            NoDataAvailable = data.NoDataAvailable;

            // Now that the variables have values, initialize the grid

            console.log("Hello delegate grids are loading, Please wait!");
            loadUsers();
            
            loadAllDelegates();

        },
        error: function () {
            console.error("Error fetching localization data.");
        }
    });

    
    $(document).on("click", ".delete-button", function () {
        // Get the row data
        var rowId = $(this).closest("tr").attr("id");
        var rowData = grid.jqGrid('getRowData', rowId);
        //console.log(' rowData ', rowData);
        var delegateId = rowData.delegateId;
        console.log('rowId and delegateId to delete', rowId, delegateId);

        deleteRow(delegateId, rowId);
        clearFields();
        $("#adddelegates-grid").jqGrid("clearGridData").jqGrid("setGridParam", { data: loadModalData }).trigger("reloadGrid");
    });
    
    $("#searchDelegates").on("input", function () {
        var searchValue = $(this).val();
        Searchfilter(searchValue);
    });

    $(document).on("click", "#addDelegatesClick", function ()
    {
        addSelectedDelegates();     
    });

    function RefreshAfterAdd()
    {
        clearFields();
        //loadUsers();
        $("#adddelegates-grid").jqGrid("clearGridData").jqGrid("setGridParam", { data: loadModalData }).trigger("reloadGrid");
        $("#delegates-grid").jqGrid("clearGridData").jqGrid("setGridParam", { data: loadUsersData }).trigger("reloadGrid");
      
        setTimeout(function () { hideOverlay();}, 1200);
    }
    $(document).on("click", "#RefreshId", function () {
        showOverlay();
        clearFields();
        $("#adddelegates-grid").jqGrid("clearGridData").jqGrid("setGridParam", { data: loadModalData }).trigger("reloadGrid");
        $("#delegates-grid").jqGrid("clearGridData").jqGrid("setGridParam", { data: loadUsersData }).trigger("reloadGrid");
        setTimeout(function () {
            hideOverlay();
        }, 1500);
    });

    $(document).on("click", "#Apply", function () {
        applyFilters();
        $("#delegateFilter").modal("hide");
    });
    $(document).on("click", "#closeFilter", function () {
       $("#filterLastName").val(filterValues.filterLastName);
       $("#filterFirstName").val(filterValues.filterFirstName);
       $("#filterCostCenterCode").val(filterValues.filterCostCenterCode);
       $("#filterCostCenterName").val(filterValues.filterCostCenterName);
    }); 

    $(document).on("click", "#clear-filter", function () {
        clearFields();
        $("#delegates-grid").jqGrid("clearGridData").jqGrid("setGridParam", { data: loadUsersData }).trigger("reloadGrid");
    });

    $(document).on("click", "#closeSearch", function () {
        $("#searchDelegates").val("");
        Searchfilter("");
    });

});

