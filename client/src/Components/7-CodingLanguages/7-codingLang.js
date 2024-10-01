import "./7-codingLang.css";


function CodingLanguages({
    appData,
    containerHeader
}) {
    const allLanguages = appData.allLanguages

    console.log(allLanguages)

    const options = ["Language", "Library", "Microframework"]

    const renderOptions = options.map((option, index) => {
        const languages = allLanguages.filter(language => language.language_type === option);
            return (
                <div 
                    id="languageContainers"
                    key={index}
                >
                    <h1
                        id="renderedOption"
                    >
                        {option}
                    </h1>
                    <div className="language-list">
                        {languages.map((language, i) => (
                            <div key={i} className="language-item">
                                <div
                                    id="languageLogoContainer"
                                >
                                    <img 
                                        src={language.logo} 
                                        alt={language.name} 
                                        className="language-logo"
                                    />
                                </div>
                                <h4
                                    id="renderedLang"
                                >
                                    {language.name}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
        );
    });

    return(
        <div
            id="popUpContainer"
        >
            <div
                id="largerPopUpContainer"
            >
                {containerHeader}
                {renderOptions}
            </div>
        </div>
    )
}

export default CodingLanguages;
