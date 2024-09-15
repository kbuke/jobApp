from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Date
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
import re

#-------------------------Set up my profile intro-------------------------
class Profile(db.Model, SerializerMixin):
    __tablename__ = "profile"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Integer, nullable=False)
    profile_bio = db.Column(db.String, nullable=False)
    employed = db.Column(db.Boolean, nullable=False)
    looking_work = db.Column(db.Boolean, nullable=False, server_default="")
    _password_hash = db.Column(db.String, nullable=False)
    home_town = db.Column(db.String, nullable=True)
    home_country = db.Column(db.String, nullable=True)
    current_town = db.Column(db.String, nullable=False)
    current_country = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)

    countries = db.relationship("WorkCountries", backref="profile")

    #Password hashing and authentication
    @hybrid_property
    def password_hash(self):
        raise AttributeError("password: write-only attribute")

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

#-------------------------Set up employment history model-------------------------
class EmploymentHistory(db.Model, SerializerMixin):
    __tablename__ = "employmentHistory"

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    logo=db.Column(db.String, nullable=False)
    start_date=db.Column(db.Date, nullable=False)
    end_date=db.Column(db.Date, nullable=True)
    role=db.Column(db.String, nullable=False)
    role_description=db.Column(db.String, nullable=False)

    #Add relation
    key_roles = db.relationship("KeyRoles", backref="employer")
    case_studies = db.relationship("EmployeeCaseStudies", backref="employer")
    reference = db.relationship("EmployerReference", backref="employer")
    capstone_project = db.relationship("CapstoneProjects", backref="employer")

    serialize_rules = (
        "-key_roles",
        "-case_studies",
        "-reference",
        "-capstone_project",
    )

#-------------------------Set up employment roles-------------------------
class KeyRoles(db.Model, SerializerMixin):
    __tablename__ = "keyRoles"

    id=db.Column(db.Integer, primary_key=True)
    role=db.Column(db.String, nullable=False)

    #Add relations
    employer_id=db.Column(db.Integer, db.ForeignKey("employmentHistory.id"), nullable=True)
    charity_id=db.Column(db.Integer, db.ForeignKey("charities.id"), nullable=True)

    serialize_rules = (
        "-employer",
        "-charity",
    )

    #Add validation methods
    @validates("employer_id", "charity_id")
    def validate_employer_or_charity(self, key, value):
        #Get current employer and charity ids
        employer_id = self.employer_id
        charity_id = self.charity_id 

        if key == "employer_id":
            employer_id = value 
        elif key == "charity_id":
            charity_id = value 
        
        if employer_id is None and charity_id is None:
            raise ValueError("There must be at least one employer or charity id")

        return value

#-------------------------Set up prev employment case studies-------------------------
class EmployeeCaseStudies(db.Model, SerializerMixin):
    __tablename__ = "employmentCaseStudy"

    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String, nullable=False)
    country=db.Column(db.String, nullable=True)
    city=db.Column(db.String, nullable=True)
    case_study_info=db.Column(db.String, nullable=False)
    case_study_img=db.Column(db.String, nullable=True)

    #Add relationship
    employer_id = db.Column(db.Integer, db.ForeignKey("employmentHistory.id"), nullable=True)
    charity_id = db.Column(db.Integer, db.ForeignKey("charities.id"), nullable=True)
    case_study_role = db.relationship("CaseStudyRoles", backref="caseStudy")

    serialize_rules = (
        "-employer",
        "-charity",
        "-case_study_role",
    )

    #Add validation 
    @validates("employer_id", "charity_id")
    def validate_employer_or_charity(self, key, value):
        employer_id = self.employer_id 
        charity_id = self.charity_id

        if key == "employer_id":
            employer_id = value 
        elif key == "charity_id":
            charity_id = value 
        
        if employer_id is None and charity_id is None:
            raise ValueError("At least one employer or charity id must be given")
        
        return value 

#-------------------------Set up employers references-------------------------
class EmployerReference(db.Model, SerializerMixin):
    __tablename__ = "employmentReference"

    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String, nullable=False)
    first_name=db.Column(db.String, nullable=False)
    last_name=db.Column(db.String, nullable=False)
    position=db.Column(db.String, nullable=False)
    email=db.Column(db.String, nullable=False)
    reference_image=db.Column(db.String, nullable=True)

    #Add relationship
    employer_id = db.Column(db.Integer, db.ForeignKey("employmentHistory.id"), nullable=True)
    charity_id = db.Column(db.Integer, db.ForeignKey("charities.id"), nullable=True)

    serialize_rules = (
        "-key_roles",
        "-case_studies",
        "-reference",
        "-employer",
        "-charity",
    )

    #Add validations
    @validates("employer_id", "charity_id")
    def validate_employer_or_charity(self, key, value):
        employer_id = self.employer_id
        charity_id = self.charity_id 

        if key == "employer_id":
            employer_id = value 
        elif key == "charity_id":
            charity_id = value 
        
        if employer_id is None and charity_id is None:
            raise ValueError("At least one employer or charity id must be given")
        
        return value 

