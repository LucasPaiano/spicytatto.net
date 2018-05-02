( function( $ ) {
    "use strict";

    var THE_TATTOOIST = window.THE_TATTOOIST || {};

    /*-------------------------------------------------------------------*/
    /*      Forms
    /*          1. Email Validator Function
    /*          2. Form Processor
    /*          3. Close Form Message
    /*-------------------------------------------------------------------*/

    THE_TATTOOIST.forms = function(){

        /* 1. Email validator
        /*-------------------------------------------------------------------*/
        var emailValidator = function(email){

            var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            var valid = emailReg.test(email);

            return valid;
        };

        /* 2. Form Processor
        -------------------------------------------------------------------*/
        // Add form message container
        $('form').append('<div class="form-msg" style="display:none"><span></span><i class="fa fa-times close-form-msg" aria-hidden="true"></i><a href="#"></a></div>');

        $('form').submit(function(e){
            e.preventDefault();

            var formMessages;

            //adjust the result message lenguage
            if($('.language').attr('id') === "english"){
                formMessages  = config.formMessagesSpanish;
            } else if ($('.language').attr('id') === "spanish") {
                formMessages  = config.formMessagesEnglish;
            }


            var $that           = $(this),
                checkEmpty      = false,
                $msgForm        = $that.find('.form-msg'),
                $msgText        = $msgForm.find('span'),
                emailField      = $that.find('input[name="email"]').val(),
                postData        = $that.serialize();

            $msgForm.removeClass('fail success');
            $msgText.text('');

            // Check if all fields are not empty
            $that.find('.required').each(function() {
                if($.trim($(this).val()) === '' || $(this).is(':checkbox:not(:checked)') ) {
                    checkEmpty = true;
                }
            });

            // Stop all if there is at least one empty field
            if ( checkEmpty ) {
                $msgText.text(formMessages.emptyFields).parent().addClass('fail').fadeIn('fast');
                return false;
            }

            // Check if the email is valid. Otherwise stop all
            if ( ! emailValidator(emailField) ) {
                $msgText.text(formMessages.failEmail).parent().addClass('fail').fadeIn('fast');
                return false;
            }

            $that.find('.submit').after('<span class="form-loader" />');

            // Send data to the corresponding processing file
            $.post($that.attr('action'), postData, function(result){
                if (result == 'success') {
                    $msgText.text(formMessages.sent);               // success
                    $that.trigger('reset');                         // reset all form fields
                } else {
                    $msgText.text(formMessages.fail);               // fail
                }
            }).fail(function() {
                $msgText.text(formMessages.fail);                   // fail (problem with sending data)
            }).always(function(result) {
                $that.find('.form-loader').remove();
                $msgForm.addClass(result).fadeIn('fast');           // show form message
            });

        });

        /* 3. Close form messages
        -------------------------------------------------------------------*/
        $(document).on('click','.close-form-msg', function(){

            $(this).parent().fadeOut();

            // if ( $('.form-msg').hasClass('success') ) {
            //     $.magnificPopup.close();
            // }

            return false;
        });

    },




    /*-------------------------------------------------------------------*/
    /*      Initialize
    /*-------------------------------------------------------------------*/


    $(document).ready(function(){

        THE_TATTOOIST.forms();

    });



} )( jQuery );
