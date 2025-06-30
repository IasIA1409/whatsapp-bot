from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ia_service import gerar_resposta
from app.services.whatsapp_service import enviar_mensagem

router = APIRouter(prefix="/atendimento", tags=["Atendimento"])

class MensagemInput(BaseModel):
    telefone: str
    mensagem: str

@router.post("/")
def atendimento_ia(dados: MensagemInput):
    resposta = gerar_resposta(dados.mensagem)
    enviar_mensagem(dados.telefone, resposta)
    return {"mensagem_enviada": resposta}
