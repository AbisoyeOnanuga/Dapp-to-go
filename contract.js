//connect metamask to our site. Get the user's address
var account = null;
var contract = null;
const ABI = [{"name":"EventCreated","inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"uint256","name":"eventId","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"VipticketPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"SilverticketPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"eventDate","type":"uint256"}],"type":"event"},{"name":"TicketBought","inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"string","name":"category","type":"string"},{"indexed":false,"internalType":"uint256","name":"ticketPrice","type":"uint256"}],"type":"event"},{"name":"addEvent","inputs":[{"internalType":"uint256","name":"_numVipTickets","type":"uint256"},{"internalType":"uint256","name":"_numSilverTickets","type":"uint256"},{"internalType":"uint256","name":"_vipTicketPrice","type":"uint256"},{"internalType":"uint256","name":"_silverTicketPrice","type":"uint256"},{"internalType":"string","name":"_eventName","type":"string"},{"internalType":"uint256","name":"_eventDate","type":"uint256"},{"internalType":"string","name":"_eventVenue","type":"string"}],"type":"function","stateMutability":"nonpayable"},{"name":"buyTicket","inputs":[{"internalType":"uint256","name":"_eventId","type":"uint256"},{"internalType":"string","name":"_category","type":"string"}],"type":"function","stateMutability"
:"payable"},{"name":"events","inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"outputs":[{"internalType":"uint256","name":"eventId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"numVipTickets","type":"uint256"},{"internalType":"uint256","name":"numSilverTickets","type":"uint256"},{"internalType":"uint256","name":"vipTicketPrice","type":"uint256"},{"internalType":"uint256","name":"silverTicketPrice","type":"uint256"},{"internalType":"uint256","name":"vipSold","type":"uint256"},{"internalType":"uint256","name":"silverSold","type":"uint256"},{"internalType":"uint256","name":"sellingDuration","type":"uint256"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"eventDate","type":"uint256"},{"internalType":"string","name":"eventVenue","type":"string"}],"type":"function","stateMutability":"view"},{"name":"getAllEvents","outputs":[{"components":[{"internalType":"uint256","name":"eventId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"numVipTickets","type":"uint256"},{"internalType":"uint256","name":"numSilverTickets","type":"uint256"},{"internalType":"uint256","name":"vipTicketPrice","type":"uint256"},{"internalType":"uint256","name":"silverTicketPrice","type":"uint256"},{"internalType":"uint256","name":"vipSold","type":"uint256"},{"internalType":"uint256","name":"silverSold","type":"uint256"},{"internalType":"uint256","name":"sellingDuration","type"
:"uint256"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"eventDate","type":"uint256"},{"internalType":"string","name":"eventVenue","type":"string"},{"components":[{"internalType":"uint256","name":"ticketId","type":"uint256"},{"internalType":"bool","name":"isSold","type":"bool"},{"internalType":"uint256","name":"eventId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"eventDate","type":"uint256"},{"internalType":"string","name":"eventVenue","type":"string"}],"internalType":"struct Ticketing.Ticket[]","name":"vipTickets","type":"tuple[]"},{"components":[{"internalType":"uint256","name":"ticketId","type":"uint256"},{"internalType":"bool","name":"isSold","type":"bool"},{"internalType":"uint256","name":"eventId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"eventDate","type":"uint256"},{"internalType":"string","name":"eventVenue","type":"string"}],"internalType":"struct Ticketing.Ticket[]","name":"silverTickets","type":"tuple[]"}],"internalType":"struct Ticketing.Event[]","name":"","type":"tuple[]"}],"type":"function","stateMutability":"view"},{"name":"getEvent","inputs":[{"internalType":"uint256","name":"_eventId","type"
:"uint256"}],"outputs":[{"internalType":"address","name":"eventOwner","type":"address"},{"internalType":"uint256","name":"eventId","type":"uint256"},{"internalType":"uint256","name":"numVipTickets","type":"uint256"},{"internalType":"uint256","name":"numSilverTickets","type":"uint256"},{"internalType":"uint256","name":"vipSold","type":"uint256"},{"internalType":"uint256","name":"silverSold","type":"uint256"},{"internalType":"uint256","name":"sellingDuration","type":"uint256"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"string","name":"_eventVenue","type":"string"},{"internalType":"uint256","name":"eventDate","type":"uint256"},{"components":[{"internalType":"uint256","name":"ticketId","type":"uint256"},{"internalType":"bool","name":"isSold","type":"bool"},{"internalType":"uint256","name":"eventId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"eventDate","type":"uint256"},{"internalType":"string","name":"eventVenue","type":"string"}],"internalType":"struct Ticketing.Ticket[]","name":"vipTickets","type":"tuple[]"},{"components":[{"internalType":"uint256","name":"ticketId","type":"uint256"},{"internalType":"bool","name":"isSold","type":"bool"},{"internalType":"uint256","name":"eventId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"category","type":"string"},
{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"eventDate","type":"uint256"},{"internalType":"string","name":"eventVenue","type":"string"}],"internalType":"struct Ticketing.Ticket[]","name":"silverTickets","type":"tuple[]"}],"type":"function","stateMutability":"view"},{"name":"myEventCount","inputs":[{"internalType":"address","name":"","type":"address"}],"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","stateMutability":"view"},{"name":"myEvents","inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"outputs":[{"internalType":"uint256","name":"eventId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"numVipTickets","type":"uint256"},{"internalType":"uint256","name":"numSilverTickets","type":"uint256"},{"internalType":"uint256","name":"vipTicketPrice","type":"uint256"},{"internalType":"uint256","name":"silverTicketPrice","type":"uint256"},{"internalType":"uint256","name":"vipSold","type":"uint256"},{"internalType":"uint256","name":"silverSold","type":"uint256"},{"internalType":"uint256","name":"sellingDuration","type":"uint256"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"eventDate","type":"uint256"},{"internalType":"string","name":"eventVenue","type":"string"}],"type":"function","stateMutability":"view"},{"name":"myOrders","inputs":[{"internalType":"address","name":"","type":"address"},
{"internalType":"uint256","name":"","type":"uint256"}],"outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"components":[{"internalType":"uint256","name":"ticketId","type":"uint256"},{"internalType":"bool","name":"isSold","type":"bool"},{"internalType":"uint256","name":"eventId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"category","type":"string"},{"internalType":"string","name":"eventName","type":"string"},{"internalType":"uint256","name":"eventDate","type":"uint256"},{"internalType":"string","name":"eventVenue","type":"string"}],"internalType":"struct Ticketing.Ticket","name":"ticket","type":"tuple"}],"type":"function","stateMutability":"view"},{"name":"numEvents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","stateMutability":"view"},{"name":"orderCount","inputs":[{"internalType":"address","name":"","type":"address"}],"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","stateMutability":"view"},{"name":"tickets_counter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"type":"function","stateMutability":"view"}];
const ADDRESS = "0xc05891bb7B901a623889FDBe6b48e9E734D1BD81";
(async () => {
    if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);

        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
        document.getElementById('wallet-address').textContent = account;

        contract = new web3.eth.Contract(ABI, ADDRESS);
        updateCurrentCount();
        document.getElementById('increase-count').onclick = () => {
            increaseCurrentCount();
        }
    }
})();

//deploy the bytecode

const deploy = async (abi, bytecode) => {
    var deployingContract = new web3.eth.Contract(abi).deploy({
        data: bytecode,
        arguments: []
    });
    var estimatedGas = await deployingContract.estimateGas();

    var deployedContract = await deployingContract.send({
        from: account,
        gas: estimatedGas
    })

    console.log('Address of Contract - ' + deployedContract.options.address);

    return deployedContract.options.address;
};

//interact with the contract

const updateCurrentCount = async () => {
    if (contract) {
        var count = contract.methods.count().call();
        console.log('value of count is' + count);
        document.getElementById('current-count').textContent = count;
    }
}

const increaseCurrentCount = async () => {
    if (contract) {
        var transaction = await contract.methods.increment().send({ from: account })
        window.location.reload();
    }

}