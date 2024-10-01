

function DeleteAchievment({
    deleteId,
    setDeleteId,
    setAllAchievements
}){
    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/projectgoals/${deleteId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllAchievements(goals => goals.filter(goal => goal.id !== deleteId))
                }
            })
            .then(setDeleteId())
    }

    return(
        <form
            onSubmit={handleDelete}
        >
            <h3>Delete Achievment?</h3>

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
    )
}
export default DeleteAchievment