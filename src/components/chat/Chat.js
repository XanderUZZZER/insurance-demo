import React, { useState, useEffect, useRef } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr'

import ChatWindow from './ChatWindow'
import ChatInput from './ChatInput'

const Chat = () => {
  const [connection, setConnection] = useState(null)
  const [chat, setChat] = useState([])
  const latestChat = useRef(null)

  latestChat.current = chat

  useEffect(() => {
    const newConnection = new HubConnectionBuilder().withUrl('https://localhost:5003/hubs/scan').withAutomaticReconnect().build()
    console.log(newConnection)
    setConnection(newConnection)
  }, [])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(result => {
          console.log('Connected!')

          connection.on('ReceiveMessage', message => {
            const updatedChat = [...latestChat.current]
            updatedChat.push(message)

            setChat(updatedChat)
          })
        })
        .catch(e => console.log('Connection failed: ', e))
    }
  }, [connection])

  const sendMessage = async (user, message) => {
    const chatMessage = {
      user: user,
      message: message,
    }

    if (connection._connectionStarted) {
      try {
        // await connection.send('SendMessage', chatMessage)
        await fetch('https://localhost:5003/agency_222/api/scan/statuses', {
          method: 'POST',
          body: JSON.stringify(chatMessage),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      alert('No connection to server yet.')
    }
  }

  return (
    <div>
      <ChatInput sendMessage={sendMessage} />
      <hr />
      <ChatWindow chat={chat} />
    </div>
  )
}

export default Chat