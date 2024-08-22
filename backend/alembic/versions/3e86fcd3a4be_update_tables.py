"""Update tables

Revision ID: 3e86fcd3a4be
Revises: fe982c218f5c
Create Date: 2024-06-25 07:39:45.615795

"""

from typing import Sequence

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = "3e86fcd3a4be"
down_revision: str | None = "fe982c218f5c"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # Drop foreign keys
    op.drop_constraint("doctors_office_address_id_fkey", "doctors", type_="foreignkey")

    op.drop_constraint(
        "patient_doctor_link_doctor_id_fkey", "patient_doctor_link", type_="foreignkey"
    )
    op.drop_constraint(
        "patient_doctor_link_patient_id_fkey", "patient_doctor_link", type_="foreignkey"
    )

    op.drop_constraint("patients_home_address_id_fkey", "patients", type_="foreignkey")
    op.drop_constraint("patients_insurance_id_fkey", "patients", type_="foreignkey")

    op.drop_constraint(
        "prescribed_prescriptions_patient_id_fkey",
        "prescribed_prescriptions",
        type_="foreignkey",
    )
    op.drop_constraint(
        "prescribed_prescriptions_rx_id_fkey",
        "prescribed_prescriptions",
        type_="foreignkey",
    )
    op.drop_constraint(
        "prescribed_prescriptions_sig_code_id_fkey",
        "prescribed_prescriptions",
        type_="foreignkey",
    )

    # Rename tables
    op.rename_table("patients", "patient")
    op.rename_table("doctors", "doctor")
    op.rename_table("addresses", "address")
    op.rename_table("insurance_info", "insurance")
    op.rename_table("medications", "rx")
    op.rename_table("sig_codes", "sigcode")

    # Add foreign keys
    op.create_foreign_key(
        "doctors_office_address_id_fkey",
        "doctor",
        "address",
        ["office_address_id"],
        ["id"],
    )

    op.create_foreign_key(
        "patient_doctor_link_doctor_id_fkey",
        "patient_doctor_link",
        "doctor",
        ["doctor_id"],
        ["id"],
    )

    op.create_foreign_key(
        "patient_doctor_link_patient_id_fkey",
        "patient_doctor_link",
        "patient",
        ["patient_id"],
        ["id"],
    )

    op.create_foreign_key(
        "patients_home_address_id_fkey",
        "patient",
        "address",
        ["home_address_id"],
        ["id"],
    )

    op.create_foreign_key(
        "patients_insurance_id_fkey",
        "patient",
        "insurance",
        ["insurance_id"],
        ["id"],
    )

    op.create_foreign_key(
        "prescribed_prescriptions_patient_id_fkey",
        "prescribed_prescriptions",
        "patient",
        ["patient_id"],
        ["id"],
    )

    op.create_foreign_key(
        "prescribed_prescriptions_rx_id_fkey",
        "prescribed_prescriptions",
        "rx",
        ["rx_id"],
        ["id"],
    )

    op.create_foreign_key(
        "prescribed_prescriptions_sig_code_id_fkey",
        "prescribed_prescriptions",
        "sigcode",
        ["sig_code_id"],
        ["id"],
    )


def downgrade() -> None:
    # Drop foreign keys
    op.drop_constraint(
        "prescribed_prescriptions_sig_code_id_fkey",
        "prescribed_prescriptions",
        type_="foreignkey",
    )
    op.drop_constraint(
        "prescribed_prescriptions_rx_id_fkey",
        "prescribed_prescriptions",
        type_="foreignkey",
    )
    op.drop_constraint(
        "prescribed_prescriptions_patient_id_fkey",
        "prescribed_prescriptions",
        type_="foreignkey",
    )
    op.drop_constraint("patients_insurance_id_fkey", "patient", type_="foreignkey")
    op.drop_constraint("patients_home_address_id_fkey", "patient", type_="foreignkey")
    op.drop_constraint(
        "patient_doctor_link_patient_id_fkey", "patient_doctor_link", type_="foreignkey"
    )
    op.drop_constraint(
        "patient_doctor_link_doctor_id_fkey", "patient_doctor_link", type_="foreignkey"
    )
    op.drop_constraint("doctors_office_address_id_fkey", "doctor", type_="foreignkey")

    # Rename tables back to original names
    op.rename_table("sigcode", "sig_codes")
    op.rename_table("rx", "medications")
    op.rename_table("insurance", "insurance_info")
    op.rename_table("address", "addresses")
    op.rename_table("doctor", "doctors")
    op.rename_table("patient", "patients")

    # Add foreign keys back
    op.create_foreign_key(
        "prescribed_prescriptions_sig_code_id_fkey",
        "prescribed_prescriptions",
        "sig_codes",
        ["sig_code_id"],
        ["id"],
    )
    op.create_foreign_key(
        "prescribed_prescriptions_rx_id_fkey",
        "prescribed_prescriptions",
        "medications",
        ["rx_id"],
        ["id"],
    )
    op.create_foreign_key(
        "prescribed_prescriptions_patient_id_fkey",
        "prescribed_prescriptions",
        "patients",
        ["patient_id"],
        ["id"],
    )
    op.create_foreign_key(
        "patients_insurance_id_fkey",
        "patients",
        "insurance_info",
        ["insurance_id"],
        ["id"],
    )
    op.create_foreign_key(
        "patients_home_address_id_fkey",
        "patients",
        "addresses",
        ["home_address_id"],
        ["id"],
    )
    op.create_foreign_key(
        "patient_doctor_link_patient_id_fkey",
        "patient_doctor_link",
        "patients",
        ["patient_id"],
        ["id"],
    )
    op.create_foreign_key(
        "patient_doctor_link_doctor_id_fkey",
        "patient_doctor_link",
        "doctors",
        ["doctor_id"],
        ["id"],
    )
    op.create_foreign_key(
        "doctors_office_address_id_fkey",
        "doctors",
        "addresses",
        ["office_address_id"],
        ["id"],
    )
