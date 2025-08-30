const clientId = ''
const clientSecret = ``
const redirectUrl = 'http://localhost:5500/callback.html'

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

  const token = data.id_token.split('.')[1]
  const userData = JSON.parse(atob(token))
  
  return userData

}
