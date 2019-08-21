import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import moment from "moment";
import { Query } from "react-apollo";
import {
  GET_LOL_SERIES,
  GET_LOL_TEAMS_SERIE,
  GET_LOL_UPCOMING_MATCHES,
  GET_LOL_PAST_MATCHES
} from "../../Queries";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from "react-accessible-accordion";
import "../../App.scss";

class IndividiualLoLLeague extends Component {
  render() {
    return (
      <div className="feed flex flex-col w-7/12 text-grey bg-gray-400 overflow-auto sm:w-10/12 md:w-10/12">
        <div
          className="title flex justify-left items-center mb-5 hover:text-green-400"
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          <i className="material-icons m-2 text-2xl font-bold">
            arrow_back_ios
          </i>
          <h1 className="m-2 text-2xl font-bold">
            League of Legends Esports League
          </h1>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col justify-center items-center w-full">
            <Query
              query={GET_LOL_SERIES}
              fetchPolicy="network-only"
              variables={{
                path: `/lol/series?filter[league_id]=${
                  this.props.match.params.league_id
                }&per_page=1&sort=-begin_at&token=${
                  serviceAccount.pandascore_key
                }`
              }}
            >
              {({ loading, data, error }) => {
                if (loading) return <h1>Loading...</h1>;
                const { getLOLSeries } = data;
                // console.log(getLOLSeries);
                return getLOLSeries.map((serie, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col justify-center items-center mb-5 w-full"
                    >
                      <div className="text-6xl md:text-xl sm:text-base xs:text-base bg-green-400 rounded-full px-2 shadow-lg font-bold mb-5">
                        {serie.description ? (
                          <h1>{serie.description}</h1>
                        ) : (
                          <h1>{serie.full_name}</h1>
                        )}
                      </div>
                      <Accordion allowZeroExpanded={true}>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton className="text-xl outline-none hover:bg-green-200 bg-green-400 rounded-full px-4 py-2 shadow-lg font-semibold">
                              Teams
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <div className="flex flex-wrap justify-center items-baseline">
                              <Query
                                query={GET_LOL_TEAMS_SERIE}
                                fetchPolicy="network-only"
                                variables={{
                                  path: `/lol/series/${
                                    serie.id
                                  }/teams?sort=name&token=${
                                    serviceAccount.pandascore_key
                                  }`
                                }}
                              >
                                {({ loading, data, error }) => {
                                  if (loading) return <></>;
                                  const { getLOLTeamsSerie } = data;
                                  // console.log(getLOLTeamsSerie);
                                  return getLOLTeamsSerie.map((team, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="flex flex-col justify-center items-center m-5 h-1/2 w-auto"
                                      >
                                        <Accordion allowZeroExpanded={true}>
                                          <AccordionItem>
                                            <AccordionItemHeading>
                                              <AccordionItemButton className="flex flex-col justify-center items-center p-2 bg-green-400 hover:bg-green-200 rounded-lg shadow-lg font-semibold">
                                                <img
                                                  src={team.image_url}
                                                  alt={serie.id}
                                                  className="h-auto w-20 mb-3"
                                                />
                                                <h1>{team.name}</h1>
                                              </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                              <div className="flex flex-wrap justify-center sm:text-lg text-base">
                                                {team.players.map(
                                                  (player, index) => {
                                                    return (
                                                      <div
                                                        key={index}
                                                        className="flex flex-col justify-center items-center h-full m-2 bg-green-600 rounded-lg p-2 shadow-lg font-semibold"
                                                      >
                                                        <div className="flex flex-col justify-end items-center h-24 w-24 bg-white rounded-full">
                                                          {player.image_url ? (
                                                            <img
                                                              src={
                                                                player.image_url
                                                              }
                                                              alt={player.slug}
                                                              className="h-20 w-auto mb-2 rounded-full"
                                                            />
                                                          ) : (
                                                            <img
                                                              src="https://socialmediaacademia.files.wordpress.com/2018/11/poggers.png"
                                                              alt="poggers"
                                                              className="h-20 w-auto mb-1 rounded-full"
                                                            />
                                                          )}
                                                        </div>
                                                        <h1 className="mb-1">
                                                          {player.name}
                                                        </h1>
                                                        <h1>
                                                          {player.hometown}
                                                        </h1>
                                                      </div>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            </AccordionItemPanel>
                                          </AccordionItem>
                                        </Accordion>
                                      </div>
                                    );
                                  });
                                }}
                              </Query>
                            </div>
                          </AccordionItemPanel>
                        </AccordionItem>
                      </Accordion>

                      <h1 className="mt-10 font-semibold bg-green-400 rounded-full py-2 px-4 shadow-md mb-4">
                        Upcoming Matches
                      </h1>
                      <div className="flex flex-col justify-center items-center lg:w-3/5 xl:w-3/5 md:w-11/12 sm:w-full">
                        <Query
                          query={GET_LOL_UPCOMING_MATCHES}
                          fetchPolicy="network-only"
                          variables={{
                            path: `/lol/matches/upcoming?filter[serie_id]=${
                              serie.id
                            }&per_page=5&sort=begin_at&token=${
                              serviceAccount.pandascore_key
                            }`
                          }}
                        >
                          {({ loading, data, error }) => {
                            if (loading) return <></>;
                            const { getLOLUpcomingMatches } = data;
                            console.log(getLOLUpcomingMatches);
                            return getLOLUpcomingMatches.map((match, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex flex-row items-center justify-around w-full mb-2 font-semibold bg-white rounded-lg shadow p-2"
                                >
                                  <div>
                                    <i className="fab fa-twitch hover:text-green-400" />
                                  </div>
                                  <div className="flex flex-col justify-center items-center sm:text-sm">
                                    <h1>
                                      {`${moment(match.begin_at).format(
                                        "ddd"
                                      )} ${moment(match.begin_at).format(
                                        "h:mm A"
                                      )}`}
                                    </h1>
                                    <h1>
                                      {moment(match.begin_at).format("MMM DD")}
                                    </h1>
                                  </div>
                                  <div className="flex flex-col justify-center items-center w-1/2">
                                    <div className="sm:text-sm">
                                      {match.name}
                                    </div>
                                    {match.opponents.length > 0 ? (
                                      <div className="flex justify-center items-center w-full">
                                        <img
                                          src={
                                            match.opponents[0].opponent
                                              .image_url
                                          }
                                          alt={
                                            match.opponents[0].opponent.acronym
                                          }
                                          className="h-auto w-10 mr-2"
                                        />
                                        <h1 className="mr-2">VS</h1>
                                        {match.opponenents && (
                                          <img
                                            src={
                                              match.opponents[1].opponent
                                                .image_url
                                            }
                                            alt={
                                              match.opponents[1].opponent
                                                .acronym
                                            }
                                            className="h-auto w-10"
                                          />
                                        )}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              );
                            });
                          }}
                        </Query>
                      </div>

                      <h1 className="mt-10 font-semibold bg-green-400 py-2 px-4 rounded-full shadow-md mb-4">
                        Past Matches
                      </h1>
                      <div className="flex flex-col justify-center items-center lg:w-3/5 xl:w-3/5 md:w-11/12 sm:w-full">
                        <Query
                          query={GET_LOL_PAST_MATCHES}
                          fetchPolicy="network-only"
                          variables={{
                            path: `/lol/matches/past?filter[serie_id]=${
                              serie.id
                            }&per_page=10&sort=-begin_at&token=${
                              serviceAccount.pandascore_key
                            }`
                          }}
                        >
                          {({ loading, data, error }) => {
                            if (loading) return <></>;
                            const { getLOLPastMatches } = data;
                            console.log(getLOLPastMatches);
                            return getLOLPastMatches.map((match, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex flex-row items-center justify-around w-full mb-2 font-semibold bg-white rounded-lg shadow p-2"
                                >
                                  <div className="flex flex-col justify-center items-center sm:text-sm mb-1">
                                    <h1>
                                      {`${moment(match.begin_at).format(
                                        "ddd"
                                      )}`}
                                    </h1>
                                    <h1>
                                      {moment(match.begin_at).format("MMM DD")}
                                    </h1>
                                  </div>
                                  <div className="flex flex-col justify-center items-center w-1/2 sm:w-3/5">
                                    <div className="sm:text-sm">
                                      {match.name}
                                    </div>
                                    {match.opponents.length > 0 ? (
                                      <div className="flex flex-col justify-around items-center w-full mb-1">
                                        <div className="flex justify-between items-center w-full">
                                          <div className="flex justify-center items-center">
                                            <img
                                              src={
                                                match.opponents[0].opponent
                                                  .image_url
                                              }
                                              alt={
                                                match.opponents[0].opponent
                                                  .acronym
                                              }
                                              className="h-auto w-10 mr-1"
                                            />
                                            <h1>
                                              {
                                                match.opponents[0].opponent
                                                  .acronym
                                              }
                                            </h1>
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
                                              src={
                                                match.opponents[1].opponent
                                                  .image_url
                                              }
                                              alt={
                                                match.opponents[1].opponent
                                                  .acronym
                                              }
                                              className="h-auto w-10 mr-1"
                                            />
                                            <h1>
                                              {
                                                match.opponents[1].opponent
                                                  .acronym
                                              }
                                            </h1>
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
                  );
                });
              }}
            </Query>
          </div>
        </div>
      </div>
    );
  }
}

export default IndividiualLoLLeague;
