

class SocketEventHendler {
  constructor(private socket: any) {}

  location = {
    update: async (location: any) => {
      const newLoc = {};

      [
        `order.update.location.${newLoc}`,
        "admin.order.update.location",
        "admin.driver.update.location",
      ].forEach((event: string) => this.socket.emit(event, newLoc));
    },
  };
}
export { SocketEventHendler };