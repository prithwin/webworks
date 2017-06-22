var focusdiv;
window.onkeypress = function (event) {
    console.log(event);
    if (event.keyCode == 13) {
        console.log('you pressed enter');
        //$(':focus').css('background-color', 'red');
        var text = $(':focus').text();
        text = text.substring(0, text.length);
        $(':focus').text(text);
        var newDiv = $("<div class=\"codeLine\" contenteditable=\"true\" onfocus=\"focusdiv=this;\"></div>");
        $(':focus').after(newDiv);
        newDiv.focus();
        return false;
    } 
}

window.onkeydown = function (event) {
    console.log(event);
    $('#suggest').css('display', 'none');
    if (event.keyCode == 38) {
        console.log('up pressed');
        $(':focus').prev().focus();
    } else if (event.keyCode == 40) {
        console.log('up pressed');
        $(':focus').next().focus();
    } else if (event.keyCode == 32 && event.ctrlKey) {
        console.log("control+space entered");
        suggest();
    }
}

$('#suggest select').change(function () {
    console.log(this.value);
    var text = focusdiv.innerText;
    focusdiv.innerText = text + this.value;
    $('#suggest').css('display', 'none');
    focusdiv.focus();
}
);


function suggest() {
    $('#suggest select').empty();
    var delayMillis = 1000; //1 second

    setTimeout(function () {
        //your code to be executed after 1 second
    }, delayMillis);
   
    var text = $(':focus').text();
    var pops = window.getSelection().getRangeAt(0).startOffset;
    var startToHere = text.substring(0, pops - 1);
    var fontsize = $(':focus').css('font-size');
    var lastWord = startToHere.substring(startToHere.lastIndexOf(' ') + 1, pops);
    if (lastWord == '') {
        return;
    }
    
    console.log(pops);
    console.log("http://localhost:8080/pronet/api/util/suffix/" + lastWord);
    $.ajax({
        url: "http://localhost:8080/pronet/api/util/suffix/" + lastWord, success: function (result) {
            console.log(result);
            $.each(result, function (i, item) {
                $('#suggest select').append($('<option>', {
                    value: item,
                    text: item
                }));
            });
            var position = $(':focus').position();
            $('#suggest').css('display', 'block');
            $('#suggest').css('margin-top', position.top+($(':focus').height()));
            $('#suggest').css('margin-left', position.left + (9 * pops));
        }
    });
   
}

