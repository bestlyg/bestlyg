from asyncio import sleep
from ..core import Service

async def getChatStream():
    for i in range(10):
        # 模拟一些耗时操作
        await sleep(1)
        yield f"Data chunk {i}\n".encode()