import { useState } from "react"


function EditSpecificStudyRole({
    caseStudyRoles,
    setCaseStudyRoles,
    editRoleId,
    setEditRoleId,
    editRole
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
            if(r.ok) {
                return r.json()
            } else {
                console.error("Failed to update role")
                return null 
            }
        })
        .then(updatedRole => {
            if(updatedRole){
                setCaseStudyRoles(caseStudyRoles.map(oldRoles => 
                    oldRoles.id === updatedRole.id ? updatedRole : oldRoles
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
                type="text"
                value={newRole}
                placeholder="Enter your role"
                onChange={(e) => setNewRole(e.target.value)}
            />

            <div>
                <button
                    type="submit"
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
export default EditSpecificStudyRole