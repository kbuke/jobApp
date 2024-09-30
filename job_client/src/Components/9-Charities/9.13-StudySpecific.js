import { useEffect, useState } from "react"
import "./9.13-StudySpecific.css"

import addNewRoleIcon from "../../assets/plus icon.png"
import editRoleIcon from "../../assets/editIcon.png"
import deleteRoleIcon from "../../assets/binIcon.png"

import AddCharityStudyRole from "./9.14-AddCharityStudy"
import EditStudyRole from "./9.19-EditStudyRole"
import DeleteStudyRole from "./9.20-DeleteStudyRole"

function SpecificStudy({
    selectedCaseStudyId,
    selectedCaseStudyImg,
    selectedCaseStudyName,
    loggedUser,
    caseStudyRoles,
    setCaseStudyRoles
}){
    console.log(`I have selected case study ${selectedCaseStudyId}`)

    const [filterRoles, setFilterRoles] = useState([])
    const [addRoles, setAddRoles] = useState(false)

    const [editRoleId, setEditRoleId] = useState()
    const [editRole, setEditRole] = useState("")

    const [deleteRoleId, setDeleteRoleId] = useState()

    console.log(caseStudyRoles)

    useEffect(() => {
        setFilterRoles(caseStudyRoles.filter(roles => selectedCaseStudyId === roles.case_study_id))
    }, [])

    console.log(filterRoles)

    const handleEditRole = (roleId, role) => {
        setEditRoleId(roleId)
        setEditRole(role)
    }

    const renderRoles = filterRoles.map((role, index) => (
        loggedUser ?
            <div>
                {editRoleId === role.id?
                    <EditStudyRole 
                        editRole={editRole}
                        setCaseStudyRoles={setCaseStudyRoles}
                        caseStudyRoles={caseStudyRoles}
                        editRoleId={editRoleId}
                        setEditRoleId={setEditRoleId}
                    />
                :
                <>
                    <li
                        key={index}
                        className="charityStudyRole"
                    >
                        {role.role}
                    </li>

                    {deleteRoleId === role.id ?
                        <DeleteStudyRole 
                            deleteRoleId={deleteRoleId}
                            setDeleteRoleId={setDeleteRoleId}
                            setCaseStudyRoles={setCaseStudyRoles}
                        />
                    :
                        <div
                            className="studyRoleButtonContainer"
                        >
                            <button
                                className="studyRoleButton"
                            >
                                <img 
                                    className="studyRoleButtonImg"
                                    src={editRoleIcon}
                                    onClick={() => handleEditRole(role.id, role.role)}
                                    alt="editRoleIcon"
                                />
                            </button>

                            <button
                                className="studyRoleButton"
                            >
                                <img 
                                    className="studyRoleButtonImg"
                                    src={deleteRoleIcon}
                                    onClick={() => setDeleteRoleId(role.id)}
                                    alt="deleteRoleIcon"
                                />
                            </button>
                        </div>
                    }
                </>
                }
            </div>
        :
            <li
                key={index}
                className="charityStudyRole"
            >
                {role.role}
            </li>
    ))

    const addRole = 
        <div
            className="addCharityStudyIconContainer"
            onClick={() => setAddRoles(true)}
        >
            <img 
                src={addNewRoleIcon}
                className="addCharityStudyIcon"
                alt="addNewRoleIcon"
            />
        </div>
    
    return(
        <div id="specificCharityStudyContainer">
            <div id="caseStudySpecificRightContainer">
                <h2 className="specificCharityStudyTitle">
                    {selectedCaseStudyName}
                </h2>

                {/* Wrap the list */}
                <div id="caseStudyRolesWrapper">
                    <ul id="caseStudyRoles">
                        {renderRoles}
                    </ul>
                </div>

                {loggedUser ? addRole : null}

                {addRoles ?
                    <AddCharityStudyRole 
                        setAddRoles={setAddRoles}
                        selectedCaseStudyId={selectedCaseStudyId}
                        caseStudyRoles={caseStudyRoles}
                        setCaseStudyRoles={setCaseStudyRoles}
                    />
                    :
                    null
                }
            </div>

            <div id="caseStudySpecificImgContainer">
                <img 
                    src={selectedCaseStudyImg} 
                    id="caseStudySpecificImg"
                    alt="specificStudyImg" 
                />
            </div>
        </div>
    )
}
export default SpecificStudy