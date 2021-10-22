import { configureStore } from '@reduxjs/toolkit'
import ChatsReducer from './ChatsSlice'
import MessagesReducer from './MessagesSlice'

export const store = configureStore({
  reducer: {
    chats: ChatsReducer,
    messages: MessagesReducer,
  },
})
