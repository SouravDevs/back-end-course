const clientId = '725466307018-gkjq39d9boupnvctbt3milq6hfn4qa65.apps.googleusercontent.com'
const redirectUrl = 'http://localhost:4000/auth/google/callback'

const authUrl =`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`

const button = document.querySelector('button');

button.addEventListener('click', () => {
    window.open(authUrl, 'auth-popup', 'left=50,top=50,width=500,height=500')
})

window.addEventListener('message', async ({ data }) => {
  if(data.message === "success") location.href = 'http://localhost:5500'
})

