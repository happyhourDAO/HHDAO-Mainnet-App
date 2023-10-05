# Introducing happyhourDAO

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Twitter Follow](https://img.shields.io/twitter/follow/happyhourDAO?style=social)](https://twitter.com/happyhourDAO)

A community owned _Drink-To-Earn_\*\* decentralized network for web3

> Because every web2 bar needs itself a web3 bar

The happyhourDAO aims to provide an open, web3 community connecting the post-pandemic recovering F&B industry with plebs in the metaverse through its native ERC20 token, $HOUR. Not only do drinkers and F&B merchants have the opportunity to earn from their engagement in the traditional social gathering we sometimes coin as "happy hour", but also to provision a grassroots fundraising network in envisioning what the new F&B industry should look like. It shouldn’t be that people have earned the right to attend happy hour from their relentless hard work they put in at the office, but rather their happy hour attendance should also be rewarded.

### Purpose

The global F&B industry has traditionally been a fragmented market for obvious purposes. Brick and mortar bars, clubs, and restaurants only serve their local markets. But what if these same businesses can conduct transactions with other customers not served in their local markets? Could there be an incentive system devised so that the same local F&B merchants can sell their specialty tastes as a white label to other F&B merchants located across the globe from them? Could there be a payment network allowing drifters and travelers to still be able to buy a drink at spot in a foreign country without having to exchange for the local fiat currency? Could there be a method to get on a premier whitelist for a new club opening party just by depositing a certain amount of tokens to an address instantly? Could there be a way for you and your friends to reserve your favorite table at the city's hottest rooftop lounge without the uncertainty of a no show for the lounge?

The architecture of the $HOUR token was designed and engineered to fill those needs posed above in a seamless, efficient, web3 manner. Whether it be used for loyalty tokens, membership tokens, reservations, payments, bottle deposits, or etc., $HOUR is represented to allow all F&B merchants to speak the same language, regardless of geographic region/culture.

### The ecosystem

The happyhourDAO will be powered by the [Happy Hour Protocol Engine](https://github.com/happyhourDAO/Happy-Hour-Protocol-Engine), which is the heart and soul of the whole ecosystem. This is what will glue together the drinkers, Participating Drinking Establishments (PDEs), devs, investors, and other stakeholders. All the interaction will be done through the [Happy Hour Protocol Engine](https://github.com/happyhourDAO/Happy-Hour-Protocol-Engine) which has been deployed as a smart contract on the Ethereum network.

##### Breakdown of participants in the happyhourDAO ecosystem:

- Drinkers (holders of $HOUR): These are the users and community members interacting with the [Happy Hour Protocol Engine](https://github.com/happyhourDAO/Happy-Hour-Protocol-Engine). These are the happy hour goers, nightlife fist-pumpers, bartenders, and all other alcoholics who make it a priority to support the F&B industry.

- Participating Drinking Establishments (PDE): These are the F&B merchants and businesses hosting drinkers. The local bar, the city’s premier club, the skyline lounge, the speakeasy, the hotel restaurant, and etc. All these F&B merchants would be considered a PDE in the happyhourDAO ecosystem.

- Drunkards (holders of $DRNK): These are the all-star drinkers who have been able to accumulate enough $HOUR tokens to burn and mint $DRNK tokens, which fully enable them to be official members of the happyhourDAO.

## Starting a LITT session

#### Latent Initialization of Token Truss (LITT)

When using the happyhourDAO Dashboard, the Start LITT functionality will prompt a Drinker to input the said PDE’s PDE ID and secret access code in order to call the HOURv3’s solidity contract’s .startHOUR() method. The inputted PDE ID and access code must be valid and compatible in order to successfully call the method. On top of that, a Drinker must stake at least 0.01 ETH during their LITT session. Consider this amount as a deposit or their “proof of stake” amount to be used as collateral.

Drinkers need to start a LITT session by calling the .startHOUR() method in the Dashboard. This method will run through the required checks to make sure the Drinker is not currently in an existing LITT session, their inputted PDE ID & access code are valid, and that they have at least 0.01 ETH staked.

The happyhourDAO app leverages the open-source SDK tooling of [WalletConnect's web3modal](https://docs.walletconnect.com/web3modal/react/about) & [wagmi/viem](https://wagmi.sh/) under the hood.

The below is the front-end snippet of the interface interaction between the user and the smart contract to start a LITT session.

```javascript
const { config, error } = usePrepareContractWrite({
  address: appState.HOURnetwork.contractAddress,
  abi: HOURabi,
  functionName: "startHOUR",
  args: [PDEid_debounced, accessCode_debounced],
  value: parseEther("0.01"),
  enabled: Boolean(PDEid_debounced && accessCode_debounced),
  onSettled(data, error) {
    null
  }
})

const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config)
```

The solidity source code for the Start LITT functionality can be found [here](https://github.com/happyhourDAO/Happy-Hour-Protocol-Engine/blob/8a96f5d4b9df604c18af6c6f935a1ef9b49bfb98/contracts/HOURv3.sol#L135)

## Ending a LITT session

A LITT session is only valid for 8 hours in order to earn the standard $HOUR per hour rate of 100 $HOUR. If a Drinker ends their LITT session before 8 hours, they will receive the normal rate. If a Drinker leaves their session open for more than 8 hours, they will be “penalized” by only earning a flat amount of 100 $HOUR. Again, the network needs a penalty system in place to prevent Drinkers from gaming the system and earning unfair amount of $HOUR. A Drinker can only ever open one LITT session at a time. If for example, a Drinker wants to leave PDE A and bar hop to PDE B, the Drinker will need to end their LITT session at PDE A first in order to start a new LITT session at PDE B. This is logical and also fair play for the PDE. A Drinker shouldn’t be earning commission for PDE A if they are having a ball at PDE B.

A session can be ended at any time by navigating to the Dashboard, having your public address verified, and the Dashboard will call the .endHOUR() method from the smart contract.

The below is the front-end snippet of the interface interaction between the user and the smart contract to end a LITT session.

```javascript
const { config, error } = usePrepareContractWrite({
  address: appState.HOURnetwork.contractAddress,
  abi: HOURabi,
  functionName: "endHOUR",
  args: [appState.account.address],
  enabled: Boolean(appState.account.currentDrinkingID.length > 1)
})

const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config)
```

The solidity source code for the End LITT functionality can be found [here](https://github.com/happyhourDAO/Happy-Hour-Protocol-Engine/blob/8a96f5d4b9df604c18af6c6f935a1ef9b49bfb98/contracts/HOURv3.sol#L161)

## Minting $DRNK

The $DRNK governance token is the official membership token of the happyhourDAO. Any amount of $DRNK governance token will be accepted and considered sufficient to be part of the happyhourDAO. The larger amount of $DRNK governance tokens owned allows for a larger percentage of influence you can have on any happyhourDAO participation. $HOUR/$DRNK exchange ratio will be hardcoded at the initial rate of 10/1. All $DRNK governance tokens will be fairly minted, meaning there will be no pre-mined $DRNK to certain individuals.

The below is the front-end snippet of the interface interaction between the user and the smart contract to end a mint $DRNK.

```javascript
const { config, error } = usePrepareContractWrite({
  address: appState.HOURnetwork.contractAddress,
  abi: HOURabi,
  functionName: "mintyDRNK",
  args: [appState.DRNKnetwork.contractAddress, appState.account.address, burnAmount_debounced],
  enabled: burnAmount_debounced
})

const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config)
```

#### Membership into the happyhourDAO grants you access to:

- Voting mechanisms
- Happy Hour Improvement Proposals (HHIP) submissions and approvals
- Special airdrops
- Real world exclusive VIP hosted events
- happyhourDAO VC arm investments
- happyhourNFTs exclusive whitelist
- Exclusive access to Web3 version of PDEs
- Merchandise

The solidity source code for the minting $DRNK functionality can be found [here](https://github.com/happyhourDAO/Happy-Hour-Protocol-Engine/blob/8a96f5d4b9df604c18af6c6f935a1ef9b49bfb98/contracts/HOURv3.sol#L80)

## Onboarding PDE

Participating Drinking Establishments (PDE): These are the F&B merchants and businesses hosting drinkers. The local bar, the city’s premier club, the skyline lounge, the speakeasy, the hotel restaurant, and etc. All these F&B merchants would be considered a PDE in the happyhourDAO ecosystem.

F&B merchants are at the brink of something new with web3. The happyhourDAO is in position to ready traditional F&B brick and mortar merchants in participating in the internet’s next frontier. The Happy Hour Protocol Engine is geared up with provisions with an open and permissionless onboarding for F&B merchants to be valid PDEs. Each PDEs in the network are eligible for a % of HOUR earned by every drinker. This % rate will start at 10% with the ability for future alterations based on the community’s decisions.

As a PDE grows in popularity in the network, the happyhourDAO is positioned to further fund that PDE in applicable business aspects the community seems viable. This funding also includes support for web3 onboarding into metaverse realms such as in Decentraland, The Sandbox, Otherside, and others.

The below is the front-end snippet of the interface interaction between the user and the smart contract to onboard as a PDE.

```javascript
const { config, error } = usePrepareContractWrite({
  address: "0x3807DAB03E8519F0F4f4c37568E27a71B138d47b",
  abi: HOURabi,
  functionName: "onboardPDE",
  args: [name_debounced, location_debounced, appState.account.address, accessCode_debounced],
  enabled: Boolean(name_debounced && location_debounced && accessCode_debounced)
})

const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config)
```

The solidity source code for onboarding a PDE functionality can be found [here](https://github.com/happyhourDAO/Happy-Hour-Protocol-Engine/blob/8a96f5d4b9df604c18af6c6f935a1ef9b49bfb98/contracts/HOURv3.sol#L53)

### Technology Tooling Support

- [WalletConnect's web3modal](https://docs.walletconnect.com/web3modal/react/about)
- [wagmi/viem](https://wagmi.sh/)

### Follow us

- [Twitter](https://twitter.com/happyhourDAO)
- [Gitbook](https://happy-hour-1.gitbook.io/happyhourdao/)
- [Github](https://github.com/happyhourDAO)
- [Mirror](https://mirror.xyz/happyhourlabs.eth)
- [Discord](https://discord.gg/tyQg3rQHB)
- [App](https://happyhourdao.xyz/)
