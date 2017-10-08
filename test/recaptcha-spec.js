/** @jsx h */
import { h, render } from 'preact';
import ReCaptcha from "../src"; // eslint-disable-line no-unused-vars

describe("ReCAPTCHA", () => {
  let scratch;

  before(() => {
    scratch = document.createElement('div');
    (document.body || document.documentElement).appendChild(scratch);
  });

  beforeEach(() => {
    scratch.innerHTML = '';
  });

  after(() => {
    scratch.parentNode.removeChild(scratch);
    scratch = null;
  });

  it("Rendered Component should be a div", () => {
    render((
      <ReCaptcha sitekey="xxx" />
    ), scratch);
    expect(scratch.innerHTML).to.equal('<div></div>');
  });

  it("Rendered Component should contained passed props", () => {
    const props = {
      className: "TheClassName",
      id: "superdefinedId"
    };
    render((
      <ReCaptcha sitekey="xxx" {...props} />
    ), scratch);
    expect(scratch.children[0]).to.have.property('className', props.className);
    expect(scratch.children[0]).to.have.property('id', props.id);
  });

  it("Should load Google recaptcha library", () => {
    render((
      <ReCaptcha sitekey="xxx" />
    ), scratch);
    let scripts = Object.assign([], document.scripts);
    let googleScriptLoaded = scripts.filter((script) => {
      return script.src.match(/((http|https):)?\/\/(www\.)?google\.com\/recaptcha\/(.*)/i) !== null;
    });

    expect(googleScriptLoaded.length).to.equal(1);
  });
});
