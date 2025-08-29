const code = new URLSearchParams(location.search).get('code')

const redirectUrl = `http://localhost:5500`

const authURL =`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`

if(code) {
    fetchIdToken()
}

async function fetchIdToken() {
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
  console.log(userData);

}

