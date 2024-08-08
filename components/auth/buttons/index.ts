import FacebookSSO from "./FacebookSSO";
import GoogleSSO from "./GoogleSSO";

// only client components are exported from module
// to avoid errors with server components as exported members
export default { FacebookSSO, GoogleSSO };
