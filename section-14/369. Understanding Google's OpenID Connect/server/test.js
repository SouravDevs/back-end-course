import { OAuth2Client } from "google-auth-library";

const clientId = ''

const token = '4/0AVGzR1BgmyI9WY8KV3Q0D7BtRkG1yuZNsi_kqM8QN9ni4JMLQLl51VS-jX-lOazKX3_cJw'

const client = new OAuth2Client();

const loginTicket = await client.verifyIdToken({
    idToken: token,
    audience: clientId
})

console.log(loginTicket.getPayload());