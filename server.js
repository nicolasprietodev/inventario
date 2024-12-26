import { createApp } from "./app.js";
import { models } from "./models/index.js";

const app = createApp(models);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
