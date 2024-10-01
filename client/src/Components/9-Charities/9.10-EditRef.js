import { useState } from "react"

function EditRef({
    selectedRefId,
    selectedGender,
    selectedFirstName,
    selectedSecondName,
    selectedImg,
    selectedPosition,
    selectedEmail,
    setAllReferences,
    allReferences,
    setEditRef
}){
    const [refGender, setRefGender] = useState(selectedGender)
    const [refFirstName, setRefFirstName] = useState(selectedFirstName)
    const [refSecondName, setRefSecondName] = useState(selectedSecondName)
    const [refImg, setRefImg] = useState(selectedImg)
    const [refPosition, setRefPosition] = useState(selectedPosition)
    const [refEmail, setRefEmail] = useState(selectedEmail)
    
    const handlePatch = (e) => {
        e.preventDefault()
        fetch(`/employerreference/${selectedRefId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: refGender,
                first_name: refFirstName,
                last_name: refSecondName,
                reference_image: refImg,
                position: refPosition,
                email: refEmail
            })
        })
        .then(r => {
            if(r.ok) {
                return r.json()
            } else {
                console.error("Failed to update reference")
                return null 
            }
        })
        .then(updatedRef => {
            if(updatedRef){
                setAllReferences(allReferences.map(oldRef => 
                    oldRef.id === updatedRef.id ? updatedRef : oldRef
                ))
                setEditRef(false)
            }
        })
    }

    return(
        <form
            onSubmit={handlePatch}
        >
            <input 
                type="text"
                className="updatedRefInput"
                onChange={(e) => setRefGender}
                value={refGender}
            />

            <input 
                type="text"
                className="updatedRefInput"
                onChange={(e) => setRefFirstName(e.target.value)}
                value={refFirstName}
            />

            <input 
                type="text"
                className="updatedRefInput"
                onChange={(e) => setRefSecondName(e.target.value)}
                value={refSecondName}
            />

            <input 
                type="text"
                className="updatedRefInput"
                onChange={(e) => setRefEmail(e.target.value)}
                value={refEmail}
            />

            <input 
                type="text"
                className="updatedRefInput"
                onChange={(e) => setRefImg(e.target.value)}
                value={refImg}
            />

            <input 
                type="text"
                className="updatedRefInput"
                onChange={(e) => setRefPosition(e.target.value)}
                value={refPosition}
            />

            <div>
                <button
                    type="submit"
                >
                    Make Edits
                </button>

                <button
                    onClick={() => setEditRef(false)}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
export default EditRef