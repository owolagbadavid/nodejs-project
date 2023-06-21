declare global {
    namespace Express {

    export interface Request {
        user?: ReqUser;
    }
  }
}
export interface ReqUser {
    id: string;
}