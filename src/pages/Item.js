import React, {Component} from 'react';
import './Item.scss';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="Item">
        {this.props.params.id}
      </div>
    );
  }
}

export default Item;