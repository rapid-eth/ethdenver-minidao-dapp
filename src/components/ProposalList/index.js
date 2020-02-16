import React, { Component } from "react";
import "./index.css"
import {formatEther} from "../../web3/web3Utils"
import TokenFormWrap from "../forms/TokenFormWrap"

class ProposalList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contractLoaded: false,
    };
  }
  

  componentDidMount = async () => {

  }

  componentDidUpdate = async () => {
    console.log(this.props)
  }


  render() {
    if (!this.props.propList) {
        return (<div></div>)
      }
    return (
        <TokenFormWrap title="MiniDAO Proposal List" helperText={'Proposal List'}>

      <div className="prop-list-div">
          <ul>
          {this.props.propList.map((m, idx) => (<li key={idx} >{m[2] + " - " +m[0]}</li>))}
          </ul>
      </div>
      </TokenFormWrap>)
    
  }


}

export default ProposalList;