const http = require('http')
const express = require('express')
const path = require('path')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app) //io requires raw http
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, './public')
app.use(express.static(publicDirectoryPath))

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
//   });


io.on('connection', socket => {
    socket.broadcast.emit("showMessage", { name: 'Anonymous', message: 'A NEW USER HAS JOINED' })// sending to all clients except sender

    socket.on('sendMessage', message => io.emit('showMessage', message))// event listener, can be called on client to execute on server, io.emit--->//sending to all clients, include sender
})

const port = process.env.PORT || 3000
server.listen(port, () => console.log('Server connected'))