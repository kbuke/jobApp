import { useState } from "react"
import "./4.05-addNewBusiness.css"

function AddNewBusiness({
    allEmployers,
    setAllEmployers,
    selectedBusinessId
}){
    const [employerName, setEmployerName] = useState("")
    const [employerLogo, setEmployerLogo] = useState("")
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [employerRole, setEmployerRole] = useState("")
    const [roleDescription, setRoleDescription] = useState("")

    const handlePost = (e) => {
        e.preventDefault()
        const jsonData = {
            employerName,
            employerLogo,
            startDate,
            endDate,
            employerRole,
            roleDescription,
            selectedBusinessId
        }
        fetch("/employers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newBusiness => {
                setAllEmployers([...allEmployers, newBusiness])
            })
    }

    return (
 
            <form
                id="newBusinessForm"
                onSubmit={handlePost}
            >
                <div
                    className="newInfoGrid"
                >
                    <h4>Name of Company: </h4>
                    <input 
                        type="text"
                        onChange={(e) => setEmployerName(e.target.value)}
                    />

                    <h4>Logo of Company: </h4>
                    <input 
                        type="text"
                        onChange={(e) => setEmployerLogo(e.target.value)}
                    />

                    <h4>Enter Your Position: </h4>
                    <input 
                        type="text"
                        onChange={(e) => setEmployerRole(e.target.value)}
                    />

                    <h4>Enter a Description of your Role: </h4>
                    <input 
                        type="text"
                        onChange={(e) => setRoleDescription(e.target.value)}
                    />

                    <h4>Enter Start-Date: </h4>
                    <input 
                        type="date"
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <h4>Enter End Date: </h4>
                    <input 
                        type="date"
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                >
                    Add New Work Experience
                </button>
            </form>
 
    )
}
export default AddNewBusiness