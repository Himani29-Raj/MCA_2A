import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddFood.css";

const AddFood = () => {

    const navigate = useNavigate();

    const [food, setFood] = useState({
        name: "",
        price: "",
        discount: "",
        img: ""
    });

    const [preview, setPreview] = useState("");

    const handleChange = (e) => {
        setFood({ ...food, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setFood({ ...food, img: reader.result });
            setPreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append("name", food.name);
        formData.append("price", food.price);
        formData.append("discount", food.discount);
        formData.append("image", file);

        const response = await fetch("http://localhost:8081/api/food/add", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed");
        }

        alert("Food added successfully");
        navigate("/supplier");

    } catch (error) {
        console.error(error);
        alert("Failed to add food");
    }
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