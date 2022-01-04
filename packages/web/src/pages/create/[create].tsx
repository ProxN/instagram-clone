import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
  if (context.query.create === 'select' || context.query.create === 'details') {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

const Create = () => {
  return null;
};

export default Create;
