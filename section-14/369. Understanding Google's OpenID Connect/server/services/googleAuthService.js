import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client()

const clientId = ''
const clientSecret = ``
const redirectUrl = 'http://localhost:4000/auth/google/callback'

export async function fetchUserFromGoogle(code) {
    const payload = new URLSearchParams({
    code: code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUrl,
    grant_type: "authorization_code"
  });

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
    },
    body: payload
  })

  const data = await response.json()

  if(data.error) {
    console.log("Error");
    return;
  }

  const loginTicket = await client.verifyIdToken({
    idToken: data.id_token,
    audience: clientId
  })
  const userData = loginTicket.getPayload()
  
  return userData

}
