import Header from "../components/Modules/Header/Header";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => (
  <>
    <Header />
    {children}
  </>
);

export default DefaultLayout;
