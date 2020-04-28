export default function openWebSocket(): WebSocket {
  const ws = new WebSocket(process.env.REACT_APP_WS_URL || '');
  //
  // ws.addEventListener('open', function open() {
  //   ws.send('something');
  // });

  ws.addEventListener('message', function incoming(message) {
    console.log(message.data);
  });

  return ws;
}
