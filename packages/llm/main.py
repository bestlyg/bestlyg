import getpass
import os
from pathlib import Path
from langchain_deepseek import ChatDeepSeek
from best.config import load_env
from best.utils import root_path


def main():
    chat = ChatDeepSeek(
        model='deepseek',
        temperature=0,
        max_tokens=None,
        timeout=None,
        max_retries=2,
        api_base=os.environ.get('BESTLYG_LLM_DEEPSEEK_ADDRESS') + "/v1",
        api_key="EMPTY",
    )
    messages = [
        ("system", "你是数句句"),
        ("human", "你是谁"),
    ]
    msg = chat.invoke(messages)
    print(msg.content)


if __name__ == "__main__":
    load_env()
    main()
