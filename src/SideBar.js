import React, { useEffect, useState } from 'react';
import "./SideBar.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SideBarChannel from './SideBarChannel';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';
import { collection, onSnapshot, addDoc } from './firebase';

const SideBar = () => {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const myCollection = collection(db, 'channels')
        onSnapshot(myCollection,(snapshot) => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data(),

            })))
        ))
    }, [])

    const handleAdd = () => {
        const channelName = prompt("Start a new group chat");

        if (channelName) {
            const myCollections = collection(db, 'channels');
                addDoc(myCollections, {
                channelName,
            })
        }
    };

  return (
    <div className='sideBar'>
        <div className='sideBar__top'>
            <h3>Community-Hub</h3>
            <ExpandMoreIcon />
        </div>

        <div className="sidebar__channels">
            <div className="sidebar__channelsHeader">
                <div className="sidebar__header">
                    <ExpandMoreIcon />
                    <h4>Channels</h4>
                </div>

                <AddIcon
                    onClick={handleAdd}
                    className="sidebar__addChannel"
                />
            </div>
            <div className="sidebar__channelsList">
                {channels.map(({id, channel}) => (
                    <SideBarChannel key={id} id={id} channelName={channel.channelName}/>
                ))}

            </div>
        </div>
        <div className="sidebar__zoom">
            <VideocamIcon
                className='sidebar__zoomIcon'
                fontSize='large'
            />
            <div className="sidebar__zoomInfo">
                <h3>Make a Zoom Call</h3>
                <p>Video Call</p>
            </div>

            <div className="sidebar__zoomIcons">
                <VideoCallIcon />
            </div>
        </div>

        <div className="sidebar__profile">
            <Avatar onClick={() => auth.signOut()} src={user.photo}/>
            <div className="sidebar__profileInfo">
                <h3>{user.displayName}</h3>
                <p>#{user.uid.substring(0, 5)}</p>
            </div>
            <div className="sidebar__profileIcons">
                <SettingsIcon />
            </div>
        </div>
    </div>
  )
}

export default SideBar;
