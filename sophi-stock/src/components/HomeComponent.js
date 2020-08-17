import React, { Component } from "react";
import ProductList from "./products";
import * as productsApi from "../api/ProductsApi";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    // let productsData = [
    //   { name: "Producto1", category: "Categoria 1", quantity: 1 },
    //   { name: "Producto2", category: "Categoria 1", quantity: 2 },
    //   { name: "Producto2", category: "Categoria 1", quantity: 3 },
    // ];

    productsApi.products().then(response=> {
        let productsData=response;
        this.setState({ products: productsData });
    });

    
  }

  render() {
    return (
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
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Product
            </button>
          </div>

          <ProductList products={this.state.products}></ProductList>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
