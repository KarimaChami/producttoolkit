import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  updateProduct, // Import the updateProduct action
} from "../reducer/productSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap"; // Import Bootstrap components

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [show, setShow] = useState(false); // Modal state
  const [selectedProduct, setSelectedProduct] = useState(null); // Currently selected product for update
  const [updatedData, setUpdatedData] = useState({
    title: "",
    image: "",
    price: "",
  }); // Form data

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Open modal with selected product data
  const handleShow = (product) => {
    setSelectedProduct(product);
    setUpdatedData({
      title: product.title,
      image: product.image,
      price: product.price,
    });
    setShow(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for updating the product
  const handleUpdate = () => {
    const updatedProduct = { ...selectedProduct, ...updatedData }; // Merge old and new data
    dispatch(updateProduct(updatedProduct)) // Dispatch the update action with new product data
      .then(() => {
        setShow(false); // Close the modal after success
      })
      .catch((err) => {
        console.error("Failed to update product:", err); // Error handling
      });
  };

  if (status === "loading")
    return <div className="text-center mt-8">Loading...</div>;
  if (status === "failed")
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Product List</h2>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>
                <img src={product.image} alt={product.title} width="50" />
              </td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleShow(product)} // Show modal with product data
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(deleteProduct(product.id))}
                >
                  Delete
                </button>
              </td>
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating product */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={updatedData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={updatedData.image}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={updatedData.price}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
