let customers;
export default class Customer {
    static async injectDB(conn) {
        if (customers) return;
        try {
            customers = await conn.query(
                'SELECT customerNumber from customers',
                (err, rows, fields) => {
                    if (!err) {
                        console.log('got data');
                        console.log(rows);
                        return rows;
                    } else console.log(err);
                }
            );
        } catch (err) {
            console.error(error);
        }
    }
}
