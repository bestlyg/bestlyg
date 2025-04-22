
from langchain_core.messages import (
    AIMessage,
    HumanMessage,
    SystemMessage,
    merge_message_runs,
    ChatMessage
)
from pydantic import BaseModel


class Message(BaseModel):
    role: str
    content: str

    def convert(self):
        if self.role == 'human':
            C = HumanMessage
        elif self.role == 'ai':
            C = AIMessage
        else:
            raise TypeError(self)
        return C(self.content)
