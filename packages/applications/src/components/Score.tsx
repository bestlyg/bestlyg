import { Space, Statistic } from 'antd';
import React, { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '@bestlyg/shared';

export const SCORE_SCORE = 'SCORE';
export const SCORE_MAX_SCORE = 'MAX_SCORE';
export const Score = ({ score, maxScore }: { score: number; maxScore: number }) => {
  return (
    <Space>
      <Statistic title="当前分数" value={score} />
      <Statistic title="历史最高" value={maxScore} />
    </Space>
  );
};
export const useScore = (PREFIX: string) => {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  useEffect(() => {
    const maxScore = getLocalStorage(PREFIX + SCORE_MAX_SCORE);
    setMaxScore(parseInt(maxScore ?? '0'));
    const score = getLocalStorage(PREFIX + SCORE_SCORE);
    setScore(parseInt(score ?? '0'));
  }, []);
  useEffect(() => {
    if (score > maxScore) {
      setMaxScore(score);
      setLocalStorage(PREFIX + SCORE_MAX_SCORE, score + '');
    }
    setLocalStorage(PREFIX + SCORE_SCORE, score + '');
  }, [score, maxScore]);
  const Tag = <Score score={score} maxScore={maxScore} />;
  return { score, setScore, maxScore, setMaxScore, Tag };
};
