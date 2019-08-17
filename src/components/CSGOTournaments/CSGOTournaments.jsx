import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_CSGO_SERIES } from "../../Queries";

class CSGOTournaments extends Component {
  render() {
    return (
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12 mx-h-screen">
        <div className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">CS:GO Tournaments</h1>
        </div>
        <div className="flex justify-center items-center w-full">
          <Query
            query={GET_CSGO_SERIES}
            fetchPolicy="network-only"
            variables={{
              path: `/csgo/series/running?sort=-begin_at&per_page=10&token=${
                serviceAccount.pandascore_key
              }`
            }}
          >
            {({ loading, data, error }) => {
              if (loading) return <h1>Loading...</h1>;
              const { getCSGOSeries } = data;
              console.log(getCSGOSeries);
              return getCSGOSeries.map((serie, index) => {
                return (
                  <div key={index}>
                    <img src={serie.league.image_url} alt={serie.league.slug} />
                  </div>
                );
              });
            }}
          </Query>
        </div>
        <div className="flex justify-center items-center" />
      </div>
    );
  }
}

export default CSGOTournaments;
