import { server } from "./server/Server";

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
