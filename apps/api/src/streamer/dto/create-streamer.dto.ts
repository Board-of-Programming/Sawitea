import { IsString, IsOptional, MaxLength, Matches } from "class-validator";

export class CreateStreamerDto {
  @IsString()
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  })
  username: string;

  @IsString()
  @MaxLength(50)
  displayName: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  bio?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;
}
