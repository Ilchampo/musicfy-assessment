import app from './Application';
import { sequelize } from './Infrastructure/Database/Database';

const initDatabase = async () => {
    await sequelize.sync({ force: false });
    console.log('Database syncronized');
};

initDatabase();

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});