#-------------------------Set up case study roles-------------------------
class CaseStudyRoles(db.Model, SerializerMixin):
    __tablename__ = "caseStudyRole"

    id=db.Column(db.Integer, primary_key=True)
    role=db.Column(db.String, nullable=False)

    case_study_id = db.Column(db.Integer, db.ForeignKey("employmentCaseStudy.id"), nullable=False)

    serialize_rules=(
        "-caseStudy",
    )


#-------------------------Set up education models-------------------------
class Education(db.Model, SerializerMixin):
    __tablename__ = "education"

    id=db.Column(db.Integer, primary_key=True)
    school=db.Column(db.String, nullable=False)
    subject_studied=db.Column(db.String, nullable=True)
    start_date=db.Column(db.Date, nullable=False)
    end_date=db.Column(db.Date, nullable=False)
    grade=db.Column(db.String, nullable=True)
    school_image=db.Column(db.String, nullable=False)
    city=db.Column(db.String, nullable=False)
    country=db.Column(db.String, nullable=True)

    capstone_project=db.relationship("CapstoneProjects", backref="education")

    serialize_rules=("-capstone_project",)


#-------------------------Set up social media model-------------------------
class SocialMedia(db.Model, SerializerMixin):
    __tablename__ = "social media"

    id=db.Column(db.Integer, primary_key=True)
    url=db.Column(db.String, nullable=False)
    logo=db.Column(db.String, nullable=False)
    
    



#-------------------------Set up capstone project models-------------------------
class CapstoneProjects(db.Model, SerializerMixin):
    __tablename__="capstoneProject"

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    logo=db.Column(db.String, nullable=True)
    git_hub_link=db.Column(db.String, nullable=True)

    employer_id = db.Column(db.Integer, db.ForeignKey("employmentHistory.id"), nullable=True)
    education_id = db.Column(db.Integer, db.ForeignKey("education.id"), nullable=True)
    capstone_achievment = db.relationship("CapstoneProjectAchievments", backref="capstone_project")

    serialize_rules = (
        "-capstone_achievment",
        "-employer",
        "-education.capstone_project",
    )


#-------------------------Set up capstone project roles model-------------------------
class CapstoneProjectAchievments(db.Model, SerializerMixin):
    __tablename__ = "capstoneAchievments"

    id=db.Column(db.Integer, primary_key=True)
    achievment = db.Column(db.String, nullable=False)

    capstone_id = db.Column(db.Integer, db.ForeignKey("capstoneProject.id"), nullable=False)

    serialize_rules = (
        "-capstone_project",
    )

class CapstoneProjectContext(db.Model, SerializerMixin):
    __tablename__ = "capstoneContext"

    id=db.Column(db.Integer, primary_key=True)
    context=db.Column(db.String, nullable=False)

    capstone_id = db.Column(db.Integer, db.ForeignKey("capstoneProject.id"), nullable=False)


#-------------------------Create Charity Model-------------------------
class Charities(db.Model, SerializerMixin):
    __tablename__ = "charities"

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    logo=db.Column(db.String, nullable=False)
    charity_description=db.Column(db.String, nullable=False)

    key_roles = db.relationship("KeyRoles", backref="charity")
    case_studies = db.relationship("EmployeeCaseStudies", backref="charity")
    reference = db.relationship("EmployerReference", backref="charity")

    serialize_rules=(
        "-key_roles",
        "-case_studies",
        "-reference",
    )

#------------------------Right to work---------------------------------
class WorkCountries(db.Model, SerializerMixin):
    __tablename__ = "countries"

    id=db.Column(db.Integer, primary_key=True)
    country=db.Column(db.String, nullable=False)

    user_id=db.Column(db.Integer, db.ForeignKey("profile.id"), nullable=False)

    serialize_rules=("-profile",)


#------------------------Set up email modles---------------------------
class Emails(db.Model, SerializerMixin):
    __tablename__ = "emails"

    id=db.Column(db.Integer, primary_key=True)
    recipient = db.Column(db.String, nullable=False)
    sender = db.Column(db.String, nullable=False)
    subject=db.Column(db.String, nullable=False)
    message=db.Column(db.String, nullable=False)

#------------------------Set up card optiions------------------------
class CardOptions(db.Model, SerializerMixin):
    __tablename__ = "card_options"

    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String, nullable=False)
    image=db.Column(db.String, nullable=False)

#------------------------Set up software languages------------------------
class SoftwareLanguages(db.Model, SerializerMixin):
    __tablename__ = "software_languages"

    id=db.Column(db.Integer, primary_key=True)
    language_type=db.Column(db.String, nullable=False)
    name=db.Column(db.String, nullable=False)
    logo=db.Column(db.String, nullable=False)

    #Add validation rules
    @validates(language_type)






