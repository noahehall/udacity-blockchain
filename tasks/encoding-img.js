import { readFileSync, writeFileSync } from "fs";

const imgReadBuffer = readFileSync(new URL("./avatar.png", import.meta.url));
const imgHexEncode = new Buffer(imgReadBuffer).toString("hex");

const imgHexDecode = new Buffer(imgHexEncode, "hex");
writeFileSync(new URL("./avatar.hex.png", import.meta.url), imgHexDecode);

console.info(imgHexEncode);
