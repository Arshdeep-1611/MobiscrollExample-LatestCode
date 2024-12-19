var languageObj;
var SelectDriver;
var DriverPopUpData;
var DriverFieldData;
var JourneyPopup;
var JourneyReportChanges;
var OvertimePopup;

$.ajax({
    url: '/Home/GetTripRequestorLocalization',
    method: 'GET',
    success: function (data) {
        console.log("laguage translation data", data);

        SelectDriver = data.SelectDriver;
        DriverPopUpData = data.DriverPopUpData;
        DriverFieldData = data.DriverFieldData;
        JourneyPopup = data.JourneyPopup;
        JourneyReportChanges = data.JourneyReportChanges;
        OvertimePopup = data.OvertimePopup;

        //languageObj = [
        //    { value: "SelectDriver", text: data.SelectDriver },

        //];
        //console.log(languageObj);
        //SelectDriver = languageObj.find(word => word.value == "SelectDriver");
    },
    error: function () {

    }
});
function downloadLogFiles() {
    $.ajax({
        url: '/Logs/DownloadLogFiles', // Ensure this path matches the correct controller route
        type: 'GET',
        xhrFields: { responseType: 'blob' }, // Set the response type to 'blob' to handle binary data
        success: function (data, status, xhr) {
            let filename = "LogFiles.zip"; // Default filename

            // Attempt to extract filename from Content-Disposition header
            const disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.includes('attachment')) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }

            // Create a blob from the response data
            const blob = new Blob([data], { type: 'application/zip' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;

            // Append link to body to trigger download
            document.body.appendChild(link);
            link.click();

            // Clean up and revoke object URL
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        },
        error: function (xhr, status, error) {
            console.error("An error occurred while downloading the file:", error);
            alert("An error occurred while downloading the file: " + error);
        }
    });
}


function DriverLoad() {
    showOverlayDriver();

    $.ajax({
        url: '/ManagerDrivers/GetDriver',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log("drivers dropdown overtime report", response);
            var data = response;
            if (data != null) {
                generateDropdownOptions(response, '#driverlist');
                generateDropdownOptions(response, '#driverList-work');
                generateDropdownOptions(response, '#driverList-sunday');
                console.log("Dropdown values", response);
            } else {
                console.log("No drivers are available");
            }
            hideOverlayDriver();
        },
        error: function (error) {
            console.error('response is null inside ajax call:', error);
            hideOverlayDriver();
        }
    });
}
function generateDropdownOptions(options, targetElement) {
    // Clear existing options
    $(targetElement).empty();

    // Add a default option
    console.log('target element', targetElement);

    $(targetElement).append($('<option>', {
        value: '',
        text: SelectDriver,
    }));

    // Add other dropdown options
    options.forEach(function (option) {
        $(targetElement).append($('<option>', {
            text: option.lastName + ' ' + option.firstName,
            value: option.driverId,
        }));
    });
}
function generateDriverReport() {
    const fromDate = document.getElementById('driverFromDate').value;
    const toDate = document.getElementById('driverToDate').value;
    const driver_id = parseInt(document.getElementById('driverList-work').value);

    var startYear2 = new Date(fromDate).getFullYear();
    var endYear2 = new Date(toDate).getFullYear();

    var tempfrom = new Date(fromDate);
    var tempTo = new Date(toDate);

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    var frommdateOnly = tempfrom.toLocaleDateString('en-US', options);
    var todateOnly = tempTo.toLocaleDateString('en-US', options);

    if ((startYear2.toString().length === 4 && endYear2.toString().length === 4) && (new Date(fromDate) < new Date(toDate))) {
        $.ajax({
            url: '/ReportManager/GetDriverWorkReport',
            method: 'GET',
            dataType: 'json',
            data: { dateFrom: frommdateOnly, dateTo: todateOnly, driver_id: driver_id }, 
            success: function (response) {
                if (response.count > 0) {
                    var languageId = $('#langugeId').val();

                    var reportNameEncoded;
                    if (languageId == 1) {
                        reportNameEncoded = "DriverReport.trdp";
                    } else {
                        reportNameEncoded = "DriverReport_FR.trdp";
                    }
                    //var reportNameEncoded = "DriverReport.trdp";
                    var parameterString = "driver_id=" + driver_id +
                        "&dateFrom=" + fromDate + "&dateTo=" + toDate + "&report=" + reportNameEncoded;
                    var url = "/Home/TelerikReport" + '?' + parameterString;
                    window.open(url, '_blank');
                } else {
                    alertCustom(2, DriverPopUpData);
                }
            },
            error: function (error) {
                console.error('response is null inside ajax call:', error);
            }
        });
    } else {
        alertCustom(1, DriverFieldData);
    }
}

