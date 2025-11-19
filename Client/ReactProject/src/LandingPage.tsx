import './LandingPage.css'
import SearchComponent from './Components/Sections/SearchComponent';
import { useState } from 'react';

function LandingPage() {
  return (
    <>
    
      <>HeaderComponent</>

      <>RecomendationsComponent</>

      <SearchComponent
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        searchByDescription={searchByDescription}
        toggleSearchByDescription={toggleSearchByDescription}
        handleSearchMovies={handleSearchMovies}
        inputsDisabled={inputsDisabled}
        setSuggestions={setSuggestions}
        suggestions={suggestions}
      />


      <>ResultsComponent</>

      <>FooterComponent</>

    </>
  )
}

export default LandingPage
