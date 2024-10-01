import "./9.05-CharityRoles.css"

import AddCharityRole from "./9.06-AddNewCharityRole"
import EditCharityRole from "./9.15-EditCharityRole"
import DeleteCharityRole from "./9.16-DeleteCharityRole"

import addCharityRoleIcon from "../../assets/plus icon.png"
import editCharityRoleIcon from "../../assets/editIcon.png"
import deleteCharityRoleIcon from "../../assets/binIcon.png"

import { useState } from "react"

function CharityRoles({
    selectedCharityId,
    charityResponsibilities,
    loggedUser,
    allRoles,
    setAllRoles
}){
    console.log(charityResponsibilities)

    const [addNewRole, setAddNewRole] = useState(false)

    const [editRoleId, setEditRoleId] = useState()
    const [editRole, setEditRole] = useState("")

    const [deleteRoleId, setDeleteRoleId] = useState()

    const handleEditRole = (roleId, role) => {
        setEditRoleId(roleId)
        setEditRole(role)
    }

    const renderRoles = charityResponsibilities.map((role, index) => (
        loggedUser ?
            editRoleId === role.id ? 
                <EditCharityRole 
                    editRoleId={editRoleId}
                    setEditRoleId={setEditRoleId}
                    editRole={editRole}
                    allRoles={allRoles}
                    setAllRoles={setAllRoles}
                />
                :
                <div
                    id="loggedCharityRoleContainer"
                >
                    <li>
                        {role.role}
                    </li>

                    {deleteRoleId === role.id? 
                        <DeleteCharityRole 
                            deleteRoleId={deleteRoleId}
                            setDeleteRoleId={setDeleteRoleId}
                            setAllRoles={setAllRoles}
                        />
                    :
                        <div
                            id="charityRoleIconsContainer"
                        >
                            <button
                                className="charityRoleButtonContainer"
                                onClick={() => handleEditRole(role.id, role.role)}
                            >
                                <img 
                                    src={editCharityRoleIcon}
                                    className="charityRoleButtonIcon"
                                    alt="editCharityRoleIcon"
                                />
                            </button>

                            <button
                                className="charityRoleButtonContainer"
                                onClick={() => setDeleteRoleId(role.id)}
                            >
                                <img 
                                    src={deleteCharityRoleIcon}
                                    className="charityRoleButtonIcon"
                                    alt="deleteCharityRoleIcon"
                                />
                            </button>
                        </div>
                    }
                </div>
        :
            <li
                key={index}
                className="renderedRolesList"
            >
                {role.role}
            </li>
    ))

    const renderAddButton = 
        <div
            id="addCharityIconContainer"
            onClick={() => setAddNewRole(true)}
        >
            <img 
                id="addCharityIcon"
                src={addCharityRoleIcon}
                alt="addCharityRoleIcon"
            />
        </div>

    return(
        <>
            <ul
                id="rolesListContainer"
            >
                {renderRoles}
            </ul>

            {addNewRole ?
                <AddCharityRole 
                    setAddNewRole={setAddNewRole}
                    selectedCharityId={selectedCharityId}
                    allRoles={allRoles}
                    setAllRoles={setAllRoles}
                />
                :
                null
            }

            {loggedUser ?
                renderAddButton
                :
                null
            }
        </>
    )
}
export default CharityRoles