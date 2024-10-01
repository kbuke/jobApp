import { useState } from "react"


function EditCharityRole({
    editRoleId,
    setEditRoleId,
    editRole,
    allRoles,
    setAllRoles
}){
    const [newRole, setNewRole] = useState(editRole)

    const handleEdit = (e) => {
        e.preventDefault()
        fetch(`/employerroles/${editRoleId}`, {
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
        .then(newCharityRole => {
            if(newCharityRole){
                setAllRoles(allRoles.map(oldCharityRole => 
                    oldCharityRole.id === newCharityRole.id ? newCharityRole : oldCharityRole
                ))
                setEditRoleId()
            }
        })
    }

    return(
        <form
            onSubmit={handleEdit}
        >
            <input 
                onChange={(e) => setNewRole(e.target.value)}
                type="text"
                value={newRole}
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
export default EditCharityRole