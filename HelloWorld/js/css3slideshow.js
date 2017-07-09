var largeImages = $('.img_real');
largeImages[0].style.display = 'block';
largeImages[0].style.visibility = 'visible';
$(".img_preview").click(function() {
    $('.img_real').css("display","none");
    $('.img_real').css("visibility","hidden");
    i = 0;
    j = -1;
    var parent = this.parentNode;
    while(parent.childNodes[i] != this) {
        i++;
        if(parent.childNodes[i].tagName == 'IMG') j++;
    }
    var largeImages = $('.img_real');
    largeImages[j].style.display = 'block';
    largeImages[j].style.visibility = 'visible';

});

$(".img_real").mouseover(function() {
    $('#darkbg').css('display','block');
    $('#darkbg').css('display','block');

});

$(".img_real").mouseout(function() {
    $('#darkbg').css('display','none');
});