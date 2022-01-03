import { AccountLayout } from '@components/templates/AccountLayout';
import { withUser } from '@lib/utility/withUser';

const ChangePassword = () => {
  return (
    <AccountLayout>
      <div>hello</div>
    </AccountLayout>
  );
};

export default withUser(ChangePassword);
