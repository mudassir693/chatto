import { Module } from "@nestjs/common";
import { OrmService } from "./orm.service";
import { DatabaseService } from "src/database/database.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports:[DatabaseModule],
    providers:[OrmService],
    exports:[OrmService]
})
export class OrmModule {}