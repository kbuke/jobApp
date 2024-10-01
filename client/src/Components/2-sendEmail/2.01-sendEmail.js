import "./2.01-sendEmail.css"

import exitButton from "../../assets/closeButton.png"
import { useState } from "react"

function SendEmail({
    setSendEmail,
    userEmail,
    userName,
    setAllEmails,
    allEmails
}){
    const [emailSubject, setEmailSubject] = useState("")
    const [emailMessage, setEmailMessage] = useState("")
    const [respondAddress, setRespondAddress] = useState("")
    const [emailSent, setEmailSent] = useState(false)

    console.log(allEmails)

    const handleSubmit = (e) => {
        e.preventDefault()
        const jsonData = {
            userEmail, 
            emailSubject, 
            emailMessage,
            respondAddress
        }
        fetch("/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newEmail => setAllEmails([...allEmails, newEmail]))
            .then(setEmailSent(true))
    }

   
    return(
        <div
            id="sendEmailContainer"
            onSubmit={handleSubmit}
        >
            <div
                id="exitButtonContainer"
                onClick={() => setSendEmail(false)}
            >
                <img 
                    alt="exit button"
                    src={exitButton}
                    id="exitButton"
                />
            </div>

            {emailSent ? 
                <div
                    id="emailSentConfirmationContainer"
                >
                    <h2>Your email has been sent</h2>
                </div>
                :
                <div
                    id="emailContainer"
                >
                    <h2>
                        Send {userName} an Email
                    </h2>

                    <form
                        id="emailContent"
                    >
                        <div
                            id="emailInputGrid"
                        >
                            <h3>Email To: </h3>
                            <h3>{userEmail}</h3>

                            <h3>Email Subject:</h3>
                            <textarea 
                                id="emailSubjectContainer"
                                onChange={(e) => setEmailSubject(e.target.value)}
                            />

                            <h3>Enter Your Message:</h3>
                            <textarea 
                                id="emailContentContainer"
                                onChange={(e) => setEmailMessage(e.target.value)}
                            />

                            <h3>Enter Your Email:</h3>
                            <textarea 
                                id="usersEmailContainer"
                                onChange={(e) => setRespondAddress(e.target.value)}
                            />
                        </div>

                        <button
                            id="sendEmailButton"
                            type="submit"
                        >
                            Send Email
                        </button>
                    </form>
                </div>
            }
        </div>
    )
}
export default SendEmail