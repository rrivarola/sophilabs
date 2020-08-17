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
    products = props.products.map((product) => {
      return <Product product={product}></Product>;
    });
    return (
      <Table striped>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </Table>
    );
  } else return <div>loading</div>;
}

export default ProductList;
