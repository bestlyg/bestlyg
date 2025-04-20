from abc import ABC
from typing import Dict
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware


class Application:
    app = FastAPI()
    meta = {}

    def __init__(self):
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=['*'],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    def use(self, middleware: 'Middleware'):
        middleware.apply(self)
        return self

    def run(self, *args, **kwargs):
        import uvicorn
        uvicorn.run(
            app='best.http:app.app',
            host="127.0.0.1",
            port=20001,
            # workers=1,
            reload=True,
            *args,
            **kwargs
        )


class Middleware(ABC):
    app: Application = None

    def apply(self, app: Application):
        self.app = app
        app.meta[self.__class__] = self


class Controller(Middleware):
    router: APIRouter
    app: Application = None

    def apply(self, app: Application):
        super().apply(app)
        app.app.include_router(self.router)


class Service(Middleware):
    pass
