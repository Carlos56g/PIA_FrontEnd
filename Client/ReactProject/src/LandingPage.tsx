import './LandingPage.css'
import SearchComponent from './Components/Sections/SearchComponent'
import type { MovieResponse } from "./Types";
import { useState } from 'react';

function LandingPage() {;
  const [movieForMeResponse, setMovieForMeResponse] = useState<MovieResponse | null>(null); //Response by the API (Success)
  return (
    <>

      <>HeaderComponent</>
      
      <>RecomendationsComponent</>

      <SearchComponent
      setMovieForMeResponse={setMovieForMeResponse}
      />

      <>ResultsComponent</>

      <>FooterComponent</>

    </>
  );
}

export default LandingPage;
