// ===============================
// Joystick / HID Device Example
// ===============================

// Store connected devices and their states
let device = {};

// Store calibration values for each joystick
let calibration = {};

// ===============================
// Connect to joysticks using WebHID API
// ===============================
async function connectJoystick() {
  // Get all HID devices that the browser can access
  const devices = await navigator.hid.getDevices();
  console.log(devices)
  let joyId = 0; // Unique ID for each joystick

  // Iterate through all detected devices
  devices.forEach(d => {
    // Initialize device state object
    device[joyId] = { key: joyId };
    d.key = joyId; // store ID in device object

    // Open the device for communication
    d.open().then(() => {
      // Listen to input reports from the joystick
      d.oninputreport = (event) => {
        const { data } = event; // HID input data

        // Extract X and Y values from the data bytes
        const _x = (data.getUint8(1) + (256 * (data.getUint8(2) - 2)));
        const _y = (data.getUint8(3) + (256 * (data.getUint8(4) - 2)));

        // Initialize calibration values if not yet set
        calibration[d.key] = calibration[d.key] || { x: _y, y: _y };

        // Apply calibration offsets
        const _xCalib = _x - calibration[d.key].x;
        const _yCalib = _y - calibration[d.key].y;

        // Normalize axis values and apply deadzone (±10)
        device[d.key].x = Math.abs(_xCalib) < 10 ? 0 : _xCalib / 10;
        device[d.key].y = Math.abs(_yCalib) < 10 ? 0 : _yCalib / 10;

        // Store button state
        device[d.key].button = data.getUint8(0);
      };
    });

    joyId++; // increment joystick ID
  });
}

// ===============================
// p5.js setup function
// ===============================
function setup() {
  createCanvas(400, 400);          // small demo canvas
  textAlign(CENTER, CENTER);       // center text

  // Create a button to connect joystick(s)
  const button = createButton('Connect Joystick');
  button.mouseClicked(connectJoystick); // trigger connection on click
}

// ===============================
// p5.js draw function
// ===============================
function draw() {
  background(30); // dark background

  // Check if at least one device is connected
  if (device[0]) {
    // Map joystick X/Y axis values to canvas coordinates
    let px = map(device[0].x, -50, 50, 50, width - 50);
    let py = map(device[0].y, -50, 50, 50, height - 50);

    // Draw joystick position as a circle
    fill(100, 200, 255);
    ellipse(px, py, 40, 40);

    // Display X/Y axis values as text
    fill(255);
    text("Joystick X: " + device[0].x + "  Y: " + device[0].y, width / 2, 30);

    // Show button state as a square
    fill(device[0].button ? "lime" : "gray");
    rect(50, height - 60, 30, 30);
  }
}