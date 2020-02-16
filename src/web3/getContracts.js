
// import MiniDAORinkeby from "../contracts/rinkeby/ExampleCoin.json";

import MiniDAOLocal from "../contracts/local/MetaMiniDAO.json";

const getContracts = (networkId) => {
    let miniDAO;
    if (networkId === 4) {
        miniDAO = MiniDAOLocal
        miniDAO.address = MiniDAOLocal.networks[4].address
    }
    if (networkId === 5777) {
        miniDAO = MiniDAOLocal
        miniDAO.address = MiniDAOLocal.networks[5777].address
    }

    return { miniDAO }
}

export default getContracts;
