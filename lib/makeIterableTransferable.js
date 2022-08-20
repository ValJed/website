import JSONfn from 'jsonfn'

const makeIterableTransferable = (it, parse = false) => {

  return Array.isArray(it)
    ? it.map((val) => makeItemTransferable(val))
    : Object.entries(it)
      .reduce((acc, [key, val]) => ({ ...acc, [key]: makeItemTransferable(val) }), {})

  function makeItemTransferable(item) {
    if (!item || !['object', 'function'].includes(typeof item)) {


      return item
    }

    // Object or Array
    if (typeof item === 'object') {
      return makeIterableTransferable(item, parse)
    }

    // Function
    return JSONfn[parse ? 'parse' : 'stringify'](item);
  }
}

export default makeIterableTransferable
