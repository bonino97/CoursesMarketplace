import { useEffect } from "react";
import useSWR from "swr";

const NETWORKS = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  97: "Binance Smart Chain Test Network",
  137: "Polygon Main Network",
  1337: "Ganache",
  80001: "Polygon Mumbai Test Network",
};

export const handler = (web3, provider) => () => {
  const { mutate, ...rest } = useSWR(
    () => (web3 ? "web3/network" : null),
    async () => {
      const chainId = await web3.eth.getChainId();
      return NETWORKS[chainId];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("chainChanged", (chainId) => {
        mutate(NETWORKS[parseInt(chainId, 16)]);
      });
  }, [web3]);

  return {
    network: {
      mutate,
      ...rest,
    },
  };
};
