import base64
from functools import cache
import tomllib
from os import path,environ
from flask import Flask
from deepmerge import always_merger

__all__ = [
    'apply'
]

def apply(app: Flask):
    file_path = path.abspath(__file__)
    dir_path = path.dirname(file_path)
    config = get_config(path.join(dir_path, 'config.toml'))
    mode = environ.get('MODE') or 'dev'
    config = always_merger.merge(config, get_config(path.join(dir_path, f'config.{mode}.toml')))
    for (k, v) in config.items():
        app.config[k] = v

def decode(s: str) -> str:
    return base64.b64decode(s.encode()).decode()

@cache
def get_config(path: str):
    config = tomllib.load(open(path, 'rb'))
    if 'MAIL_PASSWORD' in config:
        config['MAIL_PASSWORD'] = decode(config['MAIL_PASSWORD'])
    return config
