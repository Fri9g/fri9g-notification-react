import React, {useState,useEffect} from 'react'
import styles from './styles.module.css'

const default_duration = 10000
const default_refresh_frequency = 200
var fri9g_notify = {
  duration: default_duration,
  refresh_frequency: default_refresh_frequency,
  POSITION: {
    TOP_LEFT: "top-left",
    TOP_RIGHT: "top-right",
    BOTTOM_LEFT: "bottom-left",
    BOTTOM_RIGHT: "bottom-right"
  },
  TYPE: {
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error"
  },
  notifications: [],
  timer: []
}
var notification_container

fri9g_notify.notify = (text,type,options={}) => {
  let check_type = false
  for (let i = 0; i < Object.keys(fri9g_notify.TYPE).length; i++) {
    let e = Object.keys(fri9g_notify.TYPE)[i]
    if(fri9g_notify.TYPE[e]===type) {
      check_type = true
      break
    }
  }
  if(!check_type) type = fri9g_notify.TYPE.SUCCESS

  let id = "fri9g-"+new Date().getTime()+"-"+Math.floor(Math.random()*1000)
  while(fri9g_notify.timer[id]) {
    id = "fri9g-"+new Date().getTime()+"-"+Math.floor(Math.random()*1000)
  }
  fri9g_notify.notifications[id] = {
    id,
    options,
    text,
    type
  }

  let notification = <div className={`${styles["fri9g-notification-item"]} ${"fri9g-notification-"+type}`} fri9g-identifier={id}>
    <h4 className={styles["fri9g-notification-title"]}>{text[0].toUpperCase() + text.substring(1)}</h4>
    <div className={styles["fri9g-notification-loading-bar"]}></div>
  </div>
  if(options.background) notification.style.backgroundColor = options.background
  if(options.color) notification.style.color = options.color

  fri9g_notify.notifications[id].timeout_function = () => {
    clearInterval(fri9g_notify.timer[id].interval)
    delete fri9g_notify.timer[id]
    delete fri9g_notify.notifications[id]
    fri9g_notify.updateTimer(Date.now())
    fri9g_notify.update(fri9g_notify)
  }
  fri9g_notify.notifications[id].interval_function = () => {
    fri9g_notify.timer[id].time_left = fri9g_notify.timer[id].time_left-fri9g_notify.refresh_frequency
    if(fri9g_notify.timer[id].time_left<0) clearInterval(fri9g_notify.timer[id].interval)
    fri9g_notify.notifications[id].loadingBar = ((fri9g_notify.timer[id].time_left/fri9g_notify.timer[id].initial_time)*100)+"%"
    fri9g_notify.updateTimer(Date.now())
    fri9g_notify.update(fri9g_notify)
  }
  fri9g_notify.timer[id] = {
    timeout: setTimeout(fri9g_notify.notifications[id].timeout_function,(options.time ? (typeof options.time === "number" ? options.time : parseInt(options.time) ) : fri9g_notify.duration)+fri9g_notify.refresh_frequency),
    interval: setInterval(fri9g_notify.notifications[id].interval_function,fri9g_notify.refresh_frequency),
    time_left: options.time ? (typeof options.time === "number" ? options.time : parseInt(options.time) ) : fri9g_notify.duration,
    initial_time: options.time ? (typeof options.time === "number" ? options.time : parseInt(options.time) ) : fri9g_notify.duration
  }
  fri9g_notify.update(fri9g_notify)
}

fri9g_notify.success = (text,options={}) => {
  fri9g_notify.notify(text,fri9g_notify.TYPE.SUCCESS,options)
}

fri9g_notify.error = (text,options={}) => {
  fri9g_notify.notify(text,fri9g_notify.TYPE.ERROR,options)
}

fri9g_notify.warning = (text,options={}) => {
  fri9g_notify.notify(text,fri9g_notify.TYPE.WARNING,options)
}

export {fri9g_notify}

export const Fri9gNotifier = ({ position }) => {

  const [fri9g_update,setFri9g_update] = useState(0)
  const [timer,setTimer] = useState(0)
  const [timerInterval,setTimerInterval] = useState(null)
  const [fri9g,setFri9g] = useState(null)
  const test = [1,2,3]

  useEffect(() => {
    fri9g_notify.updateTimer = setFri9g_update
    fri9g_notify.update = setFri9g
    setFri9g(fri9g_notify)
    // let int = setInterval(() => {
    //   setTimer(Date.now())
    // },100)
    // setTimerInterval(int)
  },[fri9g_notify.notifications])
  let check_position = false
  for (let i = 0; i < Object.keys(fri9g_notify.POSITION).length; i++) {
    let e = Object.keys(fri9g_notify.POSITION)[i]
    if(fri9g_notify.POSITION[e]===position) {
      check_position = true
      break
    }
  }
  if(!check_position) position = fri9g_notify.POSITION.BOTTOM_LEFT
  notification_container = <div className={`${styles["fri9g-notification-container"]} ${styles["fri9g-notification-container-"+position]}`}>
    {(fri9g && fri9g.notifications) && Object.keys(fri9g.notifications).map(n => (
    <div className={`${styles["fri9g-notification-item"]} ${styles["fri9g-notification-"+fri9g.notifications[n].type]}`} style={{backgroundColor:fri9g.notifications[n].options.background,color:fri9g.notifications[n].options.color}} fri9g-identifier={fri9g.notifications[n].id} onMouseOver={(e) => {
      clearInterval(fri9g_notify.timer[fri9g.notifications[n].id].interval)
      clearTimeout(fri9g_notify.timer[fri9g.notifications[n].id].timeout)
    }} onMouseLeave={e => {
      fri9g_notify.timer[fri9g.notifications[n].id].timeout = setTimeout(fri9g_notify.notifications[fri9g.notifications[n].id].timeout_function,fri9g_notify.timer[fri9g.notifications[n].id].time_left+fri9g_notify.refresh_frequency)
      fri9g_notify.timer[fri9g.notifications[n].id].interval = setInterval(fri9g_notify.notifications[fri9g.notifications[n].id].interval_function,fri9g_notify.refresh_frequency)
    }}>
      <h4 className={styles["fri9g-notification-title"]}>{fri9g.notifications[n].text[0].toUpperCase() + fri9g.notifications[n].text.substring(1)}</h4>
      <div className={styles["fri9g-notification-loading-bar"]} style={{width:fri9g.notifications[n].loadingBar}}></div>
      <svg xmlns="http://www.w3.org/2000/svg" className={styles["fri9g-notification-close-btn"]} viewBox='0 0 10 10' enableBackground="new 0 0 10 10" height="10" width="10" onClick={(e) => {
        e.preventDefault()
        console.log(fri9g_notify,fri9g.notifications[n].id)
        clearTimeout(fri9g_notify.timer[fri9g.notifications[n].id].timeout)
        clearInterval(fri9g_notify.timer[fri9g.notifications[n].id].interval)
        delete fri9g_notify.timer[fri9g.notifications[n].id]
        delete fri9g_notify.notifications[fri9g.notifications[n].id]
        setFri9g(fri9g_notify)
      }}>
        <line x1="0" y1="0" x2="10" y2="10" stroke='#fff' strokeWidth="2.5" strokeLinecap='round' strokeMiterlimit="10"/>
        <line x1="10" y1="0" x2="0" y2="10" stroke='#fff' strokeWidth="2.5" strokeLinecap='round' strokeMiterlimit="10"/>
      </svg>
    </div>
    ))}
  </div>
  return notification_container
}
