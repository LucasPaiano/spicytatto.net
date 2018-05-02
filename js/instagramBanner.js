( function( $ ) {
    "use strict";

    var THE_TATTOOIST = window.THE_TATTOOIST || {};

    /*-------------------------------------------------------------------*/
    /*      Instragram Banner
    /*-------------------------------------------------------------------*/

    THE_TATTOOIST.instagram = {

        globalObjs : {
            instagramBar : $('.instagram-bar'),
            cacheResult : [],
        },

        init : function(){

            if ( this.globalObjs.instagramBar.hasClass('feed-bg') ) {
                this.getPicsUrls();
            }

        },

        // create pics
        getPics : function(cachedUrls){

            var objs = this.globalObjs;

            objs.instagramBar.prepend('<span class="pics-container"></span>');

            var $picsContainer      = objs.instagramBar.find('.pics-container'),
                instagramBarWidth   = objs.instagramBar.outerWidth(),
                picsWidth           = objs.instagramBar.outerHeight(),
                picsNumber          = parseInt( instagramBarWidth / picsWidth );

            if ( instagramBarWidth % picsWidth > 0 ) {
                picsNumber++;
            }

            $picsContainer.css('width', instagramBarWidth * picsNumber).empty();

            $.each(cachedUrls, function(key,value) {
                if ( key < picsNumber ){
                    $picsContainer.append('<img src="' + value + '" alt="">');
                }
            });

            $picsContainer.imagesLoaded(function() {
                $picsContainer.fadeIn();
            });

        },

        // get all url via ajax and create pics
        getPicsUrls : function(){

            var self = this,
                objs = self.globalObjs;

            $.getJSON('instagram/instagram.php', function(result){
                // get and cache all urls
                objs.cacheResult = result;
                // create pics
                self.getPics(objs.cacheResult);
            }, 'json');

        },

        // delay function
        delayFunction : (function(){

            var timer = 0;
            return function(callback, ms){
                    clearTimeout (timer);
                    timer = setTimeout(callback, ms);
                };

        })(),

        // reload pics
        reload : function(){

            var self = this;

            $('.pics-container').fadeOut('400', function(){
                $(this).remove();
            });

            self.delayFunction(function(){
                self.getPics(self.globalObjs.cacheResult);
            }, 1000);

        }

    },
    /*-------------------------------------------------------------------*/
    /*      Initialize all functions
    /*-------------------------------------------------------------------*/


    // window load scripts
    $(window).load(function() {

        THE_TATTOOIST.instagram.init();

    });

    // window resize scripts
    $(window).resize(function() {

        // detect if it's a mobile device
        if (!(/Mobi/.test(navigator.userAgent))) {
            THE_TATTOOIST.instagram.reload();
        }
    });

    // window orientationchange scripts
    $(window).on('orientationchange', function(event){
        THE_TATTOOIST.instagram.reload();
    });


} )( jQuery );
