import * as IPFS from 'ipfs';
import * as Room from 'ipfs-pubsub-room'

const repo = () => 'ipfs/tictactoe/' + Math.random();

export const ipfs = new IPFS({
    repo: repo(),
    EXPERIMENTAL: {
        pubsub: true
    },
    config: {
        Addresses: {
            Swarm: [
                '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
            ]
        }
    }
});

export const getRoom = name => Room(ipfs, 'ipfs-pubsub-demo' + name);