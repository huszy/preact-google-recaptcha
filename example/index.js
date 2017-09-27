import { h, render, Component } from 'preact';
import ReCaptcha from '../src';

const sitekey = 'xxxxx';

let recaptchaInstance;

const changeCallback = (response) => {
	console.log('onChange: '+response);
};

const expiredCallback = () => {
	console.log('onExpired');
};

const getResponse = () => {
	console.log(recaptchaInstance.getResponse());
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
			</div>);
	}
}

render(<Example />, document.body);
