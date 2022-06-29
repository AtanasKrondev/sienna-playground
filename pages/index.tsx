import { Keplr } from '@keplr-wallet/types';
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { AMMRouter } from 'siennajs';
import {
  ChainMode,
  ChainOpts,
  Scrt,
  ScrtRPCAgentOpts,
} from '../packages/client-scrt-grpc/scrt-grpc';
import styles from '../styles/Home.module.css';

const chainId = 'pulsar-2';
const chainOptions: ChainOpts = {
  url: 'https://rpc.pulsar.griptapejs.com/',
  mode: ChainMode.Devnet,
};
const routerContractAddress = 'secret1yws9p2fcczqlepvd0j242yvrp7e5r2j9v3mkgm';

const Home: NextPage = () => {
  const [keplr, setKeplr] = useState<Keplr | undefined>(undefined);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (typeof window.keplr !== 'undefined') {
      setKeplr(window.keplr);
    }
  }, []);

  const connectKeplr = async () => {
    if (keplr && typeof window.getOfflineSignerOnlyAmino !== 'undefined') {
      await keplr.enable(chainId);
      const wallet = window.getOfflineSignerOnlyAmino(chainId);
      const accounts = await wallet.getAccounts();
      const newAddress = accounts[0].address;
      setAddress(newAddress);
      const chain = new Scrt(chainId, chainOptions);
      const agentOptions: ScrtRPCAgentOpts = { address, wallet };
      const agent = await chain.getAgent(agentOptions);
      const routerContract = agent.getClient(
        AMMRouter,
        routerContractAddress
      ) as AMMRouter;
      console.log(routerContract);
    }
  };

  return (
    <div className={styles.container}>
      {address ? (
        <p>{address}</p>
      ) : (
        <button onClick={connectKeplr}>Connect</button>
      )}
    </div>
  );
};

export default Home;
