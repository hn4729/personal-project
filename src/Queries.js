import gql from "graphql-tag";

export const GET_PAST_LOL_LEAGUE_MATCHES_SIDEBAR = gql`
  query GET_PAST_LOL_LEAGUE_MATCHES($path: String!) {
    pastLOLLeagueMatches @rest(type: "PastLOLLeagueMatches", path: $path) {
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

export const GET_PAST_OWL_LEAGUE_MATCHES_SIDEBAR = gql`
  query GET_PAST_OWL_LEAGUE_MATCHES($path: String!) {
    pastOWLLeagueMatches @rest(type: "PastOWLLeagueMatches", path: $path) {
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

export const GET_PAST_CSGO_MATCHES_SIDEBAR = gql`
  query GET_PAST_CSGO_MATCHES_SIDEBAR($path: String!) {
    pastCSGOMatchesSidebar @rest(type: "PastCSGOMatchesSidebar", path: $path) {
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

export const GET_LOL_CHAMPS_ONE = gql`
  query GET_LOL_CHAMPS_ONE($path: String!) {
    getLOLChampsOne @rest(type: "GetLOLChampsOne", path: $path) {
      name
      image_url
    }
  }
`;

export const GET_LOL_CHAMPS_TWO = gql`
  query GET_LOL_CHAMPS_TWO($path: String!) {
    getLOLChampsTwo @rest(type: "GetLOLChampsTwo", path: $path) {
      name
      image_url
    }
  }
`;

export const GET_LOL_LEAGUES = gql`
  query GET_LOL_LEAGUES($path: String!) {
    getLOLLeagues @rest(type: "GetLOLLeagues", path: $path) {
      image_url
      url
      slug
      name
      id
    }
  }
`;

export const GET_LOL_SERIES = gql`
  query GET_LOL_SERIES($path: String!) {
    getLOLSeries @rest(type: "GetLOLSeries", path: $path) {
      description
      full_name
      id
      league_id
      name
      prizepool
      season
      slug
      tournaments
      year
    }
  }
`;

export const GET_LOL_TEAMS_SERIE = gql`
  query GET_LOL_TEAMS_SERIES($path: String!) {
    getLOLTeamsSerie @rest(type: "GetLOLTeamsSerie", path: $path) {
      id
      image_url
      name
      players
      slug
    }
  }
`;
