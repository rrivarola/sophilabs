import React from "react";
import { Table } from "reactstrap";
import { Button } from "reactstrap";

function Product({ product }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.quantity}</td>
      <td>
        <Button onClick={handleEditClick} variant="primary">
          <i className="fa fa-pencil fa-fw"></i> 
        </Button>
        {""}
      </td>
    </tr>
  );
}

function handleEditClick(e) {
  e.preventDefault();
  console.log("The link was clicked.");
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
            <th></th>
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </Table>
    );
  } else return <div>loading</div>;
}

export default ProductList;
