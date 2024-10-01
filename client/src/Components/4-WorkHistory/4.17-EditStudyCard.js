import { useState } from "react"

import "./4.17-EditStudyCard.css"

function EditStudyCard({
    editId,
    setEditId,
    editTitle,
    editImg,
    editInfo,
    editCountry,
    editCity,
    allCaseStudies,
    setAllCaseStudies
}){
    const [title, setTitle] = useState(editTitle)
    const [image, setImage] = useState(editImg)
    const [info, setInfo] = useState(editInfo)
    const [country, setCountry] = useState(editCountry)
    const [city, setCity] = useState(editCity)

    const handleEdit = (e) => {
        e.preventDefault()
        fetch(`/employercasestudy/${editId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                case_study_img: image,
                case_study_info: info,
                country: country,
                city: city
            })
        })
        .then(r => {
            if(r.ok) {
                return r.json()
            } else {
                console.error("Failed to update study")
                return null 
            }
        })
        .then(updateStudy => {
            if(updateStudy){
                setAllCaseStudies(allCaseStudies.map(oldStudy => 
                    oldStudy.id === updateStudy.id? updateStudy : oldStudy
                ))
                setEditId()
            }
        })
    }

    return(
        <form
            onSubmit={handleEdit}
            id="editStudyForm"
        >
            <input 
                type="text"
                value={title}
                placeholder="Enter title of study"
                className="employerCaseStudyInput"
                onChange={(e) => setTitle(e.target.value)}
                style={{marginTop: "10px"}}
            />

            <input 
                type="text"
                value={image}
                placeholder="Enter image of study"
                className="employerCaseStudyInput"
                onChange={(e) => setImage(e.target.value)}
            />

            <input 
                type="text"
                value={info}
                placeholder="Enter Information for project"
                className="employerCaseStudyInput"
                onChange={(e) => setInfo(e.target.value)}
            />

            <input 
                type="text"
                className="employerCaseStudyInput"
                placeholder="Enter Country of project"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />

            <input 
                type="text"
                className="employerCaseStudyInput"
                placeholder="Enter City of project"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            <div
                id="editStudyByttonContainer"
            >
                <button
                    type="submit"
                    className="editStudyButton"
                    
                >
                    Edit
                </button>

                <button
                    onClick={() => setEditId()}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
export default EditStudyCard