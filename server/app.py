from flask import request, make_response 

from flask_restful import Resource 

from config import app, db, api, os 

import smtplib 

from email.mime.text import MIMEText

from models import Profile, EmploymentHistory, KeyRoles, EmployeeCaseStudies, EmployerReference, CaseStudyRoles, Education, SocialMedia, CapstoneProjects, CapstoneProjectAchievments, CapstoneProjectContext, Charities, WorkCountries, Emails, CardOptions
class Profiles(Resource):
    def get(self):
        profiles = [profile.to_dict(rules=(
            "-_password_hash",
        )) for profile in Profile.query.all()]
        return profiles, 200
    

#------------------------------------Employers Models------------------------------------
class Employers(Resource):
    def get(self):
        employers = [employer.to_dict() for employer in EmploymentHistory.query.all()]
        return employers, 200
    
    def post(self):
        json = request.get_json()
        try:
            new_employer = EmploymentHistory(
                name=json.get("employerName"),
                logo=json.get("employerLogo"),
                start_date=json.get("startDate"),
                end_date=json.get("endDate"),
                role=json.get("employerRole"),
                role_description=json.get("roleDescription")
            )
            db.session.add(new_employer)
            db.session.commit()
            return new_employer.to_dict(), 201 
        except ValueError as e:
            return{
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


#------------------------------------Roles Models------------------------------------
class EmployerRoles(Resource):
    def get(self):
        roles = [role.to_dict() for role in KeyRoles.query.all()]
        return roles, 200

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



class EmployerCaseStudy(Resource):
    def get(self):
        case_studies = [case_study.to_dict() for case_study in EmployeeCaseStudies.query.all()]
        return case_studies, 200

class EmployerCaseStudyId(Resource):
    def get(self, id):
        case_study_info = EmployeeCaseStudies.query.filter(EmployeeCaseStudies.id==id).first()
        if case_study_info:
            return make_response(case_study_info.to_dict(rules=(
                "-employer.key_roles",
                "-employer.case_studies",
                "-employer.reference",
            )), 201)
        return {
            "error": "case study not found"
        }, 404



class EmployerReferences(Resource):
    def get(self):
        employer_references = [employer_reference.to_dict() for employer_reference in EmployerReference.query.all()]
        return employer_references, 200

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



class WorkCaseStudy(Resource):
    def get(self):
        case_study_information = [case_study_info.to_dict() for case_study_info in CaseStudyRoles.query.all()]
        return case_study_information, 200 

class WorkCaseStudyId(Resource):
    def get(self, id):
        case_study_information = CaseStudyRoles.query.filter(CaseStudyRoles.id==id).first()
        if case_study_information:
            return make_response(case_study_information.to_dict(), 201)
        return{
            "error": "role not found"
        }, 404



class EducationalHistory(Resource):
    def get(self):
        education_information = [education_info.to_dict() for education_info in Education.query.all()]
        return education_information, 200 


class SocialMediaProfiles(Resource):
    def get(self):
        social_media_information = [social_media_info.to_dict() for social_media_info in SocialMedia.query.all()]
        return social_media_information, 200

class CapstoneProject(Resource):
    def get(self):
        capstone_information = [capstone_info.to_dict() for capstone_info in CapstoneProjects.query.all()]
        return capstone_information, 200


class CapstoneProjectAchievment(Resource):
    def get(self):
        capstone_achievment_information = [capstone_achievment_info.to_dict() for capstone_achievment_info in CapstoneProjectAchievments.query.all()]
        return capstone_achievment_information, 200

class CapstoneProjectTypes(Resource):
    def get(self):
        capstone_types = [capstone_type.to_dict() for capstone_type in CapstoneProjectContext.query.all()]
        return capstone_types, 200

class Charity(Resource):
    def get(self):
        charities = [charity.to_dict() for charity in Charities.query.all()]
        return charities, 200

class Countries(Resource):
    def get(self):
        countries = [country.to_dict() for country in WorkCountries.query.all()]
        return countries, 200

class CardOption(Resource):
    def get(self):
        card_options = [card_option.to_dict() for card_option in CardOptions.query.all()]
        return card_options, 200 

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

api.add_resource(Employers, '/employers')
api.add_resource(EmployersId, '/employers/<int:id>')

api.add_resource(EmployerRoles, '/employerroles')
api.add_resource(EmployerRolesId, '/employerroles/<int:id>')

api.add_resource(EmployerCaseStudy, '/employercasestudy')
api.add_resource(EmployerCaseStudyId, '/employercasestudy/<int:id>')

api.add_resource(EmployerReferences, '/employerreference')
api.add_resource(EmployerReferencesId, '/employerreference/<int:id>')

api.add_resource(WorkCaseStudy, '/workcasestudyrole')

api.add_resource(EducationalHistory, '/education')

api.add_resource(SocialMediaProfiles, '/socials')

api.add_resource(CapstoneProject, '/projects')

api.add_resource(CapstoneProjectAchievment, '/projectgoals')

api.add_resource(CapstoneProjectTypes, '/projecttypes')

api.add_resource(Charity, '/charities')

api.add_resource(Countries, '/countries')

api.add_resource(CardOption, '/options')

api.add_resource(Email, '/emails')
if __name__ == "__main__":
    app.run(port=5555, debug=True)