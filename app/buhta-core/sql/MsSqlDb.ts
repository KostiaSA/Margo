import * as sql from "mssql";

export function executeSql(sqlBatch: string, database?: string): Promise<any[]> {
    //let options = {instanceName: sqlServerInstance} as any;

    let config: sql.config = {
      //  driver: "msnodesqlv8",
        pool: {
            min: 1,
            max: 1,
            idleTimeoutMillis: 5000 /// не работает
        },
        server: "127.0.0.1",
        //port: sqlServerPort,
        user: "sa",
        database: "mag3305",
        password: "sonyk",
        //options: options
    }

    let connection = new sql.Connection(config);

    return connection
        .connect()
        .then(()=> {
            let req = new sql.Request(connection);
            req.multiple = true;
            return req.batch(sqlBatch);
        })
        .then((rowsSet: any)=> {
            console.log(rowsSet[0].length);
            return rowsSet;
        });

}