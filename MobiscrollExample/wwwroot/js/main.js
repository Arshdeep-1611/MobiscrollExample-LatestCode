jQuery(document).ready(function () {

 
    jQuery(".hamburger").click(function () {
        jQuery(".nav-right").toggleClass("show");
        jQuery(this).toggleClass("active");
    });
    /*var roles = jQuery("#rolesList").val();
    var checkRole = JSON.parse(roles);*/
    const showConfirmPopup = (textValue) => {
        $('#confirm-popup').find("#popup-body").text(textValue);
        $('#confirm-popup').modal('show');
    }

    const hideConfirmPopup = () => {
        $('#confirm-popup').modal('hide');
    }
    //var access = checkRole.find(role => role.ToolId == 42);
    window.globalChange = false;
  
    //console.log(access);
    jQuery(document).ready(function ($) {
        jQuery(window).on("resize", function () {
            var mastHeight = jQuery(".header").outerHeight();

            jQuery(".main-section").css("margin-top", mastHeight);
        });

        jQuery(window).trigger("resize");
    });

    jQuery(".tabs-nav-3 li:first-child").addClass("active-3");
    jQuery(".tab-content-3").hide();
    jQuery(".tab-content-3:first").show();

    //// Click function
    //jQuery(".tabs-nav-3 li").click(function () {
    //    jQuery(".tabs-nav-3 li").removeClass("active-3");
    //    jQuery(this).addClass("active-3");
    //    jQuery(this).prev().addClass("complete");
    //    jQuery(".tab-content-3").hide();


    //    var activeTab = jQuery(this).find("a").attr("href");
    //    jQuery(activeTab).fadeIn();
    //    return false;
    //});

    jQuery(".t-nav-3 li:first-child").addClass("active-3");
    jQuery(".tab-3").hide();
    jQuery(".tab-3:first").show();

    // Click function
    jQuery(".t-nav-3 li").click(function () {
        jQuery(".t-nav-3 li").removeClass("active-3");
        jQuery(this).addClass("active-3");
        jQuery(".tab-3").hide();


        var activeTab = jQuery(this).find("a").attr("href");
        jQuery(activeTab).fadeIn();
        return false;
    });


    // hide and show table 
    jQuery(function () {
        jQuery("#check-trip").click(function () {
            if (jQuery(this).is(":checked")) {
                jQuery("#landing-grid-2").show();
                jQuery("#landing-grid-1").hide();
            } else {
                jQuery("#landing-grid-2").hide();
                jQuery("#landing-grid-1").show();
            }
        });
    });


    // Requestor tabs
    jQuery(".main-tabs-nav3 li:first-child").addClass("main-active");
    jQuery(".main-tab-content3").hide();
    jQuery(".main-tab-content3:first").show();

    var activeTab = '#main-tab1';
    //if (access == undefined || access.IsEnabled == false) {
        //jQuery("#main-tab1").hide();
    //}

    // Click function
    jQuery(".main-tabs-nav3 li").click(function () {
        jQuery(".main-tabs-nav3 li").removeClass("main-active");
        jQuery(this).addClass("main-active");
        jQuery(".main-tab-content3").hide();


        activeTab = jQuery(this).find("a").attr("href");
        jQuery(activeTab).fadeIn();

        if (activeTab == '#main-tab3') {
            $(".search-detail-tab").hide();
            $(".search-tab").show();
            $("#statusBottom").show();
        }       
    /*    if (access == undefined || access.IsEnabled == false) {
            jQuery("#main-tab1").hide();
            jQuery('#mnuTripValidation')
                .removeAttr('href') // Remove the href attribute
                .addClass('disabled');
        }*/
        return false;
    });


    // Trips tabs
    jQuery(".trip-tabs-nav3 li:first-child").addClass("main-active");
    jQuery(".trip-tab-content3").hide();
    jQuery(".trip-tab-content3:first").show();

    // Click function
    jQuery(".trip-tabs-nav3 li").click(function () {
        jQuery(".trip-tabs-nav3 li").removeClass("main-active");
        jQuery(this).addClass("main-active");
        jQuery(".trip-tab-content3").hide();


        var activeTab = jQuery(this).find("a").attr("href");
        jQuery(activeTab).fadeIn();

        return false;
    });

    // Add New Payment modal tabs
    jQuery("#AddNewPayment .t-nav-3 li:first-child").addClass("active-4");
    jQuery("#AddNewPayment .tab-content-3").hide();
    jQuery("#AddNewPayment .tab-content-3:first").show();

    // Click function
    jQuery("#AddNewPayment .t-nav-3 li").click(function () {
        jQuery("#AddNewPayment .t-nav-3 li").removeClass("active-4");
        jQuery(this).addClass("active-4");
        jQuery(this).prev().addClass("complete");
        jQuery("#AddNewPayment .tab-content-3").hide();


        var activeTab = jQuery(this).find("a").attr("href");
        jQuery(activeTab).fadeIn();
        return false;
    });


    // Add New Payment modal tabs
    jQuery("#AddNewPassenger .ta-nav-3 li:first-child").addClass("active-3");
    jQuery("#AddNewPassenger .tab-3-content").hide();
    jQuery("#AddNewPassenger .tab-3-content:first").show();

    // Click function
    jQuery("#AddNewPassenger .ta-nav-3 li").click(function () {
        jQuery("#AddNewPassenger .ta-nav-3 li").removeClass("active-3");
        jQuery(this).addClass("active-3");
        jQuery(this).prev().addClass("complete");
        jQuery("#AddNewPassenger .tab-3-content").hide();


        var activeTab = jQuery(this).find("a").attr("href");
        jQuery(activeTab).fadeIn();
        return false;
    });


    // Add New Payment modal tabs
    jQuery("#PaymentMode .ta-nav-3 li:first-child").addClass("active-3");
    jQuery("#PaymentMode .tab-3-content").hide();
    jQuery("#PaymentMode .tab-3-content:first").show();

    

    // Click function
    jQuery("#PaymentMode .ta-nav-3 li").click(function () {
        jQuery("#PaymentMode .ta-nav-3 li").removeClass("active-3");
        jQuery(this).addClass("active-3");
        jQuery(this).prev().addClass("complete");
        jQuery("#PaymentMode .tab-3-content").hide();


        var activeTab = jQuery(this).find("a").attr("href");
        jQuery(activeTab).fadeIn();
        return false;
    });
    var TripsCancelConfirmMessage;
    

    // Click Show and Hide for Passanger Page
    $("#passanger-grid tr ").on("click", function () {
        $(".box-container-blk").show();
    });

  /*  $.ajax({
        url: '/Home/GetTripRequestorLocalization',
        method: 'GET',
        success: function (data) {
            console.log("language translation data", data);

            *//*NameDisplayName = data.NameDisplayName;
            ValidateFields = data.ValidateFields;*//*
            TripsCancelConfirmMessage = data.TripsCancelConfirmMessage
        },
        error: function () {

        }
    });*/

    $(document).on('contextmenu', function (e) {
        e.preventDefault();
    });
    // Latest Style End 18042024 
    // Details hide and show
    $(".search-tab .details ").on("click", function () {
        $(".search-detail-tab").show();
        $(".search-tab").hide();
    });
    $(".search-detail-tab .back ").on("click", function () {
        if (window.globalChange == true) {
            TripsCancelConfirmMessage = sessionStorage.getItem('tripConfirmMessage');
            showConfirmPopup(TripsCancelConfirmMessage);
            $('#confirm-button').click(function () {
                //changes = false;
                window.globalChange = false;
                $(".search-detail-tab").hide();
                if (activeTab == '#main-tab3') {
                    $("#statusBottom").show();
                    $(".search-tab").show();
                }
                else if (activeTab == '#main-tab1') {
                    
                        $("#statusBottom").show();
                       /* $(".search-tab").show();*/
                    jQuery(activeTab).fadeIn();
                }
                else {
                    jQuery(activeTab).fadeIn();
                }
                hideConfirmPopup();
            });
        }
        else {
            console.log(activeTab);
            $(".search-detail-tab").hide();
            if (activeTab == '#main-tab3') {
                $("#statusBottom").show();
                $(".search-tab").show();
            }
            else if (activeTab == '#main-tab1') {

                $("#statusBottom").show();
                /* $(".search-tab").show();*/
                jQuery(activeTab).fadeIn();
            }
            else {
                jQuery(activeTab).fadeIn();
            }        
        }
       /* $(".search-detail-tab").hide();
        if (activeTab == '#main-tab3') {
            $(".search-tab").show();
        }
        else {
            jQuery(activeTab).fadeIn();
        }        */
    });



    // Requestor trip tabs
    jQuery(".trip-tab-content3 li:first-child").addClass("main-active");
    jQuery(".trip-tab-content3").hide();
    jQuery(".trip-tab-content3:first").show();

    // Click function
    jQuery(".trip-tab-content3 li").click(function () {
        jQuery(".trip-tab-content3 li").removeClass("main-active");
        jQuery(this).addClass("main-active");
        jQuery(".trip-tab-content3").hide();


        var activeTab = jQuery(this).find("a").attr("href");
        jQuery(activeTab).fadeIn();
        return false;
    });
    // Latest Style End 18042024 End

    // Menu Active
    var path = window.location.pathname.split("/").pop();
    console.log("current path----->", path);
    if (path == "") {
        path = "/";
    } else {
        path = "/"+path;
    }

    var target = $('ul a[href="' + path + '"]');
    console.log("target----->", target);
    target.addClass("active");
    // Menu Active End
     
    //Auto width of Admin select
    $('.admin-select').change(function () {
        var text = $(this).find('option:selected').text()
        var $aux = $('<select/>').append($('<option/>').text(text))
        $(this).after($aux)
        $(this).width($aux.width())
        $aux.remove()
    }).change()
    
    /*if (access == undefined || access.IsEnabled == false) {
        jQuery("#main-tab1").hide();
        jQuery('#mnuTripValidation')
            .removeAttr('href') // Remove the href attribute
            .addClass('disabled'); 
    }*/
})

