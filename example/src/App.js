import React from 'react'

import { Fri9gNotifier,fri9g_notify } from 'fri9g-notification-react'
import 'fri9g-notification-react/dist/index.css'

const triggerNotification = () => {
  let n = Math.ceil(Math.random()*3)
  switch(n) {
    case 1 : fri9g_notify.success("test"); break
    case 2 : fri9g_notify.error("test"); break
    case 3 : fri9g_notify.warning("test"); break
  }
  
  
  
}

const App = () => {
  return <>
    <button className='trigger' onClick={triggerNotification}>Trigger notification</button>
    <Fri9gNotifier position={fri9g_notify.POSITION.BOTTOM_LEFT} />
  </>
}

export default App