import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_CSGO_TOURNAMENTS } from "../../Queries";

class CSGOTournaments extends Component {
  render() {
    return (
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12 mx-h-screen">
        <div className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">CS:GO Tournaments</h1>
        </div>
        <div className="flex justify-center items-center w-full">
          <Query
            query={GET_CSGO_TOURNAMENTS}
            fetchPolicy="network-only"
            variables={{
              path: `/csgo/tournaments/past?sort=-begin_at&per_page=5&token=${
                serviceAccount.pandascore_key
              }`
            }}
          >
            {({ loading, data, error }) => {
              if (loading) return <h1>Loading...</h1>;
              const { getCSGOTournaments } = data;
              console.log(getCSGOTournaments);
              return getCSGOTournaments.map((tournament, index) => {
                return (
                  <div key={index}>
                    <img
                      src={tournament.league.image_url}
                      alt={tournament.league.slug}
                    />
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
