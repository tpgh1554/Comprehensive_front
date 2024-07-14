// CreateRoom.js
import React, { useState } from 'react';
import axios from 'axios';
import AxiosApi from '../../api/AxiosApi';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [created, setCreated] = useState(false);
  const email = localStorage.getItem("accessToken");

  const handleCreateRoom = async () => {
    try {
      const response = await AxiosApi.createOpenRoom(roomName, email);
      setRoomId(response.data.roomId);
      setRoomName(response.data.roomName);
      setCreated(true);
    } catch (error) {
      console.error('Error creating room', error);
    }
  };

  return (
    <div>
      <h2>Create Room</h2>
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={handleCreateRoom}>Create Room</button>
      {created && (
        <div>
          <p>Room created successfully!</p>
          <p>Room ID: {roomId}</p>
          <p>Room Name: {roomName}</p>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
