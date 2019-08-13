import gql from "graphql-tag";

export const GET_LOL_LEAGUES = gql`
  query GET_LOL_MATCHES($path: String!) {
    lolleague @rest(type: "LOLLeague", path: $path) {
      id
      name
      url
      image_url
      slug
    }
  }
`;

export const GET_PAST_LEAGUE_MATCHES_SIDEBAR = gql`
  query GET_PAST_LEAGUE_MATCHES($path: String!) {
    pastLeagueMatches @rest(type: "PastLeagueMatches", path: $path) {
      league @type(name: "League") {
        name
        image_url
      }
      live_url
      match_type
      results @type(name: "Results") {
        score
      }
      name
      winner
      opponents
      games
      begin_at
      tournament @type(name: "Tournament") {
        name
      }
      serie @type(name: "Serie") {
        name
      }
    }
  }
`;