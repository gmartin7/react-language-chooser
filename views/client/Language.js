const React = require('react');

class Language extends React.Component {
  constructor(props) {
    super(props);
//    this.toggleLanguages = this.toggleLanguages.bind(this);
//    this.state = { visible: false };
  }


//  toggleLanguages() {
//    this.setState({ visible: !this.state.visible });
//  } 

  render() {
    return <div className='lang'>
             <span className='lang-name'>{this.props.name}</span>
             <span className='lang-code'>{this.props.code}</span>
             <span className='lang-country'>{this.props.country}</span>
             <span className='lang-other'>{this.props.otherNames}</span>
           </div>;
  }
}

export default Language;
