import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { chatMessagesSelector } from '../redux/MessagesSlice'

import MessageForm from './MessageForm'

function ChatMessages({ chatId, onSubmit }) {
  const { user } = useAuth0()
  const messages = useSelector(chatMessagesSelector(chatId))

  const handleMessageFormSubmit = ({ text }) => {
    const message = { chatId, text, name: user.name }
    onSubmit(message)
  }

  return (
    <div>
      {messages.length === 0 && <h5>В чате пока нет сообщений</h5>}
      {messages.map((message) => (
        <div>
          <div key={message.id} className="alert alert-secondary d-inline-block">
            <small className="d-block text-muted">
              {message.name} / {new Date(message.createdAt).toLocaleTimeString()}
            </small>
            {message.text}
          </div>
        </div>
      ))}
      <MessageForm onFormSubmit={handleMessageFormSubmit}/>
    </div>
  )
}

export default ChatMessages
