import { useState } from "react"


function EditPrevWork({
    allEmployers,
    setAllEmployers,
    editBusinessId,
    setEditBusinessId,
    editBusinessName,
    editBusinessLogo,
    editBusinessRole,
    editBusinessDescription,
    editStartDate,
    editEndDate
}){
    const [updateName, setUpdateName] = useState(editBusinessName)
    const [updateLogo, setUpdateLogo] = useState(editBusinessLogo)
    const [updateRole, setUpdateRole] = useState(editBusinessRole)
    const [updateDescription, setUpdateDescription] = useState(editBusinessDescription)
    const [updateStartDate, setUpdateStartDate] = useState(editStartDate)
    const [updateEndDate, setUpdateEndDate] = useState(editEndDate)

    const handleEdit = (e) => {
        e.preventDefault()
        fetch(`/employers//${editBusinessId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: updateName,
                logo: updateLogo,
                start_date: updateStartDate,
                end_date: updateEndDate,
                role: updateRole,
                role_description: updateDescription
            })
        })
        .then(r => {
            if(r.ok) {
                return r.json()
            } else {
                console.error("Failed to update prev work")
                return null 
            }
        })
        .then(updateJob => {
            if(updateJob){
                setAllEmployers(allEmployers.map(oldJob => 
                    oldJob.id === updateJob.id ? updateJob : oldJob
                ))
                setEditBusinessId()
            }
        })
    }

    return(
        <form
            onSubmit={handleEdit}
        >
            <input 
                placeholder="Enter company name"
                onChange={(e) => setUpdateName(e.target.value)}
                className="editPrevWorkContainer"
                value={updateName}
            />

            <input 
                placeholder="Enter company logo"
                onChange={(e) => setUpdateLogo(e.target.value)}
                className="editPrevWorkContainer"
                value={updateLogo}
            />

            <input 
                placeholder="Enter Company role"
                className="editPrevWorkContainer"
                onChange={(e) => setUpdateRole(e.target.value)}
                value={updateRole}
            />

            <input 
                placeholder="Enter Company Description"
                className="editPrevWorkContainer"
                onChange={(e) => setUpdateDescription(e.target.value)}
                value={updateDescription}
            />

            <input 
                className="editPrevWorkContainer"
                placeholder="Enter Start Date"
                type="date"
                onChange={(e) => setUpdateStartDate(e.target.value)}
                value={updateStartDate}
            />

            <input 
                className="editPrevWorkContainer"
                placeholder="Enter End Date"
                type="date"
                onChange={(e) => setUpdateEndDate(e.target.value)}
                value={updateEndDate}
            />

            <div>
                <button
                    type="submit"
                >
                    Edit
                </button>

                <button
                    onClick={() => setEditBusinessId()}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
export default EditPrevWork