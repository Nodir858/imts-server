import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RolesGuard } from "./guards/roles.guard";
import { UsersModule } from "../user/users.module";
@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: 'nodir123',
            signOptions: {
                expiresIn: '7d'
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RolesGuard],
    exports: [AuthService]
})
export class AuthModule {}