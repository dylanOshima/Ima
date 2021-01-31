# ToDo by DRO

Yet another Todo app.

## ToDo for the ToDo App:

- [ ] Create homepage interface
- [ ] Allow for persistent storage
- [ ] Figure out wtf the `menu` file does
- [ ] Fix initialization of table on first run
  - I tried using Mikro-ORM's `TableNotFoundException` but it returns a promise rejection and I'm not sure how to unpack that yet.

## References

### Built from [`electron-react-boilerplate`](https://electron-react-boilerplate.js.org/)

#### Starting Development

Start the app in the `dev` environment:

```bash
yarn start
```

#### Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

#### Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)
