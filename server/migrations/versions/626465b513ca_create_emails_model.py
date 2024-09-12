"""create emails model

Revision ID: 626465b513ca
Revises: 7563cf0f9bfd
Create Date: 2024-09-12 17:30:34.778768

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '626465b513ca'
down_revision = '7563cf0f9bfd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('emails',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('recipient', sa.String(), nullable=False),
    sa.Column('sender', sa.String(), nullable=False),
    sa.Column('subject', sa.String(), nullable=False),
    sa.Column('message', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('emails')
    # ### end Alembic commands ###
