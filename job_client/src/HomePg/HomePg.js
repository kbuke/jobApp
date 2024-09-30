import { useOutletContext } from "react-router-dom"
import kaanPic from "../assets/profilePic.jpeg"
import currentLocationIcon from "../assets/visitedMark.png"
import homeIcon from "../assets/homeIcon.png"
import exitButton from "../assets/closeButton.png"
import editIcon from "../assets/editIcon.png"
import backButton from "../assets/backArrow.png"

import "./HomePg.css"
import { useState } from "react"

import LargePic from "../Components/1-largePic/1.01-largePic"
import SendEmail from "../Components/2-sendEmail/2.01-sendEmail"
import EditIntro from "../Components/2.5-editIntro/2.5-EditIntro"
import AboutMe from "../Components/3-AboutMe/3.01-AboutMe"
import WorkHistory from "../Components/4-WorkHistory/4-workHistory"
import EducationHistory from "../Components/5-Education/5-EducationHistory"
import CapstoneProject from "../Components/6-capstoneProjects/6-capstoneProject"
import CodingLanguages from "../Components/7-CodingLanguages/7-codingLang"
import References from "../Components/8-References/8-references"
import Charities from "../Components/9-Charities/9.0-Charities"
import SocialMedia from "../Components/11-SocialMedia/11-socialMedia"

