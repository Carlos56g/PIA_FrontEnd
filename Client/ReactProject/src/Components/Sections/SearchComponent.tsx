import React from "react";
import './SearchComponent.css';
import type { ResultSuggestion, APIError, MovieResponse, Movie } from "../../Types";
import { movieForMeApiURL, omdbAPIURL } from '../../APIs/config';
import ToggleSwitch from "../Elements/toggleSwitch";
import SearchBar from "../Elements/searchBar";
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
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
    const [suggestions, setSuggestions] = useState<ResultSuggestion[]>([]);
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
        var movieForMeAPIRoute = movieForMeApiURL + "recommendations/";
        try {
            movieForMeAPIRoute += searchByDescription ? "description" : "title";

            const res = await axios.post(movieForMeAPIRoute, {
                Title: title,
                Description: description
            });
            setError(null);
            const updatedResponse = await getPostersURL(res.data);
            setMovieForMeResponse(updatedResponse);
            setInputsDisabled(false);
        } catch (err) {
            setError(err as AxiosError<APIError>);
        }
        finally {
            setShowLoading(false);
            setInputsDisabled(false);
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
            return res.data.Poster || "/defaultPoster.svg";
        }
        catch {
            return "/defaultPoster.svg";
        }
    }

    return (
        <>
            <section className="searchSection">

                <h1>Ready to find your next movie?</h1>

                <ToggleSwitch
                    label="Search by description"
                    checked={searchByDescription}
                    onChange={toggleSearchByDescription}
                    disabled={inputsDisabled} />

                <form onSubmit={handleSubmit}>
                    <div className={`searchSection ${searchByDescription ? 'hideSection' : 'showSection'}`}>
                        <h2>Search similar movies by title</h2>
                        <SearchBar searchValue={title}
                            setSearchValue={setTitle}
                            searchAPIURL={`${movieForMeApiURL}search/title`}
                            setSuggestions={setSuggestions}
                            suggestions={suggestions}
                        />
                    </div>

                    <div className={`searchSection ${searchByDescription ? 'showSection' : 'hideSection'}`}>
                        <h2>Search similar movies by description</h2>
                        <textarea value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={inputsDisabled} />
                    </div>

                    <button type="submit"
                        disabled={inputsDisabled}>
                        Search
                    </button>
                </form>
            </section>

            <LoadingDots show={showLoading} />

            <ErrorCard error={error} setError={setError} />
        </>
    )
}
export default SearchComponent;