import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddFood.css";

const AddFood = () => {

    const navigate = useNavigate();

    const [food, setFood] = useState({
        name: "",
        category: "Burgers",
        price: "",
        discount: "",
        stock: true,
        img: ""
    });

    const [preview, setPreview] = useState("");

    const handleChange = (e) => {
        setFood({ ...food, [e.target.name]: e.target.value });
    };

    // ✅ Handle image upload from computer
    const handleImageUpload = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setFood({ ...food, img: reader.result }); // store base64
            setPreview(reader.result); // preview
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            id: Date.now(),
            name: food.name,
            category: food.category,
            price: Number(food.price),
            discount: Number(food.discount),
            stock: true,
            featured: false,
            img: food.img || "https://images.unsplash.com/photo-1550547660-d9450f859349"
        };

        navigate("/supplier", { state: { newItem } });
    };

    return (

        <div className="addfood-layout">

            <div className="addfood-card">

                <h2>Add New Food Item 🍔</h2>

                <form onSubmit={handleSubmit}>

                    <label>Food Name</label>
                    <input
                        name="name"
                        value={food.name}
                        onChange={handleChange}
                        placeholder="Enter food name"
                    />

                    <label>Category</label>
                    <select
                        name="category"
                        value={food.category}
                        onChange={handleChange}
                    >
                        <option>Burgers</option>
                        <option>Pizza</option>
                        <option>Pasta</option>
                    </select>

                    <label>Price</label>
                    <input
                        name="price"
                        type="number"
                        value={food.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                    />

                    <label>Discount (%)</label>
                    <input
                        name="discount"
                        type="number"
                        value={food.discount}
                        onChange={handleChange}
                        placeholder="Enter discount"
                    />

                    

                    {/* Upload from computer */}
                   <label>Upload Image</label>

<div className="upload-box">

    {preview ? (
        <img src={preview} alt="preview" />
    ) : (
        <p>Click to upload food image</p>
    )}

    <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
    />

</div>

                    

                    <button type="submit" className="add-btn">
                        Add Item
                    </button>

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/supplier")}
                    >
                        Cancel
                    </button>

                </form>

            </div>

        </div>

    );

};

export default AddFood;