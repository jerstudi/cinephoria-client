import { PrismaClient } from "../generated/mongodb";

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      mongodb: {
        url: process.env.MONGODB_URL,
      },
    },
    log: ["error", "warn"],
  });
};

declare global {
  // eslint-disable-next-line no-var
  var mongodb: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const mongodb = globalThis.mongodb ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.mongodb = mongodb;
}
