/**
 * @jest-environment node
 */
import { POST as LoginPOST } from "@/app/api/login/route";

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn((name: string) => {
      if (name === "appwrite-session") {
        return { name: "appwrite-session", value: "eyJpZCI6IjY5MmUwNGIyMDAxN2UxYzVkYTMwIiwic2VjcmV0IjoiZmY5ODkzZjQ1MDc5ZGFhNmQ2M2I0OGQ3ODVmNWU3NmQwMTQzOGE1NTNkYzM4ZmMyYjU0Y2I2OGM5YzQwMjkwYzJlOTI1MTNkYThlN2I0MGIxMjU2Y2Y3ODMzODg0N2UyZjQ4YjVkY2VmNTk3ZmQ2MTVlNDQ1Yjc2MGMwZTI5MTY1ZmU0ZWIzOWYzZWIyNGVmZWMxNjM0NzY2ZjQzOWMxZDQwNzZhNThlYzBjMGI3ZGQ0ODcxMDVhM2FjOTViODAyOWJiZjIyZmQxY2IzZTVlNDkxNzk2ZDViMjZhMTA4NmU4NDBmZjBhY2M4ZjQwNzQ4NDAyZTI4ODU4OTdmYmQ2OCJ9" }; // Provide a default mocked session value
      }
      return undefined; // Or handle other cookies as needed
    }),
    set: jest.fn(),
  })),
}));

describe("/api/login", () => {
  it("should log in and set the authentication cookie", async () => {
    const loginReq = new Request("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({
        // Use the same email as the signed-up user for login
        email: "alwx2021@mail.ru",
        password: "Ganner1203!",
      }),
    });
    const loginRes = await LoginPOST(loginReq);
    const data = await loginRes.json();

    expect(loginRes.status).toBe(200);
    expect(data.user).toBeDefined();

    // Check if set-cookie header is present
    const setCookieHeader = loginRes.headers.get("set-cookie");
    expect(setCookieHeader).toBeDefined();

    // Extract the auth token (you might need to parse the set-cookie header)
    const authToken = setCookieHeader;
    console.log("Auth Token:", authToken);
  });
});
