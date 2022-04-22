export const shortenAddress = (address: string) => {
  const firstSymbols = address.slice(0, 6);
  const lastSymbols = address.slice(address.length - 4, address.length);
  const result = `${firstSymbols}...${lastSymbols}`;
  return result;
};

export const shortenTabletAddress = (address: string) => {
  const firstSymbols = address.slice(0, 12);
  const lastSymbols = address.slice(address.length - 15, address.length);
  const result = `${firstSymbols}...${lastSymbols}`;
  return result;
};
