const express = require('express');
const app = express();

const http =require('http');
const {Server} = require('socket.io');
const cors = require('cors');
// const { Console } = require('console');

app.use(express.json())

app.use(cors())

const server = http.createServer(app);

const io = new Server(server , {
    cors:{
        origin:"https://6349534f8a7a593c8833ffe7--mellow-pithivier-f365d7.netlify.app/", 
        methods :["get","post"]
    }
})
io.on("connection",(socket)=>{
    console.log(`user connected : ${socket.id}`)
    

   socket.on("join_room" ,(data)=>{
    socket.join(data);
    console.log(`userwith id ${socket.id} join room ${data}`)
   })

   socket.on("send_msg" , (data)=>{
    console.log(data);
    socket.to(data.roomId).emit("receive_msg" , data)
   } )

    socket.on("disconnect" , ()=>{
        console.log("user disconnected"  ,socket.id);
    })
    // socket.on("send_msg" , (data)=>{
   // console.log(data)
    //     socket.broadcast.emit("receive_msg" , data)
    // })
})

server.listen(()=>{
    console.log("server is running")
})

