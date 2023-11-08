import {
  Field,
  PrivateKey,
  PublicKey,
  SmartContract,
  State,
  method,
  state,
  Mina,
  AccountUpdate,
} from "o1js";
import amqp from "amqplib/callback_api";

let Local = Mina.LocalBlockchain({ proofsEnabled: false });
Mina.setActiveInstance(Local);
const feePayer1 = Local.testAccounts[0];

amqp.connect(process.env.BROKER, (err, conn) => {
  if (err) {
    throw err;
  }
  conn.createChannel(async (e, chan) => {
    if (e) {
      throw e;
    }

    const index = "1";
    chan.assertQueue(index, {
      durable: true,
    });

    chan.consume(index, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(`${msg.content}`);

        const { zkAppPublicKey, expectedKey, inputs } = data;

        const appData = Mina.getAccount(zkAppPublicKey).zkapp;

        let RuntimeInstanceResult: any; //

        let deployedAppInstance = new RuntimeInstanceResult();

        // !

        chan.ack(msg);
      }
    });
  });
});
