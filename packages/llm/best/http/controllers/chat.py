from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from ..services import getChatStream
from ..models import ChatStreamRequest

chat_router = APIRouter(prefix="/chat")


@chat_router.post('/stream')
async def chatStream(req: ChatStreamRequest):
    return StreamingResponse(getChatStream(req), media_type="text/event-stream")
