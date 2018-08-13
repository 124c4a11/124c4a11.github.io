var app =
webpackJsonp_name_([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                 ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                    return (val >= 0) && (val < _.slideCount);
                });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                   var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                   if ($('#' + ariaButtonControl).length) {
                     $(this).attr({
                         'aria-describedby': ariaButtonControl
                     });
                   }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
          if (_.options.focusOnChange) {
            _.$slides.eq(i).attr({'tabindex': '0'});
          } else {
            _.$slides.eq(i).removeAttr('tabindex');
          }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                    .removeClass('slick-active')
                    .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));


/*** EXPORTS FROM exports-loader ***/
module.exports = $.fn.slick;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _Preloader = __webpack_require__(6);

var _Preloader2 = _interopRequireDefault(_Preloader);

var _PageHeader = __webpack_require__(26);

var _PageHeader2 = _interopRequireDefault(_PageHeader);

var _Fancy = __webpack_require__(27);

var _Fancy2 = _interopRequireDefault(_Fancy);

var _ContactMenu = __webpack_require__(29);

var _ContactMenu2 = _interopRequireDefault(_ContactMenu);

var _Menu = __webpack_require__(30);

var _Menu2 = _interopRequireDefault(_Menu);

var _Projects = __webpack_require__(31);

var _Projects2 = _interopRequireDefault(_Projects);

var _Team = __webpack_require__(32);

var _Team2 = _interopRequireDefault(_Team);

var _Brands = __webpack_require__(33);

var _Brands2 = _interopRequireDefault(_Brands);

var _FileUpload = __webpack_require__(34);

var _FileUpload2 = _interopRequireDefault(_FileUpload);

var _Tabs = __webpack_require__(35);

var _Tabs2 = _interopRequireDefault(_Tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {
  _Fancy2.default.init();

  if ($('.page-header').length) _PageHeader2.default.init();

  if ($('.contact-menu').length) _ContactMenu2.default.init();

  if ($('.menu').length) _Menu2.default.init();

  if ($('.projects__list').length) _Projects2.default.init();

  if ($('.team').length) _Team2.default.init();

  if ($('.brands').length) _Brands2.default.init();

  if ($('.file-upload__inputfile').length) _FileUpload2.default.init();

  if ($('.tabs').length) _Tabs2.default.init();
});

$(window).on('load', function () {
  if ($('.preloader').length) _Preloader2.default.init();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageHeader = function () {
  function PageHeader() {
    var _this = this;

    (0, _classCallCheck3.default)(this, PageHeader);

    this._scrollHandler = function () {
      var currentTop = $(document).scrollTop();
      _this._autoHideHeader(currentTop);
      _this.prevTop = currentTop;
    };

    this._windowResize = function () {
      if (_this.$container.hasClass('page-header_fixed')) {
        setTimeout(function () {
          _this.fixedContainerHeight = Math.round(_this.$container.innerHeight());
          _this.$container.css('top', -_this.fixedContainerHeight);
        }, 100);
      }
    };

    this.$container = $('.page-header');
    this.containerStartHeight = this.$container.innerHeight();
    this.containerIsFixed = false;
    this.fixedContainerHeight = 0;
    this.prevTop = 0;
  }

  (0, _createClass3.default)(PageHeader, [{
    key: '_autoHideHeader',
    value: function _autoHideHeader(currentTop) {
      var diff = this.prevTop - currentTop;

      // scrollTop < containerHeight
      // remove container fixed
      if (currentTop < this.containerStartHeight) {
        if (this.containerIsFixed) {
          this.$container.removeClass('page-header_fixed page-header_fixed-visible');
          this.containerIsFixed = false;
          this.$container.css('top', '');
        }
        return;
      }

      if (diff < 0) {
        // scrolling down
        // add container fixed
        if (!this.containerIsFixed) {
          this.$container.addClass('page-header_fixed');
          this.containerIsFixed = true;
        }

        if (this.containerIsFixed) {
          if (this.fixedContainerHeight === 0) {
            this.fixedContainerHeight = Math.round(this.$container.innerHeight());
          }

          this.$container.css('top', -this.fixedContainerHeight);
        }

        if (this.$container.hasClass('page-header_fixed-visible')) {
          this.$container.removeClass('page-header_fixed-visible');
        }
      }

      // srolling up
      if (diff > 0) this.$container.addClass('page-header_fixed-visible');
    }
  }, {
    key: 'init',
    value: function init() {
      $(window).on('scroll', this._scrollHandler);
      $(window).on('resize', this._windowResize);
    }
  }]);
  return PageHeader;
}();

exports.default = new PageHeader();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _fancybox = __webpack_require__(28);

var _fancybox2 = _interopRequireDefault(_fancybox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fancy = function () {
  function Fancy() {
    (0, _classCallCheck3.default)(this, Fancy);
  }

  (0, _createClass3.default)(Fancy, [{
    key: 'init',
    value: function init() {
      $().fancybox({
        selector: '[data-fancybox]',
        loop: true,
        buttons: ["zoom", "slideShow", "fullScreen", "thumbs", "close"],
        lang: "ru",
        i18n: {
          ru: {
            CLOSE: "Закрыть",
            NEXT: "Следующее изображение",
            PREV: "Предыдущее изображение",
            ERROR: "Запрошенный контент не может быть загружен. <br/> Повторите попытку позже.",
            PLAY_START: "Запустить слайд-шоу",
            PLAY_STOP: "Слайд-шоу на паузу",
            FULL_SCREEN: "Во весь экран",
            THUMBS: "Миниатюры",
            DOWNLOAD: "Загрузить",
            SHARE: "Поделиться",
            ZOOM: "Увеличить"
          }
        },
        afterShow: function afterShow() {
          $('[data-fancybox-close]').focus();
        }
      });
    }
  }]);
  return Fancy;
}();

exports.default = new Fancy();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery, jQuery) {// ==================================================
// fancyBox v3.3.5
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2018 fancyApps
//
// ==================================================
(function(window, document, $, undefined) {
  "use strict";

  window.console = window.console || {
    info: function(stuff) {}
  };

  // If there's no jQuery, fancyBox can't work
  // =========================================

  if (!$) {
    return;
  }

  // Check if fancyBox is already initialized
  // ========================================

  if ($.fn.fancybox) {
    console.info("fancyBox already initialized");

    return;
  }

  // Private default settings
  // ========================

  var defaults = {
    // Enable infinite gallery navigation
    loop: false,

    // Horizontal space between slides
    gutter: 50,

    // Enable keyboard navigation
    keyboard: true,

    // Should display navigation arrows at the screen edges
    arrows: true,

    // Should display counter at the top left corner
    infobar: true,

    // Should display close button (using `btnTpl.smallBtn` template) over the content
    // Can be true, false, "auto"
    // If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
    smallBtn: "auto",

    // Should display toolbar (buttons at the top)
    // Can be true, false, "auto"
    // If "auto" - will be automatically hidden if "smallBtn" is enabled
    toolbar: "auto",

    // What buttons should appear in the top right corner.
    // Buttons will be created using templates from `btnTpl` option
    // and they will be placed into toolbar (class="fancybox-toolbar"` element)
    buttons: [
      "zoom",
      //"share",
      //"slideShow",
      //"fullScreen",
      //"download",
      "thumbs",
      "close"
    ],

    // Detect "idle" time in seconds
    idleTime: 3,

    // Disable right-click and use simple image protection for images
    protect: false,

    // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
    modal: false,

    image: {
      // Wait for images to load before displaying
      //   true  - wait for image to load and then display;
      //   false - display thumbnail and load the full-sized image over top,
      //           requires predefined image dimensions (`data-width` and `data-height` attributes)
      preload: false
    },

    ajax: {
      // Object containing settings for ajax request
      settings: {
        // This helps to indicate that request comes from the modal
        // Feel free to change naming
        data: {
          fancybox: true
        }
      }
    },

    iframe: {
      // Iframe template
      tpl:
        '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',

      // Preload iframe before displaying it
      // This allows to calculate iframe content width and height
      // (note: Due to "Same Origin Policy", you can't get cross domain data).
      preload: true,

      // Custom CSS styling for iframe wrapping element
      // You can use this to set custom iframe dimensions
      css: {},

      // Iframe tag attributes
      attr: {
        scrolling: "auto"
      }
    },

    // Default content type if cannot be detected automatically
    defaultType: "image",

    // Open/close animation type
    // Possible values:
    //   false            - disable
    //   "zoom"           - zoom images from/to thumbnail
    //   "fade"
    //   "zoom-in-out"
    //
    animationEffect: "zoom",

    // Duration in ms for open/close animation
    animationDuration: 366,

    // Should image change opacity while zooming
    // If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
    zoomOpacity: "auto",

    // Transition effect between slides
    //
    // Possible values:
    //   false            - disable
    //   "fade'
    //   "slide'
    //   "circular'
    //   "tube'
    //   "zoom-in-out'
    //   "rotate'
    //
    transitionEffect: "fade",

    // Duration in ms for transition animation
    transitionDuration: 366,

    // Custom CSS class for slide element
    slideClass: "",

    // Custom CSS class for layout
    baseClass: "",

    // Base template for layout
    baseTpl:
      '<div class="fancybox-container" role="dialog" tabindex="-1">' +
      '<div class="fancybox-bg"></div>' +
      '<div class="fancybox-inner">' +
      '<div class="fancybox-infobar">' +
      "<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>" +
      "</div>" +
      '<div class="fancybox-toolbar">{{buttons}}</div>' +
      '<div class="fancybox-navigation">{{arrows}}</div>' +
      '<div class="fancybox-stage"></div>' +
      '<div class="fancybox-caption"></div>' +
      "</div>" +
      "</div>",

    // Loading indicator template
    spinnerTpl: '<div class="fancybox-loading"></div>',

    // Error message template
    errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',

    btnTpl: {
      download:
        '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M13,16 L20,23 L27,16 M20,7 L20,23 M10,24 L10,28 L30,28 L30,24" />' +
        "</svg>" +
        "</a>",

      zoom:
        '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M18,17 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M24,22 L31,29" />' +
        "</svg>" +
        "</button>",

      close:
        '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M10,10 L30,30 M30,10 L10,30" />' +
        "</svg>" +
        "</button>",

      // This small close button will be appended to your html/inline/ajax content by default,
      // if "smallBtn" option is not set to false
      smallBtn:
        '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"><svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg></button>',

      // Arrows
      arrowLeft:
        '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M18,12 L10,20 L18,28 M10,20 L30,20"></path>' +
        "</svg>" +
        "</a>",

      arrowRight:
        '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M10,20 L30,20 M22,12 L30,20 L22,28"></path>' +
        "</svg>" +
        "</a>"
    },

    // Container is injected into this element
    parentEl: "body",

    // Focus handling
    // ==============

    // Try to focus on the first focusable element after opening
    autoFocus: false,

    // Put focus back to active element after closing
    backFocus: true,

    // Do not let user to focus on element outside modal content
    trapFocus: true,

    // Module specific options
    // =======================

    fullScreen: {
      autoStart: false
    },

    // Set `touch: false` to disable dragging/swiping
    touch: {
      vertical: true, // Allow to drag content vertically
      momentum: true // Continue movement after releasing mouse/touch when panning
    },

    // Hash value when initializing manually,
    // set `false` to disable hash change
    hash: null,

    // Customize or add new media types
    // Example:
    /*
        media : {
            youtube : {
                params : {
                    autoplay : 0
                }
            }
        }
        */
    media: {},

    slideShow: {
      autoStart: false,
      speed: 4000
    },

    thumbs: {
      autoStart: false, // Display thumbnails on opening
      hideOnClose: true, // Hide thumbnail grid when closing animation starts
      parentEl: ".fancybox-container", // Container is injected into this element
      axis: "y" // Vertical (y) or horizontal (x) scrolling
    },

    // Use mousewheel to navigate gallery
    // If 'auto' - enabled for images only
    wheel: "auto",

    // Callbacks
    //==========

    // See Documentation/API/Events for more information
    // Example:
    /*
		afterShow: function( instance, current ) {
			console.info( 'Clicked element:' );
			console.info( current.opts.$orig );
		}
	*/

    onInit: $.noop, // When instance has been initialized

    beforeLoad: $.noop, // Before the content of a slide is being loaded
    afterLoad: $.noop, // When the content of a slide is done loading

    beforeShow: $.noop, // Before open animation starts
    afterShow: $.noop, // When content is done loading and animating

    beforeClose: $.noop, // Before the instance attempts to close. Return false to cancel the close.
    afterClose: $.noop, // After instance has been closed

    onActivate: $.noop, // When instance is brought to front
    onDeactivate: $.noop, // When other instance has been activated

    // Interaction
    // ===========

    // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
    // each option can be string or method that returns value.
    //
    // Possible values:
    //   "close"           - close instance
    //   "next"            - move to next gallery item
    //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
    //   "toggleControls"  - show/hide controls
    //   "zoom"            - zoom image (if loaded)
    //   false             - do nothing

    // Clicked on the content
    clickContent: function(current, event) {
      return current.type === "image" ? "zoom" : false;
    },

    // Clicked on the slide
    clickSlide: "close",

    // Clicked on the background (backdrop) element;
    // if you have not changed the layout, then most likely you need to use `clickSlide` option
    clickOutside: "close",

    // Same as previous two, but for double click
    dblclickContent: false,
    dblclickSlide: false,
    dblclickOutside: false,

    // Custom options when mobile device is detected
    // =============================================

    mobile: {
      idleTime: false,
      clickContent: function(current, event) {
        return current.type === "image" ? "toggleControls" : false;
      },
      clickSlide: function(current, event) {
        return current.type === "image" ? "toggleControls" : "close";
      },
      dblclickContent: function(current, event) {
        return current.type === "image" ? "zoom" : false;
      },
      dblclickSlide: function(current, event) {
        return current.type === "image" ? "zoom" : false;
      }
    },

    // Internationalization
    // ====================

    lang: "en",
    i18n: {
      en: {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
        PLAY_START: "Start slideshow",
        PLAY_STOP: "Pause slideshow",
        FULL_SCREEN: "Full screen",
        THUMBS: "Thumbnails",
        DOWNLOAD: "Download",
        SHARE: "Share",
        ZOOM: "Zoom"
      },
      de: {
        CLOSE: "Schliessen",
        NEXT: "Weiter",
        PREV: "Zurück",
        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
        PLAY_START: "Diaschau starten",
        PLAY_STOP: "Diaschau beenden",
        FULL_SCREEN: "Vollbild",
        THUMBS: "Vorschaubilder",
        DOWNLOAD: "Herunterladen",
        SHARE: "Teilen",
        ZOOM: "Maßstab"
      }
    }
  };

  // Few useful variables and methods
  // ================================

  var $W = $(window);
  var $D = $(document);

  var called = 0;

  // Check if an object is a jQuery object and not a native JavaScript object
  // ========================================================================
  var isQuery = function(obj) {
    return obj && obj.hasOwnProperty && obj instanceof $;
  };

  // Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
  // ===============================================================================
  var requestAFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      // if all else fails, use setTimeout
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  // Detect the supported transition-end event property name
  // =======================================================
  var transitionEnd = (function() {
    var el = document.createElement("fakeelement"),
      t;

    var transitions = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }

    return "transitionend";
  })();

  // Force redraw on an element.
  // This helps in cases where the browser doesn't redraw an updated element properly
  // ================================================================================
  var forceRedraw = function($el) {
    return $el && $el.length && $el[0].offsetHeight;
  };

  // Exclude array (`buttons`) options from deep merging
  // ===================================================
  var mergeOpts = function(opts1, opts2) {
    var rez = $.extend(true, {}, opts1, opts2);

    $.each(opts2, function(key, value) {
      if ($.isArray(value)) {
        rez[key] = value;
      }
    });

    return rez;
  };

  // Class definition
  // ================

  var FancyBox = function(content, opts, index) {
    var self = this;

    self.opts = mergeOpts({index: index}, $.fancybox.defaults);

    if ($.isPlainObject(opts)) {
      self.opts = mergeOpts(self.opts, opts);
    }

    if ($.fancybox.isMobile) {
      self.opts = mergeOpts(self.opts, self.opts.mobile);
    }

    self.id = self.opts.id || ++called;

    self.currIndex = parseInt(self.opts.index, 10) || 0;
    self.prevIndex = null;

    self.prevPos = null;
    self.currPos = 0;

    self.firstRun = true;

    // All group items
    self.group = [];

    // Existing slides (for current, next and previous gallery items)
    self.slides = {};

    // Create group elements
    self.addContent(content);

    if (!self.group.length) {
      return;
    }

    // Save last active element
    self.$lastFocus = $(document.activeElement).trigger("blur");

    self.init();
  };

  $.extend(FancyBox.prototype, {
    // Create DOM structure
    // ====================

    init: function() {
      var self = this,
        firstItem = self.group[self.currIndex],
        firstItemOpts = firstItem.opts,
        scrollbarWidth = $.fancybox.scrollbarWidth,
        $scrollDiv,
        $container,
        buttonStr;

      // Hide scrollbars
      // ===============

      if (!$.fancybox.getInstance() && firstItemOpts.hideScrollbar !== false) {
        $("body").addClass("fancybox-active");

        if (!$.fancybox.isMobile && document.body.scrollHeight > window.innerHeight) {
          if (scrollbarWidth === undefined) {
            $scrollDiv = $('<div style="width:100px;height:100px;overflow:scroll;" />').appendTo("body");

            scrollbarWidth = $.fancybox.scrollbarWidth = $scrollDiv[0].offsetWidth - $scrollDiv[0].clientWidth;

            $scrollDiv.remove();
          }

          $("head").append(
            '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' +
              scrollbarWidth +
              "px; }</style>"
          );

          $("body").addClass("compensate-for-scrollbar");
        }
      }

      // Build html markup and set references
      // ====================================

      // Build html code for buttons and insert into main template
      buttonStr = "";

      $.each(firstItemOpts.buttons, function(index, value) {
        buttonStr += firstItemOpts.btnTpl[value] || "";
      });

      // Create markup from base template, it will be initially hidden to
      // avoid unnecessary work like painting while initializing is not complete
      $container = $(
        self.translate(
          self,
          firstItemOpts.baseTpl
            .replace("{{buttons}}", buttonStr)
            .replace("{{arrows}}", firstItemOpts.btnTpl.arrowLeft + firstItemOpts.btnTpl.arrowRight)
        )
      )
        .attr("id", "fancybox-container-" + self.id)
        .addClass("fancybox-is-hidden")
        .addClass(firstItemOpts.baseClass)
        .data("FancyBox", self)
        .appendTo(firstItemOpts.parentEl);

      // Create object holding references to jQuery wrapped nodes
      self.$refs = {
        container: $container
      };

      ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(item) {
        self.$refs[item] = $container.find(".fancybox-" + item);
      });

      self.trigger("onInit");

      // Enable events, deactive previous instances
      self.activate();

      // Build slides, load and reveal content
      self.jumpTo(self.currIndex);
    },

    // Simple i18n support - replaces object keys found in template
    // with corresponding values
    // ============================================================

    translate: function(obj, str) {
      var arr = obj.opts.i18n[obj.opts.lang];

      return str.replace(/\{\{(\w+)\}\}/g, function(match, n) {
        var value = arr[n];

        if (value === undefined) {
          return match;
        }

        return value;
      });
    },

    // Populate current group with fresh content
    // Check if each object has valid type and content
    // ===============================================

    addContent: function(content) {
      var self = this,
        items = $.makeArray(content),
        thumbs;

      $.each(items, function(i, item) {
        var obj = {},
          opts = {},
          $item,
          type,
          found,
          src,
          srcParts;

        // Step 1 - Make sure we have an object
        // ====================================

        if ($.isPlainObject(item)) {
          // We probably have manual usage here, something like
          // $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )

          obj = item;
          opts = item.opts || item;
        } else if ($.type(item) === "object" && $(item).length) {
          // Here we probably have jQuery collection returned by some selector
          $item = $(item);

          // Support attributes like `data-options='{"touch" : false}'` and `data-touch='false'`
          opts = $item.data() || {};
          opts = $.extend(true, {}, opts, opts.options);

          // Here we store clicked element
          opts.$orig = $item;

          obj.src = self.opts.src || opts.src || $item.attr("href");

          // Assume that simple syntax is used, for example:
          //   `$.fancybox.open( $("#test"), {} );`
          if (!obj.type && !obj.src) {
            obj.type = "inline";
            obj.src = item;
          }
        } else {
          // Assume we have a simple html code, for example:
          //   $.fancybox.open( '<div><h1>Hi!</h1></div>' );
          obj = {
            type: "html",
            src: item + ""
          };
        }

        // Each gallery object has full collection of options
        obj.opts = $.extend(true, {}, self.opts, opts);

        // Do not merge buttons array
        if ($.isArray(opts.buttons)) {
          obj.opts.buttons = opts.buttons;
        }

        // Step 2 - Make sure we have content type, if not - try to guess
        // ==============================================================

        type = obj.type || obj.opts.type;
        src = obj.src || "";

        if (!type && src) {
          if ((found = src.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i))) {
            type = "video";

            if (!obj.opts.videoFormat) {
              obj.opts.videoFormat = "video/" + (found[1] === "ogv" ? "ogg" : found[1]);
            }
          } else if (src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)) {
            type = "image";
          } else if (src.match(/\.(pdf)((\?|#).*)?$/i)) {
            type = "iframe";
          } else if (src.charAt(0) === "#") {
            type = "inline";
          }
        }

        if (type) {
          obj.type = type;
        } else {
          self.trigger("objectNeedsType", obj);
        }

        if (!obj.contentType) {
          obj.contentType = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1 ? "html" : obj.type;
        }

        // Step 3 - Some adjustments
        // =========================

        obj.index = self.group.length;

        if (obj.opts.smallBtn == "auto") {
          obj.opts.smallBtn = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1;
        }

        if (obj.opts.toolbar === "auto") {
          obj.opts.toolbar = !obj.opts.smallBtn;
        }

        // Find thumbnail image
        if (obj.opts.$trigger && obj.index === self.opts.index) {
          obj.opts.$thumb = obj.opts.$trigger.find("img:first");
        }

        if ((!obj.opts.$thumb || !obj.opts.$thumb.length) && obj.opts.$orig) {
          obj.opts.$thumb = obj.opts.$orig.find("img:first");
        }

        // "caption" is a "special" option, it can be used to customize caption per gallery item ..
        if ($.type(obj.opts.caption) === "function") {
          obj.opts.caption = obj.opts.caption.apply(item, [self, obj]);
        }

        if ($.type(self.opts.caption) === "function") {
          obj.opts.caption = self.opts.caption.apply(item, [self, obj]);
        }

        // Make sure we have caption as a string or jQuery object
        if (!(obj.opts.caption instanceof $)) {
          obj.opts.caption = obj.opts.caption === undefined ? "" : obj.opts.caption + "";
        }

        // Check if url contains "filter" used to filter the content
        // Example: "ajax.html #something"
        if (obj.type === "ajax") {
          srcParts = src.split(/\s+/, 2);

          if (srcParts.length > 1) {
            obj.src = srcParts.shift();

            obj.opts.filter = srcParts.shift();
          }
        }

        // Hide all buttons and disable interactivity for modal items
        if (obj.opts.modal) {
          obj.opts = $.extend(true, obj.opts, {
            // Remove buttons
            infobar: 0,
            toolbar: 0,

            smallBtn: 0,

            // Disable keyboard navigation
            keyboard: 0,

            // Disable some modules
            slideShow: 0,
            fullScreen: 0,
            thumbs: 0,
            touch: 0,

            // Disable click event handlers
            clickContent: false,
            clickSlide: false,
            clickOutside: false,
            dblclickContent: false,
            dblclickSlide: false,
            dblclickOutside: false
          });
        }

        // Step 4 - Add processed object to group
        // ======================================

        self.group.push(obj);
      });

      // Update controls if gallery is already opened
      if (Object.keys(self.slides).length) {
        self.updateControls();

        // Update thumbnails, if needed
        thumbs = self.Thumbs;

        if (thumbs && thumbs.isActive) {
          thumbs.create();

          thumbs.focus();
        }
      }
    },

    // Attach an event handler functions for:
    //   - navigation buttons
    //   - browser scrolling, resizing;
    //   - focusing
    //   - keyboard
    //   - detect idle
    // ======================================

    addEvents: function() {
      var self = this;

      self.removeEvents();

      // Make navigation elements clickable
      self.$refs.container
        .on("click.fb-close", "[data-fancybox-close]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          self.close(e);
        })
        .on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          self.previous();
        })
        .on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          self.next();
        })
        .on("click.fb", "[data-fancybox-zoom]", function(e) {
          // Click handler for zoom button
          self[self.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
        });

      // Handle page scrolling and browser resizing
      $W.on("orientationchange.fb resize.fb", function(e) {
        if (e && e.originalEvent && e.originalEvent.type === "resize") {
          requestAFrame(function() {
            self.update();
          });
        } else {
          self.$refs.stage.hide();

          setTimeout(function() {
            self.$refs.stage.show();

            self.update();
          }, $.fancybox.isMobile ? 600 : 250);
        }
      });

      // Trap keyboard focus inside of the modal, so the user does not accidentally tab outside of the modal
      // (a.k.a. "escaping the modal")
      $D.on("focusin.fb", function(e) {
        var instance = $.fancybox ? $.fancybox.getInstance() : null;

        if (
          instance.isClosing ||
          !instance.current ||
          !instance.current.opts.trapFocus ||
          $(e.target).hasClass("fancybox-container") ||
          $(e.target).is(document)
        ) {
          return;
        }

        if (instance && $(e.target).css("position") !== "fixed" && !instance.$refs.container.has(e.target).length) {
          e.stopPropagation();

          instance.focus();
        }
      });

      // Enable keyboard navigation
      $D.on("keydown.fb", function(e) {
        var current = self.current,
          keycode = e.keyCode || e.which;

        if (!current || !current.opts.keyboard) {
          return;
        }

        if (e.ctrlKey || e.altKey || e.shiftKey || $(e.target).is("input") || $(e.target).is("textarea")) {
          return;
        }

        // Backspace and Esc keys
        if (keycode === 8 || keycode === 27) {
          e.preventDefault();

          self.close(e);

          return;
        }

        // Left arrow and Up arrow
        if (keycode === 37 || keycode === 38) {
          e.preventDefault();

          self.previous();

          return;
        }

        // Righ arrow and Down arrow
        if (keycode === 39 || keycode === 40) {
          e.preventDefault();

          self.next();

          return;
        }

        self.trigger("afterKeydown", e, keycode);
      });

      // Hide controls after some inactivity period
      if (self.group[self.currIndex].opts.idleTime) {
        self.idleSecondsCounter = 0;

        $D.on(
          "mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
          function(e) {
            self.idleSecondsCounter = 0;

            if (self.isIdle) {
              self.showControls();
            }

            self.isIdle = false;
          }
        );

        self.idleInterval = window.setInterval(function() {
          self.idleSecondsCounter++;

          if (self.idleSecondsCounter >= self.group[self.currIndex].opts.idleTime && !self.isDragging) {
            self.isIdle = true;
            self.idleSecondsCounter = 0;

            self.hideControls();
          }
        }, 1000);
      }
    },

    // Remove events added by the core
    // ===============================

    removeEvents: function() {
      var self = this;

      $W.off("orientationchange.fb resize.fb");
      $D.off("focusin.fb keydown.fb .fb-idle");

      this.$refs.container.off(".fb-close .fb-prev .fb-next");

      if (self.idleInterval) {
        window.clearInterval(self.idleInterval);

        self.idleInterval = null;
      }
    },

    // Change to previous gallery item
    // ===============================

    previous: function(duration) {
      return this.jumpTo(this.currPos - 1, duration);
    },

    // Change to next gallery item
    // ===========================

    next: function(duration) {
      return this.jumpTo(this.currPos + 1, duration);
    },

    // Switch to selected gallery item
    // ===============================

    jumpTo: function(pos, duration) {
      var self = this,
        groupLen = self.group.length,
        firstRun,
        loop,
        current,
        previous,
        canvasWidth,
        currentPos,
        transitionProps;

      if (self.isDragging || self.isClosing || (self.isAnimating && self.firstRun)) {
        return;
      }

      pos = parseInt(pos, 10);

      // Should loop?
      loop = self.current ? self.current.opts.loop : self.opts.loop;

      if (!loop && (pos < 0 || pos >= groupLen)) {
        return false;
      }

      firstRun = self.firstRun = !Object.keys(self.slides).length;

      if (groupLen < 2 && !firstRun && !!self.isDragging) {
        return;
      }

      previous = self.current;

      self.prevIndex = self.currIndex;
      self.prevPos = self.currPos;

      // Create slides
      current = self.createSlide(pos);

      if (groupLen > 1) {
        if (loop || current.index > 0) {
          self.createSlide(pos - 1);
        }

        if (loop || current.index < groupLen - 1) {
          self.createSlide(pos + 1);
        }
      }

      self.current = current;
      self.currIndex = current.index;
      self.currPos = current.pos;

      self.trigger("beforeShow", firstRun);

      self.updateControls();

      currentPos = $.fancybox.getTranslate(current.$slide);

      current.isMoved = (currentPos.left !== 0 || currentPos.top !== 0) && !current.$slide.hasClass("fancybox-animated");

      // Validate duration length
      current.forcedDuration = undefined;

      if ($.isNumeric(duration)) {
        current.forcedDuration = duration;
      } else {
        duration = current.opts[firstRun ? "animationDuration" : "transitionDuration"];
      }

      duration = parseInt(duration, 10);

      // Fresh start - reveal container, current slide and start loading content
      if (firstRun) {
        if (current.opts.animationEffect && duration) {
          self.$refs.container.css("transition-duration", duration + "ms");
        }

        self.$refs.container.removeClass("fancybox-is-hidden");

        forceRedraw(self.$refs.container);

        self.$refs.container.addClass("fancybox-is-open");

        forceRedraw(self.$refs.container);

        // Make current slide visible
        current.$slide.addClass("fancybox-slide--previous");

        // Attempt to load content into slide;
        // at this point image would start loading, but inline/html content would load immediately
        self.loadSlide(current);

        current.$slide.removeClass("fancybox-slide--previous").addClass("fancybox-slide--current");

        self.preload("image");

        return;
      }

      // Clean up
      $.each(self.slides, function(index, slide) {
        $.fancybox.stop(slide.$slide);
      });

      // Make current that slide is visible even if content is still loading
      current.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current");

      // If slides have been dragged, animate them to correct position
      if (current.isMoved) {
        canvasWidth = Math.round(current.$slide.width());

        $.each(self.slides, function(index, slide) {
          var pos = slide.pos - current.pos;

          $.fancybox.animate(
            slide.$slide,
            {
              top: 0,
              left: pos * canvasWidth + pos * slide.opts.gutter
            },
            duration,
            function() {
              slide.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous");

              if (slide.pos === self.currPos) {
                current.isMoved = false;

                self.complete();
              }
            }
          );
        });
      } else {
        self.$refs.stage.children().removeAttr("style");
      }

      // Start transition that reveals current content
      // or wait when it will be loaded

      if (current.isLoaded) {
        self.revealContent(current);
      } else {
        self.loadSlide(current);
      }

      self.preload("image");

      if (previous.pos === current.pos) {
        return;
      }

      // Handle previous slide
      // =====================

      transitionProps = "fancybox-slide--" + (previous.pos > current.pos ? "next" : "previous");

      previous.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous");

      previous.isComplete = false;

      if (!duration || (!current.isMoved && !current.opts.transitionEffect)) {
        return;
      }

      if (current.isMoved) {
        previous.$slide.addClass(transitionProps);
      } else {
        transitionProps = "fancybox-animated " + transitionProps + " fancybox-fx-" + current.opts.transitionEffect;

        $.fancybox.animate(previous.$slide, transitionProps, duration, function() {
          previous.$slide.removeClass(transitionProps).removeAttr("style");
        });
      }
    },

    // Create new "slide" element
    // These are gallery items  that are actually added to DOM
    // =======================================================

    createSlide: function(pos) {
      var self = this,
        $slide,
        index;

      index = pos % self.group.length;
      index = index < 0 ? self.group.length + index : index;

      if (!self.slides[pos] && self.group[index]) {
        $slide = $('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage);

        self.slides[pos] = $.extend(true, {}, self.group[index], {
          pos: pos,
          $slide: $slide,
          isLoaded: false
        });

        self.updateSlide(self.slides[pos]);
      }

      return self.slides[pos];
    },

    // Scale image to the actual size of the image;
    // x and y values should be relative to the slide
    // ==============================================

    scaleToActual: function(x, y, duration) {
      var self = this,
        current = self.current,
        $content = current.$content,
        canvasWidth = $.fancybox.getTranslate(current.$slide).width,
        canvasHeight = $.fancybox.getTranslate(current.$slide).height,
        newImgWidth = current.width,
        newImgHeight = current.height,
        imgPos,
        posX,
        posY,
        scaleX,
        scaleY;

      if (self.isAnimating || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      $.fancybox.stop($content);

      self.isAnimating = true;

      x = x === undefined ? canvasWidth * 0.5 : x;
      y = y === undefined ? canvasHeight * 0.5 : y;

      imgPos = $.fancybox.getTranslate($content);

      imgPos.top -= $.fancybox.getTranslate(current.$slide).top;
      imgPos.left -= $.fancybox.getTranslate(current.$slide).left;

      scaleX = newImgWidth / imgPos.width;
      scaleY = newImgHeight / imgPos.height;

      // Get center position for original image
      posX = canvasWidth * 0.5 - newImgWidth * 0.5;
      posY = canvasHeight * 0.5 - newImgHeight * 0.5;

      // Make sure image does not move away from edges
      if (newImgWidth > canvasWidth) {
        posX = imgPos.left * scaleX - (x * scaleX - x);

        if (posX > 0) {
          posX = 0;
        }

        if (posX < canvasWidth - newImgWidth) {
          posX = canvasWidth - newImgWidth;
        }
      }

      if (newImgHeight > canvasHeight) {
        posY = imgPos.top * scaleY - (y * scaleY - y);

        if (posY > 0) {
          posY = 0;
        }

        if (posY < canvasHeight - newImgHeight) {
          posY = canvasHeight - newImgHeight;
        }
      }

      self.updateCursor(newImgWidth, newImgHeight);

      $.fancybox.animate(
        $content,
        {
          top: posY,
          left: posX,
          scaleX: scaleX,
          scaleY: scaleY
        },
        duration || 330,
        function() {
          self.isAnimating = false;
        }
      );

      // Stop slideshow
      if (self.SlideShow && self.SlideShow.isActive) {
        self.SlideShow.stop();
      }
    },

    // Scale image to fit inside parent element
    // ========================================

    scaleToFit: function(duration) {
      var self = this,
        current = self.current,
        $content = current.$content,
        end;

      if (self.isAnimating || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      $.fancybox.stop($content);

      self.isAnimating = true;

      end = self.getFitPos(current);

      self.updateCursor(end.width, end.height);

      $.fancybox.animate(
        $content,
        {
          top: end.top,
          left: end.left,
          scaleX: end.width / $content.width(),
          scaleY: end.height / $content.height()
        },
        duration || 330,
        function() {
          self.isAnimating = false;
        }
      );
    },

    // Calculate image size to fit inside viewport
    // ===========================================

    getFitPos: function(slide) {
      var self = this,
        $content = slide.$content,
        width = slide.width || slide.opts.width,
        height = slide.height || slide.opts.height,
        maxWidth,
        maxHeight,
        minRatio,
        margin,
        aspectRatio,
        rez = {};

      if (!slide.isLoaded || !$content || !$content.length) {
        return false;
      }

      margin = {
        top: parseInt(slide.$slide.css("paddingTop"), 10),
        right: parseInt(slide.$slide.css("paddingRight"), 10),
        bottom: parseInt(slide.$slide.css("paddingBottom"), 10),
        left: parseInt(slide.$slide.css("paddingLeft"), 10)
      };

      // We can not use $slide width here, because it can have different diemensions while in transiton
      maxWidth = parseInt(self.$refs.stage.width(), 10) - (margin.left + margin.right);
      maxHeight = parseInt(self.$refs.stage.height(), 10) - (margin.top + margin.bottom);

      if (!width || !height) {
        width = maxWidth;
        height = maxHeight;
      }

      minRatio = Math.min(1, maxWidth / width, maxHeight / height);

      // Use floor rounding to make sure it really fits
      width = Math.floor(minRatio * width);
      height = Math.floor(minRatio * height);

      if (slide.type === "image") {
        rez.top = Math.floor((maxHeight - height) * 0.5) + margin.top;
        rez.left = Math.floor((maxWidth - width) * 0.5) + margin.left;
      } else if (slide.contentType === "video") {
        // Force aspect ratio for the video
        // "I say the whole world must learn of our peaceful ways… by force!"
        aspectRatio = slide.opts.width && slide.opts.height ? width / height : slide.opts.ratio || 16 / 9;

        if (height > width / aspectRatio) {
          height = width / aspectRatio;
        } else if (width > height * aspectRatio) {
          width = height * aspectRatio;
        }
      }

      rez.width = width;
      rez.height = height;

      return rez;
    },

    // Update content size and position for all slides
    // ==============================================

    update: function() {
      var self = this;

      $.each(self.slides, function(key, slide) {
        self.updateSlide(slide);
      });
    },

    // Update slide content position and size
    // ======================================

    updateSlide: function(slide, duration) {
      var self = this,
        $content = slide && slide.$content,
        width = slide.width || slide.opts.width,
        height = slide.height || slide.opts.height;

      if ($content && (width || height || slide.contentType === "video") && !slide.hasError) {
        $.fancybox.stop($content);

        $.fancybox.setTranslate($content, self.getFitPos(slide));

        if (slide.pos === self.currPos) {
          self.isAnimating = false;

          self.updateCursor();
        }
      }

      slide.$slide.trigger("refresh");

      self.$refs.toolbar.toggleClass("compensate-for-scrollbar", slide.$slide.get(0).scrollHeight > slide.$slide.get(0).clientHeight);

      self.trigger("onUpdate", slide);
    },

    // Horizontally center slide
    // =========================

    centerSlide: function(slide, duration) {
      var self = this,
        canvasWidth,
        pos;

      if (self.current) {
        canvasWidth = Math.round(slide.$slide.width());
        pos = slide.pos - self.current.pos;

        $.fancybox.animate(
          slide.$slide,
          {
            top: 0,
            left: pos * canvasWidth + pos * slide.opts.gutter,
            opacity: 1
          },
          duration === undefined ? 0 : duration,
          null,
          false
        );
      }
    },

    // Update cursor style depending if content can be zoomed
    // ======================================================

    updateCursor: function(nextWidth, nextHeight) {
      var self = this,
        current = self.current,
        $container = self.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut"),
        isZoomable;

      if (!current || self.isClosing) {
        return;
      }

      isZoomable = self.isZoomable();

      $container.toggleClass("fancybox-is-zoomable", isZoomable);

      $("[data-fancybox-zoom]").prop("disabled", !isZoomable);

      // Set cursor to zoom in/out if click event is 'zoom'
      if (
        isZoomable &&
        (current.opts.clickContent === "zoom" || ($.isFunction(current.opts.clickContent) && current.opts.clickContent(current) === "zoom"))
      ) {
        if (self.isScaledDown(nextWidth, nextHeight)) {
          // If image is scaled down, then, obviously, it can be zoomed to full size
          $container.addClass("fancybox-can-zoomIn");
        } else {
          if (current.opts.touch) {
            // If image size ir largen than available available and touch module is not disable,
            // then user can do panning
            $container.addClass("fancybox-can-drag");
          } else {
            $container.addClass("fancybox-can-zoomOut");
          }
        }
      } else if (current.opts.touch && current.contentType !== "video") {
        $container.addClass("fancybox-can-drag");
      }
    },

    // Check if current slide is zoomable
    // ==================================

    isZoomable: function() {
      var self = this,
        current = self.current,
        fitPos;

      // Assume that slide is zoomable if:
      //   - image is still loading
      //   - actual size of the image is smaller than available area
      if (current && !self.isClosing && current.type === "image" && !current.hasError) {
        if (!current.isLoaded) {
          return true;
        }

        fitPos = self.getFitPos(current);

        if (current.width > fitPos.width || current.height > fitPos.height) {
          return true;
        }
      }

      return false;
    },

    // Check if current image dimensions are smaller than actual
    // =========================================================

    isScaledDown: function(nextWidth, nextHeight) {
      var self = this,
        rez = false,
        current = self.current,
        $content = current.$content;

      if (nextWidth !== undefined && nextHeight !== undefined) {
        rez = nextWidth < current.width && nextHeight < current.height;
      } else if ($content) {
        rez = $.fancybox.getTranslate($content);
        rez = rez.width < current.width && rez.height < current.height;
      }

      return rez;
    },

    // Check if image dimensions exceed parent element
    // ===============================================

    canPan: function() {
      var self = this,
        rez = false,
        current = self.current,
        $content;

      if (current.type === "image" && ($content = current.$content) && !current.hasError) {
        rez = self.getFitPos(current);
        rez = Math.abs($content.width() - rez.width) > 1 || Math.abs($content.height() - rez.height) > 1;
      }

      return rez;
    },

    // Load content into the slide
    // ===========================

    loadSlide: function(slide) {
      var self = this,
        type,
        $slide,
        ajaxLoad;

      if (slide.isLoading || slide.isLoaded) {
        return;
      }

      slide.isLoading = true;

      self.trigger("beforeLoad", slide);

      type = slide.type;
      $slide = slide.$slide;

      $slide
        .off("refresh")
        .trigger("onReset")
        .addClass(slide.opts.slideClass);

      // Create content depending on the type
      switch (type) {
        case "image":
          self.setImage(slide);

          break;

        case "iframe":
          self.setIframe(slide);

          break;

        case "html":
          self.setContent(slide, slide.src || slide.content);

          break;

        case "video":
          self.setContent(
            slide,
            '<video class="fancybox-video" controls controlsList="nodownload">' +
              '<source src="' +
              slide.src +
              '" type="' +
              slide.opts.videoFormat +
              '">' +
              "Your browser doesn't support HTML5 video" +
              "</video"
          );

          break;

        case "inline":
          if ($(slide.src).length) {
            self.setContent(slide, $(slide.src));
          } else {
            self.setError(slide);
          }

          break;

        case "ajax":
          self.showLoading(slide);

          ajaxLoad = $.ajax(
            $.extend({}, slide.opts.ajax.settings, {
              url: slide.src,
              success: function(data, textStatus) {
                if (textStatus === "success") {
                  self.setContent(slide, data);
                }
              },
              error: function(jqXHR, textStatus) {
                if (jqXHR && textStatus !== "abort") {
                  self.setError(slide);
                }
              }
            })
          );

          $slide.one("onReset", function() {
            ajaxLoad.abort();
          });

          break;

        default:
          self.setError(slide);

          break;
      }

      return true;
    },

    // Use thumbnail image, if possible
    // ================================

    setImage: function(slide) {
      var self = this,
        srcset = slide.opts.srcset || slide.opts.image.srcset,
        thumbSrc,
        found,
        temp,
        pxRatio,
        windowWidth;

      // Check if need to show loading icon
      slide.timouts = setTimeout(function() {
        var $img = slide.$image;

        if (slide.isLoading && (!$img || !$img[0].complete) && !slide.hasError) {
          self.showLoading(slide);
        }
      }, 350);

      // If we have "srcset", then we need to find first matching "src" value.
      // This is necessary, because when you set an src attribute, the browser will preload the image
      // before any javascript or even CSS is applied.
      if (srcset) {
        pxRatio = window.devicePixelRatio || 1;
        windowWidth = window.innerWidth * pxRatio;

        temp = srcset.split(",").map(function(el) {
          var ret = {};

          el
            .trim()
            .split(/\s+/)
            .forEach(function(el, i) {
              var value = parseInt(el.substring(0, el.length - 1), 10);

              if (i === 0) {
                return (ret.url = el);
              }

              if (value) {
                ret.value = value;
                ret.postfix = el[el.length - 1];
              }
            });

          return ret;
        });

        // Sort by value
        temp.sort(function(a, b) {
          return a.value - b.value;
        });

        // Ok, now we have an array of all srcset values
        for (var j = 0; j < temp.length; j++) {
          var el = temp[j];

          if ((el.postfix === "w" && el.value >= windowWidth) || (el.postfix === "x" && el.value >= pxRatio)) {
            found = el;
            break;
          }
        }

        // If not found, take the last one
        if (!found && temp.length) {
          found = temp[temp.length - 1];
        }

        if (found) {
          slide.src = found.url;

          // If we have default width/height values, we can calculate height for matching source
          if (slide.width && slide.height && found.postfix == "w") {
            slide.height = slide.width / slide.height * found.value;
            slide.width = found.value;
          }

          slide.opts.srcset = srcset;
        }
      }

      // This will be wrapper containing both ghost and actual image
      slide.$content = $('<div class="fancybox-content"></div>')
        .addClass("fancybox-is-hidden")
        .appendTo(slide.$slide.addClass("fancybox-slide--image"));

      // If we have a thumbnail, we can display it while actual image is loading
      // Users will not stare at black screen and actual image will appear gradually
      thumbSrc = slide.opts.thumb || (slide.opts.$thumb && slide.opts.$thumb.length ? slide.opts.$thumb.attr("src") : false);

      if (slide.opts.preload !== false && slide.opts.width && slide.opts.height && thumbSrc) {
        slide.width = slide.opts.width;
        slide.height = slide.opts.height;

        slide.$ghost = $("<img />")
          .one("error", function() {
            $(this).remove();

            slide.$ghost = null;
          })
          .one("load", function() {
            self.afterLoad(slide);
          })
          .addClass("fancybox-image")
          .appendTo(slide.$content)
          .attr("src", thumbSrc);
      }

      // Start loading actual image
      self.setBigImage(slide);
    },

    // Create full-size image
    // ======================

    setBigImage: function(slide) {
      var self = this,
        $img = $("<img />");

      slide.$image = $img
        .one("error", function() {
          self.setError(slide);
        })
        .one("load", function() {
          var sizes;

          if (!slide.$ghost) {
            self.resolveImageSlideSize(slide, this.naturalWidth, this.naturalHeight);

            self.afterLoad(slide);
          }

          // Clear timeout that checks if loading icon needs to be displayed
          if (slide.timouts) {
            clearTimeout(slide.timouts);
            slide.timouts = null;
          }

          if (self.isClosing) {
            return;
          }

          if (slide.opts.srcset) {
            sizes = slide.opts.sizes;

            if (!sizes || sizes === "auto") {
              sizes =
                (slide.width / slide.height > 1 && $W.width() / $W.height() > 1 ? "100" : Math.round(slide.width / slide.height * 100)) +
                "vw";
            }

            $img.attr("sizes", sizes).attr("srcset", slide.opts.srcset);
          }

          // Hide temporary image after some delay
          if (slide.$ghost) {
            setTimeout(function() {
              if (slide.$ghost && !self.isClosing) {
                slide.$ghost.hide();
              }
            }, Math.min(300, Math.max(1000, slide.height / 1600)));
          }

          self.hideLoading(slide);
        })
        .addClass("fancybox-image")
        .attr("src", slide.src)
        .appendTo(slide.$content);

      if (($img[0].complete || $img[0].readyState == "complete") && $img[0].naturalWidth && $img[0].naturalHeight) {
        $img.trigger("load");
      } else if ($img[0].error) {
        $img.trigger("error");
      }
    },

    // Computes the slide size from image size and maxWidth/maxHeight
    // ==============================================================

    resolveImageSlideSize: function(slide, imgWidth, imgHeight) {
      var maxWidth = parseInt(slide.opts.width, 10),
        maxHeight = parseInt(slide.opts.height, 10);

      // Sets the default values from the image
      slide.width = imgWidth;
      slide.height = imgHeight;

      if (maxWidth > 0) {
        slide.width = maxWidth;
        slide.height = Math.floor(maxWidth * imgHeight / imgWidth);
      }

      if (maxHeight > 0) {
        slide.width = Math.floor(maxHeight * imgWidth / imgHeight);
        slide.height = maxHeight;
      }
    },

    // Create iframe wrapper, iframe and bindings
    // ==========================================

    setIframe: function(slide) {
      var self = this,
        opts = slide.opts.iframe,
        $slide = slide.$slide,
        $iframe;

      slide.$content = $('<div class="fancybox-content' + (opts.preload ? " fancybox-is-hidden" : "") + '"></div>')
        .css(opts.css)
        .appendTo($slide);

      $slide.addClass("fancybox-slide--" + slide.contentType);

      slide.$iframe = $iframe = $(opts.tpl.replace(/\{rnd\}/g, new Date().getTime()))
        .attr(opts.attr)
        .appendTo(slide.$content);

      if (opts.preload) {
        self.showLoading(slide);

        // Unfortunately, it is not always possible to determine if iframe is successfully loaded
        // (due to browser security policy)

        $iframe.on("load.fb error.fb", function(e) {
          this.isReady = 1;

          slide.$slide.trigger("refresh");

          self.afterLoad(slide);
        });

        // Recalculate iframe content size
        // ===============================

        $slide.on("refresh.fb", function() {
          var $content = slide.$content,
            frameWidth = opts.css.width,
            frameHeight = opts.css.height,
            $contents,
            $body;

          if ($iframe[0].isReady !== 1) {
            return;
          }

          try {
            $contents = $iframe.contents();
            $body = $contents.find("body");
          } catch (ignore) {}

          // Calculate contnet dimensions if it is accessible
          if ($body && $body.length && $body.children().length) {
            $content.css({
              width: "",
              height: ""
            });

            if (frameWidth === undefined) {
              frameWidth = Math.ceil(Math.max($body[0].clientWidth, $body.outerWidth(true)));
            }

            if (frameWidth) {
              $content.width(frameWidth);
            }

            if (frameHeight === undefined) {
              frameHeight = Math.ceil(Math.max($body[0].clientHeight, $body.outerHeight(true)));
            }

            if (frameHeight) {
              $content.height(frameHeight);
            }
          }

          $content.removeClass("fancybox-is-hidden");
        });
      } else {
        this.afterLoad(slide);
      }

      $iframe.attr("src", slide.src);

      // Remove iframe if closing or changing gallery item
      $slide.one("onReset", function() {
        // This helps IE not to throw errors when closing
        try {
          $(this)
            .find("iframe")
            .hide()
            .unbind()
            .attr("src", "//about:blank");
        } catch (ignore) {}

        $(this)
          .off("refresh.fb")
          .empty();

        slide.isLoaded = false;
      });
    },

    // Wrap and append content to the slide
    // ======================================

    setContent: function(slide, content) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      self.hideLoading(slide);

      if (slide.$content) {
        $.fancybox.stop(slide.$content);
      }

      slide.$slide.empty();

      // If content is a jQuery object, then it will be moved to the slide.
      // The placeholder is created so we will know where to put it back.
      if (isQuery(content) && content.parent().length) {
        // Make sure content is not already moved to fancyBox
        content
          .parent()
          .parent(".fancybox-slide--inline")
          .trigger("onReset");

        // Create temporary element marking original place of the content
        slide.$placeholder = $("<div>")
          .hide()
          .insertAfter(content);

        // Make sure content is visible
        content.css("display", "inline-block");
      } else if (!slide.hasError) {
        // If content is just a plain text, try to convert it to html
        if ($.type(content) === "string") {
          content = $("<div>")
            .append($.trim(content))
            .contents();

          // If we have text node, then add wrapping element to make vertical alignment work
          if (content[0].nodeType === 3) {
            content = $("<div>").html(content);
          }
        }

        // If "filter" option is provided, then filter content
        if (slide.opts.filter) {
          content = $("<div>")
            .html(content)
            .find(slide.opts.filter);
        }
      }

      slide.$slide.one("onReset", function() {
        // Pause all html5 video/audio
        $(this)
          .find("video,audio")
          .trigger("pause");

        // Put content back
        if (slide.$placeholder) {
          slide.$placeholder.after(content.hide()).remove();

          slide.$placeholder = null;
        }

        // Remove custom close button
        if (slide.$smallBtn) {
          slide.$smallBtn.remove();

          slide.$smallBtn = null;
        }

        // Remove content and mark slide as not loaded
        if (!slide.hasError) {
          $(this).empty();

          slide.isLoaded = false;
        }
      });

      $(content).appendTo(slide.$slide);

      if ($(content).is("video,audio")) {
        $(content).addClass("fancybox-video");

        $(content).wrap("<div></div>");

        slide.contentType = "video";

        slide.opts.width = slide.opts.width || $(content).attr("width");
        slide.opts.height = slide.opts.height || $(content).attr("height");
      }

      slide.$content = slide.$slide
        .children()
        .filter("div,form,main,video,audio")
        .first()
        .addClass("fancybox-content");

      slide.$slide.addClass("fancybox-slide--" + slide.contentType);

      this.afterLoad(slide);
    },

    // Display error message
    // =====================

    setError: function(slide) {
      slide.hasError = true;

      slide.$slide
        .trigger("onReset")
        .removeClass("fancybox-slide--" + slide.contentType)
        .addClass("fancybox-slide--error");

      slide.contentType = "html";

      this.setContent(slide, this.translate(slide, slide.opts.errorTpl));

      if (slide.pos === this.currPos) {
        this.isAnimating = false;
      }
    },

    // Show loading icon inside the slide
    // ==================================

    showLoading: function(slide) {
      var self = this;

      slide = slide || self.current;

      if (slide && !slide.$spinner) {
        slide.$spinner = $(self.translate(self, self.opts.spinnerTpl)).appendTo(slide.$slide);
      }
    },

    // Remove loading icon from the slide
    // ==================================

    hideLoading: function(slide) {
      var self = this;

      slide = slide || self.current;

      if (slide && slide.$spinner) {
        slide.$spinner.remove();

        delete slide.$spinner;
      }
    },

    // Adjustments after slide content has been loaded
    // ===============================================

    afterLoad: function(slide) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      slide.isLoading = false;
      slide.isLoaded = true;

      self.trigger("afterLoad", slide);

      self.hideLoading(slide);

      if (slide.pos === self.currPos) {
        self.updateCursor();
      }

      if (slide.opts.smallBtn && (!slide.$smallBtn || !slide.$smallBtn.length)) {
        slide.$smallBtn = $(self.translate(slide, slide.opts.btnTpl.smallBtn)).prependTo(slide.$content);
      }

      if (slide.opts.protect && slide.$content && !slide.hasError) {
        // Disable right click
        slide.$content.on("contextmenu.fb", function(e) {
          if (e.button == 2) {
            e.preventDefault();
          }

          return true;
        });

        // Add fake element on top of the image
        // This makes a bit harder for user to select image
        if (slide.type === "image") {
          $('<div class="fancybox-spaceball"></div>').appendTo(slide.$content);
        }
      }

      self.revealContent(slide);
    },

    // Make content visible
    // This method is called right after content has been loaded or
    // user navigates gallery and transition should start
    // ============================================================

    revealContent: function(slide) {
      var self = this,
        $slide = slide.$slide,
        end = false,
        start = false,
        effect,
        effectClassName,
        duration,
        opacity;

      effect = slide.opts[self.firstRun ? "animationEffect" : "transitionEffect"];
      duration = slide.opts[self.firstRun ? "animationDuration" : "transitionDuration"];

      duration = parseInt(slide.forcedDuration === undefined ? duration : slide.forcedDuration, 10);

      // Do not animate if revealing the same slide
      if (slide.pos === self.currPos) {
        if (slide.isComplete) {
          effect = false;
        } else {
          self.isAnimating = true;
        }
      }

      if (slide.isMoved || slide.pos !== self.currPos || !duration) {
        effect = false;
      }

      // Check if can zoom
      if (effect === "zoom") {
        if (slide.pos === self.currPos && duration && slide.type === "image" && !slide.hasError && (start = self.getThumbPos(slide))) {
          end = self.getFitPos(slide);
        } else {
          effect = "fade";
        }
      }

      // Zoom animation
      // ==============
      if (effect === "zoom") {
        end.scaleX = end.width / start.width;
        end.scaleY = end.height / start.height;

        // Check if we need to animate opacity
        opacity = slide.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(slide.width / slide.height - start.width / start.height) > 0.1;
        }

        if (opacity) {
          start.opacity = 0.1;
          end.opacity = 1;
        }

        // Draw image at start position
        $.fancybox.setTranslate(slide.$content.removeClass("fancybox-is-hidden"), start);

        forceRedraw(slide.$content);

        // Start animation
        $.fancybox.animate(slide.$content, end, duration, function() {
          self.isAnimating = false;

          self.complete();
        });

        return;
      }

      self.updateSlide(slide);

      // Simply show content
      // ===================

      if (!effect) {
        forceRedraw($slide);

        slide.$content.removeClass("fancybox-is-hidden");

        if (slide.pos === self.currPos) {
          self.complete();
        }

        return;
      }

      $.fancybox.stop($slide);

      effectClassName = "fancybox-animated fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-fx-" + effect;

      $slide
        .removeAttr("style")
        .removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous")
        .addClass(effectClassName);

      slide.$content.removeClass("fancybox-is-hidden");

      // Force reflow for CSS3 transitions
      forceRedraw($slide);

      $.fancybox.animate(
        $slide,
        "fancybox-slide--current",
        duration,
        function(e) {
          $slide.removeClass(effectClassName).removeAttr("style");

          if (slide.pos === self.currPos) {
            self.complete();
          }
        },
        true
      );
    },

    // Check if we can and have to zoom from thumbnail
    //================================================

    getThumbPos: function(slide) {
      var self = this,
        rez = false,
        $thumb = slide.opts.$thumb,
        thumbPos = $thumb && $thumb.length && $thumb[0].ownerDocument === document ? $thumb.offset() : 0,
        slidePos;

      // Check if element is inside the viewport by at least 1 pixel
      var isElementVisible = function($el) {
        var element = $el[0],
          elementRect = element.getBoundingClientRect(),
          parentRects = [],
          visibleInAllParents;

        while (element.parentElement !== null) {
          if ($(element.parentElement).css("overflow") === "hidden" || $(element.parentElement).css("overflow") === "auto") {
            parentRects.push(element.parentElement.getBoundingClientRect());
          }

          element = element.parentElement;
        }

        visibleInAllParents = parentRects.every(function(parentRect) {
          var visiblePixelX = Math.min(elementRect.right, parentRect.right) - Math.max(elementRect.left, parentRect.left);
          var visiblePixelY = Math.min(elementRect.bottom, parentRect.bottom) - Math.max(elementRect.top, parentRect.top);

          return visiblePixelX > 0 && visiblePixelY > 0;
        });

        return (
          visibleInAllParents &&
          elementRect.bottom > 0 &&
          elementRect.right > 0 &&
          elementRect.left < $(window).width() &&
          elementRect.top < $(window).height()
        );
      };

      if (thumbPos && isElementVisible($thumb)) {
        slidePos = self.$refs.stage.offset();

        rez = {
          top: thumbPos.top - slidePos.top + parseFloat($thumb.css("border-top-width") || 0),
          left: thumbPos.left - slidePos.left + parseFloat($thumb.css("border-left-width") || 0),
          width: $thumb.width(),
          height: $thumb.height(),
          scaleX: 1,
          scaleY: 1
        };
      }

      return rez;
    },

    // Final adjustments after current gallery item is moved to position
    // and it`s content is loaded
    // ==================================================================

    complete: function() {
      var self = this,
        current = self.current,
        slides = {};

      if (current.isMoved || !current.isLoaded) {
        return;
      }

      if (!current.isComplete) {
        current.isComplete = true;

        current.$slide.siblings().trigger("onReset");

        self.preload("inline");

        // Trigger any CSS3 transiton inside the slide
        forceRedraw(current.$slide);

        current.$slide.addClass("fancybox-slide--complete");

        // Remove unnecessary slides
        $.each(self.slides, function(key, slide) {
          if (slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1) {
            slides[slide.pos] = slide;
          } else if (slide) {
            $.fancybox.stop(slide.$slide);

            slide.$slide.off().remove();
          }
        });

        self.slides = slides;
      }

      self.isAnimating = false;

      self.updateCursor();

      self.trigger("afterShow");

      // Play first html5 video/audio
      current.$slide
        .find("video,audio")
        .filter(":visible:first")
        .trigger("play");

      // Try to focus on the first focusable element
      if (
        $(document.activeElement).is("[disabled]") ||
        (current.opts.autoFocus && !(current.type == "image" || current.type === "iframe"))
      ) {
        self.focus();
      }
    },

    // Preload next and previous slides
    // ================================

    preload: function(type) {
      var self = this,
        next = self.slides[self.currPos + 1],
        prev = self.slides[self.currPos - 1];

      if (next && next.type === type) {
        self.loadSlide(next);
      }

      if (prev && prev.type === type) {
        self.loadSlide(prev);
      }
    },

    // Try to find and focus on the first focusable element
    // ====================================================

    focus: function() {
      var current = this.current,
        $el;

      if (this.isClosing) {
        return;
      }

      if (current && current.isComplete && current.$content) {
        // Look for first input with autofocus attribute
        $el = current.$content.find("input[autofocus]:enabled:visible:first");

        if (!$el.length) {
          $el = current.$content.find("button,:input,[tabindex],a").filter(":enabled:visible:first");
        }

        $el = $el && $el.length ? $el : current.$content;

        $el.trigger("focus");
      }
    },

    // Activates current instance - brings container to the front and enables keyboard,
    // notifies other instances about deactivating
    // =================================================================================

    activate: function() {
      var self = this;

      // Deactivate all instances
      $(".fancybox-container").each(function() {
        var instance = $(this).data("FancyBox");

        // Skip self and closing instances
        if (instance && instance.id !== self.id && !instance.isClosing) {
          instance.trigger("onDeactivate");

          instance.removeEvents();

          instance.isVisible = false;
        }
      });

      self.isVisible = true;

      if (self.current || self.isIdle) {
        self.update();

        self.updateControls();
      }

      self.trigger("onActivate");

      self.addEvents();
    },

    // Start closing procedure
    // This will start "zoom-out" animation if needed and clean everything up afterwards
    // =================================================================================

    close: function(e, d) {
      var self = this,
        current = self.current,
        effect,
        duration,
        $content,
        domRect,
        opacity,
        start,
        end;

      var done = function() {
        self.cleanUp(e);
      };

      if (self.isClosing) {
        return false;
      }

      self.isClosing = true;

      // If beforeClose callback prevents closing, make sure content is centered
      if (self.trigger("beforeClose", e) === false) {
        self.isClosing = false;

        requestAFrame(function() {
          self.update();
        });

        return false;
      }

      // Remove all events
      // If there are multiple instances, they will be set again by "activate" method
      self.removeEvents();

      if (current.timouts) {
        clearTimeout(current.timouts);
      }

      $content = current.$content;
      effect = current.opts.animationEffect;
      duration = $.isNumeric(d) ? d : effect ? current.opts.animationDuration : 0;

      // Remove other slides
      current.$slide
        .off(transitionEnd)
        .removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated");

      current.$slide
        .siblings()
        .trigger("onReset")
        .remove();

      // Trigger animations
      if (duration) {
        self.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing");
      }

      // Clean up
      self.hideLoading(current);

      self.hideControls();

      self.updateCursor();

      // Check if possible to zoom-out
      if (
        effect === "zoom" &&
        !(e !== true && $content && duration && current.type === "image" && !current.hasError && (end = self.getThumbPos(current)))
      ) {
        effect = "fade";
      }

      if (effect === "zoom") {
        $.fancybox.stop($content);

        domRect = $.fancybox.getTranslate($content);

        start = {
          top: domRect.top,
          left: domRect.left,
          scaleX: domRect.width / end.width,
          scaleY: domRect.height / end.height,
          width: end.width,
          height: end.height
        };

        // Check if we need to animate opacity
        opacity = current.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(current.width / current.height - end.width / end.height) > 0.1;
        }

        if (opacity) {
          end.opacity = 0;
        }

        $.fancybox.setTranslate($content, start);

        forceRedraw($content);

        $.fancybox.animate($content, end, duration, done);

        return true;
      }

      if (effect && duration) {
        // If skip animation
        if (e === true) {
          setTimeout(done, duration);
        } else {
          $.fancybox.animate(
            current.$slide.removeClass("fancybox-slide--current"),
            "fancybox-animated fancybox-slide--previous fancybox-fx-" + effect,
            duration,
            done
          );
        }
      } else {
        done();
      }

      return true;
    },

    // Final adjustments after removing the instance
    // =============================================

    cleanUp: function(e) {
      var self = this,
        $body = $("body"),
        instance,
        scrollTop;

      self.current.$slide.trigger("onReset");

      self.$refs.container.empty().remove();

      self.trigger("afterClose", e);

      // Place back focus
      if (self.$lastFocus && !!self.current.opts.backFocus) {
        self.$lastFocus.trigger("focus");
      }

      self.current = null;

      // Check if there are other instances
      instance = $.fancybox.getInstance();

      if (instance) {
        instance.activate();
      } else {
        $body.removeClass("fancybox-active compensate-for-scrollbar");

        $("#fancybox-style-noscroll").remove();
      }
    },

    // Call callback and trigger an event
    // ==================================

    trigger: function(name, slide) {
      var args = Array.prototype.slice.call(arguments, 1),
        self = this,
        obj = slide && slide.opts ? slide : self.current,
        rez;

      if (obj) {
        args.unshift(obj);
      } else {
        obj = self;
      }

      args.unshift(self);

      if ($.isFunction(obj.opts[name])) {
        rez = obj.opts[name].apply(obj, args);
      }

      if (rez === false) {
        return rez;
      }

      if (name === "afterClose" || !self.$refs) {
        $D.trigger(name + ".fb", args);
      } else {
        self.$refs.container.trigger(name + ".fb", args);
      }
    },

    // Update infobar values, navigation button states and reveal caption
    // ==================================================================

    updateControls: function(force) {
      var self = this,
        current = self.current,
        index = current.index,
        caption = current.opts.caption,
        $container = self.$refs.container,
        $caption = self.$refs.caption;

      // Recalculate content dimensions
      current.$slide.trigger("refresh");

      self.$caption = caption && caption.length ? $caption.html(caption) : null;

      if (!self.isHiddenControls && !self.isIdle) {
        self.showControls();
      }

      // Update info and navigation elements
      $container.find("[data-fancybox-count]").html(self.group.length);
      $container.find("[data-fancybox-index]").html(index + 1);

      $container.find("[data-fancybox-prev]").toggleClass("disabled", !current.opts.loop && index <= 0);
      $container.find("[data-fancybox-next]").toggleClass("disabled", !current.opts.loop && index >= self.group.length - 1);

      if (current.type === "image") {
        // Re-enable buttons; update download button source
        $container
          .find("[data-fancybox-zoom]")
          .show()
          .end()
          .find("[data-fancybox-download]")
          .attr("href", current.opts.image.src || current.src)
          .show();
      } else if (current.opts.toolbar) {
        $container.find("[data-fancybox-download],[data-fancybox-zoom]").hide();
      }
    },

    // Hide toolbar and caption
    // ========================

    hideControls: function() {
      this.isHiddenControls = true;

      this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav");
    },

    showControls: function() {
      var self = this,
        opts = self.current ? self.current.opts : self.opts,
        $container = self.$refs.container;

      self.isHiddenControls = false;
      self.idleSecondsCounter = 0;

      $container
        .toggleClass("fancybox-show-toolbar", !!(opts.toolbar && opts.buttons))
        .toggleClass("fancybox-show-infobar", !!(opts.infobar && self.group.length > 1))
        .toggleClass("fancybox-show-nav", !!(opts.arrows && self.group.length > 1))
        .toggleClass("fancybox-is-modal", !!opts.modal);

      if (self.$caption) {
        $container.addClass("fancybox-show-caption ");
      } else {
        $container.removeClass("fancybox-show-caption");
      }
    },

    // Toggle toolbar and caption
    // ==========================

    toggleControls: function() {
      if (this.isHiddenControls) {
        this.showControls();
      } else {
        this.hideControls();
      }
    }
  });

  $.fancybox = {
    version: "3.3.5",
    defaults: defaults,

    // Get current instance and execute a command.
    //
    // Examples of usage:
    //
    //   $instance = $.fancybox.getInstance();
    //   $.fancybox.getInstance().jumpTo( 1 );
    //   $.fancybox.getInstance( 'jumpTo', 1 );
    //   $.fancybox.getInstance( function() {
    //       console.info( this.currIndex );
    //   });
    // ======================================================

    getInstance: function(command) {
      var instance = $('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
        args = Array.prototype.slice.call(arguments, 1);

      if (instance instanceof FancyBox) {
        if ($.type(command) === "string") {
          instance[command].apply(instance, args);
        } else if ($.type(command) === "function") {
          command.apply(instance, args);
        }

        return instance;
      }

      return false;
    },

    // Create new instance
    // ===================

    open: function(items, opts, index) {
      return new FancyBox(items, opts, index);
    },

    // Close current or all instances
    // ==============================

    close: function(all) {
      var instance = this.getInstance();

      if (instance) {
        instance.close();

        // Try to find and close next instance

        if (all === true) {
          this.close();
        }
      }
    },

    // Close all instances and unbind all events
    // =========================================

    destroy: function() {
      this.close(true);

      $D.add("body").off("click.fb-start", "**");
    },

    // Try to detect mobile devices
    // ============================

    isMobile:
      document.createTouch !== undefined && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

    // Detect if 'translate3d' support is available
    // ============================================

    use3d: (function() {
      var div = document.createElement("div");

      return (
        window.getComputedStyle &&
        window.getComputedStyle(div) &&
        window.getComputedStyle(div).getPropertyValue("transform") &&
        !(document.documentMode && document.documentMode < 11)
      );
    })(),

    // Helper function to get current visual state of an element
    // returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
    // =====================================================================

    getTranslate: function($el) {
      var domRect;

      if (!$el || !$el.length) {
        return false;
      }

      domRect = $el[0].getBoundingClientRect();

      return {
        top: domRect.top || 0,
        left: domRect.left || 0,
        width: domRect.width,
        height: domRect.height,
        opacity: parseFloat($el.css("opacity"))
      };
    },

    // Shortcut for setting "translate3d" properties for element
    // Can set be used to set opacity, too
    // ========================================================

    setTranslate: function($el, props) {
      var str = "",
        css = {};

      if (!$el || !props) {
        return;
      }

      if (props.left !== undefined || props.top !== undefined) {
        str =
          (props.left === undefined ? $el.position().left : props.left) +
          "px, " +
          (props.top === undefined ? $el.position().top : props.top) +
          "px";

        if (this.use3d) {
          str = "translate3d(" + str + ", 0px)";
        } else {
          str = "translate(" + str + ")";
        }
      }

      if (props.scaleX !== undefined && props.scaleY !== undefined) {
        str = (str.length ? str + " " : "") + "scale(" + props.scaleX + ", " + props.scaleY + ")";
      }

      if (str.length) {
        css.transform = str;
      }

      if (props.opacity !== undefined) {
        css.opacity = props.opacity;
      }

      if (props.width !== undefined) {
        css.width = props.width;
      }

      if (props.height !== undefined) {
        css.height = props.height;
      }

      return $el.css(css);
    },

    // Simple CSS transition handler
    // =============================

    animate: function($el, to, duration, callback, leaveAnimationName) {
      var final = false;

      if ($.isFunction(duration)) {
        callback = duration;
        duration = null;
      }

      if (!$.isPlainObject(to)) {
        $el.removeAttr("style");
      }

      $.fancybox.stop($el);

      $el.on(transitionEnd, function(e) {
        // Skip events from child elements and z-index change
        if (e && e.originalEvent && (!$el.is(e.originalEvent.target) || e.originalEvent.propertyName == "z-index")) {
          return;
        }

        $.fancybox.stop($el);

        if (final) {
          $.fancybox.setTranslate($el, final);
        }

        if ($.isPlainObject(to)) {
          if (leaveAnimationName === false) {
            $el.removeAttr("style");
          }
        } else if (leaveAnimationName !== true) {
          $el.removeClass(to);
        }

        if ($.isFunction(callback)) {
          callback(e);
        }
      });

      if ($.isNumeric(duration)) {
        $el.css("transition-duration", duration + "ms");
      }

      // Start animation by changing CSS properties or class name
      if ($.isPlainObject(to)) {
        if (to.scaleX !== undefined && to.scaleY !== undefined) {
          final = $.extend({}, to, {
            width: $el.width() * to.scaleX,
            height: $el.height() * to.scaleY,
            scaleX: 1,
            scaleY: 1
          });

          delete to.width;
          delete to.height;

          if ($el.parent().hasClass("fancybox-slide--image")) {
            $el.parent().addClass("fancybox-is-scaling");
          }
        }

        $.fancybox.setTranslate($el, to);
      } else {
        $el.addClass(to);
      }

      // Make sure that `transitionend` callback gets fired
      $el.data(
        "timer",
        setTimeout(function() {
          $el.trigger("transitionend");
        }, duration + 16)
      );
    },

    stop: function($el) {
      if ($el && $el.length) {
        clearTimeout($el.data("timer"));

        $el.off("transitionend").css("transition-duration", "");

        $el.parent().removeClass("fancybox-is-scaling");
      }
    }
  };

  // Default click handler for "fancyboxed" links
  // ============================================

  function _run(e, opts) {
    var items = [],
      index = 0,
      $target,
      value;

    // Avoid opening multiple times
    if (e && e.isDefaultPrevented()) {
      return;
    }

    e.preventDefault();

    opts = e && e.data ? e.data.options : opts || {};

    $target = opts.$target || $(e.currentTarget);
    value = $target.attr("data-fancybox") || "";

    // Get all related items and find index for clicked one
    if (value) {
      items = opts.selector ? $(opts.selector) : e.data ? e.data.items : [];
      items = items.length ? items.filter('[data-fancybox="' + value + '"]') : $('[data-fancybox="' + value + '"]');

      index = items.index($target);

      // Sometimes current item can not be found (for example, if some script clones items)
      if (index < 0) {
        index = 0;
      }
    } else {
      items = [$target];
    }

    $.fancybox.open(items, opts, index);
  }

  // Create a jQuery plugin
  // ======================

  $.fn.fancybox = function(options) {
    var selector;

    options = options || {};
    selector = options.selector || false;

    if (selector) {
      // Use body element instead of document so it executes first
      $("body")
        .off("click.fb-start", selector)
        .on("click.fb-start", selector, {options: options}, _run);
    } else {
      this.off("click.fb-start").on(
        "click.fb-start",
        {
          items: this,
          options: options
        },
        _run
      );
    }

    return this;
  };

  // Self initializing plugin for all elements having `data-fancybox` attribute
  // ==========================================================================

  $D.on("click.fb-start", "[data-fancybox]", _run);

  // Enable "trigger elements"
  // =========================

  $D.on("click.fb-start", "[data-trigger]", function(e) {
    _run(e, {
      $target: $('[data-fancybox="' + $(e.currentTarget).attr("data-trigger") + '"]').eq($(e.currentTarget).attr("data-index") || 0),
      $trigger: $(this)
    });
  });
})(window, document, __webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================
(function($) {
  "use strict";

  // Formats matching url to final form

  var format = function(url, rez, params) {
    if (!url) {
      return;
    }

    params = params || "";

    if ($.type(params) === "object") {
      params = $.param(params, true);
    }

    $.each(rez, function(key, value) {
      url = url.replace("$" + key, value || "");
    });

    if (params.length) {
      url += (url.indexOf("?") > 0 ? "&" : "?") + params;
    }

    return url;
  };

  // Object containing properties for each media type

  var defaults = {
    youtube: {
      matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
      params: {
        autoplay: 1,
        autohide: 1,
        fs: 1,
        rel: 0,
        hd: 1,
        wmode: "transparent",
        enablejsapi: 1,
        html5: 1
      },
      paramPlace: 8,
      type: "iframe",
      url: "//www.youtube.com/embed/$4",
      thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
    },

    vimeo: {
      matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
      params: {
        autoplay: 1,
        hd: 1,
        show_title: 1,
        show_byline: 1,
        show_portrait: 0,
        fullscreen: 1,
        api: 1
      },
      paramPlace: 3,
      type: "iframe",
      url: "//player.vimeo.com/video/$2"
    },

    instagram: {
      matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
      type: "image",
      url: "//$1/p/$2/media/?size=l"
    },

    // Examples:
    // http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
    // https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
    // https://www.google.com/maps/@52.2111123,2.9237542,6.61z?hl=en
    // https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
    gmap_place: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
      type: "iframe",
      url: function(rez) {
        return (
          "//maps.google." +
          rez[2] +
          "/?ll=" +
          (rez[9] ? rez[9] + "&z=" + Math.floor(rez[10]) + (rez[12] ? rez[12].replace(/^\//, "&") : "") : rez[12] + "").replace(/\?/, "&") +
          "&output=" +
          (rez[12] && rez[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
        );
      }
    },

    // Examples:
    // https://www.google.com/maps/search/Empire+State+Building/
    // https://www.google.com/maps/search/?api=1&query=centurylink+field
    // https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
    gmap_search: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
      type: "iframe",
      url: function(rez) {
        return "//maps.google." + rez[2] + "/maps?q=" + rez[5].replace("query=", "q=").replace("api=1", "") + "&output=embed";
      }
    }
  };

  $(document).on("objectNeedsType.fb", function(e, instance, item) {
    var url = item.src || "",
      type = false,
      media,
      thumb,
      rez,
      params,
      urlParams,
      paramObj,
      provider;

    media = $.extend(true, {}, defaults, item.opts.media);

    // Look for any matching media type
    $.each(media, function(providerName, providerOpts) {
      rez = url.match(providerOpts.matcher);

      if (!rez) {
        return;
      }

      type = providerOpts.type;
      provider = providerName;
      paramObj = {};

      if (providerOpts.paramPlace && rez[providerOpts.paramPlace]) {
        urlParams = rez[providerOpts.paramPlace];

        if (urlParams[0] == "?") {
          urlParams = urlParams.substring(1);
        }

        urlParams = urlParams.split("&");

        for (var m = 0; m < urlParams.length; ++m) {
          var p = urlParams[m].split("=", 2);

          if (p.length == 2) {
            paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
          }
        }
      }

      params = $.extend(true, {}, providerOpts.params, item.opts[providerName], paramObj);

      url =
        $.type(providerOpts.url) === "function" ? providerOpts.url.call(this, rez, params, item) : format(providerOpts.url, rez, params);

      thumb =
        $.type(providerOpts.thumb) === "function" ? providerOpts.thumb.call(this, rez, params, item) : format(providerOpts.thumb, rez);

      if (providerName === "youtube") {
        url = url.replace(/&t=((\d+)m)?(\d+)s/, function(match, p1, m, s) {
          return "&start=" + ((m ? parseInt(m, 10) * 60 : 0) + parseInt(s, 10));
        });
      } else if (providerName === "vimeo") {
        url = url.replace("&%23", "#");
      }

      return false;
    });

    // If it is found, then change content type and update the url

    if (type) {
      if (!item.opts.thumb && !(item.opts.$thumb && item.opts.$thumb.length)) {
        item.opts.thumb = thumb;
      }

      if (type === "iframe") {
        item.opts = $.extend(true, item.opts, {
          iframe: {
            preload: false,
            attr: {
              scrolling: "no"
            }
          }
        });
      }

      $.extend(item, {
        type: type,
        src: url,
        origSrc: item.src,
        contentSource: provider,
        contentType: type === "image" ? "image" : provider == "gmap_place" || provider == "gmap_search" ? "map" : "video"
      });
    } else if (url) {
      item.type = item.opts.defaultType;
    }
  });
})(__webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// Guestures
// Adds touch guestures, handles click and tap events
//
// ==========================================================================
(function(window, document, $) {
  "use strict";

  var requestAFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      // if all else fails, use setTimeout
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  var cancelAFrame = (function() {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      function(id) {
        window.clearTimeout(id);
      }
    );
  })();

  var getPointerXY = function(e) {
    var result = [];

    e = e.originalEvent || e || window.e;
    e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];

    for (var key in e) {
      if (e[key].pageX) {
        result.push({
          x: e[key].pageX,
          y: e[key].pageY
        });
      } else if (e[key].clientX) {
        result.push({
          x: e[key].clientX,
          y: e[key].clientY
        });
      }
    }

    return result;
  };

  var distance = function(point2, point1, what) {
    if (!point1 || !point2) {
      return 0;
    }

    if (what === "x") {
      return point2.x - point1.x;
    } else if (what === "y") {
      return point2.y - point1.y;
    }

    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  };

  var isClickable = function($el) {
    if (
      $el.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio') ||
      $.isFunction($el.get(0).onclick) ||
      $el.data("selectable")
    ) {
      return true;
    }

    // Check for attributes like data-fancybox-next or data-fancybox-close
    for (var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++) {
      if (atts[i].nodeName.substr(0, 14) === "data-fancybox-") {
        return true;
      }
    }

    return false;
  };

  var hasScrollbars = function(el) {
    var overflowY = window.getComputedStyle(el)["overflow-y"],
      overflowX = window.getComputedStyle(el)["overflow-x"],
      vertical = (overflowY === "scroll" || overflowY === "auto") && el.scrollHeight > el.clientHeight,
      horizontal = (overflowX === "scroll" || overflowX === "auto") && el.scrollWidth > el.clientWidth;

    return vertical || horizontal;
  };

  var isScrollable = function($el) {
    var rez = false;

    while (true) {
      rez = hasScrollbars($el.get(0));

      if (rez) {
        break;
      }

      $el = $el.parent();

      if (!$el.length || $el.hasClass("fancybox-stage") || $el.is("body")) {
        break;
      }
    }

    return rez;
  };

  var Guestures = function(instance) {
    var self = this;

    self.instance = instance;

    self.$bg = instance.$refs.bg;
    self.$stage = instance.$refs.stage;
    self.$container = instance.$refs.container;

    self.destroy();

    self.$container.on("touchstart.fb.touch mousedown.fb.touch", $.proxy(self, "ontouchstart"));
  };

  Guestures.prototype.destroy = function() {
    this.$container.off(".fb.touch");
  };

  Guestures.prototype.ontouchstart = function(e) {
    var self = this,
      $target = $(e.target),
      instance = self.instance,
      current = instance.current,
      $content = current.$content,
      isTouchDevice = e.type == "touchstart";

    // Do not respond to both (touch and mouse) events
    if (isTouchDevice) {
      self.$container.off("mousedown.fb.touch");
    }

    // Ignore right click
    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    }

    // Ignore taping on links, buttons, input elements
    if (!$target.length || isClickable($target) || isClickable($target.parent())) {
      return;
    }

    // Ignore clicks on the scrollbar
    if (!$target.is("img") && e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left) {
      return;
    }

    // Ignore clicks while zooming or closing
    if (!current || instance.isAnimating || instance.isClosing) {
      e.stopPropagation();
      e.preventDefault();

      return;
    }

    self.realPoints = self.startPoints = getPointerXY(e);

    if (!self.startPoints.length) {
      return;
    }

    e.stopPropagation();

    self.startEvent = e;

    self.canTap = true;
    self.$target = $target;
    self.$content = $content;
    self.opts = current.opts.touch;

    self.isPanning = false;
    self.isSwiping = false;
    self.isZooming = false;
    self.isScrolling = false;

    self.startTime = new Date().getTime();
    self.distanceX = self.distanceY = self.distance = 0;

    self.canvasWidth = Math.round(current.$slide[0].clientWidth);
    self.canvasHeight = Math.round(current.$slide[0].clientHeight);

    self.contentLastPos = null;
    self.contentStartPos = $.fancybox.getTranslate(self.$content) || {top: 0, left: 0};
    self.sliderStartPos = self.sliderLastPos || $.fancybox.getTranslate(current.$slide);

    // Since position will be absolute, but we need to make it relative to the stage
    self.stagePos = $.fancybox.getTranslate(instance.$refs.stage);

    self.sliderStartPos.top -= self.stagePos.top;
    self.sliderStartPos.left -= self.stagePos.left;

    self.contentStartPos.top -= self.stagePos.top;
    self.contentStartPos.left -= self.stagePos.left;

    $(document)
      .off(".fb.touch")
      .on(isTouchDevice ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", $.proxy(self, "ontouchend"))
      .on(isTouchDevice ? "touchmove.fb.touch" : "mousemove.fb.touch", $.proxy(self, "ontouchmove"));

    if ($.fancybox.isMobile) {
      document.addEventListener("scroll", self.onscroll, true);
    }

    if (!(self.opts || instance.canPan()) || !($target.is(self.$stage) || self.$stage.find($target).length)) {
      if ($target.is(".fancybox-image")) {
        e.preventDefault();
      }

      return;
    }

    if (!($.fancybox.isMobile && (isScrollable($target) || isScrollable($target.parent())))) {
      e.preventDefault();
    }

    if (self.startPoints.length === 1 || current.hasError) {
      if (self.instance.canPan()) {
        $.fancybox.stop(self.$content);

        self.$content.css("transition-duration", "");

        self.isPanning = true;
      } else {
        self.isSwiping = true;
      }

      self.$container.addClass("fancybox-controls--isGrabbing");
    }

    if (self.startPoints.length === 2 && current.type === "image" && (current.isLoaded || current.$ghost)) {
      self.canTap = false;
      self.isSwiping = false;
      self.isPanning = false;

      self.isZooming = true;

      $.fancybox.stop(self.$content);

      self.$content.css("transition-duration", "");

      self.centerPointStartX = (self.startPoints[0].x + self.startPoints[1].x) * 0.5 - $(window).scrollLeft();
      self.centerPointStartY = (self.startPoints[0].y + self.startPoints[1].y) * 0.5 - $(window).scrollTop();

      self.percentageOfImageAtPinchPointX = (self.centerPointStartX - self.contentStartPos.left) / self.contentStartPos.width;
      self.percentageOfImageAtPinchPointY = (self.centerPointStartY - self.contentStartPos.top) / self.contentStartPos.height;

      self.startDistanceBetweenFingers = distance(self.startPoints[0], self.startPoints[1]);
    }
  };

  Guestures.prototype.onscroll = function(e) {
    var self = this;

    self.isScrolling = true;

    document.removeEventListener("scroll", self.onscroll, true);
  };

  Guestures.prototype.ontouchmove = function(e) {
    var self = this,
      $target = $(e.target);

    // Make sure user has not released over iframe or disabled element
    if (e.originalEvent.buttons !== undefined && e.originalEvent.buttons === 0) {
      self.ontouchend(e);
      return;
    }

    if (self.isScrolling || !($target.is(self.$stage) || self.$stage.find($target).length)) {
      self.canTap = false;

      return;
    }

    self.newPoints = getPointerXY(e);

    if (!(self.opts || self.instance.canPan()) || !self.newPoints.length || !self.newPoints.length) {
      return;
    }

    if (!(self.isSwiping && self.isSwiping === true)) {
      e.preventDefault();
    }

    self.distanceX = distance(self.newPoints[0], self.startPoints[0], "x");
    self.distanceY = distance(self.newPoints[0], self.startPoints[0], "y");

    self.distance = distance(self.newPoints[0], self.startPoints[0]);

    // Skip false ontouchmove events (Chrome)
    if (self.distance > 0) {
      if (self.isSwiping) {
        self.onSwipe(e);
      } else if (self.isPanning) {
        self.onPan();
      } else if (self.isZooming) {
        self.onZoom();
      }
    }
  };

  Guestures.prototype.onSwipe = function(e) {
    var self = this,
      swiping = self.isSwiping,
      left = self.sliderStartPos.left || 0,
      angle;

    // If direction is not yet determined
    if (swiping === true) {
      // We need at least 10px distance to correctly calculate an angle
      if (Math.abs(self.distance) > 10) {
        self.canTap = false;

        if (self.instance.group.length < 2 && self.opts.vertical) {
          self.isSwiping = "y";
        } else if (self.instance.isDragging || self.opts.vertical === false || (self.opts.vertical === "auto" && $(window).width() > 800)) {
          self.isSwiping = "x";
        } else {
          angle = Math.abs(Math.atan2(self.distanceY, self.distanceX) * 180 / Math.PI);

          self.isSwiping = angle > 45 && angle < 135 ? "y" : "x";
        }

        self.canTap = false;

        if (self.isSwiping === "y" && $.fancybox.isMobile && (isScrollable(self.$target) || isScrollable(self.$target.parent()))) {
          self.isScrolling = true;

          return;
        }

        self.instance.isDragging = self.isSwiping;

        // Reset points to avoid jumping, because we dropped first swipes to calculate the angle
        self.startPoints = self.newPoints;

        $.each(self.instance.slides, function(index, slide) {
          $.fancybox.stop(slide.$slide);

          slide.$slide.css("transition-duration", "");

          slide.inTransition = false;

          if (slide.pos === self.instance.current.pos) {
            self.sliderStartPos.left = $.fancybox.getTranslate(slide.$slide).left - $.fancybox.getTranslate(self.instance.$refs.stage).left;
          }
        });

        // Stop slideshow
        if (self.instance.SlideShow && self.instance.SlideShow.isActive) {
          self.instance.SlideShow.stop();
        }
      }

      return;
    }

    // Sticky edges
    if (swiping == "x") {
      if (
        self.distanceX > 0 &&
        (self.instance.group.length < 2 || (self.instance.current.index === 0 && !self.instance.current.opts.loop))
      ) {
        left = left + Math.pow(self.distanceX, 0.8);
      } else if (
        self.distanceX < 0 &&
        (self.instance.group.length < 2 ||
          (self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop))
      ) {
        left = left - Math.pow(-self.distanceX, 0.8);
      } else {
        left = left + self.distanceX;
      }
    }

    self.sliderLastPos = {
      top: swiping == "x" ? 0 : self.sliderStartPos.top + self.distanceY,
      left: left
    };

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.requestId = requestAFrame(function() {
      if (self.sliderLastPos) {
        $.each(self.instance.slides, function(index, slide) {
          var pos = slide.pos - self.instance.currPos;

          $.fancybox.setTranslate(slide.$slide, {
            top: self.sliderLastPos.top,
            left: self.sliderLastPos.left + pos * self.canvasWidth + pos * slide.opts.gutter
          });
        });

        self.$container.addClass("fancybox-is-sliding");
      }
    });
  };

  Guestures.prototype.onPan = function() {
    var self = this;

    // Prevent accidental movement (sometimes, when tapping casually, finger can move a bit)
    if (distance(self.newPoints[0], self.realPoints[0]) < ($.fancybox.isMobile ? 10 : 5)) {
      self.startPoints = self.newPoints;
      return;
    }

    self.canTap = false;

    self.contentLastPos = self.limitMovement();

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.requestId = requestAFrame(function() {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  };

  // Make panning sticky to the edges
  Guestures.prototype.limitMovement = function() {
    var self = this;

    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;

    var distanceX = self.distanceX;
    var distanceY = self.distanceY;

    var contentStartPos = self.contentStartPos;

    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;

    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;

    var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY, newOffsetX, newOffsetY;

    if (currentWidth > canvasWidth) {
      newOffsetX = currentOffsetX + distanceX;
    } else {
      newOffsetX = currentOffsetX;
    }

    newOffsetY = currentOffsetY + distanceY;

    // Slow down proportionally to traveled distance
    minTranslateX = Math.max(0, canvasWidth * 0.5 - currentWidth * 0.5);
    minTranslateY = Math.max(0, canvasHeight * 0.5 - currentHeight * 0.5);

    maxTranslateX = Math.min(canvasWidth - currentWidth, canvasWidth * 0.5 - currentWidth * 0.5);
    maxTranslateY = Math.min(canvasHeight - currentHeight, canvasHeight * 0.5 - currentHeight * 0.5);

    //   ->
    if (distanceX > 0 && newOffsetX > minTranslateX) {
      newOffsetX = minTranslateX - 1 + Math.pow(-minTranslateX + currentOffsetX + distanceX, 0.8) || 0;
    }

    //    <-
    if (distanceX < 0 && newOffsetX < maxTranslateX) {
      newOffsetX = maxTranslateX + 1 - Math.pow(maxTranslateX - currentOffsetX - distanceX, 0.8) || 0;
    }

    //   \/
    if (distanceY > 0 && newOffsetY > minTranslateY) {
      newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, 0.8) || 0;
    }

    //   /\
    if (distanceY < 0 && newOffsetY < maxTranslateY) {
      newOffsetY = maxTranslateY + 1 - Math.pow(maxTranslateY - currentOffsetY - distanceY, 0.8) || 0;
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.limitPosition = function(newOffsetX, newOffsetY, newWidth, newHeight) {
    var self = this;

    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;

    if (newWidth > canvasWidth) {
      newOffsetX = newOffsetX > 0 ? 0 : newOffsetX;
      newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX;
    } else {
      // Center horizontally
      newOffsetX = Math.max(0, canvasWidth / 2 - newWidth / 2);
    }

    if (newHeight > canvasHeight) {
      newOffsetY = newOffsetY > 0 ? 0 : newOffsetY;
      newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY;
    } else {
      // Center vertically
      newOffsetY = Math.max(0, canvasHeight / 2 - newHeight / 2);
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.onZoom = function() {
    var self = this;

    // Calculate current distance between points to get pinch ratio and new width and height
    var contentStartPos = self.contentStartPos;

    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;

    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;

    var endDistanceBetweenFingers = distance(self.newPoints[0], self.newPoints[1]);

    var pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers;

    var newWidth = Math.floor(currentWidth * pinchRatio);
    var newHeight = Math.floor(currentHeight * pinchRatio);

    // This is the translation due to pinch-zooming
    var translateFromZoomingX = (currentWidth - newWidth) * self.percentageOfImageAtPinchPointX;
    var translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY;

    // Point between the two touches
    var centerPointEndX = (self.newPoints[0].x + self.newPoints[1].x) / 2 - $(window).scrollLeft();
    var centerPointEndY = (self.newPoints[0].y + self.newPoints[1].y) / 2 - $(window).scrollTop();

    // And this is the translation due to translation of the centerpoint
    // between the two fingers
    var translateFromTranslatingX = centerPointEndX - self.centerPointStartX;
    var translateFromTranslatingY = centerPointEndY - self.centerPointStartY;

    // The new offset is the old/current one plus the total translation
    var newOffsetX = currentOffsetX + (translateFromZoomingX + translateFromTranslatingX);
    var newOffsetY = currentOffsetY + (translateFromZoomingY + translateFromTranslatingY);

    var newPos = {
      top: newOffsetY,
      left: newOffsetX,
      scaleX: pinchRatio,
      scaleY: pinchRatio
    };

    self.canTap = false;

    self.newWidth = newWidth;
    self.newHeight = newHeight;

    self.contentLastPos = newPos;

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.requestId = requestAFrame(function() {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  };

  Guestures.prototype.ontouchend = function(e) {
    var self = this;
    var dMs = Math.max(new Date().getTime() - self.startTime, 1);

    var swiping = self.isSwiping;
    var panning = self.isPanning;
    var zooming = self.isZooming;
    var scrolling = self.isScrolling;

    self.endPoints = getPointerXY(e);

    self.$container.removeClass("fancybox-controls--isGrabbing");

    $(document).off(".fb.touch");

    document.removeEventListener("scroll", self.onscroll, true);

    if (self.requestId) {
      cancelAFrame(self.requestId);

      self.requestId = null;
    }

    self.isSwiping = false;
    self.isPanning = false;
    self.isZooming = false;
    self.isScrolling = false;

    self.instance.isDragging = false;

    if (self.canTap) {
      return self.onTap(e);
    }

    self.speed = 366;

    // Speed in px/ms
    self.velocityX = self.distanceX / dMs * 0.5;
    self.velocityY = self.distanceY / dMs * 0.5;

    self.speedX = Math.max(self.speed * 0.5, Math.min(self.speed * 1.5, 1 / Math.abs(self.velocityX) * self.speed));

    if (panning) {
      self.endPanning();
    } else if (zooming) {
      self.endZooming();
    } else {
      self.endSwiping(swiping, scrolling);
    }

    return;
  };

  Guestures.prototype.endSwiping = function(swiping, scrolling) {
    var self = this,
      ret = false,
      len = self.instance.group.length;

    self.sliderLastPos = null;

    // Close if swiped vertically / navigate if horizontally
    if (swiping == "y" && !scrolling && Math.abs(self.distanceY) > 50) {
      // Continue vertical movement
      $.fancybox.animate(
        self.instance.current.$slide,
        {
          top: self.sliderStartPos.top + self.distanceY + self.velocityY * 150,
          opacity: 0
        },
        200
      );

      ret = self.instance.close(true, 200);
    } else if (swiping == "x" && self.distanceX > 50 && len > 1) {
      ret = self.instance.previous(self.speedX);
    } else if (swiping == "x" && self.distanceX < -50 && len > 1) {
      ret = self.instance.next(self.speedX);
    }

    if (ret === false && (swiping == "x" || swiping == "y")) {
      if (scrolling || len < 2) {
        self.instance.centerSlide(self.instance.current, 150);
      } else {
        self.instance.jumpTo(self.instance.current.index);
      }
    }

    self.$container.removeClass("fancybox-is-sliding");
  };

  // Limit panning from edges
  // ========================
  Guestures.prototype.endPanning = function() {
    var self = this;
    var newOffsetX, newOffsetY, newPos;

    if (!self.contentLastPos) {
      return;
    }

    if (self.opts.momentum === false) {
      newOffsetX = self.contentLastPos.left;
      newOffsetY = self.contentLastPos.top;
    } else {
      // Continue movement
      newOffsetX = self.contentLastPos.left + self.velocityX * self.speed;
      newOffsetY = self.contentLastPos.top + self.velocityY * self.speed;
    }

    newPos = self.limitPosition(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height);

    newPos.width = self.contentStartPos.width;
    newPos.height = self.contentStartPos.height;

    $.fancybox.animate(self.$content, newPos, 330);
  };

  Guestures.prototype.endZooming = function() {
    var self = this;

    var current = self.instance.current;

    var newOffsetX, newOffsetY, newPos, reset;

    var newWidth = self.newWidth;
    var newHeight = self.newHeight;

    if (!self.contentLastPos) {
      return;
    }

    newOffsetX = self.contentLastPos.left;
    newOffsetY = self.contentLastPos.top;

    reset = {
      top: newOffsetY,
      left: newOffsetX,
      width: newWidth,
      height: newHeight,
      scaleX: 1,
      scaleY: 1
    };

    // Reset scalex/scaleY values; this helps for perfomance and does not break animation
    $.fancybox.setTranslate(self.$content, reset);

    if (newWidth < self.canvasWidth && newHeight < self.canvasHeight) {
      self.instance.scaleToFit(150);
    } else if (newWidth > current.width || newHeight > current.height) {
      self.instance.scaleToActual(self.centerPointStartX, self.centerPointStartY, 150);
    } else {
      newPos = self.limitPosition(newOffsetX, newOffsetY, newWidth, newHeight);

      // Switch from scale() to width/height or animation will not work correctly
      $.fancybox.setTranslate(self.$content, $.fancybox.getTranslate(self.$content));

      $.fancybox.animate(self.$content, newPos, 150);
    }
  };

  Guestures.prototype.onTap = function(e) {
    var self = this;
    var $target = $(e.target);

    var instance = self.instance;
    var current = instance.current;

    var endPoints = (e && getPointerXY(e)) || self.startPoints;

    var tapX = endPoints[0] ? endPoints[0].x - $(window).scrollLeft() - self.stagePos.left : 0;
    var tapY = endPoints[0] ? endPoints[0].y - $(window).scrollTop() - self.stagePos.top : 0;

    var where;

    var process = function(prefix) {
      var action = current.opts[prefix];

      if ($.isFunction(action)) {
        action = action.apply(instance, [current, e]);
      }

      if (!action) {
        return;
      }

      switch (action) {
        case "close":
          instance.close(self.startEvent);

          break;

        case "toggleControls":
          instance.toggleControls(true);

          break;

        case "next":
          instance.next();

          break;

        case "nextOrClose":
          if (instance.group.length > 1) {
            instance.next();
          } else {
            instance.close(self.startEvent);
          }

          break;

        case "zoom":
          if (current.type == "image" && (current.isLoaded || current.$ghost)) {
            if (instance.canPan()) {
              instance.scaleToFit();
            } else if (instance.isScaledDown()) {
              instance.scaleToActual(tapX, tapY);
            } else if (instance.group.length < 2) {
              instance.close(self.startEvent);
            }
          }

          break;
      }
    };

    // Ignore right click
    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    }

    // Skip if clicked on the scrollbar
    if (!$target.is("img") && tapX > $target[0].clientWidth + $target.offset().left) {
      return;
    }

    // Check where is clicked
    if ($target.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) {
      where = "Outside";
    } else if ($target.is(".fancybox-slide")) {
      where = "Slide";
    } else if (
      instance.current.$content &&
      instance.current.$content
        .find($target)
        .addBack()
        .filter($target).length
    ) {
      where = "Content";
    } else {
      return;
    }

    // Check if this is a double tap
    if (self.tapped) {
      // Stop previously created single tap
      clearTimeout(self.tapped);
      self.tapped = null;

      // Skip if distance between taps is too big
      if (Math.abs(tapX - self.tapX) > 50 || Math.abs(tapY - self.tapY) > 50) {
        return this;
      }

      // OK, now we assume that this is a double-tap
      process("dblclick" + where);
    } else {
      // Single tap will be processed if user has not clicked second time within 300ms
      // or there is no need to wait for double-tap
      self.tapX = tapX;
      self.tapY = tapY;

      if (current.opts["dblclick" + where] && current.opts["dblclick" + where] !== current.opts["click" + where]) {
        self.tapped = setTimeout(function() {
          self.tapped = null;

          process("click" + where);
        }, 500);
      } else {
        process("click" + where);
      }
    }

    return this;
  };

  $(document).on("onActivate.fb", function(e, instance) {
    if (instance && !instance.Guestures) {
      instance.Guestures = new Guestures(instance);
    }
  });
})(window, document, __webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================
(function(document, $) {
  "use strict";

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      slideShow:
        '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M13,12 L27,20 L13,27 Z" />' +
        '<path d="M15,10 v19 M23,10 v19" />' +
        "</svg>" +
        "</button>"
    },
    slideShow: {
      autoStart: false,
      speed: 3000
    }
  });

  var SlideShow = function(instance) {
    this.instance = instance;
    this.init();
  };

  $.extend(SlideShow.prototype, {
    timer: null,
    isActive: false,
    $button: null,

    init: function() {
      var self = this;

      self.$button = self.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
        self.toggle();
      });

      if (self.instance.group.length < 2 || !self.instance.group[self.instance.currIndex].opts.slideShow) {
        self.$button.hide();
      }
    },

    set: function(force) {
      var self = this;

      // Check if reached last element
      if (
        self.instance &&
        self.instance.current &&
        (force === true || self.instance.current.opts.loop || self.instance.currIndex < self.instance.group.length - 1)
      ) {
        self.timer = setTimeout(function() {
          if (self.isActive) {
            self.instance.jumpTo((self.instance.currIndex + 1) % self.instance.group.length);
          }
        }, self.instance.current.opts.slideShow.speed);
      } else {
        self.stop();
        self.instance.idleSecondsCounter = 0;
        self.instance.showControls();
      }
    },

    clear: function() {
      var self = this;

      clearTimeout(self.timer);

      self.timer = null;
    },

    start: function() {
      var self = this;
      var current = self.instance.current;

      if (current) {
        self.isActive = true;

        self.$button
          .attr("title", current.opts.i18n[current.opts.lang].PLAY_STOP)
          .removeClass("fancybox-button--play")
          .addClass("fancybox-button--pause");

        self.set(true);
      }
    },

    stop: function() {
      var self = this;
      var current = self.instance.current;

      self.clear();

      self.$button
        .attr("title", current.opts.i18n[current.opts.lang].PLAY_START)
        .removeClass("fancybox-button--pause")
        .addClass("fancybox-button--play");

      self.isActive = false;
    },

    toggle: function() {
      var self = this;

      if (self.isActive) {
        self.stop();
      } else {
        self.start();
      }
    }
  });

  $(document).on({
    "onInit.fb": function(e, instance) {
      if (instance && !instance.SlideShow) {
        instance.SlideShow = new SlideShow(instance);
      }
    },

    "beforeShow.fb": function(e, instance, current, firstRun) {
      var SlideShow = instance && instance.SlideShow;

      if (firstRun) {
        if (SlideShow && current.opts.slideShow.autoStart) {
          SlideShow.start();
        }
      } else if (SlideShow && SlideShow.isActive) {
        SlideShow.clear();
      }
    },

    "afterShow.fb": function(e, instance, current) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow && SlideShow.isActive) {
        SlideShow.set();
      }
    },

    "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
      var SlideShow = instance && instance.SlideShow;

      // "P" or Spacebar
      if (SlideShow && current.opts.slideShow && (keycode === 80 || keycode === 32) && !$(document.activeElement).is("button,a,input")) {
        keypress.preventDefault();

        SlideShow.toggle();
      }
    },

    "beforeClose.fb onDeactivate.fb": function(e, instance) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow) {
        SlideShow.stop();
      }
    }
  });

  // Page Visibility API to pause slideshow when window is not active
  $(document).on("visibilitychange", function() {
    var instance = $.fancybox.getInstance();
    var SlideShow = instance && instance.SlideShow;

    if (SlideShow && SlideShow.isActive) {
      if (document.hidden) {
        SlideShow.clear();
      } else {
        SlideShow.set();
      }
    }
  });
})(document, __webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
//
// ==========================================================================
(function(document, $) {
  "use strict";

  // Collection of methods supported by user browser
  var fn = (function() {
    var fnMap = [
      ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
      // new WebKit
      [
        "webkitRequestFullscreen",
        "webkitExitFullscreen",
        "webkitFullscreenElement",
        "webkitFullscreenEnabled",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      // old WebKit (Safari 5.1)
      [
        "webkitRequestFullScreen",
        "webkitCancelFullScreen",
        "webkitCurrentFullScreenElement",
        "webkitCancelFullScreen",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
      ],
      [
        "mozRequestFullScreen",
        "mozCancelFullScreen",
        "mozFullScreenElement",
        "mozFullScreenEnabled",
        "mozfullscreenchange",
        "mozfullscreenerror"
      ],
      ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
    ];

    var ret = {};

    for (var i = 0; i < fnMap.length; i++) {
      var val = fnMap[i];

      if (val && val[1] in document) {
        for (var j = 0; j < val.length; j++) {
          ret[fnMap[0][j]] = val[j];
        }

        return ret;
      }
    }

    return false;
  })();

  // If browser does not have Full Screen API, then simply unset default button template and stop
  if (!fn) {
    if ($ && $.fancybox) {
      $.fancybox.defaults.btnTpl.fullScreen = false;
    }

    return;
  }

  var FullScreen = {
    request: function(elem) {
      elem = elem || document.documentElement;

      elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT);
    },
    exit: function() {
      document[fn.exitFullscreen]();
    },
    toggle: function(elem) {
      elem = elem || document.documentElement;

      if (this.isFullscreen()) {
        this.exit();
      } else {
        this.request(elem);
      }
    },
    isFullscreen: function() {
      return Boolean(document[fn.fullscreenElement]);
    },
    enabled: function() {
      return Boolean(document[fn.fullscreenEnabled]);
    }
  };

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      fullScreen:
        '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M9,12 v16 h22 v-16 h-22 v8" />' +
        "</svg>" +
        "</button>"
    },
    fullScreen: {
      autoStart: false
    }
  });

  $(document).on({
    "onInit.fb": function(e, instance) {
      var $container;

      if (instance && instance.group[instance.currIndex].opts.fullScreen) {
        $container = instance.$refs.container;

        $container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(e) {
          e.stopPropagation();
          e.preventDefault();

          FullScreen.toggle();
        });

        if (instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true) {
          FullScreen.request();
        }

        // Expose API
        instance.FullScreen = FullScreen;
      } else if (instance) {
        instance.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
      }
    },

    "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
      // "F"
      if (instance && instance.FullScreen && keycode === 70) {
        keypress.preventDefault();

        instance.FullScreen.toggle();
      }
    },

    "beforeClose.fb": function(e, instance) {
      if (instance && instance.FullScreen && instance.$refs.container.hasClass("fancybox-is-fullscreen")) {
        FullScreen.exit();
      }
    }
  });

  $(document).on(fn.fullscreenchange, function() {
    var isFullscreen = FullScreen.isFullscreen(),
      instance = $.fancybox.getInstance();

    if (instance) {
      // If image is zooming, then force to stop and reposition properly
      if (instance.current && instance.current.type === "image" && instance.isAnimating) {
        instance.current.$content.css("transition", "none");

        instance.isAnimating = false;

        instance.update(true, true, 0);
      }

      instance.trigger("onFullscreenChange", isFullscreen);

      instance.$refs.container.toggleClass("fancybox-is-fullscreen", isFullscreen);
    }
  });
})(document, __webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================
(function(document, $) {
  "use strict";

  var CLASS = "fancybox-thumbs",
    CLASS_ACTIVE = CLASS + "-active",
    CLASS_LOAD = CLASS + "-loading";

  // Make sure there are default values
  $.fancybox.defaults = $.extend(
    true,
    {
      btnTpl: {
        thumbs:
          '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
          '<svg viewBox="0 0 120 120">' +
          '<path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" />' +
          "</svg>" +
          "</button>"
      },
      thumbs: {
        autoStart: false, // Display thumbnails on opening
        hideOnClose: true, // Hide thumbnail grid when closing animation starts
        parentEl: ".fancybox-container", // Container is injected into this element
        axis: "y" // Vertical (y) or horizontal (x) scrolling
      }
    },
    $.fancybox.defaults
  );

  var FancyThumbs = function(instance) {
    this.init(instance);
  };

  $.extend(FancyThumbs.prototype, {
    $button: null,
    $grid: null,
    $list: null,
    isVisible: false,
    isActive: false,

    init: function(instance) {
      var self = this,
        first,
        second;

      self.instance = instance;

      instance.Thumbs = self;

      self.opts = instance.group[instance.currIndex].opts.thumbs;

      // Enable thumbs if at least two group items have thumbnails
      first = instance.group[0];
      first = first.opts.thumb || (first.opts.$thumb && first.opts.$thumb.length ? first.opts.$thumb.attr("src") : false);

      if (instance.group.length > 1) {
        second = instance.group[1];
        second = second.opts.thumb || (second.opts.$thumb && second.opts.$thumb.length ? second.opts.$thumb.attr("src") : false);
      }

      self.$button = instance.$refs.toolbar.find("[data-fancybox-thumbs]");

      if (self.opts && first && second && first && second) {
        self.$button.show().on("click", function() {
          self.toggle();
        });

        self.isActive = true;
      } else {
        self.$button.hide();
      }
    },

    create: function() {
      var self = this,
        instance = self.instance,
        parentEl = self.opts.parentEl,
        list = [],
        src;

      if (!self.$grid) {
        // Create main element
        self.$grid = $('<div class="' + CLASS + " " + CLASS + "-" + self.opts.axis + '"></div>').appendTo(
          instance.$refs.container
            .find(parentEl)
            .addBack()
            .filter(parentEl)
        );

        // Add "click" event that performs gallery navigation
        self.$grid.on("click", "li", function() {
          instance.jumpTo($(this).attr("data-index"));
        });
      }

      // Build the list
      if (!self.$list) {
        self.$list = $("<ul>").appendTo(self.$grid);
      }

      $.each(instance.group, function(i, item) {
        src = item.opts.thumb || (item.opts.$thumb ? item.opts.$thumb.attr("src") : null);

        if (!src && item.type === "image") {
          src = item.src;
        }

        list.push(
          '<li data-index="' +
            i +
            '" tabindex="0" class="' +
            CLASS_LOAD +
            '"' +
            (src && src.length ? ' style="background-image:url(' + src + ')" />' : "") +
            "></li>"
        );
      });

      self.$list[0].innerHTML = list.join("");

      if (self.opts.axis === "x") {
        // Set fixed width for list element to enable horizontal scrolling
        self.$list.width(
          parseInt(self.$grid.css("padding-right"), 10) +
            instance.group.length *
              self.$list
                .children()
                .eq(0)
                .outerWidth(true)
        );
      }
    },

    focus: function(duration) {
      var self = this,
        $list = self.$list,
        $grid = self.$grid,
        thumb,
        thumbPos;

      if (!self.instance.current) {
        return;
      }

      thumb = $list
        .children()
        .removeClass(CLASS_ACTIVE)
        .filter('[data-index="' + self.instance.current.index + '"]')
        .addClass(CLASS_ACTIVE);

      thumbPos = thumb.position();

      // Check if need to scroll to make current thumb visible
      if (self.opts.axis === "y" && (thumbPos.top < 0 || thumbPos.top > $list.height() - thumb.outerHeight())) {
        $list.stop().animate(
          {
            scrollTop: $list.scrollTop() + thumbPos.top
          },
          duration
        );
      } else if (
        self.opts.axis === "x" &&
        (thumbPos.left < $grid.scrollLeft() || thumbPos.left > $grid.scrollLeft() + ($grid.width() - thumb.outerWidth()))
      ) {
        $list
          .parent()
          .stop()
          .animate(
            {
              scrollLeft: thumbPos.left
            },
            duration
          );
      }
    },

    update: function() {
      var that = this;
      that.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible);

      if (that.isVisible) {
        if (!that.$grid) {
          that.create();
        }

        that.instance.trigger("onThumbsShow");

        that.focus(0);
      } else if (that.$grid) {
        that.instance.trigger("onThumbsHide");
      }

      // Update content position
      that.instance.update();
    },

    hide: function() {
      this.isVisible = false;
      this.update();
    },

    show: function() {
      this.isVisible = true;
      this.update();
    },

    toggle: function() {
      this.isVisible = !this.isVisible;
      this.update();
    }
  });

  $(document).on({
    "onInit.fb": function(e, instance) {
      var Thumbs;

      if (instance && !instance.Thumbs) {
        Thumbs = new FancyThumbs(instance);

        if (Thumbs.isActive && Thumbs.opts.autoStart === true) {
          Thumbs.show();
        }
      }
    },

    "beforeShow.fb": function(e, instance, item, firstRun) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible) {
        Thumbs.focus(firstRun ? 0 : 250);
      }
    },

    "afterKeydown.fb": function(e, instance, current, keypress, keycode) {
      var Thumbs = instance && instance.Thumbs;

      // "G"
      if (Thumbs && Thumbs.isActive && keycode === 71) {
        keypress.preventDefault();

        Thumbs.toggle();
      }
    },

    "beforeClose.fb": function(e, instance) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible && Thumbs.opts.hideOnClose !== false) {
        Thumbs.$grid.hide();
      }
    }
  });
})(document, __webpack_provided_window_dot_jQuery || jQuery);

//// ==========================================================================
//
// Share
// Displays simple form for sharing current url
//
// ==========================================================================
(function(document, $) {
  "use strict";

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      share:
        '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' +
        '<svg viewBox="0 0 40 40">' +
        '<path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z">' +
        "</svg>" +
        "</button>"
    },
    share: {
      url: function(instance, item) {
        return (
          (!instance.currentHash && !(item.type === "inline" || item.type === "html") ? item.origSrc || item.src : false) || window.location
        );
      },
      tpl:
        '<div class="fancybox-share">' +
        "<h1>{{SHARE}}</h1>" +
        "<p>" +
        '<a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg>' +
        "<span>Facebook</span>" +
        "</a>" +
        '<a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg>' +
        "<span>Twitter</span>" +
        "</a>" +
        '<a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}">' +
        '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg>' +
        "<span>Pinterest</span>" +
        "</a>" +
        "</p>" +
        '<p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p>' +
        "</div>"
    }
  });

  function escapeHtml(string) {
    var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };

    return String(string).replace(/[&<>"'`=\/]/g, function(s) {
      return entityMap[s];
    });
  }

  $(document).on("click", "[data-fancybox-share]", function() {
    var instance = $.fancybox.getInstance(),
      current = instance.current || null,
      url,
      tpl;

    if (!current) {
      return;
    }

    if ($.type(current.opts.share.url) === "function") {
      url = current.opts.share.url.apply(current, [instance, current]);
    }

    tpl = current.opts.share.tpl
      .replace(/\{\{media\}\}/g, current.type === "image" ? encodeURIComponent(current.src) : "")
      .replace(/\{\{url\}\}/g, encodeURIComponent(url))
      .replace(/\{\{url_raw\}\}/g, escapeHtml(url))
      .replace(/\{\{descr\}\}/g, instance.$caption ? encodeURIComponent(instance.$caption.text()) : "");

    $.fancybox.open({
      src: instance.translate(instance, tpl),
      type: "html",
      opts: {
        animationEffect: false,
        afterLoad: function(shareInstance, shareCurrent) {
          // Close self if parent instance is closing
          instance.$refs.container.one("beforeClose.fb", function() {
            shareInstance.close(null, 0);
          });

          // Opening links in a popup window
          shareCurrent.$content.find(".fancybox-share__links a").click(function() {
            window.open(this.href, "Share", "width=550, height=450");
            return false;
          });
        }
      }
    });
  });
})(document, __webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================
(function(document, window, $) {
  "use strict";

  // Simple $.escapeSelector polyfill (for jQuery prior v3)
  if (!$.escapeSelector) {
    $.escapeSelector = function(sel) {
      var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
      var fcssescape = function(ch, asCodePoint) {
        if (asCodePoint) {
          // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
          if (ch === "\0") {
            return "\uFFFD";
          }

          // Control characters and (dependent upon position) numbers get escaped as code points
          return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
        }

        // Other potentially-special ASCII characters get backslash-escaped
        return "\\" + ch;
      };

      return (sel + "").replace(rcssescape, fcssescape);
    };
  }

  // Get info about gallery name and current index from url
  function parseUrl() {
    var hash = window.location.hash.substr(1),
      rez = hash.split("-"),
      index = rez.length > 1 && /^\+?\d+$/.test(rez[rez.length - 1]) ? parseInt(rez.pop(-1), 10) || 1 : 1,
      gallery = rez.join("-");

    return {
      hash: hash,
      /* Index is starting from 1 */
      index: index < 1 ? 1 : index,
      gallery: gallery
    };
  }

  // Trigger click evnt on links to open new fancyBox instance
  function triggerFromUrl(url) {
    var $el;

    if (url.gallery !== "") {
      // If we can find element matching 'data-fancybox' atribute, then trigger click event for that.
      // It should start fancyBox
      $el = $("[data-fancybox='" + $.escapeSelector(url.gallery) + "']")
        .eq(url.index - 1)
        .trigger("click.fb-start");
    }
  }

  // Get gallery name from current instance
  function getGalleryID(instance) {
    var opts, ret;

    if (!instance) {
      return false;
    }

    opts = instance.current ? instance.current.opts : instance.opts;
    ret = opts.hash || (opts.$orig ? opts.$orig.data("fancybox") : "");

    return ret === "" ? false : ret;
  }

  // Start when DOM becomes ready
  $(function() {
    // Check if user has disabled this module
    if ($.fancybox.defaults.hash === false) {
      return;
    }

    // Update hash when opening/closing fancyBox
    $(document).on({
      "onInit.fb": function(e, instance) {
        var url, gallery;

        if (instance.group[instance.currIndex].opts.hash === false) {
          return;
        }

        url = parseUrl();
        gallery = getGalleryID(instance);

        // Make sure gallery start index matches index from hash
        if (gallery && url.gallery && gallery == url.gallery) {
          instance.currIndex = url.index - 1;
        }
      },

      "beforeShow.fb": function(e, instance, current, firstRun) {
        var gallery;

        if (!current || current.opts.hash === false) {
          return;
        }

        // Check if need to update window hash
        gallery = getGalleryID(instance);

        if (!gallery) {
          return;
        }

        // Variable containing last hash value set by fancyBox
        // It will be used to determine if fancyBox needs to close after hash change is detected
        instance.currentHash = gallery + (instance.group.length > 1 ? "-" + (current.index + 1) : "");

        // If current hash is the same (this instance most likely is opened by hashchange), then do nothing
        if (window.location.hash === "#" + instance.currentHash) {
          return;
        }

        if (!instance.origHash) {
          instance.origHash = window.location.hash;
        }

        if (instance.hashTimer) {
          clearTimeout(instance.hashTimer);
        }

        // Update hash
        instance.hashTimer = setTimeout(function() {
          if ("replaceState" in window.history) {
            window.history[firstRun ? "pushState" : "replaceState"](
              {},
              document.title,
              window.location.pathname + window.location.search + "#" + instance.currentHash
            );

            if (firstRun) {
              instance.hasCreatedHistory = true;
            }
          } else {
            window.location.hash = instance.currentHash;
          }

          instance.hashTimer = null;
        }, 300);
      },

      "beforeClose.fb": function(e, instance, current) {
        var gallery;

        if (current.opts.hash === false) {
          return;
        }

        gallery = getGalleryID(instance);

        // Goto previous history entry
        if (instance.currentHash && instance.hasCreatedHistory) {
          window.history.back();
        } else if (instance.currentHash) {
          if ("replaceState" in window.history) {
            window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (instance.origHash || ""));
          } else {
            window.location.hash = instance.origHash;
          }
        }

        instance.currentHash = null;

        clearTimeout(instance.hashTimer);
      }
    });

    // Check if need to start/close after url has changed
    $(window).on("hashchange.fb", function() {
      var url = parseUrl(),
        fb;

      // Find last fancyBox instance that has "hash"
      $.each(
        $(".fancybox-container")
          .get()
          .reverse(),
        function(index, value) {
          var tmp = $(value).data("FancyBox");
          //isClosing
          if (tmp.currentHash) {
            fb = tmp;
            return false;
          }
        }
      );

      if (fb) {
        // Now, compare hash values
        if (fb.currentHash && fb.currentHash !== url.gallery + "-" + url.index && !(url.index === 1 && fb.currentHash == url.gallery)) {
          fb.currentHash = null;

          fb.close();
        }
      } else if (url.gallery !== "") {
        triggerFromUrl(url);
      }
    });

    // Check current hash and trigger click event on matching element to start fancyBox, if needed
    setTimeout(function() {
      if (!$.fancybox.getInstance()) {
        triggerFromUrl(parseUrl());
      }
    }, 50);
  });
})(document, window, __webpack_provided_window_dot_jQuery || jQuery);

// ==========================================================================
//
// Wheel
// Basic mouse weheel support for gallery navigation
//
// ==========================================================================
(function(document, $) {
  "use strict";

  var prevTime = new Date().getTime();

  $(document).on({
    "onInit.fb": function(e, instance, current) {
      instance.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(e) {
        var current = instance.current,
          currTime = new Date().getTime();

        if (instance.group.length < 2 || current.opts.wheel === false || (current.opts.wheel === "auto" && current.type !== "image")) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (current.$slide.hasClass("fancybox-animated")) {
          return;
        }

        e = e.originalEvent || e;

        if (currTime - prevTime < 250) {
          return;
        }

        prevTime = currTime;

        instance[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]();
      });
    }
  });
})(document, __webpack_provided_window_dot_jQuery || jQuery);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(0)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactMenu = function () {
  function ContactMenu() {
    var _this = this;

    (0, _classCallCheck3.default)(this, ContactMenu);

    this._toggle = function () {
      if (_this.menuIsVisible) _this.close();else _this.open();
    };

    this._itemClickHandler = function () {
      if (_this.menuIsVisible) _this.close();
    };

    this._documentKeydown = function (e) {
      if (!_this.menuIsVisible) return;

      var windowWidth = $(window).width(),
          $target = $(e.target);

      // escape
      if (e.keyCode == 27) {
        var _windowWidth = $(window).width();
        e.preventDefault();

        if (_windowWidth < 992) {
          _this.close();
          _this.$toggle.focus();
        }
      }

      // tab
      if (e.keyCode == 9 && !e.shiftKey) {
        if (windowWidth < 992) {
          // toggle
          if ($target.hasClass('contact-menu-toggle')) {
            e.preventDefault();
            _this.$container.find('ul:first-child > li:first-child > a').focus();
          }

          // last link
          if ($target.is('.contact-menu ul:last-child > li:last-child > a')) {
            e.preventDefault();
            _this.$toggle.focus();
          }
        }
      }

      // tab + shift
      if (e.keyCode == 9 && e.shiftKey) {
        if (windowWidth < 992) {
          // toggle
          if ($target.hasClass('contact-menu-toggle')) {
            e.preventDefault();
            _this.$container.find('ul:last-child > li:last-child > a').focus();
          }

          // first link
          if ($target.is('ul:first-child > li:first-child > a')) {
            e.preventDefault();
            _this.$toggle.focus();
          }
        }
      }
    };

    this._windowResize = function () {
      if (_this.menuIsVisible) _this.close();
    };

    this.$container = $('.contact-menu');
    this.$toggle = $('.contact-menu-toggle');
    this.menuIsVisible = false;
  }

  (0, _createClass3.default)(ContactMenu, [{
    key: 'open',
    value: function open() {
      var text = 'Закрыть меню контактов';

      $('.page').addClass('page_overflow-hidden');

      this.$container.addClass('contact-menu_visible');
      this.menuIsVisible = true;

      this.$toggle.addClass('phone-toggle_close').attr('title', text).find('.visually-hidden').text(text);
    }
  }, {
    key: 'close',
    value: function close() {
      var text = 'Открыть меню контактов';

      $('.page').removeClass('page_overflow-hidden');

      this.$container.removeClass('contact-menu_visible');
      this.menuIsVisible = false;

      this.$toggle.removeClass('phone-toggle_close').attr('title', text).find('.visually-hidden').text(text);
    }
  }, {
    key: 'init',
    value: function init() {
      $(window).on('resize', this._windowResize);

      $(document).on('keydown', this._documentKeydown);

      this.$toggle.on('click', this._toggle);
      $('.contact-menu__socials .socials__link, .contact-menu__phones-link').on('click', this._itemClickHandler);
    }
  }]);
  return ContactMenu;
}();

exports.default = new ContactMenu();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = function () {
  function Menu() {
    var _this = this;

    (0, _classCallCheck3.default)(this, Menu);

    this._toggle = function () {
      if (_this.menuIsVisible) _this.close();else _this.open();
    };

    this._containerKeydown = function (e) {
      var windowWidth = $(window).width(),
          $target = $(e.target);

      // escape
      if (e.keyCode == 27) {
        var _windowWidth = $(window).width();
        e.preventDefault();

        if (_windowWidth > 991) _this.closeAllDropdowns();

        if (_windowWidth < 992 && _this.menuIsVisible) {
          _this.close();
          _this.$toggle.focus();
        }
      }

      // tab
      if (e.keyCode == 9 && !e.shiftKey) {
        if (windowWidth < 992) {
          // last link
          if ($target.is('.menu__centered:not(.menu__centered_hidden-items) li:visible:last-child > a')) {
            e.preventDefault();
            _this.$toggle.focus();
          }

          // toggle
          if ($target.hasClass('menu__toggle') && _this.menuIsVisible) {
            e.preventDefault();
            $('.menu__centered:not(.menu__centered_hidden-items) li:visible:first-child > a').focus();
          }
        }
      }

      // tab + shift
      if (e.keyCode == 9 && e.shiftKey) {
        // first link
        if (windowWidth < 992) {
          if ($target.is('.menu__centered:not(.menu__centered_hidden-items) li:visible:first-child > a')) {
            e.preventDefault();
            _this.$toggle.focus();
          }

          // toggle
          if ($target.hasClass('menu__toggle') && _this.menuIsVisible) {
            e.preventDefault();
            $('.menu__centered:not(.menu__centered_hidden-items) li:visible:last-child > a').focus();
          }
        }
      }
    };

    this._windowResize = function () {
      if (_this.menuIsVisible) _this.close();
    };

    this.$container = $('.menu');
    this.$dropdownToggle = $('.menu__dropdown-toggle');
    this.$backToggle = $('.menu__back-toggle');
    this.$toggle = $('.menu__toggle');
    this.menuIsVisible = false;
  }

  // hidden dropdowns on desctop


  (0, _createClass3.default)(Menu, [{
    key: '_documentHandler',
    value: function _documentHandler(e) {
      if ($(window).width() < 992) return;

      if (!$(e.target).closest('.menu__item-has-dropdown').length) {
        $('.menu__centered_visible').removeClass('menu__centered_visible');
        $('.menu__centered_hidden-items').removeClass('menu__centered_hidden-items');
      }
    }
  }, {
    key: '_dropdownHandler',
    value: function _dropdownHandler(e) {
      e.preventDefault();

      var windowWidth = $(window).width();

      if (windowWidth > 991) {
        var $visibleDropdowns = $(this).closest('li').find('.menu__centered_visible'),
            $hasDropdownSiblings = $(this).closest('.menu__item-has-dropdown').siblings('.menu__item-has-dropdown');

        // close dropdowns of siblings
        if ($hasDropdownSiblings.length) {
          $hasDropdownSiblings.find('.menu__centered_visible').removeClass('menu__centered_visible menu__centered_hidden-items');
        }

        // close dropdowns of children
        if ($visibleDropdowns.length) {
          $visibleDropdowns.removeClass('menu__centered_visible menu__centered_hidden-items');
          $(this).closest('.menu__centered').removeClass('menu__centered_hidden-items');
          return;
        }
      }

      /*
        hidden current links.
        show next dropdown.
      */
      $(this).closest('.menu__centered').addClass('menu__centered_hidden-items').end().next('.menu__centered').addClass('menu__centered_visible');

      if (windowWidth < 992) {
        $(this).blur();
        /*
          set focus on .menu__back-toggle
          setTimeout - fix for Firefox !!!!!!!!!
        */
        setTimeout(function () {
          $('.menu__centered_visible:not(.menu__centered_hidden-items)').find('.menu__back-toggle').first().focus();
        }, 200);
      }
    }
  }, {
    key: '_backHandler',
    value: function _backHandler(e) {
      e.preventDefault();

      /*
        hidden current dropdown.
        show links of previous dropdown.
        remove focus for back-toggle.
        set focus for current dropdown-toggle.
      */
      $(this).closest('.menu__centered').removeClass('menu__centered_visible').closest('.menu__centered_hidden-items').removeClass('menu__centered_hidden-items').end().closest('.menu__item-has-dropdown').find('.menu__dropdown-toggle').blur().first().focus();
    }
  }, {
    key: 'open',
    value: function open() {
      var text = 'Закрыть меню';

      $('.page').addClass('page_overflow-hidden');

      this.$container.addClass('menu_visible');
      this.menuIsVisible = true;

      this.$toggle.addClass('hamburger_close').attr('title', text).find('.visually-hidden').text(text);
    }
  }, {
    key: 'close',
    value: function close() {
      var text = 'Открыть меню';

      $('.page').removeClass('page_overflow-hidden');

      this.$container.removeClass('menu_visible');
      this.menuIsVisible = false;

      this.$toggle.removeClass('hamburger_close').attr('title', text).find('.visually-hidden').text(text);
    }
  }, {
    key: 'closeAllDropdowns',
    value: function closeAllDropdowns() {
      $('.menu__centered_hidden-items').removeClass('menu__centered_hidden-items');

      $('.menu__dropdown.menu__centered_visible').removeClass('menu__centered_visible').closest('.menu__item').find('.menu__dropdown-toggle').first().focus();
    }
  }, {
    key: 'init',
    value: function init() {
      $(window).on('resize', this._windowResize);

      $(document).on('click', this._documentHandler);
      this.$dropdownToggle.on('click', this._dropdownHandler);
      this.$backToggle.on('click', this._backHandler);
      this.$toggle.on('click', this._toggle);

      this.$container.on('keydown', this._containerKeydown);
    }
  }]);
  return Menu;
}();

exports.default = new Menu();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _slick = __webpack_require__(5);

var _slick2 = _interopRequireDefault(_slick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Projects = function () {
  function Projects() {
    (0, _classCallCheck3.default)(this, Projects);
  }

  (0, _createClass3.default)(Projects, [{
    key: 'init',
    value: function init() {
      $('.projects__list').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="slick-prev"><span class="visually-hidden">Назад</span></button>',
        nextArrow: '<button type="button" class="slick-next"><span class="visually-hidden">Вперед</span></button>a',
        responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }, {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      });
    }
  }]);
  return Projects;
}();

exports.default = new Projects();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _slick = __webpack_require__(5);

var _slick2 = _interopRequireDefault(_slick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Team = function () {
  function Team() {
    (0, _classCallCheck3.default)(this, Team);
  }

  (0, _createClass3.default)(Team, [{
    key: 'init',
    value: function init() {
      $('.team').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<button type="button" class="slick-prev"><span class="visually-hidden">Назад</span></button>',
        nextArrow: '<button type="button" class="slick-next"><span class="visually-hidden">Вперед</span></button>',
        responsive: [{
          breakpoint: 1150,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }, {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }, {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      });
    }
  }]);
  return Team;
}();

exports.default = new Team();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _slick = __webpack_require__(5);

var _slick2 = _interopRequireDefault(_slick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Brands = function () {
  function Brands() {
    (0, _classCallCheck3.default)(this, Brands);
  }

  (0, _createClass3.default)(Brands, [{
    key: 'init',
    value: function init() {
      $('.brands').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<button type="button" class="slick-prev"><span class="visually-hidden">Назад</span></button>',
        nextArrow: '<button type="button" class="slick-next"><span class="visually-hidden">Вперед</span></button>',
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }, {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      });
    }
  }]);
  return Brands;
}();

exports.default = new Brands();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileUpload = function () {
  function FileUpload() {
    (0, _classCallCheck3.default)(this, FileUpload);
  }

  (0, _createClass3.default)(FileUpload, [{
    key: 'init',
    value: function init() {
      $('.file-upload__inputfile').on('change', this._changeHandler);
    }
  }, {
    key: '_changeHandler',
    value: function _changeHandler(e) {
      var $container = $(this).closest('.file-upload');

      var files = this.files,
          $ul = $container.find('.file-upload__list');

      if (files.length) {
        if ($ul.length) $ul.remove();

        $ul = $('<ul class="file-upload__list">');

        for (var i = 0; i < files.length; i++) {
          var file = files[i],
              $li = $('<li class="file-upload__list-item">');

          var liTpl = '<div class="file-upload__list-item-data">\n                          <div class="file-upload__list-item-name">' + file.name + '</div>\n                          <div class="file-upload__list-item-size">' + (file.size / 1000).toFixed(2) + ' Kb</div>\n                        </div>';

          $li.html(liTpl);

          $ul.append($li);
        }

        $container.append($ul);
      }
    }
  }]);
  return FileUpload;
}();

exports.default = new FileUpload();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tabs = function () {
  function Tabs() {
    (0, _classCallCheck3.default)(this, Tabs);
  }

  (0, _createClass3.default)(Tabs, [{
    key: 'init',
    value: function init() {
      $('.tabs__controls-link').on('click', this._toggleHandler);
    }
  }, {
    key: '_toggleHandler',
    value: function _toggleHandler(e) {
      e.preventDefault();

      var pressedLink = $(this);

      if (pressedLink.hasClass('tabs__controls-link_active')) return;

      var container = pressedLink.closest('.tabs'),
          activeLink = container.find('.tabs__controls-link_active'),
          visibleContent = container.find('.tabs__content_visible'),
          requiredContent = container.find(pressedLink.attr('href'));

      activeLink.removeClass('tabs__controls-link_active');
      visibleContent.removeClass('tabs__content_visible');

      pressedLink.addClass('tabs__controls-link_active');
      requiredContent.addClass('tabs__content_visible');
    }
  }]);
  return Tabs;
}();

exports.default = new Tabs();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
],[11]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NsaWNrLWNhcm91c2VsL3NsaWNrL3NsaWNrLmpzIiwid2VicGFjazovLy9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9QYWdlSGVhZGVyLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9GYW5jeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZhbmN5YXBwcy9mYW5jeWJveC9kaXN0L2pxdWVyeS5mYW5jeWJveC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvQ29udGFjdE1lbnUuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL01lbnUuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL1Byb2plY3RzLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9UZWFtLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9CcmFuZHMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL0ZpbGVVcGxvYWQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL1RhYnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgICAgXyBfICAgICAgXyAgICAgICBfXG4gX19ffCAoXykgX19ffCB8IF9fICAoXylfX19cbi8gX198IHwgfC8gX198IHwvIC8gIHwgLyBfX3xcblxcX18gXFwgfCB8IChfX3wgICA8IF8gfCBcXF9fIFxcXG58X19fL198X3xcXF9fX3xffFxcXyhfKS8gfF9fXy9cbiAgICAgICAgICAgICAgICAgICB8X18vXG5cbiBWZXJzaW9uOiAxLjguMVxuICBBdXRob3I6IEtlbiBXaGVlbGVyXG4gV2Vic2l0ZTogaHR0cDovL2tlbndoZWVsZXIuZ2l0aHViLmlvXG4gICAgRG9jczogaHR0cDovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrXG4gICAgUmVwbzogaHR0cDovL2dpdGh1Yi5jb20va2Vud2hlZWxlci9zbGlja1xuICBJc3N1ZXM6IGh0dHA6Ly9naXRodWIuY29tL2tlbndoZWVsZXIvc2xpY2svaXNzdWVzXG5cbiAqL1xuLyogZ2xvYmFsIHdpbmRvdywgZG9jdW1lbnQsIGRlZmluZSwgalF1ZXJ5LCBzZXRJbnRlcnZhbCwgY2xlYXJJbnRlcnZhbCAqL1xuOyhmdW5jdGlvbihmYWN0b3J5KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cblxufShmdW5jdGlvbigkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBTbGljayA9IHdpbmRvdy5TbGljayB8fCB7fTtcblxuICAgIFNsaWNrID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBpbnN0YW5jZVVpZCA9IDA7XG5cbiAgICAgICAgZnVuY3Rpb24gU2xpY2soZWxlbWVudCwgc2V0dGluZ3MpIHtcblxuICAgICAgICAgICAgdmFyIF8gPSB0aGlzLCBkYXRhU2V0dGluZ3M7XG5cbiAgICAgICAgICAgIF8uZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgYWNjZXNzaWJpbGl0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXBwZW5kQXJyb3dzOiAkKGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGFwcGVuZERvdHM6ICQoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiBudWxsLFxuICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gY2xhc3M9XCJzbGljay1wcmV2XCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzXCIgdHlwZT1cImJ1dHRvblwiPlByZXZpb3VzPC9idXR0b24+JyxcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwic2xpY2stbmV4dFwiIGFyaWEtbGFiZWw9XCJOZXh0XCIgdHlwZT1cImJ1dHRvblwiPk5leHQ8L2J1dHRvbj4nLFxuICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAzMDAwLFxuICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICBjc3NFYXNlOiAnZWFzZScsXG4gICAgICAgICAgICAgICAgY3VzdG9tUGFnaW5nOiBmdW5jdGlvbihzbGlkZXIsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIC8+JykudGV4dChpICsgMSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkb3RzQ2xhc3M6ICdzbGljay1kb3RzJyxcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICBlZGdlRnJpY3Rpb246IDAuMzUsXG4gICAgICAgICAgICAgICAgZmFkZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZm9jdXNPbkNoYW5nZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgaW5pdGlhbFNsaWRlOiAwLFxuICAgICAgICAgICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxuICAgICAgICAgICAgICAgIG1vYmlsZUZpcnN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBwYXVzZU9uSG92ZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgcGF1c2VPbkZvY3VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhdXNlT25Eb3RzSG92ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlc3BvbmRUbzogJ3dpbmRvdycsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogbnVsbCxcbiAgICAgICAgICAgICAgICByb3dzOiAxLFxuICAgICAgICAgICAgICAgIHJ0bDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2xpZGU6ICcnLFxuICAgICAgICAgICAgICAgIHNsaWRlc1BlclJvdzogMSxcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgICAgICAgICBzd2lwZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzd2lwZVRvU2xpZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRvdWNoTW92ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0b3VjaFRocmVzaG9sZDogNSxcbiAgICAgICAgICAgICAgICB1c2VDU1M6IHRydWUsXG4gICAgICAgICAgICAgICAgdXNlVHJhbnNmb3JtOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZlcnRpY2FsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbFN3aXBpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHdhaXRGb3JBbmltYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHpJbmRleDogMTAwMFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgXy5pbml0aWFscyA9IHtcbiAgICAgICAgICAgICAgICBhbmltYXRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhdXRvUGxheVRpbWVyOiBudWxsLFxuICAgICAgICAgICAgICAgIGN1cnJlbnREaXJlY3Rpb246IDAsXG4gICAgICAgICAgICAgICAgY3VycmVudExlZnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgY3VycmVudFNsaWRlOiAwLFxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogMSxcbiAgICAgICAgICAgICAgICAkZG90czogbnVsbCxcbiAgICAgICAgICAgICAgICBsaXN0V2lkdGg6IG51bGwsXG4gICAgICAgICAgICAgICAgbGlzdEhlaWdodDogbnVsbCxcbiAgICAgICAgICAgICAgICBsb2FkSW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgJG5leHRBcnJvdzogbnVsbCxcbiAgICAgICAgICAgICAgICAkcHJldkFycm93OiBudWxsLFxuICAgICAgICAgICAgICAgIHNjcm9sbGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2xpZGVDb3VudDogbnVsbCxcbiAgICAgICAgICAgICAgICBzbGlkZVdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgICRzbGlkZVRyYWNrOiBudWxsLFxuICAgICAgICAgICAgICAgICRzbGlkZXM6IG51bGwsXG4gICAgICAgICAgICAgICAgc2xpZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2xpZGVPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgc3dpcGVMZWZ0OiBudWxsLFxuICAgICAgICAgICAgICAgIHN3aXBpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICRsaXN0OiBudWxsLFxuICAgICAgICAgICAgICAgIHRvdWNoT2JqZWN0OiB7fSxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1zRW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdW5zbGlja2VkOiBmYWxzZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJC5leHRlbmQoXywgXy5pbml0aWFscyk7XG5cbiAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9IG51bGw7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gbnVsbDtcbiAgICAgICAgICAgIF8uYW5pbVByb3AgPSBudWxsO1xuICAgICAgICAgICAgXy5icmVha3BvaW50cyA9IFtdO1xuICAgICAgICAgICAgXy5icmVha3BvaW50U2V0dGluZ3MgPSBbXTtcbiAgICAgICAgICAgIF8uY3NzVHJhbnNpdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgICAgIF8uZm9jdXNzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIF8uaW50ZXJydXB0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIF8uaGlkZGVuID0gJ2hpZGRlbic7XG4gICAgICAgICAgICBfLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICBfLnBvc2l0aW9uUHJvcCA9IG51bGw7XG4gICAgICAgICAgICBfLnJlc3BvbmRUbyA9IG51bGw7XG4gICAgICAgICAgICBfLnJvd0NvdW50ID0gMTtcbiAgICAgICAgICAgIF8uc2hvdWxkQ2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgXy4kc2xpZGVyID0gJChlbGVtZW50KTtcbiAgICAgICAgICAgIF8uJHNsaWRlc0NhY2hlID0gbnVsbDtcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9IG51bGw7XG4gICAgICAgICAgICBfLnRyYW5zaXRpb25UeXBlID0gbnVsbDtcbiAgICAgICAgICAgIF8udmlzaWJpbGl0eUNoYW5nZSA9ICd2aXNpYmlsaXR5Y2hhbmdlJztcbiAgICAgICAgICAgIF8ud2luZG93V2lkdGggPSAwO1xuICAgICAgICAgICAgXy53aW5kb3dUaW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgIGRhdGFTZXR0aW5ncyA9ICQoZWxlbWVudCkuZGF0YSgnc2xpY2snKSB8fCB7fTtcblxuICAgICAgICAgICAgXy5vcHRpb25zID0gJC5leHRlbmQoe30sIF8uZGVmYXVsdHMsIHNldHRpbmdzLCBkYXRhU2V0dGluZ3MpO1xuXG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IF8ub3B0aW9ucy5pbml0aWFsU2xpZGU7XG5cbiAgICAgICAgICAgIF8ub3JpZ2luYWxTZXR0aW5ncyA9IF8ub3B0aW9ucztcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudC5tb3pIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgXy5oaWRkZW4gPSAnbW96SGlkZGVuJztcbiAgICAgICAgICAgICAgICBfLnZpc2liaWxpdHlDaGFuZ2UgPSAnbW96dmlzaWJpbGl0eWNoYW5nZSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC53ZWJraXRIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgXy5oaWRkZW4gPSAnd2Via2l0SGlkZGVuJztcbiAgICAgICAgICAgICAgICBfLnZpc2liaWxpdHlDaGFuZ2UgPSAnd2Via2l0dmlzaWJpbGl0eWNoYW5nZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uYXV0b1BsYXkgPSAkLnByb3h5KF8uYXV0b1BsYXksIF8pO1xuICAgICAgICAgICAgXy5hdXRvUGxheUNsZWFyID0gJC5wcm94eShfLmF1dG9QbGF5Q2xlYXIsIF8pO1xuICAgICAgICAgICAgXy5hdXRvUGxheUl0ZXJhdG9yID0gJC5wcm94eShfLmF1dG9QbGF5SXRlcmF0b3IsIF8pO1xuICAgICAgICAgICAgXy5jaGFuZ2VTbGlkZSA9ICQucHJveHkoXy5jaGFuZ2VTbGlkZSwgXyk7XG4gICAgICAgICAgICBfLmNsaWNrSGFuZGxlciA9ICQucHJveHkoXy5jbGlja0hhbmRsZXIsIF8pO1xuICAgICAgICAgICAgXy5zZWxlY3RIYW5kbGVyID0gJC5wcm94eShfLnNlbGVjdEhhbmRsZXIsIF8pO1xuICAgICAgICAgICAgXy5zZXRQb3NpdGlvbiA9ICQucHJveHkoXy5zZXRQb3NpdGlvbiwgXyk7XG4gICAgICAgICAgICBfLnN3aXBlSGFuZGxlciA9ICQucHJveHkoXy5zd2lwZUhhbmRsZXIsIF8pO1xuICAgICAgICAgICAgXy5kcmFnSGFuZGxlciA9ICQucHJveHkoXy5kcmFnSGFuZGxlciwgXyk7XG4gICAgICAgICAgICBfLmtleUhhbmRsZXIgPSAkLnByb3h5KF8ua2V5SGFuZGxlciwgXyk7XG5cbiAgICAgICAgICAgIF8uaW5zdGFuY2VVaWQgPSBpbnN0YW5jZVVpZCsrO1xuXG4gICAgICAgICAgICAvLyBBIHNpbXBsZSB3YXkgdG8gY2hlY2sgZm9yIEhUTUwgc3RyaW5nc1xuICAgICAgICAgICAgLy8gU3RyaWN0IEhUTUwgcmVjb2duaXRpb24gKG11c3Qgc3RhcnQgd2l0aCA8KVxuICAgICAgICAgICAgLy8gRXh0cmFjdGVkIGZyb20galF1ZXJ5IHYxLjExIHNvdXJjZVxuICAgICAgICAgICAgXy5odG1sRXhwciA9IC9eKD86XFxzKig8W1xcd1xcV10rPilbXj5dKikkLztcblxuXG4gICAgICAgICAgICBfLnJlZ2lzdGVyQnJlYWtwb2ludHMoKTtcbiAgICAgICAgICAgIF8uaW5pdCh0cnVlKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFNsaWNrO1xuXG4gICAgfSgpKTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hY3RpdmF0ZUFEQSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5maW5kKCcuc2xpY2stYWN0aXZlJykuYXR0cih7XG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAnZmFsc2UnXG4gICAgICAgIH0pLmZpbmQoJ2EsIGlucHV0LCBidXR0b24sIHNlbGVjdCcpLmF0dHIoe1xuICAgICAgICAgICAgJ3RhYmluZGV4JzogJzAnXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hZGRTbGlkZSA9IFNsaWNrLnByb3RvdHlwZS5zbGlja0FkZCA9IGZ1bmN0aW9uKG1hcmt1cCwgaW5kZXgsIGFkZEJlZm9yZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAodHlwZW9mKGluZGV4KSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICBhZGRCZWZvcmUgPSBpbmRleDtcbiAgICAgICAgICAgIGluZGV4ID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IDAgfHwgKGluZGV4ID49IF8uc2xpZGVDb3VudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8udW5sb2FkKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZihpbmRleCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDAgJiYgXy4kc2xpZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICQobWFya3VwKS5hcHBlbmRUbyhfLiRzbGlkZVRyYWNrKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWRkQmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgJChtYXJrdXApLmluc2VydEJlZm9yZShfLiRzbGlkZXMuZXEoaW5kZXgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChtYXJrdXApLmluc2VydEFmdGVyKF8uJHNsaWRlcy5lcShpbmRleCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFkZEJlZm9yZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICQobWFya3VwKS5wcmVwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQobWFya3VwKS5hcHBlbmRUbyhfLiRzbGlkZVRyYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlcyA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKTtcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5hcHBlbmQoXy4kc2xpZGVzKTtcblxuICAgICAgICBfLiRzbGlkZXMuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgICAgJChlbGVtZW50KS5hdHRyKCdkYXRhLXNsaWNrLWluZGV4JywgaW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXNDYWNoZSA9IF8uJHNsaWRlcztcblxuICAgICAgICBfLnJlaW5pdCgpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hbmltYXRlSGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfID0gdGhpcztcbiAgICAgICAgaWYgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPT09IDEgJiYgXy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlICYmIF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRIZWlnaHQgPSBfLiRzbGlkZXMuZXEoXy5jdXJyZW50U2xpZGUpLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAgICAgXy4kbGlzdC5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRhcmdldEhlaWdodFxuICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYW5pbWF0ZVNsaWRlID0gZnVuY3Rpb24odGFyZ2V0TGVmdCwgY2FsbGJhY2spIHtcblxuICAgICAgICB2YXIgYW5pbVByb3BzID0ge30sXG4gICAgICAgICAgICBfID0gdGhpcztcblxuICAgICAgICBfLmFuaW1hdGVIZWlnaHQoKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0YXJnZXRMZWZ0ID0gLXRhcmdldExlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF8udHJhbnNmb3Jtc0VuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRhcmdldExlZnRcbiAgICAgICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQsIF8ub3B0aW9ucy5lYXNpbmcsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRMZWZ0XG4gICAgICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkLCBfLm9wdGlvbnMuZWFzaW5nLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKF8uY3NzVHJhbnNpdGlvbnMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50TGVmdCA9IC0oXy5jdXJyZW50TGVmdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQoe1xuICAgICAgICAgICAgICAgICAgICBhbmltU3RhcnQ6IF8uY3VycmVudExlZnRcbiAgICAgICAgICAgICAgICB9KS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbVN0YXJ0OiB0YXJnZXRMZWZ0XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogXy5vcHRpb25zLnNwZWVkLFxuICAgICAgICAgICAgICAgICAgICBlYXNpbmc6IF8ub3B0aW9ucy5lYXNpbmcsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IGZ1bmN0aW9uKG5vdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm93ID0gTWF0aC5jZWlsKG5vdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUoJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdyArICdweCwgMHB4KSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MoYW5pbVByb3BzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbVByb3BzW18uYW5pbVR5cGVdID0gJ3RyYW5zbGF0ZSgwcHgsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdyArICdweCknO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKGFuaW1Qcm9wcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgXy5hcHBseVRyYW5zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gTWF0aC5jZWlsKHRhcmdldExlZnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbVByb3BzW18uYW5pbVR5cGVdID0gJ3RyYW5zbGF0ZTNkKCcgKyB0YXJnZXRMZWZ0ICsgJ3B4LCAwcHgsIDBweCknO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUzZCgwcHgsJyArIHRhcmdldExlZnQgKyAncHgsIDBweCknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhhbmltUHJvcHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZGlzYWJsZVRyYW5zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0TmF2VGFyZ2V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgYXNOYXZGb3IgPSBfLm9wdGlvbnMuYXNOYXZGb3I7XG5cbiAgICAgICAgaWYgKCBhc05hdkZvciAmJiBhc05hdkZvciAhPT0gbnVsbCApIHtcbiAgICAgICAgICAgIGFzTmF2Rm9yID0gJChhc05hdkZvcikubm90KF8uJHNsaWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXNOYXZGb3I7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmFzTmF2Rm9yID0gZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBhc05hdkZvciA9IF8uZ2V0TmF2VGFyZ2V0KCk7XG5cbiAgICAgICAgaWYgKCBhc05hdkZvciAhPT0gbnVsbCAmJiB0eXBlb2YgYXNOYXZGb3IgPT09ICdvYmplY3QnICkge1xuICAgICAgICAgICAgYXNOYXZGb3IuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzKS5zbGljaygnZ2V0U2xpY2snKTtcbiAgICAgICAgICAgICAgICBpZighdGFyZ2V0LnVuc2xpY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc2xpZGVIYW5kbGVyKGluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hcHBseVRyYW5zaXRpb24gPSBmdW5jdGlvbihzbGlkZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHRyYW5zaXRpb24gPSB7fTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uW18udHJhbnNpdGlvblR5cGVdID0gXy50cmFuc2Zvcm1UeXBlICsgJyAnICsgXy5vcHRpb25zLnNwZWVkICsgJ21zICcgKyBfLm9wdGlvbnMuY3NzRWFzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb25bXy50cmFuc2l0aW9uVHlwZV0gPSAnb3BhY2l0eSAnICsgXy5vcHRpb25zLnNwZWVkICsgJ21zICcgKyBfLm9wdGlvbnMuY3NzRWFzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHRyYW5zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlKS5jc3ModHJhbnNpdGlvbik7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYXV0b1BsYXkgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5hdXRvUGxheUNsZWFyKCk7XG5cbiAgICAgICAgaWYgKCBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICkge1xuICAgICAgICAgICAgXy5hdXRvUGxheVRpbWVyID0gc2V0SW50ZXJ2YWwoIF8uYXV0b1BsYXlJdGVyYXRvciwgXy5vcHRpb25zLmF1dG9wbGF5U3BlZWQgKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hdXRvUGxheUNsZWFyID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLmF1dG9QbGF5VGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoXy5hdXRvUGxheVRpbWVyKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hdXRvUGxheUl0ZXJhdG9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgc2xpZGVUbyA9IF8uY3VycmVudFNsaWRlICsgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuXG4gICAgICAgIGlmICggIV8ucGF1c2VkICYmICFfLmludGVycnVwdGVkICYmICFfLmZvY3Vzc2VkICkge1xuXG4gICAgICAgICAgICBpZiAoIF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UgKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIF8uZGlyZWN0aW9uID09PSAxICYmICggXy5jdXJyZW50U2xpZGUgKyAxICkgPT09ICggXy5zbGlkZUNvdW50IC0gMSApKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZGlyZWN0aW9uID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbHNlIGlmICggXy5kaXJlY3Rpb24gPT09IDAgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgc2xpZGVUbyA9IF8uY3VycmVudFNsaWRlIC0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggXy5jdXJyZW50U2xpZGUgLSAxID09PSAwICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5kaXJlY3Rpb24gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoIHNsaWRlVG8gKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmJ1aWxkQXJyb3dzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICkge1xuXG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cgPSAkKF8ub3B0aW9ucy5wcmV2QXJyb3cpLmFkZENsYXNzKCdzbGljay1hcnJvdycpO1xuICAgICAgICAgICAgXy4kbmV4dEFycm93ID0gJChfLm9wdGlvbnMubmV4dEFycm93KS5hZGRDbGFzcygnc2xpY2stYXJyb3cnKTtcblxuICAgICAgICAgICAgaWYoIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKSB7XG5cbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWhpZGRlbicpLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuIHRhYmluZGV4Jyk7XG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZUNsYXNzKCdzbGljay1oaWRkZW4nKS5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbiB0YWJpbmRleCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKF8uaHRtbEV4cHIudGVzdChfLm9wdGlvbnMucHJldkFycm93KSkge1xuICAgICAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cucHJlcGVuZFRvKF8ub3B0aW9ucy5hcHBlbmRBcnJvd3MpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChfLmh0bWxFeHByLnRlc3QoXy5vcHRpb25zLm5leHRBcnJvdykpIHtcbiAgICAgICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LmFwcGVuZFRvKF8ub3B0aW9ucy5hcHBlbmRBcnJvd3MpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgXy4kcHJldkFycm93XG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cuYWRkKCBfLiRuZXh0QXJyb3cgKVxuXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2staGlkZGVuJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2FyaWEtZGlzYWJsZWQnOiAndHJ1ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5idWlsZERvdHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBpLCBkb3Q7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5kb3RzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVyLmFkZENsYXNzKCdzbGljay1kb3R0ZWQnKTtcblxuICAgICAgICAgICAgZG90ID0gJCgnPHVsIC8+JykuYWRkQ2xhc3MoXy5vcHRpb25zLmRvdHNDbGFzcyk7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPD0gXy5nZXREb3RDb3VudCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBkb3QuYXBwZW5kKCQoJzxsaSAvPicpLmFwcGVuZChfLm9wdGlvbnMuY3VzdG9tUGFnaW5nLmNhbGwodGhpcywgXywgaSkpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy4kZG90cyA9IGRvdC5hcHBlbmRUbyhfLm9wdGlvbnMuYXBwZW5kRG90cyk7XG5cbiAgICAgICAgICAgIF8uJGRvdHMuZmluZCgnbGknKS5maXJzdCgpLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmJ1aWxkT3V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uJHNsaWRlcyA9XG4gICAgICAgICAgICBfLiRzbGlkZXJcbiAgICAgICAgICAgICAgICAuY2hpbGRyZW4oIF8ub3B0aW9ucy5zbGlkZSArICc6bm90KC5zbGljay1jbG9uZWQpJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLXNsaWRlJyk7XG5cbiAgICAgICAgXy5zbGlkZUNvdW50ID0gXy4kc2xpZGVzLmxlbmd0aDtcblxuICAgICAgICBfLiRzbGlkZXMuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgICAgJChlbGVtZW50KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNsaWNrLWluZGV4JywgaW5kZXgpXG4gICAgICAgICAgICAgICAgLmRhdGEoJ29yaWdpbmFsU3R5bGluZycsICQoZWxlbWVudCkuYXR0cignc3R5bGUnKSB8fCAnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF8uJHNsaWRlci5hZGRDbGFzcygnc2xpY2stc2xpZGVyJyk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjayA9IChfLnNsaWRlQ291bnQgPT09IDApID9cbiAgICAgICAgICAgICQoJzxkaXYgY2xhc3M9XCJzbGljay10cmFja1wiLz4nKS5hcHBlbmRUbyhfLiRzbGlkZXIpIDpcbiAgICAgICAgICAgIF8uJHNsaWRlcy53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpY2stdHJhY2tcIi8+JykucGFyZW50KCk7XG5cbiAgICAgICAgXy4kbGlzdCA9IF8uJHNsaWRlVHJhY2sud3JhcChcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwic2xpY2stbGlzdFwiLz4nKS5wYXJlbnQoKTtcbiAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MoJ29wYWNpdHknLCAwKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUgfHwgXy5vcHRpb25zLnN3aXBlVG9TbGlkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2ltZ1tkYXRhLWxhenldJywgXy4kc2xpZGVyKS5ub3QoJ1tzcmNdJykuYWRkQ2xhc3MoJ3NsaWNrLWxvYWRpbmcnKTtcblxuICAgICAgICBfLnNldHVwSW5maW5pdGUoKTtcblxuICAgICAgICBfLmJ1aWxkQXJyb3dzKCk7XG5cbiAgICAgICAgXy5idWlsZERvdHMoKTtcblxuICAgICAgICBfLnVwZGF0ZURvdHMoKTtcblxuXG4gICAgICAgIF8uc2V0U2xpZGVDbGFzc2VzKHR5cGVvZiBfLmN1cnJlbnRTbGlkZSA9PT0gJ251bWJlcicgPyBfLmN1cnJlbnRTbGlkZSA6IDApO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZHJhZ2dhYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRsaXN0LmFkZENsYXNzKCdkcmFnZ2FibGUnKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5idWlsZFJvd3MgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsIGEsIGIsIGMsIG5ld1NsaWRlcywgbnVtT2ZTbGlkZXMsIG9yaWdpbmFsU2xpZGVzLHNsaWRlc1BlclNlY3Rpb247XG5cbiAgICAgICAgbmV3U2xpZGVzID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBvcmlnaW5hbFNsaWRlcyA9IF8uJHNsaWRlci5jaGlsZHJlbigpO1xuXG4gICAgICAgIGlmKF8ub3B0aW9ucy5yb3dzID4gMCkge1xuXG4gICAgICAgICAgICBzbGlkZXNQZXJTZWN0aW9uID0gXy5vcHRpb25zLnNsaWRlc1BlclJvdyAqIF8ub3B0aW9ucy5yb3dzO1xuICAgICAgICAgICAgbnVtT2ZTbGlkZXMgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxTbGlkZXMubGVuZ3RoIC8gc2xpZGVzUGVyU2VjdGlvblxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZm9yKGEgPSAwOyBhIDwgbnVtT2ZTbGlkZXM7IGErKyl7XG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgZm9yKGIgPSAwOyBiIDwgXy5vcHRpb25zLnJvd3M7IGIrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIGZvcihjID0gMDsgYyA8IF8ub3B0aW9ucy5zbGlkZXNQZXJSb3c7IGMrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IChhICogc2xpZGVzUGVyU2VjdGlvbiArICgoYiAqIF8ub3B0aW9ucy5zbGlkZXNQZXJSb3cpICsgYykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsU2xpZGVzLmdldCh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKG9yaWdpbmFsU2xpZGVzLmdldCh0YXJnZXQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzbGlkZS5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdTbGlkZXMuYXBwZW5kQ2hpbGQoc2xpZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLiRzbGlkZXIuZW1wdHkoKS5hcHBlbmQobmV3U2xpZGVzKTtcbiAgICAgICAgICAgIF8uJHNsaWRlci5jaGlsZHJlbigpLmNoaWxkcmVuKCkuY2hpbGRyZW4oKVxuICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOigxMDAgLyBfLm9wdGlvbnMuc2xpZGVzUGVyUm93KSArICclJyxcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2hlY2tSZXNwb25zaXZlID0gZnVuY3Rpb24oaW5pdGlhbCwgZm9yY2VVcGRhdGUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBicmVha3BvaW50LCB0YXJnZXRCcmVha3BvaW50LCByZXNwb25kVG9XaWR0aCwgdHJpZ2dlckJyZWFrcG9pbnQgPSBmYWxzZTtcbiAgICAgICAgdmFyIHNsaWRlcldpZHRoID0gXy4kc2xpZGVyLndpZHRoKCk7XG4gICAgICAgIHZhciB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8ICQod2luZG93KS53aWR0aCgpO1xuXG4gICAgICAgIGlmIChfLnJlc3BvbmRUbyA9PT0gJ3dpbmRvdycpIHtcbiAgICAgICAgICAgIHJlc3BvbmRUb1dpZHRoID0gd2luZG93V2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5yZXNwb25kVG8gPT09ICdzbGlkZXInKSB7XG4gICAgICAgICAgICByZXNwb25kVG9XaWR0aCA9IHNsaWRlcldpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKF8ucmVzcG9uZFRvID09PSAnbWluJykge1xuICAgICAgICAgICAgcmVzcG9uZFRvV2lkdGggPSBNYXRoLm1pbih3aW5kb3dXaWR0aCwgc2xpZGVyV2lkdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMucmVzcG9uc2l2ZSAmJlxuICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUubGVuZ3RoICYmXG4gICAgICAgICAgICBfLm9wdGlvbnMucmVzcG9uc2l2ZSAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50ID0gbnVsbDtcblxuICAgICAgICAgICAgZm9yIChicmVha3BvaW50IGluIF8uYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5icmVha3BvaW50cy5oYXNPd25Qcm9wZXJ0eShicmVha3BvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5vcmlnaW5hbFNldHRpbmdzLm1vYmlsZUZpcnN0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbmRUb1dpZHRoIDwgXy5icmVha3BvaW50c1ticmVha3BvaW50XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEJyZWFrcG9pbnQgPSBfLmJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbmRUb1dpZHRoID4gXy5icmVha3BvaW50c1ticmVha3BvaW50XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEJyZWFrcG9pbnQgPSBfLmJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGFyZ2V0QnJlYWtwb2ludCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChfLmFjdGl2ZUJyZWFrcG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldEJyZWFrcG9pbnQgIT09IF8uYWN0aXZlQnJlYWtwb2ludCB8fCBmb3JjZVVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5hY3RpdmVCcmVha3BvaW50ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uYnJlYWtwb2ludFNldHRpbmdzW3RhcmdldEJyZWFrcG9pbnRdID09PSAndW5zbGljaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLnVuc2xpY2sodGFyZ2V0QnJlYWtwb2ludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBfLm9yaWdpbmFsU2V0dGluZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludFNldHRpbmdzW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QnJlYWtwb2ludF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5vcHRpb25zLmluaXRpYWxTbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5yZWZyZXNoKGluaXRpYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckJyZWFrcG9pbnQgPSB0YXJnZXRCcmVha3BvaW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgXy5hY3RpdmVCcmVha3BvaW50ID0gdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uYnJlYWtwb2ludFNldHRpbmdzW3RhcmdldEJyZWFrcG9pbnRdID09PSAndW5zbGljaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8udW5zbGljayh0YXJnZXRCcmVha3BvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBfLm9yaWdpbmFsU2V0dGluZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5icmVha3BvaW50U2V0dGluZ3NbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEJyZWFrcG9pbnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSBfLm9wdGlvbnMuaW5pdGlhbFNsaWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXy5yZWZyZXNoKGluaXRpYWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJCcmVha3BvaW50ID0gdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChfLmFjdGl2ZUJyZWFrcG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5hY3RpdmVCcmVha3BvaW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zID0gXy5vcmlnaW5hbFNldHRpbmdzO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSBfLm9wdGlvbnMuaW5pdGlhbFNsaWRlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF8ucmVmcmVzaChpbml0aWFsKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckJyZWFrcG9pbnQgPSB0YXJnZXRCcmVha3BvaW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gb25seSB0cmlnZ2VyIGJyZWFrcG9pbnRzIGR1cmluZyBhbiBhY3R1YWwgYnJlYWsuIG5vdCBvbiBpbml0aWFsaXplLlxuICAgICAgICAgICAgaWYoICFpbml0aWFsICYmIHRyaWdnZXJCcmVha3BvaW50ICE9PSBmYWxzZSApIHtcbiAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignYnJlYWtwb2ludCcsIFtfLCB0cmlnZ2VyQnJlYWtwb2ludF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNoYW5nZVNsaWRlID0gZnVuY3Rpb24oZXZlbnQsIGRvbnRBbmltYXRlKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCksXG4gICAgICAgICAgICBpbmRleE9mZnNldCwgc2xpZGVPZmZzZXQsIHVuZXZlbk9mZnNldDtcblxuICAgICAgICAvLyBJZiB0YXJnZXQgaXMgYSBsaW5rLCBwcmV2ZW50IGRlZmF1bHQgYWN0aW9uLlxuICAgICAgICBpZigkdGFyZ2V0LmlzKCdhJykpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0YXJnZXQgaXMgbm90IHRoZSA8bGk+IGVsZW1lbnQgKGllOiBhIGNoaWxkKSwgZmluZCB0aGUgPGxpPi5cbiAgICAgICAgaWYoISR0YXJnZXQuaXMoJ2xpJykpIHtcbiAgICAgICAgICAgICR0YXJnZXQgPSAkdGFyZ2V0LmNsb3Nlc3QoJ2xpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB1bmV2ZW5PZmZzZXQgPSAoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICE9PSAwKTtcbiAgICAgICAgaW5kZXhPZmZzZXQgPSB1bmV2ZW5PZmZzZXQgPyAwIDogKF8uc2xpZGVDb3VudCAtIF8uY3VycmVudFNsaWRlKSAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmRhdGEubWVzc2FnZSkge1xuXG4gICAgICAgICAgICBjYXNlICdwcmV2aW91cyc6XG4gICAgICAgICAgICAgICAgc2xpZGVPZmZzZXQgPSBpbmRleE9mZnNldCA9PT0gMCA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLSBpbmRleE9mZnNldDtcbiAgICAgICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlcihfLmN1cnJlbnRTbGlkZSAtIHNsaWRlT2Zmc2V0LCBmYWxzZSwgZG9udEFuaW1hdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnbmV4dCc6XG4gICAgICAgICAgICAgICAgc2xpZGVPZmZzZXQgPSBpbmRleE9mZnNldCA9PT0gMCA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IGluZGV4T2Zmc2V0O1xuICAgICAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKF8uY3VycmVudFNsaWRlICsgc2xpZGVPZmZzZXQsIGZhbHNlLCBkb250QW5pbWF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdpbmRleCc6XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZXZlbnQuZGF0YS5pbmRleCA9PT0gMCA/IDAgOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4IHx8ICR0YXJnZXQuaW5kZXgoKSAqIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcblxuICAgICAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKF8uY2hlY2tOYXZpZ2FibGUoaW5kZXgpLCBmYWxzZSwgZG9udEFuaW1hdGUpO1xuICAgICAgICAgICAgICAgICR0YXJnZXQuY2hpbGRyZW4oKS50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jaGVja05hdmlnYWJsZSA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgbmF2aWdhYmxlcywgcHJldk5hdmlnYWJsZTtcblxuICAgICAgICBuYXZpZ2FibGVzID0gXy5nZXROYXZpZ2FibGVJbmRleGVzKCk7XG4gICAgICAgIHByZXZOYXZpZ2FibGUgPSAwO1xuICAgICAgICBpZiAoaW5kZXggPiBuYXZpZ2FibGVzW25hdmlnYWJsZXMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgIGluZGV4ID0gbmF2aWdhYmxlc1tuYXZpZ2FibGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgbiBpbiBuYXZpZ2FibGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgbmF2aWdhYmxlc1tuXSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHByZXZOYXZpZ2FibGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2TmF2aWdhYmxlID0gbmF2aWdhYmxlc1tuXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNsZWFuVXBFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5kb3RzICYmIF8uJGRvdHMgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgJCgnbGknLCBfLiRkb3RzKVxuICAgICAgICAgICAgICAgIC5vZmYoJ2NsaWNrLnNsaWNrJywgXy5jaGFuZ2VTbGlkZSlcbiAgICAgICAgICAgICAgICAub2ZmKCdtb3VzZWVudGVyLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgLm9mZignbW91c2VsZWF2ZS5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIGZhbHNlKSk7XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJGRvdHMub2ZmKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlci5vZmYoJ2ZvY3VzLnNsaWNrIGJsdXIuc2xpY2snKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cgJiYgXy4kcHJldkFycm93Lm9mZignY2xpY2suc2xpY2snLCBfLmNoYW5nZVNsaWRlKTtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdyAmJiBfLiRuZXh0QXJyb3cub2ZmKCdjbGljay5zbGljaycsIF8uY2hhbmdlU2xpZGUpO1xuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cgJiYgXy4kcHJldkFycm93Lm9mZigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93ICYmIF8uJG5leHRBcnJvdy5vZmYoJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXy4kbGlzdC5vZmYoJ3RvdWNoc3RhcnQuc2xpY2sgbW91c2Vkb3duLnNsaWNrJywgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9mZigndG91Y2htb3ZlLnNsaWNrIG1vdXNlbW92ZS5zbGljaycsIF8uc3dpcGVIYW5kbGVyKTtcbiAgICAgICAgXy4kbGlzdC5vZmYoJ3RvdWNoZW5kLnNsaWNrIG1vdXNldXAuc2xpY2snLCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub2ZmKCd0b3VjaGNhbmNlbC5zbGljayBtb3VzZWxlYXZlLnNsaWNrJywgXy5zd2lwZUhhbmRsZXIpO1xuXG4gICAgICAgIF8uJGxpc3Qub2ZmKCdjbGljay5zbGljaycsIF8uY2xpY2tIYW5kbGVyKTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoXy52aXNpYmlsaXR5Q2hhbmdlLCBfLnZpc2liaWxpdHkpO1xuXG4gICAgICAgIF8uY2xlYW5VcFNsaWRlRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRsaXN0Lm9mZigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZvY3VzT25TZWxlY3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgICQoXy4kc2xpZGVUcmFjaykuY2hpbGRyZW4oKS5vZmYoJ2NsaWNrLnNsaWNrJywgXy5zZWxlY3RIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQod2luZG93KS5vZmYoJ29yaWVudGF0aW9uY2hhbmdlLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCBfLm9yaWVudGF0aW9uQ2hhbmdlKTtcblxuICAgICAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUuc2xpY2suc2xpY2stJyArIF8uaW5zdGFuY2VVaWQsIF8ucmVzaXplKTtcblxuICAgICAgICAkKCdbZHJhZ2dhYmxlIT10cnVlXScsIF8uJHNsaWRlVHJhY2spLm9mZignZHJhZ3N0YXJ0JywgXy5wcmV2ZW50RGVmYXVsdCk7XG5cbiAgICAgICAgJCh3aW5kb3cpLm9mZignbG9hZC5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgXy5zZXRQb3NpdGlvbik7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNsZWFuVXBTbGlkZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLiRsaXN0Lm9mZignbW91c2VlbnRlci5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIHRydWUpKTtcbiAgICAgICAgXy4kbGlzdC5vZmYoJ21vdXNlbGVhdmUuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCBmYWxzZSkpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jbGVhblVwUm93cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcywgb3JpZ2luYWxTbGlkZXM7XG5cbiAgICAgICAgaWYoXy5vcHRpb25zLnJvd3MgPiAwKSB7XG4gICAgICAgICAgICBvcmlnaW5hbFNsaWRlcyA9IF8uJHNsaWRlcy5jaGlsZHJlbigpLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICBvcmlnaW5hbFNsaWRlcy5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgXy4kc2xpZGVyLmVtcHR5KCkuYXBwZW5kKG9yaWdpbmFsU2xpZGVzKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jbGlja0hhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5zaG91bGRDbGljayA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbihyZWZyZXNoKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uYXV0b1BsYXlDbGVhcigpO1xuXG4gICAgICAgIF8udG91Y2hPYmplY3QgPSB7fTtcblxuICAgICAgICBfLmNsZWFuVXBFdmVudHMoKTtcblxuICAgICAgICAkKCcuc2xpY2stY2xvbmVkJywgXy4kc2xpZGVyKS5kZXRhY2goKTtcblxuICAgICAgICBpZiAoXy4kZG90cykge1xuICAgICAgICAgICAgXy4kZG90cy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy4kcHJldkFycm93ICYmIF8uJHByZXZBcnJvdy5sZW5ndGggKSB7XG5cbiAgICAgICAgICAgIF8uJHByZXZBcnJvd1xuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQgc2xpY2stYXJyb3cgc2xpY2staGlkZGVuJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4gYXJpYS1kaXNhYmxlZCB0YWJpbmRleCcpXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsJycpO1xuXG4gICAgICAgICAgICBpZiAoIF8uaHRtbEV4cHIudGVzdCggXy5vcHRpb25zLnByZXZBcnJvdyApKSB7XG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLiRuZXh0QXJyb3cgJiYgXy4kbmV4dEFycm93Lmxlbmd0aCApIHtcblxuICAgICAgICAgICAgXy4kbmV4dEFycm93XG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCBzbGljay1hcnJvdyBzbGljay1oaWRkZW4nKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbiBhcmlhLWRpc2FibGVkIHRhYmluZGV4JylcbiAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywnJyk7XG5cbiAgICAgICAgICAgIGlmICggXy5odG1sRXhwci50ZXN0KCBfLm9wdGlvbnMubmV4dEFycm93ICkpIHtcbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChfLiRzbGlkZXMpIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1zbGlkZSBzbGljay1hY3RpdmUgc2xpY2stY2VudGVyIHNsaWNrLXZpc2libGUgc2xpY2stY3VycmVudCcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1zbGljay1pbmRleCcpXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdzdHlsZScsICQodGhpcykuZGF0YSgnb3JpZ2luYWxTdHlsaW5nJykpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suZGV0YWNoKCk7XG5cbiAgICAgICAgICAgIF8uJGxpc3QuZGV0YWNoKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlci5hcHBlbmQoXy4kc2xpZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uY2xlYW5VcFJvd3MoKTtcblxuICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLXNsaWRlcicpO1xuICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJyk7XG4gICAgICAgIF8uJHNsaWRlci5yZW1vdmVDbGFzcygnc2xpY2stZG90dGVkJyk7XG5cbiAgICAgICAgXy51bnNsaWNrZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmKCFyZWZyZXNoKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignZGVzdHJveScsIFtfXSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZGlzYWJsZVRyYW5zaXRpb24gPSBmdW5jdGlvbihzbGlkZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHRyYW5zaXRpb24gPSB7fTtcblxuICAgICAgICB0cmFuc2l0aW9uW18udHJhbnNpdGlvblR5cGVdID0gJyc7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3ModHJhbnNpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGUpLmNzcyh0cmFuc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5mYWRlU2xpZGUgPSBmdW5jdGlvbihzbGlkZUluZGV4LCBjYWxsYmFjaykge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5jc3NUcmFuc2l0aW9ucyA9PT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlSW5kZXgpLmNzcyh7XG4gICAgICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlSW5kZXgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCwgXy5vcHRpb25zLmVhc2luZywgY2FsbGJhY2spO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIF8uYXBwbHlUcmFuc2l0aW9uKHNsaWRlSW5kZXgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGVJbmRleCkuY3NzKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5kaXNhYmxlVHJhbnNpdGlvbihzbGlkZUluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKCk7XG4gICAgICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmZhZGVTbGlkZU91dCA9IGZ1bmN0aW9uKHNsaWRlSW5kZXgpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uY3NzVHJhbnNpdGlvbnMgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZUluZGV4KS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleCAtIDJcbiAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCwgXy5vcHRpb25zLmVhc2luZyk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgXy5hcHBseVRyYW5zaXRpb24oc2xpZGVJbmRleCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZUluZGV4KS5jc3Moe1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4IC0gMlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5maWx0ZXJTbGlkZXMgPSBTbGljay5wcm90b3R5cGUuc2xpY2tGaWx0ZXIgPSBmdW5jdGlvbihmaWx0ZXIpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKGZpbHRlciAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXNDYWNoZSA9IF8uJHNsaWRlcztcblxuICAgICAgICAgICAgXy51bmxvYWQoKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXNDYWNoZS5maWx0ZXIoZmlsdGVyKS5hcHBlbmRUbyhfLiRzbGlkZVRyYWNrKTtcblxuICAgICAgICAgICAgXy5yZWluaXQoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmZvY3VzSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLiRzbGlkZXJcbiAgICAgICAgICAgIC5vZmYoJ2ZvY3VzLnNsaWNrIGJsdXIuc2xpY2snKVxuICAgICAgICAgICAgLm9uKCdmb2N1cy5zbGljayBibHVyLnNsaWNrJywgJyonLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHZhciAkc2YgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgaWYoIF8ub3B0aW9ucy5wYXVzZU9uRm9jdXMgKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZm9jdXNzZWQgPSAkc2YuaXMoJzpmb2N1cycpO1xuICAgICAgICAgICAgICAgICAgICBfLmF1dG9QbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCAwKTtcblxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldEN1cnJlbnQgPSBTbGljay5wcm90b3R5cGUuc2xpY2tDdXJyZW50U2xpZGUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBfLmN1cnJlbnRTbGlkZTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0RG90Q291bnQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGJyZWFrUG9pbnQgPSAwO1xuICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgIHZhciBwYWdlclF0eSA9IDA7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAgICAgICsrcGFnZXJRdHk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdoaWxlIChicmVha1BvaW50IDwgXy5zbGlkZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICsrcGFnZXJRdHk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrUG9pbnQgPSBjb3VudGVyICsgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyICs9IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID8gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIDogXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBhZ2VyUXR5ID0gXy5zbGlkZUNvdW50O1xuICAgICAgICB9IGVsc2UgaWYoIV8ub3B0aW9ucy5hc05hdkZvcikge1xuICAgICAgICAgICAgcGFnZXJRdHkgPSAxICsgTWF0aC5jZWlsKChfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAvIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHdoaWxlIChicmVha1BvaW50IDwgXy5zbGlkZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgKytwYWdlclF0eTtcbiAgICAgICAgICAgICAgICBicmVha1BvaW50ID0gY291bnRlciArIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcbiAgICAgICAgICAgICAgICBjb3VudGVyICs9IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID8gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIDogXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYWdlclF0eSAtIDE7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldExlZnQgPSBmdW5jdGlvbihzbGlkZUluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgdGFyZ2V0TGVmdCxcbiAgICAgICAgICAgIHZlcnRpY2FsSGVpZ2h0LFxuICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAwLFxuICAgICAgICAgICAgdGFyZ2V0U2xpZGUsXG4gICAgICAgICAgICBjb2VmO1xuXG4gICAgICAgIF8uc2xpZGVPZmZzZXQgPSAwO1xuICAgICAgICB2ZXJ0aWNhbEhlaWdodCA9IF8uJHNsaWRlcy5maXJzdCgpLm91dGVySGVpZ2h0KHRydWUpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9IChfLnNsaWRlV2lkdGggKiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAqIC0xO1xuICAgICAgICAgICAgICAgIGNvZWYgPSAtMVxuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29lZiA9IC0xLjU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29lZiA9IC0yXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAodmVydGljYWxIZWlnaHQgKiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAqIGNvZWY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgPiBfLnNsaWRlQ291bnQgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGVJbmRleCA+IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9ICgoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAtIChzbGlkZUluZGV4IC0gXy5zbGlkZUNvdW50KSkgKiBfLnNsaWRlV2lkdGgpICogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbE9mZnNldCA9ICgoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAtIChzbGlkZUluZGV4IC0gXy5zbGlkZUNvdW50KSkgKiB2ZXJ0aWNhbEhlaWdodCkgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCkgKiBfLnNsaWRlV2lkdGgpICogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbE9mZnNldCA9ICgoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSAqIHZlcnRpY2FsSGVpZ2h0KSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID4gXy5zbGlkZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9ICgoc2xpZGVJbmRleCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIC0gXy5zbGlkZUNvdW50KSAqIF8uc2xpZGVXaWR0aDtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbE9mZnNldCA9ICgoc2xpZGVJbmRleCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIC0gXy5zbGlkZUNvdW50KSAqIHZlcnRpY2FsSGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gMDtcbiAgICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9ICgoXy5zbGlkZVdpZHRoICogTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSkgLyAyKSAtICgoXy5zbGlkZVdpZHRoICogXy5zbGlkZUNvdW50KSAvIDIpO1xuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlICYmIF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5zbGlkZU9mZnNldCArPSBfLnNsaWRlV2lkdGggKiBNYXRoLmZsb29yKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyKSAtIF8uc2xpZGVXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9IDA7XG4gICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ICs9IF8uc2xpZGVXaWR0aCAqIE1hdGguZmxvb3IoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRhcmdldExlZnQgPSAoKHNsaWRlSW5kZXggKiBfLnNsaWRlV2lkdGgpICogLTEpICsgXy5zbGlkZU9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldExlZnQgPSAoKHNsaWRlSW5kZXggKiB2ZXJ0aWNhbEhlaWdodCkgKiAtMSkgKyB2ZXJ0aWNhbE9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmFyaWFibGVXaWR0aCA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgfHwgXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykuZXEoc2xpZGVJbmRleCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykuZXEoc2xpZGVJbmRleCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRTbGlkZVswXSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKF8uJHNsaWRlVHJhY2sud2lkdGgoKSAtIHRhcmdldFNsaWRlWzBdLm9mZnNldExlZnQgLSB0YXJnZXRTbGlkZS53aWR0aCgpKSAqIC0xO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSAgMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSB0YXJnZXRTbGlkZVswXSA/IHRhcmdldFNsaWRlWzBdLm9mZnNldExlZnQgKiAtMSA6IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyB8fCBfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykuZXEoc2xpZGVJbmRleCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0U2xpZGUgPSBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS5lcShzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdyArIDEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMucnRsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRTbGlkZVswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IChfLiRzbGlkZVRyYWNrLndpZHRoKCkgLSB0YXJnZXRTbGlkZVswXS5vZmZzZXRMZWZ0IC0gdGFyZ2V0U2xpZGUud2lkdGgoKSkgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSAgMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSB0YXJnZXRTbGlkZVswXSA/IHRhcmdldFNsaWRlWzBdLm9mZnNldExlZnQgKiAtMSA6IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCArPSAoXy4kbGlzdC53aWR0aCgpIC0gdGFyZ2V0U2xpZGUub3V0ZXJXaWR0aCgpKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0TGVmdDtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0T3B0aW9uID0gU2xpY2sucHJvdG90eXBlLnNsaWNrR2V0T3B0aW9uID0gZnVuY3Rpb24ob3B0aW9uKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBfLm9wdGlvbnNbb3B0aW9uXTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0TmF2aWdhYmxlSW5kZXhlcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGJyZWFrUG9pbnQgPSAwLFxuICAgICAgICAgICAgY291bnRlciA9IDAsXG4gICAgICAgICAgICBpbmRleGVzID0gW10sXG4gICAgICAgICAgICBtYXg7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG1heCA9IF8uc2xpZGVDb3VudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrUG9pbnQgPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgKiAtMTtcbiAgICAgICAgICAgIGNvdW50ZXIgPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgKiAtMTtcbiAgICAgICAgICAgIG1heCA9IF8uc2xpZGVDb3VudCAqIDI7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoYnJlYWtQb2ludCA8IG1heCkge1xuICAgICAgICAgICAgaW5kZXhlcy5wdXNoKGJyZWFrUG9pbnQpO1xuICAgICAgICAgICAgYnJlYWtQb2ludCA9IGNvdW50ZXIgKyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICAgICAgICBjb3VudGVyICs9IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID8gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIDogXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleGVzO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXRTbGljayA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXRTbGlkZUNvdW50ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgc2xpZGVzVHJhdmVyc2VkLCBzd2lwZWRTbGlkZSwgY2VudGVyT2Zmc2V0O1xuXG4gICAgICAgIGNlbnRlck9mZnNldCA9IF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlID8gXy5zbGlkZVdpZHRoICogTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMikgOiAwO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuc3dpcGVUb1NsaWRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmZpbmQoJy5zbGljay1zbGlkZScpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHNsaWRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlLm9mZnNldExlZnQgLSBjZW50ZXJPZmZzZXQgKyAoJChzbGlkZSkub3V0ZXJXaWR0aCgpIC8gMikgPiAoXy5zd2lwZUxlZnQgKiAtMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVkU2xpZGUgPSBzbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzbGlkZXNUcmF2ZXJzZWQgPSBNYXRoLmFicygkKHN3aXBlZFNsaWRlKS5hdHRyKCdkYXRhLXNsaWNrLWluZGV4JykgLSBfLmN1cnJlbnRTbGlkZSkgfHwgMTtcblxuICAgICAgICAgICAgcmV0dXJuIHNsaWRlc1RyYXZlcnNlZDtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nb1RvID0gU2xpY2sucHJvdG90eXBlLnNsaWNrR29UbyA9IGZ1bmN0aW9uKHNsaWRlLCBkb250QW5pbWF0ZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnaW5kZXgnLFxuICAgICAgICAgICAgICAgIGluZGV4OiBwYXJzZUludChzbGlkZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZG9udEFuaW1hdGUpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oY3JlYXRpb24pIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCEkKF8uJHNsaWRlcikuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcblxuICAgICAgICAgICAgJChfLiRzbGlkZXIpLmFkZENsYXNzKCdzbGljay1pbml0aWFsaXplZCcpO1xuXG4gICAgICAgICAgICBfLmJ1aWxkUm93cygpO1xuICAgICAgICAgICAgXy5idWlsZE91dCgpO1xuICAgICAgICAgICAgXy5zZXRQcm9wcygpO1xuICAgICAgICAgICAgXy5zdGFydExvYWQoKTtcbiAgICAgICAgICAgIF8ubG9hZFNsaWRlcigpO1xuICAgICAgICAgICAgXy5pbml0aWFsaXplRXZlbnRzKCk7XG4gICAgICAgICAgICBfLnVwZGF0ZUFycm93cygpO1xuICAgICAgICAgICAgXy51cGRhdGVEb3RzKCk7XG4gICAgICAgICAgICBfLmNoZWNrUmVzcG9uc2l2ZSh0cnVlKTtcbiAgICAgICAgICAgIF8uZm9jdXNIYW5kbGVyKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjcmVhdGlvbikge1xuICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2luaXQnLCBbX10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLmluaXRBREEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy5vcHRpb25zLmF1dG9wbGF5ICkge1xuXG4gICAgICAgICAgICBfLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgXy5hdXRvUGxheSgpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdEFEQSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgbnVtRG90R3JvdXBzID0gTWF0aC5jZWlsKF8uc2xpZGVDb3VudCAvIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpLFxuICAgICAgICAgICAgICAgIHRhYkNvbnRyb2xJbmRleGVzID0gXy5nZXROYXZpZ2FibGVJbmRleGVzKCkuZmlsdGVyKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHZhbCA+PSAwKSAmJiAodmFsIDwgXy5zbGlkZUNvdW50KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXMuYWRkKF8uJHNsaWRlVHJhY2suZmluZCgnLnNsaWNrLWNsb25lZCcpKS5hdHRyKHtcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICAgICd0YWJpbmRleCc6ICctMSdcbiAgICAgICAgfSkuZmluZCgnYSwgaW5wdXQsIGJ1dHRvbiwgc2VsZWN0JykuYXR0cih7XG4gICAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChfLiRkb3RzICE9PSBudWxsKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXMubm90KF8uJHNsaWRlVHJhY2suZmluZCgnLnNsaWNrLWNsb25lZCcpKS5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVDb250cm9sSW5kZXggPSB0YWJDb250cm9sSW5kZXhlcy5pbmRleE9mKGkpO1xuXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgJ3JvbGUnOiAndGFicGFuZWwnLFxuICAgICAgICAgICAgICAgICAgICAnaWQnOiAnc2xpY2stc2xpZGUnICsgXy5pbnN0YW5jZVVpZCArIGksXG4gICAgICAgICAgICAgICAgICAgICd0YWJpbmRleCc6IC0xXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVDb250cm9sSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgdmFyIGFyaWFCdXR0b25Db250cm9sID0gJ3NsaWNrLXNsaWRlLWNvbnRyb2wnICsgXy5pbnN0YW5jZVVpZCArIHNsaWRlQ29udHJvbEluZGV4XG4gICAgICAgICAgICAgICAgICAgaWYgKCQoJyMnICsgYXJpYUJ1dHRvbkNvbnRyb2wpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnYXJpYS1kZXNjcmliZWRieSc6IGFyaWFCdXR0b25Db250cm9sXG4gICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF8uJGRvdHMuYXR0cigncm9sZScsICd0YWJsaXN0JykuZmluZCgnbGknKS5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFwcGVkU2xpZGVJbmRleCA9IHRhYkNvbnRyb2xJbmRleGVzW2ldO1xuXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgJ3JvbGUnOiAncHJlc2VudGF0aW9uJ1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdidXR0b24nKS5maXJzdCgpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAncm9sZSc6ICd0YWInLFxuICAgICAgICAgICAgICAgICAgICAnaWQnOiAnc2xpY2stc2xpZGUtY29udHJvbCcgKyBfLmluc3RhbmNlVWlkICsgaSxcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtY29udHJvbHMnOiAnc2xpY2stc2xpZGUnICsgXy5pbnN0YW5jZVVpZCArIG1hcHBlZFNsaWRlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICdhcmlhLWxhYmVsJzogKGkgKyAxKSArICcgb2YgJyArIG51bURvdEdyb3VwcyxcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pLmVxKF8uY3VycmVudFNsaWRlKS5maW5kKCdidXR0b24nKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAnYXJpYS1zZWxlY3RlZCc6ICd0cnVlJyxcbiAgICAgICAgICAgICAgICAndGFiaW5kZXgnOiAnMCdcbiAgICAgICAgICAgIH0pLmVuZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaT1fLmN1cnJlbnRTbGlkZSwgbWF4PWkrXy5vcHRpb25zLnNsaWRlc1RvU2hvdzsgaSA8IG1heDsgaSsrKSB7XG4gICAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uQ2hhbmdlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoaSkuYXR0cih7J3RhYmluZGV4JzogJzAnfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShpKS5yZW1vdmVBdHRyKCd0YWJpbmRleCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF8uYWN0aXZhdGVBREEoKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdEFycm93RXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIF8uJHByZXZBcnJvd1xuICAgICAgICAgICAgICAgLm9mZignY2xpY2suc2xpY2snKVxuICAgICAgICAgICAgICAgLm9uKCdjbGljay5zbGljaycsIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ3ByZXZpb3VzJ1xuICAgICAgICAgICAgICAgfSwgXy5jaGFuZ2VTbGlkZSk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3dcbiAgICAgICAgICAgICAgIC5vZmYoJ2NsaWNrLnNsaWNrJylcbiAgICAgICAgICAgICAgIC5vbignY2xpY2suc2xpY2snLCB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICduZXh0J1xuICAgICAgICAgICAgICAgfSwgXy5jaGFuZ2VTbGlkZSk7XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5vbigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93Lm9uKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0RG90RXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAkKCdsaScsIF8uJGRvdHMpLm9uKCdjbGljay5zbGljaycsIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnaW5kZXgnXG4gICAgICAgICAgICB9LCBfLmNoYW5nZVNsaWRlKTtcblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy4kZG90cy5vbigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgPT09IHRydWUgJiYgXy5vcHRpb25zLnBhdXNlT25Eb3RzSG92ZXIgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICAkKCdsaScsIF8uJGRvdHMpXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgZmFsc2UpKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRTbGlkZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5wYXVzZU9uSG92ZXIgKSB7XG5cbiAgICAgICAgICAgIF8uJGxpc3Qub24oJ21vdXNlZW50ZXIuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCB0cnVlKSk7XG4gICAgICAgICAgICBfLiRsaXN0Lm9uKCdtb3VzZWxlYXZlLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgZmFsc2UpKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRpYWxpemVFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5pbml0QXJyb3dFdmVudHMoKTtcblxuICAgICAgICBfLmluaXREb3RFdmVudHMoKTtcbiAgICAgICAgXy5pbml0U2xpZGVFdmVudHMoKTtcblxuICAgICAgICBfLiRsaXN0Lm9uKCd0b3VjaHN0YXJ0LnNsaWNrIG1vdXNlZG93bi5zbGljaycsIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ3N0YXJ0J1xuICAgICAgICB9LCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub24oJ3RvdWNobW92ZS5zbGljayBtb3VzZW1vdmUuc2xpY2snLCB7XG4gICAgICAgICAgICBhY3Rpb246ICdtb3ZlJ1xuICAgICAgICB9LCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub24oJ3RvdWNoZW5kLnNsaWNrIG1vdXNldXAuc2xpY2snLCB7XG4gICAgICAgICAgICBhY3Rpb246ICdlbmQnXG4gICAgICAgIH0sIF8uc3dpcGVIYW5kbGVyKTtcbiAgICAgICAgXy4kbGlzdC5vbigndG91Y2hjYW5jZWwuc2xpY2sgbW91c2VsZWF2ZS5zbGljaycsIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ2VuZCdcbiAgICAgICAgfSwgXy5zd2lwZUhhbmRsZXIpO1xuXG4gICAgICAgIF8uJGxpc3Qub24oJ2NsaWNrLnNsaWNrJywgXy5jbGlja0hhbmRsZXIpO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKF8udmlzaWJpbGl0eUNoYW5nZSwgJC5wcm94eShfLnZpc2liaWxpdHksIF8pKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uJGxpc3Qub24oJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uU2VsZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkKF8uJHNsaWRlVHJhY2spLmNoaWxkcmVuKCkub24oJ2NsaWNrLnNsaWNrJywgXy5zZWxlY3RIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQod2luZG93KS5vbignb3JpZW50YXRpb25jaGFuZ2Uuc2xpY2suc2xpY2stJyArIF8uaW5zdGFuY2VVaWQsICQucHJveHkoXy5vcmllbnRhdGlvbkNoYW5nZSwgXykpO1xuXG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCAkLnByb3h5KF8ucmVzaXplLCBfKSk7XG5cbiAgICAgICAgJCgnW2RyYWdnYWJsZSE9dHJ1ZV0nLCBfLiRzbGlkZVRyYWNrKS5vbignZHJhZ3N0YXJ0JywgXy5wcmV2ZW50RGVmYXVsdCk7XG5cbiAgICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCBfLnNldFBvc2l0aW9uKTtcbiAgICAgICAgJChfLnNldFBvc2l0aW9uKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdFVJID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgXy4kcHJldkFycm93LnNob3coKTtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdy5zaG93KCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uJGRvdHMuc2hvdygpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUua2V5SGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuICAgICAgICAgLy9Eb250IHNsaWRlIGlmIHRoZSBjdXJzb3IgaXMgaW5zaWRlIHRoZSBmb3JtIGZpZWxkcyBhbmQgYXJyb3cga2V5cyBhcmUgcHJlc3NlZFxuICAgICAgICBpZighZXZlbnQudGFyZ2V0LnRhZ05hbWUubWF0Y2goJ1RFWFRBUkVBfElOUFVUfFNFTEVDVCcpKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgJiYgXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSA/ICduZXh0JyA6ICAncHJldmlvdXMnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgJiYgXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSA/ICdwcmV2aW91cycgOiAnbmV4dCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmxhenlMb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgbG9hZFJhbmdlLCBjbG9uZVJhbmdlLCByYW5nZVN0YXJ0LCByYW5nZUVuZDtcblxuICAgICAgICBmdW5jdGlvbiBsb2FkSW1hZ2VzKGltYWdlc1Njb3BlKSB7XG5cbiAgICAgICAgICAgICQoJ2ltZ1tkYXRhLWxhenldJywgaW1hZ2VzU2NvcGUpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVNvdXJjZSA9ICQodGhpcykuYXR0cignZGF0YS1sYXp5JyksXG4gICAgICAgICAgICAgICAgICAgIGltYWdlU3JjU2V0ID0gJCh0aGlzKS5hdHRyKCdkYXRhLXNyY3NldCcpLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVNpemVzICA9ICQodGhpcykuYXR0cignZGF0YS1zaXplcycpIHx8IF8uJHNsaWRlci5hdHRyKCdkYXRhLXNpemVzJyksXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVG9Mb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgICAgICAgICBpbWFnZVRvTG9hZC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFuaW1hdGUoeyBvcGFjaXR5OiAwIH0sIDEwMCwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2VTcmNTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzcmNzZXQnLCBpbWFnZVNyY1NldCApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZVNpemVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzaXplcycsIGltYWdlU2l6ZXMgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBpbWFnZVNvdXJjZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuaW1hdGUoeyBvcGFjaXR5OiAxIH0sIDIwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLWxhenkgZGF0YS1zcmNzZXQgZGF0YS1zaXplcycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdsYXp5TG9hZGVkJywgW18sIGltYWdlLCBpbWFnZVNvdXJjZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaW1hZ2VUb0xvYWQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0ciggJ2RhdGEtbGF6eScgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCAnc2xpY2stbG9hZGluZycgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCAnc2xpY2stbGF6eWxvYWQtZXJyb3InICk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2xhenlMb2FkRXJyb3InLCBbIF8sIGltYWdlLCBpbWFnZVNvdXJjZSBdKTtcblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpbWFnZVRvTG9hZC5zcmMgPSBpbWFnZVNvdXJjZTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJhbmdlU3RhcnQgPSBfLmN1cnJlbnRTbGlkZSArIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMiArIDEpO1xuICAgICAgICAgICAgICAgIHJhbmdlRW5kID0gcmFuZ2VTdGFydCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByYW5nZVN0YXJ0ID0gTWF0aC5tYXgoMCwgXy5jdXJyZW50U2xpZGUgLSAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIgKyAxKSk7XG4gICAgICAgICAgICAgICAgcmFuZ2VFbmQgPSAyICsgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyICsgMSkgKyBfLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSBfLm9wdGlvbnMuaW5maW5pdGUgPyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgXy5jdXJyZW50U2xpZGUgOiBfLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgICAgIHJhbmdlRW5kID0gTWF0aC5jZWlsKHJhbmdlU3RhcnQgKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChyYW5nZVN0YXJ0ID4gMCkgcmFuZ2VTdGFydC0tO1xuICAgICAgICAgICAgICAgIGlmIChyYW5nZUVuZCA8PSBfLnNsaWRlQ291bnQpIHJhbmdlRW5kKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkUmFuZ2UgPSBfLiRzbGlkZXIuZmluZCgnLnNsaWNrLXNsaWRlJykuc2xpY2UocmFuZ2VTdGFydCwgcmFuZ2VFbmQpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMubGF6eUxvYWQgPT09ICdhbnRpY2lwYXRlZCcpIHtcbiAgICAgICAgICAgIHZhciBwcmV2U2xpZGUgPSByYW5nZVN0YXJ0IC0gMSxcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGUgPSByYW5nZUVuZCxcbiAgICAgICAgICAgICAgICAkc2xpZGVzID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1zbGlkZScpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZTbGlkZSA8IDApIHByZXZTbGlkZSA9IF8uc2xpZGVDb3VudCAtIDE7XG4gICAgICAgICAgICAgICAgbG9hZFJhbmdlID0gbG9hZFJhbmdlLmFkZCgkc2xpZGVzLmVxKHByZXZTbGlkZSkpO1xuICAgICAgICAgICAgICAgIGxvYWRSYW5nZSA9IGxvYWRSYW5nZS5hZGQoJHNsaWRlcy5lcShuZXh0U2xpZGUpKTtcbiAgICAgICAgICAgICAgICBwcmV2U2xpZGUtLTtcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGUrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRJbWFnZXMobG9hZFJhbmdlKTtcblxuICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIGNsb25lUmFuZ2UgPSBfLiRzbGlkZXIuZmluZCgnLnNsaWNrLXNsaWRlJyk7XG4gICAgICAgICAgICBsb2FkSW1hZ2VzKGNsb25lUmFuZ2UpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgaWYgKF8uY3VycmVudFNsaWRlID49IF8uc2xpZGVDb3VudCAtIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIGNsb25lUmFuZ2UgPSBfLiRzbGlkZXIuZmluZCgnLnNsaWNrLWNsb25lZCcpLnNsaWNlKDAsIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpO1xuICAgICAgICAgICAgbG9hZEltYWdlcyhjbG9uZVJhbmdlKTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmN1cnJlbnRTbGlkZSA9PT0gMCkge1xuICAgICAgICAgICAgY2xvbmVSYW5nZSA9IF8uJHNsaWRlci5maW5kKCcuc2xpY2stY2xvbmVkJykuc2xpY2UoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAqIC0xKTtcbiAgICAgICAgICAgIGxvYWRJbWFnZXMoY2xvbmVSYW5nZSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUubG9hZFNsaWRlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLnNldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5jc3Moe1xuICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLWxvYWRpbmcnKTtcblxuICAgICAgICBfLmluaXRVSSgpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMubGF6eUxvYWQgPT09ICdwcm9ncmVzc2l2ZScpIHtcbiAgICAgICAgICAgIF8ucHJvZ3Jlc3NpdmVMYXp5TG9hZCgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLm5leHQgPSBTbGljay5wcm90b3R5cGUuc2xpY2tOZXh0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uY2hhbmdlU2xpZGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICduZXh0J1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUub3JpZW50YXRpb25DaGFuZ2UgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5jaGVja1Jlc3BvbnNpdmUoKTtcbiAgICAgICAgXy5zZXRQb3NpdGlvbigpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wYXVzZSA9IFNsaWNrLnByb3RvdHlwZS5zbGlja1BhdXNlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uYXV0b1BsYXlDbGVhcigpO1xuICAgICAgICBfLnBhdXNlZCA9IHRydWU7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnBsYXkgPSBTbGljay5wcm90b3R5cGUuc2xpY2tQbGF5ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uYXV0b1BsYXkoKTtcbiAgICAgICAgXy5vcHRpb25zLmF1dG9wbGF5ID0gdHJ1ZTtcbiAgICAgICAgXy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgXy5mb2N1c3NlZCA9IGZhbHNlO1xuICAgICAgICBfLmludGVycnVwdGVkID0gZmFsc2U7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnBvc3RTbGlkZSA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmKCAhXy51bnNsaWNrZWQgKSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdhZnRlckNoYW5nZScsIFtfLCBpbmRleF0pO1xuXG4gICAgICAgICAgICBfLmFuaW1hdGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgIF8uc2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy5zd2lwZUxlZnQgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAoIF8ub3B0aW9ucy5hdXRvcGxheSApIHtcbiAgICAgICAgICAgICAgICBfLmF1dG9QbGF5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uaW5pdEFEQSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkY3VycmVudFNsaWRlID0gJChfLiRzbGlkZXMuZ2V0KF8uY3VycmVudFNsaWRlKSk7XG4gICAgICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUuYXR0cigndGFiaW5kZXgnLCAwKS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnByZXYgPSBTbGljay5wcm90b3R5cGUuc2xpY2tQcmV2ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uY2hhbmdlU2xpZGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdwcmV2aW91cydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wcm9ncmVzc2l2ZUxhenlMb2FkID0gZnVuY3Rpb24oIHRyeUNvdW50ICkge1xuXG4gICAgICAgIHRyeUNvdW50ID0gdHJ5Q291bnQgfHwgMTtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICAkaW1nc1RvTG9hZCA9ICQoICdpbWdbZGF0YS1sYXp5XScsIF8uJHNsaWRlciApLFxuICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICAgICBpbWFnZVNvdXJjZSxcbiAgICAgICAgICAgIGltYWdlU3JjU2V0LFxuICAgICAgICAgICAgaW1hZ2VTaXplcyxcbiAgICAgICAgICAgIGltYWdlVG9Mb2FkO1xuXG4gICAgICAgIGlmICggJGltZ3NUb0xvYWQubGVuZ3RoICkge1xuXG4gICAgICAgICAgICBpbWFnZSA9ICRpbWdzVG9Mb2FkLmZpcnN0KCk7XG4gICAgICAgICAgICBpbWFnZVNvdXJjZSA9IGltYWdlLmF0dHIoJ2RhdGEtbGF6eScpO1xuICAgICAgICAgICAgaW1hZ2VTcmNTZXQgPSBpbWFnZS5hdHRyKCdkYXRhLXNyY3NldCcpO1xuICAgICAgICAgICAgaW1hZ2VTaXplcyAgPSBpbWFnZS5hdHRyKCdkYXRhLXNpemVzJykgfHwgXy4kc2xpZGVyLmF0dHIoJ2RhdGEtc2l6ZXMnKTtcbiAgICAgICAgICAgIGltYWdlVG9Mb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgICAgIGltYWdlVG9Mb2FkLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGltYWdlU3JjU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Jjc2V0JywgaW1hZ2VTcmNTZXQgKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2VTaXplcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc2l6ZXMnLCBpbWFnZVNpemVzICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAuYXR0ciggJ3NyYycsIGltYWdlU291cmNlIClcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtbGF6eSBkYXRhLXNyY3NldCBkYXRhLXNpemVzJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1sb2FkaW5nJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIF8ub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAgICAgXy5zZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdsYXp5TG9hZGVkJywgWyBfLCBpbWFnZSwgaW1hZ2VTb3VyY2UgXSk7XG4gICAgICAgICAgICAgICAgXy5wcm9ncmVzc2l2ZUxhenlMb2FkKCk7XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGltYWdlVG9Mb2FkLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIGlmICggdHJ5Q291bnQgPCAzICkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiB0cnkgdG8gbG9hZCB0aGUgaW1hZ2UgMyB0aW1lcyxcbiAgICAgICAgICAgICAgICAgICAgICogbGVhdmUgYSBzbGlnaHQgZGVsYXkgc28gd2UgZG9uJ3QgZ2V0XG4gICAgICAgICAgICAgICAgICAgICAqIHNlcnZlcnMgYmxvY2tpbmcgdGhlIHJlcXVlc3QuXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8ucHJvZ3Jlc3NpdmVMYXp5TG9hZCggdHJ5Q291bnQgKyAxICk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoICdkYXRhLWxhenknIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyggJ3NsaWNrLWxvYWRpbmcnIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyggJ3NsaWNrLWxhenlsb2FkLWVycm9yJyApO1xuXG4gICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdsYXp5TG9hZEVycm9yJywgWyBfLCBpbWFnZSwgaW1hZ2VTb3VyY2UgXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5wcm9ncmVzc2l2ZUxhenlMb2FkKCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGltYWdlVG9Mb2FkLnNyYyA9IGltYWdlU291cmNlO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdhbGxJbWFnZXNMb2FkZWQnLCBbIF8gXSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24oIGluaXRpYWxpemluZyApIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsIGN1cnJlbnRTbGlkZSwgbGFzdFZpc2libGVJbmRleDtcblxuICAgICAgICBsYXN0VmlzaWJsZUluZGV4ID0gXy5zbGlkZUNvdW50IC0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcblxuICAgICAgICAvLyBpbiBub24taW5maW5pdGUgc2xpZGVycywgd2UgZG9uJ3Qgd2FudCB0byBnbyBwYXN0IHRoZVxuICAgICAgICAvLyBsYXN0IHZpc2libGUgaW5kZXguXG4gICAgICAgIGlmKCAhXy5vcHRpb25zLmluZmluaXRlICYmICggXy5jdXJyZW50U2xpZGUgPiBsYXN0VmlzaWJsZUluZGV4ICkpIHtcbiAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gbGFzdFZpc2libGVJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGxlc3Mgc2xpZGVzIHRoYW4gdG8gc2hvdywgZ28gdG8gc3RhcnQuXG4gICAgICAgIGlmICggXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKSB7XG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IDA7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRTbGlkZSA9IF8uY3VycmVudFNsaWRlO1xuXG4gICAgICAgIF8uZGVzdHJveSh0cnVlKTtcblxuICAgICAgICAkLmV4dGVuZChfLCBfLmluaXRpYWxzLCB7IGN1cnJlbnRTbGlkZTogY3VycmVudFNsaWRlIH0pO1xuXG4gICAgICAgIF8uaW5pdCgpO1xuXG4gICAgICAgIGlmKCAhaW5pdGlhbGl6aW5nICkge1xuXG4gICAgICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpbmRleCcsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBjdXJyZW50U2xpZGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5yZWdpc3RlckJyZWFrcG9pbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLCBicmVha3BvaW50LCBjdXJyZW50QnJlYWtwb2ludCwgbCxcbiAgICAgICAgICAgIHJlc3BvbnNpdmVTZXR0aW5ncyA9IF8ub3B0aW9ucy5yZXNwb25zaXZlIHx8IG51bGw7XG5cbiAgICAgICAgaWYgKCAkLnR5cGUocmVzcG9uc2l2ZVNldHRpbmdzKSA9PT0gJ2FycmF5JyAmJiByZXNwb25zaXZlU2V0dGluZ3MubGVuZ3RoICkge1xuXG4gICAgICAgICAgICBfLnJlc3BvbmRUbyA9IF8ub3B0aW9ucy5yZXNwb25kVG8gfHwgJ3dpbmRvdyc7XG5cbiAgICAgICAgICAgIGZvciAoIGJyZWFrcG9pbnQgaW4gcmVzcG9uc2l2ZVNldHRpbmdzICkge1xuXG4gICAgICAgICAgICAgICAgbCA9IF8uYnJlYWtwb2ludHMubGVuZ3RoLTE7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2l2ZVNldHRpbmdzLmhhc093blByb3BlcnR5KGJyZWFrcG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRCcmVha3BvaW50ID0gcmVzcG9uc2l2ZVNldHRpbmdzW2JyZWFrcG9pbnRdLmJyZWFrcG9pbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIHRoZSBicmVha3BvaW50cyBhbmQgY3V0IG91dCBhbnkgZXhpc3RpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gb25lcyB3aXRoIHRoZSBzYW1lIGJyZWFrcG9pbnQgbnVtYmVyLCB3ZSBkb24ndCB3YW50IGR1cGVzLlxuICAgICAgICAgICAgICAgICAgICB3aGlsZSggbCA+PSAwICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIF8uYnJlYWtwb2ludHNbbF0gJiYgXy5icmVha3BvaW50c1tsXSA9PT0gY3VycmVudEJyZWFrcG9pbnQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5icmVha3BvaW50cy5zcGxpY2UobCwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGwtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludHMucHVzaChjdXJyZW50QnJlYWtwb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludFNldHRpbmdzW2N1cnJlbnRCcmVha3BvaW50XSA9IHJlc3BvbnNpdmVTZXR0aW5nc1ticmVha3BvaW50XS5zZXR0aW5ncztcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLmJyZWFrcG9pbnRzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAoIF8ub3B0aW9ucy5tb2JpbGVGaXJzdCApID8gYS1iIDogYi1hO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5yZWluaXQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy4kc2xpZGVzID1cbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2tcbiAgICAgICAgICAgICAgICAuY2hpbGRyZW4oXy5vcHRpb25zLnNsaWRlKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stc2xpZGUnKTtcblxuICAgICAgICBfLnNsaWRlQ291bnQgPSBfLiRzbGlkZXMubGVuZ3RoO1xuXG4gICAgICAgIGlmIChfLmN1cnJlbnRTbGlkZSA+PSBfLnNsaWRlQ291bnQgJiYgXy5jdXJyZW50U2xpZGUgIT09IDApIHtcbiAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5jdXJyZW50U2xpZGUgLSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIF8ucmVnaXN0ZXJCcmVha3BvaW50cygpO1xuXG4gICAgICAgIF8uc2V0UHJvcHMoKTtcbiAgICAgICAgXy5zZXR1cEluZmluaXRlKCk7XG4gICAgICAgIF8uYnVpbGRBcnJvd3MoKTtcbiAgICAgICAgXy51cGRhdGVBcnJvd3MoKTtcbiAgICAgICAgXy5pbml0QXJyb3dFdmVudHMoKTtcbiAgICAgICAgXy5idWlsZERvdHMoKTtcbiAgICAgICAgXy51cGRhdGVEb3RzKCk7XG4gICAgICAgIF8uaW5pdERvdEV2ZW50cygpO1xuICAgICAgICBfLmNsZWFuVXBTbGlkZUV2ZW50cygpO1xuICAgICAgICBfLmluaXRTbGlkZUV2ZW50cygpO1xuXG4gICAgICAgIF8uY2hlY2tSZXNwb25zaXZlKGZhbHNlLCB0cnVlKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZvY3VzT25TZWxlY3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgICQoXy4kc2xpZGVUcmFjaykuY2hpbGRyZW4oKS5vbignY2xpY2suc2xpY2snLCBfLnNlbGVjdEhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5zZXRTbGlkZUNsYXNzZXModHlwZW9mIF8uY3VycmVudFNsaWRlID09PSAnbnVtYmVyJyA/IF8uY3VycmVudFNsaWRlIDogMCk7XG5cbiAgICAgICAgXy5zZXRQb3NpdGlvbigpO1xuICAgICAgICBfLmZvY3VzSGFuZGxlcigpO1xuXG4gICAgICAgIF8ucGF1c2VkID0gIV8ub3B0aW9ucy5hdXRvcGxheTtcbiAgICAgICAgXy5hdXRvUGxheSgpO1xuXG4gICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdyZUluaXQnLCBbX10pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpICE9PSBfLndpbmRvd1dpZHRoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoXy53aW5kb3dEZWxheSk7XG4gICAgICAgICAgICBfLndpbmRvd0RlbGF5ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgXy53aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICAgICAgICAgIF8uY2hlY2tSZXNwb25zaXZlKCk7XG4gICAgICAgICAgICAgICAgaWYoICFfLnVuc2xpY2tlZCApIHsgXy5zZXRQb3NpdGlvbigpOyB9XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnJlbW92ZVNsaWRlID0gU2xpY2sucHJvdG90eXBlLnNsaWNrUmVtb3ZlID0gZnVuY3Rpb24oaW5kZXgsIHJlbW92ZUJlZm9yZSwgcmVtb3ZlQWxsKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICh0eXBlb2YoaW5kZXgpID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHJlbW92ZUJlZm9yZSA9IGluZGV4O1xuICAgICAgICAgICAgaW5kZXggPSByZW1vdmVCZWZvcmUgPT09IHRydWUgPyAwIDogXy5zbGlkZUNvdW50IC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gcmVtb3ZlQmVmb3JlID09PSB0cnVlID8gLS1pbmRleCA6IGluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8IDEgfHwgaW5kZXggPCAwIHx8IGluZGV4ID4gXy5zbGlkZUNvdW50IC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgXy51bmxvYWQoKTtcblxuICAgICAgICBpZiAocmVtb3ZlQWxsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCkucmVtb3ZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZXEoaW5kZXgpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgXy4kc2xpZGVzID0gXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKTtcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmFwcGVuZChfLiRzbGlkZXMpO1xuXG4gICAgICAgIF8uJHNsaWRlc0NhY2hlID0gXy4kc2xpZGVzO1xuXG4gICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldENTUyA9IGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgcG9zaXRpb25Qcm9wcyA9IHt9LFxuICAgICAgICAgICAgeCwgeTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSAtcG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgeCA9IF8ucG9zaXRpb25Qcm9wID09ICdsZWZ0JyA/IE1hdGguY2VpbChwb3NpdGlvbikgKyAncHgnIDogJzBweCc7XG4gICAgICAgIHkgPSBfLnBvc2l0aW9uUHJvcCA9PSAndG9wJyA/IE1hdGguY2VpbChwb3NpdGlvbikgKyAncHgnIDogJzBweCc7XG5cbiAgICAgICAgcG9zaXRpb25Qcm9wc1tfLnBvc2l0aW9uUHJvcF0gPSBwb3NpdGlvbjtcblxuICAgICAgICBpZiAoXy50cmFuc2Zvcm1zRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHBvc2l0aW9uUHJvcHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9zaXRpb25Qcm9wcyA9IHt9O1xuICAgICAgICAgICAgaWYgKF8uY3NzVHJhbnNpdGlvbnMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUoJyArIHggKyAnLCAnICsgeSArICcpJztcbiAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhwb3NpdGlvblByb3BzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUzZCgnICsgeCArICcsICcgKyB5ICsgJywgMHB4KSc7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MocG9zaXRpb25Qcm9wcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0RGltZW5zaW9ucyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy4kbGlzdC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAoJzBweCAnICsgXy5vcHRpb25zLmNlbnRlclBhZGRpbmcpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRsaXN0LmhlaWdodChfLiRzbGlkZXMuZmlyc3QoKS5vdXRlckhlaWdodCh0cnVlKSAqIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpO1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy4kbGlzdC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAoXy5vcHRpb25zLmNlbnRlclBhZGRpbmcgKyAnIDBweCcpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfLmxpc3RXaWR0aCA9IF8uJGxpc3Qud2lkdGgoKTtcbiAgICAgICAgXy5saXN0SGVpZ2h0ID0gXy4kbGlzdC5oZWlnaHQoKTtcblxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlICYmIF8ub3B0aW9ucy52YXJpYWJsZVdpZHRoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy5zbGlkZVdpZHRoID0gTWF0aC5jZWlsKF8ubGlzdFdpZHRoIC8gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyk7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLndpZHRoKE1hdGguY2VpbCgoXy5zbGlkZVdpZHRoICogXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykubGVuZ3RoKSkpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLnZhcmlhYmxlV2lkdGggPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2sud2lkdGgoNTAwMCAqIF8uc2xpZGVDb3VudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLnNsaWRlV2lkdGggPSBNYXRoLmNlaWwoXy5saXN0V2lkdGgpO1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5oZWlnaHQoTWF0aC5jZWlsKChfLiRzbGlkZXMuZmlyc3QoKS5vdXRlckhlaWdodCh0cnVlKSAqIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmxlbmd0aCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvZmZzZXQgPSBfLiRzbGlkZXMuZmlyc3QoKS5vdXRlcldpZHRoKHRydWUpIC0gXy4kc2xpZGVzLmZpcnN0KCkud2lkdGgoKTtcbiAgICAgICAgaWYgKF8ub3B0aW9ucy52YXJpYWJsZVdpZHRoID09PSBmYWxzZSkgXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykud2lkdGgoXy5zbGlkZVdpZHRoIC0gb2Zmc2V0KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0RmFkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHRhcmdldExlZnQ7XG5cbiAgICAgICAgXy4kc2xpZGVzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRhcmdldExlZnQgPSAoXy5zbGlkZVdpZHRoICogaW5kZXgpICogLTE7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0YXJnZXRMZWZ0LFxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleCAtIDIsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogdGFyZ2V0TGVmdCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAyLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF8uJHNsaWRlcy5lcShfLmN1cnJlbnRTbGlkZSkuY3NzKHtcbiAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleCAtIDEsXG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRIZWlnaHQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPT09IDEgJiYgXy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlICYmIF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRIZWlnaHQgPSBfLiRzbGlkZXMuZXEoXy5jdXJyZW50U2xpZGUpLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAgICAgXy4kbGlzdC5jc3MoJ2hlaWdodCcsIHRhcmdldEhlaWdodCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0T3B0aW9uID1cbiAgICBTbGljay5wcm90b3R5cGUuc2xpY2tTZXRPcHRpb24gPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYWNjZXB0cyBhcmd1bWVudHMgaW4gZm9ybWF0IG9mOlxuICAgICAgICAgKlxuICAgICAgICAgKiAgLSBmb3IgY2hhbmdpbmcgYSBzaW5nbGUgb3B0aW9uJ3MgdmFsdWU6XG4gICAgICAgICAqICAgICAuc2xpY2soXCJzZXRPcHRpb25cIiwgb3B0aW9uLCB2YWx1ZSwgcmVmcmVzaCApXG4gICAgICAgICAqXG4gICAgICAgICAqICAtIGZvciBjaGFuZ2luZyBhIHNldCBvZiByZXNwb25zaXZlIG9wdGlvbnM6XG4gICAgICAgICAqICAgICAuc2xpY2soXCJzZXRPcHRpb25cIiwgJ3Jlc3BvbnNpdmUnLCBbe30sIC4uLl0sIHJlZnJlc2ggKVxuICAgICAgICAgKlxuICAgICAgICAgKiAgLSBmb3IgdXBkYXRpbmcgbXVsdGlwbGUgdmFsdWVzIGF0IG9uY2UgKG5vdCByZXNwb25zaXZlKVxuICAgICAgICAgKiAgICAgLnNsaWNrKFwic2V0T3B0aW9uXCIsIHsgJ29wdGlvbic6IHZhbHVlLCAuLi4gfSwgcmVmcmVzaCApXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBfID0gdGhpcywgbCwgaXRlbSwgb3B0aW9uLCB2YWx1ZSwgcmVmcmVzaCA9IGZhbHNlLCB0eXBlO1xuXG4gICAgICAgIGlmKCAkLnR5cGUoIGFyZ3VtZW50c1swXSApID09PSAnb2JqZWN0JyApIHtcblxuICAgICAgICAgICAgb3B0aW9uID0gIGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIHJlZnJlc2ggPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICB0eXBlID0gJ211bHRpcGxlJztcblxuICAgICAgICB9IGVsc2UgaWYgKCAkLnR5cGUoIGFyZ3VtZW50c1swXSApID09PSAnc3RyaW5nJyApIHtcblxuICAgICAgICAgICAgb3B0aW9uID0gIGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIHZhbHVlID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgcmVmcmVzaCA9IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgaWYgKCBhcmd1bWVudHNbMF0gPT09ICdyZXNwb25zaXZlJyAmJiAkLnR5cGUoIGFyZ3VtZW50c1sxXSApID09PSAnYXJyYXknICkge1xuXG4gICAgICAgICAgICAgICAgdHlwZSA9ICdyZXNwb25zaXZlJztcblxuICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZW9mIGFyZ3VtZW50c1sxXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cbiAgICAgICAgICAgICAgICB0eXBlID0gJ3NpbmdsZSc7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0eXBlID09PSAnc2luZ2xlJyApIHtcblxuICAgICAgICAgICAgXy5vcHRpb25zW29wdGlvbl0gPSB2YWx1ZTtcblxuXG4gICAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09ICdtdWx0aXBsZScgKSB7XG5cbiAgICAgICAgICAgICQuZWFjaCggb3B0aW9uICwgZnVuY3Rpb24oIG9wdCwgdmFsICkge1xuXG4gICAgICAgICAgICAgICAgXy5vcHRpb25zW29wdF0gPSB2YWw7XG5cbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfSBlbHNlIGlmICggdHlwZSA9PT0gJ3Jlc3BvbnNpdmUnICkge1xuXG4gICAgICAgICAgICBmb3IgKCBpdGVtIGluIHZhbHVlICkge1xuXG4gICAgICAgICAgICAgICAgaWYoICQudHlwZSggXy5vcHRpb25zLnJlc3BvbnNpdmUgKSAhPT0gJ2FycmF5JyApIHtcblxuICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMucmVzcG9uc2l2ZSA9IFsgdmFsdWVbaXRlbV0gXTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbCA9IF8ub3B0aW9ucy5yZXNwb25zaXZlLmxlbmd0aC0xO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgcmVzcG9uc2l2ZSBvYmplY3QgYW5kIHNwbGljZSBvdXQgZHVwbGljYXRlcy5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoIGwgPj0gMCApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIF8ub3B0aW9ucy5yZXNwb25zaXZlW2xdLmJyZWFrcG9pbnQgPT09IHZhbHVlW2l0ZW1dLmJyZWFrcG9pbnQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMucmVzcG9uc2l2ZS5zcGxpY2UobCwxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsLS07XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucy5yZXNwb25zaXZlLnB1c2goIHZhbHVlW2l0ZW1dICk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCByZWZyZXNoICkge1xuXG4gICAgICAgICAgICBfLnVubG9hZCgpO1xuICAgICAgICAgICAgXy5yZWluaXQoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uc2V0RGltZW5zaW9ucygpO1xuXG4gICAgICAgIF8uc2V0SGVpZ2h0KCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy5zZXRDU1MoXy5nZXRMZWZ0KF8uY3VycmVudFNsaWRlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLnNldEZhZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdzZXRQb3NpdGlvbicsIFtfXSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldFByb3BzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgYm9keVN0eWxlID0gZG9jdW1lbnQuYm9keS5zdHlsZTtcblxuICAgICAgICBfLnBvc2l0aW9uUHJvcCA9IF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd0b3AnIDogJ2xlZnQnO1xuXG4gICAgICAgIGlmIChfLnBvc2l0aW9uUHJvcCA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlci5hZGRDbGFzcygnc2xpY2stdmVydGljYWwnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uJHNsaWRlci5yZW1vdmVDbGFzcygnc2xpY2stdmVydGljYWwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib2R5U3R5bGUuV2Via2l0VHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBib2R5U3R5bGUuTW96VHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBib2R5U3R5bGUubXNUcmFuc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMudXNlQ1NTID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy5jc3NUcmFuc2l0aW9ucyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5mYWRlICkge1xuICAgICAgICAgICAgaWYgKCB0eXBlb2YgXy5vcHRpb25zLnpJbmRleCA9PT0gJ251bWJlcicgKSB7XG4gICAgICAgICAgICAgICAgaWYoIF8ub3B0aW9ucy56SW5kZXggPCAzICkge1xuICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMuekluZGV4ID0gMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF8ub3B0aW9ucy56SW5kZXggPSBfLmRlZmF1bHRzLnpJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib2R5U3R5bGUuT1RyYW5zZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gJ09UcmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2Zvcm1UeXBlID0gJy1vLXRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zaXRpb25UeXBlID0gJ09UcmFuc2l0aW9uJztcbiAgICAgICAgICAgIGlmIChib2R5U3R5bGUucGVyc3BlY3RpdmVQcm9wZXJ0eSA9PT0gdW5kZWZpbmVkICYmIGJvZHlTdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9PT0gdW5kZWZpbmVkKSBfLmFuaW1UeXBlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvZHlTdHlsZS5Nb3pUcmFuc2Zvcm0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgXy5hbmltVHlwZSA9ICdNb3pUcmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2Zvcm1UeXBlID0gJy1tb3otdHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNpdGlvblR5cGUgPSAnTW96VHJhbnNpdGlvbic7XG4gICAgICAgICAgICBpZiAoYm9keVN0eWxlLnBlcnNwZWN0aXZlUHJvcGVydHkgPT09IHVuZGVmaW5lZCAmJiBib2R5U3R5bGUuTW96UGVyc3BlY3RpdmUgPT09IHVuZGVmaW5lZCkgXy5hbmltVHlwZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5U3R5bGUud2Via2l0VHJhbnNmb3JtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSAnd2Via2l0VHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctd2Via2l0LXRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zaXRpb25UeXBlID0gJ3dlYmtpdFRyYW5zaXRpb24nO1xuICAgICAgICAgICAgaWYgKGJvZHlTdHlsZS5wZXJzcGVjdGl2ZVByb3BlcnR5ID09PSB1bmRlZmluZWQgJiYgYm9keVN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID09PSB1bmRlZmluZWQpIF8uYW5pbVR5cGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keVN0eWxlLm1zVHJhbnNmb3JtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSAnbXNUcmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2Zvcm1UeXBlID0gJy1tcy10cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICdtc1RyYW5zaXRpb24nO1xuICAgICAgICAgICAgaWYgKGJvZHlTdHlsZS5tc1RyYW5zZm9ybSA9PT0gdW5kZWZpbmVkKSBfLmFuaW1UeXBlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvZHlTdHlsZS50cmFuc2Zvcm0gIT09IHVuZGVmaW5lZCAmJiBfLmFuaW1UeXBlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgXy5hbmltVHlwZSA9ICd0cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2Zvcm1UeXBlID0gJ3RyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zaXRpb25UeXBlID0gJ3RyYW5zaXRpb24nO1xuICAgICAgICB9XG4gICAgICAgIF8udHJhbnNmb3Jtc0VuYWJsZWQgPSBfLm9wdGlvbnMudXNlVHJhbnNmb3JtICYmIChfLmFuaW1UeXBlICE9PSBudWxsICYmIF8uYW5pbVR5cGUgIT09IGZhbHNlKTtcbiAgICB9O1xuXG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0U2xpZGVDbGFzc2VzID0gZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBjZW50ZXJPZmZzZXQsIGFsbFNsaWRlcywgaW5kZXhPZmZzZXQsIHJlbWFpbmRlcjtcblxuICAgICAgICBhbGxTbGlkZXMgPSBfLiRzbGlkZXJcbiAgICAgICAgICAgIC5maW5kKCcuc2xpY2stc2xpZGUnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1hY3RpdmUgc2xpY2stY2VudGVyIHNsaWNrLWN1cnJlbnQnKVxuICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgICAgICBfLiRzbGlkZXNcbiAgICAgICAgICAgIC5lcShpbmRleClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stY3VycmVudCcpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICB2YXIgZXZlbkNvZWYgPSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICUgMiA9PT0gMCA/IDEgOiAwO1xuXG4gICAgICAgICAgICBjZW50ZXJPZmZzZXQgPSBNYXRoLmZsb29yKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyKTtcblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IGNlbnRlck9mZnNldCAmJiBpbmRleCA8PSAoXy5zbGlkZUNvdW50IC0gMSkgLSBjZW50ZXJPZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXggLSBjZW50ZXJPZmZzZXQgKyBldmVuQ29lZiwgaW5kZXggKyBjZW50ZXJPZmZzZXQgKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ID0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyArIGluZGV4O1xuICAgICAgICAgICAgICAgICAgICBhbGxTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleE9mZnNldCAtIGNlbnRlck9mZnNldCArIDEgKyBldmVuQ29lZiwgaW5kZXhPZmZzZXQgKyBjZW50ZXJPZmZzZXQgKyAyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBhbGxTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lcShhbGxTbGlkZXMubGVuZ3RoIC0gMSAtIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWNlbnRlcicpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gXy5zbGlkZUNvdW50IC0gMSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGFsbFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLmVxKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWNlbnRlcicpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgICAgIC5lcShpbmRleClcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWNlbnRlcicpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDw9IChfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSkge1xuXG4gICAgICAgICAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleCwgaW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFsbFNsaWRlcy5sZW5ndGggPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZW1haW5kZXIgPSBfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93O1xuICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ID0gXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlID8gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyArIGluZGV4IDogaW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA9PSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgJiYgKF8uc2xpZGVDb3VudCAtIGluZGV4KSA8IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgICAgICAgICBhbGxTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleE9mZnNldCAtIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC0gcmVtYWluZGVyKSwgaW5kZXhPZmZzZXQgKyByZW1haW5kZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXhPZmZzZXQsIGluZGV4T2Zmc2V0ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMubGF6eUxvYWQgPT09ICdvbmRlbWFuZCcgfHwgXy5vcHRpb25zLmxhenlMb2FkID09PSAnYW50aWNpcGF0ZWQnKSB7XG4gICAgICAgICAgICBfLmxhenlMb2FkKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldHVwSW5maW5pdGUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBpLCBzbGlkZUluZGV4LCBpbmZpbml0ZUNvdW50O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5vcHRpb25zLmNlbnRlck1vZGUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUgJiYgXy5vcHRpb25zLmZhZGUgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIHNsaWRlSW5kZXggPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlQ291bnQgPSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZUNvdW50ID0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSBfLnNsaWRlQ291bnQ7IGkgPiAoXy5zbGlkZUNvdW50IC1cbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlQ291bnQpOyBpIC09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbmRleCA9IGkgLSAxO1xuICAgICAgICAgICAgICAgICAgICAkKF8uJHNsaWRlc1tzbGlkZUluZGV4XSkuY2xvbmUodHJ1ZSkuYXR0cignaWQnLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNsaWNrLWluZGV4Jywgc2xpZGVJbmRleCAtIF8uc2xpZGVDb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcmVwZW5kVG8oXy4kc2xpZGVUcmFjaykuYWRkQ2xhc3MoJ3NsaWNrLWNsb25lZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5maW5pdGVDb3VudCAgKyBfLnNsaWRlQ291bnQ7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgJChfLiRzbGlkZXNbc2xpZGVJbmRleF0pLmNsb25lKHRydWUpLmF0dHIoJ2lkJywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zbGljay1pbmRleCcsIHNsaWRlSW5kZXggKyBfLnNsaWRlQ291bnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oXy4kc2xpZGVUcmFjaykuYWRkQ2xhc3MoJ3NsaWNrLWNsb25lZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmZpbmQoJy5zbGljay1jbG9uZWQnKS5maW5kKCdbaWRdJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdpZCcsICcnKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW50ZXJydXB0ID0gZnVuY3Rpb24oIHRvZ2dsZSApIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYoICF0b2dnbGUgKSB7XG4gICAgICAgICAgICBfLmF1dG9QbGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IHRvZ2dsZTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2VsZWN0SGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIHZhciB0YXJnZXRFbGVtZW50ID1cbiAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5pcygnLnNsaWNrLXNsaWRlJykgP1xuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KSA6XG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLnBhcmVudHMoJy5zbGljay1zbGlkZScpO1xuXG4gICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KHRhcmdldEVsZW1lbnQuYXR0cignZGF0YS1zbGljay1pbmRleCcpKTtcblxuICAgICAgICBpZiAoIWluZGV4KSBpbmRleCA9IDA7XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKGluZGV4LCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIF8uc2xpZGVIYW5kbGVyKGluZGV4KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2xpZGVIYW5kbGVyID0gZnVuY3Rpb24oaW5kZXgsIHN5bmMsIGRvbnRBbmltYXRlKSB7XG5cbiAgICAgICAgdmFyIHRhcmdldFNsaWRlLCBhbmltU2xpZGUsIG9sZFNsaWRlLCBzbGlkZUxlZnQsIHRhcmdldExlZnQgPSBudWxsLFxuICAgICAgICAgICAgXyA9IHRoaXMsIG5hdlRhcmdldDtcblxuICAgICAgICBzeW5jID0gc3luYyB8fCBmYWxzZTtcblxuICAgICAgICBpZiAoXy5hbmltYXRpbmcgPT09IHRydWUgJiYgXy5vcHRpb25zLndhaXRGb3JBbmltYXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUgJiYgXy5jdXJyZW50U2xpZGUgPT09IGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3luYyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uYXNOYXZGb3IoaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0U2xpZGUgPSBpbmRleDtcbiAgICAgICAgdGFyZ2V0TGVmdCA9IF8uZ2V0TGVmdCh0YXJnZXRTbGlkZSk7XG4gICAgICAgIHNsaWRlTGVmdCA9IF8uZ2V0TGVmdChfLmN1cnJlbnRTbGlkZSk7XG5cbiAgICAgICAgXy5jdXJyZW50TGVmdCA9IF8uc3dpcGVMZWZ0ID09PSBudWxsID8gc2xpZGVMZWZ0IDogXy5zd2lwZUxlZnQ7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UgJiYgXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IGZhbHNlICYmIChpbmRleCA8IDAgfHwgaW5kZXggPiBfLmdldERvdENvdW50KCkgKiBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpKSB7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U2xpZGUgPSBfLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgICAgICAgICBpZiAoZG9udEFuaW1hdGUgIT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICAgICBfLmFuaW1hdGVTbGlkZShzbGlkZUxlZnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUodGFyZ2V0U2xpZGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZSh0YXJnZXRTbGlkZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UgJiYgXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUgJiYgKGluZGV4IDwgMCB8fCBpbmRleCA+IChfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpKSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy5jdXJyZW50U2xpZGU7XG4gICAgICAgICAgICAgICAgaWYgKGRvbnRBbmltYXRlICE9PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5hbmltYXRlU2xpZGUoc2xpZGVMZWZ0LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKHRhcmdldFNsaWRlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUodGFyZ2V0U2xpZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy5vcHRpb25zLmF1dG9wbGF5ICkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChfLmF1dG9QbGF5VGltZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldFNsaWRlIDwgMCkge1xuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGFuaW1TbGlkZSA9IF8uc2xpZGVDb3VudCAtIChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbmltU2xpZGUgPSBfLnNsaWRlQ291bnQgKyB0YXJnZXRTbGlkZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXRTbGlkZSA+PSBfLnNsaWRlQ291bnQpIHtcbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgIT09IDApIHtcbiAgICAgICAgICAgICAgICBhbmltU2xpZGUgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbmltU2xpZGUgPSB0YXJnZXRTbGlkZSAtIF8uc2xpZGVDb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFuaW1TbGlkZSA9IHRhcmdldFNsaWRlO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5hbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdiZWZvcmVDaGFuZ2UnLCBbXywgXy5jdXJyZW50U2xpZGUsIGFuaW1TbGlkZV0pO1xuXG4gICAgICAgIG9sZFNsaWRlID0gXy5jdXJyZW50U2xpZGU7XG4gICAgICAgIF8uY3VycmVudFNsaWRlID0gYW5pbVNsaWRlO1xuXG4gICAgICAgIF8uc2V0U2xpZGVDbGFzc2VzKF8uY3VycmVudFNsaWRlKTtcblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hc05hdkZvciApIHtcblxuICAgICAgICAgICAgbmF2VGFyZ2V0ID0gXy5nZXROYXZUYXJnZXQoKTtcbiAgICAgICAgICAgIG5hdlRhcmdldCA9IG5hdlRhcmdldC5zbGljaygnZ2V0U2xpY2snKTtcblxuICAgICAgICAgICAgaWYgKCBuYXZUYXJnZXQuc2xpZGVDb3VudCA8PSBuYXZUYXJnZXQub3B0aW9ucy5zbGlkZXNUb1Nob3cgKSB7XG4gICAgICAgICAgICAgICAgbmF2VGFyZ2V0LnNldFNsaWRlQ2xhc3NlcyhfLmN1cnJlbnRTbGlkZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIF8udXBkYXRlRG90cygpO1xuICAgICAgICBfLnVwZGF0ZUFycm93cygpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKGRvbnRBbmltYXRlICE9PSB0cnVlKSB7XG5cbiAgICAgICAgICAgICAgICBfLmZhZGVTbGlkZU91dChvbGRTbGlkZSk7XG5cbiAgICAgICAgICAgICAgICBfLmZhZGVTbGlkZShhbmltU2xpZGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZShhbmltU2xpZGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKGFuaW1TbGlkZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfLmFuaW1hdGVIZWlnaHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb250QW5pbWF0ZSAhPT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLmFuaW1hdGVTbGlkZSh0YXJnZXRMZWZ0LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZShhbmltU2xpZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLnBvc3RTbGlkZShhbmltU2xpZGUpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnN0YXJ0TG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uJHByZXZBcnJvdy5oaWRlKCk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cuaGlkZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLiRkb3RzLmhpZGUoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgXy4kc2xpZGVyLmFkZENsYXNzKCdzbGljay1sb2FkaW5nJyk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnN3aXBlRGlyZWN0aW9uID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIHhEaXN0LCB5RGlzdCwgciwgc3dpcGVBbmdsZSwgXyA9IHRoaXM7XG5cbiAgICAgICAgeERpc3QgPSBfLnRvdWNoT2JqZWN0LnN0YXJ0WCAtIF8udG91Y2hPYmplY3QuY3VyWDtcbiAgICAgICAgeURpc3QgPSBfLnRvdWNoT2JqZWN0LnN0YXJ0WSAtIF8udG91Y2hPYmplY3QuY3VyWTtcbiAgICAgICAgciA9IE1hdGguYXRhbjIoeURpc3QsIHhEaXN0KTtcblxuICAgICAgICBzd2lwZUFuZ2xlID0gTWF0aC5yb3VuZChyICogMTgwIC8gTWF0aC5QSSk7XG4gICAgICAgIGlmIChzd2lwZUFuZ2xlIDwgMCkge1xuICAgICAgICAgICAgc3dpcGVBbmdsZSA9IDM2MCAtIE1hdGguYWJzKHN3aXBlQW5nbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChzd2lwZUFuZ2xlIDw9IDQ1KSAmJiAoc3dpcGVBbmdsZSA+PSAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIChfLm9wdGlvbnMucnRsID09PSBmYWxzZSA/ICdsZWZ0JyA6ICdyaWdodCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoc3dpcGVBbmdsZSA8PSAzNjApICYmIChzd2lwZUFuZ2xlID49IDMxNSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXy5vcHRpb25zLnJ0bCA9PT0gZmFsc2UgPyAnbGVmdCcgOiAncmlnaHQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHN3aXBlQW5nbGUgPj0gMTM1KSAmJiAoc3dpcGVBbmdsZSA8PSAyMjUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKF8ub3B0aW9ucy5ydGwgPT09IGZhbHNlID8gJ3JpZ2h0JyA6ICdsZWZ0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmICgoc3dpcGVBbmdsZSA+PSAzNSkgJiYgKHN3aXBlQW5nbGUgPD0gMTM1KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnZG93bic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAndXAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICd2ZXJ0aWNhbCc7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnN3aXBlRW5kID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBzbGlkZUNvdW50LFxuICAgICAgICAgICAgZGlyZWN0aW9uO1xuXG4gICAgICAgIF8uZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgXy5zd2lwaW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKF8uc2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICBfLnNjcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IGZhbHNlO1xuICAgICAgICBfLnNob3VsZENsaWNrID0gKCBfLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoID4gMTAgKSA/IGZhbHNlIDogdHJ1ZTtcblxuICAgICAgICBpZiAoIF8udG91Y2hPYmplY3QuY3VyWCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLnRvdWNoT2JqZWN0LmVkZ2VIaXQgPT09IHRydWUgKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignZWRnZScsIFtfLCBfLnN3aXBlRGlyZWN0aW9uKCkgXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggPj0gXy50b3VjaE9iamVjdC5taW5Td2lwZSApIHtcblxuICAgICAgICAgICAgZGlyZWN0aW9uID0gXy5zd2lwZURpcmVjdGlvbigpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKCBkaXJlY3Rpb24gKSB7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdkb3duJzpcblxuICAgICAgICAgICAgICAgICAgICBzbGlkZUNvdW50ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucy5zd2lwZVRvU2xpZGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY2hlY2tOYXZpZ2FibGUoIF8uY3VycmVudFNsaWRlICsgXy5nZXRTbGlkZUNvdW50KCkgKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgKyBfLmdldFNsaWRlQ291bnQoKTtcblxuICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnREaXJlY3Rpb24gPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3VwJzpcblxuICAgICAgICAgICAgICAgICAgICBzbGlkZUNvdW50ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucy5zd2lwZVRvU2xpZGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY2hlY2tOYXZpZ2FibGUoIF8uY3VycmVudFNsaWRlIC0gXy5nZXRTbGlkZUNvdW50KCkgKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgLSBfLmdldFNsaWRlQ291bnQoKTtcblxuICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnREaXJlY3Rpb24gPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCBkaXJlY3Rpb24gIT0gJ3ZlcnRpY2FsJyApIHtcblxuICAgICAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKCBzbGlkZUNvdW50ICk7XG4gICAgICAgICAgICAgICAgXy50b3VjaE9iamVjdCA9IHt9O1xuICAgICAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdzd2lwZScsIFtfLCBkaXJlY3Rpb24gXSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoIF8udG91Y2hPYmplY3Quc3RhcnRYICE9PSBfLnRvdWNoT2JqZWN0LmN1clggKSB7XG5cbiAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlciggXy5jdXJyZW50U2xpZGUgKTtcbiAgICAgICAgICAgICAgICBfLnRvdWNoT2JqZWN0ID0ge307XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnN3aXBlSGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICgoXy5vcHRpb25zLnN3aXBlID09PSBmYWxzZSkgfHwgKCdvbnRvdWNoZW5kJyBpbiBkb2N1bWVudCAmJiBfLm9wdGlvbnMuc3dpcGUgPT09IGZhbHNlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5kcmFnZ2FibGUgPT09IGZhbHNlICYmIGV2ZW50LnR5cGUuaW5kZXhPZignbW91c2UnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF8udG91Y2hPYmplY3QuZmluZ2VyQ291bnQgPSBldmVudC5vcmlnaW5hbEV2ZW50ICYmIGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlcyAhPT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgIGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlcy5sZW5ndGggOiAxO1xuXG4gICAgICAgIF8udG91Y2hPYmplY3QubWluU3dpcGUgPSBfLmxpc3RXaWR0aCAvIF8ub3B0aW9uc1xuICAgICAgICAgICAgLnRvdWNoVGhyZXNob2xkO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLnRvdWNoT2JqZWN0Lm1pblN3aXBlID0gXy5saXN0SGVpZ2h0IC8gXy5vcHRpb25zXG4gICAgICAgICAgICAgICAgLnRvdWNoVGhyZXNob2xkO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5kYXRhLmFjdGlvbikge1xuXG4gICAgICAgICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgICAgICAgICAgXy5zd2lwZVN0YXJ0KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnbW92ZSc6XG4gICAgICAgICAgICAgICAgXy5zd2lwZU1vdmUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICAgIF8uc3dpcGVFbmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc3dpcGVNb3ZlID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBlZGdlV2FzSGl0ID0gZmFsc2UsXG4gICAgICAgICAgICBjdXJMZWZ0LCBzd2lwZURpcmVjdGlvbiwgc3dpcGVMZW5ndGgsIHBvc2l0aW9uT2Zmc2V0LCB0b3VjaGVzLCB2ZXJ0aWNhbFN3aXBlTGVuZ3RoO1xuXG4gICAgICAgIHRvdWNoZXMgPSBldmVudC5vcmlnaW5hbEV2ZW50ICE9PSB1bmRlZmluZWQgPyBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXMgOiBudWxsO1xuXG4gICAgICAgIGlmICghXy5kcmFnZ2luZyB8fCBfLnNjcm9sbGluZyB8fCB0b3VjaGVzICYmIHRvdWNoZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJMZWZ0ID0gXy5nZXRMZWZ0KF8uY3VycmVudFNsaWRlKTtcblxuICAgICAgICBfLnRvdWNoT2JqZWN0LmN1clggPSB0b3VjaGVzICE9PSB1bmRlZmluZWQgPyB0b3VjaGVzWzBdLnBhZ2VYIDogZXZlbnQuY2xpZW50WDtcbiAgICAgICAgXy50b3VjaE9iamVjdC5jdXJZID0gdG91Y2hlcyAhPT0gdW5kZWZpbmVkID8gdG91Y2hlc1swXS5wYWdlWSA6IGV2ZW50LmNsaWVudFk7XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCA9IE1hdGgucm91bmQoTWF0aC5zcXJ0KFxuICAgICAgICAgICAgTWF0aC5wb3coXy50b3VjaE9iamVjdC5jdXJYIC0gXy50b3VjaE9iamVjdC5zdGFydFgsIDIpKSk7XG5cbiAgICAgICAgdmVydGljYWxTd2lwZUxlbmd0aCA9IE1hdGgucm91bmQoTWF0aC5zcXJ0KFxuICAgICAgICAgICAgTWF0aC5wb3coXy50b3VjaE9iamVjdC5jdXJZIC0gXy50b3VjaE9iamVjdC5zdGFydFksIDIpKSk7XG5cbiAgICAgICAgaWYgKCFfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nICYmICFfLnN3aXBpbmcgJiYgdmVydGljYWxTd2lwZUxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgIF8uc2Nyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoID0gdmVydGljYWxTd2lwZUxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlRGlyZWN0aW9uID0gXy5zd2lwZURpcmVjdGlvbigpO1xuXG4gICAgICAgIGlmIChldmVudC5vcmlnaW5hbEV2ZW50ICE9PSB1bmRlZmluZWQgJiYgXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgIF8uc3dpcGluZyA9IHRydWU7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcG9zaXRpb25PZmZzZXQgPSAoXy5vcHRpb25zLnJ0bCA9PT0gZmFsc2UgPyAxIDogLTEpICogKF8udG91Y2hPYmplY3QuY3VyWCA+IF8udG91Y2hPYmplY3Quc3RhcnRYID8gMSA6IC0xKTtcbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uT2Zmc2V0ID0gXy50b3VjaE9iamVjdC5jdXJZID4gXy50b3VjaE9iamVjdC5zdGFydFkgPyAxIDogLTE7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN3aXBlTGVuZ3RoID0gXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aDtcblxuICAgICAgICBfLnRvdWNoT2JqZWN0LmVkZ2VIaXQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKChfLmN1cnJlbnRTbGlkZSA9PT0gMCAmJiBzd2lwZURpcmVjdGlvbiA9PT0gJ3JpZ2h0JykgfHwgKF8uY3VycmVudFNsaWRlID49IF8uZ2V0RG90Q291bnQoKSAmJiBzd2lwZURpcmVjdGlvbiA9PT0gJ2xlZnQnKSkge1xuICAgICAgICAgICAgICAgIHN3aXBlTGVuZ3RoID0gXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCAqIF8ub3B0aW9ucy5lZGdlRnJpY3Rpb247XG4gICAgICAgICAgICAgICAgXy50b3VjaE9iamVjdC5lZGdlSGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLnN3aXBlTGVmdCA9IGN1ckxlZnQgKyBzd2lwZUxlbmd0aCAqIHBvc2l0aW9uT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5zd2lwZUxlZnQgPSBjdXJMZWZ0ICsgKHN3aXBlTGVuZ3RoICogKF8uJGxpc3QuaGVpZ2h0KCkgLyBfLmxpc3RXaWR0aCkpICogcG9zaXRpb25PZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uc3dpcGVMZWZ0ID0gY3VyTGVmdCArIHN3aXBlTGVuZ3RoICogcG9zaXRpb25PZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUgfHwgXy5vcHRpb25zLnRvdWNoTW92ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLmFuaW1hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5zd2lwZUxlZnQgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5zZXRDU1MoXy5zd2lwZUxlZnQpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZVN0YXJ0ID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0b3VjaGVzO1xuXG4gICAgICAgIF8uaW50ZXJydXB0ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChfLnRvdWNoT2JqZWN0LmZpbmdlckNvdW50ICE9PSAxIHx8IF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLnRvdWNoT2JqZWN0ID0ge307XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAhPT0gdW5kZWZpbmVkICYmIGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0b3VjaGVzID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5zdGFydFggPSBfLnRvdWNoT2JqZWN0LmN1clggPSB0b3VjaGVzICE9PSB1bmRlZmluZWQgPyB0b3VjaGVzLnBhZ2VYIDogZXZlbnQuY2xpZW50WDtcbiAgICAgICAgXy50b3VjaE9iamVjdC5zdGFydFkgPSBfLnRvdWNoT2JqZWN0LmN1clkgPSB0b3VjaGVzICE9PSB1bmRlZmluZWQgPyB0b3VjaGVzLnBhZ2VZIDogZXZlbnQuY2xpZW50WTtcblxuICAgICAgICBfLmRyYWdnaW5nID0gdHJ1ZTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUudW5maWx0ZXJTbGlkZXMgPSBTbGljay5wcm90b3R5cGUuc2xpY2tVbmZpbHRlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy4kc2xpZGVzQ2FjaGUgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgXy51bmxvYWQoKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXNDYWNoZS5hcHBlbmRUbyhfLiRzbGlkZVRyYWNrKTtcblxuICAgICAgICAgICAgXy5yZWluaXQoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICAkKCcuc2xpY2stY2xvbmVkJywgXy4kc2xpZGVyKS5yZW1vdmUoKTtcblxuICAgICAgICBpZiAoXy4kZG90cykge1xuICAgICAgICAgICAgXy4kZG90cy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLiRwcmV2QXJyb3cgJiYgXy5odG1sRXhwci50ZXN0KF8ub3B0aW9ucy5wcmV2QXJyb3cpKSB7XG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy4kbmV4dEFycm93ICYmIF8uaHRtbEV4cHIudGVzdChfLm9wdGlvbnMubmV4dEFycm93KSkge1xuICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLXNsaWRlIHNsaWNrLWFjdGl2ZSBzbGljay12aXNpYmxlIHNsaWNrLWN1cnJlbnQnKVxuICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICAgICAgICAgICAgLmNzcygnd2lkdGgnLCAnJyk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVuc2xpY2sgPSBmdW5jdGlvbihmcm9tQnJlYWtwb2ludCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcbiAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ3Vuc2xpY2snLCBbXywgZnJvbUJyZWFrcG9pbnRdKTtcbiAgICAgICAgXy5kZXN0cm95KCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVwZGF0ZUFycm93cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGNlbnRlck9mZnNldDtcblxuICAgICAgICBjZW50ZXJPZmZzZXQgPSBNYXRoLmZsb29yKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyKTtcblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgJiZcbiAgICAgICAgICAgIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgJiZcbiAgICAgICAgICAgICFfLm9wdGlvbnMuaW5maW5pdGUgKSB7XG5cbiAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICdmYWxzZScpO1xuXG4gICAgICAgICAgICBpZiAoXy5jdXJyZW50U2xpZGUgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5hZGRDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICdmYWxzZScpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF8uY3VycmVudFNsaWRlID49IF8uc2xpZGVDb3VudCAtIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgJiYgXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cuYWRkQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmN1cnJlbnRTbGlkZSA+PSBfLnNsaWRlQ291bnQgLSAxICYmIF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG5cbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cuYWRkQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUudXBkYXRlRG90cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy4kZG90cyAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICBfLiRkb3RzXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2xpJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKCk7XG5cbiAgICAgICAgICAgIF8uJGRvdHNcbiAgICAgICAgICAgICAgICAuZmluZCgnbGknKVxuICAgICAgICAgICAgICAgIC5lcShNYXRoLmZsb29yKF8uY3VycmVudFNsaWRlIC8gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSlcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUudmlzaWJpbGl0eSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hdXRvcGxheSApIHtcblxuICAgICAgICAgICAgaWYgKCBkb2N1bWVudFtfLmhpZGRlbl0gKSB7XG5cbiAgICAgICAgICAgICAgICBfLmludGVycnVwdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIF8uaW50ZXJydXB0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAkLmZuLnNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIG9wdCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgICAgbCA9IF8ubGVuZ3RoLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHJldDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQgPT0gJ29iamVjdCcgfHwgdHlwZW9mIG9wdCA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICBfW2ldLnNsaWNrID0gbmV3IFNsaWNrKF9baV0sIG9wdCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0ID0gX1tpXS5zbGlja1tvcHRdLmFwcGx5KF9baV0uc2xpY2ssIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXQgIT0gJ3VuZGVmaW5lZCcpIHJldHVybiByZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF87XG4gICAgfTtcblxufSkpO1xuXG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbm1vZHVsZS5leHBvcnRzID0gJC5mbi5zbGljaztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9leHBvcnRzLWxvYWRlcj8kLmZuLnNsaWNrIS4vbm9kZV9tb2R1bGVzL3NsaWNrLWNhcm91c2VsL3NsaWNrL3NsaWNrLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBwcmVsb2FkZXIgZnJvbSAnLi9jb21wb25lbnRzL1ByZWxvYWRlcic7XHJcbmltcG9ydCBwYWdlSGVhZGVyIGZyb20gJy4vY29tcG9uZW50cy9QYWdlSGVhZGVyJztcclxuaW1wb3J0IGZhbmN5IGZyb20gJy4vY29tcG9uZW50cy9GYW5jeSc7XHJcbmltcG9ydCBjb250YWN0TWVudSBmcm9tICcuL2NvbXBvbmVudHMvQ29udGFjdE1lbnUnO1xyXG5pbXBvcnQgbWVudSBmcm9tICcuL2NvbXBvbmVudHMvTWVudS5qcyc7XHJcbmltcG9ydCBwcm9qZWN0cyBmcm9tICcuL2NvbXBvbmVudHMvUHJvamVjdHMuanMnO1xyXG5pbXBvcnQgdGVhbSBmcm9tICcuL2NvbXBvbmVudHMvVGVhbS5qcyc7XHJcbmltcG9ydCBicmFuZHMgZnJvbSAnLi9jb21wb25lbnRzL0JyYW5kcy5qcyc7XHJcbmltcG9ydCBmaWxlVXBsb2FkIGZyb20gJy4vY29tcG9uZW50cy9GaWxlVXBsb2FkJztcclxuaW1wb3J0IHRhYnMgZnJvbSAnLi9jb21wb25lbnRzL1RhYnMnO1xyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gIGZhbmN5LmluaXQoKTtcclxuXHJcbiAgaWYgKCQoJy5wYWdlLWhlYWRlcicpLmxlbmd0aCkgcGFnZUhlYWRlci5pbml0KCk7XHJcblxyXG4gIGlmICgkKCcuY29udGFjdC1tZW51JykubGVuZ3RoKSBjb250YWN0TWVudS5pbml0KCk7XHJcblxyXG4gIGlmICgkKCcubWVudScpLmxlbmd0aCkgbWVudS5pbml0KCk7XHJcblxyXG4gIGlmICgkKCcucHJvamVjdHNfX2xpc3QnKS5sZW5ndGgpIHByb2plY3RzLmluaXQoKTtcclxuXHJcbiAgaWYgKCQoJy50ZWFtJykubGVuZ3RoKSB0ZWFtLmluaXQoKTtcclxuXHJcbiAgaWYgKCQoJy5icmFuZHMnKS5sZW5ndGgpIGJyYW5kcy5pbml0KCk7XHJcblxyXG4gIGlmICgkKCcuZmlsZS11cGxvYWRfX2lucHV0ZmlsZScpLmxlbmd0aCkgZmlsZVVwbG9hZC5pbml0KCk7XHJcblxyXG4gIGlmICgkKCcudGFicycpLmxlbmd0aCkgdGFicy5pbml0KCk7XHJcbn0pO1xyXG5cclxuXHJcbiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG4gIGlmICgkKCcucHJlbG9hZGVyJykubGVuZ3RoKSBwcmVsb2FkZXIuaW5pdCgpO1xyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvYXBwLmpzIiwiY2xhc3MgUGFnZUhlYWRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLiRjb250YWluZXIgPSAkKCcucGFnZS1oZWFkZXInKTtcclxuICAgIHRoaXMuY29udGFpbmVyU3RhcnRIZWlnaHQgPSB0aGlzLiRjb250YWluZXIuaW5uZXJIZWlnaHQoKTtcclxuICAgIHRoaXMuY29udGFpbmVySXNGaXhlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5maXhlZENvbnRhaW5lckhlaWdodCA9IDA7XHJcbiAgICB0aGlzLnByZXZUb3AgPSAwO1xyXG4gIH1cclxuXHJcbiAgX2F1dG9IaWRlSGVhZGVyKGN1cnJlbnRUb3ApIHtcclxuICAgIGNvbnN0IGRpZmYgPSB0aGlzLnByZXZUb3AgLSBjdXJyZW50VG9wO1xyXG5cclxuICAgIC8vIHNjcm9sbFRvcCA8IGNvbnRhaW5lckhlaWdodFxyXG4gICAgLy8gcmVtb3ZlIGNvbnRhaW5lciBmaXhlZFxyXG4gICAgaWYgKGN1cnJlbnRUb3AgPCB0aGlzLmNvbnRhaW5lclN0YXJ0SGVpZ2h0KSB7XHJcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lcklzRml4ZWQpIHtcclxuICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ3BhZ2UtaGVhZGVyX2ZpeGVkIHBhZ2UtaGVhZGVyX2ZpeGVkLXZpc2libGUnKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcklzRml4ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLiRjb250YWluZXIuY3NzKCd0b3AnLCAnJyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkaWZmIDwgMCkgeyAvLyBzY3JvbGxpbmcgZG93blxyXG4gICAgICAvLyBhZGQgY29udGFpbmVyIGZpeGVkXHJcbiAgICAgIGlmICghdGhpcy5jb250YWluZXJJc0ZpeGVkKSB7XHJcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLmFkZENsYXNzKCdwYWdlLWhlYWRlcl9maXhlZCcpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVySXNGaXhlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGlmICh0aGlzLmNvbnRhaW5lcklzRml4ZWQpIHtcclxuICAgICAgICBpZiAodGhpcy5maXhlZENvbnRhaW5lckhlaWdodCA9PT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5maXhlZENvbnRhaW5lckhlaWdodCA9IE1hdGgucm91bmQodGhpcy4kY29udGFpbmVyLmlubmVySGVpZ2h0KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLmNzcygndG9wJywgLXRoaXMuZml4ZWRDb250YWluZXJIZWlnaHQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy4kY29udGFpbmVyLmhhc0NsYXNzKCdwYWdlLWhlYWRlcl9maXhlZC12aXNpYmxlJykpIHtcclxuICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ3BhZ2UtaGVhZGVyX2ZpeGVkLXZpc2libGUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNyb2xsaW5nIHVwXHJcbiAgICBpZiAoZGlmZiA+IDApIHRoaXMuJGNvbnRhaW5lci5hZGRDbGFzcygncGFnZS1oZWFkZXJfZml4ZWQtdmlzaWJsZScpO1xyXG4gIH1cclxuXHJcbiAgX3Njcm9sbEhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50VG9wID0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCk7XHJcbiAgICB0aGlzLl9hdXRvSGlkZUhlYWRlcihjdXJyZW50VG9wKTtcclxuICAgIHRoaXMucHJldlRvcCA9IGN1cnJlbnRUb3A7XHJcbiAgfVxyXG5cclxuICBfd2luZG93UmVzaXplID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuJGNvbnRhaW5lci5oYXNDbGFzcygncGFnZS1oZWFkZXJfZml4ZWQnKSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmZpeGVkQ29udGFpbmVySGVpZ2h0ID0gTWF0aC5yb3VuZCh0aGlzLiRjb250YWluZXIuaW5uZXJIZWlnaHQoKSk7XHJcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLmNzcygndG9wJywgLXRoaXMuZml4ZWRDb250YWluZXJIZWlnaHQpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBpbml0KCkge1xyXG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxIYW5kbGVyKTtcclxuICAgICQod2luZG93KS5vbigncmVzaXplJywgdGhpcy5fd2luZG93UmVzaXplKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgUGFnZUhlYWRlcigpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9QYWdlSGVhZGVyLmpzIiwiaW1wb3J0IGZhbmN5Ym94IGZyb20gJ0BmYW5jeWFwcHMvZmFuY3lib3gnO1xyXG5cclxuXHJcbmNsYXNzIEZhbmN5IHtcclxuICBpbml0KCkge1xyXG4gICAgJCgpLmZhbmN5Ym94KHtcclxuICAgICAgc2VsZWN0b3I6ICdbZGF0YS1mYW5jeWJveF0nLFxyXG4gICAgICBsb29wOiB0cnVlLFxyXG4gICAgICBidXR0b25zOiBbXHJcbiAgICAgICAgXCJ6b29tXCIsXHJcbiAgICAgICAgXCJzbGlkZVNob3dcIixcclxuICAgICAgICBcImZ1bGxTY3JlZW5cIixcclxuICAgICAgICBcInRodW1ic1wiLFxyXG4gICAgICAgIFwiY2xvc2VcIlxyXG4gICAgICBdLFxyXG4gICAgICBsYW5nOiBcInJ1XCIsXHJcbiAgICAgIGkxOG46IHtcclxuICAgICAgICBydToge1xyXG4gICAgICAgICAgQ0xPU0U6IFwi0JfQsNC60YDRi9GC0YxcIixcclxuICAgICAgICAgIE5FWFQ6IFwi0KHQu9C10LTRg9GO0YnQtdC1INC40LfQvtCx0YDQsNC20LXQvdC40LVcIixcclxuICAgICAgICAgIFBSRVY6IFwi0J/RgNC10LTRi9C00YPRidC10LUg0LjQt9C+0LHRgNCw0LbQtdC90LjQtVwiLFxyXG4gICAgICAgICAgRVJST1I6IFwi0JfQsNC/0YDQvtGI0LXQvdC90YvQuSDQutC+0L3RgtC10L3RgiDQvdC1INC80L7QttC10YIg0LHRi9GC0Ywg0LfQsNCz0YDRg9C20LXQvS4gPGJyLz4g0J/QvtCy0YLQvtGA0LjRgtC1INC/0L7Qv9GL0YLQutGDINC/0L7Qt9C20LUuXCIsXHJcbiAgICAgICAgICBQTEFZX1NUQVJUOiBcItCX0LDQv9GD0YHRgtC40YLRjCDRgdC70LDQudC0LdGI0L7Rg1wiLFxyXG4gICAgICAgICAgUExBWV9TVE9QOiBcItCh0LvQsNC50LQt0YjQvtGDINC90LAg0L/QsNGD0LfRg1wiLFxyXG4gICAgICAgICAgRlVMTF9TQ1JFRU46IFwi0JLQviDQstC10YHRjCDRjdC60YDQsNC9XCIsXHJcbiAgICAgICAgICBUSFVNQlM6IFwi0JzQuNC90LjQsNGC0Y7RgNGLXCIsXHJcbiAgICAgICAgICBET1dOTE9BRDogXCLQl9Cw0LPRgNGD0LfQuNGC0YxcIixcclxuICAgICAgICAgIFNIQVJFOiBcItCf0L7QtNC10LvQuNGC0YzRgdGPXCIsXHJcbiAgICAgICAgICBaT09NOiBcItCj0LLQtdC70LjRh9C40YLRjFwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBhZnRlclNob3coKSB7XHJcbiAgICAgICAgJCgnW2RhdGEtZmFuY3lib3gtY2xvc2VdJykuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IEZhbmN5KCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL0ZhbmN5LmpzIiwiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIGZhbmN5Qm94IHYzLjMuNVxuLy9cbi8vIExpY2Vuc2VkIEdQTHYzIGZvciBvcGVuIHNvdXJjZSB1c2Vcbi8vIG9yIGZhbmN5Qm94IENvbW1lcmNpYWwgTGljZW5zZSBmb3IgY29tbWVyY2lhbCB1c2Vcbi8vXG4vLyBodHRwOi8vZmFuY3lhcHBzLmNvbS9mYW5jeWJveC9cbi8vIENvcHlyaWdodCAyMDE4IGZhbmN5QXBwc1xuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgJCwgdW5kZWZpbmVkKSB7XHJcbiAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gIHdpbmRvdy5jb25zb2xlID0gd2luZG93LmNvbnNvbGUgfHwge1xyXG4gICAgaW5mbzogZnVuY3Rpb24oc3R1ZmYpIHt9XHJcbiAgfTtcclxuXHJcbiAgLy8gSWYgdGhlcmUncyBubyBqUXVlcnksIGZhbmN5Qm94IGNhbid0IHdvcmtcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICBpZiAoISQpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIENoZWNrIGlmIGZhbmN5Qm94IGlzIGFscmVhZHkgaW5pdGlhbGl6ZWRcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gIGlmICgkLmZuLmZhbmN5Ym94KSB7XHJcbiAgICBjb25zb2xlLmluZm8oXCJmYW5jeUJveCBhbHJlYWR5IGluaXRpYWxpemVkXCIpO1xyXG5cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIFByaXZhdGUgZGVmYXVsdCBzZXR0aW5nc1xyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICB2YXIgZGVmYXVsdHMgPSB7XHJcbiAgICAvLyBFbmFibGUgaW5maW5pdGUgZ2FsbGVyeSBuYXZpZ2F0aW9uXHJcbiAgICBsb29wOiBmYWxzZSxcclxuXHJcbiAgICAvLyBIb3Jpem9udGFsIHNwYWNlIGJldHdlZW4gc2xpZGVzXHJcbiAgICBndXR0ZXI6IDUwLFxyXG5cclxuICAgIC8vIEVuYWJsZSBrZXlib2FyZCBuYXZpZ2F0aW9uXHJcbiAgICBrZXlib2FyZDogdHJ1ZSxcclxuXHJcbiAgICAvLyBTaG91bGQgZGlzcGxheSBuYXZpZ2F0aW9uIGFycm93cyBhdCB0aGUgc2NyZWVuIGVkZ2VzXHJcbiAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgLy8gU2hvdWxkIGRpc3BsYXkgY291bnRlciBhdCB0aGUgdG9wIGxlZnQgY29ybmVyXHJcbiAgICBpbmZvYmFyOiB0cnVlLFxyXG5cclxuICAgIC8vIFNob3VsZCBkaXNwbGF5IGNsb3NlIGJ1dHRvbiAodXNpbmcgYGJ0blRwbC5zbWFsbEJ0bmAgdGVtcGxhdGUpIG92ZXIgdGhlIGNvbnRlbnRcclxuICAgIC8vIENhbiBiZSB0cnVlLCBmYWxzZSwgXCJhdXRvXCJcclxuICAgIC8vIElmIFwiYXV0b1wiIC0gd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGVuYWJsZWQgZm9yIFwiaHRtbFwiLCBcImlubGluZVwiIG9yIFwiYWpheFwiIGl0ZW1zXHJcbiAgICBzbWFsbEJ0bjogXCJhdXRvXCIsXHJcblxyXG4gICAgLy8gU2hvdWxkIGRpc3BsYXkgdG9vbGJhciAoYnV0dG9ucyBhdCB0aGUgdG9wKVxyXG4gICAgLy8gQ2FuIGJlIHRydWUsIGZhbHNlLCBcImF1dG9cIlxyXG4gICAgLy8gSWYgXCJhdXRvXCIgLSB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgaGlkZGVuIGlmIFwic21hbGxCdG5cIiBpcyBlbmFibGVkXHJcbiAgICB0b29sYmFyOiBcImF1dG9cIixcclxuXHJcbiAgICAvLyBXaGF0IGJ1dHRvbnMgc2hvdWxkIGFwcGVhciBpbiB0aGUgdG9wIHJpZ2h0IGNvcm5lci5cclxuICAgIC8vIEJ1dHRvbnMgd2lsbCBiZSBjcmVhdGVkIHVzaW5nIHRlbXBsYXRlcyBmcm9tIGBidG5UcGxgIG9wdGlvblxyXG4gICAgLy8gYW5kIHRoZXkgd2lsbCBiZSBwbGFjZWQgaW50byB0b29sYmFyIChjbGFzcz1cImZhbmN5Ym94LXRvb2xiYXJcImAgZWxlbWVudClcclxuICAgIGJ1dHRvbnM6IFtcclxuICAgICAgXCJ6b29tXCIsXHJcbiAgICAgIC8vXCJzaGFyZVwiLFxyXG4gICAgICAvL1wic2xpZGVTaG93XCIsXHJcbiAgICAgIC8vXCJmdWxsU2NyZWVuXCIsXHJcbiAgICAgIC8vXCJkb3dubG9hZFwiLFxyXG4gICAgICBcInRodW1ic1wiLFxyXG4gICAgICBcImNsb3NlXCJcclxuICAgIF0sXHJcblxyXG4gICAgLy8gRGV0ZWN0IFwiaWRsZVwiIHRpbWUgaW4gc2Vjb25kc1xyXG4gICAgaWRsZVRpbWU6IDMsXHJcblxyXG4gICAgLy8gRGlzYWJsZSByaWdodC1jbGljayBhbmQgdXNlIHNpbXBsZSBpbWFnZSBwcm90ZWN0aW9uIGZvciBpbWFnZXNcclxuICAgIHByb3RlY3Q6IGZhbHNlLFxyXG5cclxuICAgIC8vIFNob3J0Y3V0IHRvIG1ha2UgY29udGVudCBcIm1vZGFsXCIgLSBkaXNhYmxlIGtleWJvYXJkIG5hdmlndGlvbiwgaGlkZSBidXR0b25zLCBldGNcclxuICAgIG1vZGFsOiBmYWxzZSxcclxuXHJcbiAgICBpbWFnZToge1xyXG4gICAgICAvLyBXYWl0IGZvciBpbWFnZXMgdG8gbG9hZCBiZWZvcmUgZGlzcGxheWluZ1xyXG4gICAgICAvLyAgIHRydWUgIC0gd2FpdCBmb3IgaW1hZ2UgdG8gbG9hZCBhbmQgdGhlbiBkaXNwbGF5O1xyXG4gICAgICAvLyAgIGZhbHNlIC0gZGlzcGxheSB0aHVtYm5haWwgYW5kIGxvYWQgdGhlIGZ1bGwtc2l6ZWQgaW1hZ2Ugb3ZlciB0b3AsXHJcbiAgICAgIC8vICAgICAgICAgICByZXF1aXJlcyBwcmVkZWZpbmVkIGltYWdlIGRpbWVuc2lvbnMgKGBkYXRhLXdpZHRoYCBhbmQgYGRhdGEtaGVpZ2h0YCBhdHRyaWJ1dGVzKVxyXG4gICAgICBwcmVsb2FkOiBmYWxzZVxyXG4gICAgfSxcclxuXHJcbiAgICBhamF4OiB7XHJcbiAgICAgIC8vIE9iamVjdCBjb250YWluaW5nIHNldHRpbmdzIGZvciBhamF4IHJlcXVlc3RcclxuICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAvLyBUaGlzIGhlbHBzIHRvIGluZGljYXRlIHRoYXQgcmVxdWVzdCBjb21lcyBmcm9tIHRoZSBtb2RhbFxyXG4gICAgICAgIC8vIEZlZWwgZnJlZSB0byBjaGFuZ2UgbmFtaW5nXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgZmFuY3lib3g6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaWZyYW1lOiB7XHJcbiAgICAgIC8vIElmcmFtZSB0ZW1wbGF0ZVxyXG4gICAgICB0cGw6XHJcbiAgICAgICAgJzxpZnJhbWUgaWQ9XCJmYW5jeWJveC1mcmFtZXtybmR9XCIgbmFtZT1cImZhbmN5Ym94LWZyYW1le3JuZH1cIiBjbGFzcz1cImZhbmN5Ym94LWlmcmFtZVwiIGZyYW1lYm9yZGVyPVwiMFwiIHZzcGFjZT1cIjBcIiBoc3BhY2U9XCIwXCIgd2Via2l0QWxsb3dGdWxsU2NyZWVuIG1vemFsbG93ZnVsbHNjcmVlbiBhbGxvd0Z1bGxTY3JlZW4gYWxsb3d0cmFuc3BhcmVuY3k9XCJ0cnVlXCIgc3JjPVwiXCI+PC9pZnJhbWU+JyxcclxuXHJcbiAgICAgIC8vIFByZWxvYWQgaWZyYW1lIGJlZm9yZSBkaXNwbGF5aW5nIGl0XHJcbiAgICAgIC8vIFRoaXMgYWxsb3dzIHRvIGNhbGN1bGF0ZSBpZnJhbWUgY29udGVudCB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICAgIC8vIChub3RlOiBEdWUgdG8gXCJTYW1lIE9yaWdpbiBQb2xpY3lcIiwgeW91IGNhbid0IGdldCBjcm9zcyBkb21haW4gZGF0YSkuXHJcbiAgICAgIHByZWxvYWQ6IHRydWUsXHJcblxyXG4gICAgICAvLyBDdXN0b20gQ1NTIHN0eWxpbmcgZm9yIGlmcmFtZSB3cmFwcGluZyBlbGVtZW50XHJcbiAgICAgIC8vIFlvdSBjYW4gdXNlIHRoaXMgdG8gc2V0IGN1c3RvbSBpZnJhbWUgZGltZW5zaW9uc1xyXG4gICAgICBjc3M6IHt9LFxyXG5cclxuICAgICAgLy8gSWZyYW1lIHRhZyBhdHRyaWJ1dGVzXHJcbiAgICAgIGF0dHI6IHtcclxuICAgICAgICBzY3JvbGxpbmc6IFwiYXV0b1wiXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gRGVmYXVsdCBjb250ZW50IHR5cGUgaWYgY2Fubm90IGJlIGRldGVjdGVkIGF1dG9tYXRpY2FsbHlcclxuICAgIGRlZmF1bHRUeXBlOiBcImltYWdlXCIsXHJcblxyXG4gICAgLy8gT3Blbi9jbG9zZSBhbmltYXRpb24gdHlwZVxyXG4gICAgLy8gUG9zc2libGUgdmFsdWVzOlxyXG4gICAgLy8gICBmYWxzZSAgICAgICAgICAgIC0gZGlzYWJsZVxyXG4gICAgLy8gICBcInpvb21cIiAgICAgICAgICAgLSB6b29tIGltYWdlcyBmcm9tL3RvIHRodW1ibmFpbFxyXG4gICAgLy8gICBcImZhZGVcIlxyXG4gICAgLy8gICBcInpvb20taW4tb3V0XCJcclxuICAgIC8vXHJcbiAgICBhbmltYXRpb25FZmZlY3Q6IFwiem9vbVwiLFxyXG5cclxuICAgIC8vIER1cmF0aW9uIGluIG1zIGZvciBvcGVuL2Nsb3NlIGFuaW1hdGlvblxyXG4gICAgYW5pbWF0aW9uRHVyYXRpb246IDM2NixcclxuXHJcbiAgICAvLyBTaG91bGQgaW1hZ2UgY2hhbmdlIG9wYWNpdHkgd2hpbGUgem9vbWluZ1xyXG4gICAgLy8gSWYgb3BhY2l0eSBpcyBcImF1dG9cIiwgdGhlbiBvcGFjaXR5IHdpbGwgYmUgY2hhbmdlZCBpZiBpbWFnZSBhbmQgdGh1bWJuYWlsIGhhdmUgZGlmZmVyZW50IGFzcGVjdCByYXRpb3NcclxuICAgIHpvb21PcGFjaXR5OiBcImF1dG9cIixcclxuXHJcbiAgICAvLyBUcmFuc2l0aW9uIGVmZmVjdCBiZXR3ZWVuIHNsaWRlc1xyXG4gICAgLy9cclxuICAgIC8vIFBvc3NpYmxlIHZhbHVlczpcclxuICAgIC8vICAgZmFsc2UgICAgICAgICAgICAtIGRpc2FibGVcclxuICAgIC8vICAgXCJmYWRlJ1xyXG4gICAgLy8gICBcInNsaWRlJ1xyXG4gICAgLy8gICBcImNpcmN1bGFyJ1xyXG4gICAgLy8gICBcInR1YmUnXHJcbiAgICAvLyAgIFwiem9vbS1pbi1vdXQnXHJcbiAgICAvLyAgIFwicm90YXRlJ1xyXG4gICAgLy9cclxuICAgIHRyYW5zaXRpb25FZmZlY3Q6IFwiZmFkZVwiLFxyXG5cclxuICAgIC8vIER1cmF0aW9uIGluIG1zIGZvciB0cmFuc2l0aW9uIGFuaW1hdGlvblxyXG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uOiAzNjYsXHJcblxyXG4gICAgLy8gQ3VzdG9tIENTUyBjbGFzcyBmb3Igc2xpZGUgZWxlbWVudFxyXG4gICAgc2xpZGVDbGFzczogXCJcIixcclxuXHJcbiAgICAvLyBDdXN0b20gQ1NTIGNsYXNzIGZvciBsYXlvdXRcclxuICAgIGJhc2VDbGFzczogXCJcIixcclxuXHJcbiAgICAvLyBCYXNlIHRlbXBsYXRlIGZvciBsYXlvdXRcclxuICAgIGJhc2VUcGw6XHJcbiAgICAgICc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtY29udGFpbmVyXCIgcm9sZT1cImRpYWxvZ1wiIHRhYmluZGV4PVwiLTFcIj4nICtcclxuICAgICAgJzxkaXYgY2xhc3M9XCJmYW5jeWJveC1iZ1wiPjwvZGl2PicgK1xyXG4gICAgICAnPGRpdiBjbGFzcz1cImZhbmN5Ym94LWlubmVyXCI+JyArXHJcbiAgICAgICc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtaW5mb2JhclwiPicgK1xyXG4gICAgICBcIjxzcGFuIGRhdGEtZmFuY3lib3gtaW5kZXg+PC9zcGFuPiZuYnNwOy8mbmJzcDs8c3BhbiBkYXRhLWZhbmN5Ym94LWNvdW50Pjwvc3Bhbj5cIiArXHJcbiAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICAnPGRpdiBjbGFzcz1cImZhbmN5Ym94LXRvb2xiYXJcIj57e2J1dHRvbnN9fTwvZGl2PicgK1xyXG4gICAgICAnPGRpdiBjbGFzcz1cImZhbmN5Ym94LW5hdmlnYXRpb25cIj57e2Fycm93c319PC9kaXY+JyArXHJcbiAgICAgICc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtc3RhZ2VcIj48L2Rpdj4nICtcclxuICAgICAgJzxkaXYgY2xhc3M9XCJmYW5jeWJveC1jYXB0aW9uXCI+PC9kaXY+JyArXHJcbiAgICAgIFwiPC9kaXY+XCIgK1xyXG4gICAgICBcIjwvZGl2PlwiLFxyXG5cclxuICAgIC8vIExvYWRpbmcgaW5kaWNhdG9yIHRlbXBsYXRlXHJcbiAgICBzcGlubmVyVHBsOiAnPGRpdiBjbGFzcz1cImZhbmN5Ym94LWxvYWRpbmdcIj48L2Rpdj4nLFxyXG5cclxuICAgIC8vIEVycm9yIG1lc3NhZ2UgdGVtcGxhdGVcclxuICAgIGVycm9yVHBsOiAnPGRpdiBjbGFzcz1cImZhbmN5Ym94LWVycm9yXCI+PHA+e3tFUlJPUn19PC9wPjwvZGl2PicsXHJcblxyXG4gICAgYnRuVHBsOiB7XHJcbiAgICAgIGRvd25sb2FkOlxyXG4gICAgICAgICc8YSBkb3dubG9hZCBkYXRhLWZhbmN5Ym94LWRvd25sb2FkIGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tZG93bmxvYWRcIiB0aXRsZT1cInt7RE9XTkxPQUR9fVwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj4nICtcclxuICAgICAgICAnPHN2ZyB2aWV3Qm94PVwiMCAwIDQwIDQwXCI+JyArXHJcbiAgICAgICAgJzxwYXRoIGQ9XCJNMTMsMTYgTDIwLDIzIEwyNywxNiBNMjAsNyBMMjAsMjMgTTEwLDI0IEwxMCwyOCBMMzAsMjggTDMwLDI0XCIgLz4nICtcclxuICAgICAgICBcIjwvc3ZnPlwiICtcclxuICAgICAgICBcIjwvYT5cIixcclxuXHJcbiAgICAgIHpvb206XHJcbiAgICAgICAgJzxidXR0b24gZGF0YS1mYW5jeWJveC16b29tIGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tem9vbVwiIHRpdGxlPVwie3taT09NfX1cIj4nICtcclxuICAgICAgICAnPHN2ZyB2aWV3Qm94PVwiMCAwIDQwIDQwXCI+JyArXHJcbiAgICAgICAgJzxwYXRoIGQ9XCJNMTgsMTcgbS04LDAgYTgsOCAwIDEsMCAxNiwwIGE4LDggMCAxLDAgLTE2LDAgTTI0LDIyIEwzMSwyOVwiIC8+JyArXHJcbiAgICAgICAgXCI8L3N2Zz5cIiArXHJcbiAgICAgICAgXCI8L2J1dHRvbj5cIixcclxuXHJcbiAgICAgIGNsb3NlOlxyXG4gICAgICAgICc8YnV0dG9uIGRhdGEtZmFuY3lib3gtY2xvc2UgY2xhc3M9XCJmYW5jeWJveC1idXR0b24gZmFuY3lib3gtYnV0dG9uLS1jbG9zZVwiIHRpdGxlPVwie3tDTE9TRX19XCI+JyArXHJcbiAgICAgICAgJzxzdmcgdmlld0JveD1cIjAgMCA0MCA0MFwiPicgK1xyXG4gICAgICAgICc8cGF0aCBkPVwiTTEwLDEwIEwzMCwzMCBNMzAsMTAgTDEwLDMwXCIgLz4nICtcclxuICAgICAgICBcIjwvc3ZnPlwiICtcclxuICAgICAgICBcIjwvYnV0dG9uPlwiLFxyXG5cclxuICAgICAgLy8gVGhpcyBzbWFsbCBjbG9zZSBidXR0b24gd2lsbCBiZSBhcHBlbmRlZCB0byB5b3VyIGh0bWwvaW5saW5lL2FqYXggY29udGVudCBieSBkZWZhdWx0LFxyXG4gICAgICAvLyBpZiBcInNtYWxsQnRuXCIgb3B0aW9uIGlzIG5vdCBzZXQgdG8gZmFsc2VcclxuICAgICAgc21hbGxCdG46XHJcbiAgICAgICAgJzxidXR0b24gZGF0YS1mYW5jeWJveC1jbG9zZSBjbGFzcz1cImZhbmN5Ym94LWNsb3NlLXNtYWxsXCIgdGl0bGU9XCJ7e0NMT1NFfX1cIj48c3ZnIHZpZXdCb3g9XCIwIDAgMzIgMzJcIj48cGF0aCBkPVwiTTEwLDEwIEwyMiwyMiBNMjIsMTAgTDEwLDIyXCI+PC9wYXRoPjwvc3ZnPjwvYnV0dG9uPicsXHJcblxyXG4gICAgICAvLyBBcnJvd3NcclxuICAgICAgYXJyb3dMZWZ0OlxyXG4gICAgICAgICc8YSBkYXRhLWZhbmN5Ym94LXByZXYgY2xhc3M9XCJmYW5jeWJveC1idXR0b24gZmFuY3lib3gtYnV0dG9uLS1hcnJvd19sZWZ0XCIgdGl0bGU9XCJ7e1BSRVZ9fVwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj4nICtcclxuICAgICAgICAnPHN2ZyB2aWV3Qm94PVwiMCAwIDQwIDQwXCI+JyArXHJcbiAgICAgICAgJzxwYXRoIGQ9XCJNMTgsMTIgTDEwLDIwIEwxOCwyOCBNMTAsMjAgTDMwLDIwXCI+PC9wYXRoPicgK1xyXG4gICAgICAgIFwiPC9zdmc+XCIgK1xyXG4gICAgICAgIFwiPC9hPlwiLFxyXG5cclxuICAgICAgYXJyb3dSaWdodDpcclxuICAgICAgICAnPGEgZGF0YS1mYW5jeWJveC1uZXh0IGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tYXJyb3dfcmlnaHRcIiB0aXRsZT1cInt7TkVYVH19XCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPicgK1xyXG4gICAgICAgICc8c3ZnIHZpZXdCb3g9XCIwIDAgNDAgNDBcIj4nICtcclxuICAgICAgICAnPHBhdGggZD1cIk0xMCwyMCBMMzAsMjAgTTIyLDEyIEwzMCwyMCBMMjIsMjhcIj48L3BhdGg+JyArXHJcbiAgICAgICAgXCI8L3N2Zz5cIiArXHJcbiAgICAgICAgXCI8L2E+XCJcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ29udGFpbmVyIGlzIGluamVjdGVkIGludG8gdGhpcyBlbGVtZW50XHJcbiAgICBwYXJlbnRFbDogXCJib2R5XCIsXHJcblxyXG4gICAgLy8gRm9jdXMgaGFuZGxpbmdcclxuICAgIC8vID09PT09PT09PT09PT09XHJcblxyXG4gICAgLy8gVHJ5IHRvIGZvY3VzIG9uIHRoZSBmaXJzdCBmb2N1c2FibGUgZWxlbWVudCBhZnRlciBvcGVuaW5nXHJcbiAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG5cclxuICAgIC8vIFB1dCBmb2N1cyBiYWNrIHRvIGFjdGl2ZSBlbGVtZW50IGFmdGVyIGNsb3NpbmdcclxuICAgIGJhY2tGb2N1czogdHJ1ZSxcclxuXHJcbiAgICAvLyBEbyBub3QgbGV0IHVzZXIgdG8gZm9jdXMgb24gZWxlbWVudCBvdXRzaWRlIG1vZGFsIGNvbnRlbnRcclxuICAgIHRyYXBGb2N1czogdHJ1ZSxcclxuXHJcbiAgICAvLyBNb2R1bGUgc3BlY2lmaWMgb3B0aW9uc1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBmdWxsU2NyZWVuOiB7XHJcbiAgICAgIGF1dG9TdGFydDogZmFsc2VcclxuICAgIH0sXHJcblxyXG4gICAgLy8gU2V0IGB0b3VjaDogZmFsc2VgIHRvIGRpc2FibGUgZHJhZ2dpbmcvc3dpcGluZ1xyXG4gICAgdG91Y2g6IHtcclxuICAgICAgdmVydGljYWw6IHRydWUsIC8vIEFsbG93IHRvIGRyYWcgY29udGVudCB2ZXJ0aWNhbGx5XHJcbiAgICAgIG1vbWVudHVtOiB0cnVlIC8vIENvbnRpbnVlIG1vdmVtZW50IGFmdGVyIHJlbGVhc2luZyBtb3VzZS90b3VjaCB3aGVuIHBhbm5pbmdcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSGFzaCB2YWx1ZSB3aGVuIGluaXRpYWxpemluZyBtYW51YWxseSxcclxuICAgIC8vIHNldCBgZmFsc2VgIHRvIGRpc2FibGUgaGFzaCBjaGFuZ2VcclxuICAgIGhhc2g6IG51bGwsXHJcblxyXG4gICAgLy8gQ3VzdG9taXplIG9yIGFkZCBuZXcgbWVkaWEgdHlwZXNcclxuICAgIC8vIEV4YW1wbGU6XHJcbiAgICAvKlxyXG4gICAgICAgIG1lZGlhIDoge1xyXG4gICAgICAgICAgICB5b3V0dWJlIDoge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5IDogMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICBtZWRpYToge30sXHJcblxyXG4gICAgc2xpZGVTaG93OiB7XHJcbiAgICAgIGF1dG9TdGFydDogZmFsc2UsXHJcbiAgICAgIHNwZWVkOiA0MDAwXHJcbiAgICB9LFxyXG5cclxuICAgIHRodW1iczoge1xyXG4gICAgICBhdXRvU3RhcnQ6IGZhbHNlLCAvLyBEaXNwbGF5IHRodW1ibmFpbHMgb24gb3BlbmluZ1xyXG4gICAgICBoaWRlT25DbG9zZTogdHJ1ZSwgLy8gSGlkZSB0aHVtYm5haWwgZ3JpZCB3aGVuIGNsb3NpbmcgYW5pbWF0aW9uIHN0YXJ0c1xyXG4gICAgICBwYXJlbnRFbDogXCIuZmFuY3lib3gtY29udGFpbmVyXCIsIC8vIENvbnRhaW5lciBpcyBpbmplY3RlZCBpbnRvIHRoaXMgZWxlbWVudFxyXG4gICAgICBheGlzOiBcInlcIiAvLyBWZXJ0aWNhbCAoeSkgb3IgaG9yaXpvbnRhbCAoeCkgc2Nyb2xsaW5nXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFVzZSBtb3VzZXdoZWVsIHRvIG5hdmlnYXRlIGdhbGxlcnlcclxuICAgIC8vIElmICdhdXRvJyAtIGVuYWJsZWQgZm9yIGltYWdlcyBvbmx5XHJcbiAgICB3aGVlbDogXCJhdXRvXCIsXHJcblxyXG4gICAgLy8gQ2FsbGJhY2tzXHJcbiAgICAvLz09PT09PT09PT1cclxuXHJcbiAgICAvLyBTZWUgRG9jdW1lbnRhdGlvbi9BUEkvRXZlbnRzIGZvciBtb3JlIGluZm9ybWF0aW9uXHJcbiAgICAvLyBFeGFtcGxlOlxyXG4gICAgLypcclxuXHRcdGFmdGVyU2hvdzogZnVuY3Rpb24oIGluc3RhbmNlLCBjdXJyZW50ICkge1xyXG5cdFx0XHRjb25zb2xlLmluZm8oICdDbGlja2VkIGVsZW1lbnQ6JyApO1xyXG5cdFx0XHRjb25zb2xlLmluZm8oIGN1cnJlbnQub3B0cy4kb3JpZyApO1xyXG5cdFx0fVxyXG5cdCovXHJcblxyXG4gICAgb25Jbml0OiAkLm5vb3AsIC8vIFdoZW4gaW5zdGFuY2UgaGFzIGJlZW4gaW5pdGlhbGl6ZWRcclxuXHJcbiAgICBiZWZvcmVMb2FkOiAkLm5vb3AsIC8vIEJlZm9yZSB0aGUgY29udGVudCBvZiBhIHNsaWRlIGlzIGJlaW5nIGxvYWRlZFxyXG4gICAgYWZ0ZXJMb2FkOiAkLm5vb3AsIC8vIFdoZW4gdGhlIGNvbnRlbnQgb2YgYSBzbGlkZSBpcyBkb25lIGxvYWRpbmdcclxuXHJcbiAgICBiZWZvcmVTaG93OiAkLm5vb3AsIC8vIEJlZm9yZSBvcGVuIGFuaW1hdGlvbiBzdGFydHNcclxuICAgIGFmdGVyU2hvdzogJC5ub29wLCAvLyBXaGVuIGNvbnRlbnQgaXMgZG9uZSBsb2FkaW5nIGFuZCBhbmltYXRpbmdcclxuXHJcbiAgICBiZWZvcmVDbG9zZTogJC5ub29wLCAvLyBCZWZvcmUgdGhlIGluc3RhbmNlIGF0dGVtcHRzIHRvIGNsb3NlLiBSZXR1cm4gZmFsc2UgdG8gY2FuY2VsIHRoZSBjbG9zZS5cclxuICAgIGFmdGVyQ2xvc2U6ICQubm9vcCwgLy8gQWZ0ZXIgaW5zdGFuY2UgaGFzIGJlZW4gY2xvc2VkXHJcblxyXG4gICAgb25BY3RpdmF0ZTogJC5ub29wLCAvLyBXaGVuIGluc3RhbmNlIGlzIGJyb3VnaHQgdG8gZnJvbnRcclxuICAgIG9uRGVhY3RpdmF0ZTogJC5ub29wLCAvLyBXaGVuIG90aGVyIGluc3RhbmNlIGhhcyBiZWVuIGFjdGl2YXRlZFxyXG5cclxuICAgIC8vIEludGVyYWN0aW9uXHJcbiAgICAvLyA9PT09PT09PT09PVxyXG5cclxuICAgIC8vIFVzZSBvcHRpb25zIGJlbG93IHRvIGN1c3RvbWl6ZSB0YWtlbiBhY3Rpb24gd2hlbiB1c2VyIGNsaWNrcyBvciBkb3VibGUgY2xpY2tzIG9uIHRoZSBmYW5jeUJveCBhcmVhLFxyXG4gICAgLy8gZWFjaCBvcHRpb24gY2FuIGJlIHN0cmluZyBvciBtZXRob2QgdGhhdCByZXR1cm5zIHZhbHVlLlxyXG4gICAgLy9cclxuICAgIC8vIFBvc3NpYmxlIHZhbHVlczpcclxuICAgIC8vICAgXCJjbG9zZVwiICAgICAgICAgICAtIGNsb3NlIGluc3RhbmNlXHJcbiAgICAvLyAgIFwibmV4dFwiICAgICAgICAgICAgLSBtb3ZlIHRvIG5leHQgZ2FsbGVyeSBpdGVtXHJcbiAgICAvLyAgIFwibmV4dE9yQ2xvc2VcIiAgICAgLSBtb3ZlIHRvIG5leHQgZ2FsbGVyeSBpdGVtIG9yIGNsb3NlIGlmIGdhbGxlcnkgaGFzIG9ubHkgb25lIGl0ZW1cclxuICAgIC8vICAgXCJ0b2dnbGVDb250cm9sc1wiICAtIHNob3cvaGlkZSBjb250cm9sc1xyXG4gICAgLy8gICBcInpvb21cIiAgICAgICAgICAgIC0gem9vbSBpbWFnZSAoaWYgbG9hZGVkKVxyXG4gICAgLy8gICBmYWxzZSAgICAgICAgICAgICAtIGRvIG5vdGhpbmdcclxuXHJcbiAgICAvLyBDbGlja2VkIG9uIHRoZSBjb250ZW50XHJcbiAgICBjbGlja0NvbnRlbnQ6IGZ1bmN0aW9uKGN1cnJlbnQsIGV2ZW50KSB7XHJcbiAgICAgIHJldHVybiBjdXJyZW50LnR5cGUgPT09IFwiaW1hZ2VcIiA/IFwiem9vbVwiIDogZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENsaWNrZWQgb24gdGhlIHNsaWRlXHJcbiAgICBjbGlja1NsaWRlOiBcImNsb3NlXCIsXHJcblxyXG4gICAgLy8gQ2xpY2tlZCBvbiB0aGUgYmFja2dyb3VuZCAoYmFja2Ryb3ApIGVsZW1lbnQ7XHJcbiAgICAvLyBpZiB5b3UgaGF2ZSBub3QgY2hhbmdlZCB0aGUgbGF5b3V0LCB0aGVuIG1vc3QgbGlrZWx5IHlvdSBuZWVkIHRvIHVzZSBgY2xpY2tTbGlkZWAgb3B0aW9uXHJcbiAgICBjbGlja091dHNpZGU6IFwiY2xvc2VcIixcclxuXHJcbiAgICAvLyBTYW1lIGFzIHByZXZpb3VzIHR3bywgYnV0IGZvciBkb3VibGUgY2xpY2tcclxuICAgIGRibGNsaWNrQ29udGVudDogZmFsc2UsXHJcbiAgICBkYmxjbGlja1NsaWRlOiBmYWxzZSxcclxuICAgIGRibGNsaWNrT3V0c2lkZTogZmFsc2UsXHJcblxyXG4gICAgLy8gQ3VzdG9tIG9wdGlvbnMgd2hlbiBtb2JpbGUgZGV2aWNlIGlzIGRldGVjdGVkXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBtb2JpbGU6IHtcclxuICAgICAgaWRsZVRpbWU6IGZhbHNlLFxyXG4gICAgICBjbGlja0NvbnRlbnQ6IGZ1bmN0aW9uKGN1cnJlbnQsIGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQudHlwZSA9PT0gXCJpbWFnZVwiID8gXCJ0b2dnbGVDb250cm9sc1wiIDogZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNsaWNrU2xpZGU6IGZ1bmN0aW9uKGN1cnJlbnQsIGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQudHlwZSA9PT0gXCJpbWFnZVwiID8gXCJ0b2dnbGVDb250cm9sc1wiIDogXCJjbG9zZVwiO1xyXG4gICAgICB9LFxyXG4gICAgICBkYmxjbGlja0NvbnRlbnQ6IGZ1bmN0aW9uKGN1cnJlbnQsIGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQudHlwZSA9PT0gXCJpbWFnZVwiID8gXCJ6b29tXCIgOiBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgZGJsY2xpY2tTbGlkZTogZnVuY3Rpb24oY3VycmVudCwgZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudC50eXBlID09PSBcImltYWdlXCIgPyBcInpvb21cIiA6IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEludGVybmF0aW9uYWxpemF0aW9uXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGxhbmc6IFwiZW5cIixcclxuICAgIGkxOG46IHtcclxuICAgICAgZW46IHtcclxuICAgICAgICBDTE9TRTogXCJDbG9zZVwiLFxyXG4gICAgICAgIE5FWFQ6IFwiTmV4dFwiLFxyXG4gICAgICAgIFBSRVY6IFwiUHJldmlvdXNcIixcclxuICAgICAgICBFUlJPUjogXCJUaGUgcmVxdWVzdGVkIGNvbnRlbnQgY2Fubm90IGJlIGxvYWRlZC4gPGJyLz4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci5cIixcclxuICAgICAgICBQTEFZX1NUQVJUOiBcIlN0YXJ0IHNsaWRlc2hvd1wiLFxyXG4gICAgICAgIFBMQVlfU1RPUDogXCJQYXVzZSBzbGlkZXNob3dcIixcclxuICAgICAgICBGVUxMX1NDUkVFTjogXCJGdWxsIHNjcmVlblwiLFxyXG4gICAgICAgIFRIVU1CUzogXCJUaHVtYm5haWxzXCIsXHJcbiAgICAgICAgRE9XTkxPQUQ6IFwiRG93bmxvYWRcIixcclxuICAgICAgICBTSEFSRTogXCJTaGFyZVwiLFxyXG4gICAgICAgIFpPT006IFwiWm9vbVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIGRlOiB7XHJcbiAgICAgICAgQ0xPU0U6IFwiU2NobGllc3NlblwiLFxyXG4gICAgICAgIE5FWFQ6IFwiV2VpdGVyXCIsXHJcbiAgICAgICAgUFJFVjogXCJadXLDvGNrXCIsXHJcbiAgICAgICAgRVJST1I6IFwiRGllIGFuZ2Vmb3JkZXJ0ZW4gRGF0ZW4ga29ubnRlbiBuaWNodCBnZWxhZGVuIHdlcmRlbi4gPGJyLz4gQml0dGUgdmVyc3VjaGVuIFNpZSBlcyBzcMOkdGVyIG5vY2htYWwuXCIsXHJcbiAgICAgICAgUExBWV9TVEFSVDogXCJEaWFzY2hhdSBzdGFydGVuXCIsXHJcbiAgICAgICAgUExBWV9TVE9QOiBcIkRpYXNjaGF1IGJlZW5kZW5cIixcclxuICAgICAgICBGVUxMX1NDUkVFTjogXCJWb2xsYmlsZFwiLFxyXG4gICAgICAgIFRIVU1CUzogXCJWb3JzY2hhdWJpbGRlclwiLFxyXG4gICAgICAgIERPV05MT0FEOiBcIkhlcnVudGVybGFkZW5cIixcclxuICAgICAgICBTSEFSRTogXCJUZWlsZW5cIixcclxuICAgICAgICBaT09NOiBcIk1hw59zdGFiXCJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIEZldyB1c2VmdWwgdmFyaWFibGVzIGFuZCBtZXRob2RzXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgdmFyICRXID0gJCh3aW5kb3cpO1xyXG4gIHZhciAkRCA9ICQoZG9jdW1lbnQpO1xyXG5cclxuICB2YXIgY2FsbGVkID0gMDtcclxuXHJcbiAgLy8gQ2hlY2sgaWYgYW4gb2JqZWN0IGlzIGEgalF1ZXJ5IG9iamVjdCBhbmQgbm90IGEgbmF0aXZlIEphdmFTY3JpcHQgb2JqZWN0XHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgdmFyIGlzUXVlcnkgPSBmdW5jdGlvbihvYmopIHtcclxuICAgIHJldHVybiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5ICYmIG9iaiBpbnN0YW5jZW9mICQ7XHJcbiAgfTtcclxuXHJcbiAgLy8gSGFuZGxlIG11bHRpcGxlIGJyb3dzZXJzIGZvciBcInJlcXVlc3RBbmltYXRpb25GcmFtZVwiIGFuZCBcImNhbmNlbEFuaW1hdGlvbkZyYW1lXCJcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgdmFyIHJlcXVlc3RBRnJhbWUgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAvLyBpZiBhbGwgZWxzZSBmYWlscywgdXNlIHNldFRpbWVvdXRcclxuICAgICAgZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfSkoKTtcclxuXHJcbiAgLy8gRGV0ZWN0IHRoZSBzdXBwb3J0ZWQgdHJhbnNpdGlvbi1lbmQgZXZlbnQgcHJvcGVydHkgbmFtZVxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICB2YXIgdHJhbnNpdGlvbkVuZCA9IChmdW5jdGlvbigpIHtcclxuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmYWtlZWxlbWVudFwiKSxcclxuICAgICAgdDtcclxuXHJcbiAgICB2YXIgdHJhbnNpdGlvbnMgPSB7XHJcbiAgICAgIHRyYW5zaXRpb246IFwidHJhbnNpdGlvbmVuZFwiLFxyXG4gICAgICBPVHJhbnNpdGlvbjogXCJvVHJhbnNpdGlvbkVuZFwiLFxyXG4gICAgICBNb3pUcmFuc2l0aW9uOiBcInRyYW5zaXRpb25lbmRcIixcclxuICAgICAgV2Via2l0VHJhbnNpdGlvbjogXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCJcclxuICAgIH07XHJcblxyXG4gICAgZm9yICh0IGluIHRyYW5zaXRpb25zKSB7XHJcbiAgICAgIGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25zW3RdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFwidHJhbnNpdGlvbmVuZFwiO1xyXG4gIH0pKCk7XHJcblxyXG4gIC8vIEZvcmNlIHJlZHJhdyBvbiBhbiBlbGVtZW50LlxyXG4gIC8vIFRoaXMgaGVscHMgaW4gY2FzZXMgd2hlcmUgdGhlIGJyb3dzZXIgZG9lc24ndCByZWRyYXcgYW4gdXBkYXRlZCBlbGVtZW50IHByb3Blcmx5XHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICB2YXIgZm9yY2VSZWRyYXcgPSBmdW5jdGlvbigkZWwpIHtcclxuICAgIHJldHVybiAkZWwgJiYgJGVsLmxlbmd0aCAmJiAkZWxbMF0ub2Zmc2V0SGVpZ2h0O1xyXG4gIH07XHJcblxyXG4gIC8vIEV4Y2x1ZGUgYXJyYXkgKGBidXR0b25zYCkgb3B0aW9ucyBmcm9tIGRlZXAgbWVyZ2luZ1xyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIHZhciBtZXJnZU9wdHMgPSBmdW5jdGlvbihvcHRzMSwgb3B0czIpIHtcclxuICAgIHZhciByZXogPSAkLmV4dGVuZCh0cnVlLCB7fSwgb3B0czEsIG9wdHMyKTtcclxuXHJcbiAgICAkLmVhY2gob3B0czIsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcclxuICAgICAgaWYgKCQuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICByZXpba2V5XSA9IHZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmV6O1xyXG4gIH07XHJcblxyXG4gIC8vIENsYXNzIGRlZmluaXRpb25cclxuICAvLyA9PT09PT09PT09PT09PT09XHJcblxyXG4gIHZhciBGYW5jeUJveCA9IGZ1bmN0aW9uKGNvbnRlbnQsIG9wdHMsIGluZGV4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgc2VsZi5vcHRzID0gbWVyZ2VPcHRzKHtpbmRleDogaW5kZXh9LCAkLmZhbmN5Ym94LmRlZmF1bHRzKTtcclxuXHJcbiAgICBpZiAoJC5pc1BsYWluT2JqZWN0KG9wdHMpKSB7XHJcbiAgICAgIHNlbGYub3B0cyA9IG1lcmdlT3B0cyhzZWxmLm9wdHMsIG9wdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkLmZhbmN5Ym94LmlzTW9iaWxlKSB7XHJcbiAgICAgIHNlbGYub3B0cyA9IG1lcmdlT3B0cyhzZWxmLm9wdHMsIHNlbGYub3B0cy5tb2JpbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGYuaWQgPSBzZWxmLm9wdHMuaWQgfHwgKytjYWxsZWQ7XHJcblxyXG4gICAgc2VsZi5jdXJySW5kZXggPSBwYXJzZUludChzZWxmLm9wdHMuaW5kZXgsIDEwKSB8fCAwO1xyXG4gICAgc2VsZi5wcmV2SW5kZXggPSBudWxsO1xyXG5cclxuICAgIHNlbGYucHJldlBvcyA9IG51bGw7XHJcbiAgICBzZWxmLmN1cnJQb3MgPSAwO1xyXG5cclxuICAgIHNlbGYuZmlyc3RSdW4gPSB0cnVlO1xyXG5cclxuICAgIC8vIEFsbCBncm91cCBpdGVtc1xyXG4gICAgc2VsZi5ncm91cCA9IFtdO1xyXG5cclxuICAgIC8vIEV4aXN0aW5nIHNsaWRlcyAoZm9yIGN1cnJlbnQsIG5leHQgYW5kIHByZXZpb3VzIGdhbGxlcnkgaXRlbXMpXHJcbiAgICBzZWxmLnNsaWRlcyA9IHt9O1xyXG5cclxuICAgIC8vIENyZWF0ZSBncm91cCBlbGVtZW50c1xyXG4gICAgc2VsZi5hZGRDb250ZW50KGNvbnRlbnQpO1xyXG5cclxuICAgIGlmICghc2VsZi5ncm91cC5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNhdmUgbGFzdCBhY3RpdmUgZWxlbWVudFxyXG4gICAgc2VsZi4kbGFzdEZvY3VzID0gJChkb2N1bWVudC5hY3RpdmVFbGVtZW50KS50cmlnZ2VyKFwiYmx1clwiKTtcclxuXHJcbiAgICBzZWxmLmluaXQoKTtcclxuICB9O1xyXG5cclxuICAkLmV4dGVuZChGYW5jeUJveC5wcm90b3R5cGUsIHtcclxuICAgIC8vIENyZWF0ZSBET00gc3RydWN0dXJlXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgZmlyc3RJdGVtID0gc2VsZi5ncm91cFtzZWxmLmN1cnJJbmRleF0sXHJcbiAgICAgICAgZmlyc3RJdGVtT3B0cyA9IGZpcnN0SXRlbS5vcHRzLFxyXG4gICAgICAgIHNjcm9sbGJhcldpZHRoID0gJC5mYW5jeWJveC5zY3JvbGxiYXJXaWR0aCxcclxuICAgICAgICAkc2Nyb2xsRGl2LFxyXG4gICAgICAgICRjb250YWluZXIsXHJcbiAgICAgICAgYnV0dG9uU3RyO1xyXG5cclxuICAgICAgLy8gSGlkZSBzY3JvbGxiYXJzXHJcbiAgICAgIC8vID09PT09PT09PT09PT09PVxyXG5cclxuICAgICAgaWYgKCEkLmZhbmN5Ym94LmdldEluc3RhbmNlKCkgJiYgZmlyc3RJdGVtT3B0cy5oaWRlU2Nyb2xsYmFyICE9PSBmYWxzZSkge1xyXG4gICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwiZmFuY3lib3gtYWN0aXZlXCIpO1xyXG5cclxuICAgICAgICBpZiAoISQuZmFuY3lib3guaXNNb2JpbGUgJiYgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcclxuICAgICAgICAgIGlmIChzY3JvbGxiYXJXaWR0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICRzY3JvbGxEaXYgPSAkKCc8ZGl2IHN0eWxlPVwid2lkdGg6MTAwcHg7aGVpZ2h0OjEwMHB4O292ZXJmbG93OnNjcm9sbDtcIiAvPicpLmFwcGVuZFRvKFwiYm9keVwiKTtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbGJhcldpZHRoID0gJC5mYW5jeWJveC5zY3JvbGxiYXJXaWR0aCA9ICRzY3JvbGxEaXZbMF0ub2Zmc2V0V2lkdGggLSAkc2Nyb2xsRGl2WzBdLmNsaWVudFdpZHRoO1xyXG5cclxuICAgICAgICAgICAgJHNjcm9sbERpdi5yZW1vdmUoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAkKFwiaGVhZFwiKS5hcHBlbmQoXHJcbiAgICAgICAgICAgICc8c3R5bGUgaWQ9XCJmYW5jeWJveC1zdHlsZS1ub3Njcm9sbFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiPi5jb21wZW5zYXRlLWZvci1zY3JvbGxiYXIgeyBtYXJnaW4tcmlnaHQ6ICcgK1xyXG4gICAgICAgICAgICAgIHNjcm9sbGJhcldpZHRoICtcclxuICAgICAgICAgICAgICBcInB4OyB9PC9zdHlsZT5cIlxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImNvbXBlbnNhdGUtZm9yLXNjcm9sbGJhclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEJ1aWxkIGh0bWwgbWFya3VwIGFuZCBzZXQgcmVmZXJlbmNlc1xyXG4gICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAgIC8vIEJ1aWxkIGh0bWwgY29kZSBmb3IgYnV0dG9ucyBhbmQgaW5zZXJ0IGludG8gbWFpbiB0ZW1wbGF0ZVxyXG4gICAgICBidXR0b25TdHIgPSBcIlwiO1xyXG5cclxuICAgICAgJC5lYWNoKGZpcnN0SXRlbU9wdHMuYnV0dG9ucywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgYnV0dG9uU3RyICs9IGZpcnN0SXRlbU9wdHMuYnRuVHBsW3ZhbHVlXSB8fCBcIlwiO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIENyZWF0ZSBtYXJrdXAgZnJvbSBiYXNlIHRlbXBsYXRlLCBpdCB3aWxsIGJlIGluaXRpYWxseSBoaWRkZW4gdG9cclxuICAgICAgLy8gYXZvaWQgdW5uZWNlc3Nhcnkgd29yayBsaWtlIHBhaW50aW5nIHdoaWxlIGluaXRpYWxpemluZyBpcyBub3QgY29tcGxldGVcclxuICAgICAgJGNvbnRhaW5lciA9ICQoXHJcbiAgICAgICAgc2VsZi50cmFuc2xhdGUoXHJcbiAgICAgICAgICBzZWxmLFxyXG4gICAgICAgICAgZmlyc3RJdGVtT3B0cy5iYXNlVHBsXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie3tidXR0b25zfX1cIiwgYnV0dG9uU3RyKVxyXG4gICAgICAgICAgICAucmVwbGFjZShcInt7YXJyb3dzfX1cIiwgZmlyc3RJdGVtT3B0cy5idG5UcGwuYXJyb3dMZWZ0ICsgZmlyc3RJdGVtT3B0cy5idG5UcGwuYXJyb3dSaWdodClcclxuICAgICAgICApXHJcbiAgICAgIClcclxuICAgICAgICAuYXR0cihcImlkXCIsIFwiZmFuY3lib3gtY29udGFpbmVyLVwiICsgc2VsZi5pZClcclxuICAgICAgICAuYWRkQ2xhc3MoXCJmYW5jeWJveC1pcy1oaWRkZW5cIilcclxuICAgICAgICAuYWRkQ2xhc3MoZmlyc3RJdGVtT3B0cy5iYXNlQ2xhc3MpXHJcbiAgICAgICAgLmRhdGEoXCJGYW5jeUJveFwiLCBzZWxmKVxyXG4gICAgICAgIC5hcHBlbmRUbyhmaXJzdEl0ZW1PcHRzLnBhcmVudEVsKTtcclxuXHJcbiAgICAgIC8vIENyZWF0ZSBvYmplY3QgaG9sZGluZyByZWZlcmVuY2VzIHRvIGpRdWVyeSB3cmFwcGVkIG5vZGVzXHJcbiAgICAgIHNlbGYuJHJlZnMgPSB7XHJcbiAgICAgICAgY29udGFpbmVyOiAkY29udGFpbmVyXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBbXCJiZ1wiLCBcImlubmVyXCIsIFwiaW5mb2JhclwiLCBcInRvb2xiYXJcIiwgXCJzdGFnZVwiLCBcImNhcHRpb25cIiwgXCJuYXZpZ2F0aW9uXCJdLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgIHNlbGYuJHJlZnNbaXRlbV0gPSAkY29udGFpbmVyLmZpbmQoXCIuZmFuY3lib3gtXCIgKyBpdGVtKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZWxmLnRyaWdnZXIoXCJvbkluaXRcIik7XHJcblxyXG4gICAgICAvLyBFbmFibGUgZXZlbnRzLCBkZWFjdGl2ZSBwcmV2aW91cyBpbnN0YW5jZXNcclxuICAgICAgc2VsZi5hY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgLy8gQnVpbGQgc2xpZGVzLCBsb2FkIGFuZCByZXZlYWwgY29udGVudFxyXG4gICAgICBzZWxmLmp1bXBUbyhzZWxmLmN1cnJJbmRleCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNpbXBsZSBpMThuIHN1cHBvcnQgLSByZXBsYWNlcyBvYmplY3Qga2V5cyBmb3VuZCBpbiB0ZW1wbGF0ZVxyXG4gICAgLy8gd2l0aCBjb3JyZXNwb25kaW5nIHZhbHVlc1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgdHJhbnNsYXRlOiBmdW5jdGlvbihvYmosIHN0cikge1xyXG4gICAgICB2YXIgYXJyID0gb2JqLm9wdHMuaTE4bltvYmoub3B0cy5sYW5nXTtcclxuXHJcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFx7XFx7KFxcdyspXFx9XFx9L2csIGZ1bmN0aW9uKG1hdGNoLCBuKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gYXJyW25dO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gUG9wdWxhdGUgY3VycmVudCBncm91cCB3aXRoIGZyZXNoIGNvbnRlbnRcclxuICAgIC8vIENoZWNrIGlmIGVhY2ggb2JqZWN0IGhhcyB2YWxpZCB0eXBlIGFuZCBjb250ZW50XHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGFkZENvbnRlbnQ6IGZ1bmN0aW9uKGNvbnRlbnQpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGl0ZW1zID0gJC5tYWtlQXJyYXkoY29udGVudCksXHJcbiAgICAgICAgdGh1bWJzO1xyXG5cclxuICAgICAgJC5lYWNoKGl0ZW1zLCBmdW5jdGlvbihpLCBpdGVtKSB7XHJcbiAgICAgICAgdmFyIG9iaiA9IHt9LFxyXG4gICAgICAgICAgb3B0cyA9IHt9LFxyXG4gICAgICAgICAgJGl0ZW0sXHJcbiAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgZm91bmQsXHJcbiAgICAgICAgICBzcmMsXHJcbiAgICAgICAgICBzcmNQYXJ0cztcclxuXHJcbiAgICAgICAgLy8gU3RlcCAxIC0gTWFrZSBzdXJlIHdlIGhhdmUgYW4gb2JqZWN0XHJcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgICAgIGlmICgkLmlzUGxhaW5PYmplY3QoaXRlbSkpIHtcclxuICAgICAgICAgIC8vIFdlIHByb2JhYmx5IGhhdmUgbWFudWFsIHVzYWdlIGhlcmUsIHNvbWV0aGluZyBsaWtlXHJcbiAgICAgICAgICAvLyAkLmZhbmN5Ym94Lm9wZW4oIFsgeyBzcmMgOiBcImltYWdlLmpwZ1wiLCB0eXBlIDogXCJpbWFnZVwiIH0gXSApXHJcblxyXG4gICAgICAgICAgb2JqID0gaXRlbTtcclxuICAgICAgICAgIG9wdHMgPSBpdGVtLm9wdHMgfHwgaXRlbTtcclxuICAgICAgICB9IGVsc2UgaWYgKCQudHlwZShpdGVtKSA9PT0gXCJvYmplY3RcIiAmJiAkKGl0ZW0pLmxlbmd0aCkge1xyXG4gICAgICAgICAgLy8gSGVyZSB3ZSBwcm9iYWJseSBoYXZlIGpRdWVyeSBjb2xsZWN0aW9uIHJldHVybmVkIGJ5IHNvbWUgc2VsZWN0b3JcclxuICAgICAgICAgICRpdGVtID0gJChpdGVtKTtcclxuXHJcbiAgICAgICAgICAvLyBTdXBwb3J0IGF0dHJpYnV0ZXMgbGlrZSBgZGF0YS1vcHRpb25zPSd7XCJ0b3VjaFwiIDogZmFsc2V9J2AgYW5kIGBkYXRhLXRvdWNoPSdmYWxzZSdgXHJcbiAgICAgICAgICBvcHRzID0gJGl0ZW0uZGF0YSgpIHx8IHt9O1xyXG4gICAgICAgICAgb3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBvcHRzLCBvcHRzLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgIC8vIEhlcmUgd2Ugc3RvcmUgY2xpY2tlZCBlbGVtZW50XHJcbiAgICAgICAgICBvcHRzLiRvcmlnID0gJGl0ZW07XHJcblxyXG4gICAgICAgICAgb2JqLnNyYyA9IHNlbGYub3B0cy5zcmMgfHwgb3B0cy5zcmMgfHwgJGl0ZW0uYXR0cihcImhyZWZcIik7XHJcblxyXG4gICAgICAgICAgLy8gQXNzdW1lIHRoYXQgc2ltcGxlIHN5bnRheCBpcyB1c2VkLCBmb3IgZXhhbXBsZTpcclxuICAgICAgICAgIC8vICAgYCQuZmFuY3lib3gub3BlbiggJChcIiN0ZXN0XCIpLCB7fSApO2BcclxuICAgICAgICAgIGlmICghb2JqLnR5cGUgJiYgIW9iai5zcmMpIHtcclxuICAgICAgICAgICAgb2JqLnR5cGUgPSBcImlubGluZVwiO1xyXG4gICAgICAgICAgICBvYmouc3JjID0gaXRlbTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gQXNzdW1lIHdlIGhhdmUgYSBzaW1wbGUgaHRtbCBjb2RlLCBmb3IgZXhhbXBsZTpcclxuICAgICAgICAgIC8vICAgJC5mYW5jeWJveC5vcGVuKCAnPGRpdj48aDE+SGkhPC9oMT48L2Rpdj4nICk7XHJcbiAgICAgICAgICBvYmogPSB7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiaHRtbFwiLFxyXG4gICAgICAgICAgICBzcmM6IGl0ZW0gKyBcIlwiXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRWFjaCBnYWxsZXJ5IG9iamVjdCBoYXMgZnVsbCBjb2xsZWN0aW9uIG9mIG9wdGlvbnNcclxuICAgICAgICBvYmoub3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBzZWxmLm9wdHMsIG9wdHMpO1xyXG5cclxuICAgICAgICAvLyBEbyBub3QgbWVyZ2UgYnV0dG9ucyBhcnJheVxyXG4gICAgICAgIGlmICgkLmlzQXJyYXkob3B0cy5idXR0b25zKSkge1xyXG4gICAgICAgICAgb2JqLm9wdHMuYnV0dG9ucyA9IG9wdHMuYnV0dG9ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFN0ZXAgMiAtIE1ha2Ugc3VyZSB3ZSBoYXZlIGNvbnRlbnQgdHlwZSwgaWYgbm90IC0gdHJ5IHRvIGd1ZXNzXHJcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAgICAgdHlwZSA9IG9iai50eXBlIHx8IG9iai5vcHRzLnR5cGU7XHJcbiAgICAgICAgc3JjID0gb2JqLnNyYyB8fCBcIlwiO1xyXG5cclxuICAgICAgICBpZiAoIXR5cGUgJiYgc3JjKSB7XHJcbiAgICAgICAgICBpZiAoKGZvdW5kID0gc3JjLm1hdGNoKC9cXC4obXA0fG1vdnxvZ3YpKChcXD98IykuKik/JC9pKSkpIHtcclxuICAgICAgICAgICAgdHlwZSA9IFwidmlkZW9cIjtcclxuXHJcbiAgICAgICAgICAgIGlmICghb2JqLm9wdHMudmlkZW9Gb3JtYXQpIHtcclxuICAgICAgICAgICAgICBvYmoub3B0cy52aWRlb0Zvcm1hdCA9IFwidmlkZW8vXCIgKyAoZm91bmRbMV0gPT09IFwib2d2XCIgPyBcIm9nZ1wiIDogZm91bmRbMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHNyYy5tYXRjaCgvKF5kYXRhOmltYWdlXFwvW2EtejAtOStcXC89XSosKXwoXFwuKGpwKGV8Z3xlZyl8Z2lmfHBuZ3xibXB8d2VicHxzdmd8aWNvKSgoXFw/fCMpLiopPyQpL2kpKSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSBcImltYWdlXCI7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHNyYy5tYXRjaCgvXFwuKHBkZikoKFxcP3wjKS4qKT8kL2kpKSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSBcImlmcmFtZVwiO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChzcmMuY2hhckF0KDApID09PSBcIiNcIikge1xyXG4gICAgICAgICAgICB0eXBlID0gXCJpbmxpbmVcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICBvYmoudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNlbGYudHJpZ2dlcihcIm9iamVjdE5lZWRzVHlwZVwiLCBvYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFvYmouY29udGVudFR5cGUpIHtcclxuICAgICAgICAgIG9iai5jb250ZW50VHlwZSA9ICQuaW5BcnJheShvYmoudHlwZSwgW1wiaHRtbFwiLCBcImlubGluZVwiLCBcImFqYXhcIl0pID4gLTEgPyBcImh0bWxcIiA6IG9iai50eXBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3RlcCAzIC0gU29tZSBhZGp1c3RtZW50c1xyXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAgICAgb2JqLmluZGV4ID0gc2VsZi5ncm91cC5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmIChvYmoub3B0cy5zbWFsbEJ0biA9PSBcImF1dG9cIikge1xyXG4gICAgICAgICAgb2JqLm9wdHMuc21hbGxCdG4gPSAkLmluQXJyYXkob2JqLnR5cGUsIFtcImh0bWxcIiwgXCJpbmxpbmVcIiwgXCJhamF4XCJdKSA+IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9iai5vcHRzLnRvb2xiYXIgPT09IFwiYXV0b1wiKSB7XHJcbiAgICAgICAgICBvYmoub3B0cy50b29sYmFyID0gIW9iai5vcHRzLnNtYWxsQnRuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmluZCB0aHVtYm5haWwgaW1hZ2VcclxuICAgICAgICBpZiAob2JqLm9wdHMuJHRyaWdnZXIgJiYgb2JqLmluZGV4ID09PSBzZWxmLm9wdHMuaW5kZXgpIHtcclxuICAgICAgICAgIG9iai5vcHRzLiR0aHVtYiA9IG9iai5vcHRzLiR0cmlnZ2VyLmZpbmQoXCJpbWc6Zmlyc3RcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKCFvYmoub3B0cy4kdGh1bWIgfHwgIW9iai5vcHRzLiR0aHVtYi5sZW5ndGgpICYmIG9iai5vcHRzLiRvcmlnKSB7XHJcbiAgICAgICAgICBvYmoub3B0cy4kdGh1bWIgPSBvYmoub3B0cy4kb3JpZy5maW5kKFwiaW1nOmZpcnN0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gXCJjYXB0aW9uXCIgaXMgYSBcInNwZWNpYWxcIiBvcHRpb24sIGl0IGNhbiBiZSB1c2VkIHRvIGN1c3RvbWl6ZSBjYXB0aW9uIHBlciBnYWxsZXJ5IGl0ZW0gLi5cclxuICAgICAgICBpZiAoJC50eXBlKG9iai5vcHRzLmNhcHRpb24pID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgIG9iai5vcHRzLmNhcHRpb24gPSBvYmoub3B0cy5jYXB0aW9uLmFwcGx5KGl0ZW0sIFtzZWxmLCBvYmpdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkLnR5cGUoc2VsZi5vcHRzLmNhcHRpb24pID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgIG9iai5vcHRzLmNhcHRpb24gPSBzZWxmLm9wdHMuY2FwdGlvbi5hcHBseShpdGVtLCBbc2VsZiwgb2JqXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBjYXB0aW9uIGFzIGEgc3RyaW5nIG9yIGpRdWVyeSBvYmplY3RcclxuICAgICAgICBpZiAoIShvYmoub3B0cy5jYXB0aW9uIGluc3RhbmNlb2YgJCkpIHtcclxuICAgICAgICAgIG9iai5vcHRzLmNhcHRpb24gPSBvYmoub3B0cy5jYXB0aW9uID09PSB1bmRlZmluZWQgPyBcIlwiIDogb2JqLm9wdHMuY2FwdGlvbiArIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB1cmwgY29udGFpbnMgXCJmaWx0ZXJcIiB1c2VkIHRvIGZpbHRlciB0aGUgY29udGVudFxyXG4gICAgICAgIC8vIEV4YW1wbGU6IFwiYWpheC5odG1sICNzb21ldGhpbmdcIlxyXG4gICAgICAgIGlmIChvYmoudHlwZSA9PT0gXCJhamF4XCIpIHtcclxuICAgICAgICAgIHNyY1BhcnRzID0gc3JjLnNwbGl0KC9cXHMrLywgMik7XHJcblxyXG4gICAgICAgICAgaWYgKHNyY1BhcnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgb2JqLnNyYyA9IHNyY1BhcnRzLnNoaWZ0KCk7XHJcblxyXG4gICAgICAgICAgICBvYmoub3B0cy5maWx0ZXIgPSBzcmNQYXJ0cy5zaGlmdCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSGlkZSBhbGwgYnV0dG9ucyBhbmQgZGlzYWJsZSBpbnRlcmFjdGl2aXR5IGZvciBtb2RhbCBpdGVtc1xyXG4gICAgICAgIGlmIChvYmoub3B0cy5tb2RhbCkge1xyXG4gICAgICAgICAgb2JqLm9wdHMgPSAkLmV4dGVuZCh0cnVlLCBvYmoub3B0cywge1xyXG4gICAgICAgICAgICAvLyBSZW1vdmUgYnV0dG9uc1xyXG4gICAgICAgICAgICBpbmZvYmFyOiAwLFxyXG4gICAgICAgICAgICB0b29sYmFyOiAwLFxyXG5cclxuICAgICAgICAgICAgc21hbGxCdG46IDAsXHJcblxyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGtleWJvYXJkIG5hdmlnYXRpb25cclxuICAgICAgICAgICAga2V5Ym9hcmQ6IDAsXHJcblxyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIHNvbWUgbW9kdWxlc1xyXG4gICAgICAgICAgICBzbGlkZVNob3c6IDAsXHJcbiAgICAgICAgICAgIGZ1bGxTY3JlZW46IDAsXHJcbiAgICAgICAgICAgIHRodW1iczogMCxcclxuICAgICAgICAgICAgdG91Y2g6IDAsXHJcblxyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGNsaWNrIGV2ZW50IGhhbmRsZXJzXHJcbiAgICAgICAgICAgIGNsaWNrQ29udGVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsaWNrU2xpZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjbGlja091dHNpZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBkYmxjbGlja0NvbnRlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBkYmxjbGlja1NsaWRlOiBmYWxzZSxcclxuICAgICAgICAgICAgZGJsY2xpY2tPdXRzaWRlOiBmYWxzZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdGVwIDQgLSBBZGQgcHJvY2Vzc2VkIG9iamVjdCB0byBncm91cFxyXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgICAgIHNlbGYuZ3JvdXAucHVzaChvYmopO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFVwZGF0ZSBjb250cm9scyBpZiBnYWxsZXJ5IGlzIGFscmVhZHkgb3BlbmVkXHJcbiAgICAgIGlmIChPYmplY3Qua2V5cyhzZWxmLnNsaWRlcykubGVuZ3RoKSB7XHJcbiAgICAgICAgc2VsZi51cGRhdGVDb250cm9scygpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGh1bWJuYWlscywgaWYgbmVlZGVkXHJcbiAgICAgICAgdGh1bWJzID0gc2VsZi5UaHVtYnM7XHJcblxyXG4gICAgICAgIGlmICh0aHVtYnMgJiYgdGh1bWJzLmlzQWN0aXZlKSB7XHJcbiAgICAgICAgICB0aHVtYnMuY3JlYXRlKCk7XHJcblxyXG4gICAgICAgICAgdGh1bWJzLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEF0dGFjaCBhbiBldmVudCBoYW5kbGVyIGZ1bmN0aW9ucyBmb3I6XHJcbiAgICAvLyAgIC0gbmF2aWdhdGlvbiBidXR0b25zXHJcbiAgICAvLyAgIC0gYnJvd3NlciBzY3JvbGxpbmcsIHJlc2l6aW5nO1xyXG4gICAgLy8gICAtIGZvY3VzaW5nXHJcbiAgICAvLyAgIC0ga2V5Ym9hcmRcclxuICAgIC8vICAgLSBkZXRlY3QgaWRsZVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBhZGRFdmVudHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICBzZWxmLnJlbW92ZUV2ZW50cygpO1xyXG5cclxuICAgICAgLy8gTWFrZSBuYXZpZ2F0aW9uIGVsZW1lbnRzIGNsaWNrYWJsZVxyXG4gICAgICBzZWxmLiRyZWZzLmNvbnRhaW5lclxyXG4gICAgICAgIC5vbihcImNsaWNrLmZiLWNsb3NlXCIsIFwiW2RhdGEtZmFuY3lib3gtY2xvc2VdXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgc2VsZi5jbG9zZShlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbihcInRvdWNoc3RhcnQuZmItcHJldiBjbGljay5mYi1wcmV2XCIsIFwiW2RhdGEtZmFuY3lib3gtcHJldl1cIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICBzZWxmLnByZXZpb3VzKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oXCJ0b3VjaHN0YXJ0LmZiLW5leHQgY2xpY2suZmItbmV4dFwiLCBcIltkYXRhLWZhbmN5Ym94LW5leHRdXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgc2VsZi5uZXh0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oXCJjbGljay5mYlwiLCBcIltkYXRhLWZhbmN5Ym94LXpvb21dXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIC8vIENsaWNrIGhhbmRsZXIgZm9yIHpvb20gYnV0dG9uXHJcbiAgICAgICAgICBzZWxmW3NlbGYuaXNTY2FsZWREb3duKCkgPyBcInNjYWxlVG9BY3R1YWxcIiA6IFwic2NhbGVUb0ZpdFwiXSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gSGFuZGxlIHBhZ2Ugc2Nyb2xsaW5nIGFuZCBicm93c2VyIHJlc2l6aW5nXHJcbiAgICAgICRXLm9uKFwib3JpZW50YXRpb25jaGFuZ2UuZmIgcmVzaXplLmZiXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZSAmJiBlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LnR5cGUgPT09IFwicmVzaXplXCIpIHtcclxuICAgICAgICAgIHJlcXVlc3RBRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNlbGYudXBkYXRlKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2VsZi4kcmVmcy5zdGFnZS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2VsZi4kcmVmcy5zdGFnZS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgfSwgJC5mYW5jeWJveC5pc01vYmlsZSA/IDYwMCA6IDI1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFRyYXAga2V5Ym9hcmQgZm9jdXMgaW5zaWRlIG9mIHRoZSBtb2RhbCwgc28gdGhlIHVzZXIgZG9lcyBub3QgYWNjaWRlbnRhbGx5IHRhYiBvdXRzaWRlIG9mIHRoZSBtb2RhbFxyXG4gICAgICAvLyAoYS5rLmEuIFwiZXNjYXBpbmcgdGhlIG1vZGFsXCIpXHJcbiAgICAgICRELm9uKFwiZm9jdXNpbi5mYlwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGluc3RhbmNlID0gJC5mYW5jeWJveCA/ICQuZmFuY3lib3guZ2V0SW5zdGFuY2UoKSA6IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGluc3RhbmNlLmlzQ2xvc2luZyB8fFxyXG4gICAgICAgICAgIWluc3RhbmNlLmN1cnJlbnQgfHxcclxuICAgICAgICAgICFpbnN0YW5jZS5jdXJyZW50Lm9wdHMudHJhcEZvY3VzIHx8XHJcbiAgICAgICAgICAkKGUudGFyZ2V0KS5oYXNDbGFzcyhcImZhbmN5Ym94LWNvbnRhaW5lclwiKSB8fFxyXG4gICAgICAgICAgJChlLnRhcmdldCkuaXMoZG9jdW1lbnQpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5zdGFuY2UgJiYgJChlLnRhcmdldCkuY3NzKFwicG9zaXRpb25cIikgIT09IFwiZml4ZWRcIiAmJiAhaW5zdGFuY2UuJHJlZnMuY29udGFpbmVyLmhhcyhlLnRhcmdldCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgIGluc3RhbmNlLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIEVuYWJsZSBrZXlib2FyZCBuYXZpZ2F0aW9uXHJcbiAgICAgICRELm9uKFwia2V5ZG93bi5mYlwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBzZWxmLmN1cnJlbnQsXHJcbiAgICAgICAgICBrZXljb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XHJcblxyXG4gICAgICAgIGlmICghY3VycmVudCB8fCAhY3VycmVudC5vcHRzLmtleWJvYXJkKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZS5jdHJsS2V5IHx8IGUuYWx0S2V5IHx8IGUuc2hpZnRLZXkgfHwgJChlLnRhcmdldCkuaXMoXCJpbnB1dFwiKSB8fCAkKGUudGFyZ2V0KS5pcyhcInRleHRhcmVhXCIpKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBCYWNrc3BhY2UgYW5kIEVzYyBrZXlzXHJcbiAgICAgICAgaWYgKGtleWNvZGUgPT09IDggfHwga2V5Y29kZSA9PT0gMjcpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICBzZWxmLmNsb3NlKGUpO1xyXG5cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIExlZnQgYXJyb3cgYW5kIFVwIGFycm93XHJcbiAgICAgICAgaWYgKGtleWNvZGUgPT09IDM3IHx8IGtleWNvZGUgPT09IDM4KSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgc2VsZi5wcmV2aW91cygpO1xyXG5cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJpZ2ggYXJyb3cgYW5kIERvd24gYXJyb3dcclxuICAgICAgICBpZiAoa2V5Y29kZSA9PT0gMzkgfHwga2V5Y29kZSA9PT0gNDApIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICBzZWxmLm5leHQoKTtcclxuXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLnRyaWdnZXIoXCJhZnRlcktleWRvd25cIiwgZSwga2V5Y29kZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gSGlkZSBjb250cm9scyBhZnRlciBzb21lIGluYWN0aXZpdHkgcGVyaW9kXHJcbiAgICAgIGlmIChzZWxmLmdyb3VwW3NlbGYuY3VyckluZGV4XS5vcHRzLmlkbGVUaW1lKSB7XHJcbiAgICAgICAgc2VsZi5pZGxlU2Vjb25kc0NvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICAkRC5vbihcclxuICAgICAgICAgIFwibW91c2Vtb3ZlLmZiLWlkbGUgbW91c2VsZWF2ZS5mYi1pZGxlIG1vdXNlZG93bi5mYi1pZGxlIHRvdWNoc3RhcnQuZmItaWRsZSB0b3VjaG1vdmUuZmItaWRsZSBzY3JvbGwuZmItaWRsZSBrZXlkb3duLmZiLWlkbGVcIixcclxuICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgc2VsZi5pZGxlU2Vjb25kc0NvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGYuaXNJZGxlKSB7XHJcbiAgICAgICAgICAgICAgc2VsZi5zaG93Q29udHJvbHMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi5pc0lkbGUgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBzZWxmLmlkbGVJbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHNlbGYuaWRsZVNlY29uZHNDb3VudGVyKys7XHJcblxyXG4gICAgICAgICAgaWYgKHNlbGYuaWRsZVNlY29uZHNDb3VudGVyID49IHNlbGYuZ3JvdXBbc2VsZi5jdXJySW5kZXhdLm9wdHMuaWRsZVRpbWUgJiYgIXNlbGYuaXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgICBzZWxmLmlzSWRsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYuaWRsZVNlY29uZHNDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuaGlkZUNvbnRyb2xzKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gUmVtb3ZlIGV2ZW50cyBhZGRlZCBieSB0aGUgY29yZVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHJlbW92ZUV2ZW50czogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICRXLm9mZihcIm9yaWVudGF0aW9uY2hhbmdlLmZiIHJlc2l6ZS5mYlwiKTtcclxuICAgICAgJEQub2ZmKFwiZm9jdXNpbi5mYiBrZXlkb3duLmZiIC5mYi1pZGxlXCIpO1xyXG5cclxuICAgICAgdGhpcy4kcmVmcy5jb250YWluZXIub2ZmKFwiLmZiLWNsb3NlIC5mYi1wcmV2IC5mYi1uZXh0XCIpO1xyXG5cclxuICAgICAgaWYgKHNlbGYuaWRsZUludGVydmFsKSB7XHJcbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoc2VsZi5pZGxlSW50ZXJ2YWwpO1xyXG5cclxuICAgICAgICBzZWxmLmlkbGVJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ2hhbmdlIHRvIHByZXZpb3VzIGdhbGxlcnkgaXRlbVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHByZXZpb3VzOiBmdW5jdGlvbihkdXJhdGlvbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5qdW1wVG8odGhpcy5jdXJyUG9zIC0gMSwgZHVyYXRpb24pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDaGFuZ2UgdG8gbmV4dCBnYWxsZXJ5IGl0ZW1cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIG5leHQ6IGZ1bmN0aW9uKGR1cmF0aW9uKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmp1bXBUbyh0aGlzLmN1cnJQb3MgKyAxLCBkdXJhdGlvbik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFN3aXRjaCB0byBzZWxlY3RlZCBnYWxsZXJ5IGl0ZW1cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBqdW1wVG86IGZ1bmN0aW9uKHBvcywgZHVyYXRpb24pIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGdyb3VwTGVuID0gc2VsZi5ncm91cC5sZW5ndGgsXHJcbiAgICAgICAgZmlyc3RSdW4sXHJcbiAgICAgICAgbG9vcCxcclxuICAgICAgICBjdXJyZW50LFxyXG4gICAgICAgIHByZXZpb3VzLFxyXG4gICAgICAgIGNhbnZhc1dpZHRoLFxyXG4gICAgICAgIGN1cnJlbnRQb3MsXHJcbiAgICAgICAgdHJhbnNpdGlvblByb3BzO1xyXG5cclxuICAgICAgaWYgKHNlbGYuaXNEcmFnZ2luZyB8fCBzZWxmLmlzQ2xvc2luZyB8fCAoc2VsZi5pc0FuaW1hdGluZyAmJiBzZWxmLmZpcnN0UnVuKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcG9zID0gcGFyc2VJbnQocG9zLCAxMCk7XHJcblxyXG4gICAgICAvLyBTaG91bGQgbG9vcD9cclxuICAgICAgbG9vcCA9IHNlbGYuY3VycmVudCA/IHNlbGYuY3VycmVudC5vcHRzLmxvb3AgOiBzZWxmLm9wdHMubG9vcDtcclxuXHJcbiAgICAgIGlmICghbG9vcCAmJiAocG9zIDwgMCB8fCBwb3MgPj0gZ3JvdXBMZW4pKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmaXJzdFJ1biA9IHNlbGYuZmlyc3RSdW4gPSAhT2JqZWN0LmtleXMoc2VsZi5zbGlkZXMpLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChncm91cExlbiA8IDIgJiYgIWZpcnN0UnVuICYmICEhc2VsZi5pc0RyYWdnaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aW91cyA9IHNlbGYuY3VycmVudDtcclxuXHJcbiAgICAgIHNlbGYucHJldkluZGV4ID0gc2VsZi5jdXJySW5kZXg7XHJcbiAgICAgIHNlbGYucHJldlBvcyA9IHNlbGYuY3VyclBvcztcclxuXHJcbiAgICAgIC8vIENyZWF0ZSBzbGlkZXNcclxuICAgICAgY3VycmVudCA9IHNlbGYuY3JlYXRlU2xpZGUocG9zKTtcclxuXHJcbiAgICAgIGlmIChncm91cExlbiA+IDEpIHtcclxuICAgICAgICBpZiAobG9vcCB8fCBjdXJyZW50LmluZGV4ID4gMCkge1xyXG4gICAgICAgICAgc2VsZi5jcmVhdGVTbGlkZShwb3MgLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsb29wIHx8IGN1cnJlbnQuaW5kZXggPCBncm91cExlbiAtIDEpIHtcclxuICAgICAgICAgIHNlbGYuY3JlYXRlU2xpZGUocG9zICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLmN1cnJlbnQgPSBjdXJyZW50O1xyXG4gICAgICBzZWxmLmN1cnJJbmRleCA9IGN1cnJlbnQuaW5kZXg7XHJcbiAgICAgIHNlbGYuY3VyclBvcyA9IGN1cnJlbnQucG9zO1xyXG5cclxuICAgICAgc2VsZi50cmlnZ2VyKFwiYmVmb3JlU2hvd1wiLCBmaXJzdFJ1bik7XHJcblxyXG4gICAgICBzZWxmLnVwZGF0ZUNvbnRyb2xzKCk7XHJcblxyXG4gICAgICBjdXJyZW50UG9zID0gJC5mYW5jeWJveC5nZXRUcmFuc2xhdGUoY3VycmVudC4kc2xpZGUpO1xyXG5cclxuICAgICAgY3VycmVudC5pc01vdmVkID0gKGN1cnJlbnRQb3MubGVmdCAhPT0gMCB8fCBjdXJyZW50UG9zLnRvcCAhPT0gMCkgJiYgIWN1cnJlbnQuJHNsaWRlLmhhc0NsYXNzKFwiZmFuY3lib3gtYW5pbWF0ZWRcIik7XHJcblxyXG4gICAgICAvLyBWYWxpZGF0ZSBkdXJhdGlvbiBsZW5ndGhcclxuICAgICAgY3VycmVudC5mb3JjZWREdXJhdGlvbiA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgIGlmICgkLmlzTnVtZXJpYyhkdXJhdGlvbikpIHtcclxuICAgICAgICBjdXJyZW50LmZvcmNlZER1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZHVyYXRpb24gPSBjdXJyZW50Lm9wdHNbZmlyc3RSdW4gPyBcImFuaW1hdGlvbkR1cmF0aW9uXCIgOiBcInRyYW5zaXRpb25EdXJhdGlvblwiXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZHVyYXRpb24gPSBwYXJzZUludChkdXJhdGlvbiwgMTApO1xyXG5cclxuICAgICAgLy8gRnJlc2ggc3RhcnQgLSByZXZlYWwgY29udGFpbmVyLCBjdXJyZW50IHNsaWRlIGFuZCBzdGFydCBsb2FkaW5nIGNvbnRlbnRcclxuICAgICAgaWYgKGZpcnN0UnVuKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQub3B0cy5hbmltYXRpb25FZmZlY3QgJiYgZHVyYXRpb24pIHtcclxuICAgICAgICAgIHNlbGYuJHJlZnMuY29udGFpbmVyLmNzcyhcInRyYW5zaXRpb24tZHVyYXRpb25cIiwgZHVyYXRpb24gKyBcIm1zXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi4kcmVmcy5jb250YWluZXIucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1pcy1oaWRkZW5cIik7XHJcblxyXG4gICAgICAgIGZvcmNlUmVkcmF3KHNlbGYuJHJlZnMuY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgc2VsZi4kcmVmcy5jb250YWluZXIuYWRkQ2xhc3MoXCJmYW5jeWJveC1pcy1vcGVuXCIpO1xyXG5cclxuICAgICAgICBmb3JjZVJlZHJhdyhzZWxmLiRyZWZzLmNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIC8vIE1ha2UgY3VycmVudCBzbGlkZSB2aXNpYmxlXHJcbiAgICAgICAgY3VycmVudC4kc2xpZGUuYWRkQ2xhc3MoXCJmYW5jeWJveC1zbGlkZS0tcHJldmlvdXNcIik7XHJcblxyXG4gICAgICAgIC8vIEF0dGVtcHQgdG8gbG9hZCBjb250ZW50IGludG8gc2xpZGU7XHJcbiAgICAgICAgLy8gYXQgdGhpcyBwb2ludCBpbWFnZSB3b3VsZCBzdGFydCBsb2FkaW5nLCBidXQgaW5saW5lL2h0bWwgY29udGVudCB3b3VsZCBsb2FkIGltbWVkaWF0ZWx5XHJcbiAgICAgICAgc2VsZi5sb2FkU2xpZGUoY3VycmVudCk7XHJcblxyXG4gICAgICAgIGN1cnJlbnQuJHNsaWRlLnJlbW92ZUNsYXNzKFwiZmFuY3lib3gtc2xpZGUtLXByZXZpb3VzXCIpLmFkZENsYXNzKFwiZmFuY3lib3gtc2xpZGUtLWN1cnJlbnRcIik7XHJcblxyXG4gICAgICAgIHNlbGYucHJlbG9hZChcImltYWdlXCIpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENsZWFuIHVwXHJcbiAgICAgICQuZWFjaChzZWxmLnNsaWRlcywgZnVuY3Rpb24oaW5kZXgsIHNsaWRlKSB7XHJcbiAgICAgICAgJC5mYW5jeWJveC5zdG9wKHNsaWRlLiRzbGlkZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gTWFrZSBjdXJyZW50IHRoYXQgc2xpZGUgaXMgdmlzaWJsZSBldmVuIGlmIGNvbnRlbnQgaXMgc3RpbGwgbG9hZGluZ1xyXG4gICAgICBjdXJyZW50LiRzbGlkZS5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1uZXh0IGZhbmN5Ym94LXNsaWRlLS1wcmV2aW91c1wiKS5hZGRDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1jdXJyZW50XCIpO1xyXG5cclxuICAgICAgLy8gSWYgc2xpZGVzIGhhdmUgYmVlbiBkcmFnZ2VkLCBhbmltYXRlIHRoZW0gdG8gY29ycmVjdCBwb3NpdGlvblxyXG4gICAgICBpZiAoY3VycmVudC5pc01vdmVkKSB7XHJcbiAgICAgICAgY2FudmFzV2lkdGggPSBNYXRoLnJvdW5kKGN1cnJlbnQuJHNsaWRlLndpZHRoKCkpO1xyXG5cclxuICAgICAgICAkLmVhY2goc2VsZi5zbGlkZXMsIGZ1bmN0aW9uKGluZGV4LCBzbGlkZSkge1xyXG4gICAgICAgICAgdmFyIHBvcyA9IHNsaWRlLnBvcyAtIGN1cnJlbnQucG9zO1xyXG5cclxuICAgICAgICAgICQuZmFuY3lib3guYW5pbWF0ZShcclxuICAgICAgICAgICAgc2xpZGUuJHNsaWRlLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgIGxlZnQ6IHBvcyAqIGNhbnZhc1dpZHRoICsgcG9zICogc2xpZGUub3B0cy5ndXR0ZXJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZHVyYXRpb24sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIHNsaWRlLiRzbGlkZS5yZW1vdmVBdHRyKFwic3R5bGVcIikucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1zbGlkZS0tbmV4dCBmYW5jeWJveC1zbGlkZS0tcHJldmlvdXNcIik7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChzbGlkZS5wb3MgPT09IHNlbGYuY3VyclBvcykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC5pc01vdmVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxmLiRyZWZzLnN0YWdlLmNoaWxkcmVuKCkucmVtb3ZlQXR0cihcInN0eWxlXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTdGFydCB0cmFuc2l0aW9uIHRoYXQgcmV2ZWFscyBjdXJyZW50IGNvbnRlbnRcclxuICAgICAgLy8gb3Igd2FpdCB3aGVuIGl0IHdpbGwgYmUgbG9hZGVkXHJcblxyXG4gICAgICBpZiAoY3VycmVudC5pc0xvYWRlZCkge1xyXG4gICAgICAgIHNlbGYucmV2ZWFsQ29udGVudChjdXJyZW50KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxmLmxvYWRTbGlkZShjdXJyZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi5wcmVsb2FkKFwiaW1hZ2VcIik7XHJcblxyXG4gICAgICBpZiAocHJldmlvdXMucG9zID09PSBjdXJyZW50LnBvcykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSGFuZGxlIHByZXZpb3VzIHNsaWRlXHJcbiAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgICAgdHJhbnNpdGlvblByb3BzID0gXCJmYW5jeWJveC1zbGlkZS0tXCIgKyAocHJldmlvdXMucG9zID4gY3VycmVudC5wb3MgPyBcIm5leHRcIiA6IFwicHJldmlvdXNcIik7XHJcblxyXG4gICAgICBwcmV2aW91cy4kc2xpZGUucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1zbGlkZS0tY29tcGxldGUgZmFuY3lib3gtc2xpZGUtLWN1cnJlbnQgZmFuY3lib3gtc2xpZGUtLW5leHQgZmFuY3lib3gtc2xpZGUtLXByZXZpb3VzXCIpO1xyXG5cclxuICAgICAgcHJldmlvdXMuaXNDb21wbGV0ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgaWYgKCFkdXJhdGlvbiB8fCAoIWN1cnJlbnQuaXNNb3ZlZCAmJiAhY3VycmVudC5vcHRzLnRyYW5zaXRpb25FZmZlY3QpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY3VycmVudC5pc01vdmVkKSB7XHJcbiAgICAgICAgcHJldmlvdXMuJHNsaWRlLmFkZENsYXNzKHRyYW5zaXRpb25Qcm9wcyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdHJhbnNpdGlvblByb3BzID0gXCJmYW5jeWJveC1hbmltYXRlZCBcIiArIHRyYW5zaXRpb25Qcm9wcyArIFwiIGZhbmN5Ym94LWZ4LVwiICsgY3VycmVudC5vcHRzLnRyYW5zaXRpb25FZmZlY3Q7XHJcblxyXG4gICAgICAgICQuZmFuY3lib3guYW5pbWF0ZShwcmV2aW91cy4kc2xpZGUsIHRyYW5zaXRpb25Qcm9wcywgZHVyYXRpb24sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcHJldmlvdXMuJHNsaWRlLnJlbW92ZUNsYXNzKHRyYW5zaXRpb25Qcm9wcykucmVtb3ZlQXR0cihcInN0eWxlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENyZWF0ZSBuZXcgXCJzbGlkZVwiIGVsZW1lbnRcclxuICAgIC8vIFRoZXNlIGFyZSBnYWxsZXJ5IGl0ZW1zICB0aGF0IGFyZSBhY3R1YWxseSBhZGRlZCB0byBET01cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBjcmVhdGVTbGlkZTogZnVuY3Rpb24ocG9zKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAkc2xpZGUsXHJcbiAgICAgICAgaW5kZXg7XHJcblxyXG4gICAgICBpbmRleCA9IHBvcyAlIHNlbGYuZ3JvdXAubGVuZ3RoO1xyXG4gICAgICBpbmRleCA9IGluZGV4IDwgMCA/IHNlbGYuZ3JvdXAubGVuZ3RoICsgaW5kZXggOiBpbmRleDtcclxuXHJcbiAgICAgIGlmICghc2VsZi5zbGlkZXNbcG9zXSAmJiBzZWxmLmdyb3VwW2luZGV4XSkge1xyXG4gICAgICAgICRzbGlkZSA9ICQoJzxkaXYgY2xhc3M9XCJmYW5jeWJveC1zbGlkZVwiPjwvZGl2PicpLmFwcGVuZFRvKHNlbGYuJHJlZnMuc3RhZ2UpO1xyXG5cclxuICAgICAgICBzZWxmLnNsaWRlc1twb3NdID0gJC5leHRlbmQodHJ1ZSwge30sIHNlbGYuZ3JvdXBbaW5kZXhdLCB7XHJcbiAgICAgICAgICBwb3M6IHBvcyxcclxuICAgICAgICAgICRzbGlkZTogJHNsaWRlLFxyXG4gICAgICAgICAgaXNMb2FkZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbGYudXBkYXRlU2xpZGUoc2VsZi5zbGlkZXNbcG9zXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBzZWxmLnNsaWRlc1twb3NdO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTY2FsZSBpbWFnZSB0byB0aGUgYWN0dWFsIHNpemUgb2YgdGhlIGltYWdlO1xyXG4gICAgLy8geCBhbmQgeSB2YWx1ZXMgc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBzbGlkZVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHNjYWxlVG9BY3R1YWw6IGZ1bmN0aW9uKHgsIHksIGR1cmF0aW9uKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjdXJyZW50ID0gc2VsZi5jdXJyZW50LFxyXG4gICAgICAgICRjb250ZW50ID0gY3VycmVudC4kY29udGVudCxcclxuICAgICAgICBjYW52YXNXaWR0aCA9ICQuZmFuY3lib3guZ2V0VHJhbnNsYXRlKGN1cnJlbnQuJHNsaWRlKS53aWR0aCxcclxuICAgICAgICBjYW52YXNIZWlnaHQgPSAkLmZhbmN5Ym94LmdldFRyYW5zbGF0ZShjdXJyZW50LiRzbGlkZSkuaGVpZ2h0LFxyXG4gICAgICAgIG5ld0ltZ1dpZHRoID0gY3VycmVudC53aWR0aCxcclxuICAgICAgICBuZXdJbWdIZWlnaHQgPSBjdXJyZW50LmhlaWdodCxcclxuICAgICAgICBpbWdQb3MsXHJcbiAgICAgICAgcG9zWCxcclxuICAgICAgICBwb3NZLFxyXG4gICAgICAgIHNjYWxlWCxcclxuICAgICAgICBzY2FsZVk7XHJcblxyXG4gICAgICBpZiAoc2VsZi5pc0FuaW1hdGluZyB8fCAhJGNvbnRlbnQgfHwgIShjdXJyZW50LnR5cGUgPT0gXCJpbWFnZVwiICYmIGN1cnJlbnQuaXNMb2FkZWQgJiYgIWN1cnJlbnQuaGFzRXJyb3IpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkLmZhbmN5Ym94LnN0b3AoJGNvbnRlbnQpO1xyXG5cclxuICAgICAgc2VsZi5pc0FuaW1hdGluZyA9IHRydWU7XHJcblxyXG4gICAgICB4ID0geCA9PT0gdW5kZWZpbmVkID8gY2FudmFzV2lkdGggKiAwLjUgOiB4O1xyXG4gICAgICB5ID0geSA9PT0gdW5kZWZpbmVkID8gY2FudmFzSGVpZ2h0ICogMC41IDogeTtcclxuXHJcbiAgICAgIGltZ1BvcyA9ICQuZmFuY3lib3guZ2V0VHJhbnNsYXRlKCRjb250ZW50KTtcclxuXHJcbiAgICAgIGltZ1Bvcy50b3AgLT0gJC5mYW5jeWJveC5nZXRUcmFuc2xhdGUoY3VycmVudC4kc2xpZGUpLnRvcDtcclxuICAgICAgaW1nUG9zLmxlZnQgLT0gJC5mYW5jeWJveC5nZXRUcmFuc2xhdGUoY3VycmVudC4kc2xpZGUpLmxlZnQ7XHJcblxyXG4gICAgICBzY2FsZVggPSBuZXdJbWdXaWR0aCAvIGltZ1Bvcy53aWR0aDtcclxuICAgICAgc2NhbGVZID0gbmV3SW1nSGVpZ2h0IC8gaW1nUG9zLmhlaWdodDtcclxuXHJcbiAgICAgIC8vIEdldCBjZW50ZXIgcG9zaXRpb24gZm9yIG9yaWdpbmFsIGltYWdlXHJcbiAgICAgIHBvc1ggPSBjYW52YXNXaWR0aCAqIDAuNSAtIG5ld0ltZ1dpZHRoICogMC41O1xyXG4gICAgICBwb3NZID0gY2FudmFzSGVpZ2h0ICogMC41IC0gbmV3SW1nSGVpZ2h0ICogMC41O1xyXG5cclxuICAgICAgLy8gTWFrZSBzdXJlIGltYWdlIGRvZXMgbm90IG1vdmUgYXdheSBmcm9tIGVkZ2VzXHJcbiAgICAgIGlmIChuZXdJbWdXaWR0aCA+IGNhbnZhc1dpZHRoKSB7XHJcbiAgICAgICAgcG9zWCA9IGltZ1Bvcy5sZWZ0ICogc2NhbGVYIC0gKHggKiBzY2FsZVggLSB4KTtcclxuXHJcbiAgICAgICAgaWYgKHBvc1ggPiAwKSB7XHJcbiAgICAgICAgICBwb3NYID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwb3NYIDwgY2FudmFzV2lkdGggLSBuZXdJbWdXaWR0aCkge1xyXG4gICAgICAgICAgcG9zWCA9IGNhbnZhc1dpZHRoIC0gbmV3SW1nV2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobmV3SW1nSGVpZ2h0ID4gY2FudmFzSGVpZ2h0KSB7XHJcbiAgICAgICAgcG9zWSA9IGltZ1Bvcy50b3AgKiBzY2FsZVkgLSAoeSAqIHNjYWxlWSAtIHkpO1xyXG5cclxuICAgICAgICBpZiAocG9zWSA+IDApIHtcclxuICAgICAgICAgIHBvc1kgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBvc1kgPCBjYW52YXNIZWlnaHQgLSBuZXdJbWdIZWlnaHQpIHtcclxuICAgICAgICAgIHBvc1kgPSBjYW52YXNIZWlnaHQgLSBuZXdJbWdIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLnVwZGF0ZUN1cnNvcihuZXdJbWdXaWR0aCwgbmV3SW1nSGVpZ2h0KTtcclxuXHJcbiAgICAgICQuZmFuY3lib3guYW5pbWF0ZShcclxuICAgICAgICAkY29udGVudCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0b3A6IHBvc1ksXHJcbiAgICAgICAgICBsZWZ0OiBwb3NYLFxyXG4gICAgICAgICAgc2NhbGVYOiBzY2FsZVgsXHJcbiAgICAgICAgICBzY2FsZVk6IHNjYWxlWVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZHVyYXRpb24gfHwgMzMwLFxyXG4gICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgc2VsZi5pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIFN0b3Agc2xpZGVzaG93XHJcbiAgICAgIGlmIChzZWxmLlNsaWRlU2hvdyAmJiBzZWxmLlNsaWRlU2hvdy5pc0FjdGl2ZSkge1xyXG4gICAgICAgIHNlbGYuU2xpZGVTaG93LnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTY2FsZSBpbWFnZSB0byBmaXQgaW5zaWRlIHBhcmVudCBlbGVtZW50XHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgc2NhbGVUb0ZpdDogZnVuY3Rpb24oZHVyYXRpb24pIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGN1cnJlbnQgPSBzZWxmLmN1cnJlbnQsXHJcbiAgICAgICAgJGNvbnRlbnQgPSBjdXJyZW50LiRjb250ZW50LFxyXG4gICAgICAgIGVuZDtcclxuXHJcbiAgICAgIGlmIChzZWxmLmlzQW5pbWF0aW5nIHx8ICEkY29udGVudCB8fCAhKGN1cnJlbnQudHlwZSA9PSBcImltYWdlXCIgJiYgY3VycmVudC5pc0xvYWRlZCAmJiAhY3VycmVudC5oYXNFcnJvcikpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICQuZmFuY3lib3guc3RvcCgkY29udGVudCk7XHJcblxyXG4gICAgICBzZWxmLmlzQW5pbWF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgIGVuZCA9IHNlbGYuZ2V0Rml0UG9zKGN1cnJlbnQpO1xyXG5cclxuICAgICAgc2VsZi51cGRhdGVDdXJzb3IoZW5kLndpZHRoLCBlbmQuaGVpZ2h0KTtcclxuXHJcbiAgICAgICQuZmFuY3lib3guYW5pbWF0ZShcclxuICAgICAgICAkY29udGVudCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0b3A6IGVuZC50b3AsXHJcbiAgICAgICAgICBsZWZ0OiBlbmQubGVmdCxcclxuICAgICAgICAgIHNjYWxlWDogZW5kLndpZHRoIC8gJGNvbnRlbnQud2lkdGgoKSxcclxuICAgICAgICAgIHNjYWxlWTogZW5kLmhlaWdodCAvICRjb250ZW50LmhlaWdodCgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkdXJhdGlvbiB8fCAzMzAsXHJcbiAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBzZWxmLmlzQW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgaW1hZ2Ugc2l6ZSB0byBmaXQgaW5zaWRlIHZpZXdwb3J0XHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgZ2V0Rml0UG9zOiBmdW5jdGlvbihzbGlkZSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgJGNvbnRlbnQgPSBzbGlkZS4kY29udGVudCxcclxuICAgICAgICB3aWR0aCA9IHNsaWRlLndpZHRoIHx8IHNsaWRlLm9wdHMud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0ID0gc2xpZGUuaGVpZ2h0IHx8IHNsaWRlLm9wdHMuaGVpZ2h0LFxyXG4gICAgICAgIG1heFdpZHRoLFxyXG4gICAgICAgIG1heEhlaWdodCxcclxuICAgICAgICBtaW5SYXRpbyxcclxuICAgICAgICBtYXJnaW4sXHJcbiAgICAgICAgYXNwZWN0UmF0aW8sXHJcbiAgICAgICAgcmV6ID0ge307XHJcblxyXG4gICAgICBpZiAoIXNsaWRlLmlzTG9hZGVkIHx8ICEkY29udGVudCB8fCAhJGNvbnRlbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBtYXJnaW4gPSB7XHJcbiAgICAgICAgdG9wOiBwYXJzZUludChzbGlkZS4kc2xpZGUuY3NzKFwicGFkZGluZ1RvcFwiKSwgMTApLFxyXG4gICAgICAgIHJpZ2h0OiBwYXJzZUludChzbGlkZS4kc2xpZGUuY3NzKFwicGFkZGluZ1JpZ2h0XCIpLCAxMCksXHJcbiAgICAgICAgYm90dG9tOiBwYXJzZUludChzbGlkZS4kc2xpZGUuY3NzKFwicGFkZGluZ0JvdHRvbVwiKSwgMTApLFxyXG4gICAgICAgIGxlZnQ6IHBhcnNlSW50KHNsaWRlLiRzbGlkZS5jc3MoXCJwYWRkaW5nTGVmdFwiKSwgMTApXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBXZSBjYW4gbm90IHVzZSAkc2xpZGUgd2lkdGggaGVyZSwgYmVjYXVzZSBpdCBjYW4gaGF2ZSBkaWZmZXJlbnQgZGllbWVuc2lvbnMgd2hpbGUgaW4gdHJhbnNpdG9uXHJcbiAgICAgIG1heFdpZHRoID0gcGFyc2VJbnQoc2VsZi4kcmVmcy5zdGFnZS53aWR0aCgpLCAxMCkgLSAobWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpO1xyXG4gICAgICBtYXhIZWlnaHQgPSBwYXJzZUludChzZWxmLiRyZWZzLnN0YWdlLmhlaWdodCgpLCAxMCkgLSAobWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pO1xyXG5cclxuICAgICAgaWYgKCF3aWR0aCB8fCAhaGVpZ2h0KSB7XHJcbiAgICAgICAgd2lkdGggPSBtYXhXaWR0aDtcclxuICAgICAgICBoZWlnaHQgPSBtYXhIZWlnaHQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG1pblJhdGlvID0gTWF0aC5taW4oMSwgbWF4V2lkdGggLyB3aWR0aCwgbWF4SGVpZ2h0IC8gaGVpZ2h0KTtcclxuXHJcbiAgICAgIC8vIFVzZSBmbG9vciByb3VuZGluZyB0byBtYWtlIHN1cmUgaXQgcmVhbGx5IGZpdHNcclxuICAgICAgd2lkdGggPSBNYXRoLmZsb29yKG1pblJhdGlvICogd2lkdGgpO1xyXG4gICAgICBoZWlnaHQgPSBNYXRoLmZsb29yKG1pblJhdGlvICogaGVpZ2h0KTtcclxuXHJcbiAgICAgIGlmIChzbGlkZS50eXBlID09PSBcImltYWdlXCIpIHtcclxuICAgICAgICByZXoudG9wID0gTWF0aC5mbG9vcigobWF4SGVpZ2h0IC0gaGVpZ2h0KSAqIDAuNSkgKyBtYXJnaW4udG9wO1xyXG4gICAgICAgIHJlei5sZWZ0ID0gTWF0aC5mbG9vcigobWF4V2lkdGggLSB3aWR0aCkgKiAwLjUpICsgbWFyZ2luLmxlZnQ7XHJcbiAgICAgIH0gZWxzZSBpZiAoc2xpZGUuY29udGVudFR5cGUgPT09IFwidmlkZW9cIikge1xyXG4gICAgICAgIC8vIEZvcmNlIGFzcGVjdCByYXRpbyBmb3IgdGhlIHZpZGVvXHJcbiAgICAgICAgLy8gXCJJIHNheSB0aGUgd2hvbGUgd29ybGQgbXVzdCBsZWFybiBvZiBvdXIgcGVhY2VmdWwgd2F5c+KApiBieSBmb3JjZSFcIlxyXG4gICAgICAgIGFzcGVjdFJhdGlvID0gc2xpZGUub3B0cy53aWR0aCAmJiBzbGlkZS5vcHRzLmhlaWdodCA/IHdpZHRoIC8gaGVpZ2h0IDogc2xpZGUub3B0cy5yYXRpbyB8fCAxNiAvIDk7XHJcblxyXG4gICAgICAgIGlmIChoZWlnaHQgPiB3aWR0aCAvIGFzcGVjdFJhdGlvKSB7XHJcbiAgICAgICAgICBoZWlnaHQgPSB3aWR0aCAvIGFzcGVjdFJhdGlvO1xyXG4gICAgICAgIH0gZWxzZSBpZiAod2lkdGggPiBoZWlnaHQgKiBhc3BlY3RSYXRpbykge1xyXG4gICAgICAgICAgd2lkdGggPSBoZWlnaHQgKiBhc3BlY3RSYXRpbztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlei53aWR0aCA9IHdpZHRoO1xyXG4gICAgICByZXouaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgcmV0dXJuIHJlejtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gVXBkYXRlIGNvbnRlbnQgc2l6ZSBhbmQgcG9zaXRpb24gZm9yIGFsbCBzbGlkZXNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAkLmVhY2goc2VsZi5zbGlkZXMsIGZ1bmN0aW9uKGtleSwgc2xpZGUpIHtcclxuICAgICAgICBzZWxmLnVwZGF0ZVNsaWRlKHNsaWRlKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFVwZGF0ZSBzbGlkZSBjb250ZW50IHBvc2l0aW9uIGFuZCBzaXplXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHVwZGF0ZVNsaWRlOiBmdW5jdGlvbihzbGlkZSwgZHVyYXRpb24pIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICRjb250ZW50ID0gc2xpZGUgJiYgc2xpZGUuJGNvbnRlbnQsXHJcbiAgICAgICAgd2lkdGggPSBzbGlkZS53aWR0aCB8fCBzbGlkZS5vcHRzLndpZHRoLFxyXG4gICAgICAgIGhlaWdodCA9IHNsaWRlLmhlaWdodCB8fCBzbGlkZS5vcHRzLmhlaWdodDtcclxuXHJcbiAgICAgIGlmICgkY29udGVudCAmJiAod2lkdGggfHwgaGVpZ2h0IHx8IHNsaWRlLmNvbnRlbnRUeXBlID09PSBcInZpZGVvXCIpICYmICFzbGlkZS5oYXNFcnJvcikge1xyXG4gICAgICAgICQuZmFuY3lib3guc3RvcCgkY29udGVudCk7XHJcblxyXG4gICAgICAgICQuZmFuY3lib3guc2V0VHJhbnNsYXRlKCRjb250ZW50LCBzZWxmLmdldEZpdFBvcyhzbGlkZSkpO1xyXG5cclxuICAgICAgICBpZiAoc2xpZGUucG9zID09PSBzZWxmLmN1cnJQb3MpIHtcclxuICAgICAgICAgIHNlbGYuaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICBzZWxmLnVwZGF0ZUN1cnNvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgc2xpZGUuJHNsaWRlLnRyaWdnZXIoXCJyZWZyZXNoXCIpO1xyXG5cclxuICAgICAgc2VsZi4kcmVmcy50b29sYmFyLnRvZ2dsZUNsYXNzKFwiY29tcGVuc2F0ZS1mb3Itc2Nyb2xsYmFyXCIsIHNsaWRlLiRzbGlkZS5nZXQoMCkuc2Nyb2xsSGVpZ2h0ID4gc2xpZGUuJHNsaWRlLmdldCgwKS5jbGllbnRIZWlnaHQpO1xyXG5cclxuICAgICAgc2VsZi50cmlnZ2VyKFwib25VcGRhdGVcIiwgc2xpZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBIb3Jpem9udGFsbHkgY2VudGVyIHNsaWRlXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgY2VudGVyU2xpZGU6IGZ1bmN0aW9uKHNsaWRlLCBkdXJhdGlvbikge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgY2FudmFzV2lkdGgsXHJcbiAgICAgICAgcG9zO1xyXG5cclxuICAgICAgaWYgKHNlbGYuY3VycmVudCkge1xyXG4gICAgICAgIGNhbnZhc1dpZHRoID0gTWF0aC5yb3VuZChzbGlkZS4kc2xpZGUud2lkdGgoKSk7XHJcbiAgICAgICAgcG9zID0gc2xpZGUucG9zIC0gc2VsZi5jdXJyZW50LnBvcztcclxuXHJcbiAgICAgICAgJC5mYW5jeWJveC5hbmltYXRlKFxyXG4gICAgICAgICAgc2xpZGUuJHNsaWRlLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgIGxlZnQ6IHBvcyAqIGNhbnZhc1dpZHRoICsgcG9zICogc2xpZGUub3B0cy5ndXR0ZXIsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBkdXJhdGlvbiA9PT0gdW5kZWZpbmVkID8gMCA6IGR1cmF0aW9uLFxyXG4gICAgICAgICAgbnVsbCxcclxuICAgICAgICAgIGZhbHNlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBVcGRhdGUgY3Vyc29yIHN0eWxlIGRlcGVuZGluZyBpZiBjb250ZW50IGNhbiBiZSB6b29tZWRcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHVwZGF0ZUN1cnNvcjogZnVuY3Rpb24obmV4dFdpZHRoLCBuZXh0SGVpZ2h0KSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjdXJyZW50ID0gc2VsZi5jdXJyZW50LFxyXG4gICAgICAgICRjb250YWluZXIgPSBzZWxmLiRyZWZzLmNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LWlzLXpvb21hYmxlIGZhbmN5Ym94LWNhbi16b29tSW4gZmFuY3lib3gtY2FuLWRyYWcgZmFuY3lib3gtY2FuLXpvb21PdXRcIiksXHJcbiAgICAgICAgaXNab29tYWJsZTtcclxuXHJcbiAgICAgIGlmICghY3VycmVudCB8fCBzZWxmLmlzQ2xvc2luZykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaXNab29tYWJsZSA9IHNlbGYuaXNab29tYWJsZSgpO1xyXG5cclxuICAgICAgJGNvbnRhaW5lci50b2dnbGVDbGFzcyhcImZhbmN5Ym94LWlzLXpvb21hYmxlXCIsIGlzWm9vbWFibGUpO1xyXG5cclxuICAgICAgJChcIltkYXRhLWZhbmN5Ym94LXpvb21dXCIpLnByb3AoXCJkaXNhYmxlZFwiLCAhaXNab29tYWJsZSk7XHJcblxyXG4gICAgICAvLyBTZXQgY3Vyc29yIHRvIHpvb20gaW4vb3V0IGlmIGNsaWNrIGV2ZW50IGlzICd6b29tJ1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgaXNab29tYWJsZSAmJlxyXG4gICAgICAgIChjdXJyZW50Lm9wdHMuY2xpY2tDb250ZW50ID09PSBcInpvb21cIiB8fCAoJC5pc0Z1bmN0aW9uKGN1cnJlbnQub3B0cy5jbGlja0NvbnRlbnQpICYmIGN1cnJlbnQub3B0cy5jbGlja0NvbnRlbnQoY3VycmVudCkgPT09IFwiem9vbVwiKSlcclxuICAgICAgKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuaXNTY2FsZWREb3duKG5leHRXaWR0aCwgbmV4dEhlaWdodCkpIHtcclxuICAgICAgICAgIC8vIElmIGltYWdlIGlzIHNjYWxlZCBkb3duLCB0aGVuLCBvYnZpb3VzbHksIGl0IGNhbiBiZSB6b29tZWQgdG8gZnVsbCBzaXplXHJcbiAgICAgICAgICAkY29udGFpbmVyLmFkZENsYXNzKFwiZmFuY3lib3gtY2FuLXpvb21JblwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKGN1cnJlbnQub3B0cy50b3VjaCkge1xyXG4gICAgICAgICAgICAvLyBJZiBpbWFnZSBzaXplIGlyIGxhcmdlbiB0aGFuIGF2YWlsYWJsZSBhdmFpbGFibGUgYW5kIHRvdWNoIG1vZHVsZSBpcyBub3QgZGlzYWJsZSxcclxuICAgICAgICAgICAgLy8gdGhlbiB1c2VyIGNhbiBkbyBwYW5uaW5nXHJcbiAgICAgICAgICAgICRjb250YWluZXIuYWRkQ2xhc3MoXCJmYW5jeWJveC1jYW4tZHJhZ1wiKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRjb250YWluZXIuYWRkQ2xhc3MoXCJmYW5jeWJveC1jYW4tem9vbU91dFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudC5vcHRzLnRvdWNoICYmIGN1cnJlbnQuY29udGVudFR5cGUgIT09IFwidmlkZW9cIikge1xyXG4gICAgICAgICRjb250YWluZXIuYWRkQ2xhc3MoXCJmYW5jeWJveC1jYW4tZHJhZ1wiKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDaGVjayBpZiBjdXJyZW50IHNsaWRlIGlzIHpvb21hYmxlXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgaXNab29tYWJsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjdXJyZW50ID0gc2VsZi5jdXJyZW50LFxyXG4gICAgICAgIGZpdFBvcztcclxuXHJcbiAgICAgIC8vIEFzc3VtZSB0aGF0IHNsaWRlIGlzIHpvb21hYmxlIGlmOlxyXG4gICAgICAvLyAgIC0gaW1hZ2UgaXMgc3RpbGwgbG9hZGluZ1xyXG4gICAgICAvLyAgIC0gYWN0dWFsIHNpemUgb2YgdGhlIGltYWdlIGlzIHNtYWxsZXIgdGhhbiBhdmFpbGFibGUgYXJlYVxyXG4gICAgICBpZiAoY3VycmVudCAmJiAhc2VsZi5pc0Nsb3NpbmcgJiYgY3VycmVudC50eXBlID09PSBcImltYWdlXCIgJiYgIWN1cnJlbnQuaGFzRXJyb3IpIHtcclxuICAgICAgICBpZiAoIWN1cnJlbnQuaXNMb2FkZWQpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZml0UG9zID0gc2VsZi5nZXRGaXRQb3MoY3VycmVudCk7XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50LndpZHRoID4gZml0UG9zLndpZHRoIHx8IGN1cnJlbnQuaGVpZ2h0ID4gZml0UG9zLmhlaWdodCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgaW1hZ2UgZGltZW5zaW9ucyBhcmUgc21hbGxlciB0aGFuIGFjdHVhbFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgaXNTY2FsZWREb3duOiBmdW5jdGlvbihuZXh0V2lkdGgsIG5leHRIZWlnaHQpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHJleiA9IGZhbHNlLFxyXG4gICAgICAgIGN1cnJlbnQgPSBzZWxmLmN1cnJlbnQsXHJcbiAgICAgICAgJGNvbnRlbnQgPSBjdXJyZW50LiRjb250ZW50O1xyXG5cclxuICAgICAgaWYgKG5leHRXaWR0aCAhPT0gdW5kZWZpbmVkICYmIG5leHRIZWlnaHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJleiA9IG5leHRXaWR0aCA8IGN1cnJlbnQud2lkdGggJiYgbmV4dEhlaWdodCA8IGN1cnJlbnQuaGVpZ2h0O1xyXG4gICAgICB9IGVsc2UgaWYgKCRjb250ZW50KSB7XHJcbiAgICAgICAgcmV6ID0gJC5mYW5jeWJveC5nZXRUcmFuc2xhdGUoJGNvbnRlbnQpO1xyXG4gICAgICAgIHJleiA9IHJlei53aWR0aCA8IGN1cnJlbnQud2lkdGggJiYgcmV6LmhlaWdodCA8IGN1cnJlbnQuaGVpZ2h0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmV6O1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDaGVjayBpZiBpbWFnZSBkaW1lbnNpb25zIGV4Y2VlZCBwYXJlbnQgZWxlbWVudFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBjYW5QYW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcmV6ID0gZmFsc2UsXHJcbiAgICAgICAgY3VycmVudCA9IHNlbGYuY3VycmVudCxcclxuICAgICAgICAkY29udGVudDtcclxuXHJcbiAgICAgIGlmIChjdXJyZW50LnR5cGUgPT09IFwiaW1hZ2VcIiAmJiAoJGNvbnRlbnQgPSBjdXJyZW50LiRjb250ZW50KSAmJiAhY3VycmVudC5oYXNFcnJvcikge1xyXG4gICAgICAgIHJleiA9IHNlbGYuZ2V0Rml0UG9zKGN1cnJlbnQpO1xyXG4gICAgICAgIHJleiA9IE1hdGguYWJzKCRjb250ZW50LndpZHRoKCkgLSByZXoud2lkdGgpID4gMSB8fCBNYXRoLmFicygkY29udGVudC5oZWlnaHQoKSAtIHJlei5oZWlnaHQpID4gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJlejtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTG9hZCBjb250ZW50IGludG8gdGhlIHNsaWRlXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBsb2FkU2xpZGU6IGZ1bmN0aW9uKHNsaWRlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICB0eXBlLFxyXG4gICAgICAgICRzbGlkZSxcclxuICAgICAgICBhamF4TG9hZDtcclxuXHJcbiAgICAgIGlmIChzbGlkZS5pc0xvYWRpbmcgfHwgc2xpZGUuaXNMb2FkZWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNsaWRlLmlzTG9hZGluZyA9IHRydWU7XHJcblxyXG4gICAgICBzZWxmLnRyaWdnZXIoXCJiZWZvcmVMb2FkXCIsIHNsaWRlKTtcclxuXHJcbiAgICAgIHR5cGUgPSBzbGlkZS50eXBlO1xyXG4gICAgICAkc2xpZGUgPSBzbGlkZS4kc2xpZGU7XHJcblxyXG4gICAgICAkc2xpZGVcclxuICAgICAgICAub2ZmKFwicmVmcmVzaFwiKVxyXG4gICAgICAgIC50cmlnZ2VyKFwib25SZXNldFwiKVxyXG4gICAgICAgIC5hZGRDbGFzcyhzbGlkZS5vcHRzLnNsaWRlQ2xhc3MpO1xyXG5cclxuICAgICAgLy8gQ3JlYXRlIGNvbnRlbnQgZGVwZW5kaW5nIG9uIHRoZSB0eXBlXHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJpbWFnZVwiOlxyXG4gICAgICAgICAgc2VsZi5zZXRJbWFnZShzbGlkZSk7XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgXCJpZnJhbWVcIjpcclxuICAgICAgICAgIHNlbGYuc2V0SWZyYW1lKHNsaWRlKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBcImh0bWxcIjpcclxuICAgICAgICAgIHNlbGYuc2V0Q29udGVudChzbGlkZSwgc2xpZGUuc3JjIHx8IHNsaWRlLmNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIFwidmlkZW9cIjpcclxuICAgICAgICAgIHNlbGYuc2V0Q29udGVudChcclxuICAgICAgICAgICAgc2xpZGUsXHJcbiAgICAgICAgICAgICc8dmlkZW8gY2xhc3M9XCJmYW5jeWJveC12aWRlb1wiIGNvbnRyb2xzIGNvbnRyb2xzTGlzdD1cIm5vZG93bmxvYWRcIj4nICtcclxuICAgICAgICAgICAgICAnPHNvdXJjZSBzcmM9XCInICtcclxuICAgICAgICAgICAgICBzbGlkZS5zcmMgK1xyXG4gICAgICAgICAgICAgICdcIiB0eXBlPVwiJyArXHJcbiAgICAgICAgICAgICAgc2xpZGUub3B0cy52aWRlb0Zvcm1hdCArXHJcbiAgICAgICAgICAgICAgJ1wiPicgK1xyXG4gICAgICAgICAgICAgIFwiWW91ciBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBIVE1MNSB2aWRlb1wiICtcclxuICAgICAgICAgICAgICBcIjwvdmlkZW9cIlxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBcImlubGluZVwiOlxyXG4gICAgICAgICAgaWYgKCQoc2xpZGUuc3JjKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2VsZi5zZXRDb250ZW50KHNsaWRlLCAkKHNsaWRlLnNyYykpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5zZXRFcnJvcihzbGlkZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgXCJhamF4XCI6XHJcbiAgICAgICAgICBzZWxmLnNob3dMb2FkaW5nKHNsaWRlKTtcclxuXHJcbiAgICAgICAgICBhamF4TG9hZCA9ICQuYWpheChcclxuICAgICAgICAgICAgJC5leHRlbmQoe30sIHNsaWRlLm9wdHMuYWpheC5zZXR0aW5ncywge1xyXG4gICAgICAgICAgICAgIHVybDogc2xpZGUuc3JjLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEsIHRleHRTdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICBzZWxmLnNldENvbnRlbnQoc2xpZGUsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGpxWEhSLCB0ZXh0U3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoanFYSFIgJiYgdGV4dFN0YXR1cyAhPT0gXCJhYm9ydFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RXJyb3Ioc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgJHNsaWRlLm9uZShcIm9uUmVzZXRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFqYXhMb2FkLmFib3J0KCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHNlbGYuc2V0RXJyb3Ioc2xpZGUpO1xyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gVXNlIHRodW1ibmFpbCBpbWFnZSwgaWYgcG9zc2libGVcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgc2V0SW1hZ2U6IGZ1bmN0aW9uKHNsaWRlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBzcmNzZXQgPSBzbGlkZS5vcHRzLnNyY3NldCB8fCBzbGlkZS5vcHRzLmltYWdlLnNyY3NldCxcclxuICAgICAgICB0aHVtYlNyYyxcclxuICAgICAgICBmb3VuZCxcclxuICAgICAgICB0ZW1wLFxyXG4gICAgICAgIHB4UmF0aW8sXHJcbiAgICAgICAgd2luZG93V2lkdGg7XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiBuZWVkIHRvIHNob3cgbG9hZGluZyBpY29uXHJcbiAgICAgIHNsaWRlLnRpbW91dHMgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciAkaW1nID0gc2xpZGUuJGltYWdlO1xyXG5cclxuICAgICAgICBpZiAoc2xpZGUuaXNMb2FkaW5nICYmICghJGltZyB8fCAhJGltZ1swXS5jb21wbGV0ZSkgJiYgIXNsaWRlLmhhc0Vycm9yKSB7XHJcbiAgICAgICAgICBzZWxmLnNob3dMb2FkaW5nKHNsaWRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDM1MCk7XHJcblxyXG4gICAgICAvLyBJZiB3ZSBoYXZlIFwic3Jjc2V0XCIsIHRoZW4gd2UgbmVlZCB0byBmaW5kIGZpcnN0IG1hdGNoaW5nIFwic3JjXCIgdmFsdWUuXHJcbiAgICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5LCBiZWNhdXNlIHdoZW4geW91IHNldCBhbiBzcmMgYXR0cmlidXRlLCB0aGUgYnJvd3NlciB3aWxsIHByZWxvYWQgdGhlIGltYWdlXHJcbiAgICAgIC8vIGJlZm9yZSBhbnkgamF2YXNjcmlwdCBvciBldmVuIENTUyBpcyBhcHBsaWVkLlxyXG4gICAgICBpZiAoc3Jjc2V0KSB7XHJcbiAgICAgICAgcHhSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XHJcbiAgICAgICAgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAqIHB4UmF0aW87XHJcblxyXG4gICAgICAgIHRlbXAgPSBzcmNzZXQuc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvbihlbCkge1xyXG4gICAgICAgICAgdmFyIHJldCA9IHt9O1xyXG5cclxuICAgICAgICAgIGVsXHJcbiAgICAgICAgICAgIC50cmltKClcclxuICAgICAgICAgICAgLnNwbGl0KC9cXHMrLylcclxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24oZWwsIGkpIHtcclxuICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBwYXJzZUludChlbC5zdWJzdHJpbmcoMCwgZWwubGVuZ3RoIC0gMSksIDEwKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAocmV0LnVybCA9IGVsKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICByZXQucG9zdGZpeCA9IGVsW2VsLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU29ydCBieSB2YWx1ZVxyXG4gICAgICAgIHRlbXAuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgICByZXR1cm4gYS52YWx1ZSAtIGIudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE9rLCBub3cgd2UgaGF2ZSBhbiBhcnJheSBvZiBhbGwgc3Jjc2V0IHZhbHVlc1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGVtcC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgdmFyIGVsID0gdGVtcFtqXTtcclxuXHJcbiAgICAgICAgICBpZiAoKGVsLnBvc3RmaXggPT09IFwid1wiICYmIGVsLnZhbHVlID49IHdpbmRvd1dpZHRoKSB8fCAoZWwucG9zdGZpeCA9PT0gXCJ4XCIgJiYgZWwudmFsdWUgPj0gcHhSYXRpbykpIHtcclxuICAgICAgICAgICAgZm91bmQgPSBlbDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiBub3QgZm91bmQsIHRha2UgdGhlIGxhc3Qgb25lXHJcbiAgICAgICAgaWYgKCFmb3VuZCAmJiB0ZW1wLmxlbmd0aCkge1xyXG4gICAgICAgICAgZm91bmQgPSB0ZW1wW3RlbXAubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZm91bmQpIHtcclxuICAgICAgICAgIHNsaWRlLnNyYyA9IGZvdW5kLnVybDtcclxuXHJcbiAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGRlZmF1bHQgd2lkdGgvaGVpZ2h0IHZhbHVlcywgd2UgY2FuIGNhbGN1bGF0ZSBoZWlnaHQgZm9yIG1hdGNoaW5nIHNvdXJjZVxyXG4gICAgICAgICAgaWYgKHNsaWRlLndpZHRoICYmIHNsaWRlLmhlaWdodCAmJiBmb3VuZC5wb3N0Zml4ID09IFwid1wiKSB7XHJcbiAgICAgICAgICAgIHNsaWRlLmhlaWdodCA9IHNsaWRlLndpZHRoIC8gc2xpZGUuaGVpZ2h0ICogZm91bmQudmFsdWU7XHJcbiAgICAgICAgICAgIHNsaWRlLndpZHRoID0gZm91bmQudmFsdWU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2xpZGUub3B0cy5zcmNzZXQgPSBzcmNzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBUaGlzIHdpbGwgYmUgd3JhcHBlciBjb250YWluaW5nIGJvdGggZ2hvc3QgYW5kIGFjdHVhbCBpbWFnZVxyXG4gICAgICBzbGlkZS4kY29udGVudCA9ICQoJzxkaXYgY2xhc3M9XCJmYW5jeWJveC1jb250ZW50XCI+PC9kaXY+JylcclxuICAgICAgICAuYWRkQ2xhc3MoXCJmYW5jeWJveC1pcy1oaWRkZW5cIilcclxuICAgICAgICAuYXBwZW5kVG8oc2xpZGUuJHNsaWRlLmFkZENsYXNzKFwiZmFuY3lib3gtc2xpZGUtLWltYWdlXCIpKTtcclxuXHJcbiAgICAgIC8vIElmIHdlIGhhdmUgYSB0aHVtYm5haWwsIHdlIGNhbiBkaXNwbGF5IGl0IHdoaWxlIGFjdHVhbCBpbWFnZSBpcyBsb2FkaW5nXHJcbiAgICAgIC8vIFVzZXJzIHdpbGwgbm90IHN0YXJlIGF0IGJsYWNrIHNjcmVlbiBhbmQgYWN0dWFsIGltYWdlIHdpbGwgYXBwZWFyIGdyYWR1YWxseVxyXG4gICAgICB0aHVtYlNyYyA9IHNsaWRlLm9wdHMudGh1bWIgfHwgKHNsaWRlLm9wdHMuJHRodW1iICYmIHNsaWRlLm9wdHMuJHRodW1iLmxlbmd0aCA/IHNsaWRlLm9wdHMuJHRodW1iLmF0dHIoXCJzcmNcIikgOiBmYWxzZSk7XHJcblxyXG4gICAgICBpZiAoc2xpZGUub3B0cy5wcmVsb2FkICE9PSBmYWxzZSAmJiBzbGlkZS5vcHRzLndpZHRoICYmIHNsaWRlLm9wdHMuaGVpZ2h0ICYmIHRodW1iU3JjKSB7XHJcbiAgICAgICAgc2xpZGUud2lkdGggPSBzbGlkZS5vcHRzLndpZHRoO1xyXG4gICAgICAgIHNsaWRlLmhlaWdodCA9IHNsaWRlLm9wdHMuaGVpZ2h0O1xyXG5cclxuICAgICAgICBzbGlkZS4kZ2hvc3QgPSAkKFwiPGltZyAvPlwiKVxyXG4gICAgICAgICAgLm9uZShcImVycm9yXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgc2xpZGUuJGdob3N0ID0gbnVsbDtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAub25lKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2VsZi5hZnRlckxvYWQoc2xpZGUpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5hZGRDbGFzcyhcImZhbmN5Ym94LWltYWdlXCIpXHJcbiAgICAgICAgICAuYXBwZW5kVG8oc2xpZGUuJGNvbnRlbnQpXHJcbiAgICAgICAgICAuYXR0cihcInNyY1wiLCB0aHVtYlNyYyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFN0YXJ0IGxvYWRpbmcgYWN0dWFsIGltYWdlXHJcbiAgICAgIHNlbGYuc2V0QmlnSW1hZ2Uoc2xpZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDcmVhdGUgZnVsbC1zaXplIGltYWdlXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgc2V0QmlnSW1hZ2U6IGZ1bmN0aW9uKHNsaWRlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAkaW1nID0gJChcIjxpbWcgLz5cIik7XHJcblxyXG4gICAgICBzbGlkZS4kaW1hZ2UgPSAkaW1nXHJcbiAgICAgICAgLm9uZShcImVycm9yXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgc2VsZi5zZXRFcnJvcihzbGlkZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub25lKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBzaXplcztcclxuXHJcbiAgICAgICAgICBpZiAoIXNsaWRlLiRnaG9zdCkge1xyXG4gICAgICAgICAgICBzZWxmLnJlc29sdmVJbWFnZVNsaWRlU2l6ZShzbGlkZSwgdGhpcy5uYXR1cmFsV2lkdGgsIHRoaXMubmF0dXJhbEhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmFmdGVyTG9hZChzbGlkZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQ2xlYXIgdGltZW91dCB0aGF0IGNoZWNrcyBpZiBsb2FkaW5nIGljb24gbmVlZHMgdG8gYmUgZGlzcGxheWVkXHJcbiAgICAgICAgICBpZiAoc2xpZGUudGltb3V0cykge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc2xpZGUudGltb3V0cyk7XHJcbiAgICAgICAgICAgIHNsaWRlLnRpbW91dHMgPSBudWxsO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChzZWxmLmlzQ2xvc2luZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHNsaWRlLm9wdHMuc3Jjc2V0KSB7XHJcbiAgICAgICAgICAgIHNpemVzID0gc2xpZGUub3B0cy5zaXplcztcclxuXHJcbiAgICAgICAgICAgIGlmICghc2l6ZXMgfHwgc2l6ZXMgPT09IFwiYXV0b1wiKSB7XHJcbiAgICAgICAgICAgICAgc2l6ZXMgPVxyXG4gICAgICAgICAgICAgICAgKHNsaWRlLndpZHRoIC8gc2xpZGUuaGVpZ2h0ID4gMSAmJiAkVy53aWR0aCgpIC8gJFcuaGVpZ2h0KCkgPiAxID8gXCIxMDBcIiA6IE1hdGgucm91bmQoc2xpZGUud2lkdGggLyBzbGlkZS5oZWlnaHQgKiAxMDApKSArXHJcbiAgICAgICAgICAgICAgICBcInZ3XCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRpbWcuYXR0cihcInNpemVzXCIsIHNpemVzKS5hdHRyKFwic3Jjc2V0XCIsIHNsaWRlLm9wdHMuc3Jjc2V0KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBIaWRlIHRlbXBvcmFyeSBpbWFnZSBhZnRlciBzb21lIGRlbGF5XHJcbiAgICAgICAgICBpZiAoc2xpZGUuJGdob3N0KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHNsaWRlLiRnaG9zdCAmJiAhc2VsZi5pc0Nsb3NpbmcpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlLiRnaG9zdC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBNYXRoLm1pbigzMDAsIE1hdGgubWF4KDEwMDAsIHNsaWRlLmhlaWdodCAvIDE2MDApKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2VsZi5oaWRlTG9hZGluZyhzbGlkZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYWRkQ2xhc3MoXCJmYW5jeWJveC1pbWFnZVwiKVxyXG4gICAgICAgIC5hdHRyKFwic3JjXCIsIHNsaWRlLnNyYylcclxuICAgICAgICAuYXBwZW5kVG8oc2xpZGUuJGNvbnRlbnQpO1xyXG5cclxuICAgICAgaWYgKCgkaW1nWzBdLmNvbXBsZXRlIHx8ICRpbWdbMF0ucmVhZHlTdGF0ZSA9PSBcImNvbXBsZXRlXCIpICYmICRpbWdbMF0ubmF0dXJhbFdpZHRoICYmICRpbWdbMF0ubmF0dXJhbEhlaWdodCkge1xyXG4gICAgICAgICRpbWcudHJpZ2dlcihcImxvYWRcIik7XHJcbiAgICAgIH0gZWxzZSBpZiAoJGltZ1swXS5lcnJvcikge1xyXG4gICAgICAgICRpbWcudHJpZ2dlcihcImVycm9yXCIpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENvbXB1dGVzIHRoZSBzbGlkZSBzaXplIGZyb20gaW1hZ2Ugc2l6ZSBhbmQgbWF4V2lkdGgvbWF4SGVpZ2h0XHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHJlc29sdmVJbWFnZVNsaWRlU2l6ZTogZnVuY3Rpb24oc2xpZGUsIGltZ1dpZHRoLCBpbWdIZWlnaHQpIHtcclxuICAgICAgdmFyIG1heFdpZHRoID0gcGFyc2VJbnQoc2xpZGUub3B0cy53aWR0aCwgMTApLFxyXG4gICAgICAgIG1heEhlaWdodCA9IHBhcnNlSW50KHNsaWRlLm9wdHMuaGVpZ2h0LCAxMCk7XHJcblxyXG4gICAgICAvLyBTZXRzIHRoZSBkZWZhdWx0IHZhbHVlcyBmcm9tIHRoZSBpbWFnZVxyXG4gICAgICBzbGlkZS53aWR0aCA9IGltZ1dpZHRoO1xyXG4gICAgICBzbGlkZS5oZWlnaHQgPSBpbWdIZWlnaHQ7XHJcblxyXG4gICAgICBpZiAobWF4V2lkdGggPiAwKSB7XHJcbiAgICAgICAgc2xpZGUud2lkdGggPSBtYXhXaWR0aDtcclxuICAgICAgICBzbGlkZS5oZWlnaHQgPSBNYXRoLmZsb29yKG1heFdpZHRoICogaW1nSGVpZ2h0IC8gaW1nV2lkdGgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobWF4SGVpZ2h0ID4gMCkge1xyXG4gICAgICAgIHNsaWRlLndpZHRoID0gTWF0aC5mbG9vcihtYXhIZWlnaHQgKiBpbWdXaWR0aCAvIGltZ0hlaWdodCk7XHJcbiAgICAgICAgc2xpZGUuaGVpZ2h0ID0gbWF4SGVpZ2h0O1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENyZWF0ZSBpZnJhbWUgd3JhcHBlciwgaWZyYW1lIGFuZCBiaW5kaW5nc1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgc2V0SWZyYW1lOiBmdW5jdGlvbihzbGlkZSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb3B0cyA9IHNsaWRlLm9wdHMuaWZyYW1lLFxyXG4gICAgICAgICRzbGlkZSA9IHNsaWRlLiRzbGlkZSxcclxuICAgICAgICAkaWZyYW1lO1xyXG5cclxuICAgICAgc2xpZGUuJGNvbnRlbnQgPSAkKCc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtY29udGVudCcgKyAob3B0cy5wcmVsb2FkID8gXCIgZmFuY3lib3gtaXMtaGlkZGVuXCIgOiBcIlwiKSArICdcIj48L2Rpdj4nKVxyXG4gICAgICAgIC5jc3Mob3B0cy5jc3MpXHJcbiAgICAgICAgLmFwcGVuZFRvKCRzbGlkZSk7XHJcblxyXG4gICAgICAkc2xpZGUuYWRkQ2xhc3MoXCJmYW5jeWJveC1zbGlkZS0tXCIgKyBzbGlkZS5jb250ZW50VHlwZSk7XHJcblxyXG4gICAgICBzbGlkZS4kaWZyYW1lID0gJGlmcmFtZSA9ICQob3B0cy50cGwucmVwbGFjZSgvXFx7cm5kXFx9L2csIG5ldyBEYXRlKCkuZ2V0VGltZSgpKSlcclxuICAgICAgICAuYXR0cihvcHRzLmF0dHIpXHJcbiAgICAgICAgLmFwcGVuZFRvKHNsaWRlLiRjb250ZW50KTtcclxuXHJcbiAgICAgIGlmIChvcHRzLnByZWxvYWQpIHtcclxuICAgICAgICBzZWxmLnNob3dMb2FkaW5nKHNsaWRlKTtcclxuXHJcbiAgICAgICAgLy8gVW5mb3J0dW5hdGVseSwgaXQgaXMgbm90IGFsd2F5cyBwb3NzaWJsZSB0byBkZXRlcm1pbmUgaWYgaWZyYW1lIGlzIHN1Y2Nlc3NmdWxseSBsb2FkZWRcclxuICAgICAgICAvLyAoZHVlIHRvIGJyb3dzZXIgc2VjdXJpdHkgcG9saWN5KVxyXG5cclxuICAgICAgICAkaWZyYW1lLm9uKFwibG9hZC5mYiBlcnJvci5mYlwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICB0aGlzLmlzUmVhZHkgPSAxO1xyXG5cclxuICAgICAgICAgIHNsaWRlLiRzbGlkZS50cmlnZ2VyKFwicmVmcmVzaFwiKTtcclxuXHJcbiAgICAgICAgICBzZWxmLmFmdGVyTG9hZChzbGlkZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFJlY2FsY3VsYXRlIGlmcmFtZSBjb250ZW50IHNpemVcclxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgICAgICRzbGlkZS5vbihcInJlZnJlc2guZmJcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgJGNvbnRlbnQgPSBzbGlkZS4kY29udGVudCxcclxuICAgICAgICAgICAgZnJhbWVXaWR0aCA9IG9wdHMuY3NzLndpZHRoLFxyXG4gICAgICAgICAgICBmcmFtZUhlaWdodCA9IG9wdHMuY3NzLmhlaWdodCxcclxuICAgICAgICAgICAgJGNvbnRlbnRzLFxyXG4gICAgICAgICAgICAkYm9keTtcclxuXHJcbiAgICAgICAgICBpZiAoJGlmcmFtZVswXS5pc1JlYWR5ICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAkY29udGVudHMgPSAkaWZyYW1lLmNvbnRlbnRzKCk7XHJcbiAgICAgICAgICAgICRib2R5ID0gJGNvbnRlbnRzLmZpbmQoXCJib2R5XCIpO1xyXG4gICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxyXG5cclxuICAgICAgICAgIC8vIENhbGN1bGF0ZSBjb250bmV0IGRpbWVuc2lvbnMgaWYgaXQgaXMgYWNjZXNzaWJsZVxyXG4gICAgICAgICAgaWYgKCRib2R5ICYmICRib2R5Lmxlbmd0aCAmJiAkYm9keS5jaGlsZHJlbigpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkY29udGVudC5jc3Moe1xyXG4gICAgICAgICAgICAgIHdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgIGhlaWdodDogXCJcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmcmFtZVdpZHRoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICBmcmFtZVdpZHRoID0gTWF0aC5jZWlsKE1hdGgubWF4KCRib2R5WzBdLmNsaWVudFdpZHRoLCAkYm9keS5vdXRlcldpZHRoKHRydWUpKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmcmFtZVdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgJGNvbnRlbnQud2lkdGgoZnJhbWVXaWR0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmcmFtZUhlaWdodCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgZnJhbWVIZWlnaHQgPSBNYXRoLmNlaWwoTWF0aC5tYXgoJGJvZHlbMF0uY2xpZW50SGVpZ2h0LCAkYm9keS5vdXRlckhlaWdodCh0cnVlKSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZnJhbWVIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAkY29udGVudC5oZWlnaHQoZnJhbWVIZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgJGNvbnRlbnQucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1pcy1oaWRkZW5cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hZnRlckxvYWQoc2xpZGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkaWZyYW1lLmF0dHIoXCJzcmNcIiwgc2xpZGUuc3JjKTtcclxuXHJcbiAgICAgIC8vIFJlbW92ZSBpZnJhbWUgaWYgY2xvc2luZyBvciBjaGFuZ2luZyBnYWxsZXJ5IGl0ZW1cclxuICAgICAgJHNsaWRlLm9uZShcIm9uUmVzZXRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gVGhpcyBoZWxwcyBJRSBub3QgdG8gdGhyb3cgZXJyb3JzIHdoZW4gY2xvc2luZ1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgIC5maW5kKFwiaWZyYW1lXCIpXHJcbiAgICAgICAgICAgIC5oaWRlKClcclxuICAgICAgICAgICAgLnVuYmluZCgpXHJcbiAgICAgICAgICAgIC5hdHRyKFwic3JjXCIsIFwiLy9hYm91dDpibGFua1wiKTtcclxuICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHt9XHJcblxyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgIC5vZmYoXCJyZWZyZXNoLmZiXCIpXHJcbiAgICAgICAgICAuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgc2xpZGUuaXNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFdyYXAgYW5kIGFwcGVuZCBjb250ZW50IHRvIHRoZSBzbGlkZVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBzZXRDb250ZW50OiBmdW5jdGlvbihzbGlkZSwgY29udGVudCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICBpZiAoc2VsZi5pc0Nsb3NpbmcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYuaGlkZUxvYWRpbmcoc2xpZGUpO1xyXG5cclxuICAgICAgaWYgKHNsaWRlLiRjb250ZW50KSB7XHJcbiAgICAgICAgJC5mYW5jeWJveC5zdG9wKHNsaWRlLiRjb250ZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2xpZGUuJHNsaWRlLmVtcHR5KCk7XHJcblxyXG4gICAgICAvLyBJZiBjb250ZW50IGlzIGEgalF1ZXJ5IG9iamVjdCwgdGhlbiBpdCB3aWxsIGJlIG1vdmVkIHRvIHRoZSBzbGlkZS5cclxuICAgICAgLy8gVGhlIHBsYWNlaG9sZGVyIGlzIGNyZWF0ZWQgc28gd2Ugd2lsbCBrbm93IHdoZXJlIHRvIHB1dCBpdCBiYWNrLlxyXG4gICAgICBpZiAoaXNRdWVyeShjb250ZW50KSAmJiBjb250ZW50LnBhcmVudCgpLmxlbmd0aCkge1xyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBjb250ZW50IGlzIG5vdCBhbHJlYWR5IG1vdmVkIHRvIGZhbmN5Qm94XHJcbiAgICAgICAgY29udGVudFxyXG4gICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAucGFyZW50KFwiLmZhbmN5Ym94LXNsaWRlLS1pbmxpbmVcIilcclxuICAgICAgICAgIC50cmlnZ2VyKFwib25SZXNldFwiKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRlbXBvcmFyeSBlbGVtZW50IG1hcmtpbmcgb3JpZ2luYWwgcGxhY2Ugb2YgdGhlIGNvbnRlbnRcclxuICAgICAgICBzbGlkZS4kcGxhY2Vob2xkZXIgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgIC5oaWRlKClcclxuICAgICAgICAgIC5pbnNlcnRBZnRlcihjb250ZW50KTtcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIGNvbnRlbnQgaXMgdmlzaWJsZVxyXG4gICAgICAgIGNvbnRlbnQuY3NzKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKTtcclxuICAgICAgfSBlbHNlIGlmICghc2xpZGUuaGFzRXJyb3IpIHtcclxuICAgICAgICAvLyBJZiBjb250ZW50IGlzIGp1c3QgYSBwbGFpbiB0ZXh0LCB0cnkgdG8gY29udmVydCBpdCB0byBodG1sXHJcbiAgICAgICAgaWYgKCQudHlwZShjb250ZW50KSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgY29udGVudCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAuYXBwZW5kKCQudHJpbShjb250ZW50KSlcclxuICAgICAgICAgICAgLmNvbnRlbnRzKCk7XHJcblxyXG4gICAgICAgICAgLy8gSWYgd2UgaGF2ZSB0ZXh0IG5vZGUsIHRoZW4gYWRkIHdyYXBwaW5nIGVsZW1lbnQgdG8gbWFrZSB2ZXJ0aWNhbCBhbGlnbm1lbnQgd29ya1xyXG4gICAgICAgICAgaWYgKGNvbnRlbnRbMF0ubm9kZVR5cGUgPT09IDMpIHtcclxuICAgICAgICAgICAgY29udGVudCA9ICQoXCI8ZGl2PlwiKS5odG1sKGNvbnRlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgXCJmaWx0ZXJcIiBvcHRpb24gaXMgcHJvdmlkZWQsIHRoZW4gZmlsdGVyIGNvbnRlbnRcclxuICAgICAgICBpZiAoc2xpZGUub3B0cy5maWx0ZXIpIHtcclxuICAgICAgICAgIGNvbnRlbnQgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgLmh0bWwoY29udGVudClcclxuICAgICAgICAgICAgLmZpbmQoc2xpZGUub3B0cy5maWx0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgc2xpZGUuJHNsaWRlLm9uZShcIm9uUmVzZXRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gUGF1c2UgYWxsIGh0bWw1IHZpZGVvL2F1ZGlvXHJcbiAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgLmZpbmQoXCJ2aWRlbyxhdWRpb1wiKVxyXG4gICAgICAgICAgLnRyaWdnZXIoXCJwYXVzZVwiKTtcclxuXHJcbiAgICAgICAgLy8gUHV0IGNvbnRlbnQgYmFja1xyXG4gICAgICAgIGlmIChzbGlkZS4kcGxhY2Vob2xkZXIpIHtcclxuICAgICAgICAgIHNsaWRlLiRwbGFjZWhvbGRlci5hZnRlcihjb250ZW50LmhpZGUoKSkucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgc2xpZGUuJHBsYWNlaG9sZGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBjdXN0b20gY2xvc2UgYnV0dG9uXHJcbiAgICAgICAgaWYgKHNsaWRlLiRzbWFsbEJ0bikge1xyXG4gICAgICAgICAgc2xpZGUuJHNtYWxsQnRuLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgIHNsaWRlLiRzbWFsbEJ0biA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgY29udGVudCBhbmQgbWFyayBzbGlkZSBhcyBub3QgbG9hZGVkXHJcbiAgICAgICAgaWYgKCFzbGlkZS5oYXNFcnJvcikge1xyXG4gICAgICAgICAgJCh0aGlzKS5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgIHNsaWRlLmlzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoY29udGVudCkuYXBwZW5kVG8oc2xpZGUuJHNsaWRlKTtcclxuXHJcbiAgICAgIGlmICgkKGNvbnRlbnQpLmlzKFwidmlkZW8sYXVkaW9cIikpIHtcclxuICAgICAgICAkKGNvbnRlbnQpLmFkZENsYXNzKFwiZmFuY3lib3gtdmlkZW9cIik7XHJcblxyXG4gICAgICAgICQoY29udGVudCkud3JhcChcIjxkaXY+PC9kaXY+XCIpO1xyXG5cclxuICAgICAgICBzbGlkZS5jb250ZW50VHlwZSA9IFwidmlkZW9cIjtcclxuXHJcbiAgICAgICAgc2xpZGUub3B0cy53aWR0aCA9IHNsaWRlLm9wdHMud2lkdGggfHwgJChjb250ZW50KS5hdHRyKFwid2lkdGhcIik7XHJcbiAgICAgICAgc2xpZGUub3B0cy5oZWlnaHQgPSBzbGlkZS5vcHRzLmhlaWdodCB8fCAkKGNvbnRlbnQpLmF0dHIoXCJoZWlnaHRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNsaWRlLiRjb250ZW50ID0gc2xpZGUuJHNsaWRlXHJcbiAgICAgICAgLmNoaWxkcmVuKClcclxuICAgICAgICAuZmlsdGVyKFwiZGl2LGZvcm0sbWFpbix2aWRlbyxhdWRpb1wiKVxyXG4gICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgLmFkZENsYXNzKFwiZmFuY3lib3gtY29udGVudFwiKTtcclxuXHJcbiAgICAgIHNsaWRlLiRzbGlkZS5hZGRDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1cIiArIHNsaWRlLmNvbnRlbnRUeXBlKTtcclxuXHJcbiAgICAgIHRoaXMuYWZ0ZXJMb2FkKHNsaWRlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBzZXRFcnJvcjogZnVuY3Rpb24oc2xpZGUpIHtcclxuICAgICAgc2xpZGUuaGFzRXJyb3IgPSB0cnVlO1xyXG5cclxuICAgICAgc2xpZGUuJHNsaWRlXHJcbiAgICAgICAgLnRyaWdnZXIoXCJvblJlc2V0XCIpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKFwiZmFuY3lib3gtc2xpZGUtLVwiICsgc2xpZGUuY29udGVudFR5cGUpXHJcbiAgICAgICAgLmFkZENsYXNzKFwiZmFuY3lib3gtc2xpZGUtLWVycm9yXCIpO1xyXG5cclxuICAgICAgc2xpZGUuY29udGVudFR5cGUgPSBcImh0bWxcIjtcclxuXHJcbiAgICAgIHRoaXMuc2V0Q29udGVudChzbGlkZSwgdGhpcy50cmFuc2xhdGUoc2xpZGUsIHNsaWRlLm9wdHMuZXJyb3JUcGwpKTtcclxuXHJcbiAgICAgIGlmIChzbGlkZS5wb3MgPT09IHRoaXMuY3VyclBvcykge1xyXG4gICAgICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTaG93IGxvYWRpbmcgaWNvbiBpbnNpZGUgdGhlIHNsaWRlXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgc2hvd0xvYWRpbmc6IGZ1bmN0aW9uKHNsaWRlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgIHNsaWRlID0gc2xpZGUgfHwgc2VsZi5jdXJyZW50O1xyXG5cclxuICAgICAgaWYgKHNsaWRlICYmICFzbGlkZS4kc3Bpbm5lcikge1xyXG4gICAgICAgIHNsaWRlLiRzcGlubmVyID0gJChzZWxmLnRyYW5zbGF0ZShzZWxmLCBzZWxmLm9wdHMuc3Bpbm5lclRwbCkpLmFwcGVuZFRvKHNsaWRlLiRzbGlkZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gUmVtb3ZlIGxvYWRpbmcgaWNvbiBmcm9tIHRoZSBzbGlkZVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGhpZGVMb2FkaW5nOiBmdW5jdGlvbihzbGlkZSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICBzbGlkZSA9IHNsaWRlIHx8IHNlbGYuY3VycmVudDtcclxuXHJcbiAgICAgIGlmIChzbGlkZSAmJiBzbGlkZS4kc3Bpbm5lcikge1xyXG4gICAgICAgIHNsaWRlLiRzcGlubmVyLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICBkZWxldGUgc2xpZGUuJHNwaW5uZXI7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gQWRqdXN0bWVudHMgYWZ0ZXIgc2xpZGUgY29udGVudCBoYXMgYmVlbiBsb2FkZWRcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgYWZ0ZXJMb2FkOiBmdW5jdGlvbihzbGlkZSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICBpZiAoc2VsZi5pc0Nsb3NpbmcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNsaWRlLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICBzbGlkZS5pc0xvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICBzZWxmLnRyaWdnZXIoXCJhZnRlckxvYWRcIiwgc2xpZGUpO1xyXG5cclxuICAgICAgc2VsZi5oaWRlTG9hZGluZyhzbGlkZSk7XHJcblxyXG4gICAgICBpZiAoc2xpZGUucG9zID09PSBzZWxmLmN1cnJQb3MpIHtcclxuICAgICAgICBzZWxmLnVwZGF0ZUN1cnNvcigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc2xpZGUub3B0cy5zbWFsbEJ0biAmJiAoIXNsaWRlLiRzbWFsbEJ0biB8fCAhc2xpZGUuJHNtYWxsQnRuLmxlbmd0aCkpIHtcclxuICAgICAgICBzbGlkZS4kc21hbGxCdG4gPSAkKHNlbGYudHJhbnNsYXRlKHNsaWRlLCBzbGlkZS5vcHRzLmJ0blRwbC5zbWFsbEJ0bikpLnByZXBlbmRUbyhzbGlkZS4kY29udGVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzbGlkZS5vcHRzLnByb3RlY3QgJiYgc2xpZGUuJGNvbnRlbnQgJiYgIXNsaWRlLmhhc0Vycm9yKSB7XHJcbiAgICAgICAgLy8gRGlzYWJsZSByaWdodCBjbGlja1xyXG4gICAgICAgIHNsaWRlLiRjb250ZW50Lm9uKFwiY29udGV4dG1lbnUuZmJcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgaWYgKGUuYnV0dG9uID09IDIpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgZmFrZSBlbGVtZW50IG9uIHRvcCBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAvLyBUaGlzIG1ha2VzIGEgYml0IGhhcmRlciBmb3IgdXNlciB0byBzZWxlY3QgaW1hZ2VcclxuICAgICAgICBpZiAoc2xpZGUudHlwZSA9PT0gXCJpbWFnZVwiKSB7XHJcbiAgICAgICAgICAkKCc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtc3BhY2ViYWxsXCI+PC9kaXY+JykuYXBwZW5kVG8oc2xpZGUuJGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi5yZXZlYWxDb250ZW50KHNsaWRlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTWFrZSBjb250ZW50IHZpc2libGVcclxuICAgIC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCByaWdodCBhZnRlciBjb250ZW50IGhhcyBiZWVuIGxvYWRlZCBvclxyXG4gICAgLy8gdXNlciBuYXZpZ2F0ZXMgZ2FsbGVyeSBhbmQgdHJhbnNpdGlvbiBzaG91bGQgc3RhcnRcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHJldmVhbENvbnRlbnQ6IGZ1bmN0aW9uKHNsaWRlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAkc2xpZGUgPSBzbGlkZS4kc2xpZGUsXHJcbiAgICAgICAgZW5kID0gZmFsc2UsXHJcbiAgICAgICAgc3RhcnQgPSBmYWxzZSxcclxuICAgICAgICBlZmZlY3QsXHJcbiAgICAgICAgZWZmZWN0Q2xhc3NOYW1lLFxyXG4gICAgICAgIGR1cmF0aW9uLFxyXG4gICAgICAgIG9wYWNpdHk7XHJcblxyXG4gICAgICBlZmZlY3QgPSBzbGlkZS5vcHRzW3NlbGYuZmlyc3RSdW4gPyBcImFuaW1hdGlvbkVmZmVjdFwiIDogXCJ0cmFuc2l0aW9uRWZmZWN0XCJdO1xyXG4gICAgICBkdXJhdGlvbiA9IHNsaWRlLm9wdHNbc2VsZi5maXJzdFJ1biA/IFwiYW5pbWF0aW9uRHVyYXRpb25cIiA6IFwidHJhbnNpdGlvbkR1cmF0aW9uXCJdO1xyXG5cclxuICAgICAgZHVyYXRpb24gPSBwYXJzZUludChzbGlkZS5mb3JjZWREdXJhdGlvbiA9PT0gdW5kZWZpbmVkID8gZHVyYXRpb24gOiBzbGlkZS5mb3JjZWREdXJhdGlvbiwgMTApO1xyXG5cclxuICAgICAgLy8gRG8gbm90IGFuaW1hdGUgaWYgcmV2ZWFsaW5nIHRoZSBzYW1lIHNsaWRlXHJcbiAgICAgIGlmIChzbGlkZS5wb3MgPT09IHNlbGYuY3VyclBvcykge1xyXG4gICAgICAgIGlmIChzbGlkZS5pc0NvbXBsZXRlKSB7XHJcbiAgICAgICAgICBlZmZlY3QgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2VsZi5pc0FuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc2xpZGUuaXNNb3ZlZCB8fCBzbGlkZS5wb3MgIT09IHNlbGYuY3VyclBvcyB8fCAhZHVyYXRpb24pIHtcclxuICAgICAgICBlZmZlY3QgPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgY2FuIHpvb21cclxuICAgICAgaWYgKGVmZmVjdCA9PT0gXCJ6b29tXCIpIHtcclxuICAgICAgICBpZiAoc2xpZGUucG9zID09PSBzZWxmLmN1cnJQb3MgJiYgZHVyYXRpb24gJiYgc2xpZGUudHlwZSA9PT0gXCJpbWFnZVwiICYmICFzbGlkZS5oYXNFcnJvciAmJiAoc3RhcnQgPSBzZWxmLmdldFRodW1iUG9zKHNsaWRlKSkpIHtcclxuICAgICAgICAgIGVuZCA9IHNlbGYuZ2V0Rml0UG9zKHNsaWRlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZWZmZWN0ID0gXCJmYWRlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBab29tIGFuaW1hdGlvblxyXG4gICAgICAvLyA9PT09PT09PT09PT09PVxyXG4gICAgICBpZiAoZWZmZWN0ID09PSBcInpvb21cIikge1xyXG4gICAgICAgIGVuZC5zY2FsZVggPSBlbmQud2lkdGggLyBzdGFydC53aWR0aDtcclxuICAgICAgICBlbmQuc2NhbGVZID0gZW5kLmhlaWdodCAvIHN0YXJ0LmhlaWdodDtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byBhbmltYXRlIG9wYWNpdHlcclxuICAgICAgICBvcGFjaXR5ID0gc2xpZGUub3B0cy56b29tT3BhY2l0eTtcclxuXHJcbiAgICAgICAgaWYgKG9wYWNpdHkgPT0gXCJhdXRvXCIpIHtcclxuICAgICAgICAgIG9wYWNpdHkgPSBNYXRoLmFicyhzbGlkZS53aWR0aCAvIHNsaWRlLmhlaWdodCAtIHN0YXJ0LndpZHRoIC8gc3RhcnQuaGVpZ2h0KSA+IDAuMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcGFjaXR5KSB7XHJcbiAgICAgICAgICBzdGFydC5vcGFjaXR5ID0gMC4xO1xyXG4gICAgICAgICAgZW5kLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRHJhdyBpbWFnZSBhdCBzdGFydCBwb3NpdGlvblxyXG4gICAgICAgICQuZmFuY3lib3guc2V0VHJhbnNsYXRlKHNsaWRlLiRjb250ZW50LnJlbW92ZUNsYXNzKFwiZmFuY3lib3gtaXMtaGlkZGVuXCIpLCBzdGFydCk7XHJcblxyXG4gICAgICAgIGZvcmNlUmVkcmF3KHNsaWRlLiRjb250ZW50KTtcclxuXHJcbiAgICAgICAgLy8gU3RhcnQgYW5pbWF0aW9uXHJcbiAgICAgICAgJC5mYW5jeWJveC5hbmltYXRlKHNsaWRlLiRjb250ZW50LCBlbmQsIGR1cmF0aW9uLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHNlbGYuaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICBzZWxmLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi51cGRhdGVTbGlkZShzbGlkZSk7XHJcblxyXG4gICAgICAvLyBTaW1wbHkgc2hvdyBjb250ZW50XHJcbiAgICAgIC8vID09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAgIGlmICghZWZmZWN0KSB7XHJcbiAgICAgICAgZm9yY2VSZWRyYXcoJHNsaWRlKTtcclxuXHJcbiAgICAgICAgc2xpZGUuJGNvbnRlbnQucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1pcy1oaWRkZW5cIik7XHJcblxyXG4gICAgICAgIGlmIChzbGlkZS5wb3MgPT09IHNlbGYuY3VyclBvcykge1xyXG4gICAgICAgICAgc2VsZi5jb21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkLmZhbmN5Ym94LnN0b3AoJHNsaWRlKTtcclxuXHJcbiAgICAgIGVmZmVjdENsYXNzTmFtZSA9IFwiZmFuY3lib3gtYW5pbWF0ZWQgZmFuY3lib3gtc2xpZGUtLVwiICsgKHNsaWRlLnBvcyA+PSBzZWxmLnByZXZQb3MgPyBcIm5leHRcIiA6IFwicHJldmlvdXNcIikgKyBcIiBmYW5jeWJveC1meC1cIiArIGVmZmVjdDtcclxuXHJcbiAgICAgICRzbGlkZVxyXG4gICAgICAgIC5yZW1vdmVBdHRyKFwic3R5bGVcIilcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1zbGlkZS0tY3VycmVudCBmYW5jeWJveC1zbGlkZS0tbmV4dCBmYW5jeWJveC1zbGlkZS0tcHJldmlvdXNcIilcclxuICAgICAgICAuYWRkQ2xhc3MoZWZmZWN0Q2xhc3NOYW1lKTtcclxuXHJcbiAgICAgIHNsaWRlLiRjb250ZW50LnJlbW92ZUNsYXNzKFwiZmFuY3lib3gtaXMtaGlkZGVuXCIpO1xyXG5cclxuICAgICAgLy8gRm9yY2UgcmVmbG93IGZvciBDU1MzIHRyYW5zaXRpb25zXHJcbiAgICAgIGZvcmNlUmVkcmF3KCRzbGlkZSk7XHJcblxyXG4gICAgICAkLmZhbmN5Ym94LmFuaW1hdGUoXHJcbiAgICAgICAgJHNsaWRlLFxyXG4gICAgICAgIFwiZmFuY3lib3gtc2xpZGUtLWN1cnJlbnRcIixcclxuICAgICAgICBkdXJhdGlvbixcclxuICAgICAgICBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAkc2xpZGUucmVtb3ZlQ2xhc3MoZWZmZWN0Q2xhc3NOYW1lKS5yZW1vdmVBdHRyKFwic3R5bGVcIik7XHJcblxyXG4gICAgICAgICAgaWYgKHNsaWRlLnBvcyA9PT0gc2VsZi5jdXJyUG9zKSB7XHJcbiAgICAgICAgICAgIHNlbGYuY29tcGxldGUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRydWVcclxuICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgd2UgY2FuIGFuZCBoYXZlIHRvIHpvb20gZnJvbSB0aHVtYm5haWxcclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgZ2V0VGh1bWJQb3M6IGZ1bmN0aW9uKHNsaWRlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICByZXogPSBmYWxzZSxcclxuICAgICAgICAkdGh1bWIgPSBzbGlkZS5vcHRzLiR0aHVtYixcclxuICAgICAgICB0aHVtYlBvcyA9ICR0aHVtYiAmJiAkdGh1bWIubGVuZ3RoICYmICR0aHVtYlswXS5vd25lckRvY3VtZW50ID09PSBkb2N1bWVudCA/ICR0aHVtYi5vZmZzZXQoKSA6IDAsXHJcbiAgICAgICAgc2xpZGVQb3M7XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiBlbGVtZW50IGlzIGluc2lkZSB0aGUgdmlld3BvcnQgYnkgYXQgbGVhc3QgMSBwaXhlbFxyXG4gICAgICB2YXIgaXNFbGVtZW50VmlzaWJsZSA9IGZ1bmN0aW9uKCRlbCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gJGVsWzBdLFxyXG4gICAgICAgICAgZWxlbWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgcGFyZW50UmVjdHMgPSBbXSxcclxuICAgICAgICAgIHZpc2libGVJbkFsbFBhcmVudHM7XHJcblxyXG4gICAgICAgIHdoaWxlIChlbGVtZW50LnBhcmVudEVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgIGlmICgkKGVsZW1lbnQucGFyZW50RWxlbWVudCkuY3NzKFwib3ZlcmZsb3dcIikgPT09IFwiaGlkZGVuXCIgfHwgJChlbGVtZW50LnBhcmVudEVsZW1lbnQpLmNzcyhcIm92ZXJmbG93XCIpID09PSBcImF1dG9cIikge1xyXG4gICAgICAgICAgICBwYXJlbnRSZWN0cy5wdXNoKGVsZW1lbnQucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZpc2libGVJbkFsbFBhcmVudHMgPSBwYXJlbnRSZWN0cy5ldmVyeShmdW5jdGlvbihwYXJlbnRSZWN0KSB7XHJcbiAgICAgICAgICB2YXIgdmlzaWJsZVBpeGVsWCA9IE1hdGgubWluKGVsZW1lbnRSZWN0LnJpZ2h0LCBwYXJlbnRSZWN0LnJpZ2h0KSAtIE1hdGgubWF4KGVsZW1lbnRSZWN0LmxlZnQsIHBhcmVudFJlY3QubGVmdCk7XHJcbiAgICAgICAgICB2YXIgdmlzaWJsZVBpeGVsWSA9IE1hdGgubWluKGVsZW1lbnRSZWN0LmJvdHRvbSwgcGFyZW50UmVjdC5ib3R0b20pIC0gTWF0aC5tYXgoZWxlbWVudFJlY3QudG9wLCBwYXJlbnRSZWN0LnRvcCk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHZpc2libGVQaXhlbFggPiAwICYmIHZpc2libGVQaXhlbFkgPiAwO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgdmlzaWJsZUluQWxsUGFyZW50cyAmJlxyXG4gICAgICAgICAgZWxlbWVudFJlY3QuYm90dG9tID4gMCAmJlxyXG4gICAgICAgICAgZWxlbWVudFJlY3QucmlnaHQgPiAwICYmXHJcbiAgICAgICAgICBlbGVtZW50UmVjdC5sZWZ0IDwgJCh3aW5kb3cpLndpZHRoKCkgJiZcclxuICAgICAgICAgIGVsZW1lbnRSZWN0LnRvcCA8ICQod2luZG93KS5oZWlnaHQoKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodGh1bWJQb3MgJiYgaXNFbGVtZW50VmlzaWJsZSgkdGh1bWIpKSB7XHJcbiAgICAgICAgc2xpZGVQb3MgPSBzZWxmLiRyZWZzLnN0YWdlLm9mZnNldCgpO1xyXG5cclxuICAgICAgICByZXogPSB7XHJcbiAgICAgICAgICB0b3A6IHRodW1iUG9zLnRvcCAtIHNsaWRlUG9zLnRvcCArIHBhcnNlRmxvYXQoJHRodW1iLmNzcyhcImJvcmRlci10b3Atd2lkdGhcIikgfHwgMCksXHJcbiAgICAgICAgICBsZWZ0OiB0aHVtYlBvcy5sZWZ0IC0gc2xpZGVQb3MubGVmdCArIHBhcnNlRmxvYXQoJHRodW1iLmNzcyhcImJvcmRlci1sZWZ0LXdpZHRoXCIpIHx8IDApLFxyXG4gICAgICAgICAgd2lkdGg6ICR0aHVtYi53aWR0aCgpLFxyXG4gICAgICAgICAgaGVpZ2h0OiAkdGh1bWIuaGVpZ2h0KCksXHJcbiAgICAgICAgICBzY2FsZVg6IDEsXHJcbiAgICAgICAgICBzY2FsZVk6IDFcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmV6O1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBGaW5hbCBhZGp1c3RtZW50cyBhZnRlciBjdXJyZW50IGdhbGxlcnkgaXRlbSBpcyBtb3ZlZCB0byBwb3NpdGlvblxyXG4gICAgLy8gYW5kIGl0YHMgY29udGVudCBpcyBsb2FkZWRcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGN1cnJlbnQgPSBzZWxmLmN1cnJlbnQsXHJcbiAgICAgICAgc2xpZGVzID0ge307XHJcblxyXG4gICAgICBpZiAoY3VycmVudC5pc01vdmVkIHx8ICFjdXJyZW50LmlzTG9hZGVkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWN1cnJlbnQuaXNDb21wbGV0ZSkge1xyXG4gICAgICAgIGN1cnJlbnQuaXNDb21wbGV0ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGN1cnJlbnQuJHNsaWRlLnNpYmxpbmdzKCkudHJpZ2dlcihcIm9uUmVzZXRcIik7XHJcblxyXG4gICAgICAgIHNlbGYucHJlbG9hZChcImlubGluZVwiKTtcclxuXHJcbiAgICAgICAgLy8gVHJpZ2dlciBhbnkgQ1NTMyB0cmFuc2l0b24gaW5zaWRlIHRoZSBzbGlkZVxyXG4gICAgICAgIGZvcmNlUmVkcmF3KGN1cnJlbnQuJHNsaWRlKTtcclxuXHJcbiAgICAgICAgY3VycmVudC4kc2xpZGUuYWRkQ2xhc3MoXCJmYW5jeWJveC1zbGlkZS0tY29tcGxldGVcIik7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSB1bm5lY2Vzc2FyeSBzbGlkZXNcclxuICAgICAgICAkLmVhY2goc2VsZi5zbGlkZXMsIGZ1bmN0aW9uKGtleSwgc2xpZGUpIHtcclxuICAgICAgICAgIGlmIChzbGlkZS5wb3MgPj0gc2VsZi5jdXJyUG9zIC0gMSAmJiBzbGlkZS5wb3MgPD0gc2VsZi5jdXJyUG9zICsgMSkge1xyXG4gICAgICAgICAgICBzbGlkZXNbc2xpZGUucG9zXSA9IHNsaWRlO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChzbGlkZSkge1xyXG4gICAgICAgICAgICAkLmZhbmN5Ym94LnN0b3Aoc2xpZGUuJHNsaWRlKTtcclxuXHJcbiAgICAgICAgICAgIHNsaWRlLiRzbGlkZS5vZmYoKS5yZW1vdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VsZi5zbGlkZXMgPSBzbGlkZXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYuaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgIHNlbGYudXBkYXRlQ3Vyc29yKCk7XHJcblxyXG4gICAgICBzZWxmLnRyaWdnZXIoXCJhZnRlclNob3dcIik7XHJcblxyXG4gICAgICAvLyBQbGF5IGZpcnN0IGh0bWw1IHZpZGVvL2F1ZGlvXHJcbiAgICAgIGN1cnJlbnQuJHNsaWRlXHJcbiAgICAgICAgLmZpbmQoXCJ2aWRlbyxhdWRpb1wiKVxyXG4gICAgICAgIC5maWx0ZXIoXCI6dmlzaWJsZTpmaXJzdFwiKVxyXG4gICAgICAgIC50cmlnZ2VyKFwicGxheVwiKTtcclxuXHJcbiAgICAgIC8vIFRyeSB0byBmb2N1cyBvbiB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnRcclxuICAgICAgaWYgKFxyXG4gICAgICAgICQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkuaXMoXCJbZGlzYWJsZWRdXCIpIHx8XHJcbiAgICAgICAgKGN1cnJlbnQub3B0cy5hdXRvRm9jdXMgJiYgIShjdXJyZW50LnR5cGUgPT0gXCJpbWFnZVwiIHx8IGN1cnJlbnQudHlwZSA9PT0gXCJpZnJhbWVcIikpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHNlbGYuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBQcmVsb2FkIG5leHQgYW5kIHByZXZpb3VzIHNsaWRlc1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBwcmVsb2FkOiBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBuZXh0ID0gc2VsZi5zbGlkZXNbc2VsZi5jdXJyUG9zICsgMV0sXHJcbiAgICAgICAgcHJldiA9IHNlbGYuc2xpZGVzW3NlbGYuY3VyclBvcyAtIDFdO1xyXG5cclxuICAgICAgaWYgKG5leHQgJiYgbmV4dC50eXBlID09PSB0eXBlKSB7XHJcbiAgICAgICAgc2VsZi5sb2FkU2xpZGUobmV4dCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcmV2ICYmIHByZXYudHlwZSA9PT0gdHlwZSkge1xyXG4gICAgICAgIHNlbGYubG9hZFNsaWRlKHByZXYpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFRyeSB0byBmaW5kIGFuZCBmb2N1cyBvbiB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnRcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBmb2N1czogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5jdXJyZW50LFxyXG4gICAgICAgICRlbDtcclxuXHJcbiAgICAgIGlmICh0aGlzLmlzQ2xvc2luZykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudC5pc0NvbXBsZXRlICYmIGN1cnJlbnQuJGNvbnRlbnQpIHtcclxuICAgICAgICAvLyBMb29rIGZvciBmaXJzdCBpbnB1dCB3aXRoIGF1dG9mb2N1cyBhdHRyaWJ1dGVcclxuICAgICAgICAkZWwgPSBjdXJyZW50LiRjb250ZW50LmZpbmQoXCJpbnB1dFthdXRvZm9jdXNdOmVuYWJsZWQ6dmlzaWJsZTpmaXJzdFwiKTtcclxuXHJcbiAgICAgICAgaWYgKCEkZWwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAkZWwgPSBjdXJyZW50LiRjb250ZW50LmZpbmQoXCJidXR0b24sOmlucHV0LFt0YWJpbmRleF0sYVwiKS5maWx0ZXIoXCI6ZW5hYmxlZDp2aXNpYmxlOmZpcnN0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGVsID0gJGVsICYmICRlbC5sZW5ndGggPyAkZWwgOiBjdXJyZW50LiRjb250ZW50O1xyXG5cclxuICAgICAgICAkZWwudHJpZ2dlcihcImZvY3VzXCIpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEFjdGl2YXRlcyBjdXJyZW50IGluc3RhbmNlIC0gYnJpbmdzIGNvbnRhaW5lciB0byB0aGUgZnJvbnQgYW5kIGVuYWJsZXMga2V5Ym9hcmQsXHJcbiAgICAvLyBub3RpZmllcyBvdGhlciBpbnN0YW5jZXMgYWJvdXQgZGVhY3RpdmF0aW5nXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBhY3RpdmF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgIC8vIERlYWN0aXZhdGUgYWxsIGluc3RhbmNlc1xyXG4gICAgICAkKFwiLmZhbmN5Ym94LWNvbnRhaW5lclwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBpbnN0YW5jZSA9ICQodGhpcykuZGF0YShcIkZhbmN5Qm94XCIpO1xyXG5cclxuICAgICAgICAvLyBTa2lwIHNlbGYgYW5kIGNsb3NpbmcgaW5zdGFuY2VzXHJcbiAgICAgICAgaWYgKGluc3RhbmNlICYmIGluc3RhbmNlLmlkICE9PSBzZWxmLmlkICYmICFpbnN0YW5jZS5pc0Nsb3NpbmcpIHtcclxuICAgICAgICAgIGluc3RhbmNlLnRyaWdnZXIoXCJvbkRlYWN0aXZhdGVcIik7XHJcblxyXG4gICAgICAgICAgaW5zdGFuY2UucmVtb3ZlRXZlbnRzKCk7XHJcblxyXG4gICAgICAgICAgaW5zdGFuY2UuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNlbGYuaXNWaXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmIChzZWxmLmN1cnJlbnQgfHwgc2VsZi5pc0lkbGUpIHtcclxuICAgICAgICBzZWxmLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICBzZWxmLnVwZGF0ZUNvbnRyb2xzKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYudHJpZ2dlcihcIm9uQWN0aXZhdGVcIik7XHJcblxyXG4gICAgICBzZWxmLmFkZEV2ZW50cygpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTdGFydCBjbG9zaW5nIHByb2NlZHVyZVxyXG4gICAgLy8gVGhpcyB3aWxsIHN0YXJ0IFwiem9vbS1vdXRcIiBhbmltYXRpb24gaWYgbmVlZGVkIGFuZCBjbGVhbiBldmVyeXRoaW5nIHVwIGFmdGVyd2FyZHNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGNsb3NlOiBmdW5jdGlvbihlLCBkKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBjdXJyZW50ID0gc2VsZi5jdXJyZW50LFxyXG4gICAgICAgIGVmZmVjdCxcclxuICAgICAgICBkdXJhdGlvbixcclxuICAgICAgICAkY29udGVudCxcclxuICAgICAgICBkb21SZWN0LFxyXG4gICAgICAgIG9wYWNpdHksXHJcbiAgICAgICAgc3RhcnQsXHJcbiAgICAgICAgZW5kO1xyXG5cclxuICAgICAgdmFyIGRvbmUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZWxmLmNsZWFuVXAoZSk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoc2VsZi5pc0Nsb3NpbmcpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYuaXNDbG9zaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgIC8vIElmIGJlZm9yZUNsb3NlIGNhbGxiYWNrIHByZXZlbnRzIGNsb3NpbmcsIG1ha2Ugc3VyZSBjb250ZW50IGlzIGNlbnRlcmVkXHJcbiAgICAgIGlmIChzZWxmLnRyaWdnZXIoXCJiZWZvcmVDbG9zZVwiLCBlKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBzZWxmLmlzQ2xvc2luZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICByZXF1ZXN0QUZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgc2VsZi51cGRhdGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZW1vdmUgYWxsIGV2ZW50c1xyXG4gICAgICAvLyBJZiB0aGVyZSBhcmUgbXVsdGlwbGUgaW5zdGFuY2VzLCB0aGV5IHdpbGwgYmUgc2V0IGFnYWluIGJ5IFwiYWN0aXZhdGVcIiBtZXRob2RcclxuICAgICAgc2VsZi5yZW1vdmVFdmVudHMoKTtcclxuXHJcbiAgICAgIGlmIChjdXJyZW50LnRpbW91dHMpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoY3VycmVudC50aW1vdXRzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJGNvbnRlbnQgPSBjdXJyZW50LiRjb250ZW50O1xyXG4gICAgICBlZmZlY3QgPSBjdXJyZW50Lm9wdHMuYW5pbWF0aW9uRWZmZWN0O1xyXG4gICAgICBkdXJhdGlvbiA9ICQuaXNOdW1lcmljKGQpID8gZCA6IGVmZmVjdCA/IGN1cnJlbnQub3B0cy5hbmltYXRpb25EdXJhdGlvbiA6IDA7XHJcblxyXG4gICAgICAvLyBSZW1vdmUgb3RoZXIgc2xpZGVzXHJcbiAgICAgIGN1cnJlbnQuJHNsaWRlXHJcbiAgICAgICAgLm9mZih0cmFuc2l0aW9uRW5kKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1jb21wbGV0ZSBmYW5jeWJveC1zbGlkZS0tbmV4dCBmYW5jeWJveC1zbGlkZS0tcHJldmlvdXMgZmFuY3lib3gtYW5pbWF0ZWRcIik7XHJcblxyXG4gICAgICBjdXJyZW50LiRzbGlkZVxyXG4gICAgICAgIC5zaWJsaW5ncygpXHJcbiAgICAgICAgLnRyaWdnZXIoXCJvblJlc2V0XCIpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgLy8gVHJpZ2dlciBhbmltYXRpb25zXHJcbiAgICAgIGlmIChkdXJhdGlvbikge1xyXG4gICAgICAgIHNlbGYuJHJlZnMuY29udGFpbmVyLnJlbW92ZUNsYXNzKFwiZmFuY3lib3gtaXMtb3BlblwiKS5hZGRDbGFzcyhcImZhbmN5Ym94LWlzLWNsb3NpbmdcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENsZWFuIHVwXHJcbiAgICAgIHNlbGYuaGlkZUxvYWRpbmcoY3VycmVudCk7XHJcblxyXG4gICAgICBzZWxmLmhpZGVDb250cm9scygpO1xyXG5cclxuICAgICAgc2VsZi51cGRhdGVDdXJzb3IoKTtcclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIHBvc3NpYmxlIHRvIHpvb20tb3V0XHJcbiAgICAgIGlmIChcclxuICAgICAgICBlZmZlY3QgPT09IFwiem9vbVwiICYmXHJcbiAgICAgICAgIShlICE9PSB0cnVlICYmICRjb250ZW50ICYmIGR1cmF0aW9uICYmIGN1cnJlbnQudHlwZSA9PT0gXCJpbWFnZVwiICYmICFjdXJyZW50Lmhhc0Vycm9yICYmIChlbmQgPSBzZWxmLmdldFRodW1iUG9zKGN1cnJlbnQpKSlcclxuICAgICAgKSB7XHJcbiAgICAgICAgZWZmZWN0ID0gXCJmYWRlXCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChlZmZlY3QgPT09IFwiem9vbVwiKSB7XHJcbiAgICAgICAgJC5mYW5jeWJveC5zdG9wKCRjb250ZW50KTtcclxuXHJcbiAgICAgICAgZG9tUmVjdCA9ICQuZmFuY3lib3guZ2V0VHJhbnNsYXRlKCRjb250ZW50KTtcclxuXHJcbiAgICAgICAgc3RhcnQgPSB7XHJcbiAgICAgICAgICB0b3A6IGRvbVJlY3QudG9wLFxyXG4gICAgICAgICAgbGVmdDogZG9tUmVjdC5sZWZ0LFxyXG4gICAgICAgICAgc2NhbGVYOiBkb21SZWN0LndpZHRoIC8gZW5kLndpZHRoLFxyXG4gICAgICAgICAgc2NhbGVZOiBkb21SZWN0LmhlaWdodCAvIGVuZC5oZWlnaHQsXHJcbiAgICAgICAgICB3aWR0aDogZW5kLndpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OiBlbmQuaGVpZ2h0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byBhbmltYXRlIG9wYWNpdHlcclxuICAgICAgICBvcGFjaXR5ID0gY3VycmVudC5vcHRzLnpvb21PcGFjaXR5O1xyXG5cclxuICAgICAgICBpZiAob3BhY2l0eSA9PSBcImF1dG9cIikge1xyXG4gICAgICAgICAgb3BhY2l0eSA9IE1hdGguYWJzKGN1cnJlbnQud2lkdGggLyBjdXJyZW50LmhlaWdodCAtIGVuZC53aWR0aCAvIGVuZC5oZWlnaHQpID4gMC4xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wYWNpdHkpIHtcclxuICAgICAgICAgIGVuZC5vcGFjaXR5ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQuZmFuY3lib3guc2V0VHJhbnNsYXRlKCRjb250ZW50LCBzdGFydCk7XHJcblxyXG4gICAgICAgIGZvcmNlUmVkcmF3KCRjb250ZW50KTtcclxuXHJcbiAgICAgICAgJC5mYW5jeWJveC5hbmltYXRlKCRjb250ZW50LCBlbmQsIGR1cmF0aW9uLCBkb25lKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChlZmZlY3QgJiYgZHVyYXRpb24pIHtcclxuICAgICAgICAvLyBJZiBza2lwIGFuaW1hdGlvblxyXG4gICAgICAgIGlmIChlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGRvbmUsIGR1cmF0aW9uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJC5mYW5jeWJveC5hbmltYXRlKFxyXG4gICAgICAgICAgICBjdXJyZW50LiRzbGlkZS5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1jdXJyZW50XCIpLFxyXG4gICAgICAgICAgICBcImZhbmN5Ym94LWFuaW1hdGVkIGZhbmN5Ym94LXNsaWRlLS1wcmV2aW91cyBmYW5jeWJveC1meC1cIiArIGVmZmVjdCxcclxuICAgICAgICAgICAgZHVyYXRpb24sXHJcbiAgICAgICAgICAgIGRvbmVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvbmUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEZpbmFsIGFkanVzdG1lbnRzIGFmdGVyIHJlbW92aW5nIHRoZSBpbnN0YW5jZVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgY2xlYW5VcDogZnVuY3Rpb24oZSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgJGJvZHkgPSAkKFwiYm9keVwiKSxcclxuICAgICAgICBpbnN0YW5jZSxcclxuICAgICAgICBzY3JvbGxUb3A7XHJcblxyXG4gICAgICBzZWxmLmN1cnJlbnQuJHNsaWRlLnRyaWdnZXIoXCJvblJlc2V0XCIpO1xyXG5cclxuICAgICAgc2VsZi4kcmVmcy5jb250YWluZXIuZW1wdHkoKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIHNlbGYudHJpZ2dlcihcImFmdGVyQ2xvc2VcIiwgZSk7XHJcblxyXG4gICAgICAvLyBQbGFjZSBiYWNrIGZvY3VzXHJcbiAgICAgIGlmIChzZWxmLiRsYXN0Rm9jdXMgJiYgISFzZWxmLmN1cnJlbnQub3B0cy5iYWNrRm9jdXMpIHtcclxuICAgICAgICBzZWxmLiRsYXN0Rm9jdXMudHJpZ2dlcihcImZvY3VzXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLmN1cnJlbnQgPSBudWxsO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUgYXJlIG90aGVyIGluc3RhbmNlc1xyXG4gICAgICBpbnN0YW5jZSA9ICQuZmFuY3lib3guZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAgIGlmIChpbnN0YW5jZSkge1xyXG4gICAgICAgIGluc3RhbmNlLmFjdGl2YXRlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJGJvZHkucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1hY3RpdmUgY29tcGVuc2F0ZS1mb3Itc2Nyb2xsYmFyXCIpO1xyXG5cclxuICAgICAgICAkKFwiI2ZhbmN5Ym94LXN0eWxlLW5vc2Nyb2xsXCIpLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENhbGwgY2FsbGJhY2sgYW5kIHRyaWdnZXIgYW4gZXZlbnRcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICB0cmlnZ2VyOiBmdW5jdGlvbihuYW1lLCBzbGlkZSkge1xyXG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXHJcbiAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgb2JqID0gc2xpZGUgJiYgc2xpZGUub3B0cyA/IHNsaWRlIDogc2VsZi5jdXJyZW50LFxyXG4gICAgICAgIHJlejtcclxuXHJcbiAgICAgIGlmIChvYmopIHtcclxuICAgICAgICBhcmdzLnVuc2hpZnQob2JqKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvYmogPSBzZWxmO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhcmdzLnVuc2hpZnQoc2VsZik7XHJcblxyXG4gICAgICBpZiAoJC5pc0Z1bmN0aW9uKG9iai5vcHRzW25hbWVdKSkge1xyXG4gICAgICAgIHJleiA9IG9iai5vcHRzW25hbWVdLmFwcGx5KG9iaiwgYXJncyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXogPT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlejtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG5hbWUgPT09IFwiYWZ0ZXJDbG9zZVwiIHx8ICFzZWxmLiRyZWZzKSB7XHJcbiAgICAgICAgJEQudHJpZ2dlcihuYW1lICsgXCIuZmJcIiwgYXJncyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VsZi4kcmVmcy5jb250YWluZXIudHJpZ2dlcihuYW1lICsgXCIuZmJcIiwgYXJncyk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gVXBkYXRlIGluZm9iYXIgdmFsdWVzLCBuYXZpZ2F0aW9uIGJ1dHRvbiBzdGF0ZXMgYW5kIHJldmVhbCBjYXB0aW9uXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICB1cGRhdGVDb250cm9sczogZnVuY3Rpb24oZm9yY2UpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIGN1cnJlbnQgPSBzZWxmLmN1cnJlbnQsXHJcbiAgICAgICAgaW5kZXggPSBjdXJyZW50LmluZGV4LFxyXG4gICAgICAgIGNhcHRpb24gPSBjdXJyZW50Lm9wdHMuY2FwdGlvbixcclxuICAgICAgICAkY29udGFpbmVyID0gc2VsZi4kcmVmcy5jb250YWluZXIsXHJcbiAgICAgICAgJGNhcHRpb24gPSBzZWxmLiRyZWZzLmNhcHRpb247XHJcblxyXG4gICAgICAvLyBSZWNhbGN1bGF0ZSBjb250ZW50IGRpbWVuc2lvbnNcclxuICAgICAgY3VycmVudC4kc2xpZGUudHJpZ2dlcihcInJlZnJlc2hcIik7XHJcblxyXG4gICAgICBzZWxmLiRjYXB0aW9uID0gY2FwdGlvbiAmJiBjYXB0aW9uLmxlbmd0aCA/ICRjYXB0aW9uLmh0bWwoY2FwdGlvbikgOiBudWxsO1xyXG5cclxuICAgICAgaWYgKCFzZWxmLmlzSGlkZGVuQ29udHJvbHMgJiYgIXNlbGYuaXNJZGxlKSB7XHJcbiAgICAgICAgc2VsZi5zaG93Q29udHJvbHMoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVXBkYXRlIGluZm8gYW5kIG5hdmlnYXRpb24gZWxlbWVudHNcclxuICAgICAgJGNvbnRhaW5lci5maW5kKFwiW2RhdGEtZmFuY3lib3gtY291bnRdXCIpLmh0bWwoc2VsZi5ncm91cC5sZW5ndGgpO1xyXG4gICAgICAkY29udGFpbmVyLmZpbmQoXCJbZGF0YS1mYW5jeWJveC1pbmRleF1cIikuaHRtbChpbmRleCArIDEpO1xyXG5cclxuICAgICAgJGNvbnRhaW5lci5maW5kKFwiW2RhdGEtZmFuY3lib3gtcHJldl1cIikudG9nZ2xlQ2xhc3MoXCJkaXNhYmxlZFwiLCAhY3VycmVudC5vcHRzLmxvb3AgJiYgaW5kZXggPD0gMCk7XHJcbiAgICAgICRjb250YWluZXIuZmluZChcIltkYXRhLWZhbmN5Ym94LW5leHRdXCIpLnRvZ2dsZUNsYXNzKFwiZGlzYWJsZWRcIiwgIWN1cnJlbnQub3B0cy5sb29wICYmIGluZGV4ID49IHNlbGYuZ3JvdXAubGVuZ3RoIC0gMSk7XHJcblxyXG4gICAgICBpZiAoY3VycmVudC50eXBlID09PSBcImltYWdlXCIpIHtcclxuICAgICAgICAvLyBSZS1lbmFibGUgYnV0dG9uczsgdXBkYXRlIGRvd25sb2FkIGJ1dHRvbiBzb3VyY2VcclxuICAgICAgICAkY29udGFpbmVyXHJcbiAgICAgICAgICAuZmluZChcIltkYXRhLWZhbmN5Ym94LXpvb21dXCIpXHJcbiAgICAgICAgICAuc2hvdygpXHJcbiAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgIC5maW5kKFwiW2RhdGEtZmFuY3lib3gtZG93bmxvYWRdXCIpXHJcbiAgICAgICAgICAuYXR0cihcImhyZWZcIiwgY3VycmVudC5vcHRzLmltYWdlLnNyYyB8fCBjdXJyZW50LnNyYylcclxuICAgICAgICAgIC5zaG93KCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudC5vcHRzLnRvb2xiYXIpIHtcclxuICAgICAgICAkY29udGFpbmVyLmZpbmQoXCJbZGF0YS1mYW5jeWJveC1kb3dubG9hZF0sW2RhdGEtZmFuY3lib3gtem9vbV1cIikuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEhpZGUgdG9vbGJhciBhbmQgY2FwdGlvblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgaGlkZUNvbnRyb2xzOiBmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5pc0hpZGRlbkNvbnRyb2xzID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRoaXMuJHJlZnMuY29udGFpbmVyLnJlbW92ZUNsYXNzKFwiZmFuY3lib3gtc2hvdy1pbmZvYmFyIGZhbmN5Ym94LXNob3ctdG9vbGJhciBmYW5jeWJveC1zaG93LWNhcHRpb24gZmFuY3lib3gtc2hvdy1uYXZcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dDb250cm9sczogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBvcHRzID0gc2VsZi5jdXJyZW50ID8gc2VsZi5jdXJyZW50Lm9wdHMgOiBzZWxmLm9wdHMsXHJcbiAgICAgICAgJGNvbnRhaW5lciA9IHNlbGYuJHJlZnMuY29udGFpbmVyO1xyXG5cclxuICAgICAgc2VsZi5pc0hpZGRlbkNvbnRyb2xzID0gZmFsc2U7XHJcbiAgICAgIHNlbGYuaWRsZVNlY29uZHNDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICRjb250YWluZXJcclxuICAgICAgICAudG9nZ2xlQ2xhc3MoXCJmYW5jeWJveC1zaG93LXRvb2xiYXJcIiwgISEob3B0cy50b29sYmFyICYmIG9wdHMuYnV0dG9ucykpXHJcbiAgICAgICAgLnRvZ2dsZUNsYXNzKFwiZmFuY3lib3gtc2hvdy1pbmZvYmFyXCIsICEhKG9wdHMuaW5mb2JhciAmJiBzZWxmLmdyb3VwLmxlbmd0aCA+IDEpKVxyXG4gICAgICAgIC50b2dnbGVDbGFzcyhcImZhbmN5Ym94LXNob3ctbmF2XCIsICEhKG9wdHMuYXJyb3dzICYmIHNlbGYuZ3JvdXAubGVuZ3RoID4gMSkpXHJcbiAgICAgICAgLnRvZ2dsZUNsYXNzKFwiZmFuY3lib3gtaXMtbW9kYWxcIiwgISFvcHRzLm1vZGFsKTtcclxuXHJcbiAgICAgIGlmIChzZWxmLiRjYXB0aW9uKSB7XHJcbiAgICAgICAgJGNvbnRhaW5lci5hZGRDbGFzcyhcImZhbmN5Ym94LXNob3ctY2FwdGlvbiBcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImZhbmN5Ym94LXNob3ctY2FwdGlvblwiKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBUb2dnbGUgdG9vbGJhciBhbmQgY2FwdGlvblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICB0b2dnbGVDb250cm9sczogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzSGlkZGVuQ29udHJvbHMpIHtcclxuICAgICAgICB0aGlzLnNob3dDb250cm9scygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaGlkZUNvbnRyb2xzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJC5mYW5jeWJveCA9IHtcclxuICAgIHZlcnNpb246IFwiMy4zLjVcIixcclxuICAgIGRlZmF1bHRzOiBkZWZhdWx0cyxcclxuXHJcbiAgICAvLyBHZXQgY3VycmVudCBpbnN0YW5jZSBhbmQgZXhlY3V0ZSBhIGNvbW1hbmQuXHJcbiAgICAvL1xyXG4gICAgLy8gRXhhbXBsZXMgb2YgdXNhZ2U6XHJcbiAgICAvL1xyXG4gICAgLy8gICAkaW5zdGFuY2UgPSAkLmZhbmN5Ym94LmdldEluc3RhbmNlKCk7XHJcbiAgICAvLyAgICQuZmFuY3lib3guZ2V0SW5zdGFuY2UoKS5qdW1wVG8oIDEgKTtcclxuICAgIC8vICAgJC5mYW5jeWJveC5nZXRJbnN0YW5jZSggJ2p1bXBUbycsIDEgKTtcclxuICAgIC8vICAgJC5mYW5jeWJveC5nZXRJbnN0YW5jZSggZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgICBjb25zb2xlLmluZm8oIHRoaXMuY3VyckluZGV4ICk7XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uKGNvbW1hbmQpIHtcclxuICAgICAgdmFyIGluc3RhbmNlID0gJCgnLmZhbmN5Ym94LWNvbnRhaW5lcjpub3QoXCIuZmFuY3lib3gtaXMtY2xvc2luZ1wiKTpsYXN0JykuZGF0YShcIkZhbmN5Qm94XCIpLFxyXG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG5cclxuICAgICAgaWYgKGluc3RhbmNlIGluc3RhbmNlb2YgRmFuY3lCb3gpIHtcclxuICAgICAgICBpZiAoJC50eXBlKGNvbW1hbmQpID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXS5hcHBseShpbnN0YW5jZSwgYXJncyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgkLnR5cGUoY29tbWFuZCkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgY29tbWFuZC5hcHBseShpbnN0YW5jZSwgYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ3JlYXRlIG5ldyBpbnN0YW5jZVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIG9wZW46IGZ1bmN0aW9uKGl0ZW1zLCBvcHRzLCBpbmRleCkge1xyXG4gICAgICByZXR1cm4gbmV3IEZhbmN5Qm94KGl0ZW1zLCBvcHRzLCBpbmRleCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENsb3NlIGN1cnJlbnQgb3IgYWxsIGluc3RhbmNlc1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgY2xvc2U6IGZ1bmN0aW9uKGFsbCkge1xyXG4gICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgICBpZiAoaW5zdGFuY2UpIHtcclxuICAgICAgICBpbnN0YW5jZS5jbG9zZSgpO1xyXG5cclxuICAgICAgICAvLyBUcnkgdG8gZmluZCBhbmQgY2xvc2UgbmV4dCBpbnN0YW5jZVxyXG5cclxuICAgICAgICBpZiAoYWxsID09PSB0cnVlKSB7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENsb3NlIGFsbCBpbnN0YW5jZXMgYW5kIHVuYmluZCBhbGwgZXZlbnRzXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLmNsb3NlKHRydWUpO1xyXG5cclxuICAgICAgJEQuYWRkKFwiYm9keVwiKS5vZmYoXCJjbGljay5mYi1zdGFydFwiLCBcIioqXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBUcnkgdG8gZGV0ZWN0IG1vYmlsZSBkZXZpY2VzXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgaXNNb2JpbGU6XHJcbiAgICAgIGRvY3VtZW50LmNyZWF0ZVRvdWNoICE9PSB1bmRlZmluZWQgJiYgL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLFxyXG5cclxuICAgIC8vIERldGVjdCBpZiAndHJhbnNsYXRlM2QnIHN1cHBvcnQgaXMgYXZhaWxhYmxlXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHVzZTNkOiAoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSAmJlxyXG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRpdikgJiZcclxuICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkaXYpLmdldFByb3BlcnR5VmFsdWUoXCJ0cmFuc2Zvcm1cIikgJiZcclxuICAgICAgICAhKGRvY3VtZW50LmRvY3VtZW50TW9kZSAmJiBkb2N1bWVudC5kb2N1bWVudE1vZGUgPCAxMSlcclxuICAgICAgKTtcclxuICAgIH0pKCksXHJcblxyXG4gICAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGdldCBjdXJyZW50IHZpc3VhbCBzdGF0ZSBvZiBhbiBlbGVtZW50XHJcbiAgICAvLyByZXR1cm5zIGFycmF5WyB0b3AsIGxlZnQsIGhvcml6b250YWwtc2NhbGUsIHZlcnRpY2FsLXNjYWxlLCBvcGFjaXR5IF1cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGdldFRyYW5zbGF0ZTogZnVuY3Rpb24oJGVsKSB7XHJcbiAgICAgIHZhciBkb21SZWN0O1xyXG5cclxuICAgICAgaWYgKCEkZWwgfHwgISRlbC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRvbVJlY3QgPSAkZWxbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvcDogZG9tUmVjdC50b3AgfHwgMCxcclxuICAgICAgICBsZWZ0OiBkb21SZWN0LmxlZnQgfHwgMCxcclxuICAgICAgICB3aWR0aDogZG9tUmVjdC53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGRvbVJlY3QuaGVpZ2h0LFxyXG4gICAgICAgIG9wYWNpdHk6IHBhcnNlRmxvYXQoJGVsLmNzcyhcIm9wYWNpdHlcIikpXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNob3J0Y3V0IGZvciBzZXR0aW5nIFwidHJhbnNsYXRlM2RcIiBwcm9wZXJ0aWVzIGZvciBlbGVtZW50XHJcbiAgICAvLyBDYW4gc2V0IGJlIHVzZWQgdG8gc2V0IG9wYWNpdHksIHRvb1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uKCRlbCwgcHJvcHMpIHtcclxuICAgICAgdmFyIHN0ciA9IFwiXCIsXHJcbiAgICAgICAgY3NzID0ge307XHJcblxyXG4gICAgICBpZiAoISRlbCB8fCAhcHJvcHMpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcm9wcy5sZWZ0ICE9PSB1bmRlZmluZWQgfHwgcHJvcHMudG9wICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdHIgPVxyXG4gICAgICAgICAgKHByb3BzLmxlZnQgPT09IHVuZGVmaW5lZCA/ICRlbC5wb3NpdGlvbigpLmxlZnQgOiBwcm9wcy5sZWZ0KSArXHJcbiAgICAgICAgICBcInB4LCBcIiArXHJcbiAgICAgICAgICAocHJvcHMudG9wID09PSB1bmRlZmluZWQgPyAkZWwucG9zaXRpb24oKS50b3AgOiBwcm9wcy50b3ApICtcclxuICAgICAgICAgIFwicHhcIjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudXNlM2QpIHtcclxuICAgICAgICAgIHN0ciA9IFwidHJhbnNsYXRlM2QoXCIgKyBzdHIgKyBcIiwgMHB4KVwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdHIgPSBcInRyYW5zbGF0ZShcIiArIHN0ciArIFwiKVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHByb3BzLnNjYWxlWCAhPT0gdW5kZWZpbmVkICYmIHByb3BzLnNjYWxlWSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3RyID0gKHN0ci5sZW5ndGggPyBzdHIgKyBcIiBcIiA6IFwiXCIpICsgXCJzY2FsZShcIiArIHByb3BzLnNjYWxlWCArIFwiLCBcIiArIHByb3BzLnNjYWxlWSArIFwiKVwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc3RyLmxlbmd0aCkge1xyXG4gICAgICAgIGNzcy50cmFuc2Zvcm0gPSBzdHI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcm9wcy5vcGFjaXR5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjc3Mub3BhY2l0eSA9IHByb3BzLm9wYWNpdHk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcm9wcy53aWR0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY3NzLndpZHRoID0gcHJvcHMud2lkdGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcm9wcy5oZWlnaHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNzcy5oZWlnaHQgPSBwcm9wcy5oZWlnaHQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAkZWwuY3NzKGNzcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNpbXBsZSBDU1MgdHJhbnNpdGlvbiBoYW5kbGVyXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIGFuaW1hdGU6IGZ1bmN0aW9uKCRlbCwgdG8sIGR1cmF0aW9uLCBjYWxsYmFjaywgbGVhdmVBbmltYXRpb25OYW1lKSB7XHJcbiAgICAgIHZhciBmaW5hbCA9IGZhbHNlO1xyXG5cclxuICAgICAgaWYgKCQuaXNGdW5jdGlvbihkdXJhdGlvbikpIHtcclxuICAgICAgICBjYWxsYmFjayA9IGR1cmF0aW9uO1xyXG4gICAgICAgIGR1cmF0aW9uID0gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCEkLmlzUGxhaW5PYmplY3QodG8pKSB7XHJcbiAgICAgICAgJGVsLnJlbW92ZUF0dHIoXCJzdHlsZVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJC5mYW5jeWJveC5zdG9wKCRlbCk7XHJcblxyXG4gICAgICAkZWwub24odHJhbnNpdGlvbkVuZCwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIC8vIFNraXAgZXZlbnRzIGZyb20gY2hpbGQgZWxlbWVudHMgYW5kIHotaW5kZXggY2hhbmdlXHJcbiAgICAgICAgaWYgKGUgJiYgZS5vcmlnaW5hbEV2ZW50ICYmICghJGVsLmlzKGUub3JpZ2luYWxFdmVudC50YXJnZXQpIHx8IGUub3JpZ2luYWxFdmVudC5wcm9wZXJ0eU5hbWUgPT0gXCJ6LWluZGV4XCIpKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmZhbmN5Ym94LnN0b3AoJGVsKTtcclxuXHJcbiAgICAgICAgaWYgKGZpbmFsKSB7XHJcbiAgICAgICAgICAkLmZhbmN5Ym94LnNldFRyYW5zbGF0ZSgkZWwsIGZpbmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkLmlzUGxhaW5PYmplY3QodG8pKSB7XHJcbiAgICAgICAgICBpZiAobGVhdmVBbmltYXRpb25OYW1lID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAkZWwucmVtb3ZlQXR0cihcInN0eWxlXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAobGVhdmVBbmltYXRpb25OYW1lICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAkZWwucmVtb3ZlQ2xhc3ModG8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcclxuICAgICAgICAgIGNhbGxiYWNrKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoJC5pc051bWVyaWMoZHVyYXRpb24pKSB7XHJcbiAgICAgICAgJGVsLmNzcyhcInRyYW5zaXRpb24tZHVyYXRpb25cIiwgZHVyYXRpb24gKyBcIm1zXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTdGFydCBhbmltYXRpb24gYnkgY2hhbmdpbmcgQ1NTIHByb3BlcnRpZXMgb3IgY2xhc3MgbmFtZVxyXG4gICAgICBpZiAoJC5pc1BsYWluT2JqZWN0KHRvKSkge1xyXG4gICAgICAgIGlmICh0by5zY2FsZVggIT09IHVuZGVmaW5lZCAmJiB0by5zY2FsZVkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgZmluYWwgPSAkLmV4dGVuZCh7fSwgdG8sIHtcclxuICAgICAgICAgICAgd2lkdGg6ICRlbC53aWR0aCgpICogdG8uc2NhbGVYLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICRlbC5oZWlnaHQoKSAqIHRvLnNjYWxlWSxcclxuICAgICAgICAgICAgc2NhbGVYOiAxLFxyXG4gICAgICAgICAgICBzY2FsZVk6IDFcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGRlbGV0ZSB0by53aWR0aDtcclxuICAgICAgICAgIGRlbGV0ZSB0by5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgaWYgKCRlbC5wYXJlbnQoKS5oYXNDbGFzcyhcImZhbmN5Ym94LXNsaWRlLS1pbWFnZVwiKSkge1xyXG4gICAgICAgICAgICAkZWwucGFyZW50KCkuYWRkQ2xhc3MoXCJmYW5jeWJveC1pcy1zY2FsaW5nXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5mYW5jeWJveC5zZXRUcmFuc2xhdGUoJGVsLCB0byk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJGVsLmFkZENsYXNzKHRvKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgYHRyYW5zaXRpb25lbmRgIGNhbGxiYWNrIGdldHMgZmlyZWRcclxuICAgICAgJGVsLmRhdGEoXHJcbiAgICAgICAgXCJ0aW1lclwiLFxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAkZWwudHJpZ2dlcihcInRyYW5zaXRpb25lbmRcIik7XHJcbiAgICAgICAgfSwgZHVyYXRpb24gKyAxNilcclxuICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDogZnVuY3Rpb24oJGVsKSB7XHJcbiAgICAgIGlmICgkZWwgJiYgJGVsLmxlbmd0aCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCgkZWwuZGF0YShcInRpbWVyXCIpKTtcclxuXHJcbiAgICAgICAgJGVsLm9mZihcInRyYW5zaXRpb25lbmRcIikuY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLCBcIlwiKTtcclxuXHJcbiAgICAgICAgJGVsLnBhcmVudCgpLnJlbW92ZUNsYXNzKFwiZmFuY3lib3gtaXMtc2NhbGluZ1wiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIERlZmF1bHQgY2xpY2sgaGFuZGxlciBmb3IgXCJmYW5jeWJveGVkXCIgbGlua3NcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICBmdW5jdGlvbiBfcnVuKGUsIG9wdHMpIHtcclxuICAgIHZhciBpdGVtcyA9IFtdLFxyXG4gICAgICBpbmRleCA9IDAsXHJcbiAgICAgICR0YXJnZXQsXHJcbiAgICAgIHZhbHVlO1xyXG5cclxuICAgIC8vIEF2b2lkIG9wZW5pbmcgbXVsdGlwbGUgdGltZXNcclxuICAgIGlmIChlICYmIGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBvcHRzID0gZSAmJiBlLmRhdGEgPyBlLmRhdGEub3B0aW9ucyA6IG9wdHMgfHwge307XHJcblxyXG4gICAgJHRhcmdldCA9IG9wdHMuJHRhcmdldCB8fCAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICB2YWx1ZSA9ICR0YXJnZXQuYXR0cihcImRhdGEtZmFuY3lib3hcIikgfHwgXCJcIjtcclxuXHJcbiAgICAvLyBHZXQgYWxsIHJlbGF0ZWQgaXRlbXMgYW5kIGZpbmQgaW5kZXggZm9yIGNsaWNrZWQgb25lXHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgaXRlbXMgPSBvcHRzLnNlbGVjdG9yID8gJChvcHRzLnNlbGVjdG9yKSA6IGUuZGF0YSA/IGUuZGF0YS5pdGVtcyA6IFtdO1xyXG4gICAgICBpdGVtcyA9IGl0ZW1zLmxlbmd0aCA/IGl0ZW1zLmZpbHRlcignW2RhdGEtZmFuY3lib3g9XCInICsgdmFsdWUgKyAnXCJdJykgOiAkKCdbZGF0YS1mYW5jeWJveD1cIicgKyB2YWx1ZSArICdcIl0nKTtcclxuXHJcbiAgICAgIGluZGV4ID0gaXRlbXMuaW5kZXgoJHRhcmdldCk7XHJcblxyXG4gICAgICAvLyBTb21ldGltZXMgY3VycmVudCBpdGVtIGNhbiBub3QgYmUgZm91bmQgKGZvciBleGFtcGxlLCBpZiBzb21lIHNjcmlwdCBjbG9uZXMgaXRlbXMpXHJcbiAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW1zID0gWyR0YXJnZXRdO1xyXG4gICAgfVxyXG5cclxuICAgICQuZmFuY3lib3gub3BlbihpdGVtcywgb3B0cywgaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ3JlYXRlIGEgalF1ZXJ5IHBsdWdpblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgJC5mbi5mYW5jeWJveCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgIHZhciBzZWxlY3RvcjtcclxuXHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIHNlbGVjdG9yID0gb3B0aW9ucy5zZWxlY3RvciB8fCBmYWxzZTtcclxuXHJcbiAgICBpZiAoc2VsZWN0b3IpIHtcclxuICAgICAgLy8gVXNlIGJvZHkgZWxlbWVudCBpbnN0ZWFkIG9mIGRvY3VtZW50IHNvIGl0IGV4ZWN1dGVzIGZpcnN0XHJcbiAgICAgICQoXCJib2R5XCIpXHJcbiAgICAgICAgLm9mZihcImNsaWNrLmZiLXN0YXJ0XCIsIHNlbGVjdG9yKVxyXG4gICAgICAgIC5vbihcImNsaWNrLmZiLXN0YXJ0XCIsIHNlbGVjdG9yLCB7b3B0aW9uczogb3B0aW9uc30sIF9ydW4pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vZmYoXCJjbGljay5mYi1zdGFydFwiKS5vbihcclxuICAgICAgICBcImNsaWNrLmZiLXN0YXJ0XCIsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaXRlbXM6IHRoaXMsXHJcbiAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfcnVuXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gU2VsZiBpbml0aWFsaXppbmcgcGx1Z2luIGZvciBhbGwgZWxlbWVudHMgaGF2aW5nIGBkYXRhLWZhbmN5Ym94YCBhdHRyaWJ1dGVcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAkRC5vbihcImNsaWNrLmZiLXN0YXJ0XCIsIFwiW2RhdGEtZmFuY3lib3hdXCIsIF9ydW4pO1xyXG5cclxuICAvLyBFbmFibGUgXCJ0cmlnZ2VyIGVsZW1lbnRzXCJcclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICRELm9uKFwiY2xpY2suZmItc3RhcnRcIiwgXCJbZGF0YS10cmlnZ2VyXVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICBfcnVuKGUsIHtcclxuICAgICAgJHRhcmdldDogJCgnW2RhdGEtZmFuY3lib3g9XCInICsgJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJkYXRhLXRyaWdnZXJcIikgKyAnXCJdJykuZXEoJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJkYXRhLWluZGV4XCIpIHx8IDApLFxyXG4gICAgICAkdHJpZ2dlcjogJCh0aGlzKVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pKHdpbmRvdywgZG9jdW1lbnQsIHdpbmRvdy5qUXVlcnkgfHwgalF1ZXJ5KTtcclxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vL1xyXG4vLyBNZWRpYVxyXG4vLyBBZGRzIGFkZGl0aW9uYWwgbWVkaWEgdHlwZSBzdXBwb3J0XHJcbi8vXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbihmdW5jdGlvbigkKSB7XHJcbiAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gIC8vIEZvcm1hdHMgbWF0Y2hpbmcgdXJsIHRvIGZpbmFsIGZvcm1cclxuXHJcbiAgdmFyIGZvcm1hdCA9IGZ1bmN0aW9uKHVybCwgcmV6LCBwYXJhbXMpIHtcclxuICAgIGlmICghdXJsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwgXCJcIjtcclxuXHJcbiAgICBpZiAoJC50eXBlKHBhcmFtcykgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgcGFyYW1zID0gJC5wYXJhbShwYXJhbXMsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgICQuZWFjaChyZXosIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcclxuICAgICAgdXJsID0gdXJsLnJlcGxhY2UoXCIkXCIgKyBrZXksIHZhbHVlIHx8IFwiXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgdXJsICs9ICh1cmwuaW5kZXhPZihcIj9cIikgPiAwID8gXCImXCIgOiBcIj9cIikgKyBwYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHVybDtcclxuICB9O1xyXG5cclxuICAvLyBPYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGZvciBlYWNoIG1lZGlhIHR5cGVcclxuXHJcbiAgdmFyIGRlZmF1bHRzID0ge1xyXG4gICAgeW91dHViZToge1xyXG4gICAgICBtYXRjaGVyOiAvKHlvdXR1YmVcXC5jb218eW91dHVcXC5iZXx5b3V0dWJlXFwtbm9jb29raWVcXC5jb20pXFwvKHdhdGNoXFw/KC4qJik/dj18dlxcL3x1XFwvfGVtYmVkXFwvPyk/KHZpZGVvc2VyaWVzXFw/bGlzdD0oLiopfFtcXHctXXsxMX18XFw/bGlzdFR5cGU9KC4qKSZsaXN0PSguKikpKC4qKS9pLFxyXG4gICAgICBwYXJhbXM6IHtcclxuICAgICAgICBhdXRvcGxheTogMSxcclxuICAgICAgICBhdXRvaGlkZTogMSxcclxuICAgICAgICBmczogMSxcclxuICAgICAgICByZWw6IDAsXHJcbiAgICAgICAgaGQ6IDEsXHJcbiAgICAgICAgd21vZGU6IFwidHJhbnNwYXJlbnRcIixcclxuICAgICAgICBlbmFibGVqc2FwaTogMSxcclxuICAgICAgICBodG1sNTogMVxyXG4gICAgICB9LFxyXG4gICAgICBwYXJhbVBsYWNlOiA4LFxyXG4gICAgICB0eXBlOiBcImlmcmFtZVwiLFxyXG4gICAgICB1cmw6IFwiLy93d3cueW91dHViZS5jb20vZW1iZWQvJDRcIixcclxuICAgICAgdGh1bWI6IFwiLy9pbWcueW91dHViZS5jb20vdmkvJDQvaHFkZWZhdWx0LmpwZ1wiXHJcbiAgICB9LFxyXG5cclxuICAgIHZpbWVvOiB7XHJcbiAgICAgIG1hdGNoZXI6IC9eLit2aW1lby5jb21cXC8oLipcXC8pPyhbXFxkXSspKC4qKT8vLFxyXG4gICAgICBwYXJhbXM6IHtcclxuICAgICAgICBhdXRvcGxheTogMSxcclxuICAgICAgICBoZDogMSxcclxuICAgICAgICBzaG93X3RpdGxlOiAxLFxyXG4gICAgICAgIHNob3dfYnlsaW5lOiAxLFxyXG4gICAgICAgIHNob3dfcG9ydHJhaXQ6IDAsXHJcbiAgICAgICAgZnVsbHNjcmVlbjogMSxcclxuICAgICAgICBhcGk6IDFcclxuICAgICAgfSxcclxuICAgICAgcGFyYW1QbGFjZTogMyxcclxuICAgICAgdHlwZTogXCJpZnJhbWVcIixcclxuICAgICAgdXJsOiBcIi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8kMlwiXHJcbiAgICB9LFxyXG5cclxuICAgIGluc3RhZ3JhbToge1xyXG4gICAgICBtYXRjaGVyOiAvKGluc3RhZ3JcXC5hbXxpbnN0YWdyYW1cXC5jb20pXFwvcFxcLyhbYS16QS1aMC05X1xcLV0rKVxcLz8vaSxcclxuICAgICAgdHlwZTogXCJpbWFnZVwiLFxyXG4gICAgICB1cmw6IFwiLy8kMS9wLyQyL21lZGlhLz9zaXplPWxcIlxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBFeGFtcGxlczpcclxuICAgIC8vIGh0dHA6Ly9tYXBzLmdvb2dsZS5jb20vP2xsPTQ4Ljg1Nzk5NSwyLjI5NDI5NyZzcG49MC4wMDc2NjYsMC4wMjExMzYmdD1tJno9MTZcclxuICAgIC8vIGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9AMzcuNzg1MjAwNiwtMTIyLjQxNDYzNTUsMTQuNjV6XHJcbiAgICAvLyBodHRwczovL3d3dy5nb29nbGUuY29tL21hcHMvQDUyLjIxMTExMjMsMi45MjM3NTQyLDYuNjF6P2hsPWVuXHJcbiAgICAvLyBodHRwczovL3d3dy5nb29nbGUuY29tL21hcHMvcGxhY2UvR29vZ2xlcGxleC9AMzcuNDIyMDA0MSwtMTIyLjA4MzM0OTQsMTd6L2RhdGE9ITRtNSEzbTQhMXMweDA6MHg2YzI5NmM2NjYxOTM2N2UwIThtMiEzZDM3LjQyMTk5OTghNGQtMTIyLjA4NDA1NzJcclxuICAgIGdtYXBfcGxhY2U6IHtcclxuICAgICAgbWF0Y2hlcjogLyhtYXBzXFwuKT9nb29nbGVcXC4oW2Etel17MiwzfShcXC5bYS16XXsyfSk/KVxcLygoKG1hcHNcXC8ocGxhY2VcXC8oLiopXFwvKT9cXEAoLiopLChcXGQrLj9cXGQrPyl6KSl8KFxcP2xsPSkpKC4qKT8vaSxcclxuICAgICAgdHlwZTogXCJpZnJhbWVcIixcclxuICAgICAgdXJsOiBmdW5jdGlvbihyZXopIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgXCIvL21hcHMuZ29vZ2xlLlwiICtcclxuICAgICAgICAgIHJlelsyXSArXHJcbiAgICAgICAgICBcIi8/bGw9XCIgK1xyXG4gICAgICAgICAgKHJlels5XSA/IHJlels5XSArIFwiJno9XCIgKyBNYXRoLmZsb29yKHJlelsxMF0pICsgKHJlelsxMl0gPyByZXpbMTJdLnJlcGxhY2UoL15cXC8vLCBcIiZcIikgOiBcIlwiKSA6IHJlelsxMl0gKyBcIlwiKS5yZXBsYWNlKC9cXD8vLCBcIiZcIikgK1xyXG4gICAgICAgICAgXCImb3V0cHV0PVwiICtcclxuICAgICAgICAgIChyZXpbMTJdICYmIHJlelsxMl0uaW5kZXhPZihcImxheWVyPWNcIikgPiAwID8gXCJzdmVtYmVkXCIgOiBcImVtYmVkXCIpXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBFeGFtcGxlczpcclxuICAgIC8vIGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9zZWFyY2gvRW1waXJlK1N0YXRlK0J1aWxkaW5nL1xyXG4gICAgLy8gaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL3NlYXJjaC8/YXBpPTEmcXVlcnk9Y2VudHVyeWxpbmsrZmllbGRcclxuICAgIC8vIGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9zZWFyY2gvP2FwaT0xJnF1ZXJ5PTQ3LjU5NTE1MTgsLTEyMi4zMzE2MzkzXHJcbiAgICBnbWFwX3NlYXJjaDoge1xyXG4gICAgICBtYXRjaGVyOiAvKG1hcHNcXC4pP2dvb2dsZVxcLihbYS16XXsyLDN9KFxcLlthLXpdezJ9KT8pXFwvKG1hcHNcXC9zZWFyY2hcXC8pKC4qKS9pLFxyXG4gICAgICB0eXBlOiBcImlmcmFtZVwiLFxyXG4gICAgICB1cmw6IGZ1bmN0aW9uKHJleikge1xyXG4gICAgICAgIHJldHVybiBcIi8vbWFwcy5nb29nbGUuXCIgKyByZXpbMl0gKyBcIi9tYXBzP3E9XCIgKyByZXpbNV0ucmVwbGFjZShcInF1ZXJ5PVwiLCBcInE9XCIpLnJlcGxhY2UoXCJhcGk9MVwiLCBcIlwiKSArIFwiJm91dHB1dD1lbWJlZFwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgJChkb2N1bWVudCkub24oXCJvYmplY3ROZWVkc1R5cGUuZmJcIiwgZnVuY3Rpb24oZSwgaW5zdGFuY2UsIGl0ZW0pIHtcclxuICAgIHZhciB1cmwgPSBpdGVtLnNyYyB8fCBcIlwiLFxyXG4gICAgICB0eXBlID0gZmFsc2UsXHJcbiAgICAgIG1lZGlhLFxyXG4gICAgICB0aHVtYixcclxuICAgICAgcmV6LFxyXG4gICAgICBwYXJhbXMsXHJcbiAgICAgIHVybFBhcmFtcyxcclxuICAgICAgcGFyYW1PYmosXHJcbiAgICAgIHByb3ZpZGVyO1xyXG5cclxuICAgIG1lZGlhID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBpdGVtLm9wdHMubWVkaWEpO1xyXG5cclxuICAgIC8vIExvb2sgZm9yIGFueSBtYXRjaGluZyBtZWRpYSB0eXBlXHJcbiAgICAkLmVhY2gobWVkaWEsIGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSwgcHJvdmlkZXJPcHRzKSB7XHJcbiAgICAgIHJleiA9IHVybC5tYXRjaChwcm92aWRlck9wdHMubWF0Y2hlcik7XHJcblxyXG4gICAgICBpZiAoIXJleikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdHlwZSA9IHByb3ZpZGVyT3B0cy50eXBlO1xyXG4gICAgICBwcm92aWRlciA9IHByb3ZpZGVyTmFtZTtcclxuICAgICAgcGFyYW1PYmogPSB7fTtcclxuXHJcbiAgICAgIGlmIChwcm92aWRlck9wdHMucGFyYW1QbGFjZSAmJiByZXpbcHJvdmlkZXJPcHRzLnBhcmFtUGxhY2VdKSB7XHJcbiAgICAgICAgdXJsUGFyYW1zID0gcmV6W3Byb3ZpZGVyT3B0cy5wYXJhbVBsYWNlXTtcclxuXHJcbiAgICAgICAgaWYgKHVybFBhcmFtc1swXSA9PSBcIj9cIikge1xyXG4gICAgICAgICAgdXJsUGFyYW1zID0gdXJsUGFyYW1zLnN1YnN0cmluZygxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVybFBhcmFtcyA9IHVybFBhcmFtcy5zcGxpdChcIiZcIik7XHJcblxyXG4gICAgICAgIGZvciAodmFyIG0gPSAwOyBtIDwgdXJsUGFyYW1zLmxlbmd0aDsgKyttKSB7XHJcbiAgICAgICAgICB2YXIgcCA9IHVybFBhcmFtc1ttXS5zcGxpdChcIj1cIiwgMik7XHJcblxyXG4gICAgICAgICAgaWYgKHAubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgcGFyYW1PYmpbcFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocFsxXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBhcmFtcyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBwcm92aWRlck9wdHMucGFyYW1zLCBpdGVtLm9wdHNbcHJvdmlkZXJOYW1lXSwgcGFyYW1PYmopO1xyXG5cclxuICAgICAgdXJsID1cclxuICAgICAgICAkLnR5cGUocHJvdmlkZXJPcHRzLnVybCkgPT09IFwiZnVuY3Rpb25cIiA/IHByb3ZpZGVyT3B0cy51cmwuY2FsbCh0aGlzLCByZXosIHBhcmFtcywgaXRlbSkgOiBmb3JtYXQocHJvdmlkZXJPcHRzLnVybCwgcmV6LCBwYXJhbXMpO1xyXG5cclxuICAgICAgdGh1bWIgPVxyXG4gICAgICAgICQudHlwZShwcm92aWRlck9wdHMudGh1bWIpID09PSBcImZ1bmN0aW9uXCIgPyBwcm92aWRlck9wdHMudGh1bWIuY2FsbCh0aGlzLCByZXosIHBhcmFtcywgaXRlbSkgOiBmb3JtYXQocHJvdmlkZXJPcHRzLnRodW1iLCByZXopO1xyXG5cclxuICAgICAgaWYgKHByb3ZpZGVyTmFtZSA9PT0gXCJ5b3V0dWJlXCIpIHtcclxuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvJnQ9KChcXGQrKW0pPyhcXGQrKXMvLCBmdW5jdGlvbihtYXRjaCwgcDEsIG0sIHMpIHtcclxuICAgICAgICAgIHJldHVybiBcIiZzdGFydD1cIiArICgobSA/IHBhcnNlSW50KG0sIDEwKSAqIDYwIDogMCkgKyBwYXJzZUludChzLCAxMCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKHByb3ZpZGVyTmFtZSA9PT0gXCJ2aW1lb1wiKSB7XHJcbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoXCImJTIzXCIsIFwiI1wiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSWYgaXQgaXMgZm91bmQsIHRoZW4gY2hhbmdlIGNvbnRlbnQgdHlwZSBhbmQgdXBkYXRlIHRoZSB1cmxcclxuXHJcbiAgICBpZiAodHlwZSkge1xyXG4gICAgICBpZiAoIWl0ZW0ub3B0cy50aHVtYiAmJiAhKGl0ZW0ub3B0cy4kdGh1bWIgJiYgaXRlbS5vcHRzLiR0aHVtYi5sZW5ndGgpKSB7XHJcbiAgICAgICAgaXRlbS5vcHRzLnRodW1iID0gdGh1bWI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlID09PSBcImlmcmFtZVwiKSB7XHJcbiAgICAgICAgaXRlbS5vcHRzID0gJC5leHRlbmQodHJ1ZSwgaXRlbS5vcHRzLCB7XHJcbiAgICAgICAgICBpZnJhbWU6IHtcclxuICAgICAgICAgICAgcHJlbG9hZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgICBzY3JvbGxpbmc6IFwibm9cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICQuZXh0ZW5kKGl0ZW0sIHtcclxuICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgIHNyYzogdXJsLFxyXG4gICAgICAgIG9yaWdTcmM6IGl0ZW0uc3JjLFxyXG4gICAgICAgIGNvbnRlbnRTb3VyY2U6IHByb3ZpZGVyLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiB0eXBlID09PSBcImltYWdlXCIgPyBcImltYWdlXCIgOiBwcm92aWRlciA9PSBcImdtYXBfcGxhY2VcIiB8fCBwcm92aWRlciA9PSBcImdtYXBfc2VhcmNoXCIgPyBcIm1hcFwiIDogXCJ2aWRlb1wiXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmICh1cmwpIHtcclxuICAgICAgaXRlbS50eXBlID0gaXRlbS5vcHRzLmRlZmF1bHRUeXBlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KSh3aW5kb3cualF1ZXJ5IHx8IGpRdWVyeSk7XHJcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy9cclxuLy8gR3Vlc3R1cmVzXHJcbi8vIEFkZHMgdG91Y2ggZ3Vlc3R1cmVzLCBoYW5kbGVzIGNsaWNrIGFuZCB0YXAgZXZlbnRzXHJcbi8vXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCAkKSB7XHJcbiAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gIHZhciByZXF1ZXN0QUZyYW1lID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgLy8gaWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBzZXRUaW1lb3V0XHJcbiAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBjYW5jZWxBRnJhbWUgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgIHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICB3aW5kb3cub0NhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgIGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChpZCk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfSkoKTtcclxuXHJcbiAgdmFyIGdldFBvaW50ZXJYWSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciByZXN1bHQgPSBbXTtcclxuXHJcbiAgICBlID0gZS5vcmlnaW5hbEV2ZW50IHx8IGUgfHwgd2luZG93LmU7XHJcbiAgICBlID0gZS50b3VjaGVzICYmIGUudG91Y2hlcy5sZW5ndGggPyBlLnRvdWNoZXMgOiBlLmNoYW5nZWRUb3VjaGVzICYmIGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID8gZS5jaGFuZ2VkVG91Y2hlcyA6IFtlXTtcclxuXHJcbiAgICBmb3IgKHZhciBrZXkgaW4gZSkge1xyXG4gICAgICBpZiAoZVtrZXldLnBhZ2VYKSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2goe1xyXG4gICAgICAgICAgeDogZVtrZXldLnBhZ2VYLFxyXG4gICAgICAgICAgeTogZVtrZXldLnBhZ2VZXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZVtrZXldLmNsaWVudFgpIHtcclxuICAgICAgICByZXN1bHQucHVzaCh7XHJcbiAgICAgICAgICB4OiBlW2tleV0uY2xpZW50WCxcclxuICAgICAgICAgIHk6IGVba2V5XS5jbGllbnRZXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH07XHJcblxyXG4gIHZhciBkaXN0YW5jZSA9IGZ1bmN0aW9uKHBvaW50MiwgcG9pbnQxLCB3aGF0KSB7XHJcbiAgICBpZiAoIXBvaW50MSB8fCAhcG9pbnQyKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aGF0ID09PSBcInhcIikge1xyXG4gICAgICByZXR1cm4gcG9pbnQyLnggLSBwb2ludDEueDtcclxuICAgIH0gZWxzZSBpZiAod2hhdCA9PT0gXCJ5XCIpIHtcclxuICAgICAgcmV0dXJuIHBvaW50Mi55IC0gcG9pbnQxLnk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyhwb2ludDIueCAtIHBvaW50MS54LCAyKSArIE1hdGgucG93KHBvaW50Mi55IC0gcG9pbnQxLnksIDIpKTtcclxuICB9O1xyXG5cclxuICB2YXIgaXNDbGlja2FibGUgPSBmdW5jdGlvbigkZWwpIHtcclxuICAgIGlmIChcclxuICAgICAgJGVsLmlzKCdhLGFyZWEsYnV0dG9uLFtyb2xlPVwiYnV0dG9uXCJdLGlucHV0LGxhYmVsLHNlbGVjdCxzdW1tYXJ5LHRleHRhcmVhLHZpZGVvLGF1ZGlvJykgfHxcclxuICAgICAgJC5pc0Z1bmN0aW9uKCRlbC5nZXQoMCkub25jbGljaykgfHxcclxuICAgICAgJGVsLmRhdGEoXCJzZWxlY3RhYmxlXCIpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgZm9yIGF0dHJpYnV0ZXMgbGlrZSBkYXRhLWZhbmN5Ym94LW5leHQgb3IgZGF0YS1mYW5jeWJveC1jbG9zZVxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGF0dHMgPSAkZWxbMF0uYXR0cmlidXRlcywgbiA9IGF0dHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgIGlmIChhdHRzW2ldLm5vZGVOYW1lLnN1YnN0cigwLCAxNCkgPT09IFwiZGF0YS1mYW5jeWJveC1cIikge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIHZhciBoYXNTY3JvbGxiYXJzID0gZnVuY3Rpb24oZWwpIHtcclxuICAgIHZhciBvdmVyZmxvd1kgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbClbXCJvdmVyZmxvdy15XCJdLFxyXG4gICAgICBvdmVyZmxvd1ggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbClbXCJvdmVyZmxvdy14XCJdLFxyXG4gICAgICB2ZXJ0aWNhbCA9IChvdmVyZmxvd1kgPT09IFwic2Nyb2xsXCIgfHwgb3ZlcmZsb3dZID09PSBcImF1dG9cIikgJiYgZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0LFxyXG4gICAgICBob3Jpem9udGFsID0gKG92ZXJmbG93WCA9PT0gXCJzY3JvbGxcIiB8fCBvdmVyZmxvd1ggPT09IFwiYXV0b1wiKSAmJiBlbC5zY3JvbGxXaWR0aCA+IGVsLmNsaWVudFdpZHRoO1xyXG5cclxuICAgIHJldHVybiB2ZXJ0aWNhbCB8fCBob3Jpem9udGFsO1xyXG4gIH07XHJcblxyXG4gIHZhciBpc1Njcm9sbGFibGUgPSBmdW5jdGlvbigkZWwpIHtcclxuICAgIHZhciByZXogPSBmYWxzZTtcclxuXHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICByZXogPSBoYXNTY3JvbGxiYXJzKCRlbC5nZXQoMCkpO1xyXG5cclxuICAgICAgaWYgKHJleikge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkZWwgPSAkZWwucGFyZW50KCk7XHJcblxyXG4gICAgICBpZiAoISRlbC5sZW5ndGggfHwgJGVsLmhhc0NsYXNzKFwiZmFuY3lib3gtc3RhZ2VcIikgfHwgJGVsLmlzKFwiYm9keVwiKSkge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlejtcclxuICB9O1xyXG5cclxuICB2YXIgR3Vlc3R1cmVzID0gZnVuY3Rpb24oaW5zdGFuY2UpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICBzZWxmLmluc3RhbmNlID0gaW5zdGFuY2U7XHJcblxyXG4gICAgc2VsZi4kYmcgPSBpbnN0YW5jZS4kcmVmcy5iZztcclxuICAgIHNlbGYuJHN0YWdlID0gaW5zdGFuY2UuJHJlZnMuc3RhZ2U7XHJcbiAgICBzZWxmLiRjb250YWluZXIgPSBpbnN0YW5jZS4kcmVmcy5jb250YWluZXI7XHJcblxyXG4gICAgc2VsZi5kZXN0cm95KCk7XHJcblxyXG4gICAgc2VsZi4kY29udGFpbmVyLm9uKFwidG91Y2hzdGFydC5mYi50b3VjaCBtb3VzZWRvd24uZmIudG91Y2hcIiwgJC5wcm94eShzZWxmLCBcIm9udG91Y2hzdGFydFwiKSk7XHJcbiAgfTtcclxuXHJcbiAgR3Vlc3R1cmVzLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLiRjb250YWluZXIub2ZmKFwiLmZiLnRvdWNoXCIpO1xyXG4gIH07XHJcblxyXG4gIEd1ZXN0dXJlcy5wcm90b3R5cGUub250b3VjaHN0YXJ0ID0gZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAkdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcbiAgICAgIGluc3RhbmNlID0gc2VsZi5pbnN0YW5jZSxcclxuICAgICAgY3VycmVudCA9IGluc3RhbmNlLmN1cnJlbnQsXHJcbiAgICAgICRjb250ZW50ID0gY3VycmVudC4kY29udGVudCxcclxuICAgICAgaXNUb3VjaERldmljZSA9IGUudHlwZSA9PSBcInRvdWNoc3RhcnRcIjtcclxuXHJcbiAgICAvLyBEbyBub3QgcmVzcG9uZCB0byBib3RoICh0b3VjaCBhbmQgbW91c2UpIGV2ZW50c1xyXG4gICAgaWYgKGlzVG91Y2hEZXZpY2UpIHtcclxuICAgICAgc2VsZi4kY29udGFpbmVyLm9mZihcIm1vdXNlZG93bi5mYi50b3VjaFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZ25vcmUgcmlnaHQgY2xpY2tcclxuICAgIGlmIChlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LmJ1dHRvbiA9PSAyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZ25vcmUgdGFwaW5nIG9uIGxpbmtzLCBidXR0b25zLCBpbnB1dCBlbGVtZW50c1xyXG4gICAgaWYgKCEkdGFyZ2V0Lmxlbmd0aCB8fCBpc0NsaWNrYWJsZSgkdGFyZ2V0KSB8fCBpc0NsaWNrYWJsZSgkdGFyZ2V0LnBhcmVudCgpKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWdub3JlIGNsaWNrcyBvbiB0aGUgc2Nyb2xsYmFyXHJcbiAgICBpZiAoISR0YXJnZXQuaXMoXCJpbWdcIikgJiYgZS5vcmlnaW5hbEV2ZW50LmNsaWVudFggPiAkdGFyZ2V0WzBdLmNsaWVudFdpZHRoICsgJHRhcmdldC5vZmZzZXQoKS5sZWZ0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZ25vcmUgY2xpY2tzIHdoaWxlIHpvb21pbmcgb3IgY2xvc2luZ1xyXG4gICAgaWYgKCFjdXJyZW50IHx8IGluc3RhbmNlLmlzQW5pbWF0aW5nIHx8IGluc3RhbmNlLmlzQ2xvc2luZykge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZi5yZWFsUG9pbnRzID0gc2VsZi5zdGFydFBvaW50cyA9IGdldFBvaW50ZXJYWShlKTtcclxuXHJcbiAgICBpZiAoIXNlbGYuc3RhcnRQb2ludHMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIHNlbGYuc3RhcnRFdmVudCA9IGU7XHJcblxyXG4gICAgc2VsZi5jYW5UYXAgPSB0cnVlO1xyXG4gICAgc2VsZi4kdGFyZ2V0ID0gJHRhcmdldDtcclxuICAgIHNlbGYuJGNvbnRlbnQgPSAkY29udGVudDtcclxuICAgIHNlbGYub3B0cyA9IGN1cnJlbnQub3B0cy50b3VjaDtcclxuXHJcbiAgICBzZWxmLmlzUGFubmluZyA9IGZhbHNlO1xyXG4gICAgc2VsZi5pc1N3aXBpbmcgPSBmYWxzZTtcclxuICAgIHNlbGYuaXNab29taW5nID0gZmFsc2U7XHJcbiAgICBzZWxmLmlzU2Nyb2xsaW5nID0gZmFsc2U7XHJcblxyXG4gICAgc2VsZi5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIHNlbGYuZGlzdGFuY2VYID0gc2VsZi5kaXN0YW5jZVkgPSBzZWxmLmRpc3RhbmNlID0gMDtcclxuXHJcbiAgICBzZWxmLmNhbnZhc1dpZHRoID0gTWF0aC5yb3VuZChjdXJyZW50LiRzbGlkZVswXS5jbGllbnRXaWR0aCk7XHJcbiAgICBzZWxmLmNhbnZhc0hlaWdodCA9IE1hdGgucm91bmQoY3VycmVudC4kc2xpZGVbMF0uY2xpZW50SGVpZ2h0KTtcclxuXHJcbiAgICBzZWxmLmNvbnRlbnRMYXN0UG9zID0gbnVsbDtcclxuICAgIHNlbGYuY29udGVudFN0YXJ0UG9zID0gJC5mYW5jeWJveC5nZXRUcmFuc2xhdGUoc2VsZi4kY29udGVudCkgfHwge3RvcDogMCwgbGVmdDogMH07XHJcbiAgICBzZWxmLnNsaWRlclN0YXJ0UG9zID0gc2VsZi5zbGlkZXJMYXN0UG9zIHx8ICQuZmFuY3lib3guZ2V0VHJhbnNsYXRlKGN1cnJlbnQuJHNsaWRlKTtcclxuXHJcbiAgICAvLyBTaW5jZSBwb3NpdGlvbiB3aWxsIGJlIGFic29sdXRlLCBidXQgd2UgbmVlZCB0byBtYWtlIGl0IHJlbGF0aXZlIHRvIHRoZSBzdGFnZVxyXG4gICAgc2VsZi5zdGFnZVBvcyA9ICQuZmFuY3lib3guZ2V0VHJhbnNsYXRlKGluc3RhbmNlLiRyZWZzLnN0YWdlKTtcclxuXHJcbiAgICBzZWxmLnNsaWRlclN0YXJ0UG9zLnRvcCAtPSBzZWxmLnN0YWdlUG9zLnRvcDtcclxuICAgIHNlbGYuc2xpZGVyU3RhcnRQb3MubGVmdCAtPSBzZWxmLnN0YWdlUG9zLmxlZnQ7XHJcblxyXG4gICAgc2VsZi5jb250ZW50U3RhcnRQb3MudG9wIC09IHNlbGYuc3RhZ2VQb3MudG9wO1xyXG4gICAgc2VsZi5jb250ZW50U3RhcnRQb3MubGVmdCAtPSBzZWxmLnN0YWdlUG9zLmxlZnQ7XHJcblxyXG4gICAgJChkb2N1bWVudClcclxuICAgICAgLm9mZihcIi5mYi50b3VjaFwiKVxyXG4gICAgICAub24oaXNUb3VjaERldmljZSA/IFwidG91Y2hlbmQuZmIudG91Y2ggdG91Y2hjYW5jZWwuZmIudG91Y2hcIiA6IFwibW91c2V1cC5mYi50b3VjaCBtb3VzZWxlYXZlLmZiLnRvdWNoXCIsICQucHJveHkoc2VsZiwgXCJvbnRvdWNoZW5kXCIpKVxyXG4gICAgICAub24oaXNUb3VjaERldmljZSA/IFwidG91Y2htb3ZlLmZiLnRvdWNoXCIgOiBcIm1vdXNlbW92ZS5mYi50b3VjaFwiLCAkLnByb3h5KHNlbGYsIFwib250b3VjaG1vdmVcIikpO1xyXG5cclxuICAgIGlmICgkLmZhbmN5Ym94LmlzTW9iaWxlKSB7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgc2VsZi5vbnNjcm9sbCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCEoc2VsZi5vcHRzIHx8IGluc3RhbmNlLmNhblBhbigpKSB8fCAhKCR0YXJnZXQuaXMoc2VsZi4kc3RhZ2UpIHx8IHNlbGYuJHN0YWdlLmZpbmQoJHRhcmdldCkubGVuZ3RoKSkge1xyXG4gICAgICBpZiAoJHRhcmdldC5pcyhcIi5mYW5jeWJveC1pbWFnZVwiKSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghKCQuZmFuY3lib3guaXNNb2JpbGUgJiYgKGlzU2Nyb2xsYWJsZSgkdGFyZ2V0KSB8fCBpc1Njcm9sbGFibGUoJHRhcmdldC5wYXJlbnQoKSkpKSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlbGYuc3RhcnRQb2ludHMubGVuZ3RoID09PSAxIHx8IGN1cnJlbnQuaGFzRXJyb3IpIHtcclxuICAgICAgaWYgKHNlbGYuaW5zdGFuY2UuY2FuUGFuKCkpIHtcclxuICAgICAgICAkLmZhbmN5Ym94LnN0b3Aoc2VsZi4kY29udGVudCk7XHJcblxyXG4gICAgICAgIHNlbGYuJGNvbnRlbnQuY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLCBcIlwiKTtcclxuXHJcbiAgICAgICAgc2VsZi5pc1Bhbm5pbmcgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlbGYuaXNTd2lwaW5nID0gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi4kY29udGFpbmVyLmFkZENsYXNzKFwiZmFuY3lib3gtY29udHJvbHMtLWlzR3JhYmJpbmdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlbGYuc3RhcnRQb2ludHMubGVuZ3RoID09PSAyICYmIGN1cnJlbnQudHlwZSA9PT0gXCJpbWFnZVwiICYmIChjdXJyZW50LmlzTG9hZGVkIHx8IGN1cnJlbnQuJGdob3N0KSkge1xyXG4gICAgICBzZWxmLmNhblRhcCA9IGZhbHNlO1xyXG4gICAgICBzZWxmLmlzU3dpcGluZyA9IGZhbHNlO1xyXG4gICAgICBzZWxmLmlzUGFubmluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgc2VsZi5pc1pvb21pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgJC5mYW5jeWJveC5zdG9wKHNlbGYuJGNvbnRlbnQpO1xyXG5cclxuICAgICAgc2VsZi4kY29udGVudC5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIFwiXCIpO1xyXG5cclxuICAgICAgc2VsZi5jZW50ZXJQb2ludFN0YXJ0WCA9IChzZWxmLnN0YXJ0UG9pbnRzWzBdLnggKyBzZWxmLnN0YXJ0UG9pbnRzWzFdLngpICogMC41IC0gJCh3aW5kb3cpLnNjcm9sbExlZnQoKTtcclxuICAgICAgc2VsZi5jZW50ZXJQb2ludFN0YXJ0WSA9IChzZWxmLnN0YXJ0UG9pbnRzWzBdLnkgKyBzZWxmLnN0YXJ0UG9pbnRzWzFdLnkpICogMC41IC0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgc2VsZi5wZXJjZW50YWdlT2ZJbWFnZUF0UGluY2hQb2ludFggPSAoc2VsZi5jZW50ZXJQb2ludFN0YXJ0WCAtIHNlbGYuY29udGVudFN0YXJ0UG9zLmxlZnQpIC8gc2VsZi5jb250ZW50U3RhcnRQb3Mud2lkdGg7XHJcbiAgICAgIHNlbGYucGVyY2VudGFnZU9mSW1hZ2VBdFBpbmNoUG9pbnRZID0gKHNlbGYuY2VudGVyUG9pbnRTdGFydFkgLSBzZWxmLmNvbnRlbnRTdGFydFBvcy50b3ApIC8gc2VsZi5jb250ZW50U3RhcnRQb3MuaGVpZ2h0O1xyXG5cclxuICAgICAgc2VsZi5zdGFydERpc3RhbmNlQmV0d2VlbkZpbmdlcnMgPSBkaXN0YW5jZShzZWxmLnN0YXJ0UG9pbnRzWzBdLCBzZWxmLnN0YXJ0UG9pbnRzWzFdKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBHdWVzdHVyZXMucHJvdG90eXBlLm9uc2Nyb2xsID0gZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHNlbGYuaXNTY3JvbGxpbmcgPSB0cnVlO1xyXG5cclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgc2VsZi5vbnNjcm9sbCwgdHJ1ZSk7XHJcbiAgfTtcclxuXHJcbiAgR3Vlc3R1cmVzLnByb3RvdHlwZS5vbnRvdWNobW92ZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgJHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuICAgIC8vIE1ha2Ugc3VyZSB1c2VyIGhhcyBub3QgcmVsZWFzZWQgb3ZlciBpZnJhbWUgb3IgZGlzYWJsZWQgZWxlbWVudFxyXG4gICAgaWYgKGUub3JpZ2luYWxFdmVudC5idXR0b25zICE9PSB1bmRlZmluZWQgJiYgZS5vcmlnaW5hbEV2ZW50LmJ1dHRvbnMgPT09IDApIHtcclxuICAgICAgc2VsZi5vbnRvdWNoZW5kKGUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlbGYuaXNTY3JvbGxpbmcgfHwgISgkdGFyZ2V0LmlzKHNlbGYuJHN0YWdlKSB8fCBzZWxmLiRzdGFnZS5maW5kKCR0YXJnZXQpLmxlbmd0aCkpIHtcclxuICAgICAgc2VsZi5jYW5UYXAgPSBmYWxzZTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZWxmLm5ld1BvaW50cyA9IGdldFBvaW50ZXJYWShlKTtcclxuXHJcbiAgICBpZiAoIShzZWxmLm9wdHMgfHwgc2VsZi5pbnN0YW5jZS5jYW5QYW4oKSkgfHwgIXNlbGYubmV3UG9pbnRzLmxlbmd0aCB8fCAhc2VsZi5uZXdQb2ludHMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIShzZWxmLmlzU3dpcGluZyAmJiBzZWxmLmlzU3dpcGluZyA9PT0gdHJ1ZSkpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGYuZGlzdGFuY2VYID0gZGlzdGFuY2Uoc2VsZi5uZXdQb2ludHNbMF0sIHNlbGYuc3RhcnRQb2ludHNbMF0sIFwieFwiKTtcclxuICAgIHNlbGYuZGlzdGFuY2VZID0gZGlzdGFuY2Uoc2VsZi5uZXdQb2ludHNbMF0sIHNlbGYuc3RhcnRQb2ludHNbMF0sIFwieVwiKTtcclxuXHJcbiAgICBzZWxmLmRpc3RhbmNlID0gZGlzdGFuY2Uoc2VsZi5uZXdQb2ludHNbMF0sIHNlbGYuc3RhcnRQb2ludHNbMF0pO1xyXG5cclxuICAgIC8vIFNraXAgZmFsc2Ugb250b3VjaG1vdmUgZXZlbnRzIChDaHJvbWUpXHJcbiAgICBpZiAoc2VsZi5kaXN0YW5jZSA+IDApIHtcclxuICAgICAgaWYgKHNlbGYuaXNTd2lwaW5nKSB7XHJcbiAgICAgICAgc2VsZi5vblN3aXBlKGUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHNlbGYuaXNQYW5uaW5nKSB7XHJcbiAgICAgICAgc2VsZi5vblBhbigpO1xyXG4gICAgICB9IGVsc2UgaWYgKHNlbGYuaXNab29taW5nKSB7XHJcbiAgICAgICAgc2VsZi5vblpvb20oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIEd1ZXN0dXJlcy5wcm90b3R5cGUub25Td2lwZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgc3dpcGluZyA9IHNlbGYuaXNTd2lwaW5nLFxyXG4gICAgICBsZWZ0ID0gc2VsZi5zbGlkZXJTdGFydFBvcy5sZWZ0IHx8IDAsXHJcbiAgICAgIGFuZ2xlO1xyXG5cclxuICAgIC8vIElmIGRpcmVjdGlvbiBpcyBub3QgeWV0IGRldGVybWluZWRcclxuICAgIGlmIChzd2lwaW5nID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIFdlIG5lZWQgYXQgbGVhc3QgMTBweCBkaXN0YW5jZSB0byBjb3JyZWN0bHkgY2FsY3VsYXRlIGFuIGFuZ2xlXHJcbiAgICAgIGlmIChNYXRoLmFicyhzZWxmLmRpc3RhbmNlKSA+IDEwKSB7XHJcbiAgICAgICAgc2VsZi5jYW5UYXAgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYuaW5zdGFuY2UuZ3JvdXAubGVuZ3RoIDwgMiAmJiBzZWxmLm9wdHMudmVydGljYWwpIHtcclxuICAgICAgICAgIHNlbGYuaXNTd2lwaW5nID0gXCJ5XCI7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWxmLmluc3RhbmNlLmlzRHJhZ2dpbmcgfHwgc2VsZi5vcHRzLnZlcnRpY2FsID09PSBmYWxzZSB8fCAoc2VsZi5vcHRzLnZlcnRpY2FsID09PSBcImF1dG9cIiAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDgwMCkpIHtcclxuICAgICAgICAgIHNlbGYuaXNTd2lwaW5nID0gXCJ4XCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFuZ2xlID0gTWF0aC5hYnMoTWF0aC5hdGFuMihzZWxmLmRpc3RhbmNlWSwgc2VsZi5kaXN0YW5jZVgpICogMTgwIC8gTWF0aC5QSSk7XHJcblxyXG4gICAgICAgICAgc2VsZi5pc1N3aXBpbmcgPSBhbmdsZSA+IDQ1ICYmIGFuZ2xlIDwgMTM1ID8gXCJ5XCIgOiBcInhcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuY2FuVGFwID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChzZWxmLmlzU3dpcGluZyA9PT0gXCJ5XCIgJiYgJC5mYW5jeWJveC5pc01vYmlsZSAmJiAoaXNTY3JvbGxhYmxlKHNlbGYuJHRhcmdldCkgfHwgaXNTY3JvbGxhYmxlKHNlbGYuJHRhcmdldC5wYXJlbnQoKSkpKSB7XHJcbiAgICAgICAgICBzZWxmLmlzU2Nyb2xsaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLmluc3RhbmNlLmlzRHJhZ2dpbmcgPSBzZWxmLmlzU3dpcGluZztcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgcG9pbnRzIHRvIGF2b2lkIGp1bXBpbmcsIGJlY2F1c2Ugd2UgZHJvcHBlZCBmaXJzdCBzd2lwZXMgdG8gY2FsY3VsYXRlIHRoZSBhbmdsZVxyXG4gICAgICAgIHNlbGYuc3RhcnRQb2ludHMgPSBzZWxmLm5ld1BvaW50cztcclxuXHJcbiAgICAgICAgJC5lYWNoKHNlbGYuaW5zdGFuY2Uuc2xpZGVzLCBmdW5jdGlvbihpbmRleCwgc2xpZGUpIHtcclxuICAgICAgICAgICQuZmFuY3lib3guc3RvcChzbGlkZS4kc2xpZGUpO1xyXG5cclxuICAgICAgICAgIHNsaWRlLiRzbGlkZS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIFwiXCIpO1xyXG5cclxuICAgICAgICAgIHNsaWRlLmluVHJhbnNpdGlvbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgIGlmIChzbGlkZS5wb3MgPT09IHNlbGYuaW5zdGFuY2UuY3VycmVudC5wb3MpIHtcclxuICAgICAgICAgICAgc2VsZi5zbGlkZXJTdGFydFBvcy5sZWZ0ID0gJC5mYW5jeWJveC5nZXRUcmFuc2xhdGUoc2xpZGUuJHNsaWRlKS5sZWZ0IC0gJC5mYW5jeWJveC5nZXRUcmFuc2xhdGUoc2VsZi5pbnN0YW5jZS4kcmVmcy5zdGFnZSkubGVmdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU3RvcCBzbGlkZXNob3dcclxuICAgICAgICBpZiAoc2VsZi5pbnN0YW5jZS5TbGlkZVNob3cgJiYgc2VsZi5pbnN0YW5jZS5TbGlkZVNob3cuaXNBY3RpdmUpIHtcclxuICAgICAgICAgIHNlbGYuaW5zdGFuY2UuU2xpZGVTaG93LnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTdGlja3kgZWRnZXNcclxuICAgIGlmIChzd2lwaW5nID09IFwieFwiKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBzZWxmLmRpc3RhbmNlWCA+IDAgJiZcclxuICAgICAgICAoc2VsZi5pbnN0YW5jZS5ncm91cC5sZW5ndGggPCAyIHx8IChzZWxmLmluc3RhbmNlLmN1cnJlbnQuaW5kZXggPT09IDAgJiYgIXNlbGYuaW5zdGFuY2UuY3VycmVudC5vcHRzLmxvb3ApKVxyXG4gICAgICApIHtcclxuICAgICAgICBsZWZ0ID0gbGVmdCArIE1hdGgucG93KHNlbGYuZGlzdGFuY2VYLCAwLjgpO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgIHNlbGYuZGlzdGFuY2VYIDwgMCAmJlxyXG4gICAgICAgIChzZWxmLmluc3RhbmNlLmdyb3VwLmxlbmd0aCA8IDIgfHxcclxuICAgICAgICAgIChzZWxmLmluc3RhbmNlLmN1cnJlbnQuaW5kZXggPT09IHNlbGYuaW5zdGFuY2UuZ3JvdXAubGVuZ3RoIC0gMSAmJiAhc2VsZi5pbnN0YW5jZS5jdXJyZW50Lm9wdHMubG9vcCkpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGxlZnQgPSBsZWZ0IC0gTWF0aC5wb3coLXNlbGYuZGlzdGFuY2VYLCAwLjgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxlZnQgPSBsZWZ0ICsgc2VsZi5kaXN0YW5jZVg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZWxmLnNsaWRlckxhc3RQb3MgPSB7XHJcbiAgICAgIHRvcDogc3dpcGluZyA9PSBcInhcIiA/IDAgOiBzZWxmLnNsaWRlclN0YXJ0UG9zLnRvcCArIHNlbGYuZGlzdGFuY2VZLFxyXG4gICAgICBsZWZ0OiBsZWZ0XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChzZWxmLnJlcXVlc3RJZCkge1xyXG4gICAgICBjYW5jZWxBRnJhbWUoc2VsZi5yZXF1ZXN0SWQpO1xyXG5cclxuICAgICAgc2VsZi5yZXF1ZXN0SWQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGYucmVxdWVzdElkID0gcmVxdWVzdEFGcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKHNlbGYuc2xpZGVyTGFzdFBvcykge1xyXG4gICAgICAgICQuZWFjaChzZWxmLmluc3RhbmNlLnNsaWRlcywgZnVuY3Rpb24oaW5kZXgsIHNsaWRlKSB7XHJcbiAgICAgICAgICB2YXIgcG9zID0gc2xpZGUucG9zIC0gc2VsZi5pbnN0YW5jZS5jdXJyUG9zO1xyXG5cclxuICAgICAgICAgICQuZmFuY3lib3guc2V0VHJhbnNsYXRlKHNsaWRlLiRzbGlkZSwge1xyXG4gICAgICAgICAgICB0b3A6IHNlbGYuc2xpZGVyTGFzdFBvcy50b3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IHNlbGYuc2xpZGVyTGFzdFBvcy5sZWZ0ICsgcG9zICogc2VsZi5jYW52YXNXaWR0aCArIHBvcyAqIHNsaWRlLm9wdHMuZ3V0dGVyXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VsZi4kY29udGFpbmVyLmFkZENsYXNzKFwiZmFuY3lib3gtaXMtc2xpZGluZ1wiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgR3Vlc3R1cmVzLnByb3RvdHlwZS5vblBhbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIC8vIFByZXZlbnQgYWNjaWRlbnRhbCBtb3ZlbWVudCAoc29tZXRpbWVzLCB3aGVuIHRhcHBpbmcgY2FzdWFsbHksIGZpbmdlciBjYW4gbW92ZSBhIGJpdClcclxuICAgIGlmIChkaXN0YW5jZShzZWxmLm5ld1BvaW50c1swXSwgc2VsZi5yZWFsUG9pbnRzWzBdKSA8ICgkLmZhbmN5Ym94LmlzTW9iaWxlID8gMTAgOiA1KSkge1xyXG4gICAgICBzZWxmLnN0YXJ0UG9pbnRzID0gc2VsZi5uZXdQb2ludHM7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZWxmLmNhblRhcCA9IGZhbHNlO1xyXG5cclxuICAgIHNlbGYuY29udGVudExhc3RQb3MgPSBzZWxmLmxpbWl0TW92ZW1lbnQoKTtcclxuXHJcbiAgICBpZiAoc2VsZi5yZXF1ZXN0SWQpIHtcclxuICAgICAgY2FuY2VsQUZyYW1lKHNlbGYucmVxdWVzdElkKTtcclxuXHJcbiAgICAgIHNlbGYucmVxdWVzdElkID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzZWxmLnJlcXVlc3RJZCA9IHJlcXVlc3RBRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICQuZmFuY3lib3guc2V0VHJhbnNsYXRlKHNlbGYuJGNvbnRlbnQsIHNlbGYuY29udGVudExhc3RQb3MpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gTWFrZSBwYW5uaW5nIHN0aWNreSB0byB0aGUgZWRnZXNcclxuICBHdWVzdHVyZXMucHJvdG90eXBlLmxpbWl0TW92ZW1lbnQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB2YXIgY2FudmFzV2lkdGggPSBzZWxmLmNhbnZhc1dpZHRoO1xyXG4gICAgdmFyIGNhbnZhc0hlaWdodCA9IHNlbGYuY2FudmFzSGVpZ2h0O1xyXG5cclxuICAgIHZhciBkaXN0YW5jZVggPSBzZWxmLmRpc3RhbmNlWDtcclxuICAgIHZhciBkaXN0YW5jZVkgPSBzZWxmLmRpc3RhbmNlWTtcclxuXHJcbiAgICB2YXIgY29udGVudFN0YXJ0UG9zID0gc2VsZi5jb250ZW50U3RhcnRQb3M7XHJcblxyXG4gICAgdmFyIGN1cnJlbnRPZmZzZXRYID0gY29udGVudFN0YXJ0UG9zLmxlZnQ7XHJcbiAgICB2YXIgY3VycmVudE9mZnNldFkgPSBjb250ZW50U3RhcnRQb3MudG9wO1xyXG5cclxuICAgIHZhciBjdXJyZW50V2lkdGggPSBjb250ZW50U3RhcnRQb3Mud2lkdGg7XHJcbiAgICB2YXIgY3VycmVudEhlaWdodCA9IGNvbnRlbnRTdGFydFBvcy5oZWlnaHQ7XHJcblxyXG4gICAgdmFyIG1pblRyYW5zbGF0ZVgsIG1pblRyYW5zbGF0ZVksIG1heFRyYW5zbGF0ZVgsIG1heFRyYW5zbGF0ZVksIG5ld09mZnNldFgsIG5ld09mZnNldFk7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRXaWR0aCA+IGNhbnZhc1dpZHRoKSB7XHJcbiAgICAgIG5ld09mZnNldFggPSBjdXJyZW50T2Zmc2V0WCArIGRpc3RhbmNlWDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5ld09mZnNldFggPSBjdXJyZW50T2Zmc2V0WDtcclxuICAgIH1cclxuXHJcbiAgICBuZXdPZmZzZXRZID0gY3VycmVudE9mZnNldFkgKyBkaXN0YW5jZVk7XHJcblxyXG4gICAgLy8gU2xvdyBkb3duIHByb3BvcnRpb25hbGx5IHRvIHRyYXZlbGVkIGRpc3RhbmNlXHJcbiAgICBtaW5UcmFuc2xhdGVYID0gTWF0aC5tYXgoMCwgY2FudmFzV2lkdGggKiAwLjUgLSBjdXJyZW50V2lkdGggKiAwLjUpO1xyXG4gICAgbWluVHJhbnNsYXRlWSA9IE1hdGgubWF4KDAsIGNhbnZhc0hlaWdodCAqIDAuNSAtIGN1cnJlbnRIZWlnaHQgKiAwLjUpO1xyXG5cclxuICAgIG1heFRyYW5zbGF0ZVggPSBNYXRoLm1pbihjYW52YXNXaWR0aCAtIGN1cnJlbnRXaWR0aCwgY2FudmFzV2lkdGggKiAwLjUgLSBjdXJyZW50V2lkdGggKiAwLjUpO1xyXG4gICAgbWF4VHJhbnNsYXRlWSA9IE1hdGgubWluKGNhbnZhc0hlaWdodCAtIGN1cnJlbnRIZWlnaHQsIGNhbnZhc0hlaWdodCAqIDAuNSAtIGN1cnJlbnRIZWlnaHQgKiAwLjUpO1xyXG5cclxuICAgIC8vICAgLT5cclxuICAgIGlmIChkaXN0YW5jZVggPiAwICYmIG5ld09mZnNldFggPiBtaW5UcmFuc2xhdGVYKSB7XHJcbiAgICAgIG5ld09mZnNldFggPSBtaW5UcmFuc2xhdGVYIC0gMSArIE1hdGgucG93KC1taW5UcmFuc2xhdGVYICsgY3VycmVudE9mZnNldFggKyBkaXN0YW5jZVgsIDAuOCkgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAgICA8LVxyXG4gICAgaWYgKGRpc3RhbmNlWCA8IDAgJiYgbmV3T2Zmc2V0WCA8IG1heFRyYW5zbGF0ZVgpIHtcclxuICAgICAgbmV3T2Zmc2V0WCA9IG1heFRyYW5zbGF0ZVggKyAxIC0gTWF0aC5wb3cobWF4VHJhbnNsYXRlWCAtIGN1cnJlbnRPZmZzZXRYIC0gZGlzdGFuY2VYLCAwLjgpIHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gICBcXC9cclxuICAgIGlmIChkaXN0YW5jZVkgPiAwICYmIG5ld09mZnNldFkgPiBtaW5UcmFuc2xhdGVZKSB7XHJcbiAgICAgIG5ld09mZnNldFkgPSBtaW5UcmFuc2xhdGVZIC0gMSArIE1hdGgucG93KC1taW5UcmFuc2xhdGVZICsgY3VycmVudE9mZnNldFkgKyBkaXN0YW5jZVksIDAuOCkgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAgIC9cXFxyXG4gICAgaWYgKGRpc3RhbmNlWSA8IDAgJiYgbmV3T2Zmc2V0WSA8IG1heFRyYW5zbGF0ZVkpIHtcclxuICAgICAgbmV3T2Zmc2V0WSA9IG1heFRyYW5zbGF0ZVkgKyAxIC0gTWF0aC5wb3cobWF4VHJhbnNsYXRlWSAtIGN1cnJlbnRPZmZzZXRZIC0gZGlzdGFuY2VZLCAwLjgpIHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdG9wOiBuZXdPZmZzZXRZLFxyXG4gICAgICBsZWZ0OiBuZXdPZmZzZXRYXHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIEd1ZXN0dXJlcy5wcm90b3R5cGUubGltaXRQb3NpdGlvbiA9IGZ1bmN0aW9uKG5ld09mZnNldFgsIG5ld09mZnNldFksIG5ld1dpZHRoLCBuZXdIZWlnaHQpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB2YXIgY2FudmFzV2lkdGggPSBzZWxmLmNhbnZhc1dpZHRoO1xyXG4gICAgdmFyIGNhbnZhc0hlaWdodCA9IHNlbGYuY2FudmFzSGVpZ2h0O1xyXG5cclxuICAgIGlmIChuZXdXaWR0aCA+IGNhbnZhc1dpZHRoKSB7XHJcbiAgICAgIG5ld09mZnNldFggPSBuZXdPZmZzZXRYID4gMCA/IDAgOiBuZXdPZmZzZXRYO1xyXG4gICAgICBuZXdPZmZzZXRYID0gbmV3T2Zmc2V0WCA8IGNhbnZhc1dpZHRoIC0gbmV3V2lkdGggPyBjYW52YXNXaWR0aCAtIG5ld1dpZHRoIDogbmV3T2Zmc2V0WDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIENlbnRlciBob3Jpem9udGFsbHlcclxuICAgICAgbmV3T2Zmc2V0WCA9IE1hdGgubWF4KDAsIGNhbnZhc1dpZHRoIC8gMiAtIG5ld1dpZHRoIC8gMik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5ld0hlaWdodCA+IGNhbnZhc0hlaWdodCkge1xyXG4gICAgICBuZXdPZmZzZXRZID0gbmV3T2Zmc2V0WSA+IDAgPyAwIDogbmV3T2Zmc2V0WTtcclxuICAgICAgbmV3T2Zmc2V0WSA9IG5ld09mZnNldFkgPCBjYW52YXNIZWlnaHQgLSBuZXdIZWlnaHQgPyBjYW52YXNIZWlnaHQgLSBuZXdIZWlnaHQgOiBuZXdPZmZzZXRZO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gQ2VudGVyIHZlcnRpY2FsbHlcclxuICAgICAgbmV3T2Zmc2V0WSA9IE1hdGgubWF4KDAsIGNhbnZhc0hlaWdodCAvIDIgLSBuZXdIZWlnaHQgLyAyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0b3A6IG5ld09mZnNldFksXHJcbiAgICAgIGxlZnQ6IG5ld09mZnNldFhcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgR3Vlc3R1cmVzLnByb3RvdHlwZS5vblpvb20gPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgY3VycmVudCBkaXN0YW5jZSBiZXR3ZWVuIHBvaW50cyB0byBnZXQgcGluY2ggcmF0aW8gYW5kIG5ldyB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICB2YXIgY29udGVudFN0YXJ0UG9zID0gc2VsZi5jb250ZW50U3RhcnRQb3M7XHJcblxyXG4gICAgdmFyIGN1cnJlbnRXaWR0aCA9IGNvbnRlbnRTdGFydFBvcy53aWR0aDtcclxuICAgIHZhciBjdXJyZW50SGVpZ2h0ID0gY29udGVudFN0YXJ0UG9zLmhlaWdodDtcclxuXHJcbiAgICB2YXIgY3VycmVudE9mZnNldFggPSBjb250ZW50U3RhcnRQb3MubGVmdDtcclxuICAgIHZhciBjdXJyZW50T2Zmc2V0WSA9IGNvbnRlbnRTdGFydFBvcy50b3A7XHJcblxyXG4gICAgdmFyIGVuZERpc3RhbmNlQmV0d2VlbkZpbmdlcnMgPSBkaXN0YW5jZShzZWxmLm5ld1BvaW50c1swXSwgc2VsZi5uZXdQb2ludHNbMV0pO1xyXG5cclxuICAgIHZhciBwaW5jaFJhdGlvID0gZW5kRGlzdGFuY2VCZXR3ZWVuRmluZ2VycyAvIHNlbGYuc3RhcnREaXN0YW5jZUJldHdlZW5GaW5nZXJzO1xyXG5cclxuICAgIHZhciBuZXdXaWR0aCA9IE1hdGguZmxvb3IoY3VycmVudFdpZHRoICogcGluY2hSYXRpbyk7XHJcbiAgICB2YXIgbmV3SGVpZ2h0ID0gTWF0aC5mbG9vcihjdXJyZW50SGVpZ2h0ICogcGluY2hSYXRpbyk7XHJcblxyXG4gICAgLy8gVGhpcyBpcyB0aGUgdHJhbnNsYXRpb24gZHVlIHRvIHBpbmNoLXpvb21pbmdcclxuICAgIHZhciB0cmFuc2xhdGVGcm9tWm9vbWluZ1ggPSAoY3VycmVudFdpZHRoIC0gbmV3V2lkdGgpICogc2VsZi5wZXJjZW50YWdlT2ZJbWFnZUF0UGluY2hQb2ludFg7XHJcbiAgICB2YXIgdHJhbnNsYXRlRnJvbVpvb21pbmdZID0gKGN1cnJlbnRIZWlnaHQgLSBuZXdIZWlnaHQpICogc2VsZi5wZXJjZW50YWdlT2ZJbWFnZUF0UGluY2hQb2ludFk7XHJcblxyXG4gICAgLy8gUG9pbnQgYmV0d2VlbiB0aGUgdHdvIHRvdWNoZXNcclxuICAgIHZhciBjZW50ZXJQb2ludEVuZFggPSAoc2VsZi5uZXdQb2ludHNbMF0ueCArIHNlbGYubmV3UG9pbnRzWzFdLngpIC8gMiAtICQod2luZG93KS5zY3JvbGxMZWZ0KCk7XHJcbiAgICB2YXIgY2VudGVyUG9pbnRFbmRZID0gKHNlbGYubmV3UG9pbnRzWzBdLnkgKyBzZWxmLm5ld1BvaW50c1sxXS55KSAvIDIgLSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgLy8gQW5kIHRoaXMgaXMgdGhlIHRyYW5zbGF0aW9uIGR1ZSB0byB0cmFuc2xhdGlvbiBvZiB0aGUgY2VudGVycG9pbnRcclxuICAgIC8vIGJldHdlZW4gdGhlIHR3byBmaW5nZXJzXHJcbiAgICB2YXIgdHJhbnNsYXRlRnJvbVRyYW5zbGF0aW5nWCA9IGNlbnRlclBvaW50RW5kWCAtIHNlbGYuY2VudGVyUG9pbnRTdGFydFg7XHJcbiAgICB2YXIgdHJhbnNsYXRlRnJvbVRyYW5zbGF0aW5nWSA9IGNlbnRlclBvaW50RW5kWSAtIHNlbGYuY2VudGVyUG9pbnRTdGFydFk7XHJcblxyXG4gICAgLy8gVGhlIG5ldyBvZmZzZXQgaXMgdGhlIG9sZC9jdXJyZW50IG9uZSBwbHVzIHRoZSB0b3RhbCB0cmFuc2xhdGlvblxyXG4gICAgdmFyIG5ld09mZnNldFggPSBjdXJyZW50T2Zmc2V0WCArICh0cmFuc2xhdGVGcm9tWm9vbWluZ1ggKyB0cmFuc2xhdGVGcm9tVHJhbnNsYXRpbmdYKTtcclxuICAgIHZhciBuZXdPZmZzZXRZID0gY3VycmVudE9mZnNldFkgKyAodHJhbnNsYXRlRnJvbVpvb21pbmdZICsgdHJhbnNsYXRlRnJvbVRyYW5zbGF0aW5nWSk7XHJcblxyXG4gICAgdmFyIG5ld1BvcyA9IHtcclxuICAgICAgdG9wOiBuZXdPZmZzZXRZLFxyXG4gICAgICBsZWZ0OiBuZXdPZmZzZXRYLFxyXG4gICAgICBzY2FsZVg6IHBpbmNoUmF0aW8sXHJcbiAgICAgIHNjYWxlWTogcGluY2hSYXRpb1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLmNhblRhcCA9IGZhbHNlO1xyXG5cclxuICAgIHNlbGYubmV3V2lkdGggPSBuZXdXaWR0aDtcclxuICAgIHNlbGYubmV3SGVpZ2h0ID0gbmV3SGVpZ2h0O1xyXG5cclxuICAgIHNlbGYuY29udGVudExhc3RQb3MgPSBuZXdQb3M7XHJcblxyXG4gICAgaWYgKHNlbGYucmVxdWVzdElkKSB7XHJcbiAgICAgIGNhbmNlbEFGcmFtZShzZWxmLnJlcXVlc3RJZCk7XHJcblxyXG4gICAgICBzZWxmLnJlcXVlc3RJZCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZi5yZXF1ZXN0SWQgPSByZXF1ZXN0QUZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAkLmZhbmN5Ym94LnNldFRyYW5zbGF0ZShzZWxmLiRjb250ZW50LCBzZWxmLmNvbnRlbnRMYXN0UG9zKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIEd1ZXN0dXJlcy5wcm90b3R5cGUub250b3VjaGVuZCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHZhciBkTXMgPSBNYXRoLm1heChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHNlbGYuc3RhcnRUaW1lLCAxKTtcclxuXHJcbiAgICB2YXIgc3dpcGluZyA9IHNlbGYuaXNTd2lwaW5nO1xyXG4gICAgdmFyIHBhbm5pbmcgPSBzZWxmLmlzUGFubmluZztcclxuICAgIHZhciB6b29taW5nID0gc2VsZi5pc1pvb21pbmc7XHJcbiAgICB2YXIgc2Nyb2xsaW5nID0gc2VsZi5pc1Njcm9sbGluZztcclxuXHJcbiAgICBzZWxmLmVuZFBvaW50cyA9IGdldFBvaW50ZXJYWShlKTtcclxuXHJcbiAgICBzZWxmLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1jb250cm9scy0taXNHcmFiYmluZ1wiKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vZmYoXCIuZmIudG91Y2hcIik7XHJcblxyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBzZWxmLm9uc2Nyb2xsLCB0cnVlKTtcclxuXHJcbiAgICBpZiAoc2VsZi5yZXF1ZXN0SWQpIHtcclxuICAgICAgY2FuY2VsQUZyYW1lKHNlbGYucmVxdWVzdElkKTtcclxuXHJcbiAgICAgIHNlbGYucmVxdWVzdElkID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzZWxmLmlzU3dpcGluZyA9IGZhbHNlO1xyXG4gICAgc2VsZi5pc1Bhbm5pbmcgPSBmYWxzZTtcclxuICAgIHNlbGYuaXNab29taW5nID0gZmFsc2U7XHJcbiAgICBzZWxmLmlzU2Nyb2xsaW5nID0gZmFsc2U7XHJcblxyXG4gICAgc2VsZi5pbnN0YW5jZS5pc0RyYWdnaW5nID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHNlbGYuY2FuVGFwKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLm9uVGFwKGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGYuc3BlZWQgPSAzNjY7XHJcblxyXG4gICAgLy8gU3BlZWQgaW4gcHgvbXNcclxuICAgIHNlbGYudmVsb2NpdHlYID0gc2VsZi5kaXN0YW5jZVggLyBkTXMgKiAwLjU7XHJcbiAgICBzZWxmLnZlbG9jaXR5WSA9IHNlbGYuZGlzdGFuY2VZIC8gZE1zICogMC41O1xyXG5cclxuICAgIHNlbGYuc3BlZWRYID0gTWF0aC5tYXgoc2VsZi5zcGVlZCAqIDAuNSwgTWF0aC5taW4oc2VsZi5zcGVlZCAqIDEuNSwgMSAvIE1hdGguYWJzKHNlbGYudmVsb2NpdHlYKSAqIHNlbGYuc3BlZWQpKTtcclxuXHJcbiAgICBpZiAocGFubmluZykge1xyXG4gICAgICBzZWxmLmVuZFBhbm5pbmcoKTtcclxuICAgIH0gZWxzZSBpZiAoem9vbWluZykge1xyXG4gICAgICBzZWxmLmVuZFpvb21pbmcoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNlbGYuZW5kU3dpcGluZyhzd2lwaW5nLCBzY3JvbGxpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybjtcclxuICB9O1xyXG5cclxuICBHdWVzdHVyZXMucHJvdG90eXBlLmVuZFN3aXBpbmcgPSBmdW5jdGlvbihzd2lwaW5nLCBzY3JvbGxpbmcpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgcmV0ID0gZmFsc2UsXHJcbiAgICAgIGxlbiA9IHNlbGYuaW5zdGFuY2UuZ3JvdXAubGVuZ3RoO1xyXG5cclxuICAgIHNlbGYuc2xpZGVyTGFzdFBvcyA9IG51bGw7XHJcblxyXG4gICAgLy8gQ2xvc2UgaWYgc3dpcGVkIHZlcnRpY2FsbHkgLyBuYXZpZ2F0ZSBpZiBob3Jpem9udGFsbHlcclxuICAgIGlmIChzd2lwaW5nID09IFwieVwiICYmICFzY3JvbGxpbmcgJiYgTWF0aC5hYnMoc2VsZi5kaXN0YW5jZVkpID4gNTApIHtcclxuICAgICAgLy8gQ29udGludWUgdmVydGljYWwgbW92ZW1lbnRcclxuICAgICAgJC5mYW5jeWJveC5hbmltYXRlKFxyXG4gICAgICAgIHNlbGYuaW5zdGFuY2UuY3VycmVudC4kc2xpZGUsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdG9wOiBzZWxmLnNsaWRlclN0YXJ0UG9zLnRvcCArIHNlbGYuZGlzdGFuY2VZICsgc2VsZi52ZWxvY2l0eVkgKiAxNTAsXHJcbiAgICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICAyMDBcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldCA9IHNlbGYuaW5zdGFuY2UuY2xvc2UodHJ1ZSwgMjAwKTtcclxuICAgIH0gZWxzZSBpZiAoc3dpcGluZyA9PSBcInhcIiAmJiBzZWxmLmRpc3RhbmNlWCA+IDUwICYmIGxlbiA+IDEpIHtcclxuICAgICAgcmV0ID0gc2VsZi5pbnN0YW5jZS5wcmV2aW91cyhzZWxmLnNwZWVkWCk7XHJcbiAgICB9IGVsc2UgaWYgKHN3aXBpbmcgPT0gXCJ4XCIgJiYgc2VsZi5kaXN0YW5jZVggPCAtNTAgJiYgbGVuID4gMSkge1xyXG4gICAgICByZXQgPSBzZWxmLmluc3RhbmNlLm5leHQoc2VsZi5zcGVlZFgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXQgPT09IGZhbHNlICYmIChzd2lwaW5nID09IFwieFwiIHx8IHN3aXBpbmcgPT0gXCJ5XCIpKSB7XHJcbiAgICAgIGlmIChzY3JvbGxpbmcgfHwgbGVuIDwgMikge1xyXG4gICAgICAgIHNlbGYuaW5zdGFuY2UuY2VudGVyU2xpZGUoc2VsZi5pbnN0YW5jZS5jdXJyZW50LCAxNTApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlbGYuaW5zdGFuY2UuanVtcFRvKHNlbGYuaW5zdGFuY2UuY3VycmVudC5pbmRleCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZWxmLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoXCJmYW5jeWJveC1pcy1zbGlkaW5nXCIpO1xyXG4gIH07XHJcblxyXG4gIC8vIExpbWl0IHBhbm5pbmcgZnJvbSBlZGdlc1xyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIEd1ZXN0dXJlcy5wcm90b3R5cGUuZW5kUGFubmluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdmFyIG5ld09mZnNldFgsIG5ld09mZnNldFksIG5ld1BvcztcclxuXHJcbiAgICBpZiAoIXNlbGYuY29udGVudExhc3RQb3MpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZWxmLm9wdHMubW9tZW50dW0gPT09IGZhbHNlKSB7XHJcbiAgICAgIG5ld09mZnNldFggPSBzZWxmLmNvbnRlbnRMYXN0UG9zLmxlZnQ7XHJcbiAgICAgIG5ld09mZnNldFkgPSBzZWxmLmNvbnRlbnRMYXN0UG9zLnRvcDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIENvbnRpbnVlIG1vdmVtZW50XHJcbiAgICAgIG5ld09mZnNldFggPSBzZWxmLmNvbnRlbnRMYXN0UG9zLmxlZnQgKyBzZWxmLnZlbG9jaXR5WCAqIHNlbGYuc3BlZWQ7XHJcbiAgICAgIG5ld09mZnNldFkgPSBzZWxmLmNvbnRlbnRMYXN0UG9zLnRvcCArIHNlbGYudmVsb2NpdHlZICogc2VsZi5zcGVlZDtcclxuICAgIH1cclxuXHJcbiAgICBuZXdQb3MgPSBzZWxmLmxpbWl0UG9zaXRpb24obmV3T2Zmc2V0WCwgbmV3T2Zmc2V0WSwgc2VsZi5jb250ZW50U3RhcnRQb3Mud2lkdGgsIHNlbGYuY29udGVudFN0YXJ0UG9zLmhlaWdodCk7XHJcblxyXG4gICAgbmV3UG9zLndpZHRoID0gc2VsZi5jb250ZW50U3RhcnRQb3Mud2lkdGg7XHJcbiAgICBuZXdQb3MuaGVpZ2h0ID0gc2VsZi5jb250ZW50U3RhcnRQb3MuaGVpZ2h0O1xyXG5cclxuICAgICQuZmFuY3lib3guYW5pbWF0ZShzZWxmLiRjb250ZW50LCBuZXdQb3MsIDMzMCk7XHJcbiAgfTtcclxuXHJcbiAgR3Vlc3R1cmVzLnByb3RvdHlwZS5lbmRab29taW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgdmFyIGN1cnJlbnQgPSBzZWxmLmluc3RhbmNlLmN1cnJlbnQ7XHJcblxyXG4gICAgdmFyIG5ld09mZnNldFgsIG5ld09mZnNldFksIG5ld1BvcywgcmVzZXQ7XHJcblxyXG4gICAgdmFyIG5ld1dpZHRoID0gc2VsZi5uZXdXaWR0aDtcclxuICAgIHZhciBuZXdIZWlnaHQgPSBzZWxmLm5ld0hlaWdodDtcclxuXHJcbiAgICBpZiAoIXNlbGYuY29udGVudExhc3RQb3MpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld09mZnNldFggPSBzZWxmLmNvbnRlbnRMYXN0UG9zLmxlZnQ7XHJcbiAgICBuZXdPZmZzZXRZID0gc2VsZi5jb250ZW50TGFzdFBvcy50b3A7XHJcblxyXG4gICAgcmVzZXQgPSB7XHJcbiAgICAgIHRvcDogbmV3T2Zmc2V0WSxcclxuICAgICAgbGVmdDogbmV3T2Zmc2V0WCxcclxuICAgICAgd2lkdGg6IG5ld1dpZHRoLFxyXG4gICAgICBoZWlnaHQ6IG5ld0hlaWdodCxcclxuICAgICAgc2NhbGVYOiAxLFxyXG4gICAgICBzY2FsZVk6IDFcclxuICAgIH07XHJcblxyXG4gICAgLy8gUmVzZXQgc2NhbGV4L3NjYWxlWSB2YWx1ZXM7IHRoaXMgaGVscHMgZm9yIHBlcmZvbWFuY2UgYW5kIGRvZXMgbm90IGJyZWFrIGFuaW1hdGlvblxyXG4gICAgJC5mYW5jeWJveC5zZXRUcmFuc2xhdGUoc2VsZi4kY29udGVudCwgcmVzZXQpO1xyXG5cclxuICAgIGlmIChuZXdXaWR0aCA8IHNlbGYuY2FudmFzV2lkdGggJiYgbmV3SGVpZ2h0IDwgc2VsZi5jYW52YXNIZWlnaHQpIHtcclxuICAgICAgc2VsZi5pbnN0YW5jZS5zY2FsZVRvRml0KDE1MCk7XHJcbiAgICB9IGVsc2UgaWYgKG5ld1dpZHRoID4gY3VycmVudC53aWR0aCB8fCBuZXdIZWlnaHQgPiBjdXJyZW50LmhlaWdodCkge1xyXG4gICAgICBzZWxmLmluc3RhbmNlLnNjYWxlVG9BY3R1YWwoc2VsZi5jZW50ZXJQb2ludFN0YXJ0WCwgc2VsZi5jZW50ZXJQb2ludFN0YXJ0WSwgMTUwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5ld1BvcyA9IHNlbGYubGltaXRQb3NpdGlvbihuZXdPZmZzZXRYLCBuZXdPZmZzZXRZLCBuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcclxuXHJcbiAgICAgIC8vIFN3aXRjaCBmcm9tIHNjYWxlKCkgdG8gd2lkdGgvaGVpZ2h0IG9yIGFuaW1hdGlvbiB3aWxsIG5vdCB3b3JrIGNvcnJlY3RseVxyXG4gICAgICAkLmZhbmN5Ym94LnNldFRyYW5zbGF0ZShzZWxmLiRjb250ZW50LCAkLmZhbmN5Ym94LmdldFRyYW5zbGF0ZShzZWxmLiRjb250ZW50KSk7XHJcblxyXG4gICAgICAkLmZhbmN5Ym94LmFuaW1hdGUoc2VsZi4kY29udGVudCwgbmV3UG9zLCAxNTApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIEd1ZXN0dXJlcy5wcm90b3R5cGUub25UYXAgPSBmdW5jdGlvbihlKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB2YXIgJHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuICAgIHZhciBpbnN0YW5jZSA9IHNlbGYuaW5zdGFuY2U7XHJcbiAgICB2YXIgY3VycmVudCA9IGluc3RhbmNlLmN1cnJlbnQ7XHJcblxyXG4gICAgdmFyIGVuZFBvaW50cyA9IChlICYmIGdldFBvaW50ZXJYWShlKSkgfHwgc2VsZi5zdGFydFBvaW50cztcclxuXHJcbiAgICB2YXIgdGFwWCA9IGVuZFBvaW50c1swXSA/IGVuZFBvaW50c1swXS54IC0gJCh3aW5kb3cpLnNjcm9sbExlZnQoKSAtIHNlbGYuc3RhZ2VQb3MubGVmdCA6IDA7XHJcbiAgICB2YXIgdGFwWSA9IGVuZFBvaW50c1swXSA/IGVuZFBvaW50c1swXS55IC0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpIC0gc2VsZi5zdGFnZVBvcy50b3AgOiAwO1xyXG5cclxuICAgIHZhciB3aGVyZTtcclxuXHJcbiAgICB2YXIgcHJvY2VzcyA9IGZ1bmN0aW9uKHByZWZpeCkge1xyXG4gICAgICB2YXIgYWN0aW9uID0gY3VycmVudC5vcHRzW3ByZWZpeF07XHJcblxyXG4gICAgICBpZiAoJC5pc0Z1bmN0aW9uKGFjdGlvbikpIHtcclxuICAgICAgICBhY3Rpb24gPSBhY3Rpb24uYXBwbHkoaW5zdGFuY2UsIFtjdXJyZW50LCBlXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghYWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICAgIGNhc2UgXCJjbG9zZVwiOlxyXG4gICAgICAgICAgaW5zdGFuY2UuY2xvc2Uoc2VsZi5zdGFydEV2ZW50KTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBcInRvZ2dsZUNvbnRyb2xzXCI6XHJcbiAgICAgICAgICBpbnN0YW5jZS50b2dnbGVDb250cm9scyh0cnVlKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBcIm5leHRcIjpcclxuICAgICAgICAgIGluc3RhbmNlLm5leHQoKTtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBcIm5leHRPckNsb3NlXCI6XHJcbiAgICAgICAgICBpZiAoaW5zdGFuY2UuZ3JvdXAubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5uZXh0KCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5jbG9zZShzZWxmLnN0YXJ0RXZlbnQpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIFwiem9vbVwiOlxyXG4gICAgICAgICAgaWYgKGN1cnJlbnQudHlwZSA9PSBcImltYWdlXCIgJiYgKGN1cnJlbnQuaXNMb2FkZWQgfHwgY3VycmVudC4kZ2hvc3QpKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS5jYW5QYW4oKSkge1xyXG4gICAgICAgICAgICAgIGluc3RhbmNlLnNjYWxlVG9GaXQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbnN0YW5jZS5pc1NjYWxlZERvd24oKSkge1xyXG4gICAgICAgICAgICAgIGluc3RhbmNlLnNjYWxlVG9BY3R1YWwodGFwWCwgdGFwWSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5zdGFuY2UuZ3JvdXAubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgIGluc3RhbmNlLmNsb3NlKHNlbGYuc3RhcnRFdmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJZ25vcmUgcmlnaHQgY2xpY2tcclxuICAgIGlmIChlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LmJ1dHRvbiA9PSAyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTa2lwIGlmIGNsaWNrZWQgb24gdGhlIHNjcm9sbGJhclxyXG4gICAgaWYgKCEkdGFyZ2V0LmlzKFwiaW1nXCIpICYmIHRhcFggPiAkdGFyZ2V0WzBdLmNsaWVudFdpZHRoICsgJHRhcmdldC5vZmZzZXQoKS5sZWZ0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayB3aGVyZSBpcyBjbGlja2VkXHJcbiAgICBpZiAoJHRhcmdldC5pcyhcIi5mYW5jeWJveC1iZywuZmFuY3lib3gtaW5uZXIsLmZhbmN5Ym94LW91dGVyLC5mYW5jeWJveC1jb250YWluZXJcIikpIHtcclxuICAgICAgd2hlcmUgPSBcIk91dHNpZGVcIjtcclxuICAgIH0gZWxzZSBpZiAoJHRhcmdldC5pcyhcIi5mYW5jeWJveC1zbGlkZVwiKSkge1xyXG4gICAgICB3aGVyZSA9IFwiU2xpZGVcIjtcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIGluc3RhbmNlLmN1cnJlbnQuJGNvbnRlbnQgJiZcclxuICAgICAgaW5zdGFuY2UuY3VycmVudC4kY29udGVudFxyXG4gICAgICAgIC5maW5kKCR0YXJnZXQpXHJcbiAgICAgICAgLmFkZEJhY2soKVxyXG4gICAgICAgIC5maWx0ZXIoJHRhcmdldCkubGVuZ3RoXHJcbiAgICApIHtcclxuICAgICAgd2hlcmUgPSBcIkNvbnRlbnRcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiB0aGlzIGlzIGEgZG91YmxlIHRhcFxyXG4gICAgaWYgKHNlbGYudGFwcGVkKSB7XHJcbiAgICAgIC8vIFN0b3AgcHJldmlvdXNseSBjcmVhdGVkIHNpbmdsZSB0YXBcclxuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYudGFwcGVkKTtcclxuICAgICAgc2VsZi50YXBwZWQgPSBudWxsO1xyXG5cclxuICAgICAgLy8gU2tpcCBpZiBkaXN0YW5jZSBiZXR3ZWVuIHRhcHMgaXMgdG9vIGJpZ1xyXG4gICAgICBpZiAoTWF0aC5hYnModGFwWCAtIHNlbGYudGFwWCkgPiA1MCB8fCBNYXRoLmFicyh0YXBZIC0gc2VsZi50YXBZKSA+IDUwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE9LLCBub3cgd2UgYXNzdW1lIHRoYXQgdGhpcyBpcyBhIGRvdWJsZS10YXBcclxuICAgICAgcHJvY2VzcyhcImRibGNsaWNrXCIgKyB3aGVyZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTaW5nbGUgdGFwIHdpbGwgYmUgcHJvY2Vzc2VkIGlmIHVzZXIgaGFzIG5vdCBjbGlja2VkIHNlY29uZCB0aW1lIHdpdGhpbiAzMDBtc1xyXG4gICAgICAvLyBvciB0aGVyZSBpcyBubyBuZWVkIHRvIHdhaXQgZm9yIGRvdWJsZS10YXBcclxuICAgICAgc2VsZi50YXBYID0gdGFwWDtcclxuICAgICAgc2VsZi50YXBZID0gdGFwWTtcclxuXHJcbiAgICAgIGlmIChjdXJyZW50Lm9wdHNbXCJkYmxjbGlja1wiICsgd2hlcmVdICYmIGN1cnJlbnQub3B0c1tcImRibGNsaWNrXCIgKyB3aGVyZV0gIT09IGN1cnJlbnQub3B0c1tcImNsaWNrXCIgKyB3aGVyZV0pIHtcclxuICAgICAgICBzZWxmLnRhcHBlZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBzZWxmLnRhcHBlZCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgcHJvY2VzcyhcImNsaWNrXCIgKyB3aGVyZSk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9jZXNzKFwiY2xpY2tcIiArIHdoZXJlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gICQoZG9jdW1lbnQpLm9uKFwib25BY3RpdmF0ZS5mYlwiLCBmdW5jdGlvbihlLCBpbnN0YW5jZSkge1xyXG4gICAgaWYgKGluc3RhbmNlICYmICFpbnN0YW5jZS5HdWVzdHVyZXMpIHtcclxuICAgICAgaW5zdGFuY2UuR3Vlc3R1cmVzID0gbmV3IEd1ZXN0dXJlcyhpbnN0YW5jZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pKHdpbmRvdywgZG9jdW1lbnQsIHdpbmRvdy5qUXVlcnkgfHwgalF1ZXJ5KTtcclxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vL1xyXG4vLyBTbGlkZVNob3dcclxuLy8gRW5hYmxlcyBzbGlkZXNob3cgZnVuY3Rpb25hbGl0eVxyXG4vL1xyXG4vLyBFeGFtcGxlIG9mIHVzYWdlOlxyXG4vLyAkLmZhbmN5Ym94LmdldEluc3RhbmNlKCkuU2xpZGVTaG93LnN0YXJ0KClcclxuLy9cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuKGZ1bmN0aW9uKGRvY3VtZW50LCAkKSB7XHJcbiAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICQuZXh0ZW5kKHRydWUsICQuZmFuY3lib3guZGVmYXVsdHMsIHtcclxuICAgIGJ0blRwbDoge1xyXG4gICAgICBzbGlkZVNob3c6XHJcbiAgICAgICAgJzxidXR0b24gZGF0YS1mYW5jeWJveC1wbGF5IGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tcGxheVwiIHRpdGxlPVwie3tQTEFZX1NUQVJUfX1cIj4nICtcclxuICAgICAgICAnPHN2ZyB2aWV3Qm94PVwiMCAwIDQwIDQwXCI+JyArXHJcbiAgICAgICAgJzxwYXRoIGQ9XCJNMTMsMTIgTDI3LDIwIEwxMywyNyBaXCIgLz4nICtcclxuICAgICAgICAnPHBhdGggZD1cIk0xNSwxMCB2MTkgTTIzLDEwIHYxOVwiIC8+JyArXHJcbiAgICAgICAgXCI8L3N2Zz5cIiArXHJcbiAgICAgICAgXCI8L2J1dHRvbj5cIlxyXG4gICAgfSxcclxuICAgIHNsaWRlU2hvdzoge1xyXG4gICAgICBhdXRvU3RhcnQ6IGZhbHNlLFxyXG4gICAgICBzcGVlZDogMzAwMFxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB2YXIgU2xpZGVTaG93ID0gZnVuY3Rpb24oaW5zdGFuY2UpIHtcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH07XHJcblxyXG4gICQuZXh0ZW5kKFNsaWRlU2hvdy5wcm90b3R5cGUsIHtcclxuICAgIHRpbWVyOiBudWxsLFxyXG4gICAgaXNBY3RpdmU6IGZhbHNlLFxyXG4gICAgJGJ1dHRvbjogbnVsbCxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgc2VsZi4kYnV0dG9uID0gc2VsZi5pbnN0YW5jZS4kcmVmcy50b29sYmFyLmZpbmQoXCJbZGF0YS1mYW5jeWJveC1wbGF5XVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNlbGYudG9nZ2xlKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHNlbGYuaW5zdGFuY2UuZ3JvdXAubGVuZ3RoIDwgMiB8fCAhc2VsZi5pbnN0YW5jZS5ncm91cFtzZWxmLmluc3RhbmNlLmN1cnJJbmRleF0ub3B0cy5zbGlkZVNob3cpIHtcclxuICAgICAgICBzZWxmLiRidXR0b24uaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24oZm9yY2UpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgcmVhY2hlZCBsYXN0IGVsZW1lbnRcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHNlbGYuaW5zdGFuY2UgJiZcclxuICAgICAgICBzZWxmLmluc3RhbmNlLmN1cnJlbnQgJiZcclxuICAgICAgICAoZm9yY2UgPT09IHRydWUgfHwgc2VsZi5pbnN0YW5jZS5jdXJyZW50Lm9wdHMubG9vcCB8fCBzZWxmLmluc3RhbmNlLmN1cnJJbmRleCA8IHNlbGYuaW5zdGFuY2UuZ3JvdXAubGVuZ3RoIC0gMSlcclxuICAgICAgKSB7XHJcbiAgICAgICAgc2VsZi50aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAoc2VsZi5pc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICBzZWxmLmluc3RhbmNlLmp1bXBUbygoc2VsZi5pbnN0YW5jZS5jdXJySW5kZXggKyAxKSAlIHNlbGYuaW5zdGFuY2UuZ3JvdXAubGVuZ3RoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCBzZWxmLmluc3RhbmNlLmN1cnJlbnQub3B0cy5zbGlkZVNob3cuc3BlZWQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlbGYuc3RvcCgpO1xyXG4gICAgICAgIHNlbGYuaW5zdGFuY2UuaWRsZVNlY29uZHNDb3VudGVyID0gMDtcclxuICAgICAgICBzZWxmLmluc3RhbmNlLnNob3dDb250cm9scygpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYudGltZXIpO1xyXG5cclxuICAgICAgc2VsZi50aW1lciA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICB2YXIgY3VycmVudCA9IHNlbGYuaW5zdGFuY2UuY3VycmVudDtcclxuXHJcbiAgICAgIGlmIChjdXJyZW50KSB7XHJcbiAgICAgICAgc2VsZi5pc0FjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHNlbGYuJGJ1dHRvblxyXG4gICAgICAgICAgLmF0dHIoXCJ0aXRsZVwiLCBjdXJyZW50Lm9wdHMuaTE4bltjdXJyZW50Lm9wdHMubGFuZ10uUExBWV9TVE9QKVxyXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKFwiZmFuY3lib3gtYnV0dG9uLS1wbGF5XCIpXHJcbiAgICAgICAgICAuYWRkQ2xhc3MoXCJmYW5jeWJveC1idXR0b24tLXBhdXNlXCIpO1xyXG5cclxuICAgICAgICBzZWxmLnNldCh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICB2YXIgY3VycmVudCA9IHNlbGYuaW5zdGFuY2UuY3VycmVudDtcclxuXHJcbiAgICAgIHNlbGYuY2xlYXIoKTtcclxuXHJcbiAgICAgIHNlbGYuJGJ1dHRvblxyXG4gICAgICAgIC5hdHRyKFwidGl0bGVcIiwgY3VycmVudC5vcHRzLmkxOG5bY3VycmVudC5vcHRzLmxhbmddLlBMQVlfU1RBUlQpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKFwiZmFuY3lib3gtYnV0dG9uLS1wYXVzZVwiKVxyXG4gICAgICAgIC5hZGRDbGFzcyhcImZhbmN5Ym94LWJ1dHRvbi0tcGxheVwiKTtcclxuXHJcbiAgICAgIHNlbGYuaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgdG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgaWYgKHNlbGYuaXNBY3RpdmUpIHtcclxuICAgICAgICBzZWxmLnN0b3AoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxmLnN0YXJ0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJChkb2N1bWVudCkub24oe1xyXG4gICAgXCJvbkluaXQuZmJcIjogZnVuY3Rpb24oZSwgaW5zdGFuY2UpIHtcclxuICAgICAgaWYgKGluc3RhbmNlICYmICFpbnN0YW5jZS5TbGlkZVNob3cpIHtcclxuICAgICAgICBpbnN0YW5jZS5TbGlkZVNob3cgPSBuZXcgU2xpZGVTaG93KGluc3RhbmNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBcImJlZm9yZVNob3cuZmJcIjogZnVuY3Rpb24oZSwgaW5zdGFuY2UsIGN1cnJlbnQsIGZpcnN0UnVuKSB7XHJcbiAgICAgIHZhciBTbGlkZVNob3cgPSBpbnN0YW5jZSAmJiBpbnN0YW5jZS5TbGlkZVNob3c7XHJcblxyXG4gICAgICBpZiAoZmlyc3RSdW4pIHtcclxuICAgICAgICBpZiAoU2xpZGVTaG93ICYmIGN1cnJlbnQub3B0cy5zbGlkZVNob3cuYXV0b1N0YXJ0KSB7XHJcbiAgICAgICAgICBTbGlkZVNob3cuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoU2xpZGVTaG93ICYmIFNsaWRlU2hvdy5pc0FjdGl2ZSkge1xyXG4gICAgICAgIFNsaWRlU2hvdy5jbGVhcigpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFwiYWZ0ZXJTaG93LmZiXCI6IGZ1bmN0aW9uKGUsIGluc3RhbmNlLCBjdXJyZW50KSB7XHJcbiAgICAgIHZhciBTbGlkZVNob3cgPSBpbnN0YW5jZSAmJiBpbnN0YW5jZS5TbGlkZVNob3c7XHJcblxyXG4gICAgICBpZiAoU2xpZGVTaG93ICYmIFNsaWRlU2hvdy5pc0FjdGl2ZSkge1xyXG4gICAgICAgIFNsaWRlU2hvdy5zZXQoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBcImFmdGVyS2V5ZG93bi5mYlwiOiBmdW5jdGlvbihlLCBpbnN0YW5jZSwgY3VycmVudCwga2V5cHJlc3MsIGtleWNvZGUpIHtcclxuICAgICAgdmFyIFNsaWRlU2hvdyA9IGluc3RhbmNlICYmIGluc3RhbmNlLlNsaWRlU2hvdztcclxuXHJcbiAgICAgIC8vIFwiUFwiIG9yIFNwYWNlYmFyXHJcbiAgICAgIGlmIChTbGlkZVNob3cgJiYgY3VycmVudC5vcHRzLnNsaWRlU2hvdyAmJiAoa2V5Y29kZSA9PT0gODAgfHwga2V5Y29kZSA9PT0gMzIpICYmICEkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLmlzKFwiYnV0dG9uLGEsaW5wdXRcIikpIHtcclxuICAgICAgICBrZXlwcmVzcy5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBTbGlkZVNob3cudG9nZ2xlKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgXCJiZWZvcmVDbG9zZS5mYiBvbkRlYWN0aXZhdGUuZmJcIjogZnVuY3Rpb24oZSwgaW5zdGFuY2UpIHtcclxuICAgICAgdmFyIFNsaWRlU2hvdyA9IGluc3RhbmNlICYmIGluc3RhbmNlLlNsaWRlU2hvdztcclxuXHJcbiAgICAgIGlmIChTbGlkZVNob3cpIHtcclxuICAgICAgICBTbGlkZVNob3cuc3RvcCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIFBhZ2UgVmlzaWJpbGl0eSBBUEkgdG8gcGF1c2Ugc2xpZGVzaG93IHdoZW4gd2luZG93IGlzIG5vdCBhY3RpdmVcclxuICAkKGRvY3VtZW50KS5vbihcInZpc2liaWxpdHljaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaW5zdGFuY2UgPSAkLmZhbmN5Ym94LmdldEluc3RhbmNlKCk7XHJcbiAgICB2YXIgU2xpZGVTaG93ID0gaW5zdGFuY2UgJiYgaW5zdGFuY2UuU2xpZGVTaG93O1xyXG5cclxuICAgIGlmIChTbGlkZVNob3cgJiYgU2xpZGVTaG93LmlzQWN0aXZlKSB7XHJcbiAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcclxuICAgICAgICBTbGlkZVNob3cuY2xlYXIoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBTbGlkZVNob3cuc2V0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufSkoZG9jdW1lbnQsIHdpbmRvdy5qUXVlcnkgfHwgalF1ZXJ5KTtcclxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vL1xyXG4vLyBGdWxsU2NyZWVuXHJcbi8vIEFkZHMgZnVsbHNjcmVlbiBmdW5jdGlvbmFsaXR5XHJcbi8vXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbihmdW5jdGlvbihkb2N1bWVudCwgJCkge1xyXG4gIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAvLyBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IHVzZXIgYnJvd3NlclxyXG4gIHZhciBmbiA9IChmdW5jdGlvbigpIHtcclxuICAgIHZhciBmbk1hcCA9IFtcclxuICAgICAgW1wicmVxdWVzdEZ1bGxzY3JlZW5cIiwgXCJleGl0RnVsbHNjcmVlblwiLCBcImZ1bGxzY3JlZW5FbGVtZW50XCIsIFwiZnVsbHNjcmVlbkVuYWJsZWRcIiwgXCJmdWxsc2NyZWVuY2hhbmdlXCIsIFwiZnVsbHNjcmVlbmVycm9yXCJdLFxyXG4gICAgICAvLyBuZXcgV2ViS2l0XHJcbiAgICAgIFtcclxuICAgICAgICBcIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuXCIsXHJcbiAgICAgICAgXCJ3ZWJraXRFeGl0RnVsbHNjcmVlblwiLFxyXG4gICAgICAgIFwid2Via2l0RnVsbHNjcmVlbkVsZW1lbnRcIixcclxuICAgICAgICBcIndlYmtpdEZ1bGxzY3JlZW5FbmFibGVkXCIsXHJcbiAgICAgICAgXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsXHJcbiAgICAgICAgXCJ3ZWJraXRmdWxsc2NyZWVuZXJyb3JcIlxyXG4gICAgICBdLFxyXG4gICAgICAvLyBvbGQgV2ViS2l0IChTYWZhcmkgNS4xKVxyXG4gICAgICBbXHJcbiAgICAgICAgXCJ3ZWJraXRSZXF1ZXN0RnVsbFNjcmVlblwiLFxyXG4gICAgICAgIFwid2Via2l0Q2FuY2VsRnVsbFNjcmVlblwiLFxyXG4gICAgICAgIFwid2Via2l0Q3VycmVudEZ1bGxTY3JlZW5FbGVtZW50XCIsXHJcbiAgICAgICAgXCJ3ZWJraXRDYW5jZWxGdWxsU2NyZWVuXCIsXHJcbiAgICAgICAgXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsXHJcbiAgICAgICAgXCJ3ZWJraXRmdWxsc2NyZWVuZXJyb3JcIlxyXG4gICAgICBdLFxyXG4gICAgICBbXHJcbiAgICAgICAgXCJtb3pSZXF1ZXN0RnVsbFNjcmVlblwiLFxyXG4gICAgICAgIFwibW96Q2FuY2VsRnVsbFNjcmVlblwiLFxyXG4gICAgICAgIFwibW96RnVsbFNjcmVlbkVsZW1lbnRcIixcclxuICAgICAgICBcIm1vekZ1bGxTY3JlZW5FbmFibGVkXCIsXHJcbiAgICAgICAgXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIsXHJcbiAgICAgICAgXCJtb3pmdWxsc2NyZWVuZXJyb3JcIlxyXG4gICAgICBdLFxyXG4gICAgICBbXCJtc1JlcXVlc3RGdWxsc2NyZWVuXCIsIFwibXNFeGl0RnVsbHNjcmVlblwiLCBcIm1zRnVsbHNjcmVlbkVsZW1lbnRcIiwgXCJtc0Z1bGxzY3JlZW5FbmFibGVkXCIsIFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCIsIFwiTVNGdWxsc2NyZWVuRXJyb3JcIl1cclxuICAgIF07XHJcblxyXG4gICAgdmFyIHJldCA9IHt9O1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm5NYXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIHZhbCA9IGZuTWFwW2ldO1xyXG5cclxuICAgICAgaWYgKHZhbCAmJiB2YWxbMV0gaW4gZG9jdW1lbnQpIHtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgcmV0W2ZuTWFwWzBdW2pdXSA9IHZhbFtqXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSkoKTtcclxuXHJcbiAgLy8gSWYgYnJvd3NlciBkb2VzIG5vdCBoYXZlIEZ1bGwgU2NyZWVuIEFQSSwgdGhlbiBzaW1wbHkgdW5zZXQgZGVmYXVsdCBidXR0b24gdGVtcGxhdGUgYW5kIHN0b3BcclxuICBpZiAoIWZuKSB7XHJcbiAgICBpZiAoJCAmJiAkLmZhbmN5Ym94KSB7XHJcbiAgICAgICQuZmFuY3lib3guZGVmYXVsdHMuYnRuVHBsLmZ1bGxTY3JlZW4gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB2YXIgRnVsbFNjcmVlbiA9IHtcclxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uKGVsZW0pIHtcclxuICAgICAgZWxlbSA9IGVsZW0gfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG5cclxuICAgICAgZWxlbVtmbi5yZXF1ZXN0RnVsbHNjcmVlbl0oZWxlbS5BTExPV19LRVlCT0FSRF9JTlBVVCk7XHJcbiAgICB9LFxyXG4gICAgZXhpdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGRvY3VtZW50W2ZuLmV4aXRGdWxsc2NyZWVuXSgpO1xyXG4gICAgfSxcclxuICAgIHRvZ2dsZTogZnVuY3Rpb24oZWxlbSkge1xyXG4gICAgICBlbGVtID0gZWxlbSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5pc0Z1bGxzY3JlZW4oKSkge1xyXG4gICAgICAgIHRoaXMuZXhpdCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdChlbGVtKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGlzRnVsbHNjcmVlbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBCb29sZWFuKGRvY3VtZW50W2ZuLmZ1bGxzY3JlZW5FbGVtZW50XSk7XHJcbiAgICB9LFxyXG4gICAgZW5hYmxlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBCb29sZWFuKGRvY3VtZW50W2ZuLmZ1bGxzY3JlZW5FbmFibGVkXSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgJC5leHRlbmQodHJ1ZSwgJC5mYW5jeWJveC5kZWZhdWx0cywge1xyXG4gICAgYnRuVHBsOiB7XHJcbiAgICAgIGZ1bGxTY3JlZW46XHJcbiAgICAgICAgJzxidXR0b24gZGF0YS1mYW5jeWJveC1mdWxsc2NyZWVuIGNsYXNzPVwiZmFuY3lib3gtYnV0dG9uIGZhbmN5Ym94LWJ1dHRvbi0tZnVsbHNjcmVlblwiIHRpdGxlPVwie3tGVUxMX1NDUkVFTn19XCI+JyArXHJcbiAgICAgICAgJzxzdmcgdmlld0JveD1cIjAgMCA0MCA0MFwiPicgK1xyXG4gICAgICAgICc8cGF0aCBkPVwiTTksMTIgdjE2IGgyMiB2LTE2IGgtMjIgdjhcIiAvPicgK1xyXG4gICAgICAgIFwiPC9zdmc+XCIgK1xyXG4gICAgICAgIFwiPC9idXR0b24+XCJcclxuICAgIH0sXHJcbiAgICBmdWxsU2NyZWVuOiB7XHJcbiAgICAgIGF1dG9TdGFydDogZmFsc2VcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJChkb2N1bWVudCkub24oe1xyXG4gICAgXCJvbkluaXQuZmJcIjogZnVuY3Rpb24oZSwgaW5zdGFuY2UpIHtcclxuICAgICAgdmFyICRjb250YWluZXI7XHJcblxyXG4gICAgICBpZiAoaW5zdGFuY2UgJiYgaW5zdGFuY2UuZ3JvdXBbaW5zdGFuY2UuY3VyckluZGV4XS5vcHRzLmZ1bGxTY3JlZW4pIHtcclxuICAgICAgICAkY29udGFpbmVyID0gaW5zdGFuY2UuJHJlZnMuY29udGFpbmVyO1xyXG5cclxuICAgICAgICAkY29udGFpbmVyLm9uKFwiY2xpY2suZmItZnVsbHNjcmVlblwiLCBcIltkYXRhLWZhbmN5Ym94LWZ1bGxzY3JlZW5dXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgRnVsbFNjcmVlbi50b2dnbGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGluc3RhbmNlLm9wdHMuZnVsbFNjcmVlbiAmJiBpbnN0YW5jZS5vcHRzLmZ1bGxTY3JlZW4uYXV0b1N0YXJ0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBGdWxsU2NyZWVuLnJlcXVlc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEV4cG9zZSBBUElcclxuICAgICAgICBpbnN0YW5jZS5GdWxsU2NyZWVuID0gRnVsbFNjcmVlbjtcclxuICAgICAgfSBlbHNlIGlmIChpbnN0YW5jZSkge1xyXG4gICAgICAgIGluc3RhbmNlLiRyZWZzLnRvb2xiYXIuZmluZChcIltkYXRhLWZhbmN5Ym94LWZ1bGxzY3JlZW5dXCIpLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBcImFmdGVyS2V5ZG93bi5mYlwiOiBmdW5jdGlvbihlLCBpbnN0YW5jZSwgY3VycmVudCwga2V5cHJlc3MsIGtleWNvZGUpIHtcclxuICAgICAgLy8gXCJGXCJcclxuICAgICAgaWYgKGluc3RhbmNlICYmIGluc3RhbmNlLkZ1bGxTY3JlZW4gJiYga2V5Y29kZSA9PT0gNzApIHtcclxuICAgICAgICBrZXlwcmVzcy5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBpbnN0YW5jZS5GdWxsU2NyZWVuLnRvZ2dsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFwiYmVmb3JlQ2xvc2UuZmJcIjogZnVuY3Rpb24oZSwgaW5zdGFuY2UpIHtcclxuICAgICAgaWYgKGluc3RhbmNlICYmIGluc3RhbmNlLkZ1bGxTY3JlZW4gJiYgaW5zdGFuY2UuJHJlZnMuY29udGFpbmVyLmhhc0NsYXNzKFwiZmFuY3lib3gtaXMtZnVsbHNjcmVlblwiKSkge1xyXG4gICAgICAgIEZ1bGxTY3JlZW4uZXhpdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gICQoZG9jdW1lbnQpLm9uKGZuLmZ1bGxzY3JlZW5jaGFuZ2UsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGlzRnVsbHNjcmVlbiA9IEZ1bGxTY3JlZW4uaXNGdWxsc2NyZWVuKCksXHJcbiAgICAgIGluc3RhbmNlID0gJC5mYW5jeWJveC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgIGlmIChpbnN0YW5jZSkge1xyXG4gICAgICAvLyBJZiBpbWFnZSBpcyB6b29taW5nLCB0aGVuIGZvcmNlIHRvIHN0b3AgYW5kIHJlcG9zaXRpb24gcHJvcGVybHlcclxuICAgICAgaWYgKGluc3RhbmNlLmN1cnJlbnQgJiYgaW5zdGFuY2UuY3VycmVudC50eXBlID09PSBcImltYWdlXCIgJiYgaW5zdGFuY2UuaXNBbmltYXRpbmcpIHtcclxuICAgICAgICBpbnN0YW5jZS5jdXJyZW50LiRjb250ZW50LmNzcyhcInRyYW5zaXRpb25cIiwgXCJub25lXCIpO1xyXG5cclxuICAgICAgICBpbnN0YW5jZS5pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpbnN0YW5jZS51cGRhdGUodHJ1ZSwgdHJ1ZSwgMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGluc3RhbmNlLnRyaWdnZXIoXCJvbkZ1bGxzY3JlZW5DaGFuZ2VcIiwgaXNGdWxsc2NyZWVuKTtcclxuXHJcbiAgICAgIGluc3RhbmNlLiRyZWZzLmNvbnRhaW5lci50b2dnbGVDbGFzcyhcImZhbmN5Ym94LWlzLWZ1bGxzY3JlZW5cIiwgaXNGdWxsc2NyZWVuKTtcclxuICAgIH1cclxuICB9KTtcclxufSkoZG9jdW1lbnQsIHdpbmRvdy5qUXVlcnkgfHwgalF1ZXJ5KTtcclxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vL1xyXG4vLyBUaHVtYnNcclxuLy8gRGlzcGxheXMgdGh1bWJuYWlscyBpbiBhIGdyaWRcclxuLy9cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuKGZ1bmN0aW9uKGRvY3VtZW50LCAkKSB7XHJcbiAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gIHZhciBDTEFTUyA9IFwiZmFuY3lib3gtdGh1bWJzXCIsXHJcbiAgICBDTEFTU19BQ1RJVkUgPSBDTEFTUyArIFwiLWFjdGl2ZVwiLFxyXG4gICAgQ0xBU1NfTE9BRCA9IENMQVNTICsgXCItbG9hZGluZ1wiO1xyXG5cclxuICAvLyBNYWtlIHN1cmUgdGhlcmUgYXJlIGRlZmF1bHQgdmFsdWVzXHJcbiAgJC5mYW5jeWJveC5kZWZhdWx0cyA9ICQuZXh0ZW5kKFxyXG4gICAgdHJ1ZSxcclxuICAgIHtcclxuICAgICAgYnRuVHBsOiB7XHJcbiAgICAgICAgdGh1bWJzOlxyXG4gICAgICAgICAgJzxidXR0b24gZGF0YS1mYW5jeWJveC10aHVtYnMgY2xhc3M9XCJmYW5jeWJveC1idXR0b24gZmFuY3lib3gtYnV0dG9uLS10aHVtYnNcIiB0aXRsZT1cInt7VEhVTUJTfX1cIj4nICtcclxuICAgICAgICAgICc8c3ZnIHZpZXdCb3g9XCIwIDAgMTIwIDEyMFwiPicgK1xyXG4gICAgICAgICAgJzxwYXRoIGQ9XCJNMzAsMzAgaDE0IHYxNCBoLTE0IFogTTUwLDMwIGgxNCB2MTQgaC0xNCBaIE03MCwzMCBoMTQgdjE0IGgtMTQgWiBNMzAsNTAgaDE0IHYxNCBoLTE0IFogTTUwLDUwIGgxNCB2MTQgaC0xNCBaIE03MCw1MCBoMTQgdjE0IGgtMTQgWiBNMzAsNzAgaDE0IHYxNCBoLTE0IFogTTUwLDcwIGgxNCB2MTQgaC0xNCBaIE03MCw3MCBoMTQgdjE0IGgtMTQgWlwiIC8+JyArXHJcbiAgICAgICAgICBcIjwvc3ZnPlwiICtcclxuICAgICAgICAgIFwiPC9idXR0b24+XCJcclxuICAgICAgfSxcclxuICAgICAgdGh1bWJzOiB7XHJcbiAgICAgICAgYXV0b1N0YXJ0OiBmYWxzZSwgLy8gRGlzcGxheSB0aHVtYm5haWxzIG9uIG9wZW5pbmdcclxuICAgICAgICBoaWRlT25DbG9zZTogdHJ1ZSwgLy8gSGlkZSB0aHVtYm5haWwgZ3JpZCB3aGVuIGNsb3NpbmcgYW5pbWF0aW9uIHN0YXJ0c1xyXG4gICAgICAgIHBhcmVudEVsOiBcIi5mYW5jeWJveC1jb250YWluZXJcIiwgLy8gQ29udGFpbmVyIGlzIGluamVjdGVkIGludG8gdGhpcyBlbGVtZW50XHJcbiAgICAgICAgYXhpczogXCJ5XCIgLy8gVmVydGljYWwgKHkpIG9yIGhvcml6b250YWwgKHgpIHNjcm9sbGluZ1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgJC5mYW5jeWJveC5kZWZhdWx0c1xyXG4gICk7XHJcblxyXG4gIHZhciBGYW5jeVRodW1icyA9IGZ1bmN0aW9uKGluc3RhbmNlKSB7XHJcbiAgICB0aGlzLmluaXQoaW5zdGFuY2UpO1xyXG4gIH07XHJcblxyXG4gICQuZXh0ZW5kKEZhbmN5VGh1bWJzLnByb3RvdHlwZSwge1xyXG4gICAgJGJ1dHRvbjogbnVsbCxcclxuICAgICRncmlkOiBudWxsLFxyXG4gICAgJGxpc3Q6IG51bGwsXHJcbiAgICBpc1Zpc2libGU6IGZhbHNlLFxyXG4gICAgaXNBY3RpdmU6IGZhbHNlLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGluc3RhbmNlKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBmaXJzdCxcclxuICAgICAgICBzZWNvbmQ7XHJcblxyXG4gICAgICBzZWxmLmluc3RhbmNlID0gaW5zdGFuY2U7XHJcblxyXG4gICAgICBpbnN0YW5jZS5UaHVtYnMgPSBzZWxmO1xyXG5cclxuICAgICAgc2VsZi5vcHRzID0gaW5zdGFuY2UuZ3JvdXBbaW5zdGFuY2UuY3VyckluZGV4XS5vcHRzLnRodW1icztcclxuXHJcbiAgICAgIC8vIEVuYWJsZSB0aHVtYnMgaWYgYXQgbGVhc3QgdHdvIGdyb3VwIGl0ZW1zIGhhdmUgdGh1bWJuYWlsc1xyXG4gICAgICBmaXJzdCA9IGluc3RhbmNlLmdyb3VwWzBdO1xyXG4gICAgICBmaXJzdCA9IGZpcnN0Lm9wdHMudGh1bWIgfHwgKGZpcnN0Lm9wdHMuJHRodW1iICYmIGZpcnN0Lm9wdHMuJHRodW1iLmxlbmd0aCA/IGZpcnN0Lm9wdHMuJHRodW1iLmF0dHIoXCJzcmNcIikgOiBmYWxzZSk7XHJcblxyXG4gICAgICBpZiAoaW5zdGFuY2UuZ3JvdXAubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHNlY29uZCA9IGluc3RhbmNlLmdyb3VwWzFdO1xyXG4gICAgICAgIHNlY29uZCA9IHNlY29uZC5vcHRzLnRodW1iIHx8IChzZWNvbmQub3B0cy4kdGh1bWIgJiYgc2Vjb25kLm9wdHMuJHRodW1iLmxlbmd0aCA/IHNlY29uZC5vcHRzLiR0aHVtYi5hdHRyKFwic3JjXCIpIDogZmFsc2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLiRidXR0b24gPSBpbnN0YW5jZS4kcmVmcy50b29sYmFyLmZpbmQoXCJbZGF0YS1mYW5jeWJveC10aHVtYnNdXCIpO1xyXG5cclxuICAgICAgaWYgKHNlbGYub3B0cyAmJiBmaXJzdCAmJiBzZWNvbmQgJiYgZmlyc3QgJiYgc2Vjb25kKSB7XHJcbiAgICAgICAgc2VsZi4kYnV0dG9uLnNob3coKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgc2VsZi50b2dnbGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VsZi5pc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VsZi4kYnV0dG9uLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgaW5zdGFuY2UgPSBzZWxmLmluc3RhbmNlLFxyXG4gICAgICAgIHBhcmVudEVsID0gc2VsZi5vcHRzLnBhcmVudEVsLFxyXG4gICAgICAgIGxpc3QgPSBbXSxcclxuICAgICAgICBzcmM7XHJcblxyXG4gICAgICBpZiAoIXNlbGYuJGdyaWQpIHtcclxuICAgICAgICAvLyBDcmVhdGUgbWFpbiBlbGVtZW50XHJcbiAgICAgICAgc2VsZi4kZ3JpZCA9ICQoJzxkaXYgY2xhc3M9XCInICsgQ0xBU1MgKyBcIiBcIiArIENMQVNTICsgXCItXCIgKyBzZWxmLm9wdHMuYXhpcyArICdcIj48L2Rpdj4nKS5hcHBlbmRUbyhcclxuICAgICAgICAgIGluc3RhbmNlLiRyZWZzLmNvbnRhaW5lclxyXG4gICAgICAgICAgICAuZmluZChwYXJlbnRFbClcclxuICAgICAgICAgICAgLmFkZEJhY2soKVxyXG4gICAgICAgICAgICAuZmlsdGVyKHBhcmVudEVsKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBcImNsaWNrXCIgZXZlbnQgdGhhdCBwZXJmb3JtcyBnYWxsZXJ5IG5hdmlnYXRpb25cclxuICAgICAgICBzZWxmLiRncmlkLm9uKFwiY2xpY2tcIiwgXCJsaVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGluc3RhbmNlLmp1bXBUbygkKHRoaXMpLmF0dHIoXCJkYXRhLWluZGV4XCIpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQnVpbGQgdGhlIGxpc3RcclxuICAgICAgaWYgKCFzZWxmLiRsaXN0KSB7XHJcbiAgICAgICAgc2VsZi4kbGlzdCA9ICQoXCI8dWw+XCIpLmFwcGVuZFRvKHNlbGYuJGdyaWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkLmVhY2goaW5zdGFuY2UuZ3JvdXAsIGZ1bmN0aW9uKGksIGl0ZW0pIHtcclxuICAgICAgICBzcmMgPSBpdGVtLm9wdHMudGh1bWIgfHwgKGl0ZW0ub3B0cy4kdGh1bWIgPyBpdGVtLm9wdHMuJHRodW1iLmF0dHIoXCJzcmNcIikgOiBudWxsKTtcclxuXHJcbiAgICAgICAgaWYgKCFzcmMgJiYgaXRlbS50eXBlID09PSBcImltYWdlXCIpIHtcclxuICAgICAgICAgIHNyYyA9IGl0ZW0uc3JjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGlzdC5wdXNoKFxyXG4gICAgICAgICAgJzxsaSBkYXRhLWluZGV4PVwiJyArXHJcbiAgICAgICAgICAgIGkgK1xyXG4gICAgICAgICAgICAnXCIgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCInICtcclxuICAgICAgICAgICAgQ0xBU1NfTE9BRCArXHJcbiAgICAgICAgICAgICdcIicgK1xyXG4gICAgICAgICAgICAoc3JjICYmIHNyYy5sZW5ndGggPyAnIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTp1cmwoJyArIHNyYyArICcpXCIgLz4nIDogXCJcIikgK1xyXG4gICAgICAgICAgICBcIj48L2xpPlwiXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZWxmLiRsaXN0WzBdLmlubmVySFRNTCA9IGxpc3Quam9pbihcIlwiKTtcclxuXHJcbiAgICAgIGlmIChzZWxmLm9wdHMuYXhpcyA9PT0gXCJ4XCIpIHtcclxuICAgICAgICAvLyBTZXQgZml4ZWQgd2lkdGggZm9yIGxpc3QgZWxlbWVudCB0byBlbmFibGUgaG9yaXpvbnRhbCBzY3JvbGxpbmdcclxuICAgICAgICBzZWxmLiRsaXN0LndpZHRoKFxyXG4gICAgICAgICAgcGFyc2VJbnQoc2VsZi4kZ3JpZC5jc3MoXCJwYWRkaW5nLXJpZ2h0XCIpLCAxMCkgK1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5ncm91cC5sZW5ndGggKlxyXG4gICAgICAgICAgICAgIHNlbGYuJGxpc3RcclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbigpXHJcbiAgICAgICAgICAgICAgICAuZXEoMClcclxuICAgICAgICAgICAgICAgIC5vdXRlcldpZHRoKHRydWUpXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmb2N1czogZnVuY3Rpb24oZHVyYXRpb24pIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICRsaXN0ID0gc2VsZi4kbGlzdCxcclxuICAgICAgICAkZ3JpZCA9IHNlbGYuJGdyaWQsXHJcbiAgICAgICAgdGh1bWIsXHJcbiAgICAgICAgdGh1bWJQb3M7XHJcblxyXG4gICAgICBpZiAoIXNlbGYuaW5zdGFuY2UuY3VycmVudCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGh1bWIgPSAkbGlzdFxyXG4gICAgICAgIC5jaGlsZHJlbigpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKENMQVNTX0FDVElWRSlcclxuICAgICAgICAuZmlsdGVyKCdbZGF0YS1pbmRleD1cIicgKyBzZWxmLmluc3RhbmNlLmN1cnJlbnQuaW5kZXggKyAnXCJdJylcclxuICAgICAgICAuYWRkQ2xhc3MoQ0xBU1NfQUNUSVZFKTtcclxuXHJcbiAgICAgIHRodW1iUG9zID0gdGh1bWIucG9zaXRpb24oKTtcclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIG5lZWQgdG8gc2Nyb2xsIHRvIG1ha2UgY3VycmVudCB0aHVtYiB2aXNpYmxlXHJcbiAgICAgIGlmIChzZWxmLm9wdHMuYXhpcyA9PT0gXCJ5XCIgJiYgKHRodW1iUG9zLnRvcCA8IDAgfHwgdGh1bWJQb3MudG9wID4gJGxpc3QuaGVpZ2h0KCkgLSB0aHVtYi5vdXRlckhlaWdodCgpKSkge1xyXG4gICAgICAgICRsaXN0LnN0b3AoKS5hbmltYXRlKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6ICRsaXN0LnNjcm9sbFRvcCgpICsgdGh1bWJQb3MudG9wXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZHVyYXRpb25cclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgIHNlbGYub3B0cy5heGlzID09PSBcInhcIiAmJlxyXG4gICAgICAgICh0aHVtYlBvcy5sZWZ0IDwgJGdyaWQuc2Nyb2xsTGVmdCgpIHx8IHRodW1iUG9zLmxlZnQgPiAkZ3JpZC5zY3JvbGxMZWZ0KCkgKyAoJGdyaWQud2lkdGgoKSAtIHRodW1iLm91dGVyV2lkdGgoKSkpXHJcbiAgICAgICkge1xyXG4gICAgICAgICRsaXN0XHJcbiAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgIC5zdG9wKClcclxuICAgICAgICAgIC5hbmltYXRlKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgc2Nyb2xsTGVmdDogdGh1bWJQb3MubGVmdFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkdXJhdGlvblxyXG4gICAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoYXQuaW5zdGFuY2UuJHJlZnMuY29udGFpbmVyLnRvZ2dsZUNsYXNzKFwiZmFuY3lib3gtc2hvdy10aHVtYnNcIiwgdGhpcy5pc1Zpc2libGUpO1xyXG5cclxuICAgICAgaWYgKHRoYXQuaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgaWYgKCF0aGF0LiRncmlkKSB7XHJcbiAgICAgICAgICB0aGF0LmNyZWF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhhdC5pbnN0YW5jZS50cmlnZ2VyKFwib25UaHVtYnNTaG93XCIpO1xyXG5cclxuICAgICAgICB0aGF0LmZvY3VzKDApO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoYXQuJGdyaWQpIHtcclxuICAgICAgICB0aGF0Lmluc3RhbmNlLnRyaWdnZXIoXCJvblRodW1ic0hpZGVcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFVwZGF0ZSBjb250ZW50IHBvc2l0aW9uXHJcbiAgICAgIHRoYXQuaW5zdGFuY2UudXBkYXRlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG93OiBmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLmlzVmlzaWJsZSA9ICF0aGlzLmlzVmlzaWJsZTtcclxuICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJChkb2N1bWVudCkub24oe1xyXG4gICAgXCJvbkluaXQuZmJcIjogZnVuY3Rpb24oZSwgaW5zdGFuY2UpIHtcclxuICAgICAgdmFyIFRodW1icztcclxuXHJcbiAgICAgIGlmIChpbnN0YW5jZSAmJiAhaW5zdGFuY2UuVGh1bWJzKSB7XHJcbiAgICAgICAgVGh1bWJzID0gbmV3IEZhbmN5VGh1bWJzKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgaWYgKFRodW1icy5pc0FjdGl2ZSAmJiBUaHVtYnMub3B0cy5hdXRvU3RhcnQgPT09IHRydWUpIHtcclxuICAgICAgICAgIFRodW1icy5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFwiYmVmb3JlU2hvdy5mYlwiOiBmdW5jdGlvbihlLCBpbnN0YW5jZSwgaXRlbSwgZmlyc3RSdW4pIHtcclxuICAgICAgdmFyIFRodW1icyA9IGluc3RhbmNlICYmIGluc3RhbmNlLlRodW1icztcclxuXHJcbiAgICAgIGlmIChUaHVtYnMgJiYgVGh1bWJzLmlzVmlzaWJsZSkge1xyXG4gICAgICAgIFRodW1icy5mb2N1cyhmaXJzdFJ1biA/IDAgOiAyNTApO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIFwiYWZ0ZXJLZXlkb3duLmZiXCI6IGZ1bmN0aW9uKGUsIGluc3RhbmNlLCBjdXJyZW50LCBrZXlwcmVzcywga2V5Y29kZSkge1xyXG4gICAgICB2YXIgVGh1bWJzID0gaW5zdGFuY2UgJiYgaW5zdGFuY2UuVGh1bWJzO1xyXG5cclxuICAgICAgLy8gXCJHXCJcclxuICAgICAgaWYgKFRodW1icyAmJiBUaHVtYnMuaXNBY3RpdmUgJiYga2V5Y29kZSA9PT0gNzEpIHtcclxuICAgICAgICBrZXlwcmVzcy5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBUaHVtYnMudG9nZ2xlKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgXCJiZWZvcmVDbG9zZS5mYlwiOiBmdW5jdGlvbihlLCBpbnN0YW5jZSkge1xyXG4gICAgICB2YXIgVGh1bWJzID0gaW5zdGFuY2UgJiYgaW5zdGFuY2UuVGh1bWJzO1xyXG5cclxuICAgICAgaWYgKFRodW1icyAmJiBUaHVtYnMuaXNWaXNpYmxlICYmIFRodW1icy5vcHRzLmhpZGVPbkNsb3NlICE9PSBmYWxzZSkge1xyXG4gICAgICAgIFRodW1icy4kZ3JpZC5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufSkoZG9jdW1lbnQsIHdpbmRvdy5qUXVlcnkgfHwgalF1ZXJ5KTtcclxuXG4vLy8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vXHJcbi8vIFNoYXJlXHJcbi8vIERpc3BsYXlzIHNpbXBsZSBmb3JtIGZvciBzaGFyaW5nIGN1cnJlbnQgdXJsXHJcbi8vXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbihmdW5jdGlvbihkb2N1bWVudCwgJCkge1xyXG4gIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAkLmV4dGVuZCh0cnVlLCAkLmZhbmN5Ym94LmRlZmF1bHRzLCB7XHJcbiAgICBidG5UcGw6IHtcclxuICAgICAgc2hhcmU6XHJcbiAgICAgICAgJzxidXR0b24gZGF0YS1mYW5jeWJveC1zaGFyZSBjbGFzcz1cImZhbmN5Ym94LWJ1dHRvbiBmYW5jeWJveC1idXR0b24tLXNoYXJlXCIgdGl0bGU9XCJ7e1NIQVJFfX1cIj4nICtcclxuICAgICAgICAnPHN2ZyB2aWV3Qm94PVwiMCAwIDQwIDQwXCI+JyArXHJcbiAgICAgICAgJzxwYXRoIGQ9XCJNNiwzMCBDOCwxOCAxOSwxNiAyMywxNiBMMjMsMTYgTDIzLDEwIEwzMywyMCBMMjMsMjkgTDIzLDI0IEMxOSwyNCA4LDI3IDYsMzAgWlwiPicgK1xyXG4gICAgICAgIFwiPC9zdmc+XCIgK1xyXG4gICAgICAgIFwiPC9idXR0b24+XCJcclxuICAgIH0sXHJcbiAgICBzaGFyZToge1xyXG4gICAgICB1cmw6IGZ1bmN0aW9uKGluc3RhbmNlLCBpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICghaW5zdGFuY2UuY3VycmVudEhhc2ggJiYgIShpdGVtLnR5cGUgPT09IFwiaW5saW5lXCIgfHwgaXRlbS50eXBlID09PSBcImh0bWxcIikgPyBpdGVtLm9yaWdTcmMgfHwgaXRlbS5zcmMgOiBmYWxzZSkgfHwgd2luZG93LmxvY2F0aW9uXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAgdHBsOlxyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtc2hhcmVcIj4nICtcclxuICAgICAgICBcIjxoMT57e1NIQVJFfX08L2gxPlwiICtcclxuICAgICAgICBcIjxwPlwiICtcclxuICAgICAgICAnPGEgY2xhc3M9XCJmYW5jeWJveC1zaGFyZV9fYnV0dG9uIGZhbmN5Ym94LXNoYXJlX19idXR0b24tLWZiXCIgaHJlZj1cImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PXt7dXJsfX1cIj4nICtcclxuICAgICAgICAnPHN2ZyB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIm0yODcgNDU2di0yOTljMC0yMSA2LTM1IDM1LTM1aDM4di02M2MtNy0xLTI5LTMtNTUtMy01NCAwLTkxIDMzLTkxIDk0djMwNm0xNDMtMjU0aC0yMDV2NzJoMTk2XCIgLz48L3N2Zz4nICtcclxuICAgICAgICBcIjxzcGFuPkZhY2Vib29rPC9zcGFuPlwiICtcclxuICAgICAgICBcIjwvYT5cIiArXHJcbiAgICAgICAgJzxhIGNsYXNzPVwiZmFuY3lib3gtc2hhcmVfX2J1dHRvbiBmYW5jeWJveC1zaGFyZV9fYnV0dG9uLS10d1wiIGhyZWY9XCJodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD91cmw9e3t1cmx9fSZ0ZXh0PXt7ZGVzY3J9fVwiPicgK1xyXG4gICAgICAgICc8c3ZnIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwibTQ1NiAxMzNjLTE0IDctMzEgMTEtNDcgMTMgMTctMTAgMzAtMjcgMzctNDYtMTUgMTAtMzQgMTYtNTIgMjAtNjEtNjItMTU3LTctMTQxIDc1LTY4LTMtMTI5LTM1LTE2OS04NS0yMiAzNy0xMSA4NiAyNiAxMDktMTMgMC0yNi00LTM3LTkgMCAzOSAyOCA3MiA2NSA4MC0xMiAzLTI1IDQtMzcgMiAxMCAzMyA0MSA1NyA3NyA1Ny00MiAzMC03NyAzOC0xMjIgMzQgMTcwIDExMSAzNzgtMzIgMzU5LTIwOCAxNi0xMSAzMC0yNSA0MS00MnpcIiAvPjwvc3ZnPicgK1xyXG4gICAgICAgIFwiPHNwYW4+VHdpdHRlcjwvc3Bhbj5cIiArXHJcbiAgICAgICAgXCI8L2E+XCIgK1xyXG4gICAgICAgICc8YSBjbGFzcz1cImZhbmN5Ym94LXNoYXJlX19idXR0b24gZmFuY3lib3gtc2hhcmVfX2J1dHRvbi0tcHRcIiBocmVmPVwiaHR0cHM6Ly93d3cucGludGVyZXN0LmNvbS9waW4vY3JlYXRlL2J1dHRvbi8/dXJsPXt7dXJsfX0mZGVzY3JpcHRpb249e3tkZXNjcn19Jm1lZGlhPXt7bWVkaWF9fVwiPicgK1xyXG4gICAgICAgICc8c3ZnIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwibTI2NSA1NmMtMTA5IDAtMTY0IDc4LTE2NCAxNDQgMCAzOSAxNSA3NCA0NyA4NyA1IDIgMTAgMCAxMi01bDQtMTljMi02IDEtOC0zLTEzLTktMTEtMTUtMjUtMTUtNDUgMC01OCA0My0xMTAgMTEzLTExMCA2MiAwIDk2IDM4IDk2IDg4IDAgNjctMzAgMTIyLTczIDEyMi0yNCAwLTQyLTE5LTM2LTQ0IDYtMjkgMjAtNjAgMjAtODEgMC0xOS0xMC0zNS0zMS0zNS0yNSAwLTQ0IDI2LTQ0IDYwIDAgMjEgNyAzNiA3IDM2bC0zMCAxMjVjLTggMzctMSA4MyAwIDg3IDAgMyA0IDQgNSAyIDItMyAzMi0zOSA0Mi03NWwxNi02NGM4IDE2IDMxIDI5IDU2IDI5IDc0IDAgMTI0LTY3IDEyNC0xNTcgMC02OS01OC0xMzItMTQ2LTEzMnpcIiBmaWxsPVwiI2ZmZlwiLz48L3N2Zz4nICtcclxuICAgICAgICBcIjxzcGFuPlBpbnRlcmVzdDwvc3Bhbj5cIiArXHJcbiAgICAgICAgXCI8L2E+XCIgK1xyXG4gICAgICAgIFwiPC9wPlwiICtcclxuICAgICAgICAnPHA+PGlucHV0IGNsYXNzPVwiZmFuY3lib3gtc2hhcmVfX2lucHV0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cInt7dXJsX3Jhd319XCIgLz48L3A+JyArXHJcbiAgICAgICAgXCI8L2Rpdj5cIlxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cmluZykge1xyXG4gICAgdmFyIGVudGl0eU1hcCA9IHtcclxuICAgICAgXCImXCI6IFwiJmFtcDtcIixcclxuICAgICAgXCI8XCI6IFwiJmx0O1wiLFxyXG4gICAgICBcIj5cIjogXCImZ3Q7XCIsXHJcbiAgICAgICdcIic6IFwiJnF1b3Q7XCIsXHJcbiAgICAgIFwiJ1wiOiBcIiYjMzk7XCIsXHJcbiAgICAgIFwiL1wiOiBcIiYjeDJGO1wiLFxyXG4gICAgICBcImBcIjogXCImI3g2MDtcIixcclxuICAgICAgXCI9XCI6IFwiJiN4M0Q7XCJcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1smPD5cIidgPVxcL10vZywgZnVuY3Rpb24ocykge1xyXG4gICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiW2RhdGEtZmFuY3lib3gtc2hhcmVdXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGluc3RhbmNlID0gJC5mYW5jeWJveC5nZXRJbnN0YW5jZSgpLFxyXG4gICAgICBjdXJyZW50ID0gaW5zdGFuY2UuY3VycmVudCB8fCBudWxsLFxyXG4gICAgICB1cmwsXHJcbiAgICAgIHRwbDtcclxuXHJcbiAgICBpZiAoIWN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkLnR5cGUoY3VycmVudC5vcHRzLnNoYXJlLnVybCkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICB1cmwgPSBjdXJyZW50Lm9wdHMuc2hhcmUudXJsLmFwcGx5KGN1cnJlbnQsIFtpbnN0YW5jZSwgY3VycmVudF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRwbCA9IGN1cnJlbnQub3B0cy5zaGFyZS50cGxcclxuICAgICAgLnJlcGxhY2UoL1xce1xce21lZGlhXFx9XFx9L2csIGN1cnJlbnQudHlwZSA9PT0gXCJpbWFnZVwiID8gZW5jb2RlVVJJQ29tcG9uZW50KGN1cnJlbnQuc3JjKSA6IFwiXCIpXHJcbiAgICAgIC5yZXBsYWNlKC9cXHtcXHt1cmxcXH1cXH0vZywgZW5jb2RlVVJJQ29tcG9uZW50KHVybCkpXHJcbiAgICAgIC5yZXBsYWNlKC9cXHtcXHt1cmxfcmF3XFx9XFx9L2csIGVzY2FwZUh0bWwodXJsKSlcclxuICAgICAgLnJlcGxhY2UoL1xce1xce2Rlc2NyXFx9XFx9L2csIGluc3RhbmNlLiRjYXB0aW9uID8gZW5jb2RlVVJJQ29tcG9uZW50KGluc3RhbmNlLiRjYXB0aW9uLnRleHQoKSkgOiBcIlwiKTtcclxuXHJcbiAgICAkLmZhbmN5Ym94Lm9wZW4oe1xyXG4gICAgICBzcmM6IGluc3RhbmNlLnRyYW5zbGF0ZShpbnN0YW5jZSwgdHBsKSxcclxuICAgICAgdHlwZTogXCJodG1sXCIsXHJcbiAgICAgIG9wdHM6IHtcclxuICAgICAgICBhbmltYXRpb25FZmZlY3Q6IGZhbHNlLFxyXG4gICAgICAgIGFmdGVyTG9hZDogZnVuY3Rpb24oc2hhcmVJbnN0YW5jZSwgc2hhcmVDdXJyZW50KSB7XHJcbiAgICAgICAgICAvLyBDbG9zZSBzZWxmIGlmIHBhcmVudCBpbnN0YW5jZSBpcyBjbG9zaW5nXHJcbiAgICAgICAgICBpbnN0YW5jZS4kcmVmcy5jb250YWluZXIub25lKFwiYmVmb3JlQ2xvc2UuZmJcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNoYXJlSW5zdGFuY2UuY2xvc2UobnVsbCwgMCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBPcGVuaW5nIGxpbmtzIGluIGEgcG9wdXAgd2luZG93XHJcbiAgICAgICAgICBzaGFyZUN1cnJlbnQuJGNvbnRlbnQuZmluZChcIi5mYW5jeWJveC1zaGFyZV9fbGlua3MgYVwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgd2luZG93Lm9wZW4odGhpcy5ocmVmLCBcIlNoYXJlXCIsIFwid2lkdGg9NTUwLCBoZWlnaHQ9NDUwXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KShkb2N1bWVudCwgd2luZG93LmpRdWVyeSB8fCBqUXVlcnkpO1xyXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vXHJcbi8vIEhhc2hcclxuLy8gRW5hYmxlcyBsaW5raW5nIHRvIGVhY2ggbW9kYWxcclxuLy9cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuKGZ1bmN0aW9uKGRvY3VtZW50LCB3aW5kb3csICQpIHtcclxuICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgLy8gU2ltcGxlICQuZXNjYXBlU2VsZWN0b3IgcG9seWZpbGwgKGZvciBqUXVlcnkgcHJpb3IgdjMpXHJcbiAgaWYgKCEkLmVzY2FwZVNlbGVjdG9yKSB7XHJcbiAgICAkLmVzY2FwZVNlbGVjdG9yID0gZnVuY3Rpb24oc2VsKSB7XHJcbiAgICAgIHZhciByY3NzZXNjYXBlID0gLyhbXFwwLVxceDFmXFx4N2ZdfF4tP1xcZCl8Xi0kfFteXFx4ODAtXFx1RkZGRlxcdy1dL2c7XHJcbiAgICAgIHZhciBmY3NzZXNjYXBlID0gZnVuY3Rpb24oY2gsIGFzQ29kZVBvaW50KSB7XHJcbiAgICAgICAgaWYgKGFzQ29kZVBvaW50KSB7XHJcbiAgICAgICAgICAvLyBVKzAwMDAgTlVMTCBiZWNvbWVzIFUrRkZGRCBSRVBMQUNFTUVOVCBDSEFSQUNURVJcclxuICAgICAgICAgIGlmIChjaCA9PT0gXCJcXDBcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcXHVGRkZEXCI7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQ29udHJvbCBjaGFyYWN0ZXJzIGFuZCAoZGVwZW5kZW50IHVwb24gcG9zaXRpb24pIG51bWJlcnMgZ2V0IGVzY2FwZWQgYXMgY29kZSBwb2ludHNcclxuICAgICAgICAgIHJldHVybiBjaC5zbGljZSgwLCAtMSkgKyBcIlxcXFxcIiArIGNoLmNoYXJDb2RlQXQoY2gubGVuZ3RoIC0gMSkudG9TdHJpbmcoMTYpICsgXCIgXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPdGhlciBwb3RlbnRpYWxseS1zcGVjaWFsIEFTQ0lJIGNoYXJhY3RlcnMgZ2V0IGJhY2tzbGFzaC1lc2NhcGVkXHJcbiAgICAgICAgcmV0dXJuIFwiXFxcXFwiICsgY2g7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gKHNlbCArIFwiXCIpLnJlcGxhY2UocmNzc2VzY2FwZSwgZmNzc2VzY2FwZSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gR2V0IGluZm8gYWJvdXQgZ2FsbGVyeSBuYW1lIGFuZCBjdXJyZW50IGluZGV4IGZyb20gdXJsXHJcbiAgZnVuY3Rpb24gcGFyc2VVcmwoKSB7XHJcbiAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKSxcclxuICAgICAgcmV6ID0gaGFzaC5zcGxpdChcIi1cIiksXHJcbiAgICAgIGluZGV4ID0gcmV6Lmxlbmd0aCA+IDEgJiYgL15cXCs/XFxkKyQvLnRlc3QocmV6W3Jlei5sZW5ndGggLSAxXSkgPyBwYXJzZUludChyZXoucG9wKC0xKSwgMTApIHx8IDEgOiAxLFxyXG4gICAgICBnYWxsZXJ5ID0gcmV6LmpvaW4oXCItXCIpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGhhc2g6IGhhc2gsXHJcbiAgICAgIC8qIEluZGV4IGlzIHN0YXJ0aW5nIGZyb20gMSAqL1xyXG4gICAgICBpbmRleDogaW5kZXggPCAxID8gMSA6IGluZGV4LFxyXG4gICAgICBnYWxsZXJ5OiBnYWxsZXJ5XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gVHJpZ2dlciBjbGljayBldm50IG9uIGxpbmtzIHRvIG9wZW4gbmV3IGZhbmN5Qm94IGluc3RhbmNlXHJcbiAgZnVuY3Rpb24gdHJpZ2dlckZyb21VcmwodXJsKSB7XHJcbiAgICB2YXIgJGVsO1xyXG5cclxuICAgIGlmICh1cmwuZ2FsbGVyeSAhPT0gXCJcIikge1xyXG4gICAgICAvLyBJZiB3ZSBjYW4gZmluZCBlbGVtZW50IG1hdGNoaW5nICdkYXRhLWZhbmN5Ym94JyBhdHJpYnV0ZSwgdGhlbiB0cmlnZ2VyIGNsaWNrIGV2ZW50IGZvciB0aGF0LlxyXG4gICAgICAvLyBJdCBzaG91bGQgc3RhcnQgZmFuY3lCb3hcclxuICAgICAgJGVsID0gJChcIltkYXRhLWZhbmN5Ym94PSdcIiArICQuZXNjYXBlU2VsZWN0b3IodXJsLmdhbGxlcnkpICsgXCInXVwiKVxyXG4gICAgICAgIC5lcSh1cmwuaW5kZXggLSAxKVxyXG4gICAgICAgIC50cmlnZ2VyKFwiY2xpY2suZmItc3RhcnRcIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBHZXQgZ2FsbGVyeSBuYW1lIGZyb20gY3VycmVudCBpbnN0YW5jZVxyXG4gIGZ1bmN0aW9uIGdldEdhbGxlcnlJRChpbnN0YW5jZSkge1xyXG4gICAgdmFyIG9wdHMsIHJldDtcclxuXHJcbiAgICBpZiAoIWluc3RhbmNlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvcHRzID0gaW5zdGFuY2UuY3VycmVudCA/IGluc3RhbmNlLmN1cnJlbnQub3B0cyA6IGluc3RhbmNlLm9wdHM7XHJcbiAgICByZXQgPSBvcHRzLmhhc2ggfHwgKG9wdHMuJG9yaWcgPyBvcHRzLiRvcmlnLmRhdGEoXCJmYW5jeWJveFwiKSA6IFwiXCIpO1xyXG5cclxuICAgIHJldHVybiByZXQgPT09IFwiXCIgPyBmYWxzZSA6IHJldDtcclxuICB9XHJcblxyXG4gIC8vIFN0YXJ0IHdoZW4gRE9NIGJlY29tZXMgcmVhZHlcclxuICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gQ2hlY2sgaWYgdXNlciBoYXMgZGlzYWJsZWQgdGhpcyBtb2R1bGVcclxuICAgIGlmICgkLmZhbmN5Ym94LmRlZmF1bHRzLmhhc2ggPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGUgaGFzaCB3aGVuIG9wZW5pbmcvY2xvc2luZyBmYW5jeUJveFxyXG4gICAgJChkb2N1bWVudCkub24oe1xyXG4gICAgICBcIm9uSW5pdC5mYlwiOiBmdW5jdGlvbihlLCBpbnN0YW5jZSkge1xyXG4gICAgICAgIHZhciB1cmwsIGdhbGxlcnk7XHJcblxyXG4gICAgICAgIGlmIChpbnN0YW5jZS5ncm91cFtpbnN0YW5jZS5jdXJySW5kZXhdLm9wdHMuaGFzaCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVybCA9IHBhcnNlVXJsKCk7XHJcbiAgICAgICAgZ2FsbGVyeSA9IGdldEdhbGxlcnlJRChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBnYWxsZXJ5IHN0YXJ0IGluZGV4IG1hdGNoZXMgaW5kZXggZnJvbSBoYXNoXHJcbiAgICAgICAgaWYgKGdhbGxlcnkgJiYgdXJsLmdhbGxlcnkgJiYgZ2FsbGVyeSA9PSB1cmwuZ2FsbGVyeSkge1xyXG4gICAgICAgICAgaW5zdGFuY2UuY3VyckluZGV4ID0gdXJsLmluZGV4IC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBcImJlZm9yZVNob3cuZmJcIjogZnVuY3Rpb24oZSwgaW5zdGFuY2UsIGN1cnJlbnQsIGZpcnN0UnVuKSB7XHJcbiAgICAgICAgdmFyIGdhbGxlcnk7XHJcblxyXG4gICAgICAgIGlmICghY3VycmVudCB8fCBjdXJyZW50Lm9wdHMuaGFzaCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIG5lZWQgdG8gdXBkYXRlIHdpbmRvdyBoYXNoXHJcbiAgICAgICAgZ2FsbGVyeSA9IGdldEdhbGxlcnlJRChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIGlmICghZ2FsbGVyeSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVmFyaWFibGUgY29udGFpbmluZyBsYXN0IGhhc2ggdmFsdWUgc2V0IGJ5IGZhbmN5Qm94XHJcbiAgICAgICAgLy8gSXQgd2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSBpZiBmYW5jeUJveCBuZWVkcyB0byBjbG9zZSBhZnRlciBoYXNoIGNoYW5nZSBpcyBkZXRlY3RlZFxyXG4gICAgICAgIGluc3RhbmNlLmN1cnJlbnRIYXNoID0gZ2FsbGVyeSArIChpbnN0YW5jZS5ncm91cC5sZW5ndGggPiAxID8gXCItXCIgKyAoY3VycmVudC5pbmRleCArIDEpIDogXCJcIik7XHJcblxyXG4gICAgICAgIC8vIElmIGN1cnJlbnQgaGFzaCBpcyB0aGUgc2FtZSAodGhpcyBpbnN0YW5jZSBtb3N0IGxpa2VseSBpcyBvcGVuZWQgYnkgaGFzaGNoYW5nZSksIHRoZW4gZG8gbm90aGluZ1xyXG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gXCIjXCIgKyBpbnN0YW5jZS5jdXJyZW50SGFzaCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpbnN0YW5jZS5vcmlnSGFzaCkge1xyXG4gICAgICAgICAgaW5zdGFuY2Uub3JpZ0hhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbnN0YW5jZS5oYXNoVGltZXIpIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dChpbnN0YW5jZS5oYXNoVGltZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIGhhc2hcclxuICAgICAgICBpbnN0YW5jZS5oYXNoVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKFwicmVwbGFjZVN0YXRlXCIgaW4gd2luZG93Lmhpc3RvcnkpIHtcclxuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnlbZmlyc3RSdW4gPyBcInB1c2hTdGF0ZVwiIDogXCJyZXBsYWNlU3RhdGVcIl0oXHJcbiAgICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUsXHJcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaCArIFwiI1wiICsgaW5zdGFuY2UuY3VycmVudEhhc2hcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmaXJzdFJ1bikge1xyXG4gICAgICAgICAgICAgIGluc3RhbmNlLmhhc0NyZWF0ZWRIaXN0b3J5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBpbnN0YW5jZS5jdXJyZW50SGFzaDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpbnN0YW5jZS5oYXNoVGltZXIgPSBudWxsO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBcImJlZm9yZUNsb3NlLmZiXCI6IGZ1bmN0aW9uKGUsIGluc3RhbmNlLCBjdXJyZW50KSB7XHJcbiAgICAgICAgdmFyIGdhbGxlcnk7XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50Lm9wdHMuaGFzaCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdhbGxlcnkgPSBnZXRHYWxsZXJ5SUQoaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAvLyBHb3RvIHByZXZpb3VzIGhpc3RvcnkgZW50cnlcclxuICAgICAgICBpZiAoaW5zdGFuY2UuY3VycmVudEhhc2ggJiYgaW5zdGFuY2UuaGFzQ3JlYXRlZEhpc3RvcnkpIHtcclxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGluc3RhbmNlLmN1cnJlbnRIYXNoKSB7XHJcbiAgICAgICAgICBpZiAoXCJyZXBsYWNlU3RhdGVcIiBpbiB3aW5kb3cuaGlzdG9yeSkge1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgKGluc3RhbmNlLm9yaWdIYXNoIHx8IFwiXCIpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaW5zdGFuY2Uub3JpZ0hhc2g7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnN0YW5jZS5jdXJyZW50SGFzaCA9IG51bGw7XHJcblxyXG4gICAgICAgIGNsZWFyVGltZW91dChpbnN0YW5jZS5oYXNoVGltZXIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiBuZWVkIHRvIHN0YXJ0L2Nsb3NlIGFmdGVyIHVybCBoYXMgY2hhbmdlZFxyXG4gICAgJCh3aW5kb3cpLm9uKFwiaGFzaGNoYW5nZS5mYlwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHVybCA9IHBhcnNlVXJsKCksXHJcbiAgICAgICAgZmI7XHJcblxyXG4gICAgICAvLyBGaW5kIGxhc3QgZmFuY3lCb3ggaW5zdGFuY2UgdGhhdCBoYXMgXCJoYXNoXCJcclxuICAgICAgJC5lYWNoKFxyXG4gICAgICAgICQoXCIuZmFuY3lib3gtY29udGFpbmVyXCIpXHJcbiAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgIC5yZXZlcnNlKCksXHJcbiAgICAgICAgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICB2YXIgdG1wID0gJCh2YWx1ZSkuZGF0YShcIkZhbmN5Qm94XCIpO1xyXG4gICAgICAgICAgLy9pc0Nsb3NpbmdcclxuICAgICAgICAgIGlmICh0bXAuY3VycmVudEhhc2gpIHtcclxuICAgICAgICAgICAgZmIgPSB0bXA7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAoZmIpIHtcclxuICAgICAgICAvLyBOb3csIGNvbXBhcmUgaGFzaCB2YWx1ZXNcclxuICAgICAgICBpZiAoZmIuY3VycmVudEhhc2ggJiYgZmIuY3VycmVudEhhc2ggIT09IHVybC5nYWxsZXJ5ICsgXCItXCIgKyB1cmwuaW5kZXggJiYgISh1cmwuaW5kZXggPT09IDEgJiYgZmIuY3VycmVudEhhc2ggPT0gdXJsLmdhbGxlcnkpKSB7XHJcbiAgICAgICAgICBmYi5jdXJyZW50SGFzaCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgZmIuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodXJsLmdhbGxlcnkgIT09IFwiXCIpIHtcclxuICAgICAgICB0cmlnZ2VyRnJvbVVybCh1cmwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDaGVjayBjdXJyZW50IGhhc2ggYW5kIHRyaWdnZXIgY2xpY2sgZXZlbnQgb24gbWF0Y2hpbmcgZWxlbWVudCB0byBzdGFydCBmYW5jeUJveCwgaWYgbmVlZGVkXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoISQuZmFuY3lib3guZ2V0SW5zdGFuY2UoKSkge1xyXG4gICAgICAgIHRyaWdnZXJGcm9tVXJsKHBhcnNlVXJsKCkpO1xyXG4gICAgICB9XHJcbiAgICB9LCA1MCk7XHJcbiAgfSk7XHJcbn0pKGRvY3VtZW50LCB3aW5kb3csIHdpbmRvdy5qUXVlcnkgfHwgalF1ZXJ5KTtcclxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vL1xyXG4vLyBXaGVlbFxyXG4vLyBCYXNpYyBtb3VzZSB3ZWhlZWwgc3VwcG9ydCBmb3IgZ2FsbGVyeSBuYXZpZ2F0aW9uXHJcbi8vXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbihmdW5jdGlvbihkb2N1bWVudCwgJCkge1xyXG4gIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICB2YXIgcHJldlRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcbiAgJChkb2N1bWVudCkub24oe1xyXG4gICAgXCJvbkluaXQuZmJcIjogZnVuY3Rpb24oZSwgaW5zdGFuY2UsIGN1cnJlbnQpIHtcclxuICAgICAgaW5zdGFuY2UuJHJlZnMuc3RhZ2Uub24oXCJtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsIHdoZWVsIE1vek1vdXNlUGl4ZWxTY3JvbGxcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBjdXJyZW50ID0gaW5zdGFuY2UuY3VycmVudCxcclxuICAgICAgICAgIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgICAgIGlmIChpbnN0YW5jZS5ncm91cC5sZW5ndGggPCAyIHx8IGN1cnJlbnQub3B0cy53aGVlbCA9PT0gZmFsc2UgfHwgKGN1cnJlbnQub3B0cy53aGVlbCA9PT0gXCJhdXRvXCIgJiYgY3VycmVudC50eXBlICE9PSBcImltYWdlXCIpKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnQuJHNsaWRlLmhhc0NsYXNzKFwiZmFuY3lib3gtYW5pbWF0ZWRcIikpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGUgPSBlLm9yaWdpbmFsRXZlbnQgfHwgZTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJUaW1lIC0gcHJldlRpbWUgPCAyNTApIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZUaW1lID0gY3VyclRpbWU7XHJcblxyXG4gICAgICAgIGluc3RhbmNlWygtZS5kZWx0YVkgfHwgLWUuZGVsdGFYIHx8IGUud2hlZWxEZWx0YSB8fCAtZS5kZXRhaWwpIDwgMCA/IFwibmV4dFwiIDogXCJwcmV2aW91c1wiXSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufSkoZG9jdW1lbnQsIHdpbmRvdy5qUXVlcnkgfHwgalF1ZXJ5KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGZhbmN5YXBwcy9mYW5jeWJveC9kaXN0L2pxdWVyeS5mYW5jeWJveC5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgQ29udGFjdE1lbnUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy4kY29udGFpbmVyID0gJCgnLmNvbnRhY3QtbWVudScpO1xyXG4gICAgdGhpcy4kdG9nZ2xlID0gJCgnLmNvbnRhY3QtbWVudS10b2dnbGUnKTtcclxuICAgIHRoaXMubWVudUlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgb3BlbigpIHtcclxuICAgIGNvbnN0IHRleHQgPSAn0JfQsNC60YDRi9GC0Ywg0LzQtdC90Y4g0LrQvtC90YLQsNC60YLQvtCyJztcclxuXHJcbiAgICAkKCcucGFnZScpLmFkZENsYXNzKCdwYWdlX292ZXJmbG93LWhpZGRlbicpO1xyXG5cclxuICAgIHRoaXMuJGNvbnRhaW5lci5hZGRDbGFzcygnY29udGFjdC1tZW51X3Zpc2libGUnKTtcclxuICAgIHRoaXMubWVudUlzVmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy4kdG9nZ2xlXHJcbiAgICAgIC5hZGRDbGFzcygncGhvbmUtdG9nZ2xlX2Nsb3NlJylcclxuICAgICAgLmF0dHIoJ3RpdGxlJywgdGV4dClcclxuICAgICAgLmZpbmQoJy52aXN1YWxseS1oaWRkZW4nKVxyXG4gICAgICAgIC50ZXh0KHRleHQpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKSB7XHJcbiAgICBjb25zdCB0ZXh0ID0gJ9Ce0YLQutGA0YvRgtGMINC80LXQvdGOINC60L7QvdGC0LDQutGC0L7Qsic7XHJcblxyXG4gICAgJCgnLnBhZ2UnKS5yZW1vdmVDbGFzcygncGFnZV9vdmVyZmxvdy1oaWRkZW4nKTtcclxuXHJcbiAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2NvbnRhY3QtbWVudV92aXNpYmxlJyk7XHJcbiAgICB0aGlzLm1lbnVJc1Zpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLiR0b2dnbGVcclxuICAgICAgLnJlbW92ZUNsYXNzKCdwaG9uZS10b2dnbGVfY2xvc2UnKVxyXG4gICAgICAuYXR0cigndGl0bGUnLCB0ZXh0KVxyXG4gICAgICAuZmluZCgnLnZpc3VhbGx5LWhpZGRlbicpXHJcbiAgICAgICAgLnRleHQodGV4dCk7XHJcbiAgfVxyXG5cclxuICBfdG9nZ2xlID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMubWVudUlzVmlzaWJsZSkgdGhpcy5jbG9zZSgpO1xyXG4gICAgZWxzZSB0aGlzLm9wZW4oKTtcclxuICB9XHJcblxyXG4gIF9pdGVtQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMubWVudUlzVmlzaWJsZSkgdGhpcy5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgX2RvY3VtZW50S2V5ZG93biA9IChlKSA9PiB7XHJcbiAgICBpZiAoIXRoaXMubWVudUlzVmlzaWJsZSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0XHJcbiAgICAgIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCksXHJcbiAgICAgICR0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHJcbiAgICAvLyBlc2NhcGVcclxuICAgIGlmIChlLmtleUNvZGUgPT0gMjcpIHtcclxuICAgICAgY29uc3Qgd2luZG93V2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgaWYgKHdpbmRvd1dpZHRoIDwgOTkyKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIHRoaXMuJHRvZ2dsZS5mb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGFiXHJcbiAgICBpZiAoZS5rZXlDb2RlID09IDkgJiYgIWUuc2hpZnRLZXkpIHtcclxuICAgICAgaWYgKHdpbmRvd1dpZHRoIDwgOTkyKSB7XHJcbiAgICAgICAgLy8gdG9nZ2xlXHJcbiAgICAgICAgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoJ2NvbnRhY3QtbWVudS10b2dnbGUnKSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgdGhpcy4kY29udGFpbmVyLmZpbmQoJ3VsOmZpcnN0LWNoaWxkID4gbGk6Zmlyc3QtY2hpbGQgPiBhJykuZm9jdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGxhc3QgbGlua1xyXG4gICAgICAgIGlmICgkdGFyZ2V0LmlzKCcuY29udGFjdC1tZW51IHVsOmxhc3QtY2hpbGQgPiBsaTpsYXN0LWNoaWxkID4gYScpKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB0aGlzLiR0b2dnbGUuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB0YWIgKyBzaGlmdFxyXG4gICAgaWYgKGUua2V5Q29kZSA9PSA5ICYmIGUuc2hpZnRLZXkpIHtcclxuICAgICAgaWYgKHdpbmRvd1dpZHRoIDwgOTkyKSB7XHJcbiAgICAgICAgLy8gdG9nZ2xlXHJcbiAgICAgICAgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoJ2NvbnRhY3QtbWVudS10b2dnbGUnKSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgdGhpcy4kY29udGFpbmVyLmZpbmQoJ3VsOmxhc3QtY2hpbGQgPiBsaTpsYXN0LWNoaWxkID4gYScpLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBmaXJzdCBsaW5rXHJcbiAgICAgICAgaWYgKCR0YXJnZXQuaXMoJ3VsOmZpcnN0LWNoaWxkID4gbGk6Zmlyc3QtY2hpbGQgPiBhJykpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIHRoaXMuJHRvZ2dsZS5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3dpbmRvd1Jlc2l6ZSA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLm1lbnVJc1Zpc2libGUpIHRoaXMuY2xvc2UoKTtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIHRoaXMuX3dpbmRvd1Jlc2l6ZSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2tleWRvd24nLCB0aGlzLl9kb2N1bWVudEtleWRvd24pO1xyXG5cclxuICAgIHRoaXMuJHRvZ2dsZS5vbignY2xpY2snLCB0aGlzLl90b2dnbGUpO1xyXG4gICAgJCgnLmNvbnRhY3QtbWVudV9fc29jaWFscyAuc29jaWFsc19fbGluaywgLmNvbnRhY3QtbWVudV9fcGhvbmVzLWxpbmsnKS5vbignY2xpY2snLCB0aGlzLl9pdGVtQ2xpY2tIYW5kbGVyKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgQ29udGFjdE1lbnUoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvQ29udGFjdE1lbnUuanMiLCJjbGFzcyBNZW51IHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoJy5tZW51Jyk7XHJcbiAgICB0aGlzLiRkcm9wZG93blRvZ2dsZSA9ICQoJy5tZW51X19kcm9wZG93bi10b2dnbGUnKTtcclxuICAgIHRoaXMuJGJhY2tUb2dnbGUgPSAkKCcubWVudV9fYmFjay10b2dnbGUnKTtcclxuICAgIHRoaXMuJHRvZ2dsZSA9ICQoJy5tZW51X190b2dnbGUnKTtcclxuICAgIHRoaXMubWVudUlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLy8gaGlkZGVuIGRyb3Bkb3ducyBvbiBkZXNjdG9wXHJcbiAgX2RvY3VtZW50SGFuZGxlcihlKSB7XHJcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA5OTIpIHJldHVybjtcclxuXHJcbiAgICBpZiAoISQoZS50YXJnZXQpLmNsb3Nlc3QoJy5tZW51X19pdGVtLWhhcy1kcm9wZG93bicpLmxlbmd0aCkge1xyXG4gICAgICAkKCcubWVudV9fY2VudGVyZWRfdmlzaWJsZScpLnJlbW92ZUNsYXNzKCdtZW51X19jZW50ZXJlZF92aXNpYmxlJyk7XHJcbiAgICAgICQoJy5tZW51X19jZW50ZXJlZF9oaWRkZW4taXRlbXMnKS5yZW1vdmVDbGFzcygnbWVudV9fY2VudGVyZWRfaGlkZGVuLWl0ZW1zJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfZHJvcGRvd25IYW5kbGVyKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xyXG5cclxuICAgIGlmICh3aW5kb3dXaWR0aCA+IDk5MSkge1xyXG4gICAgICBjb25zdFxyXG4gICAgICAgICR2aXNpYmxlRHJvcGRvd25zID0gJCh0aGlzKS5jbG9zZXN0KCdsaScpLmZpbmQoJy5tZW51X19jZW50ZXJlZF92aXNpYmxlJyksXHJcbiAgICAgICAgJGhhc0Ryb3Bkb3duU2libGluZ3MgPSAkKHRoaXMpLmNsb3Nlc3QoJy5tZW51X19pdGVtLWhhcy1kcm9wZG93bicpLnNpYmxpbmdzKCcubWVudV9faXRlbS1oYXMtZHJvcGRvd24nKTtcclxuXHJcbiAgICAgIC8vIGNsb3NlIGRyb3Bkb3ducyBvZiBzaWJsaW5nc1xyXG4gICAgICBpZiAoJGhhc0Ryb3Bkb3duU2libGluZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgJGhhc0Ryb3Bkb3duU2libGluZ3NcclxuICAgICAgICAgIC5maW5kKCcubWVudV9fY2VudGVyZWRfdmlzaWJsZScpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbWVudV9fY2VudGVyZWRfdmlzaWJsZSBtZW51X19jZW50ZXJlZF9oaWRkZW4taXRlbXMnKVxyXG4gICAgICB9XHJcbiAgICBcclxuICAgICAgLy8gY2xvc2UgZHJvcGRvd25zIG9mIGNoaWxkcmVuXHJcbiAgICAgIGlmICgkdmlzaWJsZURyb3Bkb3ducy5sZW5ndGgpIHtcclxuICAgICAgICAkdmlzaWJsZURyb3Bkb3ducy5yZW1vdmVDbGFzcygnbWVudV9fY2VudGVyZWRfdmlzaWJsZSBtZW51X19jZW50ZXJlZF9oaWRkZW4taXRlbXMnKTtcclxuICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAuY2xvc2VzdCgnLm1lbnVfX2NlbnRlcmVkJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdtZW51X19jZW50ZXJlZF9oaWRkZW4taXRlbXMnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICBoaWRkZW4gY3VycmVudCBsaW5rcy5cclxuICAgICAgc2hvdyBuZXh0IGRyb3Bkb3duLlxyXG4gICAgKi9cclxuICAgICQodGhpcylcclxuICAgIC5jbG9zZXN0KCcubWVudV9fY2VudGVyZWQnKVxyXG4gICAgICAuYWRkQ2xhc3MoJ21lbnVfX2NlbnRlcmVkX2hpZGRlbi1pdGVtcycpXHJcbiAgICAgIC5lbmQoKVxyXG4gICAgLm5leHQoJy5tZW51X19jZW50ZXJlZCcpXHJcbiAgICAgIC5hZGRDbGFzcygnbWVudV9fY2VudGVyZWRfdmlzaWJsZScpO1xyXG4gIFxyXG4gICAgaWYgKHdpbmRvd1dpZHRoIDwgOTkyKSB7XHJcbiAgICAgICQodGhpcykuYmx1cigpO1xyXG4gICAgICAvKlxyXG4gICAgICAgIHNldCBmb2N1cyBvbiAubWVudV9fYmFjay10b2dnbGVcclxuICAgICAgICBzZXRUaW1lb3V0IC0gZml4IGZvciBGaXJlZm94ICEhISEhISEhIVxyXG4gICAgICAqL1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAkKCcubWVudV9fY2VudGVyZWRfdmlzaWJsZTpub3QoLm1lbnVfX2NlbnRlcmVkX2hpZGRlbi1pdGVtcyknKVxyXG4gICAgICAgICAgLmZpbmQoJy5tZW51X19iYWNrLXRvZ2dsZScpXHJcbiAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcbiAgICAgIH0sIDIwMCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgX2JhY2tIYW5kbGVyKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIFxyXG4gICAgLypcclxuICAgICAgaGlkZGVuIGN1cnJlbnQgZHJvcGRvd24uXHJcbiAgICAgIHNob3cgbGlua3Mgb2YgcHJldmlvdXMgZHJvcGRvd24uXHJcbiAgICAgIHJlbW92ZSBmb2N1cyBmb3IgYmFjay10b2dnbGUuXHJcbiAgICAgIHNldCBmb2N1cyBmb3IgY3VycmVudCBkcm9wZG93bi10b2dnbGUuXHJcbiAgICAqL1xyXG4gICAgJCh0aGlzKVxyXG4gICAgICAuY2xvc2VzdCgnLm1lbnVfX2NlbnRlcmVkJylcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ21lbnVfX2NlbnRlcmVkX3Zpc2libGUnKVxyXG4gICAgICAuY2xvc2VzdCgnLm1lbnVfX2NlbnRlcmVkX2hpZGRlbi1pdGVtcycpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdtZW51X19jZW50ZXJlZF9oaWRkZW4taXRlbXMnKVxyXG4gICAgICAgIC5lbmQoKVxyXG4gICAgICAuY2xvc2VzdCgnLm1lbnVfX2l0ZW0taGFzLWRyb3Bkb3duJylcclxuICAgICAgICAuZmluZCgnLm1lbnVfX2Ryb3Bkb3duLXRvZ2dsZScpXHJcbiAgICAgICAgICAuYmx1cigpXHJcbiAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIG9wZW4oKSB7XHJcbiAgICBjb25zdCB0ZXh0ID0gJ9CX0LDQutGA0YvRgtGMINC80LXQvdGOJztcclxuXHJcbiAgICAkKCcucGFnZScpLmFkZENsYXNzKCdwYWdlX292ZXJmbG93LWhpZGRlbicpO1xyXG5cclxuICAgIHRoaXMuJGNvbnRhaW5lci5hZGRDbGFzcygnbWVudV92aXNpYmxlJyk7XHJcbiAgICB0aGlzLm1lbnVJc1Zpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuJHRvZ2dsZVxyXG4gICAgICAuYWRkQ2xhc3MoJ2hhbWJ1cmdlcl9jbG9zZScpXHJcbiAgICAgIC5hdHRyKCd0aXRsZScsIHRleHQpXHJcbiAgICAgIC5maW5kKCcudmlzdWFsbHktaGlkZGVuJylcclxuICAgICAgICAudGV4dCh0ZXh0KTtcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgY29uc3QgdGV4dCA9ICfQntGC0LrRgNGL0YLRjCDQvNC10L3Rjic7XHJcblxyXG4gICAgJCgnLnBhZ2UnKS5yZW1vdmVDbGFzcygncGFnZV9vdmVyZmxvdy1oaWRkZW4nKTtcclxuXHJcbiAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ21lbnVfdmlzaWJsZScpO1xyXG4gICAgdGhpcy5tZW51SXNWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy4kdG9nZ2xlXHJcbiAgICAgIC5yZW1vdmVDbGFzcygnaGFtYnVyZ2VyX2Nsb3NlJylcclxuICAgICAgLmF0dHIoJ3RpdGxlJywgdGV4dClcclxuICAgICAgLmZpbmQoJy52aXN1YWxseS1oaWRkZW4nKVxyXG4gICAgICAgIC50ZXh0KHRleHQpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2VBbGxEcm9wZG93bnMoKSB7XHJcbiAgICAkKCcubWVudV9fY2VudGVyZWRfaGlkZGVuLWl0ZW1zJykucmVtb3ZlQ2xhc3MoJ21lbnVfX2NlbnRlcmVkX2hpZGRlbi1pdGVtcycpO1xyXG5cclxuICAgICQoJy5tZW51X19kcm9wZG93bi5tZW51X19jZW50ZXJlZF92aXNpYmxlJylcclxuICAgICAgLnJlbW92ZUNsYXNzKCdtZW51X19jZW50ZXJlZF92aXNpYmxlJylcclxuICAgICAgLmNsb3Nlc3QoJy5tZW51X19pdGVtJylcclxuICAgICAgICAuZmluZCgnLm1lbnVfX2Ryb3Bkb3duLXRvZ2dsZScpXHJcbiAgICAgICAgICAuZmlyc3QoKSBcclxuICAgICAgICAgICAgLmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBfdG9nZ2xlID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMubWVudUlzVmlzaWJsZSkgdGhpcy5jbG9zZSgpO1xyXG4gICAgZWxzZSB0aGlzLm9wZW4oKTtcclxuICB9XHJcblxyXG4gIF9jb250YWluZXJLZXlkb3duID0gKGUpID0+IHtcclxuICAgIGNvbnN0XHJcbiAgICAgIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCksXHJcbiAgICAgICR0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHJcbiAgICAvLyBlc2NhcGVcclxuICAgIGlmIChlLmtleUNvZGUgPT0gMjcpIHtcclxuICAgICAgY29uc3Qgd2luZG93V2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgaWYgKHdpbmRvd1dpZHRoID4gOTkxKSB0aGlzLmNsb3NlQWxsRHJvcGRvd25zKCk7XHJcblxyXG4gICAgICBpZiAod2luZG93V2lkdGggPCA5OTIgJiYgdGhpcy5tZW51SXNWaXNpYmxlKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIHRoaXMuJHRvZ2dsZS5mb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGFiXHJcbiAgICBpZiAoZS5rZXlDb2RlID09IDkgJiYgIWUuc2hpZnRLZXkpIHtcclxuICAgICAgaWYgKHdpbmRvd1dpZHRoIDwgOTkyKSB7XHJcbiAgICAgICAgLy8gbGFzdCBsaW5rXHJcbiAgICAgICAgaWYgKCR0YXJnZXQuaXMoJy5tZW51X19jZW50ZXJlZDpub3QoLm1lbnVfX2NlbnRlcmVkX2hpZGRlbi1pdGVtcykgbGk6dmlzaWJsZTpsYXN0LWNoaWxkID4gYScpKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB0aGlzLiR0b2dnbGUuZm9jdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRvZ2dsZVxyXG4gICAgICAgIGlmICgkdGFyZ2V0Lmhhc0NsYXNzKCdtZW51X190b2dnbGUnKSAmJiB0aGlzLm1lbnVJc1Zpc2libGUpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICQoJy5tZW51X19jZW50ZXJlZDpub3QoLm1lbnVfX2NlbnRlcmVkX2hpZGRlbi1pdGVtcykgbGk6dmlzaWJsZTpmaXJzdC1jaGlsZCA+IGEnKS5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHRhYiArIHNoaWZ0XHJcbiAgICBpZiAoZS5rZXlDb2RlID09IDkgJiYgZS5zaGlmdEtleSkge1xyXG4gICAgICAvLyBmaXJzdCBsaW5rXHJcbiAgICAgIGlmICh3aW5kb3dXaWR0aCA8IDk5Mikge1xyXG4gICAgICAgIGlmICgkdGFyZ2V0LmlzKCcubWVudV9fY2VudGVyZWQ6bm90KC5tZW51X19jZW50ZXJlZF9oaWRkZW4taXRlbXMpIGxpOnZpc2libGU6Zmlyc3QtY2hpbGQgPiBhJykpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIHRoaXMuJHRvZ2dsZS5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdG9nZ2xlXHJcbiAgICAgICAgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoJ21lbnVfX3RvZ2dsZScpICYmIHRoaXMubWVudUlzVmlzaWJsZSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgJCgnLm1lbnVfX2NlbnRlcmVkOm5vdCgubWVudV9fY2VudGVyZWRfaGlkZGVuLWl0ZW1zKSBsaTp2aXNpYmxlOmxhc3QtY2hpbGQgPiBhJykuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIF93aW5kb3dSZXNpemUgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5tZW51SXNWaXNpYmxlKSAgdGhpcy5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgICQod2luZG93KS5vbigncmVzaXplJywgdGhpcy5fd2luZG93UmVzaXplKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLl9kb2N1bWVudEhhbmRsZXIpO1xyXG4gICAgdGhpcy4kZHJvcGRvd25Ub2dnbGUub24oJ2NsaWNrJywgdGhpcy5fZHJvcGRvd25IYW5kbGVyKTtcclxuICAgIHRoaXMuJGJhY2tUb2dnbGUub24oJ2NsaWNrJywgdGhpcy5fYmFja0hhbmRsZXIpO1xyXG4gICAgdGhpcy4kdG9nZ2xlLm9uKCdjbGljaycsIHRoaXMuX3RvZ2dsZSk7XHJcbiAgICBcclxuICAgIHRoaXMuJGNvbnRhaW5lci5vbigna2V5ZG93bicsIHRoaXMuX2NvbnRhaW5lcktleWRvd24pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBNZW51KCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL01lbnUuanMiLCJpbXBvcnQgc2xpY2sgZnJvbSAnZXhwb3J0cy1sb2FkZXI/JC5mbi5zbGljayEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2xpY2stY2Fyb3VzZWwvc2xpY2svc2xpY2suanMnO1xyXG5cclxuXHJcbmNsYXNzIFByb2plY3RzIHtcclxuICBpbml0KCkge1xyXG4gICAgJCgnLnByb2plY3RzX19saXN0Jykuc2xpY2soe1xyXG4gICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICBzbGlkZXNUb1Njcm9sbDogMyxcclxuICAgICAgcHJldkFycm93OiAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzbGljay1wcmV2XCI+PHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj7QndCw0LfQsNC0PC9zcGFuPjwvYnV0dG9uPicsXHJcbiAgICAgIG5leHRBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dFwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0JLQv9C10YDQtdC0PC9zcGFuPjwvYnV0dG9uPmEnLFxyXG4gICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxyXG4gICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgYnJlYWtwb2ludDogNTc2LFxyXG4gICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IFByb2plY3RzKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL1Byb2plY3RzLmpzIiwiaW1wb3J0IHNsaWNrIGZyb20gJ2V4cG9ydHMtbG9hZGVyPyQuZm4uc2xpY2shLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NsaWNrLWNhcm91c2VsL3NsaWNrL3NsaWNrLmpzJztcclxuXHJcbmNsYXNzIFRlYW0ge1xyXG4gIGluaXQoKSB7XHJcbiAgICAkKCcudGVhbScpLnNsaWNrKHtcclxuICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgc2xpZGVzVG9TY3JvbGw6IDQsXHJcbiAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldlwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0J3QsNC30LDQtDwvc3Bhbj48L2J1dHRvbj4nLFxyXG4gICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHRcIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCS0L/QtdGA0LXQtDwvc3Bhbj48L2J1dHRvbj4nLFxyXG4gICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYnJlYWtwb2ludDogMTE1MCxcclxuICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDNcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LHtcclxuICAgICAgICAgIGJyZWFrcG9pbnQ6IDk5MixcclxuICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LHtcclxuICAgICAgICAgIGJyZWFrcG9pbnQ6IDU3NixcclxuICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBUZWFtKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL1RlYW0uanMiLCJpbXBvcnQgc2xpY2sgZnJvbSAnZXhwb3J0cy1sb2FkZXI/JC5mbi5zbGljayEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2xpY2stY2Fyb3VzZWwvc2xpY2svc2xpY2suanMnO1xyXG5cclxuY2xhc3MgQnJhbmRzIHtcclxuICBpbml0KCkge1xyXG4gICAgJCgnLmJyYW5kcycpLnNsaWNrKHtcclxuICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgc2xpZGVzVG9TY3JvbGw6IDQsXHJcbiAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldlwiPjxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+0J3QsNC30LDQtDwvc3Bhbj48L2J1dHRvbj4nLFxyXG4gICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHRcIj48c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPtCS0L/QtdGA0LXQtDwvc3Bhbj48L2J1dHRvbj4nLFxyXG4gICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcclxuICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDNcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LHtcclxuICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcclxuICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LHtcclxuICAgICAgICAgIGJyZWFrcG9pbnQ6IDU3NixcclxuICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBCcmFuZHMoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvQnJhbmRzLmpzIiwiY2xhc3MgRmlsZVVwbG9hZCB7XHJcbiAgaW5pdCgpIHtcclxuICAgICQoJy5maWxlLXVwbG9hZF9faW5wdXRmaWxlJykub24oJ2NoYW5nZScsIHRoaXMuX2NoYW5nZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgX2NoYW5nZUhhbmRsZXIoZSkge1xyXG4gICAgY29uc3QgJGNvbnRhaW5lciA9ICQodGhpcykuY2xvc2VzdCgnLmZpbGUtdXBsb2FkJyk7XHJcblxyXG4gICAgbGV0XHJcbiAgICAgIGZpbGVzID0gdGhpcy5maWxlcyxcclxuICAgICAgJHVsID0gJGNvbnRhaW5lci5maW5kKCcuZmlsZS11cGxvYWRfX2xpc3QnKTtcclxuXHJcbiAgICBpZiAoZmlsZXMubGVuZ3RoKSB7XHJcbiAgICAgIGlmICgkdWwubGVuZ3RoKSAkdWwucmVtb3ZlKCk7XHJcblxyXG4gICAgICAkdWwgPSAkKCc8dWwgY2xhc3M9XCJmaWxlLXVwbG9hZF9fbGlzdFwiPicpO1xyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0XHJcbiAgICAgICAgICBmaWxlID0gZmlsZXNbaV0sXHJcbiAgICAgICAgICAkbGkgPSAkKCc8bGkgY2xhc3M9XCJmaWxlLXVwbG9hZF9fbGlzdC1pdGVtXCI+Jyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpVHBsID0gYDxkaXYgY2xhc3M9XCJmaWxlLXVwbG9hZF9fbGlzdC1pdGVtLWRhdGFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsZS11cGxvYWRfX2xpc3QtaXRlbS1uYW1lXCI+JHtmaWxlLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpbGUtdXBsb2FkX19saXN0LWl0ZW0tc2l6ZVwiPiR7KGZpbGUuc2l6ZSAvIDEwMDApLnRvRml4ZWQoMil9IEtiPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gICAgICAgICRsaS5odG1sKGxpVHBsKTtcclxuXHJcbiAgICAgICAgJHVsLmFwcGVuZCgkbGkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkY29udGFpbmVyLmFwcGVuZCgkdWwpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBGaWxlVXBsb2FkKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL0ZpbGVVcGxvYWQuanMiLCJjbGFzcyBUYWJzIHtcclxuICBpbml0KCkge1xyXG4gICAgJCgnLnRhYnNfX2NvbnRyb2xzLWxpbmsnKS5vbignY2xpY2snLCB0aGlzLl90b2dnbGVIYW5kbGVyKSBcclxuICB9XHJcblxyXG4gIF90b2dnbGVIYW5kbGVyKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIFxyXG4gICAgY29uc3QgcHJlc3NlZExpbmsgPSAkKHRoaXMpO1xyXG4gICAgXHJcbiAgICBpZiAocHJlc3NlZExpbmsuaGFzQ2xhc3MoJ3RhYnNfX2NvbnRyb2xzLWxpbmtfYWN0aXZlJykpIHJldHVybjtcclxuICAgIFxyXG4gICAgY29uc3RcclxuICAgICAgY29udGFpbmVyID0gcHJlc3NlZExpbmsuY2xvc2VzdCgnLnRhYnMnKSxcclxuICAgICAgYWN0aXZlTGluayA9IGNvbnRhaW5lci5maW5kKCcudGFic19fY29udHJvbHMtbGlua19hY3RpdmUnKSxcclxuICAgICAgdmlzaWJsZUNvbnRlbnQgPSBjb250YWluZXIuZmluZCgnLnRhYnNfX2NvbnRlbnRfdmlzaWJsZScpLFxyXG4gICAgICByZXF1aXJlZENvbnRlbnQgPSBjb250YWluZXIuZmluZChwcmVzc2VkTGluay5hdHRyKCdocmVmJykpO1xyXG4gICAgXHJcbiAgICBhY3RpdmVMaW5rLnJlbW92ZUNsYXNzKCd0YWJzX19jb250cm9scy1saW5rX2FjdGl2ZScpO1xyXG4gICAgdmlzaWJsZUNvbnRlbnQucmVtb3ZlQ2xhc3MoJ3RhYnNfX2NvbnRlbnRfdmlzaWJsZScpO1xyXG4gICAgXHJcbiAgICBwcmVzc2VkTGluay5hZGRDbGFzcygndGFic19fY29udHJvbHMtbGlua19hY3RpdmUnKTtcclxuICAgIHJlcXVpcmVkQ29udGVudC5hZGRDbGFzcygndGFic19fY29udGVudF92aXNpYmxlJyk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IFRhYnMoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvVGFicy5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3Q4RkE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBK0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFuREE7QUFxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBaUJBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckVBO0FBQ0E7Ozs7O0FBRUE7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBO0FBREE7QUFlQTtBQUNBO0FBQ0E7QUE1QkE7QUE4QkE7Ozs7O0FBSUE7Ozs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2poS0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBREE7QUFxQ0E7QUFFQTtBQUNBO0FBeENBO0FBMENBO0FBQ0E7QUFDQTtBQTVDQTtBQThDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFqR0E7QUFtR0E7QUFDQTtBQUNBO0FBcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTs7O0FBb0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xIQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFEQTtBQXVJQTtBQUVBO0FBQ0E7QUExSUE7QUE0SUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL0xBO0FBaU1BO0FBQ0E7QUFDQTtBQWxNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBSUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFXQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQU1BOzs7QUFnRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsTkE7QUFDQTs7Ozs7QUFFQTs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFiQTtBQXNCQTs7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9CQTtBQUNBOzs7OztBQUNBOzs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQW5CQTtBQTRCQTs7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUNBOzs7OztBQUNBOzs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQW5CQTtBQTRCQTs7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcENBOzs7Ozs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7Ozs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBSUE7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==