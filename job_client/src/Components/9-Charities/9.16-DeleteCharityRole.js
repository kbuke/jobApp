

function DeleteCharityRole({
    deleteRoleId,
    setDeleteRoleId,
    setAllRoles
}){
    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/employerroles/${deleteRoleId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok){
                    setAllRoles(roles => roles.filter(role => role.id !== deleteRoleId))
                }
            })
            .then(setDeleteRoleId())
    }

    return(
        <form
            onSubmit={handleDelete}
        >
            <h4>Delete Role?</h4>

            <div>
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
            </div>
        </form>
    )
}
export default DeleteCharityRole