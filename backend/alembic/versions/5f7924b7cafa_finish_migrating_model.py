"""Finish migrating model

Revision ID: 5f7924b7cafa
Revises: 181ce8f5843e
Create Date: 2024-08-21 09:13:51.150845

"""
from typing import Sequence

from alembic import op
import sqlalchemy as sa
import sqlmodel
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '5f7924b7cafa'
down_revision: str | None = '181ce8f5843e'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('rxitem',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('strength', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('ndc', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('expiration', sa.Date(), nullable=True),
    sa.Column('lot_number', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('dea_schedule', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('drug_class', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('prescription',
    sa.Column('rx_number', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('prescriber_id', sa.Integer(), nullable=False),
    sa.Column('prescribed_date', sa.Date(), nullable=False),
    sa.Column('rx_item_id', sa.Integer(), nullable=False),
    sa.Column('directions', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('quantity_dispensed', sa.Integer(), nullable=False),
    sa.Column('refills', sa.Integer(), nullable=False),
    sa.Column('status', sa.Enum('PENDING', 'COMPLETED', 'SOLD', name='prescriptionstatus'), nullable=False),
    sa.Column('tech_initials', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.ForeignKeyConstraint(['patient_id'], ['patient.id'], ),
    sa.ForeignKeyConstraint(['prescriber_id'], ['prescriber.id'], ),
    sa.ForeignKeyConstraint(['rx_item_id'], ['rxitem.id'], ),
    sa.PrimaryKeyConstraint('rx_number')
    )
    op.drop_table('prescribedrx')
    op.drop_table('rx')
    op.drop_table('sigcode')
    op.drop_table('patientprescriberlink')
    op.add_column('address', sa.Column('street', sqlmodel.sql.sqltypes.AutoString(), nullable=False))
    op.alter_column('address', 'city',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.alter_column('address', 'state',
               existing_type=postgresql.ENUM('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', name='state'),
               nullable=False)
    op.alter_column('address', 'zipcode',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.drop_column('address', 'street_name')
    op.drop_column('address', 'country')
    op.drop_column('address', 'number')
    op.add_column('patient', sa.Column('address_id', sa.Integer(), nullable=False))
    op.add_column('patient', sa.Column('primary_care_prescriber_id', sa.Integer(), nullable=False))
    op.add_column('patient', sa.Column('allergies', sqlmodel.sql.sqltypes.AutoString(), nullable=False))
    op.drop_constraint('patients_home_address_id_fkey', 'patient', type_='foreignkey')
    op.create_foreign_key(None, 'patient', 'prescriber', ['primary_care_prescriber_id'], ['id'])
    op.create_foreign_key(None, 'patient', 'address', ['address_id'], ['id'])
    op.drop_column('patient', 'contact_number')
    op.drop_column('patient', 'home_address_id')
    op.drop_column('patient', 'contact_email')
    op.add_column('prescriber', sa.Column('dea', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('prescriber', sa.Column('npi', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.drop_column('prescriber', 'dea_number')
    op.drop_column('prescriber', 'contact_email')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('prescriber', sa.Column('contact_email', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('prescriber', sa.Column('dea_number', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_column('prescriber', 'npi')
    op.drop_column('prescriber', 'dea')
    op.add_column('patient', sa.Column('contact_email', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('patient', sa.Column('home_address_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('patient', sa.Column('contact_number', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'patient', type_='foreignkey')
    op.drop_constraint(None, 'patient', type_='foreignkey')
    op.create_foreign_key('patients_home_address_id_fkey', 'patient', 'address', ['home_address_id'], ['id'])
    op.drop_column('patient', 'allergies')
    op.drop_column('patient', 'primary_care_prescriber_id')
    op.drop_column('patient', 'address_id')
    op.add_column('address', sa.Column('number', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('address', sa.Column('country', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('address', sa.Column('street_name', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.alter_column('address', 'zipcode',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.alter_column('address', 'state',
               existing_type=postgresql.ENUM('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', name='state'),
               nullable=True)
    op.alter_column('address', 'city',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.drop_column('address', 'street')
    op.create_table('patientprescriberlink',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('patient_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('prescriber_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['patient_id'], ['patient.id'], name='patientprescriberlink_patient_id_fkey'),
    sa.ForeignKeyConstraint(['prescriber_id'], ['prescriber.id'], name='patientprescriberlink_prescriber_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='patientprescriberlink_pkey')
    )
    op.create_table('sigcode',
    sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('sig_codes_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.Column('code', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='sig_codes_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_table('rx',
    sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('medications_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='medications_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_table('prescribedrx',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('rx_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('dosage', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('sig_code_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('patient_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('prescribed_date', sa.DATE(), autoincrement=False, nullable=False),
    sa.Column('refills', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('count', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['patient_id'], ['patient.id'], name='prescribedrx_patient_id_fkey'),
    sa.ForeignKeyConstraint(['rx_id'], ['rx.id'], name='prescribedrx_rx_id_fkey'),
    sa.ForeignKeyConstraint(['sig_code_id'], ['sigcode.id'], name='prescribedrx_sig_code_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='prescribedrx_pkey')
    )
    op.drop_table('prescription')
    op.drop_table('rxitem')
    # ### end Alembic commands ###
