from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core import Application
from .controllers import chat_router, health_router

__all__ = [
    "http_run"
]


def create_app():
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(health_router)
    app.include_router(chat_router)

    return app


def http_run(*args, **kwargs):
    # print(load_controllers())
    # app = create_app()
    import uvicorn
    uvicorn.run(
        app='best.http:create_app',
        host="127.0.0.1",
        port=20001,
        # workers=1,
        reload=True,
        *args,
        **kwargs
    )
