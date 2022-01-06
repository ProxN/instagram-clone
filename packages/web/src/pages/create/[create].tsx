import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
  // console.log(context);
  if (context.query.create === 'select' || context.query.create === 'details') {
    console.log('Yeah Yeah');
    // return {
    //   redirect: {
    //     destination: '/home',
    //     permanent: false,
    //   },
    // };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

const Create = () => {
  return null;
};

export default Create;
