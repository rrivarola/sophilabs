import React from "react";
import { Table, Media } from "reactstrap";

function Product({ product }) {
  return (
    // <Media key={product.name} tag="li">
    //   <Media left middle>
    //     <Media object src="" alt={product.name} />
    //   </Media>
    //   <Media body className="ml-5">
    //     <Media key={product.name} heading>
    //       {product.name}
    //     </Media>
    //     <p>{product.category}</p>
    //     <p>{product.quantity}</p>
    //   </Media>
    // </Media>
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
      return (
          <Product product={product}></Product>
      );
    });
    //return <Media list>{products}</Media>;
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
