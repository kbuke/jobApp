import { useState } from "react"
import "./1.02-login.css"

function Login({
    setHandleLogIn,
    setLoggedUser
}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        }).then((r) => {
            if(r.ok) {
                return r.json()
            } else {
                setLoginError(true)
            }
        })
        .then(user => {
            if(user){
                setLoggedUser(user)
                setHandleLogIn(false)
            }
        })
    }

    return(
        <form
            id="loginContainer"
            onSubmit={handleSubmit}
        >
            <h2>Login</h2>

            {loginError ? 
                <div>
                    <h4>Error Logging In</h4>
                </div>
                :
                null
            }

            <div
                id="loginGrid"
            >
                <h3>Please enter your Email</h3>
                <input 
                    className="loginInputBox"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please Enter Your Email"
                />

                <h3>Please enter Password</h3>
                <input 
                    className="loginInputBox"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div
                id="loginButtonContainer"
            >
                <button
                    id="loginButton"
                    type="submit"
                >
                    Login
                </button>

                <button
                    onClick={() => setHandleLogIn(false)}
                    id="loginButton"
                >
                    Cancel Login
                </button>
            </div>
        </form>
    )
}
export default Login