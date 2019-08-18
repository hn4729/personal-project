import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_CSGO_MAPS } from "../../Queries";

class CSGOMaps extends Component {
  render() {
    return (
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12">
        <div className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">CS:GO Maps</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <Query
            query={GET_CSGO_MAPS}
            variables={{
              path: `/csgo/maps?per_page=100&token=${
                serviceAccount.pandascore_key
              }`
            }}
          >
            {({ loading, error, data }) => {
              if (loading) return <h1>Loading...</h1>;
              const { getCSGOMaps } = data;
              // console.log(getCSGOMaps);
              return getCSGOMaps.map((map, index) => {
                return (
                  <div
                    className="flex flex-col justify-center items-center m-2"
                    key={index}
                  >
                    <img
                      src={map.image_url}
                      alt={map.id}
                      className="w-64 h-auto rounded"
                    />
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

export default CSGOMaps;
