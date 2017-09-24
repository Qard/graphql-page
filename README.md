# graphql-page

[![Greenkeeper badge](https://badges.greenkeeper.io/Qard/graphql-page.svg)](https://greenkeeper.io/)

This module is a collection of helpers to compose Connect + ConnectionEdge
style pagination with graphql.

## Install

```sh
npm install graphql-page
```

## Usage

```js
async resolver(root, args) {
  // Build a limited query from first or last directions
  const query = {
    limit: args.first || args.last,
    order: ['id', args.first ? 'ASC' : 'DESC']
  }

  // Use before or after cursors to move the query window
  if (args.after) {
    query.where = {
      id: { gt: page.fromCursor(args.after) }
    }
  } else if (args.before) {
    query.where = {
      id: { lt: page.fromCursor(args.before) }
    }
  }

  // Run the query
  const records = await Record.findAll(query)

  // Check if there's a previous record
  const previous = await Record.findOne({
    where: { id: args.after }
  })
  const hasPreviousPage = !!previous

  // Check if there's a next record
  const last = records[record.length - 1]
  const next = await Record.findOne({
    where: { id: { gt: last.id } }
  })
  const hasNextPage = !!next

  // Make a page object
  return page(records, {
    hasNextPage,
    hasPreviousPage
  })
}
```

## API

### `page(items [, options])`

This produces a page result from an array of records. The `options` object
can contain `hasNextPage` and `hasPreviousPage` fields to indicate if the
consumer should expect more pages.

### `page.pageInfo(item [, options])`

This only creates the pageInfo object. As in `page(items [, options])`,
`options` can include `hasNextPage` and `hasPreviousPage` values.

### `page.toEdge(record)`

Converts a record object to an edge object containing the `cursor` and `node`
properties.

### `page.toCursor(id)`

Converts a string or numeric id to a cursor string.

### `page.fromCursor(cursor)`

Converts a cursor string back to a string id. If your origin id format is
numeric, you'll need to do your own conversion from string back to number.

---

### Copyright (c) 2017 Stephen Belanger

#### Licensed under MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
