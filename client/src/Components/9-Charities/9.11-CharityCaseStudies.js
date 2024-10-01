import "./9.11-CharityCaseStudies.css"

import AddCharityStudy from "./9.12-AddCharityStudy"
import EditCharityCaseStudy from "./9.17-EditCharityCaseStudy"
import DeleteCharityStudy from "./9.18-DeleteCharityStudy"

import addCaseStudyIcon from "../../assets/plus icon.png"
import moreInfoIcon from "../../assets/downArrow.png"
import editInfoIcon from "../../assets/editIcon.png"
import deleteInfoIcon from "../../assets/binIcon.png"

import { useState } from "react"

function CharityCaseStudies({
    charityCaseStudies,
    allCaseStudies,
    setAllCaseStudies,
    loggedUser,
    selectedCharityId,
    selectedCaseStudyId,
    setSelectedCaseStudyId,
    setSelectedCaseStudyImg,
    setSelectedCaseStudyName
}){
    console.log(charityCaseStudies)
    const [addStudy, setAddStudy] = useState(false)

    const [editStudyId, setEditStudyId] = useState()
    const [studyTitle, setStudyTitle] = useState("")
    const [studyImg, setStudyImg] = useState("")
    const [studyInfo, setStudyInfo] = useState("")
    const [studyCountry, setStudyCountry] = useState("")
    const [studyCity, setStudyCity] = useState("")

    const [deleteStudyId, setDeleteStudyId] = useState()

    const hanldeEdit = (studyId, title, image, info, country, city) => {
        setEditStudyId(studyId)
        setStudyTitle(title)
        setStudyImg(image)
        setStudyInfo(info)
        setStudyCountry(country)
        setStudyCity(city)
    }

    console.log(`I have selected case study ${selectedCaseStudyId}`)


    const addStudyIcon = 
        <div
            id="addCharityStudyIconContainer"
            onClick={() => setAddStudy(true)}
        >
            <img 
                src={addCaseStudyIcon}
                id="addCharityStudyIcon"
                alt="addCharityStudyIcon"
            />
        </div>
    
    const handleMoreInfo = (caseStudyId, caseStudyName, caseStudyImg) => {
        setSelectedCaseStudyId(caseStudyId)
        setSelectedCaseStudyName(caseStudyName)
        setSelectedCaseStudyImg(caseStudyImg)
    }

    const renderCaseStudyCards = charityCaseStudies.map((study, index) => {
        return(
            editStudyId === study.id?
                <EditCharityCaseStudy 
                    editStudyId={editStudyId}
                    setEditStudyId={setEditStudyId}
                    studyTitle={studyTitle}
                    studyImg={studyImg}
                    studyInfo={studyInfo}
                    studyCountry={studyCountry}
                    studyCity={studyCity}
                    allCaseStudies={allCaseStudies}
                    setAllCaseStudies={setAllCaseStudies}
                />
            :
                <div
                    className={loggedUser ? "loggedCharityStudyCard" : "charityStudyCard"}
                    key={index}
                > 
                    <div
                        className="charityStudyCardImgContainer"
                    >
                        <img 
                            className="charityStudyCardImg"
                            src={studyImg}
                            alt="studyImg"
                        />
                    </div>

                    <h3>
                        {studyTitle}
                    </h3>

                    <div
                        className={selectedCaseStudyId === study.id ? "charityLessInfoContainer" : "charityMoreInfoIconCotainer"}
                        onClick={selectedCaseStudyId === study.id ? () => setSelectedCaseStudyId() : () => handleMoreInfo(study.id, study.title, study.case_study_img)}
                    >
                        <img 
                            className="charityMoreInfoIcon"
                            id={selectedCaseStudyId === study.id ? "viewLessInfo" : ""}
                            src={moreInfoIcon}
                            alt="moreInfoIcon"
                        />
                    </div>

                    {loggedUser ?
                        deleteStudyId === study.id ?
                            <DeleteCharityStudy 
                                setAllCaseStudies={setAllCaseStudies}
                                deleteStudyId={deleteStudyId}
                                setDeleteStudyId={setDeleteStudyId}
                            />
                        :
                            <div
                                id="charityCaseStudyButtonContainer"
                            >
                                <button
                                    className="charityCaseStudyButton"
                                    onClick={() => hanldeEdit(
                                        study.id,
                                        study.title,
                                        study.case_study_img,
                                        study.case_study_info,
                                        study.country,
                                        study.city
                                    )}
                                >
                                    <img 
                                        className="charityCaseStudyButtonImg"
                                        src={editInfoIcon}
                                        alt="editIcon"
                                    />
                                </button>

                                <button
                                    className="charityCaseStudyButton"
                                    onClick={() => setDeleteStudyId(study.id)}
                                >
                                    <img 
                                        className="charityCaseStudyButtonImg"
                                        src={deleteInfoIcon}
                                        alt="deleteIcon"
                                    />
                                </button>
                            </div>
                    :
                    null
                }
            </div>
        )
    })

    return(
        <div
            id="charityCaseStudyWheel"
        >
            {loggedUser ?
                addStudyIcon
                :
                null
            }

            {addStudy ? 
                <AddCharityStudy 
                    setAddStudy={setAddStudy}
                    allCaseStudies={allCaseStudies}
                    setAllCaseStudies={setAllCaseStudies}
                    selectedCharityId={selectedCharityId}
                />
                :
                null
            }
            {renderCaseStudyCards}
        </div>
    )
}
export default CharityCaseStudies