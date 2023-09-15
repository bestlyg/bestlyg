import time

from flask import Flask

__all__ = ['apply']


def apply(app: Flask):

    @app.route("/")
    def root():
        localtime = time.asctime(time.localtime(time.time()))
        return "bestlyg server {localtime}".format(localtime=localtime)
