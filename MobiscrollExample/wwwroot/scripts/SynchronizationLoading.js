$(document).ready(function () {

    $("#mnuAdminSyncPassengers").one("click", function () {
        $('#loadingSpinner').removeClass('text-success spinner-filled').addClass('spinner-border text-muted');
        $('#loadingSpinText').css('display', 'block');
        $('#synchroMessageSuccess').css('display', 'none');
        $('#synchroMessageError').css('display', 'none');
        $.ajax({
            url: '/ManagerPassengers/PersonSynchro',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    $('#synchroMessageText').remove();
                    $('#loadingSpinText').css('display', 'none');
                    $('#loadingSpinner').removeClass('text-muted').removeClass("text-danger").addClass('text-success spinner-filled text-center');
                    $('#synchroMessageSuccess').text(data.message);
                    $('#synchroMessageSuccess').css('display', 'block').addClass("text-success");
                    $('#spninnerCloseBtn').removeAttr('disabled');
                } else {
                    $('#synchroMessageText').remove();
                    $('#loadingSpinText').css('display', 'none');
                    $('#loadingSpinner').removeClass('text-muted').removeClass("text-success").addClass('text-danger spinner-filled text-center');
                    $('#synchroMessageError').text('Error : ' + data.message);
                    $('#synchroMessageError').css('display', 'block').addClass("text-danger");
                    $('#spninnerCloseBtn').removeAttr('disabled');
                }
                $("#spninnerCloseBtn").one("click", function () {
                    location.reload(); // This will refresh the current page
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Error fetching data:', errorThrown);
                $('#synchroMessageText').remove();
                $('#loadingSpinText').css('display', 'none');
                $('#loadingSpinner').removeClass('text-muted').removeClass("text-success").addClass('text-danger spinner-filled text-center');
                $('#synchroMessageError').text('Error : ' + errorThrown);
                $('#synchroMessageError').css('display', 'block').addClass("text-danger");
                $('#spninnerCloseBtn').removeAttr('disabled');
            }
        });
    });
});