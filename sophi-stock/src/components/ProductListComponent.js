import React from "react";
import { Table } from "reactstrap";

function Product({ product }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.quantity}</td>
    </tr>
  );
}

function ProductList(props) {
  let products;
  if (props.products) {
    products = props.products.map((product, i) => {
      return <Product product={product} key={i}></Product>;
    });
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </Table>
    );
  } else return <div>loading</div>;
}

export default ProductList;
