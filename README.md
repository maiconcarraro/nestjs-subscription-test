## Installation

```bash
$ yarn
```

## Running the app

```bash
$ yarn start
```

## Playground

1. Access http://localhost:4002/graphql

2. Start subscription

```bash
subscription {
  chat(id: 123) {
    message {
      id
      text
    }
  }
}
```

3. Send mutation

```bash
mutation {
  sendMessage(text: "test", chatId: 123) {
    id
    text
  }
}
```

4. Check subscription on 2.

## Details

If you send to a different **chatId**, then you must subscription to that.