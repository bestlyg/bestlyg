from asyncio import sleep

from best.utils import BESTLYG_LLM_DEEPSEEK_ADDRESS
from ..core import Service
from langchain_deepseek import ChatDeepSeek
from typing import Any, Dict, List
from langchain_core.messages import SystemMessage, HumanMessage, BaseMessage
from langchain_core.runnables import RunnableLambda
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.outputs import LLMResult
from langchain_core.callbacks import BaseCallbackHandler
from ..models import ChatStreamRequest

# prompt = ChatPromptTemplate.format_prompt(
#     SystemMessage('你是一个文学专家，擅长学习各种人的说话方式, 现在你需要学习鲁迅的说话方式')
# )

chat = ChatDeepSeek(
    model='deepseek',
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_base=BESTLYG_LLM_DEEPSEEK_ADDRESS + "/v1",
    api_key="EMPTY",
)


chain = chat | StrOutputParser()


class LoggingHandler(BaseCallbackHandler):
    def on_chat_model_start(
        self, serialized: Dict[str, Any], messages: List[List[BaseMessage]], **kwargs
    ) -> None:
        print("\n\n=====>Chat model started")

    def on_llm_end(self, response: LLMResult, **kwargs) -> None:
        print(f"\n\n=====>Chat model ended, response: {response}")

    def on_chain_start(
        self, serialized: Dict[str, Any], inputs: Dict[str, Any], **kwargs
    ) -> None:
        print(f"\n\n=====>Chain {serialized} started")

    def on_chain_end(self, outputs: Dict[str, Any], **kwargs) -> None:
        print(f"\n\n=====>Chain ended, outputs: {outputs}")


async def getChatStream(req: ChatStreamRequest):
    callbacks = [LoggingHandler()]
    messages = [SystemMessage('你是一个文学专家，擅长学习各种人的说话方式, 现在你需要学习鲁迅的说话方式')] + \
        list(map(lambda v: v.convert(), req.messages))
    print(messages)
    async for e in chain.astream(messages, {"callbacks": callbacks}):
        print(e, end='', flush=True)
        yield f'data: {e}\n\n'
    # for i in range(10):
    #     # 模拟一些耗时操作
    #     await sleep(1)
    #     yield f"Data chunk {i}\n".encode()
