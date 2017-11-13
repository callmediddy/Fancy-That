const Bot = require('./lib/Bot')
const SOFA = require('sofa-js')
const Fiat = require('./lib/Fiat')
const moment = require('moment')

let bot = new Bot()
let todayDate = new Date()

// ROUTING

bot.onEvent = function(session, message) {
  switch (message.type) {
    case 'Init':
      session.set('count', 99)
      welcome(session)
      break
    case 'Message':
      onMessage(session, message)
      break
    case 'Command':
      onCommand(session, message)
      break
    case 'Payment':
      onPayment(session, message)
      break
    case 'PaymentRequest':
      welcome(session)
      break
  }
}

function onMessage(session, message) {
  //if message body contains the word beg, request a payment
    welcome(session)
}

function onCommand(session, command) {
  switch (command.content.value) {
    case 'flight':
      bookFlight(session)
      break
    case 'hotel':
      bookHotel(session)
      break
    case 'local':
      bookLocal(session)
      break
    case 'points':
      count(session)
      break
    case 'redeem':
      redeem(session)
      break
    case 'SFOD':
      session.set('origin', 'SFO')
      break
    case 'IGID':
      session.set('origin', 'IGI')
      break
    case 'LHRD':
      session.set('origin', 'LHR')
      break
    case 'PVDD':
      session.set('origin', 'PVD')
      break
    case 'SFOA':
      session.set('destination', 'SFO')
      break
    case 'IGIA':
      session.set('destination', 'IGI')
      break
    case 'LHRA':
      session.set('destination', 'LHR')
      break
    case 'PVDA':
      session.set('destination', 'PVD')
      break
    case 'today':
      session.set('flightdate', moment(todayDate).format('DD MMMM YYYY'))
      break
    case 'FC':
      session.set('seattype', 'First Class')
      break
    case 'BC':
      session.set('seattype', 'Business Class')
      break
    case 'PEC':
      session.set('seattype', 'Premium Economy Class')
      break
    case 'EC':
      session.set('seattype', 'Economy Class')
      break
    case 'book':
      finalMessage(session)
      break
    case 'bookabort':
      welcome(session)
      break
    case 'bookfinal':
      bookFlightFinal(session)

    }
}

function bookFlightFinal(session) {
  // request $1 USD at current exchange rates
  Fiat.fetch().then((toEth) => {
    session.requestEth(toEth.USD(session.get('flightcost')))
  })
}

function onPayment(session, message) {
  if (message.fromAddress == session.config.paymentAddress) {
    // handle payments sent by the bot
    if (message.status == 'confirmed') {
      // perform special action once the payment has been confirmed
      // on the network
    } else if (message.status == 'error') {
      // oops, something went wrong with a payment we tried to send!
    }
  } else {
    // handle payments sent to the bot
    if (message.status == 'unconfirmed') {
      // payment has been sent to the ethereum network, but is not yet confirmed
      let count = session.get('count');
      count = count + session.get('earnedFT');
      session.set('count', count);
      sendWelcomeMessage(session, 'Your payment has been sent and flight has been confirmed! You have earned ' + session.get('earnedFT') + ' points.\n\nFancy That!  💫')
    } else if (message.status == 'confirmed') {
      // handle when the payment is actually confirmed!
    } else if (message.status == 'error') {
      session.reply(`There was an error with your payment!🚫`);
    }
  }
}

// STATES

function welcome(session) {
  sendWelcomeMessage(session, `Hi 👋 Welcome to a new way of managing all your loyalty points under one roof ⛺

Booking flights ✈️, reserving hotels 🏩 and interacting with local entertainment 🍣 has never been easier.

Fancy that! 💫`)
}

function bookFlight(session) {
  sendOriginMessage(session, `Please select all details`)
  // sendOriginMessage(session, 'Select a Destination City')
}

function finalMessage(session) {
  var flightCost = Math.round(Math.random()*100)/100;
  var earnedPoints = Math.round(Math.random()*1000);
  session.set('flightcost', flightCost)
  session.set('earnedFT', earnedPoints)
  finalBookMessage(session, "You are about to book a " + session.get('seattype') + " seat on a flight from " + session.get('origin') + " to " + session.get('destination') + " on " + session.get('flightdate') + " for $" + session.get('flightcost') + ". You will earn " + session.get('earnedFT') + " FT Points.")
}

// example of how to store state on each user
function count(session) {
  let count = (session.get('count') || 0)
  // session.set('count', count)
  var rewards = ["Flight Seat Upgrade", "Hotel Room Upgrade", "Free round of shots at all Gordon Ramsay restaurants", "VIP Entry to any Justin Beiber Concert", "All expenses paid trip to Paris", "Foot Massage at Affinity Spas"]

  var output = "", sCount = count.toString();

  for(var i = 0, len = sCount.length; i < len; i += 1){
    if(sCount.charAt(i) == 0){
      output += "0️⃣"
    }
    else if (sCount.charAt(i) == 1) {
      output += "1️⃣"
    }
    else if (sCount.charAt(i) == 2) {
      output += "2️⃣"
    }
    else if (sCount.charAt(i) == 3) {
      output += "3️⃣"
    }
    else if (sCount.charAt(i) == 4) {
      output += "4️⃣"
    }
    else if (sCount.charAt(i) == 5) {
      output += "5️⃣"
    }
    else if (sCount.charAt(i) == 6) {
      output += "6️⃣"
    }
    else if (sCount.charAt(i) == 7) {
      output += "7️⃣"
    }
    else if (sCount.charAt(i) == 8) {
      output += "8️⃣"
    }
    else if (sCount.charAt(i) == 9) {
      output += "9️⃣"
    }
  }
  if(count < 100) {
    sendPointsMessage(session, `You have accrued ` + output + ' FT points! We will send you more information about how to redeem them when the time is right' + '\n\nFancy That! 💫')
  }
  else if (count < 1000) {
    sendPointsMessage(session, `You have accrued ` + output + ' FT points!' + '\n\n' + 'You are eligible for:\n' + '1. ' + rewards[Math.floor(Math.random()*rewards.length)] + '\n\nFancy That! 💫')
  }
  else if (count < 2000) {
    sendPointsMessage(session, `You have accrued ` + output + ' FT points!' + '\n\n' + 'You are eligible for:\n' + '1. ' + rewards[Math.floor(Math.random()*rewards.length)] + '\n2. ' + rewards[5] + '\n\nFancy That! 💫')
  }
  else {
    sendPointsMessage(session, 'You have accrued' + output + 'FT points! You are eligible for all rewards' + '\n\nFancy That! 💫')
  }
}

function redeem(session){
  var count = session.get('count');
  if(count == 0){
    session.reply("You don't have any FT points to redeem at the moment!")
  }
  else if (count < 100) {
    session.reply("You don't have enough FT points to redeem at the moment!")
  }
  else if(count >= 100) {
    count = 0;
    session.set('count', count);
    var OTPPhrase = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++)
      OTPPhrase += possible.charAt(Math.floor(Math.random() * possible.length));
    session.reply("You have redeemed your FT points. Please show this OTP to your vendor: " + OTPPhrase + "\n\nFancy That! 💫")
  }
}

// HELPERS

function sendWelcomeMessage(session, message) {
  let controls = [
    {type: 'button', label: 'Book Flight', value: 'flight'},
    {type: 'button', label: 'Reserve Hotel', value: 'hotel'},
    {type: 'button', label: 'Explore Local', value: 'local'},
    {type: 'button', label: 'View FT Points', value: 'points'}
  ]
  session.reply(SOFA.Message({
    body: message,
    controls: controls,
    showKeyboard: false,
  }))
}

function sendOriginMessage(session, message) {
  let controls = [
      {
        type: "group",
        label: "Origin City",
        controls: [
          {type: 'button', label: 'San Francisco', value: 'SFOD'},
          {type: 'button', label: 'New Delhi', value: 'IGID'},
          {type: 'button', label: 'London', value: 'LHRD'},
          {type: 'button', label: 'Shanghai', value: 'PVDD'}
        ]
      },
      {
        type: "group",
        label: "Destination City",
        controls: [
          {type: 'button', label: 'San Francisco', value: 'SFOA'},
          {type: 'button', label: 'New Delhi', value: 'IGIA'},
          {type: 'button', label: 'London', value: 'LHRA'},
          {type: 'button', label: 'Shanghai', value: 'PVDA'}
        ]
      },
      {
        type: "group",
        label: "Date",
        controls: [
          {type: 'button', label: 'Today', value: 'today'},
        ]
      },
      {
        type: "group",
        label: "Seat Type",
        controls: [
          {type: 'button', label: 'First', value: 'FC'},
          {type: 'button', label: 'Business', value: 'BC'},
          {type: 'button', label: 'Premium Economy', value: 'PEC'},
          {type: 'button', label: 'Economy', value: 'EC'}
        ]
      },
      {type: 'button', label: 'Book This Flight', value: 'book'},
      {type: 'button', label: 'Book New Flight', value: 'flight'},
      {type: 'button', label: 'Reserve Hotel', value: 'hotel'},
      {type: 'button', label: 'Explore Local', value: 'local'},
      {type: 'button', label: 'View FT Points', value: 'points'}
      ]

  session.reply(SOFA.Message({
    body: message,
    controls: controls,
    showKeyboard: false,
  }))
}

// function sendDestinationMessage(session, message) {
//   let controls = [
//     {type: 'button', label: 'San Francisco', value: 'SFOA'},
//     {type: 'button', label: 'New Delhi', value: 'IGIA'},
//     {type: 'button', label: 'London', value: 'LHRA'},
//     {type: 'button', label: 'Shanghai', value: 'PVDA'}
//   ]
//   session.reply(SOFA.Message({
//     body: message,
//     controls: controls,
//     showKeyboard: false,
//   }))
// }

function sendPointsMessage(session, message) {
  let controls = [
    {type: 'button', label: 'Redeem FT Points', value: 'redeem'},
    {type: 'button', label: 'Book Flight', value: 'flight'},
    {type: 'button', label: 'Reserve Hotel', value: 'hotel'},
    {type: 'button', label: 'Explore Local', value: 'local'},
    {type: 'button', label: 'View FT Points', value: 'points'}
  ]
  session.reply(SOFA.Message({
    body: message,
    controls: controls,
    showKeyboard: false,
  }))
}



function finalBookMessage(session, message) {
  let controls = [
    {type: 'button', label: 'Yes, Book!', value: 'bookfinal'},
    {type: 'button', label: 'No, Abort!', value: 'bookabort'},
  ]
  session.reply(SOFA.Message({
    body: message,
    controls: controls,
    showKeyboard: false,
  }))
}
