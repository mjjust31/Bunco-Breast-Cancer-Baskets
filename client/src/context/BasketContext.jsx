import { createContext, useState, useEffect } from "react";

export const BasketContext = createContext(); // ✅ Named Export

export const BasketContextProvider = ({ children }) => {
    const [basketData, setBasketData] = useState([]);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch("/api/baskets")
            .then((response) => response.json())
            .then((data) => {
                setBasketData(Array.isArray(data) ? data : []);
            })
            .catch((error) => console.error("❌ API Fetch Error:", error));
    }, []);

    const handleLogin = (tempUsername, navigate) => {  // ✅ Pass `navigate` from the component
        if (!tempUsername.trim()) return;

        setUsername(tempUsername.trim());
        localStorage.setItem("username", tempUsername.trim());

        if (tempUsername.toLowerCase() === "admin") {
            navigate("/administrator/basketform"); // ✅ Redirect Admin
        } else {
            navigate("/"); // ✅ Redirect Normal User
        }
    };

    const handleLogout = (navigate) => {  // ✅ Pass `navigate` from the component
        setUsername("");
        localStorage.removeItem("username");
        navigate("/");
    };

    return (
        <BasketContext.Provider value={{
            basketData, setBasketData,
            username, handleLogin, handleLogout,
            favorites
        }}>
            {children}
        </BasketContext.Provider>
    );
};
