import { useEffect, useState } from "react"

import addEducationIcon from "../../assets/plus icon.png"
import upArrow from "../../assets/upArrow.png"
import downArrow from "../../assets/downArrow.png"
import editIcon from "../../assets/editIcon.png"
import deleteIcon from "../../assets/binIcon.png"

import "./5-EducationHistory.css"

import SpecificEducation from "./5.01-SpecificEducation"
import AddSchool from "./5.02-AddNewSchool"
import EditEducation from "./5.03-EditEducation"

function EducationHistory({
    appData,
    containerHeader,
    loggedUser
}){
    const [sortEducation, setSortEducation] = useState([])
    const [selectedEducationId, setEducationId] = useState()

    const [deleteEducationId, setDeleteEducationId] = useState()

    const [editEducationId, setEditEducationId] = useState()
    const [editEducationName, setEducationName] = useState()
    const [editEducationImg, setEditEducatuionImg] = useState()
    const [editEducationCountry, setEditEducationCountry] = useState()
    const [editEducationCity, setEducationCity] = useState()
    const [educationGrade, setEducationGrade] = useState()
    const [educationSubject, setEducationSubject] = useState()
    const [educationStart, setEducationStart] = useState()
    const [educationEnd, setEducationEnd] = useState()

    const [addSchool, setAddSchool] = useState(false)

    const handleEdit = (
        schoolId, 
        schoolName, 
        schoolImg,
        schoolCountry,
        schoolCity,
        schoolGrade,
        schoolSubject,
        schoolStart,
        schoolEnd
    ) => {
        setEditEducationId(schoolId)
        setEducationName(schoolName)
        setEditEducatuionImg(schoolImg)
        setEditEducationCountry(schoolCountry)
        setEducationCity(schoolCity)
        setEducationGrade(schoolGrade)
        setEducationSubject(schoolSubject)
        setEducationStart(schoolStart)
        setEducationEnd(schoolEnd)
    }
 
    const allEducation = appData.allEducation
    const setAllEducation = appData.setAllEducation

    console.log(allEducation)

    useEffect(() => (
        setSortEducation(allEducation.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)))
    ), [allEducation])

    console.log(sortEducation)

    const handleDeleteion = (e) => {
        e.preventDefault()
        fetch(`/education/${deleteEducationId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllEducation(schools => schools.filter(school => school.id !== deleteEducationId))
                }
            })
    }


    //Create container to add new education
    const addEducationContainer = 
        <div
            className="addEducationImgContainer"
            onClick={() => setAddSchool(true)}
        >
            <img 
                className="educationImg"
                src={addEducationIcon}
                alt="addEducationIcon"
            />
        </div>
    
    //Filter the education institutes
    const renderEducation = sortEducation.map((education, index) => (
        <div
            key={index}
            id="renderEducationCard"
        >
            {education.id === editEducationId ?
                <EditEducation 
                    allEducation={allEducation}
                    setAllEducation={setAllEducation}
                    editEducationName={editEducationName}
                    editEducationImg={editEducationImg}
                    editEducationCountry={editEducationCountry}
                    editEducationCity={editEducationCity}
                    educationGrade={educationGrade}
                    educationSubject={educationSubject}
                    educationStart={educationStart}
                    educationEnd={educationEnd}
                    editEducationId={editEducationId}
                    setEditEducationId={setEditEducationId}
                />
            :
                <>
                    <div
                        className="educationImgContainer"
                    >
                        <img
                            className="educationImg" 
                            src={education.school_image}
                            alt={`${education.school}`}
                        />
                    </div>

                    <div
                        id={loggedUser ? "usersEducationOptionContainer" : "bottomEducationCard"}
                    >
                        {deleteEducationId === education.id ?
                            <form
                                onSubmit={handleDeleteion}
                            >
                                <h2>Confirm Deletion?</h2>

                                <div>
                                    <button
                                        type="submit"
                                    >
                                        Delete
                                    </button>

                                    <button
                                        onClick={() => setDeleteEducationId()}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        :
                        <>
                            <div
                                id="educationArrowContainer"
                            >
                                {selectedEducationId === education.id? 
                                    <img 
                                        id="educationArrowImg"
                                        src={upArrow}
                                        onClick={() => setEducationId()}
                                        alt="upArrow"
                                    />
                                :
                                    <img 
                                        id="educationArrowImg"
                                        src={downArrow}
                                        onClick={() => setEducationId(education.id)}
                                        alt="downArrow"
                                    />
                                }
                            </div>

                            {loggedUser ?
                                <div
                                    className="editEducationButtons"
                                    onClick={() => handleEdit(
                                        education.id,
                                        education.school,
                                        education.school_image,
                                        education.country,
                                        education.city,
                                        education.grade,
                                        education.subject_studied,
                                        education.start_date,
                                        education.end_date
                                    )}
                                >
                                    <img 
                                        className="editEducationButtonIcon"
                                        src={editIcon}
                                        alt="editEducationIcon"
                                    />
                                </div>
                            :
                                null
                            }

                            {loggedUser ?
                                <div
                                    className="editEducationButtons"
                                    onClick={() => setDeleteEducationId(education.id)}
                                >
                                    <img 
                                        className="editEducationButtonIcon"
                                        src={deleteIcon}
                                        alt="deleteIcon"
                                    />
                                </div>
                            :
                                null
                            }
                        </>
                        }
                    </div>
                </>
            }
        </div>
    ))

    return(
        <div
            id="popUpContainer"
        >
            <div
                id={selectedEducationId ? "largeEducationContainer":"smallerPopUpContainer"}
            >
                {containerHeader}
            
                <div
                    id="educationWheel"
                >
                    {loggedUser && !addSchool?(
                        addEducationContainer
                    )
                    :
                    loggedUser && addSchool ? (
                        <AddSchool 
                            allEducation={allEducation}
                            setAllEducation={setAllEducation}
                            setAddSchool={setAddSchool}
                        />
                    )
                    :
                        null
                    }

                    {renderEducation}
                </div>

                {selectedEducationId ?
                    <SpecificEducation 
                        selectedEducationId={selectedEducationId}
                        sortEducation={sortEducation}
                    />
                    :
                    null
                }
            </div>
        </div>
    )
}
export default EducationHistory