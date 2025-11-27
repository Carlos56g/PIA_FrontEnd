import './RecomendationsComponent.css';
import TextType from '../Elements/TextType';

export default function RecomendationsComponent() {
    return (
        <>
            <div className="recommendations-container">
                <TextType
                    text={["¡Bienvenid@ a MoviesForMe!", "¿List@ para descubrir nuevas películas?", "¡Disfruta tu experiencia!"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    className="hero-text"
                /> 
            </div>
        </>
    );
};