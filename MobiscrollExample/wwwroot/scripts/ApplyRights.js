//$(document).ready(function () {
//    var accessLevel = $('#accessLevel').val();
//    console.log("accessLevel", accessLevel);
//    $.ajax({
//        url: '/Trips/GetRoleTools',
//        method: 'GET',
//        dataType: 'json',
//        success: function (data) {
//            console.log('toolslist', data);
//            data.forEach(function (tool) {
//                if (tool.isEnabled == false) {
//                    $('#' + tool.name).attr('href', 'javascript:void(0);');
//                    $('#' + tool.name).addClass('disabled');
//                    $('#' + tool.name).attr('aria-disabled', 'true');
//                    $('#' + tool.name).prop('disabled', true);
//                    console.log('isEnabled=false', tool.name);
//                } else {
//                    //$('#' + tool.name).attr('href', $this.data('original-href'));
//                    //$('#' + tool.name).removeClass('disabled-link');
//                }
//            });
//        },
//        error: function (xhr, textStatus, errorThrown) {
//            console.error('Error fetching data:', errorThrown);

//        }
//    });
//});