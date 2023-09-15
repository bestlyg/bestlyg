
from flask import Flask
from flask_apscheduler import APScheduler
from .mail import apply as apply_mail_scheduler

__all__ = [
    'apply'
]

scheduler = APScheduler()

def apply(app: Flask):
    scheduler.init_app(app)
    scheduler.start()

    apply_mail_scheduler(scheduler)

