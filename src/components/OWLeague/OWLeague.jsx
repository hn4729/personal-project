import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_OWL_SERIES } from "../../Queries";

class OWLeague extends Component {
  render() {
    return (
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12 mx-h-screen">
        <div className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">Overwatch League</h1>
        </div>
        <div className="flex justify-center items-center w-full">
          <Query
            query={GET_OWL_SERIES}
            variables={{
              path: `/ow/series?filter[league_id]=4135&filter[year]=2019&token=${
                serviceAccount.pandascore_key
              }`
            }}
          >
            {({ loading, error, data }) => {
              if (loading) return <h1>Loading...</h1>;
              const { getOWLSeries } = data;
              console.log(getOWLSeries);
              return getOWLSeries.map((serie, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center w-full"
                  >
                    <div className="flex justify-center items-center h-56">
                      <img
                        src={serie.league.image_url}
                        alt="OWL"
                        className="objet-contain"
                      />
                    </div>
                    <h1 className="mb-2">{serie.full_name}</h1>
                    {serie.tournaments.map((tournament, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col justify-center items-center mb-2"
                        >
                          <Link to={`/poggers/owl/${tournament.id}`}>
                            <button className="bg-white text-grey rounded-lg px-2 py-1 capitalize">
                              {tournament.name}
                            </button>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                );
              });
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default OWLeague;
