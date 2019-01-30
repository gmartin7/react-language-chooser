const React = require('react');
const ReactDOM = require('react-dom');
const doneReact = require('../../lib/doneReact');
import Chooser from './Chooser';

class ClientApp extends React.Component {
  constructor(props) {
    super(props);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.state = { currentLanguage: null };
  }

  changeLanguage(lang) {
    this.setState({ currentLanguage: lang });
  }

  render() {
    let currentLanguage;
    if (this.state.currentLanguage) {
      currentLanguage = <h1 className='current-language'>{this.state.currentLanguage}</h1>;
    }
    return <section>
             <Chooser languageChanged={this.changeLanguage} />
             {currentLanguage} 
           </section>;
  }
}

ReactDOM.render(<ClientApp />, document.getElementById('root'));
