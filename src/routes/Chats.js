import React, { useEffect } from 'react'
import { NavLink, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { addChat, fetchChats, chatsSelector } from '../redux/ChatsSlice'
import { addMessage, fetchMessages } from '../redux/MessagesSlice'
import ChatMessages from '../components/ChatMessages'

import { apiUrl } from '../helpers/api'

const socket = io(apiUrl)

function Chats() {
  const chatList = useSelector(chatsSelector)
  const dispatch = useDispatch()

  const { chatId } = useParams()

  const handleAddChats = () => {
    const title = window.prompt('Введите название чата')
    dispatch(addChat({ title }))
    // history.push(`/chats/${id}`)
  }

  const handleMessageSubmit = (message) => {
    socket.emit('new message', message)
  }

  useEffect(() => {
    dispatch(fetchChats())

    socket.on('new message', message => {
      dispatch(addMessage(message))
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchMessages(chatId))
  }, [chatId, dispatch])

  return (
    <div className="Chats">
      <h1>Чаты</h1>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleAddChats}>Добавить чат</button>
      </div>
      <ul className="nav nav-tabs mb-3">
        {chatList.map(chat => (
          <li key={chat.id} className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to={`/chats/${chat._id}`}>{chat.title}</NavLink>
          </li>
        ))}
      </ul>

      {chatId && <ChatMessages chatId={chatId} onSubmit={handleMessageSubmit}/>}
    </div>
  )
}

export default Chats
