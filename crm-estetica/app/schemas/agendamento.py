from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AgendamentoBase(BaseModel):
    lead_id: int
    data_hora: datetime
    tipo_sessao: str
    profissional: str
    local: Optional[str] = "Unidade principal"
    confirmado: Optional[bool] = False
    compareceu: Optional[bool] = None
    observacoes: Optional[str] = None

class AgendamentoCreate(AgendamentoBase):
    pass

class AgendamentoOut(AgendamentoBase):
    id: int
    evento_google_id: Optional[str] = None
    data_criacao: datetime

    class Config:
        orm_mode = True
