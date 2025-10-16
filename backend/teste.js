const axios = require("axios");

(async () => {
  try {
    const res = await axios.get(
      "http://20.220.27.106:8666/STH/v1/contextEntities/type/Munhequeira/id/urn:ngsi-ld:Munhequeira:001/attributes/temperatura?lastN=10",
      {
        headers: {
          "Fiware-Service": "smart",
          "Fiware-ServicePath": "/",
        },
        timeout: 5000
      }
    );
    console.log(res.data);
  } catch (err) {
    console.error(err.message);
  }
})();
