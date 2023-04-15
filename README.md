# @cloudbourn/scheduler-sdk

Create and manage jobs in a Cloudbourn Scheduler such as[lingering.io](https://lingering.io)

## Usage

```js
const { setAuthorization, jobs } = require('@cloudbourn/scheduler-sdk')

setAuthorization('my-api-key')

const storedJob = await jobs.add({
  endpoint: 'https://webhook.site/abc-123-def-456',
  method: 'POST',
  body: {
    test: 'yes'
  },
  scheduleAt: new Date().toJSON()
})
```

The HTTP client defaults to communicating with `https://api.lingering.io`. To override:

```js
const { setBaseUrl } = require('@cloudbourn/scheduler-sdk')

setBaseUrl('http://example.com/scheduler-api')
```
