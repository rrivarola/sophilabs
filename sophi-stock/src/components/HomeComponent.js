import React, { Component } from "react";
import ProductList from "./ProductListComponent";
import * as productsApi from "../api/ProductsApi";
import { Redirect } from "react-router-dom";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      redirect: false,
    };
  }

  componentDidMount() {
    productsApi.products().then((response) => {
      let productsData = response;
      this.setState({ products: productsData });
    });
  }

  render() {
    return (
      <>
        {this.state.redirect && <Redirect to="/product" />}
        <div
          className="container"
          style={{ paddingTop: 100, background: "#e9ecef" }}
        >
          <div className="row row-content">
            <div className="col-12">
              <h2>Products</h2>
            </div>
            <div>
              <button
                style={{ marginBottom: 20 }}
                className="btn btn-primary add-course"
                onClick={() => this.setState({ redirect: true })}
              >
                Add Product
              </button>
            </div>

            <ProductList products={this.state.products}></ProductList>
          </div>
        </div>
      </>
    );
  }
}

export default HomeComponent;
