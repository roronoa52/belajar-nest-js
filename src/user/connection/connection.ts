import { Injectable } from '@nestjs/common';

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
