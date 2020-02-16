import React, { Component } from "react";
import { isHexAddress } from "../../../web3/web3Utils";
import TokenFormWrap from "../TokenFormWrap"
import verbiage from "../../../verbiage.json"

import "./index.css"
class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            isMember: false,
            metadata: null,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async componentDidMount() {
        let isMember = await this.props.contract.members(window.ethereum.selectedAddress)
        this.setState({ isMember });
    }

    handleChange(event) {

      
            this.setState({ [event.target.name]: event.target.value });
        
    }



    handleSubmit(event) {
        event.preventDefault();
        this.submitTransaction()
    }

    submitTransaction = async () => {
        const { metadata } = this.state
        try {
            await this.props.contract.submitProposal(metadata)
        } catch (err) {
            console.log(err)
            alert(err.toString())
        }

    };


    render() {
        return (
            <TokenFormWrap title="Submit Proposal" helperText={'PROPOSAL FORM'}>
                <form id={this.props.id} onSubmit={this.handleSubmit}>
                    {this.state.isMember ? <></> : <p><font color="dark-red">You are not a member, must join MiniDAO to submit a proposal</font>
                    </p>}

                    <label>Data:</label>
                    <br></br>
                    <input name="metadata" type="text" onChange={this.handleChange} />
                    <br></br>

                    <br></br>
                    <input type="submit" value="Submit" disabled={!this.state.isMember} />
                </form>
            </TokenFormWrap>
        );
    }
}
export default CreateForm;