import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../helpers/api'

const initialState = {
  chats: {}
}

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (chatId) => {
    const response = await api.get(`/chats/${chatId}/messages`)
    return {
      chatId,
      messages: response.data
    }
  }
)

export const MessagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { chatId } = action.payload
      const messages = state.chats[chatId]?.messages || []
      const newMessage = action.payload

      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          messages: [ newMessage ]
        }
      } else {
        state.chats[chatId].messages = [...messages, newMessage]
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      const { chatId, messages } = action.payload
      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          messages
        }
      } else {
        state.chats[chatId].messages = messages
      }
    })
  },
})

// Action creators are generated for each case reducer function
export const { addMessage } = MessagesSlice.actions

export const chatMessagesSelector = chatId => state => state.messages.chats[chatId]?.messages || []

export default MessagesSlice.reducer
