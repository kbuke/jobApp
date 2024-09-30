import "./9.08-CharityReference.css"

import DeleteRef from "./9.09-DeleteRef"
import EditRef from "./9.10-EditRef"
import AddRef from "./9.21-AddRef"

import editRefIcon from "../../assets/editIcon.png"
import deleteRefIcon from "../../assets/binIcon.png"
import addRefIcon from "../../assets/plus icon.png"
import { useState } from "react"

function CharityReference({
    charityReferences,
    allReferences,
    setAllReferences,
    loggedUser,
    selectedCharityId
}){
    const [editRef, setEditRef] = useState(false)
    const [deleteRef, setDeleteRef] = useState(false)
    const [addRef, setAddRef] = useState(false)

    const [selectedRefId, setSelectedRefId] = useState()
    const [selectedGender, setSelectedGender] = useState("")
    const [selectedFirstName, setSelectedFirstName] = useState("")
    const [selectedSecondName, setSelectedSecondName] = useState("")
    const [selectedImg, setSelectedImg] = useState("")
    const [selectedEmail, setSelectedEmail] = useState("")
    const [selectedPosition, setSelectedPosition] = useState("")

    const handleEditLogic = (
        refId,
        refTitle,
        refFirstName,
        refSecondName,
        refImg,
        refPosition,
        refEmail
    ) => {
        setEditRef(true)
        setSelectedRefId(refId)
        setSelectedGender(refTitle)
        setSelectedFirstName(refFirstName)
        setSelectedSecondName(refSecondName)
        setSelectedImg(refImg)
        setSelectedEmail(refEmail)
        setSelectedPosition(refPosition)
    }

    const handleDeleteLogic = (refId) => {
        setDeleteRef(true)
        setSelectedRefId(refId)
    }

    const renderReferenceInfo = charityReferences.length > 0 ?
        charityReferences.map((reference, index) => {
            const refName = `${reference.title} ${reference.first_name} ${reference.last_name}`
            const refPosition = reference.position
            const refImg = reference.reference_image
            const refEmail = reference.email
            return(
                <div key={index}>
                    <h3 id="charityRefName">{refName}</h3>
                    <h4 id="charityRefRole">{refPosition}</h4>
                    <div id="refImgContainer">
                        <img id="refImg" src={refImg} />
                    </div>
                    <h4>{refEmail}</h4>

                    {deleteRef && selectedRefId === reference.id ? (
                        <DeleteRef 
                            selectedRefId={selectedRefId}
                            allReferences={allReferences}
                            setAllReferences={setAllReferences}
                            setDeleteRef={setDeleteRef}
                        />
                    ) : editRef && selectedRefId === reference.id ? (
                        <EditRef 
                            selectedRefId={selectedRefId}
                            selectedGender={selectedGender}
                            selectedFirstName={selectedFirstName}
                            selectedSecondName={selectedSecondName}
                            selectedImg={selectedImg}
                            selectedPosition={selectedPosition}
                            selectedEmail={selectedEmail}
                            setAllReferences={setAllReferences}
                            allReferences={allReferences}
                            setEditRef={setEditRef}
                        />
                    ) : null}

                    {loggedUser && (
                        <div id="charityRefOptionButtonContainer">
                            <button
                                className="charityRefOptionButton"
                                onClick={() => handleEditLogic(
                                    reference.id, 
                                    reference.title,
                                    reference.first_name,
                                    reference.last_name,
                                    reference.reference_image,
                                    reference.position,
                                    reference.email
                                )}
                            >
                                <img 
                                    src={editRefIcon} 
                                    className="charityRefOptionIcon" 
                                    alt="editRefIcon"
                                />
                            </button>
                            <button
                                className="charityRefOptionButton"
                                onClick={() => handleDeleteLogic(reference.id)}
                            >
                                <img 
                                    className="charityRefOptionIcon" 
                                    src={deleteRefIcon} 
                                    alt="charityRefOption"
                                />
                            </button>
                        </div>
                    )}
                </div>
            )
        })
    :
    <div>
        <h2>No References to show</h2>
    </div>

    return (
        <div>
            {renderReferenceInfo}

            {/* Render the AddRef component outside the reference mapping */}
            {addRef ? (
                <AddRef 
                    selectedCharityId={selectedCharityId}
                    setAllReferences={setAllReferences}
                    allReferences={allReferences}
                    setAddRef={setAddRef}
                />
            ) : (
                loggedUser && charityReferences.length === 0 ? (
                    <button
                        className="charityRefOptionButton"
                        onClick={() => setAddRef(true)}
                    >
                        <img src={addRefIcon} className="charityRefOptionIcon" />
                    </button>
                )
                :
                null
            )}
        </div>
    )
}
export default CharityReference