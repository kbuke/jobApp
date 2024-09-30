

function DeleteCharity({
    setDeleteCharity,
    selectedCharityId,
    setSelectedCharityId,
    selectedCharityName,
    setAllCharities
}){
    console.log(selectedCharityId)
    const handleCancel = () => {
        setDeleteCharity(false)
        setSelectedCharityId()
    }
    
    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/charities/${selectedCharityId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllCharities(charities => charities.filter(charity => charity.id !== selectedCharityId))
                }
            })
            .then(setSelectedCharityId())
            .then(setDeleteCharity(false))
    }
    
    return(
        <div>
            <h3>Delete {selectedCharityName}?</h3>

            <div>
                <button
                    onClick={handleDelete}
                >
                    Delete
                </button>

                <button
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
export default DeleteCharity