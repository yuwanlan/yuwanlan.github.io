const axios = require('axios')
function exit() {
  axios.get('http://localhost:3000/get-md/exit')
}
exit();