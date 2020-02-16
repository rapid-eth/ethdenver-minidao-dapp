import React, { Component } from "react";
import { metaEthers } from "../../../web3/web3Utils";
import TokenFormWrap from "../TokenFormWrap"
import axios from "axios"
import DappFunderJSON from "../../../contracts/local/DappFunder.json";

import "./index.css"
class JoinForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMember: false,
            zeroBalance: false,
            metaTxCreated: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async componentDidMount() {

        console.log(this.props.signer, "ssssss")
        let isMember = await this.props.contract.members(window.ethereum.selectedAddress)
        this.setState({ isMember });


        let ms = new metaEthers.providers.MetaSigner(this.props.provider, window.ethereum.selectedAddress)
        let metaMiniContract = new metaEthers.MetaContract(this.props.contract.address, this.props.contract.interface, ms)
    

        // let metaMiniContract = this.props.contract.connectMeta(this.props.signer)
        this.setState({ metaMiniContract });

        let balanceBN = await this.props.provider.getBalance(window.ethereum.selectedAddress)
        if (balanceBN.eq(0)) {
            this.setState({ zeroBalance: true });

        }
        // let mtx = await metaMiniContract.join()
    }



    handleSubmit(event) {
        event.preventDefault();
        if (this.state.zeroBalance) {
            this.submitMetaTransaction()
        } else {
            this.submitTransaction()
        }
    }

    submitTransaction = async () => {
        try {
            await this.props.contract.join()


        } catch (err) {
            console.log(err)
            alert(err.toString())
        }

    };

    submitMetaTransaction = async () => {
        try {
            let raw = await this.state.metaMiniContract.join()
            console.log("raw metatx", raw)

            let lambadurl = "https://m2r4h61qui.execute-api.us-east-1.amazonaws.com/prod/ethdenver-dapp-signer"

            let data = await axios.post(lambadurl, { metaTx: raw})

            console.log("data from post", data)

            //Will not work if local...mock service with a hardcoded local key
            // let lambadurl2 = "https://m2r4h61qui.execute-api.us-east-1.amazonaws.com/prod/ethdenver-relay-pool"
            // let data2 = await axios.post(lambadurl2, { metaTx: raw, signature: data.data.signature})

            let sig = data.data.signature
            let localPK = "0x932f6f643544fbfb6ceb35bad28d9634aeda2289ff6554910916ab8285e352ea"
            let localMetaProxy = "0xd7834e2AB07e0241191f660594eD55f2d0e1C51A"
            let localRelayerWallet = new metaEthers.Wallet(localPK, this.props.provider)
            let localDappFunderContract = new metaEthers.Contract("0x49387C07038166071dedDd6fc9A4bb869A9f3b78", DappFunderJSON.abi, localRelayerWallet)

            // let dataToSign = await localDappFunderContract.encodeMetaTransction(localMetaProxy, mtx)
            // console.log("dataToSign",dataToSign)
            let abiMTX = await localDappFunderContract.abiEncodeMetaTransction(localMetaProxy, raw)
            console.log("abiMTX",abiMTX)
            let x = await localDappFunderContract.interface.functions.executeMetaTransaction.encode([abiMTX, sig])
            console.log(x)

            this.setState({ metaTxCreated: true, signature: sig, raw: abiMTX });
            
            // let data2 = await axios.post('localhost:7545', {"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[x],"id":1})
            // console.log(data2)
        } catch (err) {
            console.log(err)
            alert(err.toString())
        }

    };


    render() {
        return (
            <TokenFormWrap title="Join MiniDAO" helperText={'Join FORM'}>
                <form id={this.props.id} onSubmit={this.handleSubmit}>
                    {this.state.isMember ?  <p>>You are already a member - good job</p> :<></>}
                    <br></br>
                    {this.state.metaTxCreated ?  
                    <div>
                        <p>{this.state.signature} {this.state.raw}</p> 
                        </div>:<></>}

                    <input type="submit" value="Join!" disabled={this.state.isMember} />
                </form>
            </TokenFormWrap>
        );
    }
}
export default JoinForm;