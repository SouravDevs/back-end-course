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

app.post('/auth/google/callback', async (req, res) => {
    const { sid } = req.cookies;

    const existingSession = sessionsDB.find((session) => session.sessionId === sid)

    if(existingSession) {
        return res.json({ message: "Already logged in"})
    }

    const { code } = req.body;

    const { sub, email, name, picture } = await fetchUserFromGoogle(code)

    const existingUser = usersDB.find(({ id }) => id === sub)

    const sessionId = crypto.randomUUID()

    if (existingUser) {
        sessionsDB.push({ sessionId, userId: sub })
        await writeFile('sessionsDB.json', JSON.stringify(sessionsDB, null, 2))

        // Set cookie
        res.cookie('sid', sessionId, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        })

        return res.json(existingUser)
    }

    const newUser = { id: sub, email, name, picture }

    usersDB.push(newUser)

    await writeFile('usersDB.json', JSON.stringify(usersDB, null, 2))

    sessionsDB.push({ sessionId, userId: sub })
    await writeFile('sessionsDB.json', JSON.stringify(sessionsDB, null, 2))

    // Set cookie
    res.cookie('sid', sessionId, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    })

    res.json(email)
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

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})