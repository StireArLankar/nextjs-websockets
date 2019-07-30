import React, { useState } from 'react'
import withSocket, { WithSocket } from 'Src/hoc/with-socket'

const Chat = (props: WithSocket) => {
  const [value, setValue] = useState<string>('')

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    props.onSubmit(value)
    setValue('')
  }

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setValue(val)
  }

  const renderMessages = () => {
    return props.messages.map((msg) => <li key={msg}>{msg}</li>)
  }

  return (
    <div>
      <h1>Chat Box</h1>
      <input type='text' value={value} onChange={onChange} />
      <button type='submit' onClick={onSubmit}>Submit</button>
      <ul>
        {renderMessages()}
      </ul>
    </div>
  )
}

// Chat.getInitialProps = async (context) => {}

export default withSocket(Chat)
