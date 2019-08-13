import React from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_LOL_LEAGUES, GET_PAST_LOL_LEAGUE_MATCHES } from "../../Queries";

export default function() {
  return (
    <div>
      <Query
        query={GET_PAST_LOL_LEAGUE_MATCHES}
        fetchPolicy={"network-only"}
        variables={{
          path: `/leagues/289/matches/past?per_page=5&token=${
            serviceAccount.pandascore_key
          }`
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <h1>Loading...</h1>;
          const { pastLOLLeagueMatches } = data;
          console.log(data);
          return pastLOLLeagueMatches.map((match, index) => {
            let opponentIndex;
            match.winner.acronym !== match.opponents[0].opponent.acronym
              ? (opponentIndex = 0)
              : (opponentIndex = 1);
            return (
              <div
                key={index}
                className="flex flex-row justify-start items-center ml-24 w-2/3"
              >
                <div>{match.begin_at}</div>
                <div className="flex flex-col justify-center items-center mb-2">
                  <div className="flex flex-row justify-start items-center">
                    <a href={match.live_url} className="cursor-pointer mr-2">
                      <img
                        src={match.league.image_url}
                        alt="league"
                        className="h-5 w-5"
                      />
                    </a>
                    <h1 className="mr-2">
                      {match.league.name} {match.tournament.name}
                    </h1>
                  </div>
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="flex justify-center items-center">
                        <img
                          src={match.winner.image_url}
                          alt={match.winner.slug}
                          className="h-5 w-5 mr-2"
                        />
                        <h1>{match.winner.acronym}</h1>
                      </div>
                      <h1>{match.results[0].score}</h1>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="flex justify-center items-center">
                        <img
                          src={
                            match.opponents[opponentIndex].opponent.image_url
                          }
                          alt={match.opponents[opponentIndex].opponent.slug}
                          className="h-5 w-5 mr-2"
                        />
                        <h1>
                          {match.opponents[opponentIndex].opponent.acronym}
                        </h1>
                      </div>
                      <h1>{match.results[1].score}</h1>
                    </div>
                  </div>
                </div>
              </div>
            );
          });
        }}
      </Query>
    </div>
  );
}
