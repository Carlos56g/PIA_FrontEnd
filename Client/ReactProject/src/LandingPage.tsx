import './LandingPage.css'
import SearchComponent from './Components/Sections/SearchComponent'
import type { MovieResponse } from "./Resources/Types";
import { useState } from 'react';
import SearchResultsComponent from './Components/Sections/SearchResultsComponent';

function LandingPage() {;
  const [movieForMeResponse, setMovieForMeResponse] = useState<MovieResponse | null>(null); //Response by the API (Success)

  return (
    <div className='landing-container'>
      
      <header className='header-section'>
        <>HeaderComponent</>
      </header>

      <main className='main-content'>
        <>RecomendationsComponent</>

        <SearchComponent
        setMovieForMeResponse={setMovieForMeResponse}
        />

        <SearchResultsComponent
        movieForMeResponse={movieForMeResponse}
        clearResults={() => setMovieForMeResponse(null)}
        />

      </main>
      
      <footer className='footer-section'>
        <>FooterComponent</>
      </footer>

    </div>
  );
}

export default LandingPage;
