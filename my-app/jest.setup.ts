import "@testing-library/jest-dom";
// jest.setup.js
import "whatwg-fetch";

// Polyfill Request and Response for Node environment
const { TextEncoder, TextDecoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.Request = Request;
global.Response = Response;
