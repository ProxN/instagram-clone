import { Connection } from 'typeorm';
import { expect } from 'chai';
import testConnection, { RedisMock } from '../../lib/test-connection';
import graphqlCall from '../../lib/graphql-call';
import User from '../user/user-entity';
import * as authErros from './auth-errors';

const signupMutation = `
    mutation Signup($email:String!,$password:String!,$name:String!){
        signup(data:{email:$email,password:$password,name:$name}){
          error{
            field
            message
          }
            user{
                id
                email
            }
        }
    }
`;

const signinMutation = `
    mutation Signin($email:String!,$password:String!){
        signin(data:{email:$email,password:$password}){
          error{
            field
            message
          }
            user{
                id
                email
            }
        }
    }
`;

const resetPasswordMutation = `
    mutation ResetPassword($resetToken:String!,$newPassword:String!){
        resetPassword(resetToken:$resetToken,newPassword:$newPassword){
          error{
            field
            message
          }
            user{
                id
                email
            }
        }
    }
`;

let conn: Connection;
const desc = 'User Authentcation';

describe(desc, () => {
  before(async () => {
    conn = await testConnection();
  });

  after(async () => {
    await conn.close();
  });

  describe(`${desc} => Sign up`, () => {
    it('Should signup a new user', async () => {
      const user = {
        email: 'test@test.com',
        password: 'testtest',
        name: 'test test',
      };
      const { data } = await graphqlCall({
        source: signupMutation,
        variableValues: user,
      });

      expect(data?.signup.user).to.have.property('email', user.email);
      const userDB = await User.findOne(data?.signup.user.id);
      expect(userDB).to.be.not.undefined;
      expect(userDB).to.have.property('id', data?.signup.user.id);
    });

    it('Should return an error if email already exists', async () => {
      const { data } = await graphqlCall({
        source: signupMutation,
        variableValues: {
          email: 'test@test.com',
          password: 'testtest',
          name: 'test test',
        },
      });

      expect(data?.signup.error).to.deep.equal(authErros.EmailAlreadyExists);
    });
  });

  describe(`${desc} => Sign in `, () => {
    it('Should sign in a user', async () => {
      const userDB = await User.create({
        email: 'test3@gmail.com',
        password: 'testtest',
        name: 'test3 test3',
      }).save();

      const { data } = await graphqlCall({
        source: signinMutation,
        variableValues: {
          email: userDB.email,
          password: 'testtest',
        },
      });

      expect(data?.signin.user).to.have.property('id', userDB.id);
      expect(data?.signin.user).to.have.property('email', userDB.email);
    });

    it('Should return an error if email or password is incorrect', async () => {
      const { data } = await graphqlCall({
        source: signinMutation,
        variableValues: {
          email: 'notExists@gmail.com',
          password: 'notexists',
        },
      });

      expect(data?.signin.error).to.deep.equal(
        authErros.IncorrectEmailOrPassword
      );
    });
  });

  describe(`${desc} => Reset Password`, () => {
    it('Should reset a user password', async () => {
      const userDB = await User.create({
        email: 'test5@gmail.com',
        password: 'testtest',
        name: 'test5 test5',
      }).save();

      const { resetToken } = userDB.generateResetToken();
      RedisMock.set(resetToken, userDB.id, 'px', 1000 * 60);

      const { data } = await graphqlCall({
        source: resetPasswordMutation,
        variableValues: {
          resetToken,
          newPassword: 'test1test',
        },
      });

      expect(data?.resetPassword.error).to.be.null;
      expect(data?.resetPassword.user).to.have.property('email', userDB.email);
    });

    it('Should return an error if token is invalid or expired', async () => {
      const userDB = await User.create({
        email: 'test6@gmail.com',
        password: 'testtest',
        name: 'test6 test6',
      }).save();

      const { resetToken } = userDB.generateResetToken();

      const { data } = await graphqlCall({
        source: resetPasswordMutation,
        variableValues: {
          resetToken,
          newPassword: 'test1test',
        },
      });

      expect(data?.resetPassword.user).to.be.null;
      expect(data?.resetPassword.error).to.deep.equal(authErros.InvalidToken);
    });
  });
});
