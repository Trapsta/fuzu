import { useSwitch } from "@nextui-org/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useConfig } from "../contexts/ConfigContext";

const LocaleToggle = () => {
  const { locale, toggleLocale } = useConfig();

  const { Component, slots, getBaseProps, getInputProps } = useSwitch({
    onValueChange: toggleLocale as (isSelected: boolean) => void,
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
              "w-7 h-7",
              "flex items-center justify-center",
              "rounded-full bg-black hover:bg-gray-500",
            ],
          })}
        >
          {locale === "en-US" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-full h-full rounded-full"
            >
              <path fill="#bd3d44" d="M0 0h512v512H0"></path>
              <path
                stroke="#fff"
                strokeWidth="40"
                d="M0 58h512M0 137h512M0 216h512M0 295h512M0 374h512M0 453h512"
              ></path>
              <path fill="#192f5d" d="M0 0h390v275H0z"></path>
              <marker id="us-a" markerHeight="30" markerWidth="30">
                <path fill="#fff" d="M15 0l9.3 28.6L0 11h30L5.7 28.6"></path>
              </marker>
              <path
                fill="none"
                markerMid="url(#us-a)"
                d="M0 0l18 11h65 65 65 65 66L51 39h65 65 65 65L18 66h65 65 65 65 66L51 94h65 65 65 65L18 121h65 65 65 65 66L51 149h65 65 65 65L18 177h65 65 65 65 66L51 205h65 65 65 65L18 232h65 65 65 65 66z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              className="w-full h-full rounded-full"
            >
              <defs>
                <path
                  id="ke-a"
                  strokeMiterlimit="10"
                  d="M-28.6 47.5l1.8 1 46.7-81c2.7-.6 4.2-3.2 5.7-5.8 1-1.8 5-8.7 6.7-17.7a58 58 0 00-11.9 14.7c-1.5 2.6-3 5.2-2.3 7.9z"
                ></path>
              </defs>
              <path fill="#fff" d="M0 0h512v512H0z"></path>
              <path fill="#000001" d="M0 0h512v153.6H0z"></path>
              <path fill="#060" d="M0 358.4h512V512H0z"></path>
              <g id="ke-b" transform="matrix(3.2 0 0 3.2 255.8 256)">
                <use
                  width="100%"
                  height="100%"
                  stroke="#000"
                  xlinkHref="#ke-a"
                ></use>
                <use
                  width="100%"
                  height="100%"
                  fill="#fff"
                  xlinkHref="#ke-a"
                ></use>
              </g>
              <use
                width="100%"
                height="100%"
                transform="matrix(-1 0 0 1 511.7 0)"
                xlinkHref="#ke-b"
              ></use>
              <path
                fill="#b00"
                d="M255.8 102.4c-19.2 0-51.2 51.2-60.8 76.8H0v153.6h195c9.7 25.6 41.7 76.8 60.9 76.8 19.2 0 51.2-51.2 60.8-76.8H512V179.2H316.6c-9.6-25.6-41.6-76.8-60.8-76.8"
              ></path>
              <path
                id="ke-c"
                d="M316.6 332.8a220 220 0 0016-76.8 220 220 0 00-16-76.8 220 220 0 00-16 76.8 220 220 0 0016 76.8"
              ></path>
              <use
                width="100%"
                height="100%"
                transform="matrix(-1 0 0 1 511.7 0)"
                xlinkHref="#ke-c"
              ></use>
              <g fill="#fff" transform="matrix(3.2 0 0 3.2 255.8 256)">
                <ellipse rx="4" ry="6"></ellipse>
                <path id="ke-d" d="M1 5.8s4 8 4 21-4 21-4 21z"></path>
                <use
                  width="100%"
                  height="100%"
                  transform="scale(-1)"
                  xlinkHref="#ke-d"
                ></use>
                <use
                  width="100%"
                  height="100%"
                  transform="scale(-1 1)"
                  xlinkHref="#ke-d"
                ></use>
                <use
                  width="100%"
                  height="100%"
                  transform="scale(1 -1)"
                  xlinkHref="#ke-d"
                ></use>
              </g>
            </svg>
          )}
        </div>
      </Component>
    </div>
  );
};

export default LocaleToggle;
