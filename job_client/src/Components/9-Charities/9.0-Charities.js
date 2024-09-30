import { useEffect, useState } from "react"
import "./9.0-Charities.css"

import addCharityIcon from "../../assets/plus icon.png"
import editCharityIcon from "../../assets/editIcon.png"
import deleteCharityIcon from "../../assets/binIcon.png"

import AddCharity from "./9.01-AddCharity"
import DeleteCharity from "./9.02-DeleteCharity"
import EditCharityInfo from "./9.03-EditCharityInfo"
import CharitySpecifics from "./9.04-CharitySpecifics"

function Charities({
    appData,
    loggedUser,
    containerHeader,
    setChosenOption,
    selectedCharityId,
    setSelectedCharityId
}){
    const allCharities = appData.allCharities
    const setAllCharities = appData.setAllCharities

    const [sortCharities, setSortCharities] = useState([])

    // const [selectedCharityId, setSelectedCharityId] = useState()
    const [selectedCharityName, setSelectedCharityName] = useState("")
    const [selectedCharityDescription, setSelectedCharityDescription] = useState("")
    const [selectedLogo, setSelectedLogo] = useState("")
    const [selectedRole, setSelectedRole] = useState("")
    const [selectedStartDate, setSelectedStartDate] = useState()
    const [selectedEndDate, setSelectedEndDate] = useState()

    const [addCharity, setAddCharity] = useState(false)
    const [editCharity, setEditCharity] = useState(false)
    const [deleteCharity, setDeleteCharity] = useState(false)

    useEffect(() => (
        setSortCharities(allCharities.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)))
    ), [allCharities])

    console.log(allCharities)

    //render the add charity icon
    const renderedPlusIcon = 
        <div
            className="charityIconContainer"
            onClick={() => setAddCharity(true)}
        >
            <img 
                src={addCharityIcon}
                className="charityLogo"
                alt="addCharityLogo"
            />
        </div>


    //Handle edit logic
    const handleEditCharityClick = (
        charityId, 
        charityName,
        charityRole,
        charityLogo,
        charityDescription,
        charityStartDate,
        charityEndDate
    ) => {
        console.log(`I want to edit charity ${charityId}`)
        setEditCharity(true)
        setSelectedCharityId(charityId)
        setSelectedCharityName(charityName)
        setSelectedRole(charityRole)
        setSelectedLogo(charityLogo)
        setSelectedCharityDescription(charityDescription)
        setSelectedStartDate(charityStartDate)
        setSelectedEndDate(charityEndDate)
    }

    //Handle delete logic
    const handleDeleteCharityClick = (charityId, charityName) => {
        console.log(`I want to delete charity ${charityId}`)
        setDeleteCharity(true)
        setSelectedCharityId(charityId)
        setSelectedCharityName(charityName)
    }

    //Handle select charity logo logic
    const handleSelectedCharity = (charityId, charityName) => {
        setSelectedCharityId(charityId)
        setChosenOption(charityName)
    }
    
    //render charity logos
    const renderCharity = sortCharities.map((charity, index) => (
        !loggedUser ?
            <div
                className="charityIconContainer"
                key={index}
                onClick={() => handleSelectedCharity(charity.id, charity.name)}
            >
                <img 
                    src={charity.logo}
                    className="charityLogo"
                    alt={`${charity.name} Logo`}
                />
            </div>
        :
            <div
                id="editDeleteCharityContainer"
                key={index}
            >
                <div
                    className="charityIconContainer"
                    key={index}
                    onClick={() => handleSelectedCharity(charity.id, charity.name)}
                >
                    <img 
                        src={charity.logo}
                        className="charityLogo"
                        alt={`${charity.name} Logo`}
                    />
                </div>

                <div
                    id="editDeleteButtonContainer"
                >
                    <div
                        className="charityOptionIconContainer"
                        onClick={() => handleEditCharityClick(
                            charity.id, 
                            charity.name,
                            charity.role,
                            charity.logo,
                            charity.charity_description,
                            charity.start_date,
                            charity.end_date
                        )}
                    >
                        <img 
                            src={editCharityIcon}
                            className="charityOptionIcon"
                            alt="editCharityIcon"
                        />
                    </div>

                    <div
                        className="charityOptionIconContainer"
                        onClick={() => handleDeleteCharityClick(charity.id, charity.name)}
                    >
                        <img 
                            src={deleteCharityIcon}
                            className="charityOptionIcon"
                            alt="deleteCharityicon"
                        />
                    </div>
                </div>
            </div>
    ))

    return(
        <div
            id="popUpContainer"
        >
            <div
                id={selectedCharityId && !deleteCharity && !editCharity ? "largeCharityContainer" : "smallCharityContainer"}
            >
                {containerHeader}

                <div
                    id="charitySmallGrid"
                >
                    {selectedCharityId && !deleteCharity && !editCharity ?
                        <CharitySpecifics 
                            selectedCharityId={selectedCharityId}
                            sortCharities={sortCharities}
                            loggedUser={loggedUser}
                            appData={appData}
                        />
                        :
                        <div
                            id="charityWheel"
                        >
                            {loggedUser ?
                                renderedPlusIcon 
                                :
                                null
                            }

                            {renderCharity}
                        </div>
                    }

                    {addCharity ? (
                        <AddCharity 
                            allCharities={allCharities}
                            setAllCharities={setAllCharities}
                            setAddCharity={setAddCharity}
                        />
                    )
                    :
                    deleteCharity ? (
                        <DeleteCharity 
                            setDeleteCharity={setDeleteCharity}
                            selectedCharityId={selectedCharityId}
                            setSelectedCharityId={setSelectedCharityId}
                            selectedCharityName={selectedCharityName}
                            allCharities={allCharities}
                            setAllCharities={setAllCharities}
                        />
                    )
                    :
                    editCharity ?(
                        <EditCharityInfo 
                            setEditCharity={setEditCharity}
                            selectedCharityId={selectedCharityId}
                            setSelectedCharityId={setSelectedCharityId}
                            selectedCharityName={selectedCharityName}
                            allCharities={allCharities}
                            setAllCharities={setAllCharities}
                            selectedRole={selectedRole}
                            selectedLogo={selectedLogo}
                            selectedCharityDescription={selectedCharityDescription}
                            selectedStartDate={selectedStartDate}
                            selectedEndDate={selectedEndDate}
                        />
                    )
                    :
                        null
                    }
                </div>
            </div>
        </div>
    )
}
export default Charities