function generateJourneyReport() {
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    var startYear1 = new Date(dateFrom).getFullYear();
    var endYear1 = new Date(dateTo).getFullYear();

    if ((startYear1.toString().length === 4 && endYear1.toString().length === 4) && (new Date(dateFrom) < new Date(dateTo))) {
        $.ajax({
            url: '/ReportManager/GetJourneyReport',
            method: 'GET',
            dataType: 'json',
            data: { dateFrom: dateFrom, dateTo: dateTo },
            success: function (response) {
                if (response.count > 0) {
                    var languageId = $('#langugeId').val();

                    var reportNameEncoded;
                    if (languageId == 1) {
                        reportNameEncoded = "JourneyReport.trdp";
                    } else {
                        reportNameEncoded = "JourneyReport_FR.trdp";
                    }
                    //var reportNameEncoded = "JourneyReport.trdp";
                    var parameterString = "dateFrom=" + dateFrom +
                        "&dateTo=" + dateTo + "&report=" + reportNameEncoded;
                    var url = "/Home/TelerikReport" + '?' + parameterString;
                    window.open(url, '_blank');
                    
                } else {
                    alertCustom(2, JourneyPopup);
                }
            },
            error: function (error) {
                console.error('response is null inside ajax call:', error);
            }
        });
    }
    else {
        alertCustom(1, JourneyReportChanges);
    }
}
function generateOvertimeReport() {
    const driver_id = parseInt(document.getElementById('driverlist').value);
    const year = document.getElementById('yearOfReport').value;
    //alert('driver ' +driver + ' and year '+year);
    if (driver_id && year && /^\d{4}$/.test(year)) {
        console.log("Driver:", driver_id);
        console.log("Year:", year);
        $.ajax({
            url: '/ReportManager/GetOverTimeReport',
            method: 'GET',
            data: { driver_id: driver_id, year: year },  // Pass data to the server
            dataType: 'json',
            success: function (response) {
                if (response.count > 0) {
                    var languageId = $('#langugeId').val();

                    var reportNameEncoded;
                    if (languageId == 1) {
                        reportNameEncoded = "OverTimeReport.trdp";
                    } else {
                        reportNameEncoded = "OverTimeReport_FR.trdp";
                    }
                    //var reportNameEncoded = "OverTimeReport.trdp";
                    var parameterString = "driver_id=" + driver_id +
                        "&year=" + year + "&report=" + reportNameEncoded;
                    var url = "/Home/TelerikReport" + '?' + parameterString;
                    window.open(url, '_blank');

                } else {
                    alertCustom(2, OvertimePopup);
                    
                }
            }, 
            error: function (error) {
                console.error('Error inside ajax call:', error);
            }
        });
    }
    else {
        alertCustom(1, DriverFieldData);
    }

}
function generateWeekendReport() {
    const driver_id = parseInt(document.getElementById('driverList-sunday').value);
    const year = parseInt(document.getElementById('yearOfWeekend').value);
    if (driver_id && year && /^\d{4}$/.test(year)) {
        $.ajax({
            url: '/ReportManager/GetWeekendReport',
            method: 'GET',
            dataType: 'json',
            data: { driver_id: driver_id, year: year },
            success: function (response) {
                if (response.count > 0) {
                    var languageId = $('#langugeId').val();

                    var reportNameEncoded;
                    if (languageId == 1) {
                        reportNameEncoded = "WeekendReport.trdp";
                    } else {
                        reportNameEncoded = "WeekendReport_FR.trdp";
                    }
                    //var reportNameEncoded = "WeekendReport.trdp";
                    var parameterString = "driver_id=" + driver_id +
                        "&year=" + year + "&report=" + reportNameEncoded;
                    var url = "/Home/TelerikReport" + '?' + parameterString;
                    window.open(url, '_blank');

                } else {
                    alertCustom(2, OvertimePopup);
                }
            },
            error: function (error) {
                console.error('response is null inside ajax call:', error);
            }
        });
    }
    else {
        alertCustom(1, DriverFieldData);
    }
}
function Dashboard(startDate, endDate) {
    $.ajax({
        url: '/ReportManager/ReportDashboard',
        type: 'GET',
        dataType: 'json',
        data: {
            startDate: startDate, endDate: endDate
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
        alertCustom(1, DriverFieldData);
});
$('#RefreshId,#CloseModalDashboard').click(function () {

    SetDefaultDate();
    $('#internalJourneys').val('');
    $('#externalJourneys').val('');
    $('#outOfPolicyJourneys').val('');
});

// Define a function to handle the common tasks
function resetFieldsAndLoadDrivers() {
    $('#yearOfReport').val('');
    $('#yearOfWeekend').val('');
    DriverLoad();
}

$('#ResetModalOverTime, #CloseOvertTime, #CloseWeekend, #ResetModalWeekend').click(resetFieldsAndLoadDrivers);
$('#ResetModalDriverReport, #CloseDriverReport').click(function () {
    SetDefaultDate();
    DriverLoad();
});

$('#ResetModalJourneyReport, #ResetJourneyReport').click(function () {
    SetDefaultDate();
});



function SetDefaultDate() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Manually format dates as YYYY-MM-DD
    const formattedFirstDay = formatDate(firstDayOfMonth);
    const formattedLastDay = formatDate(lastDayOfMonth);

    // Set the values of input fields , add all Id's here

    const startIds = ['#dateFrom', '#startDate', '#driverFromDate'];
    const endIds = ['#dateTo', '#endDate', '#driverToDate'];
    startIds.forEach(function (id) {
        $(id).val(formattedFirstDay);
    });

    endIds.forEach(function (id) {
        $(id).val(formattedLastDay);
    });
}
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function showOverlayDriver() {
    document.getElementById('overlay').style.display = 'flex';
}

// Function to hide the overlay
function hideOverlayDriver() {
    document.getElementById('overlay').style.display = 'none';
}

$('#mnuReportWorkReport, #mnuReportNightSunday, #mnuReportOvertime').off('click').on('click', function () {

    SetDefaultDate();
    DriverLoad();


    $(document).on('change', '#yearOfReport', function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        if ($(this).val() < 2000) {
            $(this).val(2000);
        }
        if ($(this).val() > 2999) {
            $(this).val(2999);
        }
        if ($(this).val().length > 4) {
            $(this).val($(this).val().slice(0, 4));
        }
    });


    $(document).on('change', '#yearOfWeekend', function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        if ($(this).val() < 2000) {
            $(this).val(2000);
        }
        if ($(this).val() > 2999) {
            $(this).val(2999);
        }
        if ($(this).val().length > 4) {
            $(this).val($(this).val().slice(0, 4));
        }
    });
});
