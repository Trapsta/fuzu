import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { Switch, useSwitch } from "@nextui-org/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";

import { useConfig } from "../contexts/ConfigContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useConfig();

  const { Component, slots, getBaseProps, getInputProps } = useSwitch({
    onValueChange: toggleTheme as (isSelected: boolean) => void,
  });

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          className={slots.wrapper({
            class: [
              "w-7 h-7 p-1.5",
              "flex items-center justify-center",
              "rounded-full bg-black hover:bg-gray-500",
            ],
          })}
        >
          {theme === "light" ? (
            <SunIcon className="w-8 h-8" />
          ) : (
            <MoonIcon className="w-8 h-8" />
          )}
        </div>
      </Component>
    </div>
  );
};

export default ThemeToggle;
