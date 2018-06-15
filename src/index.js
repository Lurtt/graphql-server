const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`
let links = [{
  id: 'link-0',
  url: 'www.supercoollink.com',
  description: 'some cool description'
}]

const resolvers = {
  Query: {
    info: () => `This is the API of the app`,
    feed: () => links,
  },

  Link: {
    id: ({ id }) => id,
    url: ({ url }) => url,
    description: ({ description }) => description,
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
