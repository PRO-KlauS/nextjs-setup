import { get } from "./client";

const getDashBoardDetails = (body, headers) => {
  return get("company/get-dashboard-counts", body, headers);
};

export { getDashBoardDetails };
