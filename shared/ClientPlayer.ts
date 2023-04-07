import { SimpleBody } from "./SimpleBody";


export interface ClientPlayer {
    id: string;
    name: string;
    grounded: boolean;
    jumpDebounce: boolean;
    body: SimpleBody;
    latestCommandId: number;
}
