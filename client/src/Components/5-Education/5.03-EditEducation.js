import { useState } from "react"


function EditEducation({
    allEducation,
    setAllEducation,
    editEducationName,
    editEducationImg,
    editEducationCountry,
    editEducationCity,
    educationGrade,
    educationSubject,
    educationStart,
    educationEnd,
    editEducationId,
    setEditEducationId
}){
    const [newSchool, setNewSchool] = useState(editEducationName)
    const [newSchoolImg, setNewSchoolImg] = useState(editEducationImg)
    const [newSchoolCountry, setNewSchoolCountry] = useState(editEducationCountry)
    const [newSchoolCity, setNewSchoolCity] = useState(editEducationCity)
    const [newGrade, setNewGrade] = useState(educationGrade)
    const [newSubject, setNewSubject] = useState(educationSubject)
    const [newStart, setNewStart] = useState(educationStart)
    const [newEnd, setNewEnd] = useState(educationEnd)

    console.log(`I am editing ${editEducationId}`)

    const handleEdit = (e) => {
        e.preventDefault()
        fetch(`/education/${editEducationId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                city: newSchoolCity,
                country: newSchoolCountry,
                end_date: newEnd, 
                grade: newGrade,
                school: newSchool,
                school_image: newSchoolImg, 
                start_date: newStart, 
                subject_studied: newSubject
            })
        })
        .then(r => {
            if(r.ok) {
                return r.json()
            } else {
                console.error("Failed to update school")
                return null
            }
        })
        .then(updatedSchool => {
            setAllEducation(allEducation.map(oldSchool => 
                oldSchool.id === updatedSchool.id? updatedSchool : oldSchool
            ))
        })
        setEditEducationId()
    }


    return(
        <form
            onSubmit={handleEdit}
        >
            <input 
                value={newSchool}
                onChange={(e) => setNewSchool(e.target.value)}
                placeholder="Enter School Name"
                className="editSchoolInfo"
            />

            <input 
                className="editSchoolInfo"
                onChange={(e) => setNewSchoolImg(e.target.value)}
                placeholder="Enter School Image"
                value={newSchoolImg}
            />

            <input 
                className="editSchoolInfo"
                onChange={(e) => setNewSchoolCountry(e.target.value)}
                placeholder="Enter School Country"
                value={newSchoolCountry}
            />

            <input 
                className="editSchoolInfo"
                onChange={(e) => setNewSchoolCity(e.target.value)}
                placeholder="Enter School City"
                value={newSchoolCity}
            />

            <input 
                className="editSchoolInfo"
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Enter Subject"
                value={newSubject}
            />

            <input 
                className="editSchoolInfo"
                onChange={(e) => setNewGrade(e.target.value)}
                placeholder="Enter Grade"
                value={newGrade}
            />

            <input 
                className="editSchoolInfo"
                onChange={(e) => setNewStart(e.target.value)}
                type="date"
                value={newStart}
            />

            <input 
                className="editSchoolInfo"
                onChange={(e) => setNewEnd(e.target.value)}
                type="date"
                value={newEnd}
            />

            <div>
                <button
                    type="submit"
                >
                    Edit
                </button>

                <button
                    onClick={() => setEditEducationId("")}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
export default EditEducation