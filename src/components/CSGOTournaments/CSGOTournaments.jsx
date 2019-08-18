import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import {
  GET_CSGO_PAST_MATCHES,
  GET_CSGO_UPCOMING_MATCHES
} from "../../Queries";
import moment from "moment";

class CSGOTournaments extends Component {
  render() {
    return (
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12 mx-h-screen">
        <div className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">CS:GO Tournaments</h1>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col justify-center items-center lg:w-3/5 xl:w-3/5 md:w-11/12 sm:w-full">
            <Query
              query={GET_CSGO_UPCOMING_MATCHES}
              fetchPolicy="network-only"
              variables={{
                path: `/csgo/matches/upcoming?per_page=10&sort=begin_at&token=${
                  serviceAccount.pandascore_key
                }`
              }}
            >
              {({ loading, data, error }) => {
                if (loading) return <></>;
                const { getCSGOUpcomingMatches } = data;
                console.log(getCSGOUpcomingMatches);
                if (getCSGOUpcomingMatches.length < 1) {
                  return <></>;
                } else {
                  return (
                    <div className="flex flex-col justify-center items-center lg:w-3/5 xl:w-3/5 md:w-11/12 sm:w-full">
                      <h1>Upcoming Matches</h1>
                      {getCSGOUpcomingMatches.map((match, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-row items-center justify-around w-full mb-2"
                          >
                            <div>
                              <i className="fab fa-twitch" />
                            </div>
                            <div className="flex flex-col justify-center items-center sm:text-sm">
                              <h1>
                                {`${moment(match.begin_at).format(
                                  "ddd"
                                )} ${moment(match.begin_at).format("h:mm A")}`}
                              </h1>
                              <h1>{moment(match.begin_at).format("MMM DD")}</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center w-1/2">
                              <div className="sm:text-sm">{match.name}</div>
                              {match.opponents.length > 0 ? (
                                <div className="flex justify-center items-center w-full">
                                  <img
                                    src={match.opponents[0].opponent.image_url}
                                    alt="opponent-1"
                                    className="h-auto w-10 mr-2"
                                  />
                                  <h1 className="mr-2">VS</h1>
                                  <img
                                    src={match.opponents[1].opponent.image_url}
                                    alt="opponent-2"
                                    className="h-auto w-10"
                                  />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }
              }}
            </Query>
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col justify-center items-center lg:w-3/5 xl:w-3/5 md:w-11/12 sm:w-full">
            <Query
              query={GET_CSGO_PAST_MATCHES}
              fetchPolicy="network-only"
              variables={{
                path: `/csgo/matches/past?per_page=10&sort=-begin_at&token=${
                  serviceAccount.pandascore_key
                }`
              }}
            >
              {({ loading, data, error }) => {
                if (loading) return <h1>Loading...</h1>;
                const { getCSGOPastMatches } = data;
                console.log(getCSGOPastMatches);
                return getCSGOPastMatches.map((match, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row items-center justify-around w-full mb-3"
                    >
                      <div className="flex flex-col justify-center items-center sm:text-sm mb-1">
                        <h1>{`${moment(match.begin_at).format("ddd")}`}</h1>
                        <h1>{moment(match.begin_at).format("MMM DD")}</h1>
                      </div>
                      <div className="flex flex-col justify-center items-center w-1/2 sm:w-3/5">
                        <div className="sm:text-sm">{match.name}</div>
                        {match.opponents.length > 0 ? (
                          <div className="flex flex-col justify-around items-center w-full mb-1">
                            <div className="flex justify-between items-center w-full">
                              <div className="flex justify-center items-center">
                                <img
                                  src={match.opponents[0].opponent.image_url}
                                  alt={match.opponents[0].opponent.acronym}
                                  className="h-auto w-10 mr-1"
                                />
                                <h1>{match.opponents[0].opponent.acronym}</h1>
                              </div>
                              <div className="mr-5">
                                {match.opponents[0].opponent.id ===
                                match.results[0].team_id ? (
                                  <h1>{match.results[0].score}</h1>
                                ) : (
                                  <h1>{match.results[1].score}</h1>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                              <div className="flex justify-center items-center">
                                <img
                                  src={match.opponents[1].opponent.image_url}
                                  alt={match.opponents[1].opponent.acronym}
                                  className="h-auto w-10 mr-1"
                                />
                                <h1>{match.opponents[1].opponent.acronym}</h1>
                              </div>
                              <div className="mr-5">
                                {match.opponents[1].opponent.id ===
                                match.results[0].team_id ? (
                                  <h1>{match.results[0].score}</h1>
                                ) : (
                                  <h1>{match.results[1].score}</h1>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                });
              }}
            </Query>
          </div>
        </div>
        <div className="flex justify-center items-center" />
      </div>
    );
  }
}

export default CSGOTournaments;
