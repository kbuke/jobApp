

function DeleteStudyRole({
    deleteRoleId,
    setDeleteRoleId,
    setCaseStudyRoles
}){
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
    
    return(
        <form
            onSubmit={handleDelete}
        >
            <h3>Confirm Deletion</h3>

            <button
                type="submit"
            >
                Delete
            </button>

            <button
                onClick={() => setDeleteRoleId()}
            >
                Cancel
            </button>
        </form>
    )
}
export default DeleteStudyRole