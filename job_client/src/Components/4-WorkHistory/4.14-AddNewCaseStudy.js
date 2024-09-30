import { useState } from "react"

import "./4.14-AddNewCaseStudy.css"

function AddNewCaseStudy({
    selectedBusinessId,
    allCaseStudies,
    setAllCaseStudies,
    setAddNewCaseStudy
}){
    const [newTitle, setNewTitle] = useState("")
    const [newImg, setNewImg] = useState("")
    const [newCountry, setNewCountry] = useState("")
    const [newCity, setNewCity] = useState("")
    const [studyInfo, setStudyInfo] = useState("")

    const handleNewStudy = (e) => {
        e.preventDefault()
        const jsonData = {
            newTitle,
            newImg,
            newCountry,
            newCity,
            studyInfo,
            selectedBusinessId
        }
        fetch("/employercasestudy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newStudy => {
                setAllCaseStudies([...allCaseStudies, newStudy])
            })
            .then(setAddNewCaseStudy(false))
    }

    console.log(newImg)

    return(
        <form
            id="newStudyForm"
            onSubmit={handleNewStudy}
        >
            <div
                id="newRoleFormContainerGrid"
            >
                <h3>Add new title: </h3>
                <input 
                    type="text"
                    onChange={(e) => setNewTitle(e.target.value)}
                />

                <h3>Add new image: </h3>
                <input 
                    type="text"
                    onChange={(e) => setNewImg(e.target.value)}
                />

                <h3>Country: </h3>
                <input 
                    type="text"
                    onChange={(e) => setNewCountry(e.target.value)}
                />

                <h3>City: </h3>
                <input 
                    type="text"
                    onChange={(e) => setNewCity(e.target.value)}
                />

                <h3>Enter Info: </h3>
                <input 
                    type="text"
                    onChange={(e) => setStudyInfo(e.target.value)}
                />
            </div>

            <button
                type="submit"
            >
                Add new case study
            </button>

            <button
                onClick={() => setAddNewCaseStudy(false)}
            >
                Cancel
            </button>
        </form>
    )
}
export default AddNewCaseStudy