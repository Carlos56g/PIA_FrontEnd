import './LandingPage.css'
import SearchComponent from './Components/Sections/SearchComponent'
import Header from './Components/Sections/Header';
import Footer from './Components/Sections/Footer';
import type { MovieResponse } from "./Resources/Types";
import { useState } from 'react';
import SearchResultsComponent from './Components/Sections/SearchResultsComponent';

function LandingPage() {;
  const [movieForMeResponse, setMovieForMeResponse] = useState<MovieResponse | null>(null); //Response by the API (Success)

  return (
    <div className='landing-container'>
      
      <header className='header-section'>
        <Header />
      </header>

      <main className='main-content'>
        {/* TODO:<>RecomendationsComponent</> */}

        <SearchComponent
        setMovieForMeResponse={setMovieForMeResponse}
        />
        
        <SearchResultsComponent
        movieForMeResponse={movieForMeResponse}
        clearResults={() => setMovieForMeResponse(null)}
        />

      </main>
      
      <footer className='footer-section'>
        <Footer />
      </footer>

    </div>
  );
}

export default LandingPage;
