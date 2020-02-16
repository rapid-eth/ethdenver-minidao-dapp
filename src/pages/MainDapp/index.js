import React, { Component } from "react";
import { MyWeb3Consumer } from "../../web3/EthersContext"
import { ethers } from 'ethers';
import getContracts from "../../web3/getContracts";
import InfoData from "../../components/InfoData"
import CreateProposal from "../../components/forms/CreateProposal"
import JoinForm from "../../components/forms/JoinForm"
import MemberList from "../../components/MemberList"
import ProposalList from "../../components/ProposalList"

import "./index.css"

class PropScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  setLoaded() {
    this.setState({
      contractLoaded: true
    })
  }

  render() {
    return (
      <div>
          <InfoData contract={this.props.contract} provider={this.props.provider}/>
          <JoinForm contract={this.props.contract} provider={this.props.provider} signer={this.props.signer}/>
          <CreateProposal contract={this.props.contract} provider={this.props.provider} signer={this.props.signer}/>
          <MemberList memberList={this.props.memberList} contract={this.props.contract} provider={this.props.provider}/>
          <ProposalList propList={this.props.proposalList} contract={this.props.contract} provider={this.props.provider}/>
        </div>
    );
  }
}



const Prop = (props) => (
  <MyWeb3Consumer>
    {({ loaded, networkId, signer, provider, miniDAOContract, memberList, proposalList }) => {
      if (!loaded) {
        return (<div>Loading form</div>)
      }
      return (
        <div>
          <PropScreen tokenAddress={props.pid} contract={miniDAOContract} networkId={networkId} signer={signer} provider={provider} memberList={memberList} proposalList={proposalList} />
        </div>
      )
    }}
  </MyWeb3Consumer>
);


export default Prop;