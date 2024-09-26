from models import Profile, EmploymentHistory, KeyRoles, EmployeeCaseStudies, EmployerReference, CaseStudyRoles, Education, SocialMedia, CapstoneProjects, CapstoneProjectAchievments, CapstoneProjectAchievments, CapstoneProjectContext, Charities, WorkCountries, CardOptions, SoftwareLanguages


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

        s7Role1 = KeyRoles(
            role="Promoted sustainability projects in South Africa.",
            charity_id=1
        )

        s7Role2 = KeyRoles(
            role="Secured funding from European and African entities to fund projects.",
            charity_id=1
        )
        db.session.add_all([esasRole1, esasRole2, s7Role1, s7Role2])
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

        sophiaLadha = EmployerReference(
            title="Mrs",
            first_name="Sophia",
            last_name="Ladha",
            position="Director",
            email="sophia@gmail.com",
            reference_image="https://solving7.green/wp-content/uploads/elementor/thumbs/Sophia-Ladha-oyic36r173c9mn1xhy5kbyyo6n8ng4bzppyg4m14f4.jpg",
            charity_id=1
        )
        db.session.add_all([resatDuren, sophiaLadha])
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
            start_date=date(2023, 6, 24),
            end_date=date(2024, 9, 3),
            school_image="https://upload.wikimedia.org/wikipedia/commons/6/61/FS_wiki.png",
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
            education_id=1,
            description="I created a social-media/travel application centered around Japanese travel."
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
            role="Community Programme Lead",
            start_date=date(2023, 3, 15),
            end_date=str(date(2024, 5, 28))
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

        print("Seeding Card Options")
        work = CardOptions(
            title="Work Experience",
            image="https://www.marketing91.com/wp-content/uploads/2020/07/Work-Experience.jpg"
        )

        education = CardOptions(
            title="Education",
            image="https://www.regenesys.net/reginsights/wp-content/uploads/2019/11/systemic-evaluation.jpg"
        )

        projects = CardOptions(
            title="Capstone Projects",
            image="https://www.sydle.com/blog/assets/post/projects-and-processes-what-is-the-difference-614e00a1a9d8415db45a9230/project-and-process.jpg"
        )

        coding_languages = CardOptions(
            title="Languages, Microframeworks & Libraries",
            image="https://woz-u.com/wp-content/uploads/2022/06/Evolution-of-Coding-scaled.jpg"
        )

        references = CardOptions(
            title="References",
            image="https://images.wsj.net/im-328910/square"
        )

        charity = CardOptions(
            title="Charity Work",
            image="https://immigrationbarrister.co.uk/content/uploads/2021/01/AdobeStock_84445998-scaled-e1611654853393.jpeg"
        )

        hobbies = CardOptions(
            title="Hobbies",
            image="https://www.cvmaker.uk/static/43716d799aa73abfd36f848df81815f9/126f5/06_when-and-how-to-list-hobbies-and-interests_.png"
        )

        socials = CardOptions(
            title="Social Media",
            image="https://www.wscubetech.com/blog/wp-content/uploads/2024/04/social-media-1024x683.webp"
        )
        db.session.add_all([work, education, projects, coding_languages, references, charity, hobbies, socials])
        db.session.commit()

        print("Seeding Languages")
        javascript = SoftwareLanguages(
            language_type="Language",
            name="JavaScript",
            logo="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
        )

        css = SoftwareLanguages(
            language_type="Language",
            name="CSS",
            logo="https://img-resize-cdn.joshmartin.ch/2550x0%2C23a14590c8ce7904d387b2aefcdf22500d0b68259a03a15a3cb23a0081316909/https://joshmartin.ch/app/uploads/2017/10/css3.svg"
        )

        python = SoftwareLanguages(
            language_type="Language",
            name="Python",
            logo="https://i0.wp.com/junilearning.com/wp-content/uploads/2020/06/python-programming-language.webp?fit=1920%2C1920&ssl=1"
        )

        react = SoftwareLanguages(
            language_type="Library",
            name="React.js",
            logo="https://media.licdn.com/dms/image/C4E12AQEBVCR2SpRr9g/article-cover_image-shrink_720_1280/0/1625909824541?e=2147483647&v=beta&t=Y_zSoI8cPUR3wQvPyYK15PLWpQJJ0si6OvsuXFnIC18"
        )

        sql = SoftwareLanguages(
            language_type="Language",
            name="SQL",
            logo="https://media.licdn.com/dms/image/D4D12AQFjcz9MrPsWDQ/article-cover_image-shrink_600_2000/0/1669746580764?e=2147483647&v=beta&t=1gsLNYLqwau7-3cszokd_h7dADCNDPS0dTyPx6Op4XQ"
        )

        flask = SoftwareLanguages(
            language_type="Microframework",
            name="Flask",
            logo="https://user-images.githubusercontent.com/51070104/268566349-c41e65a5-2ab9-4b54-8cbc-350ab6da746c.png"
        )
        db.session.add_all([javascript, css, sql, python, react, flask])
        db.session.commit()

        print("Finished seeding")
