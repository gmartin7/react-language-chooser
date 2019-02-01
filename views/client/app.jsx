const React = require('react');
const ReactDOM = require('react-dom');
const doneReact = require('../../lib/doneReact');
import Chooser from './Chooser';
import Language from './Language';
import LANGUAGES from '../data/languages';

class ClientApp extends React.Component {
  constructor(props) {
    super(props);
    this.addLanguages = this.addLanguages.bind(this);
    this.getList = this.getList.bind(this);
    this.removeLanguage = this.removeLanguage.bind(this);
    this.state = { selected: [] };
  }

  addLanguages(langs) {
    let joined = this.state.selected.concat(langs);
    this.setState({ selected: joined });
  }

  removeLanguage(langs) {
  }

  getList() {
    let langs = LANGUAGES.filter(l => this.state.selected.indexOf(l.code) > -1);
    langs = langs.map((l) => {
      return <Language name={l.name} code={l.code} country={l.country}
                       otherNames={l.otherNames} key={l.code}
                       remove={this.removeLanguage} />;
    });

   return langs;
  }

  render() {
    return <section>
             <Chooser selected={this.state.selected} addLanguages={this.addLanguages} />
             <section className='language-table'>
               {this.getList()}
             </section>
           </section>;
  }
}

ReactDOM.render(<ClientApp />, document.getElementById('root'));
