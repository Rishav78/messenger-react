const socketIO = require('socket.io');
const controllers = require('./controllers');
const auth = require('./auth/validToken');

module.exports = server => {
    const io = socketIO(server);

    connected = {};
    connected2 = {}

    io.on('connection', function(socket){
        
        socket.on('new-connection', (data) => {
            const { Token } = data;
            const { authenticated, user} = auth.validToken(Token);
            if(!authenticated) return cb({ authenticated });
            const { _id } = user.user;

            connected[_id] = socket.id;
            connected2[socket.id] = _id;

            socket.broadcast.emit('user-status', { _id, status: 1 });
            console.log('a user connected');
        })

        socket.on('add-new-friend', controllers.friends.addnewfriend);

        socket.on('create-private-chat-room', controllers.chats.createPrivateChatroom);

        socket.on('loged-user-information', controllers.user.getUserInformation);

        socket.on('typing', (data) => {
            const { sender, _id, receiver, status } = data;
            receiver.forEach( e => {
                const socketid = connected[e._id];
                io.to(socketid).emit('user-typing', { _id, sender, status });
            });
        });

        socket.on('send-message', async (data, cb) => {
            const message = await controllers.messages.saveMessage(data, cb);
            data.receiver.forEach( e => {
                const socketid = connected[e._id];
                if(socketid) io.to(socketid).emit('new-message', {...message})
            });
        });

        socket.on('disconnect', () => {
            const _id = connected2[socket.id];
            delete connected2[socket.id];
            delete connected[_id];
            console.log(connected)
            socket.broadcast.emit('user-status', { _id, status: 0 });
            console.log('user disconnected')
        });
    });
}
