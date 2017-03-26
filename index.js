exports = module.exports = page
exports.page = page
function page(items, opts) {
  return {
    count: items.length,
    edges: items.map(toEdge),
    pageInfo: pageInfo(items, opts)
  }
}

exports.toEdge = toEdge
function toEdge(node) {
  return {
    node: node,
    cursor: toCursor(toJSON(node).id)
  }
}

exports.pageInfo = pageInfo
function pageInfo(items, opts) {
  opts = opts || {}
  const first = items[0]
  const last = items[items.length - 1]
  return {
    hasNextPage: !!opts.hasNextPage,
    hasPreviousPage: !!opts.hasPreviousPage,
    startCursor: first ? toCursor(toJSON(first).id) : null,
    endCursor: last ? toCursor(toJSON(last).id) : null,
  }
}

exports.toCursor = toCursor
function toCursor(str) {
  return Buffer(String(str), 'binary').toString('base64')
}
exports.fromCursor = fromCursor
function fromCursor(str) {
  return Buffer(str, 'base64').toString('binary')
}

// This ensures compatibility with ORMs which use record instance objects
function toJSON(record) {
  return typeof record.toJSON === 'function' ? record.toJSON() : record
}
