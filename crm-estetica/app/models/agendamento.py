from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Agendamento(Base):
    __tablename__ = "agendamentos"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False)
    data_hora = Column(DateTime, nullable=False)
    tipo_sessao = Column(String, nullable=False)  # Ex: limpeza de pele, botox, massagem
    profissional = Column(String, nullable=False)
    local = Column(String, default="Unidade principal")
    confirmado = Column(Boolean, default=False)
    compareceu = Column(Boolean, default=None)
    observacoes = Column(String, nullable=True)
    evento_google_id = Column(String, nullable=True)
    data_criacao = Column(DateTime, default=datetime.utcnow)

    lead = relationship("Lead")
