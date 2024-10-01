import { useEffect, useState } from "react"

import addRefIcon from "../../assets/plus icon.png"
import editRefIcon from "../../assets/editIcon.png"
import deleteRefIcon from "../../assets/binIcon.png"

import AddRef from "./4.19-AddRef"
import EditRef from "./4.20-EditRef"

import "./4.15-JobRef.css"

function JobRef({
    appData,
    selectedBusinessId,
    loggedUser
}){
    const [filterReferences, setFilterReferences] = useState([])

    const [addNewRef, setAddNewRef] = useState(false)

    const [editId, setEditId] = useState()
    const [editTitle, setEditTitle] = useState("")
    const [editFirstName, setEditFirstName] = useState("")
    const [editLastName, setEditLastName] = useState("")
    const [editPosition, setEditPosition] = useState("")
    const [editEmail, setEditEmail] = useState("")
    const [editImg, setEditImg] = useState("")

    const [deleteId, setDeleteId] = useState()

    const handleEdit = (
        refId, 
        refTitle, 
        refFirstName, 
        refLastName, 
        refPosition, 
        refEmail, 
        refImg
    ) => {
        setEditId(refId)
        setEditTitle(refTitle)
        setEditFirstName(refFirstName)
        setEditLastName(refLastName)
        setEditPosition(refPosition)
        setEditEmail(refEmail)
        setEditImg(refImg)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/employerreference/${deleteId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllReferences(references => references.filter(reference => reference.id !== deleteId))
                }
            })
            .then(setDeleteId())
    }

    const allReferences = appData.allReferences
    const setAllReferences = appData.setAllReferences

    console.log(allReferences)

    useEffect(() => (
        setFilterReferences(allReferences.filter(reference => reference.employer_id === selectedBusinessId))
    ), [allReferences, selectedBusinessId])

    console.log(filterReferences)

    const referenceIndex = filterReferences[0]

    const addRef = 
        <div
            className="addRefContainer"
            onClick={() => setAddNewRef(true)}
        >
            <img 
                id="addRefImg"
                src={addRefIcon}
                alt="addRefIcon"
            />
        </div>

    return(
        <div
            id="specificJobRef"
        >
            {filterReferences.length === 1 ?
                editId ?
                    <EditRef 
                        setAllReferences={setAllReferences}
                        allReferences={allReferences}
                        editId={editId}
                        setEditId={setEditId}
                        editTitle={editTitle}
                        editFirstName={editFirstName}
                        editLastName={editLastName}
                        editPosition={editPosition}
                        editEmail={editEmail}
                        editImg={editImg}
                    />
                    :
                    <>
                        <h3
                            className="refName"
                        >
                            {referenceIndex.title} {referenceIndex.first_name} {referenceIndex.last_name}
                        </h3>

                        <h5
                            className="refPosition"
                        >
                            {referenceIndex.position} At {referenceIndex.employer.name}
                        </h5>

                        <div
                            className="refImgContainer"
                        >
                            <img 
                                src={referenceIndex.reference_image}
                                alt={`${referenceIndex.title} Logo`}
                            />
                        </div>

                        <h3
                            className="refEmail"
                        >
                            {referenceIndex.email}
                        </h3>

                        <div
                            id="editRefButtonContainer"
                        >
                            {deleteId ?
                                <form
                                    onSubmit={handleDelete}
                                >
                                    <h3>Confirm Delete</h3>

                                    <div>
                                        <button
                                            type="submit"
                                        >
                                            Delete
                                        </button>

                                        <button
                                            onClick={() => setDeleteId()}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                                :
                                <>
                                    <button
                                        className="editRefButton"
                                        onClick={() => handleEdit(
                                            referenceIndex.id, 
                                            referenceIndex.title,
                                            referenceIndex.first_name,
                                            referenceIndex.last_name,
                                            referenceIndex.position,
                                            referenceIndex.email,
                                            referenceIndex.reference_image
                                        )}
                                    >
                                        <img 
                                            className="editRefButtonIcon"
                                            src={editRefIcon}
                                            alt="editRef"
                                        />
                                    </button>

                                    <button
                                        className="editRefButton" 
                                        onClick={() => setDeleteId(referenceIndex.id)} 
                                    >
                                        <img 
                                            className="editRefButtonIcon"
                                            src={deleteRefIcon}
                                            alt="deleteRef"
                                        />
                                    </button>
                                </>
                            }
                        </div>
                    </>
                :
                addNewRef ?
                    <AddRef 
                        selectedBusinessId={selectedBusinessId}
                        allReferences={allReferences}
                        setAllReferences={setAllReferences}
                        setAddNewRef={setAddNewRef}
                    />
                    :
                    <div
                        id="extraRefContainer"
                    >
                        <h3>No References Available</h3>
                        {loggedUser ? 
                            addRef 
                            :
                            null
                        }
                    </div>
            }
        </div>
    )
}
export default JobRef