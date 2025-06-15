import crypto from 'crypto'

const salt = crypto.randomBytes(10)

crypto.pbkdf2("password", salt, 100000, 32, 'sha256', (err, output) => {
    console.log(output.toString("base64"));
})