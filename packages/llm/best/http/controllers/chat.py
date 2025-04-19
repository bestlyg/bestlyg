from ..core import Controller
from fastapi import APIRouter


class ChatController(Controller):
    router = APIRouter(prefix="/chat")

    @router.get('')
    async def chat():
        return 'HELLO'
