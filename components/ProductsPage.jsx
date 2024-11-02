import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../reducer/productSlice.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange=(e)=>{
    e.target.value()

  }

  //   const handleAddProduct = (e) => {
  //     e.preventDefault();
  //     // Handle product addition logic here
  //   };

  if (status === "loading")
    return <div className="text-center mt-8">Loading...</div>;
  if (status === "failed")
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <button className="btn btn-danger w-100" onClick={() => navigate("/add")}>
        Add new product
      </button>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="container-fluid gap-2">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                style={{ height: "200px", objectFit: "contain" } onChange={handleChange}}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <h5 className="card-title">{product.price}</h5>
                <p className="card-text">{product.comment.slice(0, 100)}...</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary w-100" onClick={}>
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
