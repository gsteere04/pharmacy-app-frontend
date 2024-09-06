from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import patients, prescribers, prescriptions, rx_items


app = FastAPI(title="Pharma-EDU", version="0.1.0")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prescribers.router, tags=["Prescribers"])
app.include_router(patients.router, tags=["Patients"])
app.include_router(prescriptions.router, tags=["Prescriptions"])
app.include_router(rx_items.router, tags=["Rx Items"])
