import time

from flask import Flask

__all__ = ['apply']


def apply(app: Flask):

    @app.route("/health-check")
    def hello_world():
        localtime = time.asctime(time.localtime(time.time()))
        return "health-check {localtime}".format(localtime=localtime)
