import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtAuthInterface } from "src/utills/jwt.utills";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(config: ConfigService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET,
        });
      }

    validate(payload: JwtAuthInterface): JwtAuthInterface {
      return payload;
    }
}