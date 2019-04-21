# Lib of Common

This library is a utility library for Typescript which provides functionality for addressing cross-concerns e.g. Logging, Caching or Validation. For a list of available decorators [see](#Decorators).

## Installation

1. Installation via yarn or npm with: `$ npm install lib-of-commons` or `$ yarn add lib-of-commons`.

2. Enable `experimentalDecorators:true` & `emitDecoratorMetadata:true` in tslint.json.

## Decorators

For more/further details on the decorators see the [documentation](follows).

### Logging

```javascript
// Also compatible with Winston default logger.
const logger: IToolboxLogger = console; // Fallback value

class Example {
    @Log(Level.Info, logger)
    login(username: string, @Hide() secret: string, privs: string[]){
        // Generate token based on input
    }
}

const instance = new Example();
instance.login('username','geheim', ['history_read','history_write']);
// => Call: login("username", "*****", ["history_read","history_write"])
```

### Caching

```javascript
const logger: ICache = new MemoryCache(); // Fallback value
const ONE_MINUTE = 60 * 1000; // Fallback value

class Example {
    @Cache(ONE_MINUTE)
    add(a: number, b: number){
        return a + b;
    }

    @Cache()
    validate(@CacheKey token: string, timestamp: number, debug: boolean){
        // Validate
    }
}

const instance = new Example();
instance.add(1,2); // => 3 calculated
instance.add(1,2); // => 3 from Cache
instance.add(2,2); // => 4 calculated

instance.validate('supersecret', Date.now(), false); // validated
instance.validate('supersecret', 1343, true); // cached
instance.validate('othersecret', Date.now(), false); // validated
```

### Validation

Follows...
* isGreater
* isSmaller
* isInteger
* isOneOf
* Validate

### Execution

Follows...
* AsyncRetry
* Retry
* Debounce

### Metrics

Follows...
* Measure
