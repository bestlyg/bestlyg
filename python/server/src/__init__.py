from flask import Flask
from datetime import datetime
import json
import src.config
import src.services.scheduler
import src.services.mail 
import src.controllers.health_check
import src.controllers.root


def send_mail_server_init(app: Flask):
    now = datetime.now()
    now_str = now.strftime("%Y-%m-%d %H:%M:%S")
    config_str = ""
    config_str += "<ul>"
    for key, val in app.config.items():
        config_str += f"<li>{key}&nbsp;:&nbsp;{val}</li>"
    config_str += "</ul>"
    json.dumps(app.config, indent=4, default=str)
    subject = f"Server启动提示-{now_str}"
    src.services.mail.send_mail(
        recipients=["1057966749@qq.com"],
        subject=subject,
        html=f"<h1>{subject}</h1><h2>Environment</h2>{config_str}"
    )
    pass


def create_app():
    app = Flask(__name__)

    modules = [src.config, src.services.mail, src.services.scheduler,]
    controllers = [src.controllers.health_check, src.controllers.root]

    with app.app_context():
        for module in modules + controllers:
            module.apply(app)

    send_mail_server_init(app)

    return app
