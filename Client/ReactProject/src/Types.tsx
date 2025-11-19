export interface Movie {
    Title: string;
    Genres: string[];
    Rating: number;
    PosterURL: string;
    HomePageURL: string;
}

export interface MovieResponse {
    MovieRecommendations: Movie[];
    SourceMovie: Movie;
}

export interface APIError {
    Detail: string;
}

export interface ResultSuggestion {
    Title: string;
    ID: number;
}