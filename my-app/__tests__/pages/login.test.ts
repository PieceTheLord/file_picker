/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { POST } from "@/app/api/login/route";
import { NextApiResponse } from "next";

describe("/api/signup", () => {
  it("Create login session in cookies ", async () => {
    const req = new Request("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: "alwx2021@mail.ru",
        password: "Ganner1203!",
      }),
    });
    const resp = new Response()
    const res = await POST(req, resp);
    const data = await res.json();
    console.log(data);

    expect(data.status).toBe(200); // Check for successful status

    // expect(JSON.parse(data)).toEqual({  }); // Check the response body
  });
});
