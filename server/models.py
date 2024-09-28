from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Date
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
import re
from datetime import datetime
from sqlalchemy import event

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

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String, nullable=False)

    # Add relations
    employer_id = db.Column(db.Integer, db.ForeignKey("employmentHistory.id"), nullable=True)
    charity_id = db.Column(db.Integer, db.ForeignKey("charities.id"), nullable=True)

    serialize_rules = ("-employer", "-charity",)

# Add validation through event listener
@event.listens_for(KeyRoles, 'before_insert')
@event.listens_for(KeyRoles, 'before_update')
def validate_employer_or_charity(mapper, connection, target):
    # Check that at least one of employer_id or charity_id is provided
    if not target.employer_id and not target.charity_id:
        raise ValueError("At least one of employer_id or charity_id must be provided.")




#-------------------------Set up prev employment case studies-------------------------
class EmployeeCaseStudies(db.Model, SerializerMixin):
    __tablename__ = "employmentCaseStudy"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=True)
    city = db.Column(db.String, nullable=True)
    case_study_info = db.Column(db.String, nullable=False)
    case_study_img = db.Column(db.String, nullable=True)

    # Add relationship
    employer_id = db.Column(db.Integer, db.ForeignKey("employmentHistory.id"), nullable=True)
    charity_id = db.Column(db.Integer, db.ForeignKey("charities.id"), nullable=True)
    case_study_role = db.relationship("CaseStudyRoles", backref="caseStudy")

    serialize_rules = (
        "-employer",
        "-charity",
        "-case_study_role",
    )

    # Add validation 
    # Add validation through event listener
@event.listens_for(KeyRoles, 'before_insert')
@event.listens_for(KeyRoles, 'before_update')
def validate_employer_or_charity(mapper, connection, target):
    # Check that at least one of employer_id or charity_id is provided
    if not target.employer_id and not target.charity_id:
        raise ValueError("At least one of employer_id or charity_id must be provided.")


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
        "-employer.reference",
        "-employer.start_date",
        "-employer.end_date",
        "-employer.role_description",
        "-employer.id",
        "-charity.reference",
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
    git_hub_link=db.Column(db.String, nullable=True)
    description=db.Column(db.String, nullable=False, server_default="")
    blog_link=db.Column(db.String, nullable=True)
    date=db.Column(db.Date, nullable=False, server_default="")
    image=db.Column(db.String, nullable=False, server_default="")

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
    image = db.Column(db.String, nullable=True, server_default="")

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
    role=db.Column(db.String, nullable=False, server_default="")
    start_date=db.Column(db.Date, nullable=False, server_default="")
    end_date=db.Column(db.String, nullable=False, server_default="Present")

    key_roles = db.relationship("KeyRoles", backref="charity")
    case_studies = db.relationship("EmployeeCaseStudies", backref="charity")
    reference = db.relationship("EmployerReference", backref="charity")

    serialize_rules=(
        "-key_roles",
        "-case_studies",
        "-reference",
    )

    @validates('end_date')
    def validate_end_date(self, key, value):
        if value == "Present":
            return value
        else:
            try:
                # Check if the string is a valid date in YYYY-MM-DD format
                datetime.strptime(value, "%Y-%m-%d")
                return value
            except ValueError:
                raise ValueError("end_date must be 'Present' or a valid date in the format 'YYYY-MM-DD'")

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
    def validate_language_type(self, key, value):
        allowed_types = ["Language", "Library", "Microframework"]
        if value not in allowed_types:
            raise ValueError(f"Inavlid language type: {value}. Must be either a language, library, or microframework")
        return value






