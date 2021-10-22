import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../helpers/api'

export const fetchChats = createAsyncThunk(
  'chats/fetchChats',
  async () => {
    const response = await api.get('/chats')
    return response.data
  },
)

export const addChat = createAsyncThunk(
  'chats/addChat',
  async ({ title }) => {
    const response = await api.post('/chats', {
      title,
    })
    return response.data
  },
)

const initialState = {
  chats: [],
}

export const ChatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChats: (state, action) => {
      const id = state.chats.length
      const newChats = {
        id,
        title: action.payload,
      }
      state.chats.push(newChats)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.chats = action.payload
    })

    builder.addCase(addChat.fulfilled, (state, action) => {
      state.chats.push(action.payload)
    })
  },
})

export const chatsSelector = (state) => state.chats.chats

export default ChatsSlice.reducer
