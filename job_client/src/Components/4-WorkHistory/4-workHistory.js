import { useEffect, useState } from "react"

import addButton from "../../assets/plus icon.png"

import deleteButtonIcon from "../../assets/binIcon.png"
import editButtonIcon from "../../assets/editIcon.png"

import "./4-workHistory.css"

import SpecificJob from "./4.10-specificJob"
import AddNewBusiness from "./4.05-addNewBusiness"
import EditPrevWork from "./4.21-EditPrevWork"

function WorkHistory({
    loggedUser,
    appData,
    containerHeader,
    setChosenOption,
    addNewBusiness,
    setAddNewBusiness,
    selectedBusiness,
    setSelectedBusiness,
    selectedBusinessId,
    setSelectedBusinessId
}){
    const [sortBusinesses, setSortBusinesses] = useState([])

    const [editBusinessId, setEditBusinessId] = useState()
    const [editBusinessName, setEditBusinessName] = useState()
    const [editBusinessLogo, setEditBusinessLogo] = useState()
    const [editBusinessRole, setEditBusinessRole] = useState()
    const [editBusinessDescription, setEditBusinessDescription] = useState()
    const [editStartDate, setEditStartDate] = useState()
    const [editEndDate, setEndDate] = useState()

    const [deleteBusinessId, setDeleteBusinessId] = useState()

    const allEmployers = appData?.allEmployers 
    const setAllEmployers = appData.setAllEmployers

    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/employers/${deleteBusinessId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok){
                    setAllEmployers(employers => employers.filter(employer => employer.id !== deleteBusinessId))
                }
            })
            .then(setDeleteBusinessId())
    }

    console.log(loggedUser)

    useEffect(() => {
        setSortBusinesses(allEmployers.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)))
    }, [allEmployers])

    console.log(sortBusinesses)

    //handle logic for clicking business card
    const handleSpecificBusinessClick = (businessName, businessId) => {
        setChosenOption(businessName)
        setSelectedBusiness(true)
        setSelectedBusinessId(businessId)
    }

    const handleEdit = (
        workId, 
        workName, 
        workLogo,
        workRole,
        workDescription,
        workStart,
        workEnd
    ) => {
        setEditBusinessId(workId)
        setEditBusinessName(workName)
        setEditBusinessLogo(workLogo)
        setEditBusinessRole(workRole)
        setEditBusinessDescription(workDescription)
        setEditStartDate(workStart)
        setEndDate(workEnd)
    }

    const renderWorkExperience = sortBusinesses.map((businesses, index) => (
        loggedUser ?
            editBusinessId===businesses.id ?
                <EditPrevWork 
                    allEmployers={allEmployers}
                    setAllEmployers={setAllEmployers}
                    editBusinessId={editBusinessId}
                    setEditBusinessId={setEditBusinessId}
                    editBusinessName={editBusinessName}
                    editBusinessLogo={editBusinessLogo}
                    editBusinessRole={editBusinessRole}
                    editBusinessDescription={editBusinessDescription}
                    editStartDate={editStartDate}
                    editEndDate={editEndDate}
                />
                :
                <div
                    id="prevExperienceColumn"
                    key={index}
                >
                    <div
                        id="optionImgContainer"
                        onClick={() => handleSpecificBusinessClick(businesses.name, businesses.id)}
                        key={index}
                    >
                        <img 
                            src={businesses.logo}
                            id="optionImg"
                            alt="businessLogo"
                        />
                    </div>

                    <div
                        id="editExperienceContainer"
                    >
                        {deleteBusinessId === businesses.id ?
                        <form
                            onSubmit={handleDelete}
                        >
                            <h3>Confirm Deletion of {businesses.name}</h3>
                            <div>
                                <button
                                    type="submit"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => setDeleteBusinessId()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                        :
                        <>
                            <button
                                className="editBusinessButtons"
                                onClick={() => handleEdit(
                                    businesses.id,
                                    businesses.name,
                                    businesses.logo,
                                    businesses.role,
                                    businesses.role_description,
                                    businesses.start_date,
                                    businesses.end_date
                                )}
                            >
                                <img 
                                    src={editButtonIcon}
                                    className="editBusinessButtonIcon"
                                    alt="editBusiness"
                                />
                            </button>

                            <button
                                className="editBusinessButtons"
                                onClick={() => setDeleteBusinessId(businesses.id)}
                            >
                                <img 
                                    src={deleteButtonIcon}
                                    className="editBusinessButtonIcon"
                                    alt="deleteBusiness"
                                />
                            </button>
                        </>
                        }
                    </div>
                </div>
        :
        <div
            id="optionImgContainer"
            onClick={() => handleSpecificBusinessClick(businesses.name, businesses.id)}
            key={index}
        >
            <img 
                src={businesses.logo}
                id="optionImg"
                alt={`${businesses.name} logo`}
            />
        </div>
    ))

    //handle logic for adding new business
    const handleNewBusinessClick = () => {
        setChosenOption("Add New Work Experience")
        setAddNewBusiness(true)
    }

    const addBusinessContainer = 
        <div
            id="addBusinessLogoContainer"
            onClick={(handleNewBusinessClick)}
        >
            <img 
                src={addButton}
                id="addBusinessLogo"
                alt="addBusinessLogo"
            />
        </div>

    return(
        <div
            id="popUpContainer"
        >
            <div
                id={addNewBusiness || selectedBusiness ? "largerPopUpContainer" : "smallerPopUpContainer"}
            >
                {containerHeader}

                {
                    addNewBusiness ? (
                        <AddNewBusiness 
                            allEmployers={allEmployers}
                            setAllEmployers={setAllEmployers}
                            selectedBusinessId={selectedBusinessId}
                        />
                    )
                    :
                    selectedBusiness ? (
                        <SpecificJob 
                            allEmployers={allEmployers}
                            selectedBusinessId={selectedBusinessId}
                            appData={appData}
                            loggedUser={loggedUser}
                        />
                    )
                    :
                    <div
                        id="optionsWheel"
                    >
                        {loggedUser ? addBusinessContainer : null}
                        {renderWorkExperience}
                    </div>
                }
            </div>
        </div>
    )
}
export default WorkHistory