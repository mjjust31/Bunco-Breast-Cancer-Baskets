import { createContext, useState, useEffect } from "react";

export const BasketContext = createContext();

export const BasketContextProvider = ({ children }) => {
    const [basketData, setBasketData] = useState([]);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [favorites, setFavorites] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);  // New state for confirmation modal

    // ✅ Fetch all baskets
    useEffect(() => {
        fetch("/api/baskets")
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch baskets");
                return response.json();
            })
            .then((data) => setBasketData(Array.isArray(data) ? data : []))
            .catch((error) => console.error("❌ API Fetch Error:", error));
    }, []);

    // ✅ Fetch user favorites from MongoDB when user logs in
    useEffect(() => {
        if (username) {
            fetch(`/api/favorites/${username}`)
                .then((response) => {
                    if (!response.ok) throw new Error("Failed to fetch favorites");
                    return response.json();
                })
                .then((data) => {
                    setFavorites(Array.isArray(data) ? data : []);
                })
                .catch((error) => console.error("❌ Failed to fetch favorites:", error));
        }
    }, [username]);

    // ✅ Add a basket to favorites
    const addFavorite = async (basketId) => {
        try {
            const response = await fetch(`/api/favorites/${username}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ basketId }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("❌ Failed to add favorite:", error);
                return;
            }

            // ✅ Find the basket and add it to favorites
            const basket = basketData.find(basket => basket._id === basketId);
            if (basket) {
                setFavorites(prevFavorites => [...prevFavorites, basket]);
            }
        } catch (error) {
            console.error("❌ Error adding favorite:", error);
        }
    };

    // ✅ Remove a basket from favorites
    const removeFavorite = async (basketId) => {
        try {
            const response = await fetch(`/api/favorites/${username}/${basketId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                console.error("❌ Failed to remove favorite");
                return;
            }

            setFavorites(prevFavorites => prevFavorites.filter(fav => fav._id !== basketId));
        } catch (error) {
            console.error("❌ Error removing favorite:", error);
        }
    };

    // ✅ Handle login
    const handleLogin = (tempUsername, navigate) => {
        if (!tempUsername.trim()) return;
        setUsername(tempUsername.trim());
        localStorage.setItem("username", tempUsername.trim());
        navigate(tempUsername.toLowerCase() === "admin" ? "/administrator" : "/");
    };

    // ✅ Handle logout
    const handleLogout = (navigate) => {
        if (typeof navigate === "function") {
            setUsername("");
            setFavorites([]); // Clear favorites on logout
            localStorage.removeItem("username");
            navigate("/"); // Redirect to home page
        } else {
            console.error("❌ Error: navigate is not a function");
        }
    };

    // ✅ Show confirmation modal after adding a basket
    const showAddBasketConfirmation = () => {
        setShowConfirmationModal(true);
    };

    // ✅ Close confirmation modal
    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);
    };

    return (
        <BasketContext.Provider value={{
            basketData, setBasketData,
            username, handleLogin, handleLogout,
            favorites, setFavorites,
            addFavorite, removeFavorite,
            showConfirmationModal, showAddBasketConfirmation, closeConfirmationModal // New modal logic
        }}>
            {children}
        </BasketContext.Provider>
    );
};
