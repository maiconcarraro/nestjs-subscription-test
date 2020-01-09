## Installation

```bash
$ yarn
```

## Running the app

```bash
$ yarn start
```

## Flow

1. Access http://localhost:4002/graphql

2. Start subscription

```bash
subscription {
  chat {
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
  sendMessage(text: "test") {
    id
    text
  }
}
```

4. Check subscription 2.
