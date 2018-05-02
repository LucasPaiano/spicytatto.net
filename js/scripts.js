/*------ NAVBAR ------*/
$(function() {
   $('a.page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
         scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
   });
});
$('body').scrollspy({
   target: '.navbar-fixed-top'
});
$('.navbar-collapse ul li a').click(function() {
   $('.navbar-toggle:visible').click();
});
/*------ /NAVBAR ------*/
/*------ LOADER ------*/
var loader = function(){
    $("#loaderSection").fadeOut(800, function(){
        $(this).remove();
        $(".navbar").fadeIn();
        // $("#mainLogo").fadeIn();
    });
};
/*------ /LOADER ------*/

/*------ SAFARI DETECTOR ------*/// TODO: borrar?
var safariDetector = function(){
   var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
                   navigator.userAgent && !navigator.userAgent.match('CriOS');

   if(isSafari){
    }

};
/*------ /SAFARI DETECTOR ------*/
/*------ VENOBOX - pop-up image responsive ------*/
$('.venobox').venobox();
/*------ /VENOBOX - pop-up image responsive ------*/
/*------ GRID PHOTOS ------*/
$('.grid').each(function(){
    var $grid = $(this),
        $item = $grid.children('.grid-item'),
        $itemWide = $grid.children('.grid-item.wide'),
        $itemTall = $grid.children('.grid-item.tall'),
        $cols = $grid.data('columns'),
        $cols = $cols != undefined ? $cols : 3,
        $gutter = $grid.data('gutter'),
        $gutter = $gutter != undefined ? $gutter / 2 : 0;

    // spaces between items
    $grid.wrap("<div class='grid-wrapper' />");
    $grid.css({
        'margin-left': -$gutter+'px',
        'margin-right': -$gutter+'px'
    });
    $item.wrapInner("<div class='grid-item-inner' />");
    $grid.find('.grid-item-inner').css({
        'position': 'absolute',
        'top': $gutter,
        'bottom': $gutter,
        'left': $gutter,
        'right': $gutter,
    });

    function itemSizes(){
        $item.width( $grid.width() / $cols );
        $item.height( $item.width() * 4/5 );
        $itemTall.height( $item.width() * 8/5 );
        $itemWide.width( $grid.width() / $cols * 2);
    }
    itemSizes();

    $grid.isotope({
        itemSelector: '.grid-item',
        masonry: { columnWidth: $grid.width() / $cols }
    });

    // Update Grid On Resize
    $(window).resize(function(){
        itemSizes();
        $grid.isotope({
            masonry: { columnWidth: $grid.width() / $cols }
        });
    }).resize();

});
/*------ /GRID PHOTOS ------*/
/*------ LOADER ------*/
var loader = function(){
    $("#loaderSection").fadeOut(800, function(){
        $(this).remove();
        $(".navbar").fadeIn();
    });
};
/*------ /LOADER ------*/
/*------ /LENGUAGE SELECTION ------*/

var setLenguage = function(){
    localStorage.setItem('lenguage', currentLenguage);
};

var setSpanish = function(){
    $(".language").attr({
        src:'./img/misc/engFlag.ico',
        alt:'bandera de Inglaterra',
        id:'english'
    });
    $(".english").addClass("hidden");
    $(".spanish").removeClass("hidden");

    $(".submit").val('ENVIAR');

    currentLenguage = "spanish";
    setLenguage();
};

var setEnglish = function(){
    $(".language").attr({
        src:'./img/misc/spaFlag.png',
        alt:'bandera de España',
        id:'spanish'
    });
    $(".spanish").addClass("hidden");
    $(".english").removeClass("hidden");

    $(".submit").val('SEND');

    currentLenguage = "english";
    setLenguage();
};

var currentLenguage;

var checkLanguage = function(){

    currentLenguage = localStorage.getItem('lenguage');

    if (currentLenguage === null) {
      currentLenguage = "spanish";
      setLenguage();
    }

    if(currentLenguage === "spanish"){
      setSpanish();
    } else if (currentLenguage === "english") {
      setEnglish();
    }
};

var changeLeng = function(){ //switches between languages

    if (this.id === "english") {
      setEnglish();
    } else {
        setSpanish();
    }
};
/*------ /LENGUAGE SELECTION ------*/

$(document).ready(function () {

    // safariDetector();

    checkLanguage();

    setTimeout(loader,4000);// TODO: 4000

    $(".language").on("click",changeLeng);

    // show banner at scrolling
    $(window).scroll(function() {
    if ($(this).scrollTop()>300)
     {
        $('#banner').fadeIn();
     }
    else
     {
      $('#banner').fadeOut();
     }
    });

    //grid photos
    $('.masonry').each(function () {
        var $this = $(this);
        $this.imagesLoaded(function () {
            $this.isotope({
                itemSelector: '.masonry-item'
            });
        });
    });

    //team carousel
    $('.team-member-carousel').owlCarousel({
        loop:true,
        margin:15,
        nav:true,
        autoplay:true,
        dots:false,
        smartSpeed:3000,
        navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });
    //salon slider


});
