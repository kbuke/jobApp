import { useState } from "react"
import "./3.01-AboutMe.css"

function AboutMe({
    appData,
    setSelectedCategory
}){

    const [hoveredOption, setHoveredOption] = useState("")

    

    const allCards = appData.allCards
    

    const renderCards = allCards.map((card, index) => (
        <div
            className="renderedCard"
            key={index}
            style={{
                backgroundImage: `url(${card.image})`,

            }}
            onMouseEnter={() => setHoveredOption(card.title)}
            onMouseLeave={() => setHoveredOption("")}
            id={card.title === hoveredOption ? "hoveredCard" : ""}
            onClick={() => setSelectedCategory(card.title)}
        >
           {
                card.title === hoveredOption ? 
                    <div
                        id="hoveredCardTypeContainer"
                    >
                        <h2
                            id="hoveredCardTypeText"
                        >
                            {card.title}
                        </h2>
                    </div>
                    :
                    null
           }
        </div>
    ))


    return(
        <div
            id="aboutMeContainer"
        >
            <h1>About Me</h1>

            <div
                id="renderedCardGrid"
            >
                {renderCards}
            </div>
        </div>
    )
}
export default AboutMe