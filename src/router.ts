import { Router } from 'express'
import Crawler from './utils/crawler'

let crawler: Crawler

const router = Router()

router.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="padding-top: 100px;text-align: center;">
        <form method="post" action="/content">
          from
          <select name="from">
            <option value="zh-CN">zh-CN</option>
            <option value="en">en</option>
            <option value="ja">ja</option>
            <option value="zh-TW">zh-TW</option>
          </select>
          to
          <select name="to">
            <option value="zh-TW">zh-TW</option>
            <option value="zh-CN">zh-CN</option>
            <option value="en">en</option>
            <option value="ja">ja</option>
          </select>
          <div style="margin-top: 36px;">
            <button>确认</button>
          </div>
        </form>
      </body>
    </html>
  `)
})

router.post('/content', (req, res) => {
  const { from, to } = req.body
  crawler = new Crawler(from, to)
  res.send(`
    <html>
      <body style="padding-top: 100px;text-align: center;">
        <form method="post" action="/translate">
          <textarea name="content" rows="30" cols="180" placeholder="要翻译的内容">{
            reservationNumber: '预订号',
            name: '姓名'
          }</textarea>
          <div style="margin-top: 36px;">
            <button>翻译</button>
          </div>
        </form>
      </body>
    </html>
  `)
})

router.post('/translate', (req, res) => {
  const { content } = req.body
  if (!content) res.send('空数据')
  crawler.generateContentList(content)
  res.send('正在翻译中')
})

export default router