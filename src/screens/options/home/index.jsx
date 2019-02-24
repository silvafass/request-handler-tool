import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col,
  Table,
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';

class Options extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Request Handler Tool</h1>
            <hr/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="page" className="mr-sm-2">Page</Label>
                <Input type="url" name="page" id="page" placeholder="http://site1.com" />
              </FormGroup>
              <Button>Add</Button>
            </Form>
            <br/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table dark>
              <thead>
                <tr>
                  <th>Page</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Link to="/page-requests">{'http://site1.com'}</Link></td>
                </tr>
              </tbody>
            </Table>
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
)(Options);
