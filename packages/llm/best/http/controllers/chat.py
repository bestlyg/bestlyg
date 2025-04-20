from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from ..services import getChatStream

chat_router = APIRouter(prefix="/chat")


@chat_router.post('/stream')
async def chatStream():
    return StreamingResponse(getChatStream(), media_type="text/event-stream")
