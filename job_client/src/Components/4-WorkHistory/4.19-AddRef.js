import { useState } from "react"


function AddRef({
    selectedBusinessId,
    allReferences,
    setAllReferences,
    setAddNewRef
}){
    const [newTitle, setNewTitle] = useState("")
    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newPosition, setNewPosition] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newImg, setNewImg] = useState("")

    console.log(allReferences)


    const handleNewRef = (e) => {
        e.preventDefault()
        const jsonData = {
            newTitle, 
            newFirstName,
            newLastName,
            newPosition,
            newEmail,
            newImg,
            employer_id: selectedBusinessId
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
            .then(setAddNewRef(false))
    }

    return(
        <form
            id="newRefForm"
            onSubmit={handleNewRef}
        >
            <input 
                className="newRefInput"
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter Ref Gender (Mr/Mrs)"
            />

            <input 
                className="newRefInput"
                onChange={(e) => setNewFirstName(e.target.value)}
                placeholder="Enter first name"
            />

            <input 
                className="newRefInput"
                onChange={(e) => setNewLastName(e.target.value)}
                placeholder="Enter last name"
            />

            <input 
                className="newRefInput"
                onChange={(e) => setNewPosition(e.target.value)}
                placeholder="Enter position in company"
            />

            <input 
                className="newRefInput"
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter references email"
            />

            <input 
                className="newRefInput"
                onChange={(e) => setNewImg(e.target.value)}
                placeholder="Enter references image"
            />
            
            <div>
                <button
                    type="submit"
                >
                    Add Ref
                </button>

                <button>
                    Cancel
                </button>
            </div>
        </form>
    )
}
export default AddRef