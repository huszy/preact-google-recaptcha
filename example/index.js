import { h, render, Component } from 'preact';
import "preact/debug";
import ReCaptcha from '../src';

const sitekey = 'xxxxx';

let recaptchaInstance, recaptchaInvisibleInstance;

const changeCallback = (response) => {
	console.log('onChange: '+response);
};

const expiredCallback = () => {
	console.log('onExpired');
};

const getResponse = () => {
	console.log(recaptchaInstance.getResponse());
};

const getInvisibleResponse = () => {
	recaptchaInvisibleInstance.execute();
};

class Example extends Component {
	render() {
		return (
			<div>
				<h1>Google Recaptcha</h1>
				<ReCaptcha
					ref={e => recaptchaInstance = e}
					sitekey={sitekey}
					size="compact"
					render="explicit"
					onChange={changeCallback}
					onExpired={expiredCallback}
				/>
				<br/>
				<button onClick={getResponse}>Get response</button>
				<hr/>
				<ReCaptcha
					ref={e => recaptchaInvisibleInstance = e}
					sitekey={sitekey}
					size="invisible"
					render="explicit"
					onChange={changeCallback}
					onExpired={expiredCallback}
				/>
				<br/>
				<button onClick={getInvisibleResponse}>Get response from invisible captcha</button>
			</div>);
	}
}

render(<Example />, document.body);
