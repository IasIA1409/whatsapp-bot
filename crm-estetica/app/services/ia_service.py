import openai
from app.core.config import settings

OPENAI_KEY=${OPENAI_KEY}


def gerar_resposta(mensagem_usuario: str, contexto: str = None):
    prompt = f"""
Você é um assistente virtual de uma clínica de estética.
Responda com gentileza, clareza e com foco em marcar agendamentos ou explicar procedimentos.
{contexto or ''}
Usuário: {mensagem_usuario}
Resposta:
    """

    resposta = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Você é um atendente virtual especializado em estética."},
            {"role": "user", "content": prompt}
        ]
    )

    return resposta['choices'][0]['message']['content']
