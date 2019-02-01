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

  removeLanguage(e, index) {
    e.stopPropagation()
    let selected = [...this.state.selected];
    selected.splice(index, 1);
    this.setState({ selected: selected });
  }

  getList() {
    let langs = LANGUAGES.filter(l => this.state.selected.indexOf(l.code) > -1);
    langs = langs.map((l, index) => {
      return <div className='lang-wrapper' onClick={(e) => this.removeLanguage(e, index)}>
               <Language name={l.name} code={l.code} country={l.country}
                         otherNames={l.otherNames} key={l.code}
                         onClick={this.removeLanguage} />;
             </div>
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
