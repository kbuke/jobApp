import "./6.03-DeleteProject.css"

function DeleteProject({
    projectId,
    setDeleteProject,
    setAllProjects,
    setProjectId,
    projectTitle
}){
    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/projects/${projectId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllProjects(projects => projects.filter(project => project.id !== projectId))
                }
            })
            .then(setProjectId())
            .then(setDeleteProject(false))
    }

    const handleDeleteCancellation = () => {
        setDeleteProject(false)
        setProjectId()
    }

    return(
        <form
            id="confirmProjectDeletionGrid"
            onSubmit={handleDelete}
        >
            <h3>
                Delete {projectTitle}?
            </h3>

            <div
                id="confirmProjectDeletionButtonGrid"
            >
                <button
                    type="submit"
                >
                    Yes
                </button>

                <button
                    onClick={handleDeleteCancellation}
                >
                    No
                </button>
            </div>
        </form>
    )
}
export default DeleteProject