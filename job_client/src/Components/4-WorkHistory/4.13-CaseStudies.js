import { useEffect, useState } from "react"

import "./4.13.caseStudies.css"
import AddNewCaseStudy from "./4.14-AddNewCaseStudy"
import SpecificCaseStudy from "./4.16-SpecificCaseStudy"
import EditStudyCard from "./4.17-EditStudyCard"

import addNewStudyIcon from "../../assets/plus icon.png"
import editStudyIcon from "../../assets/editIcon.png"
import deleteStudyIcon from "../../assets/binIcon.png"

function CaseStudies({
    appData,
    selectedBusinessId,
    loggedUser
}){
    const [filterCaseStudies, setFilterCaseStudies] = useState([])
    const [addNewCaseStudy, setAddNewCaseStudy] = useState(false)

    // const [selectCaseStudy, setSelectCaseStudy] = useState(false)
    const [selectCaseStudyId, setSelectCaseStudyId] = useState()
    const [selectedCaseStudyName, setSelectedCaseStudyName] = useState("")
    const [selectedCaseStudyImg, setSelectedCaseStudyImg] = useState()

    const [editId, setEditId] = useState()
    const [editTitle, setEditTitle] = useState("")
    const [editImg, setEditImg] = useState("")
    const [editInfo, setEditInfo] = useState("")
    const [editCountry, setEditCountry] = useState("")
    const [editCity, setEditCity] = useState("")

    const [deleteId, setDeleteId] = useState()

    const allCaseStudies = appData.allCaseStudies
    const setAllCaseStudies = appData.setAllCaseStudies

    console.log(allCaseStudies)

    console.log(`I have chosen ${selectCaseStudyId}`)

    useEffect(() => {
        setFilterCaseStudies(allCaseStudies.filter(study => study.employer_id == selectedBusinessId))
    }, [allCaseStudies])

    console.log(filterCaseStudies)

    const handleEditCard = (
        studyId, 
        title,
        img,
        info,
        country, 
        city
    ) => {
        setEditId(studyId)
        setEditTitle(title)
        setEditImg(img)
        setEditInfo(info)
        setEditCountry(country)
        setEditCity(city)
    }

    //const handle Case study info
    const handleCaseStudySelect = (studyId, studyName, studyImg) => {
        setSelectCaseStudyId(studyId)
        setSelectedCaseStudyName(studyName)
        setSelectedCaseStudyImg(studyImg)
    }

    //Handle delete function
    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/employercasestudy/${deleteId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllCaseStudies(studies => studies.filter(study => study.id !== deleteId))
                }
            })
            .then(setDeleteId())
    }

    const renderStudies = filterCaseStudies.map((studies, index) => (
        editId === studies.id ?
            <EditStudyCard 
                editId={editId}
                setEditId={setEditId}
                editTitle={editTitle}
                editImg={editImg}
                editInfo={editInfo}
                editCountry={editCountry}
                editCity={editCity}
                allCaseStudies={allCaseStudies}
                setAllCaseStudies={setAllCaseStudies}
            />
        :
            <div
                key={index}
                id={loggedUser ? "userCaseStudyCard" : "caseStudyCard"}
                // onClick={() => setSelectCaseStudyId(studies.id)}
                onClick={() => handleCaseStudySelect(studies.id, studies.title, studies.case_study_img)}
            >
                <img 
                    id="caseStudyImg"
                    src={studies.case_study_img}
                    alt={`${studies.title} Logo`}
                />

                <>
                    <h2>{studies.title}</h2>
                </>

                {loggedUser ? 
                    deleteId === studies.id ?
                        <form
                            onSubmit={handleDelete}
                        >
                            <button>Delete</button>

                            <button
                                onClick={() => setDeleteId()}
                            >
                                Cancel
                            </button>
                        </form>
                    :
                        <div
                            id="editStudyButtonContainer"
                        >
                            <button
                                className="editStudyButtons"
                                onClick={() => handleEditCard(
                                    studies.id,
                                    studies.title,
                                    studies.case_study_img,
                                    studies.case_study_info, 
                                    studies.country,
                                    studies.city
                                )}
                            >
                                <img 
                                    className="editStudyButtonImg"
                                    src={editStudyIcon}
                                    alt="editStudyIcon"
                                />
                            </button>

                            <button
                                className="editStudyButtons"
                                onClick={() => setDeleteId(studies.id)}
                            >
                                <img 
                                    src={deleteStudyIcon}
                                    className="editStudyButtonImg"
                                    alt="deleteStudyButtons"
                                />
                            </button>
                        </div>
                :
                    null
            }
        </div>
    ))

    const addNewStudy = 
        <div
            id="newStudyIconContainer"
            onClick={() => setAddNewCaseStudy(true)}
        >
            <img 
                src={addNewStudyIcon}
                id="newStudyIcon"
                alt="newStudyIcon"
            />
        </div>
    
    console.log(loggedUser)

    return(
        <>
            <div
                id="caseStudyOptionsWheel"
            >
                {loggedUser ? addNewStudy : null}

                {addNewCaseStudy ? 
                    <AddNewCaseStudy 
                        selectedBusinessId={selectedBusinessId}
                        allCaseStudies={allCaseStudies}
                        setAllCaseStudies={setAllCaseStudies}
                        setAddNewCaseStudy={setAddNewCaseStudy}
                    /> 
                    : 
                    null
                }

                {renderStudies}
            </div>

            {selectCaseStudyId ?
                <SpecificCaseStudy 
                    selectCaseStudyId={selectCaseStudyId}
                    setSelectCaseStudyId={setSelectCaseStudyId}
                    selectedCaseStudyName={selectedCaseStudyName}
                    selectedCaseStudyImg={selectedCaseStudyImg}
                    loggedUser={loggedUser}
                    appData={appData}
                />
                :
                null
            }
        </>
    )
}
export default CaseStudies