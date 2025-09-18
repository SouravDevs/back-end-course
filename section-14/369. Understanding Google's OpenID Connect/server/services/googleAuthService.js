import { OAuth2Client } from "google-auth-library";


const client_id = ''
const clientSecret = ``
const redirectUrl = 'http://localhost:4000/auth/google/callback'


// Setting-up Google Client
const client = new OAuth2Client({
  client_id,
  clientSecret,
  redirectUri: redirectUrl
})

export function generateGoogleAuthUrl() {
  return client.generateAuthUrl({
    scope: ["email", "profile", "openid"],
    prompt: "consent",
  })
}

export async function fetchUserFromGoogle(code) {
    const { tokens } = await client.getToken(code)
    console.log(tokens);

    const idToken = tokens.id_token


    const loginTicket = await client.verifyIdToken({
        idToken: idToken,
        audience: client_id
      })

    const userData = loginTicket.getPayload()
  
    return userData

}
