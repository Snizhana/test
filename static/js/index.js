$(document).ready(function(){
    var lettersCount,
        csrftoken = getCookie('csrftoken');

    $("form").submit(sendData);
    function sendData(event){
        event.preventDefault();
        $.ajax({
            url : "api/v1/text/",
            type : "POST",
            data : {
                text : $('#id_initial_text').val(),
                step : $('#id_step').val()

            },
            success : function(response) {
                $('.alert').css('display', 'none');
                var letters, element, i,
                    lettersCount = letterCounter(response['initial_text']),
                    label = 'Letter Occurrence',
                    labels = [];

                for(i=0; i<lettersCount.length; i++){
                    element = String.fromCharCode(i + 97);
                    labels.push(element);
                }

                chart(lettersCount, labels, label);

                $('#id_modified_text').val(response.modified_text);

            },
            error : function(err) {
                $('.alert').css('display', 'block');
                $('#id_initial_text').val('');
                $('#id_step').val('');
            }
        });
    }

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    function sameOrigin(url) {
        var host = document.location.host;
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    /* helper functions */
    function letterCounter(text){
        var index,
        lettersCount = Array.apply(null, Array(26)).map(function(){return 0});
        for(var i=0; i < text.length; i++){
            if (text[i].toLowerCase() != text[i].toUpperCase()){
                index = text[i].toLowerCase().charCodeAt() - 97;
                lettersCount[index] += 1;
            }
        }
        return lettersCount;
    }
    /* helper functions */

    function chart(data, labels, label){
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

});


