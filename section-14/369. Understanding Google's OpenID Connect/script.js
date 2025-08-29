const clientId = ''
const clientSecret = ``
const redirectUrl = 'http://localhost:5500/callback.html'

const authUrl =`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`

const button = document.querySelector('button');

button.addEventListener('click', () => {
    window.open(authUrl, 'auth-popup', 'left=50,top=50,width=500,height=500')
})

window.addEventListener('message', ({ data }) => {
   fetchIdToken(data.code)
})


async function fetchIdToken(code) {
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

