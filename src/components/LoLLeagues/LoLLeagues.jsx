import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_LOL_LEAGUES } from "../../Queries";
import { Link } from "react-router-dom";

class LoLLeagues extends Component {
  render() {
    return (
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12 mx-h-screen">
        <div className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">
            League of Legends Esports Leagues
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-center items-baseline w-3/4">
            <Query
              query={GET_LOL_LEAGUES}
              variables={{
                path: `/lol/leagues?filter[id]=4198,4197,293,294,1003,302,4199,301,2092,297&sort=name&token=${
                  serviceAccount.pandascore_key
                }`
              }}
            >
              {({ loading, data, error }) => {
                if (loading) return <h1>Loading...</h1>;
                const { getLOLLeagues } = data;
                console.log(getLOLLeagues);
                return getLOLLeagues.map((league, index) => {
                  return (
                    <Link
                      to={`/poggers/lol/leagues/${league.id}`}
                      key={index}
                      className="flex flex-col justify-center items-center m-5"
                    >
                      <img
                        src={league.image_url}
                        alt={league.slug}
                        className="h-auto w-56"
                      />
                      <h1>{league.name}</h1>
                    </Link>
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

export default LoLLeagues;
