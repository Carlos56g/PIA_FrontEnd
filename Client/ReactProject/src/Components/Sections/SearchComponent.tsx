import './SearchComponent.css';
import React, { useState, useEffect } from "react";
import type { ResultSuggestion, APIError, MovieResponse, Movie } from "../../Resources/Types";
import { movieForMeApiURL, omdbAPIURL, defaultPosterRoute } from '../../Resources/config';
import axios, { AxiosError } from 'axios';
import ToggleSwitch from '../Elements/toggleSwitch';
import SearchBar from '../Elements/searchBar';
import ErrorCard from "../Elements/ErrorCard";
import LoadingDots from "../Elements/LoadingDots";
interface SearchSectionProps {
    setMovieForMeResponse: (value: MovieResponse) => void;
}

const SearchComponent: React.FC<SearchSectionProps> = ({
    setMovieForMeResponse,
}) => {
    const [error, setError] = useState<AxiosError<APIError> | null>(null);
    const [title, setTitle] = useState(""); //Title User Input
    const [description, setDescription] = useState(""); //Description User Input
    const [searchByDescription, setSearchByDescription] = useState(false); //Boolean if is search by description
    const [suggestions, setSuggestions] = useState<ResultSuggestion[]>([]); //AutoComplete
    const [inputsDisabled, setInputsDisabled] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearchMovies();
    };

    const toggleSearchByDescription = () => {
        setSearchByDescription(prev => {
            const newValue = !prev;
            return newValue;
        });
    }

    const handleSearchMovies = async () => {
        setShowLoading(true);
        setInputsDisabled(true);
        setError(null);
        var movieForMeAPIRoute = movieForMeApiURL + "recommendations/";
        movieForMeAPIRoute += searchByDescription ? "description" : "title";
        try {
            const res = await axios.post(movieForMeAPIRoute, {
                Title: title,
                Description: description
            });
            const updatedResponse = await getPostersURL(res.data);
            setMovieForMeResponse(updatedResponse);
        } catch (err) {
            setError(err as AxiosError<APIError>);
        }
        finally {
            setInputsDisabled(false);
            setShowLoading(false);
            setSuggestions([]);
        }
    };

    const getPostersURL = async (responseData: MovieResponse) => {
        const updatedResponse = { ...responseData };

        if (!searchByDescription && updatedResponse != null) {
            updatedResponse.SourceMovie.PosterURL = await getPoster(updatedResponse.SourceMovie.Title);
        }

        if (updatedResponse?.MovieRecommendations) {
            updatedResponse.MovieRecommendations = await Promise.all(
                updatedResponse.MovieRecommendations.map(async (movie: Movie) => ({
                    ...movie, PosterURL: await getPoster(movie.Title),
                }))
            );
        }
        return updatedResponse;
    }

    const getPoster = async (title: string) => {
        try {
            const res = await axios.get(`${omdbAPIURL}t=${title}`);
            return res.data.Poster || defaultPosterRoute;
        }
        catch {
            return defaultPosterRoute;
        }
    }

    useEffect(() => {
        if (error) {
            setInputsDisabled(true);

            const releaseTimer = setTimeout(() => {
                setInputsDisabled(false);
            }, 3000);

            return () => clearTimeout(releaseTimer);
        }
    }, [error]);

    return (
        <>
            <section className="searchSection">

                <h2>¿List@ para encontrar tu próxima película?</h2>

                <ToggleSwitch
                    label="Buscar por descripción"
                    checked={searchByDescription}
                    onChange={toggleSearchByDescription}
                    disabled={inputsDisabled} />

                <form onSubmit={handleSubmit}>
                    <div className={`searchSection ${searchByDescription ? 'hideSection' : 'showSection'}`}>
                        <h3>Buscar películas similares por título</h3>
                        <SearchBar searchValue={title}
                            setSearchValue={setTitle}
                            searchAPIURL={`${movieForMeApiURL}search/title`}
                            setSuggestions={setSuggestions}
                            suggestions={suggestions}
                        />
                    </div>

                    <div className={`searchSection ${searchByDescription ? 'showSection' : 'hideSection'}`}>
                        <h3>Buscar películas similares por descripción</h3>
                        <textarea value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={inputsDisabled} />
                    </div>

                    <button type="submit"
                        disabled={inputsDisabled}>
                        Buscar
                    </button>
                </form>
            </section>

            <LoadingDots show={showLoading} />

            <ErrorCard error={error} setError={setError} />
        </>
    )
}
export default SearchComponent;