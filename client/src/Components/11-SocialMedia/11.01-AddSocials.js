import { useState } from "react"
import "./11.01-AddSocials.css"

function AddSocials({
    allSocials,
    setAllSocials,
    setAddSocials
}){
    const[newSocial, setNewSocial] = useState("")
    const [newLogo, setNewLogo] = useState("")

    const addNewSocials = (e) => {
        e.preventDefault()
        const jsonData = {
            newSocial,
            newLogo
        }
        fetch("/socials", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newSocial => {
                setAllSocials([...allSocials, newSocial])
            })
            .then(setAddSocials(false))
    }

    return(
        <form
            id="newSocialsForm"
            onSubmit={addNewSocials}
        >
            <input 
                placeholder="Enter social media link"
                onChange={(e) => setNewSocial(e.target.value)}
            />

            <input 
                placeholder="Enter social media logo"
                onChange={(e) => setNewLogo(e.target.value)}
            />

            <button
                type="submit"
            >
                Add New Socials
            </button>

            <button
                onClick={() => setAddSocials(false)}
            >
                Cancel
            </button>
        </form>
    )
}
export default AddSocials