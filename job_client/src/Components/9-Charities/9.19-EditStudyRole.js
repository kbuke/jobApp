import { useState } from "react"


function EditStudyRole({
    editRole,
    setCaseStudyRoles,
    caseStudyRoles,
    editRoleId,
    setEditRoleId
}){
    const [newRole, setNewRole] = useState(editRole)

    const handlePatch = (e) => {
        e.preventDefault()
        fetch(`/workcasestudyrole/${editRoleId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                role: newRole
            })
        })
        .then(r => {
            if(r.ok){
                return r.json()
            } else {
                console.error("Failed to update role")
                return null 
            }
        })
        .then(updateRole => {
            if(updateRole) {
                setCaseStudyRoles(caseStudyRoles.map(oldRole => 
                    oldRole.id === updateRole.id? updateRole : oldRole
                ))
                setEditRoleId()
            }
        })
    }
    return(
        <form
            onSubmit={handlePatch}
        >
            <input 
                placeholder="Enter your role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
            />
            <div>
                <button
                    type="SUBMIT"
                >
                    Edit
                </button>

                <button
                    onClick={() => setEditRoleId()}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
export default EditStudyRole