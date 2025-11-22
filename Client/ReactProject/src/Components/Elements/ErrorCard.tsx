import type { AxiosError } from "axios";
import type { APIError } from "../../Types";
import "./ErrorCard.css";
import { useState,useEffect } from "react";

interface ErrorCardProps {
    error: AxiosError<APIError> | null;
    setError: (value: AxiosError<APIError> | null) => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ error, setError }) => {
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (!error) return;

        setShowError(true);

        const hideTimer = setTimeout(() => {
            setShowError(false);

            // esperar a que termine la animación
            const clearTimer = setTimeout(() => setError(null), 500);

            return () => clearTimeout(clearTimer);
        }, 2500);

        return () => clearTimeout(hideTimer);
    }, [error, setError]);

    if (!error) return null;

    return (
        <div className={`errorCard ${showError ? "show" : ""}`}>
            <p>{error.code}</p>
            <p>{error.response?.data?.detail || "An unknown error occurred"}</p>
        </div>
    );
};

export default ErrorCard;