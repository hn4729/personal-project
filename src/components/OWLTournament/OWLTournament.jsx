import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import axios from "axios";
import moment from "moment";
import { Query } from "react-apollo";
import {
  GET_OWL_TOURNAMENT,
  GET_OWL_UPCOMING_MATCHES,
  GET_OWL_PAST_MATCHES
} from "../../Queries";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from "react-accessible-accordion";
import "../../App.scss";

class OWLTournament extends Component {
  constructor() {
    super();
    this.state = {
      teams: []
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://api.pandascore.co/ow/teams?filter[id]=1544,1545,1546,1547,1548,1549,1550,1551,1552,1553,1554,1555,3432,3433,3434,3435,3436,3437,3438,3439&token=${
          serviceAccount.pandascore_key
        }`
      )
      .then(res => {
        this.setState({ teams: res.data });
        // console.log(this.state);
      });
  }
  render() {
    return (
      <div className="feed flex flex-col w-7/12 text-grey bg-gray-400 overflow-auto sm:w-10/12 md:w-10/12 mx-h-screen">
        <div
          className="title flex justify-left items-center mb-5"
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          <i className="material-icons m-2 text-2xl font-bold">
            arrow_back_ios
          </i>
          <h1 className="m-2 text-2xl font-bold">Overwatch Tournament</h1>
        </div>
        <div className="flex justify-center items-center w-full">
          <Query
            query={GET_OWL_TOURNAMENT}
            fetchPolicy={"network-only"}
            variables={{
              path: `/ow/tournaments?filter[id]=${
                this.props.match.params.tournament_id
              }&token=${serviceAccount.pandascore_key}`
            }}
          >
            {({ loading, data, error }) => {
              if (loading) return <h1>Loading...</h1>;
              const { getOWLTournament } = data;
              console.log(getOWLTournament);
              const tournament = getOWLTournament[0];
              return (
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="flex justify-center items-center h-56">
                    <img
                      src={tournament.league.image_url}
                      alt="OWL"
                      className="objet-contain"
                    />
                  </div>
                  <div className="capitalize text-4xl sm:text-2xl">
                    {tournament.name}
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <Accordion allowZeroExpanded={true}>
                      <AccordionItem>
                        <AccordionItemHeading>
                          <AccordionItemButton className="text-xl outline-none">
                            Teams
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <div className="flex flex-wrap justify-center items-baseline">
                            {tournament.teams.map((team, index) => {
                              return (
                                <div
                                  className="flex flex-col justify-center items-center m-2"
                                  key={index}
                                >
                                  <Accordion allowZeroExpanded={true}>
                                    <AccordionItem>
                                      <AccordionItemHeading>
                                        <AccordionItemButton className="flex flex-col justify-center items-center">
                                          <img
                                            src={team.image_url}
                                            alt={team.id}
                                            className="h-auto w-20 mb-3"
                                          />
                                          <h1>{team.name}</h1>
                                        </AccordionItemButton>
                                      </AccordionItemHeading>
                                      <AccordionItemPanel>
                                        {this.state.teams.length > 0
                                          ? this.state.teams
                                              .filter(
                                                OWLTeam =>
                                                  OWLTeam.id === team.id
                                              )
                                              .map((t, index) => {
                                                return (
                                                  <div
                                                    key={index}
                                                    className="flex flex-wrap justify-center text-base"
                                                  >
                                                    {t.players.map(player => {
                                                      return (
                                                        <div
                                                          key={player.id}
                                                          className="flex flex-col justify-center items-center h-full m-2"
                                                        >
                                                          <div className="flex flex-col justify-end items-center h-24 w-24 bg-white rounded-full">
                                                            {player.image_url ? (
                                                              <img
                                                                src={
                                                                  player.image_url
                                                                }
                                                                alt={
                                                                  player.slug
                                                                }
                                                                className="h-20 w-auto mb-1 rounded-full"
                                                              />
                                                            ) : (
                                                              <img
                                                                src="https://socialmediaacademia.files.wordpress.com/2018/11/poggers.png"
                                                                alt="poggers"
                                                                className="h-20 w-auto mb-1 rounded-full"
                                                              />
                                                            )}
                                                          </div>
                                                          <h1 className="mb-1 capitalize">
                                                            {player.role}
                                                          </h1>
                                                          <h1 className="mb-1">
                                                            {player.name}
                                                          </h1>
                                                          <h1>
                                                            {player.hometown}
                                                          </h1>
                                                        </div>
                                                      );
                                                    })}
                                                  </div>
                                                );
                                              })
                                          : null}
                                      </AccordionItemPanel>
                                    </AccordionItem>
                                  </Accordion>
                                </div>
                              );
                            })}
                          </div>
                        </AccordionItemPanel>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <Query
                    query={GET_OWL_UPCOMING_MATCHES}
                    fetchPolicy="network-only"
                    variables={{
                      path: `/ow/matches/upcoming?per_page=5&filter[tournament_id]=${
                        tournament.id
                      }&token=${serviceAccount.pandascore_key}`
                    }}
                  >
                    {({ loading, data, error }) => {
                      if (loading) return <></>;
                      const { getOWLUpcomingMatches } = data;
                      if (getOWLUpcomingMatches.length < 1) {
                        return <></>;
                      } else {
                        return (
                          <div className="flex flex-col justify-center items-center lg:w-3/5 xl:w-3/5 md:w-11/12 sm:w-full">
                            <h1>Upcoming Matches</h1>
                            {getOWLUpcomingMatches.map((match, index) => {
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
                                        <img
                                          src={
                                            match.opponents[1].opponent
                                              .image_url
                                          }
                                          alt={
                                            match.opponents[1].opponent.acronym
                                          }
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

                  <h1 className="mt-10">Past Matches</h1>
                  <div className="flex flex-col justify-center items-center lg:w-3/5 xl:w-3/5 md:w-11/12 sm:w-full">
                    <Query
                      query={GET_OWL_PAST_MATCHES}
                      fetchPolicy="network-only"
                      variables={{
                        path: `/ow/matches/past?per_page=10&filter[tournament_id]=${
                          tournament.id
                        }&token=${serviceAccount.pandascore_key}`
                      }}
                    >
                      {({ loading, data, error }) => {
                        if (loading) return <></>;
                        const { getOWLPastMatches } = data;
                        console.log(getOWLPastMatches);
                        return getOWLPastMatches.map((match, index) => {
                          return (
                            <div
                              key={index}
                              className="flex flex-row items-center justify-around w-full mb-3"
                            >
                              <div className="flex flex-col justify-center items-center sm:text-sm mb-1">
                                <h1>
                                  {`${moment(match.begin_at).format("ddd")}`}
                                </h1>
                                <h1>
                                  {moment(match.begin_at).format("MMM DD")}
                                </h1>
                              </div>
                              <div className="flex flex-col justify-center items-center w-1/2 sm:w-3/5">
                                <div className="sm:text-sm">{match.name}</div>
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
                                            match.opponents[0].opponent.acronym
                                          }
                                          className="h-auto w-10 mr-1"
                                        />
                                        <h1>
                                          {match.opponents[0].opponent.acronym}
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
                                            match.opponents[1].opponent.acronym
                                          }
                                          className="h-auto w-10 mr-1"
                                        />
                                        <h1>
                                          {match.opponents[1].opponent.acronym}
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
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default OWLTournament;
