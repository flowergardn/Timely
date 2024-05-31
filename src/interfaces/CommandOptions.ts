import { UserApplicationInteraction } from "./Interaction";

export interface CommandOptions {
  ctx: {
    response: Response;
    request: Request;
  };
  interaction: UserApplicationInteraction;
}
