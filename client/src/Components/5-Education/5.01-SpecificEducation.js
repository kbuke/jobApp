import "./5.01-SpecificEducation.css"

function SpecificEducation({
    selectedEducationId,
    sortEducation
}){
    const filterEducation = sortEducation.filter(education => education.id === selectedEducationId)
    console.log(filterEducation)

    const renderEducationInfo = filterEducation.map((school, index) => {
        const dates = `${school.start_date.slice(0, 4)} - ${school.end_date.slice(0, 4)}`
        const grade = school?.grade || "N/A"
        const subjectStudies = `${school?.subject_studied}` || "N/A"
        return(
            <>
                <h1
                    key={index}
                    id="schoolName"
                >
                    {school.school}
                </h1>

                <div
                    className="educationInfoGrid"
                >
                    <h2>Education Dates: </h2>
                    <h3>{dates}</h3>

                    <h2>Subject(s): </h2>
                    <h3>{subjectStudies}</h3>

                    <h2>Grade(s): </h2>
                    <h3>{grade}</h3>
                </div>
            </>
        )
    })

    return(
        <div
            id="specificEducationContainer"
        >
            {renderEducationInfo}
        </div>
    )
}
export default SpecificEducation