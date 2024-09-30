from flask import request, make_response, session, render_template

from datetime import datetime

from flask_restful import Resource 

from config import app, db, api, os 

import smtplib 

from email.mime.text import MIMEText

from models import Profile, EmploymentHistory, KeyRoles, EmployeeCaseStudies, EmployerReference, CaseStudyRoles, Education, SocialMedia, CapstoneProjects, CapstoneProjectAchievments, CapstoneProjectContext, Charities, WorkCountries, Emails, CardOptions, SoftwareLanguages

#test

@app.route('/')
def index ():
    return render_template("index.html")

class Profiles(Resource):
    def get(self):
        profiles = [profile.to_dict() for profile in Profile.query.all()]
        return profiles, 200

class ProfilesId(Resource):
    def get(self, id):
        user_info = Profile.query.filter(Profile.id==id).first()
        if user_info:
            return make_response(user_info.to_dict(), 201)
        return {
            "error": "user not found"
        }, 404
    
    def patch(self, id):
        data = request.get_json()
        user_info = Profile.query.filter(Profile.id == id).first()

        if user_info:
            try:
                # Handle password hashing separately
                if '_password_hash' in data:
                    user_info.password_hash = data.pop('_password_hash')  # Use the setter to hash the password

                # Set other attributes
                for attr, value in data.items():
                    setattr(user_info, attr, value)

                db.session.commit()

                return make_response(user_info.to_dict(), 202)
            except ValueError:
                return {
                    "error": ["Validation Error"]
                }, 400
        return {
            "error": "Profile not found"
        }, 404

#------------------------------------Employers Models------------------------------------
class Employers(Resource):
    def get(self):
        employers = [employer.to_dict() for employer in EmploymentHistory.query.all()]
        return employers, 200
    
    def post(self):
        json = request.get_json()
        try:
            # Convert the string dates to datetime.date
            start_date = datetime.strptime(json.get("startDate"), "%Y-%m-%d").date()
            end_date = None
            if json.get("endDate"):
                end_date = datetime.strptime(json.get("endDate"), "%Y-%m-%d").date()

            new_employer = EmploymentHistory(
                name=json.get("employerName"),
                logo=json.get("employerLogo"),
                start_date=start_date,
                end_date=end_date,
                role=json.get("employerRole"),
                role_description=json.get("roleDescription")
            )
            db.session.add(new_employer)
            db.session.commit()
            return new_employer.to_dict(), 201 

        except ValueError as e:
            return {
                "error": [str(e)]
            }, 400

class EmployersId(Resource):
    def get(self, id):
        employer_info = EmploymentHistory.query.filter(EmploymentHistory.id==id).first()
        if employer_info:
            return make_response(employer_info.to_dict(rules=(
                "-key_roles.employer_id",

                "-case_studies.employer_id",
                "-case_studies.case_study_role",

                "-reference.employer_id",

                "-capstone_project.employer_id",
                "-capstone_project.education_id"
            )), 201)
        return{
            "error": "employer not found"
        }, 404
    
    def patch(self, id):
        data=request.get_json()
        employer_info = EmploymentHistory.query.filter(EmploymentHistory.id==id).first()

        if employer_info:
            try:
                if "start_date" in data:
                    try:
                        data["start_date"] = datetime.strptime(data["start_date"], "%Y-%m-%d").date()
                    except ValueError:
                        return {"error": "Invalid start_date format"}, 400
                
                if "end_date" in data:
                    try:
                        data["end_date"] = datetime.strptime(data["end_date"], "%Y-%m-%d").date()
                    except ValueError:
                        return {"error": "Invalid end_date format"}, 400
        
                for attr in data:
                    setattr(employer_info, attr, data[attr])
        
                db.session.add(employer_info)
                db.session.commit()

                return make_response(employer_info.to_dict(), 202)
            except ValueError:
                return{"error": ["Validation error"]}, 400 
        return {"error": "Employer not found"}, 404

    
    def delete(self, id):
        employer_info = EmploymentHistory.query.filter(EmploymentHistory.id==id).first()
        if employer_info:
            db.session.delete(employer_info)
            db.session.commit()
            return{
                "message": "Employer deleted"
            }, 200
        return {
            "error": "Employer not found"
        }, 404
    
    


#------------------------------------Roles Models------------------------------------
class EmployerRoles(Resource):
    def get(self):
        roles = [role.to_dict() for role in KeyRoles.query.all()]
        return roles, 200

    def post(self):
        json = request.get_json()
        print("Received JSON:", json)  # Debugging

        try:
            # Check if the request comes from charity or employer
            charity_id = json.get("selectedCharityId")
            employer_id = json.get("selectedBusinessId")

            # Validate that at least one of them is provided
            if not charity_id and not employer_id:
                return {"error": "Either Charity ID or Employer ID is required."}, 400

            # Validate the role description
            if not json.get("newRole"):
                return {"error": "Role description is required."}, 400
            

            # Create the new role based on which ID is present
            new_role = KeyRoles(
                role=json.get("newRole"),
                charity_id=charity_id if charity_id else None,
                employer_id=employer_id if employer_id else None
            )
        
            db.session.add(new_role)
            db.session.commit()

            return new_role.to_dict(), 201

        except ValueError as e:
            print(f"Validation Error: {e}")  # Detailed logging
            return {"error": [str(e)]}, 400

        except Exception as e:
            print(f"Unexpected Error: {e}")  # Catching general errors
            return {"error": "An unexpected error occurred."}, 500




class EmployerRolesId(Resource):
    def get(self, id):
        role_info = KeyRoles.query.filter(KeyRoles.id==id).first()
        if role_info:
            return make_response(role_info.to_dict(rules=(
                "-employer.key_roles",
                "-employer.case_studies",
                "-employer.reference",
            )), 201)
        return {
            "error": "role not found"
        }, 404
    
    def patch(self, id):
        data=request.get_json()
        role_info = KeyRoles.query.filter(KeyRoles.id==id).first()
        if role_info:
            try:
                for attr in data:
                    setattr(role_info, attr, data[attr])
                db.session.add(role_info)
                db.session.commit()
                return make_response(role_info.to_dict(), 202)
            except ValueError:
                return{
                    "error": ["Validation Error"]
                }, 400
        return{
            "error": "Role not found"
        }, 404
    
    def delete(self, id):
        role_info = KeyRoles.query.filter(KeyRoles.id == id).first()
        if role_info:
            db.session.delete(role_info)
            db.session.commit()
            return{
                "message": "Employed role deleted"
            }, 200
        return {
            "error": "Employed Role not found"
        }, 404
    



class EmployerCaseStudy(Resource):
    def get(self):
        case_studies = [case_study.to_dict() for case_study in EmployeeCaseStudies.query.all()]
        return case_studies, 200
    
    def post(self):
        json = request.get_json()
        try:
            charity_id = json.get("selectedCharityId")
            employer_id = json.get("selectedBusinessId")

            if not charity_id and not employer_id:
                return {"error": "Either Charity ID or Employer ID is required."}, 400

            if not json.get("newTitle"):
                return {"error": "Role description is required."}, 400
            
            new_study = EmployeeCaseStudies(
                title=json.get("newTitle"),
                country=json.get("newCountry"),
                city=json.get("newCity"),
                case_study_info=json.get("studyInfo"),
                case_study_img=json.get("newImg"),
                employer_id=employer_id if employer_id else None,
                charity_id=charity_id if charity_id else None,
            )
            db.session.add(new_study)
            db.session.commit()

            return new_study.to_dict(), 201 

        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400
        
        except Exception as e:
            return{"error": "An unexpected error occured"}, 500

class EmployerCaseStudyId(Resource):
    def get(self, id):
        case_study_info = EmployeeCaseStudies.query.filter(EmployeeCaseStudies.id==id).first()
        if case_study_info:
            return make_response(case_study_info.to_dict(rules=(
                "-employer.key_roles",
                "-employer.case_studies",
                "-employer.reference",
                 "-case_study_role.caseStudy",
            )), 201)
        return {
            "error": "case study not found"
        }, 404

    def patch(self, id):
        data=request.get_json()
        case_study_info = EmployeeCaseStudies.query.filter(EmployeeCaseStudies.id==id).first()
        if case_study_info:
            try:
                for attr in data:
                    setattr(case_study_info, attr, data[attr])
                db.session.add(case_study_info)
                db.session.commit()
                return make_response(case_study_info.to_dict(), 202)
            except ValueError:
                return{
                    "error": ["Validation Error"]
                }, 400 
        return {
            "error": "Case study not found"
        }, 404

    def delete(self, id):
        case_study_info = EmployeeCaseStudies.query.filter(EmployeeCaseStudies.id == id).first()
        if case_study_info:
            db.session.delete(case_study_info)
            db.session.commit()
            return {
                "message": "Case study deleted"
            }, 200 
        return {
            "error": "Case study not found"
        }, 404



class EmployerReferences(Resource):
    def get(self):
        employer_references = [employer_reference.to_dict() for employer_reference in EmployerReference.query.all()]
        return employer_references, 200
    
    def post(self):
        json=request.get_json()
        breakpoint()
        try:
            charity_id = json.get("selectedCharityId")
            employer_id = json.get("employer_id")

            # Validate that at least one of them is provided
            if not charity_id and not employer_id:
                return {"error": "Either Charity ID or Employer ID is required."}, 400

            # Validate the role description
            if not json.get("newTitle"):
                return {"error": "Role description is required."}, 400
            
            new_ref = EmployerReference(
                title = json.get("newTitle"),
                first_name = json.get("newFirstName"),
                last_name = json.get("newLastName"),
                position = json.get("newPosition"),
                email = json.get("newEmail"),
                reference_image = json.get("newImg"),
                charity_id = charity_id,
                employer_id = employer_id
            )

            db.session.add(new_ref)
            db.session.commit()

            return new_ref.to_dict(), 201
        
        except ValueError as e:
            print(f"Validation Error: {e}")
            return {"error": [str(e)]}, 400

class EmployerReferencesId(Resource):
    def get(self, id):
        reference_info = EmployerReference.query.filter(EmployerReference.id==id).first()
        if reference_info:
            return make_response(reference_info.to_dict(rules=(
                "-employer.key_roles",
                "-employer.case_studies",
                "-employer.reference",
            )), 201)
        return {
            "error": "reference not found"
        }, 404
    
    def patch(self, id):
        data=request.get_json()
        ref_info = EmployerReference.query.filter(EmployerReference.id==id).first()
        if ref_info:
            try:
                for attr in data:
                    setattr(ref_info, attr, data[attr])
                db.session.add(ref_info)
                db.session.commit()
                return make_response(ref_info.to_dict(), 202)
            except ValueError:
                return{
                    "error": ["Validation Error"]
                }, 400
        return {
            "error": "Reference not found"
        }, 404
    
    def delete(self, id):
        ref_info = EmployerReference.query.filter(EmployerReference.id==id).first()
        if ref_info:
            db.session.delete(ref_info)
            db.session.commit()
            return {
                "message": "Reference deleted"
            }, 200 
        return {
            "error": "Reference not found"
        }



class WorkCaseStudy(Resource):
    def get(self):
        case_study_information = [case_study_info.to_dict() for case_study_info in CaseStudyRoles.query.all()]
        return case_study_information, 200 
    
    def post(self):
        json=request.get_json()
        try:
            new_role = CaseStudyRoles(
                role = json.get("newRole"),
                case_study_id = json.get("selectCaseStudyId")
            )
            db.session.add(new_role)
            db.session.commit()
            return new_role.to_dict(), 201
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class WorkCaseStudyId(Resource):
    def get(self, id):
        case_study_information = CaseStudyRoles.query.filter(CaseStudyRoles.id==id).first()
        if case_study_information:
            return make_response(case_study_information.to_dict(), 201)
        return{
            "error": "role not found"
        }, 404

    def patch(self, id):
        data=request.get_json()
        case_study_roles = CaseStudyRoles.query.filter(CaseStudyRoles.id==id).first()
        if case_study_roles:
            try:
                for attr in data:
                    setattr(case_study_roles, attr, data[attr])
                db.session.add(case_study_roles)
                db.session.commit()
                return make_response(case_study_roles.to_dict(), 202)
            except ValueError:
                return{
                    "error": ["Validation Error"]
                }, 400
            return {
                "error": "Case Study Role not found"
            }, 404
    
    def delete(self, id):
        case_study_info = CaseStudyRoles.query.filter(CaseStudyRoles.id == id).first()
        if case_study_info:
            db.session.delete(case_study_info)
            db.session.commit()
            return{
                "message": "Study role deleted"
            }, 200 
        return{
            "error": "Study role not found"
        }, 404


class EducationalHistory(Resource):
    def get(self):
        education_information = [education_info.to_dict() for education_info in Education.query.all()]
        return education_information, 200 
    
    def post(self):
        json = request.get_json()
        try:
            start_date = datetime.strptime(json.get("startDate"), "%Y-%m-%d").date()
            end_date = None
            if json.get("endDate"):
                end_date = datetime.strptime(json.get("endDate"), "%Y-%m-%d").date()

            new_school = Education(
                school=json.get("schoolName"),
                subject_studied=json.get("subjects"),  # corrected field
                grade=json.get("grade"),
                school_image=json.get("schoolLogo"),
                city=json.get("city"),
                country=json.get("country"),
                start_date=start_date,
                end_date=end_date
            )
            db.session.add(new_school)
            db.session.commit()
            return new_school.to_dict(), 201

        except ValueError as e:
            return {
                "error": [str(e)]
            }, 400

class EducationHistoryId(Resource):
    def get(self, id):
        education_info = Education.query.filter(Education.id==id).first()
        if education_info:
            return make_response(education_info.to_dict(), 201)
        return {
            "error": "school not found"
        }, 404 
    
    def patch(self, id):
        data = request.get_json()
        education_info = Education.query.filter(Education.id==id).first()

        if education_info:
            try:
                if "start_date" in data:
                    try:
                        data["start_date"] = datetime.strptime(data["start_date"], "%Y-%m-%d").date()
                    except ValueError:
                        return {"error": "Invalid start_date format"}, 400
                
                if "end_date" in data:
                    try:
                        data["end_date"] = datetime.strptime(data["end_date"], "%Y-%m-%d").date()
                    except ValueError:
                        return {"error": "Invalid end_date format"}, 400
        
                for attr in data:
                    setattr(education_info, attr, data[attr])
        
                db.session.add(education_info)
                db.session.commit()

                return make_response(education_info.to_dict(), 202)
            except ValueError:
                return{"error": ["Validation error"]}, 400 
        return {"error": "School not found"}, 404

    def delete(self, id):
        school_info= Education.query.filter(Education.id==id).first()
        if school_info:
            db.session.delete(school_info)
            db.session.commit()
            return {
                "message": "School Deleted"
            }, 200
        return {
            "error": "School not found"
        }, 404

    


class SocialMediaProfiles(Resource):
    def get(self):
        social_media_information = [social_media_info.to_dict() for social_media_info in SocialMedia.query.all()]
        return social_media_information, 200
    
    def post(self):
        json = request.get_json()
        try:
            new_social = SocialMedia(
                url=json.get("newSocial"),
                logo=json.get("newLogo")
            )
            db.session.add(new_social)
            db.session.commit()
            return new_social.to_dict(), 201 
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class SocialMediaProfilesId(Resource):
    def get(self, id):
        socials_info = SocialMedia.query.filter(SocialMedia.id==id).first()
        if socials_info:
            return make_response(socials_info.to_dict())
    
    def delete(self, id):
        socials_info = SocialMedia.query.filter(SocialMedia.id==id).first()
        if socials_info:
            db.session.delete(socials_info)
            db.session.commit()
            return{
                "message": "Socials profile deleted"
            }, 200
        return {
            "error": "Socials profile not found"
        }, 404


class CapstoneProject(Resource):
    def get(self):
        capstone_information = [capstone_info.to_dict() for capstone_info in CapstoneProjects.query.all()]
        return capstone_information, 200
    
    def post(self):
        json = request.get_json()
        date = datetime.strptime(json.get("date"), "%Y-%m-%d").date()
        try:
            new_project = CapstoneProjects(
                name = json.get("newTitle"),
                git_hub_link = json.get("gitLink"),
                description = json.get("description"),
                blog_link = json.get("blogLink"),
                date = date,
                image = json.get("newImg"),
                education_id=json.get("educationId")
            )
            db.session.add(new_project)
            db.session.commit()
            return new_project.to_dict(), 201
        
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class CapstoneProjectId(Resource):
    def get(self, id):
        project_info = CapstoneProjects.query.filter(CapstoneProjects.id==id).first()
        if project_info:
            return make_response(project_info.to_dict(rules=(
                "-employer",
                "-charity",

                "-education.capstone_project",
                "-education.city",
                "-education.country",
                "-education.end_date",
                "-education.grade",
                "-education.school",
                "-education.start_date",
                "-education.subject_studied",

                "-capstone_achievment.capstone_project",
            )))

    def patch(self, id):
        data=request.get_json()
        project_info=CapstoneProjects.query.filter(CapstoneProjects.id==id).first()

        if project_info:
            try:
                if "date" in data:
                    try:
                        data["date"] = datetime.strptime(data["date"], "%Y-%m-%d").date()
                    except ValueError:
                        return{"error": "Invalid date format"}, 400

                for attr in data:
                    setattr(project_info, attr, data[attr])
                db.session.add(project_info)
                db.session.commit()
                return make_response(project_info.to_dict(), 202)
            except ValueError:
                return{
                    "error": ["Validation error"]
                }, 400
        return {
            "error": "Project not found"
        }, 404
    
    def delete(self, id):
        project_info = CapstoneProjects.query.filter(CapstoneProjects.id==id).first()
        if project_info:
            db.session.delete(project_info)
            db.session.commit()
            return{
                "message": "Project not deleted"
            }, 200 
        return {
            "error": "Project not found"
        }, 404


class CapstoneProjectAchievment(Resource):
    def get(self):
        capstone_achievment_information = [capstone_achievment_info.to_dict() for capstone_achievment_info in CapstoneProjectAchievments.query.all()]
        return capstone_achievment_information, 200
    
    def post(self):
        json=request.get_json()
        try:
            new_achievment = CapstoneProjectAchievments(
                achievment=json.get("newAchievment"),
                image=json.get("newImg"),
                capstone_id=json.get("projectId")
            )
            db.session.add(new_achievment)
            db.session.commit()
            return new_achievment.to_dict(), 201
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class CapstoneProjectAchievmentId(Resource):
    def get(self, id):
        achievment_info = CapstoneProjectAchievments.query.filter(CapstoneProjectAchievments.id==id).first()
        if achievment_info:
            return make_response(achievment_info.to_dict(), 201)
        return {
            "error": "achievment not found"
        }, 404
    
    def patch(self, id):
        data=request.get_json()
        achievment_info=CapstoneProjectAchievments.query.filter(CapstoneProjectAchievments.id==id).first()
        if achievment_info:
            try:
                for attr in data:
                    setattr(achievment_info, attr, data[attr])
                db.session.add(achievment_info)
                db.session.commit()
                return make_response(achievment_info.to_dict(), 202)
            except ValueError:
                return{
                    "error": ["Validation Error"]
                }, 400
        return {
            "error": "Achievment not found"
        }, 404
    
    def delete(self, id):
        achievment_info=CapstoneProjectAchievments.query.filter(CapstoneProjectAchievments.id==id).first()
        if achievment_info:
            db.session.delete(achievment_info)
            db.session.commit()
            return {
                "message": "Achievment deleted"
            }, 200
        return {
            "error": "Achievment not found"
        }, 404
    


class CapstoneProjectTypes(Resource):
    def get(self):
        capstone_types = [capstone_type.to_dict() for capstone_type in CapstoneProjectContext.query.all()]
        return capstone_types, 200

class Charity(Resource):
    def get(self):
        charities = [charity.to_dict() for charity in Charities.query.all()]
        return charities, 200

    def post(self):
        json = request.get_json()

        try:
            # Parse start date
            start_date = datetime.strptime(json.get("start_date"), "%Y-%m-%d").date()

            # Handle end date: either a valid date or "Present"
            end_date = None
            end_date_input = json.get("end_date")
            if end_date_input:
                if end_date_input == "Present":
                    end_date = "Present"  # Store "Present" as a string
                else:
                    end_date = str(datetime.strptime(end_date_input, "%Y-%m-%d").date())

            # Create new charity entry
            new_charity = Charities(
                name=json.get("name"),
                logo=json.get("logo"),
                charity_description=json.get("description"),
                role=json.get("role"),
                start_date=start_date,
                end_date=end_date  # Set end date (either a date string or "Present")
            )

            # Save to the database
            db.session.add(new_charity)
            db.session.commit()

            return new_charity.to_dict(), 201

        except ValueError as e:
            return {
                "error": f"Invalid date format: {str(e)}"
            }, 400

        except Exception as e:
            return {
                "error": f"Something went wrong: {str(e)}"
            }, 500

class CharityId(Resource):
    def get(self, id):
        charity_info = Charities.query.filter(Charities.id==id).first()
        if charity_info:
            return make_response(charity_info.to_dict(rules=(
                "-key_roles.charity",
                "-reference.charity",
                # "-caseStudy.charity",
                # "-caseStudy.case_study_role",
                "-case_studies.charity",
            )), 201)
        return{
            "error": "charity not found"
        }, 404
    
    def delete(self, id):
        charity_info = Charities.query.filter(Charities.id==id).first()
        if charity_info:
            db.session.delete(charity_info)
            db.session.commit()
            return{
                "message": "Charity not deleted"
            }, 200
        return {
            "error": "Charity not found"
        }, 404

    def patch(self, id):
        data = request.get_json()
        charity_info = Charities.query.filter(Charities.id == id).first()
        
        if charity_info:
            try:
                # Convert start_date and end_date to Python date objects if they are not "Present"
                if "start_date" in data:
                    try:
                        data["start_date"] = datetime.strptime(data["start_date"], "%Y-%m-%d").date()
                    except ValueError:
                        return {"error": "Invalid start_date format"}, 400
                
                if "end_date" in data:
                    if data["end_date"] != "Present":
                        try:
                            data["end_date"] = datetime.strptime(data["end_date"], "%Y-%m-%d").date()
                        except ValueError:
                            return {"error": "Invalid end_date format"}, 400

                # Update charity attributes
                for attr in data:
                    setattr(charity_info, attr, data[attr])
                
                db.session.add(charity_info)
                db.session.commit()

                return make_response(charity_info.to_dict(), 202)
            except ValueError:
                return {"error": ["Validation error"]}, 400
        return {"error": "Charity not found"}, 404
    

class Countries(Resource):
    def get(self):
        countries = [country.to_dict() for country in WorkCountries.query.all()]
        return countries, 200

class CardOption(Resource):
    def get(self):
        card_options = [card_option.to_dict() for card_option in CardOptions.query.all()]
        return card_options, 200 

class SofwareLanguage(Resource):
    def get(self):
        languages = [language.to_dict() for language in SoftwareLanguages.query.all()]
        return languages, 200

class Login(Resource):
    def post(self):
        json = request.get_json()
        email = json.get("email")
        password = json.get("password")

        if not email or not password:
            return {"error": "Email and Password required"}, 400
        
        user = Profile.query.filter(Profile.email == email).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id 
            return user.to_dict(), 200 
        
        return {"error": "Inavlid username or password"}, 401

class Logout(Resource):
    def delete(self):
        user_id = session.get("user_id")
        if user_id:
            session.pop("user_id")
            return {}, 204 
        return {"message": "Unauthorized"}, 401

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = Profile.query.filter(Profile.id == user_id).first()
            if user:
                return user.to_dict(), 200
        return {"message": "Unauthorized user"}


class Email(Resource):
    def get(self):
        emails = [email.to_dict() for email in Emails.query.all()]
        return emails

    def post(self):
        json = request.get_json()

        # Extract the email details from the request body
        recipient = json.get("userEmail")          # Your email (where the message is sent)
        sender = json.get("respondAddress")        # The sender's email (provided by the user)
        subject = json.get("emailSubject")
        message_body = json.get("emailMessage")

        try:
            # Save email details to database
            new_email = Emails(
                recipient=recipient,
                sender=sender,
                subject=subject,
                message=message_body
            )
            db.session.add(new_email)
            db.session.commit()

            # SMTP server configuration
            smtp_server = "smtp.gmail.com"
            smtp_port = 587
            sender_email = "kabuke13@gmail.com"  
            sender_password = "qnwx hges envp ivzq"  

            # Construct the email message
            msg = MIMEText(f"From: {sender}\n\nMessage:\n{message_body}")
            msg["Subject"] = subject
            msg["From"] = sender_email  # The sender (you)
            msg["To"] = recipient        # The recipient (you)

            # Send the email via Gmail SMTP
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()  # Secure the connection
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient, msg.as_string())
            server.quit()

            return {"message": "Email sent successfully"}, 201

        except smtplib.SMTPException as smtp_error:
            return {"error": "Failed to send email: " + str(smtp_error)}, 500





api.add_resource(Profiles, '/profiles')
api.add_resource(ProfilesId, '/profiles/<int:id>')

api.add_resource(Employers, '/employers')
api.add_resource(EmployersId, '/employers/<int:id>')

api.add_resource(EmployerRoles, '/employerroles')
api.add_resource(EmployerRolesId, '/employerroles/<int:id>')

api.add_resource(EmployerCaseStudy, '/employercasestudy')
api.add_resource(EmployerCaseStudyId, '/employercasestudy/<int:id>')

api.add_resource(EmployerReferences, '/employerreference')
api.add_resource(EmployerReferencesId, '/employerreference/<int:id>')

api.add_resource(WorkCaseStudy, '/workcasestudyrole')
api.add_resource(WorkCaseStudyId, '/workcasestudyrole/<int:id>')

api.add_resource(EducationalHistory, '/education')
api.add_resource(EducationHistoryId, '/education/<int:id>')

api.add_resource(SocialMediaProfiles, '/socials')
api.add_resource(SocialMediaProfilesId, '/socials/<int:id>')

api.add_resource(CapstoneProject, '/projects')
api.add_resource(CapstoneProjectId, '/projects/<int:id>')

api.add_resource(CapstoneProjectAchievment, '/projectgoals')
api.add_resource(CapstoneProjectAchievmentId, '/projectgoals/<int:id>')

api.add_resource(CapstoneProjectTypes, '/projecttypes')

api.add_resource(Charity, '/charities')
api.add_resource(CharityId, '/charities/<int:id>')

api.add_resource(Countries, '/countries')

api.add_resource(CardOption, '/options')

api.add_resource(SofwareLanguage, '/languages')

api.add_resource(Login, '/login')

api.add_resource(Logout, '/logout')

api.add_resource(CheckSession, '/check_session')

api.add_resource(Email, '/emails')
if __name__ == "__main__":
    app.run(port=5555, debug=True)