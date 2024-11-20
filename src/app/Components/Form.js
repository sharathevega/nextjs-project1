"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductsTable = () => {
  const [productsinfo, setProductsInfo] = useState([]); // List of products
  const [formMode, setFormMode] = useState("add"); // Determines if the form is in 'add' or 'edit' mode
  const [formValues, setFormValues] = useState({
    product_name: "",
    price: "",
    category: "",
    quantity: "",
  });
  const [editProductId, setEditProductId] = useState(null); // ID of the product being edited

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProductsInfo(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Add a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", formValues, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Product added successfully!");
      closeModal();
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  // Edit an existing product
  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${editProductId}`, formValues, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Product updated successfully!");
      closeModal();
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("Product deleted successfully!");
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  // Open modal for Add
  const handleAddClick = () => {
    setFormMode("add");
    setFormValues({ product_name: "", price: "", category: "", quantity: "" });
    openModal();
  };

  // Open modal for Edit
  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setFormMode("edit");
    setFormValues({
      product_name: product.product_name,
      price: product.price,
      category: product.category,
      quantity: product.quantity,
    });
    openModal();
  };

  // Open modal
  const openModal = () => {
    const modalElement = document.getElementById("productModal");
    const modalBackdrop = document.createElement("div");
    modalBackdrop.className = "modal-backdrop fade show";
    modalBackdrop.id = "modal-backdrop";
    document.body.appendChild(modalBackdrop); // Add backdrop
    modalElement.classList.add("show");
    modalElement.style.display = "block";
  };

  // Close modal
  const closeModal = () => {
    const modalElement = document.getElementById("productModal");
    const modalBackdrop = document.getElementById("modal-backdrop");
    if (modalBackdrop) modalBackdrop.remove(); // Remove backdrop
    modalElement.classList.remove("show");
    modalElement.style.display = "none";
    setFormMode("add");
    setEditProductId(null);
  };

  return (
    <div>
      {/* Table Header with Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Products Table</h3>
        <button className="btn btn-primary" onClick={handleAddClick}>
          Add New Product
        </button>
      </div>

      {/* Products Table */}
      <div className="mt-5">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Category</th>
              <th>Product Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsinfo.map((product) => (
              <tr key={product.id}>
                <td>{product.product_name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    className="btn btn-info me-2"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Form */}
      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="productModalLabel">
                {formMode === "add" ? "Add New Product" : "Edit Product"}
              </h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <form onSubmit={formMode === "add" ? handleAddProduct : handleEditProduct}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="product_name" className="form-label">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product_name"
                    name="product_name"
                    value={formValues.product_name}
                    onChange={(e) =>
                      setFormValues({ ...formValues, product_name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formValues.price}
                    onChange={(e) =>
                      setFormValues({ ...formValues, price: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={formValues.category}
                    onChange={(e) =>
                      setFormValues({ ...formValues, category: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    name="quantity"
                    value={formValues.quantity}
                    onChange={(e) =>
                      setFormValues({ ...formValues, quantity: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  {formMode === "add" ? "Add Product" : "Update Product"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
