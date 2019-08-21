import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_OW_MAPS } from "../../Queries";
import "../../App.scss";

class OWMaps extends Component {
  render() {
    return (
      <div className="feed flex flex-col w-7/12 text-grey bg-gray-400 overflow-auto sm:w-10/12 md:w-10/12">
        <div className="title flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">Overwatch Maps</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <Query
            query={GET_OW_MAPS}
            variables={{
              path: `/ow/maps?per_page=100&sort=name&token=${
                serviceAccount.pandascore_key
              }`
            }}
          >
            {({ loading, error, data }) => {
              if (loading) return <h1>Loading...</h1>;
              const { getOWMaps } = data;
              console.log(getOWMaps);
              return getOWMaps.map((map, index) => {
                return (
                  <div
                    className="flex flex-col justify-center items-center m-2 bg-green-400 rounded-lg shadow-md p-2 font-semibold"
                    key={index}
                  >
                    <img
                      src={map.image_url}
                      alt={map.slug}
                      className="w-64 h-auto rounded-lg mb-2 shadow-md"
                    />
                    <h1>{map.game_mode}</h1>
                    <h1>{map.name}</h1>
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

export default OWMaps;