function HomePg(){
    const [pictureClick, setPictureClick] = useState(false)
    const [hoverEmail, setHoverEmail] = useState(false)
    const [sendEmail, setSendEmail] = useState(false)
    const [editIntro, setEditIntro] = useState(false)
    const [chosenOption, setChosenOption] = useState("")

    const [selectedCategory, setSelectedCategory] = useState("")

    //handle work experience states
    const [addNewBusiness, setAddNewBusiness] = useState(false)
    const [selectedBusiness, setSelectedBusiness] = useState(false)
    const [selectedBusinessId, setSelectedBusinessId] = useState()

    //handle charity states
    const [selectedCharityId, setSelectedCharityId] = useState()

    //handle capstone project states
    const [projectId, setProjectId] = useState()

    const appData = useOutletContext()

    const loggedUser = appData.loggedUser
    const setLoggedUser = appData.setLoggedUser
    console.log(loggedUser)

    //Get all the info for the user
    const profileInfo = appData.profileInfo
    const setProfile = appData.setProfile

    const checkUser = profileInfo[0]

    //Get user name and emails
    const userName = checkUser?.name.toUpperCase()
    const userEmail = checkUser?.email 

    //Get all the emails already sent
    const allEmails = appData.allEmails
    const setAllEmails = appData.setAllEmails

    //Get the user bio and id
    const userId = checkUser?.id 
    const userIntro = checkUser?.profile_bio
    const currentLocation = `${checkUser?.current_town}, ${checkUser?.current_country}`
    const homeLocation = `${checkUser?.home_town}, ${checkUser?.home_country}`
    const currentlyEmployed = checkUser?.employed 
    const searchingWork = checkUser?.looking_work

    const handleExit = () => {
        setSelectedCategory("")
        setSelectedBusiness(false)
        setSelectedBusinessId()
        setChosenOption("")
        setSelectedCharityId()
        setProjectId()
    }

    const exitContainer = 
        <div
            id="renderedExitContainer"
            onClick={handleExit}
        >
            <img 
                src={exitButton}
                id="exitImg"
                alt="exitButton"
            />
        </div>
    
    const editContainer = 
        <div
            id="editIconContainer"
            onClick={() => setEditIntro(true)}
        >
            <img 
                id="editIcon"
                src={editIcon}
                alt="edit icon"
            />
        </div>
    
    const handleBackButton = () => {
        setChosenOption("")
        setAddNewBusiness(false)
        setSelectedBusiness(false)
        setSelectedCharityId()
        setProjectId()
    }

    const containerHeader = 
        <div
            id="headerGrid"
        >
            <div
                id="renderedBackButtonContainer"
                onClick={handleBackButton}
            >
                {chosenOption ?
                    <img 
                        src={backButton}
                        id="renderedBackButton"
                        alt="backButton"
                    />
                    :
                    null
                }
            </div>

            <h1
                id="renderedChoice"
            >
                {chosenOption? chosenOption : selectedCategory}
            </h1>

            {exitContainer}

        </div>
    


    return(
        <div
            id="introContainer"
        >
            <div
                id="profileIntroContainer"
            >
                {/* Show user image */}
                <div
                    id="profileImgContainer"
                    onClick={() => setPictureClick(!pictureClick)}
                >
                    <img 
                        id="profileImg"
                        alt={`${userName} Image`}
                        src={kaanPic}
                    />
                </div>

                {/*Show user name */}
                <h1
                    id="profileName"
                >
                    {userName}
                </h1>

                <div
                    id="userIntroContainer"
                >
                    <h3
                        id="userBio"
                    >
                        {userIntro}
                    </h3>

                    {loggedUser ?
                        editContainer 
                        :
                        null
                    }
                </div>

                {/* set up user info grid */}
                <div
                    id="profileIntroGrid"
                >
                    {/* left hand side */}
                    <div
                        id={hoverEmail ? "hoverEmailContainer" : "noHoverEmailContainer"}
                        onClick={() => setSendEmail(!sendEmail)}
                    >
                        <h3
                            id={hoverEmail ? "sendEmailText" : "emailText"}
                            onMouseEnter={() => setHoverEmail(!hoverEmail)}
                            onMouseLeave={() => setHoverEmail(!hoverEmail)}
                        >
                            {hoverEmail ?
                                "Send me an email"
                                :
                                userEmail
                            }
                        </h3>
                    </div>

                    {/* right hand side */}
                    <div
                        id="userIntroColumn"
                    >

                        <div
                            id="userSpecificsGrid"
                        >
                            <div
                                id="currentLocationGrid"
                            >
                                <div
                                    id="currentLocationIconContainer"
                                >
                                    <img 
                                        id="currentLocationIcon"
                                        alt="current location icon"
                                        src={currentLocationIcon}
                                    />
                                </div>
                                <h4>{currentLocation}</h4>
                            </div>

                            <div
                                id="homeLocationGrid"
                            >
                                <div
                                    id="homeLocationIconContainer"
                                >
                                    <img 
                                        id="homeLocationIcon"
                                        alt="home location icon"
                                        src={homeIcon}
                                    />
                                </div>
                                <h4>{homeLocation}</h4>
                            </div>
                        </div>

                        <div
                            id="employmentStatusGrid"
                        >
                            <div
                                id={currentlyEmployed ? "employedContainer" : "unemployedContainer"}
                            >
                                <h4>{currentlyEmployed ? "Currently Employed" : "Currently Unemployed"}</h4>
                            </div>

                            <div
                                id={searchingWork ? "searchingContainer" : "notSearchingContainer"}
                            >
                                <h4>{searchingWork ? "Actively Searching For Work" : "Not Searching For Work"} </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AboutMe 
                appData={appData}
                setSelectedCategory={setSelectedCategory}
            />

            {/*allow user to see larger picture */}
            {pictureClick ?
                <LargePic 
                    setPictureClick={setPictureClick}
                    userName={userName}
                    kaanPic={kaanPic}
                    setLoggedUser={setLoggedUser}
                    loggedUser={loggedUser}
                />
                :
                null
            }

            {/* allow user to email user */}
            {sendEmail ?
                <SendEmail 
                    setSendEmail={setSendEmail}
                    userEmail={userEmail}
                    userName={userName}
                    allEmails={allEmails}
                    setAllEmails={setAllEmails}
                />
                :
                null
            }

            {editIntro ?
                <EditIntro 
                    profileInfo={profileInfo}
                    setProfile={setProfile}
                    checkUser={checkUser}
                    setEditIntro={setEditIntro}
                />
                :
                null
            }

            {selectedCategory === "Work Experience" ? 
                <WorkHistory 
                    setSelectedCategory={setSelectedCategory}
                    loggedUser={loggedUser}
                    appData={appData}
                    
                    containerHeader={containerHeader}
                    setChosenOption={setChosenOption}

                    addNewBusiness={addNewBusiness}
                    setAddNewBusiness={setAddNewBusiness}

                    selectedBusiness={selectedBusiness}
                    setSelectedBusiness={setSelectedBusiness}

                    selectedBusinessId={selectedBusinessId}
                    setSelectedBusinessId={setSelectedBusinessId}
                />
                :
                null
            }

            {selectedCategory === "Education" ?
                <EducationHistory 
                    appData={appData}
                    setSelectedCategory={setSelectedCategory}
                    containerHeader={containerHeader}
                    loggedUser={loggedUser}
                />
                :
                null
            }

            {selectedCategory === "Capstone Projects" ?
                <CapstoneProject 
                    appData={appData}
                    containerHeader={containerHeader}
                    loggedUser={loggedUser}
                    setChosenOption={setChosenOption}
                    projectId={projectId}
                    setProjectId={setProjectId}
                />
                :
                null
            }

            {selectedCategory === "Languages, Microframeworks & Libraries" ? 
                <CodingLanguages 
                    appData={appData}
                    setSelectedCategory={setSelectedCategory}
                    containerHeader={containerHeader}
                />
                :
                null
            }

            {selectedCategory === "References" ?
                <References 
                    appData={appData}
                    exitContainer={exitContainer}
                />
                :
                null
            }

            {selectedCategory === "Charity Work" ?
                <Charities 
                    appData={appData}
                    exitContainer={exitContainer}
                    loggedUser={loggedUser}
                    containerHeader={containerHeader}
                    setChosenOption={setChosenOption}
                    selectedCharityId={selectedCharityId}
                    setSelectedCharityId={setSelectedCharityId}
                />
                :
                null 
            }

            {selectedCategory === "Social Media" ?
                <SocialMedia 
                    appData={appData}
                    setSelectedCategory={setSelectedCategory}
                    containerHeader={containerHeader}
                    loggedUser={loggedUser}
                />
                :
                null 
            }
        </div>
    )
}
export default HomePg