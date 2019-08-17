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
      results
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

export const GET_LOL_UPCOMING_MATCHES = gql`
  query GET_LOL_UPCOMING_MATCHES($path: String!) {
    getLOLUpcomingMatches @rest(type: "GetLOLUpcomingMatches", path: $path) {
      begin_at
      live
      live_url
      league
      name
      opponents
      status
      tournament
    }
  }
`;

export const GET_LOL_PAST_MATCHES = gql`
  query GET_LOL_PAST_MATCHES($path: String!) {
    getLOLPastMatches @rest(type: "GetLOLPastMatches", path: $path) {
      id
      begin_at
      detailed_stats
      games
      league
      match_type
      name
      number_of_games
      opponents
      results
      tournament
      winner
      video_url
    }
  }
`;

export const GET_OW_HEROES = gql`
  query GET_OW_HEROES($path: String!) {
    getOWHeroes @rest(type: "GetOWHeroes", path: $path) {
      id
      difficulty
      image_url
      name
      portrait_url
      role
      real_name
      slug
    }
  }
`;

export const GET_OW_MAPS = gql`
  query GET_OW_MAPS($path: String!) {
    getOWMaps @rest(type: "GetOWMaps", path: $path) {
      id
      game_mode
      image_url
      name
      slug
      thumbnail_url
    }
  }
`;

export const GET_OWL_SERIES = gql`
  query GET_OWL_SERIES($path: String!) {
    getOWLSeries @rest(type: "GetOWLSeries", path: $path) {
      begin_at
      description
      full_name
      id
      league
      name
      season
      slug
      tournaments
      year
    }
  }
`;

export const GET_OWL_TOURNAMENT = gql`
  query GET_OWL_TOURNAMENT($path: String!) {
    getOWLTournament @rest(type: "GetOWLTournament", path: $path) {
      id
      begin_at
      end_at
      name
      winner_id
      teams
      serie_id
      league
      league_id
      matches
    }
  }
`;

export const GET_OWL_UPCOMING_MATCHES = gql`
  query GET_OWL_UPCOMING_MATCHES($path: String!) {
    getOWLUpcomingMatches @rest(type: "GetOWLUpcomingMatches", path: $path) {
      begin_at
      scheduled_at
      live
      live_url
      league
      name
      opponents
      status
      tournament
    }
  }
`;

export const GET_OWL_PAST_MATCHES = gql`
  query GET_OWL_PAST_MATCHES($path: String!) {
    getOWLPastMatches @rest(type: "GetOWLPastMatches", path: $path) {
      id
      begin_at
      detailed_stats
      games
      league
      match_type
      name
      number_of_games
      opponents
      results
      tournament
      winner
      video_url
    }
  }
`;

export const GET_CSGO_MAPS = gql`
  query GET_CSGO_MAPS($path: String!) {
    getCSGOMaps @rest(type: "GetCSGOMaps", path: $path) {
      id
      image_url
      name
    }
  }
`;

export const GET_CSGO_WEAPONS = gql`
  query GET_CSGO_WEAPONS($path: String!) {
    getCSGOWeapons @rest(type: "GetCSGOWeapons", path: $path) {
      id
      image_url
      kind
      name
      slug
      cost
    }
  }
`;

export const GET_CSGO_TOURNAMENTS = gql`
  query GET_CSGO_TOURNAMENTS($path: String!) {
    getCSGOTournaments @rest(type: "GetCSGOTournaments", path: $path) {
      begin_at
      id
      league
      league_id
      name
      serie
      serie_id
      teams
    }
  }
`;
