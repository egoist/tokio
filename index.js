const { EventEmitter } = require('events')
const jsdom = require('jsdom/lib/old-api')

const defaultResourceFilter = () => true

class Tokio extends EventEmitter {
  constructor(options) {
    super()
    this.options = this.normalizeOptions(options)
  }

  normalizeOptions(options = {}) {
    return Object.assign({}, options)
  }

  fetch(
    {
      url,
      wait,
      manually = false,
      resourceFilter = defaultResourceFilter,
      requestOptions = {}
    } = this.options
  ) {
    if (manually && wait) {
      return Promise.reject(
        new Error(
          'You cannot use "wait" if you want to "manually" tell when the app is ready'
        )
      )
    }

    this.emit('fetching', url)

    const {
      headers,
      userAgent,
      agent,
      agentOptions,
      strictSSL,
      proxy
    } = requestOptions

    return new Promise((resolve, reject) => {
      jsdom.env({
        userAgent,
        agent,
        agentOptions,
        strictSSL,
        proxy,
        url,
        headers: Object.assign(
          {
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
          },
          headers
        ),
        resourceLoader(resource, callback) {
          if (resourceFilter(resource)) {
            resource.defaultFetch(callback)
          } else {
            callback()
          }
        },
        features: {
          FetchExternalResources: ['script'],
          ProcessExternalResources: ['script'],
          SkipExternalResources: false
        },
        virtualConsole: jsdom.createVirtualConsole().sendTo(console),
        created(err, window) {
          if (err) return reject(err)
          if (manually) {
            // eslint-disable-next-line camelcase
            const method =
              typeof manually === 'string' ? manually : '__tokio_ready__'
            window[method] = () => {
              resolve(window)
            }
          }
        },
        done: (err, window) => {
          if (err) return reject(err)
          if (!manually) {
            wait = wait || 50
            if (typeof wait === 'string') {
              const ensureSelector = selector => {
                const timeout = setTimeout(() => {
                  if (window.document.querySelector(selector)) {
                    clearTimeout(timeout)
                    resolve(window)
                  } else {
                    ensureSelector()
                  }
                }, 300)
              }
              ensureSelector(wait)
            } else {
              setTimeout(() => {
                resolve(window)
              }, wait)
            }
          }
        }
      })
    }).then(window => {
      const html = jsdom.serializeDocument(window.document)
      window.close()
      this.emit('fetched', url)
      return html
    })
  }

  query(html, opts) {
    return require('cheerio').load(html, opts)
  }
}

module.exports = Tokio
