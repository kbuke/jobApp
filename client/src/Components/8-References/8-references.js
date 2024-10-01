import { useEffect, useState } from "react"

import backButton from "../../assets/backArrow.png"
import nextArrow from "../../assets/nextArrow.png"

import "./8-references.css"

function References({
    appData,
    exitContainer
}){
    const [filterReferences, setFilterReferences] = useState([])
    const [referenceNumber, setReferenceNumber] = useState(1)
    const [referenceButton, setReferenceButton] = useState("")

    const allReferences = appData.allReferences

    useEffect(() => {
        setFilterReferences(allReferences.filter(ref => ref.id === referenceNumber))
    }, [allReferences, referenceNumber])

    const numberOfReferences = allReferences.length 

    console.log(`I have ${numberOfReferences} References`)
    console.log(`I am looking at reference ${referenceNumber}`)
    console.log(filterReferences)
    console.log(allReferences)

    const renderReference = filterReferences.map((ref, index) => (
        <div
            id="specificRefContainer"
            key={index}
        >
            <div id="referencePosition">
                <div id="refLocationImgContainer">
                    <img 
                        id="refLocationImg"
                        src={ref.employer?.logo || ref.charity?.logo || []}
                        alt="locationImg"
                    />
                </div>

                <h3 id="refRole">
                    {ref.employer?.role || ""}
                </h3>
            </div>

            <div id="referencerInfoContainer">
                <h2 id="specificRefName">
                    {ref.title} {ref.first_name} {ref.last_name}
                </h2>

                <h3 id="specificRefPosition">
                    {ref.position} at {ref.employer?.name || ref.charity?.name || ""}
                </h3>

                <div id="specificReferenceImgContainer">
                    <img 
                        src={ref.reference_image}
                        id="specificReferenceImg"
                        alt="referenceImg"
                    />
                </div>

                <h2 id="specificRefEmail">
                    {ref.email}
                </h2>

                <h4>{referenceNumber} / {numberOfReferences}</h4>
            </div>
        </div>
    ))

    return(
        <div id="popUpContainer">
            <div id="largerPopUpContainer">
                <div id="newInfoContainerTitleGrid">
                    <h1></h1>

                    <h1 id="newCategoryTitle">
                        References 
                    </h1>

                    {exitContainer}
                </div>

                <div id="referencesContainer">
                    <div id="lowerContainer">
                        {renderReference}
                    </div>

                    {referenceNumber !== 1 ?
                        <div
                            className="prevRefButtonContainer"
                            onMouseEnter={() => setReferenceButton("Prev")}
                            onMouseLeave={() => setReferenceButton()}
                            id={referenceButton === "Prev" ? "hoveredIdButton": null}
                        >
                            <div
                                id={referenceButton === "Prev" ? "prevReferenceContainer" : "noHover"}
                                onClick={() => setReferenceNumber(referenceNumber - 1)}
                            >
                                <img 
                                    id={referenceButton === "Prev" ? "prevReferenceButton" : ""}
                                    src={backButton}
                                    alt="backButton"
                                />
                            </div>
                        </div>
                        : null
                    }

                    {referenceNumber !== numberOfReferences ?
                        <div
                            className="nextRefButtonContainer"
                            onMouseEnter={() => setReferenceButton("Next")}
                            onMouseLeave={() => setReferenceButton()}
                            id={referenceButton === "Next" ? "hoveredIDButton" : null}
                        >
                            <div
                                id={referenceButton === "Next" ? "nextReferenceContainer" : "noHover"}
                                onClick={() => setReferenceNumber(referenceNumber + 1)}
                            >
                                <img 
                                    id={referenceButton === "Next" ? "nextReferenceButton" : ""}
                                    src={nextArrow}
                                    alt="nextArrow"
                                />
                            </div>
                        </div>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}
export default References
