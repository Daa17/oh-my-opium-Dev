import { OracleTypeEnum } from "../Utils/types";

// ETH positions
import { positions as opiumOptionCall } from "./positions/eth/opiumOptionCall";
import { positions as usdtProtection } from "./positions/eth/usdtProtection";

// BSC positions
import { positions as turboETH } from "./positions/bsc/turboETH";

// Polygon positions
import { positions as ETHDumpProtection } from "./positions/polygon/ETHDumpProtection";
// import { positions as realt10700Whittier } from "./positions/polygon/realt10700Whittier";
import { positions as realt402Kostner } from "./positions/polygon/realt402Kostner";
import { positions as turboAAVE } from "./positions/polygon/turboAAVE";
import { positions as turboBTC } from "./positions/polygon/turboBTC";
import { positions as turboDailyETH } from "./positions/polygon/turboDailyETH";
import { positions as turboWeeklyETH } from "./positions/polygon/turboWeeklyETH";
import { positions as turboMATIC } from "./positions/polygon/turboMATIC";

import EthDumpProtection from "../../images/ethDumpProtection.svg";
import usdtInsuranceFarming from "../../images/usdtInsuranceFarming.svg";
import spaceXInsurance from "../../images/spaceXInsurance.svg";
import opiumOption from "../../images/opiumOption.svg";
import turboAave from "../../images/turboAave.svg";
import turboBtc from "../../images/turboBtc.svg";
import turboEth from "../../images/turboEth.svg";
import turboMatic from "../../images/turboMatic.svg";

export const ethPools = [
  {
    title: "USDT Protection",
    poolAddress: "0x5afFE41805a9E57fEd3657d0e64D96aeA0B77885",
    nominal: 1,
    isSuspended: false,
    marginTitle: "USDC",
    positions: usdtProtection,
    icon: usdtInsuranceFarming,
    yieldToDataAnnualized: 1321654.215,
    poolSize: 2554.649,
    currentEpochTimeStamp: 2145646546546,
    readMoreLink:
      "https://medium.com/opium-network/decentralized-insurance-upgrade-continuous-staking-and-unstaking-c329ce27ad4b",
    oracle: {
      address: "0x89c9c6731817ce9d3f52dc96e1481086bc1b328c",
      type: OracleTypeEnum.WITH_TIMESTAMP,
    },
  },
  {
    title: "SpaceX Rideshare Insurance",
    poolAddress: "0xbD0375A06Afd5C3A0A0AD26F30c4B37629F00D8e",
    nominal: 1,
    icon: spaceXInsurance,
    isSuspended: true,
    marginTitle: "USDC",
    yieldToDataAnnualized: 2321654.215,
    poolSize: 5554.649,
    currentEpochTimeStamp: 6145646546546,
    readMoreLink:
      "https://opium.finance/blog/spacex-protection/LaunchSpaceXProtection/",
  },
  {
    title: "$OPIUM Option Call",
    poolAddress: "0xc1650f389de9056636d968832eb63382e3970fa1",
    nominal: 1,
    isSuspended: false,
    marginTitle: "OPIUM",
    positions: opiumOptionCall,
    icon: opiumOption,
    yieldToDataAnnualized: 21321654.215,
    poolSize: 62554454.649,
    currentEpochTimeStamp: 86548646546546,
    readMoreLink:
      "https://medium.com/opium-network/call-options-on-opium-an-alternative-to-liquidity-mining-32febcbda4a2",
    oracle: {
      address: "0x64dcb00e36a6238dad28e59c71c5214500539ef7",
      type: OracleTypeEnum.OPTIMISTIC,
    },
  },
  {
    title: "ETH Dump Protection",
    poolAddress: "0x527bc50b075a65b7e17ae8606a1adeb08bceb971",
    nominal: 1,
    positions: usdtProtection,
    icon: EthDumpProtection,
    isSuspended: true,
    marginTitle: "USDC",
    yieldToDataAnnualized: 651321654.215,
    poolSize: 32554.649,
    currentEpochTimeStamp: 82145646546546,
    readMoreLink:
      "https://opium.finance/blog/eth-dump-protection/ETHDumpProtection/",
  },
  // {
  //   title: "(OLD) USDT Protection 13 MAR",
  //   poolAddress: "0x39787f0aedb73eeee6ceb0b22ef9293a3f3df5af",
  //   nominal: 1,
  //   isSuspended: true,
  //   marginTitle: "USDC",
  // },
  // {
  //   title: "(OLD) USDT Protection 19 MAR",
  //   poolAddress: "0xf5cb774e890edf3979bf9ae7a1c098ee89429ce5",
  //   nominal: 1,
  //   isSuspended: true,
  //   marginTitle: "USDC",
  // },
  // {
  //   title: "(OLD) USDT Protection 26 MAR",
  //   poolAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  //   nominal: 1,
  //   isSuspended: true,
  //   marginTitle: "USDC",
  // },
  // {
  //   title: "(OLD) SpaceX Rideshare Insurance",
  //   poolAddress: "0xbD0375A06Afd5C3A0A0AD26F30c4B37629F00D8e",
  //   nominal: 1,
  //   isSuspended: true,
  //   marginTitle: "USDC",
  // },
  // {
  //   title: "(OLD) Matic Bridge Protection",
  //   poolAddress: "0xb54539D39529cE58fB63877DEbC6d6b70E3ecA01",
  //   nominal: 1,
  //   isSuspended: true,
  //   marginTitle: "USDT",
  // },
  // {
  //   title: "(OLD) xDAI OmniBridge Protection",
  //   poolAddress: "0x0cAb5A7dCAb521aF5404Fa604b85113267d38444",
  //   nominal: 1,
  //   isSuspended: true,
  //   marginTitle: "USDC",
  // },
];

export const bscPools = [
  {
    title: "Turbo ETH",
    poolAddress: "0xbb0E1AC2Fa9A4785D0894990B5c18A6Ea3dAD846",
    nominal: 0.001,
    isSuspended: false,
    marginTitle: "ETH",
    positions: turboETH,
    icon: turboEth,
    yieldToDataAnnualized: 1321654.215,
    poolSize: 2554.649,
    currentEpochTimeStamp: 2145646546546,
    readMoreLink:
      "https://medium.com/opium-network/introducing-opium-turbos-581a647654d7",
    oracle: {
      address: "0xf5D690c9D61092112660FEAf62e542a670Fa886D",
      type: OracleTypeEnum.WITH_TIMESTAMP,
    },
  },
  {
    title: "Weekly Turbo ETH",
    poolAddress: "0x75252ad806E8d6191272d9099684607CAB13b25F",
    nominal: 0.01,
    isSuspended: false,
    marginTitle: "WETH",
    positions: turboWeeklyETH,
    icon: turboEth,
    yieldToDataAnnualized: 8321654.215,
    poolSize: 3554.649,
    currentEpochTimeStamp: 4145646546546,
    readMoreLink:
      "https://medium.com/opium-network/introducing-opium-turbos-581a647654d",
    oracle: {
      address: "0x0D876632F321fdcAbC540eEA5867c4799A627ed8",
      type: OracleTypeEnum.WITH_TIMESTAMP,
    },
  },
];

