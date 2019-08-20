import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_PAST_LOL_LEAGUE_MATCHES_SIDEBAR } from "../../Queries";
import moment from "moment";

export default class LoLSidebar extends Component {
  constructor() {
    super();
    this.state = {
      league_id: 4198
    };
  }
  render() {
    return (
      <div className="flex flex-col justify-center items-center mb-2">
        <div className="flex flex-row justify-center items-center mb-3">
          <img
            src="https://www.macupdate.com/images/icons256/47210.png"
            alt="LoL"
            className="h-auto w-5 mr-2"
          />
          <h1>League of Legends</h1>
        </div>
        <div className="flex flex-row justify-center items-center mb-3 bg-white rounded">
          <button
            className="bg-white text-grey px-2 rounded"
            onClick={() => {
              this.setState({ league_id: 4198 });
            }}
          >
            NA
          </button>
          <button
            className="bg-white text-grey px-2"
            onClick={() => {
              this.setState({ league_id: 4197 });
            }}
          >
            EU
          </button>
          <button
            className="bg-white text-grey px-2"
            onClick={() => {
              this.setState({ league_id: 293 });
            }}
          >
            LCK
          </button>
          <button
            className="bg-white text-grey px-2 rounded"
            onClick={() => {
              this.setState({ league_id: 294 });
            }}
          >
            LPL
          </button>
        </div>
        <Query
          query={GET_PAST_LOL_LEAGUE_MATCHES_SIDEBAR}
          fetchPolicy="network-only"
          errorPolicy="all"
          variables={{
            path: `/leagues/${
              this.state.league_id
            }/matches/past?per_page=5&sort=-begin_at`
          }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <img
                  src="https://66.media.tumblr.com/272c919c22e3122bced152a8487c1ad8/tumblr_o51rkmjmjp1ujw6zko1_400.gif"
                  alt="pepe"
                  className="h-40 w-auto"
                />
              );
            const { pastLOLLeagueMatches } = data;
            if (!pastLOLLeagueMatches) return <></>;
            return pastLOLLeagueMatches.map((match, index) => {
              let opponentIndex;
              match.winner.acronym !== match.opponents[0].opponent.acronym
                ? (opponentIndex = 0)
                : (opponentIndex = 1);
              const monthDayDate = moment(match.begin_at).format("MMM DD");
              const dayDate = moment(match.begin_at).format("ddd");
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center text-sm lg:w-full xl:w-11/12"
                >
                  <div className="flex flex-row justify-around items-center w-full">
                    <div className="flex flex-col h-full w-1/5">
                      <h1>{dayDate}</h1>
                      <h1>{monthDayDate}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center mb-2 h-full w-3/4">
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
                              <img
                                src={match.winner.image_url}
                                alt={match.winner.slug}
                                className="h-auto w-5 mr-2"
                              />
                              <h1>{match.winner.acronym}</h1>
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
