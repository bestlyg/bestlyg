import React from 'react';
import { point24 } from './point24';

const data: Record<string, React.FC<any>> = { point24 };
export function Applications({ name }: { name: string }) {
  const App = data[name];
  if (!App) return null;
  return <App />;
}
