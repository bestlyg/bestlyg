
import os
from pathlib import Path
from best.utils import root_path
from dotenv import load_dotenv

env_path = root_path / 'node_modules' / '@bestlyg' / 'common' / '.env'

__all__ = [
    "load_env",
    "env_path"
]


def load_env():
    print(f'Load Env From: [{env_path}]')
    load_dotenv(env_path)
    best_env = list(filter(lambda v: v[0].startswith(
        'BESTLYG_'), os.environ.items()))
    for key, val in best_env:
        print(f'{key}={val}')
