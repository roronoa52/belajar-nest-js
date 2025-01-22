import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Connection {
    getName():string | null{
        return null;
    }
}

@Injectable()
export class MYSQLConnection extends Connection{
    getName():string{
        return "MYSQL";
    }
}

@Injectable()
export class MONGODBConnection extends Connection{
    getName():string{
        return "MONGODB";
    }
}

export function createConnection(configService: ConfigService):Connection{
    if(configService.get("DATABASE") == "mysql"){
        return new MYSQLConnection();
    }else{
        return new MONGODBConnection();
    }
}
