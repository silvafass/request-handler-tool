import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import {chromeStorageSet, chromeStorageGet} from 'actions';

class PageRequests extends React.Component {

  constructor(props) {
    super(props);
    const pagePath = decodeURIComponent(props.match.params.pagePath);
    this.state = {
      pagePath: pagePath
    }
    this.props.chromeStorageGet(pagePath);
  }

  getRequestMatchings() {
    const requestMatchings = this.props.pages[this.state.pagePath].requestMatchings;
    if (!requestMatchings) return [];
    return Object.keys(
      requestMatchings
    ).map(path => {
      return {
        ...requestMatchings[path],
        requestMatching: path
      };
    })
  }

  handleChangeInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAddRequestMatching() {
    if (!this.state.requestMatching || !this.checkFormValidity('#request-matching-form')) {
      return;
    }
    const
    pages = this.props.pages,
    page = pages[this.state.pagePath],
    requestMatchings = page.requestMatchings || {},
    requestMatching = requestMatchings[this.state.requestMatching];
    this.props.chromeStorageSet({
      ...pages,
      [this.state.pagePath]: {
        ...page,
        path: this.state.pagePath,
        requestMatchings: {
          ...requestMatchings,
          [this.state.requestMatching]: {
            ...requestMatching
          }
        }
      }
    });
  }

  checkFormValidity(selector) {
    let form = document.querySelector(selector);
    if (form.checkValidity()) {
      return true;
    }
    else {
      form.reportValidity();
      return false;
    }
  }

  handleRemoveRequestMatching(requestMatching) {
    const
    pages = this.props.pages,
    page = pages[this.state.pagePath],
    requestMatchings = page.requestMatchings;
    delete requestMatchings[requestMatching];
    this.props.chromeStorageSet({
      ...pages,
      [this.state.pagePath]: {
        ...page,
        requestMatchings: {
          ...requestMatchings
        }
      }
    });
  }

  render() {
    const {
      pages
    } = this.props,
    {
      pagePath
    } = this.state,
    page = pages[pagePath],
    requestMatchings = this.getRequestMatchings();

    return (
      <Container>
        <Row>
          <Col>
            <h1>Page Requests: {page.path}</h1>
            <hr/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form id="request-matching-form" inline >
              <Form.Group as={Col} >
                <Form.Label>Request Matching</Form.Label>
                <Form.Control type="text" name="requestMatching" id="requestMatching" placeholder="http://request.com" onChange={this.handleChangeInput.bind(this)} />
                <Button onClick={this.handleAddRequestMatching.bind(this)}>Add</Button>
              </Form.Group>

            </Form>
            <br/>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table bordered hover >
              <thead>
                <tr>
                  <th>Request Matching</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {requestMatchings && requestMatchings.map(requestMatching =>
                  <tr key={Math.random()}>
                    <td><Link to={"/request-matching-detail/"+encodeURIComponent(pagePath)+"/"+encodeURIComponent(requestMatching.requestMatching)}>{requestMatching.requestMatching}</Link></td>
                    <td><Button onClick={() => this.handleRemoveRequestMatching(requestMatching.requestMatching)}>Remove</Button></td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }

}

const mapStateToProps = (state, ownProps) => ({
  pages: state.pages
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  chromeStorageSet: pages => dispatch(chromeStorageSet(pages)),
  chromeStorageGet: () => dispatch(chromeStorageGet())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageRequests);
