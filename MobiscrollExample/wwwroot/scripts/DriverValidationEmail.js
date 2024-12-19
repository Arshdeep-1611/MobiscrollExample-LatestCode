$(document).ready(function () {
    /*const tripId = 606;
    const status = 1;*/
    var url = new URL(window.location.href);
    var status = 3;
    // Create an instance of URLSearchParams
    var params = new URLSearchParams(url.search);

    // Extract query parameters
    var tripId = params.get('TripId');
    var isAccepted = params.get('isAccepted');
    if (isAccepted == 1) {
        status = 10;
    }
    // Use jQuery to display or manipulate the parameters
   
    $('#isAcceptedDisplay').text('isAccepted: ' + isAccepted);
    //Here take this.id for tripId 
    $.ajax({
        url: '/DriverValidationEmail/DriverValidateEmail?tripId=' + tripId + '&isAccepted=' + parseInt(isAccepted),
        type: 'POST',
        //dataType: 'json',
       /* data: {
            tripId: parseInt(tripId),
            status: isAccepted
        },*/
        success: function (response) {
            /*alert('response ', response);*/
           /* $('#tripIdDisplay').text(tripId);
            $('#Status').text(status);*/
          /*  console.log('Email accept/reject working', response);*/
            
            //$('#Status').text(status);


            if (response.success == true) {
                if (response.message !== "") {
                    $('#errorMessage').text(response.result);
                }
                else {
                $('#errorMessage').text('');
                }
                $('#tripId').text(tripId);
                $('#Status').text(status);
            }
            else {
                //$('#Status').text(response);
                $('#tripId').text(tripId);
                $('#errorMessage').text(response.result);
               /* alert('hello ');*/
               // console.log('hi hello');
            }
        },
        error: function (xhr, status, error) {
            alert('response ', response);

            console.error('Error fetching data:', error);
            console.log('Email accept/reject working', response);
        }
    });
    $('#acceptOnEmail').on('click', function () {
        //, #rejectOnEmail
      
    });

});