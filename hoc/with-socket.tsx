import React, { useEffect } from 'react'
import io from 'socket.io-client'

const withSocket = (Component: any) => (props: any) => {
  const { current: socket } = React.useRef(io())

  const onSubmit = (value) => {
    socket.emit('message', value)
  }

  useEffect(() => {
    socket.on('broad', (msg) => {
      props.addMessage(msg)
    })
    socket.on('hello', (msg) => console.log(msg))
    
    return () => {
      socket.close()
    }
  }, [])

  return <Component {...props} onSubmit={onSubmit} />
}

export default withSocket
