import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1797. 设计一个验证系统',
  url: 'https://leetcode.cn/problems/design-authentication-manager/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `你是一位系统管理员，手里有一份文件夹列表 folder，你的任务是要删除该列表中的所有 子文件夹，并以 任意顺序 返回剩下的文件夹。`,
  solutions: [
    {
      script: Script.CPP,
      time: 80,
      memory: 29.4,
      desc: '哈希存储',
      code: `class AuthenticationManager {
public:
    int timeToLive;
    unordered_map<string, int> m;
    AuthenticationManager(int timeToLive): timeToLive(timeToLive) {}
    
    void generate(string tokenId, int currentTime) {
        m[tokenId] = currentTime;
    }
    
    void renew(string tokenId, int currentTime) {
        if (!m.count(tokenId)) return;
        if (currentTime - m[tokenId] >= timeToLive) m.erase(tokenId);
        else m[tokenId] = currentTime;
    }
    
    int countUnexpiredTokens(int currentTime) {
        int ans = 0;
        for (auto &item : m) {
            if (currentTime - item.second < timeToLive) ans++;
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 220,
      memory: 16.5,
      desc: '同上',
      code: `class AuthenticationManager:
    def __init__(self, timeToLive: int):
        self.timeToLive = timeToLive
        self.m = defaultdict()

    def generate(self, tokenId: str, currentTime: int) -> None:
        self.m[tokenId] = currentTime

    def renew(self, tokenId: str, currentTime: int) -> None:
        if not tokenId in self.m:
            return
        if currentTime - self.m[tokenId] >= self.timeToLive:
            self.m.pop(tokenId)
        else:
            self.m[tokenId] = currentTime

    def countUnexpiredTokens(self, currentTime: int) -> int:
        ans = 0
        for v in self.m.values():
            if currentTime - v < self.timeToLive:
                ans += 1
        return ans`,
    },
    {
      script: Script.RUST,
      time: 20,
      memory: 3.6,
      desc: '同上',
      code: `use std::collections::HashMap;
struct AuthenticationManager {
    timeToLive: i32,
    m: HashMap<String, i32>,
}

impl AuthenticationManager {
    fn new(timeToLive: i32) -> Self {
        Self {
            timeToLive,
            m: HashMap::new(),
        }
    }
    fn generate(&mut self, token_id: String, current_time: i32) {
        if !self.m.contains_key(&token_id) {
            self.m.insert(token_id, current_time);
        } else {
            *self.m.get_mut(&token_id).unwrap() = current_time;
        }
    }

    fn renew(&mut self, token_id: String, current_time: i32) {
        if self.m.contains_key(&token_id) {
            let item = self.m.get_mut(&token_id).unwrap();
            if current_time - *item >= self.timeToLive {
                self.m.remove(&token_id);
            } else {
                *item = current_time;
            }
        }
    }

    fn count_unexpired_tokens(&self, current_time: i32) -> i32 {
        let mut ans = 0;
        self.m
            .iter()
            .map(|(_, v)| v)
            .filter(|v| current_time - *v < self.timeToLive)
            .collect::<Vec<&i32>>()
            .len() as i32
    }
}`
,
    },
  ],
};

export default leetCodeMarkdown;
