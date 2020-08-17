import React, { Component } from "react";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Button, Label, Col, Row } from "reactstrap";
import * as productsApi from "../api/ProductsApi";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class ProductFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleSubmit(values) {
    //console.log("Current State is: " + JSON.stringify(values));
    let product = {
      name: values.name,
      image: "",
      category: values.category,
      quantity: values.quantity,
      price: values.price,
    };
    productsApi.addProduct(product).then((response) => {
      //this.setState({ products: productsData });
      this.setState({ redirect: true });
      toast.success("Course saved.");
    });
    //this.props.resetFeedbackForm();
  }
  render() {
    return (
      <>
        {this.state.redirect && <Redirect to="/home" />}
        <div
          className="col-6"
          style={{ paddingTop: 130, background: "#e9ecef" }}
        ></div>
        <div className="col-6 col-md-">
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
              <Col>
                <Label htmlFor="rating">Category</Label>
                <Control.select
                  model=".category"
                  id="category"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="name">Name</Label>
                <Control.text
                  model=".name"
                  id="name"
                  rows="1"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(5),
                    maxLength: maxLength(25),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 5 characters",
                    maxLength: "Must be 25 characters or less",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="Quantity">Quantity</Label>
                <Control.text
                  model=".quantity"
                  id="quantity"
                  rows="1"
                  className="form-control"
                  validators={{
                    required,
                    isNumber,
                    minLength: minLength(1),
                    maxLength: maxLength(1000),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".quantity"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                    isNumber: 'Must be a number'
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="Price">Price</Label>
                <Control.text
                  model=".price"
                  id="price"
                  rows="1"
                  className="form-control"
                  validators={{
                    required,
                    isNumber
                  }}
                />
                 <Errors
                  className="text-danger"
                  model=".price"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                    isNumber: 'Must be a number'
                  }}
                />
              </Col>
            </Row>
            <Button type="submit" className="bg-primary">
              Add product
            </Button>
          </LocalForm>
        </div>
      </>
    );
  }
}

export default ProductFormComponent;
