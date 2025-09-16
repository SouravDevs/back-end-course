const accessToken = ''

const response = await 
    fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})

const userData = await response.json()

console.log(userData);