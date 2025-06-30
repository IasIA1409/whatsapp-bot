from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PagamentoBase(BaseModel):
    lead_id: int
    descricao: str
    valor: float
    vencimento: datetime
    forma_pagamento: Optional[str] = "pix"
    status: Optional[str] = "pendente"
    link_pagamento: Optional[str] = None

class PagamentoCreate(PagamentoBase):
    pass

class PagamentoOut(PagamentoBase):
    id: int
    asaas_id: Optional[str] = None
    data_pagamento: Optional[datetime] = None
    data_criacao: datetime

    class Config:
        orm_mode = True
