import { root, nodes, state } from "membrane";
const { sys_sms } = nodes;

export const Root = {
  configure: async ({ args }) => {
    if (!args.number || !args.number.length) {
      throw new Error("Missing phone number");
    }
    const number = args.number.length === 10 ? `+1${args.number}` : args.number;
    if (number[0] !== "+") {
      throw new Error("Phone number must start with +");
    }
    return await sys_sms.configure({ number }).$invoke();
  },

  handleSms: async ({ args: { message } }) => {
    await root.received.$emit({ message });
  },

  send: async ({ self, args }) => {
    console.log("SENDING SMS", args.message);
    const message = args.message;
    await sys_sms.send({ message }).$invoke();
  },
};
