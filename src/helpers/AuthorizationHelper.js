import SessionHelper from "./SessionHelper";

let authorizationLookup = {};
const user = SessionHelper.getUser();

export function getLookup() {
  return authorizationLookup;
}

export function getViewAuthorizationForAll(roles) {
  let authorization = {};
  for (let i = 0; i < roles?.length; i++) {
    for (let page in authorizationLookup) {
      if (page !== "dashboard") {
        authorization[page] = authorization[page]
          ? true
          : authorizationLookup[page][roles[i]].view;
      }
    }
  }
  return authorization;
}
