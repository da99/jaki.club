
const { unstable_dev } = require("wrangler");

describe("Worker", () => {
  let worker;
  beforeAll(async () => {
    worker = await unstable_dev("src/worker.js", {
      experimental: { disableExperimentalWarning: true }
    })
  });

  afterAll(async () => {
    await worker.stop();
  })

  it("should return Hello World", async () => {
    const resp = await worker.fetch();
    if (resp) {
      const text = await resp.text();
      expect(text).toMatch("Hello World!");
    }
  })

});
