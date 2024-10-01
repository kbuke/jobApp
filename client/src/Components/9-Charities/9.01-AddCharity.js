import { useState } from "react";
import "./9.01-AddCharity.css";

function AddCharity({
    allCharities,
    setAllCharities,
    setAddCharity
}) {
    const [newCharityName, setNewCharityName] = useState("");
    const [newCharityDescription, setNewCharityDescription] = useState("");
    const [newCharityImg, setNewCharityImg] = useState("");
    const [newCharityRole, setNewCharityRole] = useState("");
    const [charityStartDate, setCharityStartDate] = useState("");
    const [charityEndDate, setCharityEndDate] = useState("");
    const [isPresent, setIsPresent] = useState(false);  // New state for 'Present' toggle

    const handleNewCharity = (e) => {
        e.preventDefault();

        const newCharity = {
            name: newCharityName,
            description: newCharityDescription,
            logo: newCharityImg,
            role: newCharityRole,
            start_date: charityStartDate,
            end_date: isPresent ? "Present" : charityEndDate  // Check if 'Present' is selected
        };

        // Submit newCharity to the backend
        console.log(newCharity);

        fetch("/charities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCharity)
        })
            .then(r => r.json())
            .then(newCharity => {
                setAllCharities([...allCharities, newCharity])
            })
            .then(setAddCharity(false))
    };

    return (
        <form
            id="addCharityContainer"
            onSubmit={handleNewCharity}
        >
            <h3>Create New Charity</h3>
            <div>
                <input
                    placeholder="Enter the name of the charity"
                    className="newCharityInfo"
                    onChange={(e) => setNewCharityName(e.target.value)}
                />

                <input
                    placeholder="Enter a description of the charity"
                    className="newCharityInfo"
                    onChange={(e) => setNewCharityDescription(e.target.value)}
                />

                <input
                    placeholder="Enter the charities logo/image"
                    className="newCharityInfo"
                    onChange={(e) => setNewCharityImg(e.target.value)}
                />

                <input
                    placeholder="Enter your role"
                    className="newCharityInfo"
                    onChange={(e) => setNewCharityRole(e.target.value)}
                />

                <input
                    type="date"
                    placeholder="Enter Start Date"
                    className="newCharityInfo"
                    onChange={(e) => setCharityStartDate(e.target.value)}
                />

                <input
                    type="date"
                    placeholder="Enter End Date"
                    className="newCharityInfo"
                    onChange={(e) => setCharityEndDate(e.target.value)}
                    disabled={isPresent}  // Disable date input if 'Present' is checked
                />

                <label>
                    <input
                        type="checkbox"
                        checked={isPresent}
                        onChange={() => setIsPresent(!isPresent)}
                    />
                    Currently working here (Present)
                </label>
            </div>

            <div
                id="newCharityButtonsContainer"
            >
                <button
                    type="submit"
                >
                    Create New Charity
                </button>

                <button
                    type="button"
                    onClick={() => setAddCharity(false)}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default AddCharity;
