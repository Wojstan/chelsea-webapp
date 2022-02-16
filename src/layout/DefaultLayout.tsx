import Header from "../components/Modules/Header/Header";

type Props = {
  fullHeader: boolean;
  children: React.ReactNode;
};

const DefaultLayout = ({ fullHeader, children }: Props) => (
  <>
    <Header fullHeader={fullHeader} />
    {children}
  </>
);

export default DefaultLayout;
