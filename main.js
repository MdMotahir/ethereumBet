Moralis.initialize("MpFDYllr1ZAq4dWNwiDIxOeS8nzkcYrfyjkiughu");
Moralis.serverURL = "https://pio6ydqplepq.usemoralis.com:2053/server";
// Moralis.initialize("yJ3cyLNc5MDkjwk9ULyU5jIrEOhchu1wC0lpKp9o"); // Application id from Moralis
// Moralis.serverURL = "https://sr9cz4ctcdxt.usemoralis.com:2053/server"; // Moralis server url

Moralis.onAccountChanged(async function (account) {
    const confirmed = confirm('Link this address to your account?');
    if (confirmed) {
      await Moralis.link(account);
      alert('Address added!');
    }
  });


const signInButton = document.getElementById('sign_button');
const BetAmount =  document.getElementById('buttom_modal');
const LogOutButton =  document.getElementById('move_button');
const trigger_button = document.getElementById('trigger-button');
const modal_body = document.getElementById('inner_html');
// const button_head = document.getElementById('button_left_head');
// const button_tail = document.getElementById('button_right_Tails');

async function login() {
    console.log("login")
    // console.log(user);
    // return
    try {
        currentUser = Moralis.User.current();
        if (!currentUser) {
            currentUser = await Moralis.Web3.authenticate();
        }
        console.log(currentUser)
        alert("User logged in")
        // document.getElementById("game").style.display = "block";
        // document.getElementById("login_button").style.display = "none";
        BetAmount.classList.remove("hidden");
        LogOutButton.classList.remove("hidden");
        signInButton.classList.add('hidden');
    } catch (error) {
        console.log(error);
    }
}

async function switchAddress() {
    try {
        const chainId = "0x1"; //Ethereum Mainnet
        const chainIdHex = await Moralis.Web3.switchNetwork(chainId); 
    } catch (error) {
        console.log(error);
    }
}

async function flip(side) {
    // console.log("flip")
    // return
    let amount = document.getElementById("amount").value;
    // console.log(amount)
    // return
    const ethers = Moralis.web3Library
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    let contractInstance = new ethers.Contract("0x931c7a37448aEBD7Ad7D1c2011Fe228867ae54Bf", window.abi, signer);
    const name = await contractInstance.flip(side == "heads" ? 0 : 1 , { value: ethers.utils.parseEther(`${amount}`), from: ethereum.selectedAddress });
    console.log(name)
}

async function getBalances() {
    const ethers = Moralis.web3Library
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    let contractInstance = new ethers.Contract("0x931c7a37448aEBD7Ad7D1c2011Fe228867ae54Bf", window.abi, signer);
    contractInstance.getBalance().then(function (result) {
        console.log("result---->", result);
        alert("Balance is " + result);
    })
}


async function logOut() {
    await Moralis.User.logOut();
    BetAmount.classList.add("hidden");
    LogOutButton.classList.add("hidden");
    signInButton.classList.remove('hidden');
    console.log("logged out");
}

document.getElementById("sign_in_button").onclick = login;
document.getElementById("move_button").onclick = logOut;
document.getElementById("balance").onclick = getBalances;
// document.getElementById("button_left_head").onclick = function () { flip("heads") };
document.getElementById("button_right_Tails").onclick = function () { flip("tails") };