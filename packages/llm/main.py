import asyncio
from pathlib import Path
from langchain_deepseek import ChatDeepSeek
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.runnables import RunnableLambda
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from best.utils import BESTLYG_LLM_DEEPSEEK_ADDRESS, logger

messages = [SystemMessage("你是数句句"), HumanMessage('学习李云龙的说话方式，并告诉我你是谁')]

prompt = ChatPromptTemplate.from_template(
    '你是一个文学专家，擅长学习各种人的说话方式, 现在你需要学习{name}的说话方式，告诉我你是谁')

chat = ChatDeepSeek(
    model='deepseek',
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_base=BESTLYG_LLM_DEEPSEEK_ADDRESS + "/v1",
    api_key="EMPTY",
)


# def reverse_word(word: str):
#     print('===>reverse_word', word)
#     return word[::-1]


# reverse_word = RunnableLambda(reverse_word)

chain = prompt | chat | StrOutputParser()


async def main():
    # msg = chat.invoke(messages)
    # logger.info(msg.content)
    # for token in chat.stream(messages):
    #     print(token, flush=True, end='')
    # print("\n====")

    # async for event in chain(messages):
    #     for key, val in event.items():
    #         if key[1] == 'on_chain_start':
    #             print('\n\n===> on_chain_start')
    #             print(val)

    # chain.invoke(messages)

    async for e in chain.astream({"name": "李云龙"}):
        print(e, end='', flush=True)
    print('\n========')


if __name__ == "__main__":
    asyncio.run(main())
