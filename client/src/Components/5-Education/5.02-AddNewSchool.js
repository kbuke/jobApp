import { useState } from "react"
import "./5.02-AddNewSchool.css"


function AddSchool({
    allEducation,
    setAllEducation,
    setAddSchool
}){
    const [schoolName, setSchoolName] = useState("")
    const [subjects, setSubjects] = useState("")
    const [grade, setGrade] = useState("")
    const [schoolLogo, setSchoolLogo] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const handleNewSchool = (e) => {
        e.preventDefault()
        const jsonData = {
            schoolName,
            subjects,
            grade,
            schoolLogo,
            city,
            country,
            startDate,
            endDate
        }
        fetch("/education", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newSchool => {
                setAllEducation([...allEducation, newSchool])
            })
            .then(setAddSchool(false))
    }
    return(
        <form
            id="newSchoolContainer"
            onSubmit={handleNewSchool}
        >
            <h3>Add School</h3>

            <div
                id="newSchoolInfoGrid"
            >
                <h4>School Name:</h4>
                <input 
                    type="text"
                    onChange={(e) => setSchoolName(e.target.value)}
                />

                <h4>Subject Studied:</h4>
                <input 
                    type="text"
                    onChange={(e) => setSubjects(e.target.value)}
                />

                <h4>Grade: </h4>
                <input 
                    onChange={(e) => setGrade(e.target.value)}
                    type="text"
                />

                <h4>School Logo: </h4>
                <input 
                    type="text"
                    onChange={(e) => setSchoolLogo(e.target.value)}
                />

                <h4>City: </h4>
                <input 
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                />

                <h4>Country: </h4>
                <input 
                    type="text"
                    onChange={(e) => setCountry(e.target.value)}
                />

                <h4>Start Date:</h4>
                <input 
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <h4>End Date:</h4>
                <input 
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <button
                type="submit"
            >
                Add New School
            </button>

            <button
                onClick={() => setAddSchool(false)}
            >
                Cancel
            </button>
        </form>
    )
}
export default AddSchool