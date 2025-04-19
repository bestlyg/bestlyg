from .core import Application
from .controllers import HealthController, ChatController, load_controllers

__all__ = [
    "http_run"
]


def http_run(*args, **kwargs):
    print(load_controllers())
    Application().use(HealthController()).use(
        ChatController()).run(*args, **kwargs)
