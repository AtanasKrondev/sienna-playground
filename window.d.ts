import { OfflineSigner } from "@cosmjs/launchpad";

import { Window as KeplrWindow, Keplr } from '@keplr-wallet/types';
declare global {
  interface Window extends KeplrWindow {
    keplr?: Keplr;
    getOfflineSignerOnlyAmino?: (chainId: string) => OfflineSigner;
  }
}
