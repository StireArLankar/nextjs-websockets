import React, { useState } from 'react'

const withMessages = (Component) => (props: any) => {
  const [messages, setMessages] = useState<string[]>([])

  const addMessage = (msg: string) => {
    setMessages(prev => [...prev, msg])
  }

  return (
    <Component {...props} messages={messages} addMessage={addMessage} />
  )
}

export default withMessages
