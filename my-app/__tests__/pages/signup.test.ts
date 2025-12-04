/**
 * @jest-environment node
 */
import { POST as SignupPOST } from "@/app/api/signup/route";

describe("/api/signup", () => {
  it("should sign up a new user", async () => {
    const signupReq = new Request("http://localhost:3000/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: `test${Date.now()}@example.com`, // Ensure unique email for each test
        password: "password123",
      }),
    });
    const signupRes = await SignupPOST(signupReq);
    expect(signupRes.status).toBe(200);
  });
});
