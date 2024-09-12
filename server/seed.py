from models import Profile, EmploymentHistory, KeyRoles, EmployeeCaseStudies, EmployerReference, CaseStudyRoles, Education, SocialMedia, CapstoneProjects, CapstoneProjectAchievments, CapstoneProjectAchievments, CapstoneProjectContext, Charities, WorkCountries


from app import app 
from config import db 

from datetime import date

if __name__ == "__main__":
    with app.app_context():
        print("Starting seed...")

        db.drop_all()
        db.create_all()
        print("Begin seeding....")

        print("Seeding user...")
        kbuke13 = Profile(
            name = "Kaan Buke",
            profile_bio = "A software engineer, who studied at FlatIron school from 2023 - 2024.",
            employed = True,
            looking_work=True,
            home_town="London",
            home_country="UK",
            current_town="Johannesburg",
            current_country="South Africa",
            email="kabuke13@gmail.com",
            image="https://www.picdrop.com/kaanbuke/vcAotmCPKg?file=67af3e004329e3c6dde97c5fdb0a8e01"
        )
        kbuke13.password_hash = "kara1328"

        db.session.add_all([kbuke13])
        db.session.commit()

        print("Seeding employment history")
        esas = EmploymentHistory(
            name="ESAS Holding",
            logo="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_2/voyhprz7x00xozgtlmia",
            start_date=date(2018, 1, 2),
            end_date=date(2023, 1, 20),
            role="Company Associate",
            role_description="I created data analysis of potential acquisitions."
        )
        db.session.add_all([esas])
        db.session.commit()

        print("Seeding key roles")
        esasRole1 = KeyRoles(
            role="Keeping a watchful eye on the European and North American commercial real estate markets",
            employer_id = 1
        )
        esasRole2 = KeyRoles(
            role="Creating analytical cashflows",
            employer_id = 1
        )
        db.session.add_all([esasRole1, esasRole2])
        db.session.commit()

        print("Seeding Case Studies")
        stanhopeGate = EmployeeCaseStudies(
            title="12 Stanhope Gate",
            country="United Kingdom",
            city="London",
            case_study_info="Oversaw several rent reviews, and full refurbishments",
            case_study_img="https://www.esas.com.tr/Uploads/12-stanhope-gate-w9L5Por8.png",
            employer_id=1
        )
        db.session.add_all([stanhopeGate])
        db.session.commit()

        print("Seeding Employee References")
        resatDuren = EmployerReference(
            title="Mr",
            first_name="Resat",
            last_name="Duren",
            position="Managing Director",
            email="Resat.Duren@esas.com",
            reference_image="https://media.licdn.com/dms/image/C5603AQF8Sas7UDtMdA/profile-displayphoto-shrink_200_200/0/1517497389698?e=2147483647&v=beta&t=b7AltaUuaOx-95Cyn9NuwdyQUCDzsFDPEPvVJKh6sJo",
            employer_id=1
        )
        db.session.add_all([resatDuren])
        db.session.commit()

        print("Seeding case study roles")
        stanhopeRole1 = CaseStudyRoles(
            role="Oversaw renovation of a 6 story, central London, mixed use asset.",
            case_study_id=1
        )

        stanhopeRole2 = CaseStudyRoles(
            role="Negotiated 4 pre-lets with future tenants.",
            case_study_id=1
        )
        db.session.add_all([stanhopeRole1, stanhopeRole2])
        db.session.commit()

        print("Seeding educational information")
        flatIron = Education(
            school="Flat Iron School",
            subject_studied="Software Engineering",
            start_date = date(2023, 6, 24),
            end_date = date(2024, 9, 3),
            school_image = "https://upload.wikimedia.org/wikipedia/commons/6/61/FS_wiki.png",
            city="Remote"
        )

        dundee = Education(
            school="University of Dundee",
            subject_studied="Economics",
            start_date = date(2012, 9, 2),
            end_date = date(2016, 7, 20),
            school_image="https://www.drupal.org/files/A4_UoD_LOGO%20RGB%40100%25%20%40300dpi.jpg",
            city="Dundee",
            country="Scotland",
            grade="2:1"
        )
        db.session.add_all([flatIron, dundee])
        db.session.commit()

        print("Seeding social media links")
        gitHub = SocialMedia(
            url="https://github.com/kbuke",
            logo="https://cdn-icons-png.flaticon.com/512/25/25231.png"
        )

        insta = SocialMedia(
            url="https://www.instagram.com/packsnpaws/",
            logo="https://ichef.bbci.co.uk/news/976/cpsprodpb/E802/production/_89649395_instagram_logo_976.jpg"
        )
        db.session.add_all([gitHub, insta])
        db.session.commit()

        print("Seeding capstone projects")
        nihonGo = CapstoneProjects(
            name="Nihon-Go",
            git_hub_link="https://github.com/kbuke/nihongo",
            education_id=1
        )
        db.session.add_all([nihonGo])
        db.session.commit()

        print("Seeding capstone achievments")
        nihon_go_success1 = CapstoneProjectAchievments(
            achievment = "Leart how to use Google Maps API",
            capstone_id = 1
        )

        nihon_go_success2 = CapstoneProjectAchievments(
            achievment="Learnt how to allow users to upload pictures locally to my app.",
            capstone_id=1
        )
        db.session.add_all([nihon_go_success1, nihon_go_success2])
        db.session.commit()

        print("Seeding capstone contexts")
        nihon_go_context1 = CapstoneProjectContext(
            context="Travel",
            capstone_id=1
        )

        nihon_go_context2 = CapstoneProjectContext(
            context="Social-Media",
            capstone_id=1
        )
        db.session.add_all([nihon_go_context1, nihon_go_context2])
        db.session.commit()

        print("Seeding charities")
        solving_7 = Charities(
            name="Solving 7",
            logo="https://solving7.green/wp-content/uploads/2020/11/Solving7-Logo-Dark.png",
            charity_description="An NGO based in South Africa. They turn number 7 plastics into school desks which they supply nation wide.",
        )
        db.session.add_all([solving_7])
        db.session.commit()

        print("Seeding Countries")
        eu = WorkCountries(
            country="EU",
            user_id=1
        )
        db.session.add_all([eu])
        db.session.commit()

        print("Finished seeding")
