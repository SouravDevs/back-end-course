const clientId = ''
const clientSecret = ``
const redirectUrl = 'http://localhost:5500/callback.html'

const authUrl =`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`

const baseURL = "http://localhost:4000"

const button = document.querySelector('button');

button.addEventListener('click', () => {
    window.open(authUrl, 'auth-popup', 'left=50,top=50,width=500,height=500')
})

window.addEventListener('message', async ({ data }) => {
  console.log(data.code);
  const response =  await fetch(`${baseURL}/auth/google/callback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  })

  const responseData = await response.json()
  console.log(responseData);

  if(responseData) {
    location.href = 'http://localhost:5500'
  }
})

