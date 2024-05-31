import type {
  APIChatInputApplicationCommandInteractionData,
  APIGuildMember,
  APIUserApplicationCommandInteractionData,
} from "discord-api-types/v10";

interface APIUser {
  avatar: string;
  global_name: string;
  id: string;
  username: string;
}

export interface UserApplicationInteraction {
  data: APIUserApplicationCommandInteractionData;
  user: APIUser;
}

export interface CommandApplicationInteraction {
  data: APIChatInputApplicationCommandInteractionData;
  user: APIUser;
}
