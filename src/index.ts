import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <select>
          <option value="zh-CN">zh-CN</option>
          <option value="en">en</option>
          <option value="ja">ja</option>
          <option value="zh-TW">zh-TW</option>
        </select>
      </body>
    </html>
  `)
})

app.listen(7001, () => {
  console.log('listening on the port 7001')
})