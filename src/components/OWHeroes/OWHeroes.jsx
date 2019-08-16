import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_OW_HEROES } from "../../Queries";

class OWHeroes extends Component {
  render() {
    return (
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12">
        <div className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">Overwatch Heroes</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <Query
            query={GET_OW_HEROES}
            variables={{
              path: `/ow/heroes?per_page=100&sort=name&token=${
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
                  <div className="flex flex-col justify-center items-center m-2">
                    <img src={hero.image_url} alt={index} />
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
