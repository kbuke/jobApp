import { useState } from "react"
import "./6.07-EditAchievment.css"

function EditAchievment({
    editId,
    editInfo,
    editImg,
    allAchievments,
    setAllAchievements,
    setEditId
}){
    const [newInfo, setNewInfo] = useState(editInfo)
    const [newImg, setNewImg] = useState(editImg)

    const editAchievment = (e) => {
        e.preventDefault()
        fetch(`/projectgoals/${editId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                achievment: newInfo,
                image: newImg
            })
        })
        .then(r => {
            if(r.ok){
                return r.json()
            } else {
                return null
            }
        })
        .then(editedinfo => {
            if(editedinfo){
                setAllAchievements(allAchievments.map(oldAchievments => 
                    oldAchievments.id === editInfo.id ? editInfo : oldAchievments
                ))
            }
        })
        .then(setEditId())
    }

    return(
        <form
            onSubmit={editAchievment}
        >
            <input 
                placeholder="Enter your achievment"
                onChange={(e) => setNewInfo(e.target.value)}
                className="editAchievments"
                value={newInfo}
            />

            <input 
                placeholder="Enter img for achievment"
                onChange={(e) => setNewImg(e.target.value)}
                className="editAchievments"
                value={newImg}
            />

            <div
                id="editAchievmentGrid"
            >
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
export default EditAchievment