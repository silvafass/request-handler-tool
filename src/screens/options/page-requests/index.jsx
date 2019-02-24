import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class PageRequests extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Page Requests</h1>
            <hr/>
          </Col>
        </Row>
      </Container>
    );
  }

}

export default connect(
  (state, ownProps) => {
    return {
      test: state.defaultAction
    }
  },
  (dispatch, ownProps) => {
    return {
    }
  }
)(PageRequests);
