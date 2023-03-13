import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2383. 赢得比赛需要的最少训练时长',
  url: 'https://leetcode.cn/problems/minimum-hours-of-training-to-win-a-competition/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回击败全部 n 个对手需要训练的 最少 小时数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 0,
      memory: 10.9,
      desc: '遍历',
      code: `class Solution {
public:
    int minNumberOfHours(int initialEnergy, int initialExperience, vector<int>& energy, vector<int>& experience) {
        int res = 0, esum = initialExperience;
        res += max(accumulate(energy.begin(), energy.end(), 0) - initialEnergy + 1, 0);
        for (auto &e : experience) {
            if (e >= esum) res += e - esum + 1, esum += e - esum + 1;
            esum += e;
        }
        return res;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 4,
      memory: 10.8,
      desc: '遍历',
      code: `class Solution {
public:
    int minNumberOfHours(int initialEnergy, int initialExperience, vector<int>& energy, vector<int>& experience) {
        int res = 0;
        for (int i = 0; i < energy.size(); i++) {
            if (initialEnergy <= energy[i]) 
                res += energy[i] - initialEnergy + 1, initialEnergy += energy[i] - initialEnergy + 1;
            initialEnergy -= energy[i];
            if (initialExperience <= experience[i]) 
                res += experience[i] - initialExperience + 1, initialExperience += experience[i] - initialExperience + 1;
            initialExperience += experience[i];
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 36,
      memory: 14.9,
      desc: '同上',
      code: `class Solution:
def minNumberOfHours(self, initialEnergy: int, initialExperience: int, energy: List[int], experience: List[int]) -> int:
    res = 0
    for i in range(len(energy)):
        if initialEnergy <= energy[i]:
            res += energy[i] - initialEnergy + 1
            initialEnergy += energy[i] - initialEnergy + 1
        initialEnergy -= energy[i]
        if initialExperience <= experience[i]:
            res += experience[i] - initialExperience + 1
            initialExperience += experience[i] - initialExperience + 1
        initialExperience += experience[i]
    return res`,
    },
    {
      script: Script.RUST,
      time: 0,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn min_number_of_hours(
        mut initial_energy: i32,
        mut initial_experience: i32,
        energy: Vec<i32>,
        experience: Vec<i32>,
    ) -> i32 {
        let mut res = 0;
        for i in 0..energy.len() {
            if initial_energy <= energy[i] {
                res += energy[i] - initial_energy + 1;
                initial_energy += energy[i] - initial_energy + 1;
            }
            initial_energy -= energy[i];
            if initial_experience <= experience[i] {
                res += experience[i] - initial_experience + 1;
                initial_experience += experience[i] - initial_experience + 1;
            }
            initial_experience += experience[i];
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
