import superagent from 'superagent'
import cheerio from 'cheerio'

export default class Crawler {
  content: string = ''
  baseUrl: string
  contentList: string[] = []
  constructor(from: string, to: string) {
    this.baseUrl = `https://translate.google.cn/#view=home&op=translate&sl=${from}&tl=${to}`
  }

  async translate() {
    if (this.contentList.length) {
      console.log(this.contentList[1])
      const html = await this.getRawHtml(this.contentList[1])
      this.analyze(html)
    }
  }

  generateContentList(content: string) {
    this.contentList = content.split("'")
    this.translate()
  }

  private async getRawHtml(word: string) {
    let translateUrl = `${this.baseUrl}&text=${word}`
    const res = await superagent.get(translateUrl)
    return res.text
  }

  private analyze(html: string) {
    const $ = cheerio.load(html)
    const text = $('.text-dummy')
  }
}