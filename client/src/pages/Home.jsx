import { useEffect } from "react";


export const Home = () => {
    const tag_line1 = "Culture, Creativity and Community";
    const tag_line2 = "DISCOVER EVENTS";
    const tag_line3 = "AROUND YOUR CAMPUS";

    function changeBackgroundToHomePage() {
        //document.body.style.backgroundImage = `url(${bgImage})`;
        document.body.classList.add('body-home');
        return () => {

            document.body.classList.remove('body-home'); 
        };
    }

    useEffect(() => {
        changeBackgroundToHomePage();
        
    }, []);

    return (
        <header className="Homepage">
            <div className="Home-tagline1">
                <p>{tag_line1}</p>
            </div>
            <div className="Home-tagline2">
                <h1>{tag_line2}</h1>
                <h1>{tag_line3}</h1>
            </div>
        </header>
    )
}