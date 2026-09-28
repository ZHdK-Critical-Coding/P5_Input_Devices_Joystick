# P5.js: Joystick

[English](readme.md)

Liest einen USB-Joystick über die WebHID-API aus und bewegt einen Kreis mit
den X/Y-Achsen. Ein kleines Quadrat leuchtet, solange ein Knopf gedrückt
ist. Ein Ausgangspunkt, um Gamecontroller oder andere HID-Geräte als Input
für einen Sketch zu verwenden.

## Installation

Voraussetzungen: ein USB-Joystick (HID-Gerät) und Chrome oder Edge (WebHID
gibt es in Firefox und Safari nicht).

1. Joystick anschliessen.
2. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
3. Auf **Connect Joystick** klicken und den Stick bewegen.

Der Sketch verwendet `navigator.hid.getDevices()`. Das liefert nur Geräte,
für die die Seite bereits eine Berechtigung hat – es öffnet keinen
Auswahldialog. Für den Dialog stattdessen `navigator.hid.requestDevice()`
verwenden.

Bibliotheken (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

## Coding-Hilfe

- **`sketch.js` → `connectJoystick()`**: öffnet alle HID-Geräte, auf die
  der Browser zugreifen kann, und registriert für jedes einen
  `oninputreport`-Handler. Dieser dekodiert die Rohdaten: Byte 0 ist der
  Knopfzustand, Bytes 1–2 und 3–4 ergeben die X- und Y-Werte. Dieses
  Byte-Layout gilt für den Joystick, für den das Beispiel geschrieben wurde –
  für andere Geräte anpassen.
- **Kalibrierung und Totzone**: Der erste Report jedes Geräts wird in
  `calibration` als Nullposition gespeichert. Werte innerhalb von ±10 zählen
  als 0, der Rest wird durch 10 geteilt. Die Ergebnisse landen in
  `device[id].x`, `.y` und `.button`.
- **`setup()`**: erstellt die Zeichenfläche und den Knopf **Connect
  Joystick**.
- **`draw()`**: rechnet `device[0].x/y` von −50…50 in Canvas-Koordinaten
  um, zeichnet den Kreis, schreibt die Werte und färbt das Knopf-Quadrat.
  Gezeichnet wird nur das erste Gerät; für mehrere über `device` loopen.
