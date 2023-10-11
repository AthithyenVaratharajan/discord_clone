import React, { useEffect, useState } from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import { addDoc, collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import db from './firebase';
import { serverTimestamp } from 'firebase/firestore';

const Chat = () => {
    const channelId = useSelector(selectChannelId);
    const user = useSelector(selectUser);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);


    useEffect(() => {
      if (channelId) {
        const myCollection = collection(db, 'channels');
        const channelDoc = doc(myCollection, channelId);
        const messagesCollection = collection(channelDoc, 'messages');
        const orderedMessages = query(messagesCollection, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(orderedMessages, (snapshot) => {
          const messagesData = snapshot.docs.map(doc => doc.data());
          setMessages(messagesData);
        });

        return () => {
          // Unsubscribe from the snapshot listener when component is unmounted
          unsubscribe();
        };
      }
    }, [channelId]);

    const sendMessage = (e) => {
      e.preventDefault();
      const myCollections = collection(db, 'channels');
      const channelDoc = doc(myCollections, channelId);
      const messagesCollection = collection(channelDoc, 'messages');
      addDoc(messagesCollection, {
        timestamp: serverTimestamp(),
        message: input,
        user: user,
      })

      setInput("");
    };

  return (
    <div className='chat'>
        <ChatHeader channelName={channelName}/>

        <div className="chat__messages">
          {messages.map(message => (
            <Message
              timestamp={message.timestamp}
              message={message.message}
              user={message.user}
            />
          ))}


        </div>
        <div className="chat__input">
          <AddCircleRoundedIcon fontSize='large'/>
          <form action="">
              <input value={input} disabled={!channelId}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message #${channelName}`}
                type="text" />
              <button disabled={!channelId}
              className='chat__inputButton'
              onClick={sendMessage}
              type='submit'>Send</button>
          </form>
          <div className="chat__inputIcons">
              <CardGiftcardIcon fontSize='large'/>
              <GifIcon fontSize='large'/>
              <EmojiEmotionsIcon fontSize='large'/>
          </div>
        </div>
    </div>
  )
}

export default Chat
