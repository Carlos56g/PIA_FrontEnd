import './LandingPage.css'
import SearchComponent from './Components/Sections/SearchComponent'
import type { MovieResponse } from "./Resources/Types";
import { useState } from 'react';
import SearchResultsComponent from './Components/Sections/SearchResultsComponent';

function LandingPage() {;
  const [movieForMeResponse, setMovieForMeResponse] = useState<MovieResponse | null>(null); //Response by the API (Success)

  return (
    <>

      <>HeaderComponent</>
      
      <>RecomendationsComponent</>

      <SearchComponent
      setMovieForMeResponse={setMovieForMeResponse}
      />

      <SearchResultsComponent
      movieForMeResponse={movieForMeResponse}
      clearResults={() => setMovieForMeResponse(null)}
      />

      <>FooterComponent</>

    </>
  );
}

export default LandingPage;
