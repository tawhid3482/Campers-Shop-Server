import SSLCommerzPayment from "sslcommerz-lts";
import dotenv from "dotenv";
import config from ".";


const store_id = config.SSLCOMMERZ_STORE_ID as string;
const store_passwd = config.SSLCOMMERZ_STORE_PASSWORD as string;
const is_live = config.SSLCOMMERZ_IS_LIVE; 

export const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
