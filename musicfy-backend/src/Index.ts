import app from './Application';
import { sequelize } from './Infrastructure/Database/Database';

const InitDatabase = async () => {
    await sequelize.sync({ force: false });
    console.log('Database syncronized');
};

InitDatabase();

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});
