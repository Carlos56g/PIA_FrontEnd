import React from "react";
import './SearchComponent.css';
import type { ResultSuggestion } from "../../Types";

interface SearchSectionProps {
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    searchByDescription: boolean;
    toggleSearchByDescription: boolean;
    handleSearchMovies: () => void;
    inputsDisabled: boolean;
    suggestions: ResultSuggestion[];
    setSuggestions: (value: ResultSuggestion[]) => void;
}

const SearchComponent: React.FC<SearchSectionProps> = ({
    title,
    setTitle,
    description,
    setDescription,
    searchByDescription,
    toggleSearchByDescription,
    handleSearchMovies,
    inputsDisabled,
    suggestions,
    setSuggestions,
}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearchMovies();
    };
    return (
        <section className="searchSection">
            <h1>Ready to find your next movie?</h1>

            {/*<ToggleSwitch /> */}
            <form onSubmit={handleSubmit}>
                <div className={`searchSection ${searchByDescription ? 'hideSection' : 'showSection'}`}>
                    <h2>Search similar movies by title</h2>
                    {/*<SearchBar />*/}
                </div>

                <div className={`searchSection ${searchByDescription ? 'showSection' : 'hideSection'}`}>
                    <h2>Search similar movies by description</h2>
                    <textarea value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={inputsDisabled}/>
                </div>

                <button type="submit"
                    disabled = {inputsDisabled}>
                    Search
                </button>
            </form>
        </section>
    )
}

export default SearchComponent;