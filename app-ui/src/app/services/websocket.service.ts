import { Injectable } from '@angular/core';
import { Constants } from "./constants";

import { SocketIoConfig, Socket } from 'ngx-socket-io';

const config: SocketIoConfig = {
    url: Constants.WS_ENDPOINT
};

@Injectable({
    providedIn: 'root',
})
export class WebsocketService extends Socket {
    constructor() {
        super(config);
    }
}
