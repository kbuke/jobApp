import "./4.16-SpecificCaseStudy.css"

import EditSpecificStudyRole from "./4.18-EditSpecificStudyRole"

import backButton from "../../assets/backArrow.png"
import addRoleIcon from "../../assets/plus icon.png"

import editRoleIcon from "../../assets/editIcon.png"
import deleteRoleIcon from "../../assets/binIcon.png"

import { useEffect, useState } from "react"

function SpecificCaseStudy({
    selectCaseStudyId,
    setSelectCaseStudyId,
    selectedCaseStudyName,
    selectedCaseStudyImg,
    appData,
    loggedUser
}){
    const caseStudyRoles = appData.caseStudyRoles
    const setCaseStudyRoles = appData.setCaseStudyRoles

    const [filterRoles, setFilterRoles] = useState([])
    const [addRoles, setAddRoles] = useState(false)
    const [newRole, setNewRole] = useState("")

    const [editRoleId, setEditRoleId] = useState()
    const [editRole, setEditRole] = useState("")

    const [deleteRoleId, setDeleteRoleId] = useState()

    useEffect(() => (
        setFilterRoles(caseStudyRoles.filter(roles => roles.case_study_id === selectCaseStudyId))
    ), [caseStudyRoles, selectCaseStudyId])

    console.log(filterRoles)

    const backContainer = 
        <div
            id="leaveCaseStudyContainer"
            onClick={() => setSelectCaseStudyId()}
        >
            <img 
                src={backButton}
                id="leaveCaseStudyButton"
                alt="backStudyIcon"
            />
        </div>
    
    const handleEdit = (roleId, role) => {
        setEditRoleId(roleId)
        setEditRole(role)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/workcasestudyrole/${deleteRoleId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok){
                    setCaseStudyRoles(roles => roles.filter(role => role.id !== deleteRoleId))
                }
            })
            .then(setDeleteRoleId())
    }

    const renderRoles = filterRoles.map((role, index) => (
        loggedUser ?
            editRoleId === role.id? 
                <EditSpecificStudyRole 
                    caseStudyRoles={caseStudyRoles}
                    setCaseStudyRoles={setCaseStudyRoles}
                    editRoleId={editRoleId}
                    setEditRoleId={setEditRoleId}
                    editRole={editRole}
                    setEditRole={setEditRole}
                />
                :
                <div
                    id="loggedStudyRole"
                >
                    <li
                        key={index}
                    >
                        {role.role}
                    </li>

                    <div
                        id="editStudySpecificRoleContainer"
                    >
                        {deleteRoleId === role.id ?
                            <>
                                <button
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => setDeleteRoleId()}
                                >
                                    Cancel
                                </button>
                            </>
                            :
                            <>
                                <button
                                    className="editStudySpecificRoleButton"
                                >
                                    <img 
                                        className="editStudySpecificRoleImg"
                                        src={editRoleIcon}
                                        onClick={() => handleEdit(role.id, role.role)}
                                        alt="editStudyRole"
                                    />
                                </button>

                                <button
                                    className="editStudySpecificRoleButton" 
                                    onClick={() => setDeleteRoleId(role.id)}
                                >
                                    <img 
                                        className="editStudySpecificRoleImg"
                                        src={deleteRoleIcon}
                                        alt="deleteRole"
                                    />
                                </button>
                            </>
                        }
                    </div>
                </div>
            :
            <li
                key={index}
            >
                {role.role}
            </li>
    ))

    const addRoleContainer = 
        <div
            id="addRoleIconContainer"
            onClick={() => setAddRoles(!addRoles)}
        >
            <img 
                src={addRoleIcon}
                id="addRoleIcon"
                alt="addRoleIcon"
            />
        </div>

    const handleNewRole = (e) => {
        e.preventDefault()
        const jsonData = {
            newRole,
            selectCaseStudyId
        }
        fetch("/workcasestudyrole", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then(r => r.json())
        .then(newRole => {
            setCaseStudyRoles([...caseStudyRoles, newRole])
        })
        .then(setAddRoles(false))
    }

    return(
        <div
            id="specificCaseStudyRoleContainer"
        >
            <div>
                <div
                    id="caseStudyHeaderGrid"
                >
                    {backContainer}

                    <h2>{selectedCaseStudyName}</h2>
                </div>

                <ul>
                    {renderRoles}
                </ul>

                {addRoles ?
                    <form
                        onSubmit={handleNewRole}
                    >
                        <div
                            id="newRoleGridInput"
                        >
                            <h4>Enter New Role: </h4>
                            <input 
                                type="text"
                                onChange={(e) => setNewRole(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                        >
                            Create Role
                        </button>

                        <button
                            onClick={() => setAddRoles(false)}
                        >
                            Cancel
                        </button>
                    </form>
                    :
                    null
                }

                {loggedUser ?
                    addRoleContainer
                    :
                    null
                }
            </div>

            <div
                id="selectCaseStudyImgContainer"
            >
                <img 
                    src={selectedCaseStudyImg}
                    id="selectCaseStudyImg"
                    alt="selectStudyImg"
                />
            </div>
        </div>
    )
}
export default SpecificCaseStudy