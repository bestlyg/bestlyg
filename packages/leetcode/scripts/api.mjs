import '@bestlyg/cli/globals';

const axios = best.axios;

const request = axios.create({
    baseURL: 'https://leetcode.cn/graphql',
    headers: {
        accept: '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,ja;q=0.8,ar;q=0.7,en;q=0.6',
        'content-type': 'application/json',
        'random-uuid': 'f750085d-9194-c08f-4e2a-b2fe1892aa9f',
        'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-csrftoken': '02j2dc7gsGYRVLPwNLPsqXBEQyoIfGPofiT5XvrgBexxZ0YIBjTvp3KHWWEut8E7',
        'x-op-env': 'boe_sample_table',
        cookie: 'gr_user_id=c4121af1-c1c5-479f-a4e1-9b265f6357fd; a2873925c34ecbd2_gr_last_sent_cs1=bestlyg; p_h5_u=1804C5F6-42D7-44B0-BE43-3CBD1B616EBF; selectedStreamLevel=HD; aliyungf_tc=a4917e11ae5f49428593b013022e1f0b6aac0d7a858de9284a3cb39ece6c023a; NEW_PROBLEMLIST_PAGE=1; _bl_uid=FIlhzcajs7dgsydz3gdFvRws8gFm; csrftoken=02j2dc7gsGYRVLPwNLPsqXBEQyoIfGPofiT5XvrgBexxZ0YIBjTvp3KHWWEut8E7; Hm_lvt_f0faad39bcf8471e3ab3ef70125152c3=1674010059; _gid=GA1.2.39706696.1674957351; Hm_lvt_fa218a3ff7179639febdb15e372f411c=1674959404; __atuvc=4%7C1%2C0%7C2%2C0%7C3%2C4%7C4%2C2%7C5; Hm_lpvt_fa218a3ff7179639febdb15e372f411c=1675080006; a2873925c34ecbd2_gr_session_id=ba5f258a-ee69-4f5b-8ee4-fa54a6470ca4; a2873925c34ecbd2_gr_last_sent_sid_with_cs1=ba5f258a-ee69-4f5b-8ee4-fa54a6470ca4; a2873925c34ecbd2_gr_session_id_ba5f258a-ee69-4f5b-8ee4-fa54a6470ca4=true; _ga_PDVPZYN3CW=GS1.1.1675144168.130.0.1675144168.0.0.0; a2873925c34ecbd2_gr_cs1=bestlyg; Hm_lpvt_f0faad39bcf8471e3ab3ef70125152c3=1675144382; _ga=GA1.2.1141177179.1657860276; _gat=1; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiODIxMDg2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3ZGEyYTY5ZjI0ODk2YTdlNmYyMWZmN2JmMThkYWU3M2MwZGE2NWM5YWU5MjQzZDllNzA3M2JkMzg1NmUyYTJhIiwiaWQiOjgyMTA4NiwiZW1haWwiOiIiLCJ1c2VybmFtZSI6ImJlc3RseWciLCJ1c2VyX3NsdWciOiJiZXN0bHlnIiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY24vYWxpeXVuLWxjLXVwbG9hZC91c2Vycy94aWFvLXhpYW8teGlhby1qaW5nLXl1L2F2YXRhcl8xNTY4NTQ2MjQ1LnBuZyIsInBob25lX3ZlcmlmaWVkIjp0cnVlLCJfdGltZXN0YW1wIjoxNjczNTc2Nzg5LjIzMzk4NjYsImV4cGlyZWRfdGltZV8iOjE2NzYxNDIwMDAsInZlcnNpb25fa2V5XyI6MCwibGF0ZXN0X3RpbWVzdGFtcF8iOjE2NzUxNDQzNzl9.ih8aXs8i3UtHm6sEwD5fPNPIiklrX4t3qfNMZH42XrY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
});
