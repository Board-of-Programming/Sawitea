import { IsString, IsNumber, IsEmail, IsOptional, IsBoolean, Min, MaxLength } from "class-validator";

export class CreateDonationDto {
  @IsNumber()
  @Min(1000)
  amount: number;

  @IsString()
  @MaxLength(50)
  donorName: string;

  @IsEmail()
  donorEmail: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  donorMessage?: string;

  @IsBoolean()
  @IsOptional()
  isAnonymous?: boolean;
  // Payment method removed - will use Mayar.id for payment processing
}
