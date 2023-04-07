const { exec } = require("child_process");

/* eslint-disable no-console */
exec(
  "docker network inspect rubin-obs-api_default",
  (error, stdout, stderr) => {
    if (error) console.log(-1);

    if (stderr) console.log(-1);

    console.log(JSON.parse(stdout)[0].IPAM.Config[0].Gateway);
  }
);
/* eslint-enable no-console */
