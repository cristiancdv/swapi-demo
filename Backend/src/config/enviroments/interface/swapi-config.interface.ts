type Protocol = "http" | "https";
export interface StarWarsUrlInterface {
  protocol: Protocol;
  domain: string;
  prefix: string;
}
