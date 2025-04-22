from ast import List
from typing import List
from pydantic import BaseModel
from .message import Message

class ChatStreamRequest(BaseModel):
    messages: List[Message]
