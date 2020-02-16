import React, { Component } from "react";
import "./index.css"
import {formatEther} from "../../web3/web3Utils"
import TokenFormWrap from "../forms/TokenFormWrap"

class MemberList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contractLoaded: false,
      memberList: []
    };
  }

  

  componentDidMount = async () => {

  }


  render() {
    if (!this.props.memberList) {
        return (<div></div>)
      }
    return (
        <TokenFormWrap title="MiniDAO Member List" helperText={'Member List'}>

      <div className="member-list-div">
          <ul>
          {this.props.memberList.map((m, idx) => (<li key={idx} >{m}</li>))}
          </ul>
      </div>
      </TokenFormWrap>)
    
  }


}

export default MemberList;