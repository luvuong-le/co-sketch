class WebSocketClient {
    static instance;

    constructor(path) {
        if (WebSocketClient.instance) {
            return WebSocketClient.instance;
        }
        
        this.wsPath = path;
        this.connect(path);

        WebSocketClient.instance = this;
    }

    connect = (path) => {
        this.ws = new WebSocket(path || this.wsPath);
        this.setDefaultSocketEvents();
    }

    dispatch = (event) => {
        this.ws.dispatchEvent(event);
    }

    listen = (event, callback) => {
        this.ws.addEventListener(event, callback);
    }

    send = (data) => {
        this.waitForSocketConnection(this.ws, () => {
            this.ws.send(data);
        });
    }

    waitForSocketConnection = (socket, callback) => {
        setTimeout(function () {
            if (socket.readyState === 1) {
                console.log("WebSocket is all connected!");
                if (callback) {
                    callback();
                }
            } else {
                console.log("Waiting on connection...");
                this.waitForSocketConnection(socket, callback);
            }
        }, 5)
    }

    setDefaultSocketEvents = () => {
        this.ws.onopen = () => {
            console.log("Connected to websocket");
        }

        this.ws.onclose = () => {
            console.log("Socket is closed...trying to reconnect...");
            if (this.ws.readyState === WebSocket.CLOSED) {
                this.connect();
            }
        }

        this.ws.onerror = err => {
            console.error("Socket encountered an error", err, "now closing socket");
        }

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            this.dispatch(new CustomEvent(data.type, {
                detail: data
            }));
        }
    }
}

export default WebSocketClient;
