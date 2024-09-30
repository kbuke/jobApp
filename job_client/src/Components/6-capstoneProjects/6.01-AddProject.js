import { useState } from "react";
import "./6.01-AddProject.css";


function AddProject({
  setNewProject,
  allProjects,
  setAllProjects,
  appData
}) {
  const [newTitle, setNewTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newImg, setNewImg] = useState("");
  const [date, setDate] = useState();
  const [gitLink, setGitLink] = useState("");
  const [blogLink, setBlogLink] = useState("");
  const [educationId, setEducationId] = useState("");

  const allEducation = appData.allEducation;

  console.log(educationId)

  const renderEducationOptions = allEducation.map((education, index) => (
    <option value={education.id} key={index}>
      {education.school}
    </option>
  ));

  const handlePush = (e) => {
    e.preventDefault();
    const jsonData = {
      newTitle,
      description,
      newImg,
      date,
      gitLink,
      blogLink,
      educationId
    };
    fetch("/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData)
    })
      .then(r => r.json())
      .then(newProject => [
        setAllProjects([...allProjects, newProject])
      ])
      .then(setNewProject(false))
  };

  return (
    <form id="newCapstoneContainer" onSubmit={handlePush}>
      <h3>Add New Project</h3>

      <input
        placeholder="Enter project title"
        onChange={(e) => setNewTitle(e.target.value)}
        className="newProjectInput"
      />

      <input
        placeholder="Enter project description"
        onChange={(e) => setDescription(e.target.value)}
        className="newProjectInput"
      />

      <input
        placeholder="Enter project image"
        onChange={(e) => setNewImg(e.target.value)}
        className="newProjectInput"
      />

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        className="newProjectInput"
      />

      <input
        placeholder="Enter GitHub Link"
        onChange={(e) => setGitLink(e.target.value)}
        className="newProjectInput"
      />

      <input
        placeholder="Enter the Blog link"
        onChange={(e) => setBlogLink(e.target.value)}
        className="newProjectInput"
      />

      <select
        className="newProjectInput"
        onChange={(e) => setEducationId(e.target.value)}
        value={educationId}
      >
        <option value="" disabled>
          Select Institute
        </option>
        {renderEducationOptions}
      </select>

      <div>
        <button type="submit">Add New Project</button>
        <button type="button" onClick={() => setNewProject(false)}>Cancel</button>
      </div>
    </form>
  );
}

export default AddProject;
