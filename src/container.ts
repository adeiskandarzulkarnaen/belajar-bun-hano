/* istanbul ignore file */
import { createContainer } from 'instances-container';


// external agency
import { password } from 'bun';
import prismaClient from './utils/prismaClient';



// service (repository, helper, manager, etc)
import UserPrismaService from './services/database/UserPrismaService';
import BunBCryptPasswordHash from './services/security/BcryptPasswordHash';


// creating container
const container = createContainer();



// registering services and repository
container.register([
  {
    key: 'UserDatabaseService',
    Class: UserPrismaService,
    parameter: {
      injectType: 'parameter',
      dependencies: [
        { concrete: prismaClient }
      ]
    }
  },
  {
    key: 'PasswordHash',
    Class: BunBCryptPasswordHash,
    parameter: {
      injectType: 'parameter',
      dependencies: [
        { concrete: password },
      ]
    }
  }
]);

export default container;
