import "server-only";

const required = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Thiếu biến môi trường: ${key}`);
  return value;
};

export const env = {
  MAIL_USER: required("MAIL_USER"),
  MAIL_PASS: required("MAIL_PASS"),
  MAIL_TO: process.env.MAIL_TO ?? required("MAIL_USER"),
  MAIL_HOST: process.env.MAIL_HOST ?? "smtp.gmail.com",
  MAIL_PORT: Number(process.env.MAIL_PORT ?? 587),
};
