module.exports = io => {

    const history = [];

    io.on('connection', socket => {

        for(let i in history)
            socket.emit('drawing', history[i]);

        socket.on('drawing', data => {
            history.push(data);
            io.emit('drawing', data);
        })
    });

};