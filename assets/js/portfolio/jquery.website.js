(function ($, window, document, undefined) {

    "use strict";

    // ie8
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(obj, start) {
             for (var i = (start || 0), j = this.length; i < j; i++) {
                 if (this[i] === obj) { return i; }
             }
             return -1;
        };
    }

    var demos = ['juicy-projects', 'lightbox-gallery', 'meet-the-team', 'full-screen', 'masonry', 'blog-posts'],
        url = document.URL.split('#')[0],
        query = url.split('?q=')[1];

    query = ( demos.indexOf(query) !== -1 )? query : 'juicy-projects';

    // remove class active
    $('.wb-nav').find('a').removeClass('active');

    // find the right element to add class active
    $('.wb-nav-' + query).addClass('active');

    $('.helpMode').helpMode({
        // show the elements when the plugin initialization have been triggered
        showDefault: true,

        // delay before showing the plugin
        delayShow: 500,

        // delay before hiding the plugin
        delayHide: 0,

        // change the direction of animation by mouse position
        followCursor: false
    });

    // confy init
    $.confy.init({
        itemCls: '.cfy-item',

        startOpen: true,

        callback: function (options) {

            $('#grid-container').cubeportfolio('destroy', function () {

                $('#grid-container').cubeportfolio('init', options);

                $('#filters-container').find('.cbp-filter-item').removeClass('cbp-filter-item-active').eq(0).addClass('cbp-filter-item-active');

                $('.cbp-l-filters-dropdownHeader').text('Sort Gallery');

                $('#grid-container').cubeportfolio('showCounter', $('#filters-container').find('.cbp-filter-item'));

            });

        },

        loadingStart: function () {
            $('.cfy-wrap').addClass('cfy-wrap-loading');
        },

        loadingEnd: function () {
            $('.cfy-wrap').removeClass('cfy-wrap-loading');
        },

        dependencies: function (options) {
            if (options.displayType == 'default') {
                $('input[data-option="displayTypeSpeed"]').closest('.cfy-section').slideUp();
                $('.helpMode').helpMode('show');
                $('.dependeciesTypeSpeed').helpMode('hide');
            } else {
                $('input[data-option="displayTypeSpeed"]').closest('.cfy-section').slideDown();
                $('.helpMode').helpMode('show');
            }
        },

        hide: function () {
            $('.helpMode').helpMode('hide');
        },

        show: function () {
            $('.helpMode').helpMode('show');
        },
        
        // get settings from cubeportfolio
        settings: $.extend({}, $.data(document.getElementById('grid-container'), 'cubeportfolio').options)
    });


    $(document).on('scroll.wb', function(event) {
        event.preventDefault();
        
        $('.cfy-wrap').height( $('body').height() );

    });

})(jQuery, window, document);