import { Connection } from 'typeorm';
import { expect } from 'chai';
import testConnection from '../../lib/test-connection';
import graphqlCall from '../../lib/graphql-call';
import User from './user-entity';
import * as userErrors from './user-errors';

const meQuery = `
    {
        me{
         id
         email
        }
    }
`;

const updateUserMutation = `
    mutation UpdateUser($name:String!){
        updateUser(newUser:{name:$name}){
          error{
            field
            message
          }
          user{
            id
            email
            name
          }
        }
    }
`;

const updatePasswordMutation = `
    mutation UpdatePassword($oldPassword:String!,$newPassword:String!){
        updatePassword(oldPassword:$oldPassword,newPassword:$newPassword){
            error{
                field
                message
            }
            updated
        }
    }
`;

let conn: Connection;
const desc = 'User Profile';

describe(desc, () => {
  before(async () => {
    conn = await testConnection();
  });

  after(async () => {
    await conn.close();
  });

  it('Should get user profile', async () => {
    const userDB = await User.create({
      email: 'userprofile1@gmail.com',
      password: 'testtest',
      name: 'userprofile',
    }).save();

    const { data } = await graphqlCall({
      source: meQuery,
      userId: userDB.id,
    });

    expect(data?.me).to.have.property('id', userDB.id);
    expect(data?.me).to.have.property('email', userDB.email);
  });

  it('Should update a user profile', async () => {
    const newProfile = {
      name: 'new name',
    };
    const userDB = await User.create({
      email: 'userprofile2@gmail.com',
      password: 'testtest',
      name: 'userprofile2',
    }).save();

    const { data } = await graphqlCall({
      source: updateUserMutation,
      userId: userDB.id,
      variableValues: newProfile,
    });

    expect(data?.updateUser.user).to.have.property('name', newProfile.name);
  });

  describe(`${desc} => change password`, () => {
    it('Should change user password', async () => {
      const userDB = await User.create({
        email: 'userprofile3@gmail.com',
        password: 'testtest',
        name: 'userprofile3',
      }).save();

      const { data } = await graphqlCall({
        source: updatePasswordMutation,
        userId: userDB.id,
        variableValues: {
          oldPassword: 'testtest',
          newPassword: 'newpass1',
        },
      });

      expect(data?.updatePassword).to.have.property('updated', true);
    });

    it('Should return an error if old password is incorrect', async () => {
      const userDB = await User.create({
        email: 'userprofile4@gmail.com',
        password: 'testtest',
        name: 'userprofile4',
      }).save();

      const { data } = await graphqlCall({
        source: updatePasswordMutation,
        userId: userDB.id,
        variableValues: {
          oldPassword: 'incorrect',
          newPassword: 'newpass1',
        },
      });

      expect(data?.updatePassword.error).to.deep.equal(
        userErrors.oldPasswordIncorrect
      );
    });
  });
});
