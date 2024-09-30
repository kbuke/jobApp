import { useState } from "react"


function AddCharityStudyRole({
    setAddRoles,
    selectedCaseStudyId,
    caseStudyRoles,
    setCaseStudyRoles
}){
    const [newRole, setNewRole] = useState("")
    console.log(newRole)

    const handlePost = (e) => {
        e.preventDefault()
        const jsonData = {
            selectCaseStudyId: selectedCaseStudyId,
            newRole: newRole
        }
        fetch("/workcasestudyrole", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newCharityRole => {
                setCaseStudyRoles([...caseStudyRoles, newCharityRole])
            })
    }

    return(
        <form
            onSubmit={handlePost}
        >
            <input 
                onChange={(e) => setNewRole(e.target.value)}
                type="text"
            />
            <div>
                <button
                    type="submit"
                >
                    Add New Role
                </button>

                <button
                    onClick={() => setAddRoles(false)}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
export default AddCharityStudyRole