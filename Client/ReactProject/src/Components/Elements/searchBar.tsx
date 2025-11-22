import { useEffect, useState, useRef } from "react";
import './searchBar.css';
import axios, { AxiosError } from 'axios';
import type { ResultSuggestion, APIError } from "../../Types";
import ErrorCard from "./ErrorCard";

interface SearchBarProps {
    searchValue: string;
    searchAPIURL: string;
    setSearchValue: (value: string) => void;
    suggestions: ResultSuggestion[];
    setSuggestions: (value: ResultSuggestion[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchValue, setSearchValue, searchAPIURL, suggestions, setSuggestions }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AxiosError<APIError> | null>(null); //Response by the API (Error)

    const isSelecting = useRef(false);

    useEffect(() => {
        if (searchValue.length < 2) {
            setSuggestions([]);
            return;
        }

        if (isSelecting.current) {
            isSelecting.current = false;
            return;
        }

        const delay = setTimeout(() => {
            fetchSuggestions(searchValue);
        }, 300);

        return () => clearTimeout(delay);
    }, [searchValue]);

    const fetchSuggestions = async (query: string) => {
        setIsLoading(true);
        try {
            const response = await axios.get(searchAPIURL, {
                params: { q: query },
            });
            setSuggestions(response.data);
        } catch (err) {
            setError(err as AxiosError<APIError>);
        } finally {
            setSearchValue(query);
            setIsLoading(false);
        }
    };

    return (
        <>
        <div className="autocomplete">
            <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Seach movies..."
            />

            {isLoading && <div className="autocomplete-loading">Loading...</div>}

            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((movie) => (
                        <li
                            key={movie.ID}
                            onClick={() => {
                                isSelecting.current = true;
                                setSearchValue(movie.Title);
                                setSuggestions([]);
                            }}
                        >
                            {movie.Title}
                        </li>
                    ))}
                </ul>
            )}
        </div>

        <ErrorCard error={error} setError={setError} />

        </>
    );
};

export default SearchBar;