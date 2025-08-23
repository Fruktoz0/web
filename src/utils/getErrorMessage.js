export const getErrorMessage = (error) => {
    return (
        error?.data?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Ismeretlen hiba történt"
    );
};