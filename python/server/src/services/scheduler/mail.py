from src.services.mail import send_mail
from flask_apscheduler import APScheduler

__all__ = ['apply']


def send(*args, **kwargs):
    kwargs["subject"] = "定时提醒-"+(kwargs["subject"] or "常规提醒")
    if not "html" in kwargs:
        kwargs["html"] = kwargs["subject"]
    send_mail(*args, **kwargs)


def send_to_lyg(*args, **kwargs):
    kwargs["recipients"] = ["1057966749@qq.com"]
    send(*args, **kwargs)


def send_to_yzx(*args, **kwargs):
    kwargs["recipients"] = ["2428047022@qq.com"]
    send(*args, **kwargs)


def apply(scheduler: APScheduler):

    # @scheduler.task('cron', id='jiaohang', day_of_week='fri', hour='9', minute='55')
    # def jiaohang():
    #     send_to_lyg(subject="10点钟交行抢5折券", html="10点钟交行抢5折券")

    # @scheduler.task('cron', id='janhangshenghuo', hour='12')
    # def janhangshenghuo():
    #     send_to_lyg(subject="建行生活", html="建行生活记得签到")

    # @scheduler.task('cron', id='tengxunshipin', day='1', hour='8')
    # def tengxunshipin():
    #     send_to_lyg(subject="腾讯视频提醒", html="腾讯视频签到")

    # @scheduler.task('cron', id='tengxunshipin2', day_of_month='L', hour='20')
    # def tengxunshipin2():
    #     send(subject="腾讯视频提醒", html="腾讯视频签到")

    # @scheduler.task('cron', id='test', second="1,15,30,45,59")
    # def test():
    #     print("===> scheduler test")
    #     send_to_lyg(subject="lyg-test", html="lyg-test")
    pass