import Server from "socket.io";

/**
 * Server initialization
 * @param {Redux.Store} store
 */
export default function startServer(store){
    const PORT = 8090;
    const io = new Server().attach(PORT);

    console.log(`Websocket server is running on port ${PORT}`);

    store.subscribe(() => {
        return io.emit("state", store.getState().toJS());
    });

    io.on("connection", (socket) => {
        console.log(`New connection! Id assigned \"${socket.id}\"`);

        socket.emit("state", store.getState().toJS());
        socket.on("action", function(data){
            console.log("Data received", data);
            store.dispatch.bind(store)
        });
    });
}