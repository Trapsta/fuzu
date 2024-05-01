import { Button } from "@nextui-org/button";

const ThemeToggler = (props: any) => {
  const { themeToggler } = props;
  return <Button onClick={themeToggler} color="primary">Switch Theme ☀️ 🌙</Button>;
};

export default ThemeToggler;
