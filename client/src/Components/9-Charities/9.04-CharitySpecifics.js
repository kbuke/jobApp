import { useEffect, useState } from "react"

import "./9.04-CharitySpecifics.css"

import CharityRoles from "./9.05-CharityRoles"
import CharityReference from "./9.08-CharityReference"
import CharityCaseStudies from "./9.11-CharityCaseStudies"
import SpecificStudy from "./9.13-StudySpecific"

function CharitySpecifics({
    selectedCharityId,
    loggedUser,
    appData
}){
    const [selectedCharity, setSelectedCharity] = useState([])

    const [selectedCaseStudyId, setSelectedCaseStudyId] = useState()
    const [selectedCaseStudyName, setSelectedCaseStudyName] = useState("")
    const [selectedCaseStudyImg, setSelectedCaseStudyImg] = useState("")

    //Get all roles
    const allRoles = appData.allRoles
    const setAllRoles = appData.setAllRoles

    //Get all references
    const allReferences = appData.allReferences
    const setAllReferences = appData.setAllReferences

    //Get all case studies
    const allCaseStudies = appData.allCaseStudies
    const setAllCaseStudies = appData.setAllCaseStudies

    //Get all case study roles
    const caseStudyRoles = appData.caseStudyRoles
    const setCaseStudyRoles = appData.setCaseStudyRoles

    console.log(caseStudyRoles)
    
    //fetch specific charity info
    useEffect(() => {
        fetch(`/charities/${selectedCharityId}`)
        .then(r => {
            if(r.ok) { 
                return r.json()
            }
            throw r 
        })
        .then(charity => setSelectedCharity(charity))
    }, [allRoles, allReferences, caseStudyRoles, selectedCharityId])
    console.log(allCaseStudies)

    //Get the charity info
    const charityLogo = selectedCharity.logo
    const charityDescription = selectedCharity.charity_description
    const charityRole = selectedCharity.role
    const charityDates = `${selectedCharity?.start_date?.slice(0, 4)} - ${selectedCharity.end_date === "Present" ? "Present" : selectedCharity?.end_date?.slice(0, 4)}`

    const charityResponsibilities = selectedCharity?.key_roles || []

    const charityReferences = selectedCharity?.reference || []

    const charityCaseStudies = selectedCharity?.case_studies || []

    console.log(selectedCharity)

    console.log(charityDates)

    return(
        <div
            id="specificCharityContainer"
        >
            <div
                id="specificCharityInfoGrid"
            >
                <div
                    id="specificCharityInfoRightSide"
                > 
                    <div
                        id="specificCharityLogoContainer"
                    >
                        <img 
                            id="specificCharityLogo"
                            src={charityLogo}
                            alt="charityLogo"
                        />
                    </div>

                    <h3
                        className="charityDescription"
                    >
                        {charityDescription}
                    </h3>
                </div>

                <div
                    id="specificInfoLeftSide"
                >
                    <h2
                        id="charityRole"
                    >
                        {charityRole}
                    </h2>

                    <h4
                        id="charityDates"
                    >
                        {charityDates}
                    </h4>

                    <h3
                        id="charityRolesHeader"
                    >
                        Roles
                    </h3>

                    <CharityRoles 
                        charityResponsibilities={charityResponsibilities}
                        selectedCharityId={selectedCharityId}
                        loggedUser={loggedUser}
                        appData={appData}
                        allRoles={allRoles}
                        setAllRoles={setAllRoles}
                    />
                </div>
            </div>

            <div
                id="charityCaseStudyContainer"
            >
                <h2>Case Studies</h2>
                <CharityCaseStudies 
                    charityCaseStudies={charityCaseStudies}
                    allCaseStudies={allCaseStudies}
                    setAllCaseStudies={setAllCaseStudies}
                    loggedUser={loggedUser}
                    selectedCharityId={selectedCharityId}
                    selectedCaseStudyId={selectedCaseStudyId}
                    setSelectedCaseStudyId={setSelectedCaseStudyId}
                    selectedCaseStudyImg={selectedCaseStudyImg}
                    setSelectedCaseStudyImg={setSelectedCaseStudyImg}
                    selectedCaseStudyName={selectedCaseStudyName}
                    setSelectedCaseStudyName={setSelectedCaseStudyName}
                />

                {selectedCaseStudyId ?
                    <SpecificStudy 
                        selectedCaseStudyId={selectedCaseStudyId}
                        selectedCaseStudyImg={selectedCaseStudyImg}
                        selectedCaseStudyName={selectedCaseStudyName}
                        selectedCharityId={selectedCharityId}
                        appData={appData}
                        loggedUser={loggedUser}
                        caseStudyRoles={caseStudyRoles}
                        setCaseStudyRoles={setCaseStudyRoles}
                    />
                    :
                    null
                }
            </div>

            <div
                id="charityReferenceContainer"
            >
                <h2>References</h2>
                <CharityReference 
                    charityReferences={charityReferences}
                    allReferences={allReferences}
                    setAllReferences={setAllReferences}
                    loggedUser={loggedUser}
                    selectedCharityId={selectedCharityId}
                />
                
            </div>
        </div>
    )
}
export default CharitySpecifics