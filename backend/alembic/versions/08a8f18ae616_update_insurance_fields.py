"""Update insurance fields

Revision ID: 08a8f18ae616
Revises: dd7dc96d6cbb
Create Date: 2024-08-23 11:31:49.407244

"""
from typing import Sequence

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '08a8f18ae616'
down_revision: str | None = 'dd7dc96d6cbb'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('patient', sa.Column('insurance_name', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('patient', sa.Column('insurance_member_id', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.drop_column('patient', 'member_id_number')
    op.drop_column('patient', 'insurance_person_code')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('patient', sa.Column('insurance_person_code', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('patient', sa.Column('member_id_number', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_column('patient', 'insurance_member_id')
    op.drop_column('patient', 'insurance_name')
    # ### end Alembic commands ###