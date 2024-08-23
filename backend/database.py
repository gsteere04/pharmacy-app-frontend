from decouple import config
from sqlmodel import Session, create_engine

DATABASE_URL: str = config("postgresql://postgres:postgres@localhost:5432/pharma-db")
engine = create_engine(DATABASE_URL)


def get_db():
    with Session(engine) as session:
        yield session
