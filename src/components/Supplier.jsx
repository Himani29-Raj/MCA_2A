import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Supplier.css";
import { Home, Plus, Search, LogOut, Star } from "lucide-react";

const Supplier = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [supplierName, setSupplierName] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("All");

    useEffect(() => {

    const fetchFoods = async () => {

        const res = await fetch("http://localhost:8081/api/food/my-foods", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });

        const data = await res.json();
        setMenuItems(data);
    };

    fetchFoods();

}, []);
    useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        setSupplierName(user.name);
    }
}, []);

    // ✅ RECEIVE NEW FOOD FROM ADD PAGE
    useEffect(() => {
        if (location.state?.newItem) {
            setMenuItems(prev => [...prev, location.state.newItem]);
        }
    }, [location.state]);

    const filteredItems = menuItems.filter((item) => {
        return searchTerm === "All" || item.category === searchTerm;
    });

    const toggleFeatured = async (id) => {

    await fetch(`http://localhost:8081/api/food/feature/${id}`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

    setMenuItems(menuItems.map(item =>
        item.id === id ? { ...item, featured: !item.featured } : item
    ));
};

    const toggleStock = async (id) => {

    await fetch(`http://localhost:8081/api/food/stock/${id}`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

   setMenuItems(menuItems.map(item =>
    item.id === id ? { ...item, inStock: !item.inStock } : item
));
};
    const deleteItem = async (id) => {

    await fetch(`http://localhost:8081/api/food/delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

    setMenuItems(menuItems.filter(item => item.id !== id));
};


    const totalRevenue = menuItems.reduce((acc, item) => {
        const final = item.price - (item.price * item.discount) / 100;
        return acc + final;
    }, 0);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };


    return (

        <div className="dashboard-layout">

            {/* SIDEBAR */}
            <div className="dashboard-sidebar">

                <div className="sidebar-icon">
                    <Home size={20} />
                </div>

                {/* ADD FOOD PAGE */}
                <div className="sidebar-icon">
                    <Plus size={22} onClick={() => navigate("/add-food")} />
                </div>

                <div className="sidebar-icon">
                    <Search size={22} />
                </div>

                <button className="logout-icon" onClick={handleLogout}>
                    <LogOut />
                </button>

            </div>


            {/* MAIN */}
            <div className="dashboard-main">

                <div className="dashboard-header">

                    <div>
                        <h1>👋 Welcome Chef, {supplierName || "Chef"}!</h1>
                        <p>Manage your menu and track your meals</p>
                    </div>

                    <div className="search-box">
                        <Search size={16} />
                        <input placeholder="Search menu..." />
                    </div>

                </div>


                {/* STATS */}
                <div className="stats-grid">

                    <div className="stat-card">
                        <h4>Total Items</h4>
                        <h2>{menuItems.length}</h2>
                        <span>Items available</span>
                    </div>

                    <div className="stat-card">
                        <h4>Total Revenue</h4>
                        <h2>₹{Math.round(totalRevenue)}</h2>
                        <span>Estimated earnings</span>
                    </div>

                    <div className="stat-card">
                        <h4>Featured Meals</h4>
                        <h2>{menuItems.filter(i => i.featured).length}</h2>
                        <span>Highlighted dishes</span>
                    </div>

                </div>


                {/* CATEGORY FILTER */}
                <div className="category-tabs">

                    {["All", "Burgers", "Pizza", "Pasta"].map(cat => (
                        <span
                            key={cat}
                            className={searchTerm === cat ? "active" : ""}
                            onClick={() => setSearchTerm(cat)}
                        >
                            {cat}
                        </span>
                    ))}

                </div>


                {/* MENU GRID */}
                <div className="menu-grid">

                    {filteredItems.map(item => {

                        const finalPrice = item.price - (item.price * item.discount) / 100;

                        return (

                            <div className="menu-card" key={item.id}>

                                <img src={item.imageUrl} alt={item.name} />

                                {item.discount > 0 && (
                                    <div className="discount-badge">
                                        {item.discount}% OFF
                                    </div>
                                )}

                                {item.featured && (
                                    <div className="featured-badge">
                                        <Star size={14} /> Featured
                                    </div>
                                )}

                                <div className="menu-body">

                                    <h3>{item.name}</h3>

                                    <div className="status">
                                        {item.inStock ?
                                            <span className="in-stock">In Stock</span>
                                            :
                                            <span className="out-stock">Out of Stock</span>
                                        }
                                    </div>

                                    <div className="menu-footer">

                                        <div>
                                            <span className="price">₹{Math.round(finalPrice)}</span>

                                            {item.discount > 0 && (
                                                <span className="old-price">₹{item.price}</span>
                                            )}
                                        </div>

                                        <div className="card-actions">

                                            <label className="stock-switch">
                                                <input
                                                    type="checkbox"
                                                    checked={item.inStock}
                                                    onChange={() => toggleStock(item.id)}
                                                />
                                                <span className="stock-slider"></span>
                                            </label>

                                            <button
                                                className="btn-primary"
                                                onClick={() => toggleFeatured(item.id)}
                                            >
                                                Feature
                                            </button>

                                            <button
                                                className="btn-primary small"
                                                onClick={() => deleteItem(item.id)}
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>


            {/* RIGHT PANEL */}
            <div className="dashboard-right">

                <h2>⭐ Featured Items</h2>

                {menuItems
                    .filter(item => item.featured)
                    .map(item => (
                        <div key={item.id} className="meal-box">
                            {item.name}
                        </div>
                    ))}

            </div>

        </div>

    );

};

export default Supplier;