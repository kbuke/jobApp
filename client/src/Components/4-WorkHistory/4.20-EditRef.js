import { useState } from "react"


function EditRef({
    setAllReferences,
    allReferences,
    editId,
    setEditId,
    editTitle,
    editFirstName,
    editLastName,
    editPosition,
    editEmail,
    editImg
}){
    const [newTitle, setNewTitle] = useState(editTitle)
    const [newFirstName, setNewFirstName] = useState(editFirstName)
    const [newLastName, setNewLastName] = useState(editLastName)
    const [newPosition, setNewPosition] = useState(editPosition)
    const [newEmail, setNewEmail] = useState(editEmail)
    const [newImg, setNewImg] = useState(editImg)

    const handleEdit = (e) => {
        e.preventDefault()
        fetch(`/employerreference/${editId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTitle,
                first_name: newFirstName,
                last_name: newLastName,
                position: newPosition,
                email: newEmail,
                reference_image: newImg
            })
        })
        .then(r => {
            if(r.ok){
                return r.json()
            } else {
                console.error("Failed to update reference")
                return null 
            }
        })
        .then(updateRef => {
            if(updateRef){
                setAllReferences(allReferences.map(oldRef => 
                    oldRef.id === updateRef.id ? updateRef : oldRef
                ))

            }
        })
        .then(setEditId())
    }

    return (
        <form
            onSubmit={handleEdit}
        >
            <input 
                className="editRefContainer"
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter Title (Mr/Mrs)"
                value={newTitle}
            />

            <input 
                className="editRefContainer"
                onChange={(e) =>setNewFirstName(e.target.value)}
                placeholder="Enter first name"
                value={newFirstName}
            />

            <input 
                className="editRefContainer"
                onChange={(e) => setNewLastName(e.target.value)}
                placeholder="Enter last name"
                value={newLastName}
            />

            <input 
                className="editRefContainer"
                onChange={(e) => setNewPosition(e.target.value)}
                placeholder="Enter position"
                value={newPosition}
            />

            <input 
                className="editRefContainer"
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter email"
                value={newEmail}
            />

            <input 
                className="editRefContainer"
                onChange={(e) => setNewImg(e.target.value)}
                placeholder="Enter image"
                value={newImg}
            />

            <div>
                <button
                    type="submit"
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
export default EditRef