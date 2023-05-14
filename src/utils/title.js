export const userTitle = [
    {
        id: 0,
        title: 'New User',
        color: '#F31818',
        requirements: {
            level: 1
        }
    },
    {
        id: 1,
        title: 'Novice',
        color: '#13F726',
        requirements: {
            level: 5
        }
    },
    {
        id: 2,
        title: 'Professional',
        color: '#E013F7',
        requirements: {
            level: 10
        }
    },
    {
        id: 3,
        title: 'Charity Lord',
        color: '#FCFF00',
        requirements: { 
            level: 20
        }
    },
    {
        id: 4,
        title: 'First time?',
        color: '#DA2D2D',
        requirements: {
            numberOfDonationTime: 1
        }
    },
    {
        id: 5,
        title: 'Small Fish',
        color: '#6EF9F2',
        requirements: {
            donationAmount: 0.5,
        }
    },
    {
        id: 6,
        title: 'Goodman',
        color: '#31C4BD',
        requirements: {
            donationAmount: 1.5,
        }
    },
    {
        id: 7,
        title: 'I just like helping others!',
        color: '#EDEF46',
        requirements: {
            donationAmount: 3,
        }
    },
    {
        id: 8,
        title: 'Small but Many',
        color: '#13DAF7',
        requirements: {
            numberOfDonationTime: 20
        }
    },
    {
        id: 9,
        title: 'I work for others',
        color: '#FF0000',
        requirements: {
            numberOfDonationTime: 50,
            donationAmount: 5,
            level: 30
        }
    }
]

export const getPossibleTitle = (user) =>{
    let results = [];
    for(let i = 0; i < userTitle.length; i++){
        if(meetsRequirements(userTitle[i],user)) results.push(userTitle[i])
    }
    return results;
}
const meetsRequirements = (title, user) => {
    const { requirements } = title;

    for (const requirement in requirements) {
      if (user[requirement] < requirements[requirement]) {
        return false;
      }
    }

    return true;
};