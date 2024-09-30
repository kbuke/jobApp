import { useState } from "react"


function EditCharityCaseStudy({
    editStudyId,
    setEditStudyId,
    studyTitle,
    studyImg,
    studyInfo,
    studyCountry,
    studyCity,
    allCaseStudies,
    setAllCaseStudies
}){
    const [newTitle, setNewTitle] = useState(studyTitle)
    const [newImg, setNewImg] = useState(studyImg)
    const [newInfo, setNewInfo] = useState(studyInfo)
    const [newCountry, setNewCountry] = useState(studyCountry)
    const [newCity, setNewCity] = useState(studyCity)

    const handleEdit = (e) => {
        e.preventDefault()
        fetch(`/employercasestudy/${editStudyId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTitle,
                case_study_img: newImg,
                case_study_info: newInfo,
                country: newCountry,
                city: newCity
            })
        })
        .then(r => {
            if(r.ok){
                return r.json()
            } else {
                console.error("Failed to update case study")
                return null 
            }
        })
        .then(newCaseStudy => {
            if(newCaseStudy){
                setAllCaseStudies(allCaseStudies.map(oldCaseStudy => 
                    oldCaseStudy.id === newCaseStudy.id? newCaseStudy : oldCaseStudy
                ))
                setEditStudyId()
            }
        })
    }

    return(
        <form
            id="editCharityCaseStudyForm"
            onSubmit={handleEdit}
        >
            <input 
                className="editCharityCaseStudyInfo"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
            />

            <input 
                className="editCharityCaseStudyInfo"
                value={newImg}
                onChange={(e) => setNewImg(e.target.value)}
            />

            <input 
                className="editCharityCaseStudyInfo"
                value={newInfo}
                onChange={(e) => setNewInfo(e.target.value)}
            />

            <input 
                className="editCharityCaseStudyInfo"
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
            />

            <input 
                className="editCharityCaseStudyInfo"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
            />

            <div>
                <button
                    type="submit"
                >
                    Edit
                </button>

                <button
                    onClick={() => setEditStudyId()}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
export default EditCharityCaseStudy