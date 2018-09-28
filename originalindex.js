const SlackBot = require("slackbots");
const schedule = require("node-schedule");
const axios = require("axios");

const bot = new SlackBot({
  token: "xoxb-424177423877-425400381830-UXQrg53NjASazBCO4V35ot11",
  name: "lil pump"
});

bot.on("start", () => {
  const params = {
    icon_emoji: ":bomb:"
  };

  bot.postMessageToChannel(
    "general",
    "there are THREE :v::skin-tone-4: types of ESSKEETIT",
    params
  );
});

bot.on("error", err => console.log(err));

bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }

  handleMessage(data.text);
});

//define how to call bot for manual post
function handleMessage(message) {
  if (message.includes("tip")) {
    checkTips();
  }

  //defining post time
  //currently set to 9am mon-fri

  /*var rule = new schedule.RecurrenceRule();

  rule.dayOfWeek = [0, new schedule.Range(1, 5)];
  rule.hour = 9;
  rule.minute = 00;

  schedule.scheduleJob(rule, function() {
    retrieveTip();
  });*/

  //defining what gets posted
  function checkTips() {
    axios
      .get("https://pumpbot-test.herokuapp.com/api/tips/random")
      .then(res => {
        if (res.data[0] === undefined) {
          axios
            .get("https://pumpbot-test.herokuapp.com/api/tips/alreadyused")
            .then(res => {
              console.log(res.data.length);
              for (let i = 0; i < res.data.length; i++) {
                const _id = res.data[i]._id;

                axios.put(
                  `https://pumpbot-test.herokuapp.com/api/tips/${_id}`,
                  {
                    beenUsed: false
                  }
                );
              }
            });
        }
      });
  }

  function retrieveTip() {
    axios
      .get("https://pumpbot-test.herokuapp.com/api/tips/random")
      .then(res => {
        console.log(res);
        const tip = res.data[0].tip;
        const _id = res.data[0]._id;

        axios.put(`https://pumpbot-test.herokuapp.com/api/tips/${_id}`, {
          beenUsed: true
        });

        const params = {
          icon_emoji: ":bomb:"
        };

        bot.postMessageToChannel("general", `Tip of the day: ${tip}`, params);
        console.log("hi");
      });
  }
}