export const polygonPools = [
  // {
  //   title: "RealT 2661-2663 Cortland Rent insurance",
  //   poolAddress: "0x20120864944fC47fed4821C1c4B1b6a7D400844b",
  //   nominal: 1,
  //   marginTitle: "USDC",
  //   isSuspended: false,
  //   oracle: {
  //     address: "0x739de5bea03346dee2c402f0499409f43b78cd3c",
  //     type: OracleTypeEnum.OPTIMISTIC,
  //   },
  // },
  // {
  //   title: "RealT 20160 Conant Rent insurance",
  //   poolAddress: "0xCd9955ba381e408575Acca4F712573c5f6e4b174",
  //   nominal: 1,
  //   marginTitle: "USDC",
  //   isSuspended: false,
  //   oracle: {
  //     address: "0x614fc2a2d689b38f8f711f300ce1f924fa230513",
  //     type: OracleTypeEnum.OPTIMISTIC,
  //   },
  // },
  // {
  //   title: "RealT 5517-5519 Elmhurst Rent insurance",
  //   poolAddress: "0xcd465bedccBF1Bd89998757563f4A3b3D6bb01B6",
  //   nominal: 1,
  //   marginTitle: "USDC",
  //   isSuspended: false,
  //   oracle: {
  //     address: "0x0e6ab9aeaa60778ab6758dd094ef2e12cb301f14",
  //     type: OracleTypeEnum.OPTIMISTIC,
  //   },
  // },
  // {
  //   title: "RealT 10700 Whittier Rent insurance",
  //   poolAddress: "0xA4fe26FcA5F20F6c4e691EF60AD55712b6B26348",
  //   nominal: 1,
  //   isSuspended: false,
  //   marginTitle: "USDC",
  //   positions: realt10700Whittier,
  //   oracle: {
  //     address: "0x8E6CAF617718c5Ee21c2d583FAbEbecFb52cbd9c",
  //     type: OracleTypeEnum.OPTIMISTIC,
  //   },
  // },
  {
    title: "RealT 402 S Kostner Rent insurance",
    poolAddress: "0xaf2d53cd17eE9B6475f2da63423c178Af43b65C0",
    nominal: 1,
    isSuspended: false,
    marginTitle: "USDC",
    positions: realt402Kostner,
    icon: EthDumpProtection,
    yieldToDataAnnualized: 2,
    poolSize: 782,
    currentEpochTimeStamp: 6546,
    readMoreLink:
      "https://opium.finance/blog/eth-dump-protection/ETHDumpProtection/",
    oracle: {
      address: "0x335d0bc9311d6c4b5dce51dbff1eb2bbf04ce8da",
      type: OracleTypeEnum.OPTIMISTIC,
    },
  },
  {
    title: "ETH Dump Protection",
    poolAddress: "0x74eF359BD736236bDd6b82D594134f36612C41c0",
    nominal: 1,
    isSuspended: false,
    marginTitle: "USDC",
    positions: ETHDumpProtection,
    icon: EthDumpProtection,
    yieldToDataAnnualized: 1355421654.215,
    poolSize: 782554.649,
    currentEpochTimeStamp: 61565559595,
    readMoreLink:
      "https://opium.finance/blog/eth-dump-protection/ETHDumpProtection/",
    oracle: {
      address: "0x0D876632F321fdcAbC540eEA5867c4799A627ed8",
      type: OracleTypeEnum.WITH_TIMESTAMP,
    },
  },

  {
    title: "Turbo BTC",
    poolAddress: "0x5C1E6bc8E52cE1a262014c743508f74923a5B0d2",
    nominal: 0.001,
    isSuspended: false,
    marginTitle: "WBTC",
    icon: turboBtc,
    positions: turboBTC,
    yieldToDataAnnualized: 4321654.215,
    poolSize: 9554.649,
    currentEpochTimeStamp: 8145646546546,
    readMoreLink:
      "https://medium.com/opium-network/opium-turbo-aave-b69a23ab1048",
    oracle: {
      address: "0xf5cb774e890edf3979bf9ae7a1c098ee89429ce5",
      type: OracleTypeEnum.WITH_TIMESTAMP,
    },
  },
  {
    title: "Turbo MATIC",
    poolAddress: "0xC1e31C2db9f238809FE58089a7Fa7cE5aA7E52c6",
    nominal: 10,
    isSuspended: false,
    marginTitle: "WMATIC",
    positions: turboMATIC,
    icon: turboMatic,
    yieldToDataAnnualized: 8321654.215,
    poolSize: 72554.649,
    currentEpochTimeStamp: 5145646546546,
    readMoreLink:
      "https://medium.com/opium-network/opium-turbo-aave-b69a23ab1048",
    oracle: {
      address: "0x2e9ac4d0882165dce317f23925060ca3551782a9",
      type: OracleTypeEnum.WITH_TIMESTAMP,
    },
  },
  {
    title: "Turbo AAVE",
    poolAddress: "0x450B8Aef66F59C446505E7Fe267A961F26270824",
    nominal: 0.001,
    isSuspended: false,
    marginTitle: "amAAVE",
    positions: turboAAVE,
    icon: turboAave,
    yieldToDataAnnualized: 3321654.215,
    poolSize: 4554.649,
    currentEpochTimeStamp: 6145646546546,
    readMoreLink:
      "https://medium.com/opium-network/opium-turbo-aave-b69a23ab1048",
    oracle: {
      address: "0xbE457663218C3527A82d4021b1DCE5802997063b",
      type: OracleTypeEnum.WITH_TIMESTAMP,
    },
  },
  {
    title: "Daily Turbo ETH",
    poolAddress: "0x4BFE09731Cb258CB5DFECF8219b3d1D27aa942a9",
    nominal: 0.001,
    isSuspended: false,
    marginTitle: "WETH",
    positions: turboDailyETH,
    icon: turboEth,
    yieldToDataAnnualized: 3321654.215,
    poolSize: 4554.649,
    currentEpochTimeStamp: 6145646546546,
    readMoreLink:
      "https://medium.com/opium-network/opium-turbo-aave-b69a23ab1048",
    oracle: {
      address: "0x0D876632F321fdcAbC540eEA5867c4799A627ed8",
      type: OracleTypeEnum.WITH_TIMESTAMP,
    },
  },
];
