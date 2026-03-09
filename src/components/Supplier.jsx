import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Supplier.css";
import { Home, Plus, Search, LogOut, Star } from "lucide-react";

const Supplier = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [supplierName, setSupplierName] = useState("");

    const [searchTerm, setSearchTerm] = useState("All");

    const [menuItems, setMenuItems] = useState([
        {
            id: 1,
            name: "Veg Burger",
            category: "Burgers",
            price: 129,
            discount: 20,
            stock: true,
            featured: false,
            img: "https://images.unsplash.com/photo-1550547660-d9450f859349"
        },
        {
            id: 2,
            name: "Cheese Burger",
            category: "Burgers",
            price: 159,
            discount: 15,
            stock: true,
            featured: true,
            img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
        },
        {
            id: 3,
            name: "Margherita Pizza",
            category: "Pizza",
            price: 249,
            discount: 10,
            stock: true,
            featured: false,
            img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca"
        },
        {
            id: 4,
            name: "Farmhouse Pizza",
            category: "Pizza",
            price: 299,
            discount: 18,
            stock: true,
            featured: true,
            img: "https://images.unsplash.com/photo-1594007654729-407eedc4fe1c"
        },
        {
            id: 5,
            name: "White Sauce Pasta",
            category: "Pasta",
            price: 179,
            discount: 0,
            stock: false,
            featured: true,
            img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9"
        },
        {
            id: 6,
            name: "Red Sauce Pasta",
            category: "Pasta",
            price: 189,
            discount: 12,
            stock: true,
            featured: false,
            img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9"
        },
        {
            id: 7,
            name: "French Fries",
            category: "Burgers",
            price: 99,
            discount: 5,
            stock: true,
            featured: false,
            img: "https://images.unsplash.com/photo-1576107232684-1279f390859f"
        },
        {
            id: 8,
            name: "Cold Coffee",
            category: "Burgers",
            price: 120,
            discount: 8,
            stock: true,
            featured: false,
            img: "https://images.unsplash.com/photo-1498804103079-a6351b050096"
        }
    ]);

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

    const toggleFeatured = (id) => {
        setMenuItems(menuItems.map(item =>
            item.id === id ? { ...item, featured: !item.featured } : item
        ));
    };

    const toggleStock = (id) => {
        setMenuItems(menuItems.map(item =>
            item.id === id ? { ...item, stock: !item.stock } : item
        ));
    };
    const deleteItem = (id) => {
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

                                <img src={item.img} alt={item.name} />

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
                                        {item.stock ?
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
                                                    checked={item.stock}
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