function Dashboard(startDate, endDate)
{
    $.ajax({
        url: '/OvertimeReport/ReportDashboard',
        type: 'GET',
        dataType: 'json',
        data: {
            startDate: startDate,endDate: endDate
        },
        success: function (response) {
            console.log('ReportDashboard response--->', response);
            $('#internalJourneys').val(response[0].internalJourneys);
            $('#externalJourneys').val(response[0].externalJourneys);
            $('#outOfPolicyJourneys').val(response[0].outOfPolicyJourneys);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

$('#ApplyId-dashboard').click(function () {
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var startYear = new Date(startDate).getFullYear();
        var endYear = new Date(endDate).getFullYear();

        if ((startYear.toString().length == 4 && endYear.toString().length == 4) && (new Date(startDate) < new Date(endDate)))
            Dashboard(startDate, endDate);
        else
            alert('Invalid year');
    });
$('#RefreshId').click(function () {
    
        $('#startDate').val(''); 
        $('#endDate').val('');
        $('#internalJourneys').val('');
        $('#externalJourneys').val('');
        $('#outOfPolicyJourneys').val('');
    });
