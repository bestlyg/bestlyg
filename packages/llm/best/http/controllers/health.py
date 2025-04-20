from ..core import Application, Controller
from fastapi import APIRouter


health_router = APIRouter(prefix="/health")

@health_router.get('/check')
async def health():
    return 'HEALTH CHECK'
