import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { fetchUserFromGoogle } from './services/googleAuthService.js';
import usersDB from './usersDB.json' with { type: "json" }
import sessionsDB from './sessionsDB.json' with { type: "json" }
import { writeFile } from 'fs/promises';

const app = express()
const PORT = 4000

app.use(cors({
    origin: "http://localhost:5500",
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.get('/auth/google', async (req, res) => {
    const clientId = ''
    const redirectUrl = 'http://localhost:4000/auth/google/callback'

    const authUrl =`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`

    res.redirect(authUrl)
    res.end()
})

app.get('/auth/google/callback', async (req, res) => {
    const { sid } = req.cookies;

    const existingSession = sessionsDB.find((session) => session.sessionId === sid)

    if(existingSession) {
        return res.json({ message: "Already logged in"})
    }

    const { code } = req.query;


    const { sub, email, name, picture } = await fetchUserFromGoogle(code)
    
    const existingUser = usersDB.find(({ id }) => id === sub)

    const sessionId = crypto.randomUUID()

    if (existingUser) {
        sessionsDB.push({ sessionId, userId: sub })
        await writeFile('sessionsDB.json', JSON.stringify(sessionsDB, null, 2))


        res.redirect(`http://localhost:5500/callback.html?sid=${sessionId}`)
        return res.end()
    }

    const newUser = { id: sub, email, name, picture }

    usersDB.push(newUser)

    await writeFile('usersDB.json', JSON.stringify(usersDB, null, 2))

    sessionsDB.push({ sessionId, userId: sub })
    await writeFile('sessionsDB.json', JSON.stringify(sessionsDB, null, 2))


    res.redirect(`http://localhost:5500/callback.html?sid=${sessionId}`)
    return res.end()
})

app.get('/session-cookie', async (req, res) => {
    const { sid } = req.query;

   res.cookie("sid", sid, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
   }) 

   res.end()
})

app.get('/profile', async (req, res) => {
     const { sid } = req.cookies;

    const existingSession = sessionsDB.find((session) => session.sessionId === sid)

    if(!existingSession) {
        return res.status(401).json({ error: "Not logged in"})
    }

    const existingUser = usersDB.find(({ id }) => id === existingSession.userId)

    if(!existingUser) {
        return res.status(401).json({ error: "User not found"})
    }

    return res.json(existingUser)
})

app.post('/logout', async (req, res) => {
    const { sid } = req.cookies;
    const sessionIndex = sessionsDB.findIndex((session) => session.sessionId === sid)
    sessionsDB.splice(sessionIndex, 1)

    await writeFile('sessionsDB.json', JSON.stringify(sessionsDB, null, 2))
    res.clearCookie('sid')
    res.status(204).end()
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})