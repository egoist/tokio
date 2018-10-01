const Tokio = require('..')

jest.setTimeout(10000)

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

test('variables', async () => {
  const TEST_VAR = []
  const tokio = new Tokio({
    url: 'https://cdn.rawgit.com/egoist/b7eb79357cb05e1f89780890838d35b4/raw/8acc520d201918817457ed1bb9b99f430d357dc9/index.html',
    variables: {
      TEST_VAR
    }
  })
  await tokio.fetch()
  expect(TEST_VAR).toEqual(['hehehe'])
})
