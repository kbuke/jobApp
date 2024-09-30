import { useState } from "react"

function AddRef({
    selectedCharityId,
    setAllReferences,
    allReferences,
    setAddRef
}){
    const [newTitle, setNewTitle] = useState("")
    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newPosition, setNewPosition] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newImg, setNewImg] = useState("")

    const handleNewRef = (e) => {
        e.preventDefault()
        const jsonData = {
            newTitle,
            newFirstName,
            newLastName,
            newPosition,
            newEmail,
            newImg,
            selectedCharityId
        }
        fetch("/employerreference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newRef => {
                setAllReferences([...allReferences, newRef])
            })
            .then(setAddRef(false))
    }

    return(
        <form
            onSubmit={handleNewRef}
        >
            <input 
                onChange={(e) => setNewTitle(e.target.value)}
                className="newEmployerRefInput"
                placeholder="Enter Referees Gender"
            />

            <input 
                onChange={(e) => setNewFirstName(e.target.value)}
                className="newEmployerRefInput"
                placeholder="Enter Referees first name"
            />

            <input 
                onChange={(e) => setNewLastName(e.target.value)}
                className="newEmployerRefInput"
                placeholder="Enter Referees last name"
            />

            <input 
                onChange={(e) => setNewPosition(e.target.value)}
                className="newEmployerRefInput"
                placeholder="Enter Referees position"
            />

            <input 
                className="newEmployerRefInput"
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter Referees email"
            />

            <input 
                className="newEmployerRefInput"
                onChange={(e) => setNewImg(e.target.value)}
                placeholder="Enter Referees image"
            />

            <div>
                <button
                    type="submit"
                >
                    Add Reference
                </button>

                <button
                    onClick={() => setAddRef(false)}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
export default AddRef