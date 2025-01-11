import app from "./app";
import { SERVER_CONFIG } from "./config/constants";

app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`server is running on port ${SERVER_CONFIG.PORT}`);
});
