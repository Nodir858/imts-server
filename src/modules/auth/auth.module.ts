import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: 'nodir123',
            signOptions: {
                expiresIn: '1h'
            }
        })
    ],
    controllers: [],
    providers: [],
})
export class AuthModule {}