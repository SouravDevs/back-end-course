const button = document.querySelector('button');

button.addEventListener('click', () => {
    window.open("http://localhost:4000/auth/google", 'auth-popup', 'left=50,top=50,width=500,height=500')
})

window.addEventListener('message', async ({ data }) => {
  if(data.message === "success") location.href = 'http://localhost:5500'
})

