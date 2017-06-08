function init() {
    
    
    $("#brand_select").on('change', function() {            
        if ($(this).val() != ""){
            window.location = "/stores/"+ $(this).val();    
        }
    });  
    
    var _fbq = window._fbq || (window._fbq = []);
    if (!_fbq.loaded) {
        var fbds = document.createElement('script');
        fbds.async = true;
        fbds.src = '//connect.facebook.net/en_US/fbds.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(fbds, s);
        _fbq.loaded = true;
      }
    _fbq.push(['addPixelId', '548352815262916']);
    window._fbq = window._fbq || [];
    window._fbq.push(['track', 'PixelInitialized', {}]);
    
    $(".long_feature_box").hover(function() {
        $(this).find(".long_feature_label").animate({
            "top": "-=81%"
        }, 500)
    }, function() {
        $(this).find(".long_feature_label").animate({
            "top": "+=81%"
        }, 500)
    });
    
    //Campaign Monitor Sign Up
    $('#popupForm').submit(function (e) {
        if ($("#agree").prop("checked") != true){
            alert("Please agree to the term and conditions.");
            $("#agree").focus();
            return false;
        }
        e.preventDefault();
        $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function (data) {
                if (data.Status === 400) {
                    alert("Please try again later.");
                } else { // 200
                    $('#popupForm').trigger('reset');
                    $("#success").fadeIn();
                    
                    setTimeout(function(){ 
                        $(".modal-backdrop").remove();
	                    $(".popup_home").remove();
                    }, 2000);
                }
            });
    });
    
    //Campaign Monitor Sign Up
    $('#subForm').submit(function (e) {
        if ($("#agree_terms").prop("checked") != true){
            alert("Please agree to the term and conditions.");
            $("#agree_terms").focus();
            return false;
        }
        e.preventDefault();
        $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function (data) {
                if (data.Status === 400) {
                    alert("Please try again later.");
                } else { // 200
                    $('#subForm').trigger('reset');
                    $("#success_subscribe").fadeIn();
                }
            });
    });

    function submitToMailChimp(){
        $("#mce-EMAIL").val($('#fieldEmail').val())
        $.ajax({
            type: $("#mc-embedded-subscribe-form").attr('method'),
            url: $("#mc-embedded-subscribe-form").attr('action'),
            data: $("#mc-embedded-subscribe-form").serialize(),
            cache       : false,
            dataType    : 'json',
            contentType: "application/json; charset=utf-8",
            error       : function(err) { alert("Could not connect to the registration server. Please try again later.") },
            success     : function(data) {
           
                if (data.result != "success") {
                    $("#success_subscribe").fadeIn();
                } else {
                    $("#success_subscribe").fadeIn();
                    $(".modal-backdrop").remove();
	                $(".popup_home").remove();
                }
            }
        })
    }
}

function show_content(){
    $(".yield").css({visibility: "visible"});
    $(".modal-backdrop").remove();
    
    var header_stores = getStoresList();
    renderStoreList('#brand_select','#brand_select_template', header_stores, "stores");
    $("#brand_select").prepend("<option selected>Brands</option>");
    
    renderHomeHours();
    
    var prop_details = getPropertyDetails();
    renderPropertyDetails('#prop_phone_container', '#prop_phone_template', prop_details);
    
    var feature_items = getFeatureList();
    var one_item = feature_items.slice(0,1);
    renderFeatureItems('#feature_item','#feature_item_template', one_item);
    var two_items = feature_items.slice(1,3);
    renderFeatureItems('#home_feature','#home_feature_template', two_items);
}
