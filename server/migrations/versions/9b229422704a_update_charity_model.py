"""update charity model

Revision ID: 9b229422704a
Revises: 12722ad6a43a
Create Date: 2024-09-30 23:46:33.836876

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9b229422704a'
down_revision = '12722ad6a43a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('card_options',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('charities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('logo', sa.String(), nullable=False),
    sa.Column('charity_description', sa.String(), nullable=False),
    sa.Column('role', sa.String(), server_default='', nullable=False),
    sa.Column('start_date', sa.Date(), server_default='2005, 03, 15', nullable=False),
    sa.Column('end_date', sa.String(), server_default='Present', nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('education',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('school', sa.String(), nullable=False),
    sa.Column('subject_studied', sa.String(), nullable=True),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('end_date', sa.Date(), nullable=False),
    sa.Column('grade', sa.String(), nullable=True),
    sa.Column('school_image', sa.String(), nullable=False),
    sa.Column('city', sa.String(), nullable=False),
    sa.Column('country', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('emails',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('recipient', sa.String(), nullable=False),
    sa.Column('sender', sa.String(), nullable=False),
    sa.Column('subject', sa.String(), nullable=False),
    sa.Column('message', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('employmentHistory',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('logo', sa.String(), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('end_date', sa.Date(), nullable=True),
    sa.Column('role', sa.String(), nullable=False),
    sa.Column('role_description', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('profile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Integer(), nullable=False),
    sa.Column('profile_bio', sa.String(), nullable=False),
    sa.Column('employed', sa.Boolean(), nullable=False),
    sa.Column('looking_work', sa.Boolean(), server_default=' ', nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.Column('home_town', sa.String(), nullable=True),
    sa.Column('home_country', sa.String(), nullable=True),
    sa.Column('current_town', sa.String(), nullable=False),
    sa.Column('current_country', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('social media',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('logo', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('software_languages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('language_type', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('logo', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('capstoneProject',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('git_hub_link', sa.String(), nullable=True),
    sa.Column('description', sa.String(), server_default='', nullable=False),
    sa.Column('blog_link', sa.String(), nullable=True),
    sa.Column('date', sa.Date(), server_default='', nullable=False),
    sa.Column('image', sa.String(), server_default='', nullable=False),
    sa.Column('employer_id', sa.Integer(), nullable=True),
    sa.Column('education_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['education_id'], ['education.id'], name=op.f('fk_capstoneProject_education_id_education')),
    sa.ForeignKeyConstraint(['employer_id'], ['employmentHistory.id'], name=op.f('fk_capstoneProject_employer_id_employmentHistory')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('countries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('country', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['profile.id'], name=op.f('fk_countries_user_id_profile')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('employmentCaseStudy',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('country', sa.String(), nullable=True),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('case_study_info', sa.String(), nullable=False),
    sa.Column('case_study_img', sa.String(), nullable=True),
    sa.Column('employer_id', sa.Integer(), nullable=True),
    sa.Column('charity_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['charity_id'], ['charities.id'], name=op.f('fk_employmentCaseStudy_charity_id_charities')),
    sa.ForeignKeyConstraint(['employer_id'], ['employmentHistory.id'], name=op.f('fk_employmentCaseStudy_employer_id_employmentHistory')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('employmentReference',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('position', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('reference_image', sa.String(), nullable=True),
    sa.Column('employer_id', sa.Integer(), nullable=True),
    sa.Column('charity_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['charity_id'], ['charities.id'], name=op.f('fk_employmentReference_charity_id_charities')),
    sa.ForeignKeyConstraint(['employer_id'], ['employmentHistory.id'], name=op.f('fk_employmentReference_employer_id_employmentHistory')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('keyRoles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(), nullable=False),
    sa.Column('employer_id', sa.Integer(), nullable=True),
    sa.Column('charity_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['charity_id'], ['charities.id'], name=op.f('fk_keyRoles_charity_id_charities')),
    sa.ForeignKeyConstraint(['employer_id'], ['employmentHistory.id'], name=op.f('fk_keyRoles_employer_id_employmentHistory')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('capstoneAchievments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('achievment', sa.String(), nullable=False),
    sa.Column('image', sa.String(), server_default='', nullable=True),
    sa.Column('capstone_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['capstone_id'], ['capstoneProject.id'], name=op.f('fk_capstoneAchievments_capstone_id_capstoneProject')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('capstoneContext',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('context', sa.String(), nullable=False),
    sa.Column('capstone_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['capstone_id'], ['capstoneProject.id'], name=op.f('fk_capstoneContext_capstone_id_capstoneProject')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('caseStudyRole',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(), nullable=False),
    sa.Column('case_study_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['case_study_id'], ['employmentCaseStudy.id'], name=op.f('fk_caseStudyRole_case_study_id_employmentCaseStudy')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('caseStudyRole')
    op.drop_table('capstoneContext')
    op.drop_table('capstoneAchievments')
    op.drop_table('keyRoles')
    op.drop_table('employmentReference')
    op.drop_table('employmentCaseStudy')
    op.drop_table('countries')
    op.drop_table('capstoneProject')
    op.drop_table('software_languages')
    op.drop_table('social media')
    op.drop_table('profile')
    op.drop_table('employmentHistory')
    op.drop_table('emails')
    op.drop_table('education')
    op.drop_table('charities')
    op.drop_table('card_options')
    # ### end Alembic commands ###
