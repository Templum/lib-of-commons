# Lib of Common

This library is a utility library for Typescript which provides functionality for addressing cross-concerns e.g. Logging, Caching or Validation. For a list of available decorators [see](#Decorators).

## Installation

1. Installation via yarn or npm with: `$ npm install lib-of-commons` or `$ yarn add lib-of-commons`.
2. Enable `experimentalDecorators:true` & `emitDecoratorMetadata:true` in tslint.json.

**Note:** Some of the Decorators e.g. [Measure](#Metrics) currently rely on Node API's and won't work in the browser.

## Decorators

### Logging

```typescript
    // Also compatible with Winston default logger.
    const logger: IToolboxLogger = console; // Fallback value

    class Example {
        @Log(Level.Info, logger)
        public login(username: string, @Hide() secret: string, privs: string[]) {
            // Generate token based on input
        }
    }

    const instance = new Example();
    instance.login('username', 'geheim', ['history_read', 'history_write']);
    // => Call: login("username",*****,["history_read","history_write"])
```

### Caching

```typescript
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

```typescript
    class Example {
        @Validate()
        div(@isInteger() a: number, @isInteger() @isGreater(0) b: number){
            return a / b;
        }

        @Validate()
        addPriv(userUUID: string, @isOneOf(["Read", "Write", "Update", "Delete"]) newPriv: string) {
            // Add Priv to userUUID
            return true;
        }

        @Validate()
        discount(price:number, @isSmaller(0.20) discountFactor: number){
            return price - ((price / 100) * discountFactor);
        }
    }

    const instance = new Example();

    instance.div('0', 2); // => Error div: Parameter 0 was not an Integer
    instance.div(0, '2'); // => Error div: Parameter 1 was not an Integer

    instance.div(2, 0); // => Error div: Parameter 1 was not greater then 0
    instance.div(2, -1); // => Error div: Parameter 1 was not greater then 0

    instance.addPriv('2d776ba0-5fca-409f-9181-388a7f76e260', 'root'); // => Error addPriv: Parameter 1 was not in whitelist

    instance.discount(100, 0.5); // => Error discount: Parameter 1 was not smaller then 0.2
```

### Execution

```typescript
    // Predicat that should return true if the error is retriable
    const isNetworkError = error => !!error && error instanceof NetworkError;
    const retries = 3; // Default Value

    class Example {
        @AsyncRetry(isNetworkError, retries)
        async backgroundTask(input: any) {
            // Can fail with NetworkError
            await client.sendData(input);
        }

        @Retry(isNetworkError, retries)
        task() {
            // Can fail with NetworkError
            await client.sendData(input);
        }
    }

    const instance = new Example();

    instance.backgroundTask('data'); // => Will retry up to 3 times as long as error is an NetworkError
    instance.task(); // => Will retry up to 3 times as long as error is an NetworkError
```

```typescript
    // Debounce Window in MS
    const DEBOUNCE_WINDOW_MS = 500;

    class Example {
        @Debounce(DEBOUNCE_WINDOW_MS)
        sync(input: any) {
            console.log('Synced with input:', input);
        }
    }

    const instance = new Example();

    instance.sync('I will be synced'); // => Synced with input: I will be synced
    instance.sync('I will not be synced'); // => dropped

    await new Promise(resolve => setTimeout(resolve, 600));

    instance.sync('I will be synced again'); // => Synced with input: I will be synced again
    instance.sync('I still will not be synced'); // => dropped
```

### Metrics

```typescript
    //#### Following Code is required to obtain reported Metrics ####//

    // Could also choose a less specialized type e.g. any
    class MyMonitor implements IMonitor<number> {
        getIdentifier(): string {
            return 'MyMonitor';
        }

        handleAnnouncement(announcement: Announcement<number>): void {
            if (announcement.key === 'Timings') {
                console.info('Execution Time', announcement.data);
            }
        }
    }

    // Register MyMonitor
    const globalAnnouncer = libOfCommons.getAnnouncerInstance();
    globalAnnouncer.register(new MyMonitor());

    //#### Usage of the Measure Decorator ####//
    class Example {
        @Measure(TimeUnit.Nanosecond, 'Timings')
        async sleep(time: number) {
            return await new Promise(resolve => setTimeout(resolve, time));
        }
    }

    const instance = new Example();

    await instance.sleep(100); // => Execution Time 100963100 (~ 100,96 ms)
    await instance.sleep(100); // => Execution Time 101334900 (~ 101,33 ms)
    await instance.sleep(100); // => Execution Time 101105000 (~ 101,10 ms)
```

```typescript
    //#### Following Code is required to obtain reported Metrics ####//

    // Could also choose a less specialized type e.g. any
    class MyMonitor implements IMonitor<number> {
        getIdentifier(): string {
            return 'MyMonitor';
        }

        handleAnnouncement(announcement: Announcement<number>): void {
            if (announcement.key === 'User_Subscribed') {
                console.info('Current Value', announcement.data);
            }
        }
    }

    // Register MyMonitor
    const globalAnnouncer = libOfCommons.getAnnouncerInstance();
    globalAnnouncer.register(new MyMonitor());

    //#### Usage of the Measure Decorator ####//
    class Example {
        @Counter('User_Subscribed')
        subscribed(email: string) {
            // Do something
            return true;
        }
    }

    const instance = new Example();

    instance.subscribed('user@sample.com'); // => Current Value 1
```