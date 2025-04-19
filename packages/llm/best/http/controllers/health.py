from ..core import Application, Controller
from fastapi import APIRouter


class HealthController(Controller):
    router = APIRouter(prefix="/health")

    @router.get('/check')
    async def health():
        return 'HEALTH CHECK'
