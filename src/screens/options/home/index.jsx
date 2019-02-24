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

class Options extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.props.chromeStorageGet();
  }

  getPages() {
    return Object.keys(this.props.pages).map(path => this.props.pages[path])
  }

  handleChangeInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAddPage() {
    if (!this.state.pagePath || !this.checkFormValidity('#page-form')) {
      return;
    }
    this.props.chromeStorageSet({
      ...this.props.pages,
      [this.state.pagePath]: {
        path: this.state.pagePath
      }
    });
  }

  handleRemovePage(pagePath) {
    let pages = {
      ...this.props.pages
    };
    delete pages[pagePath];
    this.props.chromeStorageSet(pages);
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
      handleAddPage,
      handleChangeInput
    } = this,
    pages = this.getPages();

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
            <Form id="page-form" inline >
              <Form.Group as={Col} >
                <Form.Label>Page Path</Form.Label>
                <Form.Control type="text" name="pagePath" id="pagePath" placeholder="http://site.com" onChange={this.handleChangeInput.bind(this)} />
                <Button onClick={this.handleAddPage.bind(this)}>Add</Button>
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
                  <th>Page</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {pages && pages.map(page =>
                  <tr key={Math.random()}>
                    <td><Link to={"/page-requests/"+encodeURIComponent(page.path)}>{page.path}</Link></td>
                    <td><Button onClick={() => this.handleRemovePage(page.path)}>Remove</Button></td>
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
)(Options);
