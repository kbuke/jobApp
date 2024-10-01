import "./4.11-JobOverview.css"

function JobOverview({
    logo,
    companyDescription
}){
    return(
        <>
            <div
                id="basicCompanyInfoGrid"
            >
                <div
                    id="specificCompanyLogoContainer"
                >
                    <img 
                        id="specificCompanyLogo"
                        src={logo}
                        alt="companylogo"

                    />
                </div>

                <h3>{companyDescription}</h3>
            </div>
        </>
    )
}
export default JobOverview