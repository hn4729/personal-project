import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_PAST_OWL_LEAGUE_MATCHES_SIDEBAR } from "../../Queries";
import moment from "moment";

export default class OWSidebar extends Component {
  render() {
    return (
      <div className="flex flex-col justify-center items-center mb-2">
        <div className="flex flex-row justify-center items-center mb-3 font-semibold rounded-full bg-green-400 w-5/6 py-2 shadow-lg">
          <img
            src="https://icon-library.net/images/overwatch-icon-png/overwatch-icon-png-10.jpg"
            alt="OW"
            className="h-auto w-5 mr-2"
          />
          <h1>Overwatch</h1>
        </div>
        <Query
          query={GET_PAST_OWL_LEAGUE_MATCHES_SIDEBAR}
          fetchPolicy="network-only"
          errorPolicy="all"
          context
          variables={{
            path: `/leagues/${4135}/matches/past?per_page=5&sort=-begin_at`
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading...</h1>;
            const { pastOWLLeagueMatches } = data;
            // console.log(data);
            if (!pastOWLLeagueMatches) return <></>;
            return pastOWLLeagueMatches.map((match, index) => {
              let opponentIndex;
              match.winner &&
              match.winner.acronym !== match.opponents[0].opponent.acronym
                ? (opponentIndex = 0)
                : (opponentIndex = 1);
              const monthDayDate = moment(match.begin_at).format("MMM DD");
              const dayDate = moment(match.begin_at).format("ddd");
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center text-sm lg:w-full xl:w-11/12 font-semibold bg-white rounded-lg m-1 shadow py-1"
                >
                  <div className="flex flex-row justify-around items-center w-full">
                    <div className="flex flex-col h-full w-1/5">
                      <h1>{dayDate}</h1>
                      <h1>{monthDayDate}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center h-full w-3/4">
                      <div className="flex flex-row justify-start items-center w-full">
                        <a
                          href={match.live_url}
                          className="cursor-pointer mr-2"
                        >
                          <img
                            src={match.league.image_url}
                            alt="league"
                            className="h-auto w-5"
                          />
                        </a>
                        <h1 className="mr-2">
                          {match.league.name} {match.tournament.name}
                        </h1>
                      </div>
                      <div className="flex flex-col justify-center items-center w-full">
                        <div className="flex flex-row justify-center items-center w-full">
                          <div className="flex flex-row justify-between items-center w-full">
                            <div className="flex justify-center items-center">
                              {match.winner && (
                                <img
                                  src={match.winner.image_url}
                                  alt={match.winner.slug}
                                  className="h-auto w-5 mr-2"
                                />
                              )}
                              {match.winner && <h1>{match.winner.acronym}</h1>}
                            </div>
                            <h1>{match.results[0].score}</h1>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center w-full">
                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="flex justify-center items-center">
                            <img
                              src={
                                match.opponents[opponentIndex].opponent
                                  .image_url
                              }
                              alt={match.opponents[opponentIndex].opponent.slug}
                              className="h-auto w-5 mr-2"
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
                </div>
              );
            });
          }}
        </Query>
      </div>
    );
  }
}
