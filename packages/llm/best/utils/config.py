
import os
from dotenv import load_dotenv
from .constants import ROOT_PATH
from .logger import logger

env_path = ROOT_PATH / 'node_modules' / '@bestlyg' / 'common' / '.env'
load_dotenv(env_path)

__all__ = [
    'env_path',
    'BESTLYG_SERVER_PORT',
    'BESTLYG_SERVER_MAIL_HOST',
    'BESTLYG_SERVER_MAIL_USER',
    'BESTLYG_SERVER_MAIL_PASS',
    'BESTLYG_LEETCODE_CSRF',
    'BESTLYG_LEETCODE_SESSION',
    'BESTLYG_DATABASE_URL',
    'BESTLYG_SECRET',
    'BESTLYG_GITHUB_REPO_PATH_BESTLYG',
    'BESTLYG_GITEE_REPO_PATH',
    'BESTLYG_GITHUB_REPO_PATH_BESTLYG_GITHUBIO_IO',
    'BESTLYG_SSH_WEB_PATH',
    'BESTLYG_SSH_PROJECT_PATH',
    'BESTLYG_SSH_USERNAME',
    'BESTLYG_SSH_IP',
    'BESTLYG_AES_KEY',
    'BESTLYG_AES_IV',
    'BESTLYG_LLM_DEEPSEEK_ADDRESS',
    # 'BESTLYG_LLM_DEEPSEEK_ADDRESS2'
]

BESTLYG_SERVER_PORT = int(os.environ.get('BESTLYG_SERVER_PORT'))
BESTLYG_SERVER_MAIL_HOST = os.environ.get('BESTLYG_SERVER_MAIL_HOST')
BESTLYG_SERVER_MAIL_USER = os.environ.get('BESTLYG_SERVER_MAIL_USER')
BESTLYG_SERVER_MAIL_PASS = os.environ.get('BESTLYG_SERVER_MAIL_PASS')
BESTLYG_LEETCODE_CSRF = os.environ.get('BESTLYG_LEETCODE_CSRF')
BESTLYG_LEETCODE_SESSION = os.environ.get('BESTLYG_LEETCODE_SESSION')
BESTLYG_DATABASE_URL = os.environ.get('BESTLYG_DATABASE_URL')
BESTLYG_SECRET = os.environ.get('BESTLYG_SECRET')
BESTLYG_GITHUB_REPO_PATH_BESTLYG = os.environ.get(
    'BESTLYG_GITHUB_REPO_PATH_BESTLYG')
BESTLYG_GITEE_REPO_PATH = os.environ.get('BESTLYG_GITEE_REPO_PATH')
BESTLYG_GITHUB_REPO_PATH_BESTLYG_GITHUBIO_IO = os.environ.get(
    'BESTLYG_GITHUB_REPO_PATH_BESTLYG_GITHUBIO_IO')
BESTLYG_SSH_WEB_PATH = os.environ.get('BESTLYG_SSH_WEB_PATH')
BESTLYG_SSH_PROJECT_PATH = os.environ.get('BESTLYG_SSH_PROJECT_PATH')
BESTLYG_SSH_USERNAME = os.environ.get('BESTLYG_SSH_USERNAME')
BESTLYG_SSH_IP = os.environ.get('BESTLYG_SSH_IP')
BESTLYG_AES_KEY = os.environ.get('BESTLYG_AES_KEY')
BESTLYG_AES_IV = os.environ.get('BESTLYG_AES_IV')
BESTLYG_LLM_DEEPSEEK_ADDRESS = os.environ.get('BESTLYG_LLM_DEEPSEEK_ADDRESS')
# BESTLYG_LLM_DEEPSEEK_ADDRESS2 = os.environ.get('BESTLYG_LLM_DEEPSEEK_ADDRESS2')


def env_check():
    logger.info("env_check")
    all_variables = globals()
    for k in __all__:
        if not all_variables[k]:
            raise ValueError(f"环境变量 {k} 未设置。")
    logger.success(f'Load Env Success: {__all__}')


env_check()
