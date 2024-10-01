import { useEffect, useState } from "react"

import "./4.10-specificJob.css"

import JobOverview from "./4.11-JobOverview"
import Roles from "./4.12-Roles"
import CaseStudies from "./4.13-CaseStudies"
import JobRef from "./4.15-JobRef"


function SpecificJob({
    selectedBusinessId,
    allEmployers,
    loggedUser,
    appData
}){
    const [specificJob, setSpecificJob] = useState([])

    console.log(selectedBusinessId)

    useEffect(() => {
        fetch(`/employers/${selectedBusinessId}`)
        .then(r => {
            if(r.ok) {
                return r.json()
            }
            throw r 
        })
        .then(job => setSpecificJob(job))
    }, [allEmployers])
    console.log(specificJob)

    //Handle overview info
    const position = specificJob?.role
    const dates = `${specificJob?.start_date?.slice(0, 4)} - ${specificJob?.end_date?.slice(0, 4)}`
    const logo = specificJob?.logo
    const companyDescription = specificJob?.role_description

    return(
        <>
            <div
                id="jobSpecsGrid"
            >
                <div>
                    <h2
                        className="specificJobTitles"
                    >
                        Overview
                    </h2>
                    <JobOverview 
                        logo={logo}
                        appData={appData}
                        companyDescription={companyDescription}
                    />
                </div>

                <div
                    id="rightSideSpecsGrid"
                >
                    <div
                        id="employerPositionContainer"
                    >
                        <h2
                            className="employerPositionText"
                        >
                            {position}
                        </h2>

                        <h4
                            className="employerDateText"
                        >
                            {dates}
                        </h4>
                    </div>
                    <h2
                        className="specificJobTitles"
                    >
                        Roles
                    </h2>
                    <Roles 
                        appData={appData}
                        selectedBusinessId={selectedBusinessId}
                        loggedUser={loggedUser}
                        position={position}
                        dates={dates}
                    />
                </div>
            </div>

            <div
                id="caseStudyContainers"
            >
                <h2
                    className="specificJobTitles"
                >
                    Case-Studies
                </h2>

                <CaseStudies 
                    appData={appData}
                    selectedBusinessId={selectedBusinessId}
                    loggedUser={loggedUser}
                />
            </div>

            <div
                id="jobRefContainer"
            >
                <h2
                    className="specificJobTitles"
                >
                    Reference
                </h2>

                <JobRef 
                    appData={appData}
                    selectedBusinessId={selectedBusinessId}
                    loggedUser={loggedUser}
                />
            </div>
        </>
    )
}
export default SpecificJob