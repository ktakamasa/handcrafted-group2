import { JsonDB, Config } from "mongodb";
import crypto from "node:crypto";

type Users = {
  username: string;
  password: string;
  token: string;
};

type Requisition = {
  body: {
    username: string;
    password: string;
  };
};

const database = new JsonDB(new Config("database", true, false, "/"));
database.load();

const getDatabaseUser = async (req: Requisition) => {
  const userExists = await database.find("/Users", (dbUser: Users) => {
    const reqUser = req.body;
    return (
      reqUser.username == dbUser.username && reqUser.password == dbUser.password
    );
  });

  return userExists;
};

const getDatabaseToken = async (reqToken: string) => {
  const userByToken: Users | undefined = await database.find(
    "/Users",
    (dbUser: Users) => {
      return dbUser.token == reqToken;
    }
  );

  return userByToken?.token;
};

const generateToken = (lengthChars: number) => {
  const CHARS =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let tokenStore = "";
  for (let i = 0; i < lengthChars; i++) {
    tokenStore += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return tokenStore;
};

const addDatabaseUser = async (req: Requisition) => {
  const userExists = await database.find("/Users", (dbUser: Users) => {
    const reqUser = req.body;
    return reqUser.username == dbUser.username?true:false;
  });
  if (!userExists) {
    database.push("/Users[]", { ...req.body, token: "" });
    return true;
  }
  return false;
};

export { getDatabaseUser, addDatabaseUser, getDatabaseToken, generateToken };