import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';


class Swatch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let styles = {
      swatch: {
        backgroundColor: '#' + this.props.color,
        height: '100%',
        top: '0',
        width: '20%',
        padding: '0',
        paddingBottom: '20%'
      }
    };
    return (
      <div style={styles.swatch} className='swatches col-sm-3'></div>
    );
  }
}
export default Swatch;
