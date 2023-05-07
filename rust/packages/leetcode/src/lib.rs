use std::{io::Read, ptr::replace, str::FromStr};

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum Difficulty {
    #[serde(rename = "简单")]
    Easy,
    #[serde(rename = "中等")]
    Middle,
    #[serde(rename = "困难")]
    Hard,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct Problem {
    id: String,
    name: String,
    url: String,
    desc: String,
    difficulty: Difficulty,
    tag: Vec<String>,
    solutions: Vec<Solution>,
}

impl FromStr for Problem {
    type Err = serde_json::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        serde_json::from_str::<Problem>(s)
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub enum Script {
    #[serde(rename = "javascript")]
    JavaScript,
    #[serde(rename = "typescript")]
    TypeScript,
    #[serde(rename = "cpp")]
    CPlusPlus,
    #[serde(rename = "rust")]
    Rust,
    #[serde(rename = "python3")]
    Python3,
    #[serde(rename = "java")]
    Java,
    #[serde(rename = "go")]
    Go,
    #[serde(rename = "c")]
    C,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Solution {
    script: Script,
    date: usize,
    time: f64,
    memory: f64,
    desc: String,
    code: String,
}

pub async fn read_from_pathbuf(path: &std::path::PathBuf) -> String {
    let file = tokio::fs::File::open(path).await.expect("Read File Error.");
    let mut file = file.into_std().await;
    let mut s = String::new();
    file.read_to_string(&mut s).expect("Read File Error.");
    s
}

pub async fn fetch() {
    let client = reqwest::Client::new();
    let mut headers = reqwest::header::HeaderMap::new();
    headers.insert("accept", "*/*".parse().unwrap());
    headers.insert(
        "accept-language",
        "zh-CN,zh;q=0.9,ja;q=0.8,ar;q=0.7,en;q=0.6".parse().unwrap(),
    );
    headers.insert("content-type", "application/json".parse().unwrap());
    headers.insert(
        "random-uuid",
        "f750085d-9194-c08f-4e2a-b2fe1892aa9f".parse().unwrap(),
    );
    headers.insert(
        "sec-ch-ua",
        "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\""
            .parse()
            .unwrap(),
    );
    headers.insert("sec-ch-ua-mobile", "?0".parse().unwrap());
    headers.insert("sec-ch-ua-platform", "\"Windows\"".parse().unwrap());
    headers.insert("sec-fetch-dest", "empty".parse().unwrap());
    headers.insert("sec-fetch-mode", "cors".parse().unwrap());
    headers.insert("sec-fetch-site", "same-origin".parse().unwrap());
    headers.insert(
        "x-csrftoken",
        "HQcoEquxluZ31TgAamGGJ2UNWw7uaDjolma6lhh3MyWW82iDTHBfXhrKMcEYQeiF"
            .parse()
            .unwrap(),
    );
    headers.insert("x-op-env", "boe_sample_table".parse().unwrap());
    headers.insert("cookie", "gr_user_id=c4121af1-c1c5-479f-a4e1-9b265f6357fd; a2873925c34ecbd2_gr_last_sent_cs1=bestlyg; p_h5_u=1804C5F6-42D7-44B0-BE43-3CBD1B616EBF; selectedStreamLevel=HD; aliyungf_tc=a4917e11ae5f49428593b013022e1f0b6aac0d7a858de9284a3cb39ece6c023a; NEW_PROBLEMLIST_PAGE=1; _bl_uid=FIlhzcajs7dgsydz3gdFvRws8gFm; csrftoken=02j2dc7gsGYRVLPwNLPsqXBEQyoIfGPofiT5XvrgBexxZ0YIBjTvp3KHWWEut8E7; Hm_lvt_f0faad39bcf8471e3ab3ef70125152c3=1674010059; _gid=GA1.2.39706696.1674957351; Hm_lvt_fa218a3ff7179639febdb15e372f411c=1674959404; __atuvc=4%7C1%2C0%7C2%2C0%7C3%2C4%7C4%2C2%7C5; Hm_lpvt_fa218a3ff7179639febdb15e372f411c=1675080006; a2873925c34ecbd2_gr_session_id=ba5f258a-ee69-4f5b-8ee4-fa54a6470ca4; a2873925c34ecbd2_gr_last_sent_sid_with_cs1=ba5f258a-ee69-4f5b-8ee4-fa54a6470ca4; a2873925c34ecbd2_gr_session_id_ba5f258a-ee69-4f5b-8ee4-fa54a6470ca4=true; _ga_PDVPZYN3CW=GS1.1.1675144168.130.0.1675144168.0.0.0; a2873925c34ecbd2_gr_cs1=bestlyg; Hm_lpvt_f0faad39bcf8471e3ab3ef70125152c3=1675144382; _ga=GA1.2.1141177179.1657860276; _gat=1; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiODIxMDg2IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3ZGEyYTY5ZjI0ODk2YTdlNmYyMWZmN2JmMThkYWU3M2MwZGE2NWM5YWU5MjQzZDllNzA3M2JkMzg1NmUyYTJhIiwiaWQiOjgyMTA4NiwiZW1haWwiOiIiLCJ1c2VybmFtZSI6ImJlc3RseWciLCJ1c2VyX3NsdWciOiJiZXN0bHlnIiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY24vYWxpeXVuLWxjLXVwbG9hZC91c2Vycy94aWFvLXhpYW8teGlhby1qaW5nLXl1L2F2YXRhcl8xNTY4NTQ2MjQ1LnBuZyIsInBob25lX3ZlcmlmaWVkIjp0cnVlLCJfdGltZXN0YW1wIjoxNjczNTc2Nzg5LjIzMzk4NjYsImV4cGlyZWRfdGltZV8iOjE2NzYxNDIwMDAsInZlcnNpb25fa2V5XyI6MCwibGF0ZXN0X3RpbWVzdGFtcF8iOjE2NzUxNDQzNzl9.ih8aXs8i3UtHm6sEwD5fPNPIiklrX4t3qfNMZH42XrY".parse().unwrap());
    headers.insert(
        "Referrer-Policy",
        "strict-origin-when-cross-origin".parse().unwrap(),
    );

    let body = r#"{"operationName":"questionData","variables":{"titleSlug":"{titleSlug}"},"query":"query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    categoryTitle\n    boundTopicId\n    title\n    titleSlug\n    content\n    translatedTitle\n    translatedContent\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n    contributors {\n      username\n      profileUrl\n      avatarUrl\n      __typename\n    }\n    langToValidPlayground\n    topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    companyTagStats\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    stats\n    hints\n    solution {\n      id\n      canSeeDetail\n      __typename\n    }\n    status\n    sampleTestCase\n    metaData\n    judgerAvailable\n    judgeType\n    mysqlSchemas\n    enableRunCode\n    envInfo\n    book {\n      id\n      bookName\n      pressName\n      source\n      shortDescription\n      fullDescription\n      bookImgUrl\n      pressImgUrl\n      productUrl\n      __typename\n    }\n    isSubscribed\n    isDailyQuestion\n    dailyRecordStatus\n    editorType\n    ugcQuestionId\n    style\n    exampleTestcases\n    jsonExampleTestcases\n    __typename\n  }\n}\n"}"#
    .to_string()
    .replace("\\n", "\n")
    .replace(r"{titleSlug}", "two-sum");
    println!("==BODY:{:#?}", body);
    let res = client
        .post("https://leetcode.cn/graphql")
        .json(body.as_bytes())
        .send()
        .await
        .expect("Request Error");
    let status = res.status().as_u16();
    if status >= 200 && status < 400 {
        let body = res.json::<serde_json::Value>().await.expect("ToJson Fail");
        println!("{:?}", body);
    } else {
        panic!("Request Error, {}", res.text().await.unwrap());
    }
}
