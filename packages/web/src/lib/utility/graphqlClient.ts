import { GraphQLClient, gql } from 'graphql-request';

const endpoint = process.env.API_URL as string;

const client = new GraphQLClient(endpoint, {
  credentials: 'include',
});

export { gql, client };
