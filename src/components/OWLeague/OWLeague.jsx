import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_OWL_SERIES } from "../../Queries";
import "../../App.scss";

class OWLeague extends Component {
  render() {
    return (
      <div className="feed flex flex-col w-7/12 text-grey bg-gray-400 overflow-auto sm:w-10/12 md:w-10/12 mx-h-screen">
        <div className="title flex justify-left items-center mb-5">
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
                    <h1 className="mb-3 rounded-full bg-green-400 font-bold text-4xl py-2 px-4 shadow-lg">
                      {serie.full_name}
                    </h1>
                    {serie.tournaments.map((tournament, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col justify-center items-center mb-4 w-full"
                        >
                          <Link to={`/poggers/owl/${tournament.id}`}>
                            <button className="w-64 bg-green-400 hover:bg-green-200 font-semibold text-grey rounded-full shadow-md px-2 py-1 capitalize">
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
