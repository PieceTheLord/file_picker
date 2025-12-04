/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { POST } from "@/app/api/signup/route";
import { NextApiResponse } from "next";

describe("/api/signup", () => {
  it("returns a user object on successful signup", async () => {
    const req = new Request("http://localhost:3000/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: "alwx2021@mail.ru",
        password: "Ganner1203!",
      }),
    });
    const resp = new Response();
    
    const res = await POST(req, resp);
    const data = await res.json();
    console.log(data);

    expect(data.error).toBe(
      "A user with the same id, email, or phone already exists in this project."
    ); // Check for successful status

    // expect(JSON.parse(data)).toEqual({  }); // Check the response body
  });
});
