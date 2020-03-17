import express from 'express'
import hello from "./src/hello";

const app = express()
const port = 3000

app.route("/").get(hello)

app.listen(port, () => console.log(`点我 http://localhost:${port}`))
