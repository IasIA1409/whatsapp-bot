# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import routes

app = FastAPI(title="CRM Estética com IA")

# Liberação de CORS (frontend e backend separados)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou "http://localhost:3000"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router)
