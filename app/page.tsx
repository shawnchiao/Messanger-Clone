import React from 'react'
import '../styles/globals.css'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

const HomePage = () => {
  return (
    <main>
      <MessageList/>
      <ChatInput/>
    </main>
  )
}

export default HomePage
