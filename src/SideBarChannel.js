import React from 'react';
import "./SideBarChannel.css";
import { useDispatch } from 'react-redux';
import { setChannelInfo } from './features/appSlice';

const SideBarChannel = ({id, channelName}) => {
  const dispatch = useDispatch();
  return (
    <div className='sideBarChannel' onClick={() => dispatch(setChannelInfo({
      channelId: id, channelName: channelName,
    }))}>
        <h4><span className='sideBarChannel__hash'>#</span>{channelName}</h4>
    </div>
  )
}

export default SideBarChannel
