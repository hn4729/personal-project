import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_OWL_TOURNAMENT } from "../../Queries";

class OWLTournament extends Component {
  render() {
    return (
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12 mx-h-screen">
        <div className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">Overwatch Tournament</h1>
        </div>
        <div className="flex justify-center items-center w-full">
          <Query
            query={GET_OWL_TOURNAMENT}
            fetchPolicy={"network-only"}
            variables={{
              path: `/ow/tournaments?filter[id]=${
                this.props.match.params.tournament_id
              }&token=${serviceAccount.pandascore_key}`
            }}
          >
            {({ loading, data, error }) => {
              if (loading) return <h1>Loading...</h1>;
              const { getOWLTournament } = data;
              console.log(getOWLTournament);
              return <h1>Yo</h1>;
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default OWLTournament;
