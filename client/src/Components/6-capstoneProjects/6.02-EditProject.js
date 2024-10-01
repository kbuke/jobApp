import { useState } from "react"
import "./6.02-EditProjects.css"

function EditProject({
    projectId,
    projectTitle,
    projectImg,
    projectDescription,
    projectDate,
    projectGitLink,
    projectBlogLink,
    setEditProject,
    allProjects,
    setAllProjects
}){
    const [editTitle, setEditTitle] = useState(projectTitle)
    const [editImg, setEditImg] = useState(projectImg)
    const [editDescription, setEditDescription] = useState(projectDescription)
    const [editDate, setEditDate] = useState(projectDate)
    const [editGit, setEditGit] = useState(projectGitLink)
    const [editBlog, setEditBlog] = useState(projectBlogLink)

    const handleEdit = (e) => {
        fetch(`/projects/${projectId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: editTitle,
                git_hub_link: editGit,
                description: editDescription,
                blog_link: editBlog,
                date: editDate,
                image: editImg
            })
        })
        .then(r => {
            if(r.ok) {
                return r.json()
            } else {
                return null 
            }
        })
        .then(editedInfo => {
            if(editedInfo) {
                setAllProjects(allProjects.map(oldProjectInfo => 
                    oldProjectInfo.id === editedInfo.id ? editedInfo : oldProjectInfo
                ))
            }
        })
        .then(setEditProject(false))
    }

    return(
        <form
            id="editProjectForm"
            onSubmit={handleEdit}
        >
            <h1>Edit {projectTitle} Info</h1>

            <input 
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="editProjectInfo"
            />

            <input 
                value={editImg}
                onChange={(e) => setEditImg(e.target.value)}
                className="editProjectInfo"
            />

            <input 
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="editProjectInfo"
            />

            <input 
                value={editDate}
                type="date"
                onChange={(e) => setEditDate(e.target.value)}
                className="editProjectInfo"
            />

            <input 
                value={editGit}
                placeholder="Enter Git Link"
                onChange={(e) => setEditGit(e.target.value)}
                className="editProjectInfo"
            />

            <input 
                value={editBlog}
                placeholder="Enter Blog Link"
                onChange={(e) => setEditBlog(e.target.value)}
                className="editProjectInfo"
            />

            <div
                id="editProjectButtons"
            >
                <button
                    className="editProjectButton"
                    type="submit"
                >
                    Make Edits
                </button>

                <button
                    onClick={() => setEditProject(false)}
                    className="editProjectButton"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
export default EditProject