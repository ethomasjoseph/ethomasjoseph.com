// Navigation Module
var tjs = window.tjs || {};

// self initializing function
tjs.Navigation = (function(context, $) {
    var _init,
    _handlePageScroll;

    _handlePageScroll = function() {
        // register the scroll function only if it is initially hidden.
        if (  $('#navbarBrand').hasClass( 'hidden-md-up' ) ) {
            $(document).on('scroll', function() {
                if ($(document).scrollTop() > 50) {
                    $('#navbarBrand').addClass('mr-auto').removeClass('hidden-md-up');
                    $('#stickyDesktopNavLinks').removeClass('mx-auto');
                } else {
                    $('#navbarBrand').addClass('hidden-md-up');
                    $('#stickyDesktopNavLinks').addClass('mx-auto');
                }
            });
        }
    };

    _init = function() {
        _handlePageScroll();
    };

    _init();
}(window, jQuery));
