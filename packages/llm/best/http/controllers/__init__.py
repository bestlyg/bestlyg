from importlib import import_module
import inspect
from os import getcwd, path
from glob import glob
from pathlib import Path
from .chat import *
from .health import *
from best.utils import CWD
from ..core import Controller

ignore_files = set([
    __file__
])


def load_controllers():
    dir_path = Path(__file__).parent
    pattern = path.join(dir_path, '**', '*.py')
    files = glob(pattern, recursive=True)
    for file in files:
        if file not in ignore_files:
            relative_path = path.relpath(file, CWD)
            module_name = path.splitext(relative_path)[
                0].replace(path.sep, '.')
            module = import_module(module_name)
            for name, obj in inspect.getmembers(module):
                # 检查是否为类且继承自 A 类，同时排除 A 类本身
                if inspect.isclass(obj) and issubclass(obj, Controller) and obj != Controller:
                    print(f"类 {name} 继承自类 A，位于模块 {module_name}")
