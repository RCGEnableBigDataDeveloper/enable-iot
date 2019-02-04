// SC: this outer function is not required
/* Required by _wid_county_clinical.html and _wid_county_health.html */
/* Include:
  block js_page_plugins -->
    <!--<script src="{#% static 'healthcare/js/rcg/county_data.js' %}"></script>
  endblock */

// This function gets cookie with a given name
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

/*
The functions below will create a header with csrftoken
*/
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
            // Send the token to same-origin, relative URLs only.
            // Send the token only if the method warrants CSRF protection
            // Using the CSRFToken value acquired earlier
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


// Have not yet built this function for ajax loading of county data
$('#county_data-form').on('submit', function(event){
    // console.log("form submitted!");  // sanity check
    // console.log("state: " + $('#id_state').val() + " county: " + $county);
    // alert("form submitted!");
    // event.preventDefault();
});

// Submit post on submit
$('#id_state').change(function(){
    // console.log("state: " + this.value);
    get_counties();
});

if ($state) {
    // console.log("state: " + $state + " county: " + $county);
    $('#id_state').val($state);
    get_counties();
    // $('#id_county').val($county); // moved into get_counties (asynch)
}

// AJAX for posting
function get_counties() {
	
	alert();
    // console.log($('#id_state').val())
    $.ajax({
        url : "/county_lookup/", // the endpoint
        type : "POST", // http method
        data : { 'state' : $('#id_state').val() }, // data sent with the post request
        dataType: 'json',
        success : function(json) {
            var $el = $("#id_county");
            $el.empty(); // remove old options
            $el.append($("<option></option>")
                    .attr("value", '').text('Please Select'));
            $.each(json, function(value, key) {
                // console.log('key: ' + key + ' value: ' + value)
                $el.append($("<option></option>")
                        .attr("value", key).text(key));
            });
            if ($county) {
                $('#id_county').val($county);
            }
        },
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });

};
