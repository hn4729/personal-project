import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_LEAGUE_SERIES } from "../../Queries";

class LoLLeagues extends Component {
  constructor() {
    super();
    this.state = {
      league_id: 4198
    };
  }
  render() {
    return (
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12">
        <div className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">
            League of Legends Esports Leagues
          </h1>
        </div>
      </div>
    );
  }
}

export default LoLLeagues;
