const phidget22 = require("phidget22");
const SERVER_PORT = 5661;
const hostname = "127.0.0.1";

function main() {
  var conn = new phidget22.Connection(SERVER_PORT, hostname, {
    name: "Server Connection",
    passwd: ""
  });
  conn
    .connect()
    .then(runRudolph)
    .catch(function(err) {
      console.error("Rudolph has issues: ", err.message);
      process.exit(1);
    });
}

function runRudolph() {
  console.log("connected to rudolph");
  let eyes = new phidget22.LightSensor();
  let nose = new phidget22.DigitalOutput();
  nose.setHubPort(2);
  nose.setIsHubPortDevice(true);
  nose.open().then(eyes.open());

  eyes.onIlluminanceChange = function(illuminance) {
    let lightLevel = this.getIlluminance();
    if (lightLevel < 250) {
      console.log(lightLevel);
      nose.setState(true);
    } else {
      console.log(lightLevel);
      nose.setState(false);
    }
  };
}

main();
