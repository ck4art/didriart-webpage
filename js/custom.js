
  (function ($) {
  
  "use strict";

    // AOS ANIMATIONS
    AOS.init();

    // NAVBAR
    $('.navbar-nav .nav-link').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    // NEWS IMAGE RESIZE
    function NewsImageResize(){
      $(".navbar").scrollspy({ offset: -76 });
      
      var LargeImage = $('.large-news-image').height();

      var MinusHeight = LargeImage - 6;

      $('.news-two-column').css({'height' : (MinusHeight - LargeImage / 2) + 'px'});
    }

    $(window).on("resize", NewsImageResize);
    $(document).on("ready", NewsImageResize);

    $('a[href*="#"]').click(function (event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 66
          }, 1000);
        }
      }
    });
    
  })(window.jQuery);

  
function timeSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 3600;
  if (interval > 24) return Math.floor(interval / 24) + " days ago";
  if (interval >= 1) return Math.floor(interval) + " hours ago";
  return Math.floor(seconds / 60) + " minutes ago";
}

// Example usage: Automatically update the timestamp
document.addEventListener("DOMContentLoaded", function () {
  const timestampElement = document.getElementById("timestamp");
  if (timestampElement) {
    const postDate = timestampElement.getAttribute("data-post-date");
    timestampElement.innerText = timeSince(postDate);
  }
});
