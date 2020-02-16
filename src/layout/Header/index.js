import React, { Component } from "react";
import { Link } from "@reach/router"
import "./index.css"


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }

  render() {
    return (
      <div>
        <header>
          <Link to="/"><img className="header-img" src="/ethcert.png" alt=""></img></Link>
          <div className="header-buttons">
            <Link className="header-link-item" to="/dapp">Dapp</Link>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
