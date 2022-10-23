---
title: UI
order: 1
sidemenu: false
nav:
  title: 作品集
  path: /sample-reels
  order: 3
group:
  title: ui
  path: /ui
  order: 1
---

```jsx
/**
 * inline: true
 */
import React from 'react';
export default () => {
  return (
    <a href="https://www.bestlyg.com/static/ui.pdf" target="blank">
      link pdf
    </a>
  );
  // <iframe
  //   src="http://localhost:50000/static/ui.pdf"
  //   style={{
  //     position: 'absolute',
  //     top: 0,
  //     left: 0,
  //     zIndex: 1,
  //     width: '100vw',
  //     height: '100vh',
  //   }}
  // />
};
```
