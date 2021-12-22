import { getConnection, createConnection } from 'typeorm';

import config from '../common/ormconfig';

export const connectedDB = async () => {
  let connection = null;

  try {
    connection = getConnection();
  } catch (error) {
    // handle error
  }

  try {
    if (connection && !connection.isConnected) {
      await connection.connect();
    } else {
      await createConnection(config);
    }

    console.log('Succesfully DB connected');
  } catch (error) {
    console.log('typeorm connection failed', error);
    process.exit(1);
  }
};

export default { connectedDB };
