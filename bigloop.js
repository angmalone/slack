function checkTips(callback) {
  axios.get("https://pumpbot-test.herokuapp.com/api/tips/random").then(res => {
    if (res.data[0] === undefined) {
      axios
        .get("https://pumpbot-test.herokuapp.com/api/tips/alreadyused")
        .then(res => {
          console.log(res.data.length);
          for (let i = 0; i < res.data.length; i++) {
            const _id = res.data[i]._id;

            axios.put(`https://pumpbot-test.herokuapp.com/api/tips/${_id}`, {
              beenUsed: false
            });
          }
        });
    } else {
      return false;
    }
  });
  callback();
}

function lilPump() {
  axios.get("https://pumpbot-test.herokuapp.com/api/tips/random").then(res => {
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

checkTips(lilPump);
