import { useState } from "react"

import addAchievments from "../../assets/plus icon.png"
import editAchievments from "../../assets/editIcon.png"
import deleteAchievements from "../../assets/binIcon.png"

import "./6.05-ProjectAchievments.css"

import AddAchievment from "./6.06-AddAchievment"
import EditAchievment from "./6.07-EditAchievment"
import DeleteAchievment from "./6.08-DeleteAchievment"

function ProjectAchievments({
    projectAchievements,
    loggedUser,
    projectId,
    allAchievments,
    setAllAchievements
}){
    const [addNewAchievment, setAddNewAchievment] = useState(false)

    const [editId, setEditId] = useState()
    const [editInfo, setEditInfo] = useState("")
    const [editImg, setEditImg] = useState("")

    const [deleteId, setDeleteId] = useState()

    const numberAchievments = projectAchievements?.length

    const handleEdit = (goalId, goalDetails, goalImg) => {
        setEditId(goalId)
        setEditInfo(goalDetails)
        setEditImg(goalImg)
    }

    //render achievment cards
    const renderAchievments = projectAchievements?.map((goal, index) => (
        <div
            id={loggedUser ? "userProjectGoalCard" : "projectGoalCard"}
            key={index}
        >
            {editId === goal.id ? (
                <EditAchievment 
                    editId={editId}
                    editInfo={editInfo}
                    editImg={editImg}
                    allAchievments={allAchievments}
                    setAllAchievements={setAllAchievements}
                    setEditId={setEditId}
                />
            )
            :
            deleteId === goal.id ?(
                <DeleteAchievment 
                    deleteId={deleteId}
                    setDeleteId={setDeleteId}
                    setAllAchievements={setAllAchievements}
                />
            )
            :
            <>
                <div
                    id="projectGoalImgContainer"
                >
                    <img 
                        src={goal.image}
                        id="projectGoalImg"
                        alt="goalImg"
                    />
                </div>

                <h3>{goal.achievment}</h3>

                {loggedUser ?
                    <div
                        className="advanceAchievmentGrid"
                    >
                        <button
                            className="advanceAchievmentButton"  
                        >
                            <img 
                                src={editAchievments}
                                className="advanceAchievmentOption"
                                onClick={() => handleEdit(goal.id, goal.achievment, goal.image)}
                                alt="editAchievmentsIcon"
                            />
                        </button>

                        <button
                            className="advanceAchievmentButton"
                            onClick={() => setDeleteId(goal.id)}
                        >                        
                            <img 
                                src={deleteAchievements}
                                className="advanceAchievmentOption"
                                alt="deleteAchievmentIcon"
                            />
                        </button>
                    </div>
                    :
                    null
                }
            </>
            }
        </div>
    ))

    const addNewGoal = 
        <div
            id="addNewProjectGoalContainer"
            onClick={() => setAddNewAchievment(true)}
        >
            <img 
                src={addAchievments}
                id="addNewProjectGoal"
                alt="addProjectIcon"
            />
        </div>
    
    return(
        <>
            {numberAchievments > 0 ?
                <div
                    id="projectGoalContainer"
                >
                    <h2>Project Achievments</h2>
                    <div
                        id="projectGoalWheel"
                    >
                        {loggedUser ?
                            addNewGoal
                            :
                            null 
                        }

                        {addNewAchievment ? 
                            <AddAchievment 
                                setAddNewAchievment={setAddNewAchievment}
                                projectId={projectId}
                                allAchievments={allAchievments}
                                setAllAchievements={setAllAchievements}
                            />
                            :
                            null
                        }

                        {renderAchievments}
                    </div>
                </div>
                :
                <>
                    <h2>No achievements listed yet</h2>
                    {loggedUser ?
                        addNewGoal
                        :
                        null
                    }

                    {addNewAchievment ? 
                        <AddAchievment 
                            setAddNewAchievment={setAddNewAchievment}
                            projectId={projectId}
                            allAchievments={allAchievments}
                            setAllAchievements={setAllAchievements}
                        />
                    :
                        null
                    }
                </>
            }
        </>
    )
}
export default ProjectAchievments