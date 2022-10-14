const express = require('express');
const app = express();

const http =require('http');
const {Server} = require('socket.io');
const cors = require('cors');
// const { Console } = require('console');

app.use(express.json())

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      let msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}))

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

