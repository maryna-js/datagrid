import faker from "faker";

faker.seed(781);

export const makeFaker = (idx) => {
    return {
        // "id": faker.random.uuid(),
        "firstName": faker.name.firstName(),
        "lastName": faker.name.lastName(),
        "age": faker.random.number({
            'min': 25,
            'max': 53
        }),
        "position": faker.name.jobTitle(),
        "hiredAt": faker.date.past().toLocaleString(),
        "salary": faker.finance.amount(),
        "email": faker.internet.email(),
        // "githubId": faker.internet.email(),
        // "totalScore": 0,
        // "locationName": faker.address.city(),
        // "taskResults": [],
         "isActive": faker.random.boolean()? 'yes' : 'no',
        //  "location": 
        //     {"city": faker.address.city(), "zipcode": faker.address.zipCode()}
          
    };
};

const data = [...new Array(10)].map((idx) => makeFaker(idx));

export default data;