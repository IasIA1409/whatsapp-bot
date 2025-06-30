import requests
from app.core.config import settings

def enviar_mensagem(numero: str, mensagem: str):
    url = f"{settings.WPP_API_URL}/send-message"
    headers = {"Content-Type": "application/json"}
    payload = {
        "number": numero,
        "message": mensagem
    }

    response = requests.post(url, json=payload, headers=headers)
    if response.status_code != 200:
        raise Exception(f"Erro ao enviar mensagem: {response.text}")
    return response.json()
