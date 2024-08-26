from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import patients, prescribers, prescriptions, rx_items

app = FastAPI()

origins = [
    "http://localhost:5173",  # Correct URL format with double slashes
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(prescribers.router)
app.include_router(patients.router)
app.include_router(prescriptions.router)
app.include_router(rx_items.router)
