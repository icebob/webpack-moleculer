const { EventEmitter } = require('events')
const hrtime = require('browser-process-hrtime');

const _process = process || require('process')

// events
const ev = new EventEmitter()
Object.setPrototypeOf(_process, ev)
const props = ['on', 'addListener', 'once', 'off', 'removeListener', 'removeAllListeners', 'emit', 'prependListener', 'prependOnceListener', 'listeners']
props.forEach(prop => {
  _process[prop] = ev[prop].bind(ev)
})
if (typeof window !== 'undefined') { window.process = _process } else if (typeof self !== 'undefined') { self.process = _process }

// hrtime
_process.hrtime = hrtime

// versions
if (!_process.versions) {
  _process.versions = {}
}

if (!_process.versions.node) {
  _process.versions.node = '12.18.4'
}

// memoryUsage
_process.memoryUsage = () => {
  if (!performance && !performance.memory) {
    return {
      rss: 0,
      heapTotal: Number.MAX_SAFE_INTEGER,
      heapUsed: 0,
      external: 0
    }
  }

  const { memory } = performance

  return {
    rss: 0,
    heapTotal: memory.totalJSHeapSize,
    heapUsed: memory.usedJSHeapSize,
    external: 0
  }
}

// uptime
_process._startTime = Date.now()
_process.uptime = () => {
  return Math.floor((Date.now() - _process._startTime) / 1000)
}

_process.pid = 0

_process.browser = true;
_process.env = {};
_process.exit = function() {};

_process.cwd = () => '/'

_process._getActiveHandles = function () {
  return []
}
_process._getActiveRequests = function () {
  return []
}

module.exports = _process
