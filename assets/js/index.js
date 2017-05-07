/*globals jQuery, document */

// Dropdown Menus
function initDropdowns(allDropdowns) {
    allDropdowns.children('.gh-drop-trigger').on('click', function (e) {
        e.stopPropagation();

        var thisTrigger = $(this),
        thisDropdown = thisTrigger.parent();

        if (thisDropdown.hasClass('active')) {
            thisDropdown.removeClass('active');
            $(document).off('click');
        } else {
            allDropdowns.removeClass('active');
            thisDropdown.addClass('active');
            $(document).on('click', function () {
                allDropdowns.removeClass('active');
            });
        }
    });
}

(function ($) {
    'use strict';

    // When all content is loaded, resize dem images
    $(window).load(function () {
        function casperFullImg() {
            $('img').each(function () {
                var contentWidth = $('.post-content').outerWidth(), // Width of the content
                    imageWidth = $(this)[0].naturalWidth; // Original image resolution

                if (imageWidth >= contentWidth) {
                    $(this).addClass('full-img');
                } else {
                    $(this).removeClass('full-img');
                }
            });
        };

        casperFullImg();
        $(window).smartresize(casperFullImg);
    });
}(jQuery));

(function ($,sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var self = this, args = arguments;
            function delayed() {
                if (!execAsap) {
                    func.apply(self, args);
                }
                timeout = null;
            };

            if (timeout) {
                clearTimeout(timeout);
            } else if (execAsap) {
                func.apply(self, args);
            }

            timeout = setTimeout(delayed, threshold || 100);
        };
    }
    // smartresize
    jQuery.fn[sr] = function (fn) {return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);};
})(jQuery,'smartresize');
