# Persistant Storage

## Stack

- [SQLite](https://www.npmjs.com/package/sqlite3) - Serverless, and single file are the main reasons. This provides a straightforward tabular db which I believe fits nicely with an electron app.
  - I ran into some issues trying to build this using npm. [This fixed it for me](https://gist.github.com/craigvantonder/f59277cd788f8aa755e3bdbe5d21f08e).
- [KnexJS](https://github.com/knex/knex) - Seems to have a straightforward API that I can use with SQLite. I also have some experience with it from prior work.
- [Mikro-ORM](https://github.com/mikro-orm/mikro-orm) - I think having an ORM will help abstract a lot of the queries and works nicely with typescript and the inherent safety.

## Common Queries

We will need to know:

- What tasks do I need to do today?
- What tasks are completed at the moment?
- What task am I currently doing? (persistant state)
- What tasks are related to my search query?
- What were yesterday's/tomorrow's tasks?

## File Structure
