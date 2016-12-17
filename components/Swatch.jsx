import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';




class Swatch extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   console.log('swatch', this.props);
  // }

  render() {
    let styles = {
      swatch: {
        backgroundColor: '#' + this.props.color,
        // minHeight: 'auto',
        height: '100%',
        top: '0',
        // position: 'absolute',
        width: '20%',
        padding: '0',
        paddingBottom: '20%'
      }
    };
    return (
    <div style={styles.swatch} className='swatches col-sm-3'>
    </div>

    );



  }


}
export default Swatch;
