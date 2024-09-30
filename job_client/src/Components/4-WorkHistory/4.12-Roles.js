import { useEffect, useState } from "react"

import addRole from "../../assets/plus icon.png"
import editRole from "../../assets/editIcon.png"
import binRole from "../../assets/binIcon.png"

import "./4.12-Roles.css"

function Roles({
    appData,
    selectedBusinessId,
    loggedUser,
}){
    const [filterRoles, setFilterRoles] = useState([])
    const [addRoles, setAddRoles] = useState(false)

    const [newRole, setNewRole] = useState("")
    const [editExistingRole, setEditExistingRole] = useState(false)
    const [selectedRoleId, setSelectedRoleId] = useState()
    const [selectedRoleText, setSelectedRoleText] = useState("")

    console.log(`I have selected business ${selectedBusinessId}`)
    

    const allRoles = appData.allRoles
    const setAllRoles = appData.setAllRoles

    console.log(allRoles)

    useEffect(() => {
        setFilterRoles(allRoles.filter(role => role.employer_id === selectedBusinessId))
    }, [allRoles])

    console.log(filterRoles)

    //Handle edit role logic
    const handleNewRole = (e) => {
        e.preventDefault()
        const jsonData = {
            newRole, 
            selectedBusinessId
        }
        fetch("/employerroles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newRole => {
                setAllRoles([...allRoles, newRole])
            })
            .then(setAddRoles(false))
    }

    const handleEditClick = (roleId, roleTxt) => {
        setEditExistingRole(true)
        setSelectedRoleId(roleId)
        setSelectedRoleText(roleTxt)
    }

    const handlePatch = (e) => {
        e.preventDefault()
        fetch(`/employerroles/${selectedRoleId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                role: selectedRoleText
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
        .then(newJobRole => {
            if(newJobRole){
                setAllRoles(allRoles.map(oldJobRole => 
                    oldJobRole.id === newJobRole.id? newJobRole : oldJobRole
                ))
                setEditExistingRole(false)
            }
        })
    }

    console.log(`I have chosen id ${selectedRoleId}, and am trying to edit its post ${editExistingRole}`)

    //Handle delete logic
    const handleDelete = (e) => {
        e.preventDefault()
        console.log(`I am trying to delete role ${selectedRoleId}`)
        fetch(`/employerroles/${selectedRoleId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllRoles(roles => roles.filter(role => role.id !== selectedRoleId))
                }
            })
    }

    const renderRoles = filterRoles.map((role, index) => (
        loggedUser ?
            <div
                id="jobRoleUserGrid"
                key={index}
            >
                <li>
                    {editExistingRole && role.id === selectedRoleId ?
                        <input 
                            type="text"
                            id="editRoleInput"
                            value={selectedRoleText}
                            onChange={(e) => setSelectedRoleText(e.target.value)}
                        />
                        :
                        role.role
                    }
                </li>

                <div>
                    {editExistingRole && role.id === selectedRoleId?
                        <>
                            <button
                                onClick={handlePatch}
                            >
                                Submit Edit
                            </button>

                            <button
                                onClick={() => setEditExistingRole(false)}
                            >
                                Cancel Edit
                            </button>
                        </>    
                        :
                        <>
                            <div
                                className="jobRoleUserIconContainer"
                                onClick={() => handleEditClick(role.id, role.role)}
                                key={index}
                            >
                                <img 
                                    src={editRole}
                                    className="jobRoleUserIcon"
                                    alt="editJobRoleIcon"
                                />
                            </div>

                            <div
                                className="jobRoleUserIconContainer"
                                onClick={() => setSelectedRoleId(role.id)}
                            >
                                <img 
                                    src={binRole}
                                    className="jobRoleUserIcon"
                                    onClick={handleDelete}
                                    alt="deleteJobRole"
                                />
                            </div>
                        </>
                    }
                </div>
            </div>
            :
            <li
                key={index}
                id="renderedEmployedRoles"
            >
                {role.role}
            </li>
    ))

    return(
        <div>
            <ul>
                {renderRoles}

                {addRoles ? 
                    <>
                        <input 
                            type="text"
                            onChange={(e) => setNewRole(e.target.value)}
                        />

                        <button
                            onClick={handleNewRole}
                        >
                            Create new role
                        </button> 

                        <button
                            onClick={() => setAddRoles(false)}
                        >
                            Cancel new role
                        </button>
                    </>
                    : 
                    null
                }
            </ul>
            {loggedUser ?
                <div
                    id="roleButtonsWrapper"
                >
                    <div
                        id="addRolesIconContainer"
                        onClick={() => setAddRoles(true)}
                    >
                        <img 
                            id="addRoleIcon"
                            src={addRole}
                            alt="editRoleIcon"
                        />
                    </div>
                </div>
            :
                null
            }
        </div>
    )
}
export default Roles