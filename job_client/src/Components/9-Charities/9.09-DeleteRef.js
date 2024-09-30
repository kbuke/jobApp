

function DeleteRef({
    selectedRefId,
    setAllReferences,
    setDeleteRef
}){
    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/employerreference/${selectedRefId}`, {
            method: "DELETE"    
        })
            .then(r => {
                if(r.ok) {
                    setAllReferences(references => references.filter(reference => reference.id !== selectedRefId))
                }
            })
    }

    return(
        <form
            onSubmit={handleDelete}
        >
            <h3>Delete Reference?</h3>

            <>
                <button
                    type="submit"
                >
                    Delete
                </button>

                <button
                    onClick={() => setDeleteRef(false)}
                >
                    Cancel
                </button>
            </>
        </form>
    )
}
export default DeleteRef