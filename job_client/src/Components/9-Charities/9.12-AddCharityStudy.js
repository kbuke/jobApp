import { useState } from "react"
import "./9.12-AddCharityStudy.css"

function AddCharityStudy({
    setAddStudy,
    allCaseStudies,
    setAllCaseStudies,
    selectedCharityId
}){
    const [newTitle, setNewTitle] = useState("")
    const [newCountry, setNewCountry] = useState("")
    const [newCity, setNewCity] = useState("")
    const [studyInfo, setStudyInfo] = useState("")
    const [newImg, setNewImg] = useState("")

    const handlePost = (e) => {
        e.preventDefault()
        const jsonData = {
            newTitle,
            newCountry,
            newCity,
            studyInfo,
            newImg,
            selectedCharityId
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
            .then(setAddStudy(false))
    }

    return(
        <form
            className="newCharityStudyCard"
            onSubmit={handlePost}
        >
            <h3>Add New Case Study</h3>

            <input 
                placeholder="Enter Study Title"
                className="newStudyInput"
                onChange={(e) => setNewTitle(e.target.value)}
            />

            <input 
                className="newStudyInput"
                placeholder="Add Study Img"
                onChange={(e) => setNewImg(e.target.value)}
            />

            <input 
                className="newStudyInput"
                placeholder="Enter Study Info"
                onChange={(e) => setStudyInfo(e.target.value)}
            />
            
            <input 
                className="newStudyInput"
                placeholder="Enter Study Country"
                onChange={(e) => setNewCountry(e.target.value)}
            />

            <input 
                className="newStudyInput"
                placeholder="Enter Study City"
                onChange={(e) => setNewCity(e.target.value)}
            />

            <div>
                <button
                    type="submit"
                >
                    Create
                </button>

                <button
                    onClick={() => setAddStudy(false)}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
export default AddCharityStudy