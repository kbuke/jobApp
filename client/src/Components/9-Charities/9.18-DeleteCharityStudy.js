

function DeleteCharityStudy({
    setAllCaseStudies,
    deleteStudyId,
    setDeleteStudyId
}){
    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/employercasestudy/${deleteStudyId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllCaseStudies(studies => studies.filter(study => study.id !== deleteStudyId))
                }
            })
            .then(setDeleteStudyId())
    }

    return(
        <form
            onSubmit={handleDelete}
        >
            <h3>Delete?</h3>
            <button
                type="submit"
            >
                Delete
            </button>

            <button
                onClick={() => setDeleteStudyId()}
            >
                Cancel
            </button>
        </form>
    )
}
export default DeleteCharityStudy