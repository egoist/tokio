const Tokio = require('..')

test('main', async () => {
  const tokio = new Tokio({
    url: 'https://manhua.fzdm.com/39/104/',
    resourceFilter(resource) {
      return resource.url.host === 'static.fzdm.com'
    }
  })

  const html = await tokio.fetch()
  const $ = tokio.query(html)
  expect($('#mhpic').attr('src')).toBe('http://p1.xiaoshidi.net/2018/04/04024318768756.jpg')
})
