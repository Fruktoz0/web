import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded; // innentől kiszedhető a bejelentkezett user id, role email stb.
    } catch (err) {
        console.error("Token dekódolási hiba:", err);
        return null;
    }
};
