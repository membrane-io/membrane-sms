import { root, nodes, state } from "membrane";
const { sys_user } = nodes;

export const Root = {
  configure: async ({ args }) => {
    if (!args.number) {
      throw new Error("Missing phone number");
    }
    const number = args.number.length === 10 ? `1${args.number}` : args.number;
    return await sys_user.configureSms({ number }).$invoke();
  },

  handleSms: async ({ args: { message } }) => {
    await root.received.$emit({ message });
  },

  send: async ({ self, args }) => {
    await sys_user.sms.tell({ ...args }).$invoke();
  },
};
