import { useState } from "react";
import "./2.5-EditIntro.css";

function EditIntro({
    profileInfo,
    setProfile,
    checkUser,
    setEditIntro
}) {
    const [currentIntro, setCurrentIntro] = useState(checkUser.profile_bio);
    const [currentCity, setCurrentCity] = useState(checkUser.current_town);
    const [currentCountry, setCurrentCountry] = useState(checkUser.current_country);
    const [employed, setEmployed] = useState(checkUser.employed);
    const [searching, setSearching] = useState(checkUser.looking_work)
    const [newPassword, setNewPassword] = useState(checkUser._password_hash)

    console.log(checkUser)

    console.log(`I am employed? ${employed}, and I am searching for work? ${searching}`);

    // Boolean options for employed state
    const options = [true, false];
    const renderOptions = options.map((option, index) => (
        <option key={index} value={option}>
            {option ? "Yes" : "No"}
        </option>
    ));

    const handlePatch = (e) => {
        e.preventDefault();
    
        // Create the base body without password
        const body = {
            profile_bio: currentIntro,
            employed: employed,
            looking_work: searching, 
            current_town: currentCity,
            current_country: currentCountry,
        };
    
        // Add the password field only if it has changed
        if (newPassword && newPassword !== checkUser._password_hash) {
            body._password_hash = newPassword;
        }
    
        fetch(`/profiles/${checkUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(r => {
            if(r.ok){
                return r.json()
            } else {
                console.error("Failed to update info");
                return null;
            }
        })
        .then(newUserInfo => {
            if(newUserInfo){
                setProfile(profileInfo.map(oldUserInfo => 
                    oldUserInfo.id === newUserInfo.id? newUserInfo : oldUserInfo
                ));
                setEditIntro(false);
            }
        })
        .catch(error => console.error("Error", error));
    };
    

    return (
        <form 
            id="popUpContainer"
            onSubmit={handlePatch}
        >
            <div id="editIntroContainer">
                <div id="editIntroTitleContainer">
                    <h2>Edit Intro</h2>
                </div>

                <div id="editIntoContainerGrid">
                    <h4>Alter Introduction</h4>
                    <input
                        value={currentIntro}
                        type="text"
                        onChange={(e) => setCurrentIntro(e.target.value)}
                    />

                    <h4>Current City</h4>
                    <input
                        value={currentCity}
                        type="text"
                        onChange={(e) => setCurrentCity(e.target.value)}
                    />

                    <h4>Current Country</h4>
                    <input
                        value={currentCountry}
                        type="text"
                        onChange={(e) => setCurrentCountry(e.target.value)}
                    />

                    <h4>Employed?</h4>
                    <select
                        value={employed}
                        onChange={(e) => setEmployed(e.target.value === "true")}
                    >
                        {renderOptions}
                    </select>

                    <h4>Searching for Work?</h4>
                    <select
                        value={searching}
                        onChange={(e) => setSearching(e.target.value === "true")}
                    >
                        {renderOptions}
                    </select>

                    <h4>New Password</h4>
                    <input 
                        type="text"
                        placeholder="Enter new password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                    />
                </div>

                <div>
                    <button
                        type="submit"
                    >
                        Submit Changes
                    </button>

                    <button
                        onClick={() => setEditIntro(false)}
                    >
                        Cancel Changes
                    </button>
                </div>
            </div>
        </form>
    );
}

export default EditIntro;
