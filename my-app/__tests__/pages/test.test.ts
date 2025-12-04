/**
 * @jest-environment node
 */
import { GET } from "@/app/api/hello/route";

describe("App Router API Test", () => {
  it("should return a welcome message", async () => {
    const req = new Request("http://localhost:3000/api/hello", {
      method: "GET",
    });
    const res = await GET(req);

    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ message: "Hello from Next.js API!" });
  });
});
