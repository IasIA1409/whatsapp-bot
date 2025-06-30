from fastapi import APIRouter
from app.api import leads, atendimento

router = APIRouter()
router.include_router(leads.router)
router.include_router(atendimento.router)
