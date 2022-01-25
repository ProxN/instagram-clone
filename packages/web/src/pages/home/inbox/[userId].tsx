import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
  if (context.query.userId) {
    return {
      redirect: {
        destination: `/home/inbox`,
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}
const UserChat = () => {
  return null;
};
export default UserChat;
