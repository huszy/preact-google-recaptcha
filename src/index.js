/* global grecaptcha */
import { h, Component } from 'preact';
import PropTypes from "prop-types";

const lang = typeof window !== "undefined" && (window.recaptchaOptions && window.recaptchaOptions.lang) ?
  `&hl=${window.recaptchaOptions.lang}` :
  "";
const URL = `https://www.google.com/recaptcha/api.js?&onload=recaptchaLoaded&render=explicit${lang}`;

const isRecaptchaLoaded = () => typeof window !== 'undefined' && typeof window.grecaptcha !== 'undefined';

export default class ReCaptcha extends Component {
  constructor() {
    super();
    this.waitingTimer = null;
    this.element = null;
    this.recaptchaId = null;

    this._captureRef = this.captureRef.bind(this);
    this._initializeRecaptcha = this.initializeRecaptcha.bind(this);
    this._handleExpired = this.handleExpired.bind(this);
    this._handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.initializeRecaptcha();
  }

  componentWillUnmount() {
    this.clearTimer();
    if (isRecaptchaLoaded() && this.element && this.recaptchaId !== null) {
      this.removeRecaptcha();
    }
    window.___grecaptcha_cfg.count = 0;
    window.___grecaptcha_cfg.clients = {};
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { sitekey, onChange, theme, type, tabindex, onExpired, size, stoken, grecaptcha, badge, ...childProps } = this.props;
    return (
      <div {...childProps} ref={this._captureRef} />
    );
  }

  execute = () => {
    if (isRecaptchaLoaded() && this.element && this.recaptchaId !== null && this.props.size === "invisible") {
      grecaptcha.execute(this.recaptchaId);
      return true;
    }
    return false;
  }

  reset = () => {
    if (isRecaptchaLoaded() && this.element && this.recaptchaId !== null) {
      grecaptcha.reset(this.recaptchaId);
      return true;
    }
    return false;
  }

  getResponse = () => {
    if (isRecaptchaLoaded() && this.element && this.recaptchaId !== null) {
      return grecaptcha.getResponse(this.recaptchaId);
    }
    return null;
  }

  handleChange = (response) => {
    if (this.props.onChange) {
      this.props.onChange(response);
    }
  }

  handleExpired = () => {
    if (this.props.onExpired) {
      this.props.onExpired();
    }
  }

  removeRecaptcha = () => {
    grecaptcha.reset(this.recaptchaId);
  }

  renderRecaptcha = () => {
    this.recaptchaId = grecaptcha.render(this.element, {
      sitekey: this.props.sitekey,
      callback: this._handleChange,
      theme: this.props.theme,
      type: this.props.type,
      tabindex: this.props.tabindex,
      "expired-callback": this._handleExpired,
      size: this.props.size,
      stoken: this.props.stoken,
      badge: this.props.badge
    });
  }

  captureRef = (elem) => {
    this.element = elem;
  }

  initializeRecaptcha = () => {
    if (isRecaptchaLoaded()) {
      // Initialize recaptcha
      this.clearTimer();
      this.renderRecaptcha();
    } else if (!this.isRecaptchaJSLibInjected()) {
      // Check if script already injected, if not load it async with callback
      let script = document.createElement("script");

      window.recaptchaLoaded = this.initializeRecaptcha.bind(this);

      script.src = URL;
      script.async = 1;
      script.defer = 1;

      script.onerror = () => {
        console.log("Error loading google recaptcha!");
      };

      document.body.appendChild(script);

    } else {
      this.startTimer();
    }
  }

  isRecaptchaJSLibInjected = () => {
    if (typeof window === 'undefined') { return false; }
    if (!document.scripts || document.scripts.length === 0) { return false; }
    let scripts = Object.assign([], document.scripts);
    return (scripts.filter((script) => {
      return script.src.match(/((http|https):)?\/\/(www\.)?google\.com\/recaptcha\/(.*)/i) !== null;
    })).length > 0;
  }

  startTimer = () => {
    this.waitingTimer = setTimeout(this._initializeRecaptcha, 200);
  }

  clearTimer = () => {
    if (this.waitingTimer !== null) {
      clearInterval(this.waitingTimer);
    }
  }
}

ReCaptcha.propTypes = {
  sitekey: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(["dark", "light"]),
  type: PropTypes.oneOf(["image", "audio"]),
  tabindex: PropTypes.number,
  size: PropTypes.oneOf(["compact", "normal", "invisible"]),
  stoken: PropTypes.string,
  badge: PropTypes.oneOf(["bottomright", "bottomleft", "inline"]),
  onChange: PropTypes.func,
  onExpired: PropTypes.func
};
ReCaptcha.defaultProps = {
  theme: "light",
  type: "image",
  tabindex: 0,
  size: "normal",
  badge: "bottomright"
};
