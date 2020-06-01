/*!
  * Cadence Homepage Theme
  * Copyright 2018-2020 Medium Rare (undefined)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('aos'), require('jquery'), require('scrollmonitor'), require('flickity'), require('jarallax'), require('smooth-scroll'), require('@tanem/svg-injector'), require('typed.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'aos', 'jquery', 'scrollmonitor', 'flickity', 'jarallax', 'smooth-scroll', '@tanem/svg-injector', 'typed.js'], factory) :
  (global = global || self, factory(global.theme = {}, global.AOS, global.jQuery, global.scrollMonitor, global.Flickity, global.jarallax, global.SmoothScroll, global.SVGInjector, global.Typed));
}(this, (function (exports, AOS, jQuery$1, scrollMonitor, Flickity, jarallax$1, SmoothScroll, svgInjector, Typed) { 'use strict';

  AOS = AOS && AOS.hasOwnProperty('default') ? AOS['default'] : AOS;
  jQuery$1 = jQuery$1 && jQuery$1.hasOwnProperty('default') ? jQuery$1['default'] : jQuery$1;
  scrollMonitor = scrollMonitor && scrollMonitor.hasOwnProperty('default') ? scrollMonitor['default'] : scrollMonitor;
  Flickity = Flickity && Flickity.hasOwnProperty('default') ? Flickity['default'] : Flickity;
  jarallax$1 = jarallax$1 && jarallax$1.hasOwnProperty('default') ? jarallax$1['default'] : jarallax$1;
  SmoothScroll = SmoothScroll && SmoothScroll.hasOwnProperty('default') ? SmoothScroll['default'] : SmoothScroll;
  Typed = Typed && Typed.hasOwnProperty('default') ? Typed['default'] : Typed;

  //
  $(window).on('load', function () {
    AOS.init({
      once: true
    });
  });

  //

  (function ($) {
    if ('objectFit' in document.documentElement.style === false) {
      $('.bg-image').each(function attachBg() {
        var img = $(this);
        var src = img.attr('src');
        var classes = img.get(0).classList; // Replaces the default <img.bg-image> element with a <div.bg-image>
        // to attach background using legacy friendly CSS rules

        img.before($("<div class=\"" + classes + "\" style=\"background: url(" + src + "); background-size: cover; background-position: 50% 50%;\"></div>")); // Removes original <img.bg-image> as it is no longer required

        img.remove();
      });
    }
  })(jQuery$1);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /*!
   * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
   * Copyright (c) 2016 Edson Hilios
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy of
   * this software and associated documentation files (the "Software"), to deal in
   * the Software without restriction, including without limitation the rights to
   * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
   * the Software, and to permit persons to whom the Software is furnished to do so,
   * subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
   * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
   * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
   * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
   * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
  (function(factory) {
      if (typeof define === "function" && define.amd) {
          define([ "jquery" ], factory);
      } else {
          factory(jQuery);
      }
  })(function($) {
      var instances = [], matchers = [], defaultOptions = {
          precision: 100,
          elapse: false,
          defer: false
      };
      matchers.push(/^[0-9]*$/.source);
      matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
      matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
      matchers = new RegExp(matchers.join("|"));
      function parseDateString(dateString) {
          if (dateString instanceof Date) {
              return dateString;
          }
          if (String(dateString).match(matchers)) {
              if (String(dateString).match(/^[0-9]*$/)) {
                  dateString = Number(dateString);
              }
              if (String(dateString).match(/\-/)) {
                  dateString = String(dateString).replace(/\-/g, "/");
              }
              return new Date(dateString);
          } else {
              throw new Error("Couldn't cast `" + dateString + "` to a date object.");
          }
      }
      var DIRECTIVE_KEY_MAP = {
          Y: "years",
          m: "months",
          n: "daysToMonth",
          d: "daysToWeek",
          w: "weeks",
          W: "weeksToMonth",
          H: "hours",
          M: "minutes",
          S: "seconds",
          D: "totalDays",
          I: "totalHours",
          N: "totalMinutes",
          T: "totalSeconds"
      };
      function escapedRegExp(str) {
          var sanitize = str.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
          return new RegExp(sanitize);
      }
      function strftime(offsetObject) {
          return function(format) {
              var directives = format.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
              if (directives) {
                  for (var i = 0, len = directives.length; i < len; ++i) {
                      var directive = directives[i].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), regexp = escapedRegExp(directive[0]), modifier = directive[1] || "", plural = directive[3] || "", value = null;
                      directive = directive[2];
                      if (DIRECTIVE_KEY_MAP.hasOwnProperty(directive)) {
                          value = DIRECTIVE_KEY_MAP[directive];
                          value = Number(offsetObject[value]);
                      }
                      if (value !== null) {
                          if (modifier === "!") {
                              value = pluralize(plural, value);
                          }
                          if (modifier === "") {
                              if (value < 10) {
                                  value = "0" + value.toString();
                              }
                          }
                          format = format.replace(regexp, value.toString());
                      }
                  }
              }
              format = format.replace(/%%/, "%");
              return format;
          };
      }
      function pluralize(format, count) {
          var plural = "s", singular = "";
          if (format) {
              format = format.replace(/(:|;|\s)/gi, "").split(/\,/);
              if (format.length === 1) {
                  plural = format[0];
              } else {
                  singular = format[0];
                  plural = format[1];
              }
          }
          if (Math.abs(count) > 1) {
              return plural;
          } else {
              return singular;
          }
      }
      var Countdown = function(el, finalDate, options) {
          this.el = el;
          this.$el = $(el);
          this.interval = null;
          this.offset = {};
          this.options = $.extend({}, defaultOptions);
          this.instanceNumber = instances.length;
          instances.push(this);
          this.$el.data("countdown-instance", this.instanceNumber);
          if (options) {
              if (typeof options === "function") {
                  this.$el.on("update.countdown", options);
                  this.$el.on("stoped.countdown", options);
                  this.$el.on("finish.countdown", options);
              } else {
                  this.options = $.extend({}, defaultOptions, options);
              }
          }
          this.setFinalDate(finalDate);
          if (this.options.defer === false) {
              this.start();
          }
      };
      $.extend(Countdown.prototype, {
          start: function() {
              if (this.interval !== null) {
                  clearInterval(this.interval);
              }
              var self = this;
              this.update();
              this.interval = setInterval(function() {
                  self.update.call(self);
              }, this.options.precision);
          },
          stop: function() {
              clearInterval(this.interval);
              this.interval = null;
              this.dispatchEvent("stoped");
          },
          toggle: function() {
              if (this.interval) {
                  this.stop();
              } else {
                  this.start();
              }
          },
          pause: function() {
              this.stop();
          },
          resume: function() {
              this.start();
          },
          remove: function() {
              this.stop.call(this);
              instances[this.instanceNumber] = null;
              delete this.$el.data().countdownInstance;
          },
          setFinalDate: function(value) {
              this.finalDate = parseDateString(value);
          },
          update: function() {
              if (this.$el.closest("html").length === 0) {
                  this.remove();
                  return;
              }
              var hasEventsAttached = $._data(this.el, "events") !== undefined, now = new Date(), newTotalSecsLeft;
              newTotalSecsLeft = this.finalDate.getTime() - now.getTime();
              newTotalSecsLeft = Math.ceil(newTotalSecsLeft / 1e3);
              newTotalSecsLeft = !this.options.elapse && newTotalSecsLeft < 0 ? 0 : Math.abs(newTotalSecsLeft);
              if (this.totalSecsLeft === newTotalSecsLeft || !hasEventsAttached) {
                  return;
              } else {
                  this.totalSecsLeft = newTotalSecsLeft;
              }
              this.elapsed = now >= this.finalDate;
              this.offset = {
                  seconds: this.totalSecsLeft % 60,
                  minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                  hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                  days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                  daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                  daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                  weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                  weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                  months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                  years: Math.abs(this.finalDate.getFullYear() - now.getFullYear()),
                  totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                  totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                  totalMinutes: Math.floor(this.totalSecsLeft / 60),
                  totalSeconds: this.totalSecsLeft
              };
              if (!this.options.elapse && this.totalSecsLeft === 0) {
                  this.stop();
                  this.dispatchEvent("finish");
              } else {
                  this.dispatchEvent("update");
              }
          },
          dispatchEvent: function(eventName) {
              var event = $.Event(eventName + ".countdown");
              event.finalDate = this.finalDate;
              event.elapsed = this.elapsed;
              event.offset = $.extend({}, this.offset);
              event.strftime = strftime(this.offset);
              this.$el.trigger(event);
          }
      });
      $.fn.countdown = function() {
          var argumentsArray = Array.prototype.slice.call(arguments, 0);
          return this.each(function() {
              var instanceNumber = $(this).data("countdown-instance");
              if (instanceNumber !== undefined) {
                  var instance = instances[instanceNumber], method = argumentsArray[0];
                  if (Countdown.prototype.hasOwnProperty(method)) {
                      instance[method].apply(instance, argumentsArray.slice(1));
                  } else if (String(method).match(/^[$A-Z_][0-9A-Z_$]*$/i) === null) {
                      instance.setFinalDate.call(instance, method);
                      instance.start();
                  } else {
                      $.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, method));
                  }
              } else {
                  new Countdown(this, argumentsArray[0], argumentsArray[1]);
              }
          });
      };
  });

  var mrCountdown = function ($) {
    /**
     * Check for countdown dependency
     * countdown - https://github.com/hilios/jQuery.countdown/
     */
    if (typeof $.fn.countdown !== 'function') {
      throw new Error('mrCountdown requires jquery.countdown.js (https://github.com/hilios/jQuery.countdown/)');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrCountdown';
    var VERSION = '1.1.0';
    var DATA_KEY = 'mr.countdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var Default = {
      DAYS_TEXT: 'days',
      ELAPSED: 'Timer Done',
      Y_FMT: '%Y',
      MTHS_FMT: '%m',
      W_FMT: '%w',
      D_FMT: '%D',
      H_FMT: '%H',
      MINS_FMT: '%M',
      S_FMT: '%S',
      Y_LABEL_FMT: '%!Y:Year,Years;',
      MTHS_LABEL_FMT: '%!m:Month,Months;',
      W_LABEL_FMT: '%!w:Week,Weeks;',
      D_LABEL_FMT: '%!d:Day,Days;',
      H_LABEL_FMT: '%!H:Hour,Hours;',
      MINS_LABEL_FMT: '%!M:Minute,Minutes;',
      S_LABEL_FMT: '%!S:Second,Seconds;'
    };
    var CSS = {
      D_NONE: 'd-none'
    };
    var Selector = {
      COUNTDOWN: '[data-countdown-date]',
      ACTIVE: '[data-active-state]',
      ELAPSED: '[data-elapsed-state]',
      DATE_ATTR: 'data-countdown-date',
      DAYS_TEXT_ATTR: 'data-days-text',
      DATE_FORMAT_ATTR: 'data-date-format',
      DATE_FALLBACK_ATTR: 'data-date-fallback',
      Y_EL: '[data-years]',
      MTHS_EL: '[data-months]',
      W_EL: '[data-weeks]',
      D_EL: '[data-days]',
      H_EL: '[data-hours]',
      MINS_EL: '[data-minutes]',
      S_EL: '[data-seconds]',
      Y_LABEL_EL: '[data-years-label]',
      MTHS_LABEL_EL: '[data-months-label]',
      W_LABEL_EL: '[data-weeks-label]',
      D_LABEL_EL: '[data-days-label]',
      H_LABEL_EL: '[data-hours-label]',
      MINS_LABEL_EL: '[data-minutes-label]',
      S_LABEL_EL: '[data-seconds-label]'
    };
    var Options = {
      FORMAT: 'format',
      DETAILED: 'detailed'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Countdown =
    /*#__PURE__*/
    function () {
      function Countdown(element) {
        // The current countdown element
        this.element = element;
        var $element = $(element);
        this.date = $element.attr(Selector.DATE_ATTR);
        this.daysText = $element.attr(Selector.DAYS_TEXT_ATTR) || Default.DAYS_TEXT;
        this.countdownText = "%D " + this.daysText + " %H:%M:%S";
        this.dateFormat = $element.attr(Selector.DATE_FORMAT_ATTR) || this.countdownText;
        this.fallback = $element.attr(Selector.DATE_FALLBACK_ATTR) || Default.ELAPSED; // Options for detailed mode

        this.detailed = this.element.getAttribute("data-" + Options.DETAILED) !== null;

        if (this.detailed) {
          this.years = {
            show: $element.find(Selector.Y_EL).length,
            element: $element.find(Selector.Y_EL),
            format: $element.find(Selector.Y_EL).data(Options.FORMAT) || Default.Y_FMT,
            label: {
              show: $element.find(Selector.Y_LABEL_EL).length,
              element: $element.find(Selector.Y_LABEL_EL),
              format: $element.find(Selector.Y_LABEL_EL).data(Options.FORMAT) || Default.Y_LABEL_FMT
            }
          };
          this.months = {
            show: $element.find(Selector.MTHS_EL).length,
            element: $element.find(Selector.MTHS_EL),
            format: $element.find(Selector.MTHS_EL).data(Options.FORMAT) || Default.MTHS_FMT,
            label: {
              show: $element.find(Selector.MTHS_LABEL_EL).length,
              element: $element.find(Selector.MTHS_LABEL_EL),
              format: $element.find(Selector.MTHS_LABEL_EL).data(Options.FORMAT) || Default.MTHS_LABEL_FMT
            }
          };
          this.weeks = {
            show: $element.find(Selector.W_EL).length,
            element: $element.find(Selector.W_EL),
            format: $element.find(Selector.W_EL).data(Options.FORMAT) || Default.W_FMT,
            label: {
              show: $element.find(Selector.W_LABEL_EL).length,
              element: $element.find(Selector.W_LABEL_EL),
              format: $element.find(Selector.W_LABEL_EL).data(Options.FORMAT) || Default.W_LABEL_FMT
            }
          };
          this.days = {
            show: $element.find(Selector.D_EL).length,
            element: $element.find(Selector.D_EL),
            format: $element.find(Selector.D_EL).data(Options.FORMAT) || Default.D_FMT,
            label: {
              show: $element.find(Selector.D_LABEL_EL).length,
              element: $element.find(Selector.D_LABEL_EL),
              format: $element.find(Selector.D_LABEL_EL).data(Options.FORMAT) || Default.D_LABEL_FMT
            }
          };
          this.hours = {
            show: $element.find(Selector.H_EL).length,
            element: $element.find(Selector.H_EL),
            format: $element.find(Selector.H_EL).data(Options.FORMAT) || Default.H_FMT,
            label: {
              show: $element.find(Selector.H_LABEL_EL).length,
              element: $element.find(Selector.H_LABEL_EL),
              format: $element.find(Selector.H_LABEL_EL).data(Options.FORMAT) || Default.H_LABEL_FMT
            }
          };
          this.minutes = {
            show: $element.find(Selector.MINS_EL).length,
            element: $element.find(Selector.MINS_EL),
            format: $element.find(Selector.MINS_EL).data(Options.FORMAT) || Default.MINS_FMT,
            label: {
              show: $element.find(Selector.MINS_LABEL_EL).length,
              element: $element.find(Selector.MINS_LABEL_EL),
              format: $element.find(Selector.MINS_LABEL_EL).data(Options.FORMAT) || Default.MINS_LABEL_FMT
            }
          };
          this.seconds = {
            show: $element.find(Selector.S_EL).length,
            element: $element.find(Selector.S_EL),
            format: $element.find(Selector.S_EL).data(Options.FORMAT) || Default.S_FMT,
            label: {
              show: $element.find(Selector.S_LABEL_EL).length,
              element: $element.find(Selector.S_LABEL_EL),
              format: $element.find(Selector.S_LABEL_EL).data(Options.FORMAT) || Default.S_LABEL_FMT
            }
          };
        }

        this.initCountdown();
      } // getters


      var _proto = Countdown.prototype;

      _proto.initCountdown = function initCountdown() {
        var _this = this;

        var element = $(this.element);

        if (this.detailed) {
          element.countdown(this.date, function (event) {
            if (!event.elapsed) {
              if (_this.years.show) {
                _this.years.element.text(event.strftime(_this.years.format));
              }

              if (_this.years.label.show) {
                _this.years.label.element.text(event.strftime(_this.years.label.format));
              }

              if (_this.months.show) {
                _this.months.element.text(event.strftime(_this.months.format));
              }

              if (_this.months.label.show) {
                _this.months.label.element.text(event.strftime(_this.months.label.format));
              }

              if (_this.weeks.show) {
                _this.weeks.element.text(event.strftime(_this.weeks.format));
              }

              if (_this.weeks.label.show) {
                _this.weeks.label.element.text(event.strftime(_this.weeks.label.format));
              }

              if (_this.days.show) {
                _this.days.element.text(event.strftime(_this.days.format));
              }

              if (_this.days.label.show) {
                _this.days.label.element.text(event.strftime(_this.days.label.format));
              }

              if (_this.hours.show) {
                _this.hours.element.text(event.strftime(_this.hours.format));
              }

              if (_this.hours.label.show) {
                _this.hours.label.element.text(event.strftime(_this.hours.label.format));
              }

              if (_this.minutes.show) {
                _this.minutes.element.text(event.strftime(_this.minutes.format));
              }

              if (_this.minutes.label.show) {
                _this.minutes.label.element.text(event.strftime(_this.minutes.label.format));
              }

              if (_this.seconds.show) {
                _this.seconds.element.text(event.strftime(_this.seconds.format));
              }

              if (_this.seconds.label.show) {
                _this.seconds.label.element.text(event.strftime(_this.seconds.label.format));
              }
            } else {
              // If the countdown has elapsed (event.elapsed):
              element.find(Selector.ELAPSED).removeClass(CSS.D_NONE);
              element.find(Selector.ACTIVE).addClass(CSS.D_NONE);
            }
          });
        } else {
          $(this.element).countdown(this.date, function (event) {
            if (event.elapsed) {
              element.text(_this.fallback);
            } else {
              element.text(event.strftime(_this.dateFormat));
            }
          });
        }
      };

      Countdown.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachCountdown() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Countdown(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(Countdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Countdown;
    }(); // END Class definition

    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      var cdownsOnPage = $.makeArray($(Selector.COUNTDOWN));
      /* eslint-disable no-plusplus */

      for (var i = cdownsOnPage.length; i--;) {
        var $countdown = $(cdownsOnPage[i]);
        Countdown.jQueryInterface.call($countdown, $countdown.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = Countdown.jQueryInterface;
    $.fn[NAME].Constructor = Countdown;

    $.fn[NAME].noConflict = function CountdownNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Countdown.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return Countdown;
  }(jQuery$1);

  var __assign=undefined&&undefined.__assign||function(){return (__assign=Object.assign||function(t){for(var i,a=1,s=arguments.length;a<s;a++)for(var n in i=arguments[a])Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);return t}).apply(this,arguments)},CountUp=function(){function t(t,i,a){var s=this;this.target=t,this.endVal=i,this.options=a,this.version="2.0.4",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:""},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.count=function(t){s.startTime||(s.startTime=t);var i=t-s.startTime;s.remaining=s.duration-i,s.useEasing?s.countDown?s.frameVal=s.startVal-s.easingFn(i,0,s.startVal-s.endVal,s.duration):s.frameVal=s.easingFn(i,s.startVal,s.endVal-s.startVal,s.duration):s.countDown?s.frameVal=s.startVal-(s.startVal-s.endVal)*(i/s.duration):s.frameVal=s.startVal+(s.endVal-s.startVal)*(i/s.duration),s.countDown?s.frameVal=s.frameVal<s.endVal?s.endVal:s.frameVal:s.frameVal=s.frameVal>s.endVal?s.endVal:s.frameVal,s.frameVal=Math.round(s.frameVal*s.decimalMult)/s.decimalMult,s.printValue(s.frameVal),i<s.duration?s.rAF=requestAnimationFrame(s.count):null!==s.finalEndVal?s.update(s.finalEndVal):s.callback&&s.callback();},this.formatNumber=function(t){var i,a,n,e,r,o=t<0?"-":"";if(i=Math.abs(t).toFixed(s.options.decimalPlaces),n=(a=(i+="").split("."))[0],e=a.length>1?s.options.decimal+a[1]:"",s.options.useGrouping){r="";for(var l=0,h=n.length;l<h;++l)0!==l&&l%3==0&&(r=s.options.separator+r),r=n[h-l-1]+r;n=r;}return s.options.numerals&&s.options.numerals.length&&(n=n.replace(/[0-9]/g,function(t){return s.options.numerals[+t]}),e=e.replace(/[0-9]/g,function(t){return s.options.numerals[+t]})),o+s.options.prefix+n+e+s.options.suffix},this.easeOutExpo=function(t,i,a,s){return a*(1-Math.pow(2,-10*t/s))*1024/1023+i},this.options=__assign({},this.defaults,a),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(i),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.decimalMult=Math.pow(10,this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof t?document.getElementById(t):t,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined";}return t.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var i=t-this.startVal;if(Math.abs(i)>this.options.smartEasingThreshold){this.finalEndVal=t;var a=this.countDown?1:-1;this.endVal=t+a*this.options.smartEasingAmount,this.duration=this.duration/2;}else this.endVal=t,this.finalEndVal=null;this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing;},t.prototype.start=function(t){this.error||(this.callback=t,this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal));},t.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused;},t.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal);},t.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal||this.resetDuration(),this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count));},t.prototype.printValue=function(t){var i=this.formattingFn(t);"INPUT"===this.el.tagName?this.el.value=i:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=i:this.el.innerHTML=i;},t.prototype.ensureNumber=function(t){return "number"==typeof t&&!isNaN(t)},t.prototype.validateValue=function(t){var i=Number(t);return this.ensureNumber(i)?i:(this.error="[CountUp] invalid start or end value: "+t,null)},t.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration;},t}();

  var mrCountup = function ($) {
    /**
     * Check for scrollMonitor dependency
     * scrollMonitor - https://github.com/stutrek/scrollMonitor
     */
    if (typeof scrollMonitor === 'undefined') {
      throw new Error('mrCountup requires scrollMonitor.js (https://github.com/stutrek/scrollMonitor)');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrCountup';
    var VERSION = '1.1.0';
    var DATA_KEY = 'mr.countup';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Options = {
      START: 'start',
      END: 'end',
      DURATION: 'duration',
      GROUPING: 'grouping',
      SEPARATOR: 'separator',
      DECIMAL_CHARACTER: 'decimal-character',
      DECIMAL_PLACES: 'decimal-places',
      PREFIX: 'prefix',
      SUFFIX: 'suffix',
      EASING: 'easing'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      RESIZE: "resize" + EVENT_KEY
    };
    var Selector = {
      DATA_ATTR: 'countup',
      DATA_COUNTUP: '[data-countup]'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Countup =
    /*#__PURE__*/
    function () {
      function Countup(element) {
        var $element = $(element); // Grab data-attributes

        this.start = parseFloat($element.data(Options.START), 10) || 0;
        this.end = parseFloat($element.data(Options.END), 10) || parseFloat($element.text(), 10);
        this.duration = parseFloat($element.data(Options.DURATION), 10) || 2.5;
        this.grouping = $element.data(Options.GROUPING) === true || false;
        this.separator = $element.data(Options.SEPARATOR) || ',';
        this.decimalCharacter = $element.data(Options.DECIMAL_CHARACTER) || '.';
        this.decimalPlaces = parseInt($element.data(Options.DECIMAL_PLACES), 10) || 0;
        this.prefix = $element.data(Options.PREFIX) || '';
        this.suffix = $element.data(Options.SUFFIX) || ''; // the easing data attribute will only disable easing if false is specified. Defaults to true.

        var easing = $element.data(Options.EASING);
        this.easing = easing === false ? easing : true;
        this.element = element;
        this.initWatcher(element);
        this.startCounting();
      } // getters


      var _proto = Countup.prototype;

      _proto.initWatcher = function initWatcher(element) {
        var _this = this;

        this.CountUp = new CountUp(element, this.end, {
          startVal: this.start,
          decimalPlaces: this.decimalPlaces,
          duration: this.duration,
          useEasing: this.easing,
          useGrouping: this.grouping,
          separator: this.separator,
          decimal: this.decimalCharacter,
          prefix: this.prefix,
          suffix: this.suffix
        });
        var watcher = scrollMonitor.create(element);
        this.watcher = watcher;
        watcher.stateChange(function () {
          _this.startCounting();
        });
      };

      _proto.startCounting = function startCounting() {
        if (this.watcher.isFullyInViewport) {
          if (!this.CountUp.error) {
            this.CountUp.start();
          } else {
            throw new Error(this.CountUp.error);
          }
        }
      };

      Countup.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachCountup() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Countup(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(Countup, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Countup;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      var countupElements = $.makeArray($(Selector.DATA_COUNTUP));
      /* eslint-disable no-plusplus */

      for (var i = countupElements.length; i--;) {
        var $countup = $(countupElements[i]);
        Countup.jQueryInterface.call($countup, $countup.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = Countup.jQueryInterface;
    $.fn[NAME].Constructor = Countup;

    $.fn[NAME].noConflict = function CountupNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Countup.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return Countup;
  }(jQuery$1);

  //

  var mrUtil = function ($) {
    var VERSION = '1.2.0';
    var Tagname = {
      SCRIPT: 'script'
    };
    var Selector = {
      RECAPTCHA: '[data-recaptcha]'
    }; // Activate tooltips

    $('body').tooltip({
      selector: '[data-toggle="tooltip"]',
      container: 'body'
    }); // Activate popovers

    $('body').popover({
      selector: '[data-toggle="popover"]',
      container: 'body'
    }); // Activate toasts

    $('.toast').toast();
    var Util = {
      version: VERSION,
      selector: Selector,
      activateIframeSrc: function activateIframeSrc(iframe) {
        var $iframe = $(iframe);

        if ($iframe.attr('data-src')) {
          $iframe.attr('src', $iframe.attr('data-src'));
        }
      },
      idleIframeSrc: function idleIframeSrc(iframe) {
        var $iframe = $(iframe);
        $iframe.attr('data-src', $iframe.attr('src')).attr('src', '');
      },
      forEach: function forEach(array, callback, scope) {
        if (array) {
          if (array.length) {
            for (var i = 0; i < array.length; i += 1) {
              callback.call(scope, i, array[i]); // passes back stuff we need
            }
          } else if (array[0] || mrUtil.isElement(array)) {
            callback.call(scope, 0, array);
          }
        }
      },
      dedupArray: function dedupArray(arr) {
        return arr.reduce(function (p, c) {
          // create an identifying String from the object values
          var id = JSON.stringify(c); // if the JSON string is not found in the temp array
          // add the object to the output array
          // and add the key to the temp array

          if (p.temp.indexOf(id) === -1) {
            p.out.push(c);
            p.temp.push(id);
          }

          return p; // return the deduped array
        }, {
          temp: [],
          out: []
        }).out;
      },
      isElement: function isElement(obj) {
        return !!(obj && obj.nodeType === 1);
      },
      getFuncFromString: function getFuncFromString(funcName, context) {
        var findFunc = funcName || null; // if already a function, return

        if (typeof findFunc === 'function') return funcName; // if string, try to find function or method of object (of "obj.func" format)

        if (typeof findFunc === 'string') {
          if (!findFunc.length) return null;
          var target = context || window;
          var func = findFunc.split('.');

          while (func.length) {
            var ns = func.shift();
            if (typeof target[ns] === 'undefined') return null;
            target = target[ns];
          }

          if (typeof target === 'function') return target;
        } // return null if could not parse


        return null;
      },
      getScript: function getScript(source, callback) {
        var script = document.createElement(Tagname.SCRIPT);
        var prior = document.getElementsByTagName(Tagname.SCRIPT)[0];
        script.async = 1;
        script.defer = 1;

        script.onreadystatechange = function (_, isAbort) {
          if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = null;
            script.onreadystatechange = null;
            script = undefined;

            if (!isAbort && callback && typeof callback === 'function') {
              callback();
            }
          }
        };

        script.onload = script.onreadystatechange;
        script.src = source;
        prior.parentNode.insertBefore(script, prior);
      }
    };
    return Util;
  }(jQuery$1);

  var mrDropdownGrid = function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'mrDropdownGrid';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.dropdownGrid';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME]; // KeyboardEvent.which value for Escape (Esc) key

    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for space key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for tab key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for up arrow key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for down arrow key

    var ARROW_DOWN_KEYCODE = 40; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var RIGHT_MOUSE_BUTTON_WHICH = 3;
    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var ClassName = {
      SHOW: 'show'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      RESIZE: "resize" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      MOUSE_ENTER: "mouseenter" + EVENT_KEY,
      MOUSE_LEAVE: "mouseleave" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown-grid"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      CONTAINER: '.dropdown-menu',
      CONTENT: '[data-dropdown-content]',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var Options = {
      HOVER: 'data-hover',
      BODY_HOVER: 'data-dropdown-grid-hover'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var DropdownGrid =
    /*#__PURE__*/
    function () {
      function DropdownGrid(element) {
        this.ticking = false;
        this.isActive = false;
        this.element = element;
        this.getOptions();
        this.parent = DropdownGrid.getParentFromElement(this.element);
        this.menu = this.getMenuElement();
        this.container = this.getContainerElement();
        this.content = this.getContentElement();
        this.isSubmenu = this.hasParentMenu();

        if (this.isSubmenu) {
          this.siblingMenus = this.getSiblingMenus();
        }

        this.submenus = this.getSubmenus();
        this.hover = this.options.hover;
        this.addEventListeners();
        this.setResizeEvent();
      }

      var _proto = DropdownGrid.prototype;

      _proto.getOptions = function getOptions() {
        if (!this.options) {
          this.options = {};
          this.options.hover = (this.element.getAttribute(Options.HOVER) === 'true' || document.body.getAttribute(Options.BODY_HOVER) === 'true') && this.element.getAttribute(Options.HOVER) !== 'false';
        }
      };

      _proto.toggle = function toggle(event) {
        this.getParentMenu();

        if (this.element.disabled || $(this.element).hasClass(ClassName.DISABLED)) {
          return;
        }

        this.isActive = $(this.menu).hasClass(ClassName.SHOW);
        var togglingOff = this.isActive;
        var togglingOn = !this.isActive;

        if (!this.isSubmenu) {
          DropdownGrid.clearMenus();
        }

        if (!this.isSubmenu && togglingOff) {
          return;
        }

        if (!this.isSubmenu && togglingOn && event && event.type === Event.MOUSE_LEAVE) {
          return;
        }

        if (this.isSubmenu && this.isActive) {
          DropdownGrid.clearMenus(null, this.element);
          DropdownGrid.clearMenus(null, this.submenus);
          return;
        }

        if (this.isSubmenu && !this.isActive) {
          DropdownGrid.clearMenus(null, this.siblingMenus);
        }

        var relatedTarget = {
          relatedTarget: this.element
        };
        var showEvent = $.Event(Event.SHOW, relatedTarget);
        $(this.parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $(this.parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        this.element.focus();
        this.element.setAttribute('aria-expanded', true);
        $(this.menu).toggleClass(ClassName.SHOW); // Recalculate positions after applying the shown class
        // This is because jQuery can't measure an invisible element.

        this.updatePosition();
        this.isActive = true;
        $(this.parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.SHOWN, relatedTarget));
      };

      _proto.updatePosition = function updatePosition(winWidth) {
        var windowWidth = winWidth || window.innerWidth;
        var trigger = mrDropdownGrid.getDimensionsFromElement(this.element);
        this.positionContainer(trigger.offsetLeft);
        this.positionContent(windowWidth, trigger.offsetLeft);
      };

      _proto.positionContainer = function positionContainer(offsetLeft) {
        if (this.container) {
          this.container.style.left = "-" + offsetLeft + "px";
        } else {
          throw new TypeError('No element matching .dropdown-menu.container found.');
        }
      };

      _proto.positionContent = function positionContent(windowWidth, offsetLeft) {
        if (this.content) {
          var leftValue; // let topValue;

          var contentRect = mrDropdownGrid.getDimensionsFromElement(this.content);
          var contentWidth = contentRect.width; // If submenu, the left of the content needs to sit to the side of the trigger's content

          if (this.isSubmenu) {
            this.getParentMenu();
            var parentContent = mrDropdownGrid.getDimensionsFromElement(this.parentMenu.content); // Calculate X Offset

            if (parentContent.offsetLeft + parentContent.width + contentWidth <= windowWidth) {
              // Submenu can fit next to parent menu
              leftValue = parentContent.offsetLeft + parentContent.width;
            } else if (parentContent.offsetLeft >= contentWidth) {
              // No room for submenu to fit to the right of parent, sit it to the left instead.
              leftValue = parentContent.offsetLeft - contentWidth;
            } else {
              leftValue = 0;
            } // Calculate Y offset

          } else if (contentWidth + offsetLeft >= windowWidth) {
            // Not a submenu, but if the content won't fit, sit content close to the right boundary
            leftValue = windowWidth - contentWidth;
          } else {
            // Not a submenu, and there is room to fit normally and sit below trigger
            leftValue = offsetLeft;
          }

          var leftString = Math.round(leftValue) + "px";
          this.content.style.left = leftString;
        } else {
          throw new TypeError('No [data-dropdown-content] element was found.');
        }
      };

      _proto.setResizeEvent = function setResizeEvent() {
        var _this = this;

        $(window).on(Event.RESIZE, function () {
          if (!_this.ticking) {
            window.requestAnimationFrame(function () {
              _this.updatePosition();

              _this.ticking = false;
            });
            _this.ticking = true;
          }
        });
      };

      _proto.getMenuElement = function getMenuElement() {
        if (!this.menu) {
          if (this.parent) {
            this.menu = this.parent.querySelector(Selector.MENU);
          }
        }

        return this.menu;
      };

      _proto.getContainerElement = function getContainerElement() {
        if (!this.container) {
          if (this.parent) {
            this.container = this.parent.querySelector("" + Selector.MENU + Selector.CONTAINER);
          }
        }

        return this.container;
      };

      _proto.getContentElement = function getContentElement() {
        if (!this.content) {
          if (this.parent) {
            this.content = this.container.querySelector(Selector.CONTENT);
          }
        }

        return this.content;
      };

      _proto.hasParentMenu = function hasParentMenu() {
        return $(this.element).closest(Selector.CONTENT).length > 0;
      };

      _proto.getParentMenu = function getParentMenu() {
        if (this.isSubmenu && !this.parentMenu) {
          this.parentMenu = $(this.parent).closest(Selector.MENU).siblings(Selector.DATA_TOGGLE).data(DATA_KEY);
        }
      };

      _proto.getSiblingMenus = function getSiblingMenus() {
        return $(this.element).closest(Selector.CONTENT).get(0).querySelectorAll(Selector.DATA_TOGGLE);
      };

      _proto.getSubmenus = function getSubmenus() {
        var children = this.content.querySelectorAll(Selector.DATA_TOGGLE);
        this.isParent = children.length !== 0;
        return children;
      };

      _proto.addEventListeners = function addEventListeners() {
        var _this2 = this;

        $(this.element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this2.toggle();
        });

        if (this.hover) {
          $(this.parent).on(Event.MOUSE_ENTER + " " + Event.MOUSE_LEAVE, function (event) {
            event.preventDefault();
            event.stopPropagation();

            if ("" + event.type + EVENT_KEY === Event.MOUSE_ENTER && _this2.isActive || "" + event.type + EVENT_KEY === Event.MOUSE_LEAVE && !_this2.isActive) {
              return;
            }

            _this2.toggle(event);
          });
        }
      };

      DropdownGrid.getDimensionsFromElement = function getDimensionsFromElement(element) {
        if (element && mrUtil.isElement(element)) {
          var rect = element.getBoundingClientRect();
          rect.offsetLeft = Math.round(rect.left + window.pageXOffset - document.documentElement.clientLeft);
          return rect;
        } // If not an element, throw an error


        throw new TypeError('Can\'t get a measurement from a non-element');
      };

      DropdownGrid.getParentFromElement = function getParentFromElement(element) {
        return element.parentNode;
      };

      DropdownGrid.clearMenus = function clearMenus(event, specificToggle) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup') && event.which !== TAB_KEYCODE) {
          return;
        }

        var toggles;

        if (specificToggle && typeof specificToggle === 'object') {
          toggles = specificToggle;
        } else {
          toggles = document.querySelectorAll(Selector.DATA_TOGGLE);
        }

        mrUtil.forEach(toggles, function (index, toggle) {
          var parent = DropdownGrid.getParentFromElement(toggle);
          var context = $(toggle).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggle
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            return;
          }

          var dropdownMenu = context.menu;

          if (!$(parent).hasClass(ClassName.SHOW)) {
            return;
          }

          if (event) {
            if ((event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
              return;
            }
          }

          if (event) {
            if (event.type === 'click' && ($.contains(context.content, event.target) || context.content.isSameNode(event.target))) {
              return;
            }
          }

          var hideEvent = $.Event(Event.HIDE, relatedTarget);
          $(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            return;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $(document.body).children().off('mouseover', null, $.noop);
          }

          toggle.setAttribute('aria-expanded', 'false');
          context.isActive = false;
          $(dropdownMenu).removeClass(ClassName.SHOW);
          $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
        });
      };

      DropdownGrid.jQueryInterface = function jQueryInterface(config) {
        return this.each(function jqEachDropdownGrid() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new DropdownGrid(this);
            $element.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      } // eslint-disable-next-line complexity
      ;

      DropdownGrid.dataApiKeydownHandler = function dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? (event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE) && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = DropdownGrid.getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $(toggle).trigger('focus');
          }

          $(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index -= 1;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index += 1;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(DropdownGrid, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return DropdownGrid;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, DropdownGrid.dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, DropdownGrid.dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, DropdownGrid.clearMenus).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */

    $(document).ready(function () {
      var dropdownGridElements = $.makeArray($(Selector.DATA_TOGGLE));
      /* eslint-disable no-plusplus */

      for (var i = dropdownGridElements.length; i--;) {
        var $dropdownGrid = $(dropdownGridElements[i]);
        DropdownGrid.jQueryInterface.call($dropdownGrid, $dropdownGrid.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = DropdownGrid.jQueryInterface;
    $.fn[NAME].Constructor = DropdownGrid;

    $.fn[NAME].noConflict = function DropdownGridNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return DropdownGrid.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return DropdownGrid;
  }(jQuery$1);

  //
  //
  //  fade-page.js
  //
  //
  // Page Transition to fade out when clicking a link which has opted in using class 'fade-page'
  (function () {
    var ATTR_HREF = 'href';
    var EVENT_CLICK = 'click';
    var SELECTOR_FADE = 'fade-page';
    var EFFECT_DELAY = 500;
    var fadePage = document.getElementsByClassName(SELECTOR_FADE);

    function fadePageFunction(event) {
      if (!(event.ctrlKey || event.shiftKey || event.metaKey || event.button && event.button === 1)) {
        event.preventDefault();
        event.stopPropagation();
        document.body.classList.add(SELECTOR_FADE);
        var href = this.getAttribute(ATTR_HREF);
        setTimeout(function () {
          if (href !== '' && href !== '#') {
            window.location.href = href;
          }
        }, EFFECT_DELAY);
      }
    } // Bind click event


    for (var i = 0; i < fadePage.length; i += 1) {
      fadePage[i].addEventListener(EVENT_CLICK, fadePageFunction, false);
    }
  })();

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var flatpickr = createCommonjsModule(function (module, exports) {
  /* flatpickr v4.6.3, @license MIT */
  (function (global, factory) {
       module.exports = factory() ;
  }(commonjsGlobal, function () {
      /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0

      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.

      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */

      var __assign = function() {
          __assign = Object.assign || function __assign(t) {
              for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
              }
              return t;
          };
          return __assign.apply(this, arguments);
      };

      var HOOKS = [
          "onChange",
          "onClose",
          "onDayCreate",
          "onDestroy",
          "onKeyDown",
          "onMonthChange",
          "onOpen",
          "onParseConfig",
          "onReady",
          "onValueUpdate",
          "onYearChange",
          "onPreCalendarPosition",
      ];
      var defaults = {
          _disable: [],
          _enable: [],
          allowInput: false,
          altFormat: "F j, Y",
          altInput: false,
          altInputClass: "form-control input",
          animate: typeof window === "object" &&
              window.navigator.userAgent.indexOf("MSIE") === -1,
          ariaDateFormat: "F j, Y",
          clickOpens: true,
          closeOnSelect: true,
          conjunction: ", ",
          dateFormat: "Y-m-d",
          defaultHour: 12,
          defaultMinute: 0,
          defaultSeconds: 0,
          disable: [],
          disableMobile: false,
          enable: [],
          enableSeconds: false,
          enableTime: false,
          errorHandler: function (err) {
              return typeof console !== "undefined" && console.warn(err);
          },
          getWeek: function (givenDate) {
              var date = new Date(givenDate.getTime());
              date.setHours(0, 0, 0, 0);
              // Thursday in current week decides the year.
              date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
              // January 4 is always in week 1.
              var week1 = new Date(date.getFullYear(), 0, 4);
              // Adjust to Thursday in week 1 and count number of weeks from date to week1.
              return (1 +
                  Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                      3 +
                      ((week1.getDay() + 6) % 7)) /
                      7));
          },
          hourIncrement: 1,
          ignoredFocusElements: [],
          inline: false,
          locale: "default",
          minuteIncrement: 5,
          mode: "single",
          monthSelectorType: "dropdown",
          nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
          noCalendar: false,
          now: new Date(),
          onChange: [],
          onClose: [],
          onDayCreate: [],
          onDestroy: [],
          onKeyDown: [],
          onMonthChange: [],
          onOpen: [],
          onParseConfig: [],
          onReady: [],
          onValueUpdate: [],
          onYearChange: [],
          onPreCalendarPosition: [],
          plugins: [],
          position: "auto",
          positionElement: undefined,
          prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
          shorthandCurrentMonth: false,
          showMonths: 1,
          static: false,
          time_24hr: false,
          weekNumbers: false,
          wrap: false
      };

      var english = {
          weekdays: {
              shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              longhand: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
              ]
          },
          months: {
              shorthand: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
              ],
              longhand: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
              ]
          },
          daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          firstDayOfWeek: 0,
          ordinal: function (nth) {
              var s = nth % 100;
              if (s > 3 && s < 21)
                  return "th";
              switch (s % 10) {
                  case 1:
                      return "st";
                  case 2:
                      return "nd";
                  case 3:
                      return "rd";
                  default:
                      return "th";
              }
          },
          rangeSeparator: " to ",
          weekAbbreviation: "Wk",
          scrollTitle: "Scroll to increment",
          toggleTitle: "Click to toggle",
          amPM: ["AM", "PM"],
          yearAriaLabel: "Year",
          hourAriaLabel: "Hour",
          minuteAriaLabel: "Minute",
          time_24hr: false
      };

      var pad = function (number) { return ("0" + number).slice(-2); };
      var int = function (bool) { return (bool === true ? 1 : 0); };
      /* istanbul ignore next */
      function debounce(func, wait, immediate) {
          if (immediate === void 0) { immediate = false; }
          var timeout;
          return function () {
              var context = this, args = arguments;
              timeout !== null && clearTimeout(timeout);
              timeout = window.setTimeout(function () {
                  timeout = null;
                  if (!immediate)
                      func.apply(context, args);
              }, wait);
              if (immediate && !timeout)
                  func.apply(context, args);
          };
      }
      var arrayify = function (obj) {
          return obj instanceof Array ? obj : [obj];
      };

      function toggleClass(elem, className, bool) {
          if (bool === true)
              return elem.classList.add(className);
          elem.classList.remove(className);
      }
      function createElement(tag, className, content) {
          var e = window.document.createElement(tag);
          className = className || "";
          content = content || "";
          e.className = className;
          if (content !== undefined)
              e.textContent = content;
          return e;
      }
      function clearNode(node) {
          while (node.firstChild)
              node.removeChild(node.firstChild);
      }
      function findParent(node, condition) {
          if (condition(node))
              return node;
          else if (node.parentNode)
              return findParent(node.parentNode, condition);
          return undefined; // nothing found
      }
      function createNumberInput(inputClassName, opts) {
          var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
          if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
              numInput.type = "number";
          }
          else {
              numInput.type = "text";
              numInput.pattern = "\\d*";
          }
          if (opts !== undefined)
              for (var key in opts)
                  numInput.setAttribute(key, opts[key]);
          wrapper.appendChild(numInput);
          wrapper.appendChild(arrowUp);
          wrapper.appendChild(arrowDown);
          return wrapper;
      }
      function getEventTarget(event) {
          if (typeof event.composedPath === "function") {
              var path = event.composedPath();
              return path[0];
          }
          return event.target;
      }

      var doNothing = function () { return undefined; };
      var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
      var revFormat = {
          D: doNothing,
          F: function (dateObj, monthName, locale) {
              dateObj.setMonth(locale.months.longhand.indexOf(monthName));
          },
          G: function (dateObj, hour) {
              dateObj.setHours(parseFloat(hour));
          },
          H: function (dateObj, hour) {
              dateObj.setHours(parseFloat(hour));
          },
          J: function (dateObj, day) {
              dateObj.setDate(parseFloat(day));
          },
          K: function (dateObj, amPM, locale) {
              dateObj.setHours((dateObj.getHours() % 12) +
                  12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
          },
          M: function (dateObj, shortMonth, locale) {
              dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
          },
          S: function (dateObj, seconds) {
              dateObj.setSeconds(parseFloat(seconds));
          },
          U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
          W: function (dateObj, weekNum, locale) {
              var weekNumber = parseInt(weekNum);
              var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
              date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
              return date;
          },
          Y: function (dateObj, year) {
              dateObj.setFullYear(parseFloat(year));
          },
          Z: function (_, ISODate) { return new Date(ISODate); },
          d: function (dateObj, day) {
              dateObj.setDate(parseFloat(day));
          },
          h: function (dateObj, hour) {
              dateObj.setHours(parseFloat(hour));
          },
          i: function (dateObj, minutes) {
              dateObj.setMinutes(parseFloat(minutes));
          },
          j: function (dateObj, day) {
              dateObj.setDate(parseFloat(day));
          },
          l: doNothing,
          m: function (dateObj, month) {
              dateObj.setMonth(parseFloat(month) - 1);
          },
          n: function (dateObj, month) {
              dateObj.setMonth(parseFloat(month) - 1);
          },
          s: function (dateObj, seconds) {
              dateObj.setSeconds(parseFloat(seconds));
          },
          u: function (_, unixMillSeconds) {
              return new Date(parseFloat(unixMillSeconds));
          },
          w: doNothing,
          y: function (dateObj, year) {
              dateObj.setFullYear(2000 + parseFloat(year));
          }
      };
      var tokenRegex = {
          D: "(\\w+)",
          F: "(\\w+)",
          G: "(\\d\\d|\\d)",
          H: "(\\d\\d|\\d)",
          J: "(\\d\\d|\\d)\\w+",
          K: "",
          M: "(\\w+)",
          S: "(\\d\\d|\\d)",
          U: "(.+)",
          W: "(\\d\\d|\\d)",
          Y: "(\\d{4})",
          Z: "(.+)",
          d: "(\\d\\d|\\d)",
          h: "(\\d\\d|\\d)",
          i: "(\\d\\d|\\d)",
          j: "(\\d\\d|\\d)",
          l: "(\\w+)",
          m: "(\\d\\d|\\d)",
          n: "(\\d\\d|\\d)",
          s: "(\\d\\d|\\d)",
          u: "(.+)",
          w: "(\\d\\d|\\d)",
          y: "(\\d{2})"
      };
      var formats = {
          // get the date in UTC
          Z: function (date) { return date.toISOString(); },
          // weekday name, short, e.g. Thu
          D: function (date, locale, options) {
              return locale.weekdays.shorthand[formats.w(date, locale, options)];
          },
          // full month name e.g. January
          F: function (date, locale, options) {
              return monthToStr(formats.n(date, locale, options) - 1, false, locale);
          },
          // padded hour 1-12
          G: function (date, locale, options) {
              return pad(formats.h(date, locale, options));
          },
          // hours with leading zero e.g. 03
          H: function (date) { return pad(date.getHours()); },
          // day (1-30) with ordinal suffix e.g. 1st, 2nd
          J: function (date, locale) {
              return locale.ordinal !== undefined
                  ? date.getDate() + locale.ordinal(date.getDate())
                  : date.getDate();
          },
          // AM/PM
          K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
          // shorthand month e.g. Jan, Sep, Oct, etc
          M: function (date, locale) {
              return monthToStr(date.getMonth(), true, locale);
          },
          // seconds 00-59
          S: function (date) { return pad(date.getSeconds()); },
          // unix timestamp
          U: function (date) { return date.getTime() / 1000; },
          W: function (date, _, options) {
              return options.getWeek(date);
          },
          // full year e.g. 2016
          Y: function (date) { return date.getFullYear(); },
          // day in month, padded (01-30)
          d: function (date) { return pad(date.getDate()); },
          // hour from 1-12 (am/pm)
          h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
          // minutes, padded with leading zero e.g. 09
          i: function (date) { return pad(date.getMinutes()); },
          // day in month (1-30)
          j: function (date) { return date.getDate(); },
          // weekday name, full, e.g. Thursday
          l: function (date, locale) {
              return locale.weekdays.longhand[date.getDay()];
          },
          // padded month number (01-12)
          m: function (date) { return pad(date.getMonth() + 1); },
          // the month number (1-12)
          n: function (date) { return date.getMonth() + 1; },
          // seconds 0-59
          s: function (date) { return date.getSeconds(); },
          // Unix Milliseconds
          u: function (date) { return date.getTime(); },
          // number of the day of the week
          w: function (date) { return date.getDay(); },
          // last two digits of year e.g. 16 for 2016
          y: function (date) { return String(date.getFullYear()).substring(2); }
      };

      var createDateFormatter = function (_a) {
          var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
          return function (dateObj, frmt, overrideLocale) {
              var locale = overrideLocale || l10n;
              if (config.formatDate !== undefined) {
                  return config.formatDate(dateObj, frmt, locale);
              }
              return frmt
                  .split("")
                  .map(function (c, i, arr) {
                  return formats[c] && arr[i - 1] !== "\\"
                      ? formats[c](dateObj, locale, config)
                      : c !== "\\"
                          ? c
                          : "";
              })
                  .join("");
          };
      };
      var createDateParser = function (_a) {
          var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
          return function (date, givenFormat, timeless, customLocale) {
              if (date !== 0 && !date)
                  return undefined;
              var locale = customLocale || l10n;
              var parsedDate;
              var dateOrig = date;
              if (date instanceof Date)
                  parsedDate = new Date(date.getTime());
              else if (typeof date !== "string" &&
                  date.toFixed !== undefined // timestamp
              )
                  // create a copy
                  parsedDate = new Date(date);
              else if (typeof date === "string") {
                  // date string
                  var format = givenFormat || (config || defaults).dateFormat;
                  var datestr = String(date).trim();
                  if (datestr === "today") {
                      parsedDate = new Date();
                      timeless = true;
                  }
                  else if (/Z$/.test(datestr) ||
                      /GMT$/.test(datestr) // datestrings w/ timezone
                  )
                      parsedDate = new Date(date);
                  else if (config && config.parseDate)
                      parsedDate = config.parseDate(date, format);
                  else {
                      parsedDate =
                          !config || !config.noCalendar
                              ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                              : new Date(new Date().setHours(0, 0, 0, 0));
                      var matched = void 0, ops = [];
                      for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                          var token_1 = format[i];
                          var isBackSlash = token_1 === "\\";
                          var escaped = format[i - 1] === "\\" || isBackSlash;
                          if (tokenRegex[token_1] && !escaped) {
                              regexStr += tokenRegex[token_1];
                              var match = new RegExp(regexStr).exec(date);
                              if (match && (matched = true)) {
                                  ops[token_1 !== "Y" ? "push" : "unshift"]({
                                      fn: revFormat[token_1],
                                      val: match[++matchIndex]
                                  });
                              }
                          }
                          else if (!isBackSlash)
                              regexStr += "."; // don't really care
                          ops.forEach(function (_a) {
                              var fn = _a.fn, val = _a.val;
                              return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                          });
                      }
                      parsedDate = matched ? parsedDate : undefined;
                  }
              }
              /* istanbul ignore next */
              if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
                  config.errorHandler(new Error("Invalid date provided: " + dateOrig));
                  return undefined;
              }
              if (timeless === true)
                  parsedDate.setHours(0, 0, 0, 0);
              return parsedDate;
          };
      };
      /**
       * Compute the difference in dates, measured in ms
       */
      function compareDates(date1, date2, timeless) {
          if (timeless === void 0) { timeless = true; }
          if (timeless !== false) {
              return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
                  new Date(date2.getTime()).setHours(0, 0, 0, 0));
          }
          return date1.getTime() - date2.getTime();
      }
      var isBetween = function (ts, ts1, ts2) {
          return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
      };
      var duration = {
          DAY: 86400000
      };

      if (typeof Object.assign !== "function") {
          Object.assign = function (target) {
              var args = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                  args[_i - 1] = arguments[_i];
              }
              if (!target) {
                  throw TypeError("Cannot convert undefined or null to object");
              }
              var _loop_1 = function (source) {
                  if (source) {
                      Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
                  }
              };
              for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                  var source = args_1[_a];
                  _loop_1(source);
              }
              return target;
          };
      }

      var DEBOUNCED_CHANGE_MS = 300;
      function FlatpickrInstance(element, instanceConfig) {
          var self = {
              config: __assign({}, defaults, flatpickr.defaultConfig),
              l10n: english
          };
          self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
          self._handlers = [];
          self.pluginElements = [];
          self.loadedPlugins = [];
          self._bind = bind;
          self._setHoursFromDate = setHoursFromDate;
          self._positionCalendar = positionCalendar;
          self.changeMonth = changeMonth;
          self.changeYear = changeYear;
          self.clear = clear;
          self.close = close;
          self._createElement = createElement;
          self.destroy = destroy;
          self.isEnabled = isEnabled;
          self.jumpToDate = jumpToDate;
          self.open = open;
          self.redraw = redraw;
          self.set = set;
          self.setDate = setDate;
          self.toggle = toggle;
          function setupHelperFunctions() {
              self.utils = {
                  getDaysInMonth: function (month, yr) {
                      if (month === void 0) { month = self.currentMonth; }
                      if (yr === void 0) { yr = self.currentYear; }
                      if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                          return 29;
                      return self.l10n.daysInMonth[month];
                  }
              };
          }
          function init() {
              self.element = self.input = element;
              self.isOpen = false;
              parseConfig();
              setupLocale();
              setupInputs();
              setupDates();
              setupHelperFunctions();
              if (!self.isMobile)
                  build();
              bindEvents();
              if (self.selectedDates.length || self.config.noCalendar) {
                  if (self.config.enableTime) {
                      setHoursFromDate(self.config.noCalendar
                          ? self.latestSelectedDateObj || self.config.minDate
                          : undefined);
                  }
                  updateValue(false);
              }
              setCalendarWidth();
              self.showTimeInput =
                  self.selectedDates.length > 0 || self.config.noCalendar;
              var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
              /* TODO: investigate this further
          
                Currently, there is weird positioning behavior in safari causing pages
                to scroll up. https://github.com/chmln/flatpickr/issues/563
          
                However, most browsers are not Safari and positioning is expensive when used
                in scale. https://github.com/chmln/flatpickr/issues/1096
              */
              if (!self.isMobile && isSafari) {
                  positionCalendar();
              }
              triggerEvent("onReady");
          }
          function bindToInstance(fn) {
              return fn.bind(self);
          }
          function setCalendarWidth() {
              var config = self.config;
              if (config.weekNumbers === false && config.showMonths === 1)
                  return;
              else if (config.noCalendar !== true) {
                  window.requestAnimationFrame(function () {
                      if (self.calendarContainer !== undefined) {
                          self.calendarContainer.style.visibility = "hidden";
                          self.calendarContainer.style.display = "block";
                      }
                      if (self.daysContainer !== undefined) {
                          var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                          self.daysContainer.style.width = daysWidth + "px";
                          self.calendarContainer.style.width =
                              daysWidth +
                                  (self.weekWrapper !== undefined
                                      ? self.weekWrapper.offsetWidth
                                      : 0) +
                                  "px";
                          self.calendarContainer.style.removeProperty("visibility");
                          self.calendarContainer.style.removeProperty("display");
                      }
                  });
              }
          }
          /**
           * The handler for all events targeting the time inputs
           */
          function updateTime(e) {
              if (self.selectedDates.length === 0) {
                  setDefaultTime();
              }
              if (e !== undefined && e.type !== "blur") {
                  timeWrapper(e);
              }
              var prevValue = self._input.value;
              setHoursFromInputs();
              updateValue();
              if (self._input.value !== prevValue) {
                  self._debouncedChange();
              }
          }
          function ampm2military(hour, amPM) {
              return (hour % 12) + 12 * int(amPM === self.l10n.amPM[1]);
          }
          function military2ampm(hour) {
              switch (hour % 24) {
                  case 0:
                  case 12:
                      return 12;
                  default:
                      return hour % 12;
              }
          }
          /**
           * Syncs the selected date object time with user's time input
           */
          function setHoursFromInputs() {
              if (self.hourElement === undefined || self.minuteElement === undefined)
                  return;
              var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
                  ? (parseInt(self.secondElement.value, 10) || 0) % 60
                  : 0;
              if (self.amPM !== undefined) {
                  hours = ampm2military(hours, self.amPM.textContent);
              }
              var limitMinHours = self.config.minTime !== undefined ||
                  (self.config.minDate &&
                      self.minDateHasTime &&
                      self.latestSelectedDateObj &&
                      compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                          0);
              var limitMaxHours = self.config.maxTime !== undefined ||
                  (self.config.maxDate &&
                      self.maxDateHasTime &&
                      self.latestSelectedDateObj &&
                      compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                          0);
              if (limitMaxHours) {
                  var maxTime = self.config.maxTime !== undefined
                      ? self.config.maxTime
                      : self.config.maxDate;
                  hours = Math.min(hours, maxTime.getHours());
                  if (hours === maxTime.getHours())
                      minutes = Math.min(minutes, maxTime.getMinutes());
                  if (minutes === maxTime.getMinutes())
                      seconds = Math.min(seconds, maxTime.getSeconds());
              }
              if (limitMinHours) {
                  var minTime = self.config.minTime !== undefined
                      ? self.config.minTime
                      : self.config.minDate;
                  hours = Math.max(hours, minTime.getHours());
                  if (hours === minTime.getHours())
                      minutes = Math.max(minutes, minTime.getMinutes());
                  if (minutes === minTime.getMinutes())
                      seconds = Math.max(seconds, minTime.getSeconds());
              }
              setHours(hours, minutes, seconds);
          }
          /**
           * Syncs time input values with a date
           */
          function setHoursFromDate(dateObj) {
              var date = dateObj || self.latestSelectedDateObj;
              if (date)
                  setHours(date.getHours(), date.getMinutes(), date.getSeconds());
          }
          function setDefaultHours() {
              var hours = self.config.defaultHour;
              var minutes = self.config.defaultMinute;
              var seconds = self.config.defaultSeconds;
              if (self.config.minDate !== undefined) {
                  var minHr = self.config.minDate.getHours();
                  var minMinutes = self.config.minDate.getMinutes();
                  hours = Math.max(hours, minHr);
                  if (hours === minHr)
                      minutes = Math.max(minMinutes, minutes);
                  if (hours === minHr && minutes === minMinutes)
                      seconds = self.config.minDate.getSeconds();
              }
              if (self.config.maxDate !== undefined) {
                  var maxHr = self.config.maxDate.getHours();
                  var maxMinutes = self.config.maxDate.getMinutes();
                  hours = Math.min(hours, maxHr);
                  if (hours === maxHr)
                      minutes = Math.min(maxMinutes, minutes);
                  if (hours === maxHr && minutes === maxMinutes)
                      seconds = self.config.maxDate.getSeconds();
              }
              setHours(hours, minutes, seconds);
          }
          /**
           * Sets the hours, minutes, and optionally seconds
           * of the latest selected date object and the
           * corresponding time inputs
           * @param {Number} hours the hour. whether its military
           *                 or am-pm gets inferred from config
           * @param {Number} minutes the minutes
           * @param {Number} seconds the seconds (optional)
           */
          function setHours(hours, minutes, seconds) {
              if (self.latestSelectedDateObj !== undefined) {
                  self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
              }
              if (!self.hourElement || !self.minuteElement || self.isMobile)
                  return;
              self.hourElement.value = pad(!self.config.time_24hr
                  ? ((12 + hours) % 12) + 12 * int(hours % 12 === 0)
                  : hours);
              self.minuteElement.value = pad(minutes);
              if (self.amPM !== undefined)
                  self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
              if (self.secondElement !== undefined)
                  self.secondElement.value = pad(seconds);
          }
          /**
           * Handles the year input and incrementing events
           * @param {Event} event the keyup or increment event
           */
          function onYearInput(event) {
              var year = parseInt(event.target.value) + (event.delta || 0);
              if (year / 1000 > 1 ||
                  (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
                  changeYear(year);
              }
          }
          /**
           * Essentially addEventListener + tracking
           * @param {Element} element the element to addEventListener to
           * @param {String} event the event name
           * @param {Function} handler the event handler
           */
          function bind(element, event, handler, options) {
              if (event instanceof Array)
                  return event.forEach(function (ev) { return bind(element, ev, handler, options); });
              if (element instanceof Array)
                  return element.forEach(function (el) { return bind(el, event, handler, options); });
              element.addEventListener(event, handler, options);
              self._handlers.push({
                  element: element,
                  event: event,
                  handler: handler,
                  options: options
              });
          }
          /**
           * A mousedown handler which mimics click.
           * Minimizes latency, since we don't need to wait for mouseup in most cases.
           * Also, avoids handling right clicks.
           *
           * @param {Function} handler the event handler
           */
          function onClick(handler) {
              return function (evt) {
                  evt.which === 1 && handler(evt);
              };
          }
          function triggerChange() {
              triggerEvent("onChange");
          }
          /**
           * Adds all the necessary event listeners
           */
          function bindEvents() {
              if (self.config.wrap) {
                  ["open", "close", "toggle", "clear"].forEach(function (evt) {
                      Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                          return bind(el, "click", self[evt]);
                      });
                  });
              }
              if (self.isMobile) {
                  setupMobile();
                  return;
              }
              var debouncedResize = debounce(onResize, 50);
              self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
              if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
                  bind(self.daysContainer, "mouseover", function (e) {
                      if (self.config.mode === "range")
                          onMouseOver(e.target);
                  });
              bind(window.document.body, "keydown", onKeyDown);
              if (!self.config.inline && !self.config.static)
                  bind(window, "resize", debouncedResize);
              if (window.ontouchstart !== undefined)
                  bind(window.document, "touchstart", documentClick);
              else
                  bind(window.document, "mousedown", onClick(documentClick));
              bind(window.document, "focus", documentClick, { capture: true });
              if (self.config.clickOpens === true) {
                  bind(self._input, "focus", self.open);
                  bind(self._input, "mousedown", onClick(self.open));
              }
              if (self.daysContainer !== undefined) {
                  bind(self.monthNav, "mousedown", onClick(onMonthNavClick));
                  bind(self.monthNav, ["keyup", "increment"], onYearInput);
                  bind(self.daysContainer, "mousedown", onClick(selectDate));
              }
              if (self.timeContainer !== undefined &&
                  self.minuteElement !== undefined &&
                  self.hourElement !== undefined) {
                  var selText = function (e) {
                      return e.target.select();
                  };
                  bind(self.timeContainer, ["increment"], updateTime);
                  bind(self.timeContainer, "blur", updateTime, { capture: true });
                  bind(self.timeContainer, "mousedown", onClick(timeIncrement));
                  bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
                  if (self.secondElement !== undefined)
                      bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
                  if (self.amPM !== undefined) {
                      bind(self.amPM, "mousedown", onClick(function (e) {
                          updateTime(e);
                          triggerChange();
                      }));
                  }
              }
          }
          /**
           * Set the calendar view to a particular date.
           * @param {Date} jumpDate the date to set the view to
           * @param {boolean} triggerChange if change events should be triggered
           */
          function jumpToDate(jumpDate, triggerChange) {
              var jumpTo = jumpDate !== undefined
                  ? self.parseDate(jumpDate)
                  : self.latestSelectedDateObj ||
                      (self.config.minDate && self.config.minDate > self.now
                          ? self.config.minDate
                          : self.config.maxDate && self.config.maxDate < self.now
                              ? self.config.maxDate
                              : self.now);
              var oldYear = self.currentYear;
              var oldMonth = self.currentMonth;
              try {
                  if (jumpTo !== undefined) {
                      self.currentYear = jumpTo.getFullYear();
                      self.currentMonth = jumpTo.getMonth();
                  }
              }
              catch (e) {
                  /* istanbul ignore next */
                  e.message = "Invalid date supplied: " + jumpTo;
                  self.config.errorHandler(e);
              }
              if (triggerChange && self.currentYear !== oldYear) {
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
              if (triggerChange &&
                  (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
                  triggerEvent("onMonthChange");
              }
              self.redraw();
          }
          /**
           * The up/down arrow handler for time inputs
           * @param {Event} e the click event
           */
          function timeIncrement(e) {
              if (~e.target.className.indexOf("arrow"))
                  incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
          }
          /**
           * Increments/decrements the value of input associ-
           * ated with the up/down arrow by dispatching an
           * "increment" event on the input.
           *
           * @param {Event} e the click event
           * @param {Number} delta the diff (usually 1 or -1)
           * @param {Element} inputElem the input element
           */
          function incrementNumInput(e, delta, inputElem) {
              var target = e && e.target;
              var input = inputElem ||
                  (target && target.parentNode && target.parentNode.firstChild);
              var event = createEvent("increment");
              event.delta = delta;
              input && input.dispatchEvent(event);
          }
          function build() {
              var fragment = window.document.createDocumentFragment();
              self.calendarContainer = createElement("div", "flatpickr-calendar");
              self.calendarContainer.tabIndex = -1;
              if (!self.config.noCalendar) {
                  fragment.appendChild(buildMonthNav());
                  self.innerContainer = createElement("div", "flatpickr-innerContainer");
                  if (self.config.weekNumbers) {
                      var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                      self.innerContainer.appendChild(weekWrapper);
                      self.weekNumbers = weekNumbers;
                      self.weekWrapper = weekWrapper;
                  }
                  self.rContainer = createElement("div", "flatpickr-rContainer");
                  self.rContainer.appendChild(buildWeekdays());
                  if (!self.daysContainer) {
                      self.daysContainer = createElement("div", "flatpickr-days");
                      self.daysContainer.tabIndex = -1;
                  }
                  buildDays();
                  self.rContainer.appendChild(self.daysContainer);
                  self.innerContainer.appendChild(self.rContainer);
                  fragment.appendChild(self.innerContainer);
              }
              if (self.config.enableTime) {
                  fragment.appendChild(buildTime());
              }
              toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
              toggleClass(self.calendarContainer, "animate", self.config.animate === true);
              toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
              self.calendarContainer.appendChild(fragment);
              var customAppend = self.config.appendTo !== undefined &&
                  self.config.appendTo.nodeType !== undefined;
              if (self.config.inline || self.config.static) {
                  self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
                  if (self.config.inline) {
                      if (!customAppend && self.element.parentNode)
                          self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                      else if (self.config.appendTo !== undefined)
                          self.config.appendTo.appendChild(self.calendarContainer);
                  }
                  if (self.config.static) {
                      var wrapper = createElement("div", "flatpickr-wrapper");
                      if (self.element.parentNode)
                          self.element.parentNode.insertBefore(wrapper, self.element);
                      wrapper.appendChild(self.element);
                      if (self.altInput)
                          wrapper.appendChild(self.altInput);
                      wrapper.appendChild(self.calendarContainer);
                  }
              }
              if (!self.config.static && !self.config.inline)
                  (self.config.appendTo !== undefined
                      ? self.config.appendTo
                      : window.document.body).appendChild(self.calendarContainer);
          }
          function createDay(className, date, dayNumber, i) {
              var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
              dayElement.dateObj = date;
              dayElement.$i = i;
              dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
              if (className.indexOf("hidden") === -1 &&
                  compareDates(date, self.now) === 0) {
                  self.todayDateElem = dayElement;
                  dayElement.classList.add("today");
                  dayElement.setAttribute("aria-current", "date");
              }
              if (dateIsEnabled) {
                  dayElement.tabIndex = -1;
                  if (isDateSelected(date)) {
                      dayElement.classList.add("selected");
                      self.selectedDateElem = dayElement;
                      if (self.config.mode === "range") {
                          toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                              compareDates(date, self.selectedDates[0], true) === 0);
                          toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                              compareDates(date, self.selectedDates[1], true) === 0);
                          if (className === "nextMonthDay")
                              dayElement.classList.add("inRange");
                      }
                  }
              }
              else {
                  dayElement.classList.add("flatpickr-disabled");
              }
              if (self.config.mode === "range") {
                  if (isDateInRange(date) && !isDateSelected(date))
                      dayElement.classList.add("inRange");
              }
              if (self.weekNumbers &&
                  self.config.showMonths === 1 &&
                  className !== "prevMonthDay" &&
                  dayNumber % 7 === 1) {
                  self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
              }
              triggerEvent("onDayCreate", dayElement);
              return dayElement;
          }
          function focusOnDayElem(targetNode) {
              targetNode.focus();
              if (self.config.mode === "range")
                  onMouseOver(targetNode);
          }
          function getFirstAvailableDay(delta) {
              var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
              var endMonth = delta > 0 ? self.config.showMonths : -1;
              for (var m = startMonth; m != endMonth; m += delta) {
                  var month = self.daysContainer.children[m];
                  var startIndex = delta > 0 ? 0 : month.children.length - 1;
                  var endIndex = delta > 0 ? month.children.length : -1;
                  for (var i = startIndex; i != endIndex; i += delta) {
                      var c = month.children[i];
                      if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                          return c;
                  }
              }
              return undefined;
          }
          function getNextAvailableDay(current, delta) {
              var givenMonth = current.className.indexOf("Month") === -1
                  ? current.dateObj.getMonth()
                  : self.currentMonth;
              var endMonth = delta > 0 ? self.config.showMonths : -1;
              var loopDelta = delta > 0 ? 1 : -1;
              for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
                  var month = self.daysContainer.children[m];
                  var startIndex = givenMonth - self.currentMonth === m
                      ? current.$i + delta
                      : delta < 0
                          ? month.children.length - 1
                          : 0;
                  var numMonthDays = month.children.length;
                  for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                      var c = month.children[i];
                      if (c.className.indexOf("hidden") === -1 &&
                          isEnabled(c.dateObj) &&
                          Math.abs(current.$i - i) >= Math.abs(delta))
                          return focusOnDayElem(c);
                  }
              }
              self.changeMonth(loopDelta);
              focusOnDay(getFirstAvailableDay(loopDelta), 0);
              return undefined;
          }
          function focusOnDay(current, offset) {
              var dayFocused = isInView(document.activeElement || document.body);
              var startElem = current !== undefined
                  ? current
                  : dayFocused
                      ? document.activeElement
                      : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                          ? self.selectedDateElem
                          : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                              ? self.todayDateElem
                              : getFirstAvailableDay(offset > 0 ? 1 : -1);
              if (startElem === undefined)
                  return self._input.focus();
              if (!dayFocused)
                  return focusOnDayElem(startElem);
              getNextAvailableDay(startElem, offset);
          }
          function buildMonthDays(year, month) {
              var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
              var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12);
              var daysInMonth = self.utils.getDaysInMonth(month), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
              var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
              // prepend days from the ending of previous month
              for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
                  days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
              }
              // Start at 1 since there is no 0th day
              for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
                  days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
              }
              // append days from the next month
              for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
                  (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
                  days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
              }
              //updateNavigationCurrentMonth();
              var dayContainer = createElement("div", "dayContainer");
              dayContainer.appendChild(days);
              return dayContainer;
          }
          function buildDays() {
              if (self.daysContainer === undefined) {
                  return;
              }
              clearNode(self.daysContainer);
              // TODO: week numbers for each month
              if (self.weekNumbers)
                  clearNode(self.weekNumbers);
              var frag = document.createDocumentFragment();
              for (var i = 0; i < self.config.showMonths; i++) {
                  var d = new Date(self.currentYear, self.currentMonth, 1);
                  d.setMonth(self.currentMonth + i);
                  frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
              }
              self.daysContainer.appendChild(frag);
              self.days = self.daysContainer.firstChild;
              if (self.config.mode === "range" && self.selectedDates.length === 1) {
                  onMouseOver();
              }
          }
          function buildMonthSwitch() {
              if (self.config.showMonths > 1 ||
                  self.config.monthSelectorType !== "dropdown")
                  return;
              var shouldBuildMonth = function (month) {
                  if (self.config.minDate !== undefined &&
                      self.currentYear === self.config.minDate.getFullYear() &&
                      month < self.config.minDate.getMonth()) {
                      return false;
                  }
                  return !(self.config.maxDate !== undefined &&
                      self.currentYear === self.config.maxDate.getFullYear() &&
                      month > self.config.maxDate.getMonth());
              };
              self.monthsDropdownContainer.tabIndex = -1;
              self.monthsDropdownContainer.innerHTML = "";
              for (var i = 0; i < 12; i++) {
                  if (!shouldBuildMonth(i))
                      continue;
                  var month = createElement("option", "flatpickr-monthDropdown-month");
                  month.value = new Date(self.currentYear, i).getMonth().toString();
                  month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
                  month.tabIndex = -1;
                  if (self.currentMonth === i) {
                      month.selected = true;
                  }
                  self.monthsDropdownContainer.appendChild(month);
              }
          }
          function buildMonth() {
              var container = createElement("div", "flatpickr-month");
              var monthNavFragment = window.document.createDocumentFragment();
              var monthElement;
              if (self.config.showMonths > 1 ||
                  self.config.monthSelectorType === "static") {
                  monthElement = createElement("span", "cur-month");
              }
              else {
                  self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
                  bind(self.monthsDropdownContainer, "change", function (e) {
                      var target = e.target;
                      var selectedMonth = parseInt(target.value, 10);
                      self.changeMonth(selectedMonth - self.currentMonth);
                      triggerEvent("onMonthChange");
                  });
                  buildMonthSwitch();
                  monthElement = self.monthsDropdownContainer;
              }
              var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
              var yearElement = yearInput.getElementsByTagName("input")[0];
              yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
              if (self.config.minDate) {
                  yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
              }
              if (self.config.maxDate) {
                  yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
                  yearElement.disabled =
                      !!self.config.minDate &&
                          self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
              }
              var currentMonth = createElement("div", "flatpickr-current-month");
              currentMonth.appendChild(monthElement);
              currentMonth.appendChild(yearInput);
              monthNavFragment.appendChild(currentMonth);
              container.appendChild(monthNavFragment);
              return {
                  container: container,
                  yearElement: yearElement,
                  monthElement: monthElement
              };
          }
          function buildMonths() {
              clearNode(self.monthNav);
              self.monthNav.appendChild(self.prevMonthNav);
              if (self.config.showMonths) {
                  self.yearElements = [];
                  self.monthElements = [];
              }
              for (var m = self.config.showMonths; m--;) {
                  var month = buildMonth();
                  self.yearElements.push(month.yearElement);
                  self.monthElements.push(month.monthElement);
                  self.monthNav.appendChild(month.container);
              }
              self.monthNav.appendChild(self.nextMonthNav);
          }
          function buildMonthNav() {
              self.monthNav = createElement("div", "flatpickr-months");
              self.yearElements = [];
              self.monthElements = [];
              self.prevMonthNav = createElement("span", "flatpickr-prev-month");
              self.prevMonthNav.innerHTML = self.config.prevArrow;
              self.nextMonthNav = createElement("span", "flatpickr-next-month");
              self.nextMonthNav.innerHTML = self.config.nextArrow;
              buildMonths();
              Object.defineProperty(self, "_hidePrevMonthArrow", {
                  get: function () { return self.__hidePrevMonthArrow; },
                  set: function (bool) {
                      if (self.__hidePrevMonthArrow !== bool) {
                          toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                          self.__hidePrevMonthArrow = bool;
                      }
                  }
              });
              Object.defineProperty(self, "_hideNextMonthArrow", {
                  get: function () { return self.__hideNextMonthArrow; },
                  set: function (bool) {
                      if (self.__hideNextMonthArrow !== bool) {
                          toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                          self.__hideNextMonthArrow = bool;
                      }
                  }
              });
              self.currentYearElement = self.yearElements[0];
              updateNavigationCurrentMonth();
              return self.monthNav;
          }
          function buildTime() {
              self.calendarContainer.classList.add("hasTime");
              if (self.config.noCalendar)
                  self.calendarContainer.classList.add("noCalendar");
              self.timeContainer = createElement("div", "flatpickr-time");
              self.timeContainer.tabIndex = -1;
              var separator = createElement("span", "flatpickr-time-separator", ":");
              var hourInput = createNumberInput("flatpickr-hour", {
                  "aria-label": self.l10n.hourAriaLabel
              });
              self.hourElement = hourInput.getElementsByTagName("input")[0];
              var minuteInput = createNumberInput("flatpickr-minute", {
                  "aria-label": self.l10n.minuteAriaLabel
              });
              self.minuteElement = minuteInput.getElementsByTagName("input")[0];
              self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
              self.hourElement.value = pad(self.latestSelectedDateObj
                  ? self.latestSelectedDateObj.getHours()
                  : self.config.time_24hr
                      ? self.config.defaultHour
                      : military2ampm(self.config.defaultHour));
              self.minuteElement.value = pad(self.latestSelectedDateObj
                  ? self.latestSelectedDateObj.getMinutes()
                  : self.config.defaultMinute);
              self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
              self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
              self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
              self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
              self.minuteElement.setAttribute("min", "0");
              self.minuteElement.setAttribute("max", "59");
              self.timeContainer.appendChild(hourInput);
              self.timeContainer.appendChild(separator);
              self.timeContainer.appendChild(minuteInput);
              if (self.config.time_24hr)
                  self.timeContainer.classList.add("time24hr");
              if (self.config.enableSeconds) {
                  self.timeContainer.classList.add("hasSeconds");
                  var secondInput = createNumberInput("flatpickr-second");
                  self.secondElement = secondInput.getElementsByTagName("input")[0];
                  self.secondElement.value = pad(self.latestSelectedDateObj
                      ? self.latestSelectedDateObj.getSeconds()
                      : self.config.defaultSeconds);
                  self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
                  self.secondElement.setAttribute("min", "0");
                  self.secondElement.setAttribute("max", "59");
                  self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
                  self.timeContainer.appendChild(secondInput);
              }
              if (!self.config.time_24hr) {
                  // add self.amPM if appropriate
                  self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                      ? self.hourElement.value
                      : self.config.defaultHour) > 11)]);
                  self.amPM.title = self.l10n.toggleTitle;
                  self.amPM.tabIndex = -1;
                  self.timeContainer.appendChild(self.amPM);
              }
              return self.timeContainer;
          }
          function buildWeekdays() {
              if (!self.weekdayContainer)
                  self.weekdayContainer = createElement("div", "flatpickr-weekdays");
              else
                  clearNode(self.weekdayContainer);
              for (var i = self.config.showMonths; i--;) {
                  var container = createElement("div", "flatpickr-weekdaycontainer");
                  self.weekdayContainer.appendChild(container);
              }
              updateWeekdays();
              return self.weekdayContainer;
          }
          function updateWeekdays() {
              if (!self.weekdayContainer) {
                  return;
              }
              var firstDayOfWeek = self.l10n.firstDayOfWeek;
              var weekdays = self.l10n.weekdays.shorthand.slice();
              if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
                  weekdays = weekdays.splice(firstDayOfWeek, weekdays.length).concat(weekdays.splice(0, firstDayOfWeek));
              }
              for (var i = self.config.showMonths; i--;) {
                  self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
              }
          }
          /* istanbul ignore next */
          function buildWeeks() {
              self.calendarContainer.classList.add("hasWeeks");
              var weekWrapper = createElement("div", "flatpickr-weekwrapper");
              weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
              var weekNumbers = createElement("div", "flatpickr-weeks");
              weekWrapper.appendChild(weekNumbers);
              return {
                  weekWrapper: weekWrapper,
                  weekNumbers: weekNumbers
              };
          }
          function changeMonth(value, isOffset) {
              if (isOffset === void 0) { isOffset = true; }
              var delta = isOffset ? value : value - self.currentMonth;
              if ((delta < 0 && self._hidePrevMonthArrow === true) ||
                  (delta > 0 && self._hideNextMonthArrow === true))
                  return;
              self.currentMonth += delta;
              if (self.currentMonth < 0 || self.currentMonth > 11) {
                  self.currentYear += self.currentMonth > 11 ? 1 : -1;
                  self.currentMonth = (self.currentMonth + 12) % 12;
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
              buildDays();
              triggerEvent("onMonthChange");
              updateNavigationCurrentMonth();
          }
          function clear(triggerChangeEvent, toInitial) {
              if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
              if (toInitial === void 0) { toInitial = true; }
              self.input.value = "";
              if (self.altInput !== undefined)
                  self.altInput.value = "";
              if (self.mobileInput !== undefined)
                  self.mobileInput.value = "";
              self.selectedDates = [];
              self.latestSelectedDateObj = undefined;
              if (toInitial === true) {
                  self.currentYear = self._initialDate.getFullYear();
                  self.currentMonth = self._initialDate.getMonth();
              }
              self.showTimeInput = false;
              if (self.config.enableTime === true) {
                  setDefaultHours();
              }
              self.redraw();
              if (triggerChangeEvent)
                  // triggerChangeEvent is true (default) or an Event
                  triggerEvent("onChange");
          }
          function close() {
              self.isOpen = false;
              if (!self.isMobile) {
                  if (self.calendarContainer !== undefined) {
                      self.calendarContainer.classList.remove("open");
                  }
                  if (self._input !== undefined) {
                      self._input.classList.remove("active");
                  }
              }
              triggerEvent("onClose");
          }
          function destroy() {
              if (self.config !== undefined)
                  triggerEvent("onDestroy");
              for (var i = self._handlers.length; i--;) {
                  var h = self._handlers[i];
                  h.element.removeEventListener(h.event, h.handler, h.options);
              }
              self._handlers = [];
              if (self.mobileInput) {
                  if (self.mobileInput.parentNode)
                      self.mobileInput.parentNode.removeChild(self.mobileInput);
                  self.mobileInput = undefined;
              }
              else if (self.calendarContainer && self.calendarContainer.parentNode) {
                  if (self.config.static && self.calendarContainer.parentNode) {
                      var wrapper = self.calendarContainer.parentNode;
                      wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                      if (wrapper.parentNode) {
                          while (wrapper.firstChild)
                              wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                          wrapper.parentNode.removeChild(wrapper);
                      }
                  }
                  else
                      self.calendarContainer.parentNode.removeChild(self.calendarContainer);
              }
              if (self.altInput) {
                  self.input.type = "text";
                  if (self.altInput.parentNode)
                      self.altInput.parentNode.removeChild(self.altInput);
                  delete self.altInput;
              }
              if (self.input) {
                  self.input.type = self.input._type;
                  self.input.classList.remove("flatpickr-input");
                  self.input.removeAttribute("readonly");
                  self.input.value = "";
              }
              [
                  "_showTimeInput",
                  "latestSelectedDateObj",
                  "_hideNextMonthArrow",
                  "_hidePrevMonthArrow",
                  "__hideNextMonthArrow",
                  "__hidePrevMonthArrow",
                  "isMobile",
                  "isOpen",
                  "selectedDateElem",
                  "minDateHasTime",
                  "maxDateHasTime",
                  "days",
                  "daysContainer",
                  "_input",
                  "_positionElement",
                  "innerContainer",
                  "rContainer",
                  "monthNav",
                  "todayDateElem",
                  "calendarContainer",
                  "weekdayContainer",
                  "prevMonthNav",
                  "nextMonthNav",
                  "monthsDropdownContainer",
                  "currentMonthElement",
                  "currentYearElement",
                  "navigationCurrentMonth",
                  "selectedDateElem",
                  "config",
              ].forEach(function (k) {
                  try {
                      delete self[k];
                  }
                  catch (_) { }
              });
          }
          function isCalendarElem(elem) {
              if (self.config.appendTo && self.config.appendTo.contains(elem))
                  return true;
              return self.calendarContainer.contains(elem);
          }
          function documentClick(e) {
              if (self.isOpen && !self.config.inline) {
                  var eventTarget_1 = getEventTarget(e);
                  var isCalendarElement = isCalendarElem(eventTarget_1);
                  var isInput = eventTarget_1 === self.input ||
                      eventTarget_1 === self.altInput ||
                      self.element.contains(eventTarget_1) ||
                      // web components
                      // e.path is not present in all browsers. circumventing typechecks
                      (e.path &&
                          e.path.indexOf &&
                          (~e.path.indexOf(self.input) ||
                              ~e.path.indexOf(self.altInput)));
                  var lostFocus = e.type === "blur"
                      ? isInput &&
                          e.relatedTarget &&
                          !isCalendarElem(e.relatedTarget)
                      : !isInput &&
                          !isCalendarElement &&
                          !isCalendarElem(e.relatedTarget);
                  var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                      return elem.contains(eventTarget_1);
                  });
                  if (lostFocus && isIgnored) {
                      if (self.timeContainer !== undefined &&
                          self.minuteElement !== undefined &&
                          self.hourElement !== undefined) {
                          updateTime();
                      }
                      self.close();
                      if (self.config.mode === "range" && self.selectedDates.length === 1) {
                          self.clear(false);
                          self.redraw();
                      }
                  }
              }
          }
          function changeYear(newYear) {
              if (!newYear ||
                  (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
                  (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
                  return;
              var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
              self.currentYear = newYearNum || self.currentYear;
              if (self.config.maxDate &&
                  self.currentYear === self.config.maxDate.getFullYear()) {
                  self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
              }
              else if (self.config.minDate &&
                  self.currentYear === self.config.minDate.getFullYear()) {
                  self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
              }
              if (isNewYear) {
                  self.redraw();
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
          }
          function isEnabled(date, timeless) {
              if (timeless === void 0) { timeless = true; }
              var dateToCheck = self.parseDate(date, undefined, timeless); // timeless
              if ((self.config.minDate &&
                  dateToCheck &&
                  compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
                  (self.config.maxDate &&
                      dateToCheck &&
                      compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
                  return false;
              if (self.config.enable.length === 0 && self.config.disable.length === 0)
                  return true;
              if (dateToCheck === undefined)
                  return false;
              var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
              for (var i = 0, d = void 0; i < array.length; i++) {
                  d = array[i];
                  if (typeof d === "function" &&
                      d(dateToCheck) // disabled by function
                  )
                      return bool;
                  else if (d instanceof Date &&
                      dateToCheck !== undefined &&
                      d.getTime() === dateToCheck.getTime())
                      // disabled by date
                      return bool;
                  else if (typeof d === "string" && dateToCheck !== undefined) {
                      // disabled by date string
                      var parsed = self.parseDate(d, undefined, true);
                      return parsed && parsed.getTime() === dateToCheck.getTime()
                          ? bool
                          : !bool;
                  }
                  else if (
                  // disabled by range
                  typeof d === "object" &&
                      dateToCheck !== undefined &&
                      d.from &&
                      d.to &&
                      dateToCheck.getTime() >= d.from.getTime() &&
                      dateToCheck.getTime() <= d.to.getTime())
                      return bool;
              }
              return !bool;
          }
          function isInView(elem) {
              if (self.daysContainer !== undefined)
                  return (elem.className.indexOf("hidden") === -1 &&
                      self.daysContainer.contains(elem));
              return false;
          }
          function onKeyDown(e) {
              // e.key                      e.keyCode
              // "Backspace"                        8
              // "Tab"                              9
              // "Enter"                           13
              // "Escape"     (IE "Esc")           27
              // "ArrowLeft"  (IE "Left")          37
              // "ArrowUp"    (IE "Up")            38
              // "ArrowRight" (IE "Right")         39
              // "ArrowDown"  (IE "Down")          40
              // "Delete"     (IE "Del")           46
              var isInput = e.target === self._input;
              var allowInput = self.config.allowInput;
              var allowKeydown = self.isOpen && (!allowInput || !isInput);
              var allowInlineKeydown = self.config.inline && isInput && !allowInput;
              if (e.keyCode === 13 && isInput) {
                  if (allowInput) {
                      self.setDate(self._input.value, true, e.target === self.altInput
                          ? self.config.altFormat
                          : self.config.dateFormat);
                      return e.target.blur();
                  }
                  else {
                      self.open();
                  }
              }
              else if (isCalendarElem(e.target) ||
                  allowKeydown ||
                  allowInlineKeydown) {
                  var isTimeObj = !!self.timeContainer &&
                      self.timeContainer.contains(e.target);
                  switch (e.keyCode) {
                      case 13:
                          if (isTimeObj) {
                              e.preventDefault();
                              updateTime();
                              focusAndClose();
                          }
                          else
                              selectDate(e);
                          break;
                      case 27: // escape
                          e.preventDefault();
                          focusAndClose();
                          break;
                      case 8:
                      case 46:
                          if (isInput && !self.config.allowInput) {
                              e.preventDefault();
                              self.clear();
                          }
                          break;
                      case 37:
                      case 39:
                          if (!isTimeObj && !isInput) {
                              e.preventDefault();
                              if (self.daysContainer !== undefined &&
                                  (allowInput === false ||
                                      (document.activeElement && isInView(document.activeElement)))) {
                                  var delta_1 = e.keyCode === 39 ? 1 : -1;
                                  if (!e.ctrlKey)
                                      focusOnDay(undefined, delta_1);
                                  else {
                                      e.stopPropagation();
                                      changeMonth(delta_1);
                                      focusOnDay(getFirstAvailableDay(1), 0);
                                  }
                              }
                          }
                          else if (self.hourElement)
                              self.hourElement.focus();
                          break;
                      case 38:
                      case 40:
                          e.preventDefault();
                          var delta = e.keyCode === 40 ? 1 : -1;
                          if ((self.daysContainer && e.target.$i !== undefined) ||
                              e.target === self.input ||
                              e.target === self.altInput) {
                              if (e.ctrlKey) {
                                  e.stopPropagation();
                                  changeYear(self.currentYear - delta);
                                  focusOnDay(getFirstAvailableDay(1), 0);
                              }
                              else if (!isTimeObj)
                                  focusOnDay(undefined, delta * 7);
                          }
                          else if (e.target === self.currentYearElement) {
                              changeYear(self.currentYear - delta);
                          }
                          else if (self.config.enableTime) {
                              if (!isTimeObj && self.hourElement)
                                  self.hourElement.focus();
                              updateTime(e);
                              self._debouncedChange();
                          }
                          break;
                      case 9:
                          if (isTimeObj) {
                              var elems = [
                                  self.hourElement,
                                  self.minuteElement,
                                  self.secondElement,
                                  self.amPM,
                              ]
                                  .concat(self.pluginElements)
                                  .filter(function (x) { return x; });
                              var i = elems.indexOf(e.target);
                              if (i !== -1) {
                                  var target = elems[i + (e.shiftKey ? -1 : 1)];
                                  e.preventDefault();
                                  (target || self._input).focus();
                              }
                          }
                          else if (!self.config.noCalendar &&
                              self.daysContainer &&
                              self.daysContainer.contains(e.target) &&
                              e.shiftKey) {
                              e.preventDefault();
                              self._input.focus();
                          }
                          break;
                  }
              }
              if (self.amPM !== undefined && e.target === self.amPM) {
                  switch (e.key) {
                      case self.l10n.amPM[0].charAt(0):
                      case self.l10n.amPM[0].charAt(0).toLowerCase():
                          self.amPM.textContent = self.l10n.amPM[0];
                          setHoursFromInputs();
                          updateValue();
                          break;
                      case self.l10n.amPM[1].charAt(0):
                      case self.l10n.amPM[1].charAt(0).toLowerCase():
                          self.amPM.textContent = self.l10n.amPM[1];
                          setHoursFromInputs();
                          updateValue();
                          break;
                  }
              }
              if (isInput || isCalendarElem(e.target)) {
                  triggerEvent("onKeyDown", e);
              }
          }
          function onMouseOver(elem) {
              if (self.selectedDates.length !== 1 ||
                  (elem &&
                      (!elem.classList.contains("flatpickr-day") ||
                          elem.classList.contains("flatpickr-disabled"))))
                  return;
              var hoverDate = elem
                  ? elem.dateObj.getTime()
                  : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
              var containsDisabled = false;
              var minRange = 0, maxRange = 0;
              for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
                  if (!isEnabled(new Date(t), true)) {
                      containsDisabled =
                          containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                      if (t < initialDate && (!minRange || t > minRange))
                          minRange = t;
                      else if (t > initialDate && (!maxRange || t < maxRange))
                          maxRange = t;
                  }
              }
              for (var m = 0; m < self.config.showMonths; m++) {
                  var month = self.daysContainer.children[m];
                  var _loop_1 = function (i, l) {
                      var dayElem = month.children[i], date = dayElem.dateObj;
                      var timestamp = date.getTime();
                      var outOfRange = (minRange > 0 && timestamp < minRange) ||
                          (maxRange > 0 && timestamp > maxRange);
                      if (outOfRange) {
                          dayElem.classList.add("notAllowed");
                          ["inRange", "startRange", "endRange"].forEach(function (c) {
                              dayElem.classList.remove(c);
                          });
                          return "continue";
                      }
                      else if (containsDisabled && !outOfRange)
                          return "continue";
                      ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                          dayElem.classList.remove(c);
                      });
                      if (elem !== undefined) {
                          elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                              ? "startRange"
                              : "endRange");
                          if (initialDate < hoverDate && timestamp === initialDate)
                              dayElem.classList.add("startRange");
                          else if (initialDate > hoverDate && timestamp === initialDate)
                              dayElem.classList.add("endRange");
                          if (timestamp >= minRange &&
                              (maxRange === 0 || timestamp <= maxRange) &&
                              isBetween(timestamp, initialDate, hoverDate))
                              dayElem.classList.add("inRange");
                      }
                  };
                  for (var i = 0, l = month.children.length; i < l; i++) {
                      _loop_1(i, l);
                  }
              }
          }
          function onResize() {
              if (self.isOpen && !self.config.static && !self.config.inline)
                  positionCalendar();
          }
          function setDefaultTime() {
              self.setDate(self.config.minDate !== undefined
                  ? new Date(self.config.minDate.getTime())
                  : new Date(), true);
              setDefaultHours();
              updateValue();
          }
          function open(e, positionElement) {
              if (positionElement === void 0) { positionElement = self._positionElement; }
              if (self.isMobile === true) {
                  if (e) {
                      e.preventDefault();
                      e.target && e.target.blur();
                  }
                  if (self.mobileInput !== undefined) {
                      self.mobileInput.focus();
                      self.mobileInput.click();
                  }
                  triggerEvent("onOpen");
                  return;
              }
              if (self._input.disabled || self.config.inline)
                  return;
              var wasOpen = self.isOpen;
              self.isOpen = true;
              if (!wasOpen) {
                  self.calendarContainer.classList.add("open");
                  self._input.classList.add("active");
                  triggerEvent("onOpen");
                  positionCalendar(positionElement);
              }
              if (self.config.enableTime === true && self.config.noCalendar === true) {
                  if (self.selectedDates.length === 0) {
                      setDefaultTime();
                  }
                  if (self.config.allowInput === false &&
                      (e === undefined ||
                          !self.timeContainer.contains(e.relatedTarget))) {
                      setTimeout(function () { return self.hourElement.select(); }, 50);
                  }
              }
          }
          function minMaxDateSetter(type) {
              return function (date) {
                  var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
                  var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
                  if (dateObj !== undefined) {
                      self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                          dateObj.getHours() > 0 ||
                              dateObj.getMinutes() > 0 ||
                              dateObj.getSeconds() > 0;
                  }
                  if (self.selectedDates) {
                      self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                      if (!self.selectedDates.length && type === "min")
                          setHoursFromDate(dateObj);
                      updateValue();
                  }
                  if (self.daysContainer) {
                      redraw();
                      if (dateObj !== undefined)
                          self.currentYearElement[type] = dateObj.getFullYear().toString();
                      else
                          self.currentYearElement.removeAttribute(type);
                      self.currentYearElement.disabled =
                          !!inverseDateObj &&
                              dateObj !== undefined &&
                              inverseDateObj.getFullYear() === dateObj.getFullYear();
                  }
              };
          }
          function parseConfig() {
              var boolOpts = [
                  "wrap",
                  "weekNumbers",
                  "allowInput",
                  "clickOpens",
                  "time_24hr",
                  "enableTime",
                  "noCalendar",
                  "altInput",
                  "shorthandCurrentMonth",
                  "inline",
                  "static",
                  "enableSeconds",
                  "disableMobile",
              ];
              var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
              var formats = {};
              self.config.parseDate = userConfig.parseDate;
              self.config.formatDate = userConfig.formatDate;
              Object.defineProperty(self.config, "enable", {
                  get: function () { return self.config._enable; },
                  set: function (dates) {
                      self.config._enable = parseDateRules(dates);
                  }
              });
              Object.defineProperty(self.config, "disable", {
                  get: function () { return self.config._disable; },
                  set: function (dates) {
                      self.config._disable = parseDateRules(dates);
                  }
              });
              var timeMode = userConfig.mode === "time";
              if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
                  var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
                  formats.dateFormat =
                      userConfig.noCalendar || timeMode
                          ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                          : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
              }
              if (userConfig.altInput &&
                  (userConfig.enableTime || timeMode) &&
                  !userConfig.altFormat) {
                  var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
                  formats.altFormat =
                      userConfig.noCalendar || timeMode
                          ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                          : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
              }
              if (!userConfig.altInputClass) {
                  self.config.altInputClass =
                      self.input.className + " " + self.config.altInputClass;
              }
              Object.defineProperty(self.config, "minDate", {
                  get: function () { return self.config._minDate; },
                  set: minMaxDateSetter("min")
              });
              Object.defineProperty(self.config, "maxDate", {
                  get: function () { return self.config._maxDate; },
                  set: minMaxDateSetter("max")
              });
              var minMaxTimeSetter = function (type) { return function (val) {
                  self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
              }; };
              Object.defineProperty(self.config, "minTime", {
                  get: function () { return self.config._minTime; },
                  set: minMaxTimeSetter("min")
              });
              Object.defineProperty(self.config, "maxTime", {
                  get: function () { return self.config._maxTime; },
                  set: minMaxTimeSetter("max")
              });
              if (userConfig.mode === "time") {
                  self.config.noCalendar = true;
                  self.config.enableTime = true;
              }
              Object.assign(self.config, formats, userConfig);
              for (var i = 0; i < boolOpts.length; i++)
                  self.config[boolOpts[i]] =
                      self.config[boolOpts[i]] === true ||
                          self.config[boolOpts[i]] === "true";
              HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
                  self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
              });
              self.isMobile =
                  !self.config.disableMobile &&
                      !self.config.inline &&
                      self.config.mode === "single" &&
                      !self.config.disable.length &&
                      !self.config.enable.length &&
                      !self.config.weekNumbers &&
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
              for (var i = 0; i < self.config.plugins.length; i++) {
                  var pluginConf = self.config.plugins[i](self) || {};
                  for (var key in pluginConf) {
                      if (HOOKS.indexOf(key) > -1) {
                          self.config[key] = arrayify(pluginConf[key])
                              .map(bindToInstance)
                              .concat(self.config[key]);
                      }
                      else if (typeof userConfig[key] === "undefined")
                          self.config[key] = pluginConf[key];
                  }
              }
              triggerEvent("onParseConfig");
          }
          function setupLocale() {
              if (typeof self.config.locale !== "object" &&
                  typeof flatpickr.l10ns[self.config.locale] === "undefined")
                  self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
              self.l10n = __assign({}, flatpickr.l10ns["default"], (typeof self.config.locale === "object"
                  ? self.config.locale
                  : self.config.locale !== "default"
                      ? flatpickr.l10ns[self.config.locale]
                      : undefined));
              tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
              var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
              if (userConfig.time_24hr === undefined &&
                  flatpickr.defaultConfig.time_24hr === undefined) {
                  self.config.time_24hr = self.l10n.time_24hr;
              }
              self.formatDate = createDateFormatter(self);
              self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
          }
          function positionCalendar(customPositionElement) {
              if (self.calendarContainer === undefined)
                  return;
              triggerEvent("onPreCalendarPosition");
              var positionElement = customPositionElement || self._positionElement;
              var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
                  (configPosVertical !== "below" &&
                      distanceFromBottom < calendarHeight &&
                      inputBounds.top > calendarHeight);
              var top = window.pageYOffset +
                  inputBounds.top +
                  (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
              toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
              toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
              if (self.config.inline)
                  return;
              var left = window.pageXOffset +
                  inputBounds.left -
                  (configPosHorizontal != null && configPosHorizontal === "center"
                      ? (calendarWidth - inputBounds.width) / 2
                      : 0);
              var right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
              var rightMost = left + calendarWidth > window.document.body.offsetWidth;
              var centerMost = right + calendarWidth > window.document.body.offsetWidth;
              toggleClass(self.calendarContainer, "rightMost", rightMost);
              if (self.config.static)
                  return;
              self.calendarContainer.style.top = top + "px";
              if (!rightMost) {
                  self.calendarContainer.style.left = left + "px";
                  self.calendarContainer.style.right = "auto";
              }
              else if (!centerMost) {
                  self.calendarContainer.style.left = "auto";
                  self.calendarContainer.style.right = right + "px";
              }
              else {
                  var doc = document.styleSheets[0];
                  // some testing environments don't have css support
                  if (doc === undefined)
                      return;
                  var bodyWidth = window.document.body.offsetWidth;
                  var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
                  var centerBefore = ".flatpickr-calendar.centerMost:before";
                  var centerAfter = ".flatpickr-calendar.centerMost:after";
                  var centerIndex = doc.cssRules.length;
                  var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
                  toggleClass(self.calendarContainer, "rightMost", false);
                  toggleClass(self.calendarContainer, "centerMost", true);
                  doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
                  self.calendarContainer.style.left = centerLeft + "px";
                  self.calendarContainer.style.right = "auto";
              }
          }
          function redraw() {
              if (self.config.noCalendar || self.isMobile)
                  return;
              updateNavigationCurrentMonth();
              buildDays();
          }
          function focusAndClose() {
              self._input.focus();
              if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
                  navigator.msMaxTouchPoints !== undefined) {
                  // hack - bugs in the way IE handles focus keeps the calendar open
                  setTimeout(self.close, 0);
              }
              else {
                  self.close();
              }
          }
          function selectDate(e) {
              e.preventDefault();
              e.stopPropagation();
              var isSelectable = function (day) {
                  return day.classList &&
                      day.classList.contains("flatpickr-day") &&
                      !day.classList.contains("flatpickr-disabled") &&
                      !day.classList.contains("notAllowed");
              };
              var t = findParent(e.target, isSelectable);
              if (t === undefined)
                  return;
              var target = t;
              var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
              var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
                  selectedDate.getMonth() >
                      self.currentMonth + self.config.showMonths - 1) &&
                  self.config.mode !== "range";
              self.selectedDateElem = target;
              if (self.config.mode === "single")
                  self.selectedDates = [selectedDate];
              else if (self.config.mode === "multiple") {
                  var selectedIndex = isDateSelected(selectedDate);
                  if (selectedIndex)
                      self.selectedDates.splice(parseInt(selectedIndex), 1);
                  else
                      self.selectedDates.push(selectedDate);
              }
              else if (self.config.mode === "range") {
                  if (self.selectedDates.length === 2) {
                      self.clear(false, false);
                  }
                  self.latestSelectedDateObj = selectedDate;
                  self.selectedDates.push(selectedDate);
                  // unless selecting same date twice, sort ascendingly
                  if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                      self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
              }
              setHoursFromInputs();
              if (shouldChangeMonth) {
                  var isNewYear = self.currentYear !== selectedDate.getFullYear();
                  self.currentYear = selectedDate.getFullYear();
                  self.currentMonth = selectedDate.getMonth();
                  if (isNewYear) {
                      triggerEvent("onYearChange");
                      buildMonthSwitch();
                  }
                  triggerEvent("onMonthChange");
              }
              updateNavigationCurrentMonth();
              buildDays();
              updateValue();
              if (self.config.enableTime)
                  setTimeout(function () { return (self.showTimeInput = true); }, 50);
              // maintain focus
              if (!shouldChangeMonth &&
                  self.config.mode !== "range" &&
                  self.config.showMonths === 1)
                  focusOnDayElem(target);
              else if (self.selectedDateElem !== undefined &&
                  self.hourElement === undefined) {
                  self.selectedDateElem && self.selectedDateElem.focus();
              }
              if (self.hourElement !== undefined)
                  self.hourElement !== undefined && self.hourElement.focus();
              if (self.config.closeOnSelect) {
                  var single = self.config.mode === "single" && !self.config.enableTime;
                  var range = self.config.mode === "range" &&
                      self.selectedDates.length === 2 &&
                      !self.config.enableTime;
                  if (single || range) {
                      focusAndClose();
                  }
              }
              triggerChange();
          }
          var CALLBACKS = {
              locale: [setupLocale, updateWeekdays],
              showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
              minDate: [jumpToDate],
              maxDate: [jumpToDate]
          };
          function set(option, value) {
              if (option !== null && typeof option === "object") {
                  Object.assign(self.config, option);
                  for (var key in option) {
                      if (CALLBACKS[key] !== undefined)
                          CALLBACKS[key].forEach(function (x) { return x(); });
                  }
              }
              else {
                  self.config[option] = value;
                  if (CALLBACKS[option] !== undefined)
                      CALLBACKS[option].forEach(function (x) { return x(); });
                  else if (HOOKS.indexOf(option) > -1)
                      self.config[option] = arrayify(value);
              }
              self.redraw();
              updateValue(false);
          }
          function setSelectedDate(inputDate, format) {
              var dates = [];
              if (inputDate instanceof Array)
                  dates = inputDate.map(function (d) { return self.parseDate(d, format); });
              else if (inputDate instanceof Date || typeof inputDate === "number")
                  dates = [self.parseDate(inputDate, format)];
              else if (typeof inputDate === "string") {
                  switch (self.config.mode) {
                      case "single":
                      case "time":
                          dates = [self.parseDate(inputDate, format)];
                          break;
                      case "multiple":
                          dates = inputDate
                              .split(self.config.conjunction)
                              .map(function (date) { return self.parseDate(date, format); });
                          break;
                      case "range":
                          dates = inputDate
                              .split(self.l10n.rangeSeparator)
                              .map(function (date) { return self.parseDate(date, format); });
                          break;
                  }
              }
              else
                  self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
              self.selectedDates = dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); });
              if (self.config.mode === "range")
                  self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
          }
          function setDate(date, triggerChange, format) {
              if (triggerChange === void 0) { triggerChange = false; }
              if (format === void 0) { format = self.config.dateFormat; }
              if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
                  return self.clear(triggerChange);
              setSelectedDate(date, format);
              self.showTimeInput = self.selectedDates.length > 0;
              self.latestSelectedDateObj =
                  self.selectedDates[self.selectedDates.length - 1];
              self.redraw();
              jumpToDate();
              setHoursFromDate();
              if (self.selectedDates.length === 0) {
                  self.clear(false);
              }
              updateValue(triggerChange);
              if (triggerChange)
                  triggerEvent("onChange");
          }
          function parseDateRules(arr) {
              return arr
                  .slice()
                  .map(function (rule) {
                  if (typeof rule === "string" ||
                      typeof rule === "number" ||
                      rule instanceof Date) {
                      return self.parseDate(rule, undefined, true);
                  }
                  else if (rule &&
                      typeof rule === "object" &&
                      rule.from &&
                      rule.to)
                      return {
                          from: self.parseDate(rule.from, undefined),
                          to: self.parseDate(rule.to, undefined)
                      };
                  return rule;
              })
                  .filter(function (x) { return x; }); // remove falsy values
          }
          function setupDates() {
              self.selectedDates = [];
              self.now = self.parseDate(self.config.now) || new Date();
              // Workaround IE11 setting placeholder as the input's value
              var preloadedDate = self.config.defaultDate ||
                  ((self.input.nodeName === "INPUT" ||
                      self.input.nodeName === "TEXTAREA") &&
                      self.input.placeholder &&
                      self.input.value === self.input.placeholder
                      ? null
                      : self.input.value);
              if (preloadedDate)
                  setSelectedDate(preloadedDate, self.config.dateFormat);
              self._initialDate =
                  self.selectedDates.length > 0
                      ? self.selectedDates[0]
                      : self.config.minDate &&
                          self.config.minDate.getTime() > self.now.getTime()
                          ? self.config.minDate
                          : self.config.maxDate &&
                              self.config.maxDate.getTime() < self.now.getTime()
                              ? self.config.maxDate
                              : self.now;
              self.currentYear = self._initialDate.getFullYear();
              self.currentMonth = self._initialDate.getMonth();
              if (self.selectedDates.length > 0)
                  self.latestSelectedDateObj = self.selectedDates[0];
              if (self.config.minTime !== undefined)
                  self.config.minTime = self.parseDate(self.config.minTime, "H:i");
              if (self.config.maxTime !== undefined)
                  self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
              self.minDateHasTime =
                  !!self.config.minDate &&
                      (self.config.minDate.getHours() > 0 ||
                          self.config.minDate.getMinutes() > 0 ||
                          self.config.minDate.getSeconds() > 0);
              self.maxDateHasTime =
                  !!self.config.maxDate &&
                      (self.config.maxDate.getHours() > 0 ||
                          self.config.maxDate.getMinutes() > 0 ||
                          self.config.maxDate.getSeconds() > 0);
              Object.defineProperty(self, "showTimeInput", {
                  get: function () { return self._showTimeInput; },
                  set: function (bool) {
                      self._showTimeInput = bool;
                      if (self.calendarContainer)
                          toggleClass(self.calendarContainer, "showTimeInput", bool);
                      self.isOpen && positionCalendar();
                  }
              });
          }
          function setupInputs() {
              self.input = self.config.wrap
                  ? element.querySelector("[data-input]")
                  : element;
              /* istanbul ignore next */
              if (!self.input) {
                  self.config.errorHandler(new Error("Invalid input element specified"));
                  return;
              }
              // hack: store previous type to restore it after destroy()
              self.input._type = self.input.type;
              self.input.type = "text";
              self.input.classList.add("flatpickr-input");
              self._input = self.input;
              if (self.config.altInput) {
                  // replicate self.element
                  self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
                  self._input = self.altInput;
                  self.altInput.placeholder = self.input.placeholder;
                  self.altInput.disabled = self.input.disabled;
                  self.altInput.required = self.input.required;
                  self.altInput.tabIndex = self.input.tabIndex;
                  self.altInput.type = "text";
                  self.input.setAttribute("type", "hidden");
                  if (!self.config.static && self.input.parentNode)
                      self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
              }
              if (!self.config.allowInput)
                  self._input.setAttribute("readonly", "readonly");
              self._positionElement = self.config.positionElement || self._input;
          }
          function setupMobile() {
              var inputType = self.config.enableTime
                  ? self.config.noCalendar
                      ? "time"
                      : "datetime-local"
                  : "date";
              self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
              self.mobileInput.step = self.input.getAttribute("step") || "any";
              self.mobileInput.tabIndex = 1;
              self.mobileInput.type = inputType;
              self.mobileInput.disabled = self.input.disabled;
              self.mobileInput.required = self.input.required;
              self.mobileInput.placeholder = self.input.placeholder;
              self.mobileFormatStr =
                  inputType === "datetime-local"
                      ? "Y-m-d\\TH:i:S"
                      : inputType === "date"
                          ? "Y-m-d"
                          : "H:i:S";
              if (self.selectedDates.length > 0) {
                  self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
              }
              if (self.config.minDate)
                  self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
              if (self.config.maxDate)
                  self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
              self.input.type = "hidden";
              if (self.altInput !== undefined)
                  self.altInput.type = "hidden";
              try {
                  if (self.input.parentNode)
                      self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
              }
              catch (_a) { }
              bind(self.mobileInput, "change", function (e) {
                  self.setDate(e.target.value, false, self.mobileFormatStr);
                  triggerEvent("onChange");
                  triggerEvent("onClose");
              });
          }
          function toggle(e) {
              if (self.isOpen === true)
                  return self.close();
              self.open(e);
          }
          function triggerEvent(event, data) {
              // If the instance has been destroyed already, all hooks have been removed
              if (self.config === undefined)
                  return;
              var hooks = self.config[event];
              if (hooks !== undefined && hooks.length > 0) {
                  for (var i = 0; hooks[i] && i < hooks.length; i++)
                      hooks[i](self.selectedDates, self.input.value, self, data);
              }
              if (event === "onChange") {
                  self.input.dispatchEvent(createEvent("change"));
                  // many front-end frameworks bind to the input event
                  self.input.dispatchEvent(createEvent("input"));
              }
          }
          function createEvent(name) {
              var e = document.createEvent("Event");
              e.initEvent(name, true, true);
              return e;
          }
          function isDateSelected(date) {
              for (var i = 0; i < self.selectedDates.length; i++) {
                  if (compareDates(self.selectedDates[i], date) === 0)
                      return "" + i;
              }
              return false;
          }
          function isDateInRange(date) {
              if (self.config.mode !== "range" || self.selectedDates.length < 2)
                  return false;
              return (compareDates(date, self.selectedDates[0]) >= 0 &&
                  compareDates(date, self.selectedDates[1]) <= 0);
          }
          function updateNavigationCurrentMonth() {
              if (self.config.noCalendar || self.isMobile || !self.monthNav)
                  return;
              self.yearElements.forEach(function (yearElement, i) {
                  var d = new Date(self.currentYear, self.currentMonth, 1);
                  d.setMonth(self.currentMonth + i);
                  if (self.config.showMonths > 1 ||
                      self.config.monthSelectorType === "static") {
                      self.monthElements[i].textContent =
                          monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
                  }
                  else {
                      self.monthsDropdownContainer.value = d.getMonth().toString();
                  }
                  yearElement.value = d.getFullYear().toString();
              });
              self._hidePrevMonthArrow =
                  self.config.minDate !== undefined &&
                      (self.currentYear === self.config.minDate.getFullYear()
                          ? self.currentMonth <= self.config.minDate.getMonth()
                          : self.currentYear < self.config.minDate.getFullYear());
              self._hideNextMonthArrow =
                  self.config.maxDate !== undefined &&
                      (self.currentYear === self.config.maxDate.getFullYear()
                          ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                          : self.currentYear > self.config.maxDate.getFullYear());
          }
          function getDateStr(format) {
              return self.selectedDates
                  .map(function (dObj) { return self.formatDate(dObj, format); })
                  .filter(function (d, i, arr) {
                  return self.config.mode !== "range" ||
                      self.config.enableTime ||
                      arr.indexOf(d) === i;
              })
                  .join(self.config.mode !== "range"
                  ? self.config.conjunction
                  : self.l10n.rangeSeparator);
          }
          /**
           * Updates the values of inputs associated with the calendar
           */
          function updateValue(triggerChange) {
              if (triggerChange === void 0) { triggerChange = true; }
              if (self.mobileInput !== undefined && self.mobileFormatStr) {
                  self.mobileInput.value =
                      self.latestSelectedDateObj !== undefined
                          ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                          : "";
              }
              self.input.value = getDateStr(self.config.dateFormat);
              if (self.altInput !== undefined) {
                  self.altInput.value = getDateStr(self.config.altFormat);
              }
              if (triggerChange !== false)
                  triggerEvent("onValueUpdate");
          }
          function onMonthNavClick(e) {
              var isPrevMonth = self.prevMonthNav.contains(e.target);
              var isNextMonth = self.nextMonthNav.contains(e.target);
              if (isPrevMonth || isNextMonth) {
                  changeMonth(isPrevMonth ? -1 : 1);
              }
              else if (self.yearElements.indexOf(e.target) >= 0) {
                  e.target.select();
              }
              else if (e.target.classList.contains("arrowUp")) {
                  self.changeYear(self.currentYear + 1);
              }
              else if (e.target.classList.contains("arrowDown")) {
                  self.changeYear(self.currentYear - 1);
              }
          }
          function timeWrapper(e) {
              e.preventDefault();
              var isKeyDown = e.type === "keydown", input = e.target;
              if (self.amPM !== undefined && e.target === self.amPM) {
                  self.amPM.textContent =
                      self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
              }
              var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
                  (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
              var newValue = curValue + step * delta;
              if (typeof input.value !== "undefined" && input.value.length === 2) {
                  var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
                  if (newValue < min) {
                      newValue =
                          max +
                              newValue +
                              int(!isHourElem) +
                              (int(isHourElem) && int(!self.amPM));
                      if (isMinuteElem)
                          incrementNumInput(undefined, -1, self.hourElement);
                  }
                  else if (newValue > max) {
                      newValue =
                          input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                      if (isMinuteElem)
                          incrementNumInput(undefined, 1, self.hourElement);
                  }
                  if (self.amPM &&
                      isHourElem &&
                      (step === 1
                          ? newValue + curValue === 23
                          : Math.abs(newValue - curValue) > step)) {
                      self.amPM.textContent =
                          self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
                  }
                  input.value = pad(newValue);
              }
          }
          init();
          return self;
      }
      /* istanbul ignore next */
      function _flatpickr(nodeList, config) {
          // static list
          var nodes = Array.prototype.slice
              .call(nodeList)
              .filter(function (x) { return x instanceof HTMLElement; });
          var instances = [];
          for (var i = 0; i < nodes.length; i++) {
              var node = nodes[i];
              try {
                  if (node.getAttribute("data-fp-omit") !== null)
                      continue;
                  if (node._flatpickr !== undefined) {
                      node._flatpickr.destroy();
                      node._flatpickr = undefined;
                  }
                  node._flatpickr = FlatpickrInstance(node, config || {});
                  instances.push(node._flatpickr);
              }
              catch (e) {
                  console.error(e);
              }
          }
          return instances.length === 1 ? instances[0] : instances;
      }
      /* istanbul ignore next */
      if (typeof HTMLElement !== "undefined" &&
          typeof HTMLCollection !== "undefined" &&
          typeof NodeList !== "undefined") {
          // browser env
          HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
              return _flatpickr(this, config);
          };
          HTMLElement.prototype.flatpickr = function (config) {
              return _flatpickr([this], config);
          };
      }
      /* istanbul ignore next */
      var flatpickr = function (selector, config) {
          if (typeof selector === "string") {
              return _flatpickr(window.document.querySelectorAll(selector), config);
          }
          else if (selector instanceof Node) {
              return _flatpickr([selector], config);
          }
          else {
              return _flatpickr(selector, config);
          }
      };
      /* istanbul ignore next */
      flatpickr.defaultConfig = {};
      flatpickr.l10ns = {
          en: __assign({}, english),
          "default": __assign({}, english)
      };
      flatpickr.localize = function (l10n) {
          flatpickr.l10ns["default"] = __assign({}, flatpickr.l10ns["default"], l10n);
      };
      flatpickr.setDefaults = function (config) {
          flatpickr.defaultConfig = __assign({}, flatpickr.defaultConfig, config);
      };
      flatpickr.parseDate = createDateParser({});
      flatpickr.formatDate = createDateFormatter({});
      flatpickr.compareDates = compareDates;
      /* istanbul ignore next */
      if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
          jQuery.fn.flatpickr = function (config) {
              return _flatpickr(this, config);
          };
      }
      // eslint-disable-next-line @typescript-eslint/camelcase
      Date.prototype.fp_incr = function (days) {
          return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
      };
      if (typeof window !== "undefined") {
          window.flatpickr = flatpickr;
      }

      return flatpickr;

  }));
  });

  var mrFlatpickr = function ($) {
    /**
     * Check for flatpickr dependency
     */
    if (typeof flatpickr === 'undefined') {
      throw new Error('mrFlatpickr requires flatpickr.js (https://github.com/flatpickr/flatpickr)');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrFlatpickr';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.flatpickr';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var Selector = {
      FLATPICKR: '[data-flatpickr]'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Flatpickr =
    /*#__PURE__*/
    function () {
      function Flatpickr(element) {
        // The current flatpickr element
        this.element = element; // const $element = $(element);

        this.initflatpickr();
      } // getters


      var _proto = Flatpickr.prototype;

      _proto.initflatpickr = function initflatpickr() {
        var options = $(this.element).data();
        this.instance = flatpickr(this.element, options);
      };

      Flatpickr.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachFlatpickr() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Flatpickr(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(Flatpickr, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Flatpickr;
    }(); // END Class definition

    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      var pickers = $.makeArray($(Selector.FLATPICKR));
      /* eslint-disable no-plusplus */

      for (var i = pickers.length; i--;) {
        var $flatpickr = $(pickers[i]);
        Flatpickr.jQueryInterface.call($flatpickr, $flatpickr.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = Flatpickr.jQueryInterface;
    $.fn[NAME].Constructor = Flatpickr;

    $.fn[NAME].noConflict = function flatpickrNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Flatpickr.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return Flatpickr;
  }(jQuery$1);

  //

  (function () {
    $(document).on('shown.bs.modal layoutComplete', function (e) {
      var flickityInstance = $(e.target).find('[data-flickity]');
      flickityInstance.each(function (index, instance) {
        var $instance = $(instance);

        if ($instance.data().flickity.isInitActivated) {
          $instance.flickity('resize');
        }
      });
    });
  })();

  var mrRecaptchav2 = function ($) {
    // Check mrUtil is present and correct version
    if (!(mrUtil && mrUtil.version >= '1.2.0')) {
      throw new Error('mrUtil >= version 1.2.0 is required.');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrRecaptchav2';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.recaptchav2'; // const EVENT_KEY = `.${DATA_KEY}`;
    // const DATA_API_KEY = '.data-api';

    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var RECAPTCHA_CALLBACK = 'mrRecaptchav2Init';
    var RemoteScript = {
      RECAPTCHAV2: "https://www.google.com/recaptcha/api.js?onload=" + RECAPTCHA_CALLBACK + "&render=explicit"
    };
    var Selector = {
      DATA_RECAPTCHA: '[data-recaptcha]',
      FORM: 'form'
    };
    var Options = {
      INVISIBLE: 'invisible'
    }; // "static" properties

    var instances = [];
    var apiReady = false;
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Recaptchav2 =
    /*#__PURE__*/
    function () {
      function Recaptchav2(element) {
        this.element = element;
        this.form = this.getForm();
        this.isReady = false;
        this.isValid = false;
        this.options = $(this.element).data();
        this.invisible = this.options.size === Options.INVISIBLE;
        this.id = null; // Save instance into static property array

        instances.push(this);
      } // getters


      var _proto = Recaptchav2.prototype;

      _proto.init = function init() {
        var _this = this;

        if (this.element.innerHTML.replace(/[\s\xA0]+/g, '') === '') {
          this.id = grecaptcha.render(this.element, {
            sitekey: this.options.sitekey,
            theme: this.options.theme,
            size: this.options.size,
            badge: this.options.badge,
            tabindex: this.options.tabindex,
            callback: function callback() {
              _this.validate();
            },
            'expired-callback': function expiredCallback() {
              _this.invalidate();
            }
          });
          this.isReady = true;
        }
      };

      _proto.validate = function validate() {
        this.isValid = true;

        if (this.invisible && this.form) {
          $(this.form).trigger('submit');
        }
      };

      _proto.invalidate = function invalidate() {
        this.isValid = false;
      };

      _proto.checkValidity = function checkValidity() {
        if (this.isReady && this.isValid) {
          return true;
        }

        return false;
      };

      _proto.execute = function execute() {
        if (this.isReady && this.invisible) {
          grecaptcha.execute(this.id);
        }
      };

      _proto.reset = function reset() {
        if (this.isReady) {
          grecaptcha.reset(this.id);
          this.isValid = false;
        }
      };

      _proto.getForm = function getForm() {
        var closestForm = $(this.element).closest(Selector.FORM);
        return closestForm.length ? closestForm.get(0) : null;
      };

      Recaptchav2.getRecaptchaFromForm = function getRecaptchaFromForm(form) {
        if (mrUtil.isElement(form)) {
          var captchaElement = form.querySelector(Selector.DATA_RECAPTCHA);

          if (captchaElement) {
            var data = $(captchaElement).data(DATA_KEY);
            return data || null;
          }

          return null;
        }

        throw new TypeError('Form argument passed to getRecaptchaFromForm is not an element.');
      };

      Recaptchav2.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachRecaptchav2() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Recaptchav2(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(Recaptchav2, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "ready",
        get: function get() {
          return apiReady;
        }
      }, {
        key: "instances",
        get: function get() {
          return instances;
        }
      }, {
        key: "apiReady",
        set: function set(ready) {
          if (ready === true && apiReady === false) {
            mrUtil.forEach(Recaptchav2.instances, function (index, instance) {
              instance.init();
            });
          }

          apiReady = true;
        }
      }]);

      return Recaptchav2;
    }();

    window.mrRecaptchav2Init = function () {
      mrRecaptchav2.apiReady = true;
    };
    /**
     * ------------------------------------------------------------------------
     * Initialise API javascript if recaptcha widgets are found
     * ------------------------------------------------------------------------
     */


    $(document).ready(function () {
      var Recaptchav2Elements = $.makeArray($(Selector.DATA_RECAPTCHA));

      if (Recaptchav2Elements.length > 0) {
        mrUtil.getScript(RemoteScript.RECAPTCHAV2);
        /* eslint-disable no-plusplus */

        for (var i = Recaptchav2Elements.length; i--;) {
          var $Recaptchav2 = $(Recaptchav2Elements[i]);
          Recaptchav2.jQueryInterface.call($Recaptchav2, $Recaptchav2.data());
        }
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = Recaptchav2.jQueryInterface;
    $.fn[NAME].Constructor = Recaptchav2;

    $.fn[NAME].noConflict = function Recaptchav2NoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Recaptchav2.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return Recaptchav2;
  }(jQuery);

  var mrFormEmail = function ($) {
    // Check mrUtil is present and correct version
    if (!(mrUtil && mrUtil.version >= '1.2.0')) {
      throw new Error('mrUtil >= version 1.2.0 is required.');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrFormEmail';
    var VERSION = '1.0.1';
    var DATA_KEY = 'mr.formEmail';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ClassName = {
      LOADING: 'btn-loading-animate',
      WAS_VALIDATED: 'was-validated',
      D_NONE: 'd-none'
    };
    var Attribute = {
      ACTION: 'action',
      DISABLED: 'disabled',
      FEEDBACK_DELAY: 'data-feedback-delay',
      SUCCESS_REDIRECT: 'data-success-redirect'
    };
    var Selector = {
      DATA_ATTR: 'form-email',
      DATA_FORM_EMAIL: '[data-form-email]',
      DATA_SUCCESS: '[data-success-message]',
      DATA_ERROR: '[data-error-message]',
      SUBMIT_BUTTON: 'button[type="submit"]',
      SPAN: 'span',
      ALL_INPUTS: 'input,textarea,select',
      INITIALLY_DISABLED: 'initially-disabled'
    };
    var Event = {
      SENT: "sent" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      SUBMIT: 'submit'
    };
    var Options = {
      LOADING_TEXT: 'data-loading-text'
    };
    var Default = {
      LOADING_TEXT: 'Sending',
      FORM_ACTION: '',
      FEEDBACK_DELAY: 5000,
      ERROR_TEXT: 'Form submission error'
    };
    var Status = {
      SUCCESS: 'success',
      ERROR: 'error'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var FormEmail =
    /*#__PURE__*/
    function () {
      function FormEmail(element) {
        this.form = element;
        this.action = this.form.getAttribute(Attribute.ACTION) || Default.FORM_ACTION; // Returns an object containing the feedback

        this.feedback = this.getFeedbackElements(); // Get any recaptcha instances in the form - returns array of instances or null

        this.getRecaptcha(); // Get submit button, inner span and loading text.

        this.initSubmitButton(); // const $element = $(element);

        this.setSubmitEvent();
      } // getters


      var _proto = FormEmail.prototype;

      _proto.submitForm = function submitForm() {
        // Hide feedback messages for fresh submit
        this.hideAllFeedback(); // Submit form if validateForm returns true

        if (this.validateForm()) {
          this.ajaxSubmit();
        }
      };

      _proto.validateForm = function validateForm() {
        var formIsValid = this.form.checkValidity();

        if (this.recaptcha) {
          if (this.recaptcha.invisible) {
            if (formIsValid && !this.recaptcha.checkValidity()) {
              this.recaptcha.execute();
              return false;
            } // invalidate if captcha is found and is not valid, otherwise keep original value

          } else if (this.recaptcha.checkValidity() === false) {
            formIsValid = false;
          }
        }

        if (!formIsValid) {
          // Cancel timeout so error message will stay shown
          clearTimeout(this.feedbackTimeout); // Allow BS validation styles to take effect

          this.form.classList.add(ClassName.WAS_VALIDATED);
          this.showFeedback(Status.ERROR, this.validationErrorMessage);
          return false;
        }

        this.form.classList.remove(ClassName.WAS_VALIDATED);
        return true;
      };

      _proto.ajaxSubmit = function ajaxSubmit() {
        var _this = this;

        var $form = $(this.form);
        var formData = $form.serializeArray();
        this.toggleFormLoading(true);
        var db = firebase.firestore();
        var email = formData[0].value;
        db.collection("signups").doc(email).set({
          email: email,
          timestamp: Date.now()
        }).then(function () {
          _this.processResponse({
            status: Status.SUCCESS,
            message: "Thanks, you're on the list! Fill out this <a target='_blank' href=https://form.questionscout.com/5e9fd1e44be87a23724ed41b?email=" + email + ">short survey</a> to find out if we can get you onto Cadence even sooner."
          });
        });
      };

      _proto.initSubmitButton = function initSubmitButton() {
        if (!this.submitButton) {
          this.submitButton = this.form.querySelector(Selector.SUBMIT_BUTTON);
        }

        this.submitButtonSpan = this.submitButton.querySelector(Selector.SPAN);
        this.loadingText = this.submitButton.getAttribute(Options.LOADING_TEXT) || Default.LOADING_TEXT;
        this.originalSubmitText = this.submitButtonSpan.textContent;
        return this.submitButton;
      };

      _proto.processResponse = function processResponse(response) {
        var success = response.status === Status.SUCCESS; // Form is no longer in a 'loading' state

        this.toggleFormLoading(false); // Recaptcha will need to be solved again

        if (this.recaptcha) {
          this.recaptcha.reset();
        } // Trigger an event so users can fire Analytics scripts upon success


        $(this.form).trigger($.Event(Event.SENT)); // Redirect upon success if data-attribute is set

        var successRedirect = this.form.getAttribute(Attribute.SUCCESS_REDIRECT);

        if (success && successRedirect && successRedirect !== '') {
          window.location = successRedirect;
        } else if (success) {
          this.form.reset(); // Hide all feedback and hold a reference to the timeout
          // to cancel it when necessary.

          this.hideAllFeedback(); // this.feedbackTimeout = setTimeout(() => this.hideAllFeedback(), this.feedbackDelay);
        } //  Show ERROR feedback message if not redirecting


        if (!successRedirect) {
          this.showFeedback(response.status, response.message);
        } // Detailed error message will be shown in Console if provided


        if (response.errorDetail) {
          /* eslint-disable no-console */
          console.error(response.errorName || Default.ERROR_TEXT, response.errorDetail.indexOf('{') === 0 ? JSON.parse(response.errorDetail) : response.errorDetail);
          /* eslint-enable no-console */
        }
      };

      _proto.showFeedback = function showFeedback(status, text, errorHTTP) {
        // Form is no longer in a 'loading' state
        this.toggleFormLoading(false); // If this is an ajax error from jQuery, 'status' will be
        // an object with statusText property

        if (typeof status === 'object' && status.statusText) {
          clearTimeout(this.feedbackTimeout);
          this.feedback.error.innerHTML = (errorHTTP || text) + ": <em>\"" + this.action + "\"</em> (" + status.status + " " + text + ")";
          this.feedback.error.classList.remove(ClassName.D_NONE);
        } else {
          this.feedback[status].innerHTML = text;
          this.feedback[status].classList.remove(ClassName.D_NONE);
        }
      };

      _proto.hideAllFeedback = function hideAllFeedback() {
        this.feedback.success.classList.add(ClassName.D_NONE);
        this.feedback.error.classList.add(ClassName.D_NONE);
      };

      _proto.getFeedbackElements = function getFeedbackElements() {
        if (!this.feedback) {
          this.feedback = {
            success: this.form.querySelector(Selector.DATA_SUCCESS),
            error: this.form.querySelector(Selector.DATA_ERROR)
          }; // Store the error alert's original text to be used as validation error message

          this.validationErrorMessage = this.feedback.error.innerHTML;
          var feedbackDelay = this.form.getAttribute(Attribute.FEEDBACK_DELAY) || Default.FEEDBACK_DELAY;
          this.feedbackDelay = parseInt(feedbackDelay, 10);
          this.feedbackTimeout = null;
        }

        return this.feedback;
      };

      _proto.getRecaptcha = function getRecaptcha() {
        if (this.form.querySelector(mrUtil.selector.RECAPTCHA)) {
          // Check mrUtil is present and correct version
          if (!mrRecaptchav2) {
            throw new Error('mrRecaptcha.js is required to handle the reCAPTCHA element in this form.');
          } else {
            // Returns an array of mrRecaptcha instances or null
            this.recaptcha = mrRecaptchav2.getRecaptchaFromForm(this.form);
          }
        }
      };

      _proto.toggleFormLoading = function toggleFormLoading(loading) {
        this.toggleSubmitButtonLoading(loading);
        FormEmail.toggleDisabled(this.form.querySelectorAll(Selector.ALL_INPUTS), loading);
      };

      _proto.toggleSubmitButtonLoading = function toggleSubmitButtonLoading(loading) {
        this.toggleSubmitButtonText(loading);
        this.toggleSubmitButtonAnimation(loading);
        FormEmail.toggleDisabled(this.submitButton, loading);
      };

      _proto.toggleSubmitButtonAnimation = function toggleSubmitButtonAnimation(animate) {
        // If animate is true, add the class, else remove it.
        this.submitButton.classList[animate ? 'add' : 'remove'](ClassName.LOADING);
      };

      _proto.toggleSubmitButtonText = function toggleSubmitButtonText(loading) {
        // If loading, set text to loading text, else return to original text.
        this.submitButtonSpan.textContent = loading ? this.loadingText : this.originalSubmitText;
      };

      FormEmail.toggleDisabled = function toggleDisabled(elements, disabled) {
        mrUtil.forEach(elements, function (index, element) {
          if (disabled) {
            // Toggle to disabled
            if (element.getAttribute(Attribute.DISABLED) !== null) {
              element.classList.add(Selector.INITIALLY_DISABLED);
            } else {
              element.setAttribute(Attribute.DISABLED, '');
            }
          } // Toggle to enabled
          // Only enable if input is found not to be deliberately disabled


          if (!disabled && !element.classList.contains(Selector.INITIALLY_DISABLED)) {
            element.removeAttribute(Attribute.DISABLED);
          }
        });
      };

      FormEmail.getInstanceFromForm = function getInstanceFromForm(form) {
        if (mrUtil.isElement(form)) {
          var data = $(form).data(DATA_KEY);
          return data || null;
        }

        throw new TypeError('Form argument passed to getInstanceFromForm is not an element.');
      };

      _proto.setSubmitEvent = function setSubmitEvent() {
        var _this2 = this;

        $(this.form).on(Event.SUBMIT, function (event) {
          event.preventDefault();

          _this2.submitForm();
        });
      };

      FormEmail.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachFormEmail() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new FormEmail(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(FormEmail, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return FormEmail;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      console.log("HERE!!!");
      var FormEmailElements = $.makeArray($(Selector.DATA_FORM_EMAIL));
      /* eslint-disable no-plusplus */

      for (var i = FormEmailElements.length; i--;) {
        var $FormEmail = $(FormEmailElements[i]);
        FormEmail.jQueryInterface.call($FormEmail, $FormEmail.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = FormEmail.jQueryInterface;
    $.fn[NAME].Constructor = FormEmail;

    $.fn[NAME].noConflict = function FormEmailNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return FormEmail.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return FormEmail;
  }(jQuery$1);

  var ion_rangeSlider = createCommonjsModule(function (module, exports) {
  (function(factory) {
      if (!jQuery && typeof undefined === "function" && undefined.amd) {
          undefined(["jquery"], function (jQuery) {
              return factory(jQuery, document, window, navigator);
          });
      } else if (!jQuery && 'object' === "object") {
          factory(jQuery$1, document, window, navigator);
      } else {
          factory(jQuery, document, window, navigator);
      }
  } (function ($, document, window, navigator, undefined$1) {

      // =================================================================================================================
      // Service

      var plugin_count = 0;

      // IE8 fix
      var is_old_ie = (function () {
          var n = navigator.userAgent,
              r = /msie\s\d+/i,
              v;
          if (n.search(r) > 0) {
              v = r.exec(n).toString();
              v = v.split(" ")[1];
              if (v < 9) {
                  $("html").addClass("lt-ie9");
                  return true;
              }
          }
          return false;
      } ());
      if (!Function.prototype.bind) {
          Function.prototype.bind = function bind(that) {

              var target = this;
              var slice = [].slice;

              if (typeof target != "function") {
                  throw new TypeError();
              }

              var args = slice.call(arguments, 1),
                  bound = function () {

                      if (this instanceof bound) {

                          var F = function(){};
                          F.prototype = target.prototype;
                          var self = new F();

                          var result = target.apply(
                              self,
                              args.concat(slice.call(arguments))
                          );
                          if (Object(result) === result) {
                              return result;
                          }
                          return self;

                      } else {

                          return target.apply(
                              that,
                              args.concat(slice.call(arguments))
                          );

                      }

                  };

              return bound;
          };
      }
      if (!Array.prototype.indexOf) {
          Array.prototype.indexOf = function(searchElement, fromIndex) {
              var k;
              if (this == null) {
                  throw new TypeError('"this" is null or not defined');
              }
              var O = Object(this);
              var len = O.length >>> 0;
              if (len === 0) {
                  return -1;
              }
              var n = +fromIndex || 0;
              if (Math.abs(n) === Infinity) {
                  n = 0;
              }
              if (n >= len) {
                  return -1;
              }
              k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
              while (k < len) {
                  if (k in O && O[k] === searchElement) {
                      return k;
                  }
                  k++;
              }
              return -1;
          };
      }



      // =================================================================================================================
      // Template

      var base_html =
          '<span class="irs">' +
          '<span class="irs-line" tabindex="0"></span>' +
          '<span class="irs-min">0</span><span class="irs-max">1</span>' +
          '<span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span>' +
          '</span>' +
          '<span class="irs-grid"></span>';

      var single_html =
          '<span class="irs-bar irs-bar--single"></span>' +
          '<span class="irs-shadow shadow-single"></span>' +
          '<span class="irs-handle single"><i></i><i></i><i></i></span>';

      var double_html =
          '<span class="irs-bar"></span>' +
          '<span class="irs-shadow shadow-from"></span>' +
          '<span class="irs-shadow shadow-to"></span>' +
          '<span class="irs-handle from"><i></i><i></i><i></i></span>' +
          '<span class="irs-handle to"><i></i><i></i><i></i></span>';

      var disable_html =
          '<span class="irs-disable-mask"></span>';



      // =================================================================================================================
      // Core

      /**
       * Main plugin constructor
       *
       * @param input {Object} link to base input element
       * @param options {Object} slider config
       * @param plugin_count {Number}
       * @constructor
       */
      var IonRangeSlider = function (input, options, plugin_count) {
          this.VERSION = "2.3.0";
          this.input = input;
          this.plugin_count = plugin_count;
          this.current_plugin = 0;
          this.calc_count = 0;
          this.update_tm = 0;
          this.old_from = 0;
          this.old_to = 0;
          this.old_min_interval = null;
          this.raf_id = null;
          this.dragging = false;
          this.force_redraw = false;
          this.no_diapason = false;
          this.has_tab_index = true;
          this.is_key = false;
          this.is_update = false;
          this.is_start = true;
          this.is_finish = false;
          this.is_active = false;
          this.is_resize = false;
          this.is_click = false;

          options = options || {};

          // cache for links to all DOM elements
          this.$cache = {
              win: $(window),
              body: $(document.body),
              input: $(input),
              cont: null,
              rs: null,
              min: null,
              max: null,
              from: null,
              to: null,
              single: null,
              bar: null,
              line: null,
              s_single: null,
              s_from: null,
              s_to: null,
              shad_single: null,
              shad_from: null,
              shad_to: null,
              edge: null,
              grid: null,
              grid_labels: []
          };

          // storage for measure variables
          this.coords = {
              // left
              x_gap: 0,
              x_pointer: 0,

              // width
              w_rs: 0,
              w_rs_old: 0,
              w_handle: 0,

              // percents
              p_gap: 0,
              p_gap_left: 0,
              p_gap_right: 0,
              p_step: 0,
              p_pointer: 0,
              p_handle: 0,
              p_single_fake: 0,
              p_single_real: 0,
              p_from_fake: 0,
              p_from_real: 0,
              p_to_fake: 0,
              p_to_real: 0,
              p_bar_x: 0,
              p_bar_w: 0,

              // grid
              grid_gap: 0,
              big_num: 0,
              big: [],
              big_w: [],
              big_p: [],
              big_x: []
          };

          // storage for labels measure variables
          this.labels = {
              // width
              w_min: 0,
              w_max: 0,
              w_from: 0,
              w_to: 0,
              w_single: 0,

              // percents
              p_min: 0,
              p_max: 0,
              p_from_fake: 0,
              p_from_left: 0,
              p_to_fake: 0,
              p_to_left: 0,
              p_single_fake: 0,
              p_single_left: 0
          };



          /**
           * get and validate config
           */
          var $inp = this.$cache.input,
              val = $inp.prop("value"),
              config, config_from_data, prop;

          // default config
          config = {
              skin: "flat",
              type: "single",

              min: 10,
              max: 100,
              from: null,
              to: null,
              step: 1,

              min_interval: 0,
              max_interval: 0,
              drag_interval: false,

              values: [],
              p_values: [],

              from_fixed: false,
              from_min: null,
              from_max: null,
              from_shadow: false,

              to_fixed: false,
              to_min: null,
              to_max: null,
              to_shadow: false,

              prettify_enabled: true,
              prettify_separator: " ",
              prettify: null,

              force_edges: false,

              keyboard: true,

              grid: false,
              grid_margin: true,
              grid_num: 4,
              grid_snap: false,

              hide_min_max: false,
              hide_from_to: false,

              prefix: "",
              postfix: "",
              max_postfix: "",
              decorate_both: true,
              values_separator: " — ",

              input_values_separator: ";",

              disable: false,
              block: false,

              extra_classes: "",

              scope: null,
              onStart: null,
              onChange: null,
              onFinish: null,
              onUpdate: null
          };


          // check if base element is input
          if ($inp[0].nodeName !== "INPUT") {
              console && console.warn && console.warn("Base element should be <input>!", $inp[0]);
          }


          // config from data-attributes extends js config
          config_from_data = {
              skin: $inp.data("skin"),
              type: $inp.data("type"),

              min: $inp.data("min"),
              max: $inp.data("max"),
              from: $inp.data("from"),
              to: $inp.data("to"),
              step: $inp.data("step"),

              min_interval: $inp.data("minInterval"),
              max_interval: $inp.data("maxInterval"),
              drag_interval: $inp.data("dragInterval"),

              values: $inp.data("values"),

              from_fixed: $inp.data("fromFixed"),
              from_min: $inp.data("fromMin"),
              from_max: $inp.data("fromMax"),
              from_shadow: $inp.data("fromShadow"),

              to_fixed: $inp.data("toFixed"),
              to_min: $inp.data("toMin"),
              to_max: $inp.data("toMax"),
              to_shadow: $inp.data("toShadow"),

              prettify_enabled: $inp.data("prettifyEnabled"),
              prettify_separator: $inp.data("prettifySeparator"),

              force_edges: $inp.data("forceEdges"),

              keyboard: $inp.data("keyboard"),

              grid: $inp.data("grid"),
              grid_margin: $inp.data("gridMargin"),
              grid_num: $inp.data("gridNum"),
              grid_snap: $inp.data("gridSnap"),

              hide_min_max: $inp.data("hideMinMax"),
              hide_from_to: $inp.data("hideFromTo"),

              prefix: $inp.data("prefix"),
              postfix: $inp.data("postfix"),
              max_postfix: $inp.data("maxPostfix"),
              decorate_both: $inp.data("decorateBoth"),
              values_separator: $inp.data("valuesSeparator"),

              input_values_separator: $inp.data("inputValuesSeparator"),

              disable: $inp.data("disable"),
              block: $inp.data("block"),

              extra_classes: $inp.data("extraClasses"),
          };
          config_from_data.values = config_from_data.values && config_from_data.values.split(",");

          for (prop in config_from_data) {
              if (config_from_data.hasOwnProperty(prop)) {
                  if (config_from_data[prop] === undefined$1 || config_from_data[prop] === "") {
                      delete config_from_data[prop];
                  }
              }
          }


          // input value extends default config
          if (val !== undefined$1 && val !== "") {
              val = val.split(config_from_data.input_values_separator || options.input_values_separator || ";");

              if (val[0] && val[0] == +val[0]) {
                  val[0] = +val[0];
              }
              if (val[1] && val[1] == +val[1]) {
                  val[1] = +val[1];
              }

              if (options && options.values && options.values.length) {
                  config.from = val[0] && options.values.indexOf(val[0]);
                  config.to = val[1] && options.values.indexOf(val[1]);
              } else {
                  config.from = val[0] && +val[0];
                  config.to = val[1] && +val[1];
              }
          }



          // js config extends default config
          $.extend(config, options);


          // data config extends config
          $.extend(config, config_from_data);
          this.options = config;



          // validate config, to be sure that all data types are correct
          this.update_check = {};
          this.validate();



          // default result object, returned to callbacks
          this.result = {
              input: this.$cache.input,
              slider: null,

              min: this.options.min,
              max: this.options.max,

              from: this.options.from,
              from_percent: 0,
              from_value: null,

              to: this.options.to,
              to_percent: 0,
              to_value: null
          };



          this.init();
      };

      IonRangeSlider.prototype = {

          /**
           * Starts or updates the plugin instance
           *
           * @param [is_update] {boolean}
           */
          init: function (is_update) {
              this.no_diapason = false;
              this.coords.p_step = this.convertToPercent(this.options.step, true);

              this.target = "base";

              this.toggleInput();
              this.append();
              this.setMinMax();

              if (is_update) {
                  this.force_redraw = true;
                  this.calc(true);

                  // callbacks called
                  this.callOnUpdate();
              } else {
                  this.force_redraw = true;
                  this.calc(true);

                  // callbacks called
                  this.callOnStart();
              }

              this.updateScene();
          },

          /**
           * Appends slider template to a DOM
           */
          append: function () {
              var container_html = '<span class="irs irs--' + this.options.skin + ' js-irs-' + this.plugin_count + ' ' + this.options.extra_classes + '"></span>';
              this.$cache.input.before(container_html);
              this.$cache.input.prop("readonly", true);
              this.$cache.cont = this.$cache.input.prev();
              this.result.slider = this.$cache.cont;

              this.$cache.cont.html(base_html);
              this.$cache.rs = this.$cache.cont.find(".irs");
              this.$cache.min = this.$cache.cont.find(".irs-min");
              this.$cache.max = this.$cache.cont.find(".irs-max");
              this.$cache.from = this.$cache.cont.find(".irs-from");
              this.$cache.to = this.$cache.cont.find(".irs-to");
              this.$cache.single = this.$cache.cont.find(".irs-single");
              this.$cache.line = this.$cache.cont.find(".irs-line");
              this.$cache.grid = this.$cache.cont.find(".irs-grid");

              if (this.options.type === "single") {
                  this.$cache.cont.append(single_html);
                  this.$cache.bar = this.$cache.cont.find(".irs-bar");
                  this.$cache.edge = this.$cache.cont.find(".irs-bar-edge");
                  this.$cache.s_single = this.$cache.cont.find(".single");
                  this.$cache.from[0].style.visibility = "hidden";
                  this.$cache.to[0].style.visibility = "hidden";
                  this.$cache.shad_single = this.$cache.cont.find(".shadow-single");
              } else {
                  this.$cache.cont.append(double_html);
                  this.$cache.bar = this.$cache.cont.find(".irs-bar");
                  this.$cache.s_from = this.$cache.cont.find(".from");
                  this.$cache.s_to = this.$cache.cont.find(".to");
                  this.$cache.shad_from = this.$cache.cont.find(".shadow-from");
                  this.$cache.shad_to = this.$cache.cont.find(".shadow-to");

                  this.setTopHandler();
              }

              if (this.options.hide_from_to) {
                  this.$cache.from[0].style.display = "none";
                  this.$cache.to[0].style.display = "none";
                  this.$cache.single[0].style.display = "none";
              }

              this.appendGrid();

              if (this.options.disable) {
                  this.appendDisableMask();
                  this.$cache.input[0].disabled = true;
              } else {
                  this.$cache.input[0].disabled = false;
                  this.removeDisableMask();
                  this.bindEvents();
              }

              // block only if not disabled
              if (!this.options.disable) {
                  if (this.options.block) {
                      this.appendDisableMask();
                  } else {
                      this.removeDisableMask();
                  }
              }

              if (this.options.drag_interval) {
                  this.$cache.bar[0].style.cursor = "ew-resize";
              }
          },

          /**
           * Determine which handler has a priority
           * works only for double slider type
           */
          setTopHandler: function () {
              var min = this.options.min,
                  max = this.options.max,
                  from = this.options.from,
                  to = this.options.to;

              if (from > min && to === max) {
                  this.$cache.s_from.addClass("type_last");
              } else if (to < max) {
                  this.$cache.s_to.addClass("type_last");
              }
          },

          /**
           * Determine which handles was clicked last
           * and which handler should have hover effect
           *
           * @param target {String}
           */
          changeLevel: function (target) {
              switch (target) {
                  case "single":
                      this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake);
                      this.$cache.s_single.addClass("state_hover");
                      break;
                  case "from":
                      this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
                      this.$cache.s_from.addClass("state_hover");
                      this.$cache.s_from.addClass("type_last");
                      this.$cache.s_to.removeClass("type_last");
                      break;
                  case "to":
                      this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake);
                      this.$cache.s_to.addClass("state_hover");
                      this.$cache.s_to.addClass("type_last");
                      this.$cache.s_from.removeClass("type_last");
                      break;
                  case "both":
                      this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
                      this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer);
                      this.$cache.s_to.removeClass("type_last");
                      this.$cache.s_from.removeClass("type_last");
                      break;
              }
          },

          /**
           * Then slider is disabled
           * appends extra layer with opacity
           */
          appendDisableMask: function () {
              this.$cache.cont.append(disable_html);
              this.$cache.cont.addClass("irs-disabled");
          },

          /**
           * Then slider is not disabled
           * remove disable mask
           */
          removeDisableMask: function () {
              this.$cache.cont.remove(".irs-disable-mask");
              this.$cache.cont.removeClass("irs-disabled");
          },

          /**
           * Remove slider instance
           * and unbind all events
           */
          remove: function () {
              this.$cache.cont.remove();
              this.$cache.cont = null;

              this.$cache.line.off("keydown.irs_" + this.plugin_count);

              this.$cache.body.off("touchmove.irs_" + this.plugin_count);
              this.$cache.body.off("mousemove.irs_" + this.plugin_count);

              this.$cache.win.off("touchend.irs_" + this.plugin_count);
              this.$cache.win.off("mouseup.irs_" + this.plugin_count);

              if (is_old_ie) {
                  this.$cache.body.off("mouseup.irs_" + this.plugin_count);
                  this.$cache.body.off("mouseleave.irs_" + this.plugin_count);
              }

              this.$cache.grid_labels = [];
              this.coords.big = [];
              this.coords.big_w = [];
              this.coords.big_p = [];
              this.coords.big_x = [];

              cancelAnimationFrame(this.raf_id);
          },

          /**
           * bind all slider events
           */
          bindEvents: function () {
              if (this.no_diapason) {
                  return;
              }

              this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this));
              this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this));

              this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this));
              this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));

              this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
              this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));

              this.$cache.line.on("focus.irs_" + this.plugin_count, this.pointerFocus.bind(this));

              if (this.options.drag_interval && this.options.type === "double") {
                  this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"));
                  this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"));
              } else {
                  this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                  this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
              }

              if (this.options.type === "single") {
                  this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
                  this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
                  this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));

                  this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
                  this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single"));
                  this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                  this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
              } else {
                  this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null));
                  this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null));

                  this.$cache.from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
                  this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
                  this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
                  this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
                  this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                  this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));

                  this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
                  this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from"));
                  this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
                  this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to"));
                  this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                  this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
              }

              if (this.options.keyboard) {
                  this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard"));
              }

              if (is_old_ie) {
                  this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));
                  this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this));
              }
          },

          /**
           * Focus with tabIndex
           *
           * @param e {Object} event object
           */
          pointerFocus: function (e) {
              if (!this.target) {
                  var x;
                  var $handle;

                  if (this.options.type === "single") {
                      $handle = this.$cache.single;
                  } else {
                      $handle = this.$cache.from;
                  }

                  x = $handle.offset().left;
                  x += ($handle.width() / 2) - 1;

                  this.pointerClick("single", {preventDefault: function () {}, pageX: x});
              }
          },

          /**
           * Mousemove or touchmove
           * only for handlers
           *
           * @param e {Object} event object
           */
          pointerMove: function (e) {
              if (!this.dragging) {
                  return;
              }

              var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
              this.coords.x_pointer = x - this.coords.x_gap;

              this.calc();
          },

          /**
           * Mouseup or touchend
           * only for handlers
           *
           * @param e {Object} event object
           */
          pointerUp: function (e) {
              if (this.current_plugin !== this.plugin_count) {
                  return;
              }

              if (this.is_active) {
                  this.is_active = false;
              } else {
                  return;
              }

              this.$cache.cont.find(".state_hover").removeClass("state_hover");

              this.force_redraw = true;

              if (is_old_ie) {
                  $("*").prop("unselectable", false);
              }

              this.updateScene();
              this.restoreOriginalMinInterval();

              // callbacks call
              if ($.contains(this.$cache.cont[0], e.target) || this.dragging) {
                  this.callOnFinish();
              }
              
              this.dragging = false;
          },

          /**
           * Mousedown or touchstart
           * only for handlers
           *
           * @param target {String|null}
           * @param e {Object} event object
           */
          pointerDown: function (target, e) {
              e.preventDefault();
              var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
              if (e.button === 2) {
                  return;
              }

              if (target === "both") {
                  this.setTempMinInterval();
              }

              if (!target) {
                  target = this.target || "from";
              }

              this.current_plugin = this.plugin_count;
              this.target = target;

              this.is_active = true;
              this.dragging = true;

              this.coords.x_gap = this.$cache.rs.offset().left;
              this.coords.x_pointer = x - this.coords.x_gap;

              this.calcPointerPercent();
              this.changeLevel(target);

              if (is_old_ie) {
                  $("*").prop("unselectable", true);
              }

              this.$cache.line.trigger("focus");

              this.updateScene();
          },

          /**
           * Mousedown or touchstart
           * for other slider elements, like diapason line
           *
           * @param target {String}
           * @param e {Object} event object
           */
          pointerClick: function (target, e) {
              e.preventDefault();
              var x = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
              if (e.button === 2) {
                  return;
              }

              this.current_plugin = this.plugin_count;
              this.target = target;

              this.is_click = true;
              this.coords.x_gap = this.$cache.rs.offset().left;
              this.coords.x_pointer = +(x - this.coords.x_gap).toFixed();

              this.force_redraw = true;
              this.calc();

              this.$cache.line.trigger("focus");
          },

          /**
           * Keyborard controls for focused slider
           *
           * @param target {String}
           * @param e {Object} event object
           * @returns {boolean|undefined}
           */
          key: function (target, e) {
              if (this.current_plugin !== this.plugin_count || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
                  return;
              }

              switch (e.which) {
                  case 83: // W
                  case 65: // A
                  case 40: // DOWN
                  case 37: // LEFT
                      e.preventDefault();
                      this.moveByKey(false);
                      break;

                  case 87: // S
                  case 68: // D
                  case 38: // UP
                  case 39: // RIGHT
                      e.preventDefault();
                      this.moveByKey(true);
                      break;
              }

              return true;
          },

          /**
           * Move by key
           *
           * @param right {boolean} direction to move
           */
          moveByKey: function (right) {
              var p = this.coords.p_pointer;
              var p_step = (this.options.max - this.options.min) / 100;
              p_step = this.options.step / p_step;

              if (right) {
                  p += p_step;
              } else {
                  p -= p_step;
              }

              this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * p);
              this.is_key = true;
              this.calc();
          },

          /**
           * Set visibility and content
           * of Min and Max labels
           */
          setMinMax: function () {
              if (!this.options) {
                  return;
              }

              if (this.options.hide_min_max) {
                  this.$cache.min[0].style.display = "none";
                  this.$cache.max[0].style.display = "none";
                  return;
              }

              if (this.options.values.length) {
                  this.$cache.min.html(this.decorate(this.options.p_values[this.options.min]));
                  this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]));
              } else {
                  var min_pretty = this._prettify(this.options.min);
                  var max_pretty = this._prettify(this.options.max);

                  this.result.min_pretty = min_pretty;
                  this.result.max_pretty = max_pretty;

                  this.$cache.min.html(this.decorate(min_pretty, this.options.min));
                  this.$cache.max.html(this.decorate(max_pretty, this.options.max));
              }

              this.labels.w_min = this.$cache.min.outerWidth(false);
              this.labels.w_max = this.$cache.max.outerWidth(false);
          },

          /**
           * Then dragging interval, prevent interval collapsing
           * using min_interval option
           */
          setTempMinInterval: function () {
              var interval = this.result.to - this.result.from;

              if (this.old_min_interval === null) {
                  this.old_min_interval = this.options.min_interval;
              }

              this.options.min_interval = interval;
          },

          /**
           * Restore min_interval option to original
           */
          restoreOriginalMinInterval: function () {
              if (this.old_min_interval !== null) {
                  this.options.min_interval = this.old_min_interval;
                  this.old_min_interval = null;
              }
          },



          // =============================================================================================================
          // Calculations

          /**
           * All calculations and measures start here
           *
           * @param update {boolean=}
           */
          calc: function (update) {
              if (!this.options) {
                  return;
              }

              this.calc_count++;

              if (this.calc_count === 10 || update) {
                  this.calc_count = 0;
                  this.coords.w_rs = this.$cache.rs.outerWidth(false);

                  this.calcHandlePercent();
              }

              if (!this.coords.w_rs) {
                  return;
              }

              this.calcPointerPercent();
              var handle_x = this.getHandleX();


              if (this.target === "both") {
                  this.coords.p_gap = 0;
                  handle_x = this.getHandleX();
              }

              if (this.target === "click") {
                  this.coords.p_gap = this.coords.p_handle / 2;
                  handle_x = this.getHandleX();

                  if (this.options.drag_interval) {
                      this.target = "both_one";
                  } else {
                      this.target = this.chooseHandle(handle_x);
                  }
              }

              switch (this.target) {
                  case "base":
                      var w = (this.options.max - this.options.min) / 100,
                          f = (this.result.from - this.options.min) / w,
                          t = (this.result.to - this.options.min) / w;

                      this.coords.p_single_real = this.toFixed(f);
                      this.coords.p_from_real = this.toFixed(f);
                      this.coords.p_to_real = this.toFixed(t);

                      this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
                      this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                      this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);

                      this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
                      this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                      this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

                      this.target = null;

                      break;

                  case "single":
                      if (this.options.from_fixed) {
                          break;
                      }

                      this.coords.p_single_real = this.convertToRealPercent(handle_x);
                      this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real);
                      this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);

                      this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);

                      break;

                  case "from":
                      if (this.options.from_fixed) {
                          break;
                      }

                      this.coords.p_from_real = this.convertToRealPercent(handle_x);
                      this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
                      if (this.coords.p_from_real > this.coords.p_to_real) {
                          this.coords.p_from_real = this.coords.p_to_real;
                      }
                      this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                      this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                      this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from");

                      this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);

                      break;

                  case "to":
                      if (this.options.to_fixed) {
                          break;
                      }

                      this.coords.p_to_real = this.convertToRealPercent(handle_x);
                      this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
                      if (this.coords.p_to_real < this.coords.p_from_real) {
                          this.coords.p_to_real = this.coords.p_from_real;
                      }
                      this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                      this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                      this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to");

                      this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

                      break;

                  case "both":
                      if (this.options.from_fixed || this.options.to_fixed) {
                          break;
                      }

                      handle_x = this.toFixed(handle_x + (this.coords.p_handle * 0.001));

                      this.coords.p_from_real = this.convertToRealPercent(handle_x) - this.coords.p_gap_left;
                      this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
                      this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                      this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                      this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);

                      this.coords.p_to_real = this.convertToRealPercent(handle_x) + this.coords.p_gap_right;
                      this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
                      this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                      this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                      this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

                      break;

                  case "both_one":
                      if (this.options.from_fixed || this.options.to_fixed) {
                          break;
                      }

                      var real_x = this.convertToRealPercent(handle_x),
                          from = this.result.from_percent,
                          to = this.result.to_percent,
                          full = to - from,
                          half = full / 2,
                          new_from = real_x - half,
                          new_to = real_x + half;

                      if (new_from < 0) {
                          new_from = 0;
                          new_to = new_from + full;
                      }

                      if (new_to > 100) {
                          new_to = 100;
                          new_from = new_to - full;
                      }

                      this.coords.p_from_real = this.calcWithStep(new_from);
                      this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                      this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);

                      this.coords.p_to_real = this.calcWithStep(new_to);
                      this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                      this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);

                      break;
              }

              if (this.options.type === "single") {
                  this.coords.p_bar_x = (this.coords.p_handle / 2);
                  this.coords.p_bar_w = this.coords.p_single_fake;

                  this.result.from_percent = this.coords.p_single_real;
                  this.result.from = this.convertToValue(this.coords.p_single_real);
                  this.result.from_pretty = this._prettify(this.result.from);

                  if (this.options.values.length) {
                      this.result.from_value = this.options.values[this.result.from];
                  }
              } else {
                  this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + (this.coords.p_handle / 2));
                  this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake);

                  this.result.from_percent = this.coords.p_from_real;
                  this.result.from = this.convertToValue(this.coords.p_from_real);
                  this.result.from_pretty = this._prettify(this.result.from);
                  this.result.to_percent = this.coords.p_to_real;
                  this.result.to = this.convertToValue(this.coords.p_to_real);
                  this.result.to_pretty = this._prettify(this.result.to);

                  if (this.options.values.length) {
                      this.result.from_value = this.options.values[this.result.from];
                      this.result.to_value = this.options.values[this.result.to];
                  }
              }

              this.calcMinMax();
              this.calcLabels();
          },


          /**
           * calculates pointer X in percent
           */
          calcPointerPercent: function () {
              if (!this.coords.w_rs) {
                  this.coords.p_pointer = 0;
                  return;
              }

              if (this.coords.x_pointer < 0 || isNaN(this.coords.x_pointer)  ) {
                  this.coords.x_pointer = 0;
              } else if (this.coords.x_pointer > this.coords.w_rs) {
                  this.coords.x_pointer = this.coords.w_rs;
              }

              this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100);
          },

          convertToRealPercent: function (fake) {
              var full = 100 - this.coords.p_handle;
              return fake / full * 100;
          },

          convertToFakePercent: function (real) {
              var full = 100 - this.coords.p_handle;
              return real / 100 * full;
          },

          getHandleX: function () {
              var max = 100 - this.coords.p_handle,
                  x = this.toFixed(this.coords.p_pointer - this.coords.p_gap);

              if (x < 0) {
                  x = 0;
              } else if (x > max) {
                  x = max;
              }

              return x;
          },

          calcHandlePercent: function () {
              if (this.options.type === "single") {
                  this.coords.w_handle = this.$cache.s_single.outerWidth(false);
              } else {
                  this.coords.w_handle = this.$cache.s_from.outerWidth(false);
              }

              this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100);
          },

          /**
           * Find closest handle to pointer click
           *
           * @param real_x {Number}
           * @returns {String}
           */
          chooseHandle: function (real_x) {
              if (this.options.type === "single") {
                  return "single";
              } else {
                  var m_point = this.coords.p_from_real + ((this.coords.p_to_real - this.coords.p_from_real) / 2);
                  if (real_x >= m_point) {
                      return this.options.to_fixed ? "from" : "to";
                  } else {
                      return this.options.from_fixed ? "to" : "from";
                  }
              }
          },

          /**
           * Measure Min and Max labels width in percent
           */
          calcMinMax: function () {
              if (!this.coords.w_rs) {
                  return;
              }

              this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100;
              this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100;
          },

          /**
           * Measure labels width and X in percent
           */
          calcLabels: function () {
              if (!this.coords.w_rs || this.options.hide_from_to) {
                  return;
              }

              if (this.options.type === "single") {

                  this.labels.w_single = this.$cache.single.outerWidth(false);
                  this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100;
                  this.labels.p_single_left = this.coords.p_single_fake + (this.coords.p_handle / 2) - (this.labels.p_single_fake / 2);
                  this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake);

              } else {

                  this.labels.w_from = this.$cache.from.outerWidth(false);
                  this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100;
                  this.labels.p_from_left = this.coords.p_from_fake + (this.coords.p_handle / 2) - (this.labels.p_from_fake / 2);
                  this.labels.p_from_left = this.toFixed(this.labels.p_from_left);
                  this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake);

                  this.labels.w_to = this.$cache.to.outerWidth(false);
                  this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100;
                  this.labels.p_to_left = this.coords.p_to_fake + (this.coords.p_handle / 2) - (this.labels.p_to_fake / 2);
                  this.labels.p_to_left = this.toFixed(this.labels.p_to_left);
                  this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake);

                  this.labels.w_single = this.$cache.single.outerWidth(false);
                  this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100;
                  this.labels.p_single_left = ((this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2) - (this.labels.p_single_fake / 2);
                  this.labels.p_single_left = this.toFixed(this.labels.p_single_left);
                  this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake);

              }
          },



          // =============================================================================================================
          // Drawings

          /**
           * Main function called in request animation frame
           * to update everything
           */
          updateScene: function () {
              if (this.raf_id) {
                  cancelAnimationFrame(this.raf_id);
                  this.raf_id = null;
              }

              clearTimeout(this.update_tm);
              this.update_tm = null;

              if (!this.options) {
                  return;
              }

              this.drawHandles();

              if (this.is_active) {
                  this.raf_id = requestAnimationFrame(this.updateScene.bind(this));
              } else {
                  this.update_tm = setTimeout(this.updateScene.bind(this), 300);
              }
          },

          /**
           * Draw handles
           */
          drawHandles: function () {
              this.coords.w_rs = this.$cache.rs.outerWidth(false);

              if (!this.coords.w_rs) {
                  return;
              }

              if (this.coords.w_rs !== this.coords.w_rs_old) {
                  this.target = "base";
                  this.is_resize = true;
              }

              if (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw) {
                  this.setMinMax();
                  this.calc(true);
                  this.drawLabels();
                  if (this.options.grid) {
                      this.calcGridMargin();
                      this.calcGridLabels();
                  }
                  this.force_redraw = true;
                  this.coords.w_rs_old = this.coords.w_rs;
                  this.drawShadow();
              }

              if (!this.coords.w_rs) {
                  return;
              }

              if (!this.dragging && !this.force_redraw && !this.is_key) {
                  return;
              }

              if (this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) {

                  this.drawLabels();

                  this.$cache.bar[0].style.left = this.coords.p_bar_x + "%";
                  this.$cache.bar[0].style.width = this.coords.p_bar_w + "%";

                  if (this.options.type === "single") {
                      this.$cache.bar[0].style.left = 0;
                      this.$cache.bar[0].style.width = this.coords.p_bar_w + this.coords.p_bar_x + "%";

                      this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%";

                      this.$cache.single[0].style.left = this.labels.p_single_left + "%";
                  } else {
                      this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%";
                      this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%";

                      if (this.old_from !== this.result.from || this.force_redraw) {
                          this.$cache.from[0].style.left = this.labels.p_from_left + "%";
                      }
                      if (this.old_to !== this.result.to || this.force_redraw) {
                          this.$cache.to[0].style.left = this.labels.p_to_left + "%";
                      }

                      this.$cache.single[0].style.left = this.labels.p_single_left + "%";
                  }

                  this.writeToInput();

                  if ((this.old_from !== this.result.from || this.old_to !== this.result.to) && !this.is_start) {
                      this.$cache.input.trigger("change");
                      this.$cache.input.trigger("input");
                  }

                  this.old_from = this.result.from;
                  this.old_to = this.result.to;

                  // callbacks call
                  if (!this.is_resize && !this.is_update && !this.is_start && !this.is_finish) {
                      this.callOnChange();
                  }
                  if (this.is_key || this.is_click) {
                      this.is_key = false;
                      this.is_click = false;
                      this.callOnFinish();
                  }

                  this.is_update = false;
                  this.is_resize = false;
                  this.is_finish = false;
              }

              this.is_start = false;
              this.is_key = false;
              this.is_click = false;
              this.force_redraw = false;
          },

          /**
           * Draw labels
           * measure labels collisions
           * collapse close labels
           */
          drawLabels: function () {
              if (!this.options) {
                  return;
              }

              var values_num = this.options.values.length;
              var p_values = this.options.p_values;
              var text_single;
              var text_from;
              var text_to;
              var from_pretty;
              var to_pretty;

              if (this.options.hide_from_to) {
                  return;
              }

              if (this.options.type === "single") {

                  if (values_num) {
                      text_single = this.decorate(p_values[this.result.from]);
                      this.$cache.single.html(text_single);
                  } else {
                      from_pretty = this._prettify(this.result.from);

                      text_single = this.decorate(from_pretty, this.result.from);
                      this.$cache.single.html(text_single);
                  }

                  this.calcLabels();

                  if (this.labels.p_single_left < this.labels.p_min + 1) {
                      this.$cache.min[0].style.visibility = "hidden";
                  } else {
                      this.$cache.min[0].style.visibility = "visible";
                  }

                  if (this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1) {
                      this.$cache.max[0].style.visibility = "hidden";
                  } else {
                      this.$cache.max[0].style.visibility = "visible";
                  }

              } else {

                  if (values_num) {

                      if (this.options.decorate_both) {
                          text_single = this.decorate(p_values[this.result.from]);
                          text_single += this.options.values_separator;
                          text_single += this.decorate(p_values[this.result.to]);
                      } else {
                          text_single = this.decorate(p_values[this.result.from] + this.options.values_separator + p_values[this.result.to]);
                      }
                      text_from = this.decorate(p_values[this.result.from]);
                      text_to = this.decorate(p_values[this.result.to]);

                      this.$cache.single.html(text_single);
                      this.$cache.from.html(text_from);
                      this.$cache.to.html(text_to);

                  } else {
                      from_pretty = this._prettify(this.result.from);
                      to_pretty = this._prettify(this.result.to);

                      if (this.options.decorate_both) {
                          text_single = this.decorate(from_pretty, this.result.from);
                          text_single += this.options.values_separator;
                          text_single += this.decorate(to_pretty, this.result.to);
                      } else {
                          text_single = this.decorate(from_pretty + this.options.values_separator + to_pretty, this.result.to);
                      }
                      text_from = this.decorate(from_pretty, this.result.from);
                      text_to = this.decorate(to_pretty, this.result.to);

                      this.$cache.single.html(text_single);
                      this.$cache.from.html(text_from);
                      this.$cache.to.html(text_to);

                  }

                  this.calcLabels();

                  var min = Math.min(this.labels.p_single_left, this.labels.p_from_left),
                      single_left = this.labels.p_single_left + this.labels.p_single_fake,
                      to_left = this.labels.p_to_left + this.labels.p_to_fake,
                      max = Math.max(single_left, to_left);

                  if (this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left) {
                      this.$cache.from[0].style.visibility = "hidden";
                      this.$cache.to[0].style.visibility = "hidden";
                      this.$cache.single[0].style.visibility = "visible";

                      if (this.result.from === this.result.to) {
                          if (this.target === "from") {
                              this.$cache.from[0].style.visibility = "visible";
                          } else if (this.target === "to") {
                              this.$cache.to[0].style.visibility = "visible";
                          } else if (!this.target) {
                              this.$cache.from[0].style.visibility = "visible";
                          }
                          this.$cache.single[0].style.visibility = "hidden";
                          max = to_left;
                      } else {
                          this.$cache.from[0].style.visibility = "hidden";
                          this.$cache.to[0].style.visibility = "hidden";
                          this.$cache.single[0].style.visibility = "visible";
                          max = Math.max(single_left, to_left);
                      }
                  } else {
                      this.$cache.from[0].style.visibility = "visible";
                      this.$cache.to[0].style.visibility = "visible";
                      this.$cache.single[0].style.visibility = "hidden";
                  }

                  if (min < this.labels.p_min + 1) {
                      this.$cache.min[0].style.visibility = "hidden";
                  } else {
                      this.$cache.min[0].style.visibility = "visible";
                  }

                  if (max > 100 - this.labels.p_max - 1) {
                      this.$cache.max[0].style.visibility = "hidden";
                  } else {
                      this.$cache.max[0].style.visibility = "visible";
                  }

              }
          },

          /**
           * Draw shadow intervals
           */
          drawShadow: function () {
              var o = this.options,
                  c = this.$cache,

                  is_from_min = typeof o.from_min === "number" && !isNaN(o.from_min),
                  is_from_max = typeof o.from_max === "number" && !isNaN(o.from_max),
                  is_to_min = typeof o.to_min === "number" && !isNaN(o.to_min),
                  is_to_max = typeof o.to_max === "number" && !isNaN(o.to_max),

                  from_min,
                  from_max,
                  to_min,
                  to_max;

              if (o.type === "single") {
                  if (o.from_shadow && (is_from_min || is_from_max)) {
                      from_min = this.convertToPercent(is_from_min ? o.from_min : o.min);
                      from_max = this.convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
                      from_min = this.toFixed(from_min - (this.coords.p_handle / 100 * from_min));
                      from_max = this.toFixed(from_max - (this.coords.p_handle / 100 * from_max));
                      from_min = from_min + (this.coords.p_handle / 2);

                      c.shad_single[0].style.display = "block";
                      c.shad_single[0].style.left = from_min + "%";
                      c.shad_single[0].style.width = from_max + "%";
                  } else {
                      c.shad_single[0].style.display = "none";
                  }
              } else {
                  if (o.from_shadow && (is_from_min || is_from_max)) {
                      from_min = this.convertToPercent(is_from_min ? o.from_min : o.min);
                      from_max = this.convertToPercent(is_from_max ? o.from_max : o.max) - from_min;
                      from_min = this.toFixed(from_min - (this.coords.p_handle / 100 * from_min));
                      from_max = this.toFixed(from_max - (this.coords.p_handle / 100 * from_max));
                      from_min = from_min + (this.coords.p_handle / 2);

                      c.shad_from[0].style.display = "block";
                      c.shad_from[0].style.left = from_min + "%";
                      c.shad_from[0].style.width = from_max + "%";
                  } else {
                      c.shad_from[0].style.display = "none";
                  }

                  if (o.to_shadow && (is_to_min || is_to_max)) {
                      to_min = this.convertToPercent(is_to_min ? o.to_min : o.min);
                      to_max = this.convertToPercent(is_to_max ? o.to_max : o.max) - to_min;
                      to_min = this.toFixed(to_min - (this.coords.p_handle / 100 * to_min));
                      to_max = this.toFixed(to_max - (this.coords.p_handle / 100 * to_max));
                      to_min = to_min + (this.coords.p_handle / 2);

                      c.shad_to[0].style.display = "block";
                      c.shad_to[0].style.left = to_min + "%";
                      c.shad_to[0].style.width = to_max + "%";
                  } else {
                      c.shad_to[0].style.display = "none";
                  }
              }
          },



          /**
           * Write values to input element
           */
          writeToInput: function () {
              if (this.options.type === "single") {
                  if (this.options.values.length) {
                      this.$cache.input.prop("value", this.result.from_value);
                  } else {
                      this.$cache.input.prop("value", this.result.from);
                  }
                  this.$cache.input.data("from", this.result.from);
              } else {
                  if (this.options.values.length) {
                      this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value);
                  } else {
                      this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to);
                  }
                  this.$cache.input.data("from", this.result.from);
                  this.$cache.input.data("to", this.result.to);
              }
          },



          // =============================================================================================================
          // Callbacks

          callOnStart: function () {
              this.writeToInput();

              if (this.options.onStart && typeof this.options.onStart === "function") {
                  if (this.options.scope) {
                      this.options.onStart.call(this.options.scope, this.result);
                  } else {
                      this.options.onStart(this.result);
                  }
              }
          },
          callOnChange: function () {
              this.writeToInput();

              if (this.options.onChange && typeof this.options.onChange === "function") {
                  if (this.options.scope) {
                      this.options.onChange.call(this.options.scope, this.result);
                  } else {
                      this.options.onChange(this.result);
                  }
              }
          },
          callOnFinish: function () {
              this.writeToInput();

              if (this.options.onFinish && typeof this.options.onFinish === "function") {
                  if (this.options.scope) {
                      this.options.onFinish.call(this.options.scope, this.result);
                  } else {
                      this.options.onFinish(this.result);
                  }
              }
          },
          callOnUpdate: function () {
              this.writeToInput();

              if (this.options.onUpdate && typeof this.options.onUpdate === "function") {
                  if (this.options.scope) {
                      this.options.onUpdate.call(this.options.scope, this.result);
                  } else {
                      this.options.onUpdate(this.result);
                  }
              }
          },




          // =============================================================================================================
          // Service methods

          toggleInput: function () {
              this.$cache.input.toggleClass("irs-hidden-input");

              if (this.has_tab_index) {
                  this.$cache.input.prop("tabindex", -1);
              } else {
                  this.$cache.input.removeProp("tabindex");
              }

              this.has_tab_index = !this.has_tab_index;
          },

          /**
           * Convert real value to percent
           *
           * @param value {Number} X in real
           * @param no_min {boolean=} don't use min value
           * @returns {Number} X in percent
           */
          convertToPercent: function (value, no_min) {
              var diapason = this.options.max - this.options.min,
                  one_percent = diapason / 100,
                  val, percent;

              if (!diapason) {
                  this.no_diapason = true;
                  return 0;
              }

              if (no_min) {
                  val = value;
              } else {
                  val = value - this.options.min;
              }

              percent = val / one_percent;

              return this.toFixed(percent);
          },

          /**
           * Convert percent to real values
           *
           * @param percent {Number} X in percent
           * @returns {Number} X in real
           */
          convertToValue: function (percent) {
              var min = this.options.min,
                  max = this.options.max,
                  min_decimals = min.toString().split(".")[1],
                  max_decimals = max.toString().split(".")[1],
                  min_length, max_length,
                  avg_decimals = 0,
                  abs = 0;

              if (percent === 0) {
                  return this.options.min;
              }
              if (percent === 100) {
                  return this.options.max;
              }


              if (min_decimals) {
                  min_length = min_decimals.length;
                  avg_decimals = min_length;
              }
              if (max_decimals) {
                  max_length = max_decimals.length;
                  avg_decimals = max_length;
              }
              if (min_length && max_length) {
                  avg_decimals = (min_length >= max_length) ? min_length : max_length;
              }

              if (min < 0) {
                  abs = Math.abs(min);
                  min = +(min + abs).toFixed(avg_decimals);
                  max = +(max + abs).toFixed(avg_decimals);
              }

              var number = ((max - min) / 100 * percent) + min,
                  string = this.options.step.toString().split(".")[1],
                  result;

              if (string) {
                  number = +number.toFixed(string.length);
              } else {
                  number = number / this.options.step;
                  number = number * this.options.step;

                  number = +number.toFixed(0);
              }

              if (abs) {
                  number -= abs;
              }

              if (string) {
                  result = +number.toFixed(string.length);
              } else {
                  result = this.toFixed(number);
              }

              if (result < this.options.min) {
                  result = this.options.min;
              } else if (result > this.options.max) {
                  result = this.options.max;
              }

              return result;
          },

          /**
           * Round percent value with step
           *
           * @param percent {Number}
           * @returns percent {Number} rounded
           */
          calcWithStep: function (percent) {
              var rounded = Math.round(percent / this.coords.p_step) * this.coords.p_step;

              if (rounded > 100) {
                  rounded = 100;
              }
              if (percent === 100) {
                  rounded = 100;
              }

              return this.toFixed(rounded);
          },

          checkMinInterval: function (p_current, p_next, type) {
              var o = this.options,
                  current,
                  next;

              if (!o.min_interval) {
                  return p_current;
              }

              current = this.convertToValue(p_current);
              next = this.convertToValue(p_next);

              if (type === "from") {

                  if (next - current < o.min_interval) {
                      current = next - o.min_interval;
                  }

              } else {

                  if (current - next < o.min_interval) {
                      current = next + o.min_interval;
                  }

              }

              return this.convertToPercent(current);
          },

          checkMaxInterval: function (p_current, p_next, type) {
              var o = this.options,
                  current,
                  next;

              if (!o.max_interval) {
                  return p_current;
              }

              current = this.convertToValue(p_current);
              next = this.convertToValue(p_next);

              if (type === "from") {

                  if (next - current > o.max_interval) {
                      current = next - o.max_interval;
                  }

              } else {

                  if (current - next > o.max_interval) {
                      current = next + o.max_interval;
                  }

              }

              return this.convertToPercent(current);
          },

          checkDiapason: function (p_num, min, max) {
              var num = this.convertToValue(p_num),
                  o = this.options;

              if (typeof min !== "number") {
                  min = o.min;
              }

              if (typeof max !== "number") {
                  max = o.max;
              }

              if (num < min) {
                  num = min;
              }

              if (num > max) {
                  num = max;
              }

              return this.convertToPercent(num);
          },

          toFixed: function (num) {
              num = num.toFixed(20);
              return +num;
          },

          _prettify: function (num) {
              if (!this.options.prettify_enabled) {
                  return num;
              }

              if (this.options.prettify && typeof this.options.prettify === "function") {
                  return this.options.prettify(num);
              } else {
                  return this.prettify(num);
              }
          },

          prettify: function (num) {
              var n = num.toString();
              return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator);
          },

          checkEdges: function (left, width) {
              if (!this.options.force_edges) {
                  return this.toFixed(left);
              }

              if (left < 0) {
                  left = 0;
              } else if (left > 100 - width) {
                  left = 100 - width;
              }

              return this.toFixed(left);
          },

          validate: function () {
              var o = this.options,
                  r = this.result,
                  v = o.values,
                  vl = v.length,
                  value,
                  i;

              if (typeof o.min === "string") o.min = +o.min;
              if (typeof o.max === "string") o.max = +o.max;
              if (typeof o.from === "string") o.from = +o.from;
              if (typeof o.to === "string") o.to = +o.to;
              if (typeof o.step === "string") o.step = +o.step;

              if (typeof o.from_min === "string") o.from_min = +o.from_min;
              if (typeof o.from_max === "string") o.from_max = +o.from_max;
              if (typeof o.to_min === "string") o.to_min = +o.to_min;
              if (typeof o.to_max === "string") o.to_max = +o.to_max;

              if (typeof o.grid_num === "string") o.grid_num = +o.grid_num;

              if (o.max < o.min) {
                  o.max = o.min;
              }

              if (vl) {
                  o.p_values = [];
                  o.min = 0;
                  o.max = vl - 1;
                  o.step = 1;
                  o.grid_num = o.max;
                  o.grid_snap = true;

                  for (i = 0; i < vl; i++) {
                      value = +v[i];

                      if (!isNaN(value)) {
                          v[i] = value;
                          value = this._prettify(value);
                      } else {
                          value = v[i];
                      }

                      o.p_values.push(value);
                  }
              }

              if (typeof o.from !== "number" || isNaN(o.from)) {
                  o.from = o.min;
              }

              if (typeof o.to !== "number" || isNaN(o.to)) {
                  o.to = o.max;
              }

              if (o.type === "single") {

                  if (o.from < o.min) o.from = o.min;
                  if (o.from > o.max) o.from = o.max;

              } else {

                  if (o.from < o.min) o.from = o.min;
                  if (o.from > o.max) o.from = o.max;

                  if (o.to < o.min) o.to = o.min;
                  if (o.to > o.max) o.to = o.max;

                  if (this.update_check.from) {

                      if (this.update_check.from !== o.from) {
                          if (o.from > o.to) o.from = o.to;
                      }
                      if (this.update_check.to !== o.to) {
                          if (o.to < o.from) o.to = o.from;
                      }

                  }

                  if (o.from > o.to) o.from = o.to;
                  if (o.to < o.from) o.to = o.from;

              }

              if (typeof o.step !== "number" || isNaN(o.step) || !o.step || o.step < 0) {
                  o.step = 1;
              }

              if (typeof o.from_min === "number" && o.from < o.from_min) {
                  o.from = o.from_min;
              }

              if (typeof o.from_max === "number" && o.from > o.from_max) {
                  o.from = o.from_max;
              }

              if (typeof o.to_min === "number" && o.to < o.to_min) {
                  o.to = o.to_min;
              }

              if (typeof o.to_max === "number" && o.from > o.to_max) {
                  o.to = o.to_max;
              }

              if (r) {
                  if (r.min !== o.min) {
                      r.min = o.min;
                  }

                  if (r.max !== o.max) {
                      r.max = o.max;
                  }

                  if (r.from < r.min || r.from > r.max) {
                      r.from = o.from;
                  }

                  if (r.to < r.min || r.to > r.max) {
                      r.to = o.to;
                  }
              }

              if (typeof o.min_interval !== "number" || isNaN(o.min_interval) || !o.min_interval || o.min_interval < 0) {
                  o.min_interval = 0;
              }

              if (typeof o.max_interval !== "number" || isNaN(o.max_interval) || !o.max_interval || o.max_interval < 0) {
                  o.max_interval = 0;
              }

              if (o.min_interval && o.min_interval > o.max - o.min) {
                  o.min_interval = o.max - o.min;
              }

              if (o.max_interval && o.max_interval > o.max - o.min) {
                  o.max_interval = o.max - o.min;
              }
          },

          decorate: function (num, original) {
              var decorated = "",
                  o = this.options;

              if (o.prefix) {
                  decorated += o.prefix;
              }

              decorated += num;

              if (o.max_postfix) {
                  if (o.values.length && num === o.p_values[o.max]) {
                      decorated += o.max_postfix;
                      if (o.postfix) {
                          decorated += " ";
                      }
                  } else if (original === o.max) {
                      decorated += o.max_postfix;
                      if (o.postfix) {
                          decorated += " ";
                      }
                  }
              }

              if (o.postfix) {
                  decorated += o.postfix;
              }

              return decorated;
          },

          updateFrom: function () {
              this.result.from = this.options.from;
              this.result.from_percent = this.convertToPercent(this.result.from);
              this.result.from_pretty = this._prettify(this.result.from);
              if (this.options.values) {
                  this.result.from_value = this.options.values[this.result.from];
              }
          },

          updateTo: function () {
              this.result.to = this.options.to;
              this.result.to_percent = this.convertToPercent(this.result.to);
              this.result.to_pretty = this._prettify(this.result.to);
              if (this.options.values) {
                  this.result.to_value = this.options.values[this.result.to];
              }
          },

          updateResult: function () {
              this.result.min = this.options.min;
              this.result.max = this.options.max;
              this.updateFrom();
              this.updateTo();
          },


          // =============================================================================================================
          // Grid

          appendGrid: function () {
              if (!this.options.grid) {
                  return;
              }

              var o = this.options,
                  i, z,

                  total = o.max - o.min,
                  big_num = o.grid_num,
                  big_p = 0,
                  big_w = 0,

                  small_max = 4,
                  local_small_max,
                  small_p,
                  small_w = 0,

                  result,
                  html = '';



              this.calcGridMargin();

              if (o.grid_snap) {
                  big_num = total / o.step;
              }

              if (big_num > 50) big_num = 50;
              big_p = this.toFixed(100 / big_num);

              if (big_num > 4) {
                  small_max = 3;
              }
              if (big_num > 7) {
                  small_max = 2;
              }
              if (big_num > 14) {
                  small_max = 1;
              }
              if (big_num > 28) {
                  small_max = 0;
              }

              for (i = 0; i < big_num + 1; i++) {
                  local_small_max = small_max;

                  big_w = this.toFixed(big_p * i);

                  if (big_w > 100) {
                      big_w = 100;
                  }
                  this.coords.big[i] = big_w;

                  small_p = (big_w - (big_p * (i - 1))) / (local_small_max + 1);

                  for (z = 1; z <= local_small_max; z++) {
                      if (big_w === 0) {
                          break;
                      }

                      small_w = this.toFixed(big_w - (small_p * z));

                      html += '<span class="irs-grid-pol small" style="left: ' + small_w + '%"></span>';
                  }

                  html += '<span class="irs-grid-pol" style="left: ' + big_w + '%"></span>';

                  result = this.convertToValue(big_w);
                  if (o.values.length) {
                      result = o.p_values[result];
                  } else {
                      result = this._prettify(result);
                  }

                  html += '<span class="irs-grid-text js-grid-text-' + i + '" style="left: ' + big_w + '%">' + result + '</span>';
              }
              this.coords.big_num = Math.ceil(big_num + 1);



              this.$cache.cont.addClass("irs-with-grid");
              this.$cache.grid.html(html);
              this.cacheGridLabels();
          },

          cacheGridLabels: function () {
              var $label, i,
                  num = this.coords.big_num;

              for (i = 0; i < num; i++) {
                  $label = this.$cache.grid.find(".js-grid-text-" + i);
                  this.$cache.grid_labels.push($label);
              }

              this.calcGridLabels();
          },

          calcGridLabels: function () {
              var i, label, start = [], finish = [],
                  num = this.coords.big_num;

              for (i = 0; i < num; i++) {
                  this.coords.big_w[i] = this.$cache.grid_labels[i].outerWidth(false);
                  this.coords.big_p[i] = this.toFixed(this.coords.big_w[i] / this.coords.w_rs * 100);
                  this.coords.big_x[i] = this.toFixed(this.coords.big_p[i] / 2);

                  start[i] = this.toFixed(this.coords.big[i] - this.coords.big_x[i]);
                  finish[i] = this.toFixed(start[i] + this.coords.big_p[i]);
              }

              if (this.options.force_edges) {
                  if (start[0] < -this.coords.grid_gap) {
                      start[0] = -this.coords.grid_gap;
                      finish[0] = this.toFixed(start[0] + this.coords.big_p[0]);

                      this.coords.big_x[0] = this.coords.grid_gap;
                  }

                  if (finish[num - 1] > 100 + this.coords.grid_gap) {
                      finish[num - 1] = 100 + this.coords.grid_gap;
                      start[num - 1] = this.toFixed(finish[num - 1] - this.coords.big_p[num - 1]);

                      this.coords.big_x[num - 1] = this.toFixed(this.coords.big_p[num - 1] - this.coords.grid_gap);
                  }
              }

              this.calcGridCollision(2, start, finish);
              this.calcGridCollision(4, start, finish);

              for (i = 0; i < num; i++) {
                  label = this.$cache.grid_labels[i][0];

                  if (this.coords.big_x[i] !== Number.POSITIVE_INFINITY) {
                      label.style.marginLeft = -this.coords.big_x[i] + "%";
                  }
              }
          },

          // Collisions Calc Beta
          // TODO: Refactor then have plenty of time
          calcGridCollision: function (step, start, finish) {
              var i, next_i, label,
                  num = this.coords.big_num;

              for (i = 0; i < num; i += step) {
                  next_i = i + (step / 2);
                  if (next_i >= num) {
                      break;
                  }

                  label = this.$cache.grid_labels[next_i][0];

                  if (finish[i] <= start[next_i]) {
                      label.style.visibility = "visible";
                  } else {
                      label.style.visibility = "hidden";
                  }
              }
          },

          calcGridMargin: function () {
              if (!this.options.grid_margin) {
                  return;
              }

              this.coords.w_rs = this.$cache.rs.outerWidth(false);
              if (!this.coords.w_rs) {
                  return;
              }

              if (this.options.type === "single") {
                  this.coords.w_handle = this.$cache.s_single.outerWidth(false);
              } else {
                  this.coords.w_handle = this.$cache.s_from.outerWidth(false);
              }
              this.coords.p_handle = this.toFixed(this.coords.w_handle  / this.coords.w_rs * 100);
              this.coords.grid_gap = this.toFixed((this.coords.p_handle / 2) - 0.1);

              this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%";
              this.$cache.grid[0].style.left = this.coords.grid_gap + "%";
          },



          // =============================================================================================================
          // Public methods

          update: function (options) {
              if (!this.input) {
                  return;
              }

              this.is_update = true;

              this.options.from = this.result.from;
              this.options.to = this.result.to;
              this.update_check.from = this.result.from;
              this.update_check.to = this.result.to;

              this.options = $.extend(this.options, options);
              this.validate();
              this.updateResult(options);

              this.toggleInput();
              this.remove();
              this.init(true);
          },

          reset: function () {
              if (!this.input) {
                  return;
              }

              this.updateResult();
              this.update();
          },

          destroy: function () {
              if (!this.input) {
                  return;
              }

              this.toggleInput();
              this.$cache.input.prop("readonly", false);
              $.data(this.input, "ionRangeSlider", null);

              this.remove();
              this.input = null;
              this.options = null;
          }
      };

      $.fn.ionRangeSlider = function (options) {
          return this.each(function() {
              if (!$.data(this, "ionRangeSlider")) {
                  $.data(this, "ionRangeSlider", new IonRangeSlider(this, options, plugin_count++));
              }
          });
      };



      // =================================================================================================================
      // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
      // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

      // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

      // MIT license

      (function() {
          var lastTime = 0;
          var vendors = ['ms', 'moz', 'webkit', 'o'];
          for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
              window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
              window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                  || window[vendors[x]+'CancelRequestAnimationFrame'];
          }

          if (!window.requestAnimationFrame)
              window.requestAnimationFrame = function(callback, element) {
                  var currTime = new Date().getTime();
                  var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                  var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                      timeToCall);
                  lastTime = currTime + timeToCall;
                  return id;
              };

          if (!window.cancelAnimationFrame)
              window.cancelAnimationFrame = function(id) {
                  clearTimeout(id);
              };
      }());

  }));
  });

  var mrIonRangeSlider = function ($) {
    /**
     * Check for Ion rangeSlider dependency
     * https://github.com/IonDen/ion.rangeSlider
     */
    if (typeof $.fn.ionRangeSlider !== 'function') {
      throw new Error('mrIonRangeSlider requires ion.rangeSlider.js (https://github.com/IonDen/ion.rangeSlider)');
    } // Check mrUtil is present and correct version


    if (!(mrUtil && mrUtil.version >= '1.2.0')) {
      throw new Error('mrUtil >= version 1.2.0 is required.');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrIonRangeSlider';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.ionRangeSlider';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ION_RANGE_SLIDER_KEY = 'ionRangeSlider';
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CHANGE: 'input'
    };
    var Selector = {
      DATA_ATTR: 'ion-rangeslider',
      DATA_ION_RANGESLIDER: '[data-ion-rangeslider]',
      INPUT: 'INPUT',
      TEXT: 'text'
    };
    var Options = {
      SKIN_DEFAULT: 'theme'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var IonRangeSlider =
    /*#__PURE__*/
    function () {
      function IonRangeSlider(element) {
        var $element = $(element);
        this.options = $element.data();
        this.element = element;
        this.fromElement = null;
        this.toElement = null;
        this.unitElement = null;
        this.initRangeSlider();
      } // getters


      var _proto = IonRangeSlider.prototype;

      _proto.initRangeSlider = function initRangeSlider() {
        var options = this.options;

        if (options.fromSelector) {
          this.fromElement = document.querySelectorAll(options.fromSelector);
          this.setFromUpdateEvent(this.fromElement);
        }

        if (options.toSelector) {
          this.toElement = document.querySelectorAll(options.toSelector);
          this.setToUpdateEvent(this.toElement);
        }

        if (options.unitSelector && options.unitSingle && options.unitPlural) {
          this.unitElement = document.querySelectorAll(options.unitSelector);
        }

        $(this.element).ionRangeSlider({
          skin: Options.SKIN_DEFAULT,
          onStart: mrUtil.getFuncFromString(options.onStart),
          onFinish: mrUtil.getFuncFromString(options.onFinish),
          onChange: this.handleChange,
          scope: this,
          onUpdate: mrUtil.getFuncFromString(options.onUpdate)
        });
        this.rangeSlider = $(this.element).data(ION_RANGE_SLIDER_KEY);
      } // HandleChange then also calls the user's callback
      ;

      _proto.handleChange = function handleChange(data) {
        if (this.fromElement && this.fromElement.length > 0) {
          mrIonRangeSlider.updateValue(this.fromElement, data.from_value || data.from);
        }

        if (this.toElement && this.toElement.length > 0) {
          mrIonRangeSlider.updateValue(this.toElement, data.to_value || data.to);
        }

        if (this.unitElement && this.unitElement.length > 0) {
          var value = parseInt(data.from_value, 10) || data.value;
          mrIonRangeSlider.updateValue(this.unitElement, value > 1 ? this.options.unitPlural : this.options.unitSingle);
        }

        var userChangeFunction = mrUtil.getFuncFromString(this.options.onChange);

        if (userChangeFunction) {
          userChangeFunction(data);
        }
      } // Takes a collection of "To" elements and attaches
      // a change event handler to update the rangeslider when user inputs a value
      ;

      _proto.setToUpdateEvent = function setToUpdateEvent(collection) {
        var _this = this;

        mrUtil.forEach(collection, function (index, element) {
          if (element.tagName.toUpperCase() === Selector.INPUT && element.type === Selector.TEXT) {
            element.addEventListener(Event.CHANGE, function () {
              _this.rangeSlider.update({
                to: element.value
              });
            });
          }
        });
      } // Takes a collection of "From" elements and attaches
      // a change event handler to update the rangeslider when user inputs a value
      ;

      _proto.setFromUpdateEvent = function setFromUpdateEvent(collection) {
        var _this2 = this;

        mrUtil.forEach(collection, function (index, element) {
          if (element.tagName.toUpperCase() === Selector.INPUT && element.type === Selector.TEXT) {
            element.addEventListener(Event.CHANGE, function () {
              _this2.rangeSlider.update({
                from: element.value
              });
            });
          }
        });
      };

      IonRangeSlider.updateValue = function updateValue(collection, value) {
        mrUtil.forEach(collection, function (index, element) {
          var updateElement = element; // If element is an input, set the value instead of textContent

          var updateMethod = element.tagName.toUpperCase() === Selector.INPUT ? 'value' : 'textContent';
          updateElement[updateMethod] = value;
        });
      };

      IonRangeSlider.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachIonRangeSlider() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new IonRangeSlider(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(IonRangeSlider, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return IonRangeSlider;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      var ionRangeSliderElements = $.makeArray($(Selector.DATA_ION_RANGESLIDER));
      /* eslint-disable no-plusplus */

      for (var i = ionRangeSliderElements.length; i--;) {
        var $ionRangeSlider = $(ionRangeSliderElements[i]);
        IonRangeSlider.jQueryInterface.call($ionRangeSlider, $ionRangeSlider.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = IonRangeSlider.jQueryInterface;
    $.fn[NAME].Constructor = IonRangeSlider;

    $.fn[NAME].noConflict = function IonRangeSliderNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return IonRangeSlider.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return IonRangeSlider;
  }(jQuery$1);

  var evEmitter = createCommonjsModule(function (module) {
  /**
   * EvEmitter v1.1.0
   * Lil' event emitter
   * MIT License
   */

  /* jshint unused: true, undef: true, strict: true */

  ( function( global, factory ) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, window */
    if (  module.exports ) {
      // CommonJS - Browserify, Webpack
      module.exports = factory();
    } else {
      // Browser globals
      global.EvEmitter = factory();
    }

  }( typeof window != 'undefined' ? window : commonjsGlobal, function() {

  function EvEmitter() {}

  var proto = EvEmitter.prototype;

  proto.on = function( eventName, listener ) {
    if ( !eventName || !listener ) {
      return;
    }
    // set events hash
    var events = this._events = this._events || {};
    // set listeners array
    var listeners = events[ eventName ] = events[ eventName ] || [];
    // only add once
    if ( listeners.indexOf( listener ) == -1 ) {
      listeners.push( listener );
    }

    return this;
  };

  proto.once = function( eventName, listener ) {
    if ( !eventName || !listener ) {
      return;
    }
    // add event
    this.on( eventName, listener );
    // set once flag
    // set onceEvents hash
    var onceEvents = this._onceEvents = this._onceEvents || {};
    // set onceListeners object
    var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
    // set flag
    onceListeners[ listener ] = true;

    return this;
  };

  proto.off = function( eventName, listener ) {
    var listeners = this._events && this._events[ eventName ];
    if ( !listeners || !listeners.length ) {
      return;
    }
    var index = listeners.indexOf( listener );
    if ( index != -1 ) {
      listeners.splice( index, 1 );
    }

    return this;
  };

  proto.emitEvent = function( eventName, args ) {
    var listeners = this._events && this._events[ eventName ];
    if ( !listeners || !listeners.length ) {
      return;
    }
    // copy over to avoid interference if .off() in listener
    listeners = listeners.slice(0);
    args = args || [];
    // once stuff
    var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

    for ( var i=0; i < listeners.length; i++ ) {
      var listener = listeners[i];
      var isOnce = onceListeners && onceListeners[ listener ];
      if ( isOnce ) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off( eventName, listener );
        // unset once flag
        delete onceListeners[ listener ];
      }
      // trigger listener
      listener.apply( this, args );
    }

    return this;
  };

  proto.allOff = function() {
    delete this._events;
    delete this._onceEvents;
  };

  return EvEmitter;

  }));
  });

  var getSize = createCommonjsModule(function (module) {
  /*!
   * getSize v2.0.3
   * measure size of elements
   * MIT license
   */

  /* jshint browser: true, strict: true, undef: true, unused: true */
  /* globals console: false */

  ( function( window, factory ) {
    /* jshint strict: false */ /* globals define, module */
    if (  module.exports ) {
      // CommonJS
      module.exports = factory();
    } else {
      // browser global
      window.getSize = factory();
    }

  })( window, function factory() {

  // -------------------------- helpers -------------------------- //

  // get a number from a string, not a percentage
  function getStyleSize( value ) {
    var num = parseFloat( value );
    // not a percent like '100%', and a number
    var isValid = value.indexOf('%') == -1 && !isNaN( num );
    return isValid && num;
  }

  function noop() {}

  var logError = typeof console == 'undefined' ? noop :
    function( message ) {
      console.error( message );
    };

  // -------------------------- measurements -------------------------- //

  var measurements = [
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
    'borderLeftWidth',
    'borderRightWidth',
    'borderTopWidth',
    'borderBottomWidth'
  ];

  var measurementsLength = measurements.length;

  function getZeroSize() {
    var size = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    };
    for ( var i=0; i < measurementsLength; i++ ) {
      var measurement = measurements[i];
      size[ measurement ] = 0;
    }
    return size;
  }

  // -------------------------- getStyle -------------------------- //

  /**
   * getStyle, get style of element, check for Firefox bug
   * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
   */
  function getStyle( elem ) {
    var style = getComputedStyle( elem );
    if ( !style ) {
      logError( 'Style returned ' + style +
        '. Are you running this code in a hidden iframe on Firefox? ' +
        'See https://bit.ly/getsizebug1' );
    }
    return style;
  }

  // -------------------------- setup -------------------------- //

  var isSetup = false;

  var isBoxSizeOuter;

  /**
   * setup
   * check isBoxSizerOuter
   * do on first getSize() rather than on page load for Firefox bug
   */
  function setup() {
    // setup once
    if ( isSetup ) {
      return;
    }
    isSetup = true;

    // -------------------------- box sizing -------------------------- //

    /**
     * Chrome & Safari measure the outer-width on style.width on border-box elems
     * IE11 & Firefox<29 measures the inner-width
     */
    var div = document.createElement('div');
    div.style.width = '200px';
    div.style.padding = '1px 2px 3px 4px';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px 2px 3px 4px';
    div.style.boxSizing = 'border-box';

    var body = document.body || document.documentElement;
    body.appendChild( div );
    var style = getStyle( div );
    // round value for browser zoom. desandro/masonry#928
    isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
    getSize.isBoxSizeOuter = isBoxSizeOuter;

    body.removeChild( div );
  }

  // -------------------------- getSize -------------------------- //

  function getSize( elem ) {
    setup();

    // use querySeletor if elem is string
    if ( typeof elem == 'string' ) {
      elem = document.querySelector( elem );
    }

    // do not proceed on non-objects
    if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
      return;
    }

    var style = getStyle( elem );

    // if hidden, everything is 0
    if ( style.display == 'none' ) {
      return getZeroSize();
    }

    var size = {};
    size.width = elem.offsetWidth;
    size.height = elem.offsetHeight;

    var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

    // get all measurements
    for ( var i=0; i < measurementsLength; i++ ) {
      var measurement = measurements[i];
      var value = style[ measurement ];
      var num = parseFloat( value );
      // any 'auto', 'medium' value will be 0
      size[ measurement ] = !isNaN( num ) ? num : 0;
    }

    var paddingWidth = size.paddingLeft + size.paddingRight;
    var paddingHeight = size.paddingTop + size.paddingBottom;
    var marginWidth = size.marginLeft + size.marginRight;
    var marginHeight = size.marginTop + size.marginBottom;
    var borderWidth = size.borderLeftWidth + size.borderRightWidth;
    var borderHeight = size.borderTopWidth + size.borderBottomWidth;

    var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

    // overwrite width and height if we can get it from style
    var styleWidth = getStyleSize( style.width );
    if ( styleWidth !== false ) {
      size.width = styleWidth +
        // add padding and border unless it's already including it
        ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
    }

    var styleHeight = getStyleSize( style.height );
    if ( styleHeight !== false ) {
      size.height = styleHeight +
        // add padding and border unless it's already including it
        ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
    }

    size.innerWidth = size.width - ( paddingWidth + borderWidth );
    size.innerHeight = size.height - ( paddingHeight + borderHeight );

    size.outerWidth = size.width + marginWidth;
    size.outerHeight = size.height + marginHeight;

    return size;
  }

  return getSize;

  });
  });

  var matchesSelector = createCommonjsModule(function (module) {
  /**
   * matchesSelector v2.0.2
   * matchesSelector( element, '.selector' )
   * MIT license
   */

  /*jshint browser: true, strict: true, undef: true, unused: true */

  ( function( window, factory ) {
    // universal module definition
    if (  module.exports ) {
      // CommonJS
      module.exports = factory();
    } else {
      // browser global
      window.matchesSelector = factory();
    }

  }( window, function factory() {

    var matchesMethod = ( function() {
      var ElemProto = window.Element.prototype;
      // check for the standard method name first
      if ( ElemProto.matches ) {
        return 'matches';
      }
      // check un-prefixed
      if ( ElemProto.matchesSelector ) {
        return 'matchesSelector';
      }
      // check vendor prefixes
      var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

      for ( var i=0; i < prefixes.length; i++ ) {
        var prefix = prefixes[i];
        var method = prefix + 'MatchesSelector';
        if ( ElemProto[ method ] ) {
          return method;
        }
      }
    })();

    return function matchesSelector( elem, selector ) {
      return elem[ matchesMethod ]( selector );
    };

  }));
  });

  var utils = createCommonjsModule(function (module) {
  /**
   * Fizzy UI utils v2.0.7
   * MIT license
   */

  /*jshint browser: true, undef: true, unused: true, strict: true */

  ( function( window, factory ) {
    // universal module definition
    /*jshint strict: false */ /*globals define, module, require */

    if (  module.exports ) {
      // CommonJS
      module.exports = factory(
        window,
        matchesSelector
      );
    } else {
      // browser global
      window.fizzyUIUtils = factory(
        window,
        window.matchesSelector
      );
    }

  }( window, function factory( window, matchesSelector ) {

  var utils = {};

  // ----- extend ----- //

  // extends objects
  utils.extend = function( a, b ) {
    for ( var prop in b ) {
      a[ prop ] = b[ prop ];
    }
    return a;
  };

  // ----- modulo ----- //

  utils.modulo = function( num, div ) {
    return ( ( num % div ) + div ) % div;
  };

  // ----- makeArray ----- //

  var arraySlice = Array.prototype.slice;

  // turn element or nodeList into an array
  utils.makeArray = function( obj ) {
    if ( Array.isArray( obj ) ) {
      // use object if already an array
      return obj;
    }
    // return empty array if undefined or null. #6
    if ( obj === null || obj === undefined ) {
      return [];
    }

    var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
    if ( isArrayLike ) {
      // convert nodeList to array
      return arraySlice.call( obj );
    }

    // array of single index
    return [ obj ];
  };

  // ----- removeFrom ----- //

  utils.removeFrom = function( ary, obj ) {
    var index = ary.indexOf( obj );
    if ( index != -1 ) {
      ary.splice( index, 1 );
    }
  };

  // ----- getParent ----- //

  utils.getParent = function( elem, selector ) {
    while ( elem.parentNode && elem != document.body ) {
      elem = elem.parentNode;
      if ( matchesSelector( elem, selector ) ) {
        return elem;
      }
    }
  };

  // ----- getQueryElement ----- //

  // use element as selector string
  utils.getQueryElement = function( elem ) {
    if ( typeof elem == 'string' ) {
      return document.querySelector( elem );
    }
    return elem;
  };

  // ----- handleEvent ----- //

  // enable .ontype to trigger from .addEventListener( elem, 'type' )
  utils.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  // ----- filterFindElements ----- //

  utils.filterFindElements = function( elems, selector ) {
    // make array of elems
    elems = utils.makeArray( elems );
    var ffElems = [];

    elems.forEach( function( elem ) {
      // check that elem is an actual element
      if ( !( elem instanceof HTMLElement ) ) {
        return;
      }
      // add elem if no selector
      if ( !selector ) {
        ffElems.push( elem );
        return;
      }
      // filter & find items if we have a selector
      // filter
      if ( matchesSelector( elem, selector ) ) {
        ffElems.push( elem );
      }
      // find children
      var childElems = elem.querySelectorAll( selector );
      // concat childElems to filterFound array
      for ( var i=0; i < childElems.length; i++ ) {
        ffElems.push( childElems[i] );
      }
    });

    return ffElems;
  };

  // ----- debounceMethod ----- //

  utils.debounceMethod = function( _class, methodName, threshold ) {
    threshold = threshold || 100;
    // original method
    var method = _class.prototype[ methodName ];
    var timeoutName = methodName + 'Timeout';

    _class.prototype[ methodName ] = function() {
      var timeout = this[ timeoutName ];
      clearTimeout( timeout );

      var args = arguments;
      var _this = this;
      this[ timeoutName ] = setTimeout( function() {
        method.apply( _this, args );
        delete _this[ timeoutName ];
      }, threshold );
    };
  };

  // ----- docReady ----- //

  utils.docReady = function( callback ) {
    var readyState = document.readyState;
    if ( readyState == 'complete' || readyState == 'interactive' ) {
      // do async to allow for other scripts to run. metafizzy/flickity#441
      setTimeout( callback );
    } else {
      document.addEventListener( 'DOMContentLoaded', callback );
    }
  };

  // ----- htmlInit ----- //

  // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
  utils.toDashed = function( str ) {
    return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
      return $1 + '-' + $2;
    }).toLowerCase();
  };

  var console = window.console;
  /**
   * allow user to initialize classes via [data-namespace] or .js-namespace class
   * htmlInit( Widget, 'widgetName' )
   * options are parsed from data-namespace-options
   */
  utils.htmlInit = function( WidgetClass, namespace ) {
    utils.docReady( function() {
      var dashedNamespace = utils.toDashed( namespace );
      var dataAttr = 'data-' + dashedNamespace;
      var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
      var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
      var elems = utils.makeArray( dataAttrElems )
        .concat( utils.makeArray( jsDashElems ) );
      var dataOptionsAttr = dataAttr + '-options';
      var jQuery = window.jQuery;

      elems.forEach( function( elem ) {
        var attr = elem.getAttribute( dataAttr ) ||
          elem.getAttribute( dataOptionsAttr );
        var options;
        try {
          options = attr && JSON.parse( attr );
        } catch ( error ) {
          // log error, do not initialize
          if ( console ) {
            console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
            ': ' + error );
          }
          return;
        }
        // initialize
        var instance = new WidgetClass( elem, options );
        // make available via $().data('namespace')
        if ( jQuery ) {
          jQuery.data( elem, namespace, instance );
        }
      });

    });
  };

  // -----  ----- //

  return utils;

  }));
  });

  var item = createCommonjsModule(function (module) {
  /**
   * Outlayer Item
   */

  ( function( window, factory ) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, require */
    if (  module.exports ) {
      // CommonJS - Browserify, Webpack
      module.exports = factory(
        evEmitter,
        getSize
      );
    } else {
      // browser global
      window.Outlayer = {};
      window.Outlayer.Item = factory(
        window.EvEmitter,
        window.getSize
      );
    }

  }( window, function factory( EvEmitter, getSize ) {

  // ----- helpers ----- //

  function isEmptyObj( obj ) {
    for ( var prop in obj ) {
      return false;
    }
    prop = null;
    return true;
  }

  // -------------------------- CSS3 support -------------------------- //


  var docElemStyle = document.documentElement.style;

  var transitionProperty = typeof docElemStyle.transition == 'string' ?
    'transition' : 'WebkitTransition';
  var transformProperty = typeof docElemStyle.transform == 'string' ?
    'transform' : 'WebkitTransform';

  var transitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    transition: 'transitionend'
  }[ transitionProperty ];

  // cache all vendor properties that could have vendor prefix
  var vendorProperties = {
    transform: transformProperty,
    transition: transitionProperty,
    transitionDuration: transitionProperty + 'Duration',
    transitionProperty: transitionProperty + 'Property',
    transitionDelay: transitionProperty + 'Delay'
  };

  // -------------------------- Item -------------------------- //

  function Item( element, layout ) {
    if ( !element ) {
      return;
    }

    this.element = element;
    // parent layout class, i.e. Masonry, Isotope, or Packery
    this.layout = layout;
    this.position = {
      x: 0,
      y: 0
    };

    this._create();
  }

  // inherit EvEmitter
  var proto = Item.prototype = Object.create( EvEmitter.prototype );
  proto.constructor = Item;

  proto._create = function() {
    // transition objects
    this._transn = {
      ingProperties: {},
      clean: {},
      onEnd: {}
    };

    this.css({
      position: 'absolute'
    });
  };

  // trigger specified handler for event type
  proto.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  proto.getSize = function() {
    this.size = getSize( this.element );
  };

  /**
   * apply CSS styles to element
   * @param {Object} style
   */
  proto.css = function( style ) {
    var elemStyle = this.element.style;

    for ( var prop in style ) {
      // use vendor property if available
      var supportedProp = vendorProperties[ prop ] || prop;
      elemStyle[ supportedProp ] = style[ prop ];
    }
  };

   // measure position, and sets it
  proto.getPosition = function() {
    var style = getComputedStyle( this.element );
    var isOriginLeft = this.layout._getOption('originLeft');
    var isOriginTop = this.layout._getOption('originTop');
    var xValue = style[ isOriginLeft ? 'left' : 'right' ];
    var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
    var x = parseFloat( xValue );
    var y = parseFloat( yValue );
    // convert percent to pixels
    var layoutSize = this.layout.size;
    if ( xValue.indexOf('%') != -1 ) {
      x = ( x / 100 ) * layoutSize.width;
    }
    if ( yValue.indexOf('%') != -1 ) {
      y = ( y / 100 ) * layoutSize.height;
    }
    // clean up 'auto' or other non-integer values
    x = isNaN( x ) ? 0 : x;
    y = isNaN( y ) ? 0 : y;
    // remove padding from measurement
    x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
    y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

    this.position.x = x;
    this.position.y = y;
  };

  // set settled position, apply padding
  proto.layoutPosition = function() {
    var layoutSize = this.layout.size;
    var style = {};
    var isOriginLeft = this.layout._getOption('originLeft');
    var isOriginTop = this.layout._getOption('originTop');

    // x
    var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
    var xProperty = isOriginLeft ? 'left' : 'right';
    var xResetProperty = isOriginLeft ? 'right' : 'left';

    var x = this.position.x + layoutSize[ xPadding ];
    // set in percentage or pixels
    style[ xProperty ] = this.getXValue( x );
    // reset other property
    style[ xResetProperty ] = '';

    // y
    var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
    var yProperty = isOriginTop ? 'top' : 'bottom';
    var yResetProperty = isOriginTop ? 'bottom' : 'top';

    var y = this.position.y + layoutSize[ yPadding ];
    // set in percentage or pixels
    style[ yProperty ] = this.getYValue( y );
    // reset other property
    style[ yResetProperty ] = '';

    this.css( style );
    this.emitEvent( 'layout', [ this ] );
  };

  proto.getXValue = function( x ) {
    var isHorizontal = this.layout._getOption('horizontal');
    return this.layout.options.percentPosition && !isHorizontal ?
      ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
  };

  proto.getYValue = function( y ) {
    var isHorizontal = this.layout._getOption('horizontal');
    return this.layout.options.percentPosition && isHorizontal ?
      ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
  };

  proto._transitionTo = function( x, y ) {
    this.getPosition();
    // get current x & y from top/left
    var curX = this.position.x;
    var curY = this.position.y;

    var didNotMove = x == this.position.x && y == this.position.y;

    // save end position
    this.setPosition( x, y );

    // if did not move and not transitioning, just go to layout
    if ( didNotMove && !this.isTransitioning ) {
      this.layoutPosition();
      return;
    }

    var transX = x - curX;
    var transY = y - curY;
    var transitionStyle = {};
    transitionStyle.transform = this.getTranslate( transX, transY );

    this.transition({
      to: transitionStyle,
      onTransitionEnd: {
        transform: this.layoutPosition
      },
      isCleaning: true
    });
  };

  proto.getTranslate = function( x, y ) {
    // flip cooridinates if origin on right or bottom
    var isOriginLeft = this.layout._getOption('originLeft');
    var isOriginTop = this.layout._getOption('originTop');
    x = isOriginLeft ? x : -x;
    y = isOriginTop ? y : -y;
    return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
  };

  // non transition + transform support
  proto.goTo = function( x, y ) {
    this.setPosition( x, y );
    this.layoutPosition();
  };

  proto.moveTo = proto._transitionTo;

  proto.setPosition = function( x, y ) {
    this.position.x = parseFloat( x );
    this.position.y = parseFloat( y );
  };

  // ----- transition ----- //

  /**
   * @param {Object} style - CSS
   * @param {Function} onTransitionEnd
   */

  // non transition, just trigger callback
  proto._nonTransition = function( args ) {
    this.css( args.to );
    if ( args.isCleaning ) {
      this._removeStyles( args.to );
    }
    for ( var prop in args.onTransitionEnd ) {
      args.onTransitionEnd[ prop ].call( this );
    }
  };

  /**
   * proper transition
   * @param {Object} args - arguments
   *   @param {Object} to - style to transition to
   *   @param {Object} from - style to start transition from
   *   @param {Boolean} isCleaning - removes transition styles after transition
   *   @param {Function} onTransitionEnd - callback
   */
  proto.transition = function( args ) {
    // redirect to nonTransition if no transition duration
    if ( !parseFloat( this.layout.options.transitionDuration ) ) {
      this._nonTransition( args );
      return;
    }

    var _transition = this._transn;
    // keep track of onTransitionEnd callback by css property
    for ( var prop in args.onTransitionEnd ) {
      _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
    }
    // keep track of properties that are transitioning
    for ( prop in args.to ) {
      _transition.ingProperties[ prop ] = true;
      // keep track of properties to clean up when transition is done
      if ( args.isCleaning ) {
        _transition.clean[ prop ] = true;
      }
    }

    // set from styles
    if ( args.from ) {
      this.css( args.from );
      // force redraw. http://blog.alexmaccaw.com/css-transitions
      var h = this.element.offsetHeight;
      // hack for JSHint to hush about unused var
      h = null;
    }
    // enable transition
    this.enableTransition( args.to );
    // set styles that are transitioning
    this.css( args.to );

    this.isTransitioning = true;

  };

  // dash before all cap letters, including first for
  // WebkitTransform => -webkit-transform
  function toDashedAll( str ) {
    return str.replace( /([A-Z])/g, function( $1 ) {
      return '-' + $1.toLowerCase();
    });
  }

  var transitionProps = 'opacity,' + toDashedAll( transformProperty );

  proto.enableTransition = function(/* style */) {
    // HACK changing transitionProperty during a transition
    // will cause transition to jump
    if ( this.isTransitioning ) {
      return;
    }

    // make `transition: foo, bar, baz` from style object
    // HACK un-comment this when enableTransition can work
    // while a transition is happening
    // var transitionValues = [];
    // for ( var prop in style ) {
    //   // dash-ify camelCased properties like WebkitTransition
    //   prop = vendorProperties[ prop ] || prop;
    //   transitionValues.push( toDashedAll( prop ) );
    // }
    // munge number to millisecond, to match stagger
    var duration = this.layout.options.transitionDuration;
    duration = typeof duration == 'number' ? duration + 'ms' : duration;
    // enable transition styles
    this.css({
      transitionProperty: transitionProps,
      transitionDuration: duration,
      transitionDelay: this.staggerDelay || 0
    });
    // listen for transition end event
    this.element.addEventListener( transitionEndEvent, this, false );
  };

  // ----- events ----- //

  proto.onwebkitTransitionEnd = function( event ) {
    this.ontransitionend( event );
  };

  proto.onotransitionend = function( event ) {
    this.ontransitionend( event );
  };

  // properties that I munge to make my life easier
  var dashedVendorProperties = {
    '-webkit-transform': 'transform'
  };

  proto.ontransitionend = function( event ) {
    // disregard bubbled events from children
    if ( event.target !== this.element ) {
      return;
    }
    var _transition = this._transn;
    // get property name of transitioned property, convert to prefix-free
    var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

    // remove property that has completed transitioning
    delete _transition.ingProperties[ propertyName ];
    // check if any properties are still transitioning
    if ( isEmptyObj( _transition.ingProperties ) ) {
      // all properties have completed transitioning
      this.disableTransition();
    }
    // clean style
    if ( propertyName in _transition.clean ) {
      // clean up style
      this.element.style[ event.propertyName ] = '';
      delete _transition.clean[ propertyName ];
    }
    // trigger onTransitionEnd callback
    if ( propertyName in _transition.onEnd ) {
      var onTransitionEnd = _transition.onEnd[ propertyName ];
      onTransitionEnd.call( this );
      delete _transition.onEnd[ propertyName ];
    }

    this.emitEvent( 'transitionEnd', [ this ] );
  };

  proto.disableTransition = function() {
    this.removeTransitionStyles();
    this.element.removeEventListener( transitionEndEvent, this, false );
    this.isTransitioning = false;
  };

  /**
   * removes style property from element
   * @param {Object} style
  **/
  proto._removeStyles = function( style ) {
    // clean up transition styles
    var cleanStyle = {};
    for ( var prop in style ) {
      cleanStyle[ prop ] = '';
    }
    this.css( cleanStyle );
  };

  var cleanTransitionStyle = {
    transitionProperty: '',
    transitionDuration: '',
    transitionDelay: ''
  };

  proto.removeTransitionStyles = function() {
    // remove transition
    this.css( cleanTransitionStyle );
  };

  // ----- stagger ----- //

  proto.stagger = function( delay ) {
    delay = isNaN( delay ) ? 0 : delay;
    this.staggerDelay = delay + 'ms';
  };

  // ----- show/hide/remove ----- //

  // remove element from DOM
  proto.removeElem = function() {
    this.element.parentNode.removeChild( this.element );
    // remove display: none
    this.css({ display: '' });
    this.emitEvent( 'remove', [ this ] );
  };

  proto.remove = function() {
    // just remove element if no transition support or no transition
    if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
      this.removeElem();
      return;
    }

    // start transition
    this.once( 'transitionEnd', function() {
      this.removeElem();
    });
    this.hide();
  };

  proto.reveal = function() {
    delete this.isHidden;
    // remove display: none
    this.css({ display: '' });

    var options = this.layout.options;

    var onTransitionEnd = {};
    var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
    onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

    this.transition({
      from: options.hiddenStyle,
      to: options.visibleStyle,
      isCleaning: true,
      onTransitionEnd: onTransitionEnd
    });
  };

  proto.onRevealTransitionEnd = function() {
    // check if still visible
    // during transition, item may have been hidden
    if ( !this.isHidden ) {
      this.emitEvent('reveal');
    }
  };

  /**
   * get style property use for hide/reveal transition end
   * @param {String} styleProperty - hiddenStyle/visibleStyle
   * @returns {String}
   */
  proto.getHideRevealTransitionEndProperty = function( styleProperty ) {
    var optionStyle = this.layout.options[ styleProperty ];
    // use opacity
    if ( optionStyle.opacity ) {
      return 'opacity';
    }
    // get first property
    for ( var prop in optionStyle ) {
      return prop;
    }
  };

  proto.hide = function() {
    // set flag
    this.isHidden = true;
    // remove display: none
    this.css({ display: '' });

    var options = this.layout.options;

    var onTransitionEnd = {};
    var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
    onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

    this.transition({
      from: options.visibleStyle,
      to: options.hiddenStyle,
      // keep hidden stuff hidden
      isCleaning: true,
      onTransitionEnd: onTransitionEnd
    });
  };

  proto.onHideTransitionEnd = function() {
    // check if still hidden
    // during transition, item may have been un-hidden
    if ( this.isHidden ) {
      this.css({ display: 'none' });
      this.emitEvent('hide');
    }
  };

  proto.destroy = function() {
    this.css({
      position: '',
      left: '',
      right: '',
      top: '',
      bottom: '',
      transition: '',
      transform: ''
    });
  };

  return Item;

  }));
  });

  var outlayer = createCommonjsModule(function (module) {
  /*!
   * Outlayer v2.1.1
   * the brains and guts of a layout library
   * MIT license
   */

  ( function( window, factory ) {
    // universal module definition
    /* jshint strict: false */ /* globals define, module, require */
    if (  module.exports ) {
      // CommonJS - Browserify, Webpack
      module.exports = factory(
        window,
        evEmitter,
        getSize,
        utils,
        item
      );
    } else {
      // browser global
      window.Outlayer = factory(
        window,
        window.EvEmitter,
        window.getSize,
        window.fizzyUIUtils,
        window.Outlayer.Item
      );
    }

  }( window, function factory( window, EvEmitter, getSize, utils, Item ) {

  // ----- vars ----- //

  var console = window.console;
  var jQuery = window.jQuery;
  var noop = function() {};

  // -------------------------- Outlayer -------------------------- //

  // globally unique identifiers
  var GUID = 0;
  // internal store of all Outlayer intances
  var instances = {};


  /**
   * @param {Element, String} element
   * @param {Object} options
   * @constructor
   */
  function Outlayer( element, options ) {
    var queryElement = utils.getQueryElement( element );
    if ( !queryElement ) {
      if ( console ) {
        console.error( 'Bad element for ' + this.constructor.namespace +
          ': ' + ( queryElement || element ) );
      }
      return;
    }
    this.element = queryElement;
    // add jQuery
    if ( jQuery ) {
      this.$element = jQuery( this.element );
    }

    // options
    this.options = utils.extend( {}, this.constructor.defaults );
    this.option( options );

    // add id for Outlayer.getFromElement
    var id = ++GUID;
    this.element.outlayerGUID = id; // expando
    instances[ id ] = this; // associate via id

    // kick it off
    this._create();

    var isInitLayout = this._getOption('initLayout');
    if ( isInitLayout ) {
      this.layout();
    }
  }

  // settings are for internal use only
  Outlayer.namespace = 'outlayer';
  Outlayer.Item = Item;

  // default options
  Outlayer.defaults = {
    containerStyle: {
      position: 'relative'
    },
    initLayout: true,
    originLeft: true,
    originTop: true,
    resize: true,
    resizeContainer: true,
    // item options
    transitionDuration: '0.4s',
    hiddenStyle: {
      opacity: 0,
      transform: 'scale(0.001)'
    },
    visibleStyle: {
      opacity: 1,
      transform: 'scale(1)'
    }
  };

  var proto = Outlayer.prototype;
  // inherit EvEmitter
  utils.extend( proto, EvEmitter.prototype );

  /**
   * set options
   * @param {Object} opts
   */
  proto.option = function( opts ) {
    utils.extend( this.options, opts );
  };

  /**
   * get backwards compatible option value, check old name
   */
  proto._getOption = function( option ) {
    var oldOption = this.constructor.compatOptions[ option ];
    return oldOption && this.options[ oldOption ] !== undefined ?
      this.options[ oldOption ] : this.options[ option ];
  };

  Outlayer.compatOptions = {
    // currentName: oldName
    initLayout: 'isInitLayout',
    horizontal: 'isHorizontal',
    layoutInstant: 'isLayoutInstant',
    originLeft: 'isOriginLeft',
    originTop: 'isOriginTop',
    resize: 'isResizeBound',
    resizeContainer: 'isResizingContainer'
  };

  proto._create = function() {
    // get items from children
    this.reloadItems();
    // elements that affect layout, but are not laid out
    this.stamps = [];
    this.stamp( this.options.stamp );
    // set container style
    utils.extend( this.element.style, this.options.containerStyle );

    // bind resize method
    var canBindResize = this._getOption('resize');
    if ( canBindResize ) {
      this.bindResize();
    }
  };

  // goes through all children again and gets bricks in proper order
  proto.reloadItems = function() {
    // collection of item elements
    this.items = this._itemize( this.element.children );
  };


  /**
   * turn elements into Outlayer.Items to be used in layout
   * @param {Array or NodeList or HTMLElement} elems
   * @returns {Array} items - collection of new Outlayer Items
   */
  proto._itemize = function( elems ) {

    var itemElems = this._filterFindItemElements( elems );
    var Item = this.constructor.Item;

    // create new Outlayer Items for collection
    var items = [];
    for ( var i=0; i < itemElems.length; i++ ) {
      var elem = itemElems[i];
      var item = new Item( elem, this );
      items.push( item );
    }

    return items;
  };

  /**
   * get item elements to be used in layout
   * @param {Array or NodeList or HTMLElement} elems
   * @returns {Array} items - item elements
   */
  proto._filterFindItemElements = function( elems ) {
    return utils.filterFindElements( elems, this.options.itemSelector );
  };

  /**
   * getter method for getting item elements
   * @returns {Array} elems - collection of item elements
   */
  proto.getItemElements = function() {
    return this.items.map( function( item ) {
      return item.element;
    });
  };

  // ----- init & layout ----- //

  /**
   * lays out all items
   */
  proto.layout = function() {
    this._resetLayout();
    this._manageStamps();

    // don't animate first layout
    var layoutInstant = this._getOption('layoutInstant');
    var isInstant = layoutInstant !== undefined ?
      layoutInstant : !this._isLayoutInited;
    this.layoutItems( this.items, isInstant );

    // flag for initalized
    this._isLayoutInited = true;
  };

  // _init is alias for layout
  proto._init = proto.layout;

  /**
   * logic before any new layout
   */
  proto._resetLayout = function() {
    this.getSize();
  };


  proto.getSize = function() {
    this.size = getSize( this.element );
  };

  /**
   * get measurement from option, for columnWidth, rowHeight, gutter
   * if option is String -> get element from selector string, & get size of element
   * if option is Element -> get size of element
   * else use option as a number
   *
   * @param {String} measurement
   * @param {String} size - width or height
   * @private
   */
  proto._getMeasurement = function( measurement, size ) {
    var option = this.options[ measurement ];
    var elem;
    if ( !option ) {
      // default to 0
      this[ measurement ] = 0;
    } else {
      // use option as an element
      if ( typeof option == 'string' ) {
        elem = this.element.querySelector( option );
      } else if ( option instanceof HTMLElement ) {
        elem = option;
      }
      // use size of element, if element
      this[ measurement ] = elem ? getSize( elem )[ size ] : option;
    }
  };

  /**
   * layout a collection of item elements
   * @api public
   */
  proto.layoutItems = function( items, isInstant ) {
    items = this._getItemsForLayout( items );

    this._layoutItems( items, isInstant );

    this._postLayout();
  };

  /**
   * get the items to be laid out
   * you may want to skip over some items
   * @param {Array} items
   * @returns {Array} items
   */
  proto._getItemsForLayout = function( items ) {
    return items.filter( function( item ) {
      return !item.isIgnored;
    });
  };

  /**
   * layout items
   * @param {Array} items
   * @param {Boolean} isInstant
   */
  proto._layoutItems = function( items, isInstant ) {
    this._emitCompleteOnItems( 'layout', items );

    if ( !items || !items.length ) {
      // no items, emit event with empty array
      return;
    }

    var queue = [];

    items.forEach( function( item ) {
      // get x/y object from method
      var position = this._getItemLayoutPosition( item );
      // enqueue
      position.item = item;
      position.isInstant = isInstant || item.isLayoutInstant;
      queue.push( position );
    }, this );

    this._processLayoutQueue( queue );
  };

  /**
   * get item layout position
   * @param {Outlayer.Item} item
   * @returns {Object} x and y position
   */
  proto._getItemLayoutPosition = function( /* item */ ) {
    return {
      x: 0,
      y: 0
    };
  };

  /**
   * iterate over array and position each item
   * Reason being - separating this logic prevents 'layout invalidation'
   * thx @paul_irish
   * @param {Array} queue
   */
  proto._processLayoutQueue = function( queue ) {
    this.updateStagger();
    queue.forEach( function( obj, i ) {
      this._positionItem( obj.item, obj.x, obj.y, obj.isInstant, i );
    }, this );
  };

  // set stagger from option in milliseconds number
  proto.updateStagger = function() {
    var stagger = this.options.stagger;
    if ( stagger === null || stagger === undefined ) {
      this.stagger = 0;
      return;
    }
    this.stagger = getMilliseconds( stagger );
    return this.stagger;
  };

  /**
   * Sets position of item in DOM
   * @param {Outlayer.Item} item
   * @param {Number} x - horizontal position
   * @param {Number} y - vertical position
   * @param {Boolean} isInstant - disables transitions
   */
  proto._positionItem = function( item, x, y, isInstant, i ) {
    if ( isInstant ) {
      // if not transition, just set CSS
      item.goTo( x, y );
    } else {
      item.stagger( i * this.stagger );
      item.moveTo( x, y );
    }
  };

  /**
   * Any logic you want to do after each layout,
   * i.e. size the container
   */
  proto._postLayout = function() {
    this.resizeContainer();
  };

  proto.resizeContainer = function() {
    var isResizingContainer = this._getOption('resizeContainer');
    if ( !isResizingContainer ) {
      return;
    }
    var size = this._getContainerSize();
    if ( size ) {
      this._setContainerMeasure( size.width, true );
      this._setContainerMeasure( size.height, false );
    }
  };

  /**
   * Sets width or height of container if returned
   * @returns {Object} size
   *   @param {Number} width
   *   @param {Number} height
   */
  proto._getContainerSize = noop;

  /**
   * @param {Number} measure - size of width or height
   * @param {Boolean} isWidth
   */
  proto._setContainerMeasure = function( measure, isWidth ) {
    if ( measure === undefined ) {
      return;
    }

    var elemSize = this.size;
    // add padding and border width if border box
    if ( elemSize.isBorderBox ) {
      measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
        elemSize.borderLeftWidth + elemSize.borderRightWidth :
        elemSize.paddingBottom + elemSize.paddingTop +
        elemSize.borderTopWidth + elemSize.borderBottomWidth;
    }

    measure = Math.max( measure, 0 );
    this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
  };

  /**
   * emit eventComplete on a collection of items events
   * @param {String} eventName
   * @param {Array} items - Outlayer.Items
   */
  proto._emitCompleteOnItems = function( eventName, items ) {
    var _this = this;
    function onComplete() {
      _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
    }

    var count = items.length;
    if ( !items || !count ) {
      onComplete();
      return;
    }

    var doneCount = 0;
    function tick() {
      doneCount++;
      if ( doneCount == count ) {
        onComplete();
      }
    }

    // bind callback
    items.forEach( function( item ) {
      item.once( eventName, tick );
    });
  };

  /**
   * emits events via EvEmitter and jQuery events
   * @param {String} type - name of event
   * @param {Event} event - original event
   * @param {Array} args - extra arguments
   */
  proto.dispatchEvent = function( type, event, args ) {
    // add original event to arguments
    var emitArgs = event ? [ event ].concat( args ) : args;
    this.emitEvent( type, emitArgs );

    if ( jQuery ) {
      // set this.$element
      this.$element = this.$element || jQuery( this.element );
      if ( event ) {
        // create jQuery event
        var $event = jQuery.Event( event );
        $event.type = type;
        this.$element.trigger( $event, args );
      } else {
        // just trigger with type if no event available
        this.$element.trigger( type, args );
      }
    }
  };

  // -------------------------- ignore & stamps -------------------------- //


  /**
   * keep item in collection, but do not lay it out
   * ignored items do not get skipped in layout
   * @param {Element} elem
   */
  proto.ignore = function( elem ) {
    var item = this.getItem( elem );
    if ( item ) {
      item.isIgnored = true;
    }
  };

  /**
   * return item to layout collection
   * @param {Element} elem
   */
  proto.unignore = function( elem ) {
    var item = this.getItem( elem );
    if ( item ) {
      delete item.isIgnored;
    }
  };

  /**
   * adds elements to stamps
   * @param {NodeList, Array, Element, or String} elems
   */
  proto.stamp = function( elems ) {
    elems = this._find( elems );
    if ( !elems ) {
      return;
    }

    this.stamps = this.stamps.concat( elems );
    // ignore
    elems.forEach( this.ignore, this );
  };

  /**
   * removes elements to stamps
   * @param {NodeList, Array, or Element} elems
   */
  proto.unstamp = function( elems ) {
    elems = this._find( elems );
    if ( !elems ){
      return;
    }

    elems.forEach( function( elem ) {
      // filter out removed stamp elements
      utils.removeFrom( this.stamps, elem );
      this.unignore( elem );
    }, this );
  };

  /**
   * finds child elements
   * @param {NodeList, Array, Element, or String} elems
   * @returns {Array} elems
   */
  proto._find = function( elems ) {
    if ( !elems ) {
      return;
    }
    // if string, use argument as selector string
    if ( typeof elems == 'string' ) {
      elems = this.element.querySelectorAll( elems );
    }
    elems = utils.makeArray( elems );
    return elems;
  };

  proto._manageStamps = function() {
    if ( !this.stamps || !this.stamps.length ) {
      return;
    }

    this._getBoundingRect();

    this.stamps.forEach( this._manageStamp, this );
  };

  // update boundingLeft / Top
  proto._getBoundingRect = function() {
    // get bounding rect for container element
    var boundingRect = this.element.getBoundingClientRect();
    var size = this.size;
    this._boundingRect = {
      left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
      top: boundingRect.top + size.paddingTop + size.borderTopWidth,
      right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
      bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
    };
  };

  /**
   * @param {Element} stamp
  **/
  proto._manageStamp = noop;

  /**
   * get x/y position of element relative to container element
   * @param {Element} elem
   * @returns {Object} offset - has left, top, right, bottom
   */
  proto._getElementOffset = function( elem ) {
    var boundingRect = elem.getBoundingClientRect();
    var thisRect = this._boundingRect;
    var size = getSize( elem );
    var offset = {
      left: boundingRect.left - thisRect.left - size.marginLeft,
      top: boundingRect.top - thisRect.top - size.marginTop,
      right: thisRect.right - boundingRect.right - size.marginRight,
      bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
    };
    return offset;
  };

  // -------------------------- resize -------------------------- //

  // enable event handlers for listeners
  // i.e. resize -> onresize
  proto.handleEvent = utils.handleEvent;

  /**
   * Bind layout to window resizing
   */
  proto.bindResize = function() {
    window.addEventListener( 'resize', this );
    this.isResizeBound = true;
  };

  /**
   * Unbind layout to window resizing
   */
  proto.unbindResize = function() {
    window.removeEventListener( 'resize', this );
    this.isResizeBound = false;
  };

  proto.onresize = function() {
    this.resize();
  };

  utils.debounceMethod( Outlayer, 'onresize', 100 );

  proto.resize = function() {
    // don't trigger if size did not change
    // or if resize was unbound. See #9
    if ( !this.isResizeBound || !this.needsResizeLayout() ) {
      return;
    }

    this.layout();
  };

  /**
   * check if layout is needed post layout
   * @returns Boolean
   */
  proto.needsResizeLayout = function() {
    var size = getSize( this.element );
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var hasSizes = this.size && size;
    return hasSizes && size.innerWidth !== this.size.innerWidth;
  };

  // -------------------------- methods -------------------------- //

  /**
   * add items to Outlayer instance
   * @param {Array or NodeList or Element} elems
   * @returns {Array} items - Outlayer.Items
  **/
  proto.addItems = function( elems ) {
    var items = this._itemize( elems );
    // add items to collection
    if ( items.length ) {
      this.items = this.items.concat( items );
    }
    return items;
  };

  /**
   * Layout newly-appended item elements
   * @param {Array or NodeList or Element} elems
   */
  proto.appended = function( elems ) {
    var items = this.addItems( elems );
    if ( !items.length ) {
      return;
    }
    // layout and reveal just the new items
    this.layoutItems( items, true );
    this.reveal( items );
  };

  /**
   * Layout prepended elements
   * @param {Array or NodeList or Element} elems
   */
  proto.prepended = function( elems ) {
    var items = this._itemize( elems );
    if ( !items.length ) {
      return;
    }
    // add items to beginning of collection
    var previousItems = this.items.slice(0);
    this.items = items.concat( previousItems );
    // start new layout
    this._resetLayout();
    this._manageStamps();
    // layout new stuff without transition
    this.layoutItems( items, true );
    this.reveal( items );
    // layout previous items
    this.layoutItems( previousItems );
  };

  /**
   * reveal a collection of items
   * @param {Array of Outlayer.Items} items
   */
  proto.reveal = function( items ) {
    this._emitCompleteOnItems( 'reveal', items );
    if ( !items || !items.length ) {
      return;
    }
    var stagger = this.updateStagger();
    items.forEach( function( item, i ) {
      item.stagger( i * stagger );
      item.reveal();
    });
  };

  /**
   * hide a collection of items
   * @param {Array of Outlayer.Items} items
   */
  proto.hide = function( items ) {
    this._emitCompleteOnItems( 'hide', items );
    if ( !items || !items.length ) {
      return;
    }
    var stagger = this.updateStagger();
    items.forEach( function( item, i ) {
      item.stagger( i * stagger );
      item.hide();
    });
  };

  /**
   * reveal item elements
   * @param {Array}, {Element}, {NodeList} items
   */
  proto.revealItemElements = function( elems ) {
    var items = this.getItems( elems );
    this.reveal( items );
  };

  /**
   * hide item elements
   * @param {Array}, {Element}, {NodeList} items
   */
  proto.hideItemElements = function( elems ) {
    var items = this.getItems( elems );
    this.hide( items );
  };

  /**
   * get Outlayer.Item, given an Element
   * @param {Element} elem
   * @param {Function} callback
   * @returns {Outlayer.Item} item
   */
  proto.getItem = function( elem ) {
    // loop through items to get the one that matches
    for ( var i=0; i < this.items.length; i++ ) {
      var item = this.items[i];
      if ( item.element == elem ) {
        // return item
        return item;
      }
    }
  };

  /**
   * get collection of Outlayer.Items, given Elements
   * @param {Array} elems
   * @returns {Array} items - Outlayer.Items
   */
  proto.getItems = function( elems ) {
    elems = utils.makeArray( elems );
    var items = [];
    elems.forEach( function( elem ) {
      var item = this.getItem( elem );
      if ( item ) {
        items.push( item );
      }
    }, this );

    return items;
  };

  /**
   * remove element(s) from instance and DOM
   * @param {Array or NodeList or Element} elems
   */
  proto.remove = function( elems ) {
    var removeItems = this.getItems( elems );

    this._emitCompleteOnItems( 'remove', removeItems );

    // bail if no items to remove
    if ( !removeItems || !removeItems.length ) {
      return;
    }

    removeItems.forEach( function( item ) {
      item.remove();
      // remove item from collection
      utils.removeFrom( this.items, item );
    }, this );
  };

  // ----- destroy ----- //

  // remove and disable Outlayer instance
  proto.destroy = function() {
    // clean up dynamic styles
    var style = this.element.style;
    style.height = '';
    style.position = '';
    style.width = '';
    // destroy items
    this.items.forEach( function( item ) {
      item.destroy();
    });

    this.unbindResize();

    var id = this.element.outlayerGUID;
    delete instances[ id ]; // remove reference to instance by id
    delete this.element.outlayerGUID;
    // remove data for jQuery
    if ( jQuery ) {
      jQuery.removeData( this.element, this.constructor.namespace );
    }

  };

  // -------------------------- data -------------------------- //

  /**
   * get Outlayer instance from element
   * @param {Element} elem
   * @returns {Outlayer}
   */
  Outlayer.data = function( elem ) {
    elem = utils.getQueryElement( elem );
    var id = elem && elem.outlayerGUID;
    return id && instances[ id ];
  };


  // -------------------------- create Outlayer class -------------------------- //

  /**
   * create a layout class
   * @param {String} namespace
   */
  Outlayer.create = function( namespace, options ) {
    // sub-class Outlayer
    var Layout = subclass( Outlayer );
    // apply new options and compatOptions
    Layout.defaults = utils.extend( {}, Outlayer.defaults );
    utils.extend( Layout.defaults, options );
    Layout.compatOptions = utils.extend( {}, Outlayer.compatOptions  );

    Layout.namespace = namespace;

    Layout.data = Outlayer.data;

    // sub-class Item
    Layout.Item = subclass( Item );

    // -------------------------- declarative -------------------------- //

    utils.htmlInit( Layout, namespace );

    // -------------------------- jQuery bridge -------------------------- //

    // make into jQuery plugin
    if ( jQuery && jQuery.bridget ) {
      jQuery.bridget( namespace, Layout );
    }

    return Layout;
  };

  function subclass( Parent ) {
    function SubClass() {
      Parent.apply( this, arguments );
    }

    SubClass.prototype = Object.create( Parent.prototype );
    SubClass.prototype.constructor = SubClass;

    return SubClass;
  }

  // ----- helpers ----- //

  // how many milliseconds are in each unit
  var msUnits = {
    ms: 1,
    s: 1000
  };

  // munge time-like parameter into millisecond number
  // '0.4s' -> 40
  function getMilliseconds( time ) {
    if ( typeof time == 'number' ) {
      return time;
    }
    var matches = time.match( /(^\d*\.?\d*)(\w*)/ );
    var num = matches && matches[1];
    var unit = matches && matches[2];
    if ( !num.length ) {
      return 0;
    }
    num = parseFloat( num );
    var mult = msUnits[ unit ] || 1;
    return num * mult;
  }

  // ----- fin ----- //

  // back in global
  Outlayer.Item = Item;

  return Outlayer;

  }));
  });

  var item$1 = createCommonjsModule(function (module) {
  /**
   * Isotope Item
  **/

  ( function( window, factory ) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (  module.exports ) {
      // CommonJS
      module.exports = factory(
        outlayer
      );
    } else {
      // browser global
      window.Isotope = window.Isotope || {};
      window.Isotope.Item = factory(
        window.Outlayer
      );
    }

  }( window, function factory( Outlayer ) {

  // -------------------------- Item -------------------------- //

  // sub-class Outlayer Item
  function Item() {
    Outlayer.Item.apply( this, arguments );
  }

  var proto = Item.prototype = Object.create( Outlayer.Item.prototype );

  var _create = proto._create;
  proto._create = function() {
    // assign id, used for original-order sorting
    this.id = this.layout.itemGUID++;
    _create.call( this );
    this.sortData = {};
  };

  proto.updateSortData = function() {
    if ( this.isIgnored ) {
      return;
    }
    // default sorters
    this.sortData.id = this.id;
    // for backward compatibility
    this.sortData['original-order'] = this.id;
    this.sortData.random = Math.random();
    // go thru getSortData obj and apply the sorters
    var getSortData = this.layout.options.getSortData;
    var sorters = this.layout._sorters;
    for ( var key in getSortData ) {
      var sorter = sorters[ key ];
      this.sortData[ key ] = sorter( this.element, this );
    }
  };

  var _destroy = proto.destroy;
  proto.destroy = function() {
    // call super
    _destroy.apply( this, arguments );
    // reset display, #741
    this.css({
      display: ''
    });
  };

  return Item;

  }));
  });

  var layoutMode = createCommonjsModule(function (module) {
  /**
   * Isotope LayoutMode
   */

  ( function( window, factory ) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (  module.exports ) {
      // CommonJS
      module.exports = factory(
        getSize,
        outlayer
      );
    } else {
      // browser global
      window.Isotope = window.Isotope || {};
      window.Isotope.LayoutMode = factory(
        window.getSize,
        window.Outlayer
      );
    }

  }( window, function factory( getSize, Outlayer ) {

    // layout mode class
    function LayoutMode( isotope ) {
      this.isotope = isotope;
      // link properties
      if ( isotope ) {
        this.options = isotope.options[ this.namespace ];
        this.element = isotope.element;
        this.items = isotope.filteredItems;
        this.size = isotope.size;
      }
    }

    var proto = LayoutMode.prototype;

    /**
     * some methods should just defer to default Outlayer method
     * and reference the Isotope instance as `this`
    **/
    var facadeMethods = [
      '_resetLayout',
      '_getItemLayoutPosition',
      '_manageStamp',
      '_getContainerSize',
      '_getElementOffset',
      'needsResizeLayout',
      '_getOption'
    ];

    facadeMethods.forEach( function( methodName ) {
      proto[ methodName ] = function() {
        return Outlayer.prototype[ methodName ].apply( this.isotope, arguments );
      };
    });

    // -----  ----- //

    // for horizontal layout modes, check vertical size
    proto.needsVerticalResizeLayout = function() {
      // don't trigger if size did not change
      var size = getSize( this.isotope.element );
      // check that this.size and size are there
      // IE8 triggers resize on body size change, so they might not be
      var hasSizes = this.isotope.size && size;
      return hasSizes && size.innerHeight != this.isotope.size.innerHeight;
    };

    // ----- measurements ----- //

    proto._getMeasurement = function() {
      this.isotope._getMeasurement.apply( this, arguments );
    };

    proto.getColumnWidth = function() {
      this.getSegmentSize( 'column', 'Width' );
    };

    proto.getRowHeight = function() {
      this.getSegmentSize( 'row', 'Height' );
    };

    /**
     * get columnWidth or rowHeight
     * segment: 'column' or 'row'
     * size 'Width' or 'Height'
    **/
    proto.getSegmentSize = function( segment, size ) {
      var segmentName = segment + size;
      var outerSize = 'outer' + size;
      // columnWidth / outerWidth // rowHeight / outerHeight
      this._getMeasurement( segmentName, outerSize );
      // got rowHeight or columnWidth, we can chill
      if ( this[ segmentName ] ) {
        return;
      }
      // fall back to item of first element
      var firstItemSize = this.getFirstItemSize();
      this[ segmentName ] = firstItemSize && firstItemSize[ outerSize ] ||
        // or size of container
        this.isotope.size[ 'inner' + size ];
    };

    proto.getFirstItemSize = function() {
      var firstItem = this.isotope.filteredItems[0];
      return firstItem && firstItem.element && getSize( firstItem.element );
    };

    // ----- methods that should reference isotope ----- //

    proto.layout = function() {
      this.isotope.layout.apply( this.isotope, arguments );
    };

    proto.getSize = function() {
      this.isotope.getSize();
      this.size = this.isotope.size;
    };

    // -------------------------- create -------------------------- //

    LayoutMode.modes = {};

    LayoutMode.create = function( namespace, options ) {

      function Mode() {
        LayoutMode.apply( this, arguments );
      }

      Mode.prototype = Object.create( proto );
      Mode.prototype.constructor = Mode;

      // default options
      if ( options ) {
        Mode.options = options;
      }

      Mode.prototype.namespace = namespace;
      // register in Isotope
      LayoutMode.modes[ namespace ] = Mode;

      return Mode;
    };

    return LayoutMode;

  }));
  });

  var masonry = createCommonjsModule(function (module) {
  /*!
   * Masonry v4.2.2
   * Cascading grid layout library
   * https://masonry.desandro.com
   * MIT License
   * by David DeSandro
   */

  ( function( window, factory ) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (  module.exports ) {
      // CommonJS
      module.exports = factory(
        outlayer,
        getSize
      );
    } else {
      // browser global
      window.Masonry = factory(
        window.Outlayer,
        window.getSize
      );
    }

  }( window, function factory( Outlayer, getSize ) {

  // -------------------------- masonryDefinition -------------------------- //

    // create an Outlayer layout class
    var Masonry = Outlayer.create('masonry');
    // isFitWidth -> fitWidth
    Masonry.compatOptions.fitWidth = 'isFitWidth';

    var proto = Masonry.prototype;

    proto._resetLayout = function() {
      this.getSize();
      this._getMeasurement( 'columnWidth', 'outerWidth' );
      this._getMeasurement( 'gutter', 'outerWidth' );
      this.measureColumns();

      // reset column Y
      this.colYs = [];
      for ( var i=0; i < this.cols; i++ ) {
        this.colYs.push( 0 );
      }

      this.maxY = 0;
      this.horizontalColIndex = 0;
    };

    proto.measureColumns = function() {
      this.getContainerWidth();
      // if columnWidth is 0, default to outerWidth of first item
      if ( !this.columnWidth ) {
        var firstItem = this.items[0];
        var firstItemElem = firstItem && firstItem.element;
        // columnWidth fall back to item of first element
        this.columnWidth = firstItemElem && getSize( firstItemElem ).outerWidth ||
          // if first elem has no width, default to size of container
          this.containerWidth;
      }

      var columnWidth = this.columnWidth += this.gutter;

      // calculate columns
      var containerWidth = this.containerWidth + this.gutter;
      var cols = containerWidth / columnWidth;
      // fix rounding errors, typically with gutters
      var excess = columnWidth - containerWidth % columnWidth;
      // if overshoot is less than a pixel, round up, otherwise floor it
      var mathMethod = excess && excess < 1 ? 'round' : 'floor';
      cols = Math[ mathMethod ]( cols );
      this.cols = Math.max( cols, 1 );
    };

    proto.getContainerWidth = function() {
      // container is parent if fit width
      var isFitWidth = this._getOption('fitWidth');
      var container = isFitWidth ? this.element.parentNode : this.element;
      // check that this.size and size are there
      // IE8 triggers resize on body size change, so they might not be
      var size = getSize( container );
      this.containerWidth = size && size.innerWidth;
    };

    proto._getItemLayoutPosition = function( item ) {
      item.getSize();
      // how many columns does this brick span
      var remainder = item.size.outerWidth % this.columnWidth;
      var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
      // round if off by 1 pixel, otherwise use ceil
      var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
      colSpan = Math.min( colSpan, this.cols );
      // use horizontal or top column position
      var colPosMethod = this.options.horizontalOrder ?
        '_getHorizontalColPosition' : '_getTopColPosition';
      var colPosition = this[ colPosMethod ]( colSpan, item );
      // position the brick
      var position = {
        x: this.columnWidth * colPosition.col,
        y: colPosition.y
      };
      // apply setHeight to necessary columns
      var setHeight = colPosition.y + item.size.outerHeight;
      var setMax = colSpan + colPosition.col;
      for ( var i = colPosition.col; i < setMax; i++ ) {
        this.colYs[i] = setHeight;
      }

      return position;
    };

    proto._getTopColPosition = function( colSpan ) {
      var colGroup = this._getTopColGroup( colSpan );
      // get the minimum Y value from the columns
      var minimumY = Math.min.apply( Math, colGroup );

      return {
        col: colGroup.indexOf( minimumY ),
        y: minimumY,
      };
    };

    /**
     * @param {Number} colSpan - number of columns the element spans
     * @returns {Array} colGroup
     */
    proto._getTopColGroup = function( colSpan ) {
      if ( colSpan < 2 ) {
        // if brick spans only one column, use all the column Ys
        return this.colYs;
      }

      var colGroup = [];
      // how many different places could this brick fit horizontally
      var groupCount = this.cols + 1 - colSpan;
      // for each group potential horizontal position
      for ( var i = 0; i < groupCount; i++ ) {
        colGroup[i] = this._getColGroupY( i, colSpan );
      }
      return colGroup;
    };

    proto._getColGroupY = function( col, colSpan ) {
      if ( colSpan < 2 ) {
        return this.colYs[ col ];
      }
      // make an array of colY values for that one group
      var groupColYs = this.colYs.slice( col, col + colSpan );
      // and get the max value of the array
      return Math.max.apply( Math, groupColYs );
    };

    // get column position based on horizontal index. #873
    proto._getHorizontalColPosition = function( colSpan, item ) {
      var col = this.horizontalColIndex % this.cols;
      var isOver = colSpan > 1 && col + colSpan > this.cols;
      // shift to next row if item can't fit on current row
      col = isOver ? 0 : col;
      // don't let zero-size items take up space
      var hasSize = item.size.outerWidth && item.size.outerHeight;
      this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;

      return {
        col: col,
        y: this._getColGroupY( col, colSpan ),
      };
    };

    proto._manageStamp = function( stamp ) {
      var stampSize = getSize( stamp );
      var offset = this._getElementOffset( stamp );
      // get the columns that this stamp affects
      var isOriginLeft = this._getOption('originLeft');
      var firstX = isOriginLeft ? offset.left : offset.right;
      var lastX = firstX + stampSize.outerWidth;
      var firstCol = Math.floor( firstX / this.columnWidth );
      firstCol = Math.max( 0, firstCol );
      var lastCol = Math.floor( lastX / this.columnWidth );
      // lastCol should not go over if multiple of columnWidth #425
      lastCol -= lastX % this.columnWidth ? 0 : 1;
      lastCol = Math.min( this.cols - 1, lastCol );
      // set colYs to bottom of the stamp

      var isOriginTop = this._getOption('originTop');
      var stampMaxY = ( isOriginTop ? offset.top : offset.bottom ) +
        stampSize.outerHeight;
      for ( var i = firstCol; i <= lastCol; i++ ) {
        this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
      }
    };

    proto._getContainerSize = function() {
      this.maxY = Math.max.apply( Math, this.colYs );
      var size = {
        height: this.maxY
      };

      if ( this._getOption('fitWidth') ) {
        size.width = this._getContainerFitWidth();
      }

      return size;
    };

    proto._getContainerFitWidth = function() {
      var unusedCols = 0;
      // count unused columns
      var i = this.cols;
      while ( --i ) {
        if ( this.colYs[i] !== 0 ) {
          break;
        }
        unusedCols++;
      }
      // fit container to columns that have been used
      return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
    };

    proto.needsResizeLayout = function() {
      var previousWidth = this.containerWidth;
      this.getContainerWidth();
      return previousWidth != this.containerWidth;
    };

    return Masonry;

  }));
  });

  var masonry$1 = createCommonjsModule(function (module) {
  /*!
   * Masonry layout mode
   * sub-classes Masonry
   * https://masonry.desandro.com
   */

  ( function( window, factory ) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (  module.exports ) {
      // CommonJS
      module.exports = factory(
        layoutMode,
        masonry
      );
    } else {
      // browser global
      factory(
        window.Isotope.LayoutMode,
        window.Masonry
      );
    }

  }( window, function factory( LayoutMode, Masonry ) {

  // -------------------------- masonryDefinition -------------------------- //

    // create an Outlayer layout class
    var MasonryMode = LayoutMode.create('masonry');

    var proto = MasonryMode.prototype;

    var keepModeMethods = {
      _getElementOffset: true,
      layout: true,
      _getMeasurement: true
    };

    // inherit Masonry prototype
    for ( var method in Masonry.prototype ) {
      // do not inherit mode methods
      if ( !keepModeMethods[ method ] ) {
        proto[ method ] = Masonry.prototype[ method ];
      }
    }

    var measureColumns = proto.measureColumns;
    proto.measureColumns = function() {
      // set items, used if measuring first item
      this.items = this.isotope.filteredItems;
      measureColumns.call( this );
    };

    // point to mode options for fitWidth
    var _getOption = proto._getOption;
    proto._getOption = function( option ) {
      if ( option == 'fitWidth' ) {
        return this.options.isFitWidth !== undefined ?
          this.options.isFitWidth : this.options.fitWidth;
      }
      return _getOption.apply( this.isotope, arguments );
    };

    return MasonryMode;

  }));
  });

  var fitRows = createCommonjsModule(function (module, exports) {
  /**
   * fitRows layout mode
   */

  ( function( window, factory ) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    {
      // CommonJS
      module.exports = factory(
        layoutMode
      );
    }

  }( window, function factory( LayoutMode ) {

  var FitRows = LayoutMode.create('fitRows');

  var proto = FitRows.prototype;

  proto._resetLayout = function() {
    this.x = 0;
    this.y = 0;
    this.maxY = 0;
    this._getMeasurement( 'gutter', 'outerWidth' );
  };

  proto._getItemLayoutPosition = function( item ) {
    item.getSize();

    var itemWidth = item.size.outerWidth + this.gutter;
    // if this element cannot fit in the current row
    var containerWidth = this.isotope.size.innerWidth + this.gutter;
    if ( this.x !== 0 && itemWidth + this.x > containerWidth ) {
      this.x = 0;
      this.y = this.maxY;
    }

    var position = {
      x: this.x,
      y: this.y
    };

    this.maxY = Math.max( this.maxY, this.y + item.size.outerHeight );
    this.x += itemWidth;

    return position;
  };

  proto._getContainerSize = function() {
    return { height: this.maxY };
  };

  return FitRows;

  }));
  });

  var vertical = createCommonjsModule(function (module) {
  /**
   * vertical layout mode
   */

  ( function( window, factory ) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (  module.exports ) {
      // CommonJS
      module.exports = factory(
        layoutMode
      );
    } else {
      // browser global
      factory(
        window.Isotope.LayoutMode
      );
    }

  }( window, function factory( LayoutMode ) {

  var Vertical = LayoutMode.create( 'vertical', {
    horizontalAlignment: 0
  });

  var proto = Vertical.prototype;

  proto._resetLayout = function() {
    this.y = 0;
  };

  proto._getItemLayoutPosition = function( item ) {
    item.getSize();
    var x = ( this.isotope.size.innerWidth - item.size.outerWidth ) *
      this.options.horizontalAlignment;
    var y = this.y;
    this.y += item.size.outerHeight;
    return { x: x, y: y };
  };

  proto._getContainerSize = function() {
    return { height: this.y };
  };

  return Vertical;

  }));
  });

  var isotope = createCommonjsModule(function (module) {
  /*!
   * Isotope v3.0.6
   *
   * Licensed GPLv3 for open source use
   * or Isotope Commercial License for commercial use
   *
   * https://isotope.metafizzy.co
   * Copyright 2010-2018 Metafizzy
   */

  ( function( window, factory ) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if (  module.exports ) {
      // CommonJS
      module.exports = factory(
        window,
        outlayer,
        getSize,
        matchesSelector,
        utils,
        item$1,
        layoutMode,
        // include default layout modes
        masonry$1,
        fitRows,
        vertical
      );
    } else {
      // browser global
      window.Isotope = factory(
        window,
        window.Outlayer,
        window.getSize,
        window.matchesSelector,
        window.fizzyUIUtils,
        window.Isotope.Item,
        window.Isotope.LayoutMode
      );
    }

  }( window, function factory( window, Outlayer, getSize, matchesSelector, utils,
    Item, LayoutMode ) {

  // -------------------------- vars -------------------------- //

  var jQuery = window.jQuery;

  // -------------------------- helpers -------------------------- //

  var trim = String.prototype.trim ?
    function( str ) {
      return str.trim();
    } :
    function( str ) {
      return str.replace( /^\s+|\s+$/g, '' );
    };

  // -------------------------- isotopeDefinition -------------------------- //

    // create an Outlayer layout class
    var Isotope = Outlayer.create( 'isotope', {
      layoutMode: 'masonry',
      isJQueryFiltering: true,
      sortAscending: true
    });

    Isotope.Item = Item;
    Isotope.LayoutMode = LayoutMode;

    var proto = Isotope.prototype;

    proto._create = function() {
      this.itemGUID = 0;
      // functions that sort items
      this._sorters = {};
      this._getSorters();
      // call super
      Outlayer.prototype._create.call( this );

      // create layout modes
      this.modes = {};
      // start filteredItems with all items
      this.filteredItems = this.items;
      // keep of track of sortBys
      this.sortHistory = [ 'original-order' ];
      // create from registered layout modes
      for ( var name in LayoutMode.modes ) {
        this._initLayoutMode( name );
      }
    };

    proto.reloadItems = function() {
      // reset item ID counter
      this.itemGUID = 0;
      // call super
      Outlayer.prototype.reloadItems.call( this );
    };

    proto._itemize = function() {
      var items = Outlayer.prototype._itemize.apply( this, arguments );
      // assign ID for original-order
      for ( var i=0; i < items.length; i++ ) {
        var item = items[i];
        item.id = this.itemGUID++;
      }
      this._updateItemsSortData( items );
      return items;
    };


    // -------------------------- layout -------------------------- //

    proto._initLayoutMode = function( name ) {
      var Mode = LayoutMode.modes[ name ];
      // set mode options
      // HACK extend initial options, back-fill in default options
      var initialOpts = this.options[ name ] || {};
      this.options[ name ] = Mode.options ?
        utils.extend( Mode.options, initialOpts ) : initialOpts;
      // init layout mode instance
      this.modes[ name ] = new Mode( this );
    };


    proto.layout = function() {
      // if first time doing layout, do all magic
      if ( !this._isLayoutInited && this._getOption('initLayout') ) {
        this.arrange();
        return;
      }
      this._layout();
    };

    // private method to be used in layout() & magic()
    proto._layout = function() {
      // don't animate first layout
      var isInstant = this._getIsInstant();
      // layout flow
      this._resetLayout();
      this._manageStamps();
      this.layoutItems( this.filteredItems, isInstant );

      // flag for initalized
      this._isLayoutInited = true;
    };

    // filter + sort + layout
    proto.arrange = function( opts ) {
      // set any options pass
      this.option( opts );
      this._getIsInstant();
      // filter, sort, and layout

      // filter
      var filtered = this._filter( this.items );
      this.filteredItems = filtered.matches;

      this._bindArrangeComplete();

      if ( this._isInstant ) {
        this._noTransition( this._hideReveal, [ filtered ] );
      } else {
        this._hideReveal( filtered );
      }

      this._sort();
      this._layout();
    };
    // alias to _init for main plugin method
    proto._init = proto.arrange;

    proto._hideReveal = function( filtered ) {
      this.reveal( filtered.needReveal );
      this.hide( filtered.needHide );
    };

    // HACK
    // Don't animate/transition first layout
    // Or don't animate/transition other layouts
    proto._getIsInstant = function() {
      var isLayoutInstant = this._getOption('layoutInstant');
      var isInstant = isLayoutInstant !== undefined ? isLayoutInstant :
        !this._isLayoutInited;
      this._isInstant = isInstant;
      return isInstant;
    };

    // listen for layoutComplete, hideComplete and revealComplete
    // to trigger arrangeComplete
    proto._bindArrangeComplete = function() {
      // listen for 3 events to trigger arrangeComplete
      var isLayoutComplete, isHideComplete, isRevealComplete;
      var _this = this;
      function arrangeParallelCallback() {
        if ( isLayoutComplete && isHideComplete && isRevealComplete ) {
          _this.dispatchEvent( 'arrangeComplete', null, [ _this.filteredItems ] );
        }
      }
      this.once( 'layoutComplete', function() {
        isLayoutComplete = true;
        arrangeParallelCallback();
      });
      this.once( 'hideComplete', function() {
        isHideComplete = true;
        arrangeParallelCallback();
      });
      this.once( 'revealComplete', function() {
        isRevealComplete = true;
        arrangeParallelCallback();
      });
    };

    // -------------------------- filter -------------------------- //

    proto._filter = function( items ) {
      var filter = this.options.filter;
      filter = filter || '*';
      var matches = [];
      var hiddenMatched = [];
      var visibleUnmatched = [];

      var test = this._getFilterTest( filter );

      // test each item
      for ( var i=0; i < items.length; i++ ) {
        var item = items[i];
        if ( item.isIgnored ) {
          continue;
        }
        // add item to either matched or unmatched group
        var isMatched = test( item );
        // item.isFilterMatched = isMatched;
        // add to matches if its a match
        if ( isMatched ) {
          matches.push( item );
        }
        // add to additional group if item needs to be hidden or revealed
        if ( isMatched && item.isHidden ) {
          hiddenMatched.push( item );
        } else if ( !isMatched && !item.isHidden ) {
          visibleUnmatched.push( item );
        }
      }

      // return collections of items to be manipulated
      return {
        matches: matches,
        needReveal: hiddenMatched,
        needHide: visibleUnmatched
      };
    };

    // get a jQuery, function, or a matchesSelector test given the filter
    proto._getFilterTest = function( filter ) {
      if ( jQuery && this.options.isJQueryFiltering ) {
        // use jQuery
        return function( item ) {
          return jQuery( item.element ).is( filter );
        };
      }
      if ( typeof filter == 'function' ) {
        // use filter as function
        return function( item ) {
          return filter( item.element );
        };
      }
      // default, use filter as selector string
      return function( item ) {
        return matchesSelector( item.element, filter );
      };
    };

    // -------------------------- sorting -------------------------- //

    /**
     * @params {Array} elems
     * @public
     */
    proto.updateSortData = function( elems ) {
      // get items
      var items;
      if ( elems ) {
        elems = utils.makeArray( elems );
        items = this.getItems( elems );
      } else {
        // update all items if no elems provided
        items = this.items;
      }

      this._getSorters();
      this._updateItemsSortData( items );
    };

    proto._getSorters = function() {
      var getSortData = this.options.getSortData;
      for ( var key in getSortData ) {
        var sorter = getSortData[ key ];
        this._sorters[ key ] = mungeSorter( sorter );
      }
    };

    /**
     * @params {Array} items - of Isotope.Items
     * @private
     */
    proto._updateItemsSortData = function( items ) {
      // do not update if no items
      var len = items && items.length;

      for ( var i=0; len && i < len; i++ ) {
        var item = items[i];
        item.updateSortData();
      }
    };

    // ----- munge sorter ----- //

    // encapsulate this, as we just need mungeSorter
    // other functions in here are just for munging
    var mungeSorter = ( function() {
      // add a magic layer to sorters for convienent shorthands
      // `.foo-bar` will use the text of .foo-bar querySelector
      // `[foo-bar]` will use attribute
      // you can also add parser
      // `.foo-bar parseInt` will parse that as a number
      function mungeSorter( sorter ) {
        // if not a string, return function or whatever it is
        if ( typeof sorter != 'string' ) {
          return sorter;
        }
        // parse the sorter string
        var args = trim( sorter ).split(' ');
        var query = args[0];
        // check if query looks like [an-attribute]
        var attrMatch = query.match( /^\[(.+)\]$/ );
        var attr = attrMatch && attrMatch[1];
        var getValue = getValueGetter( attr, query );
        // use second argument as a parser
        var parser = Isotope.sortDataParsers[ args[1] ];
        // parse the value, if there was a parser
        sorter = parser ? function( elem ) {
          return elem && parser( getValue( elem ) );
        } :
        // otherwise just return value
        function( elem ) {
          return elem && getValue( elem );
        };

        return sorter;
      }

      // get an attribute getter, or get text of the querySelector
      function getValueGetter( attr, query ) {
        // if query looks like [foo-bar], get attribute
        if ( attr ) {
          return function getAttribute( elem ) {
            return elem.getAttribute( attr );
          };
        }

        // otherwise, assume its a querySelector, and get its text
        return function getChildText( elem ) {
          var child = elem.querySelector( query );
          return child && child.textContent;
        };
      }

      return mungeSorter;
    })();

    // parsers used in getSortData shortcut strings
    Isotope.sortDataParsers = {
      'parseInt': function( val ) {
        return parseInt( val, 10 );
      },
      'parseFloat': function( val ) {
        return parseFloat( val );
      }
    };

    // ----- sort method ----- //

    // sort filteredItem order
    proto._sort = function() {
      if ( !this.options.sortBy ) {
        return;
      }
      // keep track of sortBy History
      var sortBys = utils.makeArray( this.options.sortBy );
      if ( !this._getIsSameSortBy( sortBys ) ) {
        // concat all sortBy and sortHistory, add to front, oldest goes in last
        this.sortHistory = sortBys.concat( this.sortHistory );
      }
      // sort magic
      var itemSorter = getItemSorter( this.sortHistory, this.options.sortAscending );
      this.filteredItems.sort( itemSorter );
    };

    // check if sortBys is same as start of sortHistory
    proto._getIsSameSortBy = function( sortBys ) {
      for ( var i=0; i < sortBys.length; i++ ) {
        if ( sortBys[i] != this.sortHistory[i] ) {
          return false;
        }
      }
      return true;
    };

    // returns a function used for sorting
    function getItemSorter( sortBys, sortAsc ) {
      return function sorter( itemA, itemB ) {
        // cycle through all sortKeys
        for ( var i = 0; i < sortBys.length; i++ ) {
          var sortBy = sortBys[i];
          var a = itemA.sortData[ sortBy ];
          var b = itemB.sortData[ sortBy ];
          if ( a > b || a < b ) {
            // if sortAsc is an object, use the value given the sortBy key
            var isAscending = sortAsc[ sortBy ] !== undefined ? sortAsc[ sortBy ] : sortAsc;
            var direction = isAscending ? 1 : -1;
            return ( a > b ? 1 : -1 ) * direction;
          }
        }
        return 0;
      };
    }

    // -------------------------- methods -------------------------- //

    // get layout mode
    proto._mode = function() {
      var layoutMode = this.options.layoutMode;
      var mode = this.modes[ layoutMode ];
      if ( !mode ) {
        // TODO console.error
        throw new Error( 'No layout mode: ' + layoutMode );
      }
      // HACK sync mode's options
      // any options set after init for layout mode need to be synced
      mode.options = this.options[ layoutMode ];
      return mode;
    };

    proto._resetLayout = function() {
      // trigger original reset layout
      Outlayer.prototype._resetLayout.call( this );
      this._mode()._resetLayout();
    };

    proto._getItemLayoutPosition = function( item  ) {
      return this._mode()._getItemLayoutPosition( item );
    };

    proto._manageStamp = function( stamp ) {
      this._mode()._manageStamp( stamp );
    };

    proto._getContainerSize = function() {
      return this._mode()._getContainerSize();
    };

    proto.needsResizeLayout = function() {
      return this._mode().needsResizeLayout();
    };

    // -------------------------- adding & removing -------------------------- //

    // HEADS UP overwrites default Outlayer appended
    proto.appended = function( elems ) {
      var items = this.addItems( elems );
      if ( !items.length ) {
        return;
      }
      // filter, layout, reveal new items
      var filteredItems = this._filterRevealAdded( items );
      // add to filteredItems
      this.filteredItems = this.filteredItems.concat( filteredItems );
    };

    // HEADS UP overwrites default Outlayer prepended
    proto.prepended = function( elems ) {
      var items = this._itemize( elems );
      if ( !items.length ) {
        return;
      }
      // start new layout
      this._resetLayout();
      this._manageStamps();
      // filter, layout, reveal new items
      var filteredItems = this._filterRevealAdded( items );
      // layout previous items
      this.layoutItems( this.filteredItems );
      // add to items and filteredItems
      this.filteredItems = filteredItems.concat( this.filteredItems );
      this.items = items.concat( this.items );
    };

    proto._filterRevealAdded = function( items ) {
      var filtered = this._filter( items );
      this.hide( filtered.needHide );
      // reveal all new items
      this.reveal( filtered.matches );
      // layout new items, no transition
      this.layoutItems( filtered.matches, true );
      return filtered.matches;
    };

    /**
     * Filter, sort, and layout newly-appended item elements
     * @param {Array or NodeList or Element} elems
     */
    proto.insert = function( elems ) {
      var items = this.addItems( elems );
      if ( !items.length ) {
        return;
      }
      // append item elements
      var i, item;
      var len = items.length;
      for ( i=0; i < len; i++ ) {
        item = items[i];
        this.element.appendChild( item.element );
      }
      // filter new stuff
      var filteredInsertItems = this._filter( items ).matches;
      // set flag
      for ( i=0; i < len; i++ ) {
        items[i].isLayoutInstant = true;
      }
      this.arrange();
      // reset flag
      for ( i=0; i < len; i++ ) {
        delete items[i].isLayoutInstant;
      }
      this.reveal( filteredInsertItems );
    };

    var _remove = proto.remove;
    proto.remove = function( elems ) {
      elems = utils.makeArray( elems );
      var removeItems = this.getItems( elems );
      // do regular thing
      _remove.call( this, elems );
      // bail if no items to remove
      var len = removeItems && removeItems.length;
      // remove elems from filteredItems
      for ( var i=0; len && i < len; i++ ) {
        var item = removeItems[i];
        // remove item from collection
        utils.removeFrom( this.filteredItems, item );
      }
    };

    proto.shuffle = function() {
      // update random sortData
      for ( var i=0; i < this.items.length; i++ ) {
        var item = this.items[i];
        item.sortData.random = Math.random();
      }
      this.options.sortBy = 'random';
      this._sort();
      this._layout();
    };

    /**
     * trigger fn without transition
     * kind of hacky to have this in the first place
     * @param {Function} fn
     * @param {Array} args
     * @returns ret
     * @private
     */
    proto._noTransition = function( fn, args ) {
      // save transitionDuration before disabling
      var transitionDuration = this.options.transitionDuration;
      // disable transition
      this.options.transitionDuration = 0;
      // do it
      var returnValue = fn.apply( this, args );
      // re-enable transition for reveal
      this.options.transitionDuration = transitionDuration;
      return returnValue;
    };

    // ----- helper methods ----- //

    /**
     * getter method for getting filtered item elements
     * @returns {Array} elems - collection of item elements
     */
    proto.getFilteredItemElements = function() {
      return this.filteredItems.map( function( item ) {
        return item.element;
      });
    };

    // -----  ----- //

    return Isotope;

  }));
  });

  var mrIsotope = function ($) {
    /**
     * Check for isotope dependency
     * isotope - https://github.com/metafizzy/isotope
     */
    if (typeof isotope === 'undefined') {
      throw new Error('mrIsotope requires isotope.pkgd.js (https://github.com/metafizzy/isotope)');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrIsotope';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.isotope';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Css = {
      ACTIVE: 'active'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      FILTER_CLICK: 'click touchstart',
      SORTER_CLICK: 'click touchstart'
    };
    var Options = {
      DEFAULT_LAYOUT: 'masonry',
      ORIGINAL_ORDER: 'original-order'
    };
    var Selector = {
      FILTER_INITIALISED: '.js-filter-inited',
      DATA_ATTR: 'isotope',
      ISOTOPE_ID: 'data-isotope-id',
      DATA_ISOTOPE_COLLECTION: '[data-isotope-collection]',
      DATA_ISOTOPE_ITEM: '[data-isotope-item]',
      DATA_ISOTOPE_FILTERS: '[data-isotope-filters]',
      DATA_ISOTOPE_SORTERS: '[data-isotope-sorters]',
      CATEGORY: 'data-category',
      FILTER: 'data-filter',
      SORTER: 'data-sort',
      PRIMARY_SORTER: 'data-primary-sort',
      SECOND_SORTER: 'data-secondary-sort',
      SORT_SELECTOR: 'data-sort-selector',
      DATA_CATEGORY: '[data-category]',
      SORT_ASCENDING: 'data-sort-ascending',
      FILTER_ALL: '*'
    }; // returns a selector string for filterable elements matching the provided category

    function getCategoryFilter(filterBy) {
      return filterBy && filterBy !== Selector.FILTER_ALL ? "[" + Selector.CATEGORY + "*=\"" + filterBy + "\"]" : Selector.FILTER_ALL;
    } // returns a nodelist of all filter links matching the provided isotope ID


    function getFilters(isotopeId, exclude) {
      var excludeSelector = exclude ? ":not(" + exclude + ")" : '';
      var filters = document.querySelectorAll(Selector.DATA_ISOTOPE_FILTERS + "[" + Selector.ISOTOPE_ID + "=\"" + isotopeId + "\"] [" + Selector.FILTER + "]" + excludeSelector);
      return filters;
    } // returns a nodelist of all sorter links matching the provided isotope ID


    function getSorters(isotopeId) {
      return document.querySelectorAll(Selector.DATA_ISOTOPE_SORTERS + "[" + Selector.ISOTOPE_ID + "=\"" + isotopeId + "\"] [" + Selector.SORTER + "][" + Selector.SORT_SELECTOR + "],\n      " + Selector.DATA_ISOTOPE_SORTERS + "[" + Selector.ISOTOPE_ID + "=\"" + isotopeId + "\"] [" + Selector.SORTER + "][" + Selector.PRIMARY_SORTER + "][" + Selector.SECOND_SORTER + "]");
    } // returns a nodelist of all sorter links matching the provided sort value


    function getSorter(isotopeId, sortValue) {
      return document.querySelectorAll(Selector.DATA_ISOTOPE_SORTERS + "[" + Selector.ISOTOPE_ID + "=\"" + isotopeId + "\"] [" + Selector.SORTER + "=\"" + sortValue + "\"]");
    } // returns a nodelist of all filter links matching the provided filter value


    function getFilter(isotopeId, filter) {
      return document.querySelectorAll(Selector.DATA_ISOTOPE_FILTERS + "[" + Selector.ISOTOPE_ID + "=\"" + isotopeId + "\"] [" + Selector.FILTER + "=\"" + filter + "\"]");
    } // sets active class of provided elements on or off


    function toggleActive(filters, active) {
      if (filters) {
        mrUtil.forEach(filters, function (index, filter) {
          if (filter && typeof filter.classList !== typeof undefined) {
            if (active) {
              filter.classList.add(Css.ACTIVE);
            } else {
              filter.classList.remove(Css.ACTIVE);
            }
          }
        });
      }
    }
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */


    var IsotopeWrapper =
    /*#__PURE__*/
    function () {
      function IsotopeWrapper(element) {
        var $element = $(element);
        var attributes = $element.data();
        this.element = element;
        this.attributes = attributes;
        this.filters = {};
        this.sorters = {};
        this.activeFilter = null;
        this.activeSorter = null;
        this.isotope = null;
        this.options = {};
        this.options.getSortData = {};
        this.options.sortAscending = {};
        this.initIsotope();
        this.initSorters();
        this.initFilters();
      } // getters


      var _proto = IsotopeWrapper.prototype;

      _proto.initFilters = function initFilters() {
        var _this = this;

        // Get all filter links
        var filters = getFilters(this.attributes.isotopeId, Selector.FILTER_INITIALISED);
        mrUtil.forEach(filters, function (index, filter) {
          var filterValue = filter.attributes[Selector.FILTER] && filter.attributes[Selector.FILTER].value; // Find all other filters matching this value to be de/activated on click

          _this.filters[filterValue] = getFilter(_this.attributes.isotopeId, filterValue); // Set up filter click event

          $(filter).on(Event.FILTER_CLICK, function (event) {
            if (event.preventDefault) {
              event.preventDefault();
            } // Activate appropriate links


            toggleActive(_this.activeFilter, false);
            toggleActive(_this.filters[filterValue], true);
            _this.activeFilter = filters; // Get selectorified filter value unless value is '*' (* does not need to be a selector)

            _this.options.filter = filterValue === '*' ? filterValue : getCategoryFilter(filterValue); // Update isotope with current filter settings

            _this.isotope.arrange(_this.options);
          }); // Add FILTER_INITIALISED class
          // just to make distinguishing old and new filters easier

          filter.classList.add(Selector.FILTER_INITIALISED);
        });
      };

      _proto.initSorters = function initSorters() {
        var _this2 = this;

        // Get all sorters linked to current isotope-id
        var sorters = getSorters(this.attributes.isotopeId);
        var defaultSort = this.attributes.defaultSort || Options.ORIGINAL_ORDER;
        mrUtil.forEach(sorters, function (index, sorter) {
          // Get options from attributes
          // Done this way for brevity (previous way was too wordy)
          var sa = sorter.attributes;
          var ss = sa[Selector.SORTER];
          var ssel = sa[Selector.SORT_SELECTOR];
          var asc = sa[Selector.SORT_ASCENDING];
          var pri = sa[Selector.PRIMARY_SORTER];
          var sec = sa[Selector.SECOND_SORTER]; // Extract options from attributes

          var sortValue = ss && ss.value;
          var sortSelector = ssel && ssel.value; // If secondSort is set, pass in an array rather than a single sort value

          var arraySort = pri && pri.value && sec && sec.value ? [pri.value, sec.value] : null;
          var sortAscending = !(asc && asc.value && asc.value === 'false'); // Store list of other sorters matching this value to be de/activated on click

          _this2.sorters[sortValue] = getSorter(_this2.attributes.isotopeId, sortValue); // Set up sorters click event for this one sorter

          $(sorter).on(Event.SORTER_CLICK, function (event) {
            if (event.preventDefault) {
              event.preventDefault();
            } // Switch active class on sorter links


            toggleActive(_this2.activeSorter, false);
            toggleActive(_this2.sorters[sortValue], true);
            _this2.activeSorter = _this2.sorters[sortValue]; // Pass in the arraySort (primary/secondary) array if it exists
            // otherwise use clicked sortValue

            _this2.options.sortBy = arraySort || sortValue; // Update isotope with curent options

            _this2.isotope.arrange(_this2.options);
          }); // Set sortAscending object with current sortAscending value

          _this2.options.sortAscending[sortValue] = sortAscending; // Only set sortData in isotope if this is a unique sorting ID, not for
          // array sorts (primary/secondary) as they simply use an array to
          // reference existing sort configs

          if (sortValue !== Options.ORIGINAL_ORDER && !arraySort) {
            // Set the sort object in isotope options (will be reinitialised later)
            // Won't be added as a new sortData entry if secondSort is active
            _this2.options.getSortData[sortValue] = sortSelector;
          }
        }); // Set sorting order to default if it exists

        this.options.sortBy = defaultSort; // Set default sorter to active

        this.activeSorter = getSorter(this.attributes.isotopeId, defaultSort);
        toggleActive(this.activeSorter, true); // Update isotope with collected sorter data

        this.isotope.updateSortData(); // Update isotope with current sort options

        this.isotope.arrange(this.options);
      };

      _proto.initIsotope = function initIsotope() {
        // Get hash filter from URL
        var hashFilter = window.location.hash.replace('#', '');
        hashFilter = hashFilter !== '' && !this.attributes.ignoreHash ? hashFilter : null; // Determine default filter

        var defaultFilter = hashFilter || this.attributes.defaultFilter || Selector.FILTER_ALL;
        var defaultFilterSelector = getCategoryFilter(defaultFilter); // Default to true, unless found to be explicitly false

        var defaultSortAscending = !this.attributes.sortAscending === false; // Setup initial config

        this.options.itemSelector = Selector.DATA_ISOTOPE_ITEM;
        this.options.layoutMode = this.attributes.layoutMode || Options.DEFAULT_LAYOUT;
        this.options.filter = defaultFilterSelector;
        this.options.sortAscending[Options.ORIGINAL_ORDER] = defaultSortAscending;
        this.isotope = new isotope(this.element, this.options);
        this.activeFilter = getFilter(this.attributes.isotopeId, defaultFilter);
        toggleActive(this.activeFilter, true);
      };

      IsotopeWrapper.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachIsotope() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new IsotopeWrapper(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(IsotopeWrapper, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return IsotopeWrapper;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      var isotopeElements = $.makeArray($(Selector.DATA_ISOTOPE_COLLECTION));
      /* eslint-disable no-plusplus */

      for (var i = isotopeElements.length; i--;) {
        var $isotope = $(isotopeElements[i]);
        IsotopeWrapper.jQueryInterface.call($isotope, $isotope.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = IsotopeWrapper.jQueryInterface;
    $.fn[NAME].Constructor = IsotopeWrapper;

    $.fn[NAME].noConflict = function IsotopeWrapperNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return IsotopeWrapper.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return IsotopeWrapper;
  }(jQuery$1);

  //

  (function ($) {
    if (typeof jarallax$1 === 'function') {
      $('.alert-dismissible').on('closed.bs.alert', function () {
        jarallax$1(document.querySelectorAll('[data-jarallax],[data-jarallax-video]'), 'onScroll');
      });
      $(document).on('resized.mr.overlayNav', function () {
        jarallax$1(document.querySelectorAll('[data-jarallax],[data-jarallax-video]'), 'onResize');
      });
      document.addEventListener('injected.mr.SVGInjector', function () {
        jarallax$1(document.querySelectorAll('[data-jarallax],[data-jarallax-video]'), 'onResize');
      });
      var jarallaxOptions = {
        disableParallax: /iPad|iPhone|iPod|Android/,
        disableVideo: /iPad|iPhone|iPod|Android/
      };
      $(window).on('load', function () {
        jarallax$1(document.querySelectorAll('[data-jarallax]'), jarallaxOptions);
        var jarallaxDelay = document.querySelectorAll('[data-jarallax-video-delay]');
        mrUtil.forEach(jarallaxDelay, function (index, elem) {
          var source = elem.getAttribute('data-jarallax-video-delay');
          elem.removeAttribute('data-jarallax-video-delay');
          elem.setAttribute('data-jarallax-video', source);
        });
        jarallax$1(document.querySelectorAll('[data-jarallax-delay],[data-jarallax-video]'), jarallaxOptions);
      });
    }
  })(jQuery$1);

  var mrMapStyle = [{
    featureType: 'administrative.country',
    elementType: 'labels.text',
    stylers: [{
      lightness: '29'
    }]
  }, {
    featureType: 'administrative.province',
    elementType: 'labels.text.fill',
    stylers: [{
      lightness: '-12'
    }, {
      color: '#796340'
    }]
  }, {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{
      lightness: '15'
    }, {
      saturation: '15'
    }]
  }, {
    featureType: 'landscape.man_made',
    elementType: 'geometry',
    stylers: [{
      visibility: 'on'
    }, {
      color: '#fbf5ed'
    }]
  }, {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{
      visibility: 'on'
    }, {
      color: '#fbf5ed'
    }]
  }, {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{
      visibility: 'off'
    }]
  }, {
    featureType: 'poi.attraction',
    elementType: 'all',
    stylers: [{
      visibility: 'on'
    }, {
      lightness: '30'
    }, {
      saturation: '-41'
    }, {
      gamma: '0.84'
    }]
  }, {
    featureType: 'poi.attraction',
    elementType: 'labels',
    stylers: [{
      visibility: 'on'
    }]
  }, {
    featureType: 'poi.business',
    elementType: 'all',
    stylers: [{
      visibility: 'off'
    }]
  }, {
    featureType: 'poi.business',
    elementType: 'labels',
    stylers: [{
      visibility: 'off'
    }]
  }, {
    featureType: 'poi.medical',
    elementType: 'geometry',
    stylers: [{
      color: '#fbd3da'
    }]
  }, {
    featureType: 'poi.medical',
    elementType: 'labels',
    stylers: [{
      visibility: 'on'
    }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{
      color: '#b0e9ac'
    }, {
      visibility: 'on'
    }]
  }, {
    featureType: 'poi.park',
    elementType: 'labels',
    stylers: [{
      visibility: 'on'
    }]
  }, {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{
      hue: '#68ff00'
    }, {
      lightness: '-24'
    }, {
      gamma: '1.59'
    }]
  }, {
    featureType: 'poi.sports_complex',
    elementType: 'all',
    stylers: [{
      visibility: 'on'
    }]
  }, {
    featureType: 'poi.sports_complex',
    elementType: 'geometry',
    stylers: [{
      saturation: '10'
    }, {
      color: '#c3eb9a'
    }]
  }, {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{
      visibility: 'on'
    }, {
      lightness: '30'
    }, {
      color: '#e7ded6'
    }]
  }, {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{
      visibility: 'on'
    }, {
      saturation: '-39'
    }, {
      lightness: '28'
    }, {
      gamma: '0.86'
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{
      color: '#ffe523'
    }, {
      visibility: 'on'
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{
      visibility: 'on'
    }, {
      saturation: '0'
    }, {
      gamma: '1.44'
    }, {
      color: '#fbc28b'
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [{
      visibility: 'on'
    }, {
      saturation: '-40'
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{
      color: '#fed7a5'
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [{
      visibility: 'on'
    }, {
      gamma: '1.54'
    }, {
      color: '#fbe38b'
    }]
  }, {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [{
      color: '#ffffff'
    }, {
      visibility: 'on'
    }, {
      gamma: '2.62'
    }, {
      lightness: '10'
    }]
  }, {
    featureType: 'road.local',
    elementType: 'geometry.stroke',
    stylers: [{
      visibility: 'on'
    }, {
      weight: '0.50'
    }, {
      gamma: '1.04'
    }]
  }, {
    featureType: 'transit.station.airport',
    elementType: 'geometry.fill',
    stylers: [{
      color: '#dee3fb'
    }]
  }, {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{
      saturation: '46'
    }, {
      color: '#a4e1ff'
    }]
  }];

  var mrMaps = function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'mrMaps';
    var VERSION = '1.1.0';
    var DATA_KEY = 'mr.maps';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
      MAP: '[data-maps-api-key]',
      MARKER: 'div.map-marker',
      STYLE: 'div.map-style',
      MARKER_ADDRESS: 'data-address',
      MARKER_LATLNG: 'data-latlong',
      MARKER_IMAGE: 'data-marker-image',
      MARKER_TITLE: 'data-marker-title',
      INFOWindow: 'div.info-window'
    };
    var String = {
      MARKER_TITLE: ''
    };
    var Event = {
      MAP_LOADED: "loaded" + EVENT_KEY
    };
    var Default = {
      MARKER_IMAGE_URL: 'assets/img/map-marker.png',
      MAP: {
        disableDefaultUI: true,
        draggable: true,
        scrollwheel: false,
        zoom: 17,
        zoomControl: false
      }
    }; // mrMapStyle should be defined in a js file included prior to maps.js
    // The data should be an array of style overrides as per snazzymaps.com.

    Default.MAP.styles = typeof mrMapStyle !== typeof undefined ? mrMapStyle : undefined;
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Map =
    /*#__PURE__*/
    function () {
      function Map(element) {
        // The current map element
        this.element = element;
        this.$element = $(element);
        this.markers = [];
        this.geocoder = new google.maps.Geocoder();
        this.markerElements = this.$element.find(Selector.MARKER);
        this.styleElement = this.$element.find(Selector.STYLE).first();
        this.initMap();
        this.createMarkers();
      } // version getter


      Map.init = function init() {
        var mapsOnPage = $.makeArray($(Selector.MAP));
        /* eslint-disable no-plusplus */

        for (var i = mapsOnPage.length; i--;) {
          var $map = $(mapsOnPage[i]);
          Map.jQueryInterface.call($map, $map.data());
        }
      };

      var _proto = Map.prototype;

      _proto.initMap = function initMap() {
        var _this = this;

        var mapElement = this.element;
        var mapInstance = this.$element;
        var showZoomControl = typeof mapInstance.attr('data-zoom-controls') !== typeof undefined;
        var zoomControlPos = typeof mapInstance.attr('data-zoom-controls') !== typeof undefined ? mapInstance.attr('data-zoom-controls') : false;
        var latlong = typeof mapInstance.attr('data-latlong') !== typeof undefined ? mapInstance.attr('data-latlong') : false;
        var latitude = latlong ? parseFloat(latlong.substr(0, latlong.indexOf(','))) : false;
        var longitude = latlong ? parseFloat(latlong.substr(latlong.indexOf(',') + 1)) : false;
        var address = mapInstance.attr('data-address') || '';
        var mapOptions = null; // let markerOptions = null;

        var mapAo = {}; // Attribute overrides - allows data attributes on the map to override global options

        try {
          mapAo.styles = this.styleElement.length ? JSON.parse(this.styleElement.html().trim()) : undefined;
        } catch (error) {
          throw new Error(error);
        }

        mapAo.zoom = mapInstance.attr('data-map-zoom') ? parseInt(mapInstance.attr('data-map-zoom'), 10) : undefined;
        mapAo.zoomControl = showZoomControl;
        mapAo.zoomControlOptions = zoomControlPos !== false ? {
          position: google.maps.ControlPosition[zoomControlPos]
        } : undefined;
        mapOptions = jQuery.extend({}, Default.MAP, mapAo);
        this.map = new google.maps.Map(mapElement, mapOptions);
        google.maps.event.addListenerOnce(this.map, 'center_changed', function () {
          // Map has been centered.
          var loadedEvent = $.Event(Event.MAP_LOADED, {
            map: _this.map
          });
          mapInstance.trigger(loadedEvent);
        });

        if (typeof latitude !== typeof undefined && latitude !== '' && latitude !== false && typeof longitude !== typeof undefined && longitude !== '' && longitude !== false) {
          this.map.setCenter(new google.maps.LatLng(latitude, longitude));
        } else if (address !== '') {
          this.geocodeAddress(address, Map.centerMap, this, this.map);
        } else {
          throw new Error('No valid address or latitude/longitude pair provided for map.');
        }
      };

      _proto.geocodeAddress = function geocodeAddress(address, callback, thisMap, args) {
        this.geocoder.geocode({
          address: address
        }, function (results, status) {
          if (status !== google.maps.GeocoderStatus.OK) {
            throw new Error("There was a problem geocoding the address \"" + address + "\".");
          } else {
            callback(results, thisMap, args);
          }
        });
      };

      Map.centerMap = function centerMap(geocodeResults, thisMap) {
        thisMap.map.setCenter(geocodeResults[0].geometry.location);
      };

      Map.moveMarker = function moveMarker(geocodeResults, thisMap, gMarker) {
        gMarker.setPosition(geocodeResults[0].geometry.location);
      };

      _proto.createMarkers = function createMarkers() {
        var _this2 = this;

        Default.MARKER = {
          icon: {
            url: this.$element.attr(Selector.MARKER_IMAGE) || Default.MARKER_IMAGE_URL,
            scaledSize: new google.maps.Size(50, 50)
          },
          title: String.MARKER_TITLE,
          optimised: false
        };
        this.markerElements.each(function (index, marker) {
          var gMarker;
          var $marker = $(marker);
          var markerAddress = $marker.attr(Selector.MARKER_ADDRESS);
          var markerLatLng = $marker.attr(Selector.MARKER_LATLNG);
          var infoWindow = $marker.find(Selector.INFOWindow);
          var markerAo = {
            title: $marker.attr(Selector.MARKER_TITLE)
          };
          markerAo.icon = typeof $marker.attr(Selector.MARKER_IMAGE) !== typeof undefined ? {
            url: $marker.attr(Selector.MARKER_IMAGE),
            scaledSize: new google.maps.Size(50, 50)
          } : undefined;
          var markerOptions = jQuery.extend({}, Default.MARKER, markerAo);
          gMarker = new google.maps.Marker(jQuery.extend({}, markerOptions, {
            map: _this2.map
          }));

          if (infoWindow.length) {
            var gInfoWindow = new google.maps.InfoWindow({
              content: infoWindow.first().html(),
              maxWidth: parseInt(infoWindow.attr('data-max-width') || '250', 10)
            });
            gMarker.addListener('click', function () {
              gInfoWindow.open(_this2.map, gMarker);
            });
          } // Set marker position


          if (markerLatLng) {
            if (/(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/.test(markerLatLng)) {
              gMarker.setPosition(new google.maps.LatLng(parseFloat(markerLatLng.substr(0, markerLatLng.indexOf(','))), parseFloat(markerLatLng.substr(markerLatLng.indexOf(',') + 1))));
              _this2.markers[index] = gMarker;
            }
          } else if (markerAddress) {
            _this2.geocodeAddress(markerAddress, Map.moveMarker, _this2, gMarker);

            _this2.markers[index] = gMarker;
          } else {
            gMarker = null;
            throw new Error("Invalid data-address or data-latlong provided for marker " + (index + 1));
          }
        });
      };

      Map.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachMap() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Map(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(Map, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Map;
    }(); // END Class definition

    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */
    // Load Google MAP API JS with callback to initialise when fully loaded


    if (document.querySelector('[data-maps-api-key]') && !document.querySelector('.gMapsAPI')) {
      if ($('[data-maps-api-key]').length) {
        var apiKey = $('[data-maps-api-key]:first').attr('data-maps-api-key') || '';

        if (apiKey !== '') {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&callback=theme.mrMaps.init";
          script.className = 'gMapsAPI';
          document.body.appendChild(script);
        }
      }
    }
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */


    $.fn[NAME] = Map.jQueryInterface;
    $.fn[NAME].Constructor = Map;

    $.fn[NAME].noConflict = function MapNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Map.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return Map;
  }(jQuery);

  var mrOverlayNav = function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'mrOverlayNav';
    var VERSION = '1.1.0';
    var DATA_KEY = 'mr.overlayNav';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      RESIZE: "resize" + EVENT_KEY,
      RESIZED: "resized" + EVENT_KEY,
      IMAGE_LOAD: 'load',
      TOGGLE_SHOW: 'show.bs.collapse',
      TOGGLE_HIDDEN: 'hidden.bs.collapse',
      NOTIFICATION_CLOSE: '',
      ALERT_CLOSE: 'close.bs.alert'
    };
    var Selector = {
      CONTAINER: 'body > div.navbar-container',
      OVERLAY_NAV: 'body > div.navbar-container > nav[data-overlay]',
      NAV: 'nav',
      OVERLAY_SECTION: '[data-overlay]',
      IMAGE: 'img',
      NAV_TOGGLED: 'navbar-toggled-show'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var OverlayNav =
    /*#__PURE__*/
    function () {
      function OverlayNav(element) {
        this.ticking = false; // Used to debounce resize event

        this.element = element;
        this.navHeight = this.getNavHeight();
        this.navToggled = false;
        this.container = OverlayNav.getContainerElement();
        this.overlayElement = OverlayNav.getFirstOverlayElement();
        this.setImageLoadEvent();
        this.updateValues();
        this.setResizeEvent();
        this.setNavToggleEvents();
      } // getters


      var _proto = OverlayNav.prototype;

      _proto.getNavHeight = function getNavHeight() {
        this.navHeight = this.element.getBoundingClientRect().height;
      };

      _proto.updateValues = function updateValues() {
        this.getNavHeight();
        this.updateContainer();
        this.updateOverlayElement();
        $(this.element).trigger($.Event(Event.RESIZED));
      };

      _proto.updateContainer = function updateContainer() {
        // Don't update min height on the container if the nav is toggled/open.
        if (!this.container || this.navToggled) {
          return;
        }

        this.container.style.minHeight = this.navHeight + "px";
        this.container.style.marginBottom = "-" + this.navHeight + "px";
      };

      _proto.updateOverlayElement = function updateOverlayElement() {
        if (!this.overlayElement || this.navToggled) {
          return;
        }

        this.overlayElement.style.setProperty('padding-top', this.navHeight + "px", 'important');
      };

      _proto.setResizeEvent = function setResizeEvent() {
        var _this = this;

        $(window).on(Event.RESIZE + " " + Event.ALERT_CLOSE, function () {
          if (!_this.ticking) {
            window.requestAnimationFrame(function () {
              _this.updateValues();

              _this.ticking = false;
            });
            _this.ticking = true;
          }
        });
      };

      _proto.setNavToggleEvents = function setNavToggleEvents() {
        var _this2 = this;

        $(this.element).on("" + Event.TOGGLE_SHOW, function () {
          _this2.navToggled = true;
        }); // navHeight should only be recalculated when the nav is not open/toggled
        // Don't allow the navHeight to be recalculated until the nav is fully hidden

        $(this.element).on("" + Event.TOGGLE_HIDDEN, function () {
          _this2.navToggled = false;
        });
      };

      _proto.setImageLoadEvent = function setImageLoadEvent() {
        var _this3 = this;

        var images = this.container.querySelectorAll(Selector.IMAGE);
        mrUtil.forEach(images, function (index, image) {
          image.addEventListener(Event.IMAGE_LOAD, function () {
            return _this3.updateValues();
          });
        });
      };

      OverlayNav.getContainerElement = function getContainerElement() {
        if (!this.container) {
          this.container = document.querySelector(Selector.CONTAINER);
        }

        return this.container;
      };

      OverlayNav.getFirstOverlayElement = function getFirstOverlayElement() {
        return document.querySelector(Selector.OVERLAY_SECTION + ":not(" + Selector.NAV + ")");
      };

      OverlayNav.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachoverlayNav() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new OverlayNav(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(OverlayNav, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return OverlayNav;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(document).ready(function () {
      var overlayNavElements = $.makeArray($(Selector.OVERLAY_NAV));
      /* eslint-disable no-plusplus */

      for (var i = overlayNavElements.length; i--;) {
        var $overlayNav = $(overlayNavElements[i]);
        OverlayNav.jQueryInterface.call($overlayNav, $overlayNav.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = OverlayNav.jQueryInterface;
    $.fn[NAME].Constructor = OverlayNav;

    $.fn[NAME].noConflict = function overlayNavNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return OverlayNav.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return OverlayNav;
  }(jQuery$1);

  //

  (function ($) {
    var Event = {
      TOGGLE_SHOW: 'show.bs.collapse',
      TOGGLE_HIDE: 'hide.bs.collapse'
    };
    var Selector = {
      CONTAINER: 'body > div.navbar-container',
      NAV: '.navbar-container > .navbar'
    };
    var ClassName = {
      TOGGLED_SHOW: 'navbar-toggled-show'
    };
    var container = document.querySelector(Selector.CONTAINER);
    var nav = document.querySelector(Selector.NAV);
    $(container).on(Event.TOGGLE_SHOW + " " + Event.TOGGLE_HIDE, function (evt) {
      var action = evt.type + "." + evt.namespace === Event.TOGGLE_SHOW ? 'add' : 'remove';
      nav.classList[action](ClassName.TOGGLED_SHOW);
    });
  })(jQuery$1);

  var plyr_min = createCommonjsModule(function (module, exports) {
  "object"==typeof navigator&&function(e,t){module.exports=t();}(commonjsGlobal,function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i);}}function n(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],i=!0,a=!1,s=void 0;try{for(var r,o=e[Symbol.iterator]();!(i=(r=o.next()).done)&&(n.push(r.value),!t||n.length!==t);i=!0);}catch(e){a=!0,s=e;}finally{try{i||null==o.return||o.return();}finally{if(a)throw s}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var r={addCSS:!0,thumbWidth:15,watch:!0};var o=function(e){return null!=e?e.constructor:null},l=function(e,t){return Boolean(e&&t&&e instanceof t)},c=function(e){return null==e},u=function(e){return o(e)===Object},d=function(e){return o(e)===String},h=function(e){return Array.isArray(e)},m=function(e){return l(e,NodeList)},p={nullOrUndefined:c,object:u,number:function(e){return o(e)===Number&&!Number.isNaN(e)},string:d,boolean:function(e){return o(e)===Boolean},function:function(e){return o(e)===Function},array:h,nodeList:m,element:function(e){return l(e,Element)},event:function(e){return l(e,Event)},empty:function(e){return c(e)||(d(e)||h(e)||m(e))&&!e.length||u(e)&&!Object.keys(e).length}};function f(e,t){if(t<1){var n=(i="".concat(t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/))?Math.max(0,(i[1]?i[1].length:0)-(i[2]?+i[2]:0)):0;return parseFloat(e.toFixed(n))}var i;return Math.round(e/t)*t}var g,y,v,b=function(){function t(n,i){e(this,t),p.element(n)?this.element=n:p.string(n)&&(this.element=document.querySelector(n)),p.element(this.element)&&p.empty(this.element.rangeTouch)&&(this.config=Object.assign({},r,i),this.init());}return n(t,[{key:"init",value:function(){t.enabled&&(this.config.addCSS&&(this.element.style.userSelect="none",this.element.style.webKitUserSelect="none",this.element.style.touchAction="manipulation"),this.listeners(!0),this.element.rangeTouch=this);}},{key:"destroy",value:function(){t.enabled&&(this.listeners(!1),this.element.rangeTouch=null);}},{key:"listeners",value:function(e){var t=this,n=e?"addEventListener":"removeEventListener";["touchstart","touchmove","touchend"].forEach(function(e){t.element[n](e,function(e){return t.set(e)},!1);});}},{key:"get",value:function(e){if(!t.enabled||!p.event(e))return null;var n,i=e.target,a=e.changedTouches[0],s=parseFloat(i.getAttribute("min"))||0,r=parseFloat(i.getAttribute("max"))||100,o=parseFloat(i.getAttribute("step"))||1,l=r-s,c=i.getBoundingClientRect(),u=100/c.width*(this.config.thumbWidth/2)/100;return (n=100/c.width*(a.clientX-c.left))<0?n=0:n>100&&(n=100),n<50?n-=(100-2*n)*u:n>50&&(n+=2*(n-50)*u),s+f(l*(n/100),o)}},{key:"set",value:function(e){t.enabled&&p.event(e)&&!e.target.disabled&&(e.preventDefault(),e.target.value=this.get(e),function(e,t){if(e&&t){var n=new Event(t);e.dispatchEvent(n);}}(e.target,"touchend"===e.type?"change":"input"));}}],[{key:"setup",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=null;if(p.empty(e)||p.string(e)?i=Array.from(document.querySelectorAll(p.string(e)?e:'input[type="range"]')):p.element(e)?i=[e]:p.nodeList(e)?i=Array.from(e):p.array(e)&&(i=e.filter(p.element)),p.empty(i))return null;var a=Object.assign({},r,n);p.string(e)&&a.watch&&new MutationObserver(function(n){Array.from(n).forEach(function(n){Array.from(n.addedNodes).forEach(function(n){if(p.element(n)&&function(){return Array.from(document.querySelectorAll(i)).includes(this)}.call(n,i=e)){var i;new t(n,a);}});});}).observe(document.body,{childList:!0,subtree:!0});return i.map(function(e){return new t(e,n)})}},{key:"enabled",get:function(){return "ontouchstart"in document.documentElement}}]),t}(),k=function(e){return null!=e?e.constructor:null},w=function(e,t){return Boolean(e&&t&&e instanceof t)},T=function(e){return null==e},C=function(e){return k(e)===Object},A=function(e){return k(e)===String},E=function(e){return Array.isArray(e)},S=function(e){return w(e,NodeList)},P=function(e){return T(e)||(A(e)||E(e)||S(e))&&!e.length||C(e)&&!Object.keys(e).length},N={nullOrUndefined:T,object:C,number:function(e){return k(e)===Number&&!Number.isNaN(e)},string:A,boolean:function(e){return k(e)===Boolean},function:function(e){return k(e)===Function},array:E,weakMap:function(e){return w(e,WeakMap)},nodeList:S,element:function(e){return w(e,Element)},textNode:function(e){return k(e)===Text},event:function(e){return w(e,Event)},keyboardEvent:function(e){return w(e,KeyboardEvent)},cue:function(e){return w(e,window.TextTrackCue)||w(e,window.VTTCue)},track:function(e){return w(e,TextTrack)||!T(e)&&A(e.kind)},promise:function(e){return w(e,Promise)},url:function(e){if(w(e,window.URL))return !0;if(!A(e))return !1;var t=e;e.startsWith("http://")&&e.startsWith("https://")||(t="http://".concat(e));try{return !P(new URL(t).hostname)}catch(e){return !1}},empty:P},M=(g=document.createElement("span"),y={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},v=Object.keys(y).find(function(e){return void 0!==g.style[e]}),!!N.string(v)&&y[v]);function x(e,t){setTimeout(function(){try{e.hidden=!0,e.offsetHeight,e.hidden=!1;}catch(e){}},t);}var L={isIE:!!document.documentMode,isEdge:window.navigator.userAgent.includes("Edge"),isWebkit:"WebkitAppearance"in document.documentElement.style&&!/Edge/.test(navigator.userAgent),isIPhone:/(iPhone|iPod)/gi.test(navigator.platform),isIos:/(iPad|iPhone|iPod)/gi.test(navigator.platform)},I=function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){return e=!0,null}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t);}catch(e){}return e}();function _(e,t,n){var i=this,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],r=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(e&&"addEventListener"in e&&!N.empty(t)&&N.function(n)){var o=t.split(" "),l=r;I&&(l={passive:s,capture:r}),o.forEach(function(t){i&&i.eventListeners&&a&&i.eventListeners.push({element:e,type:t,callback:n,options:l}),e[a?"addEventListener":"removeEventListener"](t,n,l);});}}function O(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2?arguments[2]:void 0,i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=arguments.length>4&&void 0!==arguments[4]&&arguments[4];_.call(this,e,t,n,!0,i,a);}function j(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2?arguments[2]:void 0,i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=arguments.length>4&&void 0!==arguments[4]&&arguments[4];_.call(this,e,t,n,!1,i,a);}function q(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2?arguments[2]:void 0,a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],s=arguments.length>4&&void 0!==arguments[4]&&arguments[4];_.call(this,e,n,function r(){j(e,n,r,a,s);for(var o=arguments.length,l=new Array(o),c=0;c<o;c++)l[c]=arguments[c];i.apply(t,l);},!0,a,s);}function H(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(N.element(e)&&!N.empty(t)){var a=new CustomEvent(t,{bubbles:n,detail:Object.assign({},i,{plyr:this})});e.dispatchEvent(a);}}function D(e,t){return t.split(".").reduce(function(e,t){return e&&e[t]},e)}function F(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];if(!n.length)return e;var s=n.shift();return N.object(s)?(Object.keys(s).forEach(function(t){N.object(s[t])?(Object.keys(e).includes(t)||Object.assign(e,i({},t,{})),F(e[t],s[t])):Object.assign(e,i({},t,s[t]));}),F.apply(void 0,[e].concat(n))):e}function R(e,t){var n=e.length?e:[e];Array.from(n).reverse().forEach(function(e,n){var i=n>0?t.cloneNode(!0):t,a=e.parentNode,s=e.nextSibling;i.appendChild(e),s?a.insertBefore(i,s):a.appendChild(i);});}function V(e,t){N.element(e)&&!N.empty(t)&&Object.entries(t).filter(function(e){var t=a(e,2)[1];return !N.nullOrUndefined(t)}).forEach(function(t){var n=a(t,2),i=n[0],s=n[1];return e.setAttribute(i,s)});}function B(e,t,n){var i=document.createElement(e);return N.object(t)&&V(i,t),N.string(n)&&(i.innerText=n),i}function U(e,t,n,i){N.element(t)&&t.appendChild(B(e,n,i));}function W(e){N.nodeList(e)||N.array(e)?Array.from(e).forEach(W):N.element(e)&&N.element(e.parentNode)&&e.parentNode.removeChild(e);}function z(e){if(N.element(e))for(var t=e.childNodes.length;t>0;)e.removeChild(e.lastChild),t-=1;}function K(e,t){return N.element(t)&&N.element(t.parentNode)&&N.element(e)?(t.parentNode.replaceChild(e,t),e):null}function Y(e,t){if(!N.string(e)||N.empty(e))return {};var n={},i=F({},t);return e.split(",").forEach(function(e){var t=e.trim(),s=t.replace(".",""),r=t.replace(/[[\]]/g,"").split("="),o=a(r,1)[0],l=r.length>1?r[1].replace(/["']/g,""):"";switch(t.charAt(0)){case".":N.string(i.class)?n.class="".concat(i.class," ").concat(s):n.class=s;break;case"#":n.id=t.replace("#","");break;case"[":n[o]=l;}}),F(i,n)}function Q(e,t){if(N.element(e)){var n=t;N.boolean(n)||(n=!e.hidden),e.hidden=n;}}function X(e,t,n){if(N.nodeList(e))return Array.from(e).map(function(e){return X(e,t,n)});if(N.element(e)){var i="toggle";return void 0!==n&&(i=n?"add":"remove"),e.classList[i](t),e.classList.contains(t)}return !1}function J(e,t){return N.element(e)&&e.classList.contains(t)}function $(e,t){return function(){return Array.from(document.querySelectorAll(t)).includes(this)}.call(e,t)}function G(e){return this.elements.container.querySelectorAll(e)}function Z(e){return this.elements.container.querySelector(e)}function ee(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];N.element(e)&&(e.focus({preventScroll:!0}),t&&X(e,this.config.classNames.tabFocus));}var te,ne={"audio/ogg":"vorbis","audio/wav":"1","video/webm":"vp8, vorbis","video/mp4":"avc1.42E01E, mp4a.40.2","video/ogg":"theora"},ie={audio:"canPlayType"in document.createElement("audio"),video:"canPlayType"in document.createElement("video"),check:function(e,t,n){var i=L.isIPhone&&n&&ie.playsinline,a=ie[e]||"html5"!==t;return {api:a,ui:a&&ie.rangeInput&&("video"!==e||!L.isIPhone||i)}},pip:!(L.isIPhone||!N.function(B("video").webkitSetPresentationMode)&&(!document.pictureInPictureEnabled||B("video").disablePictureInPicture)),airplay:N.function(window.WebKitPlaybackTargetAvailabilityEvent),playsinline:"playsInline"in document.createElement("video"),mime:function(e){if(N.empty(e))return !1;var t=a(e.split("/"),1)[0],n=e;if(!this.isHTML5||t!==this.type)return !1;Object.keys(ne).includes(n)&&(n+='; codecs="'.concat(ne[e],'"'));try{return Boolean(n&&this.media.canPlayType(n).replace(/no/,""))}catch(e){return !1}},textTracks:"textTracks"in document.createElement("video"),rangeInput:(te=document.createElement("input"),te.type="range","range"===te.type),touch:"ontouchstart"in document.documentElement,transitions:!1!==M,reducedMotion:"matchMedia"in window&&window.matchMedia("(prefers-reduced-motion)").matches};function ae(e){return !!(N.array(e)||N.string(e)&&e.includes(":"))&&(N.array(e)?e:e.split(":")).map(Number).every(N.number)}function se(e){if(!N.array(e)||!e.every(N.number))return null;var t=a(e,2),n=t[0],i=t[1],s=function e(t,n){return 0===n?t:e(n,t%n)}(n,i);return [n/s,i/s]}function re(e){var t=function(e){return ae(e)?e.split(":").map(Number):null},n=t(e);if(null===n&&(n=t(this.config.ratio)),null===n&&!N.empty(this.embed)&&N.array(this.embed.ratio)&&(n=this.embed.ratio),null===n&&this.isHTML5){var i=this.media;n=se([i.videoWidth,i.videoHeight]);}return n}function oe(e){if(!this.isVideo)return {};var t=re.call(this,e),n=a(N.array(t)?t:[0,0],2),i=100/n[0]*n[1];if(this.elements.wrapper.style.paddingBottom="".concat(i,"%"),this.isVimeo&&this.supported.ui){var s=(240-i)/4.8;this.media.style.transform="translateY(-".concat(s,"%)");}else this.isHTML5&&this.elements.wrapper.classList.toggle(this.config.classNames.videoFixedRatio,null!==t);return {padding:i,ratio:t}}var le={getSources:function(){var e=this;return this.isHTML5?Array.from(this.media.querySelectorAll("source")).filter(function(t){var n=t.getAttribute("type");return !!N.empty(n)||ie.mime.call(e,n)}):[]},getQualityOptions:function(){return le.getSources.call(this).map(function(e){return Number(e.getAttribute("size"))}).filter(Boolean)},extend:function(){if(this.isHTML5){var e=this;N.empty(this.config.ratio)||oe.call(e),Object.defineProperty(e.media,"quality",{get:function(){var t=le.getSources.call(e).find(function(t){return t.getAttribute("src")===e.source});return t&&Number(t.getAttribute("size"))},set:function(t){var n=le.getSources.call(e).find(function(e){return Number(e.getAttribute("size"))===t});if(n){var i=e.media,a=i.currentTime,s=i.paused,r=i.preload,o=i.readyState;e.media.src=n.getAttribute("src"),("none"!==r||o)&&(e.once("loadedmetadata",function(){e.currentTime=a,s||e.play();}),e.media.load()),H.call(e,e.media,"qualitychange",!1,{quality:t});}}});}},cancelRequests:function(){this.isHTML5&&(W(le.getSources.call(this)),this.media.setAttribute("src",this.config.blankVideo),this.media.load(),this.debug.log("Cancelled network requests"));}};function ce(e){return N.array(e)?e.filter(function(t,n){return e.indexOf(t)===n}):e}function ue(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];return N.empty(e)?e:e.toString().replace(/{(\d+)}/g,function(e,t){return n[t].toString()})}function de(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1"),"g"),n.toString())}function he(){return (arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").toString().replace(/\w\S*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})}function me(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").toString();return (e=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").toString();return e=de(e,"-"," "),e=de(e,"_"," "),de(e=he(e)," ","")}(e)).charAt(0).toLowerCase()+e.slice(1)}function pe(e){var t=document.createElement("div");return t.appendChild(e),t.innerHTML}var fe={pip:"PIP",airplay:"AirPlay",html5:"HTML5",vimeo:"Vimeo",youtube:"YouTube"},ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(N.empty(e)||N.empty(t))return "";var n=D(t.i18n,e);if(N.empty(n))return Object.keys(fe).includes(e)?fe[e]:"";var i={"{seektime}":t.seekTime,"{title}":t.title};return Object.entries(i).forEach(function(e){var t=a(e,2),i=t[0],s=t[1];n=de(n,i,s);}),n},ye=function(){function t(n){e(this,t),this.enabled=n.config.storage.enabled,this.key=n.config.storage.key;}return n(t,[{key:"get",value:function(e){if(!t.supported||!this.enabled)return null;var n=window.localStorage.getItem(this.key);if(N.empty(n))return null;var i=JSON.parse(n);return N.string(e)&&e.length?i[e]:i}},{key:"set",value:function(e){if(t.supported&&this.enabled&&N.object(e)){var n=this.get();N.empty(n)&&(n={}),F(n,e),window.localStorage.setItem(this.key,JSON.stringify(n));}}}],[{key:"supported",get:function(){try{if(!("localStorage"in window))return !1;return window.localStorage.setItem("___test","___test"),window.localStorage.removeItem("___test"),!0}catch(e){return !1}}}]),t}();function ve(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"text";return new Promise(function(n,i){try{var a=new XMLHttpRequest;if(!("withCredentials"in a))return;a.addEventListener("load",function(){if("text"===t)try{n(JSON.parse(a.responseText));}catch(e){n(a.responseText);}else n(a.response);}),a.addEventListener("error",function(){throw new Error(a.status)}),a.open("GET",e,!0),a.responseType=t,a.send();}catch(e){i(e);}})}function be(e,t){if(N.string(e)){var n=N.string(t),i=function(){return null!==document.getElementById(t)},a=function(e,t){e.innerHTML=t,n&&i()||document.body.insertAdjacentElement("afterbegin",e);};if(!n||!i()){var s=ye.supported,r=document.createElement("div");if(r.setAttribute("hidden",""),n&&r.setAttribute("id",t),s){var o=window.localStorage.getItem("".concat("cache","-").concat(t));if(null!==o){var l=JSON.parse(o);a(r,l.content);}}ve(e).then(function(e){N.empty(e)||(s&&window.localStorage.setItem("".concat("cache","-").concat(t),JSON.stringify({content:e})),a(r,e));}).catch(function(){});}}}var ke=function(e){return Math.trunc(e/60/60%60,10)},we=function(e){return Math.trunc(e/60%60,10)},Te=function(e){return Math.trunc(e%60,10)};function Ce(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!N.number(e))return Ce(null,t,n);var i=function(e){return "0".concat(e).slice(-2)},a=ke(e),s=we(e),r=Te(e);return a=t||a>0?"".concat(a,":"):"","".concat(n&&e>0?"-":"").concat(a).concat(i(s),":").concat(i(r))}var Ae={getIconUrl:function(){var e=new URL(this.config.iconUrl,window.location).host!==window.location.host||L.isIE&&!window.svg4everybody;return {url:this.config.iconUrl,cors:e}},findElements:function(){try{return this.elements.controls=Z.call(this,this.config.selectors.controls.wrapper),this.elements.buttons={play:G.call(this,this.config.selectors.buttons.play),pause:Z.call(this,this.config.selectors.buttons.pause),restart:Z.call(this,this.config.selectors.buttons.restart),rewind:Z.call(this,this.config.selectors.buttons.rewind),fastForward:Z.call(this,this.config.selectors.buttons.fastForward),mute:Z.call(this,this.config.selectors.buttons.mute),pip:Z.call(this,this.config.selectors.buttons.pip),airplay:Z.call(this,this.config.selectors.buttons.airplay),settings:Z.call(this,this.config.selectors.buttons.settings),captions:Z.call(this,this.config.selectors.buttons.captions),fullscreen:Z.call(this,this.config.selectors.buttons.fullscreen)},this.elements.progress=Z.call(this,this.config.selectors.progress),this.elements.inputs={seek:Z.call(this,this.config.selectors.inputs.seek),volume:Z.call(this,this.config.selectors.inputs.volume)},this.elements.display={buffer:Z.call(this,this.config.selectors.display.buffer),currentTime:Z.call(this,this.config.selectors.display.currentTime),duration:Z.call(this,this.config.selectors.display.duration)},N.element(this.elements.progress)&&(this.elements.display.seekTooltip=this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip))),!0}catch(e){return this.debug.warn("It looks like there is a problem with your custom controls HTML",e),this.toggleNativeControls(!0),!1}},createIcon:function(e,t){var n=Ae.getIconUrl.call(this),i="".concat(n.cors?"":n.url,"#").concat(this.config.iconPrefix),a=document.createElementNS("http://www.w3.org/2000/svg","svg");V(a,F(t,{role:"presentation",focusable:"false"}));var s=document.createElementNS("http://www.w3.org/2000/svg","use"),r="".concat(i,"-").concat(e);return "href"in s&&s.setAttributeNS("http://www.w3.org/1999/xlink","href",r),s.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r),a.appendChild(s),a},createLabel:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=ge(e,this.config);return B("span",Object.assign({},t,{class:[t.class,this.config.classNames.hidden].filter(Boolean).join(" ")}),n)},createBadge:function(e){if(N.empty(e))return null;var t=B("span",{class:this.config.classNames.menu.value});return t.appendChild(B("span",{class:this.config.classNames.menu.badge},e)),t},createButton:function(e,t){var n=this,i=F({},t),a=me(e),s={element:"button",toggle:!1,label:null,icon:null,labelPressed:null,iconPressed:null};switch(["element","icon","label"].forEach(function(e){Object.keys(i).includes(e)&&(s[e]=i[e],delete i[e]);}),"button"!==s.element||Object.keys(i).includes("type")||(i.type="button"),Object.keys(i).includes("class")?i.class.split(" ").some(function(e){return e===n.config.classNames.control})||F(i,{class:"".concat(i.class," ").concat(this.config.classNames.control)}):i.class=this.config.classNames.control,e){case"play":s.toggle=!0,s.label="play",s.labelPressed="pause",s.icon="play",s.iconPressed="pause";break;case"mute":s.toggle=!0,s.label="mute",s.labelPressed="unmute",s.icon="volume",s.iconPressed="muted";break;case"captions":s.toggle=!0,s.label="enableCaptions",s.labelPressed="disableCaptions",s.icon="captions-off",s.iconPressed="captions-on";break;case"fullscreen":s.toggle=!0,s.label="enterFullscreen",s.labelPressed="exitFullscreen",s.icon="enter-fullscreen",s.iconPressed="exit-fullscreen";break;case"play-large":i.class+=" ".concat(this.config.classNames.control,"--overlaid"),a="play",s.label="play",s.icon="play";break;default:N.empty(s.label)&&(s.label=a),N.empty(s.icon)&&(s.icon=e);}var r=B(s.element);return s.toggle?(r.appendChild(Ae.createIcon.call(this,s.iconPressed,{class:"icon--pressed"})),r.appendChild(Ae.createIcon.call(this,s.icon,{class:"icon--not-pressed"})),r.appendChild(Ae.createLabel.call(this,s.labelPressed,{class:"label--pressed"})),r.appendChild(Ae.createLabel.call(this,s.label,{class:"label--not-pressed"}))):(r.appendChild(Ae.createIcon.call(this,s.icon)),r.appendChild(Ae.createLabel.call(this,s.label))),F(i,Y(this.config.selectors.buttons[a],i)),V(r,i),"play"===a?(N.array(this.elements.buttons[a])||(this.elements.buttons[a]=[]),this.elements.buttons[a].push(r)):this.elements.buttons[a]=r,r},createRange:function(e,t){var n=B("input",F(Y(this.config.selectors.inputs[e]),{type:"range",min:0,max:100,step:.01,value:0,autocomplete:"off",role:"slider","aria-label":ge(e,this.config),"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":0},t));return this.elements.inputs[e]=n,Ae.updateRangeFill.call(this,n),b.setup(n),n},createProgress:function(e,t){var n=B("progress",F(Y(this.config.selectors.display[e]),{min:0,max:100,value:0,role:"progressbar","aria-hidden":!0},t));if("volume"!==e){n.appendChild(B("span",null,"0"));var i={played:"played",buffer:"buffered"}[e],a=i?ge(i,this.config):"";n.innerText="% ".concat(a.toLowerCase());}return this.elements.display[e]=n,n},createTime:function(e,t){var n=Y(this.config.selectors.display[e],t),i=B("div",F(n,{class:"".concat(n.class?n.class:""," ").concat(this.config.classNames.display.time," ").trim(),"aria-label":ge(e,this.config)}),"00:00");return this.elements.display[e]=i,i},bindMenuItemShortcuts:function(e,t){var n=this;O(e,"keydown keyup",function(i){if([32,38,39,40].includes(i.which)&&(i.preventDefault(),i.stopPropagation(),"keydown"!==i.type)){var a,s=$(e,'[role="menuitemradio"]');if(!s&&[32,39].includes(i.which))Ae.showMenuPanel.call(n,t,!0);else 32!==i.which&&(40===i.which||s&&39===i.which?(a=e.nextElementSibling,N.element(a)||(a=e.parentNode.firstElementChild)):(a=e.previousElementSibling,N.element(a)||(a=e.parentNode.lastElementChild)),ee.call(n,a,!0));}},!1),O(e,"keyup",function(e){13===e.which&&Ae.focusFirstMenuItem.call(n,null,!0);});},createMenuItem:function(e){var t=this,n=e.value,i=e.list,a=e.type,s=e.title,r=e.badge,o=void 0===r?null:r,l=e.checked,c=void 0!==l&&l,u=Y(this.config.selectors.inputs[a]),d=B("button",F(u,{type:"button",role:"menuitemradio",class:"".concat(this.config.classNames.control," ").concat(u.class?u.class:"").trim(),"aria-checked":c,value:n})),h=B("span");h.innerHTML=s,N.element(o)&&h.appendChild(o),d.appendChild(h),Object.defineProperty(d,"checked",{enumerable:!0,get:function(){return "true"===d.getAttribute("aria-checked")},set:function(e){e&&Array.from(d.parentNode.children).filter(function(e){return $(e,'[role="menuitemradio"]')}).forEach(function(e){return e.setAttribute("aria-checked","false")}),d.setAttribute("aria-checked",e?"true":"false");}}),this.listeners.bind(d,"click keyup",function(e){if(!N.keyboardEvent(e)||32===e.which){switch(e.preventDefault(),e.stopPropagation(),d.checked=!0,a){case"language":t.currentTrack=Number(n);break;case"quality":t.quality=n;break;case"speed":t.speed=parseFloat(n);}Ae.showMenuPanel.call(t,"home",N.keyboardEvent(e));}},a,!1),Ae.bindMenuItemShortcuts.call(this,d,a),i.appendChild(d);},formatTime:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return N.number(e)?Ce(e,ke(this.duration)>0,t):e},updateTimeDisplay:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];N.element(e)&&N.number(t)&&(e.innerText=Ae.formatTime(t,n));},updateVolume:function(){this.supported.ui&&(N.element(this.elements.inputs.volume)&&Ae.setRange.call(this,this.elements.inputs.volume,this.muted?0:this.volume),N.element(this.elements.buttons.mute)&&(this.elements.buttons.mute.pressed=this.muted||0===this.volume));},setRange:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;N.element(e)&&(e.value=t,Ae.updateRangeFill.call(this,e));},updateProgress:function(e){var t=this;if(this.supported.ui&&N.event(e)){var n,i,a=0;if(e)switch(e.type){case"timeupdate":case"seeking":case"seeked":n=this.currentTime,i=this.duration,a=0===n||0===i||Number.isNaN(n)||Number.isNaN(i)?0:(n/i*100).toFixed(2),"timeupdate"===e.type&&Ae.setRange.call(this,this.elements.inputs.seek,a);break;case"playing":case"progress":!function(e,n){var i=N.number(n)?n:0,a=N.element(e)?e:t.elements.display.buffer;if(N.element(a)){a.value=i;var s=a.getElementsByTagName("span")[0];N.element(s)&&(s.childNodes[0].nodeValue=i);}}(this.elements.display.buffer,100*this.buffered);}}},updateRangeFill:function(e){var t=N.event(e)?e.target:e;if(N.element(t)&&"range"===t.getAttribute("type")){if($(t,this.config.selectors.inputs.seek)){t.setAttribute("aria-valuenow",this.currentTime);var n=Ae.formatTime(this.currentTime),i=Ae.formatTime(this.duration),a=ge("seekLabel",this.config);t.setAttribute("aria-valuetext",a.replace("{currentTime}",n).replace("{duration}",i));}else if($(t,this.config.selectors.inputs.volume)){var s=100*t.value;t.setAttribute("aria-valuenow",s),t.setAttribute("aria-valuetext","".concat(s.toFixed(1),"%"));}else t.setAttribute("aria-valuenow",t.value);L.isWebkit&&t.style.setProperty("--value","".concat(t.value/t.max*100,"%"));}},updateSeekTooltip:function(e){var t=this;if(this.config.tooltips.seek&&N.element(this.elements.inputs.seek)&&N.element(this.elements.display.seekTooltip)&&0!==this.duration){var n="".concat(this.config.classNames.tooltip,"--visible"),i=function(e){return X(t.elements.display.seekTooltip,n,e)};if(this.touch)i(!1);else{var a=0,s=this.elements.progress.getBoundingClientRect();if(N.event(e))a=100/s.width*(e.pageX-s.left);else{if(!J(this.elements.display.seekTooltip,n))return;a=parseFloat(this.elements.display.seekTooltip.style.left,10);}a<0?a=0:a>100&&(a=100),Ae.updateTimeDisplay.call(this,this.elements.display.seekTooltip,this.duration/100*a),this.elements.display.seekTooltip.style.left="".concat(a,"%"),N.event(e)&&["mouseenter","mouseleave"].includes(e.type)&&i("mouseenter"===e.type);}}},timeUpdate:function(e){var t=!N.element(this.elements.display.duration)&&this.config.invertTime;Ae.updateTimeDisplay.call(this,this.elements.display.currentTime,t?this.duration-this.currentTime:this.currentTime,t),e&&"timeupdate"===e.type&&this.media.seeking||Ae.updateProgress.call(this,e);},durationUpdate:function(){if(this.supported.ui&&(this.config.invertTime||!this.currentTime)){if(this.duration>=Math.pow(2,32))return Q(this.elements.display.currentTime,!0),void Q(this.elements.progress,!0);N.element(this.elements.inputs.seek)&&this.elements.inputs.seek.setAttribute("aria-valuemax",this.duration);var e=N.element(this.elements.display.duration);!e&&this.config.displayDuration&&this.paused&&Ae.updateTimeDisplay.call(this,this.elements.display.currentTime,this.duration),e&&Ae.updateTimeDisplay.call(this,this.elements.display.duration,this.duration),Ae.updateSeekTooltip.call(this);}},toggleMenuButton:function(e,t){Q(this.elements.settings.buttons[e],!t);},updateSetting:function(e,t,n){var i=this.elements.settings.panels[e],a=null,s=t;if("captions"===e)a=this.currentTrack;else{if(a=N.empty(n)?this[e]:n,N.empty(a)&&(a=this.config[e].default),!N.empty(this.options[e])&&!this.options[e].includes(a))return void this.debug.warn("Unsupported value of '".concat(a,"' for ").concat(e));if(!this.config[e].options.includes(a))return void this.debug.warn("Disabled value of '".concat(a,"' for ").concat(e))}if(N.element(s)||(s=i&&i.querySelector('[role="menu"]')),N.element(s)){this.elements.settings.buttons[e].querySelector(".".concat(this.config.classNames.menu.value)).innerHTML=Ae.getLabel.call(this,e,a);var r=s&&s.querySelector('[value="'.concat(a,'"]'));N.element(r)&&(r.checked=!0);}},getLabel:function(e,t){switch(e){case"speed":return 1===t?ge("normal",this.config):"".concat(t,"&times;");case"quality":if(N.number(t)){var n=ge("qualityLabel.".concat(t),this.config);return n.length?n:"".concat(t,"p")}return he(t);case"captions":return Pe.getLabel.call(this);default:return null}},setQualityMenu:function(e){var t=this;if(N.element(this.elements.settings.panels.quality)){var n=this.elements.settings.panels.quality.querySelector('[role="menu"]');N.array(e)&&(this.options.quality=ce(e).filter(function(e){return t.config.quality.options.includes(e)}));var i=!N.empty(this.options.quality)&&this.options.quality.length>1;if(Ae.toggleMenuButton.call(this,"quality",i),z(n),Ae.checkMenu.call(this),i){var a=function(e){var n=ge("qualityBadge.".concat(e),t.config);return n.length?Ae.createBadge.call(t,n):null};this.options.quality.sort(function(e,n){var i=t.config.quality.options;return i.indexOf(e)>i.indexOf(n)?1:-1}).forEach(function(e){Ae.createMenuItem.call(t,{value:e,list:n,type:"quality",title:Ae.getLabel.call(t,"quality",e),badge:a(e)});}),Ae.updateSetting.call(this,"quality",n);}}},setCaptionsMenu:function(){var e=this;if(N.element(this.elements.settings.panels.captions)){var t=this.elements.settings.panels.captions.querySelector('[role="menu"]'),n=Pe.getTracks.call(this),i=Boolean(n.length);if(Ae.toggleMenuButton.call(this,"captions",i),z(t),Ae.checkMenu.call(this),i){var a=n.map(function(n,i){return {value:i,checked:e.captions.toggled&&e.currentTrack===i,title:Pe.getLabel.call(e,n),badge:n.language&&Ae.createBadge.call(e,n.language.toUpperCase()),list:t,type:"language"}});a.unshift({value:-1,checked:!this.captions.toggled,title:ge("disabled",this.config),list:t,type:"language"}),a.forEach(Ae.createMenuItem.bind(this)),Ae.updateSetting.call(this,"captions",t);}}},setSpeedMenu:function(e){var t=this;if(N.element(this.elements.settings.panels.speed)){var n=this.elements.settings.panels.speed.querySelector('[role="menu"]');N.array(e)?this.options.speed=e:(this.isHTML5||this.isVimeo)&&(this.options.speed=[.5,.75,1,1.25,1.5,1.75,2]),this.options.speed=this.options.speed.filter(function(e){return t.config.speed.options.includes(e)});var i=!N.empty(this.options.speed)&&this.options.speed.length>1;Ae.toggleMenuButton.call(this,"speed",i),z(n),Ae.checkMenu.call(this),i&&(this.options.speed.forEach(function(e){Ae.createMenuItem.call(t,{value:e,list:n,type:"speed",title:Ae.getLabel.call(t,"speed",e)});}),Ae.updateSetting.call(this,"speed",n));}},checkMenu:function(){var e=this.elements.settings.buttons,t=!N.empty(e)&&Object.values(e).some(function(e){return !e.hidden});Q(this.elements.settings.menu,!t);},focusFirstMenuItem:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!this.elements.settings.popup.hidden){var n=e;N.element(n)||(n=Object.values(this.elements.settings.panels).find(function(e){return !e.hidden}));var i=n.querySelector('[role^="menuitem"]');ee.call(this,i,t);}},toggleMenu:function(e){var t=this.elements.settings.popup,n=this.elements.buttons.settings;if(N.element(t)&&N.element(n)){var i=t.hidden,a=i;if(N.boolean(e))a=e;else if(N.keyboardEvent(e)&&27===e.which)a=!1;else if(N.event(e)){var s=N.function(e.composedPath)?e.composedPath()[0]:e.target,r=t.contains(s);if(r||!r&&e.target!==n&&a)return}n.setAttribute("aria-expanded",a),Q(t,!a),X(this.elements.container,this.config.classNames.menu.open,a),a&&N.keyboardEvent(e)?Ae.focusFirstMenuItem.call(this,null,!0):a||i||ee.call(this,n,N.keyboardEvent(e));}},getMenuSize:function(e){var t=e.cloneNode(!0);t.style.position="absolute",t.style.opacity=0,t.removeAttribute("hidden"),e.parentNode.appendChild(t);var n=t.scrollWidth,i=t.scrollHeight;return W(t),{width:n,height:i}},showMenuPanel:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=this.elements.container.querySelector("#plyr-settings-".concat(this.id,"-").concat(t));if(N.element(i)){var a=i.parentNode,s=Array.from(a.children).find(function(e){return !e.hidden});if(ie.transitions&&!ie.reducedMotion){a.style.width="".concat(s.scrollWidth,"px"),a.style.height="".concat(s.scrollHeight,"px");var r=Ae.getMenuSize.call(this,i);O.call(this,a,M,function t(n){n.target===a&&["width","height"].includes(n.propertyName)&&(a.style.width="",a.style.height="",j.call(e,a,M,t));}),a.style.width="".concat(r.width,"px"),a.style.height="".concat(r.height,"px");}Q(s,!0),Q(i,!1),Ae.focusFirstMenuItem.call(this,i,n);}},setDownloadUrl:function(){var e=this.elements.buttons.download;N.element(e)&&e.setAttribute("href",this.download);},create:function(e){var t=this,n=Ae.bindMenuItemShortcuts,i=Ae.createButton,a=Ae.createProgress,s=Ae.createRange,r=Ae.createTime,o=Ae.setQualityMenu,l=Ae.setSpeedMenu,c=Ae.showMenuPanel;this.elements.controls=null,this.config.controls.includes("play-large")&&this.elements.container.appendChild(i.call(this,"play-large"));var u=B("div",Y(this.config.selectors.controls.wrapper));this.elements.controls=u;var d={class:"plyr__controls__item"};return ce(this.config.controls).forEach(function(o){if("restart"===o&&u.appendChild(i.call(t,"restart",d)),"rewind"===o&&u.appendChild(i.call(t,"rewind",d)),"play"===o&&u.appendChild(i.call(t,"play",d)),"fast-forward"===o&&u.appendChild(i.call(t,"fast-forward",d)),"progress"===o){var l=B("div",{class:"".concat(d.class," plyr__progress__container")}),h=B("div",Y(t.config.selectors.progress));if(h.appendChild(s.call(t,"seek",{id:"plyr-seek-".concat(e.id)})),h.appendChild(a.call(t,"buffer")),t.config.tooltips.seek){var m=B("span",{class:t.config.classNames.tooltip},"00:00");h.appendChild(m),t.elements.display.seekTooltip=m;}t.elements.progress=h,l.appendChild(t.elements.progress),u.appendChild(l);}if("current-time"===o&&u.appendChild(r.call(t,"currentTime",d)),"duration"===o&&u.appendChild(r.call(t,"duration",d)),"mute"===o||"volume"===o){var p=t.elements.volume;if(N.element(p)&&u.contains(p)||(p=B("div",F({},d,{class:"".concat(d.class," plyr__volume").trim()})),t.elements.volume=p,u.appendChild(p)),"mute"===o&&p.appendChild(i.call(t,"mute")),"volume"===o){var f={max:1,step:.05,value:t.config.volume};p.appendChild(s.call(t,"volume",F(f,{id:"plyr-volume-".concat(e.id)})));}}if("captions"===o&&u.appendChild(i.call(t,"captions",d)),"settings"===o&&!N.empty(t.config.settings)){var g=B("div",F({},d,{class:"".concat(d.class," plyr__menu").trim(),hidden:""}));g.appendChild(i.call(t,"settings",{"aria-haspopup":!0,"aria-controls":"plyr-settings-".concat(e.id),"aria-expanded":!1}));var y=B("div",{class:"plyr__menu__container",id:"plyr-settings-".concat(e.id),hidden:""}),v=B("div"),b=B("div",{id:"plyr-settings-".concat(e.id,"-home")}),k=B("div",{role:"menu"});b.appendChild(k),v.appendChild(b),t.elements.settings.panels.home=b,t.config.settings.forEach(function(i){var a=B("button",F(Y(t.config.selectors.buttons.settings),{type:"button",class:"".concat(t.config.classNames.control," ").concat(t.config.classNames.control,"--forward"),role:"menuitem","aria-haspopup":!0,hidden:""}));n.call(t,a,i),O(a,"click",function(){c.call(t,i,!1);});var s=B("span",null,ge(i,t.config)),r=B("span",{class:t.config.classNames.menu.value});r.innerHTML=e[i],s.appendChild(r),a.appendChild(s),k.appendChild(a);var o=B("div",{id:"plyr-settings-".concat(e.id,"-").concat(i),hidden:""}),l=B("button",{type:"button",class:"".concat(t.config.classNames.control," ").concat(t.config.classNames.control,"--back")});l.appendChild(B("span",{"aria-hidden":!0},ge(i,t.config))),l.appendChild(B("span",{class:t.config.classNames.hidden},ge("menuBack",t.config))),O(o,"keydown",function(e){37===e.which&&(e.preventDefault(),e.stopPropagation(),c.call(t,"home",!0));},!1),O(l,"click",function(){c.call(t,"home",!1);}),o.appendChild(l),o.appendChild(B("div",{role:"menu"})),v.appendChild(o),t.elements.settings.buttons[i]=a,t.elements.settings.panels[i]=o;}),y.appendChild(v),g.appendChild(y),u.appendChild(g),t.elements.settings.popup=y,t.elements.settings.menu=g;}if("pip"===o&&ie.pip&&u.appendChild(i.call(t,"pip",d)),"airplay"===o&&ie.airplay&&u.appendChild(i.call(t,"airplay",d)),"download"===o){var w=F({},d,{element:"a",href:t.download,target:"_blank"}),T=t.config.urls.download;!N.url(T)&&t.isEmbed&&F(w,{icon:"logo-".concat(t.provider),label:t.provider}),u.appendChild(i.call(t,"download",w));}"fullscreen"===o&&u.appendChild(i.call(t,"fullscreen",d));}),this.isHTML5&&o.call(this,le.getQualityOptions.call(this)),l.call(this),u},inject:function(){var e=this;if(this.config.loadSprite){var t=Ae.getIconUrl.call(this);t.cors&&be(t.url,"sprite-plyr");}this.id=Math.floor(1e4*Math.random());var n=null;this.elements.controls=null;var i={id:this.id,seektime:this.config.seekTime,title:this.config.title},s=!0;N.function(this.config.controls)&&(this.config.controls=this.config.controls.call(this,i)),this.config.controls||(this.config.controls=[]),N.element(this.config.controls)||N.string(this.config.controls)?n=this.config.controls:(n=Ae.create.call(this,{id:this.id,seektime:this.config.seekTime,speed:this.speed,quality:this.quality,captions:Pe.getLabel.call(this)}),s=!1);var r,o=function(e){var t=e;return Object.entries(i).forEach(function(e){var n=a(e,2),i=n[0],s=n[1];t=de(t,"{".concat(i,"}"),s);}),t};if(s&&(N.string(this.config.controls)?n=o(n):N.element(n)&&(n.innerHTML=o(n.innerHTML))),N.string(this.config.selectors.controls.container)&&(r=document.querySelector(this.config.selectors.controls.container)),N.element(r)||(r=this.elements.container),r[N.element(n)?"insertAdjacentElement":"insertAdjacentHTML"]("afterbegin",n),N.element(this.elements.controls)||Ae.findElements.call(this),!N.empty(this.elements.buttons)){var l=function(t){var n=e.config.classNames.controlPressed;Object.defineProperty(t,"pressed",{enumerable:!0,get:function(){return J(t,n)},set:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];X(t,n,e);}});};Object.values(this.elements.buttons).filter(Boolean).forEach(function(e){N.array(e)||N.nodeList(e)?Array.from(e).filter(Boolean).forEach(l):l(e);});}if(L.isEdge&&x(r),this.config.tooltips.controls){var c=this.config,u=c.classNames,d=c.selectors,h="".concat(d.controls.wrapper," ").concat(d.labels," .").concat(u.hidden),m=G.call(this,h);Array.from(m).forEach(function(t){X(t,e.config.classNames.hidden,!1),X(t,e.config.classNames.tooltip,!0);});}}};function Ee(e){var t=e;if(!(arguments.length>1&&void 0!==arguments[1])||arguments[1]){var n=document.createElement("a");n.href=t,t=n.href;}try{return new URL(t)}catch(e){return null}}function Se(e){var t=new URLSearchParams;return N.object(e)&&Object.entries(e).forEach(function(e){var n=a(e,2),i=n[0],s=n[1];t.set(i,s);}),t}var Pe={setup:function(){if(this.supported.ui)if(!this.isVideo||this.isYouTube||this.isHTML5&&!ie.textTracks)N.array(this.config.controls)&&this.config.controls.includes("settings")&&this.config.settings.includes("captions")&&Ae.setCaptionsMenu.call(this);else{if(N.element(this.elements.captions)||(this.elements.captions=B("div",Y(this.config.selectors.captions)),function(e,t){N.element(e)&&N.element(t)&&t.parentNode.insertBefore(e,t.nextSibling);}(this.elements.captions,this.elements.wrapper)),L.isIE&&window.URL){var e=this.media.querySelectorAll("track");Array.from(e).forEach(function(e){var t=e.getAttribute("src"),n=Ee(t);null!==n&&n.hostname!==window.location.href.hostname&&["http:","https:"].includes(n.protocol)&&ve(t,"blob").then(function(t){e.setAttribute("src",window.URL.createObjectURL(t));}).catch(function(){W(e);});});}var t=ce((navigator.languages||[navigator.language||navigator.userLanguage||"en"]).map(function(e){return e.split("-")[0]})),n=(this.storage.get("language")||this.config.captions.language||"auto").toLowerCase();if("auto"===n)n=a(t,1)[0];var i=this.storage.get("captions");if(N.boolean(i)||(i=this.config.captions.active),Object.assign(this.captions,{toggled:!1,active:i,language:n,languages:t}),this.isHTML5){var s=this.config.captions.update?"addtrack removetrack":"removetrack";O.call(this,this.media.textTracks,s,Pe.update.bind(this));}setTimeout(Pe.update.bind(this),0);}},update:function(){var e=this,t=Pe.getTracks.call(this,!0),n=this.captions,i=n.active,a=n.language,s=n.meta,r=n.currentTrackNode,o=Boolean(t.find(function(e){return e.language===a}));this.isHTML5&&this.isVideo&&t.filter(function(e){return !s.get(e)}).forEach(function(t){e.debug.log("Track added",t),s.set(t,{default:"showing"===t.mode}),t.mode="hidden",O.call(e,t,"cuechange",function(){return Pe.updateCues.call(e)});}),(o&&this.language!==a||!t.includes(r))&&(Pe.setLanguage.call(this,a),Pe.toggle.call(this,i&&o)),X(this.elements.container,this.config.classNames.captions.enabled,!N.empty(t)),(this.config.controls||[]).includes("settings")&&this.config.settings.includes("captions")&&Ae.setCaptionsMenu.call(this);},toggle:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(this.supported.ui){var n=this.captions.toggled,i=this.config.classNames.captions.active,a=N.nullOrUndefined(e)?!n:e;if(a!==n){if(t||(this.captions.active=a,this.storage.set({captions:a})),!this.language&&a&&!t){var r=Pe.getTracks.call(this),o=Pe.findTrack.call(this,[this.captions.language].concat(s(this.captions.languages)),!0);return this.captions.language=o.language,void Pe.set.call(this,r.indexOf(o))}this.elements.buttons.captions&&(this.elements.buttons.captions.pressed=a),X(this.elements.container,i,a),this.captions.toggled=a,Ae.updateSetting.call(this,"captions"),H.call(this,this.media,a?"captionsenabled":"captionsdisabled");}}},set:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=Pe.getTracks.call(this);if(-1!==e)if(N.number(e))if(e in n){if(this.captions.currentTrack!==e){this.captions.currentTrack=e;var i=n[e],a=(i||{}).language;this.captions.currentTrackNode=i,Ae.updateSetting.call(this,"captions"),t||(this.captions.language=a,this.storage.set({language:a})),this.isVimeo&&this.embed.enableTextTrack(a),H.call(this,this.media,"languagechange");}Pe.toggle.call(this,!0,t),this.isHTML5&&this.isVideo&&Pe.updateCues.call(this);}else this.debug.warn("Track not found",e);else this.debug.warn("Invalid caption argument",e);else Pe.toggle.call(this,!1,t);},setLanguage:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(N.string(e)){var n=e.toLowerCase();this.captions.language=n;var i=Pe.getTracks.call(this),a=Pe.findTrack.call(this,[n]);Pe.set.call(this,i.indexOf(a),t);}else this.debug.warn("Invalid language argument",e);},getTracks:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Array.from((this.media||{}).textTracks||[]).filter(function(n){return !e.isHTML5||t||e.captions.meta.has(n)}).filter(function(e){return ["captions","subtitles"].includes(e.kind)})},findTrack:function(e){var t,n=this,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=Pe.getTracks.call(this),s=function(e){return Number((n.captions.meta.get(e)||{}).default)},r=Array.from(a).sort(function(e,t){return s(t)-s(e)});return e.every(function(e){return !(t=r.find(function(t){return t.language===e}))}),t||(i?r[0]:void 0)},getCurrentTrack:function(){return Pe.getTracks.call(this)[this.currentTrack]},getLabel:function(e){var t=e;return !N.track(t)&&ie.textTracks&&this.captions.toggled&&(t=Pe.getCurrentTrack.call(this)),N.track(t)?N.empty(t.label)?N.empty(t.language)?ge("enabled",this.config):e.language.toUpperCase():t.label:ge("disabled",this.config)},updateCues:function(e){if(this.supported.ui)if(N.element(this.elements.captions))if(N.nullOrUndefined(e)||Array.isArray(e)){var t=e;if(!t){var n=Pe.getCurrentTrack.call(this);t=Array.from((n||{}).activeCues||[]).map(function(e){return e.getCueAsHTML()}).map(pe);}var i=t.map(function(e){return e.trim()}).join("\n");if(i!==this.elements.captions.innerHTML){z(this.elements.captions);var a=B("span",Y(this.config.selectors.caption));a.innerHTML=i,this.elements.captions.appendChild(a),H.call(this,this.media,"cuechange");}}else this.debug.warn("updateCues: Invalid input",e);else this.debug.warn("No captions element to render to");}},Ne={enabled:!0,title:"",debug:!1,autoplay:!1,autopause:!0,playsinline:!0,seekTime:10,volume:1,muted:!1,duration:null,displayDuration:!0,invertTime:!0,toggleInvert:!0,ratio:null,clickToPlay:!0,hideControls:!0,resetOnEnd:!1,disableContextMenu:!0,loadSprite:!0,iconPrefix:"plyr",iconUrl:"https://cdn.plyr.io/3.5.6/plyr.svg",blankVideo:"https://cdn.plyr.io/static/blank.mp4",quality:{default:576,options:[4320,2880,2160,1440,1080,720,576,480,360,240]},loop:{active:!1},speed:{selected:1,options:[.5,.75,1,1.25,1.5,1.75,2]},keyboard:{focused:!0,global:!1},tooltips:{controls:!1,seek:!0},captions:{active:!1,language:"auto",update:!1},fullscreen:{enabled:!0,fallback:!0,iosNative:!1},storage:{enabled:!0,key:"plyr"},controls:["play-large","play","progress","current-time","mute","volume","captions","settings","pip","airplay","fullscreen"],settings:["captions","quality","speed"],i18n:{restart:"Restart",rewind:"Rewind {seektime}s",play:"Play",pause:"Pause",fastForward:"Forward {seektime}s",seek:"Seek",seekLabel:"{currentTime} of {duration}",played:"Played",buffered:"Buffered",currentTime:"Current time",duration:"Duration",volume:"Volume",mute:"Mute",unmute:"Unmute",enableCaptions:"Enable captions",disableCaptions:"Disable captions",download:"Download",enterFullscreen:"Enter fullscreen",exitFullscreen:"Exit fullscreen",frameTitle:"Player for {title}",captions:"Captions",settings:"Settings",menuBack:"Go back to previous menu",speed:"Speed",normal:"Normal",quality:"Quality",loop:"Loop",start:"Start",end:"End",all:"All",reset:"Reset",disabled:"Disabled",enabled:"Enabled",advertisement:"Ad",qualityBadge:{2160:"4K",1440:"HD",1080:"HD",720:"HD",576:"SD",480:"SD"}},urls:{download:null,vimeo:{sdk:"https://player.vimeo.com/api/player.js",iframe:"https://player.vimeo.com/video/{0}?{1}",api:"https://vimeo.com/api/v2/video/{0}.json"},youtube:{sdk:"https://www.youtube.com/iframe_api",api:"https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"},googleIMA:{sdk:"https://imasdk.googleapis.com/js/sdkloader/ima3.js"}},listeners:{seek:null,play:null,pause:null,restart:null,rewind:null,fastForward:null,mute:null,volume:null,captions:null,download:null,fullscreen:null,pip:null,airplay:null,speed:null,quality:null,loop:null,language:null},events:["ended","progress","stalled","playing","waiting","canplay","canplaythrough","loadstart","loadeddata","loadedmetadata","timeupdate","volumechange","play","pause","error","seeking","seeked","emptied","ratechange","cuechange","download","enterfullscreen","exitfullscreen","captionsenabled","captionsdisabled","languagechange","controlshidden","controlsshown","ready","statechange","qualitychange","adsloaded","adscontentpause","adscontentresume","adstarted","adsmidpoint","adscomplete","adsallcomplete","adsimpression","adsclick"],selectors:{editable:"input, textarea, select, [contenteditable]",container:".plyr",controls:{container:null,wrapper:".plyr__controls"},labels:"[data-plyr]",buttons:{play:'[data-plyr="play"]',pause:'[data-plyr="pause"]',restart:'[data-plyr="restart"]',rewind:'[data-plyr="rewind"]',fastForward:'[data-plyr="fast-forward"]',mute:'[data-plyr="mute"]',captions:'[data-plyr="captions"]',download:'[data-plyr="download"]',fullscreen:'[data-plyr="fullscreen"]',pip:'[data-plyr="pip"]',airplay:'[data-plyr="airplay"]',settings:'[data-plyr="settings"]',loop:'[data-plyr="loop"]'},inputs:{seek:'[data-plyr="seek"]',volume:'[data-plyr="volume"]',speed:'[data-plyr="speed"]',language:'[data-plyr="language"]',quality:'[data-plyr="quality"]'},display:{currentTime:".plyr__time--current",duration:".plyr__time--duration",buffer:".plyr__progress__buffer",loop:".plyr__progress__loop",volume:".plyr__volume--display"},progress:".plyr__progress",captions:".plyr__captions",caption:".plyr__caption"},classNames:{type:"plyr--{0}",provider:"plyr--{0}",video:"plyr__video-wrapper",embed:"plyr__video-embed",videoFixedRatio:"plyr__video-wrapper--fixed-ratio",embedContainer:"plyr__video-embed__container",poster:"plyr__poster",posterEnabled:"plyr__poster-enabled",ads:"plyr__ads",control:"plyr__control",controlPressed:"plyr__control--pressed",playing:"plyr--playing",paused:"plyr--paused",stopped:"plyr--stopped",loading:"plyr--loading",hover:"plyr--hover",tooltip:"plyr__tooltip",cues:"plyr__cues",hidden:"plyr__sr-only",hideControls:"plyr--hide-controls",isIos:"plyr--is-ios",isTouch:"plyr--is-touch",uiSupported:"plyr--full-ui",noTransition:"plyr--no-transition",display:{time:"plyr__time"},menu:{value:"plyr__menu__value",badge:"plyr__badge",open:"plyr--menu-open"},captions:{enabled:"plyr--captions-enabled",active:"plyr--captions-active"},fullscreen:{enabled:"plyr--fullscreen-enabled",fallback:"plyr--fullscreen-fallback"},pip:{supported:"plyr--pip-supported",active:"plyr--pip-active"},airplay:{supported:"plyr--airplay-supported",active:"plyr--airplay-active"},tabFocus:"plyr__tab-focus",previewThumbnails:{thumbContainer:"plyr__preview-thumb",thumbContainerShown:"plyr__preview-thumb--is-shown",imageContainer:"plyr__preview-thumb__image-container",timeContainer:"plyr__preview-thumb__time-container",scrubbingContainer:"plyr__preview-scrubbing",scrubbingContainerShown:"plyr__preview-scrubbing--is-shown"}},attributes:{embed:{provider:"data-plyr-provider",id:"data-plyr-embed-id"}},ads:{enabled:!1,publisherId:"",tagUrl:""},previewThumbnails:{enabled:!1,src:""},vimeo:{byline:!1,portrait:!1,title:!1,speed:!0,transparent:!1},youtube:{noCookie:!1,rel:0,showinfo:0,iv_load_policy:3,modestbranding:1}},Me="picture-in-picture",xe="inline",Le={html5:"html5",youtube:"youtube",vimeo:"vimeo"},Ie={audio:"audio",video:"video"};var _e=function(){},Oe=function(){function t(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];e(this,t),this.enabled=window.console&&n,this.enabled&&this.log("Debugging enabled");}return n(t,[{key:"log",get:function(){return this.enabled?Function.prototype.bind.call(console.log,console):_e}},{key:"warn",get:function(){return this.enabled?Function.prototype.bind.call(console.warn,console):_e}},{key:"error",get:function(){return this.enabled?Function.prototype.bind.call(console.error,console):_e}}]),t}();function je(){if(this.enabled){var e=this.player.elements.buttons.fullscreen;N.element(e)&&(e.pressed=this.active),H.call(this.player,this.target,this.active?"enterfullscreen":"exitfullscreen",!0),L.isIos||function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(N.element(e)){var n=G.call(this,"button:not(:disabled), input:not(:disabled), [tabindex]"),i=n[0],a=n[n.length-1];_.call(this,this.elements.container,"keydown",function(e){if("Tab"===e.key&&9===e.keyCode){var t=document.activeElement;t!==a||e.shiftKey?t===i&&e.shiftKey&&(a.focus(),e.preventDefault()):(i.focus(),e.preventDefault());}},t,!1);}}.call(this.player,this.target,this.active);}}function qe(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e?this.scrollPosition={x:window.scrollX||0,y:window.scrollY||0}:window.scrollTo(this.scrollPosition.x,this.scrollPosition.y),document.body.style.overflow=e?"hidden":"",X(this.target,this.player.config.classNames.fullscreen.fallback,e),L.isIos){var t=document.head.querySelector('meta[name="viewport"]'),n="viewport-fit=cover";t||(t=document.createElement("meta")).setAttribute("name","viewport");var i=N.string(t.content)&&t.content.includes(n);e?(this.cleanupViewport=!i,i||(t.content+=",".concat(n))):this.cleanupViewport&&(t.content=t.content.split(",").filter(function(e){return e.trim()!==n}).join(","));}je.call(this);}var He=function(){function t(n){var i=this;e(this,t),this.player=n,this.prefix=t.prefix,this.property=t.property,this.scrollPosition={x:0,y:0},this.forceFallback="force"===n.config.fullscreen.fallback,O.call(this.player,document,"ms"===this.prefix?"MSFullscreenChange":"".concat(this.prefix,"fullscreenchange"),function(){je.call(i);}),O.call(this.player,this.player.elements.container,"dblclick",function(e){N.element(i.player.elements.controls)&&i.player.elements.controls.contains(e.target)||i.toggle();}),this.update();}return n(t,[{key:"update",value:function(){var e;this.enabled?(e=this.forceFallback?"Fallback (forced)":t.native?"Native":"Fallback",this.player.debug.log("".concat(e," fullscreen enabled"))):this.player.debug.log("Fullscreen not supported and fallback disabled");X(this.player.elements.container,this.player.config.classNames.fullscreen.enabled,this.enabled);}},{key:"enter",value:function(){this.enabled&&(L.isIos&&this.player.config.fullscreen.iosNative?this.target.webkitEnterFullscreen():!t.native||this.forceFallback?qe.call(this,!0):this.prefix?N.empty(this.prefix)||this.target["".concat(this.prefix,"Request").concat(this.property)]():this.target.requestFullscreen());}},{key:"exit",value:function(){if(this.enabled)if(L.isIos&&this.player.config.fullscreen.iosNative)this.target.webkitExitFullscreen(),this.player.play();else if(!t.native||this.forceFallback)qe.call(this,!1);else if(this.prefix){if(!N.empty(this.prefix)){var e="moz"===this.prefix?"Cancel":"Exit";document["".concat(this.prefix).concat(e).concat(this.property)]();}}else(document.cancelFullScreen||document.exitFullscreen).call(document);}},{key:"toggle",value:function(){this.active?this.exit():this.enter();}},{key:"usingNative",get:function(){return t.native&&!this.forceFallback}},{key:"enabled",get:function(){return (t.native||this.player.config.fullscreen.fallback)&&this.player.config.fullscreen.enabled&&this.player.supported.ui&&this.player.isVideo}},{key:"active",get:function(){return !!this.enabled&&(!t.native||this.forceFallback?J(this.target,this.player.config.classNames.fullscreen.fallback):(this.prefix?document["".concat(this.prefix).concat(this.property,"Element")]:document.fullscreenElement)===this.target)}},{key:"target",get:function(){return L.isIos&&this.player.config.fullscreen.iosNative?this.player.media:this.player.elements.container}}],[{key:"native",get:function(){return !!(document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled)}},{key:"prefix",get:function(){if(N.function(document.exitFullscreen))return "";var e="";return ["webkit","moz","ms"].some(function(t){return !(!N.function(document["".concat(t,"ExitFullscreen")])&&!N.function(document["".concat(t,"CancelFullScreen")]))&&(e=t,!0)}),e}},{key:"property",get:function(){return "moz"===this.prefix?"FullScreen":"Fullscreen"}}]),t}();function De(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return new Promise(function(n,i){var a=new Image,s=function(){delete a.onload,delete a.onerror,(a.naturalWidth>=t?n:i)(a);};Object.assign(a,{onload:s,onerror:s,src:e});})}var Fe={addStyleHook:function(){X(this.elements.container,this.config.selectors.container.replace(".",""),!0),X(this.elements.container,this.config.classNames.uiSupported,this.supported.ui);},toggleNativeControls:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]&&this.isHTML5?this.media.setAttribute("controls",""):this.media.removeAttribute("controls");},build:function(){var e=this;if(this.listeners.media(),!this.supported.ui)return this.debug.warn("Basic support only for ".concat(this.provider," ").concat(this.type)),void Fe.toggleNativeControls.call(this,!0);N.element(this.elements.controls)||(Ae.inject.call(this),this.listeners.controls()),Fe.toggleNativeControls.call(this),this.isHTML5&&Pe.setup.call(this),this.volume=null,this.muted=null,this.loop=null,this.quality=null,this.speed=null,Ae.updateVolume.call(this),Ae.timeUpdate.call(this),Fe.checkPlaying.call(this),X(this.elements.container,this.config.classNames.pip.supported,ie.pip&&this.isHTML5&&this.isVideo),X(this.elements.container,this.config.classNames.airplay.supported,ie.airplay&&this.isHTML5),X(this.elements.container,this.config.classNames.isIos,L.isIos),X(this.elements.container,this.config.classNames.isTouch,this.touch),this.ready=!0,setTimeout(function(){H.call(e,e.media,"ready");},0),Fe.setTitle.call(this),this.poster&&Fe.setPoster.call(this,this.poster,!1).catch(function(){}),this.config.duration&&Ae.durationUpdate.call(this);},setTitle:function(){var e=ge("play",this.config);if(N.string(this.config.title)&&!N.empty(this.config.title)&&(e+=", ".concat(this.config.title)),Array.from(this.elements.buttons.play||[]).forEach(function(t){t.setAttribute("aria-label",e);}),this.isEmbed){var t=Z.call(this,"iframe");if(!N.element(t))return;var n=N.empty(this.config.title)?"video":this.config.title,i=ge("frameTitle",this.config);t.setAttribute("title",i.replace("{title}",n));}},togglePoster:function(e){X(this.elements.container,this.config.classNames.posterEnabled,e);},setPoster:function(e){var t=this;return arguments.length>1&&void 0!==arguments[1]&&!arguments[1]||!this.poster?(this.media.setAttribute("poster",e),function(){var e=this;return new Promise(function(t){return e.ready?setTimeout(t,0):O.call(e,e.elements.container,"ready",t)}).then(function(){})}.call(this).then(function(){return De(e)}).catch(function(n){throw e===t.poster&&Fe.togglePoster.call(t,!1),n}).then(function(){if(e!==t.poster)throw new Error("setPoster cancelled by later call to setPoster")}).then(function(){return Object.assign(t.elements.poster.style,{backgroundImage:"url('".concat(e,"')"),backgroundSize:""}),Fe.togglePoster.call(t,!0),e})):Promise.reject(new Error("Poster already set"))},checkPlaying:function(e){var t=this;X(this.elements.container,this.config.classNames.playing,this.playing),X(this.elements.container,this.config.classNames.paused,this.paused),X(this.elements.container,this.config.classNames.stopped,this.stopped),Array.from(this.elements.buttons.play||[]).forEach(function(e){Object.assign(e,{pressed:t.playing});}),N.event(e)&&"timeupdate"===e.type||Fe.toggleControls.call(this);},checkLoading:function(e){var t=this;this.loading=["stalled","waiting"].includes(e.type),clearTimeout(this.timers.loading),this.timers.loading=setTimeout(function(){X(t.elements.container,t.config.classNames.loading,t.loading),Fe.toggleControls.call(t);},this.loading?250:0);},toggleControls:function(e){var t=this.elements.controls;if(t&&this.config.hideControls){var n=this.touch&&this.lastSeekTime+2e3>Date.now();this.toggleControls(Boolean(e||this.loading||this.paused||t.pressed||t.hover||n));}}},Re=function(){function t(n){e(this,t),this.player=n,this.lastKey=null,this.focusTimer=null,this.lastKeyDown=null,this.handleKey=this.handleKey.bind(this),this.toggleMenu=this.toggleMenu.bind(this),this.setTabFocus=this.setTabFocus.bind(this),this.firstTouch=this.firstTouch.bind(this);}return n(t,[{key:"handleKey",value:function(e){var t=this.player,n=t.elements,i=e.keyCode?e.keyCode:e.which,a="keydown"===e.type,s=a&&i===this.lastKey;if(!(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)&&N.number(i)){if(a){var r=document.activeElement;if(N.element(r)){var o=t.config.selectors.editable;if(r!==n.inputs.seek&&$(r,o))return;if(32===e.which&&$(r,'button, [role^="menuitem"]'))return}switch([32,37,38,39,40,48,49,50,51,52,53,54,56,57,67,70,73,75,76,77,79].includes(i)&&(e.preventDefault(),e.stopPropagation()),i){case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:s||(t.currentTime=t.duration/10*(i-48));break;case 32:case 75:s||t.togglePlay();break;case 38:t.increaseVolume(.1);break;case 40:t.decreaseVolume(.1);break;case 77:s||(t.muted=!t.muted);break;case 39:t.forward();break;case 37:t.rewind();break;case 70:t.fullscreen.toggle();break;case 67:s||t.toggleCaptions();break;case 76:t.loop=!t.loop;}27===i&&!t.fullscreen.usingNative&&t.fullscreen.active&&t.fullscreen.toggle(),this.lastKey=i;}else this.lastKey=null;}}},{key:"toggleMenu",value:function(e){Ae.toggleMenu.call(this.player,e);}},{key:"firstTouch",value:function(){var e=this.player,t=e.elements;e.touch=!0,X(t.container,e.config.classNames.isTouch,!0);}},{key:"setTabFocus",value:function(e){var t=this.player,n=t.elements;if(clearTimeout(this.focusTimer),"keydown"!==e.type||9===e.which){"keydown"===e.type&&(this.lastKeyDown=e.timeStamp);var i,a=e.timeStamp-this.lastKeyDown<=20;if("focus"!==e.type||a)i=t.config.classNames.tabFocus,X(G.call(t,".".concat(i)),i,!1),this.focusTimer=setTimeout(function(){var e=document.activeElement;n.container.contains(e)&&X(document.activeElement,t.config.classNames.tabFocus,!0);},10);}}},{key:"global",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=this.player;t.config.keyboard.global&&_.call(t,window,"keydown keyup",this.handleKey,e,!1),_.call(t,document.body,"click",this.toggleMenu,e),q.call(t,document.body,"touchstart",this.firstTouch),_.call(t,document.body,"keydown focus blur",this.setTabFocus,e,!1,!0);}},{key:"container",value:function(){var e=this.player,t=e.config,n=e.elements,i=e.timers;!t.keyboard.global&&t.keyboard.focused&&O.call(e,n.container,"keydown keyup",this.handleKey,!1),O.call(e,n.container,"mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen",function(t){var a=n.controls;a&&"enterfullscreen"===t.type&&(a.pressed=!1,a.hover=!1);var s=0;["touchstart","touchmove","mousemove"].includes(t.type)&&(Fe.toggleControls.call(e,!0),s=e.touch?3e3:2e3),clearTimeout(i.controls),i.controls=setTimeout(function(){return Fe.toggleControls.call(e,!1)},s);});var s=function(t){if(!t)return oe.call(e);var i=n.container.getBoundingClientRect(),a=i.width,s=i.height;return oe.call(e,"".concat(a,":").concat(s))},r=function(){clearTimeout(i.resized),i.resized=setTimeout(s,50);};O.call(e,n.container,"enterfullscreen exitfullscreen",function(t){var i=e.fullscreen,o=i.target,l=i.usingNative;if(o===n.container&&(e.isEmbed||!N.empty(e.config.ratio))){var c="enterfullscreen"===t.type,u=s(c);u.padding;!function(t,n,i){if(e.isVimeo){var s=e.elements.wrapper.firstChild,r=a(t,2)[1],o=a(re.call(e),2),l=o[0],c=o[1];s.style.maxWidth=i?"".concat(r/c*l,"px"):null,s.style.margin=i?"0 auto":null;}}(u.ratio,0,c),l||(c?O.call(e,window,"resize",r):j.call(e,window,"resize",r));}});}},{key:"media",value:function(){var e=this,t=this.player,n=t.elements;if(O.call(t,t.media,"timeupdate seeking seeked",function(e){return Ae.timeUpdate.call(t,e)}),O.call(t,t.media,"durationchange loadeddata loadedmetadata",function(e){return Ae.durationUpdate.call(t,e)}),O.call(t,t.media,"canplay loadeddata",function(){Q(n.volume,!t.hasAudio),Q(n.buttons.mute,!t.hasAudio);}),O.call(t,t.media,"ended",function(){t.isHTML5&&t.isVideo&&t.config.resetOnEnd&&t.restart();}),O.call(t,t.media,"progress playing seeking seeked",function(e){return Ae.updateProgress.call(t,e)}),O.call(t,t.media,"volumechange",function(e){return Ae.updateVolume.call(t,e)}),O.call(t,t.media,"playing play pause ended emptied timeupdate",function(e){return Fe.checkPlaying.call(t,e)}),O.call(t,t.media,"waiting canplay seeked playing",function(e){return Fe.checkLoading.call(t,e)}),t.supported.ui&&t.config.clickToPlay&&!t.isAudio){var i=Z.call(t,".".concat(t.config.classNames.video));if(!N.element(i))return;O.call(t,n.container,"click",function(a){([n.container,i].includes(a.target)||i.contains(a.target))&&(t.touch&&t.config.hideControls||(t.ended?(e.proxy(a,t.restart,"restart"),e.proxy(a,t.play,"play")):e.proxy(a,t.togglePlay,"play")));});}t.supported.ui&&t.config.disableContextMenu&&O.call(t,n.wrapper,"contextmenu",function(e){e.preventDefault();},!1),O.call(t,t.media,"volumechange",function(){t.storage.set({volume:t.volume,muted:t.muted});}),O.call(t,t.media,"ratechange",function(){Ae.updateSetting.call(t,"speed"),t.storage.set({speed:t.speed});}),O.call(t,t.media,"qualitychange",function(e){Ae.updateSetting.call(t,"quality",null,e.detail.quality);}),O.call(t,t.media,"ready qualitychange",function(){Ae.setDownloadUrl.call(t);});var a=t.config.events.concat(["keyup","keydown"]).join(" ");O.call(t,t.media,a,function(e){var i=e.detail,a=void 0===i?{}:i;"error"===e.type&&(a=t.media.error),H.call(t,n.container,e.type,!0,a);});}},{key:"proxy",value:function(e,t,n){var i=this.player,a=i.config.listeners[n],s=!0;N.function(a)&&(s=a.call(i,e)),s&&N.function(t)&&t.call(i,e);}},{key:"bind",value:function(e,t,n,i){var a=this,s=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],r=this.player,o=r.config.listeners[i],l=N.function(o);O.call(r,e,t,function(e){return a.proxy(e,n,i)},s&&!l);}},{key:"controls",value:function(){var e=this,t=this.player,n=t.elements,i=L.isIE?"change":"input";if(n.buttons.play&&Array.from(n.buttons.play).forEach(function(n){e.bind(n,"click",t.togglePlay,"play");}),this.bind(n.buttons.restart,"click",t.restart,"restart"),this.bind(n.buttons.rewind,"click",t.rewind,"rewind"),this.bind(n.buttons.fastForward,"click",t.forward,"fastForward"),this.bind(n.buttons.mute,"click",function(){t.muted=!t.muted;},"mute"),this.bind(n.buttons.captions,"click",function(){return t.toggleCaptions()}),this.bind(n.buttons.download,"click",function(){H.call(t,t.media,"download");},"download"),this.bind(n.buttons.fullscreen,"click",function(){t.fullscreen.toggle();},"fullscreen"),this.bind(n.buttons.pip,"click",function(){t.pip="toggle";},"pip"),this.bind(n.buttons.airplay,"click",t.airplay,"airplay"),this.bind(n.buttons.settings,"click",function(e){e.stopPropagation(),Ae.toggleMenu.call(t,e);}),this.bind(n.buttons.settings,"keyup",function(e){var n=e.which;[13,32].includes(n)&&(13!==n?(e.preventDefault(),e.stopPropagation(),Ae.toggleMenu.call(t,e)):Ae.focusFirstMenuItem.call(t,null,!0));},null,!1),this.bind(n.settings.menu,"keydown",function(e){27===e.which&&Ae.toggleMenu.call(t,e);}),this.bind(n.inputs.seek,"mousedown mousemove",function(e){var t=n.progress.getBoundingClientRect(),i=100/t.width*(e.pageX-t.left);e.currentTarget.setAttribute("seek-value",i);}),this.bind(n.inputs.seek,"mousedown mouseup keydown keyup touchstart touchend",function(e){var n=e.currentTarget,i=e.keyCode?e.keyCode:e.which;if(!N.keyboardEvent(e)||39===i||37===i){t.lastSeekTime=Date.now();var a=n.hasAttribute("play-on-seeked"),s=["mouseup","touchend","keyup"].includes(e.type);a&&s?(n.removeAttribute("play-on-seeked"),t.play()):!s&&t.playing&&(n.setAttribute("play-on-seeked",""),t.pause());}}),L.isIos){var s=G.call(t,'input[type="range"]');Array.from(s).forEach(function(t){return e.bind(t,i,function(e){return x(e.target)})});}this.bind(n.inputs.seek,i,function(e){var n=e.currentTarget,i=n.getAttribute("seek-value");N.empty(i)&&(i=n.value),n.removeAttribute("seek-value"),t.currentTime=i/n.max*t.duration;},"seek"),this.bind(n.progress,"mouseenter mouseleave mousemove",function(e){return Ae.updateSeekTooltip.call(t,e)}),this.bind(n.progress,"mousemove touchmove",function(e){var n=t.previewThumbnails;n&&n.loaded&&n.startMove(e);}),this.bind(n.progress,"mouseleave click",function(){var e=t.previewThumbnails;e&&e.loaded&&e.endMove(!1,!0);}),this.bind(n.progress,"mousedown touchstart",function(e){var n=t.previewThumbnails;n&&n.loaded&&n.startScrubbing(e);}),this.bind(n.progress,"mouseup touchend",function(e){var n=t.previewThumbnails;n&&n.loaded&&n.endScrubbing(e);}),L.isWebkit&&Array.from(G.call(t,'input[type="range"]')).forEach(function(n){e.bind(n,"input",function(e){return Ae.updateRangeFill.call(t,e.target)});}),t.config.toggleInvert&&!N.element(n.display.duration)&&this.bind(n.display.currentTime,"click",function(){0!==t.currentTime&&(t.config.invertTime=!t.config.invertTime,Ae.timeUpdate.call(t));}),this.bind(n.inputs.volume,i,function(e){t.volume=e.target.value;},"volume"),this.bind(n.controls,"mouseenter mouseleave",function(e){n.controls.hover=!t.touch&&"mouseenter"===e.type;}),this.bind(n.controls,"mousedown mouseup touchstart touchend touchcancel",function(e){n.controls.pressed=["mousedown","touchstart"].includes(e.type);}),this.bind(n.controls,"focusin",function(){var i=t.config,a=t.timers;X(n.controls,i.classNames.noTransition,!0),Fe.toggleControls.call(t,!0),setTimeout(function(){X(n.controls,i.classNames.noTransition,!1);},0);var s=e.touch?3e3:4e3;clearTimeout(a.controls),a.controls=setTimeout(function(){return Fe.toggleControls.call(t,!1)},s);}),this.bind(n.inputs.volume,"wheel",function(e){var n=e.webkitDirectionInvertedFromDevice,i=a([e.deltaX,-e.deltaY].map(function(e){return n?-e:e}),2),s=i[0],r=i[1],o=Math.sign(Math.abs(s)>Math.abs(r)?s:r);t.increaseVolume(o/50);var l=t.media.volume;(1===o&&l<1||-1===o&&l>0)&&e.preventDefault();},"volume",!1);}}]),t}();var Ve=function(e,t){return e(t={exports:{}},t.exports),t.exports}(function(e,t){e.exports=function(){var e=function(){},t={},n={},i={};function a(e,t){if(e){var a=i[e];if(n[e]=t,a)for(;a.length;)a[0](e,t),a.splice(0,1);}}function s(t,n){t.call&&(t={success:t}),n.length?(t.error||e)(n):(t.success||e)(t);}function r(t,n,i,a){var s,o,l=document,c=i.async,u=(i.numRetries||0)+1,d=i.before||e,h=t.replace(/^(css|img)!/,"");a=a||0,/(^css!|\.css$)/.test(t)?((o=l.createElement("link")).rel="stylesheet",o.href=h,(s="hideFocus"in o)&&o.relList&&(s=0,o.rel="preload",o.as="style")):/(^img!|\.(png|gif|jpg|svg)$)/.test(t)?(o=l.createElement("img")).src=h:((o=l.createElement("script")).src=t,o.async=void 0===c||c),o.onload=o.onerror=o.onbeforeload=function(e){var l=e.type[0];if(s)try{o.sheet.cssText.length||(l="e");}catch(e){18!=e.code&&(l="e");}if("e"==l){if((a+=1)<u)return r(t,n,i,a)}else if("preload"==o.rel&&"style"==o.as)return o.rel="stylesheet";n(t,l,e.defaultPrevented);},!1!==d(t,o)&&l.head.appendChild(o);}function o(e,n,i){var o,l;if(n&&n.trim&&(o=n),l=(o?i:n)||{},o){if(o in t)throw "LoadJS";t[o]=!0;}function c(t,n){!function(e,t,n){var i,a,s=(e=e.push?e:[e]).length,o=s,l=[];for(i=function(e,n,i){if("e"==n&&l.push(e),"b"==n){if(!i)return;l.push(e);}--s||t(l);},a=0;a<o;a++)r(e[a],i,n);}(e,function(e){s(l,e),t&&s({success:t,error:n},e),a(o,e);},l);}if(l.returnPromise)return new Promise(c);c();}return o.ready=function(e,t){return function(e,t){e=e.push?e:[e];var a,s,r,o=[],l=e.length,c=l;for(a=function(e,n){n.length&&o.push(e),--c||t(o);};l--;)s=e[l],(r=n[s])?a(s,r):(i[s]=i[s]||[]).push(a);}(e,function(e){s(t,e);}),o},o.done=function(e){a(e,[]);},o.reset=function(){t={},n={},i={};},o.isDefined=function(e){return e in t},o}();});function Be(e){return new Promise(function(t,n){Ve(e,{success:t,error:n});})}function Ue(e){e&&!this.embed.hasPlayed&&(this.embed.hasPlayed=!0),this.media.paused===e&&(this.media.paused=!e,H.call(this,this.media,e?"play":"pause"));}var We={setup:function(){var e=this;X(this.elements.wrapper,this.config.classNames.embed,!0),oe.call(this),N.object(window.Vimeo)?We.ready.call(this):Be(this.config.urls.vimeo.sdk).then(function(){We.ready.call(e);}).catch(function(t){e.debug.warn("Vimeo SDK (player.js) failed to load",t);});},ready:function(){var e=this,t=this,n=t.config.vimeo,i=Se(F({},{loop:t.config.loop.active,autoplay:t.autoplay,muted:t.muted,gesture:"media",playsinline:!this.config.fullscreen.iosNative},n)),s=t.media.getAttribute("src");N.empty(s)&&(s=t.media.getAttribute(t.config.attributes.embed.id));var r,o=(r=s,N.empty(r)?null:N.number(Number(r))?r:r.match(/^.*(vimeo.com\/|video\/)(\d+).*/)?RegExp.$2:r),l=B("iframe"),c=ue(t.config.urls.vimeo.iframe,o,i);l.setAttribute("src",c),l.setAttribute("allowfullscreen",""),l.setAttribute("allowtransparency",""),l.setAttribute("allow","autoplay");var u=B("div",{poster:t.poster,class:t.config.classNames.embedContainer});u.appendChild(l),t.media=K(u,t.media),ve(ue(t.config.urls.vimeo.api,o),"json").then(function(e){if(!N.empty(e)){var n=new URL(e[0].thumbnail_large);n.pathname="".concat(n.pathname.split("_")[0],".jpg"),Fe.setPoster.call(t,n.href).catch(function(){});}}),t.embed=new window.Vimeo.Player(l,{autopause:t.config.autopause,muted:t.muted}),t.media.paused=!0,t.media.currentTime=0,t.supported.ui&&t.embed.disableTextTrack(),t.media.play=function(){return Ue.call(t,!0),t.embed.play()},t.media.pause=function(){return Ue.call(t,!1),t.embed.pause()},t.media.stop=function(){t.pause(),t.currentTime=0;};var d=t.media.currentTime;Object.defineProperty(t.media,"currentTime",{get:function(){return d},set:function(e){var n=t.embed,i=t.media,a=t.paused,s=t.volume,r=a&&!n.hasPlayed;i.seeking=!0,H.call(t,i,"seeking"),Promise.resolve(r&&n.setVolume(0)).then(function(){return n.setCurrentTime(e)}).then(function(){return r&&n.pause()}).then(function(){return r&&n.setVolume(s)}).catch(function(){});}});var h=t.config.speed.selected;Object.defineProperty(t.media,"playbackRate",{get:function(){return h},set:function(e){t.embed.setPlaybackRate(e).then(function(){h=e,H.call(t,t.media,"ratechange");}).catch(function(e){"Error"===e.name&&Ae.setSpeedMenu.call(t,[]);});}});var m=t.config.volume;Object.defineProperty(t.media,"volume",{get:function(){return m},set:function(e){t.embed.setVolume(e).then(function(){m=e,H.call(t,t.media,"volumechange");});}});var p=t.config.muted;Object.defineProperty(t.media,"muted",{get:function(){return p},set:function(e){var n=!!N.boolean(e)&&e;t.embed.setVolume(n?0:t.config.volume).then(function(){p=n,H.call(t,t.media,"volumechange");});}});var f,g=t.config.loop;Object.defineProperty(t.media,"loop",{get:function(){return g},set:function(e){var n=N.boolean(e)?e:t.config.loop.active;t.embed.setLoop(n).then(function(){g=n;});}}),t.embed.getVideoUrl().then(function(e){f=e,Ae.setDownloadUrl.call(t);}).catch(function(t){e.debug.warn(t);}),Object.defineProperty(t.media,"currentSrc",{get:function(){return f}}),Object.defineProperty(t.media,"ended",{get:function(){return t.currentTime===t.duration}}),Promise.all([t.embed.getVideoWidth(),t.embed.getVideoHeight()]).then(function(n){var i=a(n,2),s=i[0],r=i[1];t.embed.ratio=[s,r],oe.call(e);}),t.embed.setAutopause(t.config.autopause).then(function(e){t.config.autopause=e;}),t.embed.getVideoTitle().then(function(n){t.config.title=n,Fe.setTitle.call(e);}),t.embed.getCurrentTime().then(function(e){d=e,H.call(t,t.media,"timeupdate");}),t.embed.getDuration().then(function(e){t.media.duration=e,H.call(t,t.media,"durationchange");}),t.embed.getTextTracks().then(function(e){t.media.textTracks=e,Pe.setup.call(t);}),t.embed.on("cuechange",function(e){var n=e.cues,i=(void 0===n?[]:n).map(function(e){return function(e){var t=document.createDocumentFragment(),n=document.createElement("div");return t.appendChild(n),n.innerHTML=e,t.firstChild.innerText}(e.text)});Pe.updateCues.call(t,i);}),t.embed.on("loaded",function(){(t.embed.getPaused().then(function(e){Ue.call(t,!e),e||H.call(t,t.media,"playing");}),N.element(t.embed.element)&&t.supported.ui)&&t.embed.element.setAttribute("tabindex",-1);}),t.embed.on("play",function(){Ue.call(t,!0),H.call(t,t.media,"playing");}),t.embed.on("pause",function(){Ue.call(t,!1);}),t.embed.on("timeupdate",function(e){t.media.seeking=!1,d=e.seconds,H.call(t,t.media,"timeupdate");}),t.embed.on("progress",function(e){t.media.buffered=e.percent,H.call(t,t.media,"progress"),1===parseInt(e.percent,10)&&H.call(t,t.media,"canplaythrough"),t.embed.getDuration().then(function(e){e!==t.media.duration&&(t.media.duration=e,H.call(t,t.media,"durationchange"));});}),t.embed.on("seeked",function(){t.media.seeking=!1,H.call(t,t.media,"seeked");}),t.embed.on("ended",function(){t.media.paused=!0,H.call(t,t.media,"ended");}),t.embed.on("error",function(e){t.media.error=e,H.call(t,t.media,"error");}),setTimeout(function(){return Fe.build.call(t)},0);}};function ze(e){e&&!this.embed.hasPlayed&&(this.embed.hasPlayed=!0),this.media.paused===e&&(this.media.paused=!e,H.call(this,this.media,e?"play":"pause"));}function Ke(e){return e.noCookie?"https://www.youtube-nocookie.com":"http:"===window.location.protocol?"http://www.youtube.com":void 0}var Ye={setup:function(){var e=this;if(X(this.elements.wrapper,this.config.classNames.embed,!0),N.object(window.YT)&&N.function(window.YT.Player))Ye.ready.call(this);else{var t=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=function(){N.function(t)&&t(),Ye.ready.call(e);},Be(this.config.urls.youtube.sdk).catch(function(t){e.debug.warn("YouTube API failed to load",t);});}},getTitle:function(e){var t=this;ve(ue(this.config.urls.youtube.api,e)).then(function(e){if(N.object(e)){var n=e.title,i=e.height,a=e.width;t.config.title=n,Fe.setTitle.call(t),t.embed.ratio=[a,i];}oe.call(t);}).catch(function(){oe.call(t);});},ready:function(){var e=this,t=e.media&&e.media.getAttribute("id");if(N.empty(t)||!t.startsWith("youtube-")){var n=e.media.getAttribute("src");N.empty(n)&&(n=e.media.getAttribute(this.config.attributes.embed.id));var i,a,s=(i=n,N.empty(i)?null:i.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)?RegExp.$2:i),r=(a=e.provider,"".concat(a,"-").concat(Math.floor(1e4*Math.random()))),o=B("div",{id:r,poster:e.poster});e.media=K(o,e.media);var l=function(e){return "https://i.ytimg.com/vi/".concat(s,"/").concat(e,"default.jpg")};De(l("maxres"),121).catch(function(){return De(l("sd"),121)}).catch(function(){return De(l("hq"))}).then(function(t){return Fe.setPoster.call(e,t.src)}).then(function(t){t.includes("maxres")||(e.elements.poster.style.backgroundSize="cover");}).catch(function(){});var c=e.config.youtube;e.embed=new window.YT.Player(r,{videoId:s,host:Ke(c),playerVars:F({},{autoplay:e.config.autoplay?1:0,hl:e.config.hl,controls:e.supported.ui?0:1,disablekb:1,playsinline:e.config.fullscreen.iosNative?0:1,cc_load_policy:e.captions.active?1:0,cc_lang_pref:e.config.captions.language,widget_referrer:window?window.location.href:null},c),events:{onError:function(t){if(!e.media.error){var n=t.data,i={2:"The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",5:"The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",100:"The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",101:"The owner of the requested video does not allow it to be played in embedded players.",150:"The owner of the requested video does not allow it to be played in embedded players."}[n]||"An unknown error occured";e.media.error={code:n,message:i},H.call(e,e.media,"error");}},onPlaybackRateChange:function(t){var n=t.target;e.media.playbackRate=n.getPlaybackRate(),H.call(e,e.media,"ratechange");},onReady:function(t){if(!N.function(e.media.play)){var n=t.target;Ye.getTitle.call(e,s),e.media.play=function(){ze.call(e,!0),n.playVideo();},e.media.pause=function(){ze.call(e,!1),n.pauseVideo();},e.media.stop=function(){n.stopVideo();},e.media.duration=n.getDuration(),e.media.paused=!0,e.media.currentTime=0,Object.defineProperty(e.media,"currentTime",{get:function(){return Number(n.getCurrentTime())},set:function(t){e.paused&&!e.embed.hasPlayed&&e.embed.mute(),e.media.seeking=!0,H.call(e,e.media,"seeking"),n.seekTo(t);}}),Object.defineProperty(e.media,"playbackRate",{get:function(){return n.getPlaybackRate()},set:function(e){n.setPlaybackRate(e);}});var i=e.config.volume;Object.defineProperty(e.media,"volume",{get:function(){return i},set:function(t){i=t,n.setVolume(100*i),H.call(e,e.media,"volumechange");}});var a=e.config.muted;Object.defineProperty(e.media,"muted",{get:function(){return a},set:function(t){var i=N.boolean(t)?t:a;a=i,n[i?"mute":"unMute"](),H.call(e,e.media,"volumechange");}}),Object.defineProperty(e.media,"currentSrc",{get:function(){return n.getVideoUrl()}}),Object.defineProperty(e.media,"ended",{get:function(){return e.currentTime===e.duration}}),e.options.speed=n.getAvailablePlaybackRates(),e.supported.ui&&e.media.setAttribute("tabindex",-1),H.call(e,e.media,"timeupdate"),H.call(e,e.media,"durationchange"),clearInterval(e.timers.buffering),e.timers.buffering=setInterval(function(){e.media.buffered=n.getVideoLoadedFraction(),(null===e.media.lastBuffered||e.media.lastBuffered<e.media.buffered)&&H.call(e,e.media,"progress"),e.media.lastBuffered=e.media.buffered,1===e.media.buffered&&(clearInterval(e.timers.buffering),H.call(e,e.media,"canplaythrough"));},200),setTimeout(function(){return Fe.build.call(e)},50);}},onStateChange:function(t){var n=t.target;switch(clearInterval(e.timers.playing),e.media.seeking&&[1,2].includes(t.data)&&(e.media.seeking=!1,H.call(e,e.media,"seeked")),t.data){case-1:H.call(e,e.media,"timeupdate"),e.media.buffered=n.getVideoLoadedFraction(),H.call(e,e.media,"progress");break;case 0:ze.call(e,!1),e.media.loop?(n.stopVideo(),n.playVideo()):H.call(e,e.media,"ended");break;case 1:e.config.autoplay||!e.media.paused||e.embed.hasPlayed?(ze.call(e,!0),H.call(e,e.media,"playing"),e.timers.playing=setInterval(function(){H.call(e,e.media,"timeupdate");},50),e.media.duration!==n.getDuration()&&(e.media.duration=n.getDuration(),H.call(e,e.media,"durationchange"))):e.media.pause();break;case 2:e.muted||e.embed.unMute(),ze.call(e,!1);}H.call(e,e.elements.container,"statechange",!1,{code:t.data});}}});}}},Qe={setup:function(){this.media?(X(this.elements.container,this.config.classNames.type.replace("{0}",this.type),!0),X(this.elements.container,this.config.classNames.provider.replace("{0}",this.provider),!0),this.isEmbed&&X(this.elements.container,this.config.classNames.type.replace("{0}","video"),!0),this.isVideo&&(this.elements.wrapper=B("div",{class:this.config.classNames.video}),R(this.media,this.elements.wrapper),this.elements.poster=B("div",{class:this.config.classNames.poster}),this.elements.wrapper.appendChild(this.elements.poster)),this.isHTML5?le.extend.call(this):this.isYouTube?Ye.setup.call(this):this.isVimeo&&We.setup.call(this)):this.debug.warn("No media element found!");}},Xe=function(){function t(n){var i=this;e(this,t),this.player=n,this.config=n.config.ads,this.playing=!1,this.initialized=!1,this.elements={container:null,displayContainer:null},this.manager=null,this.loader=null,this.cuePoints=null,this.events={},this.safetyTimer=null,this.countdownTimer=null,this.managerPromise=new Promise(function(e,t){i.on("loaded",e),i.on("error",t);}),this.load();}return n(t,[{key:"load",value:function(){var e=this;this.enabled&&(N.object(window.google)&&N.object(window.google.ima)?this.ready():Be(this.player.config.urls.googleIMA.sdk).then(function(){e.ready();}).catch(function(){e.trigger("error",new Error("Google IMA SDK failed to load"));}));}},{key:"ready",value:function(){var e,t=this;this.enabled||((e=this).manager&&e.manager.destroy(),e.elements.displayContainer&&e.elements.displayContainer.destroy(),e.elements.container.remove()),this.startSafetyTimer(12e3,"ready()"),this.managerPromise.then(function(){t.clearSafetyTimer("onAdsManagerLoaded()");}),this.listeners(),this.setupIMA();}},{key:"setupIMA",value:function(){this.elements.container=B("div",{class:this.player.config.classNames.ads}),this.player.elements.container.appendChild(this.elements.container),google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED),google.ima.settings.setLocale(this.player.config.ads.language),google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline),this.elements.displayContainer=new google.ima.AdDisplayContainer(this.elements.container,this.player.media),this.requestAds();}},{key:"requestAds",value:function(){var e=this,t=this.player.elements.container;try{this.loader=new google.ima.AdsLoader(this.elements.displayContainer),this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,function(t){return e.onAdsManagerLoaded(t)},!1),this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,function(t){return e.onAdError(t)},!1);var n=new google.ima.AdsRequest;n.adTagUrl=this.tagUrl,n.linearAdSlotWidth=t.offsetWidth,n.linearAdSlotHeight=t.offsetHeight,n.nonLinearAdSlotWidth=t.offsetWidth,n.nonLinearAdSlotHeight=t.offsetHeight,n.forceNonLinearFullSlot=!1,n.setAdWillPlayMuted(!this.player.muted),this.loader.requestAds(n);}catch(e){this.onAdError(e);}}},{key:"pollCountdown",value:function(){var e=this;if(!(arguments.length>0&&void 0!==arguments[0]&&arguments[0]))return clearInterval(this.countdownTimer),void this.elements.container.removeAttribute("data-badge-text");this.countdownTimer=setInterval(function(){var t=Ce(Math.max(e.manager.getRemainingTime(),0)),n="".concat(ge("advertisement",e.player.config)," - ").concat(t);e.elements.container.setAttribute("data-badge-text",n);},100);}},{key:"onAdsManagerLoaded",value:function(e){var t=this;if(this.enabled){var n=new google.ima.AdsRenderingSettings;n.restoreCustomPlaybackStateOnAdBreakComplete=!0,n.enablePreloading=!0,this.manager=e.getAdsManager(this.player,n),this.cuePoints=this.manager.getCuePoints(),this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,function(e){return t.onAdError(e)}),Object.keys(google.ima.AdEvent.Type).forEach(function(e){t.manager.addEventListener(google.ima.AdEvent.Type[e],function(e){return t.onAdEvent(e)});}),this.trigger("loaded");}}},{key:"addCuePoints",value:function(){var e=this;N.empty(this.cuePoints)||this.cuePoints.forEach(function(t){if(0!==t&&-1!==t&&t<e.player.duration){var n=e.player.elements.progress;if(N.element(n)){var i=100/e.player.duration*t,a=B("span",{class:e.player.config.classNames.cues});a.style.left="".concat(i.toString(),"%"),n.appendChild(a);}}});}},{key:"onAdEvent",value:function(e){var t=this,n=this.player.elements.container,i=e.getAd(),a=e.getAdData();switch(function(e){H.call(t.player,t.player.media,"ads".concat(e.replace(/_/g,"").toLowerCase()));}(e.type),e.type){case google.ima.AdEvent.Type.LOADED:this.trigger("loaded"),this.pollCountdown(!0),i.isLinear()||(i.width=n.offsetWidth,i.height=n.offsetHeight);break;case google.ima.AdEvent.Type.STARTED:this.manager.setVolume(this.player.volume);break;case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:this.loadAds();break;case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:this.pauseContent();break;case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:this.pollCountdown(),this.resumeContent();break;case google.ima.AdEvent.Type.LOG:a.adError&&this.player.debug.warn("Non-fatal ad error: ".concat(a.adError.getMessage()));}}},{key:"onAdError",value:function(e){this.cancel(),this.player.debug.warn("Ads error",e);}},{key:"listeners",value:function(){var e,t=this,n=this.player.elements.container;this.player.on("canplay",function(){t.addCuePoints();}),this.player.on("ended",function(){t.loader.contentComplete();}),this.player.on("timeupdate",function(){e=t.player.currentTime;}),this.player.on("seeked",function(){var n=t.player.currentTime;N.empty(t.cuePoints)||t.cuePoints.forEach(function(i,a){e<i&&i<n&&(t.manager.discardAdBreak(),t.cuePoints.splice(a,1));});}),window.addEventListener("resize",function(){t.manager&&t.manager.resize(n.offsetWidth,n.offsetHeight,google.ima.ViewMode.NORMAL);});}},{key:"play",value:function(){var e=this,t=this.player.elements.container;this.managerPromise||this.resumeContent(),this.managerPromise.then(function(){e.manager.setVolume(e.player.volume),e.elements.displayContainer.initialize();try{e.initialized||(e.manager.init(t.offsetWidth,t.offsetHeight,google.ima.ViewMode.NORMAL),e.manager.start()),e.initialized=!0;}catch(t){e.onAdError(t);}}).catch(function(){});}},{key:"resumeContent",value:function(){this.elements.container.style.zIndex="",this.playing=!1,this.player.media.play();}},{key:"pauseContent",value:function(){this.elements.container.style.zIndex=3,this.playing=!0,this.player.media.pause();}},{key:"cancel",value:function(){this.initialized&&this.resumeContent(),this.trigger("error"),this.loadAds();}},{key:"loadAds",value:function(){var e=this;this.managerPromise.then(function(){e.manager&&e.manager.destroy(),e.managerPromise=new Promise(function(t){e.on("loaded",t),e.player.debug.log(e.manager);}),e.requestAds();}).catch(function(){});}},{key:"trigger",value:function(e){for(var t=this,n=arguments.length,i=new Array(n>1?n-1:0),a=1;a<n;a++)i[a-1]=arguments[a];var s=this.events[e];N.array(s)&&s.forEach(function(e){N.function(e)&&e.apply(t,i);});}},{key:"on",value:function(e,t){return N.array(this.events[e])||(this.events[e]=[]),this.events[e].push(t),this}},{key:"startSafetyTimer",value:function(e,t){var n=this;this.player.debug.log("Safety timer invoked from: ".concat(t)),this.safetyTimer=setTimeout(function(){n.cancel(),n.clearSafetyTimer("startSafetyTimer()");},e);}},{key:"clearSafetyTimer",value:function(e){N.nullOrUndefined(this.safetyTimer)||(this.player.debug.log("Safety timer cleared from: ".concat(e)),clearTimeout(this.safetyTimer),this.safetyTimer=null);}},{key:"enabled",get:function(){var e=this.config;return this.player.isHTML5&&this.player.isVideo&&e.enabled&&(!N.empty(e.publisherId)||N.url(e.tagUrl))}},{key:"tagUrl",get:function(){var e=this.config;if(N.url(e.tagUrl))return e.tagUrl;var t={AV_PUBLISHERID:"58c25bb0073ef448b1087ad6",AV_CHANNELID:"5a0458dc28a06145e4519d21",AV_URL:window.location.hostname,cb:Date.now(),AV_WIDTH:640,AV_HEIGHT:480,AV_CDIM2:this.publisherId};return "".concat("https://go.aniview.com/api/adserver6/vast/","?").concat(Se(t))}}]),t}(),Je=function(){function t(n){e(this,t),this.player=n,this.thumbnails=[],this.loaded=!1,this.lastMouseMoveTime=Date.now(),this.mouseDown=!1,this.loadedImages=[],this.elements={thumb:{},scrubbing:{}},this.load();}return n(t,[{key:"load",value:function(){var e=this;this.player.elements.display.seekTooltip&&(this.player.elements.display.seekTooltip.hidden=this.enabled),this.enabled&&this.getThumbnails().then(function(){e.enabled&&(e.render(),e.determineContainerAutoSizing(),e.loaded=!0);});}},{key:"getThumbnails",value:function(){var e=this;return new Promise(function(t){var n=e.player.config.previewThumbnails.src;if(N.empty(n))throw new Error("Missing previewThumbnails.src config attribute");var i=(N.string(n)?[n]:n).map(function(t){return e.getThumbnail(t)});Promise.all(i).then(function(){e.thumbnails.sort(function(e,t){return e.height-t.height}),e.player.debug.log("Preview thumbnails",e.thumbnails),t();});})}},{key:"getThumbnail",value:function(e){var t=this;return new Promise(function(n){ve(e).then(function(i){var s,r,o={frames:(s=i,r=[],s.split(/\r\n\r\n|\n\n|\r\r/).forEach(function(e){var t={};e.split(/\r\n|\n|\r/).forEach(function(e){if(N.number(t.startTime)){if(!N.empty(e.trim())&&N.empty(t.text)){var n=e.trim().split("#xywh="),i=a(n,1);if(t.text=i[0],n[1]){var s=a(n[1].split(","),4);t.x=s[0],t.y=s[1],t.w=s[2],t.h=s[3];}}}else{var r=e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);r&&(t.startTime=60*Number(r[1]||0)*60+60*Number(r[2])+Number(r[3])+Number("0.".concat(r[4])),t.endTime=60*Number(r[6]||0)*60+60*Number(r[7])+Number(r[8])+Number("0.".concat(r[9])));}}),t.text&&r.push(t);}),r),height:null,urlPrefix:""};o.frames[0].text.startsWith("/")||o.frames[0].text.startsWith("http://")||o.frames[0].text.startsWith("https://")||(o.urlPrefix=e.substring(0,e.lastIndexOf("/")+1));var l=new Image;l.onload=function(){o.height=l.naturalHeight,o.width=l.naturalWidth,t.thumbnails.push(o),n();},l.src=o.urlPrefix+o.frames[0].text;});})}},{key:"startMove",value:function(e){if(this.loaded&&N.event(e)&&["touchmove","mousemove"].includes(e.type)&&this.player.media.duration){if("touchmove"===e.type)this.seekTime=this.player.media.duration*(this.player.elements.inputs.seek.value/100);else{var t=this.player.elements.progress.getBoundingClientRect(),n=100/t.width*(e.pageX-t.left);this.seekTime=this.player.media.duration*(n/100),this.seekTime<0&&(this.seekTime=0),this.seekTime>this.player.media.duration-1&&(this.seekTime=this.player.media.duration-1),this.mousePosX=e.pageX,this.elements.thumb.time.innerText=Ce(this.seekTime);}this.showImageAtCurrentTime();}}},{key:"endMove",value:function(){this.toggleThumbContainer(!1,!0);}},{key:"startScrubbing",value:function(e){!1!==e.button&&0!==e.button||(this.mouseDown=!0,this.player.media.duration&&(this.toggleScrubbingContainer(!0),this.toggleThumbContainer(!1,!0),this.showImageAtCurrentTime()));}},{key:"endScrubbing",value:function(){var e=this;this.mouseDown=!1,Math.ceil(this.lastTime)===Math.ceil(this.player.media.currentTime)?this.toggleScrubbingContainer(!1):q.call(this.player,this.player.media,"timeupdate",function(){e.mouseDown||e.toggleScrubbingContainer(!1);});}},{key:"listeners",value:function(){var e=this;this.player.on("play",function(){e.toggleThumbContainer(!1,!0);}),this.player.on("seeked",function(){e.toggleThumbContainer(!1);}),this.player.on("timeupdate",function(){e.lastTime=e.player.media.currentTime;});}},{key:"render",value:function(){this.elements.thumb.container=B("div",{class:this.player.config.classNames.previewThumbnails.thumbContainer}),this.elements.thumb.imageContainer=B("div",{class:this.player.config.classNames.previewThumbnails.imageContainer}),this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);var e=B("div",{class:this.player.config.classNames.previewThumbnails.timeContainer});this.elements.thumb.time=B("span",{},"00:00"),e.appendChild(this.elements.thumb.time),this.elements.thumb.container.appendChild(e),N.element(this.player.elements.progress)&&this.player.elements.progress.appendChild(this.elements.thumb.container),this.elements.scrubbing.container=B("div",{class:this.player.config.classNames.previewThumbnails.scrubbingContainer}),this.player.elements.wrapper.appendChild(this.elements.scrubbing.container);}},{key:"showImageAtCurrentTime",value:function(){var e=this;this.mouseDown?this.setScrubbingContainerSize():this.setThumbContainerSizeAndPos();var t=this.thumbnails[0].frames.findIndex(function(t){return e.seekTime>=t.startTime&&e.seekTime<=t.endTime}),n=t>=0,i=0;this.mouseDown||this.toggleThumbContainer(n),n&&(this.thumbnails.forEach(function(n,a){e.loadedImages.includes(n.frames[t].text)&&(i=a);}),t!==this.showingThumb&&(this.showingThumb=t,this.loadImage(i)));}},{key:"loadImage",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=this.showingThumb,i=this.thumbnails[t],a=i.urlPrefix,s=i.frames[n],r=i.frames[n].text,o=a+r;if(this.currentImageElement&&this.currentImageElement.dataset.filename===r)this.showImage(this.currentImageElement,s,t,n,r,!1),this.currentImageElement.dataset.index=n,this.removeOldImages(this.currentImageElement);else{this.loadingImage&&this.usingSprites&&(this.loadingImage.onload=null);var l=new Image;l.src=o,l.dataset.index=n,l.dataset.filename=r,this.showingThumbFilename=r,this.player.debug.log("Loading image: ".concat(o)),l.onload=function(){return e.showImage(l,s,t,n,r,!0)},this.loadingImage=l,this.removeOldImages(l);}}},{key:"showImage",value:function(e,t,n,i,a){var s=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];this.player.debug.log("Showing thumb: ".concat(a,". num: ").concat(i,". qual: ").concat(n,". newimg: ").concat(s)),this.setImageSizeAndOffset(e,t),s&&(this.currentImageContainer.appendChild(e),this.currentImageElement=e,this.loadedImages.includes(a)||this.loadedImages.push(a)),this.preloadNearby(i,!0).then(this.preloadNearby(i,!1)).then(this.getHigherQuality(n,e,t,a));}},{key:"removeOldImages",value:function(e){var t=this;Array.from(this.currentImageContainer.children).forEach(function(n){if("img"===n.tagName.toLowerCase()){var i=t.usingSprites?500:1e3;if(n.dataset.index!==e.dataset.index&&!n.dataset.deleting){n.dataset.deleting=!0;var a=t.currentImageContainer;setTimeout(function(){a.removeChild(n),t.player.debug.log("Removing thumb: ".concat(n.dataset.filename));},i);}}});}},{key:"preloadNearby",value:function(e){var t=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return new Promise(function(i){setTimeout(function(){var a=t.thumbnails[0].frames[e].text;if(t.showingThumbFilename===a){var s;s=n?t.thumbnails[0].frames.slice(e):t.thumbnails[0].frames.slice(0,e).reverse();var r=!1;s.forEach(function(e){var n=e.text;if(n!==a&&!t.loadedImages.includes(n)){r=!0,t.player.debug.log("Preloading thumb filename: ".concat(n));var s=t.thumbnails[0].urlPrefix+n,o=new Image;o.src=s,o.onload=function(){t.player.debug.log("Preloaded thumb filename: ".concat(n)),t.loadedImages.includes(n)||t.loadedImages.push(n),i();};}}),r||i();}},300);})}},{key:"getHigherQuality",value:function(e,t,n,i){var a=this;if(e<this.thumbnails.length-1){var s=t.naturalHeight;this.usingSprites&&(s=n.h),s<this.thumbContainerHeight&&setTimeout(function(){a.showingThumbFilename===i&&(a.player.debug.log("Showing higher quality thumb for: ".concat(i)),a.loadImage(e+1));},300);}}},{key:"toggleThumbContainer",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.player.config.classNames.previewThumbnails.thumbContainerShown;this.elements.thumb.container.classList.toggle(n,e),!e&&t&&(this.showingThumb=null,this.showingThumbFilename=null);}},{key:"toggleScrubbingContainer",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this.player.config.classNames.previewThumbnails.scrubbingContainerShown;this.elements.scrubbing.container.classList.toggle(t,e),e||(this.showingThumb=null,this.showingThumbFilename=null);}},{key:"determineContainerAutoSizing",value:function(){this.elements.thumb.imageContainer.clientHeight>20&&(this.sizeSpecifiedInCSS=!0);}},{key:"setThumbContainerSizeAndPos",value:function(){if(!this.sizeSpecifiedInCSS){var e=Math.floor(this.thumbContainerHeight*this.thumbAspectRatio);this.elements.thumb.imageContainer.style.height="".concat(this.thumbContainerHeight,"px"),this.elements.thumb.imageContainer.style.width="".concat(e,"px");}this.setThumbContainerPos();}},{key:"setThumbContainerPos",value:function(){var e=this.player.elements.progress.getBoundingClientRect(),t=this.player.elements.container.getBoundingClientRect(),n=this.elements.thumb.container,i=t.left-e.left+10,a=t.right-e.left-n.clientWidth-10,s=this.mousePosX-e.left-n.clientWidth/2;s<i&&(s=i),s>a&&(s=a),n.style.left="".concat(s,"px");}},{key:"setScrubbingContainerSize",value:function(){this.elements.scrubbing.container.style.width="".concat(this.player.media.clientWidth,"px"),this.elements.scrubbing.container.style.height="".concat(this.player.media.clientWidth/this.thumbAspectRatio,"px");}},{key:"setImageSizeAndOffset",value:function(e,t){if(this.usingSprites){var n=this.thumbContainerHeight/t.h;e.style.height="".concat(Math.floor(e.naturalHeight*n),"px"),e.style.width="".concat(Math.floor(e.naturalWidth*n),"px"),e.style.left="-".concat(t.x*n,"px"),e.style.top="-".concat(t.y*n,"px");}}},{key:"enabled",get:function(){return this.player.isHTML5&&this.player.isVideo&&this.player.config.previewThumbnails.enabled}},{key:"currentImageContainer",get:function(){return this.mouseDown?this.elements.scrubbing.container:this.elements.thumb.imageContainer}},{key:"usingSprites",get:function(){return Object.keys(this.thumbnails[0].frames[0]).includes("w")}},{key:"thumbAspectRatio",get:function(){return this.usingSprites?this.thumbnails[0].frames[0].w/this.thumbnails[0].frames[0].h:this.thumbnails[0].width/this.thumbnails[0].height}},{key:"thumbContainerHeight",get:function(){return this.mouseDown?Math.floor(this.player.media.clientWidth/this.thumbAspectRatio):Math.floor(this.player.media.clientWidth/this.thumbAspectRatio/4)}},{key:"currentImageElement",get:function(){return this.mouseDown?this.currentScrubbingImageElement:this.currentThumbnailImageElement},set:function(e){this.mouseDown?this.currentScrubbingImageElement=e:this.currentThumbnailImageElement=e;}}]),t}(),$e={insertElements:function(e,t){var n=this;N.string(t)?U(e,this.media,{src:t}):N.array(t)&&t.forEach(function(t){U(e,n.media,t);});},change:function(e){var t=this;D(e,"sources.length")?(le.cancelRequests.call(this),this.destroy.call(this,function(){t.options.quality=[],W(t.media),t.media=null,N.element(t.elements.container)&&t.elements.container.removeAttribute("class");var n=e.sources,i=e.type,s=a(n,1)[0],r=s.provider,o=void 0===r?Le.html5:r,l=s.src,c="html5"===o?i:"div",u="html5"===o?{}:{src:l};Object.assign(t,{provider:o,type:i,supported:ie.check(i,o,t.config.playsinline),media:B(c,u)}),t.elements.container.appendChild(t.media),N.boolean(e.autoplay)&&(t.config.autoplay=e.autoplay),t.isHTML5&&(t.config.crossorigin&&t.media.setAttribute("crossorigin",""),t.config.autoplay&&t.media.setAttribute("autoplay",""),N.empty(e.poster)||(t.poster=e.poster),t.config.loop.active&&t.media.setAttribute("loop",""),t.config.muted&&t.media.setAttribute("muted",""),t.config.playsinline&&t.media.setAttribute("playsinline","")),Fe.addStyleHook.call(t),t.isHTML5&&$e.insertElements.call(t,"source",n),t.config.title=e.title,Qe.setup.call(t),t.isHTML5&&Object.keys(e).includes("tracks")&&$e.insertElements.call(t,"track",e.tracks),(t.isHTML5||t.isEmbed&&!t.supported.ui)&&Fe.build.call(t),t.isHTML5&&t.media.load(),t.previewThumbnails&&t.previewThumbnails.load(),t.fullscreen.update();},!0)):this.debug.warn("Invalid source format");}};var Ge,Ze=function(){function t(n,i){var a=this;if(e(this,t),this.timers={},this.ready=!1,this.loading=!1,this.failed=!1,this.touch=ie.touch,this.media=n,N.string(this.media)&&(this.media=document.querySelectorAll(this.media)),(window.jQuery&&this.media instanceof jQuery||N.nodeList(this.media)||N.array(this.media))&&(this.media=this.media[0]),this.config=F({},Ne,t.defaults,i||{},function(){try{return JSON.parse(a.media.getAttribute("data-plyr-config"))}catch(e){return {}}}()),this.elements={container:null,captions:null,buttons:{},display:{},progress:{},inputs:{},settings:{popup:null,menu:null,panels:{},buttons:{}}},this.captions={active:null,currentTrack:-1,meta:new WeakMap},this.fullscreen={active:!1},this.options={speed:[],quality:[]},this.debug=new Oe(this.config.debug),this.debug.log("Config",this.config),this.debug.log("Support",ie),!N.nullOrUndefined(this.media)&&N.element(this.media))if(this.media.plyr)this.debug.warn("Target already setup");else if(this.config.enabled)if(ie.check().api){var s=this.media.cloneNode(!0);s.autoplay=!1,this.elements.original=s;var r=this.media.tagName.toLowerCase(),o=null,l=null;switch(r){case"div":if(o=this.media.querySelector("iframe"),N.element(o)){if(l=Ee(o.getAttribute("src")),this.provider=function(e){return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e)?Le.youtube:/^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e)?Le.vimeo:null}(l.toString()),this.elements.container=this.media,this.media=o,this.elements.container.className="",l.search.length){var c=["1","true"];c.includes(l.searchParams.get("autoplay"))&&(this.config.autoplay=!0),c.includes(l.searchParams.get("loop"))&&(this.config.loop.active=!0),this.isYouTube?(this.config.playsinline=c.includes(l.searchParams.get("playsinline")),this.config.youtube.hl=l.searchParams.get("hl")):this.config.playsinline=!0;}}else this.provider=this.media.getAttribute(this.config.attributes.embed.provider),this.media.removeAttribute(this.config.attributes.embed.provider);if(N.empty(this.provider)||!Object.keys(Le).includes(this.provider))return void this.debug.error("Setup failed: Invalid provider");this.type=Ie.video;break;case"video":case"audio":this.type=r,this.provider=Le.html5,this.media.hasAttribute("crossorigin")&&(this.config.crossorigin=!0),this.media.hasAttribute("autoplay")&&(this.config.autoplay=!0),(this.media.hasAttribute("playsinline")||this.media.hasAttribute("webkit-playsinline"))&&(this.config.playsinline=!0),this.media.hasAttribute("muted")&&(this.config.muted=!0),this.media.hasAttribute("loop")&&(this.config.loop.active=!0);break;default:return void this.debug.error("Setup failed: unsupported type")}this.supported=ie.check(this.type,this.provider,this.config.playsinline),this.supported.api?(this.eventListeners=[],this.listeners=new Re(this),this.storage=new ye(this),this.media.plyr=this,N.element(this.elements.container)||(this.elements.container=B("div",{tabindex:0}),R(this.media,this.elements.container)),Fe.addStyleHook.call(this),Qe.setup.call(this),this.config.debug&&O.call(this,this.elements.container,this.config.events.join(" "),function(e){a.debug.log("event: ".concat(e.type));}),(this.isHTML5||this.isEmbed&&!this.supported.ui)&&Fe.build.call(this),this.listeners.container(),this.listeners.global(),this.fullscreen=new He(this),this.config.ads.enabled&&(this.ads=new Xe(this)),this.isHTML5&&this.config.autoplay&&setTimeout(function(){return a.play()},10),this.lastSeekTime=0,this.config.previewThumbnails.enabled&&(this.previewThumbnails=new Je(this))):this.debug.error("Setup failed: no support");}else this.debug.error("Setup failed: no support");else this.debug.error("Setup failed: disabled by config");else this.debug.error("Setup failed: no suitable element passed");}return n(t,[{key:"play",value:function(){var e=this;return N.function(this.media.play)?(this.ads&&this.ads.enabled&&this.ads.managerPromise.then(function(){return e.ads.play()}).catch(function(){return e.media.play()}),this.media.play()):null}},{key:"pause",value:function(){this.playing&&N.function(this.media.pause)&&this.media.pause();}},{key:"togglePlay",value:function(e){(N.boolean(e)?e:!this.playing)?this.play():this.pause();}},{key:"stop",value:function(){this.isHTML5?(this.pause(),this.restart()):N.function(this.media.stop)&&this.media.stop();}},{key:"restart",value:function(){this.currentTime=0;}},{key:"rewind",value:function(e){this.currentTime=this.currentTime-(N.number(e)?e:this.config.seekTime);}},{key:"forward",value:function(e){this.currentTime=this.currentTime+(N.number(e)?e:this.config.seekTime);}},{key:"increaseVolume",value:function(e){var t=this.media.muted?0:this.volume;this.volume=t+(N.number(e)?e:0);}},{key:"decreaseVolume",value:function(e){this.increaseVolume(-e);}},{key:"toggleCaptions",value:function(e){Pe.toggle.call(this,e,!1);}},{key:"airplay",value:function(){ie.airplay&&this.media.webkitShowPlaybackTargetPicker();}},{key:"toggleControls",value:function(e){if(this.supported.ui&&!this.isAudio){var t=J(this.elements.container,this.config.classNames.hideControls),n=void 0===e?void 0:!e,i=X(this.elements.container,this.config.classNames.hideControls,n);if(i&&this.config.controls.includes("settings")&&!N.empty(this.config.settings)&&Ae.toggleMenu.call(this,!1),i!==t){var a=i?"controlshidden":"controlsshown";H.call(this,this.media,a);}return !i}return !1}},{key:"on",value:function(e,t){O.call(this,this.elements.container,e,t);}},{key:"once",value:function(e,t){q.call(this,this.elements.container,e,t);}},{key:"off",value:function(e,t){j(this.elements.container,e,t);}},{key:"destroy",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(this.ready){var i=function(){document.body.style.overflow="",t.embed=null,n?(Object.keys(t.elements).length&&(W(t.elements.buttons.play),W(t.elements.captions),W(t.elements.controls),W(t.elements.wrapper),t.elements.buttons.play=null,t.elements.captions=null,t.elements.controls=null,t.elements.wrapper=null),N.function(e)&&e()):(function(){this&&this.eventListeners&&(this.eventListeners.forEach(function(e){var t=e.element,n=e.type,i=e.callback,a=e.options;t.removeEventListener(n,i,a);}),this.eventListeners=[]);}.call(t),K(t.elements.original,t.elements.container),H.call(t,t.elements.original,"destroyed",!0),N.function(e)&&e.call(t.elements.original),t.ready=!1,setTimeout(function(){t.elements=null,t.media=null;},200));};this.stop(),clearTimeout(this.timers.loading),clearTimeout(this.timers.controls),clearTimeout(this.timers.resized),this.isHTML5?(Fe.toggleNativeControls.call(this,!0),i()):this.isYouTube?(clearInterval(this.timers.buffering),clearInterval(this.timers.playing),null!==this.embed&&N.function(this.embed.destroy)&&this.embed.destroy(),i()):this.isVimeo&&(null!==this.embed&&this.embed.unload().then(i),setTimeout(i,200));}}},{key:"supports",value:function(e){return ie.mime.call(this,e)}},{key:"isHTML5",get:function(){return this.provider===Le.html5}},{key:"isEmbed",get:function(){return this.isYouTube||this.isVimeo}},{key:"isYouTube",get:function(){return this.provider===Le.youtube}},{key:"isVimeo",get:function(){return this.provider===Le.vimeo}},{key:"isVideo",get:function(){return this.type===Ie.video}},{key:"isAudio",get:function(){return this.type===Ie.audio}},{key:"playing",get:function(){return Boolean(this.ready&&!this.paused&&!this.ended)}},{key:"paused",get:function(){return Boolean(this.media.paused)}},{key:"stopped",get:function(){return Boolean(this.paused&&0===this.currentTime)}},{key:"ended",get:function(){return Boolean(this.media.ended)}},{key:"currentTime",set:function(e){if(this.duration){var t=N.number(e)&&e>0;this.media.currentTime=t?Math.min(e,this.duration):0,this.debug.log("Seeking to ".concat(this.currentTime," seconds"));}},get:function(){return Number(this.media.currentTime)}},{key:"buffered",get:function(){var e=this.media.buffered;return N.number(e)?e:e&&e.length&&this.duration>0?e.end(0)/this.duration:0}},{key:"seeking",get:function(){return Boolean(this.media.seeking)}},{key:"duration",get:function(){var e=parseFloat(this.config.duration),t=(this.media||{}).duration,n=N.number(t)&&t!==1/0?t:0;return e||n}},{key:"volume",set:function(e){var t=e;N.string(t)&&(t=Number(t)),N.number(t)||(t=this.storage.get("volume")),N.number(t)||(t=this.config.volume),t>1&&(t=1),t<0&&(t=0),this.config.volume=t,this.media.volume=t,!N.empty(e)&&this.muted&&t>0&&(this.muted=!1);},get:function(){return Number(this.media.volume)}},{key:"muted",set:function(e){var t=e;N.boolean(t)||(t=this.storage.get("muted")),N.boolean(t)||(t=this.config.muted),this.config.muted=t,this.media.muted=t;},get:function(){return Boolean(this.media.muted)}},{key:"hasAudio",get:function(){return !this.isHTML5||(!!this.isAudio||(Boolean(this.media.mozHasAudio)||Boolean(this.media.webkitAudioDecodedByteCount)||Boolean(this.media.audioTracks&&this.media.audioTracks.length)))}},{key:"speed",set:function(e){var t=this,n=null;N.number(e)&&(n=e),N.number(n)||(n=this.storage.get("speed")),N.number(n)||(n=this.config.speed.selected);var i=this.minimumSpeed,a=this.maximumSpeed;n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:255;return Math.min(Math.max(e,t),n)}(n,i,a),this.config.speed.selected=n,setTimeout(function(){t.media.playbackRate=n;},0);},get:function(){return Number(this.media.playbackRate)}},{key:"minimumSpeed",get:function(){return this.isYouTube?Math.min.apply(Math,s(this.options.speed)):this.isVimeo?.5:.0625}},{key:"maximumSpeed",get:function(){return this.isYouTube?Math.max.apply(Math,s(this.options.speed)):this.isVimeo?2:16}},{key:"quality",set:function(e){var t=this.config.quality,n=this.options.quality;if(n.length){var i=[!N.empty(e)&&Number(e),this.storage.get("quality"),t.selected,t.default].find(N.number),a=!0;if(!n.includes(i)){var s=function(e,t){return N.array(e)&&e.length?e.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e}):null}(n,i);this.debug.warn("Unsupported quality option: ".concat(i,", using ").concat(s," instead")),i=s,a=!1;}t.selected=i,this.media.quality=i,a&&this.storage.set({quality:i});}},get:function(){return this.media.quality}},{key:"loop",set:function(e){var t=N.boolean(e)?e:this.config.loop.active;this.config.loop.active=t,this.media.loop=t;},get:function(){return Boolean(this.media.loop)}},{key:"source",set:function(e){$e.change.call(this,e);},get:function(){return this.media.currentSrc}},{key:"download",get:function(){var e=this.config.urls.download;return N.url(e)?e:this.source},set:function(e){N.url(e)&&(this.config.urls.download=e,Ae.setDownloadUrl.call(this));}},{key:"poster",set:function(e){this.isVideo?Fe.setPoster.call(this,e,!1).catch(function(){}):this.debug.warn("Poster can only be set for video");},get:function(){return this.isVideo?this.media.getAttribute("poster"):null}},{key:"ratio",get:function(){if(!this.isVideo)return null;var e=se(re.call(this));return N.array(e)?e.join(":"):e},set:function(e){this.isVideo?N.string(e)&&ae(e)?(this.config.ratio=e,oe.call(this)):this.debug.error("Invalid aspect ratio specified (".concat(e,")")):this.debug.warn("Aspect ratio can only be set for video");}},{key:"autoplay",set:function(e){var t=N.boolean(e)?e:this.config.autoplay;this.config.autoplay=t;},get:function(){return Boolean(this.config.autoplay)}},{key:"currentTrack",set:function(e){Pe.set.call(this,e,!1);},get:function(){var e=this.captions,t=e.toggled,n=e.currentTrack;return t?n:-1}},{key:"language",set:function(e){Pe.setLanguage.call(this,e,!1);},get:function(){return (Pe.getCurrentTrack.call(this)||{}).language}},{key:"pip",set:function(e){if(ie.pip){var t=N.boolean(e)?e:!this.pip;N.function(this.media.webkitSetPresentationMode)&&this.media.webkitSetPresentationMode(t?Me:xe),N.function(this.media.requestPictureInPicture)&&(!this.pip&&t?this.media.requestPictureInPicture():this.pip&&!t&&document.exitPictureInPicture());}},get:function(){return ie.pip?N.empty(this.media.webkitPresentationMode)?this.media===document.pictureInPictureElement:this.media.webkitPresentationMode===Me:null}}],[{key:"supported",value:function(e,t,n){return ie.check(e,t,n)}},{key:"loadSprite",value:function(e,t){return be(e,t)}},{key:"setup",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=null;return N.string(e)?i=Array.from(document.querySelectorAll(e)):N.nodeList(e)?i=Array.from(e):N.array(e)&&(i=e.filter(N.element)),N.empty(i)?null:i.map(function(e){return new t(e,n)})}}]),t}();return Ze.defaults=(Ge=Ne,JSON.parse(JSON.stringify(Ge))),Ze});

  });

  //
  plyr_min.setup('[data-provider],.plyr');

  //

  (function ($) {
    $(document).on('hide.bs.tab', function (evt) {
      $($(evt.target).attr('href')).find('[data-toggle="popover"]').popover('hide');
    });
    $(document).on('hide.bs.collapse', function (evt) {
      $(evt.target).find('[data-toggle="popover"]').popover('hide');
    });
  })(jQuery$1);

  var prism = createCommonjsModule(function (module) {
  /* **********************************************
       Begin prism-core.js
  ********************************************** */

  var _self = (typeof window !== 'undefined')
    ? window   // if in browser
    : (
        (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
        ? self // if in worker
        : {}   // if in node js
    );

  /**
   * Prism: Lightweight, robust, elegant syntax highlighting
   * MIT license http://www.opensource.org/licenses/mit-license.php/
   * @author Lea Verou http://lea.verou.me
   */

  var Prism = (function (_self){

  // Private helper vars
  var lang = /\blang(?:uage)?-([\w-]+)\b/i;
  var uniqueId = 0;

  var _ = {
    manual: _self.Prism && _self.Prism.manual,
    disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
    util: {
        encode: function (tokens) {
            if (tokens instanceof Token) {
                return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
            } else if (Array.isArray(tokens)) {
                return tokens.map(_.util.encode);
            } else {
                return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
            }
        },

        type: function (o) {
            return Object.prototype.toString.call(o).slice(8, -1);
        },

        objId: function (obj) {
            if (!obj['__id']) {
                Object.defineProperty(obj, '__id', { value: ++uniqueId });
            }
            return obj['__id'];
        },

        // Deep clone a language definition (e.g. to extend it)
        clone: function deepClone(o, visited) {
            var clone, id, type = _.util.type(o);
            visited = visited || {};

            switch (type) {
                case 'Object':
                    id = _.util.objId(o);
                    if (visited[id]) {
                        return visited[id];
                    }
                    clone = {};
                    visited[id] = clone;

                    for (var key in o) {
                        if (o.hasOwnProperty(key)) {
                            clone[key] = deepClone(o[key], visited);
                        }
                    }

                    return clone;

                case 'Array':
                    id = _.util.objId(o);
                    if (visited[id]) {
                        return visited[id];
                    }
                    clone = [];
                    visited[id] = clone;

                    o.forEach(function (v, i) {
                        clone[i] = deepClone(v, visited);
                    });

                    return clone;

                default:
                    return o;
            }
        }
    },

    languages: {
        extend: function (id, redef) {
            var lang = _.util.clone(_.languages[id]);

            for (var key in redef) {
                lang[key] = redef[key];
            }

            return lang;
        },

        /**
         * Insert a token before another token in a language literal
         * As this needs to recreate the object (we cannot actually insert before keys in object literals),
         * we cannot just provide an object, we need an object and a key.
         * @param inside The key (or language id) of the parent
         * @param before The key to insert before.
         * @param insert Object with the key/value pairs to insert
         * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
         */
        insertBefore: function (inside, before, insert, root) {
            root = root || _.languages;
            var grammar = root[inside];
            var ret = {};

            for (var token in grammar) {
                if (grammar.hasOwnProperty(token)) {

                    if (token == before) {
                        for (var newToken in insert) {
                            if (insert.hasOwnProperty(newToken)) {
                                ret[newToken] = insert[newToken];
                            }
                        }
                    }

                    // Do not insert token which also occur in insert. See #1525
                    if (!insert.hasOwnProperty(token)) {
                        ret[token] = grammar[token];
                    }
                }
            }

            var old = root[inside];
            root[inside] = ret;

            // Update references in other language definitions
            _.languages.DFS(_.languages, function(key, value) {
                if (value === old && key != inside) {
                    this[key] = ret;
                }
            });

            return ret;
        },

        // Traverse a language definition with Depth First Search
        DFS: function DFS(o, callback, type, visited) {
            visited = visited || {};

            var objId = _.util.objId;

            for (var i in o) {
                if (o.hasOwnProperty(i)) {
                    callback.call(o, i, o[i], type || i);

                    var property = o[i],
                        propertyType = _.util.type(property);

                    if (propertyType === 'Object' && !visited[objId(property)]) {
                        visited[objId(property)] = true;
                        DFS(property, callback, null, visited);
                    }
                    else if (propertyType === 'Array' && !visited[objId(property)]) {
                        visited[objId(property)] = true;
                        DFS(property, callback, i, visited);
                    }
                }
            }
        }
    },
    plugins: {},

    highlightAll: function(async, callback) {
        _.highlightAllUnder(document, async, callback);
    },

    highlightAllUnder: function(container, async, callback) {
        var env = {
            callback: callback,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };

        _.hooks.run('before-highlightall', env);

        var elements = container.querySelectorAll(env.selector);

        for (var i=0, element; element = elements[i++];) {
            _.highlightElement(element, async === true, env.callback);
        }
    },

    highlightElement: function(element, async, callback) {
        // Find language
        var language = 'none', grammar, parent = element;

        while (parent && !lang.test(parent.className)) {
            parent = parent.parentNode;
        }

        if (parent) {
            language = (parent.className.match(lang) || [,'none'])[1].toLowerCase();
            grammar = _.languages[language];
        }

        // Set language on the element, if not present
        element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

        if (element.parentNode) {
            // Set language on the parent, for styling
            parent = element.parentNode;

            if (/pre/i.test(parent.nodeName)) {
                parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
            }
        }

        var code = element.textContent;

        var env = {
            element: element,
            language: language,
            grammar: grammar,
            code: code
        };

        var insertHighlightedCode = function (highlightedCode) {
            env.highlightedCode = highlightedCode;

            _.hooks.run('before-insert', env);

            env.element.innerHTML = env.highlightedCode;

            _.hooks.run('after-highlight', env);
            _.hooks.run('complete', env);
            callback && callback.call(env.element);
        };

        _.hooks.run('before-sanity-check', env);

        if (!env.code) {
            _.hooks.run('complete', env);
            return;
        }

        _.hooks.run('before-highlight', env);

        if (!env.grammar) {
            insertHighlightedCode(_.util.encode(env.code));
            return;
        }

        if (async && _self.Worker) {
            var worker = new Worker(_.filename);

            worker.onmessage = function(evt) {
                insertHighlightedCode(evt.data);
            };

            worker.postMessage(JSON.stringify({
                language: env.language,
                code: env.code,
                immediateClose: true
            }));
        }
        else {
            insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
        }
    },

    highlight: function (text, grammar, language) {
        var env = {
            code: text,
            grammar: grammar,
            language: language
        };
        _.hooks.run('before-tokenize', env);
        env.tokens = _.tokenize(env.code, env.grammar);
        _.hooks.run('after-tokenize', env);
        return Token.stringify(_.util.encode(env.tokens), env.language);
    },

    matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
        for (var token in grammar) {
            if(!grammar.hasOwnProperty(token) || !grammar[token]) {
                continue;
            }

            if (token == target) {
                return;
            }

            var patterns = grammar[token];
            patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

            for (var j = 0; j < patterns.length; ++j) {
                var pattern = patterns[j],
                    inside = pattern.inside,
                    lookbehind = !!pattern.lookbehind,
                    greedy = !!pattern.greedy,
                    lookbehindLength = 0,
                    alias = pattern.alias;

                if (greedy && !pattern.pattern.global) {
                    // Without the global flag, lastIndex won't work
                    var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
                    pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
                }

                pattern = pattern.pattern || pattern;

                // Don’t cache length as it changes during the loop
                for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

                    var str = strarr[i];

                    if (strarr.length > text.length) {
                        // Something went terribly wrong, ABORT, ABORT!
                        return;
                    }

                    if (str instanceof Token) {
                        continue;
                    }

                    if (greedy && i != strarr.length - 1) {
                        pattern.lastIndex = pos;
                        var match = pattern.exec(text);
                        if (!match) {
                            break;
                        }

                        var from = match.index + (lookbehind ? match[1].length : 0),
                            to = match.index + match[0].length,
                            k = i,
                            p = pos;

                        for (var len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
                            p += strarr[k].length;
                            // Move the index i to the element in strarr that is closest to from
                            if (from >= p) {
                                ++i;
                                pos = p;
                            }
                        }

                        // If strarr[i] is a Token, then the match starts inside another Token, which is invalid
                        if (strarr[i] instanceof Token) {
                            continue;
                        }

                        // Number of tokens to delete and replace with the new match
                        delNum = k - i;
                        str = text.slice(pos, p);
                        match.index -= pos;
                    } else {
                        pattern.lastIndex = 0;

                        var match = pattern.exec(str),
                            delNum = 1;
                    }

                    if (!match) {
                        if (oneshot) {
                            break;
                        }

                        continue;
                    }

                    if(lookbehind) {
                        lookbehindLength = match[1] ? match[1].length : 0;
                    }

                    var from = match.index + lookbehindLength,
                        match = match[0].slice(lookbehindLength),
                        to = from + match.length,
                        before = str.slice(0, from),
                        after = str.slice(to);

                    var args = [i, delNum];

                    if (before) {
                        ++i;
                        pos += before.length;
                        args.push(before);
                    }

                    var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

                    args.push(wrapped);

                    if (after) {
                        args.push(after);
                    }

                    Array.prototype.splice.apply(strarr, args);

                    if (delNum != 1)
                        _.matchGrammar(text, strarr, grammar, i, pos, true, token);

                    if (oneshot)
                        break;
                }
            }
        }
    },

    tokenize: function(text, grammar) {
        var strarr = [text];

        var rest = grammar.rest;

        if (rest) {
            for (var token in rest) {
                grammar[token] = rest[token];
            }

            delete grammar.rest;
        }

        _.matchGrammar(text, strarr, grammar, 0, 0, false);

        return strarr;
    },

    hooks: {
        all: {},

        add: function (name, callback) {
            var hooks = _.hooks.all;

            hooks[name] = hooks[name] || [];

            hooks[name].push(callback);
        },

        run: function (name, env) {
            var callbacks = _.hooks.all[name];

            if (!callbacks || !callbacks.length) {
                return;
            }

            for (var i=0, callback; callback = callbacks[i++];) {
                callback(env);
            }
        }
    },

    Token: Token
  };

  _self.Prism = _;

  function Token(type, content, alias, matchedStr, greedy) {
    this.type = type;
    this.content = content;
    this.alias = alias;
    // Copy of the full string this token was created from
    this.length = (matchedStr || "").length|0;
    this.greedy = !!greedy;
  }

  Token.stringify = function(o, language) {
    if (typeof o == 'string') {
        return o;
    }

    if (Array.isArray(o)) {
        return o.map(function(element) {
            return Token.stringify(element, language);
        }).join('');
    }

    var env = {
        type: o.type,
        content: Token.stringify(o.content, language),
        tag: 'span',
        classes: ['token', o.type],
        attributes: {},
        language: language
    };

    if (o.alias) {
        var aliases = Array.isArray(o.alias) ? o.alias : [o.alias];
        Array.prototype.push.apply(env.classes, aliases);
    }

    _.hooks.run('wrap', env);

    var attributes = Object.keys(env.attributes).map(function(name) {
        return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
    }).join(' ');

    return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';
  };

  if (!_self.document) {
    if (!_self.addEventListener) {
        // in Node.js
        return _;
    }

    if (!_.disableWorkerMessageHandler) {
        // In worker
        _self.addEventListener('message', function (evt) {
            var message = JSON.parse(evt.data),
                lang = message.language,
                code = message.code,
                immediateClose = message.immediateClose;

            _self.postMessage(_.highlight(code, _.languages[lang], lang));
            if (immediateClose) {
                _self.close();
            }
        }, false);
    }

    return _;
  }

  //Get current script and highlight
  var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

  if (script) {
    _.filename = script.src;

    if (!_.manual && !script.hasAttribute('data-manual')) {
        if(document.readyState !== "loading") {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(_.highlightAll);
            } else {
                window.setTimeout(_.highlightAll, 16);
            }
        }
        else {
            document.addEventListener('DOMContentLoaded', _.highlightAll);
        }
    }
  }

  return _;

  })(_self);

  if ( module.exports) {
    module.exports = Prism;
  }

  // hack for components to work correctly in node.js
  if (typeof commonjsGlobal !== 'undefined') {
    commonjsGlobal.Prism = Prism;
  }


  /* **********************************************
       Begin prism-markup.js
  ********************************************** */

  Prism.languages.markup = {
    'comment': /<!--[\s\S]*?-->/,
    'prolog': /<\?[\s\S]+?\?>/,
    'doctype': /<!DOCTYPE[\s\S]+?>/i,
    'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
    'tag': {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
        greedy: true,
        inside: {
            'tag': {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: {
                    'punctuation': /^<\/?/,
                    'namespace': /^[^\s>\/:]+:/
                }
            },
            'attr-value': {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
                inside: {
                    'punctuation': [
                        /^=/,
                        {
                            pattern: /^(\s*)["']|["']$/,
                            lookbehind: true
                        }
                    ]
                }
            },
            'punctuation': /\/?>/,
            'attr-name': {
                pattern: /[^\s>\/]+/,
                inside: {
                    'namespace': /^[^\s>\/:]+:/
                }
            }

        }
    },
    'entity': /&#?[\da-z]{1,8};/i
  };

  Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
    Prism.languages.markup['entity'];

  // Plugin to make entity title show the real entity, idea by Roman Komarov
  Prism.hooks.add('wrap', function(env) {

    if (env.type === 'entity') {
        env.attributes['title'] = env.content.replace(/&amp;/, '&');
    }
  });

  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    /**
     * Adds an inlined language to markup.
     *
     * An example of an inlined language is CSS with `<style>` tags.
     *
     * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addInlined('style', 'css');
     */
    value: function addInlined(tagName, lang) {
        var includedCdataInside = {};
        includedCdataInside['language-' + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism.languages[lang]
        };
        includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

        var inside = {
            'included-cdata': {
                pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                inside: includedCdataInside
            }
        };
        inside['language-' + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[lang]
        };

        var def = {};
        def[tagName] = {
            pattern: RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, tagName), 'i'),
            lookbehind: true,
            greedy: true,
            inside: inside
        };

        Prism.languages.insertBefore('markup', 'cdata', def);
    }
  });

  Prism.languages.xml = Prism.languages.extend('markup', {});
  Prism.languages.html = Prism.languages.markup;
  Prism.languages.mathml = Prism.languages.markup;
  Prism.languages.svg = Prism.languages.markup;


  /* **********************************************
       Begin prism-css.js
  ********************************************** */

  (function (Prism) {

    var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;

    Prism.languages.css = {
        'comment': /\/\*[\s\S]*?\*\//,
        'atrule': {
            pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
            inside: {
                'rule': /@[\w-]+/
                // See rest below
            }
        },
        'url': {
            pattern: RegExp('url\\((?:' + string.source + '|[^\n\r()]*)\\)', 'i'),
            inside: {
                'function': /^url/i,
                'punctuation': /^\(|\)$/
            }
        },
        'selector': RegExp('[^{}\\s](?:[^{};"\']|' + string.source + ')*?(?=\\s*\\{)'),
        'string': {
            pattern: string,
            greedy: true
        },
        'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
        'important': /!important\b/i,
        'function': /[-a-z0-9]+(?=\()/i,
        'punctuation': /[(){};:,]/
    };

    Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

    var markup = Prism.languages.markup;
    if (markup) {
        markup.tag.addInlined('style', 'css');

        Prism.languages.insertBefore('inside', 'attr-value', {
            'style-attr': {
                pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                inside: {
                    'attr-name': {
                        pattern: /^\s*style/i,
                        inside: markup.tag.inside
                    },
                    'punctuation': /^\s*=\s*['"]|['"]\s*$/,
                    'attr-value': {
                        pattern: /.+/i,
                        inside: Prism.languages.css
                    }
                },
                alias: 'language-css'
            }
        }, markup.tag);
    }

  }(Prism));


  /* **********************************************
       Begin prism-clike.js
  ********************************************** */

  Prism.languages.clike = {
    'comment': [
        {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true
        },
        {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
        }
    ],
    'string': {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
    },
    'class-name': {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
        lookbehind: true,
        inside: {
            punctuation: /[.\\]/
        }
    },
    'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    'boolean': /\b(?:true|false)\b/,
    'function': /\w+(?=\()/,
    'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    'punctuation': /[{}[\];(),.:]/
  };


  /* **********************************************
       Begin prism-javascript.js
  ********************************************** */

  Prism.languages.javascript = Prism.languages.extend('clike', {
    'class-name': [
        Prism.languages.clike['class-name'],
        {
            pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
            lookbehind: true
        }
    ],
    'keyword': [
        {
            pattern: /((?:^|})\s*)(?:catch|finally)\b/,
            lookbehind: true
        },
        {
            pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: true
        },
    ],
    'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    'function': /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
  });

  Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;

  Prism.languages.insertBefore('javascript', 'keyword', {
    'regex': {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
        lookbehind: true,
        greedy: true
    },
    // This must be declared before keyword because we use "function" inside the look-forward
    'function-variable': {
        pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
        alias: 'function'
    },
    'parameter': [
        {
            pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
            lookbehind: true,
            inside: Prism.languages.javascript
        },
        {
            pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
            inside: Prism.languages.javascript
        },
        {
            pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: Prism.languages.javascript
        },
        {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: Prism.languages.javascript
        }
    ],
    'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  });

  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
        pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
        greedy: true,
        inside: {
            'template-punctuation': {
                pattern: /^`|`$/,
                alias: 'string'
            },
            'interpolation': {
                pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                lookbehind: true,
                inside: {
                    'interpolation-punctuation': {
                        pattern: /^\${|}$/,
                        alias: 'punctuation'
                    },
                    rest: Prism.languages.javascript
                }
            },
            'string': /[\s\S]+/
        }
    }
  });

  if (Prism.languages.markup) {
    Prism.languages.markup.tag.addInlined('script', 'javascript');
  }

  Prism.languages.js = Prism.languages.javascript;


  /* **********************************************
       Begin prism-file-highlight.js
  ********************************************** */

  (function () {
    if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
        return;
    }

    /**
     * @param {Element} [container=document]
     */
    self.Prism.fileHighlight = function(container) {
        container = container || document;

        var Extensions = {
            'js': 'javascript',
            'py': 'python',
            'rb': 'ruby',
            'ps1': 'powershell',
            'psm1': 'powershell',
            'sh': 'bash',
            'bat': 'batch',
            'h': 'c',
            'tex': 'latex'
        };

        Array.prototype.slice.call(container.querySelectorAll('pre[data-src]')).forEach(function (pre) {
            // ignore if already loaded
            if (pre.hasAttribute('data-src-loaded')) {
                return;
            }

            // load current
            var src = pre.getAttribute('data-src');

            var language, parent = pre;
            var lang = /\blang(?:uage)?-([\w-]+)\b/i;
            while (parent && !lang.test(parent.className)) {
                parent = parent.parentNode;
            }

            if (parent) {
                language = (pre.className.match(lang) || [, ''])[1];
            }

            if (!language) {
                var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
                language = Extensions[extension] || extension;
            }

            var code = document.createElement('code');
            code.className = 'language-' + language;

            pre.textContent = '';

            code.textContent = 'Loading…';

            pre.appendChild(code);

            var xhr = new XMLHttpRequest();

            xhr.open('GET', src, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {

                    if (xhr.status < 400 && xhr.responseText) {
                        code.textContent = xhr.responseText;

                        Prism.highlightElement(code);
                        // mark as loaded
                        pre.setAttribute('data-src-loaded', '');
                    }
                    else if (xhr.status >= 400) {
                        code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
                    }
                    else {
                        code.textContent = '✖ Error: File does not exist or is empty';
                    }
                }
            };

            xhr.send(null);
        });

        if (Prism.plugins.toolbar) {
            Prism.plugins.toolbar.registerButton('download-file', function (env) {
                var pre = env.element.parentNode;
                if (!pre || !/pre/i.test(pre.nodeName) || !pre.hasAttribute('data-src') || !pre.hasAttribute('data-download-link')) {
                    return;
                }
                var src = pre.getAttribute('data-src');
                var a = document.createElement('a');
                a.textContent = pre.getAttribute('data-download-link-label') || 'Download';
                a.setAttribute('download', '');
                a.href = src;
                return a;
            });
        }

    };

    document.addEventListener('DOMContentLoaded', function () {
        // execute inside handler, for dropping Event as argument
        self.Prism.fileHighlight();
    });

  })();
  });

  //
  prism.highlightAll();

  var mrReadingPosition = function ($) {
    /**
     * Check for scrollMonitor dependency
     * scrollMonitor - https://github.com/stutrek/scrollMonitor
     */
    if (typeof scrollMonitor === 'undefined') {
      throw new Error('mrReadingPosition requires scrollMonitor.js (https://github.com/stutrek/scrollMonitor)');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrReadingPosition';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.readingPosition';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Css = {
      HIDDEN: 'reading-position-hidden'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      RESIZE: 'resize',
      SCROLL: 'scroll'
    };
    var Selector = {
      PROGRESS: 'progress.reading-position',
      DATA_ATTR: 'reading-position',
      DATA_READING_POSITION: '[data-reading-position]',
      VALUE: 'value',
      MAX: 'max'
    };
    var Value = {
      BAR_MAX: 100,
      BAR_MIN: 0
    };
    var progressBars = document.querySelectorAll(Selector.PROGRESS); // const $window = $(window);
    // const $document = $(document);

    var getWindowHeight = function getWindowHeight() {
      return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    };

    var getScrollPosition = function getScrollPosition() {
      return (document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop) || 0;
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */


    var ReadingPosition =
    /*#__PURE__*/
    function () {
      function ReadingPosition(element) {
        this.progressBars = progressBars;
        this.element = element;
        this.top = 0;
        this.bottom = 0;
        this.height = 0;
        this.scrollLength = 0;
        this.articlePositionPercent = 0;
        this.ticking = false;
        this.inView = false;
        this.reading = false;
        this.initWatcher(element);
        this.initBarValues();
        this.setValue(getScrollPosition());
        this.setScrollEvent();
        this.setResizeEvent();
      } // get VERSION


      var _proto = ReadingPosition.prototype;

      _proto.initWatcher = function initWatcher(element) {
        var _this = this;

        var watcher = scrollMonitor.create(element);
        this.watcher = watcher;
        this.recalculateAll();
        watcher.stateChange(function () {
          _this.inView = watcher.isInViewport;
          _this.reading = watcher.isAboveViewport && watcher.isFullyInViewport;

          _this.toggleBars(_this.reading);
        });
      };

      _proto.initBarValues = function initBarValues() {
        mrUtil.forEach(this.progressBars, function (index, bar) {
          bar.setAttribute(Selector.MAX, Value.BAR_MAX);
        });
      };

      _proto.setValue = function setValue(scrollPosition) {
        var _this2 = this;

        this.recalculatePercentage(scrollPosition);
        mrUtil.forEach(this.progressBars, function (index, bar) {
          bar.setAttribute(Selector.VALUE, _this2.articlePositionPercent);
        });
      };

      _proto.toggleBars = function toggleBars(show) {
        mrUtil.forEach(this.progressBars, function (index, bar) {
          if (show) {
            bar.classList.remove(Css.HIDDEN);
          } else {
            bar.classList.add(Css.HIDDEN);
          }
        });
      };

      _proto.setScrollEvent = function setScrollEvent() {
        var _this3 = this;

        window.addEventListener(Event.SCROLL, function () {
          var scrollPosition = getScrollPosition();

          if (!_this3.ticking && _this3.inView && _this3.reading) {
            window.requestAnimationFrame(function () {
              _this3.setValue(scrollPosition);

              _this3.ticking = false;
            });
            _this3.ticking = true;
          }
        });
      };

      _proto.setResizeEvent = function setResizeEvent() {
        var _this4 = this;

        window.addEventListener(Event.RESIZE, function () {
          return _this4.recalculateAll();
        });
      };

      _proto.recalculateAll = function recalculateAll() {
        this.watcher.recalculateLocation();
        this.top = this.watcher.top;
        this.bottom = this.watcher.bottom;
        this.height = this.watcher.height; // Scroll Length is the scrolling viewable area of the article
        // from top of article = top of window to bottom of article = bottom of window.

        this.scrollLength = this.height - getWindowHeight(); // Position percent is how far the view is through the scrollable length in percentage.

        this.recalculatePercentage(getScrollPosition());
      };

      _proto.recalculatePercentage = function recalculatePercentage(scrollPosition) {
        this.articlePositionPercent = !scrollPosition ? 0 : (scrollPosition - this.top) / this.scrollLength * 100;
      };

      ReadingPosition.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachReadingPosition() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new ReadingPosition(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(ReadingPosition, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return ReadingPosition;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      // Proceed to initialise only if a progress bar is found in the document
      if (progressBars.length === 0) {
        return;
      } // Gather articles and loop over, initialising ReadingPosition instance


      var readingPositionElements = $.makeArray($(Selector.DATA_READING_POSITION));
      /* eslint-disable no-plusplus */

      for (var i = readingPositionElements.length; i--;) {
        var $readingPosition = $(readingPositionElements[i]);
        ReadingPosition.jQueryInterface.call($readingPosition, $readingPosition.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = ReadingPosition.jQueryInterface;
    $.fn[NAME].Constructor = ReadingPosition;

    $.fn[NAME].noConflict = function ReadingPositionNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return ReadingPosition.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return ReadingPosition;
  }(jQuery);

  //

  var mrSmoothScroll = function ($) {
    var smoothScroll = new SmoothScroll('a[data-smooth-scroll]', {
      speedAsDuration: true,
      offset: $('body').attr('data-smooth-scroll-offset') || 0
    });
    return smoothScroll;
  }(jQuery$1);

  var mrSticky = function ($) {
    /**
     * Check for scrollMonitor dependency
     * scrollMonitor - https://github.com/stutrek/scrollMonitor
     */
    if (typeof scrollMonitor === 'undefined') {
      throw new Error('mrSticky requires scrollMonitor.js (https://github.com/stutrek/scrollMonitor)');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrSticky';
    var VERSION = '1.4.0';
    var DATA_KEY = 'mr.sticky';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var NO_OFFSET = 0;
    var ClassName = {
      FIXED_TOP: 'position-fixed',
      ABSOLUTE_BOTTOM: 'sticky-bottom',
      FIXED_BOTTOM: 'sticky-viewport-bottom',
      SCROLLED: 'scrolled'
    };
    var Css = {
      HEIGHT: 'min-height',
      WIDTH: 'max-width',
      SPACE_TOP: 'top',
      SPACE_BOTTOM: 'bottom'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      WINDOW_RESIZE: 'resize',
      ALERT_CLOSED: 'closed.bs.alert',
      TOGGLE_SHOW: 'show.bs.collapse',
      TOGGLE_HIDDEN: 'hidden.bs.collapse'
    };
    var Options = {
      BELOW_NAV: 'below-nav',
      TOP: 'top',
      BOTTOM: 'bottom'
    };
    var Selector = {
      DATA_ATTR: 'sticky',
      DATA_STICKY: '[data-sticky]',
      NAV_STICKY: 'body > div.navbar-container [data-sticky="top"]',
      ALERT: '.alert-dismissible'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Sticky =
    /*#__PURE__*/
    function () {
      function Sticky(element) {
        var $element = $(element);
        var stickyData = $element.data(Selector.DATA_ATTR);
        var stickyUntil = $element.closest('section') || null;
        this.element = element;
        this.stickBelowNav = stickyData === Options.BELOW_NAV;
        this.stickBottom = stickyData === Options.BOTTOM;
        this.stickyUntil = stickyUntil;
        this.navToggled = false;
        this.updateNavProperties();
        this.isNavElement = $element.is(this.navElement);
        this.initWatcher($element);
        this.updateCss();
        this.setResizeEvent(); // Run a calculation immediately to show sticky elements if page starts
        // at a half-scrolled position

        this.onWatcherChange($element);
        this.ticking = false; // for debouncing resize event with RequestAnimationFrame

        if (this.isNavElement) {
          this.setNavToggleEvents();
        }
      } // getters


      var _proto = Sticky.prototype;

      _proto.initWatcher = function initWatcher(element) {
        var _this = this;

        var $element = $(element);
        var notNavElement = !this.isNavElement;
        var offset = this.stickBelowNav && this.navIsSticky && notNavElement ? {
          top: this.navHeight
        } : NO_OFFSET;
        offset = this.stickBottom && notNavElement ? {
          bottom: -$element.outerHeight
        } : offset;
        var watcher = scrollMonitor.create(element, offset); // ensure that we're always watching the place the element originally was

        watcher.lock();
        var untilWatcher = this.stickyUntil !== null ? scrollMonitor.create(this.stickyUntil, {
          bottom: -(watcher.height + offset.top)
        }) : null;
        this.watcher = watcher;
        this.untilWatcher = untilWatcher;
        this.navHeight = this.navHeight; // For navs that start at top, stick them immediately to avoid a jump

        if (this.isNavElement && watcher.top === 0 && !this.navIsAbsolute) {
          $element.addClass(ClassName.FIXED_TOP);
        }

        watcher.stateChange(function () {
          _this.onWatcherChange($element);
        });

        if (untilWatcher !== null) {
          untilWatcher.exitViewport(function () {
            // If the element is in a section, it will scroll up with the section
            $element.addClass(ClassName.ABSOLUTE_BOTTOM);
          });
          untilWatcher.enterViewport(function () {
            $element.removeClass(ClassName.ABSOLUTE_BOTTOM);
          });
        }
      };

      _proto.onWatcherChange = function onWatcherChange($element) {
        // Add fixed when element leaves via top of viewport or if nav is sitting at top
        $element.toggleClass(ClassName.FIXED_TOP, this.watcher.isAboveViewport || !this.navIsAbsolute && !this.stickBottom && this.isNavElement && this.watcher.top === 0); // Used to apply styles to the nav based on "scrolled" class
        // independedly of position-fixed because that class is used for more practical reasons
        // such as avoiding a jump on first scroll etc.

        $element.toggleClass(ClassName.SCROLLED, this.watcher.isAboveViewport && this.isNavElement && !this.stickBottom); // Fix to bottom when element enters via bottom of viewport and has data-sticky="bottom"

        $element.toggleClass(ClassName.FIXED_BOTTOM, (this.watcher.isFullyInViewport || this.watcher.isAboveViewport) && this.stickBottom);

        if (!this.stickBottom) {
          $element.css(Css.SPACE_TOP, this.watcher.isAboveViewport && this.navIsSticky && this.stickBelowNav ? this.navHeight : NO_OFFSET);
        }
      };

      _proto.setResizeEvent = function setResizeEvent() {
        var _this2 = this;

        // Closing any alerts above the nav will mean we need to recalculate position.
        $(Selector.ALERT).on(Event.ALERT_CLOSED, function () {
          // An alert above the nav will cause odd sticky behaviour if
          // the alert is dismissed and nav position is not recalculated,
          // as scrollMonitor has locked the position of the watcher.
          // Unlock and recalculate if the nav is in the viewport during alert close event.
          if (_this2.watcher.isInViewport) {
            _this2.watcher.unlock();

            _this2.watcher.recalculateLocation();

            _this2.watcher.lock();
          }

          _this2.onResize();
        });
        $(window).on(Event.WINDOW_RESIZE, function () {
          _this2.onResize();
        });
      };

      _proto.onResize = function onResize() {
        var _this3 = this;

        if (!this.ticking) {
          window.requestAnimationFrame(function () {
            _this3.updateCss();

            _this3.ticking = false;
          });
          this.ticking = true;
        }
      };

      _proto.setNavToggleEvents = function setNavToggleEvents() {
        var _this4 = this;

        $(this.element).on("" + Event.TOGGLE_SHOW, function () {
          _this4.navToggled = true;
        }); // navHeight should only be recalculated when the nav is not open/toggled
        // Don't allow the navHeight to be recalculated until the nav is fully hidden

        $(this.element).on("" + Event.TOGGLE_HIDDEN, function () {
          _this4.navToggled = false;
        });
      };

      _proto.updateCss = function updateCss() {
        var $element = $(this.element); // Fix width by getting parent's width to avoid element spilling out when pos-fixed

        $element.css(Css.WIDTH, $element.parent().width());
        this.updateNavProperties();
        var elemHeight = $element.outerHeight();
        var notNavElement = !this.isNavElement; // Set a min-height to prevent "jumping" when sticking to top
        // but not applied to the nav element itself unless it is overlay (absolute) nav

        if (!this.navIsAbsolute && this.isNavElement || notNavElement) {
          // navHeight should only be recalculated when the nav is not open/toggled
          // Don't allow the navHeight to be set until the nav is fully hidden
          if (!this.navToggled) {
            $element.parent().css(Css.HEIGHT, elemHeight);
          }
        }

        if (this.navIsSticky && notNavElement) {
          $element.css(Css.HEIGHT, elemHeight);
        }
      };

      _proto.updateNavProperties = function updateNavProperties() {
        var $navElement = this.navElement || $(Selector.NAV_STICKY).first();
        this.navElement = $navElement;
        this.navHeight = $navElement.outerHeight();
        this.navIsAbsolute = $navElement.css('position') === 'absolute';
        this.navIsSticky = $navElement.length > 0;
      };

      Sticky.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachSticky() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Sticky(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(Sticky, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Sticky;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      var stickyElements = $.makeArray($(Selector.DATA_STICKY));
      /* eslint-disable no-plusplus */

      for (var i = stickyElements.length; i--;) {
        var $sticky = $(stickyElements[i]);
        Sticky.jQueryInterface.call($sticky, $sticky.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = Sticky.jQueryInterface;
    $.fn[NAME].Constructor = Sticky;

    $.fn[NAME].noConflict = function StickyNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Sticky.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return Sticky;
  }(jQuery$1);

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod(true)
  };

  var O = 'object';
  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == O && globalThis) ||
    check(typeof window == O && window) ||
    check(typeof self == O && self) ||
    check(typeof commonjsGlobal == O && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
    f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var hide = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      hide(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.2.1',
    mode:  'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
  });

  var functionToString = shared('native-function-to-string', Function.toString);

  var WeakMap$1 = global_1.WeakMap;

  var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(functionToString.call(WeakMap$1));

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$2 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store = new WeakMap$2();
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set = function (it, metadata) {
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      hide(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
  var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
    f: f$1
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
    f: f$2
  };

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(functionToString).split('toString');

  shared('inspectSource', function (it) {
    return functionToString.call(it);
  });

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
    if (O === global_1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else hide(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
  });
  });

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$1 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod$1(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$1(false)
  };

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
    f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
    f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        hide(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO = sharedKey('IE_PROTO');
  var ObjectPrototype = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
    O = toObject(O);
    if (has(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype : null;
  };

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var Symbol$1 = global_1.Symbol;
  var store$1 = shared('wks');

  var wellKnownSymbol = function (name) {
    return store$1[name] || (store$1[name] = nativeSymbol && Symbol$1[name]
      || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
  };

  var ITERATOR = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS = false;

  var returnThis = function () { return this; };

  // `%IteratorPrototype%` object
  // https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  if (IteratorPrototype == undefined) IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  if ( !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
  };

  // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  var IE_PROTO$1 = sharedKey('IE_PROTO');

  var PROTOTYPE = 'prototype';
  var Empty = function () { /* empty */ };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var length = enumBugKeys.length;
    var lt = '<';
    var script = 'script';
    var gt = '>';
    var js = 'java' + script + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    iframe.src = String(js);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
    return createDict();
  };

  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE] = anObject(O);
      result = new Empty();
      Empty[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = createDict();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  hiddenKeys[IE_PROTO$1] = true;

  var defineProperty = objectDefineProperty.f;



  var TO_STRING_TAG = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
      defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var iterators = {};

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





  var returnThis$1 = function () { return this; };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var aPossiblePrototype = function (it) {
    if (!isObject(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  // `Object.setPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis$2 = function () { return this; };

  var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$1]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
        if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
            hide(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
      hide(IterablePrototype, ITERATOR$1, defaultIterator);
    }
    iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var charAt = stringMultibyte.charAt;



  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var bindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (error) {
      var returnMethod = iterator['return'];
      if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
      throw error;
    }
  };

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$2] === it);
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var ITERATOR$3 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$3]
      || it['@@iterator']
      || iterators[classof(it)];
  };

  // `Array.from` method implementation
  // https://tc39.github.io/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iteratorMethod = getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = bindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = iteratorMethod.call(O);
      result = new C();
      for (;!(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping
          ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
          : step.value
        );
      }
    } else {
      length = toLength(O.length);
      result = new C(length);
      for (;length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  };

  var ITERATOR$4 = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$4] = function () {
      return this;
    };
    // eslint-disable-next-line no-throw-literal
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$4] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.github.io/ecma262/#sec-array.from
  _export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: arrayFrom
  });

  var from_1 = path.Array.from;

  //
  svgInjector.SVGInjector(document.querySelectorAll('[data-inject-svg]'), {
    afterEach: function afterEach(err, svg) {
      if (typeof jarallax === 'function') {
        svg.dispatchEvent(new CustomEvent('injected.mr.SVGInjector', {
          bubbles: true
        }));
      }
    }
  });

  var twitterFetcher_min = createCommonjsModule(function (module, exports) {
  /*********************************************************************
  *  #### Twitter Post Fetcher v18.0.2 ####
  *  Coded by Jason Mayes 2015. A present to all the developers out there.
  *  www.jasonmayes.com
  *  Please keep this disclaimer with my code if you use it. Thanks. :-)
  *  Got feedback or questions, ask here:
  *  http://www.jasonmayes.com/projects/twitterApi/
  *  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
  *  Updates will be posted to this site.
  *********************************************************************/
  (function(root,factory){{module.exports=factory();}}(commonjsGlobal,function(){var domNode='';var maxTweets=20;var parseLinks=true;var queue=[];var inProgress=false;var printTime=true;var printUser=true;var formatterFunction=null;var supportsClassName=true;var showRts=true;var customCallbackFunction=null;var showInteractionLinks=true;var showImages=false;var useEmoji=false;var targetBlank=true;var lang='en';var permalinks=true;var dataOnly=false;var script=null;function handleTweets(tweets){if(customCallbackFunction===null){var x=tweets.length;var n=0;var element=document.getElementById(domNode);var html='<ul>';while(n<x){html+='<li>'+tweets[n]+'</li>';n++;}
  html+='</ul>';element.innerHTML=html;}else{customCallbackFunction(tweets);}}
  function strip(data){return data.replace(/<b[^>]*>(.*?)<\/b>/gi,function(a,s){return s;}).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,'');}
  function targetLinksToNewWindow(el){var links=el.getElementsByTagName('a');for(var i=links.length-1;i>=0;i--){links[i].setAttribute('target','_blank');links[i].setAttribute('rel','noopener');}}
  function getElementsByClassName(node,classname){var a=[];var regex=new RegExp('(^| )'+classname+'( |$)');var elems=node.getElementsByTagName('*');for(var i=0,j=elems.length;i<j;i++){if(regex.test(elems[i].className)){a.push(elems[i]);}}
  return a;}
  function extractImageUrl(image_data){if(image_data!==undefined&&image_data.innerHTML.indexOf('data-image')>=0){var data_src=image_data.innerHTML.match(/data-image=\"([A-z0-9]+:\/\/[A-z0-9]+\.[A-z0-9]+\.[A-z0-9]+\/[A-z0-9]+\/[A-z0-9\-]+)/i)[1];return decodeURIComponent(data_src)+'.jpg';}}
  var twitterFetcher={fetch:function(config){if(config.maxTweets===undefined){config.maxTweets=20;}
  if(config.enableLinks===undefined){config.enableLinks=true;}
  if(config.showUser===undefined){config.showUser=true;}
  if(config.showTime===undefined){config.showTime=true;}
  if(config.dateFunction===undefined){config.dateFunction='default';}
  if(config.showRetweet===undefined){config.showRetweet=true;}
  if(config.customCallback===undefined){config.customCallback=null;}
  if(config.showInteraction===undefined){config.showInteraction=true;}
  if(config.showImages===undefined){config.showImages=false;}
  if(config.useEmoji===undefined){config.useEmoji=false;}
  if(config.linksInNewWindow===undefined){config.linksInNewWindow=true;}
  if(config.showPermalinks===undefined){config.showPermalinks=true;}
  if(config.dataOnly===undefined){config.dataOnly=false;}
  if(inProgress){queue.push(config);}else{inProgress=true;domNode=config.domId;maxTweets=config.maxTweets;parseLinks=config.enableLinks;printUser=config.showUser;printTime=config.showTime;showRts=config.showRetweet;formatterFunction=config.dateFunction;customCallbackFunction=config.customCallback;showInteractionLinks=config.showInteraction;showImages=config.showImages;useEmoji=config.useEmoji;targetBlank=config.linksInNewWindow;permalinks=config.showPermalinks;dataOnly=config.dataOnly;var head=document.getElementsByTagName('head')[0];if(script!==null){head.removeChild(script);}
  script=document.createElement('script');script.type='text/javascript';if(config.list!==undefined){script.src='https://syndication.twitter.com/timeline/list?'+'callback=__twttrf.callback&dnt=false&list_slug='+
  config.list.listSlug+'&screen_name='+config.list.screenName+'&suppress_response_codes=true&lang='+(config.lang||lang)+'&rnd='+Math.random();}else if(config.profile!==undefined){script.src='https://syndication.twitter.com/timeline/profile?'+'callback=__twttrf.callback&dnt=false'+'&screen_name='+config.profile.screenName+'&suppress_response_codes=true&lang='+(config.lang||lang)+'&rnd='+Math.random();}else if(config.likes!==undefined){script.src='https://syndication.twitter.com/timeline/likes?'+'callback=__twttrf.callback&dnt=false'+'&screen_name='+config.likes.screenName+'&suppress_response_codes=true&lang='+(config.lang||lang)+'&rnd='+Math.random();}else{script.src='https://cdn.syndication.twimg.com/widgets/timelines/'+
  config.id+'?&lang='+(config.lang||lang)+'&callback=__twttrf.callback&'+'suppress_response_codes=true&rnd='+Math.random();}
  head.appendChild(script);}},callback:function(data){if(data===undefined||data.body===undefined){inProgress=false;if(queue.length>0){twitterFetcher.fetch(queue[0]);queue.splice(0,1);}
  return;}
  if(!useEmoji){data.body=data.body.replace(/(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g,'');}
  if(!showImages){data.body=data.body.replace(/(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g,'');}
  if(!printUser){data.body=data.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g,'');}
  var div=document.createElement('div');div.innerHTML=data.body;if(typeof(div.getElementsByClassName)==='undefined'){supportsClassName=false;}
  function swapDataSrc(element){var avatarImg=element.getElementsByTagName('img')[0];if(avatarImg){avatarImg.src=avatarImg.getAttribute('data-src-2x');}else{var screenName=element.getElementsByTagName('a')[0].getAttribute('href').split('twitter.com/')[1];var img=document.createElement('img');img.setAttribute('src','https://twitter.com/'+screenName+'/profile_image?size=bigger');element.prepend(img);}
  return element;}
  var tweets=[];var authors=[];var times=[];var images=[];var rts=[];var tids=[];var permalinksURL=[];var x=0;if(supportsClassName){var tmp=div.getElementsByClassName('timeline-Tweet');while(x<tmp.length){if(tmp[x].getElementsByClassName('timeline-Tweet-retweetCredit').length>0){rts.push(true);}else{rts.push(false);}
  if(!rts[x]||rts[x]&&showRts){tweets.push(tmp[x].getElementsByClassName('timeline-Tweet-text')[0]);tids.push(tmp[x].getAttribute('data-tweet-id'));if(printUser){authors.push(swapDataSrc(tmp[x].getElementsByClassName('timeline-Tweet-author')[0]));}
  times.push(tmp[x].getElementsByClassName('dt-updated')[0]);permalinksURL.push(tmp[x].getElementsByClassName('timeline-Tweet-timestamp')[0]);if(tmp[x].getElementsByClassName('timeline-Tweet-media')[0]!==undefined){images.push(tmp[x].getElementsByClassName('timeline-Tweet-media')[0]);}else{images.push(undefined);}}
  x++;}}else{var tmp=getElementsByClassName(div,'timeline-Tweet');while(x<tmp.length){if(getElementsByClassName(tmp[x],'timeline-Tweet-retweetCredit').length>0){rts.push(true);}else{rts.push(false);}
  if(!rts[x]||rts[x]&&showRts){tweets.push(getElementsByClassName(tmp[x],'timeline-Tweet-text')[0]);tids.push(tmp[x].getAttribute('data-tweet-id'));if(printUser){authors.push(swapDataSrc(getElementsByClassName(tmp[x],'timeline-Tweet-author')[0]));}
  times.push(getElementsByClassName(tmp[x],'dt-updated')[0]);permalinksURL.push(getElementsByClassName(tmp[x],'timeline-Tweet-timestamp')[0]);if(getElementsByClassName(tmp[x],'timeline-Tweet-media')[0]!==undefined){images.push(getElementsByClassName(tmp[x],'timeline-Tweet-media')[0]);}else{images.push(undefined);}}
  x++;}}
  if(tweets.length>maxTweets){tweets.splice(maxTweets,(tweets.length-maxTweets));authors.splice(maxTweets,(authors.length-maxTweets));times.splice(maxTweets,(times.length-maxTweets));rts.splice(maxTweets,(rts.length-maxTweets));images.splice(maxTweets,(images.length-maxTweets));permalinksURL.splice(maxTweets,(permalinksURL.length-maxTweets));}
  var arrayTweets=[];var x=tweets.length;var n=0;if(dataOnly){while(n<x){arrayTweets.push({tweet:tweets[n].innerHTML,author:authors[n]?authors[n].innerHTML:'Unknown Author',author_data:{profile_url:authors[n]?authors[n].querySelector('[data-scribe="element:user_link"]').href:null,profile_image:authors[n]?'https://twitter.com/'+authors[n].querySelector('[data-scribe="element:screen_name"]').title.split('@')[1]+'/profile_image?size=bigger':null,profile_image_2x:authors[n]?'https://twitter.com/'+authors[n].querySelector('[data-scribe="element:screen_name"]').title.split('@')[1]+'/profile_image?size=original':null,screen_name:authors[n]?authors[n].querySelector('[data-scribe="element:screen_name"]').title:null,name:authors[n]?authors[n].querySelector('[data-scribe="element:name"]').title:null},time:times[n].textContent,timestamp:times[n].getAttribute('datetime').replace('+0000','Z').replace(/([\+\-])(\d\d)(\d\d)/,'$1$2:$3'),image:extractImageUrl(images[n]),rt:rts[n],tid:tids[n],permalinkURL:(permalinksURL[n]===undefined)?'':permalinksURL[n].href});n++;}}else{while(n<x){if(typeof(formatterFunction)!=='string'){var datetimeText=times[n].getAttribute('datetime');var newDate=new Date(times[n].getAttribute('datetime').replace(/-/g,'/').replace('T',' ').split('+')[0]);var dateString=formatterFunction(newDate,datetimeText);times[n].setAttribute('aria-label',dateString);if(tweets[n].textContent){if(supportsClassName){times[n].textContent=dateString;}else{var h=document.createElement('p');var t=document.createTextNode(dateString);h.appendChild(t);h.setAttribute('aria-label',dateString);times[n]=h;}}else{times[n].textContent=dateString;}}
  var op='';if(parseLinks){if(targetBlank){targetLinksToNewWindow(tweets[n]);if(printUser){targetLinksToNewWindow(authors[n]);}}
  if(printUser){op+='<div class="user">'+strip(authors[n].innerHTML)+'</div>';}
  op+='<p class="tweet">'+strip(tweets[n].innerHTML)+'</p>';if(printTime){if(permalinks){op+='<p class="timePosted"><a href="'+permalinksURL[n]+'">'+times[n].getAttribute('aria-label')+'</a></p>';}else{op+='<p class="timePosted">'+
  times[n].getAttribute('aria-label')+'</p>';}}}else{if(tweets[n].textContent){if(printUser){op+='<p class="user">'+authors[n].textContent+'</p>';}
  op+='<p class="tweet">'+tweets[n].textContent+'</p>';if(printTime){op+='<p class="timePosted">'+times[n].textContent+'</p>';}}else{if(printUser){op+='<p class="user">'+authors[n].textContent+'</p>';}
  op+='<p class="tweet">'+tweets[n].textContent+'</p>';if(printTime){op+='<p class="timePosted">'+times[n].textContent+'</p>';}}}
  if(showInteractionLinks){op+='<p class="interact"><a href="https://twitter.com/intent/'+'tweet?in_reply_to='+tids[n]+'" class="twitter_reply_icon"'+
  (targetBlank?' target="_blank" rel="noopener">':'>')+'Reply</a><a href="https://twitter.com/intent/retweet?'+'tweet_id='+tids[n]+'" class="twitter_retweet_icon"'+
  (targetBlank?' target="_blank" rel="noopener">':'>')+'Retweet</a>'+'<a href="https://twitter.com/intent/favorite?tweet_id='+
  tids[n]+'" class="twitter_fav_icon"'+
  (targetBlank?' target="_blank" rel="noopener">':'>')+'Favorite</a></p>';}
  if(showImages&&images[n]!==undefined&&extractImageUrl(images[n])!==undefined){op+='<div class="media">'+'<img src="'+extractImageUrl(images[n])+'" alt="Image from tweet" />'+'</div>';}
  if(showImages){arrayTweets.push(op);}else if(!showImages&&tweets[n].textContent.length){arrayTweets.push(op);}
  n++;}}
  handleTweets(arrayTweets);inProgress=false;if(queue.length>0){twitterFetcher.fetch(queue[0]);queue.splice(0,1);}}};window.__twttrf=twitterFetcher;window.twitterFetcher=twitterFetcher;return twitterFetcher;}));(function(arr){arr.forEach(function(item){if(item.hasOwnProperty('prepend')){return;}
  Object.defineProperty(item,'prepend',{configurable:true,enumerable:true,writable:true,value:function prepend(){var argArr=Array.prototype.slice.call(arguments),docFrag=document.createDocumentFragment();argArr.forEach(function(argItem){var isNode=argItem instanceof Node;docFrag.appendChild(isNode?argItem:document.createTextNode(String(argItem)));});this.insertBefore(docFrag,this.firstChild);}});});})([Element.prototype,Document.prototype,DocumentFragment.prototype]);
  });

  var mrTwitterFetcher = function ($) {
    /**
     * Check for twitterFetcher dependency
     * twitterFetcher - https://github.com/jasonmayes/Twitter-Post-Fetcher
     */
    if (typeof twitterFetcher_min === 'undefined') {
      throw new Error('mrTwitterFetcher requires twitterFetcher.js (https://github.com/jasonmayes/Twitter-Post-Fetcher)');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrTwitterFetcher';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.twitterFetcher';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      RESIZE: "resize" + EVENT_KEY,
      READY: "ready" + EVENT_KEY,
      APPEND: "tweetAppended" + EVENT_KEY
    };
    var Selector = {
      DATA_ATTR: 'twitter-fetcher',
      DATA_TWITTER_FETCHER: '[data-twitter-fetcher]',
      DATA_TWITTER: 'data-twitter',
      USER: '.user',
      TWEET: '.tweet',
      TIME_POSTED: '.timePosted',
      INTERACT: '.interact'
    };
    var Defaults = {
      USERNAME: 'twitter',
      MAX_TWEETS: 6
    };
    var Options = {
      USERNAME: 'username',
      MAX_TWEETS: 'max-tweets',
      FLICKITY: 'flickity',
      SLIDER: 'twitterFlickity',
      ISOTOPE: 'isotope'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var TwitterFetcher =
    /*#__PURE__*/
    function () {
      function TwitterFetcher(element) {
        var $element = $(element);
        this.element = element;
        this.element.id = "tweets-" + new Date().getTime();
        this.username = $element.data(Options.USERNAME).replace('@', '') || Defaults.USERNAME;
        this.maxTweets = parseInt($element.data(Options.MAX_TWEETS), 10) || Defaults.MAX_TWEETS; // Check if data-twitter-slider is options object, plain attribute or not present.

        this.slider = this.element.getAttribute(Selector.DATA_TWITTER + "-" + Options.FLICKITY) !== null;
        this.slider = this.slider && typeof $element.data(Options.SLIDER) === 'object' ? $element.data(Options.SLIDER) : this.slider; // Check if data-twitter-isotope is present.

        this.isotope = this.element.getAttribute(Selector.DATA_TWITTER + "-" + Options.ISOTOPE) !== null;
        this.initTwitterFeed();
      } // getters


      var _proto = TwitterFetcher.prototype;

      _proto.initTwitterFeed = function initTwitterFeed() {
        var _this = this;

        this.config = {
          profile: {
            screenName: this.username
          },
          domId: this.element.id,
          maxTweets: this.maxTweets,
          enableLinks: true,
          showUser: true,
          showTime: true,
          dateFunction: '',
          showRetweet: false,
          customCallback: function customCallback(tweets) {
            var $element = $(_this.element);
            var html;
            var template = $element.children().first().detach();
            var x = tweets.length;
            var n = 0;

            while (n < x) {
              var tweetContent = $('<div>').append($(tweets[n]));
              var templateClone = template.clone();
              templateClone.find(Selector.TWEET).html(tweetContent.find(Selector.TWEET).html());
              templateClone.find(Selector.USER).html(tweetContent.find(Selector.USER).html());
              templateClone.find(Selector.TIME_POSTED).html(tweetContent.find(Selector.TIME_POSTED).html());
              templateClone.find(Selector.INTERACT).html(tweetContent.find(Selector.INTERACT).html());
              $element.append(templateClone);
              n += 1; // Fire an event when each tweet is added to the div

              var appendEvent = $.Event(Event.APPEND);
              appendEvent.appendedElement = templateClone;
              appendEvent.mrTwitterFetcher = _this;
              $(_this.element).trigger(appendEvent);
            }

            if (_this.slider === true || typeof _this.slider === 'object') {
              // Check for Flickity dependency
              if (typeof Flickity === 'undefined') {
                throw new Error('mrTwitterFetcher requires flickity.js (https://github.com/metafizzy/flickity)');
              } else {
                $element.data('flickity', new Flickity(_this.element, _this.slider));
              }
            } else if (_this.isotope === true) {
              // Check for Isotope dependency
              if (typeof Isotope === 'undefined') {
                throw new Error('mrTwitterFetcher requires isotope.js (https://github.com/metafizzy/isotope)');
              } else {
                $(_this.element).mrIsotope();
              }
            } // Fire an event for tweets ready


            var readyEvent = $.Event(Event.READY);
            readyEvent.mrTwitterFetcher = _this;
            $(_this.element).trigger(readyEvent);
            return html;
          }
        };
        twitterFetcher_min.fetch(this.config);
      };

      TwitterFetcher.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachTwitterFetcher() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new TwitterFetcher(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(TwitterFetcher, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return TwitterFetcher;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      var twitterFetcherElements = $.makeArray($(Selector.DATA_TWITTER_FETCHER));
      /* eslint-disable no-plusplus */

      for (var i = twitterFetcherElements.length; i--;) {
        var $twitterFetcher = $(twitterFetcherElements[i]);
        TwitterFetcher.jQueryInterface.call($twitterFetcher, $twitterFetcher.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = TwitterFetcher.jQueryInterface;
    $.fn[NAME].Constructor = TwitterFetcher;

    $.fn[NAME].noConflict = function TwitterFetcherNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return TwitterFetcher.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return TwitterFetcher;
  }(jQuery$1);

  var mrTypedText = function ($) {
    /**
     * Check for typedText dependency
     * typedText - https://github.com/mattboldt/typed.js/
     */
    if (typeof Typed !== 'function') {
      throw new Error('mrTypedText requires typed.js (https://github.com/mattboldt/typed.js/)');
    }
    /**
     * Check for scrollMonitor dependency
     * scrollMonitor - https://github.com/stutrek/scrollMonitor
     */


    if (typeof scrollMonitor === 'undefined') {
      throw new Error('mrTypedText requires scrollMonitor.js (https://github.com/stutrek/scrollMonitor)');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrTypedText';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.typedText';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var Selector = {
      TYPED_TEXT: '[data-typed-text]'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var TypedText =
    /*#__PURE__*/
    function () {
      function TypedText(element) {
        // The current map element
        this.element = element;
        var $element = $(element);
        this.Typed = new Typed(this.element, $element.data());
        this.initWatcher(element);
      } // getters


      TypedText.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachTypedText() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new TypedText(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      var _proto = TypedText.prototype;

      _proto.initWatcher = function initWatcher(element) {
        var _this = this;

        var watcher = scrollMonitor.create(element);
        watcher.stateChange(function () {
          // Stop the Typed animation when the element leaves the viewport
          if (watcher.isInViewport) {
            _this.Typed.start();
          } else {
            _this.Typed.stop();
          }
        });
      } // END Class definition
      ;

      _createClass(TypedText, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return TypedText;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      var cdownsOnPage = $.makeArray($(Selector.TYPED_TEXT));
      /* eslint-disable no-plusplus */

      for (var i = cdownsOnPage.length; i--;) {
        var $typedText = $(cdownsOnPage[i]);
        TypedText.jQueryInterface.call($typedText, $typedText.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = TypedText.jQueryInterface;
    $.fn[NAME].Constructor = TypedText;

    $.fn[NAME].noConflict = function TypedTextNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return TypedText.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return TypedText;
  }(jQuery$1);

  (function () {
    if (typeof $ === 'undefined') {
      throw new TypeError('Medium Rare JavaScript requires jQuery. jQuery must be included before theme.js.');
    }
  })();

  exports.mrCountdown = mrCountdown;
  exports.mrCountup = mrCountup;
  exports.mrDropdownGrid = mrDropdownGrid;
  exports.mrFlatpickr = mrFlatpickr;
  exports.mrFormEmail = mrFormEmail;
  exports.mrIonRangeSlider = mrIonRangeSlider;
  exports.mrIsotope = mrIsotope;
  exports.mrMaps = mrMaps;
  exports.mrMapsStyle = mrMapStyle;
  exports.mrOverlayNav = mrOverlayNav;
  exports.mrReadingPosition = mrReadingPosition;
  exports.mrSmoothScroll = mrSmoothScroll;
  exports.mrSticky = mrSticky;
  exports.mrTwitterFetcher = mrTwitterFetcher;
  exports.mrTypedText = mrTypedText;
  exports.mrUtil = mrUtil;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=theme.js.map

