import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col,
  Table,
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';

import {addPage, loadPages} from 'actions';

class Options extends React.Component {

  constructor(props) {
    super(props);
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
            <Form id="page-form" inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="pagePath" className="mr-sm-2">Page Path</Label>
                <Input type="url" name="pagePath" id="pagePath" placeholder="http://site.com" onChange={this.handleChangeInput.bind(this)} />
              </FormGroup>
              <Button onClick={this.handleAddPage.bind(this)}>Add</Button>
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
                {pages && pages.map(page =>
                  <tr key={Math.random()}>
                    <td><Link to="/page-requests">{page.path}</Link></td>
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
  loadPages: pagePath => dispatch(loadPages())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);
