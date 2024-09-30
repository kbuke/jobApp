import addCaseStudy from "../../assets/plus icon.png"
import editCaseStudy from "../../assets/editIcon.png"
import deleteCaseStudy from "../../assets/binIcon.png"

import "./6-capstoneProject.css"

import AddProject from "./6.01-AddProject"
import EditProject from "./6.02-EditProject"
import DeleteProject from "./6.03-DeleteProject"
import SpecificProject from "./6.04-SpecificProject"

import { useEffect, useState } from "react"

function CapstoneProject({
    appData,
    containerHeader,
    loggedUser,
    setChosenOption,
    projectId,
    setProjectId
}){
    const [sortProjects, setSortProjects] = useState([])
    const [newProject, setNewProject] = useState()

    const [editProject, setEditProject] = useState(false)

    const [projectTitle, setProjectTitle] = useState("")
    const [projectImg, setProjectImg] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [projectDate, setProjectDate] = useState("")
    const [projectGitLink, setProjectGitLink] = useState("")
    const [projectBlogLink, setProjectBlogLink] = useState("")

    const [deleteProject, setDeleteProject] = useState(false)


    //Get all projects
    const allProjects = appData.allProjects
    const setAllProjects = appData.setAllProjects

    useEffect(() => {
        setSortProjects(allProjects.sort((a, b) => new Date(b.date) - new Date(a.date)))
    }, [allProjects])

    const handleProjectSelect = (projectId, projectName) => {
        setProjectId(projectId)
        setChosenOption(projectName)
    }

    const handleEditProject = (
        projectId,
        projectName, 
        projectImage,
        projectBlog,
        projectGit,
        projectDescription,
        projectDate
    ) => {
        setProjectId(projectId)
        setEditProject(true)
        setProjectTitle(projectName)
        setProjectImg(projectImage)
        setProjectBlogLink(projectBlog)
        setProjectGitLink(projectGit)
        setProjectDescription(projectDescription)
        setProjectDate(projectDate)
    }

    const handleDeleteProject = (
        projectId,
        projectName
    ) => {
        setProjectId(projectId)
        setDeleteProject(true)
        setProjectTitle(projectName)
    }


    console.log(sortProjects)

    const renderProjects = sortProjects.map((project, index) => (
        <div
            id={loggedUser ? "loggedCapstoneCard" : "capstoneCard"}
            key={index}
        >
            <div
                id="capstoneCardImgContainer"
                onClick={() => handleProjectSelect(project.id, project.name)}
            >
                <img 
                    src={project.image}
                    id="capstoneCardImg"
                    alt={`${project.name} Logo`}
                />
            </div>

            <div
                id="capstoneProjectInfo"
            >
                <h3>{project.name}</h3>

                <div
                    id="capstoneLocation"
                >
                    <img 
                        id="capstoneLocationImg"
                        src={project.education.school_image}
                        alt={`${project.education.school} Logo`}
                    />
                </div>
            </div>

            {loggedUser ?
                <div
                    id="caseStudyOptionGrid"
                >
                    <div
                        className="caseStudyOptionContainer"
                        onClick={() => handleEditProject(
                            project.id,
                            project.name,
                            project.image,
                            project.blog_link,
                            project.git_hub_link,
                            project.description,
                            project.date
                        )}
                    >
                        <img 
                            src={editCaseStudy}
                            className="caseStudyOptionIcon"
                            alt="editStudyIcon"
                        />
                    </div>

                    <div
                        className="caseStudyOptionContainer"
                        onClick={() => handleDeleteProject(
                            project.id,
                            project.name
                        )}
                    >
                        <img 
                            className="caseStudyOptionIcon"
                            src={deleteCaseStudy}
                            alt="deleteStudyIcon"
                        />
                    </div>
                </div>
                :
                null
            }
        </div>
    ))

    const addCapstoneContainer = 
        <div
            id="addNewCapstoneProjectContainer"
            onClick={() => setNewProject(true)}
        >
            <img 
                src={addCaseStudy}
                id="addNewCapstoneProjectIcon"
                alt="addStudyIcon"
            />
        </div>
    

    return(
        <div
            id="popUpContainer"
        >
            <div
                id={projectId && !editProject && !deleteProject? "largeProjectContainer" : "smallProjectContainer"}
            >
                {containerHeader}

                {projectId && !editProject && !deleteProject ?
                <SpecificProject 
                    allProjects={allProjects}
                    projectId={projectId}
                    loggedUser={loggedUser}
                    appData={appData}
                />
                :
                <>
                <div
                    id="projectWheel"
                >
                    {loggedUser ?
                        addCapstoneContainer
                        :
                        null
                    }

                    {newProject ?
                        <AddProject 
                            setNewProject={setNewProject}
                            allProjects={allProjects}
                            setAllProjects={setAllProjects}
                            appData={appData}
                        />
                        :
                        null
                    }

                    {renderProjects}
                </div>

                {editProject ?
                    <EditProject 
                        projectId={projectId}
                        projectTitle={projectTitle}
                        projectImg={projectImg}
                        projectDescription={projectDescription}
                        projectDate={projectDate}
                        projectGitLink={projectGitLink}
                        projectBlogLink={projectBlogLink}
                        setEditProject={setEditProject}
                        allProjects={allProjects}
                        setAllProjects={setAllProjects}
                    />
                    :
                    null
                }

                {deleteProject ?
                    <DeleteProject 
                        projectId={projectId}
                        setDeleteProject={setDeleteProject}
                        setAllProjects={setAllProjects}
                        setProjectId={setProjectId}
                        projectTitle={projectTitle}
                    />
                    :
                    null
                }
                </>
                }
            </div>
        </div>
    )
}
export default CapstoneProject