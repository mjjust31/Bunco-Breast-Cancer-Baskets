import { createContext, useState, useEffect } from "react";

export const BasketContext = createContext();

export const BasketContextProvider = ({ children }) => {
    const [basketData, setBasketData] = useState([]);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch("/api/baskets")
            .then(response => response.json())
            .then(data => setBasketData(Array.isArray(data) ? data : []))
            .catch(error => console.error("❌ API Fetch Error:", error));
    }, []);

    const handleLogin = (tempUsername, navigate) => {
        if (!tempUsername.trim()) return;

        setUsername(tempUsername.trim());
        localStorage.setItem("username", tempUsername.trim());

        if (tempUsername.toLowerCase() === "admin") {
            navigate("/administrator");
        } else {
            navigate("/");
        }
    };

    const handleLogout = (navigate) => {
        setUsername("");
        setFavorites([]); // ✅ Clear favorites on logout
        localStorage.removeItem("username");
        navigate("/");
    };

    return (
        <BasketContext.Provider value={{
            basketData, setBasketData,
            username, setUsername,
            favorites, setFavorites,
            handleLogin, handleLogout
        }}>
            {children}
        </BasketContext.Provider>
    );
};
