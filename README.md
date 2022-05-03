# fri9g-notification-react

> react version of fri9g-notification

[![NPM](https://img.shields.io/npm/v/fri9g-notification-react.svg)](https://www.npmjs.com/package/fri9g-notification-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save fri9g-notification-react
```

## Usage

```jsx
import React, { Component } from 'react'

import { Fri9gNotifier,fri9g_notify } from 'fri9g-notification-react'
import 'fri9g-notification-react/dist/index.css'

const Example = (props) => {

  const triggerNotification = () => {
    let n = Math.ceil(Math.random()*3)
    switch(n) {
      case 1 : fri9g_notify.success("test"); break
      case 2 : fri9g_notify.error("test"); break
      case 3 : fri9g_notify.warning("test"); break
    }
  }

  return <>
    <button className='trigger' onClick={triggerNotification}>Trigger notification</button>
    <Fri9gNotifier position={fri9g_notify.POSITION.BOTTOM_LEFT} />
  </>
}
```

## License

MIT © [Fri9g](https://github.com/Fri9g)
