from flask import Flask
from flask_mail import Mail, Message

__all__ = [
    'apply',
    'mail',
    'send_mail'
]

mail = None


def apply(app: Flask):
    global mail
    mail = Mail(app)


def send_mail(*args, **kwargs):
    with mail.app.app_context():
        mail.send(Message(*args, **kwargs))
