const React = require('react');
import Language from './Language';
import LANGUAGES from '../data/languages';

class Chooser extends React.Component {

  constructor(props) {
    super(props);
    this.toggleLanguages = this.toggleLanguages.bind(this);
    this.getList = this.getList.bind(this);
    this.state = { visible: false };
  }


  toggleLanguages() {
    this.setState({ visible: !this.state.visible });
  } 

  getList() {
    return LANGUAGES.map(l => <Language name={l.name} code={l.code} country={l.country} otherNames={l.otherNames} key={l.code}/>);
  }

  render() {
    let languageList;

    if (this.state.visible) {
      languageList = <div className='language-list'>
                       <section className='language-table'>
                         <h1>Select a New Input System Language</h1>
                         <input className='search' type='text' placeholder='&#x1F50D;' />
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
