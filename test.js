var tap = require('tap')
var page = require('./')
var toEdge = page.toEdge
var pageInfo = page.pageInfo
var toCursor = page.toCursor
var fromCursor = page.fromCursor

// Input mocks
const testId1 = 'abc'
const testId2 = 123
const testItem1 = {
  id: testId1
}
const testItem2 = {
  id: testId2
}
const testList = [
  testItem1,
  testItem2
]
const testPageOptions = {
  hasNextPage: true,
  hasPreviousPage: true
}

// Output mocks
const testCursor1 = 'YWJj'
const testCursor2 = 'MTIz'
const testEdge1 = {
  node: testItem1,
  cursor: testCursor1
}
const testEdge2 = {
  node: testItem2,
  cursor: testCursor2
}
const testEdgeList = [
  testEdge1,
  testEdge2
]
const testPageInfo = {
  startCursor: testCursor1,
  endCursor: testCursor2,
  hasNextPage: true,
  hasPreviousPage: true
}
const testPage = {
  count: 2,
  edges: testEdgeList,
  pageInfo: testPageInfo
}

tap.test('converts string and number ids to cursors', t => {
  t.equal(toCursor(testId1), testCursor1)
  t.equal(toCursor(testId2), testCursor2)
  t.end()
})

tap.test('converts cursors to string ids', t => {
  t.equal(fromCursor(testCursor1), testId1)
  t.equal(fromCursor(testCursor2), String(testId2))
  t.end()
})

tap.test('converts a record to an edge', t => {
  t.strictSame(toEdge(testItem1), testEdge1)
  t.end()
})

tap.test('creates pageInfo from a list', t => {
  const expected = {
    startCursor: testCursor1,
    endCursor: testCursor2,
    hasNextPage: false,
    hasPreviousPage: false
  }

  t.strictSame(pageInfo(testList), expected)
  t.end()
})

tap.test('pageInfo can receive next and previous indicators', t => {
  t.strictSame(pageInfo(testList, testPageOptions), testPageInfo)
  t.end()
})

tap.test('converts a list to a page', t => {
  t.strictSame(page(testList, testPageOptions), testPage)
  t.end()
})
