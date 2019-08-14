import React, { Component } from "react";
import * as serviceAccount from "../../serviceAccount.json";
import { Query } from "react-apollo";
import { GET_LOL_CHAMPS_ONE, GET_LOL_CHAMPS_TWO } from "../../Queries";
import { connect } from "react-redux";
import { fetchChamps } from "../../redux/reducers/lolReducer";

class LoLChamps extends Component {
  render() {
    return (
      <div className="flex flex-col w-7/12 text-white bg-grey overflow-auto sm:w-10/12 md:w-10/12">
        <div className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">
            League of Legends Champions
          </h1>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <Query
            query={GET_LOL_CHAMPS_ONE}
            variables={{
              path: `/lol/champions?per_page=100&sort=name&token=${
                serviceAccount.pandascore_key
              }`
            }}
          >
            {({ loading, data, error }) => {
              if (loading) return <h1>Loading...</h1>;
              const { getLOLChampsOne } = data;
              return getLOLChampsOne.map((champ, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center"
                  >
                    <img src={champ.image_url} alt={champ.name} />
                    <h1>{champ.name}</h1>
                  </div>
                );
              });
            }}
          </Query>
          <Query
            query={GET_LOL_CHAMPS_TWO}
            variables={{
              path: `/lol/champions?per_page=100&page=2&sort=name&token=${
                serviceAccount.pandascore_key
              }`
            }}
          >
            {({ loading, data, error }) => {
              if (loading) return <></>;
              const { getLOLChampsTwo } = data;
              return getLOLChampsTwo.map((champ, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center"
                  >
                    <img src={champ.image_url} alt={champ.name} />
                    <h1>{champ.name}</h1>
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

function mapStateToProps(reduxState) {
  return {
    champs: reduxState.lol.champs
  };
}

export default connect(
  mapStateToProps,
  {
    fetchChamps
  }
)(LoLChamps);
