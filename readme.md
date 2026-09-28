# P5.js: Joystick

[Deutsch](README_DE.md)

Reads a USB joystick through the WebHID API and moves a circle with the
X/Y axes. A small square lights up while a button is pressed. A starting
point for using game controllers or other HID devices as input for a sketch.

## Installation

Requirements: a USB joystick (HID device) and Chrome or Edge (WebHID is not
available in Firefox or Safari).

1. Connect the joystick.
2. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
3. Click **Connect Joystick** and move the stick.

The sketch uses `navigator.hid.getDevices()`, which only returns devices the
page has already been granted access to — it does not open a device picker.
To show the picker, use `navigator.hid.requestDevice()` instead.

Libraries (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (included, not used).

## Coding Help

- **`sketch.js` → `connectJoystick()`**: opens every HID device the browser
  can access and registers an `oninputreport` handler for each. The handler
  decodes the raw bytes: byte 0 is the button state, bytes 1–2 and 3–4 form
  the X and Y values. This byte layout is specific to the joystick the
  example was written for — adjust it for other devices.
- **Calibration and deadzone**: the first report of each device is stored
  in `calibration` as zero position. Values within ±10 of it count as 0,
  the rest is divided by 10. The results end up in `device[id].x`, `.y`
  and `.button`.
- **`setup()`**: creates the canvas and the **Connect Joystick** button.
- **`draw()`**: maps `device[0].x/y` from −50…50 to canvas coordinates,
  draws the circle, prints the values and colours the button square. Only
  the first device is drawn; loop over `device` to show more.
