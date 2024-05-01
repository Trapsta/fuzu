import { Button } from "@nextui-org/button";

const LanguageToggler = (props: any) => {
  const { locale, languageToggler } = props;
  return (
    <Button onClick={languageToggler} color="secondary">Switch language 🇬🇧 🇰🇪 ({locale})</Button>
  );
};

export default LanguageToggler;
