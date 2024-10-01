import { useEffect, useState } from "react"

import "./6.04-SpecificProject.css"
import { Link } from "react-router-dom"

import ProjectAchievments from "./6.05-ProjectAchievments"

function SpecificProject({
    allProjects,
    projectId,
    loggedUser,
    appData
}){
    const [selectedProject, setSelectedProject] = useState([])

    const allAchievments = appData.allAchievments
    const setAllAchievements = appData.setAllAchievements

    useEffect(() => {
        fetch(`/projects/${projectId}`)
        .then(r => {
            if(r.ok) {
                return r.json()
            }
            throw r 
        })
        .then(project => setSelectedProject(project))
    }, [allProjects, allAchievments])

    console.log(selectedProject)

    //Get Charity Info
    const projectBlog = selectedProject.blog_link 
    const projectBlogImg = projectBlog ? "https://findingtom.com/images/uploads/medium-logo/article-image-00.jpeg" : ""
    
    const projectDate = selectedProject?.date?.slice(0, 4)
    const projectDescription = selectedProject.description

    const projectGit = selectedProject.git_hub_link
    const projectGitImg = projectGit ? "https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png" : ""

    const projectImg = selectedProject.image 
    const projectName = selectedProject.name 
    const locationImg = selectedProject?.education?.school_image

    const projectAchievements = selectedProject.capstone_achievment

    return(
        <div
            id="specificProjectContainer"
        >
            <div
                id="specificProjectIntroContainer"
            >

                <div
                    id="specificProjectIntroLeftContainer"
                >
                    <div
                        id="projectImgContainer"
                    >
                        <img 
                            src={projectImg}
                            id="projectImg"
                        />
                    </div>
                    <h2>{projectDate}</h2>
                    <h3>{projectDescription}</h3>
                </div>

                <div
                    id="specificProjectIntroRightContainer"
                >
                    <div
                        className="projectInfoImgInfo"
                    >
                        <h3>Completed At:</h3>
                        <div
                            className="projectInfoImgContainer"
                        >
                            <img 
                                src={locationImg}
                                className="projectInfoImg"
                            />
                        </div>
                    </div>

                    <div
                        className="projectInfoImgInfo"
                    >
                        {projectBlog ?
                            <>
                                <h3>Blog Link</h3>
                                <Link
                                    className="projectInfoImgContainer"
                                    to={projectBlog}
                                >
                                    <img 
                                        className="projectInfoImg"
                                        src={projectBlogImg}
                                    />
                                </Link>
                            </>
                        :
                            <h3>No Blog to Display</h3>
                        }
                    </div>

                    <div
                        className="projectInfoImgInfo"
                    >
                        {projectGit ?
                            <>
                                <h3>Git-Hub Link</h3>
                                <Link
                                    to={projectGit}
                                    className="projectInfoImgContainer"
                                >
                                    <img 
                                        className="projectInfoImg"
                                        src={projectGitImg}
                                    />
                                </Link>
                            </>
                            :
                                <h3>No Git-Hub Link</h3>
                        }
                    </div>
                </div>
            </div>
            <ProjectAchievments 
                projectAchievements={projectAchievements}
                loggedUser={loggedUser}
                projectId={projectId}
                allAchievments={allAchievments}
                setAllAchievements={setAllAchievements}
            />
        </div>
    )

}
export default SpecificProject