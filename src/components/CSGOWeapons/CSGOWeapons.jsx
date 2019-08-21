import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_CSGO_WEAPONS } from "../../Queries";
import "../../App.scss";

class CSGOMaps extends Component {
  render() {
    return (
      <div className="feed flex flex-col w-7/12 text-grey bg-gray-400 overflow-auto sm:w-10/12 md:w-10/12">
        <div className="title flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">CS:GO Weapons</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <Query
            query={GET_CSGO_WEAPONS}
            variables={{
              path: `/csgo/weapons?per_page=100&sort=-kind&token=${
                serviceAccount.pandascore_key
              }`
            }}
          >
            {({ loading, error, data }) => {
              if (loading) return <h1>Loading...</h1>;
              const { getCSGOWeapons } = data;
              // console.log(getCSGOMaps);
              return getCSGOWeapons.map((weapon, index) => {
                return (
                  <div
                    className="flex flex-col justify-center items-center m-2 bg-green-400 rounded-lg shadow-md p-2 font-semibold"
                    key={index}
                  >
                    <img
                      src={weapon.image_url}
                      alt={weapon.slug}
                      className="w-40 h-auto rounded"
                    />
                    <h1>{weapon.name}</h1>
                    <h1>${weapon.cost}</h1>
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

export default CSGOMaps;
