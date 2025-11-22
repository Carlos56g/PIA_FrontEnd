import type { AxiosError } from "axios";
import type { APIError } from "../../Types";
import "./ErrorCard.css";
import { useEffect } from "react";

interface ErrorCardProps {
    error: AxiosError<APIError> | null;
    setError: (value: AxiosError<APIError> | null) => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ error, setError }) => {
    useEffect(() => {
        if (!error) return;

        const hideTimer = setTimeout(() => {

            // waits to until the Animation finish
            const clearTimer = setTimeout(() => setError(null), 500);

            return () => clearTimeout(clearTimer);
        }, 2500);

        return () => clearTimeout(hideTimer);
    }, [error, setError]);

    if (!error) return null;

    return (
        <div className="errorCard">
            <p>{error.code}</p>
            <p>{error.response?.data?.detail || "An unknown error occurred"}</p>
        </div>
    );
};

export default ErrorCard;