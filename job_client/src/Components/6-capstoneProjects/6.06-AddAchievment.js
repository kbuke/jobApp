import { useState } from "react"
import "./6.06-AddAchievment.css"

function AddAchievment({
    setAddNewAchievment,
    projectId,
    allAchievments,
    setAllAchievements
}){
    const [newAchievment, setNewAchievment] = useState("")
    const [newImg, setNewImg] = useState("")

    const handleNewPost = (e) => {
        e.preventDefault()
        const jsonData = {
            newAchievment,
            newImg,
            projectId
        }
        fetch("/projectgoals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newAchievment => {
                setAllAchievements([...allAchievments, newAchievment])
            })
    }

    return(
        <form
            id="newAchievmentCard"
            onSubmit={handleNewPost}
        >
            <h2>Add New Achievment</h2>

            <input 
                placeholder="Enter Achievment"
                className="newAchievmentInput"
                onChange={(e) => setNewAchievment(e.target.value)}
            />

            <input 
                placeholder="Enter Achievment Image"
                className="newAchievmentInput"
                onChange={(e) => setNewImg(e.target.value)}
            />
            <div
                id="newAchievmentButtonContainer"
            >
                <button
                    type="submit"
                    className="newAchievmentButton"
                >
                    Add
                </button>

                <button
                    onClick={() => setAddNewAchievment(false)}
                    className="newAchievmentButton"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
export default AddAchievment