function checkTips() {
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
    }
  });
}
