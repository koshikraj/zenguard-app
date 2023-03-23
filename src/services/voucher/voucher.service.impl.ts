import { LoadBalanceResponse } from "./voucher.service";

export const loadBalance = async (accountAddress: string) => {
  const PolygonApi = process.env.REACT_APP_POLYGONSCAN_API_KEY;

  const response = await fetch(
    `https://api-testnet.polygonscan.com/api?module=account&action=balance&address=${accountAddress}&apikey=${PolygonApi}`
  );

  let final = await response.json();

  return final;
};
