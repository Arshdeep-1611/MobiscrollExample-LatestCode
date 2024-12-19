//function toggleModalOverlay(show) {
//    if (show) {
//        $('#searchPopUp #ajaxOverlayModal').show();
//    } else {
//        $('#searchPopUp #ajaxOverlayModal').hide();
//    }
//}

    //$.ajax({
    //    url: '/Trips/CostCenterCodes',
    //    method: 'GET',
    //    dataType: 'json',
    //    success: function (data) {
    //        //console.log('cost centers inside searchModal', data);
    //        if (data != null) {
    //            costCentersDetails12 = data;
    //            //console.log('costCentersDetails inside searchModal', costCentersDetails12);


    //            var targetCostCenterCode = document.getElementById("otherCostCenter").value;


    //            var foundCostCenter = costCentersDetails12.find(function (costCenter) {
    //                return costCenter.costCenterCode === targetCostCenterCode;
    //            });
    //            //console.log('costCentercode found', foundCostCenter);

    //            if (foundCostCenter) {
    //                var concatenatedResult = foundCostCenter.costCenterCode + " - " + foundCostCenter.costCenterName;
    //                $('#CostcenterTip').val(concatenatedResult); 
    //                //console.log('concatenatedResult', concatenatedResult);
    //            } else {
    //                console.log("Cost Center not found");
    //            }

    //        } else {
    //            console.log("No costcenters");
    //        }
    //    },
    //    error: function (error) {
    //        console.error('API request failed:', error);
    //    }
    //});


//function to show or hide the modal overlay
//function toggleModalOverlay(show) {
//    const $modalOverlay = $('#searchPopUp #ajaxOverlayModal');
//    if (show) {
//        $modalOverlay.show();
//    } else {
//        $modalOverlay.hide();
//    }
//}
