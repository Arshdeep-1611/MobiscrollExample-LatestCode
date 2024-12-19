
$(document).ready(function () {
    function showOverlay() {
        document.getElementById('overlay').style.display = 'flex';
    }
    var changes = false;
    var TripsCancelConfirmMessage;
    var encryptionKey;
    const FIXED_IV = new Uint8Array(12);
    // Function to perform the AJAX request
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
    function fetchKey() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:'/ManagerExternalService/GetEncryptionKey', // Replace with your endpoint
                method: 'GET',
                success: (data) => {
                    resolve(data); // Adjust based on the actual response format
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject(errorThrown);
                }
            });
        });
    }
    (async () => {
        try {
            // Fetch the key from the server
            const keyString = await fetchKey();

            // Convert and pad/truncate the key
            const keyBytes = stringToUint8Array(keyString);
            const rawKey = padKeyToLength(keyBytes, 32); // 32 bytes for AES-256

            // Import the key
            encryptionKey = await importKey(rawKey);
            console.log('Key imported successfully:', encryptionKey);

            // Data to encrypt
            //const data = 'Hello, world!';

            // Encrypt the data
            //const { encryptedData, iv } = await encryptData(key, data);
            //console.log('Encrypted Data:', encryptedData);

            // Decrypt the data
            /*const decryptedData = await decryptData(key, encryptedData, iv);
            console.log('Decrypted Data:', decryptedData);*/
        } catch (error) {
            console.error('Error:', error);
        }
    })();
    function modifiedDetails() {
        // Get the current date and time
        var currentDateTime = new Date();
        // Format the date and time as desired
        var formattedDateTime = currentDateTime.toLocaleString();
        // Set the value of the input field to the formatted date and time
        $('#textTimeStamp').val(formattedDateTime);
        dataToSend = { send: true };
        $.ajax({
            url: 'Home/GetUserLoginDetails',
            method: 'GET',
            data: dataToSend,
            success: function (response) {
                $('#textModifiedBy').val(response.name);
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }
    function stringToUint8Array(str) {
        const encoder = new TextEncoder(); // UTF-8 encoding
        return encoder.encode(str);
    }

    // Ensure the key length is appropriate for AES-GCM (32 bytes for AES-256)
    function padKeyToLength(keyBytes, length) {
        const paddedKey = new Uint8Array(length);
        paddedKey.set(keyBytes.slice(0, length));
        return paddedKey;
    }
    /*console.log(encryptionKey);*/
    // Function to hide the overlay
    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }
    showOverlay();

    var NameDisplayName;
    var ValidateFields;
    $.ajax({
        url: '/Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("language translation data", data);

            NameDisplayName = data.NameDisplayName;
            ValidateFields = data.ValidateFields;
            TripsCancelConfirmMessage = data.TripsCancelConfirmMessage
            $.ajax({
                url: 'ManagerExternalService/GetServices',
                method: 'GET',
                success: function (data) {
                    $("#passanger-grid").jqGrid('clearGridData');
                    var mydata = null;
                    mydata = data.map(function (item) {
                        console.log(item);
                        return {

                            Id: item.id,
                            FirstName: item.contact_firstname,
                            LastName: item.contact_lastname,
                            Name: item.name,
                            Comment: item.comment,
                            Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                            Valid: item.valid,
                            Interface: item.Interface,
                            ModifiedBy: item.modified_by,
                            ModificationDate: item.time_stamp,
                            UnassignedHours: item.unassigned_warning_hours,
                            UnconfirmedHours: item.unconfirmed_warning_hours,
                            Code: item.code,
                            Url: item.webservice_url,
                            Username: item.webservice_auth_user,
                            Password: item.webservice_auth_pwd,
                            PersonalCode: item.webservice_auth_code,
                            ContactPhone: item.contact_phone,
                            IntervalHours: item.interval_cancelling_hours,
                            Email: item.contact_email
                            //Telephone: item.telePhone,
                            // Email: item.email,
                            //PassengerId: item.passengerId,
                            /* AccessLevel: item.accessLevel,
                             SendAlert: item.send_alert,
                             SendAlertWeekend: item.send_alert_during_weekend,
                             
                             
                             MobilePhone: item.mobilePhone,
                             
                            
                             OwnerUserId: item.ownerUserId,*/

                            //IsVip: item.isVip,
                        };

                    }); // Close the map function here
                    console.log(mydata);
                    // Initialize the grid with new data
                    var $grid = $("#passanger-grid"),
                        newWidth = $grid.closest(".ui-jqgrid").parent().width();

                    // Set the grid width
                    $grid.jqGrid("setGridWidth", newWidth, true);

                    jQuery("#passanger-grid").jqGrid({
                        data: mydata,
                        datatype: "local",
                        colNames: [NameDisplayName, 'Action', 'Id', 'Comment', 'FirstName', 'LastName', 'Email', 'Valid', 'Interface', 'ModifiedBy', 'ModificationDate', 'UnassignedHours', 'UnconfirmedHours', 'Code', 'Url', 'Username', 'Password', 'PersonalCode', 'ContactPhone', 'IntervalHours'],
                        colModel: [
                            { name: 'Name', index: 'Name', width: 150, align: 'left' },
                            { name: 'Action', index: 'Action', width: 30, align: 'left' },

                            { name: 'Id', index: 'Id', hidden: true },
                            { name: 'LastName', index: 'LastName', hidden: true },
                            { name: 'FirstName', index: 'FirstName', hidden: true },
                            { name: 'Comment', index: 'Comment', hidden: true },
                            { name: 'Email', index: 'Email', hidden: true },
                            { name: 'Valid', index: 'Valid', hidden: true },
                            { name: 'Interface', index: 'Interface', hidden: true },
                            { name: 'ModificationDate', index: 'ModificationDate', hidden: true },
                            { name: 'ModifiedBy', index: 'ModifiedBy', hidden: true },
                            { name: 'UnassignedHours', index: 'UnassignedHours', hidden: true },
                            { name: 'UnconfirmedHours', index: 'UnconfirmedHours', hidden: true },
                            { name: 'Code', index: 'Code', hidden: true },
                            { name: 'Url', index: 'Url', hidden: true },
                            { name: 'Username', index: 'Username', hidden: true },
                            { name: 'Password', index: 'Password', hidden: true },
                            { name: 'PersonalCode', index: 'PersonalCode', hidden: true },
                            { name: 'ContactPhone', index: 'ContactPhone', hidden: true },
                            { name: 'IntervalHours', index: 'IntervalHours', hidden: true },


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
                        clearAll();
                        $("input").css('border', '1px solid #cacccf');
                        $('#enregisterBtn').removeClass('btn-gray').addClass('btn-yellow').prop('disabled', false);
                        $(".box-container-blk").show();

                        var rowData = {};
                        var rowData = $(this).closest("tr").find("td").map(function () {
                            return $(this).text();
                        }).get();
                        console.log(rowData);
                        var ServiceId = rowData[2];
                        getServiceById(ServiceId);
                    });

                    //Attach click event handler to delete buttons
                    $("#passanger-grid").off("click", ".delete-button").on("click", ".delete-button", function (event) {
                        event.stopPropagation();
                        var rowData = {};
                        rowData = $(this).closest("tr").find("td").map(function () {
                            return $(this).text();
                        }).get();
                        var serviceId = rowData[2];
                        deletePassenger(serviceId);
                    });
                    hideOverlay();
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
        showOverlay();
        $.ajax({
            url: 'ManagerExternalService/GetServices',
            method: 'GET',
            success: function (data) {
                $("#passanger-grid").jqGrid('clearGridData');
                var mydata = null;
                mydata = data.map(function (item) {
                    console.log(item);
                    return {

                        Id: item.id,
                        FirstName: item.contact_firstname,
                        LastName: item.contact_lastname,
                        Name: item.name,
                        Comment: item.comment,
                        Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        Valid: item.valid,
                        Interface: item.Interface,
                        ModifiedBy: item.modified_by,
                        ModificationDate: item.time_stamp,
                        UnassignedHours: item.unassigned_warning_hours,
                        UnconfirmedHours: item.unconfirmed_warning_hours,
                        Code: item.code,
                        Url: item.webservice_url,
                        Username: item.webservice_auth_user,
                        Password: item.webservice_auth_pwd,
                        PersonalCode: item.webservice_auth_code,
                        ContactPhone: item.contact_phone,
                        IntervalHours: item.interval_cancelling_hours,
                        Email: item.contact_email
                        //Telephone: item.telePhone,
                        // Email: item.email,
                        //PassengerId: item.passengerId,
                        /* AccessLevel: item.accessLevel,
                         SendAlert: item.send_alert,
                         SendAlertWeekend: item.send_alert_during_weekend,
                         
                         
                         MobilePhone: item.mobilePhone,
                         
                        
                         OwnerUserId: item.ownerUserId,*/

                        //IsVip: item.isVip,
                    };

                }); // Close the map function here
                var $grid = $("#passanger-grid");
                $grid.jqGrid('clearGridData');
                $grid.jqGrid('setGridParam', {
                    datatype: 'local',
                    data: mydata
                }).trigger("reloadGrid");
                hideOverlay();
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
            },
            error: function (error) {
                alert('Error : ' + JSON.stringify(error));
                console.error('Error fetching data:', JSON.stringify(error));
            }
        });
    }
    function getServiceById(ServiceId) {
        showOverlay();
        $.ajax({
            url: 'ManagerExternalService/GetServiceByID',
            method: 'GET',
            data: { id: ServiceId },
            success: async function (obj) {
                /* Id: item.id,-
                    FirstName: item.contact_firstname,-
                    LastName: item.contact_lastname,-
                    Name: item.name,-
                    Comment: item.comment,-
                    Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                    Valid: item.valid,
                    Interface: item.Interface,
                    ModifiedBy: item.modified_by,
                    ModificationDate: item.time_stamp,
                    UnassignedHours: item.unassigned_warning_hours,
                    UnconfirmedHours: item.unconfirmed_warning_hours,
                    Code: item.code,
                    Url: item.webservice_url,
                    Username: item.webservice_auth_user,
                    Password: item.webservice_auth_pwd,
                    PersonalCode: item.webservice_auth_code,
                    ContactPhone: item.contact_phone,
                    IntervalHours: item.interval_cancelling_hours*/
                console.log(obj);
                if (obj.webservice_auth_pwd !== null && obj.webservice_auth_pwd !== "") {

                    // var decryptedPassword = await decryptPasswordWithFixedIV(encryptionKey, obj.webservice_auth_pwd);
                    var decryptedPassword = obj.webservice_auth_pwd;
                }
                $('#textServiceId').val(obj.id);
                $('#textCode').val(obj.code);
                $('#textLastName').val(obj.contact_lastname);
                $('#textComment').val(obj.comment);
                $('#textName').val(obj.name);
                $('#textFirstName').val(obj.contact_firstname);
                $('#textEmail').val(obj.contact_email);
                $('#textValid').val(obj.valid);
                $('#textContactNumber').val(obj.contact_phone);
                $('#textInterface').val(obj.interface);
                $('#textModifiedBy').val(obj.modified_by);
                var simpleDate = new Date(obj.time_stamp).toLocaleString();
                $('#textTimeStamp').val(simpleDate);
                $('#textUnassignedWarningHours').val(obj.unassigned_warning_hours);

                $('#textUnconfirmedWarningHours').val(obj.unconfirmed_warning_hours);
                $('#textAddressUrl').val(obj.webservice_url);
                $('#textWebServiceCode').val(obj.webservice_auth_code);
                $('#textPassword').val(decryptedPassword ? decryptedPassword : "");
                $('#textUsername').val(obj.webservice_auth_user);
                
                $('#textCancellingHours').val(obj.interval_cancelling_hours);
                hideOverlay();
                //modifiedDetails('Edit');
                //getAccessLevel(obj.accessLevel);
                /* selectOwnerById(obj.ownerUserId, 'textOwnerId');
                 populateSelect(obj.valid, 'textValid');
                 populateSelect(obj.isAuthorized, 'textAuthorised');
                 populateSelect(obj.isEditable, 'textIsEdit');
                 populateSelect(obj.isPrivate, 'textIsPrivate');
                 populateSelect(obj.isVip, 'textVip');*/

                // Closing each loop
            },
            error: function (error) {
                alert(JSON.stringify(error));
                console.error('Error fetching data:', error);
            }

        });
    }
    async function importKey(rawKey) {
        const key = await crypto.subtle.importKey(
            'raw',
            rawKey,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
        return key;
    }

    async function encryptPasswordWithFixedIV(key, password) {
        const iv = FIXED_IV; // Use the fixed IV
        const encodedPassword = new TextEncoder().encode(password);

        const encrypted = await crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv,
            },
            key,
            encodedPassword
        );

        return arrayBufferToBase64(encrypted);
    }

    // Helper function to convert ArrayBuffer to Base64
    function arrayBufferToBase64(buffer) {
        const bytes = new Uint8Array(buffer);
        let binaryString = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binaryString += String.fromCharCode(bytes[i]);
        }
        return btoa(binaryString);
    }


    // Convert Base64 to ArrayBuffer
    async function decryptPasswordWithFixedIV(key, encryptedPasswordBase64) {
        const encryptedPassword = base64ToArrayBuffer(encryptedPasswordBase64);
        const iv = FIXED_IV; // Use the fixed IV

        try {
            const decrypted = await crypto.subtle.decrypt(
                {
                    name: 'AES-GCM',
                    iv: iv,
                },
                key,
                new Uint8Array(encryptedPassword)
            );

            return new TextDecoder().decode(decrypted);
        } catch (error) {
            console.error('Decryption failed:', error);
            throw error;
        }
    }

    // Helper function to convert Base64 to ArrayBuffer
    function base64ToArrayBuffer(base64) {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }


    $("#addPassengerBtn").on("click", function () {
        $(".box-container-blk").hide();
        clearAll();
        modifiedDetails();
        $('input').removeAttr('title', 'Empty fields!');
        $('input').css('border', '1px solid #cacccf');
        $('#enregisterBtn').removeClass('btn-gray').addClass('btn-yellow').prop('disabled', false);
        $(".box-container-blk").show();
    });
   

   async  function addEditservice() {
        var serviceId = $('#textServiceId').val();
        var comment = JSON.stringify($('#textComment').val());
        const password = $('#textPassword').val();

       // Encrypt the password
       if (password !== "" && password !== undefined && password !== null) {

           //var encryptedPassword = await encryptPasswordWithFixedIV(encryptionKey, password);
           var encryptedPassword = password;
       }
        var dataToSend = {
            Id: serviceId,
            Code: $('#textCode').val(),
            lastname: $('#textLastName').val(),
            Comment: $('#textComment').val(),
            Name: $('#textName').val(),
            firstname: $('#textFirstName').val(),
            email: $('#textEmail').val(),
            Valid: $('#textValid').val(),
            phonenumber: $('#textContactNumber').val(),
            _interface: $('#textInterface').val(),
            //Modified_By: ('#textModifiedBy').val(),
            // $('#textTimeStamp').val(simpleDate),
            unassigned: $('#textUnassignedWarningHours').val(),

            unconfirmed: $('#textUnconfirmedWarningHours').val(),
            url: $('#textAddressUrl').val(),
            personalcode: $('#textWebServiceCode').val(),
            password: encryptedPassword ? encryptedPassword : "",
            username: $('#textUsername').val(),

            Interval: $('#textCancellingHours').val()
        }

        showOverlay();

        $.ajax({
            url: 'ManagerExternalService/SaveOrEditExternalService',
            method: 'POST',
            data: dataToSend,
            success: function (response) {
                //console.log(JSON.stringify(response));
                //alert('User updated successfully!');
                var key = sessionStorage.getItem("externalServiceId");
                refreshGrid();
                hideOverlay();
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
    }
    $("#enregisterBtn").on("click", function () {
        if (checkFields()) {
            return false;
        }
        var serviceId = $('#textServiceId').val();
        sessionStorage.setItem("externalServiceId", serviceId);
        if (serviceId > 0 && serviceId != null) {
      
            $('#alert-update-popup').modal('show');
            // Handle the confirmation action
            
            $('#btnUpdateConfirm').click(function () {
                changes = false;
                window.globalChange = changes;
                $('#alert-update-popup').modal('hide');
                $(".box-container-blk").hide();
                addEditservice();
              
            });
        } else {
            $('#alert-insert-popup').modal('show');
            // Handle the confirmation action
           
            $('#btnInsertConfirm').click(function () {
                changes = false;
                window.globalChange = changes;
                $('#alert-insert-popup').modal('hide');
                $(".box-container-blk").hide();
                addEditservice();
                
            });
        }
        
    })
    function deletePassenger(id) {
        var dataToSend = { id: parseInt(id) };


        $(".box-container-blk").show();
        $('#alert-delete-popup').modal('show');
        $('#btnDeleteConfirm').click(function () {
          
            $.ajax({
                url: 'ManagerExternalService/DeleteExternalService',
                method: 'DELETE',
                data: dataToSend, // Pass any data required for deletion, such as the record ID
                success: function (response) {
                    // Handle success response, if needed
                    console.log('Record deleted successfully:', response);
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
                    clearAll();
                    // location.reload();
                },
                error: function (xhr, textStatus, errorThrown) {
                    // Handle error response
                    console.error('Error deleting record:', textStatus, errorThrown);
                }
            });

        });
    };
    $("#resetBtn").on("click", function () {
        $('input').removeAttr('title', 'Empty fields!');
        $('input').css('border', '1px solid #cacccf');
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
    })
    /*int Id, string Name, string Code, string lastname, string firstname, string email, string phonenumber, int unassigned, int unconfirmed, string url,

       string username, string password, string personalcode, int _interface, int Interval, string Comment, int Valid, string ? Modified_By*/
    function clearAll() {
        $('#textServiceId').val(null);
        $('#textCode').val("");
        $('#textLastName').val("");
        $('#textComment').val("");
        $('#textName').val("");
        $('#textFirstName').val("");
        $('#textEmail').val("");
        $('#textValid').val(0);
        $('#textContactNumber').val("");
        $('#textInterface').val(0);
        $('#textModifiedBy').val("");
        //var simpleDate = new Date(obj.time_stamp).toLocaleString();
        $('#textTimeStamp').val("");
        $('#textUnassignedWarningHours').val(0);

        $('#textUnconfirmedWarningHours').val(0);
        $('#textAddressUrl').val("");
        $('#textWebServiceCode').val("");
        $('#textPassword').val("");
        $('#textUsername').val("");

        $('#textCancellingHours').val(0);
    }
    $(document).on("keyup", '#gsearch', function () {
        // Clear the content of the Passenger-grid
        var inputString = $('#gsearch').val();
        /*showOverlay();*/
        $.ajax({
            url: '/ManagerExternalService/SearchService',
            method: 'GET',
            data: { searchString: inputString },
            success: function (data) {
                // Mapping data to mydata
                var mydata = null;
                var mydata = data.map(function (item) {
                    return {
                        Id: item.id,
                        FirstName: item.contact_firstname,
                        LastName: item.contact_lastname,
                        Name: item.name,
                        Comment: item.comment,
                        Action: "<img src='./img/metro-bin.png' class='delete-button'>",
                        Valid: item.valid,
                        Interface: item.Interface,
                        ModifiedBy: item.modified_by,
                        ModificationDate: item.time_stamp,
                        UnassignedHours: item.unassigned_warning_hours,
                        UnconfirmedHours: item.unconfirmed_warning_hours,
                        Code: item.code,
                        Url: item.webservice_url,
                        Username: item.webservice_auth_user,
                        Password: item.webservice_auth_pwd,
                        PersonalCode: item.webservice_auth_code,
                        ContactPhone: item.contact_phone,
                        IntervalHours: item.interval_cancelling_hours,
                        Email: item.contact_email
                    };
                }); // Close the map function here

                // Clear and reload the grid with the filtered data
                var $grid = $("#passanger-grid");
                $grid.jqGrid('clearGridData');
                $grid.jqGrid('setGridParam', {
                    datatype: 'local',
                    data: mydata
                }).trigger("reloadGrid");
               /* hideOverlay();*/
            },
            error: function (error) {
                alert('Error : ' + JSON.stringify(error));
                console.error('Error fetching data:', JSON.stringify(error));
            }
        });
    });
    $(document).on("input", '#gsearch', function () {
        if ($('#gsearch').val() === '') {
            refreshGrid();
        }
    });
   /* var nameIds = ['#textFirstName', '#textLastName','#textName'];
    // Attach event handlers to perform name validation
    $.each(nameIds, function (index, id) {
        $(id).on('keypress', function (event) {
            checkFields();
            $("input").css('border', '1px solid #cacccf');
            // Get the character code of the pressed key
            var charCode = event.which || event.keyCode;

            // Check if the pressed key is a letter or space
            if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                // Prevent the default action if it's not a letter or space
                event.preventDefault();
            }
        });
    });*/
    $('#textComment').on('keypress', function (e) {
        // Check if the pressed key is the double quote key
        if (e.which === 34) { // 34 is the ASCII code for the double quote (")
            e.preventDefault(); // Prevent the default action (inserting the character)
        }
    });
    var nameIds = ['#textFirstName', '#textLastName','#textName'];
    // Attach event handlers to perform name validation
    $.each(nameIds, function (index, id) {
        $(id).on('input', function (event) {
            // checkFields();
            var val = $(id).val();
            if (val == null || val =="") {
                $(id).css('border', '1px solid #ff0000');
                $(id).attr('title', 'Empty fields!');
            }
            else {
                $(id).css('border', '1px solid  #cacccf');
                $(id).removeAttr('title', 'Empty fields!');
            }
            //$(id).css('border', '1px solid #cacccf');
            // Get the character code of the pressed key
            var charCode = event.which || event.keyCode;

            // Check if the pressed key is a letter or space
            if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                // Prevent the default action if it's not a letter or space
                event.preventDefault();
            }
        });
        $(id).on('keypress', function (event) {
            // checkFields();
           /* var val = $(id).val();
            if (val) {
                $(id).css('border', '1px solid #ff0000');
                $(id).attr('title', 'Empty fields!');
            }
            else {
                $(id).css('border', '1px solid  #cacccf');
                $(id).removeAttr('title', 'Empty fields!');
            }*/
            //$(id).css('border', '1px solid #cacccf');
            // Get the character code of the pressed key
            var charCode = event.which || event.keyCode;

            // Check if the pressed key is a letter or space
            if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                // Prevent the default action if it's not a letter or space
                event.preventDefault();
            }
        });
    });
    $('#textCode').on('input', function (event) {
       // checkFields();
        var input = $(this);
        var is_name = input.val();
        if (is_name == null || is_name=="") {
            input.css('border', '1px solid #ff0000');
            input.attr('title', 'Empty fields!');
        }
        else {
            input.css('border', '1px solid  #cacccf');
            input.removeAttr('title', 'Empty fields!');
        }
    })
    var numberids = ['#textCancellingHours', '#textUnassignedWarningHours', '#textUnconfirmedWarningHours'];
    $.each(numberids, function (index, id) {
        $(id).on('keypress', function (event) {
            //checkFields();
            $("input").css('border', '1px solid #cacccf');
            // Get the character code of the pressed key
            var charCode = event.which || event.keyCode;

            // Check if the pressed key is a letter or space
            if (charCode == 45) {
                // Prevent the default action if it's not a letter or space
                event.preventDefault();
            }
        });
    });
    var numberids = ['#textCancellingHours', '#textUnassignedWarningHours', '#textUnconfirmedWarningHours'];
    $.each(numberids, function (index, id) {
        $(id).on('change', function (event) {
          //  checkFields();
            $(id).css('border', '1px solid #cacccf');
            // Get the character code of the pressed key
            var charCode = event.which || event.keyCode;

            // Check if the pressed key is a letter or space
            if (charCode==196) {
                // Prevent the default action if it's not a letter or space
                event.preventDefault();
            }
        });
    });
    function checkFields() {
        var stringids = ['#textCode', '#textLastName', '#textName', '#textFirstName'];
        var numberids = ['#textCancellingHours', '#textUnassignedWarningHours', '#textUnconfirmedWarningHours'];
        // Initialize a flag to check if any field is empty
        var emptyFieldFound = 0;
        let scrollcount = 0;
        // Loop through each input field
        stringids.forEach(function (id) {
            // Check if the field is empty
            if ($(id).val() === '' || $(id).val() === null) {
           /*     scrollcount++;
                if (scrollcount == 1) {

                    $(id).scrollIntoView();
                }*/
                $(id).css('border', '1px solid #ff0000');
                $(id).attr('title', ValidateFields);
                emptyFieldFound = +1; // Set flag to true if empty field is found
            } else {
                $(id).removeAttr('title', ValidateFields);
                $(id).css('border', '1px solid #cacccf');

            }
        });
        numberids.forEach(function (id) {
            // Check if the field is empty
            if ($(id).val() < 0) {
                $(id).css('border', '1px solid #ff0000');
                $(id).attr('title', ValidateFields);
                emptyFieldFound = +1; // Set flag to true if empty field is found
            } else {
                $(id).removeAttr('title', ValidateFields);
                $(id).css('border', '1px solid #cacccf');

            }
        });

        // If any empty field is found, disable the button and change its style
        if (emptyFieldFound > 0) {
          //  $('#enregisterBtn').removeClass('btn-yellow').addClass('btn-gray').prop('disabled', true);
            return true;
        } else {
           // $('#enregisterBtn').removeClass('btn-gray').addClass('btn-yellow').prop('disabled', false);
            return false;
        }
    }
})