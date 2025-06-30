from sqlalchemy import Column, Integer, String, DateTime, Boolean
from datetime import datetime
from app.database import Base

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    telefone = Column(String, unique=True, nullable=False)
    email = Column(String, nullable=True)
    genero = Column(String, nullable=True)  # feminino, masculino, outro
    data_nascimento = Column(DateTime, nullable=True)

    origem = Column(String, default="manual")  # Instagram, Google, Landing Page, WhatsApp
    servico_interesse = Column(String, nullable=True)
    status = Column(String, default="novo")  # novo, contato feito, proposta enviada, agendado, perdeu

    prioridade = Column(String, default="média")  # alta, média, baixa
    observacoes = Column(String, nul
