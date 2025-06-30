from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Pagamento(Base):
    __tablename__ = "pagamentos"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False)
    descricao = Column(String, nullable=False)  # Ex: pacote 4 sessões
    valor = Column(Float, nullable=False)
    vencimento = Column(DateTime, nullable=False)
    forma_pagamento = Column(String, default="pix")  # pix, boleto, cartão
    status = Column(String, default="pendente")  # pendente, pago, vencido, cancelado
    link_pagamento = Column(String, nullable=True)
    asaas_id = Column(String, nullable=True)
    data_pagamento = Column(DateTime, nullable=True)
    data_criacao = Column(DateTime, default=datetime.utcnow)

    lead = relationship("Lead")
