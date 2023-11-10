# zkapp-verify-service

ZkAppVerify is a source code verification service designed for Mina protocol's ZkApps.

Want to see it in-action? Head to our integrators section

- [zkapp-verify-service](#zkapp-verify-service)
	- [Getting Started](#getting-started)
	- [Overview](#overview)
	- [Diagram](#diagram)
	- [Contributing](#contributing)
		- [ZkApp Developers](#zkapp-developers)
		- [Explorer developers](#explorer-developers)
		- [Service contributors](#service-contributors)
	- [Security](#security)
	- [Why Mina?](#why-mina)

## Getting Started

There is a UI which guides you through the process at <https://zkapp-standalone-verifier.vercel.app>

Verifying a ZkApp requires a few pre-requistites. In our proof of concept, we outline a format that standardizes how ZkApp could be shared in an agnostic way.

This follows the convention of most JS libraries.

An example of a contract that can be verified is shown as follows:

```
import { SmartContract } from "o1js";

Class MyContract extends SmartContract {
 constructor() {

 }
}

// ! the key is to export your contract as default
export default MyContract
```

The above contract has been deployed for this illustration, and the resulting verification key is

```
key
```

Then, either through the above UI or over the API you can verify the key and code used to generate it. An example of this appears below

```sh
curl https://zkapp-verify.vercel.app --file=./myContractSource.js --data '{
 "verificationKey":"examplekeythatisnotrealforillustration",
 "o1jsVersion": "0.14.0",
}'
```

Based on a `200` or `500` response code, you can then check for information about your ZkApp.

All new app enter a `pending` state, this is because ZkApps take varying times to compile based on their code as those who have deployed their app will know! With that in mind, if your app is pending then you may continue querying the status! At some point if the app passes verification, you will see a response like so:

```js
{
 "publicKey" : "foasifdaiowerjo134jondojf",
 "verifiedAt": "asdasdasdasdasdasd",
 "status": "Confirmed",
 "o1jsVerson": "v0.1",
}

```

This indicates successful compilation of your app! You may crosscheck this on any explorer from our [#Integrators](#integrators) section!

## Overview

The ZkApp verification service is a bespoke verifier for ZkApps! ZkApps are compiled smart contracts based on zero knowledge proofs written with `o1js`.

It's helpful to know that unlike Ethereum smart contracts which in which the validator includes valid transactions which are then executed, Mina's design takes a different approach. ZkApps are constrained to set of approved actions through their verification key.

A common problem shared between both designs in the risk posed to the user. Their funds can be controlled programatically by the smart contract. To mitigate the risks of untrusted apps, developers have the power to demonstrate their code in the open where users can .

This verification process depends on the aptly named verification key at the heart of ZkApps. The only way to determine the verification key of an app is to know the source contract used to generate it! Even with a verification key, the source code used to generate it cannot be known to the user.

But it can be proven! And proving the code used to generate a key enables you to share that with the ZkApp Verifier and downstream consumers such as block explorers.

## Diagram

goes here

## Contributing

Contributions to the ZKApp-Verify service is greatly appreciated! There are differenct ways you can contribute, either as a ZkApp developer by verifying your source code, as a block explorer by integrating verified ZkApps with your project! Or as a primary contributor to our codebase!

### ZkApp Developers

Verifying your ZkApp is a great step towards building trust with your users. It gives everyone an objective source of truth to reference, and increases the visibility on your app!

The process to verify has been designed with DX in mind, that is easy to perform as part of your deployment, or on applications that already exists

- You will need to provide you desired contract

- The `o1js` version used to deploy with (check your package.json)

### Explorer developers

Integrating the ZkApp Verification service in your project brings immense benefits to your userbase and developer experience.

Considering the GraphQL design of the Mina nodes, we've found it simplest to create a GraphQL server that you may query to! Here is an example query that would fetch

The endpoint is available at: <https://api.zkapp-verify.com/graphql>

```gql
Query VerifiedZkAppLookup {
 publicKey(id: $id) {
  id
  publicKey
  verifiedAt
  sourceCode
 }
}
```

### Service contributors

The Zkapp verify service has been spun into it's own service to make it easy for anyone to contribute and strengthen the gurauntees provided to the service.

If you have recommendations or would like to implement improvements please follow our contribution guidelines. This helps maintainers merge your code in promptly

## Security

The nature of the project requires executing user supplied code to determine if the verification key matches the expected result which could be fun to experiment on.

Defense is applied in layers to limit the attack surface of the project, but the nature of upstream projects can introduce new cases we must secure again. We welcome responsible disclosure of issues! They can be communicated privately to:

```
security at zkappverify dot com
```

## Why Mina?

Mina is performing a hard fork to enable ZkApps to deploy on the mainnet. To deal with the new possibilities, end users are likely to need a trusted place to verify contracts.

With the ZkApp and ZkApp verification service, you can add another layer of trust for your users and give them confidence when using your app.

For end users, you can do your own diligence by requesting developers to verify the source code of their ZkApps!
