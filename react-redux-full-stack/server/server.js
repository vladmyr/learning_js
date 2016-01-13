import Server from "socket.io";

/**
 *
 * @param {Redux.Store} store
 */
export default function startServer(store){
    const io = new Server().attach(8090);

    store.subscribe(function(){
        return io.emit("state", store.getState().toJS());
    });

    io.on("connection", function(socket){
        socket.emit("state", state.getState().toJS());
        socket.on("action", store.dispatch.bind(store));
    });
}