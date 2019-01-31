const React = require('react');
import Language from './Language';
import LANGUAGES from '../data/languages';

class Chooser extends React.Component {

  constructor(props) {
    super(props);
    this.toggleLanguages = this.toggleLanguages.bind(this);
    this.getList = this.getList.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      visible: false,
      search: '' 
    };
  }

  toggleLanguages(e) {
    e.preventDefault();
    this.setState({ visible: !this.state.visible, search: '' });
  } 

  getList() {
    let langs = LANGUAGES.filter((l) => {
      return Object.values(l).join(' ').toLowerCase().search(this.state.search) > -1;
    });

    langs = langs.map((l) => {
      return <Language name={l.name} code={l.code} country={l.country} otherNames={l.otherNames} key={l.code}/>;
    });

    if (!langs.length) {
      langs = <div className='no-match'>No match</div>;
    }

    return langs;
  }

  search(e) {
    this.setState({ search: e.target.value.toLowerCase() });
  }

  render() {
    let languageList;

    if (this.state.visible) {
      languageList = <div className='language-list' onClick={this.toggleLanguages}>
                       <section className='language-table' onClick={(evt) => evt.stopPropagation()}>
                         <div className='close'><span onClick={this.toggleLanguages}>&times;</span></div>
                         <h1>Select a New Input System Language</h1>
                         <input name='search' className='search'
                                type='text' placeholder='&#x1F50D;'
                                autoFocus onChange={(e) => this.search(e)} />
                         <header className='lang'>
                           <span className='lang-name'>Name</span>
                           <span className='lang-code'>Code</span>
                           <span className='lang-country'>Country</span>
                           <span className='lang-other'>Other Names</span>
                         </header>
                         {this.getList()}
                       </section>
                     </div>;
    }
    return <nav className='chooser'>
             <button className='chooser-button' onClick={this.toggleLanguages}>Change Language</button>
             {languageList}
           </nav>;
  }
}

export default Chooser;
