var UnloadSubmit = (function() {
  'use strict';

  var IS_MOBILE = false;
  var INPUT_CHANGE_TIMEOUT = 1500; // 1.5 sec
  var SENDING_TIMEOUT = 9500; // 9.5 sec

  var PHONE_NUMBER = '';
  var timer = null;

  /**
   * Debounce
   *
   * @param {function} func Invoke function
   * @param {number} wait Delay
   * @param {boolean} immediate immediately call
   * @return {function}
   */
  function _debounce(func, wait, immediate) {
    var timeout;

    return function() {
      var context = this,
        args = arguments;

      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  }

  /**
   * Check user device
   *
   * @return {boolean} Is mobile device
   */
  function _isMobileCheck() {
    var isMobile = false;

    (function(a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a,
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4),
        )
      )
        isMobile = true;
    })(navigator.userAgent || navigator.vendor || window.opera);

    return isMobile;
  }

  /**
   * Find cookie
   *
   * @param {string} name Cookie name
   * @return {string} Matched value
   */
  function _getCookie(name) {
    var matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
    );

    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  /**
   * Save phone number
   *
   * @param {string|number} phone Phone number
   */
  function _setPhoneNumber(phone) {
    if (PHONE_NUMBER !== phone) {
      PHONE_NUMBER = phone;
      formIsSubmitted = false;
    }
  }

  /**
   * Send data by beacon
   *
   * @param {string} url Sending URL
   * @param {Object} data Form data
   */
  function _sendBeacon(url, data) {
    data.append('dop_params[autosubmit]', 'true');
    navigator.sendBeacon(url, data);
    _onRequestComplete();
  }

  /**
   * Send data by xhr
   *
   * @param {string} url Sending URL
   * @param {string} data Form data
   */
  function _sendXHR(url, data) {
    $.ajax({
      url: url,
      method: 'POST',
      async: false,
      data: data + '&dop_params[autosubmit]=true',
      success: _onRequestComplete,
    });
  }

  /**
   * Send form data
   *
   * @param {string} url Sending URL
   * @param {HTMLElement} form Form element
   */
  function _sendRequest(url, form) {
    if (formIsSubmitted) return;

    if (!navigator.sendBeacon) {
      _sendXHR(url, $(form).serialize());
    } else {
      _sendBeacon(url, new FormData(form));
    }
  }

  /**
   * Request complete callback
   *
   */
  function _onRequestComplete() {
    formIsSubmitted = true;
    _sendYaMetricaEvent();
  }

  /**
   * Phone validation
   *
   * @param {string|number} phone Phone number
   * @return {boolean} Validate result
   */
  function _validatePhone(phone) {
    var re = /^[0-9\-\+\(\) ]*$/i;
    return phone.length > 7 && re.test(phone);
  }

  /**
   * Send Yandex.Metrica event
   *
   */
  function _sendYaMetricaEvent() {
    typeof window.yaCounter22765945 !== 'undefined' &&
      window.yaCounter22765945.reachGoal('ajaxOrder');
  }

  /**
   * Handle user input
   *
   */
  var _handleChange = _debounce(function() {
    var $this = $(this);
    var phone = $this.val();
    var $form = $this.closest('form');

    if ($form.length && _validatePhone(phone)) {
      _setPhoneNumber(phone);
      $form.find('[name="phone"]').val(PHONE_NUMBER);

      if (IS_MOBILE) {
        clearTimeout(timer);
        timer = setTimeout(function() {
          _sendRequest('/order', $form[0]);
        }, SENDING_TIMEOUT);

        // document.addEventListener('visibilitychange', function() {
        //   if (document.visibilityState === 'hidden') {
        //     _sendRequest('/order', $form[0]);
        //   }
        // });
      } else {
        window.onbeforeunload = function() {
          _sendRequest('/order', $form[0]);
        };
      }
    }
  }, INPUT_CHANGE_TIMEOUT);

  /**
   * Set events
   *
   */
  function _setEvents() {
    $(document).ready(function() {
      $('.orderformcdn')
        .find('[name="phone"]')
        .on('keydown', _handleChange);
    });
  }

  /**
   * Set params and listers
   *
   * @return {boolean}
   */
  function init() {
    try {
      formIsSubmitted = !!_getCookie('formIsSubmitted');
      IS_MOBILE = _isMobileCheck();

      if (!window.jQuery) {
        var script = document.createElement('script');
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js';
        document.getElementsByTagName('head')[0].appendChild(script);
        script.addEventListener('load', function() {
          _setEvents();
        });
      } else {
        _setEvents();
      }

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  return {
    init: init,
  };
})();

UnloadSubmit.init();
