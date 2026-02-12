export interface Launch {
  flight_number: number;
  launch_date_unix: number;
  mission_name: string;
  rocket?: {
    rocket_name: string | null;
  };
  links?: {
    mission_patch_small: string | null;
    mission_patch: string | null;
  };
  details: string | null;
}
