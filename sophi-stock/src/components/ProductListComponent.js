import React, { useState } from "react";
import { Table } from "reactstrap";
import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, Form } from "reactstrap";
import ProductFormComponent from "./ProductFormComponent";
import * as productsApi from "../api/ProductsApi";
import { toast } from "react-toastify";

function ProductList(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [productSelected, setProductSelected] = useState();

  function Product({ product }) {
    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>{product.quantity}</td>
        <td>
          <Button onClick={handleEditClick(product)} variant="primary">
            <i className="fa fa-pencil fa-fw"></i>
          </Button>
          {""}
        </td>
      </tr>
    );
  }

  const handleUpdateProductClick = (product) => {
    productsApi.saveProduct(product).then((response) => {
      toast.success("Product edited.");
      toggleModal();
    });
  };

  const handleEditClick = (product) => (e) => {
    e.preventDefault();
    setProductSelected(product);
    toggleModal();
  };
  function toggleModal() {
    setModalOpen(!isModalOpen);
  }

  const  handleCancelEditProduct = () => {
    toggleModal();
  }

  let products;
  if (props.products) {
    products = props.products.map((product, i) => {
      return <Product product={product} key={i}></Product>;
    });
    return (
      <>
        <div>
          <Modal isOpen={isModalOpen} toggle={toggleModal} size="lg">
            <ModalHeader toggle={toggleModal}>Product Edition</ModalHeader>
            <ModalBody>
              <ProductFormComponent
                product={productSelected}
                onConfirmUpdateProduct={(product) =>
                  handleUpdateProductClick(product)
                }
                handleCancelEditProduct={handleCancelEditProduct}
                editionMode = {true} 
              ></ProductFormComponent>
              {/* <Form onSubmit={toggleModal}>
                <Button type="submit" value="submit" color="primary">
                  Login
                </Button>
              </Form> */}
            </ModalBody>
          </Modal>
        </div>
        <div className="w-100 p-3">
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
        </div>
      </>
    );
  } else return <div>loading</div>;
}

export default ProductList;
