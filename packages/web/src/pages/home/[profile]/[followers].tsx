import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
  if (
    context.query.followers === 'followers' ||
    context.query.followers === 'following'
  ) {
    return {
      redirect: {
        destination: `/home/${context.query.profile}`,
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}
const Followers = () => {
  return null;
};
export default Followers;
