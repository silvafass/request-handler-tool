import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import {addPage, loadPages, removePage} from 'actions';

class Options extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.props.loadPages();
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
    this.props.addPage(this.state.pagePath);
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
    } = this;
    const {
      removePage
    } = this.props;
    const pages = this.getPages();

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
                <Form.Control type="url" name="pagePath" id="pagePath" placeholder="http://site.com" onChange={this.handleChangeInput.bind(this)} />
                <Button onClick={this.handleAddPage.bind(this)}>Add</Button>
              </Form.Group>

            </Form>
            <br/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Page</th>
                </tr>
              </thead>
              <tbody>
                {pages && pages.map(page =>
                  <tr key={Math.random()}>
                    <td><Link to="/page-requests">{page.path}</Link></td>
                    <td><Button onClick={() => removePage(page.path)}>Remove</Button></td>
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
  addPage: pagePath => dispatch(addPage(pagePath)),
  loadPages: pagePath => dispatch(loadPages()),
  removePage: pagePath => dispatch(removePage(pagePath))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);
