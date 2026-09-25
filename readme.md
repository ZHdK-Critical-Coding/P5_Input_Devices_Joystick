# P5 -> Joystick

A p5.js sketch that reads a USB joystick through the WebHID API and moves a
circle according to the X/Y axes. A small square shows the button state.

## How to Use

1. Connect a USB joystick (HID device).
2. Start Live Server (click **Go Live** in the VS Code status bar) and open
   the page in a browser that supports WebHID (Chrome or Edge).
3. Click **Connect Joystick**. The sketch uses `navigator.hid.getDevices()`,
   which only returns devices the page has already been granted access to;
   it does not show a device picker (`navigator.hid.requestDevice()`).
4. Move the joystick: the circle follows the stick, the text shows the X/Y
   values and the square turns green while a button is pressed.

## How it Works

Each HID input report is decoded byte by byte: byte 0 is the button state,
bytes 1–2 and 3–4 form the X and Y values. The byte layout is specific to
the joystick the example was written for and may need adjusting for other
devices. The first report is stored as calibration offset, values within
±10 of it are treated as 0 (deadzone), and the rest is divided by 10. Only
the first device (`device[0]`) is drawn.

## Libraries

- p5.js 1.10.0
- p5.sound 1.0.1 (included, not used)
