// await db.school.bulkCreate()
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
const salt = randomBytes(32);

const schools = [
    {
        idSchool: 'LA0102',
        name: 'ttu',
        username: 'sa@LA0102',
        password: argon2.hash('vtn', { salt }),

        province: 'Long An',
        district: 'Đức Hòa',
        town: 'Đức Hòa',
    },
    {
        idSchool: 'LA1002',
        name: 'tts',
        username: 'sa@LA1002',
        password: 'vtn',

        province: 'Long An',
        district: 'Đức Hòa',
        town: 'Đức Hòa',
    },
    {
        idSchool: 'LA0105',
        name: 'thpt đức hòa',
        username: 'sa@LA0105',
        password: 'vtn',

        province: 'Long An',
        district: 'Đức Huệ',
        town: 'Đức Hòa Hạ',
    },
    {
        idSchool: 'SG0102',
        name: 'Võ Văn Tần',
        username: 'sa@SG0102',
        password: 'vtn',

        province: 'Long An',
        district: 'Đức Hòa',
        town: 'Đức Hòa Thượng',
    },
    {
        idSchool: 'LA0302',
        name: 'Hậu Nghĩa',
        username: 'sa@LA0302',
        password: 'vtn',

        province: 'Long An',
        district: 'Đức Hòa',
        town: 'Đức Hòa Đông',
    },
];

export default () => {
    return schools;
};
