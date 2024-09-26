import type { CmcCoin } from "./cmc.interface.ts";

export interface Coin {
    name: string;
    short: string;
    cryptoId: string;
    order: number;
}

export interface ExtendedCoin {
    name: string;
    short: string;
    crypto: CmcCoin | null;
    order: number;
}