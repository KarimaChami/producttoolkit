import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../reducer/productSlice.jsx";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const titleRef = useRef("");
  const imageRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      title: titleRef.current.value,
      image: imageRef.current.value,
      comment: descriptionRef.current.value,
      price: priceRef.current.value,
    };

    // Dispatch the addProduct action and wait for it to complete before navigating
    dispatch(addProduct(newProduct)).then(() => {
      navigate("/"); // Navigate after submission is handled
    });

    // Clear form inputs
    titleRef.current.value = "";
    imageRef.current.value = "";
    descriptionRef.current.value = "";
    priceRef.current.value = "";
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4"> New Product</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            ref={titleRef}
            className="form-control"
            id="title"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image URL:
          </label>
          <input
            type="url"
            ref={imageRef}
            className="form-control"
            id="image"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            ref={descriptionRef}
            className="form-control"
            id="description"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            ref={priceRef}
            className="form-control"
            id="price"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
