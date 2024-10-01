import { useEffect, useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  const [profile, setProfile] = useState([])

  const [allEmployers, setAllEmployers] = useState([])

  const [loggedUser, setLoggedUser] = useState(null)

  const [allEmails, setAllEmails] = useState([])

  const [allCards, setAllCards] = useState([])

  const [allEducation, setAllEducation] = useState([])

  const [allSocials, setAllSocials] = useState([])

  const [allLanguages, setAllLanguages] = useState([])

  const [allProjects, setAllProjects] = useState([])

  const [allReferences, setAllReferences] = useState([])

  const [allCharities, setAllCharities] = useState([])

  const [allRoles, setAllRoles] = useState([])

  const [allCaseStudies, setAllCaseStudies] = useState([])

  const [caseStudyRoles, setCaseStudyRoles] = useState([])

  const [allAchievments, setAllAchievements] = useState([])

  //hi


  //fetch profile details
  useEffect(() => {
    fetch("/profiles")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r 
    })
    .then(profile => setProfile(profile))
  }, [])

  //fetch loggedUser
  useEffect(() => {
    fetch(`/check_session`)
    .then((r) => {
      if(r.ok) {
        return r.json()
        .then(loggedUser => {
          console.log(typeof loggedUser)
          if(loggedUser.message === "Unauthorized user"){
            setLoggedUser(null)
          } else {
            setLoggedUser(loggedUser)}
          })
      }
    })
  }, [])

  console.log(loggedUser)

  //fetch all employers
  useEffect(() => {
    fetch("/employers")
    .then(r => {
        if(r.ok) {
            return r.json()
        }
        throw r 
    })
    .then(business => setAllEmployers(business))
  }, [])

  console.log(allEmployers)


  

  //fetch emails
  useEffect(() => {
    fetch("/emails")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r 
    })
    .then(email => setAllEmails(email))
  }, [])

  //fetch cards
  useEffect(() => {
    fetch("/options")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r 
    })
    .then(options => setAllCards(options))
  }, [])

  //fetch education history
  useEffect(() => {
    fetch("/education")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r 
    })
    .then(education => setAllEducation(education))
  }, [])

  //fetch roles
  useEffect(() => {
    fetch("/employerroles")
    .then(r => {
      if(r.ok){
        return r.json()
      }
      throw r 
    })
    .then(roles => setAllRoles(roles))
  }, [])

  //fetch project achievments
  useEffect(() => {
    fetch("/projectgoals")
    .then(r => {
      if(r.ok){
        return r.json()
      }
      throw r 
    })
    .then(achievments => setAllAchievements(achievments))
  }, [])

  useEffect(() => {
    fetch("/socials")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r 
    })
    .then(socials => setAllSocials(socials))
  }, [])

  //Fetch all languages
  useEffect(() => {
    fetch("/languages")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r 
    })
    .then(language => setAllLanguages(language))
  }, [])

  //fetch all projects
  useEffect(() => {
    fetch("/projects")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r 
    })
    .then(project => setAllProjects(project))
  }, [])


  //fetch all reviews
  useEffect(() => {
    fetch("/employerreference")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r 
    })
    .then(ref => setAllReferences(ref))
  }, [])

  //fetch all charities
  useEffect(() => {
    fetch("/charities")
    .then(r => {
      if(r.ok) {
        return r.json()
      }
      throw r 
    })
    .then(charity => setAllCharities(charity))
  }, [])

  //fetch all casestudies
  useEffect(() => {
    fetch("/employercasestudy")
    .then(r => {
      if(r.ok){
        return r.json()
      }
      throw r 
    })
    .then(study => setAllCaseStudies(study))
  }, [])

  console.log(loggedUser)

  useEffect(() => {
    fetch("/workcasestudyrole")
    .then(r => {
      if(r.ok){
        return r.json()
      }
      throw r 
    })
    .then(role => setCaseStudyRoles(role))
  }, [])

  return(
    <Outlet 
      context={
        {
          profileInfo: profile,
          setProfile: setProfile,

          allEmails: allEmails,
          setAllEmails: setAllEmails,

          allCards: allCards,
          setAllCards: setAllCards,

          allEducation: allEducation,
          setAllEducation: setAllEducation,

          allSocials: allSocials, 
          setAllSocials: setAllSocials,

          allLanguages: allLanguages,
          setAllLanguages: setAllLanguages,

          allProjects: allProjects,
          setAllProjects: setAllProjects,

          allReferences: allReferences,
          setAllReferences: setAllReferences,

          allCharities: allCharities,
          setAllCharities: setAllCharities,

          loggedUser: loggedUser,
          setLoggedUser: setLoggedUser,

          allRoles: allRoles,
          setAllRoles: setAllRoles,

          allEmployers: allEmployers,
          setAllEmployers: setAllEmployers,

          allCaseStudies: allCaseStudies,
          setAllCaseStudies: setAllCaseStudies,

          caseStudyRoles: caseStudyRoles,
          setCaseStudyRoles: setCaseStudyRoles,

          allAchievments: allAchievments,
          setAllAchievements: setAllAchievements
        }
      }
    />
  )
}

export default App;
