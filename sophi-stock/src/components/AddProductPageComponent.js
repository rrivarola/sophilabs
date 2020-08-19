import React, { Component } from "react";
import ProductFormComponent from "./ProductFormComponent";
import * as productsApi from "../api/ProductsApi";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class AddProductPageComponent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCancelAddProduct = this.handleCancelAddProduct.bind(this);
    this.state = {
      redirect: false,
    };
  }

  handleClick(product) {
    //console.log("Se hizo click en " + product.name);
    productsApi.saveProduct(product).then((response) => {
      //this.setState({ products: productsData });

      toast.success("Product added.");
      this.setState({ redirect: true });
    });
  }

  handleCancelAddProduct() {
    this.setState({ redirect: true });
  }

  render() {
    return (
      <>
        <div
          className="container"
          style={{ paddingTop: 100, background: "#e9ecef" }}
        >
          <h3>Add Product</h3>
          {this.state.redirect && <Redirect to="/home" />}
          <div className="row row-content">
            <div className="col-12">
              <ProductFormComponent
                onConfirmAddProduct={(product) => this.handleClick(product)} handleCancelAddProduct={()=> this.handleCancelAddProduct()} 
                    editionMode = {false} 
              ></ProductFormComponent>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddProductPageComponent;
