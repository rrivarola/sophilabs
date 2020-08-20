import React, { Component } from "react";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Button, Label, Row } from "reactstrap";
import PropTypes from "prop-types";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class ProductFormComponent extends Component {
  constructor(props) {
    super(props);
    if(props.editionMode){
      this.state = {
        editionMode:props.editionMode,
        product: props.product,
        category: props.product.category,
        price: props.product.price,
        quantity: props.product.quantity,
        _id: props.product._id,
        name: props.product.name,
      };
    }
    else{
    this.state = {
      editionMode:props.editionMode,
      product: props.editionMode? props.product:null,
      category: "",
      price: 0,
      quantity: 0,
      _id: "",
      name: "",
    };
  }
    this.changeQuantity = this.changeQuantity.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  changeName = (event) => {
    this.setState({ name: event.target.value });
  };

  changeQuantity = (event) => {
    this.setState({ quantity: event.target.value });
  };
  changePrice = (event) => {
    this.setState({ price: event.target.value });
  };
  changeCategory = (event) => {
    this.setState({ category: event.target.value });
  };

  cancelAction = (values) => {
    if (this.props.editionMode) this.props.handleCancelEditProduct();
    else this.props.handleCancelAddProduct();
  };

  handleSubmit = (values) => {
    // event.preventDefault();
    let product;
    if (this.props.editionMode) {
      product = this.state.product;
      product.category = this.state.category;
      product.quantity = this.state.quantity;
      product.price = this.state.price;
    } else {
      product = {
        name: values.name,
        category: this.state.category,
        quantity: this.state.quantity,
        price: this.state.price,
      };
    }

    if (this.props.editionMode) this.props.onConfirmUpdateProduct(product);
    else this.props.onConfirmAddProduct(product);
    //this.setState({product:null})
  };
  render() {
    return (
      <>
        
        <div className="col-6 col-md-">
          <LocalForm
            className="form-horizontal"
            onSubmit={(values) => this.handleSubmit(values)}
          >
            <Row className="form-group">
              <Label
                className="control-label col-sm-3 text-left"
                htmlFor="name"
              >
                Name
              </Label>
              <div className="col-sm-5">
                <Control.text
                  model=".name"
                  value={this.state.name}
                  onChange={this.changeName}
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
              </div>
            </Row>
            <Row className="form-group">
              <Label
                className="control-label col-sm-3 text-left"
                htmlFor="category"
              >
                Category
              </Label>
              <div className="col-sm-5">
                <Control.select
                  model=".category"
                  id="category"
                  className="form-control"
                  onChange={this.changeCategory}
                  value={this.state.category}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>
            </Row>

            <Row className="form-group">
              <Label
                className="control-label col-sm-3 text-left"
                htmlFor="Quantity"
              >
                Quantity
              </Label>
              <div className="col-sm-5">
                <Control.text
                  model=".quantity"
                  id="quantity"
                  rows="1"
                  className="form-control"
                  value={this.state.quantity}
                  onChange={this.changeQuantity}
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
                    isNumber: "Must be a number",
                  }}
                />
              </div>
            </Row>
            <Row className="form-group">
              <Label
                className="control-label col-sm-3 text-left"
                htmlFor="Price"
              >
                Price
              </Label>
              <div className="col-sm-5">
                <Control.text
                  model=".price"
                  id="price"
                  rows="1"
                  className="form-control"
                  value={this.state.price}
                  onChange={this.changePrice}
                  validators={{
                    required,
                    isNumber,
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
                    isNumber: "Must be a number",
                  }}
                />
              </div>
            </Row>
            <Row className="form-group">
              <div className="col-sm-7 ">
                <Button
                  type="button"
                  className="bg-primary float-right"
                  onClick={this.cancelAction}
                >
                  Cancel
                </Button>
              </div>
              <div className="col-sm-3">
                <Button type="submit" className="bg-primary float-left">
                  Save
                </Button>
              </div>
            </Row>
          </LocalForm>
        </div>
      </>
    );
  }
}

export default ProductFormComponent;
