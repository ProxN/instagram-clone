# Instagram-clone

This project is a clone of Instagram. Built with Next.js for front-end and
GraphQL, Node.js, Express and Postgres for back-end.

An example is deployed [here](https://kanapps.xyz)

## User stories

- user story: I can login with email/password
- user story: I can change password/reset password
- user story: I can see my profile or others profile
- user story: I can follow/unfollow users
- user story: When Iam on home page, I can see posts
- user story: When I am on profile, I can see followers and following
- user story: I can like, comment or save posts.
- user story: When iam on profile, I can send message to user
- user story: I can add a new post
- user story: I can edit my profile
- user story: When I am on the home page, I can see users to follow
- user story: When I am on the inbox page, I can see all users that I have talked with

## Installation

**Must have node, yarn, postgres and redis installed and setup locally**

### Install

```sh
yarn
```

### Development

1. `cd packages/server && yarn start:dev`
2. `cd packages/web && yarn dev`

### Production

- Create a Sendgrid account and set a SENDGRID_API_KEY environment variable in config.env
- Create a Sentry account and set A SENTRY_DSN environment variable in config.env

### Deployment

VPS for backend and vercel for front-end
