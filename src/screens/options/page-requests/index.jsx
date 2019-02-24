import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Col
} from 'reactstrap';

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
