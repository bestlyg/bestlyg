from abc import ABC
from fastapi import FastAPI, APIRouter


class Application:
    app = FastAPI()

    def use(self, middleware: 'Middleware'):
        middleware.apply(self)
        return self

    def run(self, *args, **kwargs):
        import uvicorn
        uvicorn.run(
            app=self.app,
            host="0.0.0.0",
            port=9999,
            workers=1,
            *args,
            **kwargs
        )


class Middleware(ABC):
    def apply(app: Application):
        pass


class Controller(Middleware):
    router: APIRouter

    def apply(self, app: Application):
        app.app.include_router(self.router)
