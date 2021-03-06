import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_OW_HEROES } from "../../Queries";
import "../../App.scss";

class OWHeroes extends Component {
  render() {
    return (
      <div className="feed flex flex-col w-7/12 text-grey bg-gray-400 overflow-auto sm:w-10/12 md:w-10/12">
        <div className="title flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">Overwatch Heroes</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <Query
            query={GET_OW_HEROES}
            variables={{
              path: `/ow/heroes?per_page=100&sort=role&token=${
                serviceAccount.pandascore_key
              }`
            }}
          >
            {({ loading, error, data }) => {
              if (loading) return <h1>Loading...</h1>;
              const { getOWHeroes } = data;
              console.log(getOWHeroes);
              return getOWHeroes.map((hero, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center m-2 capitalize font-semibold bg-green-400 rounded-lg shadow-md py-2 px-2"
                  >
                    <img
                      src={hero.image_url}
                      alt={index}
                      className="mb-2 rounded-full bg-white shadow-md"
                    />
                    <h1>{hero.role}</h1>
                    <h1>{hero.name}</h1>
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

export default OWHeroes;
