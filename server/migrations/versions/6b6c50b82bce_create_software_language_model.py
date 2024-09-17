"""create software language model

Revision ID: 6b6c50b82bce
Revises: f5f56d2b7ad9
Create Date: 2024-09-15 16:46:18.440868

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6b6c50b82bce'
down_revision = 'f5f56d2b7ad9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('software_languages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('language_type', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('logo', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('software_languages')
    # ### end Alembic commands ###
