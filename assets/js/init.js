//jQuery code
jQuery(function($) { 

  'use strict';

  // Preloader
  var $preloader = $('#page-preloader'),
      $spinner   = $preloader.find('.spinner');
  $spinner.delay(700).fadeOut();
  $preloader.delay(700).fadeOut('slow');

  $('.gallery-item img').load(function(){
    initMasonry();
  });
  initMasonry();
  initGallery();
  initPopup();
  initScroll();
  initMail();

});

// Gallery
function initMasonry() {
  $('.gallery-grid').masonry({
    itemSelector: '.gallery-item',
    gutter: '.gutter-sizer',
    singleMode: true,
    isResizable: true,
    isAnimated: true,
    animationOptions: { 
      queue: false, 
      duration: 500 
    }
  });
}

function initGallery() {
  $('#gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade-gallery',
    gallery: {
      enabled:true
    }
  });
}

// Notify Popup
function initPopup() {
  $('.notify-popup').magnificPopup({
    type:'inline',
    midClick: true,
    removalDelay: 300,
    mainClass: 'mfp-fade'
  });
}

// Scroll
function initScroll() {
  $('.nano').nanoScroller({
    preventPageScrolling: true
  });
}

// Email Validate
function validateEmail(email) { 
  var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

// Notify Form Validation
function initMail() {
  $("#form-notify").submit(function() { return false; });
  $("#submit").on("click", function(){
    var emailval   = $("#email").val();
    var emailvalid = validateEmail(emailval);
    if(emailvalid == false) {
      $(".form-error-message").addClass("error");
    }
    else if(emailvalid == true){
      $(".form-error-message").removeClass("error");
    }
    if(emailvalid == true) {
      $("#submit").replaceWith("<em>send...</em>");
      $.ajax({
        type: 'POST',
        url: 'send.php',
        data: $("#form-notify").serialize(),
        success: function(data) {
          if(data == "true") {
            $("#form-notify").fadeOut("fast", function(){
              $(this).before("<span class='success'>Message sent</span>");
            });
          }
        }
      });
    }
  });
}