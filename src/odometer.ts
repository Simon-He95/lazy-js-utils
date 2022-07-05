import { addStyle } from './addStyle'
export function odometer(this: any) {
  addStyle(`.odometer.odometer-auto-theme, .odometer.odometer-theme-minimal {
    display: inline-block;
    vertical-align: middle;
    *vertical-align: auto;
    *zoom: 1;
    *display: inline;
    position: relative;
  }
  .odometer.odometer-auto-theme .odometer-digit, .odometer.odometer-theme-minimal .odometer-digit {
    display: inline-block;
    vertical-align: middle;
    *vertical-align: auto;
    *zoom: 1;
    *display: inline;
    position: relative;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-digit-spacer, .odometer.odometer-theme-minimal .odometer-digit .odometer-digit-spacer {
    display: inline-block;
    vertical-align: middle;
    *vertical-align: auto;
    *zoom: 1;
    *display: inline;
    visibility: hidden;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-digit-inner, .odometer.odometer-theme-minimal .odometer-digit .odometer-digit-inner {
    text-align: left;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-ribbon, .odometer.odometer-theme-minimal .odometer-digit .odometer-ribbon {
    display: block;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-ribbon-inner, .odometer.odometer-theme-minimal .odometer-digit .odometer-ribbon-inner {
    display: block;
    -webkit-backface-visibility: hidden;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-value, .odometer.odometer-theme-minimal .odometer-digit .odometer-value {
    display: block;
    -webkit-transform: translateZ(0);
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-value.odometer-last-value, .odometer.odometer-theme-minimal .odometer-digit .odometer-value.odometer-last-value {
    position: absolute;
  }
  .odometer.odometer-auto-theme.odometer-animating-up .odometer-ribbon-inner, .odometer.odometer-theme-minimal.odometer-animating-up .odometer-ribbon-inner {
    -webkit-transition: -webkit-transform 2s;
    -moz-transition: -moz-transform 2s;
    -ms-transition: -ms-transform 2s;
    -o-transition: -o-transform 2s;
    transition: transform 2s;
  }
  .odometer.odometer-auto-theme.odometer-animating-up.odometer-animating .odometer-ribbon-inner, .odometer.odometer-theme-minimal.odometer-animating-up.odometer-animating .odometer-ribbon-inner {
    -webkit-transform: translateY(-100%);
    -moz-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    -o-transform: translateY(-100%);
    transform: translateY(-100%);
  }
  .odometer.odometer-auto-theme.odometer-animating-down .odometer-ribbon-inner, .odometer.odometer-theme-minimal.odometer-animating-down .odometer-ribbon-inner {
    -webkit-transform: translateY(-100%);
    -moz-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    -o-transform: translateY(-100%);
    transform: translateY(-100%);
  }
  .odometer.odometer-auto-theme.odometer-animating-down.odometer-animating .odometer-ribbon-inner, .odometer.odometer-theme-minimal.odometer-animating-down.odometer-animating .odometer-ribbon-inner {
    -webkit-transition: -webkit-transform 2s;
    -moz-transition: -moz-transform 2s;
    -ms-transition: -ms-transform 2s;
    -o-transition: -o-transform 2s;
    transition: transform 2s;
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
  }
  `);
  (function () {
    let COUNT_FRAMERATE; let COUNT_MS_PER_FRAME; let DIGIT_FORMAT; let DIGIT_HTML; let DIGIT_SPEEDBOOST; let DURATION; let FORMAT_MARK_HTML; let FORMAT_PARSER; let FRAMERATE; let FRAMES_PER_VALUE; let MS_PER_FRAME; let MutationObserver; let Odometer; let RIBBON_HTML; let TRANSITION_END_EVENTS; let TRANSITION_SUPPORT; let VALUE_HTML; let addClass; let createFromHTML; let fractionalPart; let now; let removeClass; let requestAnimationFrame; let round; let transitionCheckStyles; let trigger; let truncate; let wrapJQuery; let _jQueryWrapped; let _old; let _ref; let _ref1
    const __slice = [].slice

    VALUE_HTML = '<span class="odometer-value"></span>'

    RIBBON_HTML = `<span class="odometer-ribbon"><span class="odometer-ribbon-inner">${VALUE_HTML}</span></span>`

    DIGIT_HTML = `<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">${RIBBON_HTML}</span></span>`

    FORMAT_MARK_HTML = '<span class="odometer-formatting-mark"></span>'

    DIGIT_FORMAT = '(,ddd).dd'

    FORMAT_PARSER = /^\(?([^)]*)\)?(?:(.)(d+))?$/

    FRAMERATE = 30

    DURATION = 2000

    COUNT_FRAMERATE = 20

    FRAMES_PER_VALUE = 2

    DIGIT_SPEEDBOOST = 0.5

    MS_PER_FRAME = 1000 / FRAMERATE

    COUNT_MS_PER_FRAME = 1000 / COUNT_FRAMERATE

    TRANSITION_END_EVENTS = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd'

    transitionCheckStyles = document.createElement('div').style

    TRANSITION_SUPPORT = (transitionCheckStyles.transition != null) || (transitionCheckStyles.webkitTransition != null) || (transitionCheckStyles.mozTransition != null) || (transitionCheckStyles.oTransition != null)

    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

    createFromHTML = function (html) {
      let el
      el = document.createElement('div')
      el.innerHTML = html
      return el.children[0]
    }

    removeClass = function (el, name) {
      return el.className = el.className.replace(new RegExp(`(^| )${name.split(' ').join('|')}( |$)`, 'gi'), ' ')
    }

    addClass = function (el, name) {
      removeClass(el, name)
      return el.className += ` ${name}`
    }

    trigger = function (el, name) {
      let evt
      if (document.createEvent != null) {
        evt = document.createEvent('HTMLEvents')
        evt.initEvent(name, true, true)
        return el.dispatchEvent(evt)
      }
    }

    now = function () {
      let _ref, _ref1
      return (_ref = (_ref1 = window.performance) != null ? typeof _ref1.now === 'function' ? _ref1.now() : void 0 : void 0) != null ? _ref : +(new Date())
    }

    round = function (val, precision) {
      if (precision == null)
        precision = 0

      if (!precision)
        return Math.round(val)

      val *= 10 ** precision
      val += 0.5
      val = Math.floor(val)
      return val /= 10 ** precision
    }

    truncate = function (val) {
      if (val < 0)
        return Math.ceil(val)
      else
        return Math.floor(val)
    }

    fractionalPart = function (val) {
      return val - round(val)
    }

    _jQueryWrapped = false;

    (wrapJQuery = function () {
      let property, _i, _len, _ref, _results
      if (_jQueryWrapped)
        return

      if (window.jQuery != null) {
        _jQueryWrapped = true
        _ref = ['html', 'text']
        _results = []
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          property = _ref[_i]
          _results.push((function (property) {
            let old
            old = window.jQuery.fn[property]
            return window.jQuery.fn[property] = function (val) {
              let _ref1
              if ((val == null) || (((_ref1 = this[0]) != null ? _ref1.odometer : void 0) == null))
                return old.apply(this, arguments)

              return this[0].odometer.update(val)
            }
          })(property))
        }
        return _results
      }
    })()

    setTimeout(wrapJQuery, 0)

    Odometer = (function () {
      function Odometer(options) {
        let e; let k; let property; let v; let _base; let _i; let _len; let _ref; let _ref1; let _ref2
        const _this = this
        this.options = options
        this.el = this.options.el
        if (this.el.odometer != null)
          return this.el.odometer

        this.el.odometer = this
        _ref = Odometer.options
        for (k in _ref) {
          v = _ref[k]
          if (this.options[k] == null)
            this.options[k] = v
        }
        if ((_base = this.options).duration == null)
          _base.duration = DURATION

        this.MAX_VALUES = ((this.options.duration / MS_PER_FRAME) / FRAMES_PER_VALUE) | 0
        this.resetFormat()
        this.value = this.cleanValue((_ref1 = this.options.value) != null ? _ref1 : '')
        this.renderInside()
        this.render()
        try {
          _ref2 = ['innerHTML', 'innerText', 'textContent']
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            property = _ref2[_i]
            if (this.el[property] != null) {
              (function (property) {
                return Object.defineProperty(_this.el, property, {
                  get() {
                    let _ref3
                    if (property === 'innerHTML')
                      return _this.inside.outerHTML
                    else
                      return (_ref3 = _this.inside.innerText) != null ? _ref3 : _this.inside.textContent
                  },
                  set(val) {
                    return _this.update(val)
                  },
                })
              })(property)
            }
          }
        }
        catch (_error) {
          e = _error
          this.watchForMutations()
        }
        this
      }

      Odometer.prototype.renderInside = function () {
        this.inside = document.createElement('div')
        this.inside.className = 'odometer-inside'
        this.el.innerHTML = ''
        return this.el.appendChild(this.inside)
      }

      Odometer.prototype.watchForMutations = function () {
        let e
        const _this = this
        if (MutationObserver == null)
          return

        try {
          if (this.observer == null) {
            this.observer = new MutationObserver((mutations) => {
              let newVal
              newVal = _this.el.innerText
              _this.renderInside()
              _this.render(_this.value)
              return _this.update(newVal)
            })
          }
          this.watchMutations = true
          return this.startWatchingMutations()
        }
        catch (_error) {
          e = _error
        }
      }

      Odometer.prototype.startWatchingMutations = function () {
        if (this.watchMutations) {
          return this.observer.observe(this.el, {
            childList: true,
          })
        }
      }

      Odometer.prototype.stopWatchingMutations = function () {
        let _ref
        return (_ref = this.observer) != null ? _ref.disconnect() : void 0
      }

      Odometer.prototype.cleanValue = function (val) {
        let _ref
        if (typeof val === 'string') {
          val = val.replace((_ref = this.format.radix) != null ? _ref : '.', '<radix>')
          val = val.replace(/[.,]/g, '')
          val = val.replace('<radix>', '.')
          val = parseFloat(val, 10) || 0
        }
        return round(val, this.format.precision)
      }

      Odometer.prototype.bindTransitionEnd = function () {
        let event; let renderEnqueued; let _i; let _len; let _ref; let _results
        const _this = this
        if (this.transitionEndBound)
          return

        this.transitionEndBound = true
        renderEnqueued = false
        _ref = TRANSITION_END_EVENTS.split(' ')
        _results = []
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          event = _ref[_i]
          _results.push(this.el.addEventListener(event, () => {
            if (renderEnqueued)
              return true

            renderEnqueued = true
            setTimeout(() => {
              _this.render()
              renderEnqueued = false
              return trigger(_this.el, 'odometerdone')
            }, 0)
            return true
          }, false))
        }
        return _results
      }

      Odometer.prototype.resetFormat = function () {
        let format, fractional, parsed, precision, radix, repeating, _ref, _ref1
        format = (_ref = this.options.format) != null ? _ref : DIGIT_FORMAT
        format || (format = 'd')
        parsed = FORMAT_PARSER.exec(format)
        if (!parsed)
          throw new Error('Odometer: Unparsable digit format')

        _ref1 = parsed.slice(1, 4), repeating = _ref1[0], radix = _ref1[1], fractional = _ref1[2]
        precision = (fractional != null ? fractional.length : void 0) || 0
        return this.format = {
          repeating,
          radix,
          precision,
        }
      }

      Odometer.prototype.render = function (value) {
        let classes, cls, match, newClasses, theme, _i, _len
        if (value == null)
          value = this.value

        this.stopWatchingMutations()
        this.resetFormat()
        this.inside.innerHTML = ''
        theme = this.options.theme
        classes = this.el.className.split(' ')
        newClasses = []
        for (_i = 0, _len = classes.length; _i < _len; _i++) {
          cls = classes[_i]
          if (!cls.length)
            continue

          if (match = /^odometer-theme-(.+)$/.exec(cls)) {
            theme = match[1]
            continue
          }
          if (/^odometer(-|$)/.test(cls))
            continue

          newClasses.push(cls)
        }
        newClasses.push('odometer')
        if (!TRANSITION_SUPPORT)
          newClasses.push('odometer-no-transitions')

        if (theme)
          newClasses.push(`odometer-theme-${theme}`)
        else
          newClasses.push('odometer-auto-theme')

        this.el.className = newClasses.join(' ')
        this.ribbons = {}
        this.formatDigits(value)
        return this.startWatchingMutations()
      }

      Odometer.prototype.formatDigits = function (value) {
        let digit, valueDigit, valueString, wholePart, _i, _j, _len, _len1, _ref, _ref1
        this.digits = []
        if (this.options.formatFunction) {
          valueString = this.options.formatFunction(value)
          _ref = valueString.split('').reverse()
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            valueDigit = _ref[_i]
            if (valueDigit.match(/0-9/)) {
              digit = this.renderDigit()
              digit.querySelector('.odometer-value').innerHTML = valueDigit
              this.digits.push(digit)
              this.insertDigit(digit)
            }
            else {
              this.addSpacer(valueDigit)
            }
          }
        }
        else {
          wholePart = !this.format.precision || !fractionalPart(value) || false
          _ref1 = value.toString().split('').reverse()
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            digit = _ref1[_j]
            if (digit === '.')
              wholePart = true

            this.addDigit(digit, wholePart)
          }
        }
      }

      Odometer.prototype.update = function (newValue) {
        let diff
        const _this = this
        newValue = this.cleanValue(newValue)
        if (!(diff = newValue - this.value))
          return

        removeClass(this.el, 'odometer-animating-up odometer-animating-down odometer-animating')
        if (diff > 0)
          addClass(this.el, 'odometer-animating-up')
        else
          addClass(this.el, 'odometer-animating-down')

        this.stopWatchingMutations()
        this.animate(newValue)
        this.startWatchingMutations()
        setTimeout(() => {
          _this.el.offsetHeight
          return addClass(_this.el, 'odometer-animating')
        }, 0)
        return this.value = newValue
      }

      Odometer.prototype.renderDigit = function () {
        return createFromHTML(DIGIT_HTML)
      }

      Odometer.prototype.insertDigit = function (digit, before) {
        if (before != null)
          return this.inside.insertBefore(digit, before)
        else if (!this.inside.children.length)
          return this.inside.appendChild(digit)
        else
          return this.inside.insertBefore(digit, this.inside.children[0])
      }

      Odometer.prototype.addSpacer = function (chr, before, extraClasses) {
        let spacer
        spacer = createFromHTML(FORMAT_MARK_HTML)
        spacer.innerHTML = chr
        if (extraClasses)
          addClass(spacer, extraClasses)

        return this.insertDigit(spacer, before)
      }

      Odometer.prototype.addDigit = function (value, repeating) {
        let chr, digit, resetted, _ref
        if (repeating == null)
          repeating = true

        if (value === '-')
          return this.addSpacer(value, null, 'odometer-negation-mark')

        if (value === '.')
          return this.addSpacer((_ref = this.format.radix) != null ? _ref : '.', null, 'odometer-radix-mark')

        if (repeating) {
          resetted = false
          while (true) {
            if (!this.format.repeating.length) {
              if (resetted)
                throw new Error('Bad odometer format without digits')

              this.resetFormat()
              resetted = true
            }
            chr = this.format.repeating[this.format.repeating.length - 1]
            this.format.repeating = this.format.repeating.substring(0, this.format.repeating.length - 1)
            if (chr === 'd')
              break

            this.addSpacer(chr)
          }
        }
        digit = this.renderDigit()
        digit.querySelector('.odometer-value').innerHTML = value
        this.digits.push(digit)
        return this.insertDigit(digit)
      }

      Odometer.prototype.animate = function (newValue) {
        if (!TRANSITION_SUPPORT || this.options.animation === 'count')
          return this.animateCount(newValue)
        else
          return this.animateSlide(newValue)
      }

      Odometer.prototype.animateCount = function (newValue) {
        let cur; let diff; let last; let start; let tick
        const _this = this
        if (!(diff = +newValue - this.value))
          return

        start = last = now()
        cur = this.value
        return (tick = function () {
          let delta, dist, fraction
          if ((now() - start) > _this.options.duration) {
            _this.value = newValue
            _this.render()
            trigger(_this.el, 'odometerdone')
            return
          }
          delta = now() - last
          if (delta > COUNT_MS_PER_FRAME) {
            last = now()
            fraction = delta / _this.options.duration
            dist = diff * fraction
            cur += dist
            _this.render(Math.round(cur))
          }
          if (requestAnimationFrame != null)
            return requestAnimationFrame(tick)
          else
            return setTimeout(tick, COUNT_MS_PER_FRAME)
        })()
      }

      Odometer.prototype.getDigitCount = function () {
        let i, max, value, values, _i, _len
        values = arguments.length >= 1 ? __slice.call(arguments, 0) : []
        for (i = _i = 0, _len = values.length; _i < _len; i = ++_i) {
          value = values[i]
          values[i] = Math.abs(value)
        }
        max = Math.max.apply(Math, values)
        return Math.ceil(Math.log(max + 1) / Math.log(10))
      }

      Odometer.prototype.getFractionalDigitCount = function () {
        let i, parser, parts, value, values, _i, _len
        values = arguments.length >= 1 ? __slice.call(arguments, 0) : []
        parser = /^\-?\d*\.(\d*?)0*$/
        for (i = _i = 0, _len = values.length; _i < _len; i = ++_i) {
          value = values[i]
          values[i] = value.toString()
          parts = parser.exec(values[i])
          if (parts == null)
            values[i] = 0
          else
            values[i] = parts[1].length
        }
        return Math.max.apply(Math, values)
      }

      Odometer.prototype.resetDigits = function () {
        this.digits = []
        this.ribbons = []
        this.inside.innerHTML = ''
        return this.resetFormat()
      }

      Odometer.prototype.animateSlide = function (newValue) {
        let boosted, cur, diff, digitCount, digits, dist, end, fractionalCount, frame, frames, i, incr, j, mark, numEl, oldValue, start, _base, _i, _j, _k, _l, _len, _len1, _len2, _m, _ref, _results
        oldValue = this.value
        fractionalCount = this.getFractionalDigitCount(oldValue, newValue)
        if (fractionalCount) {
          newValue = newValue * 10 ** fractionalCount
          oldValue = oldValue * 10 ** fractionalCount
        }
        if (!(diff = newValue - oldValue))
          return

        this.bindTransitionEnd()
        digitCount = this.getDigitCount(oldValue, newValue)
        digits = []
        boosted = 0
        for (i = _i = 0; digitCount >= 0 ? _i < digitCount : _i > digitCount; i = digitCount >= 0 ? ++_i : --_i) {
          start = truncate(oldValue / 10 ** (digitCount - i - 1))
          end = truncate(newValue / 10 ** (digitCount - i - 1))
          dist = end - start
          if (Math.abs(dist) > this.MAX_VALUES) {
            frames = []
            incr = dist / (this.MAX_VALUES + this.MAX_VALUES * boosted * DIGIT_SPEEDBOOST)
            cur = start
            while ((dist > 0 && cur < end) || (dist < 0 && cur > end)) {
              frames.push(Math.round(cur))
              cur += incr
            }
            if (frames[frames.length - 1] !== end)
              frames.push(end)

            boosted++
          }
          else {
            frames = (function () {
              _results = []
              for (let _j = start; start <= end ? _j <= end : _j >= end; start <= end ? _j++ : _j--) _results.push(_j)
              return _results
            }.apply(this))
          }
          for (i = _k = 0, _len = frames.length; _k < _len; i = ++_k) {
            frame = frames[i]
            frames[i] = Math.abs(frame % 10)
          }
          digits.push(frames)
        }
        this.resetDigits()
        _ref = digits.reverse()
        for (i = _l = 0, _len1 = _ref.length; _l < _len1; i = ++_l) {
          frames = _ref[i]
          if (!this.digits[i])
            this.addDigit(' ', i >= fractionalCount)

          if ((_base = this.ribbons)[i] == null)
            _base[i] = this.digits[i].querySelector('.odometer-ribbon-inner')

          this.ribbons[i].innerHTML = ''
          if (diff < 0)
            frames = frames.reverse()

          for (j = _m = 0, _len2 = frames.length; _m < _len2; j = ++_m) {
            frame = frames[j]
            numEl = document.createElement('div')
            numEl.className = 'odometer-value'
            numEl.innerHTML = frame
            this.ribbons[i].appendChild(numEl)
            if (j === frames.length - 1)
              addClass(numEl, 'odometer-last-value')

            if (j === 0)
              addClass(numEl, 'odometer-first-value')
          }
        }
        if (start < 0)
          this.addDigit('-')

        mark = this.inside.querySelector('.odometer-radix-mark')
        if (mark != null)
          mark.parent.removeChild(mark)

        if (fractionalCount)
          return this.addSpacer(this.format.radix, this.digits[fractionalCount - 1], 'odometer-radix-mark')
      }

      return Odometer
    })()

    Odometer.options = (_ref = window.odometerOptions) != null ? _ref : {}

    setTimeout(() => {
      let k, v, _base, _ref1, _results
      if (window.odometerOptions) {
        _ref1 = window.odometerOptions
        _results = []
        for (k in _ref1) {
          v = _ref1[k]
          _results.push((_base = Odometer.options)[k] != null ? (_base = Odometer.options)[k] : _base[k] = v)
        }
        return _results
      }
    }, 0)

    Odometer.init = function () {
      let el, elements, _i, _len, _ref1, _results
      if (document.querySelectorAll == null)
        return

      elements = document.querySelectorAll(Odometer.options.selector || '.odometer')
      _results = []
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        el = elements[_i]
        _results.push(el.odometer = new Odometer({
          el,
          value: (_ref1 = el.innerText) != null ? _ref1 : el.textContent,
        }))
      }
      return _results
    }

    if ((((_ref1 = document.documentElement) != null ? _ref1.doScroll : void 0) != null) && (document.createEventObject != null)) {
      _old = document.onreadystatechange
      document.onreadystatechange = function () {
        if (document.readyState === 'complete' && Odometer.options.auto !== false)
          Odometer.init()

        return _old != null ? _old.apply(this, arguments) : void 0
      }
    }
    else {
      document.addEventListener('DOMContentLoaded', () => {
        if (Odometer.options.auto !== false)
          return Odometer.init()
      }, false)
    }

    if (typeof define === 'function' && define.amd) {
      define([], () => {
        return Odometer
      })
    }
    else if (typeof exports !== 'undefined' && exports !== null) {
      module.exports = Odometer
    }
    else {
      window.Odometer = Odometer
    }
  }).call(this)
  return window.Odometer
}

