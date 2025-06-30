from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class LeadBase(BaseModel):
    nome: str
    telefone: str
    email: Optional[str] = None
    genero: Optional[str] = None
    data_nascimento: Optional[datetime] = None
    origem: Optional[str] = "manual"
    servico_interesse: Optional[str] = None
    status: Optional[str] = "novo"
    prioridade: Optional[str] = "média"
    observacoes: Optional[str] = None

class LeadCreate(LeadBase):
    pass

class LeadOut(LeadBase):
    id: int
    data_criacao: datetime

    class Config:
        orm_mode = True
