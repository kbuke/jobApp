import { useState } from "react"

import "./9.03-EditCharityInfo.css"

function EditCharityInfo({
    setEditCharity,
    selectedCharityId,
    setSelectedCharityId,
    selectedCharityName,
    allCharities,
    setAllCharities,
    selectedRole,
    selectedLogo,
    selectedCharityDescription,
    selectedStartDate,
    selectedEndDate
}){
    const [editName, setEditName] = useState(selectedCharityName)
    const [editLogo, setEditLogo] = useState(selectedLogo)
    const [editRole, setEditRole] = useState(selectedRole)
    const [editDescription, setEditDescription] = useState(selectedCharityDescription)
    const [editStartDate, setEditStartDate] = useState(selectedStartDate)
    const [editEndDate, setEditEndDate] = useState(selectedEndDate)
    const [isPresent, setIsPresent] = useState(selectedEndDate === "present")

    const handleCancel = () => {
        setSelectedCharityId()
        setEditCharity(false)
    }

    console.log(`I have selected ${selectedCharityId}`)

    const handleEdit = (e) => {
        e.preventDefault();
        const updatedEndDate = isPresent ? "Present" : editEndDate;
        console.log({
           name: editName,
           logo: editLogo,
           charity_description: editDescription,
           role: editRole,
           start_date: editStartDate,
           end_date: updatedEndDate 
        });
        console.log(`Sending a request to /charities/${selectedCharityId}`)
    
        fetch(`/charities/${selectedCharityId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               name: editName,
               logo: editLogo,
               charity_description: editDescription,
               role: editRole,
               start_date: editStartDate,
               end_date: updatedEndDate 
            })
        })
        .then(r => {
            if (r.ok) {
                return r.json();
            } else {
                return null;
            }
        })
        .then(newCharityInfo => {
            if (newCharityInfo) {
                setAllCharities(allCharities.map(oldCharityInfo =>
                    oldCharityInfo.id === newCharityInfo.id ? newCharityInfo : oldCharityInfo
                ));
                setSelectedCharityId();
                setEditCharity(false);
            }
        });
    }
    

    return(
        <form
            id="editCharityForm"
            onSubmit={handleEdit}
        >
            <h3>Edit {selectedCharityName}'s Info</h3>

            <input 
                type="text"
                onChange={(e) => setEditName(e.target.value)}
                value={editName}
                className="editCharityInputs"
            />

            <input 
                type="text"
                onChange={(e) => setEditLogo(e.target.value)}
                value={editLogo}
                className="editCharityInputs"
            />

            <input 
                type="text"
                onChange={(e) => setEditRole(e.target.value)}
                value={editRole}
                className="editCharityInputs"
            />

            <input 
                type="text"
                onChange={(e) => setEditDescription(e.target.value)}
                value={editDescription}
                className="editCharityInputs"
            />

            <input 
                type="date"
                onChange={(e) => setEditStartDate(e.target.value)}
                value={editStartDate}
                className="editCharityInputs"
            />

            {!isPresent && (
                <input 
                    type="date"
                    onChange={(e) => setEditEndDate(e.target.value)}
                    value={editEndDate}
                    className="editCharityInputs"
                />
            )}

<           label>
                <input 
                    type="checkbox"
                    checked={isPresent}
                    onChange={() => setIsPresent(!isPresent)}
                />
                Present
            </label>

            <div
                className="editCharityButtonContainer"
            >
                <button
                    className="editCharityButtons"
                >
                    Make Changes
                </button>

                <button
                    className="editCharityButtons"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>

        </form>
    )
}

export default EditCharityInfo
