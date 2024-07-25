import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    if (isAdmin) {
      socket.on('audio', (data) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(data.buffer, (buffer) => {
          const source = audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(audioContext.destination);
          source.start(0);
        });
      });
    }
  }, [isAdmin]);

  const handleUserAudio = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioRef.current.srcObject = stream;
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      const reader = new FileReader();
      reader.onload = () => {
        const buffer = new Uint8Array(reader.result);
        socket.emit('audio', { buffer });
      };
      reader.readAsArrayBuffer(event.data);
    };
    mediaRecorderRef.current.start(100);
  };

  return (
    <div>
      <h1>{isAdmin ? 'Admin' : 'User'}</h1>
      {isAdmin ? (
        <p>Listening for audio...</p>
      ) : (
        <button onClick={handleUserAudio}>Start Audio Stream</button>
      )}
      <button onClick={() => setIsAdmin(!isAdmin)}>
        Switch to {isAdmin ? 'User' : 'Admin'}
      </button>
      <audio ref={audioRef} autoPlay />
    </div>
  );
};

export default App;
