import io from 'socket.io-client'
let tryToConnect = 0
const rfid_socket = io(process.env.WS_URL)
const api_socket = io('', { path: '/api/socket.io' })
rfid_socket.on('connect_error', function() {
  if (tryToConnect > 5) {
    return rfid_socket.disconnect()
  }
  tryToConnect++
})
export { rfid_socket, api_socket }
