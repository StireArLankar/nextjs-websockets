import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

export type WithSocket = {
  onSubmit: (value: string) => void
  messages: string[]
}

const withSocket = <P extends object>(Component: React.ComponentType<P>) => (props: P & WithSocket) => {
  const [messages, setMessages] = useState<string[]>([])

  const { current: socket } = React.useRef(io())

  const addMessage = (msg: string) => {
    setMessages(prev => [...prev, msg])
  }
  
  const onSubmit = (value: string) => {
    socket.emit('message', value)
  }

  useEffect(() => {
    socket.on('broad', (msg: string) => addMessage(msg))
    socket.on('hello', (msg: string) => console.log(msg))
    
    return () => {socket.close()}
  }, [])

  return <Component {...props} messages={messages} onSubmit={onSubmit} />
}

export default withSocket
