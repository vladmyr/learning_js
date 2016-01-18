/**
 * Middleware skeleton is a function that takes a Redux store and
 * returns another function that takes a "next". That function
 * returns a third function htat takes Redux action
 *
export default store => next => action => {
    //...
}
 */

/**
 * Remote action middleware
 * @param socket
 */
export default function(socket){
    return function(store) {
        return function(next){
            // nesting = currying
            return function(action) {
                if(action.meta && action.meta.remote){
                    console.log("emit", action);
                    socket.emit("action", action);
                }

                console.log("middleware logger", action);
                return next(action);
            }
        }
    }
}