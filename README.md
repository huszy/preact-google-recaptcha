[![Dependencies][deps.img]][deps.url]
[![Dev Dependencies][devdeps.img]][devdeps.url]

Preact Component wrapper for [Google reCAPTCHA v2][reCAPTCHA]

Heavily inspired by [React Google Recaptcha][react-google-recaptcha], but removed the dependencies and made Preact compatible.

## Installation

```shell
npm install --save preact-google-recaptcha
```

## Usage

All you need to do is [sign up for an API key pair][signup]. You will need the client key.

You can then use the reCAPTCHA. The default require imports a wrapped component that loads the reCAPTCHA script asynchronously.

```jsx
import { h, Component } from 'preact';
import ReCaptcha from 'preact-google-recaptcha';

function onChange(value) {
  console.log("Captcha value:", value);
}

render(
  <ReCaptcha
    ref="recaptcha"
    sitekey="Your client site key"
    onChange={onChange}
  />,
  document.body
);
```

### Rendering Props

Other properties can be used to customise the rendering.

| Name | Type | Description |
|:---- | ---- | ------ |
| sitekey | string | The API client key |
| theme | enum | *optional* `light` or `dark` The theme of the widget *(__defaults:__ light)*. See [example][docs_theme]
| type | enum | *optional* `image` or `audio` The type of initial captcha *(__defaults:__ image)*
| tabindex | number | *optional* The tabindex on the element *(__default:__ 0)*
| stoken | string | *optional* set the stoken parameter, which allows the captcha to be used from different domains, see [reCAPTCHA secure-token] |
| size | enum | *optional* `compact`, `normal` or `invisible`. This allows you to change the size or do an invisible captcha |
| badge | enum | *optional* `bottomright`, `bottomleft` or `inline`. Positions reCAPTCHA badge. *Only for invisible reCAPTCHA* |
| onChange | func | *optional* The function to be called when the user successfully completes the captcha |
| onExpired | func | *optional* callback when the challenge is expired and has to be redone by user. By default it will call the onChange with null to signify expired callback. |

In order to translate the reCaptcha widget, you should create a global variable configuring the desired language. If you don't provide it, reCaptcha will pick up the user's interface language.

```js
window.recaptchaOptions = {
  lang: 'fr'
}
```

## Component API

The component also has some utility functions that can be called.

- `getResponse()` returns the value of the captcha field

### Invisible reCAPTCHA

[Invisible reCAPTCHA](https://developers.google.com/recaptcha/docs/versions)

This component supports invisible options. See the [reCAPTCHA documentation](https://developers.google.com/recaptcha/docs/invisible) to see how to configure it.

With the invisible option, you need to handle things a bit differently. You will need to call the `execute` method yourself.

```jsx
import { h, Component } from 'preact';
import ReCaptcha from 'preact-google-recaptcha';

function onChange(value) {
  console.log("Captcha value:", value);
}

let captcha;

render(
  <form onSubmit={() => { captcha.execute(); }}>
    <ReCaptcha
      ref={(el) => { captcha = el; }}
      size="invisible"
      sitekey="Your client site key"
      onChange={onChange}
    />
  </form>,
  document.body
);
```

[deps.img]: https://david-dm.org/huszy/preact-google-recaptcha.svg
[deps.url]: https://david-dm.org/huszy/preact-google-recaptcha
[devdeps.img]: https://david-dm.org/huszy/preact-google-recaptcha/dev-status.svg
[devdeps.url]: https://david-dm.org/huszy/preact-google-recaptcha#info=devDependencies

[react-google-recaptcha]: https://github.com/dozoisch/react-google-recaptcha
[reCAPTCHA]: https://www.google.com/recaptcha
[signup]: http://www.google.com/recaptcha/admin
[docs]: https://developers.google.com/recaptcha
[docs_theme]: https://developers.google.com/recaptcha/docs/faq#can-i-customize-the-recaptcha-widget
[js_api]: https://developers.google.com/recaptcha/docs/display#js_api
[rb]: https://github.com/react-bootstrap/react-bootstrap/
[reCAPTCHA secure-token]: https://developers.google.com/recaptcha/docs/secure_token
