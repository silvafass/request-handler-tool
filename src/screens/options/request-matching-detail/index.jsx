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

class RequestMatchingDetail extends React.Component {

  constructor(props) {
    super(props);
    const
    pagePath = decodeURIComponent(props.match.params.pagePath),
    requestMatching = decodeURIComponent(props.match.params.requestMatching);
    this.state = {
      pagePath: pagePath,
      requestMatching: requestMatching
    }
    this.props.chromeStorageGet(pagePath);
  }

  handleChangeInput(event) {
    this.setState({
      [event.target.name]: event.target.value
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

  render() {
    const {
      pages
    } = this.props,
    {
      pagePath,
      requestMatching
    } = this.state,
    page = pages[pagePath],
    requestMatchingDetail = page.requestMatchings[requestMatching];

    console.log(1, '###################################', requestMatchingDetail);

    return (
      <Container>
        <Row>
          <Col>
            <h1>Request Matching detail: {requestMatching}</h1>
            <hr/>
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
)(RequestMatchingDetail);
