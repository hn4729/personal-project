import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_LOL_SERIES, GET_LOL_TEAMS_SERIE } from "../../Queries";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from "react-accessible-accordion";

class IndividiualLoLLeague extends Component {
  render() {
    return (
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12">
        <div
          className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5"
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
                      className="flex flex-col justify-center items-center mb-5"
                    >
                      <div className="text-6xl">
                        {serie.description ? (
                          <h1>{serie.description}</h1>
                        ) : (
                          <h1>{serie.full_name}</h1>
                        )}
                      </div>
                      <Accordion allowZeroExpanded={true}>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton className="text-xl">
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
                                        className="flex flex-col justify-center items-center m-5"
                                      >
                                        <Accordion allowZeroExpanded={true}>
                                          <AccordionItem>
                                            <AccordionItemHeading>
                                              <AccordionItemButton className="flex flex-col justify-center items-center text-lg">
                                                <img
                                                  src={team.image_url}
                                                  alt={serie.id}
                                                  className="h-auto w-56"
                                                />
                                                <h1>{team.name}</h1>
                                              </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                              <div className="flex flex-wrap justify-start text-lg">
                                                {team.players.map(
                                                  (player, index) => {
                                                    return (
                                                      <div
                                                        key={index}
                                                        className="flex flex-col justify-center items-center h-full m-2"
                                                      >
                                                        <div className="flex flex-col justify-end items-center h-24 w-24 bg-white rounded-full">
                                                          {player.image_url ? (
                                                            <img
                                                              src={
                                                                player.image_url
                                                              }
                                                              alt={player.slug}
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
