import { AuthChecker } from 'type-graphql';
import { Context } from '../types/context';

const authChecker: AuthChecker<Context> = ({ context }, roles) => {
  const { req } = context;

  if (!req.session.userId) return false;

  if (roles.length === 0 && req.session.userId) return true;

  if (req.session.role && !roles.includes(req.session.role)) return false;

  return true;
};

export default authChecker;
