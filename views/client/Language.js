const React = require('react');

class Language extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.state = { selected: props.selected };
  }

  toggleSelected() {
    this.setState({ selected: !this.state.selected }, () => {
      if (this.props.select) {
        this.props.select(this.props.code);
      }
    });
  } 

  render() {
    return <div className={`lang ${this.state.selected ? 'selected' : ''}`}
                onClick={this.toggleSelected}>
             <span className='lang-name'>{this.props.name}</span>
             <span className='lang-code'>{this.props.code}</span>
             <span className='lang-country'>{this.props.country}</span>
             <span className='lang-other'>{this.props.otherNames}</span>
           </div>;
  }
}

export default Language;
