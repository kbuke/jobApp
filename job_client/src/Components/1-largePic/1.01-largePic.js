import "./1.01-largePic.css"

import exitButton from "../../assets/closeButton.png"
import { useState } from "react"

import Login from "./1.02-login"

function LargePic({
    setPictureClick,
    kaanPic,
    setLoggedUser,
    loggedUser
}){
    const [hoverLogIn, setHoverLogIn] = useState(false)
    const [handleLogin, setHandleLogIn] = useState(false)

    const handleLogOut = (e) => {
        e.preventDefault()
        fetch('/logout', {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok) {
                setLoggedUser(null)
            }
        })
    }

    console.log(loggedUser)
    
    return(
        <div
            id="popUpContainer"
        >
            <div
                id="exitButtonContainer"
                onClick={() => setPictureClick(false)}
            >
                <img 
                    alt="exit button"
                    src={exitButton}
                    id="exitButton"
                />
            </div>

            {handleLogin ? 
                <Login 
                    setHandleLogIn={setHandleLogIn}
                    setLoggedUser={setLoggedUser}
                />
                :
                <>
                    <div
                        id="enlargedPic"
                    >
                        <img 
                            src={kaanPic}
                            id="renderEnlargePic"
                            alt="largePic"
                        />
                    </div>

                {loggedUser ? 
                    <div
                        id={hoverLogIn ? "logInOutOption" : "noHover"}
                        onMouseEnter={() => setHoverLogIn(true)}
                        onMouseLeave={() => setHoverLogIn(false)}
                        onClick={handleLogOut}
                    >
                        Log Out
                    </div>
                    :
                    <div
                        onMouseEnter={() => setHoverLogIn(true)}
                        onMouseLeave={() => setHoverLogIn(false)} 
                        onClick={() => setHandleLogIn(true)}
                        id={hoverLogIn ? "logInOutOption" : "noHover"}
                    >
                        Login
                    </div>
                }
            </>
            }            
        </div>
    )
}
export default LargePic