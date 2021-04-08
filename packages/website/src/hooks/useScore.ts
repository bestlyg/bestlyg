import { getLocalStorage, setLocalStorage } from '@bestlyg/shared';
import { useState, useEffect } from 'react';

export const USE_SCORE_SCORE = 'SCORE';
export const USE_SCORE_MAX_SCORE = 'MAX_SCORE';
export const useScore = (PREFIX: string) => {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  useEffect(() => {
    const maxScore = getLocalStorage(PREFIX + USE_SCORE_MAX_SCORE);
    setMaxScore(parseInt(maxScore ?? '0'));
    const score = getLocalStorage(PREFIX + USE_SCORE_SCORE);
    setScore(parseInt(score ?? '0'));
  }, []);
  useEffect(() => {
    if (score > maxScore) {
      setMaxScore(score);
      setLocalStorage(PREFIX + USE_SCORE_MAX_SCORE, score + '');
    }
    setLocalStorage(PREFIX + USE_SCORE_SCORE, score + '');
  }, [score, maxScore]);
  return { score, setScore, maxScore, setMaxScore };
};
