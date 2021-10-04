# Hexagons

[![Hexagons Client](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/pueiyd&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/pueiyd/runs)

[![codecov](https://codecov.io/gh/aliblackwell/hexagons/branch/main/graph/badge.svg?token=EVAO1I6V6B)](https://codecov.io/gh/aliblackwell/hexagons)

Hexagons is an assessment system for tracking small steps of academic progress and personal development and is designed for pupils with Special Educational Needs and Disabilities (SEND). It is being developed for and with [Torfield and Saxon Mount Academy Trust (TASMAT)](http://torfield-saxonmount.com/).

## Technical information

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It uses [Cypress.js](https://www.cypress.io/) for tests and [Codecov.io](https://about.codecov.io/) to measure test coverage.

[MaterialUI](https://material-ui.com/) provides many standard interface components, with [ReachUI](https://reach.tech/) providing accessible components such as search boxes and the skip to content link.

## Getting Started

Clone down this repository and run `npm install`.

Clone down the backend repository, following the instructions there to setup a local PostgreSQL database and get Strapi up-and-running.

Rename `.env.default` to `env.local`.

Run `npm run dev` and the project will run.

## Custom scripts

Please browse [./package.json](package.json) scripts to learn how to run tests and lint the project; however, a Continuous Integration pipeline (see [./.github/workflows/main.yml](.github/workflows/main.yml)) runs tests automatically on every push to the `main` branch, and a husky pre-commit hook will lint all staged files before committing.

## Disable registration

If you wish to only allow Leader accounts to create new teachers, you can disable registration by adding environment variable NEXT_PUBLIC_DISABLE_REGISTRATION=true. To enable registration, remove the environment variable.
