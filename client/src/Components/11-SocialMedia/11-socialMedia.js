import { useState } from "react"

import addSmIcon from "../../assets/plus icon.png"
import deleteSmIcon from "../../assets/binIcon.png"

import { Link } from "react-router-dom"

import "./11-socialMedia.css"

import AddSocials from "./11.01-AddSocials"

function SocialMedia({
    appData,
    containerHeader,
    loggedUser
}){
    const allSocials = appData.allSocials
    const setAllSocials = appData.setAllSocials

    const [addSocials, setAddSocials] = useState(false)
    const [socialsId, setSocialsId] = useState()

    const addSm = 
        <div
            id="addSmIconContainer"
            className="smContainer"
            onClick={() => setAddSocials(true)}
        >
            <img 
                src={addSmIcon}
                id="addSmIcon"
                className="smImg"
                alt="socialIcon"
            />
        </div>
    
    console.log(socialsId)

    //Handle delete function
    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/socials/${socialsId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllSocials(socials => socials.filter(social => social.id !== socialsId))
                }
            })
    }
    
    const renderSocials = allSocials.map((socials, index) => (
        <>
            <Link
                className="smContainer"
                to={socials.url}
                key={index}
            >
                <img 
                    className="smImg"
                    src={socials.logo}
                    alt="socialsLogo"
                />
            </Link>
            {loggedUser ?
                <div
                    id="deleteSocialsIconContainer"
                    onClick={(e) => {
                        setSocialsId(socials.id); 
                        handleDelete(e);
                    }}
                >
                    <img 
                        id="deleteSocialsIcon"
                        src={deleteSmIcon}
                        alt="deleteSocials"
                    />
                </div>
            :
            null
            }
        </>
    ))


    return(
        <div
            id="popUpContainer"
        >
            <div
                id="smallerPopUpContainer"
                className="socialsContainer"
            >
                {containerHeader}
                <div
                    id="socialMediaWheel"
                >
                    {loggedUser ?
                        addSm
                        :
                        null
                    }
                    {renderSocials}
                </div>

                {addSocials ?
                    <AddSocials 
                        allSocials={allSocials}
                        setAllSocials={setAllSocials}

                        addSocials={addSocials}
                        setAddSocials={setAddSocials}
                    />
                    :
                    null
                }
            </div>
        </div>
    )
}
export default SocialMedia