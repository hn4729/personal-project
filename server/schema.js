const { GraphQLObjectType, GraphQLString } = require("graphql");

const MatchesType = new GraphQLObjectType({
  name: "Matches",
  fields: () => ({
    begin_at: { type: GraphQLString }
  })
});
