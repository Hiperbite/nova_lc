import { SocketId } from './../../node_modules/socket.io-adapter/dist/index.d';
import { Server } from "socket.io";

class socketService {
    io: any;
    clients: any[] = [];
    constructor() { }
    socket: any;
    emit = (data: any) => ({
        to: (userId: string) => {
            const client = this.clients.filter(({ id }: any) => id === userId);
            if (client[0] && client[0]?.id)
                this.io.to(client[0]?.socketId).emit('notification', data)
        }
    })
    init = (http: any) => {
        this.io = new Server(http, {
            cors: {
                origin: '*',
            }
        });

        //this.io.use(Middleware.authorization);

        this.io.on("connection", (socket: any) => {
            console.log("server says: a client is connected", socket.id);
            socket.emit('foo', 'Haaaaaa')
            socket.on("disconnect", (s: any) => {
                this.clients = this.clients.filter((client: any) => client?.socketId !== socket.id);

                console.log("server says: a user connected", socket.id);
            });
            socket.on('setUserInfo', (client: any) => {
                this.clients.push(client);
                return true;
            });
            socket.on("create-something", (data: any) => {
                socket.emit('foo', [{ action: 'something created', data, id: socket.id }])
                console.log("server says: a user connected", socket.id);
            });
        });

        this.io.on('setUserInfo', (client: any) => {
            this.clients.push(client);
            return true;
        });
        this.io.on("disconnect", (socket: any) => {
            console.log("server says: a user disconnected", socket.id);
            this.socket = socket;
        });
    };

    static on = () => new socketService();

    location = {
        update: async (location: any) => {
            //const newLoc = await orderLocationRepo.create(location);

        },
    };
}


export { socketService }
export default new socketService()