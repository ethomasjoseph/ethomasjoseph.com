// Navigation Module
var tjs = window.tjs || {};

// self initializing function
tjs.Navigation = (function(context, $) {
    var _init,
    _handlePageScroll,
    _handleHashChange;

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


    _handleHashChange = function() {
        // handles window's hash due to fixed navigation
        var shiftWindow = function() {
            scrollBy(0, -80)
        };
        context.addEventListener('hashchange', shiftWindow);
        if (context.location.hash) {
            shiftWindow();
        }
    };

    _init = function() {
        _handlePageScroll();
        _handleHashChange();
    };

    _init();
}(window, jQuery));
