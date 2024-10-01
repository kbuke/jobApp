import { useState } from "react"

import "./9.06-AddNewCharityRole.css"

function AddCharityRole({
    setAddNewRole,
    selectedCharityId,
    allRoles,
    setAllRoles
}){
    console.log(allRoles)
    console.log(`I have selected charity ${selectedCharityId}`)
    console.log(setAllRoles)

    const [newRole, setNewRole] = useState("")

    console.log(newRole)

    const addNewRole = (e) => {
        e.preventDefault()
        const jsonData = {
            newRole,
            selectedCharityId
        }
        fetch("/employerroles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newCharityRole => {
                setAllRoles([...allRoles, newCharityRole])
            })
            .then(setAddNewRole(false))
    }

    return(
        <form
            onSubmit={addNewRole}
            id="newCharityForm"
        >
            <input 
                type="text"
                onChange={(e) => setNewRole(e.target.value)}
                id="newCharityRoleInput"
                placeholder="Enter new role"
            />

            <div>
                <button
                    type="submit"
                >
                    Add Role
                </button>

                <button
                    onClick={() => setAddNewRole(false)}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
export default AddCharityRole