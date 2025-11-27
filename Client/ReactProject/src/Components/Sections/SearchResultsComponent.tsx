import type { MovieResponse } from '../../Resources/Types';
import MovieCard from '../Elements/MovieCard';
import "./SearchResultsComponent.css";

interface SearchResultsComponentProps {
    movieForMeResponse: MovieResponse | null;
    clearResults: () => void;
}

const SearchResultsComponent: React.FC<SearchResultsComponentProps> = ({
    movieForMeResponse,
    clearResults,
}) => {

    if (movieForMeResponse == null)
        return null;

    const { SourceMovie, MovieRecommendations } = movieForMeResponse;
    return (
        <section className='background'>
            {SourceMovie.Rating !== 0 ? (
                <div>
                    <div className='sourceMovieCard'>
                        <h3>Tu película</h3>
                        <div className='sourceMovie'>
                            <MovieCard movie={SourceMovie} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='sourceDescriptionCard'>
                    <h3>Ingresa tu descripción</h3>
                    <div className='sourceMovie'>
                        <div className='movieDescription'>
                            <h2>{SourceMovie.Title}</h2>
                        </div>
                    </div>
                </div>
            )}

            <h3>Nuestras recomendaciones</h3>
            <div className='moviesRecommendations'>
                {MovieRecommendations.map((movie, index) => (
                    <div key={index}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>

            <button onClick={clearResults}>Limpiar resultados</button>
        </section>
    );
};

export default SearchResultsComponent